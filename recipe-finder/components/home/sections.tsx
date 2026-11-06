import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/recipes/favorite-button";
import { cn, truncate } from "@/lib/utils";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { searchRecipes } from "@/lib/spoonacular";
import type { RecipeSummary } from "@/types";
import {
  ArrowRightIcon,
  BasketIcon,
  ChefHatIcon,
  ClockIcon,
  CroissantIcon,
  CurryIcon,
  FlameIcon,
  LeafIcon,
  OliveIcon,
  PizzaIcon,
  RamenIcon,
  SlidersIcon,
  SparklesIcon,
  StarIcon,
  TacoIcon,
  UsersIcon,
  UtensilsIcon,
} from "@/components/ui/icons";

async function getTrending(): Promise<RecipeSummary[]> {
  try {
    const res = await searchRecipes({ sort: "popularity", pageSize: 4 });
    return res.results.slice(0, 4);
  } catch {
    return [];
  }
}

function difficultyOf(min: number | null) {
  if (min == null || min <= 25)
    return { label: "Easy", tone: "bg-rosemary/10 text-rosemary dark:bg-rosemary/20 dark:text-rosemary-200" };
  if (min <= 40)
    return { label: "Medium", tone: "bg-apricot/20 text-terracotta-700 dark:text-apricot-200" };
  return { label: "Hard", tone: "bg-terracotta/10 text-terracotta-700 dark:text-terracotta-200" };
}

const CUISINES = [
  { name: "Italian", count: "380+", Icon: PizzaIcon },
  { name: "Japanese", count: "245+", Icon: RamenIcon },
  { name: "Mexican", count: "190+", Icon: TacoIcon },
  { name: "Mediterranean", count: "410+", Icon: OliveIcon },
  { name: "Indian", count: "315+", Icon: CurryIcon },
  { name: "French", count: "170+", Icon: CroissantIcon },
];

