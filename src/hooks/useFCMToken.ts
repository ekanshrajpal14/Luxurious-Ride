import { useEffect } from 'react';
import { Platform, PermissionsAndroid, StyleSheet } from 'react-native';
import { getApp } from '@react-native-firebase/app';
import {
  getMessaging,
  requestPermission,
  getToken,
  onTokenRefresh,
  AuthorizationStatus,
} from '@react-native-firebase/messaging';

export const useFCMToken = () => {
  useEffect(() => {
    initFCM();

    // Token refresh listener
    const app = getApp();
    const messaging = getMessaging(app);

    const unsubscribe = onTokenRefresh(messaging, token => {
      console.log('🔄 Refreshed Token:', token);
    });

    return unsubscribe;
  }, []);
};

const initFCM = async () => {
  const app = getApp();
  const messaging = getMessaging(app);

  // Android 13+ permission
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }

  const authStatus = await requestPermission(messaging);

  const enabled =
    authStatus === AuthorizationStatus.AUTHORIZED ||
    authStatus === AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    const token = await getToken(messaging);
    console.log('🔥 FCM Token:', token);
  } else {
    console.log('❌ Notification permission denied');
  }
};
