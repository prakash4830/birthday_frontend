import React, { useEffect, useRef } from 'react';

/**
 * Fireworks Component
 * 
 * Objectives taught:
 * 1. Particle Systems: simulating physical forces like velocity, gravity, friction, and fade-outs.
 * 2. Canvas Rendering 2D Context: using drawing primitives like lines and arcs.
 * 3. Recursion loops using `requestAnimationFrame`.
 * 4. Random generator functions for color spectrums and burst sizes.
 */
export default function Fireworks() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let fireworks = [];

    // Resize listener
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Helper functions
    const random = (min, max) => Math.random() * (max - min) + min;
    const pickRealisticHue = () => {
      const palettes = [30, 45, 55, 10, 185, 210, 260, 295, 330];
      const base = palettes[Math.floor(random(0, palettes.length))];
      return base + random(-12, 12);
    };

    // Firework shell class (shoots up from bottom)
    class Firework {
      constructor() {
        this.x = random(canvas.width * 0.05, canvas.width * 0.95);
        this.y = canvas.height;
        const sideRoll = Math.random();
        if (sideRoll < 0.38) {
          this.tx = random(canvas.width * 0.08, canvas.width * 0.35);
        } else if (sideRoll > 0.62) {
          this.tx = random(canvas.width * 0.65, canvas.width * 0.92);
        } else {
          this.tx = random(canvas.width * 0.35, canvas.width * 0.65);
        }
        this.ty = random(canvas.height * 0.08, canvas.height * 0.55); // Target Y height across a wider range
        this.speed = random(4.5, 7);
        this.angle = Math.atan2(this.ty - this.y, this.tx - this.x);
        this.distanceToTarget = Math.hypot(this.tx - this.x, this.ty - this.y);
        this.distanceTraveled = 0;
        this.coordinates = [];
        this.coordinateCount = 3;
        while (this.coordinateCount--) {
          this.coordinates.push([this.x, this.y]);
        }
        this.hue = pickRealisticHue();
      }

      update(index) {
        this.coordinates.pop();
        this.coordinates.unshift([this.x, this.y]);

        const vx = Math.cos(this.angle) * this.speed;
        const vy = Math.sin(this.angle) * this.speed;
        this.distanceTraveled = Math.hypot(vx, vy);

        if (this.distanceTraveled >= this.distanceToTarget) {
          // Explode and remove from list with a bigger burst
          createParticles(this.tx, this.ty, this.hue, Math.floor(random(70, 110)));
          if (Math.random() > 0.5) {
            createParticles(this.tx + random(-80, 80), this.ty + random(-60, 60), this.hue + random(-40, 40), Math.floor(random(20, 45)));
          }
          fireworks.splice(index, 1);
        } else {
          this.x += vx;
          this.y += vy;
          this.distanceToTarget -= this.distanceTraveled;
        }
      }

      draw() {
        ctx.beginPath();
        const lastCoord = this.coordinates[this.coordinates.length - 1];
        ctx.moveTo(lastCoord[0], lastCoord[1]);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = `hsla(${this.hue}, ${random(80, 95)}%, ${random(65, 85)}%, 0.85)`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    // Individual Exploding Spark class
    class Particle {
      constructor(x, y, hue) {
        this.x = x;
        this.y = y;
        this.coordinates = [];
        this.coordinateCount = 5;
        while (this.coordinateCount--) {
          this.coordinates.push([this.x, this.y]);
        }
        this.angle = random(0, Math.PI * 2);
        this.speed = random(2, 10);
        this.friction = 0.94; // Gradually slow down
        this.gravity = 0.18;   // Pull down
        this.hue = hue || random(320, 380); // Pink and purple sparks
        this.brightness = random(50, 90);
        this.alpha = 1;
        this.decay = random(0.01, 0.025); // Fade out rate
      }

      update(index) {
        this.coordinates.pop();
        this.coordinates.unshift([this.x, this.y]);

        this.speed *= this.friction;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + this.gravity;
        this.alpha -= this.decay;

        if (this.alpha <= this.decay) {
          particles.splice(index, 1);
        }
      }

      draw() {
        ctx.beginPath();
        const lastCoord = this.coordinates[this.coordinates.length - 1];
        ctx.moveTo(lastCoord[0], lastCoord[1]);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    }

    // Spawn sparks at explosion site
    const createParticles = (x, y, hue, count = 70) => {
      while (count--) {
        particles.push(new Particle(x, y, hue));
      }
    };

    // Render/Update Loop
    const loop = () => {
      // Clear with translucency to create black galaxy effect
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.85)'; // True black galaxy background
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter'; // Overlay colors beautifully

      // Randomly launch rockets with higher intensity and spread
      if (Math.random() < 0.18 && fireworks.length < 14) {
        fireworks.push(new Firework());
      }
      if (Math.random() < 0.08 && fireworks.length < 10) {
        fireworks.push(new Firework());
      }
      if (fireworks.length === 0 && particles.length < 80) {
        fireworks.push(new Firework());
      }

      let i = fireworks.length;
      while (i--) {
        fireworks[i].draw();
        fireworks[i].update(i);
      }

      let j = particles.length;
      while (j--) {
        particles[j].draw();
        particles[j].update(j);
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    // Initialize
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    loop();

    // CLEANUP
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 3 // Place right on top of background
      }}
    />
  );
}
