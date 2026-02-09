import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import ScratchCard from './ScratchCard';
import musicFile from './assets/music.mp3'; // Move music.mp3 from public to src/assets

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);

  // Generate hearts only on client side to avoid hydration mismatch
  useEffect(() => {
    const heartArray = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 20 + 15
    }));
    setHearts(heartArray);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-rose-400/40 animate-float"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            fontSize: `${heart.size}px`,
            bottom: '-10%'
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const audioRef = useRef(null);

  const variants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.1 },
  };

  const handleStart = () => {
    if (audioRef.current) audioRef.current.play().catch(() => {});
    setPage(2);
  };

  const handleFinalChoice = () => {
    // Grand Confetti
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      confetti({
        particleCount: 40,
        spread: 100,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#ff4d6d', '#ff8fa3', '#ffffff']
      });
    }, 250);

    // Show the custom modal instead of alert
    setShowModal(true);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center relative overflow-hidden font-sans"
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('bg.jpg')` }}
    >
      <audio ref={audioRef} src={musicFile} loop />
      <FloatingHearts />

      <AnimatePresence mode="wait">
        {page === 1 && (
          <motion.div key="p1" {...variants} className="z-10 bg-white/10 backdrop-blur-md p-10 rounded-3xl text-center text-white border border-white/20 shadow-2xl">
            <h1 className="text-5xl font-bold mb-6">Hi Love,</h1>
            <p className="text-xl mb-8">This message is for you😘😘</p>
            <button onClick={handleStart} className="bg-rose-500 hover:bg-rose-600 px-10 py-4 rounded-full font-bold text-xl transition-all hover:scale-110 shadow-lg">
              Open Letter 💌
            </button>
          </motion.div>
        )}

        {page === 2 && (
          <motion.div key="p2" {...variants} className="z-10 bg-black/20 backdrop-blur-lg border border-white/30 p-8 rounded-3xl text-center max-w-md text-white">
            <h2 className="text-2xl font-bold mb-6">Do you know how many days we've spent together?</h2>
            <div className="space-y-4 text-lg">
              <p className="bg-white/10 p-4 rounded-xl">We have spent <span className="font-bold text-rose-400">254 days</span> together.</p>
              <p>That's roughly <span className="font-bold">6,096 hours</span>.</p>
              <p>Or around <span className="font-bold text-rose-300">2,56,03,200 heartbeats</span>.</p>
            </div>
            <button onClick={() => setPage(3)} className="mt-8 bg-rose-500 px-8 py-3 rounded-full font-bold transition-all hover:scale-105">
              Next ❤️
            </button>
          </motion.div>
        )}

        {page === 3 && (
          <motion.div key="p3" {...variants} className="z-10 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl text-center max-w-md text-white">
            <h3 className="text-2xl font-bold mb-4 text-rose-300">A special message for you❤️</h3>
            <p className="italic leading-relaxed text-gray-100 mb-6 text-sm md:text-base">
              "My Love, Every day with you feels like a gift. You've shown me the true meaning of love... This Valentine's Day, I want to remind you that you are my heart and my everything." 🧿🧿🧿
            </p>
            <button onClick={() => setPage(4)} className="bg-rose-500 px-10 py-3 rounded-full font-bold hover:scale-105">
              Next 🌹
            </button>
          </motion.div>
        )}

        {page === 4 && (
          <motion.div key="p4" {...variants} className="z-10 flex flex-col items-center">
            <h2 className="text-white text-3xl font-bold mb-6 text-center">Scratch for a surprise... 🕵️‍♀️</h2>
            <ScratchCard />
            <button 
              onClick={() => setPage(5)} 
              className="mt-8 bg-white text-rose-600 px-10 py-4 rounded-full font-bold animate-bounce shadow-xl"
            >
              I found it! Click me 💌
            </button>
          </motion.div>
        )}

        {page === 5 && (
          <motion.div 
            key="p5" 
            initial={{ y: 50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            className="z-10 bg-white/20 backdrop-blur-3xl p-8 rounded-3xl text-center text-white border border-white/40 shadow-2xl max-w-sm w-full"
          >
            <h1 className="text-3xl font-black mb-8">Will you be my valentine baby? 🥺</h1>
            <div className="flex flex-col gap-4">
              <button onClick={handleFinalChoice} className="bg-rose-500 hover:bg-rose-600 py-4 rounded-2xl font-bold text-xl transition-all">Yes!</button>
              <button onClick={handleFinalChoice} className="bg-rose-500 hover:bg-rose-600 py-4 rounded-2xl font-bold text-xl transition-all">Your option is only me</button>
              <button onClick={handleFinalChoice} className="bg-rose-500 hover:bg-rose-600 py-4 rounded-2xl font-bold text-xl transition-all">Obviously yes</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

        {/* FINAL LOVE MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.5, rotate: -5 }} 
              animate={{ scale: 1, rotate: 0 }}
              className="bg-white p-4 pb-12 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.3)] max-w-sm w-full relative"
            >
              {/* The Polaroid Frame */}
              <div className="relative overflow-hidden border-[12px] border-white shadow-inner">
                <img 
                  src="us.jpg" 
                  alt="Our Memory" 
                  className="w-full h-auto object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500" 
                />
              </div>

              {/* Handwritten Caption */}
              <div className="mt-6 text-center">
                <h2 
                  className="text-3xl font-bold text-gray-800" 
                  style={{ fontFamily: '"Dancing Script", cursive' }}
                >
                  My Everything ❤️
                </h2>
                <p className="text-gray-400 text-xs mt-2 uppercase tracking-widest">
                  Valentine's Day 2026
                </p>
              </div>

              {/* Close Button (Small X in corner) */}
              <button 
                onClick={() => setShowModal(false)}
                className="absolute -top-4 -right-4 bg-rose-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-rose-600 transition-colors"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;