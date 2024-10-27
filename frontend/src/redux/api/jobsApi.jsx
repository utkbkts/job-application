import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_APP_API}/api/jobs`,
    credentials: "include",
  }),
  tagTypes: ["apply"],
  endpoints: (builder) => ({
    getAllJobs: builder.query({
      query: (params) => {
        return {
          url: "/get/all",
          params: {
            page: params?.page,
            search: params?.search,
            location: params?.location,
            title: params?.title,
            companyName: params?.companyName,
            "salary[gte]": params?.min,
            "salary[lte]": params?.max,
            "ratings[eq]": params?.ratings,
          },
        };
      },
      providesTags: ["apply"],
    }),
    createJobs: builder.mutation({
      query(body) {
        return {
          url: "/create",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["apply"],
    }),
    getJobById: builder.query({
      query: ({ id }) => `/jobId/${id}`,
      providesTags: ["apply"],
    }),
    getMyAds: builder.query({
      query: () => `/myAds`,
      providesTags: ["apply"],
    }),
  }),
});

export const {
  useGetAllJobsQuery,
  useGetJobByIdQuery,
  useCreateJobsMutation,
  useGetMyAdsQuery,
} = jobsApi;
