"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { DIETS, MEAL_TYPES, SORT_OPTIONS } from "@/lib/constants";
import { FilterIcon, SearchIcon } from "@/components/ui/icons";

interface FilterBarProps {
  query: string;
  ingredients: string;
  diet: string;
  type: string;
  sort: string;
}

export default function FilterBar({ query, ingredients, diet, type, sort }: FilterBarProps) {
  const router = useRouter();
  const [q, setQ] = useState(query);
  const [ing, setIng] = useState(ingredients);
  const [d, setD] = useState(diet);
  const [t, setT] = useState(type);
  const [s, setS] = useState(sort);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const p = new URLSearchParams();
    if (q.trim()) p.set("query", q.trim());
    if (ing.trim()) p.set("ingredients", ing.trim());
    if (d) p.set("diet", d);
    if (t) p.set("type", t);
    if (s && s !== "relevance") p.set("sort", s);
    p.set("page", "1");
    router.push(`/search?${p.toString()}`);
  }

  return (
    <form onSubmit={onSubmit} className="card p-4 md:p-5" aria-label="Search filters">
      <div className="mb-4 flex items-center gap-2 text-sm font-bold text-ink dark:text-zinc-100">
        <FilterIcon width={16} height={16} className="text-sage-600" />
        Filter & Sort Results
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <label htmlFor="f-query" className="mb-1.5 block text-xs font-medium text-mineral dark:text-zinc-400">Query</label>
          <input id="f-query" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. pasta" className="input" />
        </div>

        <div>
          <label htmlFor="f-ing" className="mb-1.5 block text-xs font-medium text-mineral dark:text-zinc-400">
            Ingredients <span className="font-normal">(comma separated)</span>
          </label>
          <input id="f-ing" type="text" value={ing} onChange={(e) => setIng(e.target.value)} placeholder="tomato,cheese" className="input" />
        </div>

        <div>
          <label htmlFor="f-diet" className="mb-1.5 block text-xs font-medium text-mineral dark:text-zinc-400">Dietary Profile</label>
          <select id="f-diet" value={d} onChange={(e) => setD(e.target.value)} className="input">
            <option value="">All diets</option>
            {DIETS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="f-type" className="mb-1.5 block text-xs font-medium text-mineral dark:text-zinc-400">Meal Type</label>
          <select id="f-type" value={t} onChange={(e) => setT(e.target.value)} className="input">
            <option value="">All types</option>
            {MEAL_TYPES.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="f-sort" className="mb-1.5 block text-xs font-medium text-mineral dark:text-zinc-400">Sort By</label>
          <select id="f-sort" value={s} onChange={(e) => setS(e.target.value)} className="input">
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button type="submit" className="btn-primary">
          <SearchIcon width={16} height={16} />
          Apply Filters
        </button>
        <button
          type="button"
          onClick={() => { setQ(""); setIng(""); setD(""); setT(""); setS("relevance"); router.push("/search"); }}
          className="rounded-2xl bg-oatmeal px-5 py-3 text-sm font-semibold text-ink transition hover:bg-linen dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/10"
        >
          Clear All
        </button>
      </div>
    </form>
  );
}