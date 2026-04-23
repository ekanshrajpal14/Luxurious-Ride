import { PermissionsAndroid, Platform } from 'react-native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'react-native-image-picker';
import { getTheme } from '../../theme/helper';
import { useAppSelector } from '../../hooks/useAppSelector';

const EditScreen = () => {
  const theme = getTheme();
  const { user } = useAppSelector((state) => state.auth);
  const [name, setName] = useState(user?.name);
  const [phone, setPhone] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    await requestGalleryPermission();
    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
        videoQuality: 'high',
        maxHeight: 10,
        maxWidth: 100,
      },
      res => {
        console.log(res);
      },
    );
  };

  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA, // or READ_MEDIA_IMAGES
          {
            title: 'Gallery Permission',
            message: 'App needs access to your gallery',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Permission granted');
        } else {
          console.log('Permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const handleSave = () => {
    if (!name?.trim()) {
      Alert.alert('Validation', 'Please enter name');
      return;
    }

    if (!phone.trim()) {
      Alert.alert('Validation', 'Please enter phone number');
      return;
    }

    // TODO: Call your API here
    console.log({
      name,
      phone,
      imageUri,
    });

    Alert.alert('Success', 'Profile updated successfully');
  };

  const isDark = theme.mode === 'dark';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={['left', 'right', 'bottom']}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.text }]}>Edit Profile</Text>

        {/* Profile Image */}
        <TouchableOpacity style={styles.imageWrapper} onPress={pickImage}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={[styles.image, { borderColor: theme.border }]} />
          ) : (
            <View style={[styles.placeholder, { backgroundColor: isDark ? theme.card : '#E5E7EB', borderColor: theme.border }]}>
              <Text style={{ color: theme.grey }}>Upload Image</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Name */}
        <Text style={[styles.label, { color: theme.text }]}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          placeholderTextColor={theme.grey}
          style={[styles.input, { backgroundColor: theme.card, borderColor: theme.border, color: theme.text }]}
        />

        {/* Phone */}
        <Text style={[styles.label, { color: theme.text }]}>Phone Number</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter phone number"
          placeholderTextColor={theme.grey}
          keyboardType="phone-pad"
          style={[styles.input, { backgroundColor: theme.card, borderColor: theme.border, color: theme.text }]}
        />

        <Text style={[styles.label, { color: theme.text }]}>Email Address</Text>
        <TextInput
          value={user?.email}
          editable={false}
          placeholder="Enter email address"
          placeholderTextColor={theme.grey}
          keyboardType="email-address"
          style={[styles.input, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#E5E7EB', borderColor: theme.border, color: theme.grey }]}
        />

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.gold }]}
          onPress={handleSave}
        >
          <Text style={[styles.buttonText, { color: theme.ctaText }]}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },
  imageWrapper: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
  },
  placeholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontWeight: '700',
  },
});
