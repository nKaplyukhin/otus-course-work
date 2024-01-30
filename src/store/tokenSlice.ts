import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { TOKEN_KEY } from 'constansts/token';
import { RootState } from 'store';
import { ILoginForm, IRegistrationForm } from 'interfaces/form';
import { deleteCookie, getCookie, setCookie } from 'utils/cookie';

export interface tokenState {
  token: string | undefined;
  loading: boolean;
  signinError?: string;
  signupError?: string;
}

const initialState: tokenState = {
  token: getCookie(TOKEN_KEY),
  loading: false,
};

interface ValidationErrors {
  errors: Array<{ message: string }>;
}

export const signin = createAsyncThunk('token/login', async (body: ILoginForm, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${process.env.API}signin`, body);
    return response.data;
  } catch (err) {
    const error: AxiosError<ValidationErrors> = err;
    if (!error.response) {
      throw err;
    }

    return rejectWithValue(error.response.data.errors[0].message);
  }
});

export const signup = createAsyncThunk('token/registration', async (body: IRegistrationForm, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${process.env.API}signup`, {
      email: body.email,
      password: body.password,
      commandId: process.env.COMAND_ID,
    });
    return response.data;
  } catch (err) {
    const error: AxiosError<ValidationErrors> = err;
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data.errors[0].message);
  }
});

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    logout: (state) => {
      deleteCookie(TOKEN_KEY);
      state.token = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signin.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.signinError = undefined;
      setCookie(TOKEN_KEY, action.payload.token);
    });
    builder.addCase(signin.pending, (state) => {
      state.loading = true;
      state.signinError = undefined;
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.signinError = action.payload as string;
      } else {
        state.signinError = action.error.message;
      }
    });

    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.signupError = undefined;
      setCookie(TOKEN_KEY, action.payload.token);
    });
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
      state.signupError = undefined;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.signupError = action.payload as string;
      } else {
        state.signupError = action.error.message;
      }
    });
  },
});

export const { logout } = tokenSlice.actions;

export const selectTokenData = (state: RootState) => state.tokenReducer;

export default tokenSlice.reducer;
