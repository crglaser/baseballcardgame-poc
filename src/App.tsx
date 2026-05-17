import React from 'react';
import { useGame } from './hooks/useGame';
import { Trophy, Users, Play, RotateCcw } from 'lucide-react';

function App() {
  const { gameState, lineup, nextAtBat, resetInning } = useGame();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans">
      <header className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter text-blue-400 uppercase">
            Ballpark Tycoon <span className="text-white">POC</span>
          </h1>
          <p className="text-slate-400">The Probabilistic Deck-Builder</p>
        </div>
        
        <div className="flex gap-8 bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-xl">
          <div className="text-center">
            <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Inning</p>
            <p className="text-2xl font-mono">{gameState.inning} {gameState.isTopInning ? 'TOP' : 'BOT'}</p>
          </div>
          <div className="text-center">
            <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Outs</p>
            <div className="flex gap-1 mt-1">
              {[0, 1, 2].map((i) => (
                <div 
                  key={i} 
                  className={`w-4 h-4 rounded-full border border-slate-600 ${gameState.outs > i ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' : 'bg-slate-900'}`} 
                />
              ))}
            </div>
          </div>
          <div className="text-center min-w-[80px]">
            <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Score</p>
            <p className="text-2xl font-black text-yellow-400">{gameState.score.away} - {gameState.score.home}</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Field & Lineup */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative bg-emerald-900 aspect-video rounded-3xl border-4 border-emerald-800 shadow-inner overflow-hidden flex items-center justify-center">
            {/* Simple Field Visual */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/grass.png')]"></div>
            <div className="relative w-64 h-64 border-2 border-white/20 rotate-45 flex items-center justify-center">
              <div className={`absolute top-0 left-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] flex items-center justify-center rounded-sm border-2 ${gameState.bases[1] ? 'bg-yellow-400 scale-110 shadow-lg' : 'bg-white/10'}`}>
                <span className="text-[8px] font-bold text-slate-900">2B</span>
              </div>
              <div className={`absolute top-0 right-0 w-8 h-8 translate-x-1/2 -translate-y-1/2 rotate-[-45deg] flex items-center justify-center rounded-sm border-2 ${gameState.bases[2] ? 'bg-yellow-400 scale-110 shadow-lg' : 'bg-white/10'}`}>
                <span className="text-[8px] font-bold text-slate-900">3B</span>
              </div>
              <div className={`absolute bottom-0 left-0 w-8 h-8 -translate-x-1/2 translate-y-1/2 rotate-[-45deg] flex items-center justify-center rounded-sm border-2 ${gameState.bases[0] ? 'bg-yellow-400 scale-110 shadow-lg' : 'bg-white/10'}`}>
                <span className="text-[8px] font-bold text-slate-900">1B</span>
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8 translate-x-1/2 translate-y-1/2 rotate-[-45deg] flex items-center justify-center rounded-sm border-2 bg-white/10">
                <span className="text-[8px] font-bold text-slate-900">HP</span>
              </div>
            </div>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
              <p className="text-xs font-bold uppercase text-emerald-300 mb-1">On Deck</p>
              <p className="text-xl font-black tracking-tight">{lineup.players[gameState.currentBatterIndex].name}</p>
            </div>
          </div>

          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <Users className="text-blue-400" size={20} />
              <h2 className="text-xl font-bold uppercase tracking-tight">Active Lineup</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {lineup.players.map((player, idx) => (
                <div 
                  key={player.id} 
                  className={`p-3 rounded-lg border flex justify-between items-center transition-all ${idx === gameState.currentBatterIndex ? 'bg-blue-500/20 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-slate-900/50 border-slate-700'}`}
                >
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase">{idx + 1}. {player.position}</p>
                    <p className="font-bold text-sm">{player.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-500 uppercase italic">AVG</p>
                    <p className="text-xs font-mono">.{player.stats.ba.toString().split('.')[1]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Game Log & Controls */}
        <div className="space-y-6">
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl flex flex-col h-[400px]">
            <div className="flex items-center gap-2 mb-4">
              <Play className="text-green-400" size={20} />
              <h2 className="text-xl font-bold uppercase tracking-tight">Game Feed</h2>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-slate-600">
              {gameState.log.map((entry, i) => (
                <div key={i} className={`p-3 rounded-lg text-sm font-medium ${i === 0 ? 'bg-slate-700 text-white' : 'text-slate-400 bg-slate-900/30'}`}>
                  {entry}
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <button 
                onClick={nextAtBat}
                disabled={gameState.outs >= 3}
                className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-black uppercase py-4 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
              >
                <Play size={20} fill="currentColor" />
                Play Ball
              </button>
              <button 
                onClick={resetInning}
                className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-xl transition-all shadow-lg active:rotate-180 duration-500"
                title="Reset Inning"
              >
                <RotateCcw size={20} />
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-900 to-slate-800 rounded-2xl p-6 border border-indigo-700 shadow-xl">
             <div className="flex items-center gap-2 mb-4">
              <Trophy className="text-yellow-400" size={20} />
              <h2 className="text-xl font-bold uppercase tracking-tight">Upgrades</h2>
            </div>
            <p className="text-slate-300 text-sm italic mb-4">Available after the inning...</p>
            <div className="space-y-3 opacity-50 pointer-events-none">
              <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                <p className="font-bold text-sm">Coaching: Hitting Drills</p>
                <p className="text-xs text-slate-400">+5% Contact for all players</p>
              </div>
              <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                <p className="font-bold text-sm">Scouting: Trade Market</p>
                <p className="text-xs text-slate-400">Replace a player in your lineup</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
