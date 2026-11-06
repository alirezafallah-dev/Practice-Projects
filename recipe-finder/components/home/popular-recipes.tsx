import Image from "next/image";
import Link from "next/link";
import MiniFavoriteButton from "@/components/recipes/mini-favorite-button";
import { ArrowRightIcon, ArrowUpRightIcon, ClockIcon, UsersIcon, FlameIcon } from "@/components/ui/icons";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { searchRecipes } from "@/lib/spoonacular";
import { formatMinutes, translateDishType, truncate } from "@/lib/utils";
import type { RecipeSummary } from "@/types";

async function getPopularRecipes() {
  try {
    const res = await searchRecipes({ sort: "popularity", pageSize: 3 });
    if (res.results.length >= 3) return res.results.slice(0, 3);
  } catch {
    return [];
  }
  return [];
}

function FeatureCard({ recipe }: { recipe: RecipeSummary }) {
  return (
    <article className="card card-hover flex flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden rounded-t-3xl bg-oatmeal dark:bg-ink-800">
        <Image src={recipe.image || PLACEHOLDER_IMAGE} alt={recipe.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-[400ms] hover:scale-[1.02]" />
        <div className="absolute right-4 top-4 flex flex-wrap gap-2">
          {recipe.dishTypes[0] && <span className="pill bg-clay-500/90 text-white">{translateDishType(recipe.dishTypes[0])}</span>}
        </div>
        <MiniFavoriteButton id={recipe.id} title={recipe.title} image={recipe.image} className="absolute left-4 top-4" />
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-4">
          <span className="micro-label flex items-center gap-1.5">
            <ClockIcon width={13} height={13} className="text-sage-600" />
            {formatMinutes(recipe.readyInMinutes)}
          </span>
          <span className="micro-label flex items-center gap-1.5">
            <UsersIcon width={13} height={13} className="text-sage-600" />
            {recipe.servings ? `${recipe.servings} servings` : "—"}
          </span>
        </div>
        <h3 className="font-display mt-4 text-2xl font-medium leading-snug text-ink dark:text-zinc-50 md:text-3xl">{recipe.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-mineral dark:text-zinc-400">
          {truncate(recipe.summary, 160) || "A delicious composition ready for your kitchen."}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-linen pt-5 dark:border-white/10">
          <Link href={`/recipe/${recipe.id}`} className="btn-primary">
            View Recipe <ArrowRightIcon width={14} height={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}

function SideCard({ recipe }: { recipe: RecipeSummary }) {
  return (
    <article className="card card-hover flex-1 overflow-hidden">
      <Link href={`/recipe/${recipe.id}`} className="relative block aspect-[16/9] overflow-hidden rounded-t-3xl bg-oatmeal dark:bg-ink-800">
        <Image src={recipe.image || PLACEHOLDER_IMAGE} alt={recipe.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-[400ms] hover:scale-[1.02]" />
        {recipe.dishTypes[0] && <span className="pill absolute right-4 top-4 bg-sage-700/90 text-alabaster">{translateDishType(recipe.dishTypes[0])}</span>}
        {recipe.readyInMinutes && <span className="pill frost absolute bottom-4 left-4 text-ink dark:text-zinc-100"><ClockIcon width={12} height={12} /> {recipe.readyInMinutes}m</span>}
      </Link>
      <div className="p-6">
        <p className="micro-label text-clay-600 dark:text-clay-300">{recipe.cuisines[0] ?? translateDishType(recipe.dishTypes[0] ?? "") ?? "Popular"}</p>
        <h3 className="font-display mt-2 line-clamp-2 text-xl font-medium leading-snug text-ink dark:text-zinc-50">{recipe.title}</h3>
        <div className="mt-5 flex items-center justify-between">
          <span className="micro-label">{recipe.servings ? `${recipe.servings} Servings` : "—"}</span>
          <Link href={`/recipe/${recipe.id}`} aria-label={`View ${recipe.title}`} className="flex h-9 w-9 items-center justify-center rounded-full border border-linen text-ink transition hover:bg-oatmeal dark:border-white/15 dark:text-zinc-200 dark:hover:bg-white/5">
            <ArrowRightIcon width={15} height={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default async function PopularRecipes() {
  const picks = await getPopularRecipes();
  const [feature, ...sides] = picks;

  if (!feature) return null;

  return (
    <section className="container-app py-16 md:py-24">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="micro-label flex items-center gap-2 text-clay-600 dark:text-clay-300">
            <FlameIcon width={14} height={14} /> Trending Now
          </p>
          <h2 className="font-display mt-3 text-3xl font-medium text-ink dark:text-zinc-50 md:text-4xl">Most Loved Recipes</h2>
          <p className="mt-4 max-w-xl text-sm leading-8 text-mineral dark:text-zinc-400">Discover the dishes our community is cooking and loving this week.</p>
        </div>
        <Link href="/search?sort=popularity" className="btn-secondary rounded-full">
          View All <ArrowUpRightIcon width={14} height={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <FeatureCard recipe={feature} />
        <div className="flex flex-col gap-6">
          {sides.map((r) => <SideCard key={r.id} recipe={r} />)}
        </div>
      </div>
    </section>
  );
}