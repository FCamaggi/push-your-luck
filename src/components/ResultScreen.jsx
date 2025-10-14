import React, { useEffect } from 'react';
import { captureScreenshot } from '../utils/screenshot';
import { gameAudio } from '../utils/audio';

const ResultScreen = ({ score, onRestart }) => {
  useEffect(() => {
    // Reproducir sonido de victoria al mostrar la pantalla
    gameAudio.playVictorySound();
  }, []);

  const handleShare = async () => {
    try {
      await captureScreenshot('result-screen');
    } catch (error) {
      console.error('Error al capturar screenshot:', error);
      alert('Hubo un error al capturar la imagen. Intenta de nuevo.');
    }
  };

  return (
    <div className="result-screen-wrapper">
      <div className="result-screen" id="result-screen">
        <div className="result-content">
          <h1 className="result-title celebrate">🎉 ¡Felicitaciones!</h1>
          <p className="result-message">
            Te detuviste a tiempo y aseguraste tu puntuación
          </p>

          <div className="final-score">
            <div className="score-badge">
              <span className="score-value">{score}</span>
              <span className="score-text">Puntos</span>
            </div>
          </div>

          <div className="result-message-secondary">
            <p>🏆 Comparte tu resultado</p>
          </div>
        </div>
      </div>

      {/* Botones fuera del área de captura */}
      <div className="result-actions">
        <button className="btn btn-share" onClick={handleShare}>
          📸 Compartir mi Puntuación
        </button>

        <button className="btn btn-secondary" onClick={onRestart}>
          🔄 Jugar de Nuevo
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
