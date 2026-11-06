"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { QUICK_SUGGESTIONS } from "@/lib/constants";
import { ArrowRightIcon, SearchIcon, SlidersIcon } from "@/components/ui/icons";

export default function Hero() {
  const router = useRouter();
  const [value, setValue] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const v = value.trim();
    router.push(v ? `/search?query=${encodeURIComponent(v)}` : "/search");
  }

  return (
    <section className="relative overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=2000&auto=format&fit=crop"
        alt="A kitchen table laid with seasonal ingredients"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-alabaster/90 via-alabaster/70 to-alabaster dark:from-ink-950/90 dark:via-ink-950/75 dark:to-ink-950" />

      <div className="container-app relative z-10 flex flex-col items-center py-20 text-center md:py-28">
        <span className="pill frost text-[10px] tracking-[0.16em] text-ink dark:text-zinc-200">
          <span aria-hidden className="text-clay-500">✦</span>
          Vol. XIV • Autumn Solstice • 842 Verified Compositions
        </span>

        <h1 className="font-display mt-6 max-w-3xl text-4xl font-medium leading-[1.25] text-ink dark:text-zinc-50 md:text-6xl md:leading-[1.2]">
          Thoughtful cooking, composed
          <br />
          for the modern pantry.
        </h1>

        <p className="mt-5 max-w-xl text-sm leading-8 text-mineral dark:text-zinc-400 md:text-base">
          Search beyond mere ingredients. Explore seasonal harvests, slow fermentation, and table
          stories tested by our independent culinary guild.
        </p>

        <form
          onSubmit={onSubmit}
          className="frost mt-9 flex w-full max-w-2xl flex-col gap-2 rounded-3xl p-2.5 shadow-lift md:flex-row md:items-center md:rounded-full md:p-2"
        >
          <div className="flex flex-1 items-center gap-3 px-3">
            <SearchIcon width={17} height={17} className="shrink-0 text-mineral" />
            <label htmlFor="hero-search" className="sr-only">Search recipes</label>
            <input
              id="hero-search"
              type="search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Search for recipes by ingredients, cuisine, or keywords..."
              className="h-11 w-full bg-transparent text-sm text-ink outline-none placeholder:text-mineral/80 dark:text-zinc-100"
            />
          </div>

          <div className="hidden h-6 w-px bg-linen md:block dark:bg-white/15" />

          <Link
            href="/search"
            className="hidden items-center gap-1.5 px-3 text-[11px] font-semibold tracking-[0.1em] text-mineral transition hover:text-ink md:flex dark:hover:text-zinc-100"
          >
            <SlidersIcon width={15} height={15} />
            Filters
          </Link>

          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-sage-700 px-7 text-xs font-bold tracking-[0.1em] text-alabaster shadow-rest transition hover:-translate-y-px hover:bg-sage-800 hover:shadow-lift"
          >
            Explore
            <ArrowRightIcon width={15} height={15} />
          </button>
        </form>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
          <span className="micro-label">Curated Notes:</span>
          {QUICK_SUGGESTIONS.map((c) => (
            <Link
              key={c.value}
              href={`/search?query=${encodeURIComponent(c.value)}`}
              className="pill border border-linen bg-white/70 text-ink transition hover:border-sage-300 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}