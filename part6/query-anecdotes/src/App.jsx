import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'
import { useNotification } from './NotificationContext';

const App = () => {
  const queryClient = useQueryClient()
  const notification = useNotification();
  
  const { data: anecdotes, isLoading } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => anecdoteService.index(),
  })
  
  const voteAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.update,
    onSuccess: (votedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const updatedAnecdotes = anecdotes.map((anec) =>
        anec.id !== votedAnecdote.id ? anec : votedAnecdote
      )
      queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
      const msg = `anecdote '${votedAnecdote.content}' has been added voted.`;
      notification(msg)
    },
  })
  
  if (isLoading) {
    return <div>loading data...</div>
  }
  
  const handleVote = (anecdote) => {
    const { id, votes } = anecdote
    const votedAnecdote = {
      ...anecdote,
      votes: votes + 1,
    }
    voteAnecdoteMutation.mutate({ id, obj: votedAnecdote })
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
