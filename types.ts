export interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  timeAgo: string;
  highlight?: boolean;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: 'Prato Feito' | 'Saladas' | 'Bebidas' | 'Porções';
  details?: string;
}

export interface BusinessInfo {
  name: string;
  address: string;
  fullAddress: string;
  phone: string;
  whatsappRaw: string; // for links
  hours: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  mapLink: string;
  openingHours: { label: string; time: string }[];
  holidayNote: string;
}