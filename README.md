# 🎯 Push Your Luck!

Un juego web interactivo donde los jugadores deben acumular puntos antes de que sea demasiado tarde. Cada punto aumenta el riesgo de perderlo todo. ¿Hasta dónde te atreves a llegar?

## 🎮 Características

### Gameplay

- 🎲 **Mecánica de riesgo progresivo**: Cada punto aumenta la probabilidad de bust
- ⏱️ **Timer de 60 segundos**: Tienes 1 minuto para decidir si seguir jugando o enviar tu puntaje
- 🎯 **Auto-envío**: Si se acaba el tiempo, tu puntaje se envía automáticamente
- � **Sistema de equipos**: Cada jugador pertenece al Equipo Rojo o Azul
- 🏆 **Mejor puntaje**: Solo se guarda tu récord personal más alto

### Interfaz

- �📊 **Barra de riesgo visual**: Muestra en tiempo real la probabilidad de perder
- 🔘 **Botón redondo clásico**: Diseño 3D con efecto de presión realista
- 🎵 **Sonidos progresivos**: Audio que aumenta de pitch según tu puntuación
- ✨ **Efectos de partículas**: Explosión visual en cada clic
- 🎨 **Diseño moderno**: Animaciones fluidas y efectos visuales
- 📱 **Optimizado para móvil**: Perfecto para dispositivos táctiles

### Backend & Ranking

- 🌐 **Servidor con persistencia**: Todos los puntajes se guardan
- 📈 **Ranking en tiempo real**: Top 10 actualizado cada 10 segundos
- 🔒 **Validación de jugadores**: Solo pueden jugar los participantes registrados
- 💾 **Persistencia de datos**: Los puntajes se guardan en archivo JSON

## 🚀 Instalación y Ejecución

### Instalación Rápida

**Backend:**

```bash
cd server
npm install
```

**Frontend:**

```bash
npm install
```

### Configuración

1. **Servidor** - Crea `server/.env`:

```
PORT=3001
```

2. **Frontend** - Crea `.env`:

```
VITE_API_URL=http://localhost:3001
```

### Ejecutar (Desarrollo Local)

**Opción 1: Dos terminales**

Terminal 1 (Backend):

```bash
cd server
npm start
```

Terminal 2 (Frontend):

```bash
npm run dev
```

**Opción 2: Script único**

```bash
npm install -g concurrently
npm run dev  # Ejecuta ambos servidores
```

### Acceso

- **Juego**: http://localhost:5173
- **API**: http://localhost:3001
- **Ranking**: http://localhost:3001/api/ranking

### Deploy en Render

Ver [DEPLOY.md](DEPLOY.md) para instrucciones completas de deploy en Render.

## 🎯 Cómo Jugar

### 1. Selección de Jugador

- Elige tu nombre de la lista
- Tu equipo se asigna automáticamente (Rojo o Azul)

### 2. Durante el Juego

- **Presiona el botón redondo** para sumar +1 punto
- **Timer de 60 segundos**: Se reinicia con cada punto
- **Observa la barra de riesgo** - aumenta con cada punto
- Si el timer llega a 0, tu puntaje se envía automáticamente

### 3. Finalizar

- **Opción 1**: Presiona "Finalizar Run" cuando quieras parar
- **Opción 2**: Deja que el timer llegue a 0 (auto-envío)
- Envía tu puntuación al servidor
- Solo se guarda tu MEJOR puntaje

### ⚠️ Reglas de Probabilidad

- Cada punto suma +1 a tu puntuación
- **Probabilidad de BUST = tu puntuación actual**
  - 10 puntos = 10% de probabilidad de bust
  - 50 puntos = 50% de probabilidad de bust
  - 99 puntos = 99% de probabilidad de bust
- Si ocurre BUST, pierdes todo y no puedes enviar ese intento
- **Estrategia**: Decide cuándo es momento de asegurar tus puntos

## 🏗️ Estructura del Proyecto

```
/push-your-luck
├── public/
│   └── favicon.ico
├── src/
│   ├── App.jsx              # Componente principal con lógica del juego
│   ├── main.jsx             # Punto de entrada de React
│   ├── components/
│   │   ├── GameButton.jsx   # Pantalla principal del juego
│   │   ├── ResultScreen.jsx # Pantalla de éxito
│   │   └── BustScreen.jsx   # Pantalla de bust
│   ├── styles/
│   │   └── main.css         # Estilos globales y animaciones
│   └── utils/
│       └── screenshot.js    # Utilidad para capturar pantalla
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 📦 Tecnologías

- **React 18** - Librería de UI
- **Vite** - Build tool y dev server
- **modern-screenshot** - Captura de pantalla
- **CSS3** - Animaciones y diseño responsivo

## 🎨 Personalización

### Cambiar colores del tema

Edita las variables CSS en `src/styles/main.css`:

```css
:root {
  --primary-color: #6c5ce7;
  --danger-color: #ff6b6b;
  --success-color: #51cf66;
  /* ... más variables ... */
}
```

### Ajustar la mecánica de juego

Modifica la función `checkBust` en `src/App.jsx` para cambiar la lógica de probabilidad.

## 🏆 Competencia

En el contexto del evento de cumpleaños:

- Cada jugador captura su mejor puntuación
- El puntaje más alto gana **15 puntos para su equipo**
- La evidencia es la imagen capturada con el botón "Compartir"

## 📝 Licencia

Proyecto de uso recreativo para eventos privados.
Desarrollado con ❤️ para el juego de alianzas.

## 🤝 Contribución

Este es un proyecto de evento privado, pero siéntete libre de hacer fork y adaptarlo para tus propios eventos.

---

**¡Buena suerte y que el riesgo esté de tu lado!** 🎲✨
