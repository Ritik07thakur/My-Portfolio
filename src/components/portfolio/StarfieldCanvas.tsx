
"use client";

import React, { useRef, useEffect, useCallback } from 'react';

interface Star {
  x: number;
  y: number;
  z: number; // Depth for parallax
  size: number;
  brightness: number;
  initialBrightness: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface ShootingStar {
  x: number;
  y: number;
  len: number;
  speed: number;
  angle: number;
  opacity: number;
}

const StarfieldCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);
  const scrollYRef = useRef<number>(0);

  const NUM_STARS = 200;
  const NUM_NEBULA_CLOUDS = 4; 

  const initStars = useCallback((width: number, height: number) => {
    starsRef.current = [];
    for (let i = 0; i < NUM_STARS; i++) {
      starsRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.8 + 0.2, 
        size: Math.random() * 3.5 + 2,
        brightness: Math.random() * 0.8 + 0.2,
        initialBrightness: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }
  }, []);
  
  const createShootingStar = useCallback((width: number, height: number) => {
    if (Math.random() < 0.0025 && shootingStarsRef.current.length < 5) {
        shootingStarsRef.current.push({
            x: Math.random() * width,
            y: Math.random() * height * 0.3, 
            len: Math.random() * 100 + 70,
            speed: Math.random() * 14 + 14,
            angle: Math.PI * 0.25 + (Math.random() * Math.PI * 0.15 - Math.PI * 0.075),
            opacity: 1,
        });
    }
  }, []);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars(canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (event: MouseEvent) => {
      mousePosRef.current = { x: event.clientX, y: event.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const drawNebula = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        for(let i=0; i < NUM_NEBULA_CLOUDS; i++) {
            let nebulaBaseX = (Math.sin(Date.now() * 0.000013 * (i + 1) + i * 2.1) * 0.4 + 0.5) * width;
            let nebulaBaseY = (Math.cos(Date.now() * 0.000011 * (i + 1) + i * 2.6) * 0.4 + 0.5) * height;
            const radius = (Math.sin(Date.now() * 0.000019 * (i + 1) + i * 1.2) * 0.3 + 0.4) * Math.min(width, height);
            
            if (mousePosRef.current) {
                const mouseXNorm = (mousePosRef.current.x - width / 2) / (width / 2); // -1 to 1
                const mouseYNorm = (mousePosRef.current.y - height / 2) / (height / 2); // -1 to 1
                
                const maxNebulaDisplacement = 5; // Max pixels nebula can shift
                nebulaBaseX += mouseXNorm * maxNebulaDisplacement;
                nebulaBaseY += mouseYNorm * maxNebulaDisplacement;
            }
            
            const grad = ctx.createRadialGradient(nebulaBaseX, nebulaBaseY, radius * 0.05, nebulaBaseX, nebulaBaseY, radius);
            const hue = (240 + i * 30) % 360;
            grad.addColorStop(0, `hsla(${hue}, 75%, 65%, 0.1)`);
            grad.addColorStop(0.5, `hsla(${hue}, 75%, 65%, 0.04)`);
            grad.addColorStop(1, `hsla(${hue}, 75%, 65%, 0)`);
            
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(nebulaBaseX, nebulaBaseY, radius, 0, Math.PI * 2);
            ctx.fill();
        }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawNebula(ctx, canvas.width, canvas.height);

      starsRef.current.forEach(star => {
        const scrollParallaxY = star.y - scrollYRef.current * star.z * 0.35;
        
        let drawX = star.x;
        let drawY = scrollParallaxY;

        // Mouse parallax effect
        if (mousePosRef.current) {
          const mouseXNorm = (mousePosRef.current.x - canvas.width / 2) / (canvas.width / 2); // Normalized: -1 to 1
          const mouseYNorm = (mousePosRef.current.y - canvas.height / 2) / (canvas.height / 2); // Normalized: -1 to 1

          const maxDisplacement = 20; // Max pixels stars can shift based on mouse
          drawX += mouseXNorm * maxDisplacement * star.z; // Deeper stars (smaller z) move less
          drawY += mouseYNorm * maxDisplacement * star.z;
        }
        
        star.brightness = star.initialBrightness * (0.5 + 0.5 * Math.sin(star.twinklePhase + Date.now() * star.twinkleSpeed));

        let currentSize = star.size;
        let currentBrightness = star.brightness;

        if (mousePosRef.current) {
          const dx = drawX - mousePosRef.current.x; // Use final draw positions for glow distance
          const dy = drawY - mousePosRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const glowRadius = 200;
          if (distance < glowRadius) {
            const factor = 1 - distance / glowRadius;
            currentBrightness = Math.min(1, star.brightness + factor * 0.7);
            currentSize = star.size + factor * 2;
          }
        }
        
        const starHue = 230 + star.z * 20;
        ctx.fillStyle = `hsla(${starHue}, 80%, 90%, ${currentBrightness})`; 
        ctx.beginPath();
        ctx.arc(drawX, drawY, currentSize * star.z, 0, Math.PI * 2);
        ctx.fill();
      });

      createShootingStar(canvas.width, canvas.height);
      shootingStarsRef.current = shootingStarsRef.current.filter(ss => {
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.opacity -= 0.007;

        if (ss.opacity <= 0) return false;

        const trailGrad = ctx.createLinearGradient(
            ss.x, 
            ss.y, 
            ss.x - Math.cos(ss.angle) * ss.len, 
            ss.y - Math.sin(ss.angle) * ss.len
        );
        trailGrad.addColorStop(0, `rgba(255, 192, 203, ${ss.opacity * 0.9})`);
        trailGrad.addColorStop(1, `rgba(255, 192, 203, 0)`);
        
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - Math.cos(ss.angle) * ss.len, ss.y - Math.sin(ss.angle) * ss.len);
        ctx.strokeStyle = trailGrad;
        ctx.lineWidth = 2.8;
        ctx.lineCap = 'round';
        ctx.stroke();
        return true;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [initStars, createShootingStar]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      aria-hidden="true"
    />
  );
};

export default StarfieldCanvas;

