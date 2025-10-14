import React, { useState } from 'react';
import { gameAudio } from '../utils/audio';

const GameButton = ({ score, onAddPoint, onFinish }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [particles, setParticles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const bustProbability = score;

  const handleClick = (e) => {
    // Prevenir doble disparo
    if (isProcessing) return;
    
    setIsProcessing(true);
    
    // Inicializar audio en el primer click
    gameAudio.init();
    
    // Efecto de presión
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);

    // Sonido con pitch progresivo
    gameAudio.playClickSound(score);

    // Crear partículas
    createParticles();

    // Ejecutar lógica del juego
    onAddPoint();
    
    // Permitir nuevo click después de un breve delay
    setTimeout(() => setIsProcessing(false), 200);
  };

  const createParticles = () => {
    const newParticles = [];
    const particleCount = 8;
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: Date.now() + i,
        angle: (360 / particleCount) * i,
      });
    }
    
    setParticles(newParticles);
    
    // Limpiar partículas después de la animación
    setTimeout(() => setParticles([]), 600);
  };

  const handleHover = () => {
    // Sonido de hover desactivado para evitar confusión con el click
    // gameAudio.playHoverSound();
  };

  const handleTouchStart = (e) => {
    // No hacer nada en touch start para evitar sonidos duplicados
  };

  return (
    <div className="game-screen">
      <div className="score-display">
        <h1 className="score-number">{score}</h1>
        <p className="score-label">Puntos</p>
      </div>

      <div className="probability-bar">
        <div 
          className="probability-fill" 
          style={{ width: `${bustProbability}%` }}
        />
        <span className="probability-text">
          {bustProbability}% de riesgo de BUST 💀
        </span>
      </div>

      <div className="button-container">
        <div className="main-button-wrapper">
          <button 
            className={`btn-round ${isPressed ? 'pressed' : ''} ${score > 50 ? 'danger-zone' : ''}`}
            onClick={handleClick}
            onMouseEnter={handleHover}
            onTouchStart={handleTouchStart}
            disabled={isProcessing}
          >
            <span className="btn-round-top">
              <span className="btn-icon">🎲</span>
            </span>
          </button>
          
          {/* Partículas */}
          <div className="particle-container">
            {particles.map(particle => (
              <div
                key={particle.id}
                className="particle"
                style={{
                  '--angle': `${particle.angle}deg`,
                }}
              />
            ))}
          </div>
        </div>
        
        {score > 0 && (
          <button 
            className="btn btn-secondary"
            onClick={onFinish}
            onMouseEnter={handleHover}
          >
            ✋ Finalizar Run
          </button>
        )}
      </div>

      <div className="instructions">
        <p>⚠️ Cada punto aumenta el riesgo de perderlo todo</p>
        <p>🎯 ¿Cuándo te detendrás?</p>
      </div>
    </div>
  );
};

export default GameButton;
