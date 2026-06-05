import React, { useEffect, useState } from 'react';

/**
 * Roses Component
 * 
 * Demonstrates:
 * 1. Simulating gravity with a falling animation.
 * 2. Creating natural falling motions using SVG rotations and translation keyframes.
 * 3. Restricting memory footprint by slicing old entries from state arrays.
 */
export default function Roses() {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    // Spawn a rose petal every 2 seconds
    const interval = setInterval(() => {
      const id = Date.now() + Math.random();
      const left = Math.random() * 100; // Random horizontal column
      const size = Math.random() * 18 + 12; // 12px to 30px
      const duration = Math.random() * 7 + 8; // Speed (8s to 15s)
      const delay = Math.random() * 3;
      const angle = Math.random() * 360; // Initial angle

      const newPetal = { id, left, size, duration, delay, angle };

      setPetals((prev) => [...prev.slice(-20), newPetal]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {petals.map((petal) => (
        <svg
          key={petal.id}
          className="falling-rose"
          viewBox="0 0 100 100"
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size}px`,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            transform: `rotate(${petal.angle}deg)`,
          }}
        >
          {/* Custom drawing of a rose petal */}
          <path
            d="M 50,0 
               C 20,10 0,40 10,70 
               C 20,95 80,95 90,70 
               C 100,40 80,10 50,0 Z"
            fill={`rgba(${200 + Math.floor(Math.random() * 55)}, ${30 + Math.floor(Math.random() * 40)}, ${70 + Math.floor(Math.random() * 40)}, ${Math.random() * 0.3 + 0.5})`}
          />
          {/* Petal midrib detail */}
          <path
            d="M 50,0 C 45,30 48,60 50,90"
            stroke="rgba(0,0,0,0.1)"
            fill="none"
            strokeWidth="2"
          />
        </svg>
      ))}
    </>
  );
}
