// Procedural Web Audio Sound Generator for Pho Game
class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private bgmGain: GainNode | null = null;
  private bgmPlaying: boolean = true; // Default to true so it plays upon interaction
  private bgmTimer: number | null = null;
  private volumeLevel: number = 0.7; // Default 70% volume

  constructor() {
    // Auto-unlock audio on first user gesture anywhere
    if (typeof window !== 'undefined') {
      const unlock = () => {
        this.initCtx();
        if (this.bgmPlaying && !this.bgmTimer) {
          this.playBietEmSeKhongVeLoop();
        }
        window.removeEventListener('click', unlock);
        window.removeEventListener('keydown', unlock);
        window.removeEventListener('touchstart', unlock);
      };
      window.addEventListener('click', unlock);
      window.addEventListener('keydown', unlock);
      window.addEventListener('touchstart', unlock);
    }
  }

  public initCtx() {
    try {
      if (!this.ctx) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioCtx();

        // Master Gain
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volumeLevel, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

        // BGM Gain
        this.bgmGain = this.ctx.createGain();
        this.bgmGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
        this.bgmGain.connect(this.masterGain);
      }

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    } catch {
      // Audio context creation fallback
    }
  }

  public setVolume(vol: number) {
    this.volumeLevel = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(
        this.isMuted ? 0 : this.volumeLevel,
        this.ctx.currentTime
      );
    }
  }

  public getVolume(): number {
    return this.volumeLevel;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    this.initCtx();
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(
        this.isMuted ? 0 : this.volumeLevel,
        this.ctx.currentTime
      );
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public isMusicPlaying(): boolean {
    return this.bgmPlaying;
  }

  public toggleMusicBGM(): boolean {
    this.initCtx();
    if (this.bgmPlaying) {
      this.stopMusicBGM();
      return false;
    } else {
      this.startBietEmSeKhongVe();
      return true;
    }
  }

  public startBietEmSeKhongVe() {
    this.initCtx();
    this.bgmPlaying = true;
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    }
    if (!this.bgmTimer) {
      this.playBietEmSeKhongVeLoop();
    }
  }

  public stopMusicBGM() {
    this.bgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }
  }

  // Play a note with synth envelope
  private playSynthNote(
    freq: number,
    startTime: number,
    duration: number,
    type: OscillatorType = 'sine',
    gainLevel: number = 0.25,
    destination: AudioNode = this.bgmGain || this.ctx!.destination
  ) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(gainLevel, startTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }

  // Melodic BGM loop: "Biết Em Sẽ Không Về" - White Wave
  private playBietEmSeKhongVeLoop() {
    if (!this.bgmPlaying || this.isMuted) {
      this.bgmTimer = window.setTimeout(() => this.playBietEmSeKhongVeLoop(), 2000);
      return;
    }

    this.initCtx();
    if (!this.ctx || !this.bgmGain) {
      this.bgmTimer = window.setTimeout(() => this.playBietEmSeKhongVeLoop(), 1000);
      return;
    }

    const now = this.ctx.currentTime + 0.05;
    const dest = this.bgmGain;

    // Melody: "Biết Em Sẽ Không Về" (White Wave)
    // Key: Am/C, Tempo ~ 80 BPM (1 beat = 0.75s)
    const melody: { f: number; dur: number; delay: number }[] = [
      // Phrase 1: "Biết em sẽ không về..."
      { f: 329.63, dur: 0.6, delay: 0.0 },   // E4
      { f: 392.00, dur: 0.6, delay: 0.7 },   // G4
      { f: 440.00, dur: 1.1, delay: 1.4 },   // A4
      { f: 523.25, dur: 0.5, delay: 2.6 },   // C5
      { f: 493.88, dur: 0.5, delay: 3.2 },   // B4
      { f: 440.00, dur: 0.8, delay: 3.8 },   // A4
      { f: 392.00, dur: 0.6, delay: 4.8 },   // G4
      { f: 329.63, dur: 1.2, delay: 5.5 },   // E4

      // Phrase 2: Melancholic answer
      { f: 293.66, dur: 0.6, delay: 7.0 },   // D4
      { f: 329.63, dur: 0.6, delay: 7.7 },   // E4
      { f: 392.00, dur: 0.9, delay: 8.4 },   // G4
      { f: 440.00, dur: 0.6, delay: 9.5 },   // A4
      { f: 392.00, dur: 0.6, delay: 10.2 },  // G4
      { f: 329.63, dur: 0.8, delay: 10.9 },  // E4
      { f: 293.66, dur: 0.6, delay: 11.8 },  // D4
      { f: 261.63, dur: 1.4, delay: 12.5 },  // C4

      // Phrase 3: Guitar lick ending
      { f: 220.00, dur: 0.6, delay: 14.0 },  // A3
      { f: 261.63, dur: 0.6, delay: 14.6 },  // C4
      { f: 293.66, dur: 0.7, delay: 15.2 },  // D4
      { f: 329.63, dur: 1.2, delay: 16.0 },  // E4
    ];

    // Chords (Am - F - C - G) arpeggiated acoustic guitar style
    const chords = [
      // Bar 1 & 2: Am (0s - 4s)
      { root: 110, notes: [220, 261.63, 329.63, 440], delay: 0.0 },
      // Bar 3 & 4: F (4s - 8s)
      { root: 87.31, notes: [174.61, 220, 261.63, 349.23], delay: 4.0 },
      // Bar 5 & 6: C (8s - 12s)
      { root: 130.81, notes: [261.63, 329.63, 392.00, 523.25], delay: 8.0 },
      // Bar 7 & 8: G (12s - 16s)
      { root: 98.0, notes: [196.00, 246.94, 293.66, 392.00], delay: 12.0 },
    ];

    // Play bass roots
    chords.forEach((c) => {
      // Deep bass
      this.playSynthNote(c.root, now + c.delay, 3.2, 'triangle', 0.22, dest);
      this.playSynthNote(c.root / 2, now + c.delay, 3.2, 'sine', 0.18, dest);

      // Gentle arpeggio plucks
      c.notes.forEach((freq, idx) => {
        this.playSynthNote(freq, now + c.delay + idx * 0.45, 1.2, 'sine', 0.09, dest);
        this.playSynthNote(freq, now + c.delay + 1.8 + idx * 0.45, 1.2, 'triangle', 0.07, dest);
      });
    });

    // Play melody with rich dual oscillator (warm lead)
    melody.forEach((m) => {
      // Main melody
      this.playSynthNote(m.f, now + m.delay, m.dur, 'sine', 0.28, dest);
      // Soft overtone
      this.playSynthNote(m.f * 2, now + m.delay, m.dur * 0.7, 'triangle', 0.08, dest);
    });

    // Lofi beat drum percussions (soft kick and vinyl snare)
    const totalDuration = 18.0; // 18 seconds loop
    for (let t = 0; t < totalDuration; t += 1.0) {
      if (t % 2 === 0) {
        // Kick on even beats
        this.playKick(now + t, dest);
      } else {
        // Soft snare / snap on odd beats
        this.playSnare(now + t, dest);
      }
    }

    // Schedule next loop
    this.bgmTimer = window.setTimeout(() => {
      if (this.bgmPlaying) {
        this.playBietEmSeKhongVeLoop();
      }
    }, totalDuration * 1000 - 150);
  }

  private playKick(time: number, dest: AudioNode) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(110, time);
    osc.frequency.exponentialRampToValueAtTime(35, time + 0.12);

    gain.gain.setValueAtTime(0.2, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.14);

    osc.connect(gain);
    gain.connect(dest);
    osc.start(time);
    osc.stop(time + 0.15);
  }

  private playSnare(time: number, dest: AudioNode) {
    if (!this.ctx) return;
    // White noise puff
    const bufferSize = this.ctx.sampleRate * 0.08;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.08;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1500, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(dest);

    noise.start(time);
    noise.stop(time + 0.09);
  }

  // SFX: Boil
  public playBoil() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 0.45;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.22;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1100, this.ctx.currentTime);
    filter.Q.setValueAtTime(2.5, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.42);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain || this.ctx.destination);

    noise.start();
  }

  // SFX: Ladle scoop
  public playLadle() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(360, this.ctx.currentTime + 0.15);
    osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.32);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.32);

    osc.connect(gain);
    gain.connect(this.masterGain || this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.32);
  }

  // SFX: Cash register
  public playCashRegister() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    [987.77, 1318.51, 1760].forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.3, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.28);

      osc.connect(gain);
      gain.connect(this.masterGain || this.ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.28);
    });
  }

  // SFX: Dog bark (Cậu Vàng)
  public playBark() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(360, now);
    osc.frequency.linearRampToValueAtTime(520, now + 0.07);
    osc.frequency.exponentialRampToValueAtTime(210, now + 0.2);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

    osc.connect(gain);
    gain.connect(this.masterGain || this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);

    // Second bark
    setTimeout(() => {
      if (!this.ctx || this.isMuted) return;
      const t = this.ctx.currentTime;
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(400, t);
      osc2.frequency.linearRampToValueAtTime(560, t + 0.06);
      osc2.frequency.exponentialRampToValueAtTime(230, t + 0.18);
      gain2.gain.setValueAtTime(0.3, t);
      gain2.gain.exponentialRampToValueAtTime(0.01, t + 0.18);
      osc2.connect(gain2);
      gain2.connect(this.masterGain || this.ctx.destination);
      osc2.start(t);
      osc2.stop(t + 0.18);
    }, 130);
  }

  // SFX: Punch
  public playPunch() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.18);

    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

    osc.connect(gain);
    gain.connect(this.masterGain || this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.18);
  }

  // SFX: Handcuffs
  public playHandcuffs() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(2600, now);
    osc.frequency.setValueAtTime(3400, now + 0.03);
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

    osc.connect(gain);
    gain.connect(this.masterGain || this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  // SFX: Whoosh
  public playWhoosh() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(700, now + 0.22);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.5);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

    osc.connect(gain);
    gain.connect(this.masterGain || this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.5);
  }

  // SFX: Badge Reveal Fanfare
  public playBadgeReveal() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const notes = [261.63, 329.63, 392.0, 523.25, 659.25];
    const now = this.ctx.currentTime;
    notes.forEach((f, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + i * 0.11);

      gain.gain.setValueAtTime(0.35, now + i * 0.11);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.11 + 0.55);

      osc.connect(gain);
      gain.connect(this.masterGain || this.ctx.destination);
      osc.start(now + i * 0.11);
      osc.stop(now + i * 0.11 + 0.55);
    });
  }

  // SFX: Correct chime
  public playCorrect() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + i * 0.09);
      gain.gain.setValueAtTime(0.28, now + i * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.09 + 0.38);

      osc.connect(gain);
      gain.connect(this.masterGain || this.ctx.destination);
      osc.start(now + i * 0.09);
      osc.stop(now + i * 0.09 + 0.38);
    });
  }

  // SFX: Dialogue bleep
  public playDialogueBleep() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(460 + Math.random() * 80, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.09, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain || this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  // SFX: Ethereal celestial heaven chime
  public playHeavenChime() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Celestial chord: C5, E5, G5, B5, D6, G6
    [523.25, 659.25, 783.99, 987.77, 1174.66, 1567.98].forEach((f, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + i * 0.18);
      gain.gain.setValueAtTime(0.001, now + i * 0.18);
      gain.gain.linearRampToValueAtTime(0.2, now + i * 0.18 + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.18 + 1.8);

      osc.connect(gain);
      gain.connect(this.masterGain || this.ctx.destination);
      osc.start(now + i * 0.18);
      osc.stop(now + i * 0.18 + 1.85);
    });
  }
}

export const sounds = new SoundManager();
