import { AuthResponse } from '../types/auth/authTypes';
import { RegisterPayload } from '../types/auth/requestTypes';
import axiosInstance from './axiosInstance';
import { authEndpoints, healthCheck } from './endpoint';

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  statusCode:number;
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

export const healthCheckRoute = async () => {
  const data = await axiosInstance.get(healthCheck);
};
