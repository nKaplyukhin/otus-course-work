import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IOperation } from 'interfaces/operation';

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

function defaultTransformResponse(baseQueryReturnValue: IResponse) {
  return baseQueryReturnValue;
}

export const operationsApi = createApi({
  reducerPath: 'operationsApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.API }),
  endpoints: (builder) => ({
    getOperations: builder.query<IResponse, void>({
      query: () => 'operations',
    }),
  }),
});

export const { useGetOperationsQuery } = operationsApi;
