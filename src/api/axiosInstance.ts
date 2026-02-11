import axios from 'axios';
import { BASE_URL } from '@env';
import { BackendError } from './types';
import { toastError } from '../utils/toastService';
const axiosInstance = axios.create({
  // baseURL: 'https://0msnrqd1-3000.inc1.devtunnels.ms',
  // baseURL: 'https://maybach-backend.onrender.com',
  baseURL: 'http://192.168.1.19:3000',
  timeout: 30000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async config => {
    // Example: attach auth token
    // const token = await AsyncStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    
    return config;
  },
  error => Promise.reject(error),
);

// Response interceptor
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const backendError: BackendError = {
      success: false,
      message: 'Unknown Error',
      errName: 'Error',
      statusCode: 400,
      errors: [],
      ...(error?.response?.data ?? {}),
    };
    if (!error.config?.headers?.['X-SILENT-ERROR']) {
      const message = backendError?.errors[0]?.msg
        ? backendError?.errors[0]?.msg
        : backendError.message;
      toastError(message, backendError.errName);
    }

    return Promise.reject(backendError);
  },
);

export default axiosInstance;
