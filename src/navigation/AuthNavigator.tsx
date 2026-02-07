import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  AuthStackParamList,
  RootStackParamsList,
} from '../types/navigationTypes';
import { StatusBar } from 'react-native';
import { getTheme } from '../theme/helper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Register from '../screens/auth/Register';
import Login from '../screens/auth/Login';
import ResetPassword from '../screens/auth/ResetPassword';
import OTPVerifyScreen from '../components/signup/OTPVerifyScreen';
import { useAppSelector } from '../hooks/useAppSelector';

const Stack = createNativeStackNavigator<AuthStackParamList>();
const AuthNavigator = () => {
  const theme = getTheme();
  const isExistingUser = useAppSelector(state => state.auth.isExistingUser);
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
        <StatusBar
          barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        />
        <Stack.Navigator
          initialRouteName={isExistingUser ? 'login' : 'register'}
        >
          <Stack.Screen
            name="register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="forgotPassword"
            component={ResetPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="otpVerify"
            component={OTPVerifyScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </>
  );
};

export default AuthNavigator;
