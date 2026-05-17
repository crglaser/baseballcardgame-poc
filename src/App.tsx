import React from 'react';
import { useGame } from './hooks/useGame';
import { BaseballCard } from './components/BaseballCard';
import { SpecialCard } from './components/SpecialCard';
import { COACH_CARDS } from './data/cards';
import { Play, Pause, RotateCcw, Activity, Info, Trophy } from 'lucide-react';

function App() {
  const { gameState, lineup, resetInning, isPaused, togglePlay } = useGame();

  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans selection:bg-blue-500/30 overflow-hidden flex flex-col">
      
      {/* Background Layer: Iconic Field Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1508344928928-7165b67de128?auto=format&fit=crop&q=80&w=2000" 
          alt="Baseball Field"
          className="w-full h-full object-cover opacity-40 grayscale-[0.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
      </div>

      {/* Top Bar: Managers/Jokers */}
      <header className="relative z-10 bg-black/40 backdrop-blur-md border-b border-white/5 p-4 shrink-0">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center gap-8">
          
          {/* Logo & Game Info */}
          <div className="flex items-center gap-3 min-w-[240px]">
            <div className="bg-blue-600 p-2 rounded-lg shadow-[0_0_20px_rgba(37,99,235,0.5)] border border-blue-400/50">
              <Activity size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black italic tracking-tighter text-white uppercase leading-none">
                Ballpark <span className="text-blue-500">Tycoon</span>
              </h1>
              <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-1">Markov Probability Engine</p>
            </div>
          </div>

          {/* Active Managers (The "Jokers") */}
          <div className="flex-1 flex justify-center items-center gap-3">
             <div className="text-[10px] font-black text-slate-400 uppercase vertical-text tracking-widest mr-2 opacity-50">Managers</div>
             {COACH_CARDS.map(card => (
               <SpecialCard key={card.id} card={card} />
             ))}
             {[1, 2, 3].map(i => (
               <div key={i} className="w-24 h-32 rounded-lg border-2 border-dashed border-white/5 flex items-center justify-center text-white/5 bg-white/5">
                 <span className="text-[10px] font-bold uppercase">Empty</span>
               </div>
             ))}
          </div>

          <div className="min-w-[240px]" /> {/* Spacer */}
        </div>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 relative flex flex-col items-center justify-start p-4 pt-12 overflow-hidden z-10">
        
        {/* The Premium Scorebug (TV Style) */}
        <div className="bg-slate-900/90 backdrop-blur-xl border-t-4 border-t-blue-600 border border-white/10 rounded-lg shadow-2xl overflow-hidden flex items-stretch min-w-[500px]">
           {/* Team Info */}
           <div className="bg-blue-900 px-6 py-4 flex flex-col justify-center border-r border-white/10">
              <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest leading-none mb-1">VISITOR</p>
              <h3 className="text-3xl font-black italic text-white leading-none">AWAY</h3>
           </div>
           
           {/* Score */}
           <div className="bg-black/40 px-8 py-4 flex items-center justify-center">
              <span className="text-5xl font-black text-white tabular-nums">{gameState.score.away}</span>
              <div className="mx-6 w-px h-12 bg-white/10" />
              <span className="text-5xl font-black text-white tabular-nums">{gameState.score.home}</span>
           </div>

           {/* Team Info */}
           <div className="bg-slate-800 px-6 py-4 flex flex-col justify-center border-l border-white/10">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">HOME</p>
              <h3 className="text-3xl font-black italic text-white leading-none">STARS</h3>
           </div>

           {/* Context Info (Inning/Outs/Bases) */}
           <div className="bg-black/60 px-6 py-4 flex flex-col justify-center gap-2 border-l border-white/10 min-w-[140px]">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-slate-400 uppercase">Inning</span>
                <span className="text-sm font-black text-white">{gameState.inning} {gameState.isTopInning ? '▲' : '▼'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-slate-400 uppercase">Outs</span>
                <div className="flex gap-1.5">
                  {[0, 1].map(i => (
                    <div key={i} className={`w-2.5 h-2.5 rounded-full border border-white/20 ${gameState.outs > i ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' : 'bg-slate-900'}`} />
                  ))}
                </div>
              </div>
              {/* Mini Base Visual */}
              <div className="relative w-8 h-8 mt-1 mx-auto rotate-45">
                 <div className={`absolute top-0 left-0 w-3.5 h-3.5 border border-white/30 ${gameState.bases[1] ? 'bg-yellow-400' : 'bg-transparent'}`} />
                 <div className={`absolute top-0 right-0 w-3.5 h-3.5 border border-white/30 ${gameState.bases[2] ? 'bg-yellow-400' : 'bg-transparent'}`} />
                 <div className={`absolute bottom-0 left-0 w-3.5 h-3.5 border border-white/30 ${gameState.bases[0] ? 'bg-yellow-400' : 'bg-transparent'}`} />
              </div>
           </div>
        </div>

        {/* Live Simulation Message Overlay */}
        <div className="mt-12 bg-white/5 backdrop-blur-sm border border-white/10 px-12 py-4 rounded-full shadow-2xl animate-in fade-in zoom-in duration-500">
           <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] text-center mb-1 opacity-70">Plate Appearance Outcome</p>
           <h2 className="text-4xl font-black text-white text-center italic uppercase tracking-tighter drop-shadow-lg">
             {gameState.log[0]}
           </h2>
        </div>

        {/* Playback Controls */}
        <div className="mt-8 flex gap-6 items-center">
            <button 
              onClick={togglePlay}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)] active:scale-90 border-4 ${isPaused ? 'bg-blue-600 border-blue-400 hover:bg-blue-500' : 'bg-red-600 border-red-400 hover:bg-red-500'}`}
            >
              {isPaused ? <Play size={32} fill="white" className="ml-1.5" /> : <Pause size={32} fill="white" />}
            </button>
            <button 
              onClick={resetInning}
              className="w-14 h-14 rounded-full bg-slate-900/80 border-2 border-white/10 flex items-center justify-center hover:bg-slate-800 transition-all text-white shadow-xl active:rotate-180 duration-500"
            >
              <RotateCcw size={20} />
            </button>
        </div>
      </main>

      {/* The Lineup "Hand" (Visual Focus) */}
      <footer className="relative z-20 h-[320px] shrink-0 pt-12">
        {/* Gradient Shadow to help cards pop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none"></div>
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
           <div className="flex items-center gap-2 bg-blue-600 border border-blue-400 px-4 py-1.5 rounded-full shadow-2xl">
              <Trophy size={14} className="text-white" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Active Lineup Hand</span>
           </div>
           <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">Batter {gameState.currentBatterIndex + 1} of 9</p>
        </div>

        <div className="max-w-[1600px] mx-auto h-full flex items-end justify-center px-8 pb-12">
           <div className="flex gap-1 perspective-1000">
              {lineup.players.map((player, idx) => {
                const isActive = idx === gameState.currentBatterIndex && !isPaused;
                // Calculate "hand" fan effect
                const offset = idx - 4; // Center at 4
                const rotate = offset * 3;
                const translateY = Math.abs(offset) * 6;

                return (
                  <div 
                    key={player.id}
                    style={{
                      transform: `rotate(${rotate}deg) translateY(${isActive ? -60 : translateY}px)`,
                      transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      zIndex: isActive ? 50 : 10 + idx
                    }}
                  >
                    <BaseballCard 
                      player={player} 
                      order={idx + 1}
                      isActive={isActive}
                    />
                  </div>
                );
              })}
           </div>
        </div>
      </footer>

      {/* Global CSS for the hand perspective */}
      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-1000 { perspective: 1000px; }
        .vertical-text { writing-mode: vertical-lr; transform: rotate(180deg); }
      `}} />
    </div>
  );
}

export default App;
