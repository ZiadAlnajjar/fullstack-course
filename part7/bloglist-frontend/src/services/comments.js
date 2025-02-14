import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { api, useCachedGetQuery } from './api';

const endpoint = (id) => `/blogs/${id}/comments`;

export const commentsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getComments: build.query({
      query: (id) => endpoint(id),
      providesTags: (result, _error, id) =>
        [{ type: 'Comments', id }],
    }),
    addComment: build.mutation({
      query: ({ id, ...body }) => ({
        url: endpoint(id),
        method: 'POST',
        body,
      }),
      invalidatesTags: ({ blog }) => [{ type: 'Comments', id: blog }],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useLazyGetCommentQuery,
  useAddCommentMutation,
} = commentsApi;
