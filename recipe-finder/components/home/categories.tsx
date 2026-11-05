import Link from "next/link";
import { LeafIcon, CoffeeIcon, SaladIcon, UtensilsIcon, SoupIcon, FlameIcon } from "@/components/ui/icons";

const CATEGORIES = [
  { href: "/search?diet=vegetarian", label: "Vegetarian", desc: "Plant-based", Icon: LeafIcon, color: "text-sage-600 bg-sage-100 dark:text-sage-300 dark:bg-sage-900/40" },
  { href: "/search?type=breakfast", label: "Breakfast", desc: "Morning energy", Icon: CoffeeIcon, color: "text-clay-600 bg-clay-100 dark:text-clay-300 dark:bg-clay-900/40" },
  { href: "/search?type=salad", label: "Fresh Salads", desc: "Crisp & light", Icon: SaladIcon, color: "text-emerald-600 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-900/40" },
  { href: "/search?type=main+course", label: "Main Course", desc: "Hearty meals", Icon: UtensilsIcon, color: "text-amber-600 bg-amber-100 dark:text-amber-300 dark:bg-amber-900/40" },
  { href: "/search?type=soup", label: "Warm Soups", desc: "Comforting bowls", Icon: SoupIcon, color: "text-orange-600 bg-orange-100 dark:text-orange-300 dark:bg-orange-900/40" },
  { href: "/search?type=dessert", label: "Desserts", desc: "Sweet endings", Icon: FlameIcon, color: "text-pink-600 bg-pink-100 dark:text-pink-300 dark:bg-pink-900/40" },
];

export default function Categories() {
  return (
    <section className="container-app py-16 md:py-24">
      <div className="mb-10 text-center md:mb-14">
        <p className="micro-label mb-3 text-clay-600 dark:text-clay-300">Explore Tastes</p>
        <h2 className="font-display text-3xl font-medium text-ink dark:text-zinc-50 md:text-4xl">
          What are you craving today?
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {CATEGORIES.map(({ href, label, desc, Icon, color }) => (
          <Link
            key={label}
            href={href}
            className="card card-hover group flex flex-col items-center gap-3 p-5 text-center"
          >
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 ${color}`}>
              <Icon width={26} height={26} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink dark:text-zinc-100">{label}</h3>
              <p className="mt-1 text-[11px] text-mineral dark:text-zinc-400">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}