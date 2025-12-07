// Level configurations for the game
// 3 Levels: Easy -> Medium -> Hard

export const LEVELS = [
  {
    id: 1,
    name: 'Tutorial Valley',
    difficulty: 'Easy',
    description: 'Learn the basics of combat',
    playerGold: 300,
    mapWidth: 800,
    mapHeight: 500,
    backgroundColor: '#90EE90', // Light green grass
    playerSpawnZone: { x: 50, y: 100, width: 150, height: 300 },
    enemySpawnZone: { x: 600, y: 100, width: 150, height: 300 },
    enemyWaves: [
      {
        delay: 2000,
        units: [
          { type: 'soldier', x: 700, y: 150 },
          { type: 'soldier', x: 700, y: 250 },
          { type: 'soldier', x: 700, y: 350 }
        ]
      },
      {
        delay: 8000,
        units: [
          { type: 'soldier', x: 720, y: 200 },
          { type: 'archer', x: 750, y: 300 }
        ]
      }
    ],
    availableUnits: ['soldier', 'archer'],
    winCondition: 'defeat_all',
    rewards: { gold: 100, unlocksLevel: 2 }
  },
  {
    id: 2,
    name: 'Dusty Plains',
    difficulty: 'Medium',
    description: 'Face cavalry and mixed forces',
    playerGold: 400,
    mapWidth: 800,
    mapHeight: 500,
    backgroundColor: '#D2B48C', // Tan/sandy
    playerSpawnZone: { x: 50, y: 100, width: 150, height: 300 },
    enemySpawnZone: { x: 600, y: 100, width: 150, height: 300 },
    enemyWaves: [
      {
        delay: 1500,
        units: [
          { type: 'soldier', x: 700, y: 150 },
          { type: 'soldier', x: 700, y: 250 },
          { type: 'horse', x: 720, y: 200 }
        ]
      },
      {
        delay: 7000,
        units: [
          { type: 'horse', x: 700, y: 150 },
          { type: 'horse', x: 700, y: 350 },
          { type: 'archer', x: 750, y: 250 }
        ]
      },
      {
        delay: 14000,
        units: [
          { type: 'tank', x: 720, y: 250 },
          { type: 'soldier', x: 700, y: 150 },
          { type: 'soldier', x: 700, y: 350 }
        ]
      }
    ],
    availableUnits: ['soldier', 'archer', 'horse'],
    winCondition: 'defeat_all',
    rewards: { gold: 200, unlocksLevel: 3 }
  },
  {
    id: 3,
    name: 'Iron Fortress',
    difficulty: 'Hard',
    description: 'Assault the enemy stronghold',
    playerGold: 500,
    mapWidth: 800,
    mapHeight: 500,
    backgroundColor: '#808080', // Gray stone
    playerSpawnZone: { x: 50, y: 100, width: 150, height: 300 },
    enemySpawnZone: { x: 600, y: 100, width: 150, height: 300 },
    enemyWaves: [
      {
        delay: 1000,
        units: [
          { type: 'soldier', x: 700, y: 150 },
          { type: 'soldier', x: 700, y: 250 },
          { type: 'soldier', x: 700, y: 350 },
          { type: 'archer', x: 750, y: 200 },
          { type: 'archer', x: 750, y: 300 }
        ]
      },
      {
        delay: 6000,
        units: [
          { type: 'tank', x: 700, y: 200 },
          { type: 'tank', x: 700, y: 300 },
          { type: 'horse', x: 720, y: 250 }
        ]
      },
      {
        delay: 12000,
        units: [
          { type: 'horse', x: 680, y: 150 },
          { type: 'horse', x: 680, y: 350 },
          { type: 'cannon', x: 750, y: 250 },
          { type: 'archer', x: 760, y: 180 },
          { type: 'archer', x: 760, y: 320 }
        ]
      },
      {
        delay: 20000,
        units: [
          { type: 'tank', x: 700, y: 150 },
          { type: 'tank', x: 700, y: 250 },
          { type: 'tank', x: 700, y: 350 },
          { type: 'cannon', x: 750, y: 200 },
          { type: 'cannon', x: 750, y: 300 }
        ]
      }
    ],
    availableUnits: ['soldier', 'archer', 'horse', 'tank', 'cannon'],
    winCondition: 'defeat_all',
    rewards: { gold: 500, unlocksLevel: null }
  }
];

export function getLevelById(id) {
  return LEVELS.find(level => level.id === id);
}
