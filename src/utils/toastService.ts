type ToastFn = (message: string, title?: string) => void;

let showErrorRef: ToastFn | null = null;
let showSuccessRef: ToastFn | null = null;
let showInfoRef: ToastFn | null = null;

export const registerToast = (toasts: {
  showError: ToastFn;
  showSuccess: ToastFn;
  showInfo: ToastFn;
}) => {
  showErrorRef = toasts.showError;
  showSuccessRef = toasts.showSuccess;
  showInfoRef = toasts.showInfo;
};

export const toastError = (message: string, title?: string) => {
  showErrorRef?.(message, title);
};

export const toastSuccess = (message: string, title?: string) => {
  showSuccessRef?.(message, title);
};

export const toastInfo = (message: string, title?: string) => {
  showInfoRef?.(message, title);
};
