import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Reviews } from "@/components/Reviews";
import { useQuery } from "@tanstack/react-query";
import { getBusinessData } from "@/lib/utils";
import { 
  Phone,
  Check, 
  WrenchIcon,
  PanelLeft,
  Lightbulb,
  BatteryCharging,
  CheckCircle2,
  ArrowRight,
  Shield,
  Zap
} from "lucide-react";

export default function Residential() {
  const { data: business } = useQuery({
    queryKey: ['business'],
    queryFn: getBusinessData,
    retry: false
  });

  // Animation tracking
  const [visibleSections, setVisibleSections] = useState({
    services: false,
    features: false,
    testimonials: false,
    process: false
  });

  // Scroll tracking refs
  const servicesRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const processRef = useRef(null);

  // Services counter animation
  const [counters, setCounters] = useState({
    clients: 0,
    homes: 0,
    years: 0
  });

  // Set up intersection observers
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === servicesRef.current) {
            setVisibleSections(prev => ({ ...prev, services: true }));
          } else if (entry.target === featuresRef.current) {
            setVisibleSections(prev => ({ ...prev, features: true }));
            // Start counter animation when features section becomes visible
            animateCounters();
          } else if (entry.target === testimonialsRef.current) {
            setVisibleSections(prev => ({ ...prev, testimonials: true }));
          } else if (entry.target === processRef.current) {
            setVisibleSections(prev => ({ ...prev, process: true }));
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    if (servicesRef.current) observer.observe(servicesRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (testimonialsRef.current) observer.observe(testimonialsRef.current);
    if (processRef.current) observer.observe(processRef.current);

    return () => {
      if (servicesRef.current) observer.unobserve(servicesRef.current);
      if (featuresRef.current) observer.unobserve(featuresRef.current);
      if (testimonialsRef.current) observer.unobserve(testimonialsRef.current);
      if (processRef.current) observer.unobserve(processRef.current);
    };
  }, []);

  // Counter animation function
  const animateCounters = () => {
    const duration = 2000; // ms
    const steps = 60;
    const stepTime = duration / steps;
    const targetValues = {
      clients: 2500,
      homes: 4800,
      years: 25
    };
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setCounters({
        clients: Math.floor((currentStep / steps) * targetValues.clients),
        homes: Math.floor((currentStep / steps) * targetValues.homes),
        years: Math.floor((currentStep / steps) * targetValues.years)
      });
      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, stepTime);
  };

  // Service card data - now with 6 cards total
  const serviceCards = [
    {
      icon: <WrenchIcon className="h-10 w-10 text-amber-500" />,
      title: "Electrical Repairs",
      description: "Quick and reliable repairs for all residential electrical issues, from faulty outlets to circuit breaker problems.",
      details: [
        "Outlet and switch replacements",
        "Circuit breaker repairs",
        "Wiring troubleshooting",
        "Emergency electrical repairs"
      ],
      color: "from-amber-500 to-amber-600"
    },
    {
      icon: <PanelLeft className="h-10 w-10 text-amber-500" />,
      title: "Panel Upgrades",
      description: "Modernize your home's electrical panel to safely handle today's power demands with our professional panel upgrades.",
      details: [
        "200A panel installations",
        "Obsolete panel replacements",
        "Service upgrades",
        "Code compliance updates"
      ],
      color: "from-amber-600 to-amber-700"
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-amber-500" />,
      title: "Lighting Solutions",
      description: "Enhance your home with modern, energy-efficient lighting solutions designed for beauty and functionality.",
      details: [
        "LED lighting installations",
        "Recessed lighting",
        "Dimmer switch installations",
        "Outdoor lighting systems"
      ],
      color: "from-amber-700 to-amber-800"
    },
    {
      icon: <BatteryCharging className="h-10 w-10 text-amber-500" />,
      title: "Smart Home Wiring",
      description: "Future-proof your home with advanced wiring solutions for smart home technology and automation systems.",
      details: [
        "Smart device integration",
        "Home automation wiring",
        "Voice control systems",
        "Wireless control installations"
      ],
      color: "from-amber-800 to-amber-900"
    },
    {
      icon: <Shield className="h-10 w-10 text-amber-500" />,
      title: "Safety Inspections",
      description: "Comprehensive electrical safety inspections to identify potential hazards and ensure your home's electrical system is up to code.",
      details: [
        "Full system safety audits",
        "Smoke detector installation",
        "Childproofing solutions",
        "GFCI outlet installation"
      ],
      color: "from-amber-500 to-amber-700"
    },
    {
      icon: <Zap className="h-10 w-10 text-amber-500" />,
      title: "Surge Protection",
      description: "Protect your valuable electronics and appliances with whole-home surge protection systems designed for maximum safety.",
      details: [
        "Whole-home surge protection",
        "Power conditioning systems",
        "Equipment safeguards",
        "Lightning protection"
      ],
      color: "from-amber-600 to-amber-800"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 transition-colors duration-200">
      {/* Hero Section */}
      <section className="relative h-[85vh] sm:h-[90vh] md:h-screen flex items-center bg-black">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://assets.cdn.filesafe.space/jcEKoOF2TKiEyPXqmAdw/media/64fa13d20a2893ce5bd55fe5.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.4
          }}
        />
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <div className="bg-amber-500 text-black px-4 py-1 rounded-md text-sm font-medium inline-block mb-4">
              RESIDENTIAL ELECTRICAL SERVICES
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {business?.basic_info.name || 'Expert'} Residential Services
            </h1>
            <p className="text-zinc-200 mb-8">
              Complete electrical solutions for your home by {business?.basic_info.name || 'our professional team'}
              {business?.basic_info.city ? ` in ${business.basic_info.city}` : ''}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-amber-500 hover:bg-amber-600 text-black"
                onClick={() => window.location.href = `tel:${business?.basic_info.phone}`}
              >
                <Phone className="mr-2 h-5 w-5" />
                Call for Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black"
                onClick={() => window.location.href = `tel:${business?.basic_info.phone}`}
              >
                <Phone className="mr-2 h-5 w-5" />
                {business?.basic_info.phone || 'Call Now'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section 
        ref={servicesRef} 
        className="py-20 bg-zinc-900 dark:bg-black"
      >
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Our Residential Services</h2>
            <p className="text-zinc-300">
              Comprehensive electrical services for homeowners, focusing on safety, quality, and customer satisfaction.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCards.map((service, index) => (
              <div 
                key={index}
                className={`rounded-lg overflow-hidden transition-all duration-1000 bg-white dark:bg-zinc-900 p-6 shadow-lg border border-zinc-200 dark:border-zinc-800 transition-colors duration-200 ${
                  visibleSections.services 
                    ? 'translate-y-0 opacity-100' 
                    : index % 2 === 0 ? 'translate-y-20 opacity-0' : '-translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="">
                  <div className="mb-4">
                    <div className="text-amber-500">{service.icon}</div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-white">{service.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-300 mb-6">{service.description}</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {service.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                        <span className="text-zinc-900 dark:text-zinc-300">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <div className="reviews-section">
        <Reviews />
      </div>

      {/* Call to Action */}
      <section className="py-16 bg-zinc-900 dark:bg-black">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-zinc-300 max-w-2xl mx-auto mb-8">
            Contact us today to schedule your service or request a free estimate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-amber-500 hover:bg-amber-600 text-black"
              onClick={() => window.location.href = `tel:${business?.basic_info.phone}`}
            >
              Get a Free Quote
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-black"
              onClick={() => window.location.href = `tel:${business?.basic_info.phone}`}
            >
              <Phone className="mr-2 h-5 w-5" />
              {business?.basic_info.phone || 'Call Now'}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}