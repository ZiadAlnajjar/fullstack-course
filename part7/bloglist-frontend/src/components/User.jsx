import { Typography } from '@material-tailwind/react';
import {
  useCachedGetUserQuery,
  useGetUserQuery,
  useGetUsersQuery,
  useLazyGetUserQuery
} from '../services/users';
import { useMatch } from 'react-router-dom';
import NotFound from './NotFound';
import Spinner from './Spinner';
import { api } from '../services/api';

const Users = () => {
  const userMatch = useMatch('/users/:id');
  const {
    data: user,
    isUninitialized,
    isLoading,
  } = useCachedGetUserQuery(userMatch?.params?.id);

  if (isLoading) {
    return <Spinner />;
  }

  if (!user) {
    return <NotFound />;
  }

  const { name, blogs } = user;

  return (
    <>
      <Typography variant='h2'>{name}</Typography>
      <Typography variant='h3'>Added Blogs</Typography>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
};

export default Users;
