import api from '../utils/api';
import { withAuth } from '../utils/helpers';

const endpoint = '/blogs';

const getAll = async () => {
  const response = await api.get(endpoint);

  return response.data;
};

const create = async (newObject) => {
  const response = await api.post(endpoint, newObject, withAuth);

  return response.data;
};

const update = async (id, newObject) => {
  const response = await api.put(`${endpoint}/${id}`, newObject, withAuth);

  return response.data;
};

const remove = async (id) => {
  const response = await api.delete(`${endpoint}/${id}`, withAuth);

  return response.data;
};

export default {
  getAll,
  create,
  update,
  remove,
};
