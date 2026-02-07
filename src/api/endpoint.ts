import { AuthEnpoints } from '../types/apiTypes';

const baseURL = 'https://maybach-backend.onrender.com';
const baseURLAPI = 'https://maybach-backend.onrender.com';
export const healthCheck = `${baseURL}/`;

export const authEndpoints: AuthEnpoints = {
  register: `/api/auth/register`,
  login: `${baseURLAPI}/register`,
  logout: `${baseURLAPI}/register`,
};
