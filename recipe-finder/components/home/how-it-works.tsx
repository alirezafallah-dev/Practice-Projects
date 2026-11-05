import { SearchIcon, LeafIcon, HeartIcon } from "@/components/ui/icons";

const STEPS = [
  { Icon: SearchIcon, title: "Discover", desc: "Search by ingredients, cuisine, or your current mood." },
  { Icon: LeafIcon, title: "Cook", desc: "Follow our step-by-step guides tested for home kitchens." },
  { Icon: HeartIcon, title: "Save", desc: "Build your personal cookbook with your favorite meals." },
];

export default function HowItWorks() {
  return (
    <section className="bg-oatmeal/50 dark:bg-ink-900/50">
      <div className="container-app py-16 md:py-24">
        <div className="mb-10 text-center md:mb-14">
          <p className="micro-label mb-3 text-sage-600 dark:text-sage-400">Simple Process</p>
          <h2 className="font-display text-3xl font-medium text-ink dark:text-zinc-50 md:text-4xl">
            From inspiration to your table
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map(({ Icon, title, desc }, i) => (
            <div key={title} className="card relative flex flex-col items-center p-8 text-center">
              <span className="absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-sage-700 text-xs font-bold text-alabaster shadow-lift">
                {i + 1}
              </span>
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 text-sage-700 dark:bg-sage-900/40 dark:text-sage-300">
                <Icon width={28} height={28} />
              </div>
              <h3 className="font-display text-xl font-medium text-ink dark:text-zinc-100">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-mineral dark:text-zinc-400">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}