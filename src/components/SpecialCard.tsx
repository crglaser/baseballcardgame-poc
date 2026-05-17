import React from 'react';
import type { Card } from '../types/game';

interface SpecialCardProps {
  card: Card;
}

export const SpecialCard: React.FC<SpecialCardProps> = ({ card }) => {
  const rarityColors = {
    COMMON: 'border-slate-400 bg-slate-800 text-slate-300',
    UNCOMMON: 'border-green-400 bg-green-950 text-green-300',
    RARE: 'border-blue-400 bg-blue-950 text-blue-300',
    EPIC: 'border-purple-500 bg-purple-950 text-purple-200 shadow-[0_0_10px_rgba(168,85,247,0.4)]',
  };

  return (
    <div className={`w-24 h-32 rounded-lg border-2 p-2 flex flex-col justify-between transition-all hover:scale-105 hover:-translate-y-1 cursor-help ${rarityColors[card.rarity]}`}>
      <div>
        <p className="text-[8px] font-black uppercase tracking-tighter opacity-70">{card.type}</p>
        <p className="text-[10px] font-bold leading-none mt-0.5">{card.name}</p>
      </div>
      
      <div className="flex-1 flex items-center justify-center py-1">
        <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-white/5`}>
           <span className="text-xs">✨</span>
        </div>
      </div>

      <p className="text-[7px] leading-tight font-medium opacity-90 italic">
        {card.description}
      </p>
    </div>
  );
};
