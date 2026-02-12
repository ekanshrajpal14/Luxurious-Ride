import {
  createNavigationContainerRef,
  CommonActions,
  StackActions,
} from '@react-navigation/native';
import { RootStackParamsList } from '../types/navigationTypes';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

export const navigationRef =
  createNavigationContainerRef<RootStackParamsList>();

let pendingNotification: any = null;
export function navigate<T extends keyof RootStackParamsList>(
  name: T,
  params?: RootStackParamsList[T],
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.navigate({
        name: name as string,
        params,
      }),
    );
  } else {
    console.log(name,params,"Data");
    
    pendingNotification = {
      name,
      params,
    };
  }
}

export async function flushPendingNavigation() {
  // await new Promise((resolve: any) => setTimeout(resolve, 700)); // due to splash screen 
  if (pendingNotification && navigationRef.isReady()) {
    console.log(pendingNotification);

    navigationRef.dispatch(
      CommonActions.navigate({
        name: pendingNotification.name as string,
        params: pendingNotification.params as never,
      }),
    );
    pendingNotification = null;
  }
}

export const handleNavigation = (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage | null,
  isFirebase: boolean = true,
  localData: any = null,
) => {
  const screen = isFirebase
    ? remoteMessage?.data?.screen ?? 'editProfile'
    : localData.screen || 'editProfile';
  const data: any = isFirebase ? remoteMessage?.data : localData.data;
  if (!screen) return;

  switch (screen) {
    case 'booking':
      navigate('mainApp', {
        screen: 'booking',
        params: {
          car_id: Number(data?.car_id),
          pickupLocation: String(data?.pickupLocation),
          pickupDate: String(data?.pickupDate),
          pickupTime: String(data?.pickupTime),
        },
      });
      break;

    case 'editProfile':
      navigate('mainApp', {
        screen: 'editProfile',
      });
      break;

    case 'search':
      navigate('mainApp', {
        screen: 'drawer',
        params: {
          screen: 'tabs',
          params: {
            screen: 'search',
          },
        },
      });
      break;

    default:
      console.log('Unknown screen from notification:', screen);
  }
};
