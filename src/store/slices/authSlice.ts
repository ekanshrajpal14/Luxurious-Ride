import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { registerUserApi } from '../../api/api';
/* =====================
   Types
===================== */

export type User = {
  id: string;
  name: string;
  email: string;
  token: string;
};

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
};

/* =====================
   Initial State
===================== */

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

/* =====================
   Async Thunks
===================== */

export const registerUser = createAsyncThunk<
  User,
  RegisterPayload,
  { rejectValue: string }
>('auth/register', async (payload, { rejectWithValue }) => {
  try {
    const data = await registerUserApi(payload);
    return data.data;
  } catch (error: any) {
    return rejectWithValue(error?.message || 'Registration failed');
  }
});

/* =====================
   Slice
===================== */

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.error = null;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
