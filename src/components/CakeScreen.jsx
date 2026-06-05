/** 
import React, { useState } from 'react';


 * CakeScreen Component
 * 
 * Objectives taught:
 * 1. Building a CSS-only interactive shape with custom absolute positions.
 * 2. Creating an infinite candle flame flicker using CSS keyframes.
 * 3. Handling click events to toggle states (blowing out the flame).
 * 4. Building a layered cake with interactive candle effects.
 * 5. Maintaining clean component structure when the text box is removed.


export default function CakeScreen({ onBlown, onNext }) {
  const [isBlown, setIsBlown] = useState(false);

  const handleCandleClick = () => {
    if (isBlown) return; // Prevent double blowouts
    setIsBlown(true);
    if (onBlown) onBlown(); // Fire parent callback to activate Canvas Fireworks
  };

  return (
    <div className="fade-in" style={{ maxWidth: '550px', width: '100%' }}>
      <h2 className="title-romantic" style={{ fontSize: '2rem' }}>
        {isBlown ? "Your Wish Is Made!" : "Make A Wish!"}
      </h2>
      
      
      <div className="cake-wrapper" onClick={handleCandleClick}>
        <div
          className="cake"
          id="cake"
          style={{
            position: 'relative',
            width: '280px',
            height: '230px',
            zIndex: 11,
          }}
        >
          <div
            className="cake-base"
            style={{
              position: 'absolute',
              bottom: '-15px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '280px',
              height: '30px',
              background: 'rgba(150, 115, 190, 0.4)',
              borderRadius: '50%',
              filter: 'blur(5px)',
              zIndex: 1,
            }}
          />

          <div
            className="candles"
            style={{
              position: 'absolute',
              top: '-4px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '210px',
              display: 'flex',
              justifyContent: 'space-between',
              zIndex: 6,
            }}
          >
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="candle"
                style={{
                  position: 'relative',
                  width: '18px',
                  height: '80px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: '18px',
                    height: '76px',
                    background: 'linear-gradient(180deg, #fff49a 0%, #ffd96a 45%, #e5b02c 100%)',
                    borderRadius: '12px',
                    boxShadow: 'inset 0 10px 0 rgba(255, 255, 255, 0.35), 0 4px 10px rgba(0, 0, 0, 0.12)',
                  }}
                />
                {!isBlown && (
                  <div
                    className="flame"
                    style={{
                      position: 'absolute',
                      top: '-18px',
                      left: '50%',
                      width: '12px',
                      height: '24px',
                      borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                      background: 'radial-gradient(circle at 50% 20%, #fff5a0 0%, #ffae33 45%, #ff5833 100%)',
                      filter: 'drop-shadow(0 0 10px rgba(255, 144, 64, 0.55))',
                      animation: 'flicker 0.9s ease-in-out infinite',
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          <div
            className="layer top-layer"
            style={{
              position: 'absolute',
              top: '18px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '220px',
              height: '72px',
              background: 'linear-gradient(135deg, #d8b4ff 0%, #fbc9ff 100%)',
              borderRadius: '28px',
              boxShadow: '0 14px 30px rgba(26, 10, 48, 0.12)',
              zIndex: 5,
            }}
          >
            <span className="cake-decor decor-left" />
            <span className="cake-decor decor-right" />
          </div>

          <div
            className="layer middle-layer"
            style={{
              position: 'absolute',
              top: '52px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '240px',
              height: '72px',
              background: 'linear-gradient(135deg, #ffb6d2 0%, #ff89be 100%)',
              borderRadius: '28px',
              boxShadow: '0 14px 30px rgba(26, 10, 48, 0.12)',
              zIndex: 4,
            }}
          >
            <span className="cake-decor decor-center" />
          </div>

          <div
            className="layer bottom-layer"
            style={{
              position: 'absolute',
              top: '88px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '260px',
              height: '72px',
              background: 'linear-gradient(135deg, #b78cf5 0%, #a76fdd 100%)',
              borderRadius: '28px',
              boxShadow: '0 14px 30px rgba(26, 10, 48, 0.12)',
              zIndex: 3,
            }}
          />
        </div>
        
        <p className="instruction-text">
          {isBlown ? "✨ The candle is blown out! ✨" : "👆 Make a wish and blow out the candle"}
        </p>
      </div>

      
      {isBlown && (
      <div className="romantic-greeting-container">
        <h1 className="sweetheart-text">
          Happy Birthday, Sweetheart! 💐💖
        </h1>
      </div>
      )}
      
      
      {isBlown && (
        <button
          onClick={onNext}
          className="btn-romantic animate-pulse"
          style={{ marginTop: '30px' }}
        >
          Open My Envelope 💌
        </button>
      )}
    </div>
  );
}
**/

