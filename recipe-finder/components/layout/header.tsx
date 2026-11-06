// components/layout/header.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useFavorites } from "@/context/favorites-context";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ChefHatIcon, HeartIcon, MenuIcon, SearchIcon, XIcon } from "@/components/ui/icons";
import ThemeToggle from "./theme-toggle";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/search", label: "Search" },
  { href: "/favorites", label: "Favorites" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [q, setQ] = useState("");
  const { favorites, loaded } = useFavorites();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const v = q.trim();
    router.push(v ? `/search?query=${encodeURIComponent(v)}` : "/search");
    setQ("");
    setMenuOpen(false);
  }

  return (
    <header className="frost sticky top-0 z-50 border-b border-linen/80 dark:border-white/10">
      <div className="container-app flex h-16 items-center justify-between gap-3 md:h-20">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-terracotta text-white shadow-lift md:h-11 md:w-11">
            <ChefHatIcon width={20} height={20} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-extrabold tracking-tight text-ink md:text-2xl dark:text-zinc-50">
              {APP_NAME}
            </span>
            <span className="micro-label mt-1 text-terracotta">
              {APP_TAGLINE.toUpperCase()}
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-linen bg-porcelain/75 p-1.5 shadow-rest backdrop-blur dark:border-white/10 dark:bg-white/5">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "block rounded-full px-4 py-2 text-[12px] font-bold tracking-[0.06em] transition",
                    isActive(item.href)
                      ? "bg-terracotta text-white shadow-lift"
                      : "text-espresso-700 hover:bg-ecru hover:text-terracotta dark:text-zinc-300 dark:hover:bg-white/10"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <form onSubmit={onSearch} className="hidden md:block">
            <label htmlFor="header-search" className="sr-only">
              Search recipes
            </label>
            <div className="flex h-10 w-44 items-center gap-2 rounded-full border border-linen bg-porcelain/80 px-3.5 transition-all focus-within:w-56 focus-within:border-terracotta focus-within:ring-4 focus-within:ring-terracotta/15 dark:border-white/10 dark:bg-white/5">
              <SearchIcon width={15} height={15} className="shrink-0 text-mineral" />
              <input
                id="header-search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Find recipes"
                className="w-full bg-transparent text-xs outline-none placeholder:text-mineral/70 dark:text-zinc-100"
              />
            </div>
          </form>

          <Link
            href="/favorites"
            aria-label="Favorites"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-linen bg-porcelain/80 text-ink transition hover:border-terracotta hover:text-terracotta dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
          >
            <HeartIcon width={16} height={16} filled={loaded && favorites.length > 0} />
            {loaded && favorites.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta px-1 text-[10px] font-bold text-white">
                {favorites.length}
              </span>
            )}
          </Link>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-linen bg-porcelain/80 text-ink dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 lg:hidden"
          >
            {menuOpen ? <XIcon width={17} height={17} /> : <MenuIcon width={17} height={17} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav aria-label="Mobile" className="border-t border-linen/80 dark:border-white/10 lg:hidden">
          <ul className="container-app flex flex-col gap-1 py-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "block rounded-2xl px-4 py-3 text-sm font-bold transition",
                    isActive(item.href)
                      ? "bg-terracotta text-white shadow-lift"
                      : "text-espresso-700 hover:bg-ecru dark:text-zinc-300 dark:hover:bg-white/10"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            <li className="pt-2 md:hidden">
              <form
                onSubmit={onSearch}
                className="flex items-center gap-2 rounded-2xl border border-linen bg-canvas px-4 py-3 dark:border-white/10 dark:bg-ink-900"
              >
                <SearchIcon width={16} height={16} className="text-mineral" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Find recipes"
                  className="w-full bg-transparent text-sm outline-none dark:text-zinc-100"
                />
              </form>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}