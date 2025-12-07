// Game Engine - handles all game logic, rendering, and physics

import { createUnit, UNIT_STATS } from './units';

export class GameEngine {
  constructor(canvas, level, onGameStateChange) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.level = level;
    this.onGameStateChange = onGameStateChange;

    // Game state
    this.playerUnits = [];
    this.enemyUnits = [];
    this.gold = level.playerGold;
    this.selectedUnit = null;
    this.gameStatus = 'playing'; // 'playing', 'won', 'lost'
    this.currentWaveIndex = 0;
    this.waveSpawned = new Set();
    this.startTime = Date.now();
    this.isPaused = false;

    // Animation
    this.animationId = null;
    this.lastTime = 0;

    // Bind methods
    this.gameLoop = this.gameLoop.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);

    // Setup event listeners
    this.canvas.addEventListener('click', this.handleClick);
    this.canvas.addEventListener('contextmenu', this.handleRightClick);
  }

  start() {
    this.lastTime = performance.now();
    this.gameLoop();
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.canvas.removeEventListener('click', this.handleClick);
    this.canvas.removeEventListener('contextmenu', this.handleRightClick);
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
  }

  gameLoop(currentTime = 0) {
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    if (!this.isPaused && this.gameStatus === 'playing') {
      this.update(deltaTime);
      this.checkWaveSpawns();
      this.checkWinCondition();
    }

    this.render();

    this.animationId = requestAnimationFrame(this.gameLoop);
  }

  update(deltaTime) {
    // Update all units
    [...this.playerUnits, ...this.enemyUnits].forEach(unit => {
      this.updateUnit(unit, deltaTime);
    });

    // Remove dead units
    this.playerUnits = this.playerUnits.filter(u => u.health > 0);
    this.enemyUnits = this.enemyUnits.filter(u => u.health > 0);

    // Notify state change
    this.onGameStateChange({
      gold: this.gold,
      playerUnits: this.playerUnits.length,
      enemyUnits: this.enemyUnits.length,
      gameStatus: this.gameStatus
    });
  }

  updateUnit(unit, deltaTime) {
    // Decrease cooldown
    if (unit.cooldown > 0) {
      unit.cooldown--;
    }

    // Find target
    const enemies = unit.team === 'player' ? this.enemyUnits : this.playerUnits;
    const target = this.findNearestEnemy(unit, enemies);

    if (target) {
      const distance = this.getDistance(unit, target);
      const attackRange = unit.range * 50; // Convert range to pixels

      if (distance <= attackRange) {
        // In range - attack
        unit.isMoving = false;
        if (unit.cooldown <= 0) {
          this.attack(unit, target);
          unit.cooldown = unit.attackCooldown;
        }
      } else {
        // Move towards target
        unit.isMoving = true;
        this.moveTowards(unit, target, deltaTime);
      }
    } else {
      // No target, move to default position
      if (unit.team === 'player' && unit.x < this.level.mapWidth * 0.6) {
        unit.targetX = unit.x + unit.speed * 2;
        this.moveTowards(unit, { x: unit.targetX, y: unit.y }, deltaTime);
      } else if (unit.team === 'enemy' && unit.x > this.level.mapWidth * 0.4) {
        unit.targetX = unit.x - unit.speed * 2;
        this.moveTowards(unit, { x: unit.targetX, y: unit.y }, deltaTime);
      }
    }
  }

  findNearestEnemy(unit, enemies) {
    if (enemies.length === 0) return null;

    let nearest = null;
    let minDistance = Infinity;

    enemies.forEach(enemy => {
      const distance = this.getDistance(unit, enemy);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = enemy;
      }
    });

    return nearest;
  }

  getDistance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  moveTowards(unit, target, deltaTime) {
    const dx = target.x - unit.x;
    const dy = target.y - unit.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 5) {
      const speed = unit.speed * (deltaTime / 16); // Normalize speed
      unit.x += (dx / distance) * speed;
      unit.y += (dy / distance) * speed;
    }
  }

  attack(attacker, defender) {
    const damage = Math.max(1, attacker.attack - defender.defense / 2);
    defender.health -= damage;
    attacker.isAttacking = true;

    // Reset attacking animation after a short delay
    setTimeout(() => {
      attacker.isAttacking = false;
    }, 200);
  }

  checkWaveSpawns() {
    const elapsed = Date.now() - this.startTime;

    this.level.enemyWaves.forEach((wave, index) => {
      if (!this.waveSpawned.has(index) && elapsed >= wave.delay) {
        this.spawnWave(wave);
        this.waveSpawned.add(index);
      }
    });
  }

  spawnWave(wave) {
    wave.units.forEach(unitConfig => {
      const unit = createUnit(unitConfig.type, 'enemy', unitConfig.x, unitConfig.y);
      this.enemyUnits.push(unit);
    });
  }

  checkWinCondition() {
    // Check if all waves have spawned and all enemies are dead
    const allWavesSpawned = this.waveSpawned.size === this.level.enemyWaves.length;
    const allEnemiesDead = this.enemyUnits.length === 0;

    if (allWavesSpawned && allEnemiesDead && this.playerUnits.length > 0) {
      this.gameStatus = 'won';
    }

    // Check if all player units are dead
    if (this.playerUnits.length === 0 && this.waveSpawned.size > 0) {
      this.gameStatus = 'lost';
    }
  }

  spawnPlayerUnit(unitType) {
    const stats = UNIT_STATS[unitType];
    if (this.gold < stats.cost) {
      return false;
    }

    this.gold -= stats.cost;

    const spawnZone = this.level.playerSpawnZone;
    const x = spawnZone.x + Math.random() * spawnZone.width;
    const y = spawnZone.y + Math.random() * spawnZone.height;

    const unit = createUnit(unitType, 'player', x, y);
    this.playerUnits.push(unit);

    return true;
  }

  handleClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicked on a player unit
    const clickedUnit = this.playerUnits.find(unit => {
      const dx = unit.x - x;
      const dy = unit.y - y;
      return Math.sqrt(dx * dx + dy * dy) < unit.size / 2;
    });

    if (clickedUnit) {
      this.selectedUnit = clickedUnit;
    } else {
      this.selectedUnit = null;
    }
  }

  handleRightClick(e) {
    e.preventDefault();

    if (!this.selectedUnit) return;

    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Move selected unit to clicked position
    this.selectedUnit.targetX = x;
    this.selectedUnit.targetY = y;
  }

  render() {
    const ctx = this.ctx;

    // Clear canvas
    ctx.fillStyle = this.level.backgroundColor;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw spawn zones
    this.drawSpawnZone(this.level.playerSpawnZone, 'rgba(0, 100, 255, 0.2)');
    this.drawSpawnZone(this.level.enemySpawnZone, 'rgba(255, 0, 0, 0.2)');

    // Draw grid lines (subtle)
    this.drawGrid();

    // Draw all units
    this.playerUnits.forEach(unit => this.drawUnit(unit));
    this.enemyUnits.forEach(unit => this.drawUnit(unit));

    // Draw selection indicator
    if (this.selectedUnit) {
      this.drawSelection(this.selectedUnit);
    }

    // Draw game status overlay
    if (this.gameStatus !== 'playing') {
      this.drawGameOverlay();
    }
  }

  drawSpawnZone(zone, color) {
    const ctx = this.ctx;
    ctx.fillStyle = color;
    ctx.fillRect(zone.x, zone.y, zone.width, zone.height);
    ctx.strokeStyle = color.replace('0.2', '0.5');
    ctx.lineWidth = 2;
    ctx.strokeRect(zone.x, zone.y, zone.width, zone.height);
  }

  drawGrid() {
    const ctx = this.ctx;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 1;

    for (let x = 0; x < this.canvas.width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.canvas.height);
      ctx.stroke();
    }

    for (let y = 0; y < this.canvas.height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.canvas.width, y);
      ctx.stroke();
    }
  }

  drawUnit(unit) {
    const ctx = this.ctx;
    const halfSize = unit.size / 2;

    // Draw shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(unit.x + 3, unit.y + unit.size / 2 + 3, halfSize * 0.8, halfSize * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Draw unit body (block)
    ctx.fillStyle = unit.color;
    ctx.fillRect(unit.x - halfSize, unit.y - halfSize, unit.size, unit.size);

    // Draw border
    ctx.strokeStyle = unit.team === 'player' ? '#1e40af' : '#7f1d1d';
    ctx.lineWidth = 3;
    ctx.strokeRect(unit.x - halfSize, unit.y - halfSize, unit.size, unit.size);

    // Draw unit type indicator
    ctx.fillStyle = '#fff';
    ctx.font = `bold ${unit.size * 0.4}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const typeInitial = unit.type.charAt(0).toUpperCase();
    ctx.fillText(typeInitial, unit.x, unit.y);

    // Draw health bar
    const healthBarWidth = unit.size;
    const healthBarHeight = 6;
    const healthPercent = unit.health / unit.maxHealth;

    ctx.fillStyle = '#333';
    ctx.fillRect(unit.x - halfSize, unit.y - halfSize - 12, healthBarWidth, healthBarHeight);

    ctx.fillStyle = healthPercent > 0.5 ? '#22c55e' : healthPercent > 0.25 ? '#f59e0b' : '#ef4444';
    ctx.fillRect(unit.x - halfSize, unit.y - halfSize - 12, healthBarWidth * healthPercent, healthBarHeight);

    // Draw attack animation
    if (unit.isAttacking) {
      ctx.strokeStyle = '#ff0';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(unit.x, unit.y, unit.size * 0.8, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  drawSelection(unit) {
    const ctx = this.ctx;
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(unit.x - unit.size / 2 - 5, unit.y - unit.size / 2 - 5, unit.size + 10, unit.size + 10);
    ctx.setLineDash([]);
  }

  drawGameOverlay() {
    const ctx = this.ctx;

    // Semi-transparent overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Game status text
    ctx.fillStyle = this.gameStatus === 'won' ? '#22c55e' : '#ef4444';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const text = this.gameStatus === 'won' ? 'VICTORY!' : 'DEFEATED!';
    ctx.fillText(text, this.canvas.width / 2, this.canvas.height / 2);

    ctx.fillStyle = '#fff';
    ctx.font = '24px Arial';
    ctx.fillText('Click "Back to Menu" to continue', this.canvas.width / 2, this.canvas.height / 2 + 50);
  }
}
