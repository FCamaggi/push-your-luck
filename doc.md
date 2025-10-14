# 🎯 Juego del Riesgo: "Push Your Luck!"

## 🧩 Descripción General

Este es un **mini-juego web estático** desarrollado con **React (o Vite + React)** sin backend.  
El objetivo es simple: **acumular puntos presionando un botón**, pero con un riesgo creciente.  
Mientras más puntos acumules, **mayor es la probabilidad de perderlo todo** ("bust").

El juego busca generar emoción y tensión entre los jugadores, combinando suerte y estrategia.  
El reto: **saber cuándo parar** antes de que el azar te quite todo tu puntaje.

---

## 🕹️ Mecánica del Juego

1. El jugador inicia con **0 puntos**.
2. Cada vez que presiona el botón **"Sumar puntos"**, el contador aumenta en +1.
3. Sin embargo, **la probabilidad de hacer "bust" (perderlo todo)** aumenta con el número actual del contador:
   - Si tienes 5 puntos → 5% de probabilidad de bust.
   - Si tienes 50 puntos → 50% de probabilidad de bust.
   - Si tienes 99 puntos → 99% de probabilidad de bust.
4. Si ocurre un **bust**, el puntaje se pierde y se muestra una pantalla triste con el mensaje:
   > 💀 ¡Perdiste! Tu ambición fue demasiado...
5. El jugador puede decidir **detener su run en cualquier momento** con el botón "Finalizar run".
   - Esto guarda su puntaje final y muestra una pantalla con su puntuación y un botón para **tomar un screenshot** y compartirlo.

---

## 📸 Compartir Puntuación

Cuando el jugador finaliza su run (sin bust):

- Aparece una pantalla con su puntaje final.
- Un botón **“Compartir mi puntuación”** usa la librería [`modern-screenshot`](https://www.npmjs.com/package/modern-screenshot) para generar un **PNG** del resultado.
- El jugador puede guardar o enviar la imagen como prueba para el concurso.

---

## 🧱 Estructura del Proyecto

```

/push-your-luck
├── public/
│   └── favicon.ico
├── src/
│   ├── App.jsx
│   ├── components/
│   │   ├── GameButton.jsx
│   │   ├── ResultScreen.jsx
│   │   └── BustScreen.jsx
│   ├── styles/
│   │   └── main.css
│   └── utils/
│       └── screenshot.js
├── package.json
├── vite.config.js
└── README.md

```

---

## ⚙️ Funcionalidades Principales

| Componente         | Descripción                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| `App.jsx`          | Controla el estado global del juego: puntaje, estado de bust o finalización.                     |
| `GameButton.jsx`   | Renderiza el botón principal. Cada clic evalúa si ocurre un bust basado en el porcentaje actual. |
| `ResultScreen.jsx` | Muestra el resultado final si el jugador decide parar; incluye botón de screenshot.              |
| `BustScreen.jsx`   | Muestra el mensaje de pérdida y opción de reiniciar.                                             |
| `screenshot.js`    | Contiene la lógica que llama a `modern-screenshot` para capturar la pantalla.                    |

---

## 📦 Dependencias

Instala los paquetes necesarios:

```bash
npm install
npm install modern-screenshot
```

---

## 🚀 Ejecución del Proyecto

### Con Vite:

```bash
npm run dev
```

El juego estará disponible en [http://localhost:5173](http://localhost:5173)

---

## 🧠 Lógica de Probabilidad de Bust

```js
function checkBust(score) {
  const random = Math.random() * 100; // número entre 0 y 100
  return random < score; // si el número aleatorio es menor que el puntaje, ocurre bust
}
```

Esto asegura que:

- Cuantos más puntos tengas, más probable es perderlo todo.
- A 100 puntos, el bust es inevitable (100%).

---

## 🪩 Pantallas

### 1. Pantalla principal

- Muestra el puntaje actual.
- Botón “Sumar puntos”.
- Botón “Finalizar run”.

### 2. Pantalla de éxito

- Muestra la puntuación final.
- Botón para compartir (screenshot).
- Botón para reiniciar.

### 3. Pantalla de bust

- Mensaje triste.
- Puntaje perdido.
- Botón para reiniciar.

---

## 🏆 Competencia

En el contexto del cumpleaños, cada jugador podrá participar y enviar su **screenshot de puntuación máxima**.
Quien consiga el mayor puntaje con evidencia válida **gana 15 puntos para su equipo**.

---

## 🎨 Estilo visual sugerido

- Colores vivos (azul/rojo) según equipos.
- Tipografía tipo arcade o divertida.
- Animaciones simples en bust o éxito.
- Fondo con gradiente dinámico.

---

## 🔁 Reinicio del Juego

Después de finalizar o perder:

- Se resetea el estado (`score = 0`, `isBust = false`, `isFinished = false`).
- Se vuelve a mostrar el botón principal.

---

## 💡 Ideas futuras (opcionales)

- Efectos de sonido (click, bust, victoria).
- Ranking local (almacenar puntuaciones en `localStorage`).
- Temas visuales por equipo (Azul / Rojo).
- Efecto de partículas o confeti al finalizar run con alto puntaje.

---

## 📄 Licencia

Proyecto libre para uso recreativo dentro del evento de cumpleaños.
Desarrollado con ❤️ para el juego de alianzas.
