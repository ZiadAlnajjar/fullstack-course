import { Button as MButton } from '@material-tailwind/react';

const Button = ({ type = 'button', onClick, children, ...props }) => {
  const className = 'cursor-pointer ' + props.className;

  return (
    <MButton
      color='blue'
      type={type}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </MButton>
  );
};

export default Button;
