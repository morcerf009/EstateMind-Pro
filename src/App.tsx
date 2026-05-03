import React, { useState, useMemo, useEffect } from 'react';
import { Building2, User, LayoutDashboard, CalendarDays, Headphones, Sparkles, ShieldCheck, Bell, MapPin, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROPERTIES } from './data';
import { FilterState, Property } from './types';
import { FilterSection } from './components/FilterSection';
import { PropertyCard } from './components/PropertyCard';
import { BookingModal } from './components/BookingModal';
import { AgentHeader } from './components/AgentHeader';
import { ChatInterface } from './components/ChatInterface';

export default function App() {
  const [filters, setFilters] = useState<FilterState>({
    budget: 850000,
    location: 'All',
    type: 'All'
  });
  
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);

  const processedData = useMemo(() => {
    let matches = PROPERTIES.filter(p => {
      const budgetMatch = p.price <= filters.budget;
      const locationMatch = filters.location === 'All' || p.location.toLowerCase().includes(filters.location.toLowerCase());
      const typeMatch = filters.type === 'All' || p.type === filters.type;
      return budgetMatch && locationMatch && typeMatch;
    });

    if (matches.length === 0) {
      return {
        results: PROPERTIES.filter(p => p.price <= filters.budget * 1.5).slice(0, 3),
        isFallback: true
      };
    }
    return { results: matches, isFallback: false };
  }, [filters]);

  const handleBookVisit = (property: Property) => {
    setSelectedProperty(property);
    setIsBookingOpen(true);
  };

  const addNotification = (text: string) => {
    setNotifications(prev => [...prev, text]);
    setTimeout(() => {
      setNotifications(prev => prev.slice(1));
    }, 5000);
  };

  // Follow-up simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      addNotification("Market Specialist Follow-up: Just checking in! Did you find the Skyline Penthouse interesting?");
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  const seriousBuyerScore = Math.min(100, Math.floor((filters.budget / 1000000) * 60) + (filters.location !== 'All' ? 30 : 10));

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-200 overflow-hidden font-sans">
      {/* Premium Header */}
      <header className="h-20 glass border-b border-white/10 px-8 flex items-center justify-between shrink-0 z-50">
        <div className="flex items-center gap-4">
          <motion.div 
            whileHover={{ rotate: 10 }}
            className="w-12 h-12 bg-gradient-to-br from-brand-500 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-xl shadow-brand-500/20"
          >
            <Building2 className="w-7 h-7 text-white" />
          </motion.div>
          <div>
            <span className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
              EstateMind <span className="text-brand-400 italic font-medium text-lg">Pro</span>
            </span>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">
              <ShieldCheck className="w-3 h-3 text-emerald-500" /> Secure Asset Management
            </div>
          </div>
        </div>
        
        <nav className="hidden lg:flex gap-10 text-sm font-bold text-slate-400">
          {['Marketplace', 'Premium Picks', 'My Visits', 'Concierge'].map((item, i) => (
            <a key={item} href="#" className={`flex items-center gap-2 transition-all hover:text-brand-400 ${i === 0 ? 'text-brand-400' : ''}`}>
              {item === 'Marketplace' && <LayoutDashboard className="w-4 h-4" />}
              {item === 'Premium Picks' && <Sparkles className="w-4 h-4" />}
              {item === 'My Visits' && <CalendarDays className="w-4 h-4" />}
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-8">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">Investor Score</p>
            <div className="flex items-center gap-2 justify-end">
              <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${seriousBuyerScore}%` }}
                  className={`h-full ${seriousBuyerScore > 80 ? 'bg-emerald-500' : 'bg-brand-500'}`} 
                />
              </div>
              <span className={`text-xs font-black ${seriousBuyerScore > 80 ? 'text-emerald-400' : 'text-brand-400'}`}>
                {seriousBuyerScore}%
              </span>
            </div>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-12 h-12 bg-white/5 rounded-2xl border-2 border-white/10 shadow-lg flex items-center justify-center overflow-hidden cursor-pointer"
          >
            <User className="w-7 h-7 text-slate-400" />
          </motion.div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Notifications */}
        <div className="absolute top-4 right-4 z-[100] flex flex-col gap-3">
          <AnimatePresence>
            {notifications.map((note, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass p-4 rounded-xl border-l-4 border-brand-500 flex items-start gap-3 w-80 shadow-2xl"
              >
                <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center shrink-0">
                  <Bell className="w-4 h-4 text-brand-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white mb-1">Market Update</p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{note}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Left Sidebar: Filters */}
        <aside className="w-72 glass border-r border-white/10 overflow-y-auto hidden xl:block shrink-0">
          <FilterSection filters={filters} setFilters={setFilters} />
        </aside>

        {/* Main Content: Properties */}
        <main className="flex-1 flex flex-col overflow-hidden bg-slate-950/50 backdrop-blur-3xl">
          <div className="flex-1 overflow-y-auto p-10 scrollbar-thin scrollbar-thumb-white/5">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h1 className="text-4xl font-black text-white tracking-tight mb-2">
                  Elite <span className="gradient-text">Recommendations</span>
                </h1>
                <p className="text-slate-500 text-sm font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-400" /> 
                  Optimized for {filters.location === 'All' ? 'Global High-End Markets' : filters.location}
                </p>
              </div>
              
              <div className="hidden sm:block">
                <AgentHeader matchCount={processedData.isFallback ? 0 : processedData.results.length} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 pb-20">
              <AnimatePresence mode="popLayout">
                {processedData.results.map((property) => (
                  <PropertyCard 
                    key={property.id} 
                    property={property} 
                    onBook={handleBookVisit} 
                    isRecommended={!processedData.isFallback && property.price < filters.budget * 0.95}
                  />
                ))}
              </AnimatePresence>
            </div>

            {processedData.results.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-32 text-center glass rounded-3xl border border-dashed border-white/10"
              >
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-brand-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Scanning Private Listings...</h3>
                <p className="text-slate-500 text-sm max-w-xs mx-auto">Our system is currently vetting off-market opportunities that match your verified profile.</p>
              </motion.div>
            )}
          </div>

          {/* Footer Status */}
          <footer className="h-14 glass border-t border-white/10 px-8 flex items-center justify-between shrink-0">
            <div className="flex gap-8 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-brand-500" /> {processedData.results.length} Curated Listings</span>
              <span className="text-white/10 text-lg">|</span>
              <span className="flex items-center gap-2"><DollarSign className="w-3 h-3" /> Avg. Market Value: ${(processedData.results.reduce((acc, curr) => acc + curr.price, 0) / (processedData.results.length || 1)).toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                Market Watch Active: Vetting Potential Assets
              </span>
            </div>
          </footer>
        </main>

        {/* Right Sidebar: Concierge Assistant */}
        <aside className="w-96 glass border-l border-white/10 hidden 2xl:block shrink-0 p-4">

          <ChatInterface 
            filters={filters} 
            setFilters={setFilters} 
            properties={PROPERTIES}
            onBook={handleBookVisit}
          />
        </aside>
      </div>

      <AnimatePresence>
        {isBookingOpen && (
          <BookingModal 
            property={selectedProperty} 
            onClose={() => setIsBookingOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}



