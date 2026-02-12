import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { useEffect } from 'react';
import { handleNavigation } from '../services/navigationService';

async function createNotificationChannel() {
  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  notifee.onBackgroundEvent(async ({ type, detail }) => {
    if (type === EventType.PRESS) {
      handleNavigation(null, false, {
        data: detail.notification?.data,
        screen: 'search',
      });
    }
  });
  const unsubscribeNotifee = notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.PRESS) {
      handleNavigation(null, false, {
        data: detail.notification?.data,
        screen: 'search',
      });
    }
  });
  return () => {
    unsubscribeNotifee();
  };
}

const useNotifeeChannel = () => {
  useEffect(() => {
    createNotificationChannel();
  }, []);
};

export default useNotifeeChannel;
