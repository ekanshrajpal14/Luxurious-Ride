import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { getTheme } from '../../theme/helper';
import Navbar from '../../components/global/Navbar';
import GradientButton from '../../components/customs/GradientButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigationTypes';
import { Eye } from 'lucide-react-native';
import Input from '../../components/customs/Input';

type Props = NativeStackScreenProps<AuthStackParamList, 'login'>;

const Login: React.FC<Props> = ({ navigation }) => {
  const theme = getTheme();
  const [remember, setRemember] = useState(true);

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
        <Text style={[styles.title, { color: theme.text }]}>Welcome Back</Text>
        <Text style={[styles.subtitle, { color: theme.subText }]}>
          Ready to hit the road.
        </Text>

        <Input placeholder="Email Address" placeholderTextColor="#9a9a9a" />

        <Input
          isPassword
          placeholder="Password"
          placeholderTextColor="#9a9a9a"
          secureTextEntry={true}
          style={[styles.passwordInput, { color: theme.text }]}
        />

        {/* Remember + Forgot */}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.remember}
            onPress={() => setRemember(!remember)}
          >
            <View
              style={[
                styles.checkbox,
                { borderColor: theme.primary },
                remember && { backgroundColor: theme.primary },
              ]}
            />
            <Text style={[styles.rememberText, { color: theme.text }]}>
              Remember Me
            </Text>
          </TouchableOpacity>

          <Text
            style={[styles.forgot, { color: theme.primary }]}
            onPress={() => navigation.navigate('forgotPassword')}
          >
            Forgot Password?
          </Text>
        </View>

        {/* Primary button */}
        <GradientButton
          title="Login"
          onPress={() => navigation.navigate('otpVerify')}
        />

        {/* Secondary button */}
        <GradientButton
          title="Sign up"
          gradient1="transparent"
          gradient2="transparent"
          textStyle={{ color: theme.primary }}
          style={{
            borderWidth: 1,
            borderColor: theme.primary,
            marginTop: 12,
          }}
          onPress={() => navigation.navigate('register')}
        />

        {/* Divider */}
        <View style={styles.divider}>
          <View style={[styles.line, { backgroundColor: theme.inputBg }]} />
          <Text style={styles.or}>Or</Text>
          <View style={[styles.line, { backgroundColor: theme.inputBg }]} />
        </View>

        {/* Social */}
        <TouchableOpacity
          style={[styles.socialBtn, { backgroundColor: theme.socialBtn }]}
        >
          <Text style={styles.socialText}>G Google Pay</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footer}>
          Don’t have an account?{' '}
          <Text
            style={[styles.link, { color: theme.primary }]}
            onPress={() => navigation.navigate('register')}
          >
            Sign Up.
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  remember: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
  },
  rememberText: {
    fontSize: 13,
  },
  forgot: {
    fontSize: 13,
    fontWeight: '600',
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
    color: '#000',
  },
});

export default Login;
