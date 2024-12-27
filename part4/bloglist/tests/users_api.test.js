const { describe, test, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const mongoose = require('mongoose');
const User = require('../models/user');
const helper = require('./test_helper');
const { usersInDb } = helper;

describe('users api', () => {
  after(async () => {
    await mongoose.connection.close();
  });

  describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({});
      await helper.addUser();
    });

    describe('retrieving users', () => {
      test('users are returned in the correct amount and in JSON format', async () => {
        const response = await api
          .get('/api/users')
          .expect(200)
          .expect('Content-Type', /application\/json/);

        const usersAtEnd = await usersInDb();
        assert.strictEqual(response.body.length, usersAtEnd.length);
      });

      test('does not return users\' password fields', async () => {
        const response = await api.get('/api/users');

        response.body.forEach((blog) => {
          assert.ok(!('password' in blog));
        });
      });

      test('returns users with populated blogs list', async () => {
        const response = await api.get('/api/users');

        response.body.forEach((blog) => {
          assert.ok('id' in blog);
          assert.ok(!('_id' in blog));
        });
      });
    });

    describe('creation of a new user', () => {
      test('succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
          name    : 'User',
          username: 'newuser',
          password: '123456',
        };

        await api
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .expect('Content-Type', /application\/json/);

        const usersAtEnd = await usersInDb();
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

        const usernames = usersAtEnd.map((u) => u.username);
        assert(usernames.includes(newUser.username));
      });

      test('fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
          name    : 'new root',
          username: 'root',
          password: '123456',
        };

        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/);

        const usersAtEnd = await helper.usersInDb();
        assert(result.body.error.includes('expected `username` to be unique'));

        assert.strictEqual(usersAtEnd.length, usersAtStart.length);
      });

      test('fails with proper statuscode and message if username is less than specified minimum length', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
          name    : 'new root',
          username: 'r',
          password: '123456',
        };

        const response = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/);

        const usersAtEnd = await helper.usersInDb();
        const body = response.body;
        const errorRegex =
          /\bvalidation failed\b.*\busername\b.*\bshorter\b.*\bminimum\b.*\blength\b/i;

        assert.strictEqual(usersAtEnd.length, usersAtStart.length);
        assert.ok('error' in body);
        assert.match(body.error, errorRegex);
      });

      test('fails with proper statuscode and message if password is less than specified minimum length', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
          name    : 'new root',
          username: 'root',
          password: '12',
        };

        const response = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/);

        const usersAtEnd = await helper.usersInDb();
        const body = response.body;
        const errorRegex =
          /\bpassword is shorter than minimum length\b/i;

        assert.strictEqual(usersAtEnd.length, usersAtStart.length);
        assert.ok('error' in body);
        assert.match(body.error, errorRegex);
      });
    });
  });
});
