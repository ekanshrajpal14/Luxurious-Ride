import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { getTheme } from '../../theme/helper';
import { Eye, EyeOff } from 'lucide-react-native';

type Props = TextInputProps & {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isPassword?: boolean;
  containerStyle?: any;
};

const Input: React.FC<Props> = ({
  label,
  leftIcon,
  rightIcon,
  isPassword = false,
  containerStyle,
  style,
  ...rest
}) => {
  const theme = getTheme();
  const [secure, setSecure] = useState(isPassword);

  return (
    <View style={{ marginBottom: 14 }}>
      {label && (
        <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      )}

      <View
        style={[
          styles.wrapper,
          { backgroundColor: theme.inputBg },
          containerStyle,
        ]}
      >
        {leftIcon && <View style={styles.icon}>{leftIcon}</View>}

        <TextInput
          {...rest}
          secureTextEntry={secure}
          placeholderTextColor="#9a9a9a"
          style={[styles.input, { color: theme.text }, style]}
        />

        {isPassword ? (
          <TouchableOpacity
            onPress={() => setSecure(!secure)}
            style={styles.icon}
          >
            {secure ? (
              <Eye size={20} color="#9a9a9a" />
            ) : (
              <EyeOff size={20} color="#9a9a9a" />
            )}
          </TouchableOpacity>
        ) : (
          rightIcon && <View style={styles.icon}>{rightIcon}</View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    marginBottom: 6,
    fontWeight: '600',
  },
  wrapper: {
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
  },
  icon: {
    marginLeft: 8,
  },
});

export default Input;
