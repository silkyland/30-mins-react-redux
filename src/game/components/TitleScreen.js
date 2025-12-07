import React from 'react';

const TitleScreen = ({ onStart }) => {
  return (
    <div className="title-screen">
      <div className="title-content">
        <div className="game-logo">
          <div className="logo-blocks">
            <div className="block block-blue">T</div>
            <div className="block block-purple">H</div>
            <div className="block block-green">S</div>
            <div className="block block-orange">A</div>
          </div>
        </div>

        <h1 className="game-title">Block Battle</h1>
        <p className="game-tagline">Command Your Army. Conquer the Battlefield.</p>

        <div className="title-buttons">
          <button className="btn-primary btn-large" onClick={onStart}>
            Start Game
          </button>
        </div>

        <div className="game-info">
          <div className="info-section">
            <h3>How to Play</h3>
            <ul>
              <li>Deploy units using your gold</li>
              <li>Units automatically attack enemies</li>
              <li>Click to select, right-click to move</li>
              <li>Defeat all enemy waves to win!</li>
            </ul>
          </div>

          <div className="info-section">
            <h3>Unit Types</h3>
            <div className="unit-preview">
              <div className="preview-item">
                <div className="preview-block" style={{backgroundColor: '#2563eb'}}>T</div>
                <span>Tank - Heavy armor</span>
              </div>
              <div className="preview-item">
                <div className="preview-block" style={{backgroundColor: '#7c3aed'}}>H</div>
                <span>Horse - Fast cavalry</span>
              </div>
              <div className="preview-item">
                <div className="preview-block" style={{backgroundColor: '#059669'}}>S</div>
                <span>Soldier - Balanced</span>
              </div>
              <div className="preview-item">
                <div className="preview-block" style={{backgroundColor: '#d97706'}}>A</div>
                <span>Archer - Ranged</span>
              </div>
            </div>
          </div>
        </div>

        <div className="credits">
          <p>Made with React + Canvas</p>
        </div>
      </div>
    </div>
  );
};

export default TitleScreen;
