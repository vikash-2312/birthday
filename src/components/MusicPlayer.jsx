// ============================================================
// 🎵 MUSIC PLAYER — Birthday Mode with built-in song
// ============================================================

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playHappyBirthday, startBirthdayAmbience } from '../utils/birthdaySong';

export default function MusicPlayer({ onMusicMode }) {
  const [playing, setPlaying] = useState(false);
  const [birthdayMode, setBirthdayMode] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [songPlayed, setSongPlayed] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const ambienceStopRef = useRef(null);
  const audioRef = useRef(null);
  const hasExternalAudio = useRef(false);

  // Try loading external audio if available
  useEffect(() => {
    const audio = new Audio('/audio/birthday.mp3');
    audio.addEventListener('canplaythrough', () => {
      hasExternalAudio.current = true;
    });
    audio.load();
    audioRef.current = audio;
    audio.loop = true;
    return () => { audio.pause(); };
  }, []);

  const playSong = () => {
    // Play the "Happy Birthday" melody once
    if (!songPlayed) {
      setSongPlayed(true);
      playHappyBirthday(0.4);
    }
  };

  const startAmbience = () => {
    if (ambienceStopRef.current) {
      ambienceStopRef.current();
      ambienceStopRef.current = null;
      setPlaying(false);
    } else {
      // Try external MP3 first
      if (hasExternalAudio.current && audioRef.current) {
        audioRef.current.play().catch(() => {
          // Fall back to Web Audio
          ambienceStopRef.current = startBirthdayAmbience(0.2);
        });
      } else {
        ambienceStopRef.current = startBirthdayAmbience(0.2);
      }
      setPlaying(true);
    }
  };

  const enableBirthdayMode = () => {
    setBirthdayMode(true);
    setShowControls(true);
    setShowPanel(true);
    onMusicMode?.(true);
    // Play the birthday song immediately!
    playHappyBirthday(0.4);
    setSongPlayed(true);
    // Start ambience after song (~8 seconds)
    setTimeout(() => {
      ambienceStopRef.current = startBirthdayAmbience(0.2);
      setPlaying(true);
    }, 8500);
  };

  const toggleAmbience = () => {
    if (playing) {
      if (ambienceStopRef.current) { ambienceStopRef.current(); ambienceStopRef.current = null; }
      if (audioRef.current) audioRef.current.pause();
      setPlaying(false);
    } else {
      startAmbience();
    }
  };

  return (
    <>
      {/* Panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            style={{
              position: 'fixed', bottom: 80, right: 16, zIndex: 100,
              background: 'rgba(20,0,35,0.92)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,133,161,0.3)',
              borderRadius: 16,
              padding: '14px 16px',
              boxShadow: '0 0 30px rgba(255,61,127,0.2)',
              minWidth: 200,
            }}
          >
            <p style={{ fontFamily: 'Inter', fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 10, textAlign: 'center' }}>
              🎵 Birthday Mode Active!
            </p>

            {/* Play Happy Birthday again */}
            <motion.button
              onClick={playSong}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #ff3d7f, #c77dff)',
                border: 'none', borderRadius: 10,
                color: 'white', fontFamily: 'Inter', fontWeight: 700, fontSize: 13,
                padding: '10px 0', cursor: 'pointer', marginBottom: 8,
              }}
            >
              🎂 Play "Happy Birthday"
            </motion.button>

            {/* Ambience toggle */}
            <motion.button
              onClick={toggleAmbience}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 10,
                color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter', fontSize: 13,
                padding: '8px 0', cursor: 'pointer',
              }}
            >
              {playing ? '⏸ Pause Ambience' : '▶ Play Ambience'}
            </motion.button>

            {/* Playing indicator */}
            {playing && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: 3, marginTop: 8 }}>
                {[0, 1, 2, 3].map(i => (
                  <motion.div key={i}
                    style={{ width: 3, background: '#ff3d7f', borderRadius: 3 }}
                    animate={{ height: [6, 18, 6] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.div
        style={{ position: 'fixed', bottom: 20, right: 16, zIndex: 101 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, type: 'spring', bounce: 0.4 }}
      >
        {!birthdayMode ? (
          <motion.button
            onClick={enableBirthdayMode}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'linear-gradient(135deg, #ff3d7f, #c77dff)',
              border: 'none', borderRadius: 50,
              color: 'white', fontFamily: 'Inter', fontWeight: 700,
              fontSize: 13, padding: '12px 18px',
              cursor: 'pointer',
              boxShadow: '0 0 30px rgba(255,61,127,0.5)',
              whiteSpace: 'nowrap',
            }}
            animate={{ boxShadow: ['0 0 20px rgba(255,61,127,0.3)', '0 0 40px rgba(255,61,127,0.7)', '0 0 20px rgba(255,61,127,0.3)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎵 Birthday Mode
          </motion.button>
        ) : (
          <motion.button
            onClick={() => setShowPanel(s => !s)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              width: 52, height: 52, borderRadius: '50%',
              background: 'linear-gradient(135deg, #ff3d7f, #c77dff)',
              border: 'none', cursor: 'pointer',
              fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: playing ? '0 0 30px rgba(255,61,127,0.6)' : '0 0 15px rgba(255,61,127,0.3)',
            }}
            animate={playing ? {
              boxShadow: ['0 0 20px rgba(255,61,127,0.4)', '0 0 50px rgba(199,125,255,0.8)', '0 0 20px rgba(255,61,127,0.4)'],
            } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {playing ? '🎵' : '🎶'}
          </motion.button>
        )}
      </motion.div>
    </>
  );
}
