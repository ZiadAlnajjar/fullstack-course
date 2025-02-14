import Button from './Button';
import { useCachedGetBlogQuery, useLikeBlogMutation } from '../services/blogs';
import DeleteBlog from './DeleteBlog';
import { selectUser } from '../reducers/authSlice';
import { useSelector } from 'react-redux';
import { useMatch } from 'react-router-dom';
import Spinner from './Spinner';
import NotFound from './NotFound';
import { Typography } from '@material-tailwind/react';
import Comments from './Comments';

const Blog = () => {
  const blogMatch = useMatch('/blogs/:id');
  const {
    data: blog,
    isUninitialized,
    isLoading,
  } = useCachedGetBlogQuery(blogMatch?.params?.id);

  const [like] = useLikeBlogMutation();
  const user = useSelector(selectUser);

  if (isLoading) {
    return <Spinner />;
  }

  if (!blog) {
    return <NotFound />;
  }

  const { id, title, author, url, likes } = blog;
  const isBlogCreator = blog.user.username === user?.username;

  const handleLike = async () => await like(blog.id);

  return (
    <div className='blog'>
      <Typography variant='h3'>{title} {author}</Typography>
      <div>
        <span>{url}</span>
        <br />
        <span>
            likes {likes} {' '}
          <Button id='like' onClick={handleLike} size='sm'>
            like
          </Button>
        </span>
        <br />
        <span>added by {blog.user.name}</span>
        <br />
        {isBlogCreator &&
          <DeleteBlog blog={blog} />}
        <Comments id={id} />
      </div>
    </div>
  );
};

export default Blog;
