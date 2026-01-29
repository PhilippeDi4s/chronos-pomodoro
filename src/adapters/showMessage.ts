import type { ReactNode } from 'react';
import { toast } from 'react-toastify';
import type { ToastOptions } from 'react-toastify';

export const showMessage = {
  success: (msg: ReactNode, options?: ToastOptions) => toast.success(msg, options),
  error: (msg: ReactNode, options?: ToastOptions) => toast.error(msg, options),
  warn: (msg: ReactNode, options?: ToastOptions) => toast.warn(msg, options),
  warning: (msg: ReactNode, options?: ToastOptions) => toast.warning(msg, options),
  info: (msg: ReactNode, options?: ToastOptions) => toast.info(msg, options),
  dismiss: () => toast.dismiss(),
};
