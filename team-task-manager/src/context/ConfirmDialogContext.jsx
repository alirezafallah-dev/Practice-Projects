import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

const ConfirmDialogContext = createContext(null);

// Variant styles
const getVariantStyles = (variant) => {
  switch (variant) {
    case "danger":
      return {
        icon: "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400",
        button: "bg-red-600 hover:bg-red-700 text-white shadow-red-500/20",
      };
    case "warning":
      return {
        icon: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400",
        button: "bg-amber-600 hover:bg-amber-700 text-white shadow-amber-500/20",
      };
    default:
      return {
        icon: "bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400",
        button: "bg-brand-600 hover:bg-brand-700 text-white shadow-brand-500/20",
      };
  }
};

export function ConfirmDialogProvider({ children }) {
  const [dialog, setDialog] = useState({
    isOpen: false,
    message: "",
    title: "Confirm Action",
    confirmLabel: "Confirm",
    cancelLabel: "Cancel",
    variant: "danger", // "danger" | "warning" | "info"
  });

  const resolveRef = useRef(null);

  const closeDialog = useCallback((result) => {
    if (resolveRef.current) {
      resolveRef.current(result);
      resolveRef.current = null;
    }
    setDialog((prev) => ({ ...prev, isOpen: false }));
  }, []);

  // Close with ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && dialog.isOpen) {
        closeDialog(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [dialog.isOpen, closeDialog]);

  const confirm = useCallback((options) => {
    // Support both string and object arguments
    const config = typeof options === "string" ? { message: options } : options;

    return new Promise((resolve) => {
      if (resolveRef.current) {
        resolveRef.current(false);
      }
      resolveRef.current = resolve;

      setDialog({
        isOpen: true,
        message: config.message || "Are you sure?",
        title: config.title || "Confirm Action",
        confirmLabel: config.confirmLabel || "Confirm",
        cancelLabel: config.cancelLabel || "Cancel",
        variant: config.variant || "danger",
      });
    });
  }, []);

  // ✅ همین خط باعث ارور شده بود — حالا useMemo هم import شده
  const value = useMemo(() => ({ confirm }), [confirm]);

  const styles = getVariantStyles(dialog.variant);

  return (
    <ConfirmDialogContext.Provider value={value}>
      {children}

      <AnimatePresence>
        {dialog.isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => closeDialog(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
            >
              {/* Close button */}
              <button
                onClick={() => closeDialog(false)}
                className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Content */}
              <div className="p-6">
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${styles.icon} mb-4`}
                >
                  <AlertTriangle className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-2">
                  {dialog.title}
                </h3>

                {/* Message */}
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {dialog.message}
                </p>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => closeDialog(false)}
                    className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    {dialog.cancelLabel}
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => closeDialog(true)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all ${styles.button}`}
                  >
                    {dialog.confirmLabel}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ConfirmDialogContext.Provider>
  );
}

export function useConfirm() {
  const context = useContext(ConfirmDialogContext);
  if (!context) {
    throw new Error("useConfirm must be used within a ConfirmDialogProvider");
  }
  return context.confirm;
}