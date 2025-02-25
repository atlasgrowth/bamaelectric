import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Reviews } from "@/components/Reviews";
import { useQuery } from "@tanstack/react-query";
import { getBusinessData } from "@/lib/utils";

export default function Residential() {
  const { data: business } = useQuery({
    queryKey: ['business'],
    queryFn: getBusinessData,
    retry: false
  });

  return (
    <div>
      <section className="relative h-[60vh] bg-cover bg-center" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=2000)'
      }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="container relative z-10 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Residential Electrical Services
            </h1>
            <p className="text-xl text-white/90">
              Complete electrical solutions for your home by {business?.basic_info.name}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
              <Form>
                <div className="space-y-4">
                  <Input placeholder="Your Name" />
                  <Input placeholder="Email" type="email" />
                  <Input placeholder="Phone" type="tel" />
                  <Textarea placeholder="Message" rows={4} />
                  <Button type="submit" size="lg">Send Message</Button>
                </div>
              </Form>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Services</h2>
              <ul className="space-y-4">
                <li className="flex items-center gap-2">
                  ✓ Electrical Repairs & Maintenance
                </li>
                <li className="flex items-center gap-2">
                  ✓ Panel Upgrades
                </li>
                <li className="flex items-center gap-2">
                  ✓ Lighting Installation
                </li>
                <li className="flex items-center gap-2">
                  ✓ Home Safety Inspections
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Reviews />
    </div>
  );
}
