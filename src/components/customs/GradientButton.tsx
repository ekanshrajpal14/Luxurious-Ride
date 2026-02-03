// components/GradientButton.tsx
import React, { useRef } from 'react';
import {
  Text,
  Pressable,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Loader from './Loader';

interface GradientButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  gradient1?: string;
  gradient2?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
  gradient1 = '#0284c5',
  gradient2 = '#019eec',
}) => {
  const isDisabled = disabled || loading;
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (isDisabled) return;
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    if (isDisabled) return;
    Animated.spring(scale, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <LinearGradient
          colors={isDisabled ? ['#cccccc', '#cccccc'] : [gradient1, gradient2]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.button, style]}
        >
          {loading ? (
            <Loader />
          ) : (
            <Text style={[styles.text, textStyle]}>{title}</Text>
          )}
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default GradientButton;
