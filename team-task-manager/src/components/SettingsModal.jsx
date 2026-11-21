import { useEffect } from "react";
import { motion } from "framer-motion";
import { X, Sun, Moon, RotateCcw } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";
import { useApp } from "../context/AppContext.jsx";
import { useConfirm } from "../context/ConfirmDialogContext.jsx";
import { ROLE_LABELS } from "../constants";

export default function SettingsModal({ onClose }) {
  const { darkMode, toggle } = useTheme();
  const { currentUser } = useApp();
  const confirm = useConfirm();

  // بستن با ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const selectTheme = (wantDark) => {
    if (wantDark !== darkMode) toggle();
  };

  const handleReset = async () => {
    const ok = await confirm({
      title: "Reset Demo Data",
      message:
        "This will clear all local data (session, theme, changes) and restore the demo defaults. You will be signed out. Continue?",
      confirmLabel: "Reset",
      variant: "warning",
    });
    if (ok) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const themeButtonClass = (active) =>
    `flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
      active
        ? "bg-brand-50 dark:bg-brand-950/40 border-brand-300 dark:border-brand-700 text-brand-600 dark:text-brand-400"
        : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
    }`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-slate-900/60"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.15 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">
            Settings
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Account */}
          <section>
            <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
              Account
            </p>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800/60">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                {currentUser?.avatar || currentUser?.name?.charAt(0)?.toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                  {currentUser?.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {currentUser?.email}
                </p>
              </div>
              <span className="ml-auto px-2 py-0.5 rounded-md bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 text-[11px] font-semibold capitalize flex-shrink-0">
                {ROLE_LABELS[currentUser?.role]}
              </span>
            </div>
          </section>

          {/* Appearance */}
          <section>
            <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
              Appearance
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => selectTheme(false)} className={themeButtonClass(!darkMode)}>
                <Sun className="w-4 h-4" />
                Light
              </button>
              <button onClick={() => selectTheme(true)} className={themeButtonClass(darkMode)}>
                <Moon className="w-4 h-4" />
                Dark
              </button>
            </div>
          </section>

          {/* Data */}
          <section>
            <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
              Data
            </p>
            <button
              onClick={handleReset}
              className="w-full flex items-center gap-3 p-3 rounded-xl border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 hover:bg-amber-100 dark:hover:bg-amber-950/50 transition-colors text-left"
            >
              <RotateCcw className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                  Reset demo data
                </p>
                <p className="text-xs text-amber-600/80 dark:text-amber-500/80">
                  Clear local data and restore defaults
                </p>
              </div>
            </button>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
}