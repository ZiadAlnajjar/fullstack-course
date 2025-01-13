const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const EntityNotFoundException = require('../exceptions/EntityNotFoundException');
const { userExtractor } = require('../utils/middleware');

blogRouter.get('/', async (request, response) => {
  const blogs= await Blog.find({}).populate('user', { blogs: 0 });
  response.json(blogs);
});

blogRouter.post('/', userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body;
  const { user } = request;

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();

  const userData = await User.findById(user.id, { blogs: 0 });
  savedBlog.user = userData;

  response.status(201).json(savedBlog);
});

blogRouter.get('/:id', async (request, response) => {
  const requestedBlog = await Blog.findById(request.params.id);

  if (!requestedBlog) {
    throw new EntityNotFoundException('blog');
  }

  response.json(requestedBlog);
});

blogRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes, user } = request.body;

  const blog = {
    title : title ?? '',
    author: author ?? '',
    url   : url ?? '',
    likes,
    user,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id, blog, { new: true, runValidators: true },
  );

  if (!updatedBlog) {
    throw new EntityNotFoundException();
  }

  response.json(updatedBlog);
});

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const { user } = request;
  const id = request.params.id;

  const blog = await Blog.findById(id);

  if (!user.blogs.includes(blog.id)) {
    return response.status(403).end();
  }

  await blog.deleteOne();
  response.status(204).end();
});

module.exports = blogRouter;
