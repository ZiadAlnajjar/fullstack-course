import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { api, useCachedGetQuery } from './api';

const endpoint = '/users';

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => endpoint,
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'Users', id })),
        { type: 'Users', id: 'LIST' },
      ],
    }),
    getUser: build.query({
      query: (id) => `${endpoint}/${id}`,
      providesTags: (_user, _err, id) => [{ type: 'Users', id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useLazyGetUserQuery,
} = usersApi;

export const useCachedGetUserQuery = (id) =>
  useCachedGetQuery(id, 'getUsers', useLazyGetUserQuery);
