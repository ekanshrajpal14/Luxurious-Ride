import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamsList = {
  splash: undefined;
  onboard: undefined;
  mainApp: NavigatorScreenParams<MainAppStackParamList>;
  auth: NavigatorScreenParams<AuthStackParamList>;
};

export type AuthStackParamList = {
  login: undefined;
  register: undefined;
  forgotPassword: undefined;
  otpVerify: {
    email_phone: string;
  };
};

export type DrawerStachParamList = {
  tabs: NavigatorScreenParams<TabStackParamList>;
};

export type MainAppStackParamList = {
  drawer: NavigatorScreenParams<DrawerStachParamList>;
  editProfile: undefined;
};

export type TabStackParamList = {
  home: undefined;
  search: undefined;
  bookings: undefined;
  notifications: undefined;
};
