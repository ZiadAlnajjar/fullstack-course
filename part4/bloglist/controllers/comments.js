const commentRouter = require('express').Router({ mergeParams: true });
const Comment = require('../models/comment');
const Blog = require('../models/blog');

commentRouter.get('/', async (request, response) => {
  const comments = await Comment
    .find({ blog: request.params.id })
    .populate('blog', { comments: 0 });

  response.json(comments);
});

commentRouter.post('/', async (request, response) => {
  const blogId = request.params.id;
  const { content } = request.body;
  const comment = new Comment({ content, blog: blogId });
  const savedComment = await comment.save();

  const blogToComment = await Blog.findById(blogId);
  blogToComment.comments = [...blogToComment.comments, savedComment.id];
  await blogToComment.save();

  response.status(201).json(savedComment);
});

module.exports = commentRouter;
