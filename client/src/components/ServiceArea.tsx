
import { useQuery } from "@tanstack/react-query";
import { getBusinessData } from "@/lib/utils";
import { MapPin } from "lucide-react";

export function ServiceArea() {
  const { data: business } = useQuery({
    queryKey: ['business'],
    queryFn: getBusinessData,
    retry: false
  });

  const serviceAreas = [
    "Birmingham",
    "Hoover",
    "Vestavia Hills",
    "Mountain Brook",
    "Homewood",
    "Trussville",
    "Pelham",
    "Alabaster",
    "Helena",
    "Bessemer"
  ];

  return (
    <section className="py-20 bg-white dark:bg-zinc-900">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
            Our Service Area
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
            Based in {business?.basic_info.city || 'Birmingham'}, serving the greater Birmingham area and surrounding communities
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-zinc-100 dark:bg-zinc-800 p-8 rounded-lg">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
              {serviceAreas.map((area, index) => (
                <div key={index} className="p-3">
                  <div className="flex items-center justify-center mb-2">
                    <MapPin className="h-5 w-5 text-amber-500" />
                  </div>
                  <p className="font-medium text-zinc-900 dark:text-white">{area}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <p className="text-zinc-600 dark:text-zinc-300 text-lg">
                ...and all surrounding areas within a 50-mile radius.
              </p>
              <p className="text-amber-500 mt-4 font-medium">
                Not sure if we service your area? Give us a call!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
