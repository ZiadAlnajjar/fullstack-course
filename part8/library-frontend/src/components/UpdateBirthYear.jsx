import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';

const UpdateBirthYear = ({ authors }) => {
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [birthYear, setBirthYear] = useState('0');
  const [updateBirthYear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    updateBirthYear({ variables: {
      name: selectedAuthor, birthYear: parseInt(birthYear)
    } });
    
    setSelectedAuthor('');
    setBirthYear('0');
  }
  
  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={handleSubmit}>
        <span>name</span>
        <select
          value={selectedAuthor}
          onChange={({ target }) => setSelectedAuthor(target.value)}
        >
          <option>select author</option>
          {authors.map(({ id, name }) => (
            <option key={id} value={name}>{name}</option>
          ))}
        </select>
        <br />
        <span>born</span>
        <input
          type="number"
          value={birthYear}
          onChange={({ target }) => setBirthYear(target.value)}
        />
        <br />
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default UpdateBirthYear;
