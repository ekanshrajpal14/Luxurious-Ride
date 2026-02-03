import { View, Image, StyleSheet } from 'react-native';
import React from 'react';
import ThemeToggle from './ThemeToggle';
import { getTheme } from '../../theme/helper';

const Navbar = () => {
  const theme = getTheme();
  return (
    <View style={styles.header}>
      <Image
        source={require('../../../assets/images/LR_LOGO.png')}
        style={styles.logo}
      />
      <ThemeToggle isDark={theme.mode === 'dark'} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 30,
    justifyContent: 'space-between',
  },
  logo: {
    width: 55,
    height: 55,
  },
  brand: {
    fontSize: 18,
    fontWeight: '700',
  },
});

export default Navbar;
