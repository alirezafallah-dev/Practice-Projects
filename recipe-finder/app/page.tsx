import Hero from "@/components/home/hero";
import { EditorsEdit, Manifesto, SeasonalBand, TasteAtlas } from "@/components/home/sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SeasonalBand />
      <EditorsEdit />
      <TasteAtlas />
      <Manifesto />
    </>
  );
}