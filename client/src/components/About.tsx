import { useQuery } from "@tanstack/react-query";
import { getBusinessData } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { ShieldCheck, Clock, Award, Users } from "lucide-react";

export function About() {
  const { data: business } = useQuery({
    queryKey: ['business'],
    queryFn: getBusinessData,
    retry: false
  });

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
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

  // Card content with icons
  const features = [
    {
      title: "Licensed & Insured",
      description: "Full coverage and certified expertise for your peace of mind",
      icon: <ShieldCheck className="h-6 w-6 text-amber-500" />
    },
    {
      title: "Prompt Response",
      description: "Quick and reliable service when you need electrical assistance",
      icon: <Clock className="h-6 w-6 text-amber-500" />
    },
    {
      title: "Quality Guaranteed",
      description: "Satisfaction guaranteed on all our electrical work",
      icon: <Award className="h-6 w-6 text-amber-500" />
    },
    {
      title: "Experienced Team",
      description: `${business?.basic_info.name || 'Our company'} brings over 20 years of electrical service excellence`,
      icon: <Users className="h-6 w-6 text-amber-500" />
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-32 bg-white dark:bg-zinc-900 transition-colors duration-200 overflow-hidden"
    >
      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          {/* Image container with animation */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div 
              className="h-[350px] md:h-[600px] bg-cover bg-center rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500 border-8 border-white dark:border-zinc-800 relative"
              style={{ 
                backgroundImage: 'url(https://assets.cdn.filesafe.space/A9rd4HdLD0sTvRuuQFZl/media/651467e9c9753e1824a62ef8.jpeg)',
                backgroundPosition: 'center 20%'
              }}
            >
              {/* Overlay with company name for mobile */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-2xl md:hidden">
                <div className="text-white text-lg font-bold">{business?.basic_info.name || 'Professional Electricians'}</div>
              </div>
            </div>
          </div>

          {/* Text content with animations */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="inline-block bg-amber-500/10 border border-amber-500/30 px-4 py-1 rounded-md text-amber-700 dark:text-amber-300 text-sm font-medium mb-4">
              ABOUT US
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-zinc-900 dark:text-white leading-tight">
              About {business?.basic_info.name || 'Our Company'}
              {business?.basic_info.city && ` in ${business.basic_info.city}`}
            </h2>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 mb-8 md:mb-12 leading-relaxed">
              <span className="font-semibold">{business?.basic_info.name || 'Our company'}</span> brings over two decades of experience in electrical services 
              {business?.basic_info.city ? ` to ${business.basic_info.city} and surrounding areas` : ' to your community'}. 
              Our team of licensed professionals is dedicated to delivering exceptional quality workmanship and outstanding customer service. 
              We take pride in our attention to detail and commitment to safety.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-zinc-800 p-6 md:p-8 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg md:text-xl mb-2 text-zinc-900 dark:text-white">{feature.title}</h3>
                      <p className="text-zinc-600 dark:text-zinc-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}