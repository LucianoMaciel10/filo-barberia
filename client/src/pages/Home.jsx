import Hero from "../components/home/Hero";
import Highlights from "../components/home/Highlights";
import LocationSection from "../components/home/LocationSection";
import ServicesSection from "../components/home/ServicesSection";
import TeamSection from "../components/home/TeamSection";

export default function Home() {
  return (
    <>
      {/* Primera pantalla: ocupa el alto de la ventana menos el navbar */}
      <div className="px-6 xl:px-30 flex min-h-[calc(100dvh-5rem)] flex-col md:min-h-[calc(100dvh-6rem)]">
        <Hero />
        <Highlights />
      </div>
      <ServicesSection />
      <TeamSection />
      <LocationSection />
    </>
  );
}
