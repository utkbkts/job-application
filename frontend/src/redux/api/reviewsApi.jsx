import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_APP_API}/api/reviews`,
    credentials: "include",
  }),
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    createReviews: builder.mutation({
      query(body) {
        return {
          url: "/create",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Reviews"],
    }),
    getReviews: builder.query({
      query: ({ jobId }) => `/getReviews?jobId=${jobId}`,
      providesTags: ["Reviews"],
    }),
    deleteReviews: builder.mutation({
      query({ jobId, id }) {
        return {
          url: `/delete/reviews?jobId=${jobId}&id=${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Reviews"],
    }),
  }),
});

export const {
  useCreateReviewsMutation,
  useGetReviewsQuery,
  useDeleteReviewsMutation,
} = reviewsApi;
