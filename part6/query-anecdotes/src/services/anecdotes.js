import axios from 'axios';

const baseUrl = '/api/anecdotes';

const index = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (content) => {
  const obj = { content, votes: 0 };
  const response = await axios.post(baseUrl, obj);
  return response.data;
};

const update = async ({ id, obj }) => {
  const response = await axios.put(`${baseUrl}/${id}`, obj);
  return response.data;
};

export default {
  index,
  create,
  update,
};
