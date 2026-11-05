"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowRightIcon, SearchIcon } from "@/components/ui/icons";

export default function Hero() {
  const router = useRouter();
  const [value, setValue] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const v = value.trim();
    router.push(v ? `/search?query=${encodeURIComponent(v)}` : "/search");
  }

  const quickTags = ["Pasta", "Breakfast", "Vegan", "Quick Meals"];

  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=2000&auto=format&fit=crop"
        alt="Kitchen table with fresh ingredients"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      
      {/* Gradient Overlay */}
      <div 
        aria-hidden 
        className="absolute inset-0 bg-gradient-to-b from-alabaster/95 via-alabaster/85 to-alabaster dark:from-ink-950/95 dark:via-ink-950/85 dark:to-ink-950" 
      />

      <div className="container-app relative z-10 flex flex-col items-center py-14 text-center md:py-20">
        {/* Minimal Pill */}
        <span className="pill frost mb-5 text-[10px] tracking-[0.14em] text-ink dark:text-zinc-200">
          <span aria-hidden className="mr-1.5 text-clay-500">✦</span>
          842 Verified Recipes
        </span>

        {/* Clean Headline */}
        <h1 className="font-display max-w-2xl text-3xl font-medium leading-[1.2] text-ink dark:text-zinc-50 md:text-5xl md:leading-[1.15]">
          Find your next<br className="md:hidden" /> favorite meal
        </h1>

        {/* Short Subtitle */}
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-mineral dark:text-zinc-400 md:text-base">
          Search by ingredients, cuisine, or mood — then cook with confidence.
        </p>

        {/* Search Form */}
        <form
          onSubmit={onSubmit}
          className="frost mt-8 flex w-full max-w-xl flex-col gap-2 rounded-2xl p-2 shadow-lift md:flex-row md:items-center md:rounded-full md:p-1.5"
        >
          <div className="flex flex-1 items-center gap-3 px-4">
            <SearchIcon width={18} height={18} className="shrink-0 text-mineral" />
            <label htmlFor="hero-search" className="sr-only">Search recipes</label>
            <input
              id="hero-search"
              type="search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Search recipes..."
              className="h-10 w-full bg-transparent text-sm text-ink outline-none placeholder:text-mineral/70 dark:text-zinc-100"
            />
          </div>

          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-sage-700 px-6 text-xs font-bold tracking-wide text-alabaster shadow-rest transition hover:-translate-y-px hover:bg-sage-800 hover:shadow-lift md:px-7"
          >
            Search
            <ArrowRightIcon width={15} height={15} />
          </button>
        </form>

        {/* Quick Tags */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="micro-label mr-1">Try:</span>
          {quickTags.map((tag) => (
            <Link
              key={tag}
              href={`/search?query=${encodeURIComponent(tag)}`}
              className="pill border border-linen bg-white/60 text-xs text-ink transition hover:border-sage-400 hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-zinc-200 dark:hover:border-sage-500"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}