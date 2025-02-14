import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../services/auth';
import { jwtDecode } from 'jwt-decode';

let timeout;

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  attemptedStorageAuth: false,
  expiresIn: 0,
};

const updateState = (state, data) => {
  const { user, token } = data;
  const { attemptedStorageAuth } = state;

  try {
    const decodedToken = jwtDecode(token);
    window.localStorage.setItem('user', JSON.stringify(data));
    return {
      user,
      token,
      isAuthenticated: true,
      attemptedStorageAuth,
      expiresIn: (decodedToken.exp * 1000) - Date.now(),
    };
  } catch {
    return initialState;
  }
};

const getUserFromStorage = () => {
  const jsonUserData = window.localStorage.getItem('user');

  if(!jsonUserData) {
    return null;
  }

  try {
    return JSON.parse(jsonUserData);
  } catch {
    return null;
  }
};

const isTokenExp = (token) => {
  try {
    const { exp } = jwtDecode(token);

    if(exp) {
      if (exp * 1000 < Date.now()) {
        return true;
      }

      return false;
    }
  } catch {
    return true;
  }
};

const logoutOnExp = (state) => (dispatch) => {
  const expiresIn = (state.expiresIn * 1000) - Date.now();
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    dispatch(logout());
  }, expiresIn * 1000);
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    verifyStorageToken: (state, action) => {
      const userData = getUserFromStorage();
      if(!userData) {
        return {
          ...initialState,
          attemptedStorageAuth: true,
        };
      }

      if (isTokenExp(userData.token)) {
        localStorage.removeItem('user');
        return {
          ...initialState,
          attemptedStorageAuth: true,
        };
      }

      return {
        ...updateState(state, userData),
        attemptedStorageAuth: true,
      };
    },
    logout: (state, action) => {
      const { attemptedStorageAuth } = state;
      window.localStorage.removeItem('user');
      return {
        ...initialState,
        attemptedStorageAuth,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyStorageToken, (state, action) => {
        logoutOnExp(state);
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        logoutOnExp(state);
        return updateState(state, action.payload);
      });
  },
  selectors: {
    selectAuth: (state) => state,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectUser: (state) => state.user,
  }
});

export const { verifyStorageToken, logout } = slice.actions;
export const { selectAuth, selectIsAuthenticated, selectUser } = slice.selectors;

export default slice.reducer;
