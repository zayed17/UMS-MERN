import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const ADMIN_URL = '/api/admin';

// interface LoginResponse {
//  token: string;
//  user: {
//     id: string;
//     name: string;
//     role: string;
//  };
// }


export const adminApi = createApi({
 reducerPath: 'adminApi',
 baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
 endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `${ADMIN_URL}`,
        method: 'POST',
        body: credentials,
      })
    }),
    getUser:builder.mutation({
      query:()=>({
       url: `${ADMIN_URL}/dashboard`,
       method: 'GET',
      })
    }),
    updateUser:builder.mutation({
      query:(data)=>({
        url:`${ADMIN_URL}/updateuser`,
        method:'PUT',
        body: data,
      })
    }),
    deleteUser:builder.mutation({
      query:(id)=>({
        url:`${ADMIN_URL}/deleteUser/${id}`,
        method:'DELETE',
      })
    })
 }),
});

export const { useLoginMutation, useGetUserMutation ,useUpdateUserMutation ,useDeleteUserMutation} = adminApi;
