import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { Sun, Moon } from 'lucide-react-native';
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../../store/slices/themeSlice';

type Props = {
  isDark: boolean;
};

const ThemeToggle: React.FC<Props> = ({ isDark }) => {
  const dispatch = useDispatch();
  const anim = useRef(new Animated.Value(isDark ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: isDark ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [isDark]);

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 24],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => dispatch(toggleTheme())}
      style={[
        styles.container,
        { backgroundColor: isDark ? '#2C2C2C' : '#D9D9D9' },
      ]}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        {isDark ? (
          <Moon size={14} color="#6800e7" />
        ) : (
          <Sun size={14} color="#FFA500" />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ThemeToggle;

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 25,
    borderRadius: 20,
    justifyContent: 'center',
    padding: 2,
  },
  circle: {
    width: 21,
    height: 21,
    borderRadius: 12,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
});
