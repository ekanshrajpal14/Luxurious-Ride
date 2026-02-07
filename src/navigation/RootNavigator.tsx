import React, { SetStateAction, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import { RootStackParamsList } from '../types/navigationTypes';
import OnboardScreen from '../screens/OnboardScreen';
import { StatusBar } from 'react-native';
import { getTheme } from '../theme/helper';
import AuthNavigator from './AuthNavigator';
import MainAppNavigator from './MainAppNavigator';
import { useAppSelector } from '../hooks/useAppSelector';

interface RootNavigatorProps {
  isAppReady: boolean;
  setIsAppReady: React.Dispatch<React.SetStateAction<boolean>>;
}

const Stack = createNativeStackNavigator<RootStackParamsList>();
const RootNavigator: React.FC<RootNavigatorProps> = ({
  isAppReady,
  setIsAppReady,
}) => {
  const theme = getTheme();
  const hasSeenOnboarding = useAppSelector(
    state => state.app.hasSeenOnboarding,
  );
  const accessToken = useAppSelector(state => state.auth.accessToken);

  setTimeout(() => {
    setIsAppReady(true);
  }, 1000);

  return (
    <>
      <StatusBar
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
      />
      <Stack.Navigator>
        {!isAppReady ? (
          <Stack.Screen
            name="splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
        ) : !hasSeenOnboarding ? (
          /* ONBOARDING */
          <Stack.Screen
            name="onboard"
            component={OnboardScreen}
            options={{ headerShown: false }}
          />
        ) : accessToken ? (
          /* MAIN APP */
          <Stack.Screen
            name="mainApp"
            component={MainAppNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          /*  AUTH */
          <Stack.Screen
            name="auth"
            component={AuthNavigator}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </>
  );
};

export default RootNavigator;
