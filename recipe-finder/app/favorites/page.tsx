"use client";

import Image from "next/image";
import Link from "next/link";
import { useFavorites } from "@/context/favorites-context";
import { RecipeCardSkeleton } from "@/components/recipes/recipe-card-skeleton";
import { EmptyState } from "@/components/ui/states";
import { ExternalLinkIcon, TrashIcon } from "@/components/ui/icons";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";

export default function FavoritesPage() {
  const { favorites, removeFavorite, clearFavorites, loaded } = useFavorites();

  if (!loaded) {
    return (
      <div className="container-app py-8">
        <div className="skeleton mb-6 h-8 w-64 rounded-full" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <RecipeCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container-app py-6 md:py-8">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-medium">❤️ My Favorites</h1>
          {favorites.length > 0 && (
            <p className="mt-1 text-sm text-mineral dark:text-zinc-400">
              {favorites.length} saved recipe{favorites.length > 1 ? "s" : ""} — stored locally in your browser (LocalStorage).
            </p>
          )}
        </div>
        {favorites.length > 0 && (
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Remove all favorites?")) clearFavorites();
            }}
            className="rounded-2xl bg-oatmeal px-4 py-2 text-sm font-semibold text-ink transition hover:bg-clay-50 hover:text-clay-600 dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-clay-500/10"
          >
            Clear All
          </button>
        )}
      </header>

      {favorites.length === 0 ? (
        <EmptyState
          emoji="🧺"
          title="Your favorites list is empty"
          message="You haven't saved any recipes yet. Search by ingredients or dish name, find the compositions you love, and tap the heart ❤️ to keep them here forever."
          actionHref="/"
          actionLabel="Start Exploring 🍳"
        />
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favorites.map((f) => (
            <li key={f.id}>
              <article className="card card-hover group flex flex-col overflow-hidden">
                <Link href={`/recipe/${f.id}`} className="relative aspect-[4/3] overflow-hidden rounded-t-3xl bg-oatmeal dark:bg-ink-800">
                  <Image
                    src={f.image || PLACEHOLDER_IMAGE}
                    alt={f.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[400ms] group-hover:scale-[1.02]"
                  />
                </Link>

                <div className="flex flex-1 flex-col gap-3 p-5">
                  <h2 className="font-display line-clamp-2 text-lg font-medium leading-7">
                    <Link href={`/recipe/${f.id}`} className="transition hover:text-sage-700">
                      {f.title}
                    </Link>
                  </h2>
                  <p className="text-xs text-mineral dark:text-zinc-400">
                    Saved on {new Date(f.savedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                  <div className="mt-auto flex items-center gap-2 pt-1">
                    <Link
                      href={`/recipe/${f.id}`}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-sage-700 px-3 py-2 text-sm font-semibold text-alabaster transition hover:bg-sage-800"
                    >
                      View Recipe
                      <ExternalLinkIcon width={14} height={14} />
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeFavorite(f.id)}
                      aria-label={`Remove "${f.title}" from favorites`}
                      className="inline-flex items-center justify-center gap-1 rounded-2xl border border-clay-200 px-3 py-2 text-sm font-medium text-clay-600 transition hover:bg-clay-500 hover:text-white dark:border-clay-500/40 dark:text-clay-300"
                    >
                      <TrashIcon width={15} height={15} />
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}