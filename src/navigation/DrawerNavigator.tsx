import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerStachParamList } from '../types/navigationTypes';
import TabNavigator from './TabNavigator';
import CustomDrawerContent from '../screens/drawer/CustomDrawerContent';

const Drawer = createDrawerNavigator<DrawerStachParamList>();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: '#4AA3C7',
        drawerPosition: 'right',
        drawerType: 'slide',
        overlayColor: 'rgba(0,0,0,0.4)',
      }}
      initialRouteName="tabs"
    >
      <Drawer.Screen
        name="tabs"
        component={TabNavigator}
        options={{ headerShown: false, drawerItemStyle: { display: 'none' } }}
      />
    </Drawer.Navigator>
  );
}
