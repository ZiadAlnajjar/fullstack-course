import { useQuery } from '@apollo/client';
import { ALL_BOOKS, ALL_GENRES } from '../queries';
import Loading from './Loading';
import { useState } from 'react';

const Books = ({ show }) => {
  const [genre, setGenre] = useState();
  
  const result = useQuery(ALL_BOOKS, {
    variables: { genre }
  });
  
  const {
    data: genresData,
    loading: genresIsLoading
  } = useQuery(ALL_GENRES);
  
  if (!show) {
    return null
  }
  
  if (result.loading || genresIsLoading) {
    return <Loading />;
  }
  
  const { allGenres: genres } = genresData;
  const books = result.data.allBooks;

  return (
    <div>
      <h2>books</h2>
      {genre && <p>in genre {genre}</p>}
      <div>
        <button onClick={() => setGenre()}>All</button>
        {genres.map((item) => (
          <button key={item} onClick={() => setGenre(item)}>{item}</button>
        ))}
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
