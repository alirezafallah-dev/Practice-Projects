"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { FavoriteRecipe } from "@/types";

const STORAGE_KEY = "recipe-finder:favorites";

interface FavoritesContextValue {
  favorites: FavoriteRecipe[];
  /** تا قبل از mount شدن، مقدار localStorage خوانده نشده (جلوگیری از hydration mismatch) */
  loaded: boolean;
  isFavorite: (id: number) => boolean;
  /** اضافه/حذف — خروجی: true یعنی اضافه شد */
  toggleFavorite: (recipe: Omit<FavoriteRecipe, "savedAt">) => boolean;
  removeFavorite: (id: number) => void;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

function readFromStorage(): FavoriteRecipe[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter((f): f is FavoriteRecipe => Boolean(f) && typeof f.id === "number" && typeof f.title === "string")
      : [];
  } catch {
    return []; // داده خراب → شروع تمیز
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([]);
  const [loaded, setLoaded] = useState(false);

  // خواندن اولیه + همگام‌سازی بین تب‌ها با رویداد storage
  useEffect(() => {
    setFavorites(readFromStorage());
    setLoaded(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setFavorites(readFromStorage());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persist = useCallback((next: FavoriteRecipe[]) => {
    setFavorites(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // حریم خصوصی Safari / پر بودن quota → بی‌صدا نادیده می‌گیریم
    }
  }, []);

  const isFavorite = useCallback((id: number) => favorites.some((f) => f.id === id), [favorites]);

  const toggleFavorite = useCallback(
    (recipe: Omit<FavoriteRecipe, "savedAt">) => {
      const exists = favorites.some((f) => f.id === recipe.id);
      const next = exists
        ? favorites.filter((f) => f.id !== recipe.id)
        : [{ ...recipe, savedAt: Date.now() }, ...favorites];
      persist(next);
      return !exists;
    },
    [favorites, persist],
  );

  const removeFavorite = useCallback(
    (id: number) => persist(favorites.filter((f) => f.id !== id)),
    [favorites, persist],
  );

  const clearFavorites = useCallback(() => persist([]), [persist]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, loaded, isFavorite, toggleFavorite, removeFavorite, clearFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites باید داخل FavoritesProvider استفاده شود.");
  return ctx;
}