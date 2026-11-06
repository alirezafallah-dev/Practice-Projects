// components/layout/footer.tsx
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import { ArrowRightIcon, ChefHatIcon, MailIcon } from "@/components/ui/icons";

const EXPLORE = [
  { label: "Seasonal Picks", href: "/search?query=seasonal" },
  { label: "Saved Dishes", href: "/favorites" },
  { label: "30-Min Dinners", href: "/search?query=30%20minute" },
  { label: "Pantry Staples", href: "/search?query=pantry" },
];

const CULINARY = [
  { label: "Our Philosophy", href: "/about" },
  { label: "Chef Guidelines", href: "/about" },
  { label: "Kitchen Conversions", href: "/about" },
  { label: "Nutrition Guide", href: "/about" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-linen bg-ecru/70 dark:border-white/10 dark:bg-ink-950">
      <div className="container-app grid grid-cols-1 gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-terracotta text-white shadow-lift">
              <ChefHatIcon width={20} height={20} />
            </span>
            <span className="font-display text-xl font-extrabold text-ink dark:text-zinc-50">
              {APP_NAME}
            </span>
          </Link>

          <p className="max-w-sm text-sm leading-7 text-espresso-700 dark:text-zinc-400">
            Handcrafted recipes, artisanal ingredients, and effortless everyday
            cooking designed for curious food lovers and home chefs.
          </p>
        </div>

        <div>
          <p className="micro-label mb-4 text-terracotta">Explore</p>
          <ul className="space-y-3">
            {EXPLORE.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm font-semibold text-espresso-700 transition hover:text-terracotta dark:text-zinc-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="micro-label mb-4 text-terracotta">Culinary</p>
          <ul className="space-y-3">
            {CULINARY.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm font-semibold text-espresso-700 transition hover:text-terracotta dark:text-zinc-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="micro-label mb-4 text-terracotta">Fresh in Your Inbox</p>
          <p className="mb-4 text-sm leading-7 text-espresso-700 dark:text-zinc-400">
            Join 45,000+ cooks receiving our Sunday supper notes, seasonal
            produce charts, and spice pairing secrets.
          </p>

          <div className="flex items-center gap-2 rounded-full border border-linen bg-porcelain p-1.5 shadow-rest dark:border-white/10 dark:bg-white/5">
            <span className="pl-3 text-mineral">
              <MailIcon width={16} height={16} />
            </span>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent px-2 text-sm outline-none placeholder:text-mineral/70 dark:text-zinc-100"
            />
            <button
              type="button"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-terracotta px-4 py-2 text-xs font-bold text-white transition hover:bg-terracotta-600"
            >
              Subscribe
              <ArrowRightIcon width={14} height={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-linen/80 dark:border-white/10">
        <div className="container-app flex flex-col items-center justify-between gap-3 py-5 text-xs font-semibold text-mineral md:flex-row dark:text-zinc-400">
          <p>© {year} Recipe Finder Studio. Wholesome kitchen creations.</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="transition hover:text-terracotta">
              Privacy Policy
            </Link>
            <Link href="/about" className="transition hover:text-terracotta">
              Terms of Service
            </Link>
            <Link href="/about" className="transition hover:text-terracotta">
              Cookie Preferences
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}