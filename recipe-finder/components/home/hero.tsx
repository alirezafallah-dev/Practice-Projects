// components/home/hero.tsx
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@/components/ui/icons";

const POPULAR = ["Quick Dinners", "Sourdough", "Thai Curry", "Low Carb", "20-Minute Pasta"];

export default function Hero() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    const v = q.trim();
    router.push(v ? `/search?query=${encodeURIComponent(v)}` : "/search");
  }

  const go = (term: string) => router.push(`/search?query=${encodeURIComponent(term)}`);

  return (
    <section className="relative overflow-hidden">
      <div className="container-app flex flex-col items-center gap-6 py-16 text-center md:py-24">
        <span className="pill border border-terracotta-200 bg-terracotta-50 text-[11px] font-bold uppercase tracking-[0.14em] text-terracotta-700 dark:border-terracotta/30 dark:bg-terracotta/10 dark:text-terracotta-200">
          Over 18,400+ home tested creations
        </span>

        <h1 className="font-display max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight text-espresso md:text-6xl dark:text-zinc-50">
          What’s in your <span className="italic text-terracotta">pantry</span> tonight?
        </h1>

        <p className="max-w-xl text-base leading-8 text-espresso-700 dark:text-zinc-400">
          Discover vibrant, wholesome dishes tailored to the exact ingredients sitting on your kitchen counter right now.
        </p>

        <form
          onSubmit={submit}
          className="mt-2 flex w-full max-w-xl items-center gap-2 rounded-full border border-ecru bg-porcelain p-1.5 shadow-rest focus-within:border-terracotta focus-within:ring-4 focus-within:ring-terracotta/15 dark:border-white/10 dark:bg-white/5"
        >
          <SearchIcon width={18} height={18} className="ml-3 shrink-0 text-mineral" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by ingredients, cuisine, or keywords…"
            className="w-full bg-transparent px-2 text-sm outline-none placeholder:text-mineral/70 dark:text-zinc-100"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-terracotta px-5 py-2.5 text-sm font-bold text-white transition hover:bg-terracotta-600 active:translate-y-0.5"
          >
            Find Recipes
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="font-bold uppercase tracking-[0.12em] text-mineral">Popular:</span>
          {POPULAR.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => go(t)}
              className="rounded-full border border-ecru bg-canvas px-3 py-1.5 font-semibold text-espresso-700 transition hover:border-terracotta hover:text-terracotta dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}