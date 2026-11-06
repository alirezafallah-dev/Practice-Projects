// app/page.tsx
import Hero from "@/components/home/hero";
import {
  CuisineSection,
  TrendingSection,
  HarvestBanner,
  HowItWorks,
  TestimonialSection,
} from "@/components/home/sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CuisineSection />
      <TrendingSection />
      <HarvestBanner />
      <HowItWorks />
      <TestimonialSection />
    </>
  );
}