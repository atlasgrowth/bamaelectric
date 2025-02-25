
import { useQuery } from "@tanstack/react-query";
import { getBusinessData } from "@/lib/utils";
import { MapPin } from "lucide-react";

export function ServiceArea() {
  const { data: business } = useQuery({
    queryKey: ['business'],
    queryFn: getBusinessData,
    retry: false
  });

  return (
    <section className="py-20 bg-white dark:bg-zinc-900">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
            {business?.basic_info.name || 'Our'} Service Area
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
            Serving {business?.basic_info.city || 'Bradley'} and surrounding communities for all your electrical needs
          </p>
        </div>
        
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
          <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=${business?.google_maps_api_key || ''}&q=${business?.basic_info.city || 'Bradley,IL'}`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6">
            <div className="flex items-center justify-center text-white">
              <MapPin className="h-5 w-5 mr-2" />
              <span>Based in {business?.basic_info.city || 'Bradley'}, serving all surrounding areas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
