import Hero from "../components/home/Hero";
import Highlights from "../components/home/Highlights";
import LocationSection from "../components/home/LocationSection";
import ServicesSection from "../components/home/ServicesSection";
import TeamSection from "../components/home/TeamSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Highlights />
      <ServicesSection />
      <TeamSection />
      <LocationSection />
    </>
  );
}
