import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainAppStackParamList } from '../types/navigationTypes';
import DrawerNavigator from './DrawerNavigator';
import EditScreen from '../screens/main/EditScreen';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchBrandsData, fetchCars } from '../store/slices/carSlice';

const Stack = createNativeStackNavigator<MainAppStackParamList>();
const MainAppNavigator = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBrandsData());
    dispatch(fetchCars());
  }, [dispatch]);
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
