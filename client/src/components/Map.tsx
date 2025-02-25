import { useQuery } from "@tanstack/react-query";
import { getBusinessData } from "@/lib/utils";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export function Map() {
  const { data: business } = useQuery({
    queryKey: ['business'],
    queryFn: getBusinessData,
    retry: false
  });

  useEffect(() => {
    if (!business?.basic_info.latitude || !business?.basic_info.longitude) return;

    const map = L.map('map').setView([
      business.basic_info.latitude,
      business.basic_info.longitude
    ], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([
      business.basic_info.latitude,
      business.basic_info.longitude
    ]).addTo(map);

    return () => {
      map.remove();
    };
  }, [business]);

  if (!business?.basic_info.latitude || !business?.basic_info.longitude) {
    return null;
  }

  return (
    <section className="py-20 bg-zinc-900 dark:bg-black">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Our Location</h2>
        <div id="map" className="h-[400px] rounded-lg shadow-lg" />
      </div>
    </section>
  );
}