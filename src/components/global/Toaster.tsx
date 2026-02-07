import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { useToast } from '../../hooks/useToast';
import { useEffect } from 'react';
import { registerToast } from '../../utils/toastService';

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#16a34a', backgroundColor: '#dcfce7' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 15, fontWeight: 'bold', color: '#166534' }}
      text2Style={{ fontSize: 13, color: '#166534' }}
      text2Props={{ numberOfLines: 0 }}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#dc2626', backgroundColor: '#fee2e2' }}
      text1Style={{ fontSize: 15, fontWeight: 'bold', color: '#7f1d1d' }}
      text2Style={{ fontSize: 13, color: '#7f1d1d' }}
      text2Props={{ numberOfLines: 0 }}
    />
  ),

  info: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#2563eb', backgroundColor: '#dbeafe' }}
      text1Style={{ fontSize: 15, fontWeight: 'bold', color: '#1e3a8a' }}
      text2Style={{ fontSize: 13, color: '#1e3a8a' }}
      text2Props={{ numberOfLines: 0 }}
    />
  ),
};
const Toaster = () => {
  const toast = useToast();

  useEffect(() => {
    registerToast(toast);
  }, [toast]);
  
  return (
    <>
      <Toast config={toastConfig} />
    </>
  );
};

export default Toaster;
