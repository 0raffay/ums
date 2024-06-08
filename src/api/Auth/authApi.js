import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "book",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.BASE_URL,
  }),
  endpoints: (builder) => {
    return {
      login: builder.mutation({
        query: (userData) => {
          return {
            method: "POST",
            url: "/auth/login",
            body: JSON.stringify({ userData }),
          };
        },
      }),
    };
  },
});
