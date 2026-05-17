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
      className={`relative w-32 h-48 rounded-lg overflow-hidden border-2 transition-all duration-300 transform shadow-xl flex-shrink-0
        ${isActive 
          ? 'border-yellow-400 scale-110 -translate-y-2 z-10 shadow-[0_0_20px_rgba(250,204,21,0.5)]' 
          : 'border-slate-700 bg-slate-800 hover:border-slate-500 scale-100 translate-y-0 opacity-80'}`}
    >
      {/* Card Header */}
      <div className={`h-1/3 p-2 flex flex-col justify-between ${isActive ? 'bg-yellow-400' : 'bg-slate-700'}`}>
        <div className="flex justify-between items-start">
          <span className={`text-[10px] font-black ${isActive ? 'text-slate-900' : 'text-slate-300'}`}>{order}.</span>
          <span className={`text-[10px] font-black uppercase ${isActive ? 'text-slate-900' : 'text-slate-300'}`}>{player.position}</span>
        </div>
        <p className={`text-[11px] font-black uppercase tracking-tight leading-none ${isActive ? 'text-slate-900' : 'text-white'}`}>
          {player.name.split(' ').pop()}
        </p>
      </div>

      {/* Card Body (Simplified "Portrait") */}
      <div className="h-2/5 bg-slate-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className={`w-16 h-16 rounded-full border-2 ${isActive ? 'border-yellow-400/50' : 'border-slate-700'} flex items-center justify-center`}>
           <span className="text-2xl font-black text-slate-700 select-none">{player.name[0]}</span>
        </div>
      </div>

      {/* Card Stats Footer */}
      <div className="h-1/4 bg-white p-1 grid grid-cols-3 gap-0.5 text-center">
        <div>
          <p className="text-[7px] font-bold text-slate-500 uppercase leading-none">AVG</p>
          <p className="text-[10px] font-black text-slate-900">.{player.stats.ba.toString().split('.')[1]}</p>
        </div>
        <div>
          <p className="text-[7px] font-bold text-slate-500 uppercase leading-none">OBP</p>
          <p className="text-[10px] font-black text-slate-900">.{player.stats.obp.toString().split('.')[1]}</p>
        </div>
        <div>
          <p className="text-[7px] font-bold text-slate-500 uppercase leading-none">HR</p>
          <p className="text-[10px] font-black text-slate-900">{Math.round(player.stats.hrRate * 100)}%</p>
        </div>
      </div>
      
      {/* Active Indicator */}
      {isActive && (
        <div className="absolute inset-0 border-2 border-yellow-400 animate-pulse pointer-events-none rounded-lg"></div>
      )}
    </div>
  );
};
