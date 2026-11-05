import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About SAVOR (Recipe Finder): features, technology stack and data sources",
};

const TECH_STACK = ["Next.js (App Router)", "TypeScript", "React 19", "Tailwind CSS", "Spoonacular API", "LocalStorage API", "next-themes"];

export default function AboutPage() {
  return (
    <div className="container-app max-w-4xl space-y-8 py-10 md:py-14">
      <header className="text-center">
        <span aria-hidden className="text-6xl">🍳</span>
        <h1 className="font-display mt-4 text-4xl font-medium">About SAVOR</h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-8 text-mineral dark:text-zinc-400">
          SAVOR (Recipe Finder) is a web application for discovering recipes. Search by the ingredients
          in your pantry or the dish you crave, and browse thousands of compositions from world cuisines —
          each with precise ingredients, step-by-step instructions, prep time and servings.
        </p>
      </header>

      <section className="card p-6">
        <h2 className="font-display text-2xl font-medium">✨ Features</h2>
        <ul className="mt-4 grid grid-cols-1 gap-3 text-sm leading-7 text-mineral dark:text-zinc-400 sm:grid-cols-2">
          <li>🔎 Search by dish name, keywords and ingredients</li>
          <li>🥗 Advanced dietary filters (vegetarian, vegan, gluten-free…)</li>
          <li>📊 Sort by popularity, healthiness or speed</li>
          <li>📄 Paginated results</li>
          <li>👨🍳 Full detail pages with ingredients and numbered steps</li>
          <li>❤️ Local favorites via LocalStorage (no account needed)</li>
          <li>🌙 Light / dark theme</li>
          <li>📱 Fully responsive, editorial layout</li>
          <li>🔗 Social sharing for every recipe</li>
        </ul>
      </section>

      <section className="card p-6">
        <h2 className="font-display text-2xl font-medium">🛠 Technology</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {TECH_STACK.map((tech) => (
            <span key={tech} className="pill bg-sage-500/10 text-sage-700 dark:text-sage-300">{tech}</span>
          ))}
        </div>
        <p className="mt-4 text-sm leading-7 text-mineral dark:text-zinc-400">
          The API key is used server-side only (Route Handlers and Server Components) for security, and
          responses are cached with Next.js Data Cache to keep daily API quota consumption minimal.
        </p>
      </section>

      <section className="card p-6">
        <h2 className="font-display text-2xl font-medium">🌐 Data Source</h2>
        <p className="mt-3 text-sm leading-7 text-mineral dark:text-zinc-400">
          All recipes, images and scores come from the{" "}
          <a href="https://spoonacular.com/food-api" target="_blank" rel="noopener noreferrer" className="font-bold text-sage-700 hover:underline dark:text-sage-300">
            Spoonacular Food API
          </a>{" "}
          — one of the world's largest food databases with 300,000+ recipes. When no API key is
          configured, the app runs in demo mode with sample data.
        </p>
      </section>

      <footer className="rounded-3xl bg-sage-700 p-6 text-center text-alabaster shadow-lift">
        <p className="font-bold">Built as a hands-on web engineering course project.</p>
        <p className="mt-1 text-sm text-sage-100/90">Crafted with ❤️ using Next.js + TypeScript</p>
      </footer>
    </div>
  );
}