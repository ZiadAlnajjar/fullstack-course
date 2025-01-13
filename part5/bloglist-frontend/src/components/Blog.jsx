import Togglable from './Togglable';
import Button from './Button';
import blogService from '../services/blogs';
import DeleteBlogForm from './DeleteBlogForm';

const Blog = ({ blog, like, blogs, setBlogs, user, notify }) => {
  const { id, title, author, url, likes } = blog;
  const isBlogCreator = blog.user.username === user.username;

  return (
    <div className='blog' style={blogStyles}>
      <span>{title} {author}</span> {' '}
      <Togglable>
        <div>
          <span>{url}</span>
          <br />
          <span>
            likes {likes} {' '}
            <Button id='like' text='like' onClick={like} />
          </span>
          <br />
          <span>{blog.user.name}</span>
          <br />
          {isBlogCreator &&
            <DeleteBlogForm blog={blog} blogs={blogs} setBlogs={setBlogs} user={user} notify={notify} />}
        </div>
      </Togglable>
    </div>
  );
};

const blogStyles = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
};

export default Blog;
