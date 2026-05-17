import React from 'react';
import { useGame } from './hooks/useGame';
import { BaseballCard } from './components/BaseballCard';
import { SpecialCard } from './components/SpecialCard';
import { Play, Pause, RotateCcw, Activity, Zap, CreditCard } from 'lucide-react';

function App() {
  const { gameState, lineup, hand, energy, isPaused, togglePlay, startInning, playCard } = useGame();

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-slate-100 font-mono selection:bg-blue-500/30 overflow-hidden flex flex-col">
      
      {/* 8-Bit Background */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[#2d5a27] [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>

      {/* Top Bar: Manager Cards (The "Jokers") */}
      <header className="relative z-10 bg-slate-900 border-b-4 border-slate-800 p-4 shrink-0 shadow-2xl">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center gap-8">
          
          <div className="flex items-center gap-3 min-w-[200px]">
            <div className="bg-blue-600 p-2 border-2 border-blue-400">
              <Activity size={20} className="text-white" />
            </div>
            <h1 className="text-lg font-black italic text-white uppercase leading-none tracking-tighter">
              Ballpark <span className="text-blue-500">Tycoon</span>
            </h1>
          </div>

          {/* Manager Cards */}
          <div className="flex-1 flex justify-center items-center gap-4">
             {hand.slice(0, 5).map(card => (
               <div key={card.id} onClick={() => playCard(card)} className="cursor-pointer">
                 <SpecialCard card={card} />
               </div>
             ))}
             {hand.length === 0 && (
               <button 
                 onClick={startInning}
                 className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-black border-b-4 border-yellow-700 active:border-b-0 active:translate-y-1 transition-all uppercase"
               >
                 Draw Hand (Start Inning)
               </button>
             )}
          </div>

          {/* Energy / Resource */}
          <div className="flex items-center gap-2 bg-black px-4 py-2 border-2 border-slate-700">
             <Zap size={20} className="text-yellow-400 fill-yellow-400" />
             <span className="text-xl font-black text-white">{energy} / 3</span>
          </div>
        </div>
      </header>

      {/* Main Game: The Field Display */}
      <main className="flex-1 relative flex flex-col items-center justify-center p-4 z-10">
        
        {/* 8-Bit Scorebug */}
        <div className="bg-slate-900 border-4 border-slate-700 p-4 min-w-[400px] shadow-[8px_8px_0_0_rgba(0,0,0,0.5)]">
           <div className="flex justify-between items-center mb-4 border-b-2 border-slate-700 pb-2">
              <div className="text-left">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Visiting Team</p>
                <p className="text-2xl font-black text-blue-400">AWAY {gameState.score.away}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Home Team</p>
                <p className="text-2xl font-black text-white">HOME {gameState.score.home}</p>
              </div>
           </div>
           
           <div className="flex justify-between items-center gap-8">
              <div className="flex gap-4">
                <div>
                   <p className="text-[10px] text-slate-500 font-bold uppercase">Inning</p>
                   <p className="text-xl font-black text-white">{gameState.inning} {gameState.isTopInning ? '▲' : '▼'}</p>
                </div>
                <div>
                   <p className="text-[10px] text-slate-500 font-bold uppercase">Outs</p>
                   <div className="flex gap-1.5 mt-1">
                      {[0, 1].map(i => (
                        <div key={i} className={`w-3 h-3 border-2 border-slate-600 ${gameState.outs > i ? 'bg-red-500' : 'bg-slate-800'}`} />
                      ))}
                   </div>
                </div>
              </div>

              {/* Diamond Minimalist */}
              <div className="relative w-12 h-12 rotate-45 border-2 border-slate-700 bg-slate-800">
                 <div className={`absolute top-0 left-0 w-4 h-4 border border-slate-600 ${gameState.bases[1] ? 'bg-yellow-400' : ''}`} />
                 <div className={`absolute top-0 right-0 w-4 h-4 border border-slate-600 ${gameState.bases[2] ? 'bg-yellow-400' : ''}`} />
                 <div className={`absolute bottom-0 left-0 w-4 h-4 border border-slate-600 ${gameState.bases[0] ? 'bg-yellow-400' : ''}`} />
              </div>
           </div>
        </div>

        {/* Action Overlay */}
        <div className="mt-12 bg-white text-black px-12 py-4 border-b-8 border-slate-300 shadow-xl">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Outcome</p>
           <h2 className="text-3xl font-black italic uppercase text-center">{gameState.log[0]}</h2>
        </div>

        {/* Controls */}
        <div className="mt-8 flex gap-4">
            <button 
              onClick={togglePlay}
              className={`px-8 py-4 border-b-4 font-black uppercase flex items-center gap-2 ${isPaused ? 'bg-blue-600 border-blue-800 text-white' : 'bg-red-600 border-red-800 text-white'}`}
            >
              {isPaused ? <Play size={20} fill="currentColor" /> : <Pause size={20} fill="currentColor" />}
              {isPaused ? 'Resume' : 'Pause'}
            </button>
        </div>
      </main>

      {/* Lineup focus: The Batting Order "Hand" */}
      <footer className="relative z-20 h-80 bg-slate-900 border-t-4 border-slate-800 pt-8 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8 flex flex-col items-center">
           <div className="flex items-center gap-2 mb-4 bg-black/40 px-4 py-1 rounded-full border border-white/10">
              <CreditCard size={14} className="text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Batting Order</span>
           </div>
           
           <div className="flex gap-4 overflow-x-auto w-full pb-8 justify-center no-scrollbar">
              {lineup.players.map((player, idx) => (
                <BaseballCard 
                  key={player.id} 
                  player={player} 
                  order={idx + 1}
                  isActive={idx === gameState.currentBatterIndex && !isPaused}
                />
              ))}
           </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
