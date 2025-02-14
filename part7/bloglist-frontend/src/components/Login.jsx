import { Typography } from '@material-tailwind/react';
import Input from './Input';
import Button from './Button';
import { useField } from '../hooks';
import { useLoginMutation } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Card } from '@material-tailwind/react';

const Login = () => {
  const navigate = useNavigate();
  const [username] = useField();
  const [password, resetPassword] = useField();
  const [login, { isError, reset }] = useLoginMutation();

  if (isError && password.value) {
    resetPassword();
    reset();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({
      username: username.value,
      password: password.value
    });
  };

  return (
    <Card className='w-xl absolute absolute-center p-16 z-10'>
      <Typography variant='h2'>Log in to application</Typography>
      <form
        onSubmit={handleSubmit}
        className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 flex flex-col w-full gap-6'>
        <Input
          {...username}
          label='username'
          data-testid='username'
        />
        <Input
          {...password}
          label='password'
          type='current-password'
        />
        <Button type='submit' fullWidth>
          login
        </Button>
      </form>
    </Card>
  );
};

export default Login;
