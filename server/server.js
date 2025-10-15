import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Archivo para persistencia
const SCORES_FILE = path.join(__dirname, 'scores.json');

// Base de datos en memoria
let scores = [];

// Cargar puntajes desde archivo al iniciar
async function loadScores() {
  try {
    const data = await fs.readFile(SCORES_FILE, 'utf8');
    scores = JSON.parse(data);
    console.log(`✅ Cargados ${scores.length} puntajes desde archivo`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('📝 Creando nuevo archivo de puntajes...');
      await saveScores();
    } else {
      console.error('Error al cargar puntajes:', error);
    }
  }
}

// Guardar puntajes en archivo
async function saveScores() {
  try {
    await fs.writeFile(SCORES_FILE, JSON.stringify(scores, null, 2));
  } catch (error) {
    console.error('Error al guardar puntajes:', error);
  }
}

// Lista de participantes por equipo
const equipoRojo = [
  'Raffaella', 'Javivi', 'Monserrat', 'Antonia', 'Fernanda',
  'Matias', 'Catalina', 'Nicolás', 'Francisca', 'Diego',
  'Mariagrazia', 'Tomas', 'Fiorenza', 'Diane', 'Francisco'
];

const equipoAzul = [
  'Ignacio', 'Christopher', 'Ignacia', 'Anais', 'Gabriel',
  'Ailin', 'Lukas', 'Renato', 'Valentina', 'Alexa',
  'Fabrizzio', 'Vico', 'Loreto', 'Karla', 'Jo', 'Ayna'
];

const validParticipants = [...equipoRojo, ...equipoAzul];

const teams = ['Rojo', 'Azul'];

// Mapeo de jugador a equipo
const playerToTeam = {};
equipoRojo.forEach(player => playerToTeam[player] = 'Rojo');
equipoAzul.forEach(player => playerToTeam[player] = 'Azul');

// Rutas

// Obtener lista de participantes con su equipo asignado
app.get('/api/participants', (req, res) => {
  const participantsWithTeams = validParticipants.map(name => ({
    name,
    team: playerToTeam[name]
  }));
  res.json({ 
    participants: participantsWithTeams,
    teams 
  });
});

// Guardar o actualizar puntaje
app.post('/api/score', async (req, res) => {
  const { playerName, team, score, timestamp } = req.body;

  // Validar datos
  if (!playerName || !team || score === undefined) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  if (!validParticipants.includes(playerName)) {
    return res.status(403).json({ error: 'Jugador no válido' });
  }

  // Validar que el equipo corresponda al jugador
  if (playerToTeam[playerName] !== team) {
    return res.status(400).json({ 
      error: `${playerName} pertenece al equipo ${playerToTeam[playerName]}` 
    });
  }

  // Buscar si el jugador ya tiene un puntaje
  const existingIndex = scores.findIndex(s => s.playerName === playerName);

  if (existingIndex !== -1) {
    // Actualizar solo si el nuevo puntaje es mayor
    if (score > scores[existingIndex].score) {
      scores[existingIndex] = {
        playerName,
        team,
        score,
        timestamp: timestamp || new Date().toISOString()
      };
      await saveScores();
      return res.json({ 
        message: 'Puntaje actualizado (nuevo récord personal)',
        isNewRecord: true,
        score 
      });
    } else {
      return res.json({ 
        message: 'Puntaje no actualizado (ya tienes uno mayor)',
        isNewRecord: false,
        currentBest: scores[existingIndex].score
      });
    }
  } else {
    // Agregar nuevo puntaje
    scores.push({
      playerName,
      team,
      score,
      timestamp: timestamp || new Date().toISOString()
    });
    await saveScores();
    return res.json({ 
      message: 'Puntaje guardado',
      isNewRecord: true,
      score 
    });
  }
});

// Obtener ranking (top 10)
app.get('/api/ranking', (req, res) => {
  const ranking = [...scores]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map((entry, index) => ({
      position: index + 1,
      ...entry
    }));

  res.json({ ranking });
});

// Obtener puntaje de un jugador específico
app.get('/api/player/:name', (req, res) => {
  const { name } = req.params;
  const playerScore = scores.find(s => s.playerName === name);

  if (playerScore) {
    res.json({ found: true, ...playerScore });
  } else {
    res.json({ found: false, playerName: name });
  }
});

// Resetear todos los puntajes (solo para admin)
app.post('/api/reset', async (req, res) => {
  const { adminKey } = req.body;
  
  if (adminKey === 'reset-cumpleanos-2025') {
    scores = [];
    await saveScores();
    res.json({ message: 'Todos los puntajes han sido reseteados' });
  } else {
    res.status(403).json({ error: 'No autorizado' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    totalPlayers: scores.length 
  });
});

// Iniciar servidor
async function startServer() {
  await loadScores();
  
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📊 Participantes válidos: ${validParticipants.length}`);
    console.log(`   - Equipo Rojo: ${equipoRojo.length} jugadores`);
    console.log(`   - Equipo Azul: ${equipoAzul.length} jugadores`);
    console.log(`🎮 ¡Listo para recibir puntajes!`);
  });
}

startServer().catch(console.error);
