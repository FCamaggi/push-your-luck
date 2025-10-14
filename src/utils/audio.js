// Sistema de audio del juego usando Web Audio API
class GameAudio {
    constructor() {
        this.audioContext = null;
        this.initialized = false;
    }

    // Inicializar el contexto de audio (debe ser llamado por una interacción del usuario)
    init() {
        if (!this.initialized) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.initialized = true;
        }
    }

    // Sonido de click con pitch progresivo basado en el score
    playClickSound(score) {
        if (!this.initialized) this.init();

        const ctx = this.audioContext;
        const now = ctx.currentTime;

        // Oscilador único con pitch progresivo
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        // Frecuencia aumenta con el score (más tenso)
        // Base: 400Hz, incrementa hasta ~1400Hz
        const baseFrequency = 400;
        const maxFrequency = 1400;
        const frequency = baseFrequency + (score * (maxFrequency - baseFrequency) / 100);

        // Tipo de onda cambia según el score para más tensión
        oscillator.type = score > 50 ? 'triangle' : 'sine';
        oscillator.frequency.setValueAtTime(frequency, now);
        oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.3, now + 0.08);

        // Volumen con envelope rápido
        const volume = Math.min(0.25, 0.15 + (score / 400));
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(volume, now + 0.005);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.start(now);
        oscillator.stop(now + 0.12);
    }

    // Sonido de victoria - alegre y triunfante
    playVictorySound() {
        if (!this.initialized) this.init();

        const ctx = this.audioContext;
        const now = ctx.currentTime;

        // Acorde mayor ascendente
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

        notes.forEach((freq, index) => {
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(freq, now + index * 0.1);

            gainNode.gain.setValueAtTime(0, now + index * 0.1);
            gainNode.gain.linearRampToValueAtTime(0.2, now + index * 0.1 + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + index * 0.1 + 0.4);

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            oscillator.start(now + index * 0.1);
            oscillator.stop(now + index * 0.1 + 0.4);
        });

        // Efecto de "brillo" al final
        setTimeout(() => {
            const sparkle = ctx.createOscillator();
            const sparkleGain = ctx.createGain();

            sparkle.type = 'sine';
            sparkle.frequency.setValueAtTime(2093, now + 0.5);
            sparkle.frequency.exponentialRampToValueAtTime(3136, now + 0.8);

            sparkleGain.gain.setValueAtTime(0.15, now + 0.5);
            sparkleGain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);

            sparkle.connect(sparkleGain);
            sparkleGain.connect(ctx.destination);

            sparkle.start(now + 0.5);
            sparkle.stop(now + 0.8);
        }, 0);
    }

    // Sonido de bust - dramático y descendente
    playBustSound() {
        if (!this.initialized) this.init();

        const ctx = this.audioContext;
        const now = ctx.currentTime;

        // Tono descendente dramático
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(800, now);
        oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.5);

        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.linearRampToValueAtTime(0.4, now + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.start(now);
        oscillator.stop(now + 0.5);

        // Ruido para efecto de "crash"
        const bufferSize = ctx.sampleRate * 0.3;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
        }

        const noiseSource = ctx.createBufferSource();
        const noiseGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        noiseSource.buffer = buffer;
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1000, now);
        filter.frequency.exponentialRampToValueAtTime(200, now + 0.3);

        noiseGain.gain.setValueAtTime(0.2, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

        noiseSource.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);

        noiseSource.start(now);
    }

    // Sonido de hover/feedback ligero
    playHoverSound() {
        if (!this.initialized) this.init();

        const ctx = this.audioContext;
        const now = ctx.currentTime;

        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, now);

        gainNode.gain.setValueAtTime(0.05, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.start(now);
        oscillator.stop(now + 0.1);
    }
}

// Exportar instancia única
export const gameAudio = new GameAudio();
