import { useAuth } from '../hooks';
import Alert from '../components/Alert';
import NavBar from '../components/NavBar';
import { Typography } from '@material-tailwind/react';

const Default = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Alert />
      {isAuthenticated ? (
        <>
          <NavBar />
          <Typography variant='h1'>Blog App</Typography>
        </>
      ) : null}
      {children}
    </>
  );
};

export default Default;
