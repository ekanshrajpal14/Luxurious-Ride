import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainAppStackParamList } from '../types/navigationTypes';
import DrawerNavigator from './DrawerNavigator';
import EditScreen from '../screens/main/EditScreen';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchBrandsData, fetchCars } from '../store/slices/carSlice';
import AvailableCars from '../screens/main/AvailableCars';
import Booking from '../screens/main/Booking';
import { flushPendingNavigation } from '../services/navigationService';
import CarDetails from '../screens/main/CarDetail';
import { getTheme } from '../theme/helper';

const Stack = createNativeStackNavigator<MainAppStackParamList>();
const MainAppNavigator = () => {
  const dispatch = useAppDispatch();
  const theme = getTheme();

  useEffect(() => {
    flushPendingNavigation(); // if any pending navigation then this will navigate it
    dispatch(fetchBrandsData());
    dispatch(fetchCars());
  }, [dispatch]);
  return (
    <Stack.Navigator initialRouteName="drawer">
      <Stack.Screen
        name="drawer"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="editProfile"
        component={EditScreen}
        options={{ title: 'Edit Your Profile', headerStyle: { backgroundColor: theme.background }, headerTintColor: theme.text }}
      />

      <Stack.Screen
        name="availableCars"
        component={AvailableCars}
        options={{ title: 'Available Cars', headerStyle: { backgroundColor: theme.background }, headerTintColor: theme.text }}
      />
      <Stack.Screen
        name="booking"
        component={Booking}
        options={{ title: 'Booking Your Car', headerShown: false }}
      />
      <Stack.Screen
        name="carDetails"
        component={CarDetails}
        options={{ title: 'Car Details', headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainAppNavigator;
