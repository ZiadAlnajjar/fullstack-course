import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { api } from './api';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      extraOptions: {
        backoff: () => {
          retry.fail();
        },
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
