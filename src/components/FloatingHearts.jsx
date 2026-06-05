import React, { useEffect, useState } from 'react';

/**
 * FloatingHearts Component
 * 
 * Demonstrates:
 * 1. Using `useState` to maintain a dynamic array of floating elements.
 * 2. Using `setInterval` inside `useEffect` to periodically spawn new elements.
 * 3. Cleaning up timers and intervals to prevent memory leaks.
 * 4. Animating HTML/SVG elements using dynamic inline styles combined with CSS keyframes.
 * 5. The necessity of unique key values for list elements in React.
 */
export default function FloatingHearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Spawn a heart every 1.5 seconds
    const interval = setInterval(() => {
      const id = Date.now() + Math.random();
      const left = Math.random() * 100; // Percentage of viewport width
      const size = Math.random() * 20 + 10; // Random diameter (10px to 30px)
      const duration = Math.random() * 8 + 6; // Transition speed (6s to 14s)
      const delay = Math.random() * 2; // Startup delay

      const newHeart = { id, left, size, duration, delay };

      // Update state: append new heart and limit active count to 15 to preserve browser performance
      setHearts((prevHearts) => [...prevHearts.slice(-15), newHeart]);
    }, 1500);

    // CLEANUP: Remove the interval when this component is removed/unmounted
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {hearts.map((heart) => (
        <svg
          key={heart.id}
          className="floating-heart"
          viewBox="0 0 32 29.6"
          style={{
            left: `${heart.left}%`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            fill: `rgba(255, 94, 132, ${Math.random() * 0.4 + 0.3})`, // Randomized alpha transparency
          }}
        >
          <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
            c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z" />
        </svg>
      ))}
    </>
  );
}
