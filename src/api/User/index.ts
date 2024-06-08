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
  }),
});

export const { useAddUserMutation } = userApi;
