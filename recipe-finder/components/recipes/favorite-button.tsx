"use client";
import { useFavorites } from "@/context/favorites-context";
import { HeartIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import type { FavoriteRecipe } from "@/types";

export type FavRecipe = Pick<FavoriteRecipe, "id" | "title" | "image">;

export default function FavoriteButton({
  recipe,
  size = "md",
  variant = "icon",
  label,
  className,
}: {
  recipe: FavRecipe;
  size?: "sm" | "md" | "lg";
  variant?: "icon" | "floating" | "labeled";
  label?: string;
  className?: string;
}) {
  const { isFavorite, toggleFavorite, loaded } = useFavorites();
  const active = loaded && isFavorite(recipe.id);
  const icon = size === "sm" ? 14 : size === "lg" ? 20 : 16;
  const box = size === "sm" ? "h-8 w-8" : size === "lg" ? "h-12 w-12" : "h-10 w-10";

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(recipe);
  };
  const aria = active ? "Remove from favorites" : "Save to favorites";

  if (variant === "labeled") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        aria-label={aria}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-bold transition active:translate-y-0.5",
          active
            ? "border-terracotta bg-terracotta text-white shadow-lift"
            : "border-linen bg-porcelain text-espresso hover:border-terracotta hover:text-terracotta dark:border-white/15 dark:bg-white/5 dark:text-zinc-100",
          className
        )}
      >
        <HeartIcon width={icon} height={icon} filled={active} />
        {label ?? (active ? "Saved" : "Save")}
      </button>
    );
  }

  if (variant === "floating") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        aria-label={aria}
        className={cn(
          "inline-flex items-center justify-center rounded-full backdrop-blur transition active:translate-y-0.5",
          box,
          active
            ? "bg-terracotta text-white shadow-lift"
            : "border border-white/70 bg-white/85 text-espresso hover:border-terracotta hover:text-terracotta dark:border-white/15 dark:bg-black/45 dark:text-zinc-100",
          className
        )}
      >
        <HeartIcon width={icon} height={icon} filled={active} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={aria}
      className={cn(
        "inline-flex items-center justify-center rounded-full border transition active:translate-y-0.5",
        box,
        active
          ? "border-terracotta bg-terracotta text-white shadow-lift"
          : "border-linen bg-porcelain text-espresso hover:border-terracotta hover:text-terracotta dark:border-white/15 dark:bg-white/5 dark:text-zinc-100",
        className
      )}
    >
      <HeartIcon width={icon} height={icon} filled={active} />
    </button>
  );
}