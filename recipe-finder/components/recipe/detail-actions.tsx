"use client";

import { useEffect, useState } from "react";
import { useFavorites } from "@/context/favorites-context";
import { CheckIcon, HeartIcon, PrinterIcon, ShareIcon } from "@/components/ui/icons";

export default function DetailActions({
  id,
  title,
  image,
  flags,
}: {
  id: number;
  title: string;
  image: string | null;
  flags: string[];
}) {
  const { isFavorite, toggleFavorite, loaded } = useFavorites();
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const active = loaded && isFavorite(id);

  useEffect(() => {
    setUrl(
      process.env.NEXT_PUBLIC_SITE_URL
        ? `${process.env.NEXT_PUBLIC_SITE_URL}${window.location.pathname}`
        : window.location.href,
    );
  }, []);

  async function onShare() {
    if (!url) return;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // share sheet dismissed
    }
  }

  const secondary =
    "inline-flex items-center gap-2 rounded-full border border-linen bg-white px-5 py-3 text-[11px] font-bold tracking-[0.1em] uppercase text-ink transition hover:bg-oatmeal dark:border-white/15 dark:bg-ink-900 dark:text-zinc-200 dark:hover:bg-white/5";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => toggleFavorite({ id, title, image })}
        aria-pressed={active}
        className={
          active
            ? "inline-flex items-center gap-2 rounded-full border border-sage-300 bg-sage-500/10 px-6 py-3 text-[11px] font-bold tracking-[0.1em] uppercase text-sage-700 transition dark:text-sage-300"
            : "inline-flex items-center gap-2 rounded-full bg-sage-700 px-6 py-3 text-[11px] font-bold tracking-[0.1em] uppercase text-alabaster shadow-lift transition hover:-translate-y-px hover:bg-sage-800"
        }
      >
        {active ? <CheckIcon width={15} height={15} /> : <HeartIcon width={15} height={15} />}
        {active ? "Saved to Favorites" : "Save to Favorites"}
      </button>

      <button type="button" onClick={() => window.print()} className={secondary}>
        <PrinterIcon width={15} height={15} />
        Print
      </button>

      <button type="button" onClick={onShare} className={secondary}>
        <ShareIcon width={15} height={15} />
        {copied ? "Link copied ✓" : "Share"}
      </button>

      {url && (
        <span className="flex items-center gap-1.5">
          <a href={`https://wa.me/?text=${encodeURIComponent(`Check out this recipe on SAVOR: ${title}`)}%20${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp" className="flex h-9 w-9 items-center justify-center rounded-full border border-linen bg-white text-sm transition hover:scale-110 dark:border-white/15 dark:bg-ink-900">💬</a>
          <a href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Telegram" className="flex h-9 w-9 items-center justify-center rounded-full border border-linen bg-white text-sm transition hover:scale-110 dark:border-white/15 dark:bg-ink-900">✈️</a>
          <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X" className="flex h-9 w-9 items-center justify-center rounded-full border border-linen bg-white text-sm transition hover:scale-110 dark:border-white/15 dark:bg-ink-900">🐦</a>
        </span>
      )}

      {flags.length > 0 && (
        <p className="micro-label ml-auto flex flex-wrap items-center gap-2">
          {flags.map((f) => (
            <span key={f} className="flex items-center gap-1.5">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-clay-500" />
              {f}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}