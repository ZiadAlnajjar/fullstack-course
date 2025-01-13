import Button from './Button';
import Input from './Input';
import Heading from './Heading';
import { handleChange, resetStrState } from '../utils/helpers';
import { useState } from 'react';
import loginService from '../services/login';

const LoginForm = ({ setUser, notify }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      resetFields();
    } catch(err) {
      if(err.name === 'InvalidCredentialsError') {
        notify(err.message, 'error');
      }
    }
  };

  const resetFields = () => {
    resetStrState(setUsername);
    resetStrState(setPassword);
  };

  return (
    <form onSubmit={login}>
      <Input
        name='username'
        label='username'
        data-testid='username'
        value={username}
        onChange={handleChange(setUsername)}
      />
      <Input
        name='password'
        label='password'
        data-testid='password'
        type='current-password'
        value={password}
        onChange={handleChange(setPassword)}
      />
      <Button type='submit' text='login' />
    </form>
  );
};

export default LoginForm;
