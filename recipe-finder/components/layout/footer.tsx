import Link from "next/link";
import NewsletterForm from "./newsletter";
import { APP_NAME } from "@/lib/constants";
import { BookOpenIcon } from "@/components/ui/icons";

const INDEX_LINKS = [
  { href: "/search", label: "Seasonal Archives" },
  { href: "/search", label: "Pantry Ingredient Index" },
  { href: "/favorites", label: "Curated Recipe Boxes" },
  { href: "/about", label: "The Editorial Manifesto" },
  { href: "/about", label: "Culinary Standards & Ethics" },
];

export default function Footer() {
  return (
    <footer className="border-t border-linen bg-oatmeal dark:border-white/10 dark:bg-ink-900">
      <div className="container-app grid grid-cols-1 gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_0.9fr] lg:gap-16">
        <div>
          <p className="font-display text-3xl font-semibold">{APP_NAME}</p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-mineral dark:text-zinc-400">
            A curated publication celebrating slow gastronomy, seasonal harvest, and mindful recipe
            composition. Transposing independent culinary journalism into tactile living kitchen companions.
          </p>
          <p className="pill mt-6 border border-linen bg-white text-[10px] tracking-[0.12em] text-sage-700 dark:border-white/10 dark:bg-white/5 dark:text-sage-300">
            ✦ James Beard Digital Honoree • 2024
          </p>
        </div>

        <div>
          <h2 className="micro-label">The Weekly Gastronome</h2>
          <p className="mt-3 text-sm leading-7 text-mineral dark:text-zinc-400">
            Receive Sunday morning dispatches featuring three seasonal pantry recipes, market notes,
            and technique essays.
          </p>
          <div className="mt-5">
            <NewsletterForm />
          </div>
        </div>

        <div>
          <h2 className="micro-label">Editions & Index</h2>
          <ul className="mt-4 space-y-2.5">
            {INDEX_LINKS.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-sm text-mineral transition hover:text-sage-700 dark:text-zinc-400 dark:hover:text-sage-300">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-linen/80 dark:border-white/10">
        <div className="container-app flex flex-col items-center justify-between gap-3 py-6 md:flex-row">
          <p className="micro-label flex items-center gap-2">
            <BookOpenIcon width={13} height={13} className="text-clay-500" />
            © 2024 {APP_NAME} Publishing Guild. Handcrafted with reverence for natural ingredients.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Press & Licensing"].map((t) => (
              <span key={t} className="micro-label cursor-pointer transition hover:text-ink dark:hover:text-zinc-100">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}