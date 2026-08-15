// ============================================================
// 🎵 BIRTHDAY SONG — Web Audio API (No file needed!)
// ============================================================

// "Happy Birthday" melody notes (frequency, duration in ms)
export function playHappyBirthday(volume = 0.4) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();

    const notes = [
      // "Hap-py Birth-day to you"
      [261.6, 200], [261.6, 100], [293.7, 300], [261.6, 300], [349.2, 300], [329.6, 600],
      // "Hap-py Birth-day to you"
      [261.6, 200], [261.6, 100], [293.7, 300], [261.6, 300], [392.0, 300], [349.2, 600],
      // "Hap-py Birth-day dear..."
      [261.6, 200], [261.6, 100], [523.3, 300], [440.0, 300], [349.2, 300], [329.6, 300], [293.7, 600],
      // "Hap-py Birth-day to you"
      [466.2, 200], [466.2, 100], [440.0, 300], [349.2, 300], [392.0, 300], [349.2, 700],
    ];

    let time = ctx.currentTime + 0.1;

    notes.forEach(([freq, dur]) => {
      if (freq === 0) { time += dur / 1000; return; }

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      gainNode.gain.setValueAtTime(0, time);
      gainNode.gain.linearRampToValueAtTime(volume, time + 0.02);
      gainNode.gain.setValueAtTime(volume, time + dur / 1000 - 0.05);
      gainNode.gain.linearRampToValueAtTime(0, time + dur / 1000);

      // Add a soft triangle oscillator for warmth
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq, time);
      gain2.gain.setValueAtTime(0, time);
      gain2.gain.linearRampToValueAtTime(volume * 0.3, time + 0.02);
      gain2.gain.linearRampToValueAtTime(0, time + dur / 1000);

      osc.start(time);
      osc.stop(time + dur / 1000 + 0.05);
      osc2.start(time);
      osc2.stop(time + dur / 1000 + 0.05);

      time += dur / 1000;
    });

    return () => ctx.close();
  } catch (e) {
    console.warn('Web Audio not available:', e);
    return () => {};
  }
}

// Gentle looping background ambience
export function startBirthdayAmbience(volume = 0.15) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const nodes = [];

    // Create sparkly high notes
    const sparkleNotes = [523.3, 659.3, 783.9, 880.0, 1046.5];

    const playSparkle = () => {
      const freq = sparkleNotes[Math.floor(Math.random() * sparkleNotes.length)];
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(volume * 0.4, ctx.currentTime + 0.05);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.6);
      nodes.push(osc);
    };

    // Sparkle every 1-3 seconds
    const interval = setInterval(playSparkle, 1000 + Math.random() * 2000);

    return () => {
      clearInterval(interval);
      nodes.forEach(n => { try { n.stop(); } catch (e) {} });
      ctx.close();
    };
  } catch (e) {
    return () => {};
  }
}
