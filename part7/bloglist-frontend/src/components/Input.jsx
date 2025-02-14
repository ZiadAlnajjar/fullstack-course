import { Input as MIput, Typography } from '@material-tailwind/react';

const Input = ({ type = 'text', id, name, label, value, onChange, ...props }) => (
  <div>
    {label &&
      <Typography variant='h6' color='blue-gray' className='mb-1 capitalize'>
        {label}
      </Typography>
    }
    <MIput
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      labelProps={{
        className: 'before:content-none after:content-none',
      }}
      {...props}
    />
  </div>
);

export default Input;
