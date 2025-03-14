import { useQuery } from '@apollo/client';
import { ALL_BOOKS, CURRENT_USER } from '../queries';
import Loading from './Loading';

const Recommended = ({ show }) => {
  const {
    data: userData,
    loading: userIsLoading
  } = useQuery(CURRENT_USER, {
    skip: !show,
  });

  const {
    data: booksData,
    loading: booksIsLoading,
  } = useQuery(ALL_BOOKS, {
    variables: {
      genre: userData?.me?.favoriteGenre,
    },
    skip: !show && userIsLoading,
  });
  
  if (!show) {
    return null;
  }
  
  if (userIsLoading || booksIsLoading) {
    return <Loading />;
  }

  const { me: { favoriteGenre } } = userData;
  const { allBooks: books, } = booksData;
  
  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favourite genre <b>{favoriteGenre}</b></p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {books.map(({ id, title, author, published }) => (
            <tr key={id}>
              <td>{title}</td>
              <td>{author.name}</td>
              <td>{published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Recommended;
