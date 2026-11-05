export interface Option {
  value: string;
  label: string;
}

export const APP_NAME = "SAVOR";
export const APP_TAGLINE = "Recipe Finder";

/** Results per page (pagination) */
export const PAGE_SIZE = 12;

export const PLACEHOLDER_IMAGE = "/images/recipe-placeholder.svg";

export const DIETS: Option[] = [
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "glutenFree", label: "Gluten-Free" },
  { value: "dairyFree", label: "Dairy-Free" },
  { value: "ketogenic", label: "Ketogenic" },
  { value: "pescetarian", label: "Pescetarian" },
];

export const MEAL_TYPES: Option[] = [
  { value: "main course", label: "Main Course" },
  { value: "side dish", label: "Side Dish" },
  { value: "dessert", label: "Dessert" },
  { value: "salad", label: "Salad" },
  { value: "soup", label: "Soup" },
  { value: "breakfast", label: "Breakfast" },
  { value: "appetizer", label: "Appetizer" },
  { value: "snack", label: "Snack" },
  { value: "drink", label: "Drink" },
];

export const SORT_OPTIONS: Option[] = [
  { value: "relevance", label: "Most Relevant" },
  { value: "popularity", label: "Most Popular" },
  { value: "healthiness", label: "Healthiest" },
  { value: "quickest", label: "Quickest" },
];

/** Hero curated notes (design copy) */
export const QUICK_SUGGESTIONS: Option[] = [
  { value: "chanterelle mushrooms", label: "Wild Chanterelles" },
  { value: "pea risotto", label: "Spring Pea Risotto" },
  { value: "sourdough bread", label: "Artisanal Sourdough" },
  { value: "chili oil", label: "Fermented Chili Oil" },
  { value: "gluten-free pastry", label: "Gluten-Free Pastry" },
];