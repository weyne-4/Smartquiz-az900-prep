export type SoundType = 'correct' | 'wrong' | 'complete' | 'click';

let ctx: AudioContext | null = null;
let enabled = true;

export function setSoundEnabled(value: boolean) {
  enabled = value;
}

export function isSoundEnabled() {
  return enabled;
}

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  return ctx;
}

function tone(freq: number, start: number, duration: number, type: OscillatorType = 'sine', gain = 0.12) {
  const audio = getCtx();
  if (!audio) return;
  const osc = audio.createOscillator();
  const g = audio.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, audio.currentTime + start);
  g.gain.setValueAtTime(0, audio.currentTime + start);
  g.gain.linearRampToValueAtTime(gain, audio.currentTime + start + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + start + duration);
  osc.connect(g);
  g.connect(audio.destination);
  osc.start(audio.currentTime + start);
  osc.stop(audio.currentTime + start + duration + 0.05);
}

export function playSound(type: SoundType) {
  if (!enabled) return;
  const audio = getCtx();
  if (!audio) return;
  if (audio.state === 'suspended') audio.resume();

  switch (type) {
    case 'correct':
      tone(660, 0, 0.12, 'sine', 0.12);
      tone(880, 0.1, 0.18, 'sine', 0.12);
      break;
    case 'wrong':
      tone(220, 0, 0.18, 'sawtooth', 0.08);
      tone(160, 0.12, 0.22, 'sawtooth', 0.08);
      break;
    case 'click':
      tone(440, 0, 0.05, 'square', 0.05);
      break;
    case 'complete':
      tone(523, 0, 0.18, 'sine', 0.12);
      tone(659, 0.14, 0.18, 'sine', 0.12);
      tone(784, 0.28, 0.22, 'sine', 0.12);
      tone(1047, 0.44, 0.3, 'sine', 0.12);
      break;
  }
}
