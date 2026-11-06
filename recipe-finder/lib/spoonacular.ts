/**
 * Spoonacular access layer — server-side only.
 * The API key never reaches the client.
 */
import { PAGE_SIZE } from "./constants";
import { mockDetail, mockSearch } from "./mock";
import { normalizeIngredients, sortResults } from "./search-utils";
import { stripHtml } from "./utils";
import type {
  RecipeDetail,
  RecipeIngredient,
  RecipeStep,
  RecipeSummary,
  SearchInput,
  SearchResponse,
} from "@/types";

const BASE_URL = "https://api.spoonacular.com";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export function hasApiKey(): boolean {
  const key = process.env.SPOONACULAR_API_KEY;
  return Boolean(key && key.trim().length > 0);
}

type QueryValue = string | number | boolean | undefined | null;

async function spoonacularFetch<T>(
  path: string,
  params: Record<string, QueryValue>,
  revalidateSeconds = 1800,
): Promise<T> {
  const apiKey = process.env.SPOONACULAR_API_KEY?.trim();
  if (!apiKey) throw new ApiError("API key is not configured.", 500);

  const url = new URL(`${BASE_URL}${path}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }
  url.searchParams.set("apiKey", apiKey);

  let res: Response;
  try {
    res = await fetch(url.toString(), { next: { revalidate: revalidateSeconds } });
  } catch {
    throw new ApiError("Could not connect to Spoonacular. Check your internet connection.", 503);
  }

  if (res.status === 401)
    throw new ApiError("Invalid API key. Check SPOONACULAR_API_KEY in .env.local.", 401);
  if (res.status === 402)
    throw new ApiError("The daily free Spoonacular quota has been exhausted. Please try again tomorrow.", 402);
  if (res.status === 404) throw new ApiError("The requested item was not found on Spoonacular.", 404);
  if (!res.ok) throw new ApiError(`Unexpected Spoonacular error (status ${res.status}).`, res.status);

  return (await res.json()) as T;
}

/* ---------- Defensive mapping of raw API payloads ---------- */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapSummary(raw: any): RecipeSummary {
  const toStr = (v: unknown) => (typeof v === "string" ? v : "");
  const toNum = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : null);
  const toArr = (v: unknown) =>
    Array.isArray(v) ? v.filter((x): x is string => typeof x === "string" && x.length > 0) : [];

  return {
    id: Number(raw?.id) || 0,
    title: toStr(raw?.title) || "Untitled recipe",
    image: toStr(raw?.image) || null,
    summary: toStr(raw?.summary),
    readyInMinutes: toNum(raw?.readyInMinutes),
    servings: toNum(raw?.servings),
    healthScore: toNum(raw?.healthScore),
    spoonacularScore: toNum(raw?.spoonacularScore),
    aggregateLikes: toNum(raw?.aggregateLikes),
    vegetarian: raw?.vegetarian === true,
    vegan: raw?.vegan === true,
    glutenFree: raw?.glutenFree === true,
    dairyFree: raw?.dairyFree === true,
    dishTypes: toArr(raw?.dishTypes),
    diets: toArr(raw?.diets),
    cuisines: toArr(raw?.cuisines),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDetail(raw: any): RecipeDetail {
  const base = mapSummary(raw);

  // 1) Structured steps from analyzedInstructions (with optional duration)
  const steps: RecipeStep[] = [];
  if (Array.isArray(raw?.analyzedInstructions)) {
    for (const block of raw.analyzedInstructions) {
      if (!Array.isArray(block?.steps)) continue;
      for (const s of block.steps) {
        const text = typeof s?.step === "string" ? s.step.trim() : "";
        if (!text) continue;
        let minutes: number | null = null;
        const len = s?.length;
        if (len && typeof len.number === "number") {
          if (String(len.unit ?? "").startsWith("minute")) minutes = len.number;
          else if (String(len.unit ?? "").startsWith("hour")) minutes = len.number * 60;
        }
        steps.push({ number: typeof s.number === "number" ? s.number : steps.length + 1, step: text, minutes });
      }
    }
  }

  // 2) Fallback: plain/HTML instructions string split into lines
  if (steps.length === 0 && typeof raw?.instructions === "string" && raw.instructions.trim()) {
    const text = stripHtml(
      raw.instructions.replace(/<\/(p|li|h\d)>/gi, "\n").replace(/<li[^>]*>/gi, "\n"),
    );
    steps.push(
      ...text
        .split(/\n+/)
        .map((line) => line.trim())
        .filter(Boolean)
        .map((step, i) => ({ number: i + 1, step, minutes: null })),
    );
  }

  // 3) Ingredients with metric/US measures for the Pantry checklist
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ingredients: RecipeIngredient[] = Array.isArray(raw?.extendedIngredients)
    ? raw.extendedIngredients.map((ing: any, idx: number) => ({
        id: ing?.id ?? `ing-${idx}`,
        name:
          (typeof ing?.nameClean === "string" && ing.nameClean) ||
          (typeof ing?.name === "string" ? ing.name : ""),
        original: typeof ing?.original === "string" ? ing.original : "",
        amount: typeof ing?.amount === "number" ? ing.amount : null,
        unit: typeof ing?.unit === "string" ? ing.unit : "",
        image:
          typeof ing?.image === "string" && ing.image
            ? `https://img.spoonacular.com/ingredients_100x100/${ing.image}`
            : null,
        measures: ing?.measures
          ? {
              metric: {
                amount: Number(ing.measures?.metric?.amount) || 0,
                unit: String(ing.measures?.metric?.unitShort ?? ing.measures?.metric?.unit ?? ""),
              },
              us: {
                amount: Number(ing.measures?.us?.amount) || 0,
                unit: String(ing.measures?.us?.unitShort ?? ing.measures?.us?.unit ?? ""),
              },
            }
          : undefined,
      }))
    : [];

  // 4) Calories from nutrition (includeNutrition=true)
  const cal = Array.isArray(raw?.nutrition?.nutrients)
    ? raw.nutrition.nutrients.find((n: any) => n?.name === "Calories")
    : undefined;

  return {
    ...base,
    sourceName: typeof raw?.sourceName === "string" ? raw.sourceName : null,
    sourceUrl: typeof raw?.sourceUrl === "string" ? raw.sourceUrl : null,
    creditText: typeof raw?.creditText === "string" ? raw.creditText : null,
    calories: typeof cal?.amount === "number" ? Math.round(cal.amount) : null,
    ingredients,
    instructions: steps,
  };
}

/* ---------- Public API ---------- */

/** complexSearch: query + includeIngredients + diet + type + pagination + sorting */
export async function searchRecipes(input: SearchInput): Promise<SearchResponse> {
  if (!hasApiKey()) return { ...mockSearch(input), mock: true };

  const page = Math.max(1, Math.floor(input.page ?? 1));
  const pageSize = Math.min(48, Math.max(1, input.pageSize ?? PAGE_SIZE));

  const data = await spoonacularFetch<{ results?: unknown[]; totalResults?: number }>(
    "/recipes/complexSearch",
    {
      query: input.query?.trim() || undefined,
      includeIngredients: normalizeIngredients(input.ingredients ?? "") || undefined,
      diet: input.diet || undefined,
      type: input.type || undefined,
      number: pageSize,
      offset: (page - 1) * pageSize,
      addRecipeInformation: true,
    },
  );

  const mapped = (Array.isArray(data.results) ? data.results : [])
    .map(mapSummary)
    .filter((r) => r.id > 0);
  const totalResults = typeof data.totalResults === "number" ? data.totalResults : mapped.length;

  return {
    results: sortResults(mapped, input.sort),
    totalResults,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(totalResults / pageSize)),
    mock: false,
  };
}

/** Full recipe details by id (cached 24h) — SINGLE definition */
export async function getRecipeById(id: number): Promise<RecipeDetail | null> {
  if (!Number.isFinite(id) || id <= 0) return null;
  if (!hasApiKey()) return mockDetail(id);

  const raw = await spoonacularFetch<unknown>(
    `/recipes/${encodeURIComponent(String(id))}/information`,
    { includeNutrition: true },
    86_400,
  );
  return mapDetail(raw);
}