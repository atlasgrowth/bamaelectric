import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Reviews } from "@/components/Reviews";
import { Map } from "@/components/Map";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Reviews />
      <Map />
    </div>
  );
}
