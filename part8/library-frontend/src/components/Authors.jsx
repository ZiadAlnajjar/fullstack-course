import { useQuery } from '@apollo/client'
import Loading from './Loading';
import { ALL_AUTHORS } from '../queries';
import UpdateBirthYear from './UpdateBirthYear';

const Authors = ({ show, token }) => {
  const result = useQuery(ALL_AUTHORS);
  
  if (!show) {
    return null
  }
  
  if (result.loading) {
    return <Loading />;
  }
  
  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token && <UpdateBirthYear authors={authors} />}
    </div>
  )
}

export default Authors
