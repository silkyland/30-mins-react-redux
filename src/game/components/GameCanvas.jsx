import React, { useEffect, useRef, useState } from 'react';
import { GameEngine } from '../engine/GameEngine';
import { UNIT_STATS, UNIT_COLORS } from '../engine/units';

const GameCanvas = ({ level, onLevelComplete, onBack }) => {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const [gameState, setGameState] = useState({
    gold: level.playerGold,
    playerUnits: 0,
    enemyUnits: 0,
    gameStatus: 'playing'
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = level.mapWidth;
    canvas.height = level.mapHeight;

    const handleGameStateChange = (state) => {
      setGameState(state);
      if (state.gameStatus === 'won') {
        onLevelComplete(level);
      }
    };

    engineRef.current = new GameEngine(canvas, level, handleGameStateChange);
    engineRef.current.start();

    return () => {
      if (engineRef.current) {
        engineRef.current.stop();
      }
    };
  }, [level, onLevelComplete]);

  const handleSpawnUnit = (unitType) => {
    if (engineRef.current) {
      engineRef.current.spawnPlayerUnit(unitType);
    }
  };

  const { gold, playerUnits, enemyUnits, gameStatus } = gameState;
  const availableUnits = level.availableUnits;

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="level-info">
          <h2>{level.name}</h2>
          <span className={`difficulty difficulty-${level.difficulty.toLowerCase()}`}>
            {level.difficulty}
          </span>
        </div>
        <div className="game-stats">
          <div className="stat gold">
            <span className="stat-icon">$</span>
            <span className="stat-value">{gold}</span>
          </div>
          <div className="stat units">
            <span className="stat-label">Units:</span>
            <span className="stat-value player">{playerUnits}</span>
            <span className="stat-vs">vs</span>
            <span className="stat-value enemy">{enemyUnits}</span>
          </div>
        </div>
        <button className="btn-back" onClick={onBack}>
          Back to Menu
        </button>
      </div>

      <div className="game-main">
        <canvas
          ref={canvasRef}
          className="game-canvas"
        />

        <div className="unit-panel">
          <h3>Deploy Units</h3>
          <div className="unit-list">
            {availableUnits.map(unitType => {
              const stats = UNIT_STATS[unitType];
              const canAfford = gold >= stats.cost;
              return (
                <button
                  key={unitType}
                  className={`unit-button ${!canAfford ? 'disabled' : ''}`}
                  onClick={() => handleSpawnUnit(unitType)}
                  disabled={!canAfford || gameStatus !== 'playing'}
                  style={{
                    borderColor: UNIT_COLORS.player[unitType]
                  }}
                >
                  <div
                    className="unit-icon"
                    style={{ backgroundColor: UNIT_COLORS.player[unitType] }}
                  >
                    {unitType.charAt(0).toUpperCase()}
                  </div>
                  <div className="unit-info">
                    <div className="unit-name">{stats.name}</div>
                    <div className="unit-cost">${stats.cost}</div>
                  </div>
                  <div className="unit-stats-mini">
                    <span title="Attack">ATK: {stats.attack}</span>
                    <span title="Health">HP: {stats.health}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="unit-legend">
            <h4>Legend</h4>
            <p><strong>T</strong> - Tank (Slow, High HP)</p>
            <p><strong>H</strong> - Horse (Fast)</p>
            <p><strong>S</strong> - Soldier (Balanced)</p>
            <p><strong>A</strong> - Archer (Ranged)</p>
            <p><strong>C</strong> - Cannon (Artillery)</p>
          </div>

          <div className="controls-help">
            <h4>Controls</h4>
            <p>Click unit to select</p>
            <p>Right-click to move</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCanvas;
