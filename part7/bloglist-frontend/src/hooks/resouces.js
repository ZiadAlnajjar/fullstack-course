import api from '../utils/api';
import { withAuth } from '../utils/helpers';
import { useField } from './index';
import { useCallback, useEffect, useState } from 'react';

const initConfig = {
  getAll: null,
  create: { ...withAuth },
  update: { ...withAuth },
  remove: { ...withAuth },
};

export const useResource = (endpoint = '', config = initConfig) => {
  const [resource, setResource] = useState([]);

  const getAll = useCallback(async () => {
    const response = await api.get(endpoint, config.getAll);
    setResource(response.data);
  }, [endpoint, config.getAll]);

  const create = useCallback(async (newObject) => {
    const response = await api.post(endpoint, newObject, config.create);
    setResource(...resource, response.data);
  }, [endpoint, config.create, resource]);

  const update = useCallback(async (id, newObject) => {
    const response = await api.put(`${endpoint}/${id}`, newObject, config.update);
    setResource(resource.map((entry) => entry.id === id ? response.data : entry));
  }, [endpoint, config.update, resource]);

  const remove = useCallback(async (id) => {
    const response = await api.delete(`${endpoint}/${id}`, config.remove);
    setResource(resource.filter(entry => entry.id !== id));
  }, [endpoint, config.remove, resource]);

  useEffect(() => {
    getAll();
  }, [getAll]);

  const service = {
    getAll,
    create,
    update,
    remove,
  };

  return [resource, service];
};

export const useBlog = () => useResource('/blogs');
