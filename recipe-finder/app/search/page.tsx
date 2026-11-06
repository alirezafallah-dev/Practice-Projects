import type { Metadata } from "next";
import FilterBar from "@/components/recipes/filter-bar";
import Pagination from "@/components/recipes/pagination";
import RecipeGrid from "@/components/recipes/recipe-grid";
import { EmptyState, ErrorState } from "@/components/ui/states";
import { DIETS, MEAL_TYPES, SORT_OPTIONS } from "@/lib/constants";
import { ApiError, searchRecipes } from "@/lib/spoonacular";
import { pickValid } from "@/lib/utils";
import type { SortOption } from "@/types";

export const metadata: Metadata = {
  title: "Search Results",
  description: "Search recipes by ingredients, dish name, diet or meal type",
};

type SP = Record<string, string | string[] | undefined>;

function first(v: string | string[] | undefined): string {
  return Array.isArray(v) ? (v[0] ?? "") : (v ?? "");
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;

  const query = first(sp.query).trim().slice(0, 120);
  const ingredients = first(sp.ingredients).trim().slice(0, 200);
  const diet = pickValid(DIETS, first(sp.diet));
  const type = pickValid(MEAL_TYPES, first(sp.type));
  const sort = (pickValid(SORT_OPTIONS, first(sp.sort)) || "relevance") as SortOption;
  const page = Math.max(1, Math.min(500, parseInt(first(sp.page), 10) || 1));

  let data: Awaited<ReturnType<typeof searchRecipes>> | null = null;
  let errorMessage: string | null = null;

  try {
    data = await searchRecipes({ query, ingredients, diet, type, sort, page });
  } catch (error) {
    errorMessage = error instanceof ApiError ? error.message : "Unexpected error while fetching data. Please try again.";
  }

  const currentParams: Record<string, string> = {};
  if (query) currentParams.query = query;
  if (ingredients) currentParams.ingredients = ingredients;
  if (diet) currentParams.diet = diet;
  if (type) currentParams.type = type;
  if (sort !== "relevance") currentParams.sort = sort;

  return (
    <div className="container-app space-y-6 py-6 md:py-8">
      <header>
        <h1 className="font-display text-3xl font-medium">
          {query ? (
            <>Results for "<span className="text-clay-600 dark:text-clay-300">{query}</span>"</>
          ) : (
            "Explore Recipes"
          )}
        </h1>
        {data && !errorMessage && (
          <p className="mt-1 text-sm text-mineral dark:text-zinc-400">
            {data.totalResults} recipes found — page {data.page} of {data.totalPages}
          </p>
        )}
      </header>
      <FilterBar query={query} ingredients={ingredients} diet={diet} type={type} sort={sort} />
      {errorMessage ? (
        <ErrorState message={errorMessage} retryHref="/search" />
      ) : data && data.results.length > 0 ? (
        <>
          <RecipeGrid recipes={data.results} />
          <Pagination page={data.page} totalPages={data.totalPages} params={currentParams} />
        </>
      ) : (
        <EmptyState
          emoji="🍳"
          title="No results found"
          message="We couldn't find any recipes with these filters. Try another keyword, remove some filters, or pick one of the suggestions below."
        />
      )}
    </div>
  );
}