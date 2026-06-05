import React, { useState, useEffect } from 'react';
import { FiHeart } from 'react-icons/fi';

// 23 June 2026, 12:00 AM IST = 22 June 2026, 6:30 PM UTC
const BIRTHDAY_TIME = new Date('2026-06-23T18:30:00.000Z');
//const BIRTHDAY_TIME = new Date(Date.now() + 5 * 1000);

// Testing only
const DEV_BYPASS = true;

// Delay after countdown completes before moving to login
const POST_COUNTDOWN_DELAY = 1000; // 1 second

function pad(n) {
  return String(n).padStart(2, '0');
}

function getTimeLeft() {
  const now = new Date();
  const diff = BIRTHDAY_TIME - now;

  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export default function CountdownScreen({ onUnlocked }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [isWaitingToUnlock, setIsWaitingToUnlock] = useState(false);

  useEffect(() => {
    const initial = getTimeLeft();

    // If user comes after countdown is already complete,
    // still show delay before moving to login
    if (!initial) {
      setIsWaitingToUnlock(true);

      const unlockTimer = setTimeout(() => {
        onUnlocked();
      }, POST_COUNTDOWN_DELAY);

      return () => clearTimeout(unlockTimer);
    }

    const timer = setInterval(() => {
      const remaining = getTimeLeft();
      setTimeLeft(remaining);

      if (!remaining) {
        clearInterval(timer);
        setIsWaitingToUnlock(true);

        const unlockTimer = setTimeout(() => {
          onUnlocked();
        }, POST_COUNTDOWN_DELAY);

        return () => clearTimeout(unlockTimer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [onUnlocked]);

  return (
    <div className="countdown-shell">
      <div className="countdown-card">
        <p className="countdown-label-top">Something special is waiting for you</p>

        <h1 className="countdown-name">Sanchu <FiHeart style={{ fontSize: '2.3rem', color: 'var(--primary-pink)', filter: 'drop-shadow(0 0 8px rgba(255,94,132,0.6))' }} />
        </h1>

        <div className="countdown-divider" />

        {!isWaitingToUnlock ? (
          <>
            <p className="countdown-waiting">
              Your birthday surprise unlocks on
              <br />
              <span className="countdown-date-highlight">
                23 June 2026, 12:00 AM
              </span>
            </p>

            {timeLeft && (
              <div className="countdown-grid">
                <div className="countdown-box">
                  <span className="countdown-number">{pad(timeLeft.days)}</span>
                  <span className="countdown-unit">Days</span>
                </div>

                <div className="countdown-sep">:</div>

                <div className="countdown-box">
                  <span className="countdown-number">{pad(timeLeft.hours)}</span>
                  <span className="countdown-unit">Hours</span>
                </div>

                <div className="countdown-sep">:</div>

                <div className="countdown-box">
                  <span className="countdown-number">{pad(timeLeft.minutes)}</span>
                  <span className="countdown-unit">Mins</span>
                </div>

                <div className="countdown-sep">:</div>

                <div className="countdown-box">
                  <span className="countdown-number">{pad(timeLeft.seconds)}</span>
                  <span className="countdown-unit">Secs</span>
                </div>
              </div>
            )}

            <p className="countdown-hint">
              Come back on your birthday to see the surprise 🎁
            </p>
          </>
        ) : (
          <>
            <p className="countdown-unlocking">🎉 It's your birthday... unlocking your surprise...</p>
            <p className="countdown-hint">
              Preparing something beautiful for you 💖
            </p>
          </>
        )}

        {DEV_BYPASS && (
          <button className="countdown-dev-btn" onClick={onUnlocked}>
            🛠 Dev: Skip Countdown
          </button>
        )}
      </div>
    </div>
  );
}