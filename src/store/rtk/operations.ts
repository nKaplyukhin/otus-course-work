import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IOperation } from 'interfaces/operation';
import { getHeadersWithAuthToken } from 'utils/other';

interface IResponse {
  data: IOperation[];
  pagination: {
    pageSize: number;
    pageNumber: number;
    total: number;
  };
  sorting: {
    type: 'ASC' | 'DESC';
    field: 'id' | 'createdAt' | 'updatedAt' | 'name';
  };
}

interface IOperationQuery {
  token?: string;
  pageSize: number
}

export const operationsApi = createApi({
  reducerPath: 'operationsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API,
  }),
  tagTypes: ["Operations"],
  endpoints: (builder) => ({
    getOperations: builder.query<IResponse, IOperationQuery>({
      query: ({ pageSize, token }) => {
        const params = {
          pagination: JSON.stringify({
            pageSize,
          })
        }
        return {
          url: 'operations',
          ...getHeadersWithAuthToken(token),
          params,
        }
      },
      providesTags: (result) =>
        result
          ? [
            ...result.data.map(({ id }) => ({ type: 'Operations' as const, id })),
            { type: 'Operations', id: 'LIST' },
          ]
          : [{ type: 'Operations', id: 'LIST' }],
    }),
    getOperation: builder.query<IOperation, { id: string, token: string | undefined }>({
      query: ({ id, token }) => ({
        url: `operations/${id}`,
        ...getHeadersWithAuthToken(token)
      }),
      providesTags: (_result, _error, { id }) => [{ type: 'Operations', id }],
    }),
  }),
});

export const { useGetOperationsQuery, useGetOperationQuery } = operationsApi;
