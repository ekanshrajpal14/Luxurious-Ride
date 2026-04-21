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

const Stack = createNativeStackNavigator<MainAppStackParamList>();
const MainAppNavigator = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // flushPendingNavigation(); // if any pending navigation then this will navigate it
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
        options={{ title: 'Edit Your Profile' }}
      />

      <Stack.Screen
        name="availableCars"
        component={AvailableCars}
        options={{ title: 'Available Cars' }}
      />
      <Stack.Screen
        name="booking"
        component={Booking}
        options={{ title: 'Booking Your Car' ,headerShown:false}}
      />
    </Stack.Navigator>
  );
};

export default MainAppNavigator;
