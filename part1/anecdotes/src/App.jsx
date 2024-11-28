import { useState } from 'react';

const Button = ({ text, onClick }) => (
  <button onClick={onClick}>{text}</button>
);

const Anecdote = ({ anecdote, votes }) => (
  <div>
    <p>{anecdote}</p>
    <p>has {votes} votes</p>
  </div>
);

const TopAnecdote = ({ anecdote, votes }) => {
  if (!anecdote) {
    return (
      <div>
        <h1>Anecdote with most votes</h1>
        <p>No votes given</p>
      </div>
    );
  }
  
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <Anecdote
        anecdote={anecdote}
        votes={votes}
      />
    </div>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];
  const anecdotesLen = anecdotes.length;
  
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({ ...Array(anecdotesLen).fill(0) });
  const [topAnecdote, setTopAnecdote] = useState({ index: -1, votes: 0 });
  
  const selectRandom = () => {
    let random;
    
    do {
      random = Math.floor(Math.random() * anecdotesLen);
    } while (random === selected);
    
    setSelected(random);
  };
  
  const vote = () => {
    const updatedVotes = votes[selected] += 1;
    setVotes({ ...votes, [selected]: updatedVotes });
    
    if (updatedVotes >= topAnecdote.votes) {
      setTopAnecdote({ index: selected, votes: updatedVotes });
    }
  };
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote
        anecdote={anecdotes[selected]}
        votes={votes[selected]}
      />
      <Button text='vote' onClick={vote} />
      <Button text='next anectode' onClick={selectRandom} />
      <TopAnecdote
        anecdote={anecdotes[topAnecdote.index]}
        votes={topAnecdote.votes}
      />
    </div>
  );
};

export default App;
