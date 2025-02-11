class TimerSoundService {
  private audioContext: AudioContext | null = null;
  private oscillator: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private isPlaying: boolean = false;

  private initAudio() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
      this.gainNode.gain.value = 0.1; // Low volume
    }
  }

  playTick() {
    if (this.isPlaying) return;
    
    try {
      this.initAudio();
      if (!this.audioContext || !this.gainNode) return;

      this.isPlaying = true;
      
      // Create and configure oscillator
      this.oscillator = this.audioContext.createOscillator();
      this.oscillator.type = 'sine';
      this.oscillator.frequency.setValueAtTime(880, this.audioContext.currentTime); // A5 note
      
      // Connect and start
      this.oscillator.connect(this.gainNode);
      this.oscillator.start();
      this.oscillator.stop(this.audioContext.currentTime + 0.1); // Short duration

      // Clean up
      this.oscillator.onended = () => {
        if (this.oscillator) {
          this.oscillator.disconnect();
          this.oscillator = null;
          this.isPlaying = false;
        }
      };
    } catch (error) {
      console.error('Error playing timer sound:', error);
      this.isPlaying = false;
    }
  }

  cleanup() {
    if (this.oscillator) {
      this.oscillator.disconnect();
      this.oscillator = null;
    }
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    this.isPlaying = false;
  }
}

export const timerSound = new TimerSoundService();