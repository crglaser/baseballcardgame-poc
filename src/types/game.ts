export type PAOutcome = 'SINGLE' | 'DOUBLE' | 'TRIPLE' | 'HOMERUN' | 'WALK' | 'OUT' | 'STRIKEOUT' | 'FLYOUT' | 'GROUNDOUT';

export interface PlayerStats {
  ba: number;
  obp: number;
  slg: number;
  hrRate: number;
  bbRate: number;
  kRate: number;
}

export interface Player {
  id: string;
  name: string;
  position: string;
  stats: PlayerStats;
  currentProbabilities: Record<PAOutcome, number>;
  imageUrl?: string;
}

export interface Lineup {
  players: Player[]; // Usually 9
}

export interface GameState {
  inning: number;
  isTopInning: boolean;
  outs: number;
  score: {
    home: number;
    away: number;
  };
  bases: (Player | null)[]; // [1B, 2B, 3B]
  currentBatterIndex: number;
  log: string[];
}

export interface Card {
  id: string;
  name: string;
  type: 'PLAYER' | 'COACH' | 'EFFECT';
  rarity: 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC';
  effect: (gameState: GameState) => GameState;
  description: string;
}
