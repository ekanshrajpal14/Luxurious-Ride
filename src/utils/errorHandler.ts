import { BackendError } from '../api/types';

export const showErrorMessage = (
  error: unknown,
  showError: (msg: string, title?: string) => void,
) => {
  const err = error as BackendError;
  console.log(err);
  return showError(err.message + err?.errors[0]?.msg, err.errName);
};
