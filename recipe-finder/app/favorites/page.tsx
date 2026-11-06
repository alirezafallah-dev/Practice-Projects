"use client";
import Image from "next/image";
import Link from "next/link";
import { useFavorites } from "@/context/favorites-context";
import FavoriteButton from "@/components/recipes/favorite-button";
import { RecipeCardSkeleton } from "@/components/recipes/recipe-card-skeleton";
import { EmptyState } from "@/components/ui/states";
import { ExternalLinkIcon } from "@/components/ui/icons";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";

export default function FavoritesPage() {
  const { favorites, clearFavorites, loaded } = useFavorites();

  if (!loaded) {
    return (
      <div className="container-app py-8">
        <div className="skeleton mb-6 h-8 w-64 rounded-full" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => <RecipeCardSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="container-app py-6 md:py-8">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">❤️ My Favorites</h1>
          {favorites.length > 0 && (
            <p className="mt-1 text-sm text-mineral dark:text-zinc-400">
              {favorites.length} saved recipe{favorites.length > 1 ? "s" : ""} — stored locally in your browser.
            </p>
          )}
        </div>
        {favorites.length > 0 && (
          <button
            type="button"
            onClick={() => { if (window.confirm("Remove all favorites?")) clearFavorites(); }}
            className="rounded-full bg-terracotta/10 px-4 py-2 text-sm font-bold text-terracotta-700 transition hover:bg-terracotta/20 dark:text-terracotta-200"
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
                <Link href={`/recipe/${f.id}`} className="relative aspect-[4/3] overflow-hidden rounded-t-3xl bg-canvas dark:bg-white/5">
                  <Image
                    src={f.image || PLACEHOLDER_IMAGE}
                    alt={f.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[400ms] group-hover:scale-[1.02]"
                  />
                </Link>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <h2 className="font-display line-clamp-2 text-lg font-bold leading-7">
                    <Link href={`/recipe/${f.id}`} className="transition hover:text-terracotta">{f.title}</Link>
                  </h2>
                  <p className="text-xs text-mineral dark:text-zinc-400">
                    Saved on {new Date(f.savedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                  <div className="mt-auto flex items-center gap-2 pt-1">
                    <Link
                      href={`/recipe/${f.id}`}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-rosemary px-3 py-2 text-sm font-bold text-white transition hover:bg-rosemary-600"
                    >
                      View Recipe <ExternalLinkIcon width={14} height={14} />
                    </Link>
                    <FavoriteButton recipe={{ id: f.id, title: f.title, image: f.image }} variant="labeled" size="sm" label="Remove" />
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