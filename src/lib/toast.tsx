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
export type ToastFunction<T> = (
  message: string,
  options?: ToastProps
) => ToastKey;

export const useToast = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const toast = useMemo(() => {
    const createToastFn =
      <T extends ToastVariant>(variant: T): ToastFunction<T> =>
      (message: string, options?: ToastProps) =>
        enqueueSnackbar(message, { variant, ...options });

    return {
      success: createToastFn("success"),
      error: createToastFn("error"),
      info: createToastFn("info"),
      warning: createToastFn("warning"),
      default: createToastFn("default"),
      close: (key: ToastKey) => closeSnackbar(key),
    };
  }, [enqueueSnackbar, closeSnackbar]);

  return toast;
};