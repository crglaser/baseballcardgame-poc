import { useState, useCallback, useEffect } from 'react';
import type { GameState, Lineup, Player } from '../types/game';
import { processInning } from '../engine/simulator';
import { INITIAL_PLAYERS } from '../data/initialData';

const INITIAL_STATE: GameState = {
  inning: 1,
  isTopInning: true,
  outs: 0,
  score: { home: 0, away: 0 },
  bases: [null, null, null],
  currentBatterIndex: 0,
  log: ['Game Started!'],
};

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [lineup] = useState<Lineup>({ players: INITIAL_PLAYERS });
  const [isPaused, setIsPaused] = useState(true);

  const nextAtBat = useCallback(() => {
    if (gameState.outs >= 3) {
      setIsPaused(true);
      return;
    }

    const batter = lineup.players[gameState.currentBatterIndex];
    setGameState(prev => processInning(prev, batter));
  }, [gameState.outs, gameState.currentBatterIndex, lineup]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isPaused && gameState.outs < 3) {
      interval = setInterval(() => {
        nextAtBat();
      }, 1500); // 1.5 seconds per at-bat for "auto-play" feel
    }
    return () => clearInterval(interval);
  }, [isPaused, gameState.outs, nextAtBat]);

  const resetInning = useCallback(() => {
    setGameState({
      ...INITIAL_STATE,
      log: ['Inning Reset!'],
    });
    setIsPaused(true);
  }, []);

  const togglePlay = () => setIsPaused(prev => !prev);

  return {
    gameState,
    lineup,
    nextAtBat,
    resetInning,
    isPaused,
    togglePlay,
  };
};
