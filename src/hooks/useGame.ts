import { useState, useCallback } from 'react';
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

  const nextAtBat = useCallback(() => {
    if (gameState.outs >= 3) {
      // In a real game we'd flip innings here, but for POC let's just reset outs for now
      // or we can just stop. Let's reset for the POC "Inning" encounter.
      return;
    }

    const batter = lineup.players[gameState.currentBatterIndex];
    setGameState(prev => processInning(prev, batter));
  }, [gameState, lineup]);

  const resetInning = useCallback(() => {
    setGameState({
      ...INITIAL_STATE,
      log: ['Inning Reset!'],
    });
  }, []);

  return {
    gameState,
    lineup,
    nextAtBat,
    resetInning,
  };
};
