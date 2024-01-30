import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'store';
import { getTokenAuth } from 'utils/other';

interface IResponse {
  id: string;
  name: string;
  email: string;
  signUpDate: Date;
}

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).tokenReducer?.token
      if (token) {
        headers.set("authorization", getTokenAuth(token))
      }
    },
  }),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getProfile: builder.query<IResponse, void>({
      query: () => 'profile',
      providesTags: ["Profile"],
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;
