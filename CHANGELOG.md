# Changelog - Mejoras Push Your Luck

## Versión 2.0 - Optimización Móvil y Mejoras Visuales

### 🎨 Nuevo Diseño del Botón
- ✅ Botón redondo tipo "clásico" con efecto 3D realista
- ✅ Animación de presión cuando se hace clic
- ✅ Efecto de partículas que explotan en cada clic
- ✅ Cambio de color cuando el riesgo supera el 50% (zona de peligro)
- ✅ Tamaño: 180px en desktop, 160px en móvil, 140px en pantallas pequeñas

### 🎵 Sistema de Audio
- ✅ Web Audio API para generar sonidos sintéticos
- ✅ Pitch progresivo: el sonido se vuelve más agudo conforme subes puntos
- ✅ Sonido de victoria: acorde mayor ascendente alegre
- ✅ Sonido de bust: tono descendente dramático con efecto de crash
- ✅ Sonido de hover sutil para feedback

### 📸 Captura de Pantalla Mejorada
- ✅ Los botones "Compartir" y "Jugar de Nuevo" están FUERA del área de captura
- ✅ Solo se captura: título, mensaje y badge de puntuación
- ✅ Alta resolución (scale: 3) para mejor calidad en móviles
- ✅ Padding adicional en la imagen

### 📱 Optimización Móvil
- ✅ Responsive design con 3 breakpoints:
  - Desktop: >768px
  - Tablet/Móvil: 480-768px
  - Móvil pequeño: <480px
- ✅ Meta tags para PWA (Progressive Web App)
- ✅ Desactivar selección de texto en móviles
- ✅ Soporte táctil mejorado
- ✅ Animación de presión optimizada para touch
- ✅ Tamaños de fuente escalables
- ✅ Botones y elementos con tamaños touch-friendly

### ✨ Efectos Visuales
- ✅ Animación de brillo (glow-pulse) en el número de puntos
- ✅ Efecto de brillo deslizante en la barra de probabilidad
- ✅ Animación rainbow en el título de victoria
- ✅ Shake más intenso en la pantalla de bust
- ✅ Partículas con explosión radial de 8 direcciones

### 🎯 Mejoras de UX
- ✅ Feedback visual inmediato al hacer clic
- ✅ Feedback auditivo con pitch progresivo
- ✅ Zona de peligro visual cuando >50 puntos
- ✅ Animaciones más fluidas y naturales
- ✅ Touch feedback en dispositivos móviles

## Archivos Modificados

1. `src/utils/audio.js` - NUEVO: Sistema de audio con Web Audio API
2. `src/components/GameButton.jsx` - Botón redondo con partículas
3. `src/components/ResultScreen.jsx` - Separación de captura y botones
4. `src/components/BustScreen.jsx` - Sonido de bust
5. `src/styles/main.css` - Rediseño completo del botón + responsive
6. `src/utils/screenshot.js` - Mejora de calidad y resolución
7. `index.html` - Meta tags para móviles

## Próximas Mejoras Sugeridas (Opcionales)

- [ ] Vibración en móvil usando Vibration API
- [ ] Modo oscuro/claro
- [ ] Guardado de mejor puntuación en localStorage
- [ ] Ranking local de puntuaciones
- [ ] Confetti animation en victoria
- [ ] Selector de equipo (Azul/Rojo) con colores personalizados
