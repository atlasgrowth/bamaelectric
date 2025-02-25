import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 transition-colors duration-200">
      {/* Hero Section */}
      <section 
        className="relative min-h-[90vh] bg-cover bg-center flex items-center overflow-hidden" 
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=2000)'
        }}
      >
        <div className="absolute inset-0 bg-zinc-900/80 dark:bg-black/80" />

        <div className="container relative z-10">
          <div className="max-w-2xl">
            <div className="bg-amber-500 text-black px-4 py-1 rounded-md text-sm font-medium inline-block mb-4">
              RESIDENTIAL ELECTRICAL SERVICES
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Expert Electrical Solutions for Your Home
            </h1>
            <p className="text-zinc-200 mb-8">
              Complete electrical solutions for your home by {business?.basic_info.name || 'our professional team'}
              {business?.basic_info.city ? ` in ${business.basic_info.city}` : ''}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-amber-500 hover:bg-amber-600 text-black"
                onClick={() => {
                  const contactSection = document.getElementById('contact-section');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get a Free Quote
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
                <div className="bg-zinc-800 dark:bg-zinc-900 p-8 h-full border border-zinc-700">
                  <div className="flex items-start gap-4">
                    <div className="bg-zinc-900/50 dark:bg-black/50 p-3 rounded-lg">
                      <div className="text-amber-500">{service.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                      <p className="text-zinc-300 mb-6">{service.description}</p>
                    </div>
                  </div>

                  <div className="mt-6 pl-16">
                    <ul className="grid grid-cols-2 gap-2">
                      {service.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                          <span className="text-zinc-300">{detail}</span>
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

      {/* Contact Section */}
      <section id="contact-section" className="py-20 bg-zinc-900 dark:bg-black text-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
              <p className="text-zinc-300 mb-8">
                Contact us today to schedule a service, request a free estimate, or inquire about any of our residential electrical services.
              </p>

              <div className="bg-zinc-800 dark:bg-zinc-900/50 rounded-lg p-6 mb-8 border border-zinc-700">
                <h3 className="text-xl font-bold mb-4">Why Choose Our Services?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-zinc-300">Expert electricians with years of experience</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-zinc-300">100% satisfaction guarantee on all services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-zinc-300">Transparent pricing with no hidden fees</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-zinc-300">Fast, reliable service when you need it most</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-center gap-4">
                <Phone className="h-8 w-8 text-amber-500" />
                <div>
                  <h4 className="font-bold text-lg">Call Us Directly</h4>
                  <p className="text-zinc-300">{business?.basic_info.phone || 'Loading...'}</p>
                </div>
              </div>
            </div>

            <div>
              <Form onSubmit={handleSubmit} className="bg-zinc-800 dark:bg-zinc-900 rounded-lg p-8 shadow-xl border border-zinc-700">
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
              onClick={() => {
                const contactSection = document.getElementById('contact-section');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
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