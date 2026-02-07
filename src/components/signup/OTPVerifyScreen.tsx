import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import Navbar from '../global/Navbar';
import GradientButton from '../customs/GradientButton';
import { getTheme } from '../../theme/helper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  AuthStackParamList,
  RootStackParamsList,
} from '../../types/navigationTypes';
import { useToast } from '../../hooks/useToast';
import { useDispatch } from 'react-redux';
import { verify } from '../../store/slices/authSlice';
import { AppDispatch } from '../../store/store';
import { useAppSelector } from '../../hooks/useAppSelector';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<
  AuthStackParamList & RootStackParamsList,
  'otpVerify'
>;

const OTP_LENGTH = 6;
const SCREEN_WIDTH = Dimensions.get('window').width;
const INPUT_GAP = 5;
const INPUT_SIZE =
  (SCREEN_WIDTH - 24 * 2 - INPUT_GAP * (OTP_LENGTH - 1)) / OTP_LENGTH;

const OTPVerifyScreen: React.FC<Props> = ({ navigation, route }) => {
  const theme = getTheme();
  const { showError } = useToast();
  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(''));
  const inputs = useRef<TextInput[]>([]);
  const email = route?.params?.email_phone;
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, user, accessToken } = useAppSelector(
    state => state.auth,
  );

  useEffect(() => {

    inputs.current[0]?.focus();
    if (!email) {
      showError('Unknown Error, Please relogin with your email');
      // navigation.replace('login');
      // return null;
    }
  }, []);

  useEffect(() => {
    if (accessToken && user) {
      console.log(accessToken, user);

      navigation.reset({
        index: 0,
        routes: [{ name: 'mainApp' }],
      });
    }
  }, [accessToken]);

  const handleChange = (text: string, index: number) => {
    // Handle paste (full OTP)
    if (text.length > 1) {
      const chars = text.slice(0, OTP_LENGTH).split('');
      const newOtp = [...otp];

      chars.forEach((char, i) => {
        newOtp[i] = char;
      });

      setOtp(newOtp);
      inputs.current[chars.length - 1]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (!otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleContinue = async () => {
    try {
      const code = otp.join('');

      if (code.length !== OTP_LENGTH) {
        showError('Please entry the otp');
        return;
      }
      if (!email || !code) {
        return;
      }
      dispatch(verify({ email_phone: email, otp: code }));
    } catch (error) {}
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
          We have sent a code to your email
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
              textAlign="center"
              selectionColor={theme.primary}
            />
          ))}
        </View>

        <GradientButton
          title="Continue"
          style={{ marginTop: 24 }}
          onPress={handleContinue}
          loading={isLoading}
        />

        <TouchableOpacity style={{ marginTop: 18 }}>
          <Text style={{ color: theme.subText, textAlign: 'center' }}>
            Didn’t receive the OTP?{' '}
            <Text style={{ color: theme.primary, fontWeight: '600' }}>
              Resend
            </Text>
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
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 12,
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
    width: INPUT_SIZE,
    height: INPUT_SIZE + 10,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 22,
    fontWeight: '700',
  },
});
