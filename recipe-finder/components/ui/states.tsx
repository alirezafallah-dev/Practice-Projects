"use client";

import Link from "next/link";
import { QUICK_SUGGESTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type ButtonStyle = "primary" | "ghost" | "danger" | "outline";

const BUTTON_STYLES: Record<ButtonStyle, string> = {
  primary: "bg-sage-700 text-alabaster hover:bg-sage-800 shadow-rest hover:shadow-lift",
  ghost: "bg-oatmeal text-ink hover:bg-linen dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/10",
  danger: "bg-clay-500 text-white hover:bg-clay-600 shadow-rest",
  outline: "border border-linen text-ink hover:border-sage-300 hover:text-sage-700 dark:border-white/15 dark:text-zinc-200",
};

export function ActionLink({
  href,
  variant = "primary",
  className,
  children,
  ...rest
}: {
  href: string;
  variant?: ButtonStyle;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold transition",
        BUTTON_STYLES[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function EmptyState({
  emoji = "🍽️",
  title,
  message,
  actionHref,
  actionLabel,
}: {
  emoji?: string;
  title: string;
  message: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-linen bg-white/60 px-6 py-16 text-center dark:border-white/15 dark:bg-white/5">
      <span aria-hidden className="text-6xl">{emoji}</span>
      <h2 className="font-display text-2xl font-medium">{title}</h2>
      <p className="max-w-md text-sm leading-7 text-mineral dark:text-zinc-400">{message}</p>
      {actionHref && actionLabel ? (
        <ActionLink href={actionHref}>{actionLabel}</ActionLink>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {QUICK_SUGGESTIONS.map((s) => (
            <Link
              key={s.value}
              href={`/search?query=${encodeURIComponent(s.value)}`}
              className="pill border border-linen bg-oatmeal text-ink transition hover:border-sage-300 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
            >
              {s.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  message,
  retryHref,
}: {
  title?: string;
  message: string;
  retryHref?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl border border-clay-200 bg-clay-50 px-6 py-14 text-center dark:border-clay-500/30 dark:bg-clay-500/10">
      <span aria-hidden className="text-5xl">⚠️</span>
      <h2 className="font-display text-2xl font-medium text-clay-700 dark:text-clay-300">{title}</h2>
      <p className="max-w-lg text-sm leading-7 text-clay-600/90 dark:text-clay-300/90">{message}</p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className={cn("rounded-2xl px-5 py-2.5 text-sm font-semibold", BUTTON_STYLES.primary)}
        >
          Try Again
        </button>
        {retryHref && <ActionLink href={retryHref} variant="ghost">Go Back</ActionLink>}
      </div>
    </div>
  );
}