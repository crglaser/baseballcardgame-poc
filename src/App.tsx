import React from 'react';
import { useGame } from './hooks/useGame';
import { BaseballCard } from './components/BaseballCard';
import { SpecialCard } from './components/SpecialCard';
import { COACH_CARDS } from './data/cards';
import { Play, Pause, RotateCcw, Activity, Info } from 'lucide-react';

function App() {
  const { gameState, lineup, resetInning, isPaused, togglePlay } = useGame();

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-slate-100 font-sans selection:bg-blue-500/30 overflow-hidden flex flex-col">
      
      {/* Top Bar: Managers/Jokers & HUD */}
      <header className="bg-slate-900/50 border-b border-slate-800 p-4 shrink-0">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center gap-8">
          
          {/* Logo & Game Info */}
          <div className="flex items-center gap-3 min-w-[240px]">
            <div className="bg-blue-600 p-2 rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.4)]">
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
             <div className="text-[10px] font-black text-slate-600 uppercase vertical-text tracking-widest mr-2">Managers</div>
             {COACH_CARDS.map(card => (
               <SpecialCard key={card.id} card={card} />
             ))}
             {[1, 2, 3].map(i => (
               <div key={i} className="w-24 h-32 rounded-lg border-2 border-dashed border-slate-800 flex items-center justify-center text-slate-800 bg-slate-900/20">
                 <span className="text-[10px] font-bold uppercase">Empty Slot</span>
               </div>
             ))}
          </div>

          {/* Scoreboard HUD */}
          <div className="flex gap-4 items-center min-w-[300px] justify-end">
             <div className="bg-slate-800/80 rounded-xl border border-slate-700 px-4 py-2 flex gap-6 shadow-xl">
                <div className="text-center">
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">Inning</p>
                  <p className="text-md font-black">{gameState.inning} {gameState.isTopInning ? 'TOP' : 'BOT'}</p>
                </div>
                <div className="text-center">
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">Outs</p>
                  <div className="flex gap-1 mt-1.5">
                    {[0, 1, 2].map((i) => (
                      <div 
                        key={i} 
                        className={`w-2.5 h-2.5 rounded-full border border-slate-600 transition-colors duration-300 ${gameState.outs > i ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-slate-900'}`} 
                      />
                    ))}
                  </div>
                </div>
                <div className="text-center min-w-[60px]">
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">Score</p>
                  <p className="text-md font-black text-blue-400">{gameState.score.away} - {gameState.score.home}</p>
                </div>
              </div>
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 relative flex flex-col items-center justify-center p-4 overflow-hidden">
        
        {/* The Field (Background-ish focus) */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none scale-90 -translate-y-10">
           {/* The Dirt Diamond */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#3d2b1f] rotate-45 border-[20px] border-[#2a1d14] opacity-50 shadow-2xl">
               <div className="absolute inset-4 bg-[#1a2e1a] border-4 border-white/5"></div>
            </div>

            {/* Bases */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rotate-45">
               <div className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-2 rotate-[-45deg] ${gameState.bases[1] ? 'bg-yellow-400 border-yellow-200' : 'bg-slate-800 border-slate-700'}`} />
               <div className={`absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-8 h-8 border-2 rotate-[-45deg] ${gameState.bases[2] ? 'bg-yellow-400 border-yellow-200' : 'bg-slate-800 border-slate-700'}`} />
               <div className={`absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 w-8 h-8 border-2 rotate-[-45deg] ${gameState.bases[0] ? 'bg-yellow-400 border-yellow-200' : 'bg-slate-800 border-slate-700'}`} />
            </div>
        </div>

        {/* Live Simulation Message Overlay */}
        <div className="z-10 mb-8 bg-slate-900/60 backdrop-blur-xl border border-blue-500/30 px-8 py-3 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
           <p className="text-xs font-black text-blue-400 uppercase tracking-[0.3em] text-center mb-1">Plate Appearance</p>
           <h2 className="text-2xl font-black text-white text-center italic uppercase tracking-tight">
             {gameState.log[0]}
           </h2>
        </div>

        {/* Main Control Panel */}
        <div className="z-10 flex gap-4 items-center">
            <button 
              onClick={togglePlay}
              className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-2xl active:scale-90 border-4 ${isPaused ? 'bg-blue-600 border-blue-400 hover:bg-blue-500' : 'bg-red-600 border-red-400 hover:bg-red-500'}`}
            >
              {isPaused ? <Play size={40} fill="white" className="ml-2" /> : <Pause size={40} fill="white" />}
            </button>
            <button 
              onClick={resetInning}
              className="w-16 h-16 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center hover:bg-slate-700 transition-all text-white shadow-xl active:rotate-180 duration-500"
            >
              <RotateCcw size={24} />
            </button>
        </div>
      </main>

      {/* The Lineup "Hand" (Visual Focus) */}
      <footer className="relative z-20 h-72 shrink-0 bg-gradient-to-t from-slate-950 via-slate-900/90 to-transparent pt-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
           <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-full shadow-2xl">
              <Info size={14} className="text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Active Lineup Hand</span>
           </div>
        </div>

        <div className="max-w-[1600px] mx-auto h-full flex items-end justify-center px-8 pb-8">
           <div className="flex gap-2 perspective-1000">
              {lineup.players.map((player, idx) => {
                const isActive = idx === gameState.currentBatterIndex && !isPaused;
                // Calculate "hand" fan effect
                const offset = idx - 4; // Center at 4
                const rotate = offset * 2.5;
                const translateY = Math.abs(offset) * 4;

                return (
                  <div 
                    key={player.id}
                    style={{
                      transform: `rotate(${rotate}deg) translateY(${isActive ? -40 : translateY}px)`,
                      transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
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
