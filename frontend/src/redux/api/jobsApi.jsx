import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_APP_API}/api/jobs`,
    credentials: "include",
  }),
  tagTypes: ["User", "Apply"],
  endpoints: (builder) => ({
    getAllJobs: builder.query({
      query: () => "/get/all",
    }),
    createJobs: builder.mutation({
      query(body) {
        return {
          url: "/create",
          method: "POST",
          body,
        };
      },
    }),
    getJobById: builder.query({
      query: ({ id }) => `/jobId/${id}`,
      providesTags: ["Apply", "User"],
    }),
    getAdminJobs: builder.query({
      query: () => "/get/adminId",
    }),
  }),
});

export const {
  useGetAllJobsQuery,
  useGetAdminJobsQuery,
  useGetJobByIdQuery,
  useCreateJobsMutation,
} = jobsApi;
