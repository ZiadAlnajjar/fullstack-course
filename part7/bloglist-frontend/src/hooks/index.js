import { useEffect, useMemo, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useNavigate } from 'react-router-dom';
import {
  selectAuth,
  verifyStorageToken
} from '../reducers/authSlice';
import { navigate } from 'jsdom/lib/jsdom/living/window/navigation';

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


export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, attemptedStorageAuth } = useSelector(selectAuth);
  const loginMatch = useMatch('/login');

  useEffect(() => {
    if (!isAuthenticated) {
      if (!attemptedStorageAuth) {
        dispatch(verifyStorageToken());
      } else {
        navigate('/login');
      }
    }

    if (loginMatch && isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, attemptedStorageAuth, loginMatch, dispatch, navigate]);

  return { isAuthenticated };
};
