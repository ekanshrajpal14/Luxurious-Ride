import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../types/navigationTypes';
import Home from '../screens/tabs/Home';
import Header from '../screens/tabs/Header';
import CustomBottomBar from '../screens/tabs/CustomBottomBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getTheme } from '../theme/helper';
import Search from '../screens/tabs/Search';

const Tabs = createBottomTabNavigator<TabStackParamList>();
const TabNavigator = () => {
  const theme = getTheme();
  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: theme.background }]}>
      <Tabs.Navigator tabBar={props => <CustomBottomBar {...props} />} screenOptions={{ header: props => <Header {...props} /> }}>
        <Tabs.Screen
          name="home"
          component={Home}
        />
        <Tabs.Screen name="search" component={Search} />
        <Tabs.Screen name="bookings" component={View} />
        <Tabs.Screen name="notifications" component={View} />
      </Tabs.Navigator>
    </SafeAreaView>
  );
};

export default TabNavigator;
