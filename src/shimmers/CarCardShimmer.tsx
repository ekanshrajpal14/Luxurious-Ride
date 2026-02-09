// src/shimmers/CarCardShimmer.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { getTheme } from '../theme/helper';

const CarCardShimmer = () => {
  const theme = getTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      {/* Image */}
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={styles.image}
      />

      {/* Title */}
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={styles.title}
      />

      {/* Rating */}
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={styles.smallText}
      />

      {/* Category */}
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={styles.smallText}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={styles.price}
        />
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default CarCardShimmer;

const styles = StyleSheet.create({
  card: {
    width: 155,
    borderRadius: 16,
    padding: 10,
  },

  image: {
    width: '100%',
    height: 90,
    borderRadius: 10,
  },

  title: {
    marginTop: 8,
    width: '80%',
    height: 14,
    borderRadius: 6,
  },

  smallText: {
    marginTop: 6,
    width: '50%',
    height: 10,
    borderRadius: 5,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },

  price: {
    width: 45,
    height: 14,
    borderRadius: 6,
  },

  button: {
    width: 55,
    height: 25,
    borderRadius: 12,
  },
});
