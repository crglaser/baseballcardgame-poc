import type { PAOutcome, Player, GameState } from '../types/game';

export const calculateProbabilities = (player: Player): Record<PAOutcome, number> => {
  // Simplistic mapping for POC
  // In a real Markov model, these would be influenced by the pitcher as well (Log5 formula)
  return player.currentProbabilities;
};

export const simulatePA = (player: Player): PAOutcome => {
  const probs = calculateProbabilities(player);
  const rand = Math.random();
  let cumulative = 0;

  for (const outcome of Object.keys(probs) as PAOutcome[]) {
    cumulative += probs[outcome];
    if (rand < cumulative) {
      return outcome;
    }
  }
  return 'OUT';
};

export const advanceRunners = (
  bases: (Player | null)[],
  batter: Player,
  outcome: PAOutcome
): { newBases: (Player | null)[]; runsScored: number } => {
  let runsScored = 0;
  let newBases: (Player | null)[] = [null, null, null];

  switch (outcome) {
    case 'WALK':
      newBases = [...bases];
      if (newBases[0]) {
        if (newBases[1]) {
          if (newBases[2]) {
            runsScored++;
          }
          newBases[2] = newBases[1];
        }
        newBases[1] = newBases[0];
      }
      newBases[0] = batter;
      break;
    case 'SINGLE':
      if (bases[2]) runsScored++;
      newBases[2] = bases[1];
      newBases[1] = bases[0];
      newBases[0] = batter;
      break;
    case 'DOUBLE':
      if (bases[2]) runsScored++;
      if (bases[1]) runsScored++;
      newBases[2] = bases[0];
      newBases[1] = batter;
      newBases[0] = null;
      break;
    case 'TRIPLE':
      if (bases[2]) runsScored++;
      if (bases[1]) runsScored++;
      if (bases[0]) runsScored++;
      newBases[2] = batter;
      newBases[1] = null;
      newBases[0] = null;
      break;
    case 'HOMERUN':
      runsScored = 1 + bases.filter(b => b !== null).length;
      newBases = [null, null, null];
      break;
    default:
      newBases = [...bases];
      break;
  }

  return { newBases, runsScored };
};

export const processInning = (state: GameState, batter: Player): GameState => {
  const outcome = simulatePA(batter);
  const newState = { ...state, log: [`${batter.name}: ${outcome}`, ...state.log] };

  if (outcome === 'OUT' || outcome === 'STRIKEOUT' || outcome === 'FLYOUT' || outcome === 'GROUNDOUT') {
    newState.outs += 1;
  } else {
    const { newBases, runsScored } = advanceRunners(state.bases, batter, outcome);
    newState.bases = newBases;
    if (state.isTopInning) {
      newState.score.away += runsScored;
    } else {
      newState.score.home += runsScored;
    }
  }

  newState.currentBatterIndex = (state.currentBatterIndex + 1) % 9;

  return newState;
};
