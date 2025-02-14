import { useGetCommentsQuery } from '../services/comments';
import Spinner from './Spinner';

const CommentList = ({ id: blogId }) => {
  const {
    data: comments,
    isLoading,
  } = useGetCommentsQuery(blogId);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ul>
      {comments.map(({ id, content }) => (
        <li key={id}>{content}</li>
      ))}
    </ul>
  );
};

export default CommentList;
