import { RootState } from '@/app/store';
import { logout } from '@/stores/authSlice';

import {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import _ from 'lodash';

const ignoreTokenRoute = ['renewAuth'];

// create a new mutex
const mutex = new Mutex();

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_ENDPOINT,
  credentials: 'same-origin',
  prepareHeaders: (headers, { getState, endpoint }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = (getState() as RootState).auth.token;
    if (token && !_.includes(ignoreTokenRoute, endpoint)) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

//sample code for re auth if token expired
export async function reAuthenticate(
  { api, extraOptions }: { api: BaseQueryApi; extraOptions: object },
  cb: (res: unknown) => void,
) {
  const { getState } = api;

  const { refreshToken } = (getState() as RootState).auth;

  //re auth with refresh token
  const { data: renewAuthResponse } = await baseQuery(
    {
      body: {
        token: refreshToken,
      },
      method: 'post',
      url: '/authenticate/renew',
    },
    {
      ...api,
      endpoint: 'renewAuth',
    },
    extraOptions,
  );

  if (renewAuthResponse) {
    cb(renewAuthResponse);
    return true;
  }
  return false;
}

//If any api make 401 response , it will automatically logout or try to reauth by reAuthenticate
export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // const isAuthenticated = await reAuthenticate(
        //   { api, extraOptions },
        //   (res) => {
        //     api.dispatch(setAuthData((res as any)?.data));
        //   }
        // );
        const isReAuthSuccess = false;

        if (isReAuthSuccess) {
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
