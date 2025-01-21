import { createSlice } from '@reduxjs/toolkit';
import anecdotesService from '../services/anecdotes';
import anecdoteService from '../services/anecdotes';

const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0
  }
}

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      const anecdote = action.payload
      return state.map(anec =>
        anec.id !== anecdote.id ? anec : anecdote
      )
    },
  }
})

export const {
  setAnecdotes, appendAnecdote, updateAnecdote
} = anecdoteSlice.actions;

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdotesService.index();
  dispatch(setAnecdotes(anecdotes));
}

export const createAnecdote = (content) => async (dispatch) => {
  const savedAnecdote = await anecdoteService.create(content)
  dispatch(appendAnecdote(savedAnecdote))
}

export const voteAnecdote = (anecdote) => async (dispatch) => {
  const { id, votes } = anecdote;
  const votedAnecdote = { ...anecdote, votes: votes + 1 };
  const updatedAnecdote = await anecdotesService.update(id, votedAnecdote);
  dispatch(updateAnecdote(updatedAnecdote));
}

export default anecdoteSlice.reducer