export function CuisineSection() {
  return (
    <section className="container-app py-14 md:py-20">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-terracotta">Passport to Taste</p>
          <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-espresso md:text-4xl dark:text-zinc-50">Browse by Cuisine</h2>
        </div>
        <p className="max-w-sm text-sm leading-7 text-espresso-700 dark:text-zinc-400">
          From sun-drenched coastal olive groves to bustling night markets, sort your next meal by global heritage.
        </p>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {CUISINES.map(({ name, count, Icon }) => (
          <Link
            key={name}
            href={`/search?query=${encodeURIComponent(name)}`}
            className="group flex flex-col items-center gap-3 rounded-3xl border border-ecru bg-porcelain px-4 py-6 text-center shadow-rest transition hover:-translate-y-1 hover:border-terracotta/40 hover:shadow-lift dark:border-white/10 dark:bg-white/5"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-canvas text-terracotta transition group-hover:bg-terracotta group-hover:text-white dark:bg-white/10">
              <Icon width={22} height={22} />
            </span>
            <span className="text-sm font-bold text-espresso dark:text-zinc-100">{name}</span>
            <span className="text-[11px] font-semibold uppercase tracking-wide text-mineral">{count} recipes</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function TrendingCard({ r }: { r: RecipeSummary }) {
  const diff = difficultyOf(r.readyInMinutes);
  const rating = Math.round(((r.spoonacularScore ?? 0) / 100) * 5 * 10) / 10;
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-ecru bg-porcelain shadow-rest transition hover:-translate-y-1 hover:shadow-lift dark:border-white/10 dark:bg-white/5">
      <div className="relative aspect-[4/3] overflow-hidden bg-canvas dark:bg-white/5">
        <Image
          src={r.image || PLACEHOLDER_IMAGE}
          alt={r.title}
          fill
          sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <Link href={`/recipe/${r.id}`} className="absolute inset-0 z-10" aria-label={`View ${r.title}`} />
        <FavoriteButton
          recipe={{ id: r.id, title: r.title, image: r.image }}
          variant="floating"
          size="sm"
          className="absolute right-3 top-3 z-20"
        />
        <span className="absolute left-3 top-3 z-20 inline-flex items-center gap-1 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-bold text-espresso backdrop-blur dark:bg-black/50 dark:text-zinc-100">
          <ClockIcon width={12} height={12} />
          {r.readyInMinutes ? `${r.readyInMinutes} mins` : "—"}
        </span>
        <span className={cn("absolute bottom-3 left-3 z-20 rounded-full px-2.5 py-1 text-[11px] font-bold", diff.tone)}>
          {diff.label}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="flex items-center gap-1 text-xs font-bold text-espresso dark:text-zinc-100">
          <StarIcon width={13} height={13} className="text-apricot" fill="currentColor" />
          {rating}
          <span className="font-medium text-mineral">({(r.aggregateLikes ?? 0).toLocaleString("en-US")})</span>
        </p>
        <h3 className="font-display line-clamp-2 text-lg font-bold leading-6 text-espresso dark:text-zinc-50">
          <Link href={`/recipe/${r.id}`} className="transition hover:text-terracotta">{r.title}</Link>
        </h3>
        <p className="line-clamp-2 text-sm leading-6 text-espresso-700 dark:text-zinc-400">
          {truncate(r.summary, 110) || "A wholesome dish from our test kitchen."}
        </p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-mineral">
            <UsersIcon width={14} height={14} />
            {r.servings ? `${r.servings} Servings` : "—"}
          </span>
          <Link href={`/recipe/${r.id}`} className="inline-flex items-center gap-1 text-xs font-bold text-terracotta transition hover:gap-2">
            Cook Dish <ArrowRightIcon width={14} height={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export async function TrendingSection() {
  const recipes = await getTrending();
  return (
    <section className="container-app py-14 md:py-20">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rosemary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-rosemary">
            <FlameIcon width={12} height={12} />
            Cooked by 12,000+ members
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-espresso md:text-4xl dark:text-zinc-50">
            Trending Recipes This Week
          </h2>
        </div>
        <Link href="/search?sort=popularity" className="inline-flex items-center gap-1 text-sm font-bold text-terracotta transition hover:gap-2">
          Explore all trending <ArrowRightIcon width={15} height={15} />
        </Link>
      </div>
      {recipes.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recipes.map((r) => <TrendingCard key={r.id} r={r} />)}
        </div>
      ) : (
        <p className="mt-8 rounded-3xl border border-dashed border-ecru bg-canvas p-10 text-center text-sm text-mineral dark:border-white/10 dark:bg-white/5">
          No trending recipes right now — check your API key or try again later.
        </p>
      )}
    </section>
  );
}

const HARVEST_CHIPS = ["Roasted Pepitas", "Browned Sage Butter", "Aged Goat Cheese", "Cardamom Honey Drizzle"];

export function HarvestBanner() {
  return (
    <section className="container-app py-6 md:py-10">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-terracotta via-terracotta-600 to-[#8B3A0E] p-7 text-white shadow-lift md:p-12">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wide backdrop-blur">
              <ChefHatIcon width={13} height={13} />
              Autumn Harvest Edition • Farm Fresh Picks
            </span>
            <h2 className="font-display mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
              Butternut Squash, Crisp Honeycrisp &amp; Wild Thyme
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/85">
              Celebrate the sweetest produce of the season. Our culinary studio has curated 14 seasonal masterpieces highlighting caramel-roasted squashes, tart orchard apples, and warming kitchen spices.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {HARVEST_CHIPS.map((c) => (
                <span key={c} className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur">• {c}</span>
              ))}
            </div>
            <Link href="/search?query=squash" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-terracotta-700 transition hover:-translate-y-0.5 hover:shadow-lift">
              Browse Autumn Collection <ArrowRightIcon width={16} height={16} />
            </Link>
            <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-white/70">
              <ClockIcon width={12} height={12} /> Updated Weekly
            </p>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/20 shadow-sheet">
              <Image
                src="https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=1200&q=80"
                alt="Roasted butternut squash"
                fill
                sizes="(max-width:1024px) 100vw,50vw"
                className="object-cover"
              />
              <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-terracotta-700">
                <ChefHatIcon width={12} height={12} /> Chef’s Crown Pick
              </span>
              <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/90 p-3 backdrop-blur dark:bg-black/60">
                <p className="text-[10px] font-bold uppercase tracking-wide text-mineral">45 min prep</p>
                <p className="font-display truncate text-sm font-bold text-espresso dark:text-zinc-50">Stuffed Harvest Squash with Wild Pecan Rice</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { n: "01", Icon: BasketIcon, title: "Enter Ingredients", desc: "Type whatever you have on hand: two eggs, wilted spinach, half an onion, or a can of chickpeas. No missing-item stress.", chip: "Zero Food Waste", Chip: LeafIcon },
  { n: "02", Icon: SparklesIcon, title: "Get Tailored Dishes", desc: "Our culinary matching engine filters thousands of vetted chef recipes, sorting instantly by cook time and skill level.", chip: "Custom Portion Scales", Chip: SlidersIcon },
  { n: "03", Icon: UtensilsIcon, title: "Cook & Savor", desc: "Follow interactive step checklists, built-in cook timers, and wine or herb pairings crafted to heighten every bite.", chip: "Built-in Kitchen Timers", Chip: ClockIcon },
];

export function HowItWorks() {
  return (
    <section className="container-app py-14 md:py-20">
      <div className="text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-terracotta">Effortless Kitchen Magic</p>
        <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-espresso md:text-4xl dark:text-zinc-50">How Recipe Finder Works</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-espresso-700 dark:text-zinc-400">
          Turn whatever is hiding in your fridge into an extraordinary home-cooked dining experience in three swift steps.
        </p>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {STEPS.map(({ n, Icon, title, desc, chip, Chip }) => (
          <div key={n} className="relative flex flex-col rounded-3xl border border-ecru bg-porcelain p-7 shadow-rest dark:border-white/10 dark:bg-white/5">
            <span className="font-display absolute right-6 top-5 text-4xl font-extrabold text-ecru dark:text-white/10">{n}</span>
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-terracotta/10 text-terracotta dark:bg-terracotta/20">
              <Icon width={26} height={26} />
            </span>
            <h3 className="font-display mt-5 text-xl font-bold text-espresso dark:text-zinc-50">{title}</h3>
            <p className="mt-2 flex-1 text-sm leading-7 text-espresso-700 dark:text-zinc-400">{desc}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-rosemary dark:text-rosemary-200">
              <Chip width={14} height={14} /> {chip}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

const AVATARS = [
  { i: "ML", c: "bg-terracotta" },
  { i: "AK", c: "bg-rosemary" },
  { i: "SJ", c: "bg-apricot text-espresso" },
];

export function TestimonialSection() {
  return (
    <section className="container-app pb-16 md:pb-24">
      <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-ecru bg-canvas px-7 py-8 md:flex-row dark:border-white/10 dark:bg-white/5">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            {AVATARS.map((a) => (
              <span key={a.i} className={cn("flex h-11 w-11 items-center justify-center rounded-full border-2 border-canvas text-xs font-extrabold text-white dark:border-ink-900", a.c)}>
                {a.i}
              </span>
            ))}
          </div>
          <div>
            <p className="flex text-apricot">
              {Array.from({ length: 5 }).map((_, k) => (
                <StarIcon key={k} width={15} height={15} fill="currentColor" />
              ))}
            </p>
            <p className="mt-1 text-sm font-semibold text-espresso dark:text-zinc-100">“Saved me from ordering takeout four nights in a row!”</p>
          </div>
        </div>
        <Link href="/search" className="shrink-0 rounded-full bg-terracotta px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-terracotta-600 hover:shadow-lift">
          Join the Cook Club
        </Link>
      </div>
    </section>
  );
}