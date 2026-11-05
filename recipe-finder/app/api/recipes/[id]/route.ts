// app/api/recipes/[id]/route.ts
import { NextResponse, type NextRequest } from "next/server";
import { ApiError, getRecipeById } from "@/lib/spoonacular";

/** GET /api/recipes/:id — full recipe details */
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    return NextResponse.json({ error: "Invalid recipe id." }, { status: 400 });
  }

  try {
    const recipe = await getRecipeById(numericId);
    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found." }, { status: 404 });
    }
    return NextResponse.json(recipe);
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502;
    const message = error instanceof ApiError ? error.message : "Failed to fetch the recipe.";
    return NextResponse.json({ error: message }, { status });
  }
}