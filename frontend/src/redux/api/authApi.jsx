import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApi } from "./userApi";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_APP_API}/api/auth`,
    credentials: "include",
  }),
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query(body) {
        return {
          url: "/register",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["auth"],
    }),
    login: builder.mutation({
      query(body) {
        return {
          url: "/login",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["auth"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getUser.initiate());
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApi;
