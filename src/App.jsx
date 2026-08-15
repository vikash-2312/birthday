// ============================================================
// 🎀 APP.JSX — Main Orchestrator
// ============================================================

import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import BirthdayIntro from './components/BirthdayIntro';
import BirthdayRoom from './components/BirthdayRoom';
import ThreeDBalloons from './components/ThreeDBalloons';
import BirthdayCake from './components/BirthdayCake';
import GiftBoxes from './components/GiftBoxes';
import SecretGiftGame from './components/SecretGiftGame';
import MemoryWall from './components/MemoryWall';
import MemoryCards from './components/MemoryCards';
import DreamUniverse from './components/DreamUniverse';
import BirthdayLetter from './components/BirthdayLetter';
import MiniGame from './components/MiniGame';
import MusicPlayer from './components/MusicPlayer';
import Timeline from './components/Timeline';
import SecretPassword from './components/SecretPassword';
import EasterEggs from './components/EasterEggs';
import ParticleSystem from './components/ParticleSystem';
import FloatingFlowers from './components/FloatingFlowers';
import MemoryCarousel from './components/MemoryCarousel';
import FinalSurprise from './components/FinalSurprise';

export default function App() {
  const [entered, setEntered] = useState(false);
  const [musicMode, setMusicMode] = useState(false);
  const [key, setKey] = useState(0);

  const handleEnter = useCallback(() => {
    setEntered(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleReplay = () => {
    setEntered(false);
    setMusicMode(false);
    setKey(k => k + 1);
    window.scrollTo({ top: 0 });
  };

  return (
    <div key={key} className="relative min-h-screen bg-birthday" style={{ overflowX: 'hidden' }}>
      {/* Global particles */}
      <ParticleSystem active={entered} intense={musicMode} />

      {/* Floating flowers */}
      {entered && <FloatingFlowers />}

      {/* Easter eggs (fixed position elements) */}
      {entered && <EasterEggs />}

      {/* Music player */}
      {entered && (
        <MusicPlayer onMusicMode={setMusicMode} />
      )}

      {/* Intro overlay */}
      <AnimatePresence>
        {!entered && (
          <BirthdayIntro onEnter={handleEnter} />
        )}
      </AnimatePresence>

      {/* Main experience */}
      {entered && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* 1. Hero birthday room with title */}
          <BirthdayRoom />

          {/* 2. Balloon environment */}
          <ThreeDBalloons />

          {/* 3. 3D Birthday cake with candles */}
          <BirthdayCake musicMode={musicMode} />

          {/* 4. Gift boxes */}
          <GiftBoxes />

          {/* 5. Secret gift game */}
          <SecretGiftGame />

          {/* 6. Memory wall - real photos */}
          <MemoryWall />

          {/* 7. 3D Carousel */}
          <MemoryCarousel />

          {/* 8. 10 flip cards */}
          <MemoryCards />

          {/* 9. Dream universe */}
          <DreamUniverse />

          {/* 10. Birthday letter */}
          <BirthdayLetter />

          {/* 11. Mini game */}
          <MiniGame />

          {/* 12. 10-year timeline */}
          <Timeline />

          {/* 13. Secret password */}
          <SecretPassword />

          {/* 14. Final cinematic surprise */}
          <FinalSurprise onReplay={handleReplay} />
        </motion.main>
      )}
    </div>
  );
}
