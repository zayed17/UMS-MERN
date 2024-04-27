import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const ADMIN_URL = '/api/admin';

export const adminApi = createApi({
 reducerPath: 'adminApi',
 baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    credentials: 'include',
 }),
 endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `${ADMIN_URL}`,
        method: 'POST',
        body: credentials,
      }),
    }),
    auth: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/auth`,
        method: 'GET',
      }),
    }),
    getUser: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/dashboard`,
        method: 'GET',
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/updateuser`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${ADMIN_URL}/deleteUser/${id}`,
        method: 'DELETE',
      }),
    }),
    addUser: builder.mutation({
      query: (credentials) => ({
        url: `${ADMIN_URL}/adduser`,
        method: 'POST',
        body: credentials,
      }),
    }),
    searchUser: builder.mutation({
      query: (query) => ({
        url: `${ADMIN_URL}/dashboard?search=${query}`,
        method: "GET",
      }),
    }),
 }),
});

export const { useLoginMutation, useGetUserMutation, useUpdateUserMutation, useDeleteUserMutation ,useAddUserMutation,useAuthMutation , useSearchUserMutation} = adminApi;
