// Level configurations for the Grid Battle game
// 3 Levels: Easy -> Medium -> Hard

export const LEVELS = [
  {
    id: 1,
    name: 'Coastal Clash',
    difficulty: 'Easy',
    description: 'Capture the island',
    playerGold: 100, // Starting gold
    goldPerSecond: 1, // Passive income
    gridWidth: 10,
    gridHeight: 12,
    tileSize: 40, // Pixels per tile
    // Map layout: . = Land, W = Water, P = Player Base, E = Enemy Base
    layout: [
      'W W W W W W W W W W',
      'W E . . . . . . W W',
      'W . . . . . . . . W',
      'W . . W W . . . . W',
      'W . . W W . . . . W',
      'W . . . . . . . . W',
      'W . . . . . . . . W',
      'W . . W W . . . . W',
      'W . . W W . . . . W',
      'W . . . . . . . . W',
      'W . . . . . . P W W',
      'W W W W W W W W W W'
    ],
    initialUnits: [],
    availableUnits: ['soldier', 'archer'],
    winCondition: 'destroy_base',
    rewards: { unlocksLevel: 2 }
  },
  {
    id: 2,
    name: 'River Crossing',
    difficulty: 'Medium',
    description: 'Bridge the gap',
    playerGold: 150,
    goldPerSecond: 2,
    gridWidth: 12,
    gridHeight: 14,
    tileSize: 35,
    layout: [
      'E . . . W W . . . . . E',
      '. . . . W W . . . . . .',
      '. . . . W W . . . . . .',
      '. . . . W W . . . . . .',
      '. . . . . . . . . . . .', // Land bridge
      '. . . . . . . . . . . .',
      'W W W W W W W W W W W W',
      '. . . . . . . . . . . .',
      '. . . . . . . . . . . .',
      '. . . . W W . . . . . .',
      '. . . . W W . . . . . .',
      '. . . . W W . . . . . .',
      'P . . . W W . . . . . P',
      '. . . . W W . . . . . .'
    ],
    availableUnits: ['soldier', 'archer', 'horse'],
    winCondition: 'destroy_base',
    rewards: { unlocksLevel: 3 }
  },
  {
    id: 3,
    name: 'Fortress Siege',
    difficulty: 'Hard',
    description: 'Storm the castle',
    playerGold: 200,
    goldPerSecond: 3,
    gridWidth: 14,
    gridHeight: 16,
    tileSize: 30,
    layout: [
      'W W W E E E W W W W W W W W',
      'W . . . . . . . . . . . . W',
      'W . W W . W W . W W . . . W',
      'W . W W . W W . W W . . . W',
      'W . . . . . . . . . . . . W',
      'W . . . . . . . . . . . . W',
      'W . . . . . . . . . . . . W',
      'W . . W W W W W W . . . . W',
      'W . . . . . . . . . . . . W',
      'W . . . . . . . . . . . . W',
      'W . . . . . . . . . . . . W',
      'W . W W . W W . W W . . . W',
      'W . W W . W W . W W . . . W',
      'W . . . . . . . . . . . . W',
      'W W W P P P W W W W W W W W',
      'W W W W W W W W W W W W W W'
    ],
    availableUnits: ['soldier', 'archer', 'horse', 'tank', 'cannon'],
    winCondition: 'destroy_base',
    rewards: { unlocksLevel: null }
  }
];

export function getLevelById(id) {
  return LEVELS.find(level => level.id === id);
}
