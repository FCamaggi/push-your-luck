# 🎯 Push Your Luck!

Un juego web interactivo donde los jugadores deben acumular puntos antes de que sea demasiado tarde. Cada punto aumenta el riesgo de perderlo todo. ¿Hasta dónde te atreves a llegar?

## 🎮 Características

- 🎲 **Mecánica de riesgo progresivo**: Cada punto aumenta la probabilidad de bust
- 📊 **Barra de riesgo visual**: Muestra en tiempo real la probabilidad de perder con efecto de brillo
- � **Botón redondo clásico**: Diseño 3D con efecto de presión realista
- 🎵 **Sonidos progresivos**: Audio generado con Web Audio API que aumenta de pitch
- ✨ **Efectos de partículas**: Explosión visual en cada clic
- �📸 **Captura de pantalla**: Comparte tu puntuación con una imagen limpia (sin botones)
- 🎨 **Diseño moderno**: Interfaz atractiva con animaciones fluidas y efectos visuales
- 📱 **Optimizado para móvil**: Diseño responsive perfecto para dispositivos táctiles

## 🚀 Instalación y Ejecución

### Instalar dependencias

```bash
npm install
```

### Ejecutar en modo desarrollo

```bash
npm run dev
```

El juego estará disponible en [http://localhost:5173](http://localhost:5173)

### Construir para producción

```bash
npm run build
```

### Vista previa de la build

```bash
npm run preview
```

## 🎯 Cómo Jugar

1. **Presiona "Sumar Punto"** para incrementar tu puntuación
2. **Observa la barra de riesgo** - aumenta con cada punto
3. **Decide cuándo parar** con "Finalizar Run"
4. **Comparte tu resultado** capturando una imagen de tu puntuación

### ⚠️ Reglas

- Cada punto suma +1 a tu puntuación
- La probabilidad de BUST es igual a tu puntuación actual
  - 10 puntos = 10% de probabilidad de bust
  - 50 puntos = 50% de probabilidad de bust
  - 99 puntos = 99% de probabilidad de bust
- Si ocurre un BUST, pierdes toda tu puntuación
- Puedes finalizar en cualquier momento para asegurar tus puntos

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
