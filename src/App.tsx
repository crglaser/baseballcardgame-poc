import React from 'react';
import { useGame } from './hooks/useGame';
import { BaseballCard } from './components/BaseballCard';
import { Trophy, Play, Pause, RotateCcw, Activity } from 'lucide-react';

function App() {
  const { gameState, lineup, resetInning, isPaused, togglePlay } = useGame();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30">
      {/* HUD Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-2 rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.4)]">
              <Activity size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black italic tracking-tighter text-white uppercase leading-none">
                Ballpark Tycoon <span className="text-blue-500">POC</span>
              </h1>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Markov Decision Model Simulator</p>
            </div>
          </div>
          
          <div className="flex gap-4 items-center">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-slate-500 uppercase">Current Score</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">{gameState.score.away}</span>
                <span className="text-xs font-bold text-slate-600">VS</span>
                <span className="text-3xl font-black text-white">{gameState.score.home}</span>
              </div>
            </div>
            
            <div className="h-10 w-px bg-slate-800 mx-2" />

            <div className="bg-slate-800/50 rounded-xl border border-slate-700 px-4 py-2 flex gap-6">
              <div className="text-center">
                <p className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">Inning</p>
                <p className="text-lg font-black">{gameState.inning} {gameState.isTopInning ? 'TOP' : 'BOT'}</p>
              </div>
              <div className="text-center">
                <p className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">Outs</p>
                <div className="flex gap-1 mt-1">
                  {[0, 1, 2].map((i) => (
                    <div 
                      key={i} 
                      className={`w-3 h-3 rounded-full border border-slate-600 transition-colors duration-300 ${gameState.outs > i ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-slate-900'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* The Diamond & Active Play Area */}
        <section className="relative w-full aspect-[21/9] bg-slate-900 rounded-[2rem] border border-slate-800 overflow-hidden shadow-2xl">
          {/* Virtual Baseball Field Background */}
          <div className="absolute inset-0 bg-[#1a3a1a] overflow-hidden">
             {/* Grass Patterns */}
            <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/grass.png')]"></div>
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.05) 40px, rgba(0,0,0,0.05) 80px)'
            }}></div>
            
            {/* The Dirt Diamond */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[600px] h-[600px] bg-[#8b5a2b] rotate-45 border-[16px] border-[#7a4a1b] opacity-90 shadow-2xl">
               {/* Infield Grass */}
               <div className="absolute inset-4 bg-[#2d5a27] border-4 border-white/10"></div>
            </div>

            {/* Base Indicators */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[450px] h-[450px] rotate-45">
              {/* 2nd Base */}
              <div className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white border-4 rotate-[-45deg] flex items-center justify-center transition-all duration-500 shadow-lg ${gameState.bases[1] ? 'scale-125 border-yellow-400 bg-yellow-50' : 'scale-100 border-slate-300 opacity-50'}`}>
                {gameState.bases[1] && <div className="w-6 h-6 bg-blue-600 rounded-full animate-bounce" />}
              </div>
              {/* 3rd Base */}
              <div className={`absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white border-4 rotate-[-45deg] flex items-center justify-center transition-all duration-500 shadow-lg ${gameState.bases[2] ? 'scale-125 border-yellow-400 bg-yellow-50' : 'scale-100 border-slate-300 opacity-50'}`}>
                {gameState.bases[2] && <div className="w-6 h-6 bg-blue-600 rounded-full animate-bounce" />}
              </div>
              {/* 1st Base */}
              <div className={`absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 w-10 h-10 bg-white border-4 rotate-[-45deg] flex items-center justify-center transition-all duration-500 shadow-lg ${gameState.bases[0] ? 'scale-125 border-yellow-400 bg-yellow-50' : 'scale-100 border-slate-300 opacity-50'}`}>
                {gameState.bases[0] && <div className="w-6 h-6 bg-blue-600 rounded-full animate-bounce" />}
              </div>
              {/* Home Plate */}
              <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-12 h-12 bg-white border-4 rotate-[-45deg] flex items-center justify-center shadow-lg border-slate-400">
                <div className="w-2 h-2 bg-slate-400 rounded-full" />
              </div>
            </div>
          </div>

          {/* Overlay Controls */}
          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
             <div className="bg-slate-900/90 backdrop-blur border border-slate-700 p-4 rounded-2xl w-80 shadow-2xl">
               <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2">Simulation Feed</p>
               <div className="h-24 overflow-y-auto space-y-1 scrollbar-none">
                  {gameState.log.slice(0, 5).map((log, i) => (
                    <p key={i} className={`text-xs font-bold ${i === 0 ? 'text-white' : 'text-slate-500'}`}>
                      {log}
                    </p>
                  ))}
               </div>
             </div>

             <div className="flex gap-4">
                <button 
                  onClick={togglePlay}
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-2xl active:scale-90 border-4 ${isPaused ? 'bg-blue-600 border-blue-400 hover:bg-blue-500' : 'bg-red-600 border-red-400 hover:bg-red-500'}`}
                >
                  {isPaused ? <Play size={32} fill="white" className="ml-1" /> : <Pause size={32} fill="white" />}
                </button>
                <button 
                  onClick={resetInning}
                  className="w-16 h-16 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center hover:bg-slate-700 transition-all text-white shadow-xl active:rotate-180 duration-500"
                >
                  <RotateCcw size={24} />
                </button>
             </div>
          </div>
        </section>

        {/* The Lineup Horizontal Row */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black italic tracking-tighter uppercase text-white">Starting Lineup</h2>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-black text-blue-400 uppercase tracking-widest">
                Batting Order
              </span>
            </div>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-slate-800">
            {lineup.players.map((player, idx) => (
              <BaseballCard 
                key={player.id} 
                player={player} 
                order={idx + 1}
                isActive={idx === gameState.currentBatterIndex && !isPaused}
              />
            ))}
          </div>
        </section>

        {/* Footer/Upgrades POC */}
        <footer className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
               <div className="flex items-center gap-2 mb-6 text-yellow-500">
                  <Trophy size={20} />
                  <h3 className="font-black uppercase tracking-tighter italic">Active Manager Cards</h3>
               </div>
               <div className="flex gap-4">
                  <div className="w-24 h-32 bg-slate-800 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-slate-600 p-2 text-center">
                    <span className="text-[10px] font-bold">SLOT 1</span>
                  </div>
                  <div className="w-24 h-32 bg-slate-800 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-slate-600 p-2 text-center">
                    <span className="text-[10px] font-bold">SLOT 2</span>
                  </div>
                  <div className="flex-1 bg-slate-800/30 rounded-xl p-4 flex flex-col justify-center">
                    <p className="text-xs text-slate-400 italic">"Coach cards grant passive bonuses to your entire lineup's probabilities..."</p>
                  </div>
               </div>
            </div>
            
            <div className="bg-blue-900/20 border border-blue-800/30 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
               <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all duration-1000"></div>
               <h3 className="font-black uppercase tracking-tighter italic text-blue-400 mb-2">Upgrade Laboratory</h3>
               <p className="text-sm text-slate-300 leading-relaxed max-w-xs">
                 Collect data points during successful innings to train your players and improve their core stats.
               </p>
               <button className="mt-6 px-6 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-blue-500 transition-colors">
                 Open Training Menu
               </button>
            </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
