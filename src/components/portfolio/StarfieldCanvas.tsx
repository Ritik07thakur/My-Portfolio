
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

  const NUM_STARS = 100; // Decreased star count
  const NUM_NEBULA_CLOUDS = 3; // Slightly reduced for performance with more mouse interaction

  const initStars = useCallback((width: number, height: number) => {
    starsRef.current = [];
    for (let i = 0; i < NUM_STARS; i++) {
      starsRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.8 + 0.2, 
        size: Math.random() * 4 + 2.5, // Slightly increased base size
        brightness: Math.random() * 0.7 + 0.3,
        initialBrightness: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.005 + 0.002, // Decreased twinkleSpeed for slower blinking
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }
  }, []);
  
  const createShootingStar = useCallback((width: number, height: number) => {
    if (Math.random() < 0.002 && shootingStarsRef.current.length < 4) { // Slightly less frequent
        shootingStarsRef.current.push({
            x: Math.random() * width,
            y: Math.random() * height * 0.25, 
            len: Math.random() * 120 + 80, // Slightly longer
            speed: Math.random() * 12 + 12, // Slightly slower max speed
            angle: Math.PI * 0.25 + (Math.random() * Math.PI * 0.1 - Math.PI * 0.05), // Narrower angle variance
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
            // Slow down nebula movement slightly for a more ethereal feel
            let nebulaBaseX = (Math.sin(Date.now() * 0.000009 * (i + 1) + i * 2.1) * 0.4 + 0.5) * width;
            let nebulaBaseY = (Math.cos(Date.now() * 0.000007 * (i + 1) + i * 2.6) * 0.4 + 0.5) * height;
            const radius = (Math.sin(Date.now() * 0.000015 * (i + 1) + i * 1.2) * 0.35 + 0.45) * Math.min(width, height); // Slightly larger base radius
            
            if (mousePosRef.current) {
                const mouseXNorm = (mousePosRef.current.x - width / 2) / (width / 2); 
                const mouseYNorm = (mousePosRef.current.y - height / 2) / (height / 2); 
                
                const maxNebulaDisplacement = 10; // Increased mouse influence on nebula
                nebulaBaseX += mouseXNorm * maxNebulaDisplacement * (1 - (i * 0.1)); // Different layers move differently
                nebulaBaseY += mouseYNorm * maxNebulaDisplacement * (1 - (i * 0.1));
            }
            
            const grad = ctx.createRadialGradient(nebulaBaseX, nebulaBaseY, radius * 0.03, nebulaBaseX, nebulaBaseY, radius); // Smaller inner radius for softer center
            const hue = (230 + i * 35) % 360; // Adjusted hues for more blues/purples
            grad.addColorStop(0, `hsla(${hue}, 70%, 60%, 0.08)`); // Slightly less dense center
            grad.addColorStop(0.5, `hsla(${hue}, 70%, 60%, 0.03)`);
            grad.addColorStop(1, `hsla(${hue}, 70%, 60%, 0)`);
            
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
        const scrollParallaxY = star.y - scrollYRef.current * star.z * 0.3; // Slightly reduced scroll parallax
        
        let drawX = star.x;
        let drawY = scrollParallaxY;

        if (mousePosRef.current) {
          const mouseXNorm = (mousePosRef.current.x - canvas.width / 2) / (canvas.width / 2); 
          const mouseYNorm = (mousePosRef.current.y - canvas.height / 2) / (canvas.height / 2); 

          const maxDisplacement = 25 * star.z; // Increased mouse parallax, more pronounced for closer stars
          drawX += mouseXNorm * maxDisplacement; 
          drawY += mouseYNorm * maxDisplacement;
        }
        
        star.brightness = star.initialBrightness * (0.5 + 0.5 * Math.sin(star.twinklePhase + Date.now() * star.twinkleSpeed));

        let currentSize = star.size;
        let currentBrightness = star.brightness;

        if (mousePosRef.current) {
          const dx = drawX - mousePosRef.current.x; 
          const dy = drawY - mousePosRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const glowRadius = 180; // Slightly smaller glow radius
          if (distance < glowRadius) {
            const factor = 1 - distance / glowRadius;
            currentBrightness = Math.min(1, star.brightness + factor * 0.6); // Slightly less intense glow
            currentSize = star.size + factor * 1.5; // Slightly less size increase
          }
        }
        
        const starHue = 220 + star.z * 30; // Adjusted hue range for stars
        ctx.fillStyle = `hsla(${starHue}, 75%, 85%, ${currentBrightness})`; 
        ctx.beginPath();
        ctx.arc(drawX, drawY, currentSize * star.z, 0, Math.PI * 2); // star.z multiplier makes distant stars smaller
        ctx.fill();
      });

      createShootingStar(canvas.width, canvas.height);
      shootingStarsRef.current = shootingStarsRef.current.filter(ss => {
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.opacity -= 0.006; // Slightly faster fade for shooting stars

        if (ss.opacity <= 0) return false;

        const trailGrad = ctx.createLinearGradient(
            ss.x, 
            ss.y, 
            ss.x - Math.cos(ss.angle) * ss.len, 
            ss.y - Math.sin(ss.angle) * ss.len
        );
        // Using primary theme color for shooting stars
        const primaryColorHSL = getComputedStyle(document.documentElement).getPropertyValue('--primary');
        let primaryRGB = 'rgba(255, 182, 193,'; // Default to Pale Rose if HSL parsing fails
        if (primaryColorHSL) {
            try {
                const [h, s, l] = primaryColorHSL.match(/\d+/g)!.map(Number);
                // Basic HSL to RGB conversion (approximate)
                const C = (1 - Math.abs(2 * (l/100) - 1)) * (s/100);
                const X = C * (1 - Math.abs(((h/60) % 2) - 1));
                const m = (l/100) - C/2;
                let r=0, g=0, b=0;
                if (h >= 0 && h < 60) { r=C; g=X; b=0; }
                else if (h >= 60 && h < 120) { r=X; g=C; b=0; }
                else if (h >= 120 && h < 180) { r=0; g=C; b=X; }
                else if (h >= 180 && h < 240) { r=0; g=X; b=C; }
                else if (h >= 240 && h < 300) { r=X; g=0; b=C; }
                else { r=C; g=0; b=X; }
                primaryRGB = `rgba(${Math.round((r+m)*255)}, ${Math.round((g+m)*255)}, ${Math.round((b+m)*255)},`;
            } catch (e) {
                // console.error("Failed to parse --primary color for shooting star", e);
            }
        }

        trailGrad.addColorStop(0, `${primaryRGB} ${ss.opacity * 0.8})`);
        trailGrad.addColorStop(1, `${primaryRGB} 0)`);
        
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - Math.cos(ss.angle) * ss.len, ss.y - Math.sin(ss.angle) * ss.len);
        ctx.strokeStyle = trailGrad;
        ctx.lineWidth = 2.5; // Slightly thinner
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
