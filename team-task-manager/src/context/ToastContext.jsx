import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { generateId } from "../utils/storage";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timeouts = useRef({});

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) =>
      prevToasts.filter((toast) => toast.id !== id)
    );

    if (timeouts.current[id]) {
      clearTimeout(timeouts.current[id]);
      delete timeouts.current[id];
    }
  }, []);

  const addToast = useCallback(
    (message, type = "info", duration = 3500) => {
      const id = generateId();

      setToasts((prevToasts) => [
        ...prevToasts,
        {
          id,
          message,
          type,
        },
      ]);

      timeouts.current[id] = setTimeout(() => {
        removeToast(id);
      }, duration);
    },
    [removeToast]
  );

  const value = {
    addToast,
    success: (message, duration) => addToast(message, "success", duration),
    error: (message, duration) => addToast(message, "error", duration),
    info: (message, duration) => addToast(message, "info", duration),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="toast-container">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast toast-${toast.type}`}
            onClick={() => removeToast(toast.id)}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast باید داخل ToastProvider استفاده شود.");
  }

  return context;
}