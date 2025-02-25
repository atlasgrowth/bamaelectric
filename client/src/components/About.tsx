import { useQuery } from "@tanstack/react-query";
import { getBusinessData } from "@/lib/utils";

export function About() {
  const { data: business } = useQuery({
    queryKey: ['business'],
    queryFn: getBusinessData,
    retry: false
  });

  return (
    <section className="py-32 bg-white dark:bg-zinc-900 transition-colors duration-200">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div 
            className="h-[600px] bg-cover bg-center rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500 border-8 border-white dark:border-zinc-800"
            style={{ 
              backgroundImage: 'url(https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=2000)',
              backgroundPosition: 'center 20%'
            }}
          />
          <div>
            <h2 className="text-5xl font-bold mb-8 text-zinc-900 dark:text-white leading-tight">
              About {business?.basic_info.name}
              {business?.basic_info.city && ` in ${business.basic_info.city}`}
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-300 mb-12 leading-relaxed">
              {business?.basic_info.name} brings over two decades of experience in electrical services. Our team of licensed professionals is dedicated to delivering exceptional quality workmanship and outstanding customer service. We take pride in our attention to detail and commitment to safety.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-zinc-200 dark:border-zinc-700">
                <h3 className="font-bold text-xl mb-3 text-zinc-900 dark:text-white">Licensed & Insured</h3>
                <p className="text-zinc-600 dark:text-zinc-300">
                  Full coverage and certified expertise for your peace of mind
                </p>
              </div>
              <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-zinc-200 dark:border-zinc-700">
                <h3 className="font-bold text-xl mb-3 text-zinc-900 dark:text-white">Prompt Response</h3>
                <p className="text-zinc-600 dark:text-zinc-300">
                  Quick and reliable service when you need electrical assistance
                </p>
              </div>
              <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-zinc-200 dark:border-zinc-700">
                <h3 className="font-bold text-xl mb-3 text-zinc-900 dark:text-white">Quality Guaranteed</h3>
                <p className="text-zinc-600 dark:text-zinc-300">
                  Satisfaction guaranteed on all our electrical work
                </p>
              </div>
              <div className="bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-zinc-200 dark:border-zinc-700">
                <h3 className="font-bold text-xl mb-3 text-zinc-900 dark:text-white">Experienced Team</h3>
                <p className="text-zinc-600 dark:text-zinc-300">
                  Over 20 years of electrical service excellence
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}