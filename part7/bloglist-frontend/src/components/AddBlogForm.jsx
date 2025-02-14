import Button from './Button';
import Input from './Input';
import { useAddBlogMutation } from '../services/blogs';
import { useField } from '../hooks';

const AddBlogForm = () => {
  const [title, resetTitle] = useField();
  const [author, resetAuthor] = useField();
  const [url, resetUrl] = useField();
  const [addBlog] = useAddBlogMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    };
    await addBlog(newBlog);
    resetFields();
  };

  const resetFields = () => {
    resetTitle();
    resetAuthor();
    resetUrl();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        {...title}
        label='title:'
      />
      <Input
        {...author}
        label='author:'
      />
      <Input
        {...url}
        label='url:'
      />
      <div>
        <Button type='submit'>
          create
        </Button>
      </div>
    </form>
  );
};

export default AddBlogForm;
