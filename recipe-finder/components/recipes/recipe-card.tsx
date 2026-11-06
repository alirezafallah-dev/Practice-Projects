import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/recipes/favorite-button";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { formatMinutes, truncate } from "@/lib/utils";
import { ClockIcon, StarIcon, UsersIcon, ArrowRightIcon } from "@/components/ui/icons";
import type { RecipeSummary } from "@/types";

export default function RecipeCard({ recipe }: { recipe: RecipeSummary }) {
  const rating = Math.round(((recipe.spoonacularScore ?? 0) / 100) * 5 * 10) / 10;
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-ecru bg-porcelain shadow-rest transition hover:-translate-y-1 hover:shadow-lift dark:border-white/10 dark:bg-white/5">
      <div className="relative aspect-[4/3] overflow-hidden bg-canvas dark:bg-white/5">
        <Image
          src={recipe.image || PLACEHOLDER_IMAGE}
          alt={recipe.title}
          fill
          sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <Link href={`/recipe/${recipe.id}`} className="absolute inset-0 z-10" aria-label={`View ${recipe.title}`} />
        <FavoriteButton
          recipe={{ id: recipe.id, title: recipe.title, image: recipe.image }}
          variant="floating"
          size="sm"
          className="absolute right-3 top-3 z-20"
        />
        <span className="absolute left-3 top-3 z-20 inline-flex items-center gap-1 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-bold text-espresso backdrop-blur dark:bg-black/50 dark:text-zinc-100">
          <ClockIcon width={12} height={12} />
          {formatMinutes(recipe.readyInMinutes)}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="flex items-center gap-1 text-xs font-bold text-espresso dark:text-zinc-100">
          <StarIcon width={13} height={13} className="text-apricot" fill="currentColor" />
          {rating}
          <span className="font-medium text-mineral">({(recipe.aggregateLikes ?? 0).toLocaleString("en-US")})</span>
        </p>
        <h3 className="font-display line-clamp-2 text-lg font-bold leading-6 text-espresso dark:text-zinc-50">
          <Link href={`/recipe/${recipe.id}`} className="transition hover:text-terracotta">{recipe.title}</Link>
        </h3>
        <p className="line-clamp-2 text-sm leading-6 text-espresso-700 dark:text-zinc-400">
          {truncate(recipe.summary, 110) || "A wholesome dish from our test kitchen."}
        </p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-mineral">
            <UsersIcon width={14} height={14} />
            {recipe.servings ? `${recipe.servings} Servings` : "—"}
          </span>
          <Link href={`/recipe/${recipe.id}`} className="inline-flex items-center gap-1 text-xs font-bold text-terracotta transition hover:gap-2">
            Cook Dish <ArrowRightIcon width={14} height={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}