import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { getBusinessData } from "@/lib/utils";
import { 
  Factory, 
  Power, 
  AlertCircle, 
  Bolt, 
  Shield, 
  Cpu, 
  Gauge, 
  Wrench, 
  Cable, 
  Phone,
  Check,
  Clock,
  CheckCircle,
  Building2
} from "lucide-react";

export default function Industrial() {
  const { data: business } = useQuery({
    queryKey: ['business'],
    queryFn: getBusinessData,
    retry: false
  });

  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    facilityType: "",
    message: ""
  });

  const [visibleSections, setVisibleSections] = useState({
    services: false,
    benefits: false,
    expertise: false
  });

  const servicesRef = useRef(null);
  const benefitsRef = useRef(null);
  const expertiseRef = useRef(null);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your inquiry. Our industrial team will contact you shortly!");
    setFormData({
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      facilityType: "",
      message: ""
    });
  };

  // Intersection observer setup
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
          } else if (entry.target === benefitsRef.current) {
            setVisibleSections(prev => ({ ...prev, benefits: true }));
          } else if (entry.target === expertiseRef.current) {
            setVisibleSections(prev => ({ ...prev, expertise: true }));
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (servicesRef.current) observer.observe(servicesRef.current);
    if (benefitsRef.current) observer.observe(benefitsRef.current);
    if (expertiseRef.current) observer.observe(expertiseRef.current);

    return () => {
      if (servicesRef.current) observer.unobserve(servicesRef.current);
      if (benefitsRef.current) observer.unobserve(benefitsRef.current);
      if (expertiseRef.current) observer.unobserve(expertiseRef.current);
    };
  }, []);

  // Industrial services
  const industrialServices = [
    {
      icon: <Power className="h-10 w-10 text-orange-500" />,
      title: "Power Distribution",
      description: "Complete design and installation of industrial power distribution systems, including transformers, switchgear, and distribution panels.",
      details: [
        "3-phase power systems",
        "Substation maintenance",
        "Load balancing and calculations",
        "Power factor correction"
      ]
    },
    {
      icon: <Bolt className="h-10 w-10 text-orange-500" />,
      title: "Industrial Machinery Wiring",
      description: "Expert wiring and installation for manufacturing equipment, production lines, and heavy machinery to ensure optimal performance.",
      details: [
        "Machine control wiring",
        "Motor and drive systems",
        "Equipment relocations",
        "Industrial retrofits"
      ]
    },
    {
      icon: <Cpu className="h-10 w-10 text-orange-500" />,
      title: "Control Systems",
      description: "Installation and maintenance of advanced control systems, including PLCs, HMIs, and SCADA systems for automated industrial processes.",
      details: [
        "PLC programming and installation",
        "SCADA system integration",
        "Control panel design",
        "Process automation solutions"
      ]
    },
    {
      icon: <Shield className="h-10 w-10 text-orange-500" />,
      title: "Hazardous Location Services",
      description: "Specialized electrical installations for hazardous environments (Class I, II, III locations) in accordance with NEC standards.",
      details: [
        "Explosion-proof installations",
        "Intrinsically safe systems",
        "Chemical plant wiring",
        "Hazardous area classifications"
      ]
    }
  ];

  // Benefits
  const benefits = [
    {
      title: "Minimize Downtime",
      description: "Our industrial-grade solutions are designed for reliability and durability, minimizing production interruptions.",
      icon: <Clock className="h-8 w-8 text-orange-500" />
    },
    {
      title: "Safety Compliance",
      description: "We ensure all electrical work meets or exceeds OSHA, NEC, and industry-specific safety standards.",
      icon: <Shield className="h-8 w-8 text-orange-500" />
    },
    {
      title: "Energy Efficiency",
      description: "Our solutions help reduce energy consumption while maintaining optimal performance for your industrial operations.",
      icon: <Gauge className="h-8 w-8 text-orange-500" />
    },
    {
      title: "24/7 Emergency Support",
      description: "Round-the-clock emergency service for critical industrial electrical failures.",
      icon: <AlertCircle className="h-8 w-8 text-orange-500" />
    }
  ];

  // Expertise areas
  const expertiseAreas = [
    "Manufacturing Facilities",
    "Food Processing Plants",
    "Warehouses & Distribution Centers",
    "Water Treatment Facilities",
    "Oil & Gas Operations",
    "Mining Operations",
    "Chemical Processing Plants",
    "Data Centers"
  ];

  return (
    <div className="bg-zinc-900 text-zinc-100">
      {/* Hero Section */}
      <section 
        className="relative min-h-[80vh] bg-cover bg-center flex items-center" 
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1581094488379-26df9ff34520?auto=format&fit=crop&q=80&w=2000)',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/95 via-zinc-900/80 to-zinc-900/90" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block bg-orange-600 text-white px-4 py-1 rounded-md text-sm font-medium mb-4">
              INDUSTRIAL ELECTRICAL SERVICES
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Heavy-Duty Electrical Solutions
            </h1>
            <p className="text-xl text-zinc-300 mb-8">
              Industrial-grade electrical solutions by {business?.basic_info.name || 'our specialized team'} 
              {business?.basic_info.city ? ` in ${business.basic_info.city}` : ''} for manufacturing, processing, and industrial facilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-orange-600 hover:bg-orange-700 text-white border-none"
                onClick={() => window.location.href = `tel:${business?.basic_info.phone}`}
              >
                <Phone className="mr-2 h-5 w-5" />
                {business?.basic_info.phone || 'Contact Industrial Division'}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-zinc-900"
                onClick={() => {
                  const contactSection = document.getElementById('industrial-contact');
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Request Site Assessment
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Industrial Services Section */}
      <section 
        ref={servicesRef} 
        className="py-20 bg-gradient-to-b from-zinc-900 to-zinc-800"
      >
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Industrial-Strength Electrical Services</h2>
            <p className="text-zinc-300">
              Our specialized industrial electrical services are designed for the unique demands and challenges of manufacturing, processing, and heavy industrial environments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {industrialServices.map((service, index) => (
              <div 
                key={index}
                className={`bg-zinc-800 rounded-lg overflow-hidden transition-all duration-1000 border border-zinc-700 ${
                  visibleSections.services 
                    ? 'translate-y-0 opacity-100' 
                    : index % 2 === 0 ? 'translate-y-20 opacity-0' : '-translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-zinc-700 p-3 rounded-lg">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                      <p className="text-zinc-300 mb-6">{service.description}</p>
                    </div>
                  </div>

                  <div className="mt-6 pl-16">
                    <h4 className="text-lg font-bold text-white mb-3">Included Services:</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {service.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                          <span className="text-zinc-300">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* Image section below service description */}
                <div 
                  className="h-48 bg-cover bg-center relative"
                  style={{
                    backgroundImage: index === 0 
                      ? 'url(https://images.unsplash.com/photo-1581094288379-26df9ff34520?auto=format&fit=crop&q=80&w=1200)' 
                      : index === 1
                        ? 'url(https://images.unsplash.com/photo-1616696038562-574c095f1019?auto=format&fit=crop&q=80&w=1200)'
                        : index === 2
                          ? 'url(https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&q=80&w=1200)'
                          : 'url(https://images.unsplash.com/photo-1542621323-be453184db76?auto=format&fit=crop&q=80&w=1200)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section 
        ref={benefitsRef}
        className="py-20 bg-zinc-800"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1581094794329-c8112a89f47f?auto=format&fit=crop&q=80&w=2000&blur=10)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(39, 39, 42, 0.92)'
        }}
      >
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Why Choose Our Industrial Services</h2>
            <p className="text-zinc-300">
              We understand the critical nature of electrical systems in industrial settings and provide solutions designed for reliability, efficiency, and safety.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className={`bg-zinc-900/80 backdrop-blur-sm p-8 rounded-lg border border-zinc-700 shadow-lg transition-all duration-700 ${
                  visibleSections.benefits 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-16 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-zinc-300">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Client Success Story */}
          <div className={`mt-16 bg-zinc-900/70 backdrop-blur-sm p-8 rounded-lg border border-zinc-700 transition-all duration-1000 ${
            visibleSections.benefits 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-16 opacity-0'
          }`} style={{ transitionDelay: '400ms' }}>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3">
                <div className="relative rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1586528116493-a029325540b6?auto=format&fit=crop&q=80&w=800" 
                    alt="Industrial facility" 
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/60 to-transparent"></div>
                </div>
              </div>
              <div className="md:w-2/3">
                <div className="inline-block bg-orange-600/20 border border-orange-600/50 text-orange-300 px-3 py-1 rounded-md text-sm font-medium mb-2">
                  SUCCESS STORY
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Midwest Manufacturing Plant Upgrade</h3>
                <p className="text-zinc-300 mb-4">
                  We completed a comprehensive electrical system overhaul for a 120,000 sq ft manufacturing facility, upgrading from outdated systems to modern, energy-efficient solutions while maintaining continuous operations.
                </p>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-zinc-800/70 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-orange-500">40%</div>
                    <div className="text-sm text-zinc-400">Energy Savings</div>
                  </div>
                  <div className="bg-zinc-800/70 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-orange-500">0</div>
                    <div className="text-sm text-zinc-400">Production Downtime</div>
                  </div>
                  <div className="bg-zinc-800/70 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-orange-500">3x</div>
                    <div className="text-sm text-zinc-400">Capacity Increase</div>
                  </div>
                </div>
                <div className="text-zinc-300">
                  <span className="font-bold text-white">Client:</span> Major Midwest Manufacturing Company
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section 
        ref={expertiseRef}
        className="py-20 bg-gradient-to-t from-zinc-900 to-zinc-800"
      >
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ${
              visibleSections.expertise 
                ? 'translate-x-0 opacity-100' 
                : '-translate-x-20 opacity-0'
            }`}>
              <h2 className="text-4xl font-bold mb-6 text-white">Our Industrial Expertise</h2>
              <p className="text-zinc-300 mb-8">
                With decades of combined experience in industrial electrical systems, our team brings specialized knowledge to every project. We understand the unique challenges and requirements of various industrial environments.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {expertiseAreas.map((area, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-orange-500 shrink-0" />
                    <span className="text-zinc-200">{area}</span>
                  </div>
                ))}
              </div>

              <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-600/20 p-2 rounded-full">
                    <Shield className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Safety-First Approach</h3>
                    <p className="text-zinc-300">
                      Our industrial electricians are trained in specialized safety protocols and compliance requirements for high-risk industrial environments. All work follows strict OSHA, NEC, and industry-specific guidelines.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`grid grid-cols-2 gap-4 transition-all duration-1000 ${
              visibleSections.expertise 
                ? 'translate-x-0 opacity-100' 
                : 'translate-x-20 opacity-0'
            }`} style={{ transitionDelay: '200ms' }}>
              <div className="aspect-square bg-zinc-800 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581093458791-9f3c3fbe8c54?auto=format&fit=crop&q=80&w=600" 
                  alt="Industrial electrical panel" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square bg-zinc-800 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1623976396214-cdcf7a58ff63?auto=format&fit=crop&q=80&w=600" 
                  alt="Factory electrical installation" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-2 aspect-video bg-zinc-800 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=1200" 
                  alt="Industrial facility" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-zinc-800">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Our Industrial Project Process</h2>
            <p className="text-zinc-300">
              We follow a comprehensive methodology for all industrial electrical projects to ensure quality, safety, and efficiency.
            </p>
          </div>

          <div className="relative">
            {/* Process Timeline - Desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1.5 bg-zinc-700 -translate-y-1/2 rounded-full">
              <div className="absolute top-0 left-0 h-full w-0 bg-orange-500 rounded-full transition-all duration-1000" style={{ width: visibleSections.expertise ? '100%' : '0%' }}></div>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="relative">
                <div className={`bg-orange-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 z-10 relative transition-all duration-700 ${visibleSections.expertise ? 'scale-100' : 'scale-0'}`}>
                  <span className="text-2xl font-bold">1</span>
                </div>
                <div className={`bg-zinc-900 rounded-lg p-6 transition-all duration-700 border border-zinc-700 ${visibleSections.expertise ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                  <h3 className="text-xl font-bold text-white text-center mb-3">Site Assessment</h3>
                  <p className="text-zinc-300 text-center">Comprehensive evaluation of your industrial facility's electrical systems and requirements.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className={`bg-orange-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 z-10 relative transition-all duration-700 ${visibleSections.expertise ? 'scale-100' : 'scale-0'}`} style={{ transitionDelay: '200ms' }}>
                  <span className="text-2xl font-bold">2</span>
                </div>
                <div className={`bg-zinc-900 rounded-lg p-6 transition-all duration-700 border border-zinc-700 ${visibleSections.expertise ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
                  <h3 className="text-xl font-bold text-white text-center mb-3">Engineering & Design</h3>
                  <p className="text-zinc-300 text-center">Detailed electrical system design with load calculations, schematics, and specifications.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className={`bg-orange-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 z-10 relative transition-all duration-700 ${visibleSections.expertise ? 'scale-100' : 'scale-0'}`} style={{ transitionDelay: '400ms' }}>
                  <span className="text-2xl font-bold">3</span>
                </div>
                <div className={`bg-zinc-900 rounded-lg p-6 transition-all duration-700 border border-zinc-700 ${visibleSections.expertise ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
                  <h3 className="text-xl font-bold text-white text-center mb-3">Implementation</h3>
                  <p className="text-zinc-300 text-center">Professional installation with minimal disruption to your industrial operations.</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative">
                <div className={`bg-orange-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 z-10 relative transition-all duration-700 ${visibleSections.expertise ? 'scale-100' : 'scale-0'}`} style={{ transitionDelay: '600ms' }}>
                  <span className="text-2xl font-bold">4</span>
                </div>
                <div className={`bg-zinc-900 rounded-lg p-6 transition-all duration-700 border border-zinc-700 ${visibleSections.expertise ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
                  <h3 className="text-xl font-bold text-white text-center mb-3">Testing & Commissioning</h3>
                  <p className="text-zinc-300 text-center">Rigorous testing and commissioning of all systems to ensure safety and performance.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Process Info */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-700">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-orange-600/20 p-2 rounded-full">
                  <Cable className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-lg font-bold text-white">Certified Installation</h3>
              </div>
              <p className="text-zinc-300">
                All industrial installations are performed by certified electricians with specialized training in industrial systems. We provide detailed documentation and certifications for all completed work.
              </p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-700">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-orange-600/20 p-2 rounded-full">
                  <Cpu className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-lg font-bold text-white">Advanced Technology</h3>
              </div>
              <p className="text-zinc-300">
                We utilize cutting-edge diagnostic equipment and the latest in industrial electrical technology to ensure optimal system performance, efficiency, and longevity.
              </p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-700">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-orange-600/20 p-2 rounded-full">
                  <Wrench className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-lg font-bold text-white">Ongoing Support</h3>
              </div>
              <p className="text-zinc-300">
                After installation, we provide comprehensive maintenance programs, 24/7 emergency support, and detailed system documentation to keep your industrial operations running smoothly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-20 bg-zinc-900">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Industries We Serve</h2>
            <p className="text-zinc-300">
              Our specialized industrial electrical services are tailored to meet the unique requirements of various industrial sectors.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-zinc-800 overflow-hidden rounded-lg group relative">
              <div className="aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600" 
                  alt="Manufacturing" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-bold text-white">Manufacturing</h3>
              </div>
            </div>

            <div className="bg-zinc-800 overflow-hidden rounded-lg group relative">
              <div className="aspect-square">
                <img 
                  src="https://images.unsplash.com/photo-1531256379416-9f000e90aacc?auto=format&fit=crop&q=80&w=600" 
                  alt="Food Processing"