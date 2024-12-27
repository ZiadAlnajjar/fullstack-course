const _ = require('lodash');

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1;

const totalLikes = (blogs) =>
  blogs.reduce((total, current) => total + current.likes, 0);

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  return blogs.reduce((mostLiked, blog) =>
    blog.likes > mostLiked.likes ? blog : mostLiked, blogs[0]);
};

const _getTopAuthorBy = (blogs, key, callback) => {
  if (blogs.length === 0) {
    return null;
  }

  const blogsGroupedByAuthor = _.groupBy(blogs, 'author');

  return (
    _.maxBy(
      _.map(blogsGroupedByAuthor, (authorBlogs, author) => ({
        author,
        [key]: callback(authorBlogs),
      })),
      key,
    )
  );
};

const mostBlogs = (blogs) => _getTopAuthorBy(blogs, 'blogs', (authorBlogs) => authorBlogs.length);

const mostLikes = (blogs) => _getTopAuthorBy(blogs, 'likes', (authorBlogs) => _.reduce(
  authorBlogs,
  (totalLikes, blog) => (totalLikes += blog.likes),
  0,
));

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
