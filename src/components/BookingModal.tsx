import React, { useState } from 'react';
import { X, CheckCircle2, Loader2, ShieldCheck, Calendar, Phone, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Property, BookingDetails } from '../types';

interface BookingModalProps {
  property: Property | null;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ property, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<BookingDetails, 'propertyId' | 'propertyName'>>({
    name: '',
    phone: '',
    date: ''
  });

  if (!property) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('success');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative glass rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-white/10"
      >
        <div className="p-8 border-b border-white/5 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">Priority Visit</h2>
            <p className="text-brand-400 text-sm font-bold flex items-center gap-1.5 mt-1">
               {property.title}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-xl transition-colors text-slate-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {step === 'form' ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="label-pro flex items-center gap-2">
                    <User className="w-3 h-3" /> Identity
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pro-select"
                    placeholder="Full legal name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="label-pro flex items-center gap-2">
                    <Phone className="w-3 h-3" /> Contact
                  </label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="pro-select"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="space-y-2">
                  <label className="label-pro flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> Scheduled Date
                  </label>
                  <input
                    required
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="pro-select"
                  />
                </div>

                <div className="pt-6">
                  <button 
                    disabled={loading}
                    type="submit" 
                    className="w-full btn-pro-primary h-14 relative overflow-hidden group"
                  >
                    <span className="relative z-10">
                      {loading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : 'Confirm Priority Access'}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-fuchsia-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-emerald-500 font-black uppercase tracking-[0.2em]">
                    <ShieldCheck className="w-4 h-4" />
                    Verified Serious Buyer Status Active
                  </div>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 text-center"
            >
              <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-emerald-500/20">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <h2 className="text-3xl font-black text-white mb-3 tracking-tight">Access Confirmed</h2>
              <p className="text-slate-500 text-sm mb-10 leading-relaxed max-w-xs mx-auto font-medium">
                Your priority visit has been logged. Our premium concierge will reach out within 15 minutes.
              </p>
              <button 
                onClick={onClose}
                className="w-full btn-pro-dark"
              >
                Return to Marketplace
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        </motion.div>
    </div>
  );
};
