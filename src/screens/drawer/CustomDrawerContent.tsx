import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import {
  Heart,
  Clock,
  Bell,
  Users,
  Settings,
  Languages,
  UserPlus,
  FileText,
  HelpCircle,
  LogOut,
  ChevronRight,
  Pencil,
} from 'lucide-react-native';
import { getTheme } from '../../theme/helper';

const CustomDrawerContent = ({ navigation }: DrawerContentComponentProps) => {
  const theme = getTheme();

  const Item = ({
    icon,
    label,
    onPress,
  }: {
    icon: React.ReactNode;
    label: string;
    onPress?: () => void;
  }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.itemLeft}>
        {icon}
        <Text style={[styles.itemText, { color: theme.text }]}>{label}</Text>
      </View>
      <ChevronRight size={18} color="#999" />
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      {/* Profile Header */}
      <View style={styles.profile}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150' }}
          style={styles.avatar}
        />

        <View style={{ flex: 1 }}>
          <Text style={[styles.name, { color: theme.text }]}>
            Benjamin Jack
          </Text>
          <Text style={styles.email}>benjaminJack@gmail.com</Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.getParent()?.navigate('editProfile')}
        >
          <Pencil size={18} color={theme.text} />
        </TouchableOpacity>
      </View>

      {/* GENERAL */}
      <Text style={styles.section}>General</Text>

      <Item icon={<Heart size={20} />} label="Favorite Cars" />
      <Item icon={<Clock size={20} />} label="Previous Rent" />
      <Item icon={<Bell size={20} />} label="Notification" />
      <Item icon={<Users size={20} />} label="Connected to QENT Partnerships" />

      {/* SUPPORT */}
      <Text style={styles.section}>Support</Text>

      <Item icon={<Settings size={20} />} label="Settings" />
      <Item icon={<Languages size={20} />} label="Languages" />
      <Item icon={<UserPlus size={20} />} label="Invite Friends" />
      <Item icon={<FileText size={20} />} label="Privacy Policy" />
      <Item icon={<HelpCircle size={20} />} label="Help Support" />

      {/* LOGOUT */}
      <TouchableOpacity style={styles.logout}>
        <LogOut size={20} color="red" />
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 14,
  },

  name: {
    fontSize: 16,
    fontWeight: '600',
  },

  email: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },

  section: {
    marginTop: 25,
    marginBottom: 10,
    fontSize: 13,
    color: '#999',
    fontWeight: '500',
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },

  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemText: {
    marginLeft: 14,
    fontSize: 15,
  },

  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },

  logoutText: {
    marginLeft: 14,
    fontSize: 15,
    color: 'red',
  },
});

export default CustomDrawerContent;
