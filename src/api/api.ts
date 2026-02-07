import { AuthResponse, LoginAuthResp } from '../types/auth/authTypes';
import { LoginPayload, OtpPayload, RegisterPayload } from '../types/auth/requestTypes';
import axiosInstance from './axiosInstance';
import { authEndpoints } from './endpoint';
import { ApiResponse } from './types';


export const healthCheckRoute = async () => {
  const data = await axiosInstance.get("/");
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