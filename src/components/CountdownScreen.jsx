import React, { useState, useEffect } from 'react';
import { FiHeart } from 'react-icons/fi';

// const BIRTHDAY_TIME = new Date('2026-06-07T18:30:00.000Z');
const BIRTHDAY_TIME = new Date(Date.now() + 20 * 1000);

const DEV_BYPASS = false;
const POST_COUNTDOWN_DELAY = 6000;

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

export default function CountdownScreen({ onUnlocked, onFirstTap, audioUnlocked }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [isWaitingToUnlock, setIsWaitingToUnlock] = useState(false);

  useEffect(() => {
    let unlockTimer = null;

    const initial = getTimeLeft();

    if (!initial) {
      setIsWaitingToUnlock(true);

      unlockTimer = setTimeout(() => {
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

        unlockTimer = setTimeout(() => {
          onUnlocked();
        }, POST_COUNTDOWN_DELAY);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      if (unlockTimer) clearTimeout(unlockTimer);
    };
  }, [onUnlocked]);

  return (
    <div className="countdown-shell">
      <div className="countdown-card">
        {!audioUnlocked && (
          <div className="countdown-audio-prompt-wrap">
            <button
              type="button"
              className="countdown-audio-prompt"
              onClick={onFirstTap}
              aria-label="Tap to begin the surprise with music"
            >
              <span className="countdown-audio-icon">🎵</span>
              <span className="countdown-audio-copy">
                Tap to unmute
              </span>
            </button>
          </div>
        )}



        <p className="countdown-label-top">Something special is waiting for you</p>

        <h1 className="countdown-name">
          Sanchu{' '}
          <FiHeart
            style={{
              fontSize: '2.3rem',
              color: 'var(--primary-pink)',
              filter: 'drop-shadow(0 0 8px rgba(255,94,132,0.6))'
            }}
          />
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