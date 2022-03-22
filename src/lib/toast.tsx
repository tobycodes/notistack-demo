import { useRef, useMemo } from "react";
import { SnackbarKey, SnackbarProvider, useSnackbar } from "notistack";
import { Grow, Button } from "@mui/material";
import { CancelRounded } from "@mui/icons-material";
import type { SnackbarProviderProps, OptionsObject } from "notistack";
import type { TransitionProps } from "@mui/material/transitions";

export type ToastConfigProps = Omit<SnackbarProviderProps, "children">;

export const ToastProvider = (props: SnackbarProviderProps) => {
  const notistackRef = useRef<SnackbarProvider>(null);

  const snackBarConfig = useMemo<ToastConfigProps>(() => {
    const onClickDismiss = (key: ToastKey) => () => {
      notistackRef.current?.closeSnackbar(key);
    };

    return {
      ref: notistackRef,
      maxSnack: 5,
      preventDuplicate: true,
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
      TransitionComponent: Grow as React.ComponentType<TransitionProps>,
      action: (key) => (
        <Button onClick={onClickDismiss(key)}>
          <CancelRounded fontSize="medium" style={{ fill: "white" }} />
        </Button>
      ),
    };
  }, []);

  return <SnackbarProvider {...snackBarConfig} {...props} />;
};

export type ToastProps = Omit<OptionsObject, "variant">;

export type ToastKey = SnackbarKey;

export type ToastVariant = OptionsObject["variant"];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type ToastFunction<T extends ToastVariant> = (
  message: string,
  options?: ToastProps
) => ToastKey;

export interface Toast {
  success: ToastFunction<"success">;
  error: ToastFunction<"error">;
  info: ToastFunction<"info">;
  warning: ToastFunction<"warning">;
  default: ToastFunction<"default">;
  close: (key: ToastKey) => void;
}

export const useToast = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const toast: Toast = useMemo(() => {
    function createToastFn<T extends ToastVariant>(
      variant: T
    ): ToastFunction<T> {
      return (message: string, options?: ToastProps) =>
        enqueueSnackbar(message, { variant, ...options });
    }

    return {
      success: createToastFn("success"),
      error: createToastFn("error"),
      info: createToastFn("info"),
      warning: createToastFn("warning"),
      default: createToastFn("default"),
      close: (key) => closeSnackbar(key),
    };
  }, [enqueueSnackbar, closeSnackbar]);

  return toast;
};

export type withToastProps = { toast: Toast };

export const withToast =
  <P extends object>(Component: React.ComponentType<P>) =>
  (props: P) => {
    const toast = useToast();

    return <Component {...props} toast={toast} />;
  };
