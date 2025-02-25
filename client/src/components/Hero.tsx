import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { getBusinessData } from "@/lib/utils";
import { ArrowRight, Phone } from "lucide-react";
import { useEffect, useState } from "react";

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: business } = useQuery({
    queryKey: ['business'],
    queryFn: getBusinessData,
    retry: false
  });

  const slides = [
    {
      image: "https://assets.cdn.filesafe.space/jcEKoOF2TKiEyPXqmAdw/media/64fa13d20a2893ce5bd55fe5.jpeg",
      title: "Residential Electrical Services",
      subtitle: `${business?.basic_info.name || 'Professional'} residential electrical solutions for your home`,
      link: "/residential"
    },
    {
      image: "https://assets.cdn.filesafe.space/A9rd4HdLD0sTvRuuQFZl/media/65146ad76f44431d743d2eae.jpeg",
      title: "Commercial Electrical Services",
      subtitle: `Powering businesses with ${business?.basic_info.name || 'expert'} commercial solutions`,
      link: "/commercial"
    },
    {
      image: "https://assets.cdn.filesafe.space/UFb0NvEbDfQq93rXZtcZ/media/802c411f-2c04-4189-b054-a9feda1e99ad.jpeg",
      title: "Industrial Electrical Services",
      subtitle: `Industrial-grade electrical solutions by ${business?.basic_info.name || 'professionals'}`,
      link: "/industrial"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[85vh] sm:h-[90vh] md:h-screen overflow-hidden">
      {/* Background slides with overlay */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-zinc-900/80 dark:bg-black/80" />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container relative z-10 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto sm:mx-0 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
              {slides[currentSlide].title}
            </h1>
            <p className="text-zinc-200 mb-6 sm:mb-8 text-sm sm:text-base">
              {slides[currentSlide].subtitle}
              {business?.basic_info.city && ` in ${business.basic_info.city}`}
            </p>

            {/* Improved buttons for mobile consistency */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href={slides[currentSlide].link} className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="bg-amber-500 hover:bg-amber-600 text-black w-full sm:w-auto py-2 h-auto sm:h-12"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>

              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black transition-colors w-full sm:w-auto py-2 h-auto sm:h-12"
                onClick={() => window.location.href = `tel:${business?.basic_info.phone}`}
              >
                <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                {business?.basic_info.phone || 'Contact Us'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators - positioned higher from bottom on mobile */}
      <div className="absolute bottom-8 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors ${
              currentSlide === index ? "bg-amber-500" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}