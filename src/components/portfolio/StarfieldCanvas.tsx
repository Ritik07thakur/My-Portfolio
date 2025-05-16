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

  const NUM_STARS = 200; // Decreased from 500
  const NUM_NEBULA_CLOUDS = 4; 

  const initStars = useCallback((width: number, height: number) => {
    starsRef.current = [];
    for (let i = 0; i < NUM_STARS; i++) {
      starsRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.8 + 0.2, 
        size: Math.random() * 3.5 + 2, // Increased size (was Math.random() * 3 + 1.5)
        brightness: Math.random() * 0.8 + 0.2,
        initialBrightness: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }
  }, []);
  
  const createShootingStar = useCallback((width: number, height: number) => {
    if (Math.random() < 0.0025 && shootingStarsRef.current.length < 5) {  // Slightly increased chance and max
        shootingStarsRef.current.push({
            x: Math.random() * width,
            y: Math.random() * height * 0.3, 
            len: Math.random() * 100 + 70, // Further increased length
            speed: Math.random() * 14 + 14, // Slightly faster
            angle: Math.PI * 0.25 + (Math.random() * Math.PI * 0.15 - Math.PI * 0.075), // Wider angle variation
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
            const x = (Math.sin(Date.now() * 0.000013 * (i + 1) + i * 2.1) * 0.4 + 0.5) * width; // Adjusted movement
            const y = (Math.cos(Date.now() * 0.000011 * (i + 1) + i * 2.6) * 0.4 + 0.5) * height; // Adjusted movement
            const radius = (Math.sin(Date.now() * 0.000019 * (i + 1) + i * 1.2) * 0.3 + 0.4) * Math.min(width, height); // Larger, more dynamic radius
            
            const grad = ctx.createRadialGradient(x, y, radius * 0.05, x, y, radius); // Inner gradient starts smaller
            const hue = (240 + i * 30) % 360; // Different hue range for more variation
            grad.addColorStop(0, `hsla(${hue}, 75%, 65%, 0.1)`); // Slightly more intense inner color
            grad.addColorStop(0.5, `hsla(${hue}, 75%, 65%, 0.04)`);
            grad.addColorStop(1, `hsla(${hue}, 75%, 65%, 0)`);
            
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
        const parallaxY = star.y - scrollYRef.current * star.z * 0.35; // Slightly more parallax
        
        star.brightness = star.initialBrightness * (0.5 + 0.5 * Math.sin(star.twinklePhase + Date.now() * star.twinkleSpeed)); // More pronounced twinkle

        let currentSize = star.size;
        let currentBrightness = star.brightness;

        if (mousePosRef.current) {
          const dx = star.x - mousePosRef.current.x;
          const dy = parallaxY - mousePosRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const glowRadius = 200; // Larger glow radius
          if (distance < glowRadius) {
            const factor = 1 - distance / glowRadius;
            currentBrightness = Math.min(1, star.brightness + factor * 0.7); // Brighter glow
            currentSize = star.size + factor * 2; // Larger glow effect
          }
        }
        
        // Star color with slight hue variation based on depth (z)
        const starHue = 230 + star.z * 20; // Subtle blue to lavender shift
        ctx.fillStyle = `hsla(${starHue}, 80%, 90%, ${currentBrightness})`; 
        ctx.beginPath();
        ctx.arc(star.x, parallaxY, currentSize * star.z, 0, Math.PI * 2);
        ctx.fill();
      });

      createShootingStar(canvas.width, canvas.height);
      shootingStarsRef.current = shootingStarsRef.current.filter(ss => {
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.opacity -= 0.007; // Slightly faster fade for more dynamic feel

        if (ss.opacity <= 0) return false;

        // Shooting star trail gradient
        const trailGrad = ctx.createLinearGradient(
            ss.x, 
            ss.y, 
            ss.x - Math.cos(ss.angle) * ss.len, 
            ss.y - Math.sin(ss.angle) * ss.len
        );
        trailGrad.addColorStop(0, `rgba(255, 192, 203, ${ss.opacity * 0.9})`); // Brighter head
        trailGrad.addColorStop(1, `rgba(255, 192, 203, 0)`); // Fading tail
        
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - Math.cos(ss.angle) * ss.len, ss.y - Math.sin(ss.angle) * ss.len);
        ctx.strokeStyle = trailGrad; // Use gradient for trail
        ctx.lineWidth = 2.8; // Slightly thicker trails
        ctx.lineCap = 'round'; // Rounded trail ends
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
