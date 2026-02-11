import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchBrandsApi, fetchCarsApi } from '../../api/api';
import { ApiResponse } from '../../api/types';
import { Brands, Car, FetchBrands, FetchCars } from '../../types/cars/carTypes';

type CarState = {
  brands: Brands[];
  brandErrors: string | null;
  brandLoading: boolean;

  cars: Car[];
  carLoading: boolean;
  carError: string | null;
  carCurrentPage: number;
  carTotalPages: number;
  totalCars?: number;
};

const initialState: CarState = {
  brands: [],
  brandErrors: null,
  brandLoading: false,
  cars: [],
  carLoading: false,
  carError: null,
  carCurrentPage: 0,
  carTotalPages: 1,
};

export const fetchBrandsData = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>('car/brands', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchBrandsApi();
    return response;
  } catch (error: any) {
    return rejectWithValue(error?.message || 'Verification failed');
  }
});

export const fetchCars = createAsyncThunk<
  any,
  { page?: number } | void,
  { rejectValue: string }
>('car/cars', async (args, { rejectWithValue }) => {
  try {
    const response = await fetchCarsApi(args?.page || 1);
    return response;
  } catch (error: any) {
    return rejectWithValue(error?.message || 'Verification failed');
  }
});

const carSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBrandsData.pending, state => {
        state.brandLoading = true;
        state.brandErrors = null;
      })
      .addCase(
        fetchBrandsData.fulfilled,
        (state, action: PayloadAction<ApiResponse<FetchBrands>>) => {
          state.brands = action.payload.data.brands;
          state.brandErrors = null;
          state.brandLoading = false;
        },
      )
      .addCase(fetchBrandsData.rejected, (state, action) => {
        state.brandErrors = action.error.message || 'Error';
        state.brandLoading = false;
      });

    // cars fetch reducers
    builder
      .addCase(fetchCars.pending, state => {
        state.carLoading = true;
        state.carError = null;
      })
      .addCase(
        fetchCars.fulfilled,
        (state, action: PayloadAction<ApiResponse<FetchCars>>) => {
          state.carError = null;
          state.carLoading = false;
          state.carCurrentPage = action.payload.data.currentPage;
          state.carTotalPages = action.payload.data.totalPages;
          if (state.carCurrentPage === 1) {
            state.cars = action.payload.data.cars;
          } else {
            state.cars.push(...action.payload.data.cars);
          }
        
        },
      )
      .addCase(fetchCars.rejected, (state, action) => {
        state.carError = action.error.message || 'Error';
        state.carLoading = false;
      });
  },
});

// export const { logout, clearAuthError } = authSlice.actions;
export default carSlice.reducer;
