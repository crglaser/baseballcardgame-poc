import React from 'react';
import { useGame } from './hooks/useGame';
import { BaseballCard } from './components/BaseballCard';
import { SpecialCard } from './components/SpecialCard';
import { Play, Pause, RotateCcw, Zap } from 'lucide-react';

function App() {
  const { gameState, lineup, hand, energy, isPaused, togglePlay, startInning, playCard } = useGame();

  return (
    <div className="min-h-screen bg-[#1a4a1a] text-slate-100 font-sans selection:bg-blue-500/30 overflow-hidden flex flex-col relative">
      
      {/* 1. THE FIELD BACKGROUND */}
      <div className="absolute inset-0 z-0">
         {/* Grass Texture */}
         <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/grass.png')]"></div>
         <div className="absolute inset-0" style={{
           backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(0,0,0,0.03) 60px, rgba(0,0,0,0.03) 120px)'
         }}></div>

         {/* The Diamond */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#8b5a2b] rotate-45 border-[20px] border-[#7a4a1b] shadow-2xl opacity-80">
            <div className="absolute inset-4 bg-[#2d5a27] border-4 border-white/20"></div>
         </div>

         {/* Base Markers & Occupant Cards */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rotate-45 pointer-events-none">
            {/* 2nd Base */}
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] w-24 h-32">
               {gameState.bases[1] ? (
                 <div className="scale-50 origin-center"><BaseballCard player={gameState.bases[1]} order={0} /></div>
               ) : (
                 <div className="w-12 h-12 bg-white/20 border-2 border-white/40 rounded-sm m-auto translate-x-6 translate-y-10" />
               )}
            </div>
            {/* 3rd Base */}
            <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rotate-[-45deg] w-24 h-32">
               {gameState.bases[2] ? (
                 <div className="scale-50 origin-center"><BaseballCard player={gameState.bases[2]} order={0} /></div>
               ) : (
                 <div className="w-12 h-12 bg-white/20 border-2 border-white/40 rounded-sm m-auto -translate-x-6 translate-y-10" />
               )}
            </div>
            {/* 1st Base */}
            <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 rotate-[-45deg] w-24 h-32">
               {gameState.bases[0] ? (
                 <div className="scale-50 origin-center"><BaseballCard player={gameState.bases[0]} order={0} /></div>
               ) : (
                 <div className="w-12 h-12 bg-white/20 border-2 border-white/40 rounded-sm m-auto translate-x-6 -translate-y-10" />
               )}
            </div>
         </div>
      </div>

      {/* 2. TOP HUD: Score & Energy */}
      <header className="relative z-20 p-6 flex justify-between items-start">
        <div className="bg-slate-900/90 backdrop-blur-xl border-b-4 border-blue-500 p-4 rounded-xl shadow-2xl flex gap-8">
           <div className="text-center border-r border-slate-700 pr-8">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Inning</p>
              <p className="text-2xl font-black">{gameState.inning} {gameState.isTopInning ? 'TOP' : 'BOT'}</p>
           </div>
           <div className="text-center border-r border-slate-700 pr-8">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Score</p>
              <p className="text-2xl font-black text-blue-400">{gameState.score.away} - {gameState.score.home}</p>
           </div>
           <div className="text-center">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Outs</p>
              <div className="flex gap-2 mt-2">
                 {[0, 1, 2].map(i => (
                   <div key={i} className={`w-4 h-4 rounded-full border-2 border-slate-700 ${gameState.outs > i ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-slate-950'}`} />
                 ))}
              </div>
           </div>
        </div>

        <div className="flex flex-col items-end gap-4">
           <div className="bg-yellow-500 text-black px-6 py-2 rounded-full font-black flex items-center gap-2 shadow-2xl">
              <Zap size={20} fill="black" />
              ENERGY: {energy} / 3
           </div>
           <div className="flex gap-2">
              <button onClick={togglePlay} className="p-4 bg-blue-600 rounded-full shadow-2xl text-white hover:bg-blue-500 active:scale-95 transition-all">
                {isPaused ? <Play fill="white" /> : <Pause fill="white" />}
              </button>
              <button onClick={startInning} className="p-4 bg-slate-800 rounded-full shadow-2xl text-white hover:bg-slate-700 active:scale-95 transition-all">
                <RotateCcw />
              </button>
           </div>
        </div>
      </header>

      {/* 3. CENTER: Action Feed */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 pointer-events-none">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 px-12 py-6 rounded-3xl shadow-2xl transform -translate-y-24">
             <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white drop-shadow-2xl">
               {gameState.log[0]}
             </h2>
          </div>
      </div>

      {/* 4. PRIMARY FOCUS: THE LINEUP (Like Balatro Hand) */}
      <footer className="relative z-30 flex flex-col items-center pb-8 pt-20 bg-gradient-to-t from-black via-black/80 to-transparent">
        
        {/* The 9-Man Lineup Row */}
        <div className="mb-12 flex justify-center items-center gap-1 max-w-full overflow-visible px-10">
           {lineup.players.map((player, idx) => (
             <div 
               key={player.id}
               className={`transition-all duration-500 ${idx === gameState.currentBatterIndex && !isPaused ? '-translate-y-12 scale-110' : 'translate-y-0 opacity-80'}`}
             >
                <BaseballCard 
                  player={player} 
                  order={idx + 1} 
                  isActive={idx === gameState.currentBatterIndex && !isPaused} 
                />
             </div>
           ))}
        </div>

        {/* The Playable Action Cards (Under the lineup) */}
        <div className="flex justify-center items-center gap-4">
           <div className="text-[10px] font-black text-slate-500 uppercase vertical-text tracking-[0.5em] mr-4">Action Hand</div>
           {hand.map(card => (
             <div 
               key={card.id} 
               onClick={() => playCard(card)}
               className="cursor-pointer transform hover:-translate-y-6 hover:rotate-3 transition-all active:scale-90"
             >
               <SpecialCard card={card} />
             </div>
           ))}
           {hand.length === 0 && (
             <div className="text-slate-600 font-black uppercase text-sm border-2 border-dashed border-slate-800 px-12 py-8 rounded-2xl">
               End of Turn / Draw Hand
             </div>
           )}
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .vertical-text { writing-mode: vertical-lr; transform: rotate(180deg); }
      `}} />
    </div>
  );
}

export default App;
