"use client";

import { useFavorites } from "@/context/favorites-context";
import { HeartIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export default function MiniFavoriteButton({
  id,
  title,
  image,
  className,
}: {
  id: number;
  title: string;
  image: string | null;
  className?: string;
}) {
  const { isFavorite, toggleFavorite, loaded } = useFavorites();
  const active = loaded && isFavorite(id);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite({ id, title, image });
      }}
      aria-pressed={active}
      aria-label={active ? "Remove from favorites" : "Save to favorites"}
      title={active ? "Remove from favorites" : "Save to favorites"}
      className={cn(
        "frost flex h-9 w-9 items-center justify-center rounded-full shadow-rest transition hover:scale-105 active:scale-95",
        active ? "text-clay-600 dark:text-clay-300" : "text-ink hover:text-clay-600 dark:text-zinc-200",
        className,
      )}
    >
      <HeartIcon width={16} height={16} filled={active} />
    </button>
  );
}