import { useState } from 'react';

export const useField = (type = 'text') => {
  const [value, setValue] = useState('');
  
  const onChange = (e) => {
    setValue(e.target.value);
  };
  
  const field = {
    type,
    value,
    onChange,
  };
  
  const reset = () => {
    setValue('');
  };
  
  return [field, reset];
};
