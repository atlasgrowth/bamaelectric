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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-b from-zinc-900 to-amber-900">
        <div className="absolute inset-0 bg-black/50" />
        <div className="container relative h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Expert Residential Electrical Services
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Professional electrical solutions for your home by licensed experts
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
                Get Free Quote
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white/10"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-amber-900 to-zinc-900">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Our Residential Services</h2>
            <p className="text-amber-100">
              Comprehensive electrical services for your home, delivered with expertise and care
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Home className="h-12 w-12 text-amber-500" />,
                title: "Home Wiring",
                description: "Complete electrical wiring solutions for new and existing homes"
              },
              {
                icon: <Lightbulb className="h-12 w-12 text-amber-500" />,
                title: "Lighting Installation",
                description: "Modern lighting solutions for every room in your home"
              },
              {
                icon: <ShieldCheck className="h-12 w-12 text-amber-500" />,
                title: "Safety Inspections",
                description: "Thorough electrical safety inspections and upgrades"
              }
            ].map((service, index) => (
              <div key={index} className="bg-zinc-800/50 p-6 rounded-lg border border-amber-500/20">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-zinc-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="py-20 bg-amber-500">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-black mb-6">Get Your Free Quote</h2>
              <p className="text-black/80 mb-8">
                Contact us today for a free consultation and quote for your electrical needs
              </p>
              <Form className="space-y-4">
                <Input placeholder="Your Name" className="bg-white" />
                <Input placeholder="Email" type="email" className="bg-white" />
                <Input placeholder="Phone" type="tel" className="bg-white" />
                <Textarea placeholder="Message" className="bg-white" />
                <Button className="w-full bg-black text-white hover:bg-zinc-800">
                  Submit Request
                </Button>
              </Form>
            </div>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Why Choose Us?</h3>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-amber-500 mr-2" />
                    <span>Licensed & Insured Professionals</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-amber-500 mr-2" />
                    <span>24/7 Emergency Service</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-amber-500 mr-2" />
                    <span>100% Satisfaction Guaranteed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}