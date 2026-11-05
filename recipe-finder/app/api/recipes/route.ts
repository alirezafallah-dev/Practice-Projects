// app/api/recipes/route.ts
import { NextResponse, type NextRequest } from "next/server";
import { DIETS, MEAL_TYPES, PAGE_SIZE, SORT_OPTIONS } from "@/lib/constants";
import { ApiError, searchRecipes } from "@/lib/spoonacular";
import { pickValid } from "@/lib/utils";
import type { SortOption } from "@/types";

/** GET /api/recipes?query=pasta&ingredients=tomato,cheese&diet=vegetarian&page=1 */
export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;

  try {
    const data = await searchRecipes({
      query: sp.get("query") ?? "",
      ingredients: sp.get("ingredients") ?? "",
      diet: pickValid(DIETS, sp.get("diet")),
      type: pickValid(MEAL_TYPES, sp.get("type")),
      sort: (pickValid(SORT_OPTIONS, sp.get("sort")) || "relevance") as SortOption,
      page: Number(sp.get("page") ?? 1) || 1,
      pageSize: Math.min(Math.max(Number(sp.get("pageSize") ?? PAGE_SIZE) || PAGE_SIZE, 1), 48),
    });
    return NextResponse.json(data);
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502;
    const message = error instanceof ApiError ? error.message : "Failed to fetch data from Spoonacular.";
    return NextResponse.json({ error: message }, { status });
  }
}