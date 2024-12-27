const { describe, test, before, after, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const app = require('../app');
let api = supertest(app);
const mongoose = require('mongoose');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper');
const { initialBlogs, blogsInDb, nonExistingBlogId } = helper;

describe('blogs api', () => {
  let authHeader;

  before(async () => {
    await User.deleteMany({});
    await helper.addUser();
    authHeader = await helper.setAuthHeader(api);
  });

  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(initialBlogs);
  });

  after(async () => {
    await mongoose.connection.close();
  });

  describe('retrieving blogs', () => {
    test('blogs are returned in the correct amount and in JSON format', async () => {
      const response = await api
        .get('/api/blogs')
        .set(authHeader)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      assert.strictEqual(response.body.length, initialBlogs.length);
    });

    test('each blog has a unique identifier named "id" instead of "_id"', async () => {
      const response = await api.get('/api/blogs').set(authHeader);

      response.body.forEach((blog) => {
        assert.ok('id' in blog);
        assert.ok(!('_id' in blog));
      });
    });
  });

  describe('creation of a new blog', () => {
    test('succeeds with valid data and authenticated user', async () => {
      const newBlog = {
        title : 'this is a title',
        author: 'author',
        url   : 'http/url/to/another-post.extension',
        likes : 15,
      };

      await api
        .post('/api/blogs')
        .set(authHeader)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await blogsInDb();
      const titles = blogsAtEnd.map(({ title }) => title);

      assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1);
      assert.ok(titles.includes(newBlog.title));
    });

    test('succeeds with likes defaulting to zero if likes are missing from the request', async () => {
      const newBlog = {
        title : 'this is a title',
        author: 'author',
        url   : 'http/url/to/another-post.extension',
      };

      const response = await api
        .post('/api/blogs')
        .set(authHeader)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await blogsInDb();

      assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1);
      assert.strictEqual(response.body.likes,0);
    });

    test('fails with statuscode 401 and error message if token is invalid or missing', async () => {
      const newBlog = {
        author: 'author of the post',
      };

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await blogsInDb();
      const body = response.body;
      const errorRegex =
        /\binvalid or missing token\b/i;

      assert.strictEqual(blogsAtEnd.length,initialBlogs.length);
      assert.ok('error' in body);
      assert.match(body.error, errorRegex);
    });

    test('fails with statuscode 400 and error message if title and/or url are missing', async () => {
      const newBlog = {
        author: 'author of the post',
      };

      const response = await api
        .post('/api/blogs')
        .set(authHeader)
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await blogsInDb();
      const body = response.body;
      const errorRegex =
        /\bvalidation failed\b.*\b(?:url|title)\b.*\brequired\b/i;

      assert.strictEqual(blogsAtEnd.length,initialBlogs.length);
      assert.ok('error' in body);
      assert.match(body.error, errorRegex);
    });
  });

  describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
      const blogsAtStart = await blogsInDb();
      const blogToView = blogsAtStart[0];

      const response = await api
        .get(`/api/blogs/${blogToView.id}`)
        .set(authHeader)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      assert.deepStrictEqual(response.body, blogToView);
    });

    test('fails with statuscode 404 if blog does not exist', async () => {
      const validNonexistingId = await nonExistingBlogId();

      await api
        .get(`/api/blogs/${validNonexistingId}`)
        .set(authHeader)
        .expect(404);
    });

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445';

      await api
        .get(`/api/blogs/${invalidId}`)
        .set(authHeader)
        .expect(400);
    });
  });

  describe('updating a specific blog', () => {
    test('succeeds with valid data', async () => {
      const blogsAtStart = await blogsInDb();
      const blogToUpdate = blogsAtStart[0];

      const blog = {
        ...blogToUpdate,
        title: 'updated title',
      };
      delete blog.id;

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .set(authHeader)
        .send(blog)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await blogsInDb();
      const isBlogUpdated = blogsAtEnd.find(({ id, title }) => (
        id === blogToUpdate.id && title === blog.title
      ));

      assert.strictEqual(blogsAtEnd.length,initialBlogs.length);
      assert.ok(isBlogUpdated);
    });

    test('fails with statuscode 400 and error message when title and/or url are missing', async () => {
      const blogsAtStart = await blogsInDb();
      const blogToUpdate = blogsAtStart[0];
      const blog = {
        author: 'new author',
        likes : 25,
      };

      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .set(authHeader)
        .send(blog)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await blogsInDb();
      const body = response.body;
      const errorRegex =
        /\bvalidation failed\b.*\b(?:url|title)\b.*\brequired\b/i;

      assert.strictEqual(blogsAtEnd.length, initialBlogs.length);
      assert.ok('error' in body);
      assert.match(body.error, errorRegex);
    });

    test('fails with statuscode 404 if blog does not exist', async () => {
      const nonExistentBlogId = await nonExistingBlogId();

      const blog = {
        title : 'new title',
        author: 'new author',
        url   : 'new url',
        likes : 26,
      };

      await api
        .put(`/api/blogs/${nonExistentBlogId}`)
        .set(authHeader)
        .send(blog)
        .expect(404);
    });
  });

  describe('deletion of a blog', () => {
    let addedBlog;

    beforeEach(async () => {
      addedBlog = await helper.addBlogWithInitUser(api);
      initialBlogs.push(addedBlog);
    });

    test('succeeds with status code 204 when performed by the blog creator', async () => {
      await api
        .delete(`/api/blogs/${addedBlog.id}`)
        .set(authHeader)
        .expect(204);

      const blogsAtEnd = await blogsInDb();
      const ids = blogsAtEnd.map(({ id }) => id);

      assert.strictEqual(blogsAtEnd.length, initialBlogs.length - 1);
      assert.ok(!(ids.includes(addedBlog.id)));
    });

    test('fails with statuscode 403 when attempted by a user who is not the blog creator', async () => {
      await helper.addUser({
        name: 'john', username: 'doe', password: '123456',
      });

      const userAuthHeader = await helper.setAuthHeader(api, {
        username: 'doe', password: '123456',
      });

      await api
        .delete(`/api/blogs/${addedBlog.id}`)
        .set(userAuthHeader)
        .expect(403);
    });

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445';

      await api
        .delete(`/api/blogs/${invalidId}`)
        .set(authHeader)
        .expect(400);
    });
  });
});
