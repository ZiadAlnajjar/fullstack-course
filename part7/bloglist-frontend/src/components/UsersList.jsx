import { useGetUsersQuery } from '../services/users';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';

const UsersList = ({ users }) => (
  <>
    {users.map(({ id, name, blogs }) => (
      <tr key={id}>
        <td><Link to={`/users/${id}`}>{name}</Link></td>
        <td>{blogs.length}</td>
      </tr>
    ))}
  </>
);

export default UsersList;
