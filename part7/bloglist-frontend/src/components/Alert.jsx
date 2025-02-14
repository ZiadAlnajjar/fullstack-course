import { selectNotification } from '../reducers/notificationSlice';
import { useSelector } from 'react-redux';
import { Alert as MAlert } from '@material-tailwind/react';
import InfoIcon from './Icons/InfoIcon';
import WarningIcon from './Icons/WarningIcon';


const Alert = () => {
  const [message, severity] = useSelector(selectNotification);
  let color;
  let icon;

  switch (severity) {
  case 'success':
    color = 'green';
    icon = <InfoIcon />;
    break;
  case 'error':
    color = 'red';
    icon = <WarningIcon />;
    break;
  default:
    color = 'blue';
    icon = <InfoIcon />;
  }

  if (!message) {
    return null;
  }

  return (
    <MAlert color={color} icon={icon} className='alert w-fit absolute-centerX mt-4 z-50'>
      <p>{message}</p>
    </MAlert>
  );
};

export default Alert;
