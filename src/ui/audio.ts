// Web Audio Synthesizer Engine for Raid Realms

let audioCtx: AudioContext | null = null;
let isMuted: boolean = typeof localStorage !== 'undefined' && localStorage.getItem('raid_realms_muted') === 'true';

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playTone(freq: number, type: OscillatorType, duration: number, volume = 0.15, decay = 0.8): void {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(Math.max(1, freq * decay), ctx.currentTime + duration);

    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Audio Context blockiert oder nicht verfügbar
  }
}

function playNoise(duration: number, volume = 0.08): void {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    const gain = ctx.createGain();

    noise.buffer = buffer;
    noise.connect(gain);
    gain.connect(ctx.destination);

    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    noise.start();
    noise.stop(ctx.currentTime + duration);
  } catch {
    // Audio Context blockiert
  }
}

export const SoundEngine = {
  isMuted: () => isMuted,
  toggleMute: (): boolean => {
    isMuted = !isMuted;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('raid_realms_muted', isMuted ? 'true' : 'false');
    }
    return isMuted;
  },
  playCard: () => {
    playTone(440, 'sine', 0.12);
    playTone(660, 'sine', 0.08, 0.06);
  },
  damage: () => {
    playNoise(0.15, 0.1);
    playTone(120, 'sawtooth', 0.2, 0.1, 0.3);
  },
  heal: () => {
    playTone(523, 'sine', 0.1);
    playTone(784, 'sine', 0.2, 0.08);
  },
  gold: () => {
    playTone(880, 'sine', 0.08, 0.08);
    playTone(1100, 'sine', 0.12, 0.06);
  },
  death: () => {
    playTone(200, 'sawtooth', 0.3, 0.15, 0.2);
    playNoise(0.2, 0.06);
  },
  summon: () => {
    playTone(300, 'square', 0.05);
    playTone(600, 'square', 0.15, 0.1);
  },
  buy: () => {
    playTone(660, 'sine', 0.1);
    playTone(880, 'sine', 0.15, 0.1);
  },
  turn: () => {
    playTone(440, 'sine', 0.05);
    playTone(660, 'sine', 0.1, 0.15);
  },
  upgrade: () => {
    [400, 500, 650, 800].forEach((f, i) => {
      setTimeout(() => playTone(f, 'square', 0.08, 0.1), i * 60);
    });
  },
  error: () => {
    playTone(150, 'square', 0.15, 0.12, 0.3);
  },
  victory: () => {
    [523, 659, 784, 1047].forEach((f, i) => {
      setTimeout(() => playTone(f, 'sine', 0.3, 0.2), i * 120);
    });
  },
  defeat: () => {
    [400, 350, 300, 220].forEach((f, i) => {
      setTimeout(() => playTone(f, 'sawtooth', 0.3, 0.15, 0.4), i * 150);
    });
  },
  vsImpact: () => {
    playTone(65, 'sine', 0.5, 0.35, 0.25);
    playNoise(0.2, 0.12);
  },
  swoosh: () => {
    playTone(320, 'sine', 0.08, 0.08, 1.8);
  }
};
