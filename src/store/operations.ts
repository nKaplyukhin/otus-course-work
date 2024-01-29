import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IOperation } from 'interfaces/operation';
import { getTokenAuth } from 'utils/other';

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

export const operationsApi = createApi({
  reducerPath: 'operationsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API,
  }),
  tagTypes: ["Operations"],
  endpoints: (builder) => ({
    getOperations: builder.query<IResponse, string | void>({
      query: (token) => {
        if (token) {
          return {
            url: 'operations',
            headers: {
              authorization: getTokenAuth(token)
            }
          }
        }
        return {
          url: 'operations'
        }
      },
      providesTags: ["Operations"],
    }),
    getOperation: builder.query<IOperation, { id: string, token: string | void }>({
      query: ({ id, token }) => {
        if (token) {
          return {
            url: `operations/${id}`,
            headers: {
              authorization: getTokenAuth(token)
            }
          }
        }
        return {
          url: `operations/${id}`
        }
      },
      providesTags: ["Operations"],
    }),
  }),
});

export const { useGetOperationsQuery, useGetOperationQuery } = operationsApi;
