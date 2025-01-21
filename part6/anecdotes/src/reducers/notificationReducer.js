import { createSlice } from '@reduxjs/toolkit';

const initialState = null

let displayTimer;

export const displayNotification = (content, duration = 5) => (dispatch) => {
  dispatch(setNotification(content));
  clearTimeout(displayTimer);
  displayTimer = setTimeout(() => {
    dispatch(clearNotification());
  }, duration * 1000);
};

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return '';
    },
  },
});

export const { setNotification, clearNotification } = notificationReducer.actions;

export default notificationReducer.reducer;
