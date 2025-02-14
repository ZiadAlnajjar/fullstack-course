import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationSlice';
import authReducer from './reducers/authSlice';

import { api } from './services/api';
import authMiddleware from './middlewares/auth';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, authMiddleware),
});

export default store;
