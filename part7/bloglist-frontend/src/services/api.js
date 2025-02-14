import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { notifyError } from '../reducers/notificationSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithErrorHandling = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const { status, data } = result.error;
    const error = data.error;

    if (status === 401 && error === 'invalid username or password') {
      api.dispatch(notifyError('Incorrect username or password'));
    } else if (status === 401 && error === 'invalid or missing token') {
      api.dispatch(notifyError('You must be logged-in to do this action'));
    } else if (status === 403) {
      api.dispatch(notifyError('Insufficient permissions'));
    } else {
      api.dispatch(notifyError('Something went wrong, please try again later'));
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['Blogs', 'Users', 'Comments'],
  keepUnusedDataFor: 1 * 60 * 60,
  endpoints: () => ({}),
});

export const useCachedGetQuery = (id, endpoint, useLazyGetQuery) => {
  const result = api.endpoints[endpoint].useQueryState(undefined, {
    selectFromResult: (queryResult) => ({
      ...queryResult,
      data: queryResult.data?.find((resource) => resource.id === id),
    }),
  });

  const [trigger, lazyQueryResult] = useLazyGetQuery();

  if (!id) {
    return {};
  }

  if (!result.data && lazyQueryResult.isUninitialized) {
    trigger(id, true);
  }

  return result.data
    ? result
    : lazyQueryResult;
};
