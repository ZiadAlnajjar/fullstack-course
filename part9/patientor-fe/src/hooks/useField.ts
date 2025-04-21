import { useState, HTMLInputTypeAttribute } from 'react';
import { OnChangeEvent } from "../types.ts";

type FieldProps<T> = {
  type: HTMLInputTypeAttribute;
  value: T;
  onChange: (event: OnChangeEvent) => void;
};

type UseField<T> = [FieldProps<T>, () => void];

function useField<T extends string = string>(
  type: HTMLInputTypeAttribute = 'text',
  defaultValue?: T
): UseField<T> {
  const actualDefault = defaultValue ?? ('' as T);
  const [value, setValue] = useState<T>(actualDefault);

  const onChange = (event: OnChangeEvent) => {
    setValue(event.target.value as T);
  };

  const field: FieldProps<T> = {
    type,
    value,
    onChange,
  };

  const reset = () => {
    setValue(actualDefault);
  };

  return [field, reset];
}

export default useField;
