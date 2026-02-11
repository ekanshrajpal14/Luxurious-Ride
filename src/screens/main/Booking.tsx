import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableHighlight,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainAppStackParamList } from '../../types/navigationTypes';
import Input from '../../components/customs/Input';
import GradientButton from '../../components/customs/GradientButton';
import { getTheme } from '../../theme/helper';
import { textSizes } from '../../theme/text';
import RazorpayCheckout from 'react-native-razorpay';
type Props = NativeStackScreenProps<MainAppStackParamList, 'booking'>;
const Booking = ({ route, navigation }: Props) => {
  const { car_id, pickupDate, pickupLocation, pickupTime } = route.params;
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [pickUp, setPickUp] = useState<string>('');
  const theme = getTheme();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={20}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: '#eeeeee',
          padding: 15,
          paddingTop: 20,
        }}
      >
        <View
          style={{
            backgroundColor: theme.background,
            padding: 15,
            borderRadius: 10,
            marginBottom: 20,
            boxShadow: '0 0 10px #b8b8b89e',
          }}
        >
          <Text style={{ fontSize: textSizes.lg, marginBottom: 10 }}>
            Your Booking Details
          </Text>
          <View style={styles.bookingDetail}>
            <Text>Pickup City</Text>
            <Text>{pickupLocation}</Text>
          </View>
          <View style={styles.bookingDetail}>
            <Text style={{ fontSize: 15, fontWeight: 700 }}>Total Fare</Text>
            <Text style={{ fontSize: 15, fontWeight: 700 }}>
              {pickupLocation}
            </Text>
          </View>
          <View style={styles.bookingDetail}>
            <Text>Trip Type</Text>
            <Text>Local</Text>
          </View>
          <View style={styles.bookingDetail}>
            <Text>Pickup Date & Time</Text>
            <Text>
              {pickupDate} | {pickupTime}
            </Text>
          </View>
          <View style={styles.bookingDetail}>
            <Text>Car & Deta</Text>
            <Text>
              {pickupDate} | {pickupTime}
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: theme.background,
            padding: 15,
            borderRadius: 10,
            boxShadow: '0 0 10px #b8b8b89e',
          }}
        >
          <Text style={{ fontSize: textSizes.lg, marginBottom: 10 }}>
            Enter Your Details and {'\n'}Proceed to payment
          </Text>
          {/* Inputs */}
          <Input
            placeholder="Full Name"
            placeholderTextColor="#9a9a9a"
            value={name}
            onChangeText={val => setName(val)}
          />

          <Input
            placeholder="Email Address"
            placeholderTextColor="#9a9a9a"
            value={email}
            onChangeText={val => setEmail(val)}
            style={{ textTransform: 'lowercase' }}
          />

          <Input
            placeholder="Phone Number"
            placeholderTextColor="#9a9a9a"
            value={number}
            onChangeText={val => setNumber(val)}
            style={{ textTransform: 'lowercase' }}
          />
          <Input
            placeholder="Pick Up Address"
            placeholderTextColor="#9a9a9a"
            value={pickUp}
            onChangeText={val => setPickUp(val)}
            style={{ textTransform: 'lowercase' }}
          />
        </View>

        <GradientButton
          title="Proceed"
          style={{ marginVertical: 20 }}
          onPress={() => {

            var options: any = {
              description: 'Credits towards consultation',
              image: 'https://i.imgur.com/3g7nmJC.jpg',
              currency: 'INR',
              key: 'rzp_test_SEog53sowqO5ch',
              amount: '50000',
              name: 'Acme Corp',
              order_id: 'order_SEogv0LAK2Jy1Y', //Replace this with an order_id created using Orders API.
              prefill: {
                email: 'Ekansh@gmail.com',
                contact: '70494156544',
                name: 'Ekanhs',
              },
              theme: { color: '#53a20e' },
            };
            RazorpayCheckout.open(options)
              .then((data: any) => {
                // handle success
                Alert.alert(`Success: ${data.razorpay_payment_id}`);
              })
              .catch((error: any) => {
                // handle failure
                Alert.alert(`Error: ${error.code} | ${error.description}`);
              });
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Booking;

const styles = StyleSheet.create({
  bookingDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
});
