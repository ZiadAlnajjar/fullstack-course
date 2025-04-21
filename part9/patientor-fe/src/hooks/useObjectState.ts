import { ChangeEvent, useCallback, useRef, useState } from "react";
import { OnChangeEvent } from "../types.ts";

type SetPartial<T> = {
    (patch: Partial<T>): void;
    <K extends keyof T>(patch: Partial<T[K]>, key: K): void;
};

export type UseObjectStateReturn<T> = {
    state: T;
    set: SetPartial<T>;
    reset: () => void;
    onChange: <K extends keyof T>(key: K) => (e: OnChangeEvent) => void;
};

export function useObjectState<T extends object>(initialState: T) {
  const [state, setState] = useState<T>(initialState);
  const initialRef = useRef(initialState);

  const setPartial: SetPartial<T> = useCallback((patch: Partial<T>, key?: keyof T) => {
    setState(prev => {
      if (key) {
        return {
          ...prev,
          [key]: {
            ...prev[key],
            ...patch,
          },
        };
      } else {
        return {
          ...prev,
          ...patch,
        };
      }
    });
  }, []);


  const reset = useCallback(() => {
    setState(initialRef.current);
  }, []);

  const onChange = useCallback(<K extends keyof T>(key: K) =>
    (e: OnChangeEvent) => {
      const value = (e as ChangeEvent<HTMLInputElement>).target.type === 'number' ? +e.target.value : e.target.value;
      setState(prev => ({
        ...prev,
        [key]: value,
      }));
    }, []);

  return {
    state,
    set: setPartial,
    reset,
    onChange,
  };
}

export default useObjectState;
