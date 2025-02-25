import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Reviews } from "@/components/Reviews";
import { useQuery } from "@tanstack/react-query";
import { getBusinessData } from "@/lib/utils";
import { 
  Zap, 
  ShieldCheck, 
  Clock, 
  Award, 
  Lightbulb, 
  Home, 
  WrenchIcon, 
  Phone, 
  Check, 
  BatteryCharging, 
  PanelLeft,
  CheckCircle2,
  CircleDot,
  ArrowRight
} from "lucide-react";

export default function Residential() {
  const { data: business } = useQuery({
    queryKey: ['business'],
    queryFn: getBusinessData,
    retry: false
  });

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
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

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message. We'll be in touch shortly!");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

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

  // Service card data
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
    }
  ];

  // Home process steps
  const processSteps = [
    {
      number: "01",
      title: "Initial Consultation",
      description: "We begin with a thorough assessment of your home's electrical needs, discussing your goals and concerns."
    },
    {
      number: "02",
      title: "Detailed Proposal",
      description: "You'll receive a comprehensive, transparent quote outlining all costs, materials, and timeline."
    },
    {
      number: "03",
      title: "Professional Installation",
      description: "Our licensed electricians complete the work with minimal disruption to your home and family."
    },
    {
      number: "04",
      title: "Final Inspection",
      description: "We perform rigorous testing and quality checks to ensure everything meets our high standards."
    }
  ];

  return (
    <div className="bg-zinc-50 text-zinc-900">
      {/* Hero Section */}
      <section 
        className="relative min-h-[90vh] bg-cover bg-center flex items-center overflow-hidden" 
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=2000)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/90 to-amber-900/50" />

        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-amber-500/20 animate-float"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 10}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>

        <div className="container relative z-10">
          <div className="max-w-2xl">
            <div className="bg-amber-500 text-black px-4 py-1 rounded-md text-sm font-medium inline-block mb-4 animate-pulse">
              EXPERT RESIDENTIAL ELECTRICAL SERVICES
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight opacity-0 animate-fadeInUp" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
              Expert Electrical Solutions for Your Home
            </h1>
            <p className="text-xl text-amber-100 mb-8 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
              Complete electrical solutions for your home by {business?.basic_info.name || 'our professional team'}
              {business?.basic_info.city ? ` in ${business.basic_info.city}` : ''}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
              <Button 
                size="lg" 
                className="bg-amber-500 hover:bg-amber-600 text-black border-none"
                onClick={() => {
                  const contactSection = document.getElementById('contact-section');
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get a Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-amber-900 transition-all"
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
        className="py-20 bg-gradient-to-b from-amber-900 to-zinc-900"
      >
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Our Residential Electrical Services</h2>
            <p className="text-amber-100">
              We provide comprehensive electrical services for homeowners, focusing on safety, quality, and customer satisfaction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {serviceCards.map((service, index) => (
              <div 
                key={index}
                className={`rounded-lg overflow-hidden transition-all duration-1000 ${
                  visibleSections.services 
                    ? 'translate-y-0 opacity-100' 
                    : index % 2 === 0 ? 'translate-y-20 opacity-0' : '-translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`bg-gradient-to-r ${service.color} p-8 h-full`}>
                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                      <p className="text-amber-100 mb-6">{service.description}</p>
                    </div>
                  </div>

                  <div className="mt-6 pl-16">
                    <ul className="grid grid-cols-2 gap-2">
                      {service.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-amber-300 shrink-0 mt-0.5" />
                          <span className="text-amber-100">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features/Counter Section */}
      <section 
        ref={featuresRef}
        className="py-20 bg-zinc-900 relative overflow-hidden"
      >
        {/* Background design elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full border border-amber-500"
                style={{
                  width: `${Math.random() * 300 + 200}px`,
                  height: `${Math.random() * 300 + 200}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="container relative z-10">
          {/* Counter Stats */}
          <div className="grid grid-cols-3 gap-8 mb-20">
            <div className={`transition-all duration-1000 ${
              visibleSections.features 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-10 opacity-0'
            }`}>
              <div className="text-center">
                <div className="text-5xl font-bold text-amber-500 mb-2">{counters.clients.toLocaleString()}+</div>
                <p className="text-zinc-400">Satisfied Clients</p>
              </div>
            </div>

            <div className={`transition-all duration-1000 ${
              visibleSections.features 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-10 opacity-0'
            }`} style={{ transitionDelay: '200ms' }}>
              <div className="text-center">
                <div className="text-5xl font-bold text-amber-500 mb-2">{counters.homes.toLocaleString()}+</div>
                <p className="text-zinc-400">Homes Serviced</p>
              </div>
            </div>

            <div className={`transition-all duration-1000 ${
              visibleSections.features 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-10 opacity-0'
            }`} style={{ transitionDelay: '400ms' }}>
              <div className="text-center">
                <div className="text-5xl font-bold text-amber-500 mb-2">{counters.years}+</div>
                <p className="text-zinc-400">Years Experience</p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div 
              className={`bg-zinc-800 p-8 rounded-lg border border-zinc-700 shadow-glow shadow-amber-500/5 transition-all duration-700 hover:shadow-amber-500/20 ${
                visibleSections.features 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="bg-amber-500 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-6">
                <ShieldCheck className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Licensed & Insured</h3>
              <p className="text-zinc-400">
                All our electricians are fully licensed, bonded, and insured for your complete peace of mind.
              </p>
            </div>

            <div 
              className={`bg-zinc-800 p-8 rounded-lg border border-zinc-700 shadow-glow shadow-amber-500/5 transition-all duration-700 hover:shadow-amber-500/20 ${
                visibleSections.features 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="bg-amber-500 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">24/7 Emergency Service</h3>
              <p className="text-zinc-400">
                Electrical emergencies don't wait for business hours. Our team is available around the clock.
              </p>
            </div>

            <div 
              className={`bg-zinc-800 p-8 rounded-lg border border-zinc-700 shadow-glow shadow-amber-500/5 transition-all duration-700 hover:shadow-amber-500/20 ${
                visibleSections.features 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="bg-amber-500 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Quality Guaranteed</h3>
              <p className="text-zinc-400">
                We stand behind our work with industry-leading guarantees on parts and labor.
              </p>
            </div>

            <div 
              className={`bg-zinc-800 p-8 rounded-lg border border-zinc-700 shadow-glow shadow-amber-500/5 transition-all duration-700 hover:shadow-amber-500/20 ${
                visibleSections.features 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <div className="bg-amber-500 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Energy Efficiency</h3>
              <p className="text-zinc-400">
                Our solutions are designed to reduce energy consumption and lower your utility bills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section 
        ref={testimonialsRef} 
        className="py-20 bg-gradient-to-b from-zinc-900 to-zinc-800"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?auto=format&fit=crop&q=80&w=2000&blur=10)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(24, 24, 27, 0.95)'
        }}
      >
        <div className="container">
          <div className="grid md:grid-cols-5 gap-16 items-center">
            <div className="md:col-span-2">
              <div className={`transition-all duration-1000 ${
                visibleSections.testimonials 
                  ? 'translate-x-0 opacity-100' 
                  : '-translate-x-20 opacity-0'
              }`}>
                <div className="inline-block bg-amber-500/20 border border-amber-500/30 text-amber-300 px-4 py-1 rounded-md text-sm font-medium mb-4">
                  CLIENT SUCCESS STORY
                </div>
                <h2 className="text-4xl font-bold mb-6 text-white">What Our Customers Say</h2>
                <div className="mb-6">
                  <div className="flex mb-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <svg key={star} className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                </div>
                <blockquote className="text-xl text-white mb-8 italic">
                  "The team was professional, arrived on time, and completed the panel upgrade efficiently. They explained everything clearly and left our home spotless. Highly recommend!"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="bg-zinc-700 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold">
                    JD
                  </div>
                  <div>
                    <div className="font-bold text-white">Jane Doe</div>
                    <div className="text-zinc-400">Homeowner in Birmingham</div>
                  </div>
                </div>
                <div className="mt-8">
                  <Button 
                    className="bg-amber-500 hover:bg-amber-600 text-black"
                    onClick={() => {
                      const reviewsSection = document.querySelector('.reviews-section');
                      if (reviewsSection) {
                        reviewsSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    Read More Reviews
                  </Button>
                </div>
              </div>
            </div>

            <div className="md:col-span-3">
              <div className={`grid grid-cols-2 gap-6 transition-all duration-1000 ${
                visibleSections.testimonials 
                  ? 'translate-x-0 opacity-100' 
                  : 'translate-x-20 opacity-0'
              }`} style={{ transitionDelay: '300ms' }}>
                <div className="bg-zinc-800/50 backdrop-blur-sm rounded-lg p-6 border border-zinc-700 shadow-lg transform transition-transform hover:scale-105 hover:border-amber-500/30">
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map(star => (
                      <svg key={star} className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <p className="text-zinc-300 mb-4">
                    "Fixed our electrical issue quickly! Very professional and reasonably priced. Already recommended to neighbors."
                  </p>
                  <div className="text-amber-400 font-medium">- Michael R.</div>
                </div>

                <div className="bg-zinc-800/50 backdrop-blur-sm rounded-lg p-6 border border-zinc-700 shadow-lg transform transition-transform hover:scale-105 hover:border-amber-500/30 mt-10">
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map(star => (
                      <svg key={star} className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <p className="text-zinc-300 mb-4">
                    "They installed our ceiling fans and new lighting fixtures. Excellent work, very clean and thorough."
                  </p>
                  <div className="text-amber-400 font-medium">- Sarah L.</div>
                </div>

                <div className="bg-zinc-800/50 backdrop-blur-sm rounded-lg p-6 border border-zinc-700 shadow-lg transform transition-transform hover:scale-105 hover:border-amber-500/30">
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map(star => (
                      <svg key={star} className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <p className="text-zinc-300 mb-4">
                    "Their emergency service saved us during a power outage. Arrived within an hour and fixed everything."
                  </p>
                  <div className="text-amber-400 font-medium">- David T.</div>
                </div>

                <div className="bg-zinc-800/50 backdrop-blur-sm rounded-lg p-6 border border-zinc-700 shadow-lg transform transition-transform hover:scale-105 hover:border-amber-500/30 mt-10">
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map(star => (
                      <svg key={star} className="
                        <div className="flex mb-4">
                                            {[1, 2, 3, 4, 5].map(star => (
                                              <svg key={star} className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                              </svg>
                                            ))}
                                          </div>
                                          <p className="text-zinc-300 mb-4">
                                            "Great job wiring our smart home system. They made sure everything integrated perfectly with our devices."
                                          </p>
                                          <div className="text-amber-400 font-medium">- Jennifer W.</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </section>

                              {/* Process Section */}
                              <section 
                                ref={processRef}
                                className="py-20 bg-zinc-800"
                              >
                                <div className="container">
                                  <div className="text-center max-w-3xl mx-auto mb-16">
                                    <h2 className="text-4xl font-bold mb-4 text-white">Our Service Process</h2>
                                    <p className="text-zinc-300">
                                      A simple, straightforward approach to residential electrical service that ensures quality results every time.
                                    </p>
                                  </div>

                                  <div className="relative">
                                    {/* Process Timeline - Desktop */}
                                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-1.5 bg-zinc-700 -translate-y-1/2 rounded-full">
                                      <div className="absolute top-0 left-0 h-full bg-amber-500 rounded-full transition-all duration-1000" style={{ width: visibleSections.process ? '100%' : '0%' }}></div>
                                    </div>

                                    <div className="grid md:grid-cols-4 gap-8">
                                      {processSteps.map((step, index) => (
                                        <div key={index} className="relative">
                                          <div className={`bg-amber-500 text-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 z-10 relative transition-all duration-700 ${visibleSections.process ? 'scale-100' : 'scale-0'}`} style={{ transitionDelay: `${index * 200}ms` }}>
                                            <span className="text-xl font-bold">{step.number}</span>
                                          </div>
                                          <div className={`bg-zinc-900 rounded-lg p-6 transition-all duration-700 border border-zinc-700 h-full ${visibleSections.process ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: `${index * 200}ms` }}>
                                            <h3 className="text-xl font-bold text-white text-center mb-3">{step.title}</h3>
                                            <p className="text-zinc-300 text-center">{step.description}</p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="mt-16 text-center">
                                    <div className={`transition-all duration-1000 ${
                                      visibleSections.process 
                                        ? 'translate-y-0 opacity-100' 
                                        : 'translate-y-10 opacity-0'
                                    }`} style={{ transitionDelay: '800ms' }}>
                                      <Button 
                                        size="lg" 
                                        className="bg-amber-500 hover:bg-amber-600 text-black"
                                        onClick={() => {
                                          const contactSection = document.getElementById('contact-section');
                                          contactSection.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                      >
                                        Schedule Your Consultation
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </section>

                              {/* Common Home Electrical Issues */}
                              <section className="py-20 bg-zinc-900">
                                <div className="container">
                                  <div className="grid md:grid-cols-2 gap-12 items-center">
                                    <div>
                                      <div className="inline-block bg-amber-500/20 border border-amber-500/30 text-amber-300 px-4 py-1 rounded-md text-sm font-medium mb-4">
                                        HOME ELECTRICAL PROBLEMS
                                      </div>
                                      <h2 className="text-4xl font-bold mb-6 text-white">Common Residential Electrical Issues</h2>
                                      <p className="text-zinc-300 mb-8">
                                        Many homes experience these electrical problems. If you notice any of these signs, it's time to call a professional electrician.
                                      </p>

                                      <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                          <div className="bg-amber-500/20 p-2 rounded-full mt-1">
                                            <CircleDot className="h-5 w-5 text-amber-500" />
                                          </div>
                                          <div>
                                            <h3 className="text-lg font-bold text-white mb-1">Frequent Circuit Breaker Trips</h3>
                                            <p className="text-zinc-400">
                                              If your breakers trip regularly, it could indicate an overloaded circuit, short circuit, or ground fault issue.
                                            </p>
                                          </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                          <div className="bg-amber-500/20 p-2 rounded-full mt-1">
                                            <CircleDot className="h-5 w-5 text-amber-500" />
                                          </div>
                                          <div>
                                            <h3 className="text-lg font-bold text-white mb-1">Flickering or Dimming Lights</h3>
                                            <p className="text-zinc-400">
                                              This common problem can indicate loose wiring, overloaded circuits, or issues with the main service connection.
                                            </p>
                                          </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                          <div className="bg-amber-500/20 p-2 rounded-full mt-1">
                                            <CircleDot className="h-5 w-5 text-amber-500" />
                                          </div>
                                          <div>
                                            <h3 className="text-lg font-bold text-white mb-1">Hot or Buzzing Outlets</h3>
                                            <p className="text-zinc-400">
                                              Outlets that feel warm or make buzzing sounds may have loose connections or wiring issues that create fire hazards.
                                            </p>
                                          </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                          <div className="bg-amber-500/20 p-2 rounded-full mt-1">
                                            <CircleDot className="h-5 w-5 text-amber-500" />
                                          </div>
                                          <div>
                                            <h3 className="text-lg font-bold text-white mb-1">Outdated Electrical Panel</h3>
                                            <p className="text-zinc-400">
                                              Older homes with fuse boxes or panels under 100 amps may not handle modern electrical demands safely.
                                            </p>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="mt-8">
                                        <Button 
                                          className="bg-amber-500 hover:bg-amber-600 text-black"
                                          onClick={() => window.location.href = `tel:${business?.basic_info.phone}`}
                                        >
                                          <Phone className="mr-2 h-5 w-5" />
                                          Call For Emergency Service
                                        </Button>
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                      <div className="bg-zinc-800 rounded-lg overflow-hidden transform transition-transform hover:scale-105">
                                        <div className="aspect-square relative">
                                          <img 
                                            src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=600" 
                                            alt="Electrical panel" 
                                            className="w-full h-full object-cover"
                                          />
                                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60"></div>
                                          <div className="absolute bottom-4 left-4 right-4">
                                            <div className="text-white font-bold">Outdated Panels</div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="bg-zinc-800 rounded-lg overflow-hidden transform transition-transform hover:scale-105 mt-10">
                                        <div className="aspect-square relative">
                                          <img 
                                            src="https://images.unsplash.com/photo-1631646109206-4c33e4522086?auto=format&fit=crop&q=80&w=600" 
                                            alt="Home wiring" 
                                            className="w-full h-full object-cover"
                                          />
                                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60"></div>
                                          <div className="absolute bottom-4 left-4 right-4">
                                            <div className="text-white font-bold">Faulty Wiring</div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="bg-zinc-800 rounded-lg overflow-hidden transform transition-transform hover:scale-105">
                                        <div className="aspect-square relative">
                                          <img 
                                            src="https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=600" 
                                            alt="Light fixture" 
                                            className="w-full h-full object-cover"
                                          />
                                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60"></div>
                                          <div className="absolute bottom-4 left-4 right-4">
                                            <div className="text-white font-bold">Lighting Issues</div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="bg-zinc-800 rounded-lg overflow-hidden transform transition-transform hover:scale-105 mt-10">
                                        <div className="aspect-square relative">
                                          <img 
                                            src="https://images.unsplash.com/photo-1517490232338-06b912a786b5?auto=format&fit=crop&q=80&w=600" 
                                            alt="Circuit breaker" 
                                            className="w-full h-full object-cover"
                                          />
                                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60"></div>
                                          <div className="absolute bottom-4 left-4 right-4">
                                            <div className="text-white font-bold">Circuit Breaker Problems</div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </section>

                              {/* Contact Section */}
                              <section id="contact-section" className="py-20 bg-gradient-to-br from-amber-900 to-zinc-900 text-white">
                                <div className="container">
                                  <div className="grid md:grid-cols-2 gap-12">
                                    <div>
                                      <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
                                      <p className="text-amber-100 mb-8">
                                        Contact us today to schedule a service, request a free estimate, or inquire about any of our residential electrical services.
                                      </p>

                                      <div className="bg-zinc-800/50 backdrop-blur-sm rounded-lg p-6 mb-8">
                                        <h3 className="text-xl font-bold mb-4">Why Choose Our Services?</h3>
                                        <ul className="space-y-3">
                                          <li className="flex items-start gap-3">
                                            <CheckCircle2 className="h-6 w-6 text-amber-500 shrink-0 mt-0.5" />
                                            <span>Expert electricians with years of experience</span>
                                          </li>
                                          <li className="flex items-start gap-3">
                                            <CheckCircle2 className="h-6 w-6 text-amber-500 shrink-0 mt-0.5" />
                                            <span>100% satisfaction guarantee on all services</span>
                                          </li>
                                          <li className="flex items-start gap-3">
                                            <CheckCircle2 className="h-6 w-6 text-amber-500 shrink-0 mt-0.5" />
                                            <span>Transparent pricing with no hidden fees</span>
                                          </li>
                                          <li className="flex items-start gap-3">
                                            <CheckCircle2 className="h-6 w-6 text-amber-500 shrink-0 mt-0.5" />
                                            <span>Fast, reliable service when you need it most</span>
                                          </li>
                                        </ul>
                                      </div>

                                      <div className="flex items-center gap-4">
                                        <Phone className="h-8 w-8 text-amber-500" />
                                        <div>
                                          <h4 className="font-bold text-lg">Call Us Directly</h4>
                                          <p className="text-amber-100">{business?.basic_info.phone || 'Loading...'}</p>
                                        </div>
                                      </div>
                                    </div>

                                    <div>
                                      <Form onSubmit={handleSubmit} className="bg-zinc-800 rounded-lg p-8 shadow-xl border border-zinc-700">
                                        <h3 className="text-2xl font-bold mb-6 text-white">Request a Free Quote</h3>
                                        <div className="space-y-4">
                                          <div>
                                            <label className="block text-sm font-medium mb-1 text-zinc-300">Your Name</label>
                                            <Input 
                                              name="name" 
                                              value={formData.name} 
                                              onChange={handleChange} 
                                              placeholder="Your Name" 
                                              required 
                                              className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400"
                                            />
                                          </div>
                                          <div className="grid grid-cols-2 gap-4">
                                            <div>
                                              <label className="block text-sm font-medium mb-1 text-zinc-300">Email</label>
                                              <Input 
                                                name="email" 
                                                type="email" 
                                                value={formData.email} 
                                                onChange={handleChange} 
                                                placeholder="Email" 
                                                required 
                                                className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400"
                                              />
                                            </div>
                                            <div>
                                              <label className="block text-sm font-medium mb-1 text-zinc-300">Phone</label>
                                              <Input 
                                                name="phone" 
                                                type="tel" 
                                                value={formData.phone} 
                                                onChange={handleChange} 
                                                placeholder="Phone" 
                                                required 
                                                className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400"
                                              />
                                            </div>
                                          </div>
                                          <div>
                                            <label className="block text-sm font-medium mb-1 text-zinc-300">How Can We Help?</label>
                                            <Textarea 
                                              name="message" 
                                              value={formData.message} 
                                              onChange={handleChange} 
                                              placeholder="Describe your electrical needs..." 
                                              rows={4} 
                                              required 
                                              className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400"
                                            />
                                          </div>
                                          <Button 
                                            type="submit" 
                                            size="lg" 
                                            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold"
                                          >
                                            Submit Request
                                          </Button>
                                          <p className="text-xs text-zinc-400 text-center">
                                            We typically respond to inquiries within 24 hours.
                                          </p>
                                        </div>
                                      </Form>
                                    </div>
                                  </div>
                                </div>
                              </section>

                              {/* Reviews Section */}
                              <div className="reviews-section">
                                <Reviews />
                              </div>

                              {/* Call to Action */}
                              <section className="py-16 bg-amber-500">
                                <div className="container text-center">
                                  <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Ready to Get Started?</h2>
                                  <p className="text-black/80 max-w-2xl mx-auto mb-8">
                                    Contact us today to schedule your service or request a free estimate for any of our residential electrical services.
                                  </p>
                                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button 
                                      size="lg" 
                                      className="bg-black hover:bg-zinc-800 text-white"
                                      onClick={() => {
                                        const contactSection = document.getElementById('contact-section');
                                        contactSection.scrollIntoView({ behavior: 'smooth' });
                                      }}
                                    >
                                      Get a Free Quote
                                    </Button>
                                    <Button 
                                      size="lg" 
                                      variant="outline" 
                                      className="border-black text-black hover:bg-black hover:text-amber-500"
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