import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_APP_API}/api/projects`,
    credentials: "include",
  }),
  tagTypes: ["Project", "Reviews"],
  endpoints: (builder) => ({
    createProjects: builder.mutation({
      query(body) {
        return {
          url: "/create",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Project"],
    }),
    updateProjects: builder.mutation({
      query({ body, id }) {
        return {
          url: `/update/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Project"],
    }),
    deleteProjects: builder.mutation({
      query({ id }) {
        return {
          url: `/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Project"],
    }),
    projectById: builder.query({
      query: ({ id }) => `/projectById/${id}`,
      providesTags: ["Project"],
    }),
    myProjects: builder.query({
      query: () => `/myProjects`,
      providesTags: ["Project"],
    }),
    projectsAll: builder.query({
      query: () => `/projectsAll`,
      providesTags: ["Project"],
    }),
    createProductReview: builder.mutation({
      query(body) {
        return {
          url: `/projectReview`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Project", "Reviews"],
    }),
    getProductReviews: builder.query({
      query: (projectId) => `/projectReview?id=${projectId}`,
      providesTags: ["Project", "Reviews"],
    }),
    deleteReviews: builder.mutation({
      query({ projectId, id }) {
        return {
          url: `/projectReview?projectId=${projectId}&id=${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Project", "Reviews"],
    }),
  }),
});

export const {
  useCreateProjectsMutation,
  useUpdateProjectsMutation,
  useDeleteProjectsMutation,
  useProjectByIdQuery,
  useMyProjectsQuery,
  useProjectsAllQuery,
  useCreateProductReviewMutation,
  useGetProductReviewsQuery,
  useDeleteReviewsMutation,
} = projectApi;
