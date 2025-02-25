import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import Services from "@/components/Services";
import { Reviews } from "@/components/Reviews";
import { Map } from "@/components/Map";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Services />
      <ServiceArea />
      <Reviews />
      <Map />
    </div>
  );
}