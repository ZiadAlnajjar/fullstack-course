import { useDeleteBlogMutation } from '../services/blogs';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { notify } from '../reducers/notificationSlice';

const DeleteBlog = ({ blog }) => {
  const dispatch = useDispatch();
  const [deleteBlog] = useDeleteBlogMutation();
  const { id, title, author } = blog;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!window.confirm(`Remove blog ${title} by ${author}`)) {
      return;
    }

    await deleteBlog(id);
    dispatch(notify(`Blog  ${title} has been deleted`, 'success'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button type='submit' size='sm'>
        remove
      </Button>
    </form>
  );
};

export default DeleteBlog;
