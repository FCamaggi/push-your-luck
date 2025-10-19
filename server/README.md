# Backend Configuration

## Setup

1. Crea un archivo `.env` en la carpeta `server/`:

```
GROQ_API_KEY=tu-api-key-de-groq
PORT=3001
```

2. Instala dependencias:

```bash
cd server
npm install
```

3. Inicia el servidor:

```bash
npm run dev
```

## Lista de Participantes

Edita el array `validParticipants` en `server.js` con los nombres de todos los invitados.

## API Endpoints

- `GET /api/participants` - Obtener lista de participantes y equipos
- `POST /api/score` - Guardar/actualizar puntaje
- `GET /api/ranking` - Obtener top 10
- `GET /api/player/:name` - Obtener puntaje de un jugador
- `POST /api/reset` - Resetear todos los puntajes (requiere adminKey)
- `GET /health` - Estado del servidor

## Reset de Puntajes

Para resetear todos los puntajes:

```bash
curl -X POST http://localhost:3001/api/reset \
  -H "Content-Type: application/json" \
  -d '{"adminKey": "reset-cumpleanos-2025"}'
```
