import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { getTheme } from '../../theme/helper';
import GradientButton from '../../components/customs/GradientButton';
import { Calendar1, Clock } from 'lucide-react-native';
import {
  MainAppStackParamList,
  TabStackParamList,
} from '../../types/navigationTypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useToast } from '../../hooks/useToast';
type NavType = NativeStackNavigationProp<MainAppStackParamList>;
const Search = () => {
  const navigation = useNavigation<NavType>();
  const theme = getTheme();
  const [tripType, setTripType] = useState<'LOCAL' | 'ROUND_TRIP'>('LOCAL');
  const { showError } = useToast();
  // Time state
  const oneHourFromNow = new Date();
  oneHourFromNow.setHours(oneHourFromNow.getHours() + 1);
  const [pickupTime, setPickupTime] = useState<Date>(oneHourFromNow);

  // Modal visibility
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [pickupDate, setPickupDate] = useState<Date>(new Date());
  const [pickupLocation, setPickupLocation] = useState<string>('');
  const handleExplore = () => {
    if (!tripType || !pickupLocation || !pickupDate || !pickupTime) {
      return showError('All Fields are required');
    }
    navigation.navigate('availableCars', {
      tripType,
      pickupLocation,
      pickupDate: pickupDate.toISOString().split('T')[0],
      pickupTime: pickupTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    });
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={'padding'}
      keyboardVerticalOffset={80}
    >
      <View style={styles.root}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Book your car in seconds</Text>
          </View>

          <View style={styles.card}>
            {/* Tabs */}
            <View style={styles.tabs}>
              {['LOCAL', 'ROUND_TRIP'].map(type => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.tab,
                    tripType === type && { backgroundColor: theme.primary },
                  ]}
                  onPress={() => {
                    setTripType(type as any);
                    // setEndDate(null);
                  }}
                >
                  <Text
                    style={[
                      styles.tabText,
                      tripType === type && styles.activeTabText,
                    ]}
                  >
                    {type.replace('_', ' ')}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* FROM */}
            <View style={styles.inputRow}>
              <Text style={styles.label}>FROM</Text>
              <TextInput
                placeholder="Enter Pickup Location"
                placeholderTextColor={theme.grey}
                value={pickupLocation}
                onChangeText={e => setPickupLocation(e)}
                style={[
                  styles.input,
                  { color: theme.text, includeFontPadding: false },
                ]}
              />
            </View>

            {/* DATE */}
            <TouchableOpacity
              style={styles.inputRow}
              onPress={() => setShowCalendar(true)}
            >
              <Text style={styles.label}>PICK UP</Text>
              <Text style={styles.value}>
                {pickupDate.toISOString().split('T')[0]}
              </Text>
              <Calendar1 size={20} color={theme.primary} />
            </TouchableOpacity>

            {/* TIME */}
            <TouchableOpacity
              style={styles.inputRow}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={styles.label}>PICK UP AT</Text>
              <Text style={styles.value}>
                {pickupTime.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
              <Clock size={20} color={theme.primary} />
            </TouchableOpacity>

            {/* CTA */}
            <View style={{ marginTop: 20 }}>
              <GradientButton title="Explore Cabs" onPress={handleExplore} />
            </View>
          </View>
        </ScrollView>
        <DatePicker
          modal
          open={showCalendar}
          date={pickupDate} // Date object
          mode="date"
          theme={theme.mode}
          minimumDate={new Date()} // disable past dates
          onConfirm={date => {
            setShowCalendar(false);
            setPickupDate(date);
          }}
          onCancel={() => setShowCalendar(false)}
        />

        <DatePicker
          modal
          style={{ backgroundColor: '#fff' }}
          open={showTimePicker}
          date={pickupTime}
          mode="time"
          theme={theme.mode}
          minimumDate={oneHourFromNow}
          onConfirm={date => {
            setShowTimePicker(false);
            setPickupTime(date);
          }}
          onCancel={() => setShowTimePicker(false)}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Search;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    padding: 16,
  },
  header: {
    marginTop: 10,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 26,
  },
  tabs: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  tabText: {
    fontWeight: '600',
    color: '#777',
  },
  activeTabText: {
    color: '#fff',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: 12,
    marginVertical: 10,
  },
  label: {
    width: 80,
    fontWeight: '600',
    color: '#555',
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
  value: {
    flex: 1,
    fontSize: 14,
  },
  ctaButton: {
    backgroundColor: '#F37021',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  ctaText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  modalClose: {
    alignItems: 'center',
    marginTop: 10,
  },
});
