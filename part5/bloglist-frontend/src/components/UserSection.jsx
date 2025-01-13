import Button from './Button';
import blogService from '../services/blogs';

const UserSection = ({ user, setUser }) => {
  const logout = () => {
    setUser(null);
    window.localStorage.removeItem('user');
    blogService.removeToken();
  };

  return (
    <div>
      <span>{user.name} logged in</span>
      <Button onClick={logout} text='logout' />
    </div>
  );
};
export default UserSection;
