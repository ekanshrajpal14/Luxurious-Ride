// src/components/BrandShimmer.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const BrandShimmer = () => {
  return (
    <View style={styles.row}>
      {Array.from({ length: 4 }).map((_, index) => (
        <View key={index} style={styles.brandItem}>
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={styles.brandIcon}
          />
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={styles.brandText}
          />
        </View>
      ))}
    </View>
  );
};

export default BrandShimmer;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  brandItem: {
    alignItems: 'center',
  },
  brandIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  brandText: {
    width: 50,
    height: 10,
    borderRadius: 5,
  },
});
