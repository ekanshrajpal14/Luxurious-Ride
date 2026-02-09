import { AuthEnpoints, CarEndpoints } from '../types/apiTypes';

export const authEndpoints: AuthEnpoints = {
  register: `/api/auth/register`,
  login: `/api/auth/login`,
  logout: `/api/auth/logout`,
  otpVerify: `/api/auth/verify-otp`,
};

export const carEndpoints: CarEndpoints = {
  brands: '/api/cars/fetch-brands',
  cars: page => `/api/cars/fetch-cars?page=${page}`,
};
