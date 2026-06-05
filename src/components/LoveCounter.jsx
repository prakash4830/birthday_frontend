import React, { useState, useEffect } from 'react';
import { FiHeart } from 'react-icons/fi';

/**
 * LoveCounter Component
 * 
 * Objectives taught:
 * 1. React Lifecycle with `useEffect`: running calculations on intervals.
 * 2. Date Arithmetic: finding the millisecond difference between two timestamps and extracting days/hours/minutes/seconds.
 * 3. Cleaning up timers: explaining why `clearInterval` is critical to prevent CPU leakages and phantom state updates.
 */
export default function LoveCounter() {
  // Anniversary date: June 23rd, 2024 (Format: YYYY, MM (0-indexed), DD)
  const anniversaryDate = new Date(2024, 5, 23, 0, 0, 0); 
  
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Function to calculate exact duration
    const calculateTime = () => {
      const now = new Date();
      const difference = now.getTime() - anniversaryDate.getTime();

      if (difference < 0) return; // In case anniversary is in the future

      // Convert milliseconds to larger time frames
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeElapsed({ days, hours, minutes, seconds });
    };

    // Calculate immediately on mount
    calculateTime();

    // Refresh every second
    const interval = setInterval(calculateTime, 1000);

    // CLEANUP: Dispose of the interval timer when this component disappears
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="section-container visible">
      <div className="glass-card" style={{ maxWidth: '550px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '15px' }}>
          <FiHeart className="animate-pulse" style={{ color: 'var(--primary-pink)', fontSize: '1.8rem' }} />
          <h2 className="title-romantic" style={{ fontSize: '1.8rem', margin: 0 }}>Days of Loving You</h2>
          <FiHeart className="animate-pulse" style={{ color: 'var(--primary-pink)', fontSize: '1.8rem' }} />
        </div>
        
        <p style={{ color: 'var(--text-muted)', marginBottom: '25px', fontSize: '0.95rem' }}>
          Every second with you has been a beautiful blessing. Here is how long we've shared our hearts:
        </p>

        {/* Counter Grid */}
        <div className="counter-grid">
          <div className="counter-box">
            <div className="counter-number">{timeElapsed.days}</div>
            <div className="counter-label">Days</div>
          </div>
          <div className="counter-box">
            <div className="counter-number">{String(timeElapsed.hours).padStart(2, '0')}</div>
            <div className="counter-label">Hours</div>
          </div>
          <div className="counter-box">
            <div className="counter-number">{String(timeElapsed.minutes).padStart(2, '0')}</div>
            <div className="counter-label">Mins</div>
          </div>
          <div className="counter-box">
            <div className="counter-number">{String(timeElapsed.seconds).padStart(2, '0')}</div>
            <div className="counter-label">Secs</div>
          </div>
        </div>

        <p style={{ marginTop: '25px', fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--secondary-purple)' }}>
          ...and counting, forever. ❤️
        </p>
      </div>
    </div>
  );
}
