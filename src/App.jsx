import React, { useState } from 'react';
import PlayerSelection from './components/PlayerSelection';
import GameButton from './components/GameButton';
import ResultScreen from './components/ResultScreen';
import BustScreen from './components/BustScreen';
import Ranking from './components/Ranking';
import './styles/main.css';

function App() {
  const [player, setPlayer] = useState(null); // { playerName, team }
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('selection'); // 'selection', 'playing', 'finished', 'bust'

  const checkBust = (currentScore) => {
    const random = Math.random() * 100;
    return random < currentScore;
  };

  const handleAddPoint = () => {
    const newScore = score + 1;

    // Verificar si ocurre bust - NO actualizamos el score, perdió con el puntaje anterior
    if (checkBust(newScore)) {
      setGameState('bust');
    } else {
      setScore(newScore);
    }
  };

  const handleFinish = () => {
    setGameState('finished');
  };

  const handlePlayerSelected = (playerData) => {
    setPlayer(playerData);
    setGameState('playing');
  };

  const handleRestart = () => {
    setScore(0);
    setGameState('playing');
  };

  const handleTimeout = () => {
    // Auto-enviar cuando se acaba el tiempo
    handleFinish();
  };

  // Mostrar pantalla de selección si no hay jugador
  if (gameState === 'selection') {
    return (
      <div className="app">
        <PlayerSelection onPlayerSelected={handlePlayerSelected} />
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">🎯 Push Your Luck!</h1>
        <div className="player-info">
          <span className={`player-team team-${player.team.toLowerCase()}`}>
            {player.team}
          </span>
          <span className="player-name">{player.playerName}</span>
        </div>
      </header>

      <div className="app-container">
        <aside className="app-sidebar">
          <Ranking currentPlayer={player.playerName} />
        </aside>

        <main className="app-main">
          {gameState === 'playing' && (
            <GameButton 
              score={score}
              onAddPoint={handleAddPoint}
              onFinish={handleFinish}
              onTimeout={handleTimeout}
            />
          )}

          {gameState === 'finished' && (
            <ResultScreen 
              score={score}
              playerName={player.playerName}
              team={player.team}
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
      </div>

      <footer className="app-footer">
        <p>Desarrollado con ❤️ para el juego de alianzas</p>
      </footer>
    </div>
  );
}

export default App;
