// components/recipes/recipe-grid.tsx
import RecipeCard from "./recipe-card";
import type { RecipeSummary } from "@/types";

/** گرید شبکه‌ای واکنش‌گرا: ۱ ستون موبایل → ۲ تبلت → ۳ لپتاپ → ۴ دسکتاپ */
export default function RecipeGrid({ recipes }: { recipes: RecipeSummary[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}