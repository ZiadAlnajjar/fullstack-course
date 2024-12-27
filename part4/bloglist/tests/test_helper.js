const Blog = require('../models/blog');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const helper = require('./test_helper');

const initialBlogs = [
  {
    _id   : '5a422a851b54a676234d17f7',
    title : 'React patterns',
    author: 'Michael Chan',
    url   : 'https://reactpatterns.com/',
    likes : 7,
    __v   : 0,
  },
  {
    _id   : '5a422aa71b54a676234d17f8',
    title : 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url   : 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes : 5,
    __v   : 0,
  },
  {
    _id   : '5a422b3a1b54a676234d17f9',
    title : 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url   : 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes : 12,
    __v   : 0,
  },
  {
    _id   : '5a422b891b54a676234d17fa',
    title : 'First class tests',
    author: 'Robert C. Martin',
    url   : 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes : 10,
    __v   : 0,
  },
  {
    _id   : '5a422ba71b54a676234d17fb',
    title : 'TDD harms architecture',
    author: 'Robert C. Martin',
    url   : 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes : 0,
    __v   : 0,
  },
  {
    _id   : '5a422bc61b54a676234d17fc',
    title : 'Type wars',
    author: 'Robert C. Martin',
    url   : 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes : 2,
    __v   : 0,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});

  return blogs.map((blog) => blog.toJSON());
};

const nonExistingBlogId = async () => {
  const blog = new Blog({
    title : 'Non existing blog',
    author: 'non existing author',
    url   : 'non-existing-url',
    likes : 0,
  });

  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const usersInDb = async () => {
  const users = await User.find({});

  return users.map((user) => user.toJSON());
};

const initUser = {
  name    : 'root',
  username: 'root',
  password: '123456',
};

const addUser = async (data = initUser) => {
  const passwordHash = await bcrypt.hash(data.password, 10);
  const user = new User({
    ...data,
    password: passwordHash,
  });

  return await user.save();
};

const addBlogWithInitUser = async (api) => {
  const initBlog = {
    title : 'title of the post',
    author: initUser.name,
    url   : 'http/url/to/post.extension',
  };

  const authHeader = await setAuthHeader(api);
  const savedBlog = await api
    .post('/api/blogs')
    .set(authHeader)
    .send(initBlog);

  return savedBlog.body;
};

const setAuthHeader = async (api, credentials = initUser) => {
  const { username, password } = credentials;

  const authUser = await api
    .post('/api/login')
    .send({ username, password });

  return { 'Authorization': `bearer ${authUser.body.token}` };
};

module.exports = {
  initialBlogs,
  blogsInDb,
  nonExistingBlogId,
  usersInDb,
  initUser,
  addUser,
  addBlogWithInitUser,
  setAuthHeader,
};
