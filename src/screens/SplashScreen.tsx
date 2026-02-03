import { View, Text, Switch, Image } from 'react-native';
import React from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { getTheme } from '../theme/helper';
import { toggleTheme } from '../store/slices/themeSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../types/navigationTypes';
import { textSizes } from '../theme/text';

const SplashScreen = (props: NativeStackScreenProps<RootStackParamsList>) => {

  const theme = getTheme();
  setTimeout(() => {
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'onboard' }],
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
      <Image source={require("../../assets/images/LR_LOGO.png")} style={{width:150,height:150}}/>
      <Text style={{ color: theme.text,fontSize:textSizes.xl2,fontWeight:700,marginTop:20 }}>Luxurious Ride</Text>
    </View>
  );
};

export default SplashScreen;
