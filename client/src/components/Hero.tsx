
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { getBusinessData } from "@/lib/utils";
import { ArrowRight, Phone } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: business } = useQuery({
    queryKey: ['business'],
    queryFn: getBusinessData,
    retry: false
  });
  
  // Pre-defined slides for immediate loading (no waiting for animations)
  const slides = [
    {
      title: "Expert Electrical Services",
      description: `Professional electrical contractors with over 20 years of experience${business?.basic_info.city ? ` in ${business.basic_info.city}` : ''}`,
      backgroundImage: "https://assets.cdn.filesafe.space/jcEKoOF2TKiEyPXqmAdw/media/64fa13d20a2893ce5bd55fe5.jpeg",
      link: "/residential"
    },
    {
      title: "Commercial Solutions",
      description: "Reliable electrical services for businesses of all sizes",
      backgroundImage: "https://assets.cdn.filesafe.space/v3AeG4GECxfBsZeF2Mxn/media/64fa13d20a2893ce5bd55fdb.jpeg",
      link: "/commercial"
    },
    {
      title: "Industrial Expertise",
      description: "Heavy-duty electrical solutions for industrial facilities",
      backgroundImage: "https://assets.cdn.filesafe.space/UFb0NvEbDfQq93rXZtcZ/media/802c411f-2c04-4189-b054-a9feda1e99ad.jpeg", 
      link: "/industrial"
    }
  ];

  // Preload images to avoid blank sections
  useEffect(() => {
    slides.forEach(slide => {
      const img = new Image();
      img.src = slide.backgroundImage;
    });
  }, []);

  // Simpler slide change logic with no animation delay
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[85vh] sm:h-[90vh] md:h-screen flex items-center bg-black">
      {/* Background images - loaded with higher priority and no opacity transitions */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${slide.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: currentSlide === index ? 0.75 : 0,
            transition: 'opacity 0.5s',
            display: currentSlide === index ? 'block' : 'none', // Improve performance
          }}
        />
      ))}

      {/* Content container */}
      <div className="container relative z-10">
        <div className="max-w-2xl">
          <div className="bg-amber-500 text-black px-4 py-1 rounded-md text-sm font-medium inline-block mb-4">
            ELECTRICAL SERVICES
          </div>
          
          {/* Text content - all loaded at once to prevent blank spaces */}
          <div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-zinc-200 mb-8">
              {slides[currentSlide].description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-black">
                <a href={`tel:${business?.basic_info.phone}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  {business?.basic_info.phone || 'Call Now'}
                </a>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                <Link href={slides[currentSlide].link}>
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Simple dots navigation */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-amber-500" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
