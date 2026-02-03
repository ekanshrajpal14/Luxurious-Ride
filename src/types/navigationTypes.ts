import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamsList = {
  splash: undefined;
  onboard: undefined;
  auth: NavigatorScreenParams<AuthStackParamList>;
};

export type AuthStackParamList = {
  login: undefined;
  register: undefined;
  forgotPassword: undefined;
  otpVerify: undefined;
};
