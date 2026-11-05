import { RecipeGridSkeleton } from "@/components/recipes/recipe-card-skeleton";

export default function SearchLoading() {
  return (
    <div className="container-app space-y-6 py-6 md:py-8">
      <div className="skeleton h-8 w-72 rounded-full" />
      <div className="skeleton h-40 w-full rounded-2xl" />
      <RecipeGridSkeleton count={8} />
    </div>
  );
}