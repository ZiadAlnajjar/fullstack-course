import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { api, useCachedGetQuery } from './api';

const endpoint = '/blogs';

const onQueryStarted = ({
  onCatch = 'invalidateCache', // or undo
  cacheToInvalidate = invalidateBlog,
  isDelete = false,
} = {}) =>
  async (args, { dispatch, queryFulfilled, getCacheEntry }) => {
    const { id = args } = args;

    let blogPatchResult;
    let blogsPatchResult;

    try {
      await queryFulfilled;
      const updatedData = isDelete || (await dispatch(
        api.endpoints.getBlog.initiate(id, { forceRefetch: true })
      )).data;

      blogPatchResult = dispatch(
        api.util.updateQueryData('getBlog', id, (draft) => {
          if(isDelete) {
            Object.keys(draft).forEach((key) => delete draft[key]);
          } else {
            Object.assign(draft, updatedData);
          }
        }),
      );

      blogsPatchResult = dispatch(
        api.util.updateQueryData('getBlogs', undefined, (draft) => {
          const index = draft.findIndex(blog => blog.id === id);

          if (index !== -1) {
            if (isDelete) {
              draft.splice(index, 1);
            } else {
              draft[index] = updatedData;
              draft = [...draft];
            }
          }
        }),
      );
    } catch(e) {
      if (onCatch === 'invalidateCache') {
        dispatch(api.util.invalidateTags(cacheToInvalidate(id)));
      } else {
        blogPatchResult.undo();
        blogsPatchResult.undo();
      }
    }
  };

const invalidateBlog = (id) => [{ type: 'Blogs', id }];

export const blogsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBlogs: build.query({
      query: () => endpoint,
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'Blogs', id })),
        { type: 'Blogs', id: 'LIST' },
      ],
    }),
    addBlog: build.mutation({
      query: (blog) => ({
        url: endpoint,
        method: 'POST',
        body: blog,
      }),
      invalidatesTags: [{ type: 'Blogs', id: 'LIST' }],
    }),
    getBlog: build.query({
      query: (id) => `${endpoint}/${id}`,
      providesTags: (_blog, _err, id) => [{ type: 'Blogs', id }],
    }),
    updateBlog: build.mutation({
      query: ({ id, ...blog }) => ({
        url: `${endpoint}/${id}`,
        method: 'PUT',
        body: blog,
      }),
      onQueryStarted: onQueryStarted(),
    }),
    deleteBlog: build.mutation({
      query: (id) => ({
        url: `${endpoint}/${id}`,
        method: 'DELETE',
      }),
      onQueryStarted: onQueryStarted({ isDelete: true }),
    }),
    likeBlog: build.mutation({
      query: (id) => ({
        url: `${endpoint}/${id}/like`,
        method: 'PATCH',
      }),
      onQueryStarted: onQueryStarted()
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useAddBlogMutation,
  useGetBlogQuery,
  useLazyGetBlogQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useLikeBlogMutation,
} = blogsApi;

export const useCachedGetBlogQuery = (id) =>
  useCachedGetQuery(id, 'getBlogs', useLazyGetBlogQuery);
