import { createContext } from "react";

export type ToastContext = {
  toast: (message: string, type?: "success" | "warning" | "error") => void;
};

export const ToastCtx = createContext<ToastContext | null>(null);