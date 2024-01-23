import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { RootState } from 'store';

export interface tokenState {
  token: string | null;
  loading: boolean
  error?: string
}

type SignUpBody = {
  email: string;
  password: string;
};

const initialState: tokenState = {
  token: null,
  loading: false,
};

interface ValidationErrors {
  errors: Array<{ message: string }>
}

export const getToken = createAsyncThunk('token/get', async (body: SignUpBody, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${process.env.API}signin`, body);
    return response.data;
  } catch (err) {
    let error: AxiosError<ValidationErrors> = err
    if (!error.response) {
      throw err
    }
    return rejectWithValue(error.response.data.errors[0].message)
  }
});

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getToken.fulfilled, (state, action) => {
      state.loading = false
      state.token = action.payload.token;
      state.error = undefined
    });
    builder.addCase(getToken.pending, (state) => {
      state.loading = true
      state.error = undefined
    });
    builder.addCase(getToken.rejected, (state, action) => {
      console.log(action);

      if (action.payload) {
        state.error = action.payload as string
      } else {
        state.error = action.error.message
      }
    });
  },
});

export const { logout } = tokenSlice.actions;

export const selectTokenData = (state: RootState) => state.tokenReducer;

export default tokenSlice.reducer;
