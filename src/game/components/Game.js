import React, { useState } from 'react';
import TitleScreen from './TitleScreen';
import LevelSelect from './LevelSelect';
import GameCanvas from './GameCanvas';
import { getLevelById } from '../levels/levelData';
import './Game.css';

const Game = () => {
  const [gameScreen, setGameScreen] = useState('title');
  const [unlockedLevels, setUnlockedLevels] = useState([1]); // Start with level 1 unlocked
  const [currentLevelId, setCurrentLevelId] = useState(null);

  const handleStart = () => {
    setGameScreen('levelSelect');
  };

  const handleSelectLevel = (level) => {
    setCurrentLevelId(level.id);
    setGameScreen('playing');
  };

  const handleLevelComplete = (level) => {
    // Unlock next level
    if (level.rewards.unlocksLevel && !unlockedLevels.includes(level.rewards.unlocksLevel)) {
      setUnlockedLevels([...unlockedLevels, level.rewards.unlocksLevel]);
    }
  };

  const handleBackToMenu = () => {
    setGameScreen('levelSelect');
  };

  const handleBackToTitle = () => {
    setGameScreen('title');
  };

  switch (gameScreen) {
    case 'title':
      return <TitleScreen onStart={handleStart} />;

    case 'levelSelect':
      return (
        <LevelSelect
          unlockedLevels={unlockedLevels}
          onSelectLevel={handleSelectLevel}
          onBack={handleBackToTitle}
        />
      );

    case 'playing':
      const level = getLevelById(currentLevelId);
      return (
        <GameCanvas
          key={currentLevelId}
          level={level}
          onLevelComplete={handleLevelComplete}
          onBack={handleBackToMenu}
        />
      );

    default:
      return <TitleScreen onStart={handleStart} />;
  }
};

export default Game;
