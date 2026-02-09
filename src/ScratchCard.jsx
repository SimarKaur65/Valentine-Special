import React, { useRef, useEffect } from 'react';

const ScratchCard = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const img = new Image();
    
    // Use a cache-busting string to force a fresh reload if needed
    img.src = `scratch-cover.jpg?t=${new Date().getTime()}`;

    const initCanvas = () => {
      // Step 1: Clear everything to prevent "already scratched" look
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Step 2: Draw the cover image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    img.onload = initCanvas;

    const scratch = (e) => {
      if (e.type === 'touchmove') e.preventDefault();

      const rect = canvas.getBoundingClientRect();
      // Calculate coordinates precisely
      const x = ((e.clientX || (e.touches && e.touches[0].clientX)) - rect.left) * (canvas.width / rect.width);
      const y = ((e.clientY || (e.touches && e.touches[0].clientY)) - rect.top) * (canvas.height / rect.height);

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 40, 0, Math.PI * 2);
      ctx.fill();
    };

    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('touchmove', scratch, { passive: false });

    return () => {
      canvas.removeEventListener('mousemove', scratch);
      canvas.removeEventListener('touchmove', scratch);
    };
  }, []);

  return (
    <div className="w-[350px] h-[450px] relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/30">
      <div className="absolute inset-0 bg-rose-100 flex flex-col items-center justify-center p-8 text-center">
        <p className="text-rose-600 font-bold text-2xl italic leading-relaxed">
          "I have a very important question for you on the next page..."
        </p>
        <span className="mt-4 text-4xl">🧿💖✨</span>
      </div>

      <canvas 
        ref={canvasRef} 
        width={350} 
        height={450} 
        className="absolute top-0 left-0 cursor-crosshair touch-none"
        style={{ touchAction: 'none' }}
      />
    </div>
  );
};

export default ScratchCard;