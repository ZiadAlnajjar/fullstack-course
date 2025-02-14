import { Typography } from '@material-tailwind/react';
import UsersList from './UsersList';
import { useGetUsersQuery } from '../services/users';
import Spinner from './Spinner';

const Users = () => {
  const { data: users = [], isLoading } = useGetUsersQuery();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Typography variant='h2'>Users</Typography>
      <table>
        <thead>
          <tr>
            <th />
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          <UsersList users={users} />
        </tbody>
      </table>
    </>
  );
};

export default Users;
