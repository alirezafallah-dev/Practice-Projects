"use client";

import { useState } from "react";
import { useFavorites } from "@/context/favorites-context";
import { CheckIcon, HeartIcon } from "@/components/ui/icons";

export default function FavoriteButton({
  id,
  title,
  image,
}: {
  id: number;
  title: string;
  image: string | null;
}) {
  const { isFavorite, toggleFavorite, loaded } = useFavorites();
  const [feedback, setFeedback] = useState<string | null>(null);
  const active = loaded && isFavorite(id);

  function onClick() {
    const added = toggleFavorite({ id, title, image });
    setFeedback(added ? "✓ Saved! Find it on your Favorites page." : "Removed from favorites.");
    window.setTimeout(() => setFeedback(null), 2500);
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={
          active
            ? "inline-flex items-center justify-center gap-2 rounded-2xl border border-sage-300 bg-sage-500/10 px-6 py-3.5 font-bold text-sage-700 shadow-rest transition hover:bg-sage-500/20 active:scale-95 dark:text-sage-300"
            : "inline-flex items-center justify-center gap-2 rounded-2xl bg-sage-700 px-6 py-3.5 font-bold text-alabaster shadow-lift transition hover:-translate-y-px hover:bg-sage-800 active:scale-95"
        }
      >
        {active ? <CheckIcon width={20} height={20} /> : <HeartIcon width={20} height={20} />}
        {active ? "Saved to Favorites" : "Save to Favorites"}
      </button>
      {feedback && (
        <p role="status" className="text-center text-xs font-medium text-mineral dark:text-zinc-400">
          {feedback}
        </p>
      )}
    </div>
  );
}