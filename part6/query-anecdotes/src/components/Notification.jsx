import { useNotificationValue } from '../NotificationContext';

const Notification = () => {
  const message = useNotificationValue()
  
  if (!message) return null

  return (
    <div style={style}>
      {message}
    </div>
  )
}

const style = {
  border: 'solid',
  padding: 10,
  borderWidth: 1,
  marginBottom: 5
}

export default Notification
