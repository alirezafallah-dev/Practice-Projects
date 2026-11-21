import { createContext, useContext, useState, useCallback, useEffect, useRef, useMemo } from "react";

const ConfettiContext = createContext(null);

export function ConfettiProvider({ children }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const timerRef = useRef(null);

  const triggerConfetti = useCallback(() => {
    setShowConfetti(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const value = useMemo(() => ({ showConfetti, triggerConfetti }), [showConfetti, triggerConfetti]);

  return <ConfettiContext.Provider value={value}>{children}</ConfettiContext.Provider>;
}

export function useConfetti() {
  const ctx = useContext(ConfettiContext);
  if (!ctx) throw new Error("useConfetti must be used within ConfettiProvider");
  return ctx;
}