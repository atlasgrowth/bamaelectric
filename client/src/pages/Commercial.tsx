import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getBusinessData } from "@/lib/utils";
import {
  Building2,
  FileText,
  Users,
  Clock,
  ShieldCheck,
  Wrench,
  Zap,
  Lightbulb,
  BarChart4,
  Factory,
  Phone,
  CheckCircle,
  ArrowRight,
  Mail,
  Calendar
} from "lucide-react";

const Commercial = () => {
  const { data: business } = useQuery({
    queryKey: ['business'],
    queryFn: getBusinessData,
    retry: false
  });

  const [activeTab, setActiveTab] = useState(0);
  const [visibleFeatures, setVisibleFeatures] = useState([]);
  const [visibleSections, setVisibleSections] = useState({
    services: false,
    process: false,
    features: false
  });
  const featuresRef = useRef(null);
  const processRef = useRef(null);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const timer = setInterval(() => {
            setVisibleFeatures(prev => {
              if (prev.length < commercialFeatures.length) {
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

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }
    if (processRef.current) {
      observer.observe(processRef.current);
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab(prev => (prev + 1) % serviceCategories.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const serviceCategories = [
    {
      id: "design",
      title: "Design & Planning",
      icon: <FileText className="h-6 w-6" />,
      description: "Professional electrical system design and planning for new construction or renovation projects.",
      features: [
        "Comprehensive electrical system blueprints",
        "Energy efficiency planning",
        "Code compliance review",
        "Budget estimation and planning"
      ]
    },
    {
      id: "installation",
      title: "Installation",
      icon: <Zap className="h-6 w-6" />,
      description: "Expert installation of complete electrical systems for commercial properties of all sizes.",
      features: [
        "Complete wiring and electrical system installation",
        "Lighting systems and controls",
        "Backup power and emergency systems",
        "Fire alarm and security installations"
      ]
    },
    {
      id: "maintenance",
      title: "Maintenance & Repair",
      icon: <Wrench className="h-6 w-6" />,
      description: "Regular maintenance and emergency repair services to keep your business running smoothly.",
      features: [
        "Preventative maintenance programs",
        "24/7 emergency repair services",
        "Electrical system inspections",
        "Troubleshooting and diagnostics"
      ]
    },
    {
      id: "upgrades",
      title: "Upgrades & Retrofits",
      icon: <BarChart4 className="h-6 w-6" />,
      description: "Modernize your commercial electrical systems for better efficiency and performance.",
      features: [
        "Energy-efficient lighting upgrades",
        "Panel and system capacity upgrades",
        "Smart building technology integration",
        "Code compliance updates"
      ]
    },
  ];

  const commercialFeatures = [
    {
      icon: <Building2 className="h-12 w-12 text-amber-500" />,
      title: "Commercial Buildings",
      description: "Comprehensive electrical services for office buildings, retail spaces, and mixed-use developments."
    },
    {
      icon: <Factory className="h-12 w-12 text-amber-500" />,
      title: "Industrial Facilities",
      description: "Specialized electrical solutions for manufacturing plants, warehouses, and industrial complexes."
    },
    {
      icon: <Users className="h-12 w-12 text-amber-500" />,
      title: "Experienced Team",
      description: "Our licensed commercial electricians have extensive experience with projects of all sizes."
    },
    {
      icon: <Clock className="h-12 w-12 text-amber-500" />,
      title: "Minimum Downtime",
      description: "We work efficiently to minimize disruption to your business operations."
    },
    {
      icon: <ShieldCheck className="h-12 w-12 text-amber-500" />,
      title: "Code Compliant",
      description: "All work meets or exceeds local and national electrical codes and regulations."
    },
    {
      icon: <Lightbulb className="h-12 w-12 text-amber-500" />,
      title: "Energy Efficiency",
      description: "Solutions designed to reduce energy consumption and lower utility costs."
    }
  ];

  const clients = [
    { name: "ABC Corporation", logo: "https://via.placeholder.com/150" },
    { name: "XYZ Industries", logo: "https://via.placeholder.com/150" },
    { name: "Metro Development", logo: "https://via.placeholder.com/150" },
    { name: "City Hospital", logo: "https://via.placeholder.com/150" },
    { name: "Tech Solutions", logo: "https://via.placeholder.com/150" }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-200">
      <section className="relative h-[85vh] sm:h-[90vh] md:h-screen flex items-center bg-black">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://assets.cdn.filesafe.space/A9rd4HdLD0sTvRuuQFZl/media/65146ad76f44431d743d2eae.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.6
          }}
        />
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <div className="inline-block bg-amber-500 text-black px-4 py-1 rounded-md text-sm font-medium mb-4">
              COMMERCIAL SERVICES
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {business?.basic_info.name || 'Professional'} Commercial Services
            </h1>
            <p className="text-zinc-200 mb-8">
              Powering businesses with professional electrical solutions by {business?.basic_info.name || 'our expert team'}
              {business?.basic_info.city ? ` in ${business.basic_info.city}` : ''}
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
                Request Quote
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

      <section className="py-20 bg-white dark:bg-black">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block bg-black dark:bg-white border border-amber-500 px-4 py-1 rounded-md text-sm font-medium text-white dark:text-black mb-4">
              TECHNICAL EXPERTISE
            </div>
            <h2 className="text-4xl font-bold mb-4 text-black dark:text-white">Our Commercial Specialties</h2>
            <p className="text-zinc-600 dark:text-zinc-300">
              We bring specialized expertise to every commercial electrical project, ensuring optimal results for your business.
            </p>
          </div>

          <div className="mb-12">
            <div className="flex flex-wrap justify-center border-b border-zinc-200 dark:border-zinc-800">
              {serviceCategories.map((category, index) => (
                <button
                  key={category.id}
                  className={`px-6 py-4 text-lg font-medium transition-colors relative ${
                    activeTab === index
                      ? 'text-amber-500'
                      : 'text-zinc-600 dark:text-zinc-300 hover:text-amber-500'
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  <div className="flex items-center gap-2">
                    {category.icon}
                    {category.title}
                  </div>
                  {activeTab === index && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">{serviceCategories[activeTab].title}</h3>
              <p className="text-zinc-600 dark:text-zinc-300 mb-6">{serviceCategories[activeTab].description}</p>
              <ul className="space-y-3">
                {serviceCategories[activeTab].features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-zinc-600 dark:text-zinc-200">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-8 bg-amber-500 hover:bg-amber-600 text-black">
                Learn More About {serviceCategories[activeTab].title}
              </Button>
            </div>
            <div className="order-1 md:order-2 bg-zinc-100 dark:bg-zinc-900 rounded-xl p-8 h-80 flex items-center justify-center">
              <div className="transform transition-all duration-500 scale-90 hover:scale-100">
                {activeTab === 0 && (
                  <div className="flex flex-col items-center text-center">
                    <FileText className="h-24 w-24 text-amber-500 mb-4" />
                    <h4 className="text-xl font-bold text-black dark:text-white">Professional Design</h4>
                    <p className="text-zinc-600 dark:text-zinc-300 mt-2">Tailored electrical system planning for optimal performance</p>
                  </div>
                )}
                {activeTab === 1 && (
                  <div className="flex flex-col items-center text-center">
                    <Zap className="h-24 w-24 text-amber-500 mb-4" />
                    <h4 className="text-xl font-bold text-black dark:text-white">Expert Installation</h4>
                    <p className="text-zinc-600 dark:text-zinc-300 mt-2">Commercial-grade electrical installations done right</p>
                  </div>
                )}
                {activeTab === 2 && (
                  <div className="flex flex-col items-center text-center">
                    <Wrench className="h-24 w-24 text-amber-500 mb-4" />
                    <h4 className="text-xl font-bold text-black dark:text-white">Reliable Maintenance</h4>
                    <p className="text-zinc-600 dark:text-zinc-300 mt-2">Preventative care to avoid costly downtime</p>
                  </div>
                )}
                {activeTab === 3 && (
                  <div className="flex flex-col items-center text-center">
                    <BarChart4 className="h-24 w-24 text-amber-500 mb-4" />
                    <h4 className="text-xl font-bold text-black dark:text-white">System Upgrades</h4>
                    <p className="text-zinc-600 dark:text-zinc-300 mt-2">Modernizing systems for better efficiency and performance</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-zinc-900 to-zinc-800" ref={featuresRef}>
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4 text-zinc-900 dark:text-white">Why Choose Our Commercial Services</h2>
            <p className="text-zinc-600 dark:text-zinc-300">
              Our commercial electrical team delivers exceptional service, quality workmanship, and innovative solutions for businesses of all sizes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {commercialFeatures.map((feature, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-8 shadow-lg transform transition-all duration-700 hover:shadow-xl ${
                  visibleFeatures.includes(index)
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-16 opacity-0'
                }`}
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-white">{feature.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-black">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4 text-black dark:text-white">Our Commercial Project Process</h2>
            <p className="text-zinc-600 dark:text-zinc-300">
              We follow a proven methodology to ensure every commercial project is completed to the highest standards.
            </p>
          </div>

          <div className="relative">
            {/* Process Timeline - Desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 -translate-y-1/2 rounded-full">
              <div className="absolute top-0 left-0 h-full w-0 bg-amber-500 rounded-full transition-all duration-1000" style={{ width: visibleSections.process ? '100%' : '0%' }}></div>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: 1, title: "Consultation", description: "Initial meeting to understand your business needs" },
                { step: 2, title: "Design & Proposal", description: "Comprehensive project planning" },
                { step: 3, title: "Implementation", description: "Professional installation with minimal disruption" },
                { step: 4, title: "Final Inspection", description: "Thorough testing and quality assurance" }
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className="bg-amber-500 text-black w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 z-10 relative">
                    <span className="text-xl font-bold">{item.step}</span>
                  </div>
                  <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 text-center shadow-lg border border-zinc-200 dark:border-zinc-800">
                    <h3 className="text-xl font-bold mb-3 text-black dark:text-white">{item.title}</h3>
                    <p className="text-zinc-600 dark:text-zinc-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact-section" className="py-20 bg-black dark:bg-zinc-950 text-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-white">Get in Touch</h2>
            <p className="text-zinc-300 mb-8">
              Contact our commercial team to discuss your project needs.
            </p>

            <Button 
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-black w-full sm:w-auto text-lg py-6 px-8"
              onClick={() => window.location.href = `tel:${business?.basic_info.phone}`}
            >
              <Phone className="mr-2 h-6 w-6" />
              {business?.basic_info.phone || 'Call Now for a Quote'}
            </Button>

            <div className="mt-12 bg-zinc-900 dark:bg-black border border-zinc-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-white">Why Businesses Choose {business?.basic_info.name || 'Us'}</h3>
              <ul className="space-y-3">
                {[
                  "Dedicated commercial project managers",
                  "Transparent pricing and detailed proposals",
                  "Fully licensed, bonded, and insured",
                  "Energy-efficient solutions that reduce costs"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-zinc-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white dark:bg-black">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-6">Ready to Power Your Business?</h2>
          <p className="text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto mb-8">
            Our commercial team is ready to help with your next electrical project. Contact us today for a consultation.
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
              Get a Commercial Quote
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
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
};

export default Commercial;