"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@/components/ui/icons";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-linen bg-white/70 text-ink transition hover:text-sage-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
    >
      {mounted ? isDark ? <SunIcon width={16} height={16} /> : <MoonIcon width={16} height={16} /> : <span className="h-4 w-4" />}
    </button>
  );
}