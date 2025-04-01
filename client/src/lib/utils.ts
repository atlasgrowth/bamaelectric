import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { type BusinessData } from "@shared/schema"
import { businessDataSchema } from "@shared/schema"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to safely convert to number
function safeParseFloat(value: any): number | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return !isNaN(parsed) ? parsed : undefined;
  }
  return undefined;
}

interface RawBusinessData {
  name: string;
  phone: string;
  city?: string;
  rating?: string | number;
  latitude?: string | number;
  longitude?: string | number;
  reviews?: string;
  reviews_link?: string;
  s: string;
}

export const getBusinessData = async () => {
  try {
    // Hardcoded data for Robinson Electrical Contractors
    const data: RawBusinessData = {
      name: "Robinson Electrical Contractors LLC",
      phone: "+1 205-597-9462",
      city: "Birmingham",
      rating: "4.7",
      latitude: "33.627996",
      longitude: "-86.6680343",
      reviews: "11",
      reviews_link: "https://search.google.com/local/reviews?placeid=ChIJidqiLzgPiYgR-3IUyeRj8mQ",
      s: "robinsonelectricalcontractorsllc"
    };

    // Transform the data to match our schema
    const normalizedData = {
      basic_info: {
        name: data.name,
        phone: data.phone,
        city: data.city || undefined,
        rating: safeParseFloat(data.rating),
        latitude: safeParseFloat(data.latitude),
        longitude: safeParseFloat(data.longitude),
        working_hours: {},  // Add if available in the future
      },
      five_star_reviews: data.reviews ? [{
        text: data.reviews_link ? "View our reviews on Google" : "Great service and professional work",
        reviewer_name: "Customer Review",
        date: new Date().toISOString(),
      }] : undefined,
    };

    const parsed = businessDataSchema.safeParse(normalizedData);

    if (!parsed.success) {
      console.error('Data validation error:', parsed.error);
      throw new Error('Invalid business data format');
    }

    return parsed.data;
  } catch (error) {
    console.error('Error fetching business data:', error);
    throw error;
  }
}
export const scrollToTop = () => {
  try {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  } catch (error) {
    // Fallback in case smooth scrolling fails
    window.scrollTo(0, 0);
    console.error('Error during scroll:', error);
  }
};
