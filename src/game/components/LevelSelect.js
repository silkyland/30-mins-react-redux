import React from 'react';
import { LEVELS } from '../levels/levelData';

const LevelSelect = ({ unlockedLevels, onSelectLevel, onBack }) => {
  return (
    <div className="level-select">
      <div className="level-select-header">
        <h1>Block Battle</h1>
        <p className="subtitle">Select Your Mission</p>
      </div>

      <div className="levels-grid">
        {LEVELS.map(level => {
          const isUnlocked = unlockedLevels.includes(level.id);
          return (
            <div
              key={level.id}
              className={`level-card ${!isUnlocked ? 'locked' : ''}`}
              onClick={() => isUnlocked && onSelectLevel(level)}
            >
              <div className="level-number">Level {level.id}</div>
              <h3 className="level-name">{level.name}</h3>
              <span className={`difficulty-badge difficulty-${level.difficulty.toLowerCase()}`}>
                {level.difficulty}
              </span>
              <p className="level-description">{level.description}</p>

              <div className="level-details">
                <div className="detail">
                  <span className="detail-label">Starting Gold:</span>
                  <span className="detail-value">${level.playerGold}</span>
                </div>
                <div className="detail">
                  <span className="detail-label">Enemy Waves:</span>
                  <span className="detail-value">{level.enemyWaves.length}</span>
                </div>
                <div className="detail">
                  <span className="detail-label">Units Available:</span>
                  <span className="detail-value">{level.availableUnits.length}</span>
                </div>
              </div>

              {!isUnlocked && (
                <div className="lock-overlay">
                  <span className="lock-icon">🔒</span>
                  <span>Complete previous level</span>
                </div>
              )}

              {isUnlocked && (
                <button className="play-button">
                  Play
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="level-select-footer">
        <button className="btn-secondary" onClick={onBack}>
          Back to Title
        </button>
      </div>
    </div>
  );
};

export default LevelSelect;
