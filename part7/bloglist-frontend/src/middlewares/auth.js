import { logout } from '../reducers/authSlice';
import { jwtDecode } from 'jwt-decode';

const authMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  const token = state.auth.token;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        store.dispatch(logout());
      }
    } catch (error) {
      store.dispatch(logout());
    }
  }

  return next(action);
};

export default authMiddleware;
