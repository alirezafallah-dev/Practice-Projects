"use client";

import { useEffect, useState } from "react";
import { AlarmIcon, ClockIcon, XIcon } from "@/components/ui/icons";
import type { RecipeStep } from "@/types";

interface TimerState {
  total: number;
  left: number;
  step: number;
}

function mmss(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function Preparation({ steps }: { steps: RecipeStep[] }) {
  const [timer, setTimer] = useState<TimerState | null>(null);

  useEffect(() => {
    if (!timer || timer.left <= 0) return;
    const id = window.setInterval(() => {
      setTimer((t) => (t ? { ...t, left: Math.max(0, t.left - 1) } : null));
    }, 1000);
    return () => window.clearInterval(id);
  }, [timer?.left === 0, timer !== null]); // eslint-disable-line react-hooks/exhaustive-deps

  function startTimer(minutes: number, stepNumber: number) {
    setTimer({ total: minutes * 60, left: minutes * 60, step: stepNumber });
  }

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-2xl font-medium md:text-3xl">Preparation Routine</h2>
        <p className="micro-label flex items-center gap-1.5">
          <ClockIcon width={13} height={13} className="text-clay-500" />
          Active Stage: {steps.length} Steps
        </p>
      </div>

      {/* Vertical timeline with hairline connectors */}
      <ol className="mt-8">
        {steps.map((s, i) => {
          const isLast = i === steps.length - 1;
          return (
            <li key={s.number} className="relative grid grid-cols-[2.75rem_1fr] gap-4 pb-10 last:pb-0 md:grid-cols-[3.5rem_1fr] md:gap-6">
              {!isLast && (
                <span aria-hidden className="absolute left-[0.9rem] top-9 bottom-0 w-px bg-linen md:left-[1.15rem] dark:bg-white/10" />
              )}
              <span className="font-display relative z-10 text-2xl leading-8 text-clay-500 md:text-3xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="micro-label">Stage {String(i + 1).padStart(2, "0")}</span>
                  {s.minutes !== null && s.minutes > 0 && (
                    <button
                      type="button"
                      onClick={() => startTimer(s.minutes as number, s.number)}
                      className="pill border border-linen bg-oatmeal text-ink transition hover:border-clay-300 hover:text-clay-600 dark:border-white/15 dark:bg-white/5 dark:text-zinc-200"
                    >
                      <AlarmIcon width={13} height={13} />
                      {s.minutes} min timer
                    </button>
                  )}
                </div>
                <p className="mt-2 text-sm leading-7 text-mineral dark:text-zinc-400">{s.step}</p>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Floating cook timer */}
      {timer && (
        <div className="frost fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-sheet">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-clay-500 text-white">
            <AlarmIcon width={16} height={16} />
          </span>
          <div>
            <p className="micro-label">{timer.left > 0 ? `Timer Running • Step ${String(timer.step).padStart(2, "0")}` : "Timer Complete ✓"}</p>
            <p className="font-latin text-lg font-bold tabular-nums text-ink dark:text-zinc-100">{mmss(timer.left)}</p>
          </div>
          <button
            type="button"
            onClick={() => setTimer(null)}
            aria-label="Dismiss timer"
            className="ml-2 text-mineral transition hover:text-ink dark:hover:text-zinc-100"
          >
            <XIcon width={15} height={15} />
          </button>
        </div>
      )}
    </section>
  );
}