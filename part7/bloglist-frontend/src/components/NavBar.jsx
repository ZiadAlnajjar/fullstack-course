import { Link } from 'react-router-dom';
import UserSection from './UserSection';

const NavBar = () => {
  const padding = {
    paddingRight: 5
  };

  return (
    <div>
      <Link style={padding} to='/'>
        blogs
      </Link>
      <Link style={padding} to='/users'>
        users
      </Link>
      <UserSection />
    </div>
  );
};


export default NavBar;
