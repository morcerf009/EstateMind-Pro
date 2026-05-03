import React from 'react';
import { MapPin, DollarSign, Home, SlidersHorizontal, Sparkles } from 'lucide-react';
import { FilterState } from '../types';
import { LOCATIONS, TYPES } from '../data';

interface FilterSectionProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({ filters, setFilters }) => {
  return (
    <div className="p-8 flex flex-col gap-10 h-full">
      <div>
        <h2 className="text-xs font-black text-slate-500 mb-8 flex items-center gap-2 uppercase tracking-[0.2em]">
          <SlidersHorizontal className="w-4 h-4 text-brand-400" />
          Refine Assets
        </h2>
        
        <div className="space-y-10">
          {/* Location */}
          <div className="space-y-4">
            <label className="label-pro">
              Primary Location
            </label>
            <div className="relative group">
              <select
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="pro-select appearance-none cursor-pointer pl-10"
              >
                <option value="All">Global Selection</option>
                {LOCATIONS.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-brand-400 transition-colors" />
            </div>
          </div>

          {/* Budget */}
          <div className="space-y-4">
            <label className="label-pro">
              Capital Allocation
            </label>
            <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-widest">
              <span>$100k</span>
              <span>$1.5M</span>
            </div>
            <input 
              type="range" 
              min="100000"
              max="1500000"
              step="50000"
              value={filters.budget}
              onChange={(e) => setFilters({ ...filters, budget: Number(e.target.value) })}
              className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-brand-500 mb-4"
            />
            <div className="p-4 rounded-xl glass-dark border border-brand-500/20 text-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Max Budget</span>
              <span className="text-xl font-black text-brand-400 tracking-tight">
                ${filters.budget.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Property Type */}
          <div className="space-y-4">
            <label className="label-pro">
              Asset Category
            </label>
            <div className="grid grid-cols-1 gap-2">
              <button 
                onClick={() => setFilters({ ...filters, type: 'All' })}
                className={`text-left px-4 py-3 text-xs rounded-xl transition-all font-bold uppercase tracking-widest border ${
                  filters.type === 'All' 
                  ? 'bg-brand-600/10 border-brand-500/50 text-brand-400 shadow-lg shadow-brand-500/5' 
                  : 'bg-white/5 border-white/5 text-slate-500 hover:bg-white/10'
                }`}
              >
                All Portfolios
              </button>
              {TYPES.map(type => (
                <button 
                  key={type}
                  onClick={() => setFilters({ ...filters, type: type })}
                  className={`text-left px-4 py-3 text-xs rounded-xl transition-all font-bold uppercase tracking-widest border ${
                    filters.type === type 
                    ? 'bg-brand-600/10 border-brand-500/50 text-brand-400 shadow-lg shadow-brand-500/5' 
                    : 'bg-white/5 border-white/5 text-slate-500 hover:bg-white/10'
                  }`}
                >
                  {type}s
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <div className="p-5 glass-dark rounded-2xl border border-brand-500/10 text-[10px] text-slate-500 font-medium leading-relaxed flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-brand-400 shrink-0" />
          <span>Our AI is optimizing recommendations based on your serious buyer intent and market fluctuations.</span>
        </div>
      </div>
    </div>
  );
};
