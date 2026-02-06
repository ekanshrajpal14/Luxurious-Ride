import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Search() {
  const [tripType, setTripType] = useState('oneway');

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Book your car in seconds</Text>
          <Icon name="account-circle" size={28} color="#4AA3C7" />
        </View>

        {/* Card */}
        <View style={styles.card}>
          {/* Tabs */}
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, tripType === 'oneway' && styles.activeTab]}
              onPress={() => setTripType('oneway')}
            >
              <Text
                style={[
                  styles.tabText,
                  tripType === 'oneway' && styles.activeTabText,
                ]}
              >
                ONE WAY
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, tripType === 'roundtrip' && styles.activeTab]}
              onPress={() => setTripType('roundtrip')}
            >
              <Text
                style={[
                  styles.tabText,
                  tripType === 'roundtrip' && styles.activeTabText,
                ]}
              >
                ROUND TRIP
              </Text>
            </TouchableOpacity>
          </View>

          {/* From */}
          <View style={styles.inputRow}>
            <Text style={styles.label}>FROM</Text>
            <TextInput
              placeholder="Enter Pickup Location"
              style={styles.input}
            />
           
          </View>

          {/* To */}
          <View style={styles.inputRow}>
            <Text style={styles.label}>TO</Text>
            <TextInput placeholder="Enter Drop Location" style={styles.input} />
          </View>

          {/* Pickup Date */}
          <View style={styles.inputRow}>
            <Text style={styles.label}>PICK UP</Text>
            <Text style={styles.value}>06-02-2026</Text>
            {/* <Icon name="keyboard-arrow-down" size={22} color="#4AA3C7" /> */}
          </View>

          {/* Pickup Time */}
          <View style={styles.inputRow}>
            <Text style={styles.label}>PICK UP AT</Text>
            <Text style={styles.value}>07:00 AM</Text>
            {/* <Icon name="keyboard-arrow-down" size={22} color="#4AA3C7" /> */}
          </View>

          {/* Button */}
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaText}>EXPLORE CARS</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    padding: 16,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    width:"100%",
    textAlign: 'center',
  },

  subtitle: {
    marginTop: 10,
    textAlign: 'center',
    fontWeight: '600',
    color: '#444',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    elevation: 4,
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

  activeTab: {
    backgroundColor: '#4AA3C7',
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
  },

  label: {
    width: 70,
    fontWeight: '600',
    color: '#555',
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },

  value: {
    flex: 1,
    fontSize: 14,
    color: '#000',
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

  bottomTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
  },

  bottomTab: {
    alignItems: 'center',
  },

  bottomTabText: {
    fontSize: 11,
    marginTop: 4,
  },
});
