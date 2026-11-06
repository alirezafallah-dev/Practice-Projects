"use client";
import { useState } from "react";
import FavoriteButton from "@/components/recipes/favorite-button";
import { ShareIcon, PrinterIcon, CheckIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

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
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try { await navigator.share({ title, url }); return; } catch { /* cancel */ }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* ignore */ }
  }

  const ghost =
    "inline-flex items-center gap-2 rounded-full border border-linen bg-porcelain px-4 py-2.5 text-sm font-bold text-espresso transition hover:border-terracotta hover:text-terracotta active:translate-y-0.5 dark:border-white/15 dark:bg-white/5 dark:text-zinc-100";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <FavoriteButton recipe={{ id, title, image }} variant="labeled" size="md" />
      <button type="button" onClick={share} className={cn(ghost, copied && "border-rosemary text-rosemary")}>
        {copied ? <CheckIcon width={16} height={16} /> : <ShareIcon width={16} height={16} />}
        {copied ? "Link Copied" : "Share"}
      </button>
      <button type="button" onClick={() => window.print()} className={ghost}>
        <PrinterIcon width={16} height={16} /> Print
      </button>
      {flags.map((f) => (
        <span key={f} className="pill bg-rosemary/10 text-rosemary dark:bg-rosemary/20 dark:text-rosemary-200">{f}</span>
      ))}
    </div>
  );
}