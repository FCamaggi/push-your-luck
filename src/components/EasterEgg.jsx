import React, { useState, useEffect } from 'react';
import '../styles/easterEgg.css';

const EasterEgg = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const easterEggId = 'LUCKY777';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(easterEggId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    // Confetti effect
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        document.querySelector('.easter-egg-overlay')?.appendChild(confetti);
      }, i * 30);
    }
  }, []);

  return (
    <div className="easter-egg-overlay" onClick={onClose}>
      <div className="easter-egg-content" onClick={(e) => e.stopPropagation()}>
        <div className="easter-egg-header">
          <h1 className="easter-egg-title">🎉 ¡EASTER EGG ENCONTRADO! 🎉</h1>
          <button className="easter-egg-close" onClick={onClose}>×</button>
        </div>

        <div className="easter-egg-body">
          <div className="easter-egg-trophy">🏆</div>
          
          <h2 className="easter-egg-subtitle">¡Felicitaciones, explorador!</h2>
          
          <div className="easter-egg-reward">
            <div className="reward-badge">+3 PUNTOS</div>
          </div>

          <div className="easter-egg-instructions">
            <h3>📸 Para reclamar tu recompensa:</h3>
            <ol>
              <li>Toma un screenshot de esta pantalla</li>
              <li>Envíala por el grupo de WhatsApp</li>
              <li>Usa el código de verificación</li>
            </ol>
          </div>

          <div className="easter-egg-code">
            <p className="code-label">Código de verificación:</p>
            <div className="code-box">
              <span className="code-value">{easterEggId}</span>
              <button 
                className={`code-copy-btn ${copied ? 'copied' : ''}`}
                onClick={handleCopyCode}
              >
                {copied ? '✓ Copiado' : '📋 Copiar'}
              </button>
            </div>
          </div>

          <div className="easter-egg-footer">
            <p className="footer-text">
              ⚠️ Solo válido para el primer screenshot enviado con este código
            </p>
            <p className="footer-hint">
              💡 Pista: ¿Qué más podrías explorar en esta página?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EasterEgg;
