import Image from "next/image";
import Link from "next/link";
import MiniFavoriteButton from "./mini-favorite-button";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { formatMinutes, truncate } from "@/lib/utils";
import { ArrowRightIcon, ClockIcon, LeafIcon, StarIcon } from "@/components/ui/icons";
import type { RecipeSummary } from "@/types";

export default function RecipeCard({ recipe }: { recipe: RecipeSummary }) {
  return (
    <article className="card card-hover group flex flex-col overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-3xl bg-oatmeal dark:bg-ink-800">
        <Image
          src={recipe.image || PLACEHOLDER_IMAGE}
          alt={recipe.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-[400ms] group-hover:scale-[1.02]"
        />
        <MiniFavoriteButton id={recipe.id} title={recipe.title} image={recipe.image} className="absolute left-3 top-3" />
        {recipe.readyInMinutes ? (
          <span className="pill frost absolute bottom-3 right-3 text-ink dark:text-zinc-100">
            <ClockIcon width={12} height={12} />
            {formatMinutes(recipe.readyInMinutes)}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-display line-clamp-2 text-lg font-medium leading-7">{recipe.title}</h3>

        <p className="line-clamp-2 text-sm leading-6 text-mineral dark:text-zinc-400">
          {truncate(recipe.summary, 100) || "Open the full recipe for ingredients and step-by-step instructions."}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          {recipe.vegan && <Badge className="bg-sage-500/10 text-sage-700 dark:text-sage-300"><LeafIcon width={12} height={12} /> Vegan</Badge>}
          {!recipe.vegan && recipe.vegetarian && (
            <Badge className="bg-sage-500/10 text-sage-700 dark:text-sage-300"><LeafIcon width={12} height={12} /> Vegetarian</Badge>
          )}
          {recipe.glutenFree && <Badge className="bg-clay-500/10 text-clay-700 dark:text-clay-300">Gluten-Free</Badge>}
          {recipe.healthScore !== null && recipe.healthScore >= 70 && (
            <Badge className="bg-clay-500/10 text-clay-700 dark:text-clay-300"><StarIcon width={12} height={12} /> Health {recipe.healthScore}</Badge>
          )}
        </div>

        <div className="mt-auto pt-3">
          <Link
            href={`/recipe/${recipe.id}`}
            className="flex w-full items-center justify-center gap-1.5 rounded-2xl bg-sage-700 px-4 py-2.5 text-sm font-semibold text-alabaster shadow-rest transition hover:-translate-y-px hover:bg-sage-800 hover:shadow-lift"
          >
            View Details
            <ArrowRightIcon width={15} height={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`pill px-2.5 py-0.5 text-[10px] ${className ?? ""}`}>
      {children}
    </span>
  );
}