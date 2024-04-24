import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const ADMIN_URL = '/api/admin';

interface LoginResponse {
 token: string;
 user: {
    id: string;
    name: string;
    role: string;
 };
}


export const adminApi = createApi({
 reducerPath: 'adminApi',
 baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
 endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `${ADMIN_URL}`,
        method: 'POST',
        body: credentials,
      }),
    }),
 }),
});

export const { useLoginMutation } = adminApi;
