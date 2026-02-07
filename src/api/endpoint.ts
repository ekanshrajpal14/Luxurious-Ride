import { AuthEnpoints } from '../types/apiTypes';

export const authEndpoints: AuthEnpoints = {
  register: `/api/auth/register`,
  login: `/api/auth/login`,
  logout: `/api/auth/logout`,
  otpVerify: `/api/auth/verify-otp`,
};
