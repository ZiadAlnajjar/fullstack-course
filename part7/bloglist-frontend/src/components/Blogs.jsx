import Togglable from './Togglable';
import { Typography } from '@material-tailwind/react';
import AddBlogForm from './AddBlogForm';
import BlogList from './BlogList';
import { useMemo, useRef } from 'react';
import { useGetBlogsQuery } from '../services/blogs';
import Spinner from './Spinner';

const Blogs = () => {
  const { data: unsortedBlogs = [], isLoading } = useGetBlogsQuery();
  const blogFormTogglableRef = useRef();

  const blogs = useMemo(() => {
    return unsortedBlogs ?
      [...unsortedBlogs].sort((a, b) => b.likes - a.likes)
      : [];
  }, [unsortedBlogs]);

  return (
    <>
      <Togglable btnLabel='new blog' ref={blogFormTogglableRef}>
        <div>
          <Typography variant='h2'>create new</Typography>
          <AddBlogForm />
        </div>
      </Togglable>
      {!isLoading
        ? <BlogList blogs={blogs} />
        : <Spinner />
      }
    </>
  );
};

export default Blogs;
