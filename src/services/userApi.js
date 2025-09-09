import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL, 
    credentials: 'include',
  }),
  // refetchOnFocus:true,
  endpoints: (builder) => ({
    getTopReviewers: builder.query({
      query: (params) => ({
        url: '/api/v1/users/top-reviewers',
        method: 'GET',
        params
      }),
    }),
    getPublicProfile: builder.query({
      query: (username) => ({
        url: `/api/v1/users/public-profile/${username}`,
        method: 'GET',
      }),
    }),
    getPrivateProfile: builder.query({
      query: (username) => ({
        url: `/api/v1/users/${username}`,
        method: 'GET'
      })
    }),
    getAvatars: builder.query({
      query: () => ({
        url: '/api/v1/users/getAvatars',
        method: 'GET'
      })
    }),
    updateMe: builder.mutation({
      query: (body) => ({
        url: '/api/v1/users/update-me',
        method: 'PATCH',
        body
      })
    }),
    updatePassword: builder.mutation({
      query: (body) => ({
        url: '/api/v1/users/update-password',
        method: 'PATCH',
        body
      })
    }),
    deleteMe: builder.mutation({
      query: () => ({
        url: '/api/v1/users/delete-me',
        method: 'DELETE',
      })
    })
  })
});

export const {
  useGetTopReviewersQuery,
  useGetPublicProfileQuery,
  useGetPrivateProfileQuery,
  useGetAvatarsQuery,
  useUpdateMeMutation,
  useUpdatePasswordMutation,
  useDeleteMeMutation
} = userApi;
