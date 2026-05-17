import { useState, useCallback, useEffect } from 'react';
import type { GameState, Lineup, Player, Card } from '../types/game';
import { processInning } from '../engine/simulator';
import { INITIAL_PLAYERS } from '../data/initialData';
import { COACH_CARDS } from '../data/cards';

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
  const [hand, setHand] = useState<Card[]>([]);
  const [deck, setDeck] = useState<Card[]>(COACH_CARDS); // For now using coach cards as the deck
  const [energy, setEnergy] = useState(3);
  const [isPaused, setIsPaused] = useState(true);

  const drawHand = useCallback(() => {
    // Simple draw 5 cards
    const newHand = [...deck].sort(() => Math.random() - 0.5).slice(0, 5);
    setHand(newHand);
    setEnergy(3);
  }, [deck]);

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
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isPaused, gameState.outs, nextAtBat]);

  const startInning = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      outs: 0,
      bases: [null, null, null],
      log: [`Inning ${prev.inning} starts!`, ...prev.log]
    }));
    drawHand();
    setIsPaused(false);
  }, [drawHand]);

  const playCard = (card: Card) => {
    if (energy > 0) {
      setEnergy(prev => prev - 1);
      setHand(prev => prev.filter(c => c.id !== card.id));
      // Apply effect... (future implementation)
      setGameState(prev => ({
        ...prev,
        log: [`Played ${card.name}: ${card.description}`, ...prev.log]
      }));
    }
  };

  return {
    gameState,
    lineup,
    hand,
    energy,
    isPaused,
    nextAtBat,
    startInning,
    playCard,
    togglePlay: () => setIsPaused(p => !p),
  };
};
