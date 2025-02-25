
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

  const [currentReview, setCurrentReview] = useState(0);

  const mockReviews = [
    {
      name: "John D.",
      text: "Outstanding service! The team was professional, punctual, and did an excellent job with our electrical installation.",
      rating: 5
    },
    {
      name: "Sarah M.",
      text: "Very impressed with their work ethic and attention to detail. Would definitely recommend to anyone needing electrical work.",
      rating: 5
    },
    {
      name: "Michael R.",
      text: "Fast response time and great communication throughout the entire process. Quality work at a fair price.",
      rating: 5
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % mockReviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      className="py-20 relative"
      style={{
        backgroundImage: 'url(https://assets.cdn.filesafe.space/A9rd4HdLD0sTvRuuQFZl/media/65147cb9c9753e3d02a73bf9.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'scroll',
        backgroundColor: '#1a1a1a'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/95" />
      <div className="container relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">What Our Customers Say</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about our electrical services.
          </p>
          <div className="text-amber-500 text-sm mt-2">* Real customer reviews coming soon</div>
        </div>

        <div className="max-w-2xl mx-auto relative">
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg min-h-[200px]">
            <div className="flex gap-1 mb-3">
              {[...Array(mockReviews[currentReview].rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-gray-100 mb-4 text-lg">"{mockReviews[currentReview].text}"</p>
            <p className="text-gray-300 font-semibold">{mockReviews[currentReview].name}</p>
          </div>
          
          <button 
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-white p-2 hover:text-amber-500"
            onClick={() => setCurrentReview((prev) => (prev - 1 + mockReviews.length) % mockReviews.length)}
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          
          <button 
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-white p-2 hover:text-amber-500"
            onClick={() => setCurrentReview((prev) => (prev + 1) % mockReviews.length)}
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {mockReviews.map((_, idx) => (
            <button
              key={idx}
              className={`w-2 h-2 rounded-full transition-all ${currentReview === idx ? 'bg-amber-500 w-4' : 'bg-white/50'}`}
              onClick={() => setCurrentReview(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
