import baseApi from '@/app/baseApi';
import { BaseResponse } from '@/types/BaseResponse';
import { User, UserInput } from '@/types/User';

// Define a service using a base URL and expected endpoints
export const UserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation<{ data: User }, UserInput>({
      invalidatesTags: ['User'],
      query: (body) => ({
        body,
        method: 'POST',
        url: '/users',
      }),
    }),
    deleteUser: builder.mutation<void, User['id']>({
      invalidatesTags: ['User'],
      query: (id) => ({
        method: 'DELETE',
        url: `/users/${id}`,
      }),
    }),
    getUsers: builder.query<User[], void>({
      providesTags: (result) => {
        if (result) {
          console.log(result);
          return [
            ...result.map(({ id }) => ({ id, type: 'User' }) as const),
            { id: 'LIST', type: 'User' as const },
          ];
        } else {
          return [];
        }
      },
      query: () => ({
        method: 'GET',
        url: '/users',
      }),
    }),
    updateUser: builder.mutation<{ data: User }, UserInput & { id: number }>({
      invalidatesTags: ['User'],
      query: ({ id, ...body }) => ({
        body,
        method: 'PUT',
        url: `/users/${id}`,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = UserApi;
