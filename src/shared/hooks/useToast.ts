import { useContext } from "react";
import { ToastCtx } from "../contexts/ToastContext";

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be inside ToastProvider");
  return ctx;
}