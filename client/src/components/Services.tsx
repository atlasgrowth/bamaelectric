import { ArrowRight, Home, Building2, Factory } from "lucide-react";
import { Link } from "wouter";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { getBusinessData } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export default function Services() {
  const { data: business } = useQuery({
    queryKey: ['business'],
    queryFn: getBusinessData,
    retry: false
  });

  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Start revealing cards one by one
          const timer = setInterval(() => {
            setVisibleCards(prev => {
              if (prev.length < services.length) {
                return [...prev, prev.length];
              } else {
                clearInterval(timer);
                return prev;
              }
            });
          }, 200);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const services = [
    {
      title: "Residential",
      description: `${business?.basic_info.name || 'We provide'} expert electrical services for homes, including installations, repairs, and upgrades to keep your home powered safely and efficiently${business?.basic_info.city ? ` in ${business.basic_info.city}` : ''}.`,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000",
      link: "/residential",
      icon: <Home className="h-6 w-6 text-amber-500" />
    },
    {
      title: "Commercial",
      description: `${business?.basic_info.name || 'We offer'} comprehensive electrical solutions for businesses, from office buildings to retail spaces, ensuring reliable power for your operations${business?.basic_info.city ? ` throughout ${business.basic_info.city}` : ''}.`,
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1000",
      link: "/commercial",
      icon: <Building2 className="h-6 w-6 text-amber-500" />
    },
    {
      title: "Industrial",
      description: `${business?.basic_info.name || 'We deliver'} specialized electrical services for manufacturing and industrial facilities, including power distribution and control systems${business?.basic_info.city ? ` in and around ${business.basic_info.city}` : ''}.`,
      image: "https://images.unsplash.com/photo-1581093458791-9d09daad908d?auto=format&fit=crop&q=80&w=1000",
      link: "/industrial",
      icon: <Factory className="h-6 w-6 text-amber-500" />
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-32 bg-zinc-100 dark:bg-zinc-900 transition-colors duration-200"
    >
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-block bg-amber-500/10 border border-amber-500/30 px-4 py-1 rounded-md text-amber-700 dark:text-amber-300 text-sm font-medium mb-4">
            OUR EXPERTISE
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-zinc-900 dark:text-white">
            {business?.basic_info.name ? `${business.basic_info.name}'s Services` : 'Our Services'}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 text-lg">
            Discover our comprehensive range of electrical services designed to meet all your needs
            {business?.basic_info.city ? ` in ${business.basic_info.city} and surrounding areas` : ''}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`bg-white dark:bg-zinc-800 rounded-xl overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-700 hover:shadow-2xl transition-all duration-500 transform ${
                visibleCards.includes(index) ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative">
                <div 
                  className="h-48 bg-cover bg-center transition-transform duration-700 hover:scale-110"
                  style={{ backgroundImage: `url(${service.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="shrink-0 mt-1">
                    {service.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white">
                    {service.title} Services
                  </h3>
                </div>
                <p className="text-zinc-600 dark:text-zinc-300 mb-6">{service.description}</p>
                <Link href={service.link}>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black group">
                    Learn More 
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile experience enhancement: Quick contact section */}
        <div className="mt-12 p-6 md:p-8 bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 md:hidden">
          <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-white text-center">
            Need Electrical Help?
          </h3>
          <p className="text-zinc-600 dark:text-zinc-300 text-center mb-4">
            {business?.basic_info.name || 'We are'} ready to assist with all your electrical needs
          </p>
          <a 
            href={`tel:${business?.basic_info.phone || ''}`}
            className="block w-full bg-amber-500 hover:bg-amber-600 text-black text-center py-3 rounded-lg font-bold transition-colors"
          >
            {business?.basic_info.phone || 'Call Now'}
          </a>
        </div>
      </div>
    </section>
  );
}