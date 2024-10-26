import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const applicationApi = createApi({
  reducerPath: "applicationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_APP_API}/api/application`,
    credentials: "include",
  }),
  tagTypes: ["Apply"],
  endpoints: (builder) => ({
    apply: builder.mutation({
      query({ body, id }) {
        return {
          url: `/apply/${id}`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Apply"],
    }),
    getUserJobs: builder.query({
      query: () => "/get/userjobs",
      providesTags: ["Apply"],
    }),
    getApplicationAds: builder.query({
      query: ({ id }) => `/get/userjobsdetail/${id}`,
      providesTags: ["Apply"],
    }),

    updatePost: builder.mutation({
      query({ body, id }) {
        return {
          url: `/update/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Apply"],
    }),
  }),
});
export const {
  useApplyMutation,
  useGetUserJobsQuery,
  useUpdatePostMutation,
  useGetApplicationAdsQuery,
} = applicationApi;
