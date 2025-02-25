import { useQuery } from "@tanstack/react-query";
import { getBusinessData } from "@/lib/utils";
import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  const { data: business } = useQuery({
    queryKey: ['business'],
    queryFn: getBusinessData,
    retry: false
  });

  return (
    <footer className="bg-gray-900 text-white py-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-4">{business?.basic_info.name}</h3>
            <p className="text-gray-400">
              Professional electrical services you can trust.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/residential">
                  <a className="text-gray-400 hover:text-white">Residential</a>
                </Link>
              </li>
              <li>
                <Link href="/commercial">
                  <a className="text-gray-400 hover:text-white">Commercial</a>
                </Link>
              </li>
              <li>
                <Link href="/industrial">
                  <a className="text-gray-400 hover:text-white">Industrial</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="h-4 w-4" />
                {business?.basic_info.phone}
              </li>
              {business?.basic_info.city && (
                <li className="flex items-center gap-2 text-gray-400">
                  <MapPin className="h-4 w-4" />
                  {business.basic_info.city}
                </li>
              )}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Hours</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Mon-Fri: 8am - 6pm</li>
              <li className="text-gray-400">Sat: 9am - 4pm</li>
              <li className="text-gray-400">Sun: Closed</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          © {new Date().getFullYear()} {business?.basic_info.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
