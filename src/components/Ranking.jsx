import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';

const Ranking = ({ currentPlayer }) => {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRanking();
    // Actualizar ranking cada 10 segundos
    const interval = setInterval(loadRanking, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadRanking = async () => {
    try {
      const data = await api.getRanking();
      setRanking(data.ranking || []);
      setLoading(false);
    } catch (err) {
      console.error('Error al cargar ranking:', err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="ranking-widget">
        <h3>🏆 Top 10</h3>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="ranking-widget">
      <h3 className="ranking-title">🏆 Top 10</h3>
      
      {ranking.length === 0 ? (
        <p className="ranking-empty">Aún no hay puntajes</p>
      ) : (
        <div className="ranking-list">
          {ranking.map((entry) => (
            <div
              key={entry.playerName}
              className={`ranking-item ${currentPlayer === entry.playerName ? 'current-player' : ''}`}
            >
              <span className="ranking-position">#{entry.position}</span>
              <span className={`ranking-team team-${entry.team.toLowerCase()}`}>
                {entry.team}
              </span>
              <span className="ranking-name">{entry.playerName}</span>
              <span className="ranking-score">{entry.score}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Ranking;
