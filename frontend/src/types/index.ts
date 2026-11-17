export type PropertyType = 'pg' | 'flat';
export type FurnishedStatus = 'Fully Furnished' | 'Semi-Furnished' | 'Unfurnished';
export type GenderPreference = 'Boys' | 'Girls' | 'Unisex';
export type OrderStatus = 'new' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
export type InquiryStatus = 'pending' | 'contacted' | 'resolved';

export interface Property {
  id: string;
  title: string;
  slug: string;
  type: PropertyType;
  city: string;
  area: string;
  rent: number;
  deposit: number;
  bhk: string; // e.g. "Single Room", "2 Sharing", "3 Sharing", "1 BHK", "2 BHK", "3 BHK"
  furnished: FurnishedStatus;
  gender?: GenderPreference;
  amenities: string[];
  ownerId: string;
  ownerName: string;
  ownerPhone: string;
  isVerified: boolean;
  images: string[];
  rating: number;
  reviewsCount: number;
  description: string;
  foodIncluded?: boolean;
  noticePeriod?: string;
  featured?: boolean;
  availableBeds?: number;
  createdAt: string;
}

export interface Inquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  tenantName: string;
  tenantEmail: string;
  tenantPhone: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
}

export interface BookingOrder {
  id: string;
  orderNumber: string; // ORD-XXXXX
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  propertyArea: string;
  propertyCity: string;
  propertyType: PropertyType;
  tenantName: string;
  tenantEmail: string;
  tenantPhone: string;
  whatsappConsent: boolean;
  date: string; // YYYY-MM-DD
  slot: string; // e.g., "10:00 AM - 12:00 PM"
  rent: number;
  deposit: number;
  tokenAmount: number;
  grandTotal: number;
  orderStatus: OrderStatus;
  paymentMethod: 'Razorpay UPI/Cards' | 'Pay at Visit';
  paymentStatus: 'Paid' | 'Pending';
  notes?: string;
  createdAt: string;
}

export interface NotificationLog {
  id: string;
  type: 'order' | 'booking' | 'inquiry' | 'whatsapp' | 'email';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  target?: string;
}
