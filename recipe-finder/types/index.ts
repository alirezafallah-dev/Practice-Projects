/** گزینه‌های مرتب‌سازی نتایج جستجو */
export type SortOption = "relevance" | "popularity" | "healthiness" | "quickest";

/** خلاصه دستور غذا — برای کارت‌های لیست نتایج */
export interface RecipeSummary {
  id: number;
  title: string;
  image: string | null;
  summary: string;
  readyInMinutes: number | null;
  servings: number | null;
  healthScore: number | null;
  spoonacularScore: number | null;
  aggregateLikes: number | null;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  dishTypes: string[];
  diets: string[];
  cuisines: string[];
}

export interface RecipeIngredient {
  id: number | string;
  name: string;
  original: string;
  amount: number | null;
  unit: string;
  image: string | null;
  /** NEW: measurements for metric / US toggling */
  measures?: {
    metric: { amount: number; unit: string };
    us: { amount: number; unit: string };
  };
}

export interface RecipeStep {
  number: number;
  step: string;
  minutes: number | null;
}

export interface RecipeDetail extends RecipeSummary {
  sourceName: string | null;
  sourceUrl: string | null;
  creditText: string | null;
  calories: number | null;
  ingredients: RecipeIngredient[];
  instructions: RecipeStep[];
}

/** آیتم ذخیره‌شده در LocalStorage */
export interface FavoriteRecipe {
  id: number;
  title: string;
  image: string | null;
  savedAt: number;
}

export interface SearchInput {
  query?: string;
  ingredients?: string;
  diet?: string;
  type?: string;
  sort?: SortOption;
  page?: number;
  pageSize?: number;
}

export interface SearchResponse {
  results: RecipeSummary[];
  totalResults: number;
  page: number;
  pageSize: number;
  totalPages: number;
}