import Button from './Button';
import Input from './Input';
import Heading from './Heading';
import { handleChange, resetStrState } from '../utils/helpers';
import { useState } from 'react';
import blogService from '../services/blogs';
import * as logger from 'react-dom/test-utils';

const AddBlogForm = ({ addBlogHandler, blogs, setBlogs }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = async (e) => {
    e.preventDefault();

    const newBlog = {
      title,
      author,
      url,
    };

    const savedBlog = await addBlogHandler(newBlog);
    setBlogs([...blogs, savedBlog]);
    resetFields();
  };

  const resetFields = () => {
    resetStrState(setTitle);
    resetStrState(setAuthor);
    resetStrState(setUrl);
  };

  return (
    <form onSubmit={addBlog}>
      <Input
        name='title'
        label='title:'
        value={title}
        onChange={handleChange(setTitle)}
      />
      <Input
        name='author'
        label='author:'
        value={author}
        onChange={handleChange(setAuthor)}
      />
      <Input
        name='url'
        label='url:'
        value={url}
        onChange={handleChange(setUrl)}
      />
      <div>
        <Button type='submit' text='create' />
      </div>
    </form>
  );
};

export default AddBlogForm;
