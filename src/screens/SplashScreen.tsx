import { View, Text, Image } from 'react-native';
import React from 'react';
import { getTheme } from '../theme/helper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../types/navigationTypes';
import { textSizes } from '../theme/text';
import { useAppSelector } from '../hooks/useAppSelector';

const SplashScreen = (props: NativeStackScreenProps<RootStackParamsList>) => {
  const HasSeenOnboarding = useAppSelector(
    state => state.app.hasSeenOnboarding,
  );
  const theme = getTheme();
  setTimeout(() => {
    props.navigation.reset({
      index: 0,
      routes: [{ name: !HasSeenOnboarding ? 'onboard' : 'auth' }],
    });
  }, 1000);

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
