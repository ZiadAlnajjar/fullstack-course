import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../reducers/authSlice';

const UserSection = () => {
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(logout());
  const { name } = useSelector(selectUser);

  return (
    <span>
      <span>{name} logged in</span> {' '}
      <Button onClick={handleLogout} size='sm'>
        logout
      </Button>
    </span>
  );
};
export default UserSection;
