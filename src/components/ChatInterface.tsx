import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Headphones, CheckCircle2, Calendar, MapPin, DollarSign, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Property, FilterState } from '../types';

interface Message {
  id: string;
  type: 'agent' | 'user';
  text: string;
  timestamp: Date;
  actions?: { label: string; onClick: () => void }[];
}

interface ChatInterfaceProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  properties: Property[];
  onBook: (property: Property) => void;
}

export function ChatInterface({ filters, setFilters, properties, onBook }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'agent',
      text: "Hello! I'm your EstateMind Assistant. I help serious buyers find the perfect property. What's your target budget for today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [stage, setStage] = useState<'budget' | 'location' | 'qualification' | 'recommendation'>('budget');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const addMessage = (type: 'agent' | 'user', text: string, actions?: { label: string; onClick: () => void }[]) => {
    setMessages(prev => [...prev, {
      id: Math.random().toString(36).substr(2, 9),
      type,
      text,
      timestamp: new Date(),
      actions
    }]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput('');
    addMessage('user', userText);
    setIsTyping(true);

    // Simulate Agent Logic
    setTimeout(() => {
      setIsTyping(false);
      
      if (stage === 'budget') {
        const budget = parseInt(userText.replace(/[^0-9]/g, ''));
        if (!isNaN(budget)) {
          setFilters({ ...filters, budget });
          setStage('location');
          addMessage('agent', `Got it, $${budget.toLocaleString()}. Which location are you most interested in? (e.g., Downtown, Suburbs, Westside)`);
        } else {
          addMessage('agent', "I didn't quite catch that. Could you please specify your budget in numbers?");
        }
      } else if (stage === 'location') {
        setFilters({ ...filters, location: userText });
        setStage('qualification');
        addMessage('agent', `Great choice. To provide you with exclusive off-market listings, could you share your expected move-in timeline?`, [
          { label: 'ASAP', onClick: () => handleQualification('ASAP') },
          { label: '1-3 Months', onClick: () => handleQualification('1-3 Months') },
          { label: 'Just Browsing', onClick: () => handleQualification('Just Browsing') }
        ]);
      } else if (stage === 'qualification') {
        handleQualification(userText);
      } else {
        addMessage('agent', "I've updated your search. Would you like to schedule a visit for any of these properties?");
      }
    }, 1000);
  };

  const handleQualification = (timeline: string) => {
    setStage('recommendation');
    if (timeline === 'Just Browsing') {
      addMessage('agent', "No problem! I'll keep the public listings updated for you. Feel free to ask if you want to see something specific.");
    } else {
      addMessage('agent', `Understood. You're marked as a priority buyer. Here are the best options matching your ${timeline} timeline:`, 
        properties.slice(0, 2).map(p => ({
          label: `Book ${p.title}`,
          onClick: () => onBook(p)
        }))
      );
    }
  };

  return (
    <div className="flex flex-col h-full glass-dark rounded-2xl overflow-hidden border border-white/5">
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/20">
            <Headphones className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Concierge Assistant</h3>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-slate-400 font-medium">Market Specialist Online</span>
            </div>
          </div>
        </div>
        <div className="px-2 py-1 bg-white/5 rounded-lg border border-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          v2.4-stable
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] space-y-2 ${msg.type === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.type === 'user' 
                    ? 'bg-brand-600 text-white rounded-tr-none' 
                    : 'bg-white/10 text-slate-200 border border-white/10 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
                
                {msg.actions && (
                  <div className="flex flex-wrap gap-2">
                    {msg.actions.map((action, i) => (
                      <button
                        key={i}
                        onClick={action.onClick}
                        className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-semibold text-brand-400 transition-colors flex items-center gap-1.5"
                      >
                        {action.label} <ArrowRight className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                )}
                
                <span className="text-[10px] text-slate-500 font-medium px-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-4 border-t border-white/5 bg-white/5">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Speak with your assistant..."
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-brand-500/50 transition-all"
          />
          <button
            onClick={handleSend}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand-600 hover:bg-brand-500 rounded-lg text-white transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="mt-2 text-[10px] text-center text-slate-500 font-medium">
          System qualifies leads for priority market access.
        </p>
      </div>
    </div>
  );
}
