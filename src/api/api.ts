import { AuthResponse, LoginAuthResp } from '../types/auth/authTypes';
import {
  AvailableCarsTypes,
  LoginPayload,
  OtpPayload,
  RegisterPayload,
} from '../types/auth/requestTypes';
import { FetchBrands, FetchCars } from '../types/cars/carTypes';
import axiosInstance from './axiosInstance';
import { authEndpoints, carEndpoints } from './endpoint';
import { ApiResponse } from './types';

export const healthCheckRoute = async () => {
  const data = await axiosInstance.get('/');
};

export const registerUserApi = async (
  payload: RegisterPayload,
  headers?: any,
): Promise<ApiResponse<AuthResponse>> => {
  try {
    const { data } = await axiosInstance.post(authEndpoints.register, payload, {
      ...(headers ?? {}),
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const verifyOTPApi = async (
  payload: OtpPayload,
): Promise<ApiResponse<LoginAuthResp>> => {
  try {
    const { data } = await axiosInstance.post(authEndpoints.otpVerify, payload);
    return data;
  } catch (error) {
    throw error;
  }
};

export const loginApi = async (
  payload: LoginPayload,
): Promise<ApiResponse<LoginAuthResp>> => {
  try {
    const { data } = await axiosInstance.post(authEndpoints.login, payload);
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchBrandsApi = async (): Promise<ApiResponse<FetchBrands>> => {
  try {
    const { data } = await axiosInstance.get(carEndpoints.brands);
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchCarsApi = async (
  page: number = 1,
): Promise<ApiResponse<FetchCars>> => {
  try {
    // await new Promise(resolve => setTimeout(resolve, 2000));
    const { data } = await axiosInstance.get(carEndpoints.cars(page));
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchAvailableCars = async (
  page: number = 1,
  body: AvailableCarsTypes,
): Promise<ApiResponse<FetchCars>> => {
  try {
    // await new Promise(resolve => setTimeout(resolve, 2000));

    const { data } = await axiosInstance.post(
      carEndpoints.availableCars(page),
      body,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
