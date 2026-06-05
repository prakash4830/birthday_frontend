import React, { useState, useEffect } from 'react';
import { FiHeart } from 'react-icons/fi';

/**
 * LoginScreen Component
 * 
 * Objectives taught:
 * 1. Controlled Inputs in React: keeping the input value tied to local state.
 * 2. Form submission handling & preventing default browser reload.
 * 3. Conditional error messages with CSS animations (shake effect).
 * 4. Bypassing browser autoplay blocks via button click event interaction.
 * 5. Accessibility features: label-less input using `aria-label`, structured forms.
 */
export default function LoginScreen({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const correctCode = '2306';

  const handleDigit = (digit) => {
    setPassword((prev) => {
      if (prev.length >= 4) return prev;
      return prev + digit;
    });
  };

  const handleDelete = () => {
    setPassword((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    if (password.length !== 4) return;

    if (password === correctCode) {
      setError(false);
      onUnlock();
    } else {
      setError(true);
      const resetError = setTimeout(() => setError(false), 800);
      const resetPassword = setTimeout(() => setPassword(''), 350);
      return () => {
        clearTimeout(resetError);
        clearTimeout(resetPassword);
      };
    }
  }, [password, correctCode, onUnlock]);

  return (
    <div className="glass-card fade-in">
      <div style={{ marginBottom: '20px' }}>
        <FiHeart style={{ fontSize: '3.5rem', color: 'var(--primary-pink)', filter: 'drop-shadow(0 0 8px rgba(255,94,132,0.6))' }} />
      </div>
      
      <h1 className="title-romantic">A Special Journey</h1>
      <p className="subtitle-romantic">Unlock With Your Code</p>
      
      <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.95rem', lineHeight: '1.4' }}>
        
      </p>

      <div className="pin-display" aria-label="Password entry">
        {Array.from({ length: 4 }).map((_, index) => (
          <span key={index} className={`pin-dot ${password.length > index ? 'filled' : ''}`}>
            {password.length > index ? '•' : ''}
          </span>
        ))}
      </div>

      <div className="keypad">
        {['1','2','3','4','5','6','7','8','9','','0','del'].map((key) => {
          if (key === '') {
            return <div key="blank" className="keypad-placeholder" />;
          }

          if (key === 'del') {
            return (
              <button
                key="delete"
                type="button"
                className="keypad-button keypad-delete"
                onClick={handleDelete}
                aria-label="Delete digit"
              >
                ⌫
              </button>
            );
          }

          return (
            <button
              key={key}
              type="button"
              className="keypad-button"
              onClick={() => handleDigit(key)}
              aria-label={`Enter ${key}`}
            >
              {key}
            </button>
          );
        })}
      </div>

      {error && (
        <div className="login-error" role="alert">
          Incorrect code, hint: June 23rd ❤️
        </div>
      )}
    </div>
  );
}
