import React, { useEffect, useState } from 'react';
import { gameAudio } from '../utils/audio';
import { api } from '../utils/api';

const ResultScreen = ({ score, playerName, team, onRestart }) => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Reproducir sonido de victoria al mostrar la pantalla
    gameAudio.playVictorySound();
  }, []);

  const handleSendScore = async () => {
    setSending(true);
    try {
      const result = await api.saveScore(playerName, team, score);
      setSent(true);
      setMessage(result.message);
      gameAudio.playVictorySound();
    } catch (error) {
      console.error('Error al enviar puntaje:', error);
      setMessage('Error al enviar el puntaje. Intenta de nuevo.');
    } finally {
      setSending(false);
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
        {!sent ? (
          <button 
            className="btn btn-share" 
            onClick={handleSendScore}
            disabled={sending}
          >
            {sending ? '� Enviando...' : '📤 Enviar Puntuación'}
          </button>
        ) : (
          <div className="sent-message">
            ✅ {message}
          </div>
        )}

        <button className="btn btn-secondary" onClick={onRestart}>
          🔄 Jugar de Nuevo
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
