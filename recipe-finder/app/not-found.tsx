import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-app flex flex-col items-center gap-4 py-24 text-center">
      <span aria-hidden className="text-7xl">🍜</span>
      <h1 className="font-display text-4xl font-medium">404 — This dish isn't on the menu</h1>
      <p className="max-w-md text-sm leading-7 text-mineral dark:text-zinc-400">
        The page you were looking for could not be found. Perhaps the address was mistyped,
        or the recipe has been retired from the archive.
      </p>
      <Link href="/" className="btn-primary mt-2">
        Back to Home
      </Link>
    </div>
  );
}