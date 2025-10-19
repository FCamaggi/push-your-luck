import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';

const PlayerSelection = ({ onPlayerSelected }) => {
  const [participants, setParticipants] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedName, setSelectedName] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadParticipants();
  }, []);

  const loadParticipants = async () => {
    try {
      const data = await api.getParticipants();
      setParticipants(data.participants || []);
      setTeams(data.teams || []);
      setLoading(false);
    } catch (err) {
      setError(
        'Error al cargar participantes. Verifica que el servidor esté corriendo.'
      );
      setLoading(false);
    }
  };

  const handleNameChange = (name) => {
    setSelectedName(name);
    setError('');

    // Auto-seleccionar el equipo del jugador
    const participant = participants.find((p) => p.name === name);
    if (participant) {
      setSelectedTeam(participant.team);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedName || !selectedTeam) {
      setError('Por favor selecciona tu nombre');
      return;
    }

    onPlayerSelected({
      playerName: selectedName,
      team: selectedTeam,
    });
  };

  if (loading) {
    return (
      <div className="player-selection">
        <div className="selection-content">
          <h2>Cargando...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="player-selection">
      <div className="selection-content">
        <h1 className="selection-title">🎯 Push Your Luck!</h1>
        <p className="selection-subtitle">Selecciona tu jugador y equipo</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="selection-form">
          <div className="form-group">
            <label htmlFor="player-name">Tu Nombre</label>
            <select
              id="player-name"
              value={selectedName}
              onChange={(e) => handleNameChange(e.target.value)}
              className="form-select"
            >
              <option value="">-- Selecciona tu nombre --</option>
              {participants.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name} - Equipo {p.team}
                </option>
              ))}
            </select>
          </div>

          {selectedTeam && (
            <div className="form-group">
              <label>Tu Equipo</label>
              <div className="team-display">
                <div
                  className={`team-badge team-${selectedTeam.toLowerCase()}`}
                >
                  Equipo {selectedTeam}
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-start"
            disabled={!selectedName || !selectedTeam}
          >
            🎮 Comenzar a Jugar
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlayerSelection;
