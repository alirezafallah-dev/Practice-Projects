import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DetailActions from "@/components/recipe/detail-actions";
import PantryChecklist from "@/components/recipe/pantry-checklist";
import Preparation from "@/components/recipes/preparation";
import { MockBanner, ErrorState } from "@/components/ui/states";
import {
  CameraIcon,
  FlameIcon,
  PulseIcon,
  StarIcon,
  UsersIcon,
  ClockIcon,
  VerifiedIcon,
  WineIcon,
  LeafIcon,
} from "@/components/ui/icons";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { ApiError, getRecipeById, hasApiKey } from "@/lib/spoonacular";
import { cn, formatMinutes, stripHtml, translateDiet, truncate } from "@/lib/utils";
import type { RecipeDetail } from "@/types";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const recipe = await getRecipeById(Number(id));
    if (!recipe) return { title: "Recipe not found" };
    return {
      title: recipe.title,
      description: truncate(recipe.summary, 140) || `Ingredients and step-by-step instructions for ${recipe.title}`,
      openGraph: recipe.image ? { images: [{ url: recipe.image }] } : undefined,
    };
  } catch {
    return { title: "Recipe Details" };
  }
}

/* ---------- Editorial helpers ---------- */

function ratingOf(recipe: RecipeDetail): number {
  return Math.round(((recipe.spoonacularScore ?? 70) / 100) * 5 * 10) / 10;
}

function pickPairing(recipe: RecipeDetail) {
  const t = `${recipe.title} ${recipe.summary}`.toLowerCase();
  if (/salmon|fish|seafood|shrimp|cod/.test(t))
    return { wine: "Cru Chablis 2021", note: "Pair with an unoaked, flint-driven Chardonnay from Northern Burgundy or a coastal Vermentino. Razor-sharp minerality cuts cleanly through rich oils whilst mirroring citrus nuances.", temp: "10°C – 12°C", glass: "White Burgundy Balloon" };
  if (/beef|lamb|steak/.test(t))
    return { wine: "Left-Bank Bordeaux 2019", note: "Structured tannins and cassis depth embrace charred proteins, rosemary smoke and slow-roasted juices.", temp: "16°C – 18°C", glass: "Bordeaux Tulip" };
  if (/chicken|turkey|cream|cheese/.test(t))
    return { wine: "White Burgundy 2020", note: "Gentle oak and bright acidity mirror cultured cream, brown butter and soft herbs without overwhelming them.", temp: "11°C – 13°C", glass: "Chardonnay Bowl" };
  if (/tomato|pizza|pasta|risotto|italian/.test(t))
    return { wine: "Chianti Classico 2020", note: "Sangiovese's sour-cherry lift and dusty tannin balance tomato acidity, basil and aged cheese.", temp: "14°C – 16°C", glass: "Medium Bordeaux Stem" };
  if (/chocol|cake|galette|fig|dessert|tart/.test(t))
    return { wine: "10-Year Tawny Port", note: "Caramelized nut tones and dried-fruit warmth echo bitter cocoa, burnt honey and flaky pastry.", temp: "12°C – 14°C", glass: "Port Pipe" };
  return { wine: "Provence Rosé 2022", note: "Pale, saline and herbal — a universal companion to seasonal vegetable plates and bright dressings.", temp: "8°C – 10°C", glass: "White Wine Stem" };
}

function TasteBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="micro-label">{label}</p>
        <p className="micro-label text-ink dark:text-zinc-200">{value}%</p>
      </div>
      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-linen dark:bg-white/10">
        <div className={cn("h-full rounded-full", color)} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default async function RecipeDetailPage({ params }: Props) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) notFound();

  let recipe: RecipeDetail | null = null;
  let errorMessage: string | null = null;

  try {
    recipe = await getRecipeById(numericId);
    if (!recipe) notFound();
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    errorMessage = error instanceof ApiError ? error.message : "Unexpected error while fetching the recipe.";
  }

  if (errorMessage || !recipe) {
    return (
      <div className="container-app py-10">
        <ErrorState message={errorMessage ?? "Recipe not found."} retryHref="/search" />
      </div>
    );
  }

  const cuisine = recipe.cuisines[0] ?? "House Collection";
  const rating = ratingOf(recipe);
  const likes = recipe.aggregateLikes ?? 0;
  const ease = recipe.readyInMinutes ? Math.min(95, Math.max(15, 100 - recipe.readyInMinutes)) : 50;
  const pairing = pickPairing(recipe);
  const thumbs = recipe.ingredients.filter((i) => i.image).slice(0, 4);
  const flags = [
    recipe.vegan ? "Vegan" : recipe.vegetarian ? "Vegetarian" : null,
    recipe.glutenFree ? "Gluten-Free" : null,
    recipe.dairyFree ? "Dairy-Free" : null,
  ].filter((f): f is string => Boolean(f));

  return (
    <article>
      {/* ---------- Masthead band ---------- */}
      <div className="border-b border-linen dark:border-white/10">
        <div className="container-app flex flex-wrap items-center justify-between gap-2 py-3">
          <p className="micro-label flex flex-wrap items-center gap-2">
            <span>Vol. 2024</span>
            <span className="text-linen dark:text-white/20">/</span>
            <span>{cuisine.toUpperCase()}</span>
            <span className="text-linen dark:text-white/20">/</span>
            <span className="max-w-56 truncate text-ink dark:text-zinc-200">{recipe.title.toUpperCase()}</span>
          </p>
          <p className="micro-label flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-clay-600 dark:text-clay-300">
              <FlameIcon width={13} height={13} />
              {(recipe.spoonacularScore ?? 0) >= 85 ? "Editor's Selection" : "Guild Tested"}
            </span>
            <span>ISSN 2748-091X</span>
          </p>
        </div>
      </div>

      {!hasApiKey() && (
        <div className="container-app pt-6">
          <MockBanner />
        </div>
      )}

      <div className="container-app grid grid-cols-1 gap-10 py-8 md:py-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        {/* ================= LEFT: media rail ================= */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          {/* Portrait hero frame */}
          <div className="relative overflow-hidden rounded-3xl border border-linen bg-oatmeal shadow-rest dark:border-white/10 dark:bg-ink-800">
            <div className="relative aspect-[4/5]">
              <Image
                src={recipe.image || PLACEHOLDER_IMAGE}
                alt={recipe.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-950/70 to-transparent" />
              <span className="pill frost absolute left-4 top-4 text-ink dark:text-zinc-100">
                <VerifiedIcon width={13} height={13} className="text-sage-600" />
                {(recipe.spoonacularScore ?? 0) >= 90 ? "Master Class Proven" : "Guild Tested"}
              </span>
              <span className="pill absolute bottom-4 right-4 bg-ink-950/70 text-alabaster backdrop-blur">
                <CameraIcon width={13} height={13} />
                Plating • 01 of 01
              </span>
              <p className="micro-label absolute bottom-4 left-4 max-w-[60%] truncate text-alabaster">
                {recipe.title.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Step / pantry photography */}
          {thumbs.length > 0 && (
            <div>
              <div className="flex items-center justify-between">
                <p className="micro-label">Step Photography</p>
                <p className="micro-label">Click to inspect</p>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {thumbs.map((t, i) => (
                  <a
                    key={`${t.id}-${i}`}
                    href={t.image as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={t.name}
                    className="relative block aspect-square overflow-hidden rounded-xl border border-linen transition hover:scale-[1.03] hover:shadow-lift dark:border-white/10"
                  >
                    <Image src={t.image as string} alt={t.name} fill sizes="96px" className="object-cover" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Taste profile index */}
          <div className="card p-5">
            <div className="flex items-center justify-between">
              <p className="micro-label flex items-center gap-1.5 text-ink dark:text-zinc-100">
                <PulseIcon width={14} height={14} className="text-sage-600" />
                Taste Profile Index
              </p>
              <p className="micro-label">Harmonic Score: {recipe.spoonacularScore ?? "—"}%</p>
            </div>
            <div className="mt-4 space-y-4">
              <TasteBar label="Health & Vitality" value={recipe.healthScore ?? 50} color="bg-clay-500" />
              <TasteBar label="Harmonic Balance" value={recipe.spoonacularScore ?? 50} color="bg-ink-800 dark:bg-zinc-300" />
              <TasteBar label="Weeknight Ease" value={ease} color="bg-sage-500" />
            </div>
          </div>
        </aside>

        {/* ================= RIGHT: narrative ================= */}
        <div className="space-y-8">
          {/* Folio + rating */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="pill bg-oatmeal text-ink dark:bg-white/5 dark:text-zinc-200">
              {cuisine} Folio • Issue No. {(recipe.id % 12) + 1}
            </span>
            <p className="micro-label flex items-center gap-1.5">
              <span className="flex text-clay-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} width={13} height={13} fill={i < Math.round(rating) ? "currentColor" : "none"} className={i < Math.round(rating) ? "" : "opacity-40"} />
                ))}
              </span>
              <span className="font-bold text-ink dark:text-zinc-100">{rating}</span>
              <span>({likes.toLocaleString("en-US")} verified cooks)</span>
            </p>
          </div>

          {/* Title + description */}
          <header>
            <h1 className="font-display text-4xl font-medium leading-[1.15] text-ink md:text-5xl dark:text-zinc-50">
              {recipe.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-8 text-mineral dark:text-zinc-400">
              {stripHtml(recipe.summary) || "A seasonal composition from the SAVOR test kitchen, balanced for home cooks."}
            </p>
          </header>

          {/* Author */}
          <div className="flex items-center gap-3">
            <span className="font-display flex h-11 w-11 items-center justify-center rounded-full border border-linen bg-oatmeal text-lg dark:border-white/10 dark:bg-ink-800">
              {(recipe.sourceName ?? "S").charAt(0)}
            </span>
            <div>
              <p className="flex items-center gap-1.5 text-sm font-bold text-ink dark:text-zinc-100">
                {recipe.sourceName ?? "Spoonacular Community"}
                <VerifiedIcon width={14} height={14} className="text-sage-600" />
              </p>
              <p className="micro-label mt-0.5">{recipe.creditText ?? "Independent Culinary Guild • Verified Source"}</p>
            </div>
          </div>

          {/* Meta tiles */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <MetaTile icon={<ClockIcon width={16} height={16} />} label="Prep Time" value={formatMinutes(recipe.readyInMinutes)} />
            <MetaTile icon={<FlameIcon width={16} height={16} />} label="Calories" value={recipe.calories !== null ? `${recipe.calories} kcal` : "—"} />
            <MetaTile icon={<UsersIcon width={16} height={16} />} label="Servings" value={recipe.servings ? `${recipe.servings} Persons` : "—"} />
            <MetaTile icon={<LeafIcon width={16} height={16} />} label="Health Score" value={recipe.healthScore !== null ? `${recipe.healthScore}/100` : "—"} />
          </div>

          {/* Actions */}
          <DetailActions id={recipe.id} title={recipe.title} image={recipe.image} flags={flags} />

          {/* Pantry provisions */}
          {recipe.ingredients.length > 0 ? (
            <PantryChecklist ingredients={recipe.ingredients} />
          ) : (
            <p className="rounded-3xl border border-linen bg-oatmeal p-6 text-sm text-mineral dark:border-white/10 dark:bg-ink-900">
              No ingredient list was published for this recipe.
            </p>
          )}

          {/* Preparation routine */}
          {recipe.instructions.length > 0 ? (
            <Preparation steps={recipe.instructions} />
          ) : (
            <p className="text-sm text-mineral">
              Step-by-step instructions were not published in a structured format; see the original source for the full method.
            </p>
          )}

          {/* Sommelier pairing */}
          <section className="rounded-3xl border border-linen bg-oatmeal p-6 dark:border-white/10 dark:bg-ink-900">
            <div className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sage-700 text-alabaster">
                <WineIcon width={20} height={20} />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-xl font-medium">Sommelier Cellar Pairing</h2>
                  <span className="pill bg-clay-500/10 text-clay-600 dark:text-clay-300">{pairing.wine.toUpperCase()}</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-mineral dark:text-zinc-400">{pairing.note}</p>
                <p className="micro-label mt-4">
                  Serving Temp: {pairing.temp} <span className="mx-2 text-linen dark:text-white/20">•</span> Stemware: {pairing.glass}
                </p>
              </div>
            </div>
          </section>

          {recipe.sourceUrl && (
            <p className="micro-label">
              Original source:{" "}
              <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-sage-700 underline-offset-4 hover:underline dark:text-sage-300">
                {recipe.sourceName ?? "Spoonacular"}
              </a>
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

function MetaTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-linen bg-oatmeal p-4 dark:border-white/10 dark:bg-ink-900">
      <span className="text-sage-600 dark:text-sage-400">{icon}</span>
      <p className="micro-label mt-2">{label}</p>
      <p className="font-display mt-1 text-lg font-medium text-ink dark:text-zinc-100">{value}</p>
    </div>
  );
}