
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getBusinessData } from "@/lib/utils";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export function Reviews() {
  const { data: business } = useQuery({
    queryKey: ['business'],
    queryFn: getBusinessData,
    retry: false
  });

  const realReviews = [
    {
      name: "Anonymous",
      text: "Robinson Electric restored lights and electricity to my living room, just in time for the holidays. I was so impressed by the owner's determination to fix my lights on our initial appointment that I cancelled my appliance install for my oven and had them replace that as well. They were very professional, and I am very pleased with their level of customer service! Will recommend to family and friends.",
      rating: 5,
      date: "a year ago"
    },
    {
      name: "Tyler Sadler",
      text: "Great Customer service. Has supreme patience and problem solving abilities. He was able to fix a issue that multiple electricians couldn't. I'd recommend him for any of your electrical needs.",
      rating: 5,
      date: "a year ago"
    },
    {
      name: "Jennifer Glenn",
      text: "Wonderful service! Highly recommend!",
      rating: 5,
      date: "2 years ago"
    }
  ];

  return (
    <section className="py-20 bg-zinc-900">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">What Our Customers Say</h2>
          <p className="text-gray-300">
            Our commitment to quality service has earned us great reviews from our customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {realReviews.map((review, index) => (
            <div key={index} className="bg-zinc-800 p-6 rounded-lg shadow-lg">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className="h-5 w-5 mr-1" 
                    fill={star <= review.rating ? "#f59e0b" : "none"} 
                    color={star <= review.rating ? "#f59e0b" : "#6b7280"} 
                  />
                ))}
              </div>
              <p className="text-white mb-4 text-sm md:text-base">"{review.text}"</p>
              <div className="flex justify-between items-center">
                <p className="text-amber-500 font-medium">{review.name}</p>
                <p className="text-gray-400 text-sm">{review.date}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button asChild className="bg-amber-500 hover:bg-amber-600 text-black">
            <a 
              href={business?.reviews_link || "https://search.google.com/local/reviews?placeid=ChIJidqiLzgPiYgR-3IUyeRj8mQ"} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              See More Reviews
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
