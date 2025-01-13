import blogService from '../services/blogs';
import Button from './Button';

const DeleteBlogForm = ({ blog, blogs, setBlogs, user, notify }) => {
  const { id } = blog;

  const deleteBlog = async (e) => {
    e.preventDefault();

    if(!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return;
    }

    await blogService.remove(id);
    setBlogs(blogs.filter(blog => blog.id !== id));
    notify(`Blog  ${blog.title} has been deleted`, 'success');
  };

  return (
    <form method='DELETE' onSubmit={deleteBlog}>
      <Button type='submit' text='remove' style={buttonStyles} />
    </form>
  );
};

const buttonStyles = {
  border: 'none',
  borderRadius: '6%',
  padding: '2px 6px',
  color: 'white',
  backgroundColor: 'blue',
};

export default DeleteBlogForm;
