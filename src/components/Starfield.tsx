import React, { useEffect, useRef } from 'react';

const Starfield: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const starCount = 100;
    
    // Create stars
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      star.style.animationDuration = `${3 + Math.random() * 2}s`;
      
      // Vary star sizes
      const size = Math.random() > 0.8 ? 3 : Math.random() > 0.5 ? 2 : 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      
      container.appendChild(star);
    }
    
    // Create shooting stars
    const createShootingStar = () => {
      const shootingStar = document.createElement('div');
      shootingStar.className = 'absolute w-[2px] h-[2px] bg-white animate-shooting-star';
      shootingStar.style.left = `${Math.random() * 100}%`;
      shootingStar.style.top = `${Math.random() * 50}%`;
      container.appendChild(shootingStar);
      
      setTimeout(() => {
        shootingStar.remove();
      }, 3000);
    };
    
    const shootingStarInterval = setInterval(createShootingStar, 5000);
    
    return () => {
      clearInterval(shootingStarInterval);
      container.innerHTML = '';
    };
  }, []);

  return <div ref={containerRef} className="starfield" />;
};

export default Starfield;