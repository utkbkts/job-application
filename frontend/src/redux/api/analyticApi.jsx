import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const analyticApi = createApi({
  reducerPath: "analyticApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_APP_API}/api/analytic`,
    credentials: "include",
  }),
  tagTypes: ["Analytic"],
  endpoints: (builder) => ({
    topReviews: builder.query({
      query: () => "/topReviews",
      providesTags: ["Analytic"],
    }),
  }),
});

export const { useTopReviewsQuery } = analyticApi;
