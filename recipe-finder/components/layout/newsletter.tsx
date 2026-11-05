"use client";

import { useState, type FormEvent } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (email.trim()) setDone(true);
  }

  if (done) {
    return (
      <p role="status" className="rounded-2xl border border-sage-300/60 bg-sage-500/10 px-4 py-3 text-sm font-semibold text-sage-700 dark:text-sage-300">
        ✓ You're subscribed — the first dispatch arrives Sunday.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="h-12 flex-1 rounded-2xl border border-linen bg-white px-4 text-sm outline-none transition focus:border-sage-600 focus:ring-[3px] focus:ring-sage-600/10 dark:border-white/10 dark:bg-ink-950 dark:text-zinc-100"
      />
      <button type="submit" className="btn-primary h-12 rounded-2xl px-6 text-xs tracking-[0.08em]">
        Subscribe
      </button>
    </form>
  );
}