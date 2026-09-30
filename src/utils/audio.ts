// Web Audio API sound effects generator for AM I COOKED?
// Zero external sound assets needed - 100% reliable synthesized effects!

class SoundSystem {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  constructor() {
    // Check localStorage preference
    const saved = localStorage.getItem('am_i_cooked_sound');
    if (saved !== null) {
      this.enabled = saved === 'true';
    }
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    localStorage.setItem('am_i_cooked_sound', String(this.enabled));
    if (this.enabled) {
      this.playClick();
    }
    return this.enabled;
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Chunky mechanical button press
  public playClick() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // AudioContext not allowed before user gesture
    }
  }

  // Sizzle sound (white noise bandpass)
  public playSizzle() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
      filter.Q.setValueAtTime(3, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();
    } catch {
      // ignore
    }
  }

  // Ominous dramatic doom sting for calculation
  public playDoomSting(is100Percent = false) {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const t = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'square';

      if (is100Percent) {
        // Dramatic explosion + siren
        osc1.frequency.setValueAtTime(80, t);
        osc1.frequency.exponentialRampToValueAtTime(30, t + 1.2);
        osc2.frequency.setValueAtTime(120, t);
        osc2.frequency.exponentialRampToValueAtTime(25, t + 1.2);
        gain.gain.setValueAtTime(0.5, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 1.5);
      } else {
        osc1.frequency.setValueAtTime(160, t);
        osc1.frequency.exponentialRampToValueAtTime(60, t + 0.6);
        osc2.frequency.setValueAtTime(220, t);
        osc2.frequency.exponentialRampToValueAtTime(90, t + 0.6);
        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.7);
      }

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + (is100Percent ? 1.5 : 0.7));
      osc2.stop(t + (is100Percent ? 1.5 : 0.7));

      if (is100Percent) {
        this.playSizzle();
      }
    } catch {
      // ignore
    }
  }

  // Panic siren wobbler
  public playPanicSiren() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';

      // 3 wails
      for (let i = 0; i < 3; i++) {
        const offset = i * 0.35;
        osc.frequency.setValueAtTime(450, t + offset);
        osc.frequency.linearRampToValueAtTime(850, t + offset + 0.17);
        osc.frequency.linearRampToValueAtTime(450, t + offset + 0.35);
      }

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 1.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 1.15);
    } catch {
      // ignore
    }
  }
}

export const sounds = new SoundSystem();
