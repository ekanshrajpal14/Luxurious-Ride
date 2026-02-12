import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';
import { getTheme } from '../theme/helper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../types/navigationTypes';
import { textSizes } from '../theme/text';
import { useAppSelector } from '../hooks/useAppSelector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { flushPendingNavigation } from '../services/navigationService';

const checkStorage = async () => {
  const keys = await AsyncStorage.getAllKeys();
  const result = await AsyncStorage.multiGet(keys);
  console.log(result);
};
const SplashScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamsList>) => {
  checkStorage();
  const theme = getTheme();
  const hasSeenOnboarding = useAppSelector(
    state => state.app.hasSeenOnboarding,
  );
  const accessToken = useAppSelector(state => state.auth.accessToken);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasSeenOnboarding) {
        navigation.replace('onboard');
      } else if (accessToken) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'mainApp',
            },
          ],
        });
        flushPendingNavigation() // if any pending navigation then this will navigate it 
      } else {
        navigation.replace('auth', {
          screen: 'login',
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.primary,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        source={require('../../assets/images/LR_LOGO.png')}
        style={{ width: 150, height: 150 }}
      />
      <Text
        style={{
          color: theme.text,
          fontSize: textSizes.xl2,
          fontWeight: 700,
          marginTop: 20,
        }}
      >
        Luxurious Ride
      </Text>
    </View>
  );
};

export default SplashScreen;
