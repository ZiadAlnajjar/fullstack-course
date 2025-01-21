import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query'
import anecdoteService from '../services/anecdotes'
import { useNotification } from '../NotificationContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notification = useNotification();
  
  const newAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.create,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      const msg = `anecdote '${newAnecdote.content}'has been created successfully`;
      notification(msg)
    },
    onError: (err) => {
      const errorMsg = err.response.data.error
      if(errorMsg && errorMsg.includes('too short anecdote')) {
        notification(errorMsg)
      }
    }
  })
  
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdoteMutation.mutate(content)
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
