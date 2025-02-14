import Input from './Input';
import { useField } from '../hooks';
import Button from './Button';
import { useAddCommentMutation } from '../services/comments';
import { useParams } from 'react-router-dom';

const AddComment = ({ id }) => {
  const [comment, resetComment] = useField();
  const [addComment] = useAddCommentMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addComment({ id, content: comment.value });
    resetComment();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input {...comment} />
      <Button type='submit' size='sm'>Add Comment</Button>
    </form>
  );
};

export default AddComment;
