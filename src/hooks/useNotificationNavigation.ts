import { useEffect } from 'react';
import { getApp } from '@react-native-firebase/app';
import {
  getMessaging,
  onNotificationOpenedApp,
  getInitialNotification,
  onMessage,
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import { handleNavigation, navigate } from '../services/navigationService';
import { useToast } from './useToast';
import { showNotifeeMessage } from '../services/notifeeService';

const useNotificationNavigation = () => {
  useEffect(() => {
    const messaging = getMessaging(getApp());

    const unsubscribeOnMessage = onMessage(messaging, async remoteMessage => {
      console.log('Foreground notification:', remoteMessage);
      showNotifeeMessage(
        remoteMessage?.notification?.title,
        remoteMessage?.notification?.body,
      );
      
    });

    const unsubscribeOpened = onNotificationOpenedApp(
      messaging,
      remoteMessage => {
        if (remoteMessage) {
          handleNavigation(remoteMessage);
        }
      },
    );

    getInitialNotification(messaging).then(remoteMessage => {
      if (remoteMessage) {
        console.log(remoteMessage);
        handleNavigation(remoteMessage);
      }
    });

    return () => {
      unsubscribeOnMessage();
      unsubscribeOpened();
    };
  }, []);
};


export default useNotificationNavigation;
