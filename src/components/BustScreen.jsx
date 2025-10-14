import React, { useEffect } from 'react';
import { gameAudio } from '../utils/audio';

const BustScreen = ({ score, onRestart }) => {
  useEffect(() => {
    // Reproducir sonido de bust al mostrar la pantalla
    gameAudio.playBustSound();
  }, []);

  return (
    <div className="bust-screen">
      <div className="bust-content shake-hard">
        <div className="bust-icon">💀</div>
        <h1 className="bust-title">¡BUST!</h1>
        <p className="bust-message">Tu ambición fue demasiado...</p>

        <div className="lost-score">
          <p className="lost-label">Perdiste</p>
          <p className="lost-value">{score} puntos</p>
        </div>

        <div className="bust-quote">
          <p>"La avaricia rompe el saco"</p>
        </div>

        <button className="btn btn-restart" onClick={onRestart}>
          🔄 Intentar de Nuevo
        </button>
      </div>
    </div>
  );
};

export default BustScreen;
