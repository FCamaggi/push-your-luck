import React, { useState } from 'react';
import GameButton from './components/GameButton';
import ResultScreen from './components/ResultScreen';
import BustScreen from './components/BustScreen';
import './styles/main.css';

function App() {
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('playing'); // 'playing', 'finished', 'bust'

  const checkBust = (currentScore) => {
    const random = Math.random() * 100;
    return random < currentScore;
  };

  const handleAddPoint = () => {
    const newScore = score + 1;
    
    // Verificar si ocurre bust ANTES de actualizar el score
    if (checkBust(newScore)) {
      setScore(newScore);
      setGameState('bust');
    } else {
      setScore(newScore);
    }
  };

  const handleFinish = () => {
    setGameState('finished');
  };

  const handleRestart = () => {
    setScore(0);
    setGameState('playing');
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">🎯 Push Your Luck!</h1>
        <p className="app-subtitle">¿Hasta dónde te atreves a llegar?</p>
      </header>

      <main className="app-main">
        {gameState === 'playing' && (
          <GameButton 
            score={score}
            onAddPoint={handleAddPoint}
            onFinish={handleFinish}
          />
        )}

        {gameState === 'finished' && (
          <ResultScreen 
            score={score}
            onRestart={handleRestart}
          />
        )}

        {gameState === 'bust' && (
          <BustScreen 
            score={score}
            onRestart={handleRestart}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>Desarrollado con ❤️ para el juego de alianzas</p>
      </footer>
    </div>
  );
}

export default App;
