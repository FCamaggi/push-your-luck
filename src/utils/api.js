const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const api = {
  // Obtener participantes y equipos
  getParticipants: async () => {
    const response = await fetch(`${API_URL}/api/participants`);
    return response.json();
  },

  // Guardar puntaje
  saveScore: async (playerName, team, score) => {
    const response = await fetch(`${API_URL}/api/score`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        playerName,
        team,
        score,
        timestamp: new Date().toISOString(),
      }),
    });
    return response.json();
  },

  // Obtener ranking
  getRanking: async () => {
    const response = await fetch(`${API_URL}/api/ranking`);
    return response.json();
  },

  // Obtener puntaje de un jugador
  getPlayerScore: async (playerName) => {
    const response = await fetch(`${API_URL}/api/player/${playerName}`);
    return response.json();
  },
};
