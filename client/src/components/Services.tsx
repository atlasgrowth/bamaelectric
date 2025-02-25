
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "./ui/button";

export default function Services() {
  const services = [
    {
      title: "Residential",
      description: "Expert electrical services for homes, including installations, repairs, and upgrades to keep your home powered safely and efficiently.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000",
      link: "/residential"
    },
    {
      title: "Commercial",
      description: "Comprehensive electrical solutions for businesses, from office buildings to retail spaces, ensuring reliable power for your operations.",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1000",
      link: "/commercial"
    },
    {
      title: "Industrial",
      description: "Specialized electrical services for manufacturing and industrial facilities, including power distribution and control systems.",
      image: "https://images.unsplash.com/photo-1581093458791-9d09daad908d?auto=format&fit=crop&q=80&w=1000",
      link: "/industrial"
    }
  ];

  return (
    <section className="py-32 bg-zinc-100 dark:bg-zinc-900 transition-colors duration-200">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4 text-zinc-900 dark:text-white">Our Services</h2>
          <p className="text-zinc-600 dark:text-zinc-300">
            Discover our comprehensive range of electrical services designed to meet all your needs
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-zinc-800 rounded-xl overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-700 hover:scale-105 transition-transform duration-300"
            >
              <div 
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${service.image})` }}
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-white">{service.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-300 mb-6">{service.description}</p>
                <Link href={service.link}>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
