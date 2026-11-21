import { createContext, useContext, useState, useEffect, useMemo } from "react";

const CommandPaletteContext = createContext(null);

export function CommandPaletteProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const value = useMemo(() => ({ isOpen, setIsOpen }), [isOpen]);

  return (
    <CommandPaletteContext.Provider value={value}>
      {children}
    </CommandPaletteContext.Provider>
  );
}

export function useCommandPalette() {
  const context = useContext(CommandPaletteContext);
  if (!context) throw new Error("useCommandPalette must be used within CommandPaletteProvider");
  return context;
}