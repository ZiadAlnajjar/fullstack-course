import axiosInstance from './axiosInstance';

const client = axiosInstance;

const api = {
  get: (url, config) => client.get(url, config),
  delete: (url, config) => client.delete(url, config),
  head: (url, config) => client.head(url, config),
  options: (url, config) => client.options(url, config),
  post: (url, data, config) => client.post(url, data, config),
  put: (url, data, config) => client.put(url, data, config),
  patch: (url, data, config) => client.patch(url, data, config),
};

export default api;