import React, { useState } from 'react';

export default function CakeScreen({ onBlown, onNext }) {
  const [isBlown, setIsBlown] = useState(false);

  const handleCandleClick = () => {
    if (isBlown) return;
    setIsBlown(true);
    if (onBlown) onBlown();
  };

  return (
    <div className="fullscreen-center-wrapper">
      <div className="cake-wrapper" title="Click a candle to blow it out!">
        <div className="cake">
          {/* CANDLES — 3 tall gold candles on top */}
          <div className="candles">
            <div className="candle" onClick={handleCandleClick}>
              {!isBlown ? (
                <div className="flame" />
              ) : (
                <div className="blow-effect">
                  <span className="smoke smoke-1"></span>
                  <span className="smoke smoke-2"></span>
                  <span className="smoke smoke-3"></span>
                </div>
              )}
              <div className="candle-body" />
            </div>

            <div className="candle" onClick={handleCandleClick}>
              {!isBlown ? (
                <div className="flame" />
              ) : (
                <div className="blow-effect">
                  <span className="smoke smoke-1"></span>
                  <span className="smoke smoke-2"></span>
                  <span className="smoke smoke-3"></span>
                </div>
              )}
              <div className="candle-body" />
            </div>

            <div className="candle" onClick={handleCandleClick}>
              {!isBlown ? (
                <div className="flame" />
              ) : (
                <div className="blow-effect">
                  <span className="smoke smoke-1"></span>
                  <span className="smoke smoke-2"></span>
                  <span className="smoke smoke-3"></span>
                </div>
              )}
              <div className="candle-body" />
            </div>
          </div>

          {/* TOP TIER — lavender/lilac with sticker decorations */}
          <div className="layer layer-top">
            <span className="cake-sticker sticker-tl">⭐</span>
            <span className="cake-sticker sticker-tr">🎉</span>
          </div>

          {/* MIDDLE TIER — pink/rose with sticker decorations */}
          <div className="layer layer-middle">
            <span className="cake-sticker sticker-ml">🌸</span>
            <span className="cake-sticker sticker-mc">🧁</span>
            <span className="cake-sticker sticker-mr">💫</span>
          </div>

          {/* BOTTOM TIER — deep purple with sticker decorations */}
          <div className="layer layer-bottom">
            <span className="cake-sticker sticker-bl">🌺</span>
            <span className="cake-sticker sticker-bc">💛</span>
            <span className="cake-sticker sticker-br">✨</span>
          </div>

          {/* Plate / base shadow */}
          <div className="plate" />
        </div>
      </div>

      {!isBlown && (
        <p className="instruction-text">
          Close your eyes, make a wish & blow out the candles 🌬️ 🎂✨
        </p>
        
      )}

      {!isBlown && (
        <p className="instruction-subtext">
          Click the candle to blow it out!
        </p>
      )}

      {isBlown && (
        <div className="romantic-greeting-container">
          <h1 className="sweetheart-text">
            Alles Gute zum Geburtstag, Sanchana! 💐💖
          </h1>
        </div>
      )}

      {isBlown && (
        <button
          className="btn-romantic"
          style={{ marginTop: '2rem', maxWidth: '325px' }}
          onClick={onNext}
        >
          Something special has been waiting for you 💌, Open it 💫
        </button>
      )}
    </div>
  );
}