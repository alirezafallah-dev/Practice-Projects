import { DIETS, MEAL_TYPES, type Option } from "./constants";

/** Merge conditional Tailwind classes */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Strip HTML tags from Spoonacular summaries */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/** Shorten text for cards (one to two lines) */
export function truncate(text: string, max = 90): string {
  const clean = stripHtml(text);
  return clean.length > max ? `${clean.slice(0, max).trimEnd()}…` : clean;
}

/** 45 → "45 min" | 90 → "1 hr 30 min" */
export function formatMinutes(minutes?: number | null): string {
  if (!minutes || minutes <= 0) return "—";
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h} hr ${m} min` : `${h} hr`;
}

export function translateDiet(value: string): string {
  return DIETS.find((d) => d.value === value)?.label ?? value;
}

export function translateDishType(value: string): string {
  return MEAL_TYPES.find((t) => t.value === value)?.label ?? value;
}

/** Validate user input against allowed options before hitting the API */
export function pickValid(options: Option[], value: string | undefined | null): string {
  return value && options.some((o) => o.value === value) ? value : "";
}