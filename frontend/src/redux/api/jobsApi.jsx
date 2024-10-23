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
      query: (params) => {
        console.log("🚀 ~ title:", params);
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
