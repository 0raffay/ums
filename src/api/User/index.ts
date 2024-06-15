import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
  }),
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (userData) => ({
        url: "/users/add",
        method: "POST",
        body: userData,
      }),
    }),
    fetchUsers: builder.query({
      query: () => "/users",
    }),
  }),
});

export const { useFetchUsersQuery, useAddUserMutation } = userApi;

export const userSelector = () => userApi.endpoints.fetchUsers.select({});

