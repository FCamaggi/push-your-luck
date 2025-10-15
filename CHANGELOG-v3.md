# 🎯 Push Your Luck - Versión 3.0 con Backend

## ✨ Cambios Implementados

### 🌐 Backend con Express (Render Ready)

**Nuevos Archivos:**
- `server/server.js` - Servidor Express con API REST
- `server/package.json` - Dependencias del backend
- `server/scores.json` - Persistencia de puntajes
- `server/.env.example` - Ejemplo de variables de entorno

**Características del Backend:**
- ✅ API RESTful con Express
- ✅ Persistencia en archivo JSON
- ✅ Validación de jugadores desde lista predefinida
- ✅ Equipos pre-asignados (Rojo: 15 jugadores, Azul: 16 jugadores)
- ✅ Solo guarda el mejor puntaje de cada jugador
- ✅ CORS habilitado para cualquier origen
- ✅ Listo para deploy en Render
- ✅ Sin dependencias de bases de datos externas

**Endpoints API:**
- `GET /api/participants` - Lista de jugadores con equipos
- `POST /api/score` - Guardar/actualizar puntaje
- `GET /api/ranking` - Top 10 en tiempo real
- `GET /api/player/:name` - Puntaje de un jugador
- `POST /api/reset` - Resetear todos los puntajes (admin)
- `GET /health` - Estado del servidor

### ⏱️ Timer de 60 Segundos

**Archivo Modificado:** `src/components/GameButton.jsx`

- ✅ Timer visible de 60 segundos
- ✅ Se reinicia con cada punto sumado
- ✅ Warning visual cuando quedan <10 segundos
- ✅ Auto-envío cuando llega a 0
- ✅ Animación de pulso en zona de peligro

### 👥 Sistema de Selección de Jugador

**Nuevo Componente:** `src/components/PlayerSelection.jsx`

- ✅ Dropdown con lista de jugadores válidos
- ✅ Equipo asignado automáticamente al seleccionar nombre
- ✅ Muestra "Nombre - Equipo Rojo/Azul" en dropdown
- ✅ Badge visual con colores del equipo
- ✅ Validación antes de comenzar
- ✅ Manejo de errores de conexión

### 📈 Ranking en Tiempo Real

**Nuevo Componente:** `src/components/Ranking.jsx`

- ✅ Widget lateral con Top 10
- ✅ Actualización automática cada 10 segundos
- ✅ Resalta al jugador actual
- ✅ Muestra posición, equipo, nombre y puntaje
- ✅ Colores distintivos por equipo
- ✅ Scroll sticky en desktop

### 📤 Envío de Puntuación

**Archivo Modificado:** `src/components/ResultScreen.jsx`

- ✅ Botón "Enviar Puntuación" en lugar de screenshot
- ✅ Llamada al backend para guardar puntaje
- ✅ Mensaje de confirmación (nuevo récord o puntaje mayor existente)
- ✅ Estado de "enviando" mientras se procesa
- ✅ Manejo de errores

### 🎨 Mejoras de UI/UX

**Archivo Modificado:** `src/App.jsx`

- ✅ Pantalla de selección antes del juego
- ✅ Información del jugador en header (nombre + equipo)
- ✅ Layout con sidebar para ranking
- ✅ Responsive: sidebar abajo en móvil
- ✅ Auto-envío si el timer llega a 0

**Archivo Modificado:** `src/styles/main.css`

- ✅ Estilos para PlayerSelection
- ✅ Estilos para Ranking widget
- ✅ Estilos para Timer display
- ✅ Team badges con colores Rojo/Azul
- ✅ Layout responsive con sidebar
- ✅ Animaciones para timer warning

### 🔧 Utilidades

**Nuevo Archivo:** `src/utils/api.js`

- ✅ Cliente HTTP para todas las llamadas al backend
- ✅ Configuración centralizada de URL
- ✅ Funciones: getParticipants, saveScore, getRanking, getPlayerScore

### 📱 Lista de Jugadores

**Integración desde:** `jugadores.md`

- ✅ 31 jugadores totales
- ✅ Equipo Rojo: 15 jugadores
- ✅ Equipo Azul: 16 jugadores
- ✅ Equipos pre-asignados en el servidor
- ✅ Validación automática equipo-jugador

### 📚 Documentación

**Nuevos Archivos:**
- `DEPLOY.md` - Guía completa para deploy en Render
- `SETUP.md` - Instrucciones de configuración local
- `server/README.md` - Documentación del backend

**Actualizados:**
- `README.md` - Nueva versión con todas las características
- `CHANGELOG.md` - Historial de cambios

### 🚫 Removido

- ❌ Dependencia de Groq SDK (ya no necesaria)
- ❌ Funcionalidad de screenshot (reemplazada por envío directo)
- ❌ React.StrictMode (causaba doble click)
- ❌ Sonidos de hover (simplificación)

## 🎮 Flujo del Juego

1. **Inicio** → Pantalla de selección
2. **Selección** → Jugador elige su nombre (equipo auto-asignado)
3. **Juego** → Timer de 60s, suma puntos, ve ranking en sidebar
4. **Decisión** → Finalizar manualmente o dejar que el timer expire
5. **Resultado** → Envío automático de puntaje al servidor
6. **Ranking** → Actualización en tiempo real para todos

## 🔒 Validaciones

- ✅ Solo jugadores de la lista pueden jugar
- ✅ Equipo debe corresponder al jugador
- ✅ Solo se guarda el mejor puntaje de cada jugador
- ✅ Validación de datos completos antes de guardar
- ✅ Manejo de errores en todas las operaciones

## 🌐 Deployment

### Opción 1: Local (Recomendado para el evento)
- Servidor en tu computadora
- Red WiFi local
- Sin límites de peticiones
- Sin "dormidas" del servidor
- Control total

### Opción 2: Render (Cloud)
- Deploy automático desde GitHub
- HTTPS gratis
- Servidor duerme después de 15min inactividad
- Free tier: suficiente para el evento
- Persistencia limitada (se resetea en redeploy)

## 📊 Próximos Pasos Opcionales

- [ ] Base de datos real (MongoDB/PostgreSQL)
- [ ] Autenticación de jugadores
- [ ] Chat en tiempo real
- [ ] Estadísticas por equipo
- [ ] Historial de intentos por jugador
- [ ] Notificaciones push cuando alguien supera tu puntaje
- [ ] Modo espectador para ver juegos en vivo

## 🎉 ¡Listo para Jugar!

El juego está completamente funcional con:
- ✅ 31 jugadores registrados en 2 equipos
- ✅ Backend funcionando
- ✅ Frontend funcionando
- ✅ Timer de 60 segundos
- ✅ Ranking en tiempo real
- ✅ Persistencia de datos
- ✅ Listo para deploy local o en Render

¡Que gane el mejor equipo! 🏆
