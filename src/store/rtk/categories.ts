import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICategory } from 'interfaces/category';
import { ICustomizedFetchBaseQueryError } from 'interfaces/server';
import { ISorting } from 'interfaces/sorting';
import { getHeadersWithAuthToken } from 'utils/other';

interface IResponse {
  data: ICategory[];
  pagination: {
    pageSize: number;
    pageNumber: number;
    total: number;
  };
}

interface ICategoryQuery {
  token?: string;
  sorting?: ISorting;
}

interface IDeleteResponse {
  token?: string;
  id: string;
}

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: <BaseQueryFn<string | FetchArgs, unknown, ICustomizedFetchBaseQueryError, object>>fetchBaseQuery({
    baseUrl: process.env.API,
  }),
  tagTypes: ['Categories'],
  endpoints: (builder) => ({
    getCategories: builder.query<IResponse, ICategoryQuery>({
      query: ({ token, sorting }) => {
        const params = {
          sorting: JSON.stringify(sorting),
        };
        return {
          url: 'categories',
          params,
          ...getHeadersWithAuthToken(token),
        };
      },
      providesTags: ['Categories'],
    }),

    getCategory: builder.query<ICategory, { id: string | null; token: string | undefined }>({
      query: ({ id, token }) => ({
        url: `categories/${id}`,
        ...getHeadersWithAuthToken(token),
      }),
    }),

    addCategory: builder.mutation({
      query: ({ body, token }) => ({
        url: 'categories',
        method: 'POST',
        ...getHeadersWithAuthToken(token),
        body,
      }),
      invalidatesTags: ['Categories'],
    }),

    updateCategory: builder.mutation({
      query: ({ body, id, token }) => ({
        url: `categories/${id}`,
        method: 'PUT',
        ...getHeadersWithAuthToken(token),
        body,
      }),
      invalidatesTags: ['Categories'],
    }),

    deleteCategory: builder.mutation<ICategory, IDeleteResponse>({
      query: ({ id, token }) => ({
        url: `categories/${id}`,
        method: 'DELETE',
        ...getHeadersWithAuthToken(token),
      }),
      invalidatesTags: ['Categories'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} = categoriesApi;
