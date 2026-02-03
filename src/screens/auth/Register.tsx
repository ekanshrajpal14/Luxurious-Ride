import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React from 'react';
import { getTheme } from '../../theme/helper';
import Navbar from '../../components/global/Navbar';
import GradientButton from '../../components/customs/GradientButton';
import { Eye } from 'lucide-react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigationTypes';
import Input from '../../components/customs/Input';

type Props = NativeStackScreenProps<AuthStackParamList, 'register'>;
const Register: React.FC<Props> = ({ navigation }) => {
  const theme = getTheme();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={20}
    >
      <ScrollView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        {/* Header */}
        <Navbar />

        {/* Title */}
        <Text style={[styles.title, { color: theme.text }]}>Sign Up</Text>

        {/* Inputs */}
        <Input placeholder="Full Name" placeholderTextColor="#9a9a9a" />

        <Input placeholder="Email Address" placeholderTextColor="#9a9a9a" />

        <Input
          isPassword
          placeholder="Password"
          placeholderTextColor="#9a9a9a"
          secureTextEntry
        />

        <Input placeholder="Country" placeholderTextColor="#9a9a9a" />

        {/* Primary button */}
        <GradientButton
          title="Sign up"
          style={{ marginTop: 10 }}
          onPress={() => navigation.navigate('otpVerify')}
        />

        {/* Secondary button */}
        <GradientButton
          title="Login"
          gradient1="transparent"
          gradient2="transparent"
          textStyle={{ color: theme.primary }}
          style={{
            borderWidth: 1,
            borderColor: theme.primary,
            marginTop: 12,
          }}
          onPress={() => navigation.navigate('login')}
        />

        {/* Divider */}
        <View style={styles.divider}>
          <View style={[styles.line, { backgroundColor: theme.inputBg }]} />
          <Text style={styles.or}>Or</Text>
          <View style={[styles.line, { backgroundColor: theme.inputBg }]} />
        </View>

        <TouchableOpacity
          style={[styles.socialBtn, { backgroundColor: theme.socialBtn }]}
        >
          <Text style={styles.socialText}>G Google Pay</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footer}>
          Already have an account?{' '}
          <Text
            style={[styles.link, { color: theme.primary }]}
            onPress={() => navigation.navigate('login')}
          >
            Login.
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    marginBottom: 14,
  },
  passwordWrapper: {
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
  },
  eye: {
    fontSize: 16,
    opacity: 0.6,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
  },
  or: {
    marginHorizontal: 12,
    fontSize: 13,
    color: '#777',
  },
  socialBtn: {
    backgroundColor: '#f1f1f1',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 12,
  },
  socialText: {
    fontWeight: '600',
    fontSize: 14,
  },
  footer: {
    marginTop: 18,
    textAlign: 'center',
    fontSize: 13,
    color: '#777',
  },
  link: {
    fontWeight: '700',
  },
});

export default Register;
