"use client";

import { useEffect, useState } from "react";
import { ShareIcon } from "@/components/ui/icons";

export default function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(
      process.env.NEXT_PUBLIC_SITE_URL
        ? `${process.env.NEXT_PUBLIC_SITE_URL}${window.location.pathname}`
        : window.location.href,
    );
  }, []);

  if (!url) return null;

  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(`Check out this recipe on SAVOR: ${title}`);

  async function onShare() {
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // user dismissed the share sheet — not an error
    }
  }

  const socialBtn =
    "flex h-10 w-10 items-center justify-center rounded-full border border-linen bg-white text-lg transition hover:scale-110 dark:border-white/15 dark:bg-ink-900";

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onShare}
        className="inline-flex items-center gap-2 rounded-full border border-linen bg-white px-4 py-2 text-sm font-medium text-ink transition hover:border-sage-300 hover:text-sage-700 dark:border-white/15 dark:bg-ink-900 dark:text-zinc-200"
      >
        <ShareIcon width={16} height={16} />
        {copied ? "Link copied! ✓" : "Share"}
      </button>

      <a href={`https://wa.me/?text=${text}%20${encoded}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp" title="WhatsApp" className={socialBtn}>💬</a>
      <a href={`https://t.me/share/url?url=${encoded}&text=${text}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Telegram" title="Telegram" className={socialBtn}>✈️</a>
      <a href={`https://twitter.com/intent/tweet?url=${encoded}&text=${text}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X" title="X (Twitter)" className={socialBtn}>🐦</a>
    </div>
  );
}