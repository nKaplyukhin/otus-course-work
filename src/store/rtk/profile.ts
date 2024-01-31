import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProfileData } from 'interfaces/profile';
import { RootState } from 'store/store';
import { getTokenAuth } from 'utils/other';

interface IChangePasswordBody {
  password: string;
  newPassword: string;
};

interface IResponseChangePassword {
  success: boolean
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
    getProfile: builder.query<IProfileData, void>({
      query: () => 'profile',
      providesTags: ["Profile"],
    }),
    changePassword: builder.mutation<IResponseChangePassword, IChangePasswordBody>({
      query: (body) => ({ url: `/profile/change-password`, method: 'POST', body }),
    }),
    changeProfileData: builder.mutation<IProfileData, Partial<IProfileData>>({
      query: (body) => ({ url: `/profile`, method: 'POST', body }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const { useGetProfileQuery, useChangePasswordMutation, useChangeProfileDataMutation } = profileApi;
