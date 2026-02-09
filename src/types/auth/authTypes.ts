export type UserRole = 'USER' | 'ADMIN';
export type AuthProvider = 'LOCAL' | 'GOOGLE' | 'APPLE';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BLOCKED';

export interface User {
  id: number;
  role: UserRole;
  auth_provider: AuthProvider;
  is_email_verified: boolean;
  is_phone_verified: boolean;
  status: UserStatus;
  email: string;
  password: string;
  name: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export interface AuthResponse {
  user: User;
  isUserVerified: boolean;
}
export interface LoginAuthResp extends AuthResponse {
  accessToken: string;
}

