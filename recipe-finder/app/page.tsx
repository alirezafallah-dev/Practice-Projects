import Hero from "@/components/home/hero";
import Categories from "@/components/home/categories";
import PopularRecipes from "@/components/home/popular-recipes";
import HowItWorks from "@/components/home/how-it-works";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <PopularRecipes />
      <HowItWorks />
    </>
  );
}