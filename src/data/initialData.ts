import type { Player, PAOutcome } from '../types/game';

const defaultProbabilities: Record<PAOutcome, number> = {
  SINGLE: 0.15,
  DOUBLE: 0.05,
  TRIPLE: 0.005,
  HOMERUN: 0.03,
  WALK: 0.08,
  STRIKEOUT: 0.20,
  FLYOUT: 0.2425,
  GROUNDOUT: 0.2425,
  OUT: 0, // Placeholder
};

export const INITIAL_PLAYERS: Player[] = [
  {
    id: '1',
    name: 'Ichiro Suzuki',
    position: 'RF',
    stats: { ba: .311, obp: .355, slg: .402, hrRate: .02, bbRate: .06, kRate: .10 },
    currentProbabilities: { ...defaultProbabilities, SINGLE: 0.22, STRIKEOUT: 0.08, HOMERUN: 0.01 },
    imageUrl: 'https://i.ebayimg.com/images/g/V~AAAOSwM~9h6J~Z/s-l1600.jpg',
  },
  {
    id: '2',
    name: 'Derek Jeter',
    position: 'SS',
    stats: { ba: .310, obp: .377, slg: .440, hrRate: .03, bbRate: .08, kRate: .14 },
    currentProbabilities: { ...defaultProbabilities, SINGLE: 0.18, DOUBLE: 0.06, STRIKEOUT: 0.12 },
    imageUrl: 'https://i.ebayimg.com/images/g/p-EAAOSw~hFh6O6~/s-l1600.jpg',
  },
  {
    id: '3',
    name: 'Barry Bonds',
    position: 'LF',
    stats: { ba: .298, obp: .444, slg: .607, hrRate: .08, bbRate: .20, kRate: .13 },
    currentProbabilities: { ...defaultProbabilities, HOMERUN: 0.12, WALK: 0.25, SINGLE: 0.12, STRIKEOUT: 0.10, FLYOUT: 0.20, GROUNDOUT: 0.21 },
    imageUrl: 'https://i.ebayimg.com/images/g/7pYAAOSw7thh6J~A/s-l1600.jpg',
  },
  {
    id: '4',
    name: 'Ken Griffey Jr.',
    position: 'CF',
    stats: { ba: .284, obp: .370, slg: .538, hrRate: .06, bbRate: .11, kRate: .15 },
    currentProbabilities: { ...defaultProbabilities, HOMERUN: 0.07, DOUBLE: 0.07, STRIKEOUT: 0.14 },
    imageUrl: 'https://i.ebayimg.com/images/g/KVsAAOSw-YVh6J+~/s-l1600.jpg',
  },
  {
    id: '5',
    name: 'Albert Pujols',
    position: '1B',
    stats: { ba: .296, obp: .374, slg: .544, hrRate: .06, bbRate: .10, kRate: .12 },
    currentProbabilities: { ...defaultProbabilities, HOMERUN: 0.07, SINGLE: 0.17, STRIKEOUT: 0.10 },
    imageUrl: 'https://i.ebayimg.com/images/g/zVAAAOSw0thh6J+v/s-l1600.jpg',
  },
  {
    id: '6',
    name: 'Mike Piazza',
    position: 'C',
    stats: { ba: .308, obp: .377, slg: .545, hrRate: .06, bbRate: .09, kRate: .16 },
    currentProbabilities: { ...defaultProbabilities, HOMERUN: 0.06, SINGLE: 0.18, STRIKEOUT: 0.15 },
    imageUrl: 'https://i.ebayimg.com/images/g/6LMAAOSw6thh6J+n/s-l1600.jpg',
  },
  {
    id: '7',
    name: 'Alex Rodriguez',
    position: '3B',
    stats: { ba: .295, obp: .380, slg: .550, hrRate: .07, bbRate: .11, kRate: .18 },
    currentProbabilities: { ...defaultProbabilities, HOMERUN: 0.08, STRIKEOUT: 0.17, DOUBLE: 0.05 },
    imageUrl: 'https://i.ebayimg.com/images/g/4HMAAOSw3thh6J+e/s-l1600.jpg',
  },
  {
    id: '8',
    name: 'Robinson Cano',
    position: '2B',
    stats: { ba: .303, obp: .352, slg: .490, hrRate: .04, bbRate: .06, kRate: .12 },
    currentProbabilities: { ...defaultProbabilities, DOUBLE: 0.08, SINGLE: 0.19, STRIKEOUT: 0.11 },
    imageUrl: 'https://i.ebayimg.com/images/g/3MMAAOSw-thh6J+Y/s-l1600.jpg',
  },
  {
    id: '9',
    name: 'David Ortiz',
    position: 'DH',
    stats: { ba: .286, obp: .380, slg: .552, hrRate: .07, bbRate: .13, kRate: .18 },
    currentProbabilities: { ...defaultProbabilities, HOMERUN: 0.08, WALK: 0.15, STRIKEOUT: 0.18 },
    imageUrl: 'https://i.ebayimg.com/images/g/2kMAAOSw1thh6J+S/s-l1600.jpg',
  },
];
