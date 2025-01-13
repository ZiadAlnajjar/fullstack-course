import api from '../utils/api';

const endpoint = '/login';

const login = async (credentials) => {
  const response = await api.post(endpoint, credentials);

  return response.data;
};

export default { login };
