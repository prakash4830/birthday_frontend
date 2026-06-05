import React, { useEffect, useRef } from 'react';

/**
 * GalaxyBackground Component
 * 
 * Demonstrates:
 * 1. HTML5 Canvas rendering in React using `useRef`.
 * 2. High-performance rendering loop with `requestAnimationFrame`.
 * 3. Cleaning up side effects (event listeners & animation loops) in `useEffect`.
 * 4. Responsive canvas resizing.
 */
export default function GalaxyBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let stars = [];
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    // Star Particle class representation
    class Star {
      constructor() {
        this.reset();
      }

      reset() {
        // Star positions relative to screen center
        this.x = (Math.random() - 0.5) * canvas.width;
        this.y = (Math.random() - 0.5) * canvas.height;
        this.z = Math.random() * canvas.width; // Depth factor
        this.color = `hsl(${280 + Math.random() * 60}, 70%, ${70 + Math.random() * 30}%)`; // Violet/Pink shades
        this.size = Math.random() * 1.5 + 0.5;
      }

      update() {
        // Move stars closer (simulate flying forward through a galaxy)
        this.z -= 1.5;
        if (this.z <= 0) {
          this.reset();
        }
      }

      draw() {
        // Perspective projection: map 3D coordinates to 2D screen coordinates
        const px = (this.x / this.z) * canvas.width + canvas.width / 2;
        const py = (this.y / this.z) * canvas.height + canvas.height / 2;
        const sizeScaled = (1 - this.z / canvas.width) * this.size * 3;

        // Verify if star is within screen boundaries
        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
          ctx.beginPath();
          ctx.arc(px, py, sizeScaled, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          // Apply a glowing glow effect to larger stars
          if (sizeScaled > 1.8) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
          } else {
            ctx.shadowBlur = 0;
          }
          ctx.fill();
        }
      }
    }

    // Initialize stars array
    const initStars = () => {
      stars = [];
      const numStars = Math.min(250, Math.floor((canvas.width * canvas.height) / 4000));
      for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
      }
    };

    // Render loop
    const render = () => {
      // Clear screen with a slight translucent overlay to create motion trails
      ctx.fillStyle = 'rgba(11, 3, 20, 0.2)';
      ctx.shadowBlur = 0; // Disable shadow for backdrop fill
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw faint background nebula color glow
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 10,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 1.5
      );
      gradient.addColorStop(0, 'rgba(74, 12, 61, 0.15)'); // Subtle deep magenta center
      gradient.addColorStop(0.5, 'rgba(26, 8, 46, 0.1)'); // Violet transition
      gradient.addColorStop(1, 'rgba(11, 3, 20, 0)'); // Fade to black
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw each star
      stars.forEach((star) => {
        star.update();
        star.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    // Initialize and listen for changes
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    render();

    // CLEANUP: Always remove listeners and cancel animations when component unmounts
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="canvas-background" />;
}
