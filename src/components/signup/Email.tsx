import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import GradientButton from '../customs/GradientButton';
import { textSizes } from '../../theme/text';
import { X } from 'lucide-react-native';
import { Theme } from '../../theme/types';

interface EmailProps {
  theme: Theme;
  changeStep: (step: number) => void;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const Email: React.FC<EmailProps> = ({ theme ,changeStep,email,setEmail}) => {
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardOpen(true),
    );
    const hideSub = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardOpen(false),
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={
        Platform.OS === 'ios' ? 64 : keyboardOpen ? 30 : 0
      }
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          {/* Top Content */}
          <View>
            <X size={30} color={theme.text} style={{ marginLeft: -5 }} />

            <Text
              style={{
                color: theme.text,
                fontWeight: '600',
                fontSize: textSizes.xl2,
                marginBottom: 20,
                marginTop: 10,
              }}
            >
              What's Your Email
            </Text>

            <TextInput
              placeholder="Enter email"
              placeholderTextColor={theme.grey}
              onChangeText={(text)=>setEmail(text)}
              value={email}
              style={{
                paddingVertical: 8,
                borderBottomWidth: 1,
                borderBottomColor: theme.grey,
                color: theme.text,
                marginBottom: 5,
              }}
            />

            <Text style={{ color: theme.grey, fontSize: textSizes.sm }}>
              We'll send you a code to verify your email. You may need to check
              your spam folder.
            </Text>
          </View>

          {/* Button */}
          <View
            style={[styles.footer, keyboardOpen && styles.footerKeyboardOpen]}
          >
            <GradientButton title="Send OTP" onPress={()=>changeStep(2)} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  footer: {
    paddingTop: 16,
  },
  footerKeyboardOpen: {
    marginBottom: 10, // 👈 extra spacing ONLY when keyboard is open
  },
});

export default Email;
