import Toast from 'react-native-toast-message';

type ToastOptions = {
  title?: string;
  message?: string;
};

export const useToast = () => {
  const showSuccess = (message: string, title = 'Success') => {
    Toast.show({
      type: 'success',
      text1: title,
      text2: message,
    });
  };

  const showError = (message: string, title = 'Error') => {
    Toast.show({
      type: 'error',
      text1: title,
      text2: message,
    });
  };

  const showInfo = (message: string, title = 'Info') => {
    Toast.show({
      type: 'info',
      text1: title,
      text2: message,
    });
  };

  return {
    showError,
    showInfo,
    showSuccess,
  };
};
