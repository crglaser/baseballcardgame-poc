import React from 'react';
import type { Player } from '../types/game';

interface BaseballCardProps {
  player: Player;
  isActive?: boolean;
  order: number;
}

export const BaseballCard: React.FC<BaseballCardProps> = ({ player, isActive, order }) => {
  return (
    <div 
      className={`relative w-32 h-48 rounded-lg overflow-hidden border-2 transition-all duration-300 transform shadow-2xl flex-shrink-0
        ${isActive 
          ? 'border-yellow-400 scale-110 -translate-y-6 z-10 shadow-[0_0_25px_rgba(250,204,21,0.6)] ring-4 ring-yellow-400/20' 
          : 'border-slate-800 bg-slate-900 hover:border-slate-600 scale-100 translate-y-0 opacity-90'}`}
    >
      {/* Card Visual / Image */}
      <div className="absolute inset-0 z-0">
        {player.imageUrl ? (
          <img 
            src={player.imageUrl} 
            alt={player.name} 
            className="w-full h-full object-cover grayscale-[0.2] brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all"
          />
        ) : (
          <div className="w-full h-full bg-slate-800 flex items-center justify-center">
             <span className="text-4xl font-black text-slate-700">{player.name[0]}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
      </div>

      {/* Card Header Overlay */}
      <div className="relative z-10 p-2 flex justify-between items-start">
        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${isActive ? 'bg-yellow-400 text-slate-900' : 'bg-slate-900/80 text-white border border-white/20'}`}>
          {order}
        </div>
        <div className="bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded border border-white/10">
          <span className="text-[9px] font-black uppercase text-white tracking-widest">{player.position}</span>
        </div>
      </div>

      {/* Card Name Overlay */}
      <div className="absolute bottom-6 left-0 right-0 z-10 px-2 text-center">
        <p className={`text-[12px] font-black uppercase tracking-tighter leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] ${isActive ? 'text-yellow-400' : 'text-white'}`}>
          {player.name}
        </p>
      </div>

      {/* Card Stats Footer Overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/60 backdrop-blur-md border-t border-white/10 p-1 grid grid-cols-3 gap-0.5 text-center">
        <div>
          <p className="text-[6px] font-bold text-slate-400 uppercase leading-none">AVG</p>
          <p className="text-[10px] font-black text-white">.{player.stats.ba.toString().split('.')[1]}</p>
        </div>
        <div>
          <p className="text-[6px] font-bold text-slate-400 uppercase leading-none">OBP</p>
          <p className="text-[10px] font-black text-white">.{player.stats.obp.toString().split('.')[1]}</p>
        </div>
        <div>
          <p className="text-[6px] font-bold text-slate-400 uppercase leading-none">HR%</p>
          <p className="text-[10px] font-black text-white">{Math.round(player.stats.hrRate * 100)}</p>
        </div>
      </div>
      
      {/* Active Indicator Overlay */}
      {isActive && (
        <div className="absolute inset-0 border-4 border-yellow-400/50 animate-pulse pointer-events-none rounded-lg z-20"></div>
      )}
    </div>
  );
};
