import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { RootState } from 'store';
import { deleteCookie, getCookie, setCookie } from 'utils/cookie';

export interface tokenState {
  token: string | undefined;
  loading: boolean
  error?: string
}

interface SignBody {
  email: string;
  password: string;
};

const initialState: tokenState = {
  token: getCookie("token"),
  loading: false,
};

interface ValidationErrors {
  errors: Array<{ message: string }>
}

export const signin = createAsyncThunk('token/get', async (body: SignBody, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${process.env.API}signin`, body);
    return response.data;
  } catch (err) {
    const error: AxiosError<ValidationErrors> = err
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
      deleteCookie("token")
      state.token = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signin.fulfilled, (state, action) => {
      state.loading = false
      state.token = action.payload.token;
      state.error = undefined
      setCookie("token", action.payload.token)
    });
    builder.addCase(signin.pending, (state) => {
      state.loading = true
      state.error = undefined
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.loading = false
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
