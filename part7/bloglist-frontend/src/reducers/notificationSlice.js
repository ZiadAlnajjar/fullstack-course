import { createSlice } from '@reduxjs/toolkit';

const initialState = ['', ''];

let displayTimer;

export const notify = (message, severity = '', duration = 5) => (dispatch) => {
  dispatch(setNotification([message, severity]));
  clearTimeout(displayTimer);
  displayTimer = setTimeout(() => {
    dispatch(clearNotification());
  }, duration * 1000);
};

export const notifyError = (message, duration = 5) =>
  notify(message, 'error', duration = 5);

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return initialState;
    },
  },
  selectors: {
    selectNotification: state => state,
  }
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export const { selectNotification } = notificationSlice.selectors;

export default notificationSlice.reducer;
