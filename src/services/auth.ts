import baseApi from '@/app/baseApi';
import { setAuthData } from '@/stores/authSlice';
import { BaseResponse } from '@/types/BaseResponse';
import { LoginInput, User } from '@/types/User';

interface LoginResponse extends BaseResponse {
  user: Partial<User>;
  refreshToken: string;
  token: string;
}

// Define a service using a base URL and expected endpoints
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //login endpoint
    login: builder.mutation<LoginResponse, LoginInput>({
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data: loginResponse } = await queryFulfilled;
        if (loginResponse) {
          dispatch(setAuthData(loginResponse));
        }
      },
      query: ({ email, password }) => ({
        body: {
          password,
          email,
        },
        method: 'post',
        url: '/authenticate',
      }),
    }),

    //get User by token
    me: builder.query<{ data: Partial<User> }, void>({
      query: () => ({
        method: 'get',
        url: '/users/me',
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation } = authApi;
