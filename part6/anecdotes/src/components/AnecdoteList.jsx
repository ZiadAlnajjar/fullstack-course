import { useSelector, useDispatch } from 'react-redux';
import { initializeAnecdotes, voteAnecdote } from '../reducers/anecdoteReducer';
import { createSelector } from '@reduxjs/toolkit';
import { displayNotification } from '../reducers/notificationReducer';
import { useEffect } from 'react';


const AnecdoteList = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);
  
  const selectAnecdotes = (state) => state.anecdotes;
  const selectFilter = (state) => state.filter;
  
  const anecdotesSelector = createSelector([selectAnecdotes, selectFilter],
    (anecdotes, filter) => anecdotes
      .filter(({ content }) => content.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => (a.votes < b.votes ? 1 : a.votes > b.votes ? -1 : 0)));
  
  const anecdotes = useSelector(anecdotesSelector);
  
  const vote = (anecdote) => async () => {
    dispatch(voteAnecdote(anecdote));
    const msg = `you voted '${anecdote.content}'`;
    dispatch(displayNotification(msg));
  }

  
  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button type='button' onClick={vote(anecdote)}>
          vote
        </button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
