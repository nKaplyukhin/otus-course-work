import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IOperation } from 'interfaces/operation';
import { ICustomizedFetchBaseQueryError } from 'interfaces/server';
import { ISorting } from 'interfaces/sorting';
import { getHeadersWithAuthToken } from 'utils/other';

interface IResponse {
  data: IOperation[];
  pagination: {
    pageSize: number;
    pageNumber: number;
    total: number;
  };
}

interface IOperationQuery {
  token?: string;
  sorting?: ISorting;
}

interface IDeleteResponse {
  token?: string;
  id: string;
}

export const operationsApi = createApi({
  reducerPath: 'operationsApi',
  baseQuery: <BaseQueryFn<string | FetchArgs, unknown, ICustomizedFetchBaseQueryError, object>>fetchBaseQuery({
    baseUrl: process.env.API,
  }),
  tagTypes: ['Operations'],
  endpoints: (builder) => ({
    getOperations: builder.query<IResponse, IOperationQuery>({
      query: ({ sorting, token }) => {
        const params = {
          sorting: JSON.stringify(sorting),
        };
        return {
          url: 'operations',
          ...getHeadersWithAuthToken(token),
          params,
        };
      },
      providesTags: ['Operations'],
    }),

    getOperation: builder.query<IOperation, { id: string | null; token: string | undefined }>({
      query: ({ id, token }) => ({
        url: `operations/${id}`,
        ...getHeadersWithAuthToken(token),
      }),
      providesTags: ['Operations'],
    }),

    addOperation: builder.mutation({
      query: ({ body, token }) => ({
        url: 'operations',
        method: 'POST',
        ...getHeadersWithAuthToken(token),
        body: { ...body, date: new Date().toISOString() },
      }),
      invalidatesTags: ['Operations'],
    }),

    updateOperation: builder.mutation({
      query: ({ body, id, token }) => ({
        url: `operations/${id}`,
        method: 'PUT',
        ...getHeadersWithAuthToken(token),
        body,
      }),
      invalidatesTags: ['Operations'],
    }),

    deleteOperation: builder.mutation<IOperation, IDeleteResponse>({
      query: ({ id, token }) => ({
        url: `operations/${id}`,
        method: 'DELETE',
        ...getHeadersWithAuthToken(token),
      }),
      invalidatesTags: ['Operations'],
    }),
  }),
});

export const {
  useGetOperationsQuery,
  useGetOperationQuery,
  useAddOperationMutation,
  useDeleteOperationMutation,
  useUpdateOperationMutation,
} = operationsApi;
