import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("darkMode")) ?? false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggle = useCallback(() => setDarkMode((d) => !d), []);
  const value = useMemo(() => ({ darkMode, toggle }), [darkMode, toggle]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}