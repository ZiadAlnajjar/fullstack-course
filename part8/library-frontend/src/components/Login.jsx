import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';

const Login = ({ show, token, setToken, setPage, }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('secret');
  
  const [login, result] = useMutation(LOGIN);
  
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
      setPage('authors');
    }
  }, [result.data, setToken])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    login({ variables: { username, password } });
    setUsername('');
  }
  
  if (!show) {
    return null
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
      <input
        type='password'
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      <button type='submit'>login</button>
    </form>
  )
}

export default Login;
