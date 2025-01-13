import axios, { AxiosError } from 'axios';
import { getTokenFromStorage } from './helpers';

const instance = axios.create({
  baseURL: '/api',
});

instance.interceptors.request.use(
  (config) => {
    if (config.withAuth) {
      const token = getTokenFromStorage();

      if (token) {
        config.headers.setAuthorization(`Bearer ${token}`);
      }
    }

    return config;
  });

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status, data } = error.response;
    const errorMsg = data.error ?? '';

    if(status === 401 && errorMsg === 'expired token') {
      localStorage.removeItem('user');
      window.alert('Your session has expired, The page will reload');
      window.location.reload();
      return;
    } else if (status === 401 && errorMsg === 'invalid username or password') {
      const err = new Error('Incorrect username or password');
      err.name = 'InvalidCredentialsError';
      return Promise.reject(err);
    } else if (status === 403) {
      const err = new Error('Permission denied');
      err.name = 'InsufficientPermissionsError';
      return Promise.reject(err);
    }

    return Promise.reject(error);
  });

export default instance;
