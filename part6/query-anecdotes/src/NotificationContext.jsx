import { createContext, useContext, useReducer } from 'react';

const displayDuration = 5;
let displayTimer;

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "CLEAR":
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export const useNotification = () => {
  const dispatch = useNotificationDispatch();
  
  return (content, duration = displayDuration) => {
    dispatch({ type: 'SET', payload: content });
    clearTimeout(displayTimer);
    displayTimer = setTimeout(() => {
      dispatch({ type: 'CLEAR' });
    }, duration * 1000);
  };
}

export const NotificationContextProvider = (props) => {
  const [counter, counterDispatch] = useReducer(notificationReducer, 0)
  
  return (
    <NotificationContext.Provider value={[counter, counterDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
