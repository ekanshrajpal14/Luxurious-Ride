import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import { RootStackParamsList } from '../types/navigationTypes';
import OnboardScreen from '../screens/OnboardScreen';
import { StatusBar } from 'react-native';
import { getTheme } from '../theme/helper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthNavigator from './AuthNavigator';
import MainAppNavigator from './MainAppNavigator';
import { useAppSelector } from '../hooks/useAppSelector';

const Stack = createNativeStackNavigator<RootStackParamsList>();
const RootNavigator = () => {
  const theme = getTheme();
  return (
    <>
      {/* <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}> */}
      <StatusBar
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
      />
      <Stack.Navigator>
        <Stack.Screen
          name="splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="onboard"
          component={OnboardScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="auth"
          component={AuthNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="mainApp"
          component={MainAppNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      {/* </SafeAreaView> */}
    </>
  );
};

export default RootNavigator;
