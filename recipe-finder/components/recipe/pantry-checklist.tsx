"use client";

import { useState } from "react";
import { CheckIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import type { RecipeIngredient } from "@/types";

type System = "metric" | "us";
type Scale = 1 | 2 | 3;

/** Fallback conversions when the API did not provide measures */
const US_CONV: Record<string, { f: number; u: string }> = {
  g: { f: 1 / 28.3495, u: "oz" },
  kg: { f: 2.20462, u: "lb" },
  ml: { f: 1 / 29.5735, u: "fl oz" },
  l: { f: 4.22675, u: "cup" },
};

function fmtAmount(amount: number, unit: string): string {
  const rounded = Math.round(amount * 100) / 100;
  const a = rounded % 1 === 0 ? String(rounded) : rounded.toFixed(rounded < 10 ? 1 : 0);
  return unit ? `${a} ${unit}` : a;
}

function quantityFor(ing: RecipeIngredient, scale: Scale, system: System): string {
  if (ing.measures) {
    const m = ing.measures[system];
    if (m.amount > 0) return fmtAmount(m.amount * scale, m.unit);
  }
  if (ing.amount === null) return "To taste";
  let amount = ing.amount * scale;
  let unit = ing.unit;
  if (system === "us" && US_CONV[unit.toLowerCase()]) {
    const c = US_CONV[unit.toLowerCase()];
    amount = amount * c.f;
    unit = c.u;
  }
  return fmtAmount(amount, unit);
}

export default function PantryChecklist({ ingredients }: { ingredients: RecipeIngredient[] }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [scale, setScale] = useState<Scale>(1);
  const [system, setSystem] = useState<System>("metric");

  function toggle(i: number) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <section className="rounded-3xl border border-linen bg-oatmeal p-6 dark:border-white/10 dark:bg-ink-900">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-medium">Pantry Provisions</h2>
          <p className="micro-label mt-1">Check items as you curate your workspace</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {/* Scale toggle */}
          <div className="flex items-center gap-1">
            {([1, 2, 3] as Scale[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setScale(s)}
                aria-pressed={scale === s}
                className={cn(
                  "rounded-full px-2.5 py-1 text-[10px] font-bold tracking-[0.08em] transition",
                  scale === s
                    ? "bg-sage-700 text-alabaster shadow-rest"
                    : "text-mineral hover:text-ink dark:hover:text-zinc-100",
                )}
              >
                {s}X
              </button>
            ))}
          </div>
          {/* Unit system toggle */}
          <div className="flex overflow-hidden rounded-full border border-linen bg-white dark:border-white/15 dark:bg-ink-950">
            {(["metric", "us"] as System[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSystem(s)}
                aria-pressed={system === s}
                className={cn(
                  "px-3 py-1 text-[10px] font-bold tracking-[0.08em] uppercase transition",
                  system === s ? "bg-sage-700 text-alabaster" : "text-mineral hover:text-ink dark:hover:text-zinc-100",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Roster */}
      <ul className="mt-4">
        {ingredients.map((ing, i) => {
          const isChecked = checked.has(i);
          return (
            <li key={`${ing.id}-${i}`} className="border-b border-linen last:border-0 dark:border-white/10">
              <button
                type="button"
                role="checkbox"
                aria-checked={isChecked}
                onClick={() => toggle(i)}
                className="flex w-full items-center gap-3 py-3.5 text-right transition hover:bg-white/50 dark:hover:bg-white/5"
              >
                {/* Serene circular checkbox */}
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-[1.5px] transition",
                    isChecked
                      ? "border-sage-700 bg-sage-700 text-alabaster"
                      : "border-linen bg-white dark:border-white/20 dark:bg-ink-950",
                  )}
                >
                  {isChecked && <CheckIcon width={11} height={11} strokeWidth={3} />}
                </span>
                <span
                  className={cn(
                    "flex-1 text-sm leading-6 transition",
                    isChecked ? "text-mineral line-through dark:text-zinc-500" : "text-ink dark:text-zinc-100",
                  )}
                >
                  {ing.original || ing.name}
                </span>
                <span className="shrink-0 text-xs font-bold tabular-nums tracking-[0.04em] text-ink dark:text-zinc-200">
                  {quantityFor(ing, scale, system)}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        <p className="micro-label">
          {checked.size} of {ingredients.length} items gathered
        </p>
        <button
          type="button"
          onClick={() => setChecked(new Set())}
          className="micro-label text-clay-600 underline-offset-4 transition hover:underline dark:text-clay-300"
        >
          Reset Pantry
        </button>
      </div>
    </section>
  );
}