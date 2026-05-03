import { Property } from './types';

export const PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Skyline Penthouse',
    location: 'Downtown',
    price: 850000,
    type: 'Apartment',
    description: 'Breathtaking city views with high-end finishes and a private terrace.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    beds: 3,
    baths: 2,
    sqft: 1800
  },
  {
    id: '2',
    title: 'Serene Meadow Villa',
    location: 'Suburbs',
    price: 450000,
    type: 'House',
    description: 'Spacious family home with a large garden and modern kitchen.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800',
    beds: 4,
    baths: 3,
    sqft: 2500
  },
  {
    id: '3',
    title: 'Riverside Plot',
    location: 'Westside',
    price: 120000,
    type: 'Plot',
    description: 'Perfect spot for building your dream home right by the river.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
    sqft: 5000
  },
  {
    id: '4',
    title: 'Compact Studio Loft',
    location: 'Downtown',
    price: 150000,
    type: 'Apartment',
    description: 'Modern studio ideal for young professionals in the heart of the city.',
    image: 'https://images.unsplash.com/photo-1536376074432-8442658296a6?auto=format&fit=crop&q=80&w=800',
    beds: 1,
    baths: 1,
    sqft: 550
  },
  {
    id: '5',
    title: 'Hillside Manor',
    location: 'North Hills',
    price: 1200000,
    type: 'House',
    description: 'Exclusive estate with luxury amenities and panoramic mountain views.',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800',
    beds: 6,
    baths: 5,
    sqft: 5200
  },
  {
    id: '6',
    title: 'Oakwood Bungalow',
    location: 'Suburbs',
    price: 320000,
    type: 'House',
    description: 'Charming vintage bungalow with modern updates and cozy interiors.',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800',
    beds: 3,
    baths: 2,
    sqft: 1400
  },
  {
    id: '7',
    title: 'Coastal View Land',
    location: 'East Shore',
    price: 500000,
    type: 'Plot',
    description: 'Prime coastal land ready for development with beach access.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800',
    sqft: 10000
  },
  {
    id: '8',
    title: 'Tech Park Apartment',
    location: 'Westside',
    price: 280000,
    type: 'Apartment',
    description: 'Streamlined living close to the major technology hubs.',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800',
    beds: 2,
    baths: 2,
    sqft: 1100
  }
];

export const LOCATIONS = Array.from(new Set(PROPERTIES.map(p => p.location)));
export const TYPES: (Property['type'])[] = ['House', 'Apartment', 'Plot'];
