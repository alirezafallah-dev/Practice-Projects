// فایل: components/layout/theme-toggle.tsx
"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@/components/ui/icons";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-10 w-10" />;

  const isDark = resolvedTheme === "dark";
  return (
    <button type="button" onClick={() => setTheme(isDark ? "light" : "dark")} aria-label="Toggle theme"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-linen bg-white/70 text-ink transition hover:text-sage-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200">
      {isDark ? <SunIcon width={16} height={16} /> : <MoonIcon width={16} height={16} />}
    </button>
  );
}