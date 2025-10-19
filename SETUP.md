# 🎯 Push Your Luck - Versión con Servidor

## 🚀 Configuración e Instalación

### 1. Configurar el Backend

```bash
# Ir a la carpeta del servidor
cd server

# Instalar dependencias
npm install

# Crear archivo .env (copia desde .env.example)
cp .env.example .env

# Editar .env y agregar tu API key de Groq (opcional para esta versión)
nano .env
```

### 2. Editar Lista de Participantes

Abre `server/server.js` y modifica el array `validParticipants` con los nombres de todos los invitados:

```javascript
const validParticipants = [
  'Nombre1',
  'Nombre2',
  'Nombre3', // ... etc
];
```

### 3. Configurar el Frontend

```bash
# Volver a la raíz del proyecto
cd ..

# Crear archivo .env para el frontend
cp .env.example .env

# El contenido debe ser:
# VITE_API_URL=http://localhost:3001
```

## 🎮 Ejecutar la Aplicación

### Opción 1: Dos Terminales (Recomendado para desarrollo)

**Terminal 1 - Backend:**

```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**

```bash
npm run dev
```

### Opción 2: Ejecutar Ambos con Concurrently

```bash
# Instalar concurrently globalmente
npm install -g concurrently

# Desde la raíz del proyecto
concurrently "cd server && npm run dev" "npm run dev"
```

## 📱 Acceso

- **Frontend (Juego):** http://localhost:5173
- **Backend (API):** http://localhost:3001
- **Health Check:** http://localhost:3001/health

## 🎯 Cómo Funciona

1. **Selección de Jugador:** Al entrar, cada jugador selecciona su nombre (de la lista) y su equipo (Azul/Rojo)

2. **Timer de 60 segundos:** Después de cada acción (sumar punto), se reinicia un timer de 60 segundos. Si no actúas en ese tiempo, se envía automáticamente tu puntaje.

3. **Juego:** Presiona el botón para sumar puntos. Decide cuándo parar o arriesgar más.

4. **Envío de Puntaje:**

   - Manual: Botón "Finalizar Run" y luego "Enviar Puntuación"
   - Automático: Si se acaba el timer de 60 segundos

5. **Ranking en Tiempo Real:** Se muestra el Top 10 actualizado cada 10 segundos

6. **Persistencia:** Solo se guarda el MEJOR puntaje de cada jugador

## 🔧 API Endpoints

### GET /api/participants

Obtiene la lista de participantes y equipos válidos.

### POST /api/score

Guarda o actualiza el puntaje de un jugador.

Body:

```json
{
  "playerName": "Fabrizio",
  "team": "Azul",
  "score": 42,
  "timestamp": "2025-10-15T..."
}
```

### GET /api/ranking

Obtiene el Top 10 de puntajes.

### GET /api/player/:name

Obtiene el puntaje de un jugador específico.

### POST /api/reset

Resetea todos los puntajes (requiere clave admin).

Body:

```json
{
  "adminKey": "reset-cumpleanos-2025"
}
```

## 📊 Gestión Durante el Evento

### Ver Ranking en Tiempo Real

Abre http://localhost:3001/api/ranking en un navegador o:

```bash
curl http://localhost:3001/api/ranking
```

### Resetear Puntajes

```bash
curl -X POST http://localhost:3001/api/reset \
  -H "Content-Type: application/json" \
  -d '{"adminKey": "reset-cumpleanos-2025"}'
```

### Verificar Estado del Servidor

```bash
curl http://localhost:3001/health
```

## 🌐 Compartir en Red Local

Para que otros dispositivos en tu red puedan jugar:

1. **Obtén tu IP local:**

   ```bash
   # Linux/Mac
   ip addr show | grep inet
   # o
   ifconfig | grep inet

   # Windows
   ipconfig
   ```

2. **Inicia Vite con --host:**

   ```bash
   npm run dev -- --host
   ```

3. **Actualiza .env en el frontend:**

   ```
   VITE_API_URL=http://TU_IP_LOCAL:3001
   ```

4. **Los jugadores acceden a:**
   ```
   http://TU_IP_LOCAL:5173
   ```

## 🔒 Seguridad

- El servidor valida que solo los nombres de la lista puedan jugar
- Solo se acepta un puntaje por jugador (siempre el mayor)
- Los equipos están predefinidos (Azul/Rojo)

## 🐛 Troubleshooting

### Error: "Cannot connect to server"

- Verifica que el backend esté corriendo en el puerto 3001
- Verifica que la URL en `.env` sea correcta

### Error: "Jugador no válido"

- Asegúrate de que el nombre esté en el array `validParticipants` del servidor

### El ranking no se actualiza

- El ranking se actualiza automáticamente cada 10 segundos
- Refresca la página manualmente si es necesario

## 📝 Notas para el Día del Evento

1. Inicia el servidor al menos 30 minutos antes
2. Prueba con un jugador de prueba que esté en la lista
3. Ten a mano el comando de reset por si necesitas empezar de cero
4. Mantén la computadora conectada a corriente
5. Desactiva el modo de suspensión de la computadora

¡Que gane el mejor equipo! 🎉
