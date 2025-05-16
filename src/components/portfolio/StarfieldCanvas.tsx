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

  const NUM_STARS = 500; // Decreased from 2000
  const NUM_NEBULA_CLOUDS = 4; // Adjusted from 5

  const initStars = useCallback((width: number, height: number) => {
    starsRef.current = [];
    for (let i = 0; i < NUM_STARS; i++) {
      starsRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.8 + 0.2, // Depth factor (0.2 to 1.0)
        size: Math.random() * 3 + 1.5, // Increased size (was Math.random() * 2 + 0.5)
        brightness: Math.random() * 0.8 + 0.2,
        initialBrightness: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }
  }, []);
  
  const createShootingStar = useCallback((width: number, height: number) => {
    // Increased frequency and max concurrent shooting stars
    if (Math.random() < 0.002 && shootingStarsRef.current.length < 4) { 
        shootingStarsRef.current.push({
            x: Math.random() * width,
            y: Math.random() * height * 0.25, // Start near top
            len: Math.random() * 90 + 60, // Increased length
            speed: Math.random() * 12 + 12, // Slightly increased speed
            angle: Math.PI * 0.25 + (Math.random() * Math.PI * 0.1 - Math.PI * 0.05), // Downwards angle
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
            // Slightly adjusted speed and size parameters for nebula
            const x = (Math.sin(Date.now() * 0.000012 * (i + 1) + i * 2) * 0.35 + 0.5) * width;
            const y = (Math.cos(Date.now() * 0.00001 * (i + 1) + i * 2.5) * 0.35 + 0.5) * height;
            const radius = (Math.sin(Date.now() * 0.000018 * (i + 1) + i) * 0.25 + 0.35) * Math.min(width, height);
            
            const grad = ctx.createRadialGradient(x, y, radius * 0.1, x, y, radius);
            const hue = (250 + i * 25) % 360; // Adjusted hues slightly
            // Increased opacity for more prominent nebulae
            grad.addColorStop(0, `hsla(${hue}, 70%, 60%, 0.08)`); 
            grad.addColorStop(0.5, `hsla(${hue}, 70%, 60%, 0.03)`);
            grad.addColorStop(1, `hsla(${hue}, 70%, 60%, 0)`);
            
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawNebula(ctx, canvas.width, canvas.height);

      starsRef.current.forEach(star => {
        const parallaxY = star.y - scrollYRef.current * star.z * 0.3; 
        
        star.brightness = star.initialBrightness * (0.6 + 0.4 * Math.sin(star.twinklePhase + Date.now() * star.twinkleSpeed)); // Enhanced twinkle

        let currentSize = star.size;
        let currentBrightness = star.brightness;

        if (mousePosRef.current) {
          const dx = star.x - mousePosRef.current.x;
          const dy = parallaxY - mousePosRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const glowRadius = 180; // Increased glow radius
          if (distance < glowRadius) {
            const factor = 1 - distance / glowRadius;
            currentBrightness = Math.min(1, star.brightness + factor * 0.6); // Brighter glow
            currentSize = star.size + factor * 1.5; // Slightly larger glow effect
          }
        }
        
        ctx.fillStyle = `rgba(230, 230, 250, ${currentBrightness})`; 
        ctx.beginPath();
        ctx.arc(star.x, parallaxY, currentSize * star.z, 0, Math.PI * 2);
        ctx.fill();
      });

      createShootingStar(canvas.width, canvas.height);
      shootingStarsRef.current = shootingStarsRef.current.filter(ss => {
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.opacity -= 0.008; // Slower fade for longer trails

        if (ss.opacity <= 0) return false;

        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - Math.cos(ss.angle) * ss.len, ss.y - Math.sin(ss.angle) * ss.len);
        ctx.strokeStyle = `rgba(255, 192, 203, ${ss.opacity * 0.8})`; // Light Pink for shooting stars
        ctx.lineWidth = 2.5; // Slightly thicker trails
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
