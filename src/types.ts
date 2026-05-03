export type PropertyType = 'House' | 'Apartment' | 'Plot';

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  type: PropertyType;
  description: string;
  image: string;
  beds?: number;
  baths?: number;
  sqft?: number;
}

export interface FilterState {
  budget: number;
  location: string;
  type: PropertyType | 'All';
}

export interface BookingDetails {
  propertyId: string;
  propertyName: string;
  name: string;
  phone: string;
  date: string;
}
