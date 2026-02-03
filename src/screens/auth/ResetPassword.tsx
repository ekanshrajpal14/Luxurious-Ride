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
import Input from '../../components/customs/Input';

type Props = NativeStackScreenProps<AuthStackParamList, 'forgotPassword'>;

const ResetPassword: React.FC<Props> = ({ navigation }) => {
  const theme = getTheme();
  const [email, setEmail] = useState('');

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
        <Text style={[styles.title, { color: theme.text }]}>
          Reset your password
        </Text>

        <Text style={[styles.subtitle, { color: theme.subText }]}>
          Enter the email address associated with your account and we’ll send
          you a link to reset your password.
        </Text>

        {/* Input */}
        <Input
          placeholder="Email Address"
          placeholderTextColor="#9a9a9a"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Button */}
        <GradientButton
          title="Continue"
          style={{ marginTop: 10 }}
          onPress={() => {
            // TODO: call reset password API
          }}
        />

        {/* Footer Links */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginTop: 22 }}
        >
          <Text style={[styles.backText, { color: theme.primary }]}>
            Return to sign in
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('register')}
          style={{ marginTop: 16 }}
        >
          <Text style={[styles.createAccount, { color: theme.text }]}>
            Create a New account
          </Text>
        </TouchableOpacity>
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    marginBottom: 18,
  },
  backText: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
  },
  createAccount: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '700',
  },
});

export default ResetPassword;
