import type { RecipeSummary, SortOption } from "@/types";

/** نرمال‌سازی لیست مواد اولیه — پشتیبانی از کامای فارسی «،» و انگلیسی «,» */
export function normalizeIngredients(input: string): string {
  return input
    .split(/[,،]/)
    .map((s) => s.trim())
    .filter(Boolean)
    .join(",");
}

/** مرتب‌سازی نتایج بر اساس گزینه انتخابی کاربر */
export function sortResults<T extends RecipeSummary>(items: T[], sort?: SortOption): T[] {
  const arr = [...items];
  switch (sort) {
    case "popularity":
      return arr.sort((a, b) => (b.spoonacularScore ?? 0) - (a.spoonacularScore ?? 0));
    case "healthiness":
      return arr.sort((a, b) => (b.healthScore ?? 0) - (a.healthScore ?? 0));
    case "quickest":
      return arr.sort(
        (a, b) => (a.readyInMinutes ?? Number.MAX_SAFE_INTEGER) - (b.readyInMinutes ?? Number.MAX_SAFE_INTEGER),
      );
    default:
      return arr; // relevance: همان ترتیب خود Spoonacular
  }
}