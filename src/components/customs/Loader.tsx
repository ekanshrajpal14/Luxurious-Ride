// components/Loader.tsx
import React from 'react';
import { ActivityIndicator, View, StyleSheet, ViewStyle } from 'react-native';

interface LoaderProps {
  size?: 'small' | 'large' | number;
  color?: string;
  style?: ViewStyle;
}

const Loader: React.FC<LoaderProps> = ({
  size = 'small',
  color = '#ffffff',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
