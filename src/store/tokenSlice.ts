import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { RootState } from 'store'

export interface tokenState {
  token: string | null
}

type SignUpBody = {
  email: string;
  password: string;
};

const initialState: tokenState = {
  token: null,
}

export const getToken = createAsyncThunk(
  'token/get',
  async (body: SignUpBody) => {
    const response = await axios.post("http://19429ba06ff2.vps.myjino.ru/api/signin", {
      body
    })
    console.log(response);

    return response.data;
  }
);

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getToken.fulfilled, (state, action) => {
      // Add user to the state array
      state.token = action.payload
    })
  },
})

export const { logout } = tokenSlice.actions

export const selectCurrentUser = (state: RootState) => state.tokenReducer.token


export default tokenSlice.reducer