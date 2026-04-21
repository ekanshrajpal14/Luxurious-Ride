import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { getTheme } from '../../theme/helper';
import Navbar from '../../components/global/Navbar';
import GradientButton from '../../components/customs/GradientButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigationTypes';
import Input from '../../components/customs/Input';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useToast } from '../../hooks/useToast';
import { loginUser, loginUserWithGoogle } from '../../store/slices/authSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

type Props = NativeStackScreenProps<AuthStackParamList, 'login'>;

const Login: React.FC<Props> = ({ navigation }) => {

  const dispatch = useAppDispatch();
  const { showError } = useToast();
  const theme = getTheme();
  const [remember, setRemember] = useState(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [googleLoading, setGoogleLoading] = useState(false);
  const { accessToken, loginLoader, isUserVerified, googleLoginLoader } = useAppSelector(
    state => state.auth,
  );
  useEffect(() => {
    if (!email && !password) return;
    if (accessToken && isUserVerified) {
      navigation.getParent()?.navigate('mainApp');
    } else if (!accessToken && !isUserVerified) {
      navigation.navigate('otpVerify', {
        email_phone: email,
      });
    }
    return () => {
      setEmail('');
      setPassword('');
    };
  }, [accessToken, isUserVerified]);
  const handleLogin = async () => {
    try {
      if (!email.trim() || !password.trim()) {
        return showError('Email and password cannot be empty');
      }
      dispatch(loginUser({ email_phone: email, password }));
    } catch (error) { }
  };
  const signInWithGoogle = async () => {
    try {
      setGoogleLoading(true);
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices();
      const userInfo: any = await GoogleSignin.signIn();
      dispatch(loginUserWithGoogle({ id_token: userInfo.data.idToken }));
    } catch (error) {
      console.log(error);
    } finally {
      setGoogleLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
    // keyboardVerticalOffset={20}
    >
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ flexGrow: 1 }}
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        {/* Header */}
        <Navbar />

        {/* Title */}
        <Text style={[styles.title, { color: theme.text }]}>Welcome Back</Text>
        <Text style={[styles.subtitle, { color: theme.subText }]}>
          Ready to hit the road.
        </Text>

        <Input
          placeholder="Email Address"
          placeholderTextColor="#9a9a9a"
          value={email}
          keyboardType="email-address"
          onChangeText={e => setEmail(e)}
          style={{ textTransform: 'lowercase' }}
        />

        <Input
          isPassword
          placeholder="Password"
          placeholderTextColor="#9a9a9a"
          value={password}
          onChangeText={e => setPassword(e)}
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
          onPress={handleLogin}
          loading={loginLoader}
        />
        {/* Divider */}
        <View style={styles.divider}>
          <View style={[styles.line, { backgroundColor: theme.inputBg }]} />
          <Text style={styles.or}>Or</Text>
          <View style={[styles.line, { backgroundColor: theme.inputBg }]} />
        </View>

        <View style={{ width: "100%", height: 48, borderRadius: 14, overflow: 'hidden', borderWidth: 1, borderColor: theme.inputBg }}>
          {googleLoginLoader ? (
            <View style={{ width: '100%', height: 48, borderRadius: 14, backgroundColor: theme.inputBg, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator color={theme.primary} />
            </View>
          ) : (
            <GoogleSigninButton style={{ width: "100%" }} size={GoogleSigninButton.Size.Wide} color={GoogleSigninButton.Color.Dark} onPress={signInWithGoogle} />
          )}
        </View>
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
