import { Typography } from '@material-tailwind/react';
import AddComment from './AddComment';
import CommentList from './CommentList';

const Comments = ({ id }) => {
  const comments = [];

  return (
    <>
      <Typography variant='h3'>comments</Typography>
      <AddComment id={id} />
      <CommentList id={id} />
    </>
  );
};

export default Comments;
