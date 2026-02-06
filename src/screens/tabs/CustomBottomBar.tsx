import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Bell, CarFront, Home, Icon, LucideIcon, Search } from 'lucide-react-native';

const CustomBottomBar = ({ state, navigation }: BottomTabBarProps) => {
  return (
    <View style={styles.bottomBar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          navigation.navigate(route.name);
        };

        const icons: Record<string, LucideIcon> = {
          home: Home,
          search: Search,
          bookings: CarFront,
          notifications: Bell,
          profile: Home,
        };

        const IconComponent = icons[route.name];
        
        return (
          <Pressable key={route.key} onPress={onPress} style={styles.tab}>
            <IconComponent
              size={22}
              color={isFocused ? '#000' : '#888'}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#fff',

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },

  tab: {
    flex: 1,
    alignItems: 'center',
  },

  icon: {
    fontSize: 22,
    opacity: 0.5,
  },

  activeIcon: {
    opacity: 1,
    transform: [{ scale: 1.2 }],
  },
});

export default CustomBottomBar;
