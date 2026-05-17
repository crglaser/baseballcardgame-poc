import type { Card, GameState } from '../types/game';

export const COACH_CARDS: Card[] = [
  {
    id: 'c1',
    name: 'Launch Angle Coach',
    type: 'COACH',
    rarity: 'UNCOMMON',
    description: '+10% Home Run chance for the whole lineup.',
    effect: (state: GameState) => {
      // In a real implementation, this would modify the lineup's probabilities
      // for the duration of the game/inning.
      return state;
    }
  },
  {
    id: 'c2',
    name: 'Small Ball Specialist',
    type: 'COACH',
    rarity: 'COMMON',
    description: '+15% Single chance, -5% Strikeout chance.',
    effect: (state: GameState) => state
  }
];

export const PLAYER_UPGRADES: Card[] = [
  {
    id: 'u1',
    name: 'Weight Room Training',
    type: 'EFFECT',
    rarity: 'COMMON',
    description: 'Permanent +2 to Power (SLG) for one player.',
    effect: (state: GameState) => state
  }
];
