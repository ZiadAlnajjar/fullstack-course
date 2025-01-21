import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { displayNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.content.value
    dispatch(createAnecdote(content))
    e.target.content.value = ''
    const msg = `anecdote '${content}' has been created successfully`;
    dispatch(displayNotification(msg))
  }
  
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='content' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
