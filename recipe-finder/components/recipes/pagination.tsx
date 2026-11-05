import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";

interface PaginationProps {
  page: number;
  totalPages: number;
  params: Record<string, string>;
}

function pageWindow(current: number, total: number): Array<number | "…"> {
  const pages = new Set<number>([1, total, current, current - 1, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out: Array<number | "…"> = [];
  let prev = 0;
  for (const p of sorted) {
    if (p - prev > 1) out.push("…");
    out.push(p);
    prev = p;
  }
  return out;
}

export default function Pagination({ page, totalPages, params }: PaginationProps) {
  if (totalPages <= 1) return null;

  const hrefFor = (p: number): string => {
    const sp = new URLSearchParams(params);
    sp.set("page", String(p));
    return `/search?${sp.toString()}`;
  };

  const baseClass =
    "flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-medium transition";
  const idle =
    "border-linen bg-white text-ink hover:border-sage-300 hover:text-sage-700 dark:border-white/15 dark:bg-ink-900 dark:text-zinc-200";

  return (
    <nav aria-label="Search results pages" className="flex flex-wrap items-center justify-center gap-2">
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} className={cn(baseClass, idle)}>
          <ChevronLeftIcon width={16} height={16} />
          <span className="ml-1">Prev</span>
        </Link>
      ) : (
        <span aria-disabled className={cn(baseClass, "cursor-not-allowed border-linen text-mineral opacity-60 dark:border-white/10")}>
          <ChevronLeftIcon width={16} height={16} />
          <span className="ml-1">Prev</span>
        </span>
      )}

      {pageWindow(page, totalPages).map((p, i) =>
        p === "…" ? (
          <span key={`gap-${i}`} className="px-1 text-mineral">…</span>
        ) : p === page ? (
          <span key={p} aria-current="page" className={cn(baseClass, "border-sage-700 bg-sage-700 font-bold text-alabaster shadow-rest")}>
            {p}
          </span>
        ) : (
          <Link key={p} href={hrefFor(p)} className={cn(baseClass, idle)}>
            {p}
          </Link>
        ),
      )}

      {page < totalPages ? (
        <Link href={hrefFor(page + 1)} className={cn(baseClass, idle)}>
          <span className="mr-1">Next</span>
          <ChevronRightIcon width={16} height={16} />
        </Link>
      ) : (
        <span aria-disabled className={cn(baseClass, "cursor-not-allowed border-linen text-mineral opacity-60 dark:border-white/10")}>
          <span className="mr-1">Next</span>
          <ChevronRightIcon width={16} height={16} />
        </span>
      )}
    </nav>
  );
}