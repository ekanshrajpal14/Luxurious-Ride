import notifee from '@notifee/react-native';
export const showNotifeeMessage = async (
  title: string = 'New notification',
  body?: string,
  data?: any,
) => {
  await notifee.displayNotification({
    title,
    ...(body ? { body } : {}),
    android: {
      channelId: 'default',
      pressAction: {
        id: 'default',
      },
    },
    ...(data ? { data } : {}),
  });
};
