import React from 'react';
import { Bed, Bath, Maximize, Calendar, Heart, Share2, Star, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onBook: (property: Property) => void;
  isRecommended?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onBook, isRecommended }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      className="pro-card glass group cursor-pointer h-full flex flex-col"
    >
      <div className="relative h-64 overflow-hidden shrink-0">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
        
        <div className="absolute top-4 left-4 flex gap-2">
          <div className="px-3 py-1 bg-brand-600/90 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/10 shadow-lg">
            {property.type}
          </div>
          {isRecommended && (
            <div className="px-3 py-1 bg-fuchsia-600/90 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/10 shadow-lg flex items-center gap-1">
              <Star className="w-3 h-3 fill-white" /> Agent Pick
            </div>
          )}
        </div>

        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl text-white hover:bg-brand-500 transition-colors">
            <Heart className="w-4 h-4" />
          </button>
          <button className="p-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl text-white hover:bg-brand-500 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        <div className="absolute bottom-4 left-4">
          <p className="text-2xl font-black text-white leading-none">
            ${property.price.toLocaleString()}
          </p>
          <p className="text-slate-300 text-[10px] font-bold uppercase tracking-widest mt-1">
            Market Value Estimate
          </p>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-white group-hover:text-brand-400 transition-colors truncate">
            {property.title}
          </h3>
          <p className="text-slate-500 text-sm font-medium flex items-center gap-1 mt-1">
            <MapPin className="w-3 h-3 text-brand-400" /> {property.location}
          </p>
        </div>

        <div className="flex items-center justify-between py-4 border-y border-white/5 mb-6">
          <div className="flex flex-col items-center gap-1">
            <Bed className="w-4 h-4 text-slate-500" />
            <span className="text-[10px] font-bold text-slate-300">{property.beds || 0} Beds</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Bath className="w-4 h-4 text-slate-500" />
            <span className="text-[10px] font-bold text-slate-300">{property.baths || 0} Baths</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Maximize className="w-4 h-4 text-slate-500" />
            <span className="text-[10px] font-bold text-slate-300">{property.sqft.toLocaleString()} Sqft</span>
          </div>
        </div>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            onBook(property);
          }}
          className="w-full btn-pro-primary group/btn relative overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Schedule Priority Visit
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-fuchsia-600 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
        </button>
      </div>
    </motion.div>
  );
};

