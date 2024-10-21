import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_REACT_APP_API}/api/company`,
    credentials: "include",
  }),
  tagTypes: ["Company"],
  endpoints: (builder) => ({
    companyCreate: builder.mutation({
      query(body) {
        return {
          url: `/create`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Company"],
    }),
    getCompany: builder.query({
      query: () => "/get",
      providesTags: ["Company"],
    }),
    getAllCompany: builder.query({
      query: () => "/getAll",
      providesTags: ["Company"],
    }),
    getByIdCompany: builder.query({
      query: ({ id }) => `/get/${id}`,
      providesTags: ["Company"],
    }),
    updateCompany: builder.mutation({
      query({ body, id }) {
        return {
          url: `/update/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Company"],
    }),
    deleteCompany: builder.mutation({
      query({ body, id }) {
        return {
          url: `/delete/${id}`,
          method: "DELETE",
          body,
        };
      },
      invalidatesTags: ["Company"],
    }),
  }),
});
export const {
  useCompanyCreateMutation,
  useGetCompanyQuery,
  useGetByIdCompanyQuery,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
  useGetAllCompanyQuery,
} = companyApi;
