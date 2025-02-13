import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://study-buddy-flsu.onrender.com/api/v1';

const baseQuery = fetchBaseQuery({
  baseUrl,
  // credentials: 'include', // used for including cookies (if we use refresh tokens)
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = getState().persistedReducer.auth.access_token;

    // Add endpoints to be avoided
    const publicEndpoints = ['loginUser', 'registerUser'];

    // Conditionally add the Authorization header for authenticated endpoints
    if (token && !publicEndpoints.includes(endpoint)) {
        headers.set('authorization', `Bearer ${token}`);
      }
    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Check if the response returned a 401 Unauthorized error
  if (result.error && result.error.status === 401) {
    const state = api.getState();
    const refreshToken = state.auth.refresh_token;

    // If there is no refresh token, log the user out and return the original result
    if (!refreshToken) {
      api.dispatch(logOut());
      console.log(result);
      return result;
    }

    // Try refreshing the access token
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh-token",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions
    );

    // If the refresh request succeeds, update the access token and retry the original request
    if (refreshResult.data) {
      const accessToken = refreshResult.data.access_token;

      console.log("Access token updated: " + accessToken);
      api.dispatch(updateToken({ access_token: accessToken }));

      // Retry the original request with the new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // If refresh fails, log the user out
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({}),
});