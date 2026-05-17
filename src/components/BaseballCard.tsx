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
      className={`relative w-44 h-64 rounded-none transition-all duration-300 transform shadow-[8px_8px_0_0_rgba(0,0,0,0.5)] flex-shrink-0
        ${isActive 
          ? 'scale-110 -translate-y-8 z-50 ring-4 ring-yellow-400 shadow-[12px_12px_0_0_rgba(0,0,0,0.6)]' 
          : 'scale-100 translate-y-0 opacity-100 hover:-translate-y-2'}`}
      style={{
        backgroundColor: isActive ? '#fef3c7' : '#e2e8f0',
        imageRendering: 'pixelated'
      }}
    >
      {/* 8-Bit Styled Border */}
      <div className="absolute inset-1 border-2 border-slate-900 flex flex-col">
        
        {/* Card Header (8-Bit Style) */}
        <div className="bg-slate-900 p-1 flex justify-between items-center">
          <span className="text-[10px] font-mono font-bold text-white uppercase">{player.position}</span>
          <span className="text-[10px] font-mono font-bold text-yellow-400">#{order}</span>
        </div>

        {/* Player Image / Sprite Placeholder */}
        <div className="flex-1 relative bg-white border-b-2 border-slate-900 overflow-hidden flex items-center justify-center">
          {player.imageUrl ? (
            <img 
              src={player.imageUrl} 
              alt={player.name} 
              className="w-full h-full object-cover grayscale-[0.2]"
              onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150/000000/FFFFFF?text=' + player.name[0] }}
            />
          ) : (
            <div className="text-4xl font-black text-slate-200">{player.name[0]}</div>
          )}
          
          {/* Scanline Effect */}
          <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>
        </div>

        {/* Card Info */}
        <div className="p-2 bg-white flex flex-col justify-between h-20">
          <p className="text-[14px] font-mono font-black text-slate-900 uppercase leading-none truncate">
            {player.name}
          </p>
          
          <div className="grid grid-cols-2 gap-1 mt-1">
             <div className="border border-slate-900 px-1 py-0.5 bg-slate-100">
                <p className="text-[7px] font-mono font-bold text-slate-500 leading-none">AVG</p>
                <p className="text-[10px] font-mono font-black text-slate-900 leading-none">.{player.stats.ba.toString().split('.')[1]}</p>
             </div>
             <div className="border border-slate-900 px-1 py-0.5 bg-slate-100">
                <p className="text-[7px] font-mono font-bold text-slate-500 leading-none">HR%</p>
                <p className="text-[10px] font-mono font-black text-slate-900 leading-none">{Math.round(player.stats.hrRate * 100)}</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
