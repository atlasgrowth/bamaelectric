import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Reviews } from "@/components/Reviews";
import { useQuery } from "@tanstack/react-query";
import { getBusinessData } from "@/lib/utils";
import { Check, Phone, Zap, Shield, Clock, Award, Lightbulb, Home, ActivitySquare } from "lucide-react";

export default function Residential() {
  const { data: business } = useQuery({
    queryKey: ['business'],
    queryFn: getBusinessData,
    retry: false
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    // Animation for services list - stagger the appearance
    const timer = setTimeout(() => {
      const intervalId = setInterval(() => {
        setVisibleItems(prev => {
          if (prev.length < servicesList.length) {
            return [...prev, prev.length];
          } else {
            clearInterval(intervalId);
            return prev;
          }
        });
      }, 200);

      return () => clearInterval(intervalId);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    alert("Thank you for your message. We'll get back to you soon!");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const servicesList = [
    {
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      title: "Electrical Repairs & Maintenance",
      description: "Fixing outlets, switches, circuit breakers, and troubleshooting electrical issues",
      animation: "animate-pulse"
    },
    {
      icon: <Shield className="h-6 w-6 text-yellow-500" />,
      title: "Panel Upgrades & Replacements",
      description: "Upgrading your electrical panel to safely handle modern power demands",
      animation: "animate-bounce"
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
      title: "Lighting Installation & Design",
      description: "Interior and exterior lighting solutions including recessed, accent, and security lighting",
      animation: "animate-pulse"
    },
    {
      icon: <ActivitySquare className="h-6 w-6 text-yellow-500" />,
      title: "Home Safety Inspections",
      description: "Comprehensive electrical safety inspections to identify potential hazards",
      animation: "animate-bounce"
    },
    {
      icon: <Home className="h-6 w-6 text-yellow-500" />,
      title: "Smart Home Wiring & Installation",
      description: "Installation and setup of smart home devices and systems",
      animation: "animate-pulse"
    },
    {
      icon: <Clock className="h-6 w-6 text-yellow-500" />,
      title: "Electrical System Upgrades",
      description: "Updating outdated wiring, outlets, and fixtures to meet modern standards",
      animation: "animate-bounce"
    }
  ];

  const residentialFeatures = [
    {
      icon: <Zap className="h-12 w-12 text-yellow-500" />,
      title: "Electrical Repairs",
      description: "Fast, reliable repairs for all your home electrical issues from minor fixes to complex troubleshooting."
    },
    {
      icon: <Shield className="h-12 w-12 text-yellow-500" />,
      title: "Panel Upgrades",
      description: "Upgrade your electrical panel to safely handle modern power demands with enhanced safety features."
    },
    {
      icon: <Clock className="h-12 w-12 text-yellow-500" />,
      title: "24/7 Emergency Service",
      description: "Round-the-clock electrical emergency services to keep your home safe and powered."
    },
    {
      icon: <Award className="h-12 w-12 text-yellow-500" />,
      title: "Licensed & Insured",
      description: "All our work is performed by licensed electricians and fully insured for your peace of mind."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative h-[60vh] bg-cover bg-center" 
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=2000)'
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="container relative z-10 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Residential Electrical Services
            </h1>
            <p className="text-xl text-white/90">
              Complete electrical solutions for your home by {business?.basic_info.name}
            </p>
            <div className="mt-8">
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-black/30 backdrop-blur-sm text-white border-white hover:bg-white hover:text-black transition-colors"
                onClick={() => window.location.href = `tel:${business?.basic_info.phone}`}
              >
                <Phone className="mr-2 h-5 w-5" />
                {business?.basic_info.phone || 'Contact Us'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-6">Why Choose Our Residential Services</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            We provide high-quality electrical services for homeowners with a focus on safety, reliability, and customer satisfaction.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {residentialFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-4 transition-transform duration-700 hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4">Comprehensive Residential Electrical Services</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-16">
            From routine maintenance to complex installations, our team of certified electricians provides a full range of services to meet all your residential electrical needs.
          </p>

          {/* Animated Services List */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {servicesList.map((service, index) => (
              <div 
                key={index}
                className={`transform transition-all duration-700 ${
                  visibleItems.includes(index) 
                    ? 'translate-x-0 opacity-100' 
                    : 'translate-x-96 opacity-0'
                }`}
              >
                <div className="flex bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all">
                  <div className={`mr-4 p-3 rounded-full bg-yellow-100 ${service.animation}`}>
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Service Diagram */}
          <div className="mt-24 bg-gray-50 p-8 rounded-xl relative">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-8 py-3 rounded-full font-bold">
              Our Service Process
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-all duration-500 hover:scale-105">
                <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-yellow-100 mb-4">
                  <span className="text-2xl font-bold text-yellow-500">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Consultation</h3>
                <p className="text-gray-600">We assess your electrical needs and provide a detailed estimate</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-all duration-500 hover:scale-105">
                <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-yellow-100 mb-4">
                  <span className="text-2xl font-bold text-yellow-500">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Professional Service</h3>
                <p className="text-gray-600">Our licensed electricians complete the work efficiently and safely</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-all duration-500 hover:scale-105">
                <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-yellow-100 mb-4">
                  <span className="text-2xl font-bold text-yellow-500">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Satisfaction Guarantee</h3>
                <p className="text-gray-600">We ensure your complete satisfaction with our workmanship</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
              <p className="text-gray-600 mb-8">
                Get in touch to discuss your residential electrical needs. Our team is ready to provide expert solutions.
              </p>

              <div className="flex items-center gap-4 mb-6">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <h3 className="font-bold">Call Us Directly</h3>
                  <p className="text-gray-600">{business?.basic_info.phone || 'Loading...'}</p>
                </div>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-bold mb-4">Why Choose Our Services?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <span>Licensed and insured professionals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <span>24/7 emergency service available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <span>Transparent pricing with no hidden fees</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <span>Satisfaction guaranteed on all services</span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <Form onSubmit={handleSubmit}>
                <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-6">Request a Free Quote</h2>
                  <div>
                    <label className="block text-sm font-medium mb-1">Your Name</label>
                    <Input 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      placeholder="Your Name" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Input 
                      name="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      placeholder="Email" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <Input 
                      name="phone" 
                      type="tel" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      placeholder="Phone" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Message</label>
                    <Textarea 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      placeholder="How can we help you?" 
                      rows={4} 
                      required 
                    />
                  </div>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
                  >
                    Send Message
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <Reviews />
    </div>
  );
}