// Unit Types and their properties
// All units are represented as colored blocks

export const UNIT_TYPES = {
  TANK: 'tank',
  HORSE: 'horse',
  SOLDIER: 'soldier',
  ARCHER: 'archer',
  CANNON: 'cannon'
};

export const UNIT_COLORS = {
  // Player units (blue team)
  player: {
    tank: '#2563eb',      // Blue
    horse: '#7c3aed',     // Purple
    soldier: '#059669',   // Green
    archer: '#d97706',    // Orange
    cannon: '#dc2626'     // Red
  },
  // Enemy units (red team)
  enemy: {
    tank: '#991b1b',      // Dark Red
    horse: '#7c2d12',     // Brown
    soldier: '#4a044e',   // Dark Purple
    archer: '#1e3a5f',    // Dark Blue
    cannon: '#374151'     // Gray
  }
};

export const UNIT_STATS = {
  tank: {
    name: 'Tank',
    health: 150,
    attack: 25,
    defense: 20,
    speed: 1,
    range: 1,
    size: 40,
    cost: 100,
    description: 'Heavy armored unit. Slow but powerful.'
  },
  horse: {
    name: 'Horse',
    health: 80,
    attack: 20,
    defense: 8,
    speed: 4,
    range: 1,
    size: 35,
    cost: 75,
    description: 'Fast cavalry unit. Great for flanking.'
  },
  soldier: {
    name: 'Soldier',
    health: 100,
    attack: 15,
    defense: 12,
    speed: 2,
    range: 1,
    size: 30,
    cost: 50,
    description: 'Basic infantry unit. Balanced stats.'
  },
  archer: {
    name: 'Archer',
    health: 60,
    attack: 18,
    defense: 5,
    speed: 2,
    range: 4,
    size: 28,
    cost: 60,
    description: 'Ranged unit. Attacks from distance.'
  },
  cannon: {
    name: 'Cannon',
    health: 70,
    attack: 40,
    defense: 3,
    speed: 0.5,
    range: 5,
    size: 45,
    cost: 120,
    description: 'Artillery unit. High damage, very slow.'
  }
};

// Create a new unit instance
export function createUnit(type, team, x, y) {
  const stats = UNIT_STATS[type];
  const colors = UNIT_COLORS[team];

  return {
    id: `${team}-${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    team,
    x,
    y,
    targetX: x,
    targetY: y,
    health: stats.health,
    maxHealth: stats.health,
    attack: stats.attack,
    defense: stats.defense,
    speed: stats.speed,
    range: stats.range,
    size: stats.size,
    color: colors[type],
    isMoving: false,
    isAttacking: false,
    target: null,
    cooldown: 0,
    attackCooldown: 60 // frames between attacks
  };
}
