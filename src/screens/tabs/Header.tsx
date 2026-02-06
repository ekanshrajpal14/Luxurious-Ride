import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Bell } from 'lucide-react-native';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { getTheme } from '../../theme/helper';
import { useNavigation } from '@react-navigation/native';
type HeaderProps = BottomTabHeaderProps & {
  notificationCount?: number;
};

const Header: React.FC<HeaderProps> = props => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const theme = getTheme();
  return (
    <View style={[styles.header, { backgroundColor: theme.background }]}>
      <Image
        source={require('../../../assets/images/LR_LOGO.png')}
        style={styles.logo}
      />

      <View style={styles.headerRight}>
        <View style={styles.notification}>
          <Bell color={theme.text} />
          <Text style={styles.badge}>2</Text>
        </View>
        <TouchableOpacity onPress={()=>navigation.openDrawer()}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/100' }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    // marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },

  logo: {
    width: 45,
    height: 45,
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  notification: {
    marginRight: 20,
  },

  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: 'red',
    color: '#fff',
    fontSize: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Header;
