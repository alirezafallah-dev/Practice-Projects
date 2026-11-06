import Image from "next/image";
import Link from "next/link";
import MiniFavoriteButton from "@/components/recipes/mini-favorite-button";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BookOpenIcon,
  ClockIcon,
  UsersIcon,
} from "@/components/ui/icons";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { searchRecipes } from "@/lib/spoonacular";
import { cn, formatMinutes, translateDishType, truncate } from "@/lib/utils";
import type { RecipeSummary } from "@/types";

export async function getPicks(): Promise<RecipeSummary[]> {
    try {
        const res = await searchRecipes({ sort: "popularity", pageSize: 3 });
        return res.results.slice(0, 3);
    } catch {
        return [];
    }
}

/* ================= Seasonal index band ================= */
export function SeasonalBand() {
  return (
    <div className="border-y border-linen dark:border-white/10">
      <div className="container-app flex items-center justify-between py-4">
        <span className="micro-label">Seasonal Index — No. 44</span>
        <span aria-hidden className="text-clay-500">❋</span>
        <span className="micro-label">Updated Today</span>
      </div>
    </div>
  );
}

/* ================= Feature card ================= */
function FeatureCard({ recipe }: { recipe: RecipeSummary }) {
  return (
    <article className="card card-hover flex flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden rounded-t-3xl bg-oatmeal dark:bg-ink-800">
        <Image
          src={recipe.image || PLACEHOLDER_IMAGE}
          alt={recipe.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-[400ms] hover:scale-[1.02]"
        />
        <div className="absolute right-4 top-4 flex flex-wrap gap-2">
          <span className="pill frost text-ink dark:text-zinc-100">Dish of the Week</span>
          {recipe.dishTypes[0] && (
            <span className="pill bg-clay-500/90 text-white">{translateDishType(recipe.dishTypes[0])}</span>
          )}
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

        <h3 className="font-display mt-4 text-2xl font-medium leading-snug text-ink dark:text-zinc-50 md:text-3xl">
          {recipe.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-mineral dark:text-zinc-400">
          {truncate(recipe.summary, 160) || "A seasonal composition, tested across six kitchen variants."}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-linen pt-5 dark:border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-display flex h-10 w-10 items-center justify-center rounded-full border border-linen bg-oatmeal text-lg dark:border-white/10 dark:bg-ink-800">
              {(recipe.sourceName ?? "S").charAt(0)}
            </span>
            <div>
              <p className="text-xs font-bold text-ink dark:text-zinc-100">Recipe by {recipe.sourceName ?? "the SAVOR Guild"}</p>
              <p className="micro-label mt-0.5">Guild Curator, Test Kitchen</p>
            </div>
          </div>
          <Link href={`/recipe/${recipe.id}`} className="btn-accent">
            Inspect Step-by-Step
            <ArrowRightIcon width={14} height={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ================= Side card ================= */
function SideCard({ recipe }: { recipe: RecipeSummary }) {
  return (
    <article className="card card-hover flex-1 overflow-hidden">
      <Link href={`/recipe/${recipe.id}`} className="relative block aspect-[16/9] overflow-hidden rounded-t-3xl bg-oatmeal dark:bg-ink-800">
        <Image
          src={recipe.image || PLACEHOLDER_IMAGE}
          alt={recipe.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-[400ms] hover:scale-[1.02]"
        />
        {recipe.dishTypes[0] && (
          <span className="pill absolute right-4 top-4 bg-sage-700/90 text-alabaster">
            {translateDishType(recipe.dishTypes[0])}
          </span>
        )}
        {recipe.readyInMinutes && (
          <span className="pill frost absolute bottom-4 left-4 text-ink dark:text-zinc-100">
            <ClockIcon width={12} height={12} />
            {recipe.readyInMinutes} mins
          </span>
        )}
      </Link>

      <div className="p-6">
        <p className="micro-label text-clay-600 dark:text-clay-300">
          {recipe.cuisines[0] ?? translateDishType(recipe.dishTypes[0] ?? "") ?? "Seasonal Cooking"}
        </p>
        <h3 className="font-display mt-2 line-clamp-2 text-xl font-medium leading-snug text-ink dark:text-zinc-50">
          {recipe.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-7 text-mineral dark:text-zinc-400">
          {truncate(recipe.summary, 110)}
        </p>
        <div className="mt-5 flex items-center justify-between">
          <span className="micro-label">
            {recipe.servings ? `${recipe.servings} Servings` : "—"} • Score {recipe.spoonacularScore ?? 0}
          </span>
          <Link
            href={`/recipe/${recipe.id}`}
            aria-label={`View ${recipe.title}`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-linen text-ink transition hover:bg-oatmeal dark:border-white/15 dark:text-zinc-200 dark:hover:bg-white/5"
          >
            <ArrowRightIcon width={15} height={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ================= Editor's Seasonal Edit ================= */
export async function EditorsEdit() {
  const picks = await getPicks();
  const [feature, ...sides] = picks;

  return (
    <section className="container-app py-16 md:py-24">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="micro-label flex items-center gap-2 text-clay-600 dark:text-clay-300">
            <span aria-hidden>❋</span> Autumn Curations
          </p>
          <h2 className="font-display mt-3 text-3xl font-medium text-ink dark:text-zinc-50 md:text-5xl">
            Editor's Seasonal Edit
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-8 text-mineral dark:text-zinc-400">
            Three slow gastronomic compositions capturing crisp orchard wind, forest floor forage,
            and hearth smoke. Tested across six kitchen variants.
          </p>
        </div>
        <Link href="/search" className="micro-label group inline-flex items-center gap-1.5 transition hover:text-ink dark:hover:text-zinc-100">
          View All 24 Edits
          <ArrowUpRightIcon width={14} height={14} className="transition-transform group-hover:-translate-y-0.5" />
        </Link>
      </div>

      {feature && (
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <FeatureCard recipe={feature} />
          <div className="flex flex-col gap-6">
            {sides.map((r) => (
              <SideCard key={r.id} recipe={r} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

/* ================= Taste atlas ================= */
const TASTE_METRICS = [
  { value: 78, label: "Acidity", sub: "Bright citrus & vinegars" },
  { value: 92, label: "Umami", sub: "Fungi & aged cheese" },
  { value: 85, label: "Crispness", sub: "Crust & hearth seed" },
  { value: 64, label: "Earth", sub: "Roots & wild grains" },
];

function TasteRing({ value }: { value: number }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-16 w-16">
      <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
        <circle cx="32" cy="32" r={r} fill="none" strokeWidth="4" className="stroke-linen dark:stroke-white/10" />
        <circle
          cx="32" cy="32" r={r} fill="none" strokeWidth="4" strokeLinecap="round"
          strokeDasharray={`${(c * value) / 100} ${c}`}
          className="stroke-clay-500"
        />
      </svg>
      <span className="font-display absolute inset-0 flex items-center justify-center text-sm font-semibold text-ink dark:text-zinc-100">
        {value}%
      </span>
    </div>
  );
}

export function TasteAtlas() {
  return (
    <section className="container-app pb-16 md:pb-24">
      <div className="grid grid-cols-1 items-center gap-8 rounded-3xl border border-linen bg-oatmeal p-6 md:p-10 lg:grid-cols-[1fr_auto] dark:border-white/10 dark:bg-ink-900">
        <div>
          <p className="micro-label text-clay-600 dark:text-clay-300">Seasonal Taste Atlas</p>
          <h2 className="font-display mt-3 text-2xl font-medium text-ink dark:text-zinc-50 md:text-4xl">
            Harmonic Equilibrium Index
          </h2>
          <p className="mt-4 max-w-md text-sm leading-8 text-mineral dark:text-zinc-400">
            Every published recipe is lab-evaluated across four sensory thresholds to ensure
            repeatable gastronomic balance in home kitchens.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {TASTE_METRICS.map((m) => (
            <div key={m.label} className="card flex flex-col items-center gap-3 p-4 text-center">
              <TasteRing value={m.value} />
              <p className="micro-label text-ink dark:text-zinc-100">{m.label}</p>
              <p className="text-[10px] leading-4 text-mineral dark:text-zinc-400">{m.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= Manifesto ================= */
const STATS = [
  { value: "840+", label: "Triple-Tested Formulations", accent: false },
  { value: "100%", label: "Ad-Free Journalistic Rigor", accent: true },
  { value: "14", label: "Regional Guild Chapters", accent: false },
];

const GUILD = [
  {
    name: "Dr. Mei Lin",
    role: "Botanical Fermentation",
    desc: "Specialist in wild koji strains and heirloom koji fermentation techniques.",
  },
  {
    name: "Matteo Rossi",
    role: "Ancient Grain Ecology",
    desc: "Advocate for Mediterranean heritage pulses, stone-milled semolina, and low-water agriculture.",
  },
];

export function Manifesto() {
  return (
    <section className="container-app grid grid-cols-1 gap-12 pb-20 md:pb-28 lg:grid-cols-2 lg:gap-16">
      <div>
        <p className="micro-label flex items-center gap-2">
          <BookOpenIcon width={14} height={14} className="text-sage-600" /> Our Culinary Manifesto
        </p>
        <h2 className="font-display mt-4 text-3xl font-medium leading-[1.35] text-ink dark:text-zinc-50 md:text-5xl md:leading-[1.3]">
          We treat the recipe as literature, not mere code.
        </h2>
        <p className="mt-6 text-sm leading-8 text-mineral dark:text-zinc-400">
          In an era of hyper-accelerated culinary trends, SAVOR preserves deliberate kitchen slowness.
          Each formula is built around seasonal bioavailability, regional preservation techniques,
          and minimum ingredient interference.
        </p>
        <p className="mt-4 text-sm leading-8 text-mineral dark:text-zinc-400">
          We believe deliciousness is an inevitable byproduct of deep ingredient respect, proper heat
          transfer, and time allowed to do its quiet work.
        </p>

        <div className="mt-10 grid grid-cols-3 gap-6 border-t border-linen pt-8 dark:border-white/10">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className={cn("font-display text-3xl font-medium md:text-4xl", s.accent ? "text-clay-600 dark:text-clay-300" : "text-ink dark:text-zinc-50")}>
                {s.value}
              </p>
              <p className="micro-label mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <blockquote className="card p-6">
          <span className="pill bg-sage-500/10 text-sage-700 dark:text-sage-300">Master of Breadcraft</span>
          <p className="font-display mt-4 text-xl font-medium text-ink dark:text-zinc-50">
            Julian Moreau • Copenhagen Guild
          </p>
          <p className="mt-3 text-sm leading-8 text-mineral dark:text-zinc-400">
            "When flour meets ancient water and wild yeasts, chemistry becomes memory.
            We do not rush the fermentation; we attend to it."
          </p>
          <p className="micro-label mt-4">Author of 'The Hearth Vow' • 48 Formulations</p>
        </blockquote>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {GUILD.map((g) => (
            <div key={g.name} className="card flex items-start gap-3 p-5">
              <span className="font-display flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-linen bg-oatmeal text-lg dark:border-white/10 dark:bg-ink-800">
                {g.name.charAt(0)}
              </span>
              <div>
                <p className="text-sm font-bold text-ink dark:text-zinc-100">{g.name}</p>
                <p className="micro-label mt-1 text-clay-600 dark:text-clay-300">{g.role}</p>
                <p className="mt-2 text-xs leading-6 text-mineral dark:text-zinc-400">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="card flex flex-col items-start justify-between gap-4 p-5 sm:flex-row sm:items-center">
          <p className="flex items-center gap-3 text-sm leading-7 text-mineral dark:text-zinc-400">
            <BookOpenIcon width={18} height={18} className="shrink-0 text-sage-600" />
            Read our peer-reviewed recipe standards and culinary ethics charter.
          </p>
          <Link href="/about" className="btn-secondary shrink-0 rounded-full px-5 py-2.5 text-xs">
            Read Charter
            <ArrowRightIcon width={14} height={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}