import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainAppStackParamList } from '../types/navigationTypes';
import DrawerNavigator from './DrawerNavigator';
import EditScreen from '../screens/main/EditScreen';

const Stack = createNativeStackNavigator<MainAppStackParamList>();
const MainAppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="drawer"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="editProfile"
        component={EditScreen}
        options={{ title: 'Edit Your Profile' }}
      />
    </Stack.Navigator>
  );
};

export default MainAppNavigator;
