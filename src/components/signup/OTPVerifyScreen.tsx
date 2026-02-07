import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Navbar from '../global/Navbar';
import GradientButton from '../customs/GradientButton';
import { getTheme } from '../../theme/helper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  AuthStackParamList,
  RootStackParamsList,
} from '../../types/navigationTypes';
type Props = NativeStackScreenProps<
  AuthStackParamList & RootStackParamsList,
  'otpVerify'
>;
const OTP_LENGTH = 4;

const OTPVerifyScreen: React.FC<Props> = ({ navigation, route }) => {

  const theme = getTheme();
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move forward
    if (text && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (index > 0 && !otp[index]) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleContinue = () => {
    const code = otp.join('');
    console.log('OTP:', code);
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'mainApp',
          // state: {
          //   routes: [{ name: 'tabs' }],
          // },
        },
      ],
    });
    // TODO verify OTP
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Navbar />

        <Text style={[styles.title, { color: theme.text }]}>
          Enter verification code
        </Text>

        <Text style={[styles.subtitle, { color: theme.subText }]}>
          We have sent a code to email
        </Text>

        {/* OTP Inputs */}
        <View style={styles.otpRow}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => {
                if (ref) inputs.current[index] = ref;
              }}
              style={[
                styles.otpInput,
                {
                  borderColor: theme.border,
                  color: theme.text,
                  backgroundColor: theme.card,
                },
              ]}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={text => handleChange(text, index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  handleBackspace(index);
                }
              }}
            />
          ))}
        </View>

        {/* Continue Button */}
        <GradientButton
          title="Continue"
          style={{ marginTop: 20 }}
          onPress={handleContinue}
        />

        {/* Resend */}
        <TouchableOpacity style={{ marginTop: 18 }}>
          <Text style={{ color: theme.subText, textAlign: 'center' }}>
            Didn’t receive the OTP?{' '}
            <Text style={{ color: theme.primary }}>Resend</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default OTPVerifyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 6,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 28,
  },
  otpInput: {
    width: 64,
    height: 64,
    borderRadius: 14,
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
  },
});
