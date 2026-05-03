import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface AgentHeaderProps {
  matchCount: number;
}

export const AgentHeader: React.FC<AgentHeaderProps> = ({ matchCount }) => {
  return (
    <div className="flex items-center gap-3 text-xs font-bold text-brand-400 glass-dark px-5 py-2.5 rounded-full border border-brand-500/20 shadow-xl shadow-brand-500/5">
      <div className="relative flex h-2 w-2">
        <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
        <div className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
      </div>
      <span className="flex items-center gap-1.5 uppercase tracking-widest">
        <Sparkles className="w-3 h-3" />
        {matchCount > 0 ? `Detected ${matchCount} Elite Matches` : `Vetting Market Liquidity`}
      </span>
    </div>
  );
};
