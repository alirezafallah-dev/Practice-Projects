import { PAGE_SIZE } from "./constants";
import { normalizeIngredients, sortResults } from "./search-utils";
import type { RecipeDetail, SearchInput, SearchResponse } from "@/types";

/** دیتای نمونه فارسی — فقط زمانی استفاده می‌شود که SPOONACULAR_API_KEY تنظیم نشده باشد */
const MOCK_RECIPES: RecipeDetail[] = [
  {
    id: 900001,
    title: "پاستا کربونارای اصل ایتالیایی",
    image: "/images/recipes/food-1.svg",
    summary:
      "یک کلاسیک ایتالیایی بدون خامه! کربونارای واقعی فقط با تخم‌مرغ، پنیر پارمزان، بیکن و فلفل سیاه تازه تهیه می‌شود و در ۲۵ دقیقه آماده است.",
    readyInMinutes: 25,
    servings: 4,
    healthScore: 55,
    spoonacularScore: 92,
    aggregateLikes: 1284,
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    dishTypes: ["main course"],
    diets: [],
    cuisines: ["Italian"],
    sourceName: "داده نمونه مزه‌یاب",
    sourceUrl: null,
    creditText: null,
    ingredients: [
      { id: 1, name: "اسپاگتی", original: "۴۰۰ گرم اسپاگتی", amount: 400, unit: "گرم", image: null },
      { id: 2, name: "بیکن گوساله", original: "۱۵۰ گرم بیکن گوساله خردشده", amount: 150, unit: "گرم", image: null },
      { id: 3, name: "تخم‌مرغ", original: "۳ عدد تخم‌مرغ (۲ کامل + ۱ زرده)", amount: 3, unit: "عدد", image: null },
      { id: 4, name: "پنیر پارمزان", original: "۱۰۰ گرم پنیر پارمزان رنده‌شده", amount: 100, unit: "گرم", image: null },
      { id: 5, name: "فلفل سیاه", original: "فلفل سیاه تازه آسیاب‌شده به میزان دلخواه", amount: null, unit: "", image: null },
      { id: 6, name: "نمک", original: "نمک برای آب پاستا", amount: null, unit: "", image: null },
    ],
    instructions: [
      { number: 1, step: "یک قابلمه بزرگ آب را با نمک فراوان جوش بیاورید و اسپاگتی را طبق دستور بسته (۸ تا ۱۰ دقیقه) بپزید تا آل‌دنته شود." },
      { number: 2, step: "همزمان بیکن‌ها را در یک تابه بزرگ بدون روغن تفت دهید تا طلایی و ترد شوند." },
      { number: 3, step: "تخم‌مرغ‌ها، زرده اضافه و پنیر پارمزان را در کاسه‌ای با فلفل سیاه فراوان هم بزنید." },
      { number: 4, step: "نصف لیوان از آب پاستا را جدا کنید، سپس اسپاگتی آبکش‌شده را به تابه بیکن اضافه کرده و شعله را خاموش کنید." },
      { number: 5, step: "مخلوط تخم‌مرغ را کم‌کم اضافه کنید و سریع هم بزنید تا سسی کرمی تشکیل شود؛ در صورت نیاز کمی آب پاستا بریزید. فوراً با پارمزان اضافه سرو کنید." },
    ],
  },
  {
    id: 900002,
    title: "پیتزا مارگاریتا خانگی",
    image: "/images/recipes/food-2.svg",
    summary:
      "پیتزای کلاسیک ناپلی با سس گوجه ساده، موزارلای تازه و ریحان معطر؛ ساده، سریع و بی‌نهایت خوشمزه.",
    readyInMinutes: 40,
    servings: 2,
    healthScore: 62,
    spoonacularScore: 95,
    aggregateLikes: 2150,
    vegetarian: true,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    dishTypes: ["main course"],
    diets: ["vegetarian"],
    cuisines: ["Italian"],
    sourceName: "داده نمونه مزه‌یاب",
    sourceUrl: null,
    creditText: null,
    ingredients: [
      { id: 1, name: "خمیر پیتزا", original: "۱ عدد خمیر آماده پیتزا (حدود ۳۰۰ گرم)", amount: 1, unit: "عدد", image: null },
      { id: 2, name: "گوجه فرنگی", original: "۲ عدد گوجه رنده‌شده یا نصف لیوان سس گوجه", amount: 2, unit: "عدد", image: null },
      { id: 3, name: "پنیر موزارلا", original: "۱۵۰ گرم موزارلای تازه ورقه‌شده", amount: 150, unit: "گرم", image: null },
      { id: 4, name: "ریحان", original: "۱۰ برگ ریحان تازه", amount: 10, unit: "برگ", image: null },
      { id: 5, name: "روغن زیتون", original: "۲ قاشق غذاخوری روغن زیتون بکر", amount: 2, unit: "قاشق غذاخوری", image: null },
      { id: 6, name: "نمک و فلفل", original: "نمک و فلفل به میزان لازم", amount: null, unit: "", image: null },
    ],
    instructions: [
      { number: 1, step: "فر را با بالاترین دمای ممکن (حدود ۲۵۰ درجه سانتی‌گراد) به‌همراه سینی فر گرم کنید." },
      { number: 2, step: "خمیر را روی کاغذ روغنی به ضخامت دلخواه باز کنید و سس گوجه را با کمی نمک روی آن بمالید." },
      { number: 3, step: "ورقه‌های موزارلا را روی پیتزا پخش کنید و ۸ تا ۱۰ دقیقه بپزید تا لبه‌ها طلایی و پنیر آب شود." },
      { number: 4, step: "پس از خروج از فر، برگ‌های ریحان و روغن زیتون را اضافه کنید و برش بزنید." },
    ],
  },
  {
    id: 900003,
    title: "سالاد سزار با مرغ گریل‌شده",
    image: "/images/recipes/food-3.svg",
    summary:
      "سالاد محبوب و سیرکننده با کاهوی ترد، سینه مرغ گریل‌شده، کروتان خانگی و سس سزار سبک‌تر بر پایه ماست.",
    readyInMinutes: 30,
    servings: 2,
    healthScore: 70,
    spoonacularScore: 88,
    aggregateLikes: 980,
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    dishTypes: ["salad", "main course"],
    diets: [],
    cuisines: ["American"],
    sourceName: "داده نمونه مزه‌یاب",
    sourceUrl: null,
    creditText: null,
    ingredients: [
      { id: 1, name: "کاهو پیچ", original: "۱ بوته کاهو پیچ خردشده", amount: 1, unit: "بوته", image: null },
      { id: 2, name: "سینه مرغ", original: "۱ عدد سینه مرغ بی‌استخوان", amount: 1, unit: "عدد", image: null },
      { id: 3, name: "نان تست", original: "۲ ورق نان تست مکعبی (برای کروتان)", amount: 2, unit: "ورق", image: null },
      { id: 4, name: "پنیر پارمزان", original: "۳۰ گرم پارمزان رنده‌شده", amount: 30, unit: "گرم", image: null },
      { id: 5, name: "ماست چکیده", original: "۳ قاشق غذاخوری ماست چکیده", amount: 3, unit: "قاشق غذاخوری", image: null },
      { id: 6, name: "سیر و لیمو", original: "۱ حبه سیر رنده‌شده + آب نصف لیمو", amount: null, unit: "", image: null },
      { id: 7, name: "روغن زیتون", original: "۲ قاشق غذاخوری روغن زیتون", amount: 2, unit: "قاشق غذاخوری", image: null },
    ],
    instructions: [
      { number: 1, step: "سینه مرغ را با نمک، فلفل، کمی روغن زیتون و آب لیمو مزه‌دار کرده و ۵ دقیقه در تابه گریل داغ از هر طرف بپزید، سپس برش بزنید." },
      { number: 2, step: "مکعب‌های نان تست را با روغن زیتون و کمی سیر در تابه یا فر برشته کنید تا کروتان طلایی شود." },
      { number: 3, step: "برای سس: ماست، سیر رنده‌شده، آب لیمو، روغن زیتون، نمک و فلفل را مخلوط کنید." },
      { number: 4, step: "کاهو را با سس مخلوط کنید، مرغ برش‌خورده و کروتان را روی آن بچینید و با پارمزان تمام کنید." },
    ],
  },
  {
    id: 900004,
    title: "سوپ عدس و سبزیجات",
    image: "/images/recipes/food-4.svg",
    summary:
      "یک سوپ مقوی، وگان و بدون گلوتن با عدس، هویج و ادویه‌های گرم؛ غذای کامل شب‌های سرد.",
    readyInMinutes: 45,
    servings: 4,
    healthScore: 92,
    spoonacularScore: 90,
    aggregateLikes: 640,
    vegetarian: true,
    vegan: true,
    glutenFree: true,
    dairyFree: true,
    dishTypes: ["soup"],
    diets: ["vegetarian", "vegan", "glutenFree", "dairyFree"],
    cuisines: ["Middle Eastern"],
    sourceName: "داده نمونه مزه‌یاب",
    sourceUrl: null,
    creditText: null,
    ingredients: [
      { id: 1, name: "عدس", original: "۱ لیوان عدس شسته‌شده", amount: 1, unit: "لیوان", image: null },
      { id: 2, name: "هویج", original: "۲ عدد هویج نگینی", amount: 2, unit: "عدد", image: null },
      { id: 3, name: "پیاز", original: "۱ عدد پیاز خردشده", amount: 1, unit: "عدد", image: null },
      { id: 4, name: "گوجه فرنگی", original: "۲ عدد گوجه رنده‌شده", amount: 2, unit: "عدد", image: null },
      { id: 5, name: "سیر", original: "۲ حبه سیر رنده‌شده", amount: 2, unit: "حبه", image: null },
      { id: 6, name: "زردچوبه و زیره", original: "۱ قاشق چای‌خوری زردچوبه + نصف قاشق چای‌خوری زیره", amount: null, unit: "", image: null },
      { id: 7, name: "آب یا آب سبزیجات", original: "۶ لیوان آب یا آب سبزیجات", amount: 6, unit: "لیوان", image: null },
      { id: 8, name: "روغن زیتون", original: "۲ قاشق غذاخوری روغن زیتون", amount: 2, unit: "قاشق غذاخوری", image: null },
    ],
    instructions: [
      { number: 1, step: "پیاز را در روغن زیتون تفت دهید تا نرم و شیشه‌ای شود، سپس سیر و ادویه‌ها را اضافه کرده ۱ دقیقه تفت دهید." },
      { number: 2, step: "هویج و گوجه رنده‌شده را اضافه کنید و ۵ دقیقه هم بزنید." },
      { number: 3, step: "عدس و آب را اضافه کنید، به جوش که آمد شعله را کم کرده و در قابلمه را بگذارید تا ۳۰ دقیقه بپزد." },
      { number: 4, step: "در صورت تمایل نیمی از سوپ را با گوشت‌کوب برقی بزنید تا غلیظ‌تر شود." },
      { number: 5, step: "با نمک و فلفل تنظیم چاشنی کنید و با آب لیموی تازه و روغن زیتون سرو کنید." },
    ],
  },
  {
    id: 900005,
    title: "خوراک مرغ تیکا ماسالا",
    image: "/images/recipes/food-5.svg",
    summary:
      "تکه‌های مرغ مزه‌دار شده در ماست و ادویه، با سس گوجه خامه‌ای و معطر؛ سرو با برنج باسماتی یا نان.",
    readyInMinutes: 60,
    servings: 4,
    healthScore: 65,
    spoonacularScore: 97,
    aggregateLikes: 3200,
    vegetarian: false,
    vegan: false,
    glutenFree: true,
    dairyFree: false,
    dishTypes: ["main course"],
    diets: ["glutenFree"],
    cuisines: ["Indian"],
    sourceName: "داده نمونه مزه‌یاب",
    sourceUrl: null,
    creditText: null,
    ingredients: [
      { id: 1, name: "سینه مرغ", original: "۵۰۰ گرم سینه مرغ مکعبی", amount: 500, unit: "گرم", image: null },
      { id: 2, name: "ماست", original: "۱ لیوان ماست پرچرب", amount: 1, unit: "لیوان", image: null },
      { id: 3, name: "ادویه گرم ماسالا", original: "۲ قاشق غذاخوری ادویه گرم ماسالا", amount: 2, unit: "قاشق غذاخوری", image: null },
      { id: 4, name: "گوجه فرنگی", original: "۴ عدد گوجه رنده‌شده یا ۱ قوطی پوره گوجه", amount: 4, unit: "عدد", image: null },
      { id: 5, name: "خامه", original: "نصف لیوان خامه صبحانه", amount: 0.5, unit: "لیوان", image: null },
      { id: 6, name: "پیاز و سیر و زنجبیل", original: "۱ پیاز + ۲ حبه سیر + ۱ قاشق چای‌خوری زنجبیل رنده‌شده", amount: null, unit: "", image: null },
    ],
    instructions: [
      { number: 1, step: "مرغ را با نصف ماست، نیمی از ادویه‌ها، سیر و زنجبیل مخلوط کرده حداقل ۳۰ دقیقه استراحت دهید." },
      { number: 2, step: "مرغ‌ها را در تابه داغ یا فر گریل کنید تا سطحشان کمی بسوزد و طلایی شود." },
      { number: 3, step: "پیاز را تفت دهید، پوره گوجه و بقیه ادویه را اضافه کرده ۱۰ دقیقه بپزید تا سس غلیظ شود." },
      { number: 4, step: "مرغ‌ها و خامه را به سس اضافه کنید و ۱۰ دقیقه با شعله ملایم بپزید." },
      { number: 5, step: "با گشنیز تازه تزیین کرده و با برنج باسماتی یا نان سرو کنید." },
    ],
  },
  {
    id: 900006,
    title: "کیک شکلاتی لاوا",
    image: "/images/recipes/food-6.svg",
    summary:
      "کیک کوچک شکلاتی با مغز مذاب که در کمتر از ۳۰ دقیقه آماده می‌شود؛ دسری جادویی برای مهمانی‌ها.",
    readyInMinutes: 30,
    servings: 4,
    healthScore: 30,
    spoonacularScore: 89,
    aggregateLikes: 1750,
    vegetarian: true,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    dishTypes: ["dessert"],
    diets: ["vegetarian"],
    cuisines: ["French"],
    sourceName: "داده نمونه مزه‌یاب",
    sourceUrl: null,
    creditText: null,
    ingredients: [
      { id: 1, name: "شکلات تلخ", original: "۱۵۰ گرم شکلات تلخ ۷۰٪", amount: 150, unit: "گرم", image: null },
      { id: 2, name: "کره", original: "۱۰۰ گرم کره", amount: 100, unit: "گرم", image: null },
      { id: 3, name: "تخم‌مرغ", original: "۳ عدد تخم‌مرغ", amount: 3, unit: "عدد", image: null },
      { id: 4, name: "شکر", original: "نصف لیوان شکر", amount: 0.5, unit: "لیوان", image: null },
      { id: 5, name: "آرد", original: "۳ قاشق غذاخوری آرد قنادی", amount: 3, unit: "قاشق غذاخوری", image: null },
      { id: 6, name: "وانیل", original: "نصف قاشق چای‌خوری وانیل", amount: 0.5, unit: "قاشق چای‌خوری", image: null },
    ],
    instructions: [
      { number: 1, step: "فر را با دمای ۲۰۰ درجه سانتی‌گراد گرم کنید و ۴ رامکین را چرب کرده و کمی شکر بپاشید." },
      { number: 2, step: "شکلات و کره را روی بخار آب (بن‌ماری) ذوب و یکدست کنید." },
      { number: 3, step: "تخم‌مرغ، شکر و وانیل را بزنید تا کرمی شود، سپس شکلات ذوب‌شده و بعد آرد را اضافه کنید." },
      { number: 4, step: "مایه را داخل رامکین‌ها ریخته و دقیقاً ۱۰ تا ۱۲ دقیقه بپزید؛ لبه‌ها سفت و مرکز باید لرزان بماند." },
      { number: 5, step: "۱ دقیقه صبر کنید، سپس در بشقاب برگردانید و با بستنی وانیلی یا توت‌فرنگی سرو کنید." },
    ],
  },
];

export function mockSearch(input: SearchInput): SearchResponse {
  const page = Math.max(1, Math.floor(input.page ?? 1));
  const pageSize = input.pageSize ?? PAGE_SIZE;
  let items = [...MOCK_RECIPES];

  const q = (input.query ?? "").trim().toLowerCase();
  if (q) {
    items = items.filter((r) =>
      [r.title, r.summary, ...r.cuisines, ...r.dishTypes, ...r.ingredients.map((i) => i.name)]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }

  const ingredients = normalizeIngredients(input.ingredients ?? "");
  if (ingredients) {
    const list = ingredients.split(",").map((s) => s.toLowerCase());
    items = items.filter((r) =>
      r.ingredients.some(
        (ing) =>
          list.some((needle) => ing.name.toLowerCase().includes(needle)) ||
          list.some((needle) => ing.original.toLowerCase().includes(needle)),
      ),
    );
  }

  if (input.diet) {
    const diet = input.diet;
    items = items.filter((r) => {
      switch (diet) {
        case "vegetarian": return r.vegetarian;
        case "vegan": return r.vegan;
        case "glutenFree": return r.glutenFree;
        case "dairyFree": return r.dairyFree;
        default: return r.diets.includes(diet);
      }
    });
  }

  if (input.type) {
    items = items.filter((r) => r.dishTypes.includes(input.type as string));
  }

  items = sortResults(items, input.sort);
  const start = (page - 1) * pageSize;

  return {
    results: items.slice(start, start + pageSize),
    totalResults: items.length,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(items.length / pageSize)),
  };
}

export function mockDetail(id: number): RecipeDetail | null {
  return MOCK_RECIPES.find((r) => r.id === id) ?? null;
}
