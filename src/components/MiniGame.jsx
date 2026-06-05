import React, { useState, useEffect, useRef } from 'react';

/**
 * MiniGame Component - Catch the Hearts!
 * 
 * Objectives taught:
 * 1. Building a real-time reactive game loop in React.
 * 2. Spawning and rendering dynamic arrays of moving nodes.
 * 3. Element collision/deletion: using list filtering (`.filter()`) to remove clicked targets.
 * 4. LocalStorage memory persistence: saving high scores across browser reloads.
 * 5. Game timers: running a countdown timer synchronized with state indicators.
 */
export default function MiniGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    () => Number(localStorage.getItem('heart_high_score')) || 0
  );
  const [timeLeft, setTimeLeft] = useState(15); // 15 seconds speed round
  const [gameHearts, setGameHearts] = useState([]);
  
  const spawnIntervalRef = useRef(null);
  const gameTimerRef = useRef(null);

  // Start the catch game
  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(15);
    setGameHearts([]);

    // Spawner: generate a heart every 800ms
    spawnIntervalRef.current = setInterval(() => {
      const id = Date.now() + Math.random();
      const x = Math.random() * 85; // Percent width of board (0 to 85%)
      const duration = Math.random() * 1.5 + 1.8; // Falling speed in seconds
      const size = Math.random() * 0.4 + 0.8; // Scale factor

      const newHeart = { id, x, duration, size };
      setGameHearts((prev) => [...prev, newHeart]);

      // Remove heart from list after it falls off the screen (2.5s max)
      setTimeout(() => {
        setGameHearts((prev) => prev.filter((h) => h.id !== id));
      }, 2500);
    }, 800);

    // Countdown clock: decrement timeLeft every second
    gameTimerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // End the game and save score
  const endGame = () => {
    setIsPlaying(false);
    clearInterval(spawnIntervalRef.current);
    clearInterval(gameTimerRef.current);

    // Check and save high score
    setHighScore((prev) => {
      const currentScore = score; // Note: referencing score directly inside closure might be stale.
      // Better to check inside a state updater function:
      return prev;
    });
  };

  // Sync high score update
  useEffect(() => {
    if (!isPlaying && score > highScore) {
      setHighScore(score);
      localStorage.setItem('heart_high_score', String(score));
    }
  }, [isPlaying, score, highScore]);

  // Click handler when catching a falling heart
  const handleCatchHeart = (id) => {
    if (!isPlaying) return;
    
    // Add point
    setScore((prev) => prev + 1);

    // Filter out the caught heart immediately from state
    setGameHearts((prev) => prev.filter((h) => h.id !== id));
  };

  // Clean up all timers when this component is unmounted
  useEffect(() => {
    return () => {
      clearInterval(spawnIntervalRef.current);
      clearInterval(gameTimerRef.current);
    };
  }, []);

  return (
    <div className="section-container visible">
      <h2 className="section-title">Catch My Hearts</h2>
      <p style={{
        textAlign: 'center',
        color: 'var(--text-muted)',
        marginBottom: '40px',
        maxWidth: '550px',
        margin: '0 auto 40px auto',
        lineHeight: '1.5'
      }}>
        A little mini-game for fun! Tap the falling hearts as fast as you can before the time runs out!
      </p>

      <div className="glass-card game-container">
        {/* Header HUD */}
        <div className="game-score-row">
          <span>Score: <strong style={{ color: 'var(--primary-pink)' }}>{score}</strong></span>
          <span style={{ color: timeLeft <= 5 ? '#f87171' : 'var(--text-primary)' }}>
            Time: <strong>{timeLeft}s</strong>
          </span>
          <span className="game-high-score">Best: <strong>{highScore}</strong></span>
        </div>

        {/* Board */}
        <div className="game-board">
          {isPlaying ? (
            gameHearts.map((heart) => (
              <div
                key={heart.id}
                className="game-heart"
                style={{
                  left: `${heart.x}%`,
                  animationDuration: `${heart.duration}s`,
                  transform: `scale(${heart.size})`,
                }}
                onClick={() => handleCatchHeart(heart.id)}
                role="button"
                aria-label="Catch Heart"
              >
                ❤️
              </div>
            ))
          ) : (
            /* Intro / Outro Card inside board overlay */
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              textAlign: 'center',
              background: 'rgba(11, 3, 20, 0.7)',
              backdropFilter: 'blur(4px)'
            }}>
              {timeLeft === 0 ? (
                <div>
                  <h4 style={{ fontSize: '1.4rem', color: 'var(--accent-gold)', marginBottom: '10px' }}>
                    Time's Up! ⏰
                  </h4>
                  <p style={{ fontSize: '1rem', marginBottom: '20px' }}>
                    You caught <span style={{ color: 'var(--primary-pink)', fontWeight: 'bold' }}>{score}</span> hearts!
                  </p>
                  {score >= highScore && score > 0 ? (
                    <p style={{ color: 'var(--accent-gold)', fontSize: '0.9rem', marginBottom: '20px', fontStyle: 'italic' }}>
                      🎉 New Personal Best! You've got fast fingers! 🎉
                    </p>
                  ) : null}
                </div>
              ) : (
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                  Hearts fall from the sky. Click them before they vanish!
                </p>
              )}

              <button onClick={startGame} className="btn-romantic" style={{ width: 'auto', padding: '12px 25px' }}>
                {timeLeft === 0 ? 'Play Again 🔄' : 'Start Game 🎮'}
              </button>
            </div>
          )}
        </div>

        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
          Rule: Catch as many as possible within 15 seconds. Good luck!
        </p>
      </div>
    </div>
  );
}
