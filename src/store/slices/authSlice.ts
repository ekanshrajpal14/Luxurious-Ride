import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { loginApi, verifyOTPApi } from '../../api/api';
import { LoginAuthResp, User } from '../../types/auth/authTypes';
import { LoginPayload, OtpPayload } from '../../types/auth/requestTypes';
import { ApiResponse } from '../../api/types';

type AuthState = {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
  isExistingUser: boolean;
  isUserVerified: boolean;
  loginLoader:boolean;
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isLoading: false,
  error: null,
  isExistingUser: false,
  isUserVerified: false,
  loginLoader:false
};

export const verify = createAsyncThunk<
  ApiResponse<LoginAuthResp>,
  OtpPayload,
  { rejectValue: string }
>('auth/verify', async (payload, { rejectWithValue }) => {
  try {
    const response = await verifyOTPApi(payload);
    return response;
  } catch (error: any) {
    return rejectWithValue(error?.message || 'Verification failed');
  }
});

export const loginUser = createAsyncThunk<
  ApiResponse<LoginAuthResp>,
  LoginPayload,
  { rejectValue: string }
>('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const response = await loginApi(payload);
    return response;
  } catch (error: any) {
    return rejectWithValue(error?.message || 'Login failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.error = null;
      state.accessToken = null;
      console.log('err');
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(verify.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        verify.fulfilled,
        (state, action: PayloadAction<ApiResponse<LoginAuthResp>>) => {
          state.isLoading = false;
          state.user = action.payload.data.user;
          state.accessToken = action.payload.data?.accessToken || null;
          state.isExistingUser = true;
          state.isUserVerified = action.payload.data.isUserVerified;
        },
      )
      .addCase(verify.rejected, (state, action) => {
        state.isLoading = false;
        // state.error = action.payload || 'Something went wrong';
      }),
      builder
        .addCase(loginUser.pending, state => {
          state.loginLoader = true;
        })
        .addCase(
          loginUser.fulfilled,
          (state, action: PayloadAction<ApiResponse<LoginAuthResp>>) => {
            state.loginLoader = false;
            state.user = action.payload.data.user;
            state.accessToken = action.payload.data?.accessToken || null;
            state.isExistingUser = true;
            state.isUserVerified = action.payload.data.isUserVerified;
          },
        )
        .addCase(loginUser.rejected, (state, action) => {
          state.loginLoader = false;
        });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
