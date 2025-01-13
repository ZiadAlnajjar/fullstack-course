export const wait = (sec) => new Promise((resolve) => setTimeout(resolve, sec * 1000));

export const waitSync = (callback, sec) => setTimeout(callback, sec * 1000);

export const handleChange = (setState) => ({ target }) => setState(target.value);

export const resetState = (setState, value = null) => setState(value);

export const resetStrState = (setState, value = '') => resetState(setState, value);

export const resetIntState = (setState, value = 0) => resetState(setState, value);

export const resetArrState = (setState, value = []) => resetState(setState, value);

export const getTokenFromStorage = () => {
  const loggedUserJSON = window.localStorage.getItem('user');

  if(!loggedUserJSON) {
    return null;
  }

  const loggedUser = JSON.parse(loggedUserJSON);
  return loggedUser.token;
};

export const withAuth = { withAuth: true };

export default {
  wait,
  waitSync,
  handleChange,
  resetState,
  resetIntState,
  resetStrState,
  resetArrState,
  getTokenFromStorage,
  withAuth,
};
