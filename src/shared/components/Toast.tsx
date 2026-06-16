import { useState, useCallback, type ReactNode } from "react";
import { Icons } from "./Icons";
import { ToastCtx } from "../contexts/ToastContext";
import type { ToastContext } from "../contexts/ToastContext";

let nextId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<{ id: number; message: string; type: "success" | "warning" | "error" }[]>([]);

  const addToast: ToastContext["toast"] = useCallback((message, type = "success") => {
    const id = ++nextId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const remove = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const styles: Record<string, string> = {
    success: "bg-green-500",
    warning: "bg-orange-400",
    error: "bg-red-500",
  };

  return (
    <ToastCtx.Provider value={{ toast: addToast }}>
      {children}

      <div className="fixed top-4 right-4 z-[60] flex flex-col gap-2 min-w-72">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`${styles[t.type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between gap-3 animate-slide-in`}
          >
            <span className="text-sm font-medium">{t.message}</span>
            <button onClick={() => remove(t.id)} className="shrink-0 opacity-80 hover:opacity-100">
              <Icons.X />
            </button>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}