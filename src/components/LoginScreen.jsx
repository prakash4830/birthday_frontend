/** 
import React, { useState, useEffect } from 'react';
import { FiHeart } from 'react-icons/fi';


 * LoginScreen Component
 * 
 * Objectives taught:
 * 1. Controlled Inputs in React: keeping the input value tied to local state.
 * 2. Form submission handling & preventing default browser reload.
 * 3. Conditional error messages with CSS animations (shake effect).
 * 4. Bypassing browser autoplay blocks via button click event interaction.
 * 5. Accessibility features: label-less input using `aria-label`, structured forms.

export default function LoginScreen({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const correctCode = '2306';

  const triggerSuccess = () => {
    setError(false);
    setTimeout(() => {
      onUnlock();
    }, 150);
  };

  const triggerError = () => {
    setError(true);
    setTimeout(() => setError(false), 800);
    setTimeout(() => setPassword(''), 350);
  };

  const processDigit = (digit) => {
    setPassword((prev) => {
      if (prev.length >= 4) return prev;

      const nextPassword = prev + digit;

      if (nextPassword.length === 4) {
        if (nextPassword === correctCode) {
          triggerSuccess();
        } else {
          triggerError();
        }
      }

      return nextPassword;
    });
  };

  const handleDelete = () => {
    setPassword((prev) => prev.slice(0, -1));
    setError(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;

      if (/^\d$/.test(key)) {
        event.preventDefault();
        processDigit(key);
        return;
      }

      if (key === 'Backspace' || key === 'Delete') {
        event.preventDefault();
        handleDelete();
        return;
      }

      if (
        key === 'Tab' ||
        key === 'Shift' ||
        key === 'Control' ||
        key === 'Alt' ||
        key === 'Meta' ||
        key.startsWith('Arrow')
      ) {
        return;
      }

      event.preventDefault();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  return (
    <div className="glass-card fade-in">
      <h1 className="countdown-name-static">Welcome, Sanchu <FiHeart style={{ fontSize: '2.5rem', color: 'var(--primary-pink)', filter: 'drop-shadow(0 0 8px rgba(255,94,132,0.6))' }} /></h1>

      <p className="countdown-unlocking">🎉 It's your birthday... unlocking your surprise...</p>
      <p className="countdown-hint">
        Enter the 4-digit secrect code 
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
          Incorrect code, hint: 23rd  June❤️
        </div>
      )}
    </div>
  );
}

**/

import React, { useState, useEffect } from 'react';
import { FiHeart } from 'react-icons/fi';

export default function LoginScreen({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const correctCode = '2306';

  const showErrorAndReset = () => {
    setError(true);

    setTimeout(() => {
      setError(false);
    }, 800);

    setTimeout(() => {
      setPassword('');
    }, 350);
  };

  const addDigit = (digit) => {
    if (!/^\d$/.test(digit)) return;

    setPassword((prev) => {
      if (prev.length >= 4) return prev;

      const next = prev + digit;

      if (next.length === 4) {
        if (next === correctCode) {
          setError(false);
          setTimeout(() => {
            onUnlock();
          }, 150);
        } else {
          showErrorAndReset();
        }
      }

      return next;
    });
  };

  const removeDigit = () => {
    setPassword((prev) => prev.slice(0, -1));
    setError(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;

      if (/^\d$/.test(key)) {
        event.preventDefault();
        addDigit(key);
        return;
      }

      if (key === 'Backspace' || key === 'Delete') {
        event.preventDefault();
        removeDigit();
        return;
      }

      if (
        key === 'Tab' ||
        key === 'Shift' ||
        key === 'Control' ||
        key === 'Alt' ||
        key === 'Meta' ||
        key.startsWith('Arrow')
      ) {
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="glass-card fade-in">
      <h1 className="countdown-name-static">
        Welcome, Sanchu <FiHeart style={{
            fontSize: '2.3rem',
            color: 'var(--primary-pink)',
            filter: 'drop-shadow(0 0 8px rgba(255,94,132,0.6))'
          }}
        />
      </h1>

      <p className="countdown-unlocking">🎉 It's your birthday... unlocking your surprise...</p>
      
      
      <p className="countdown-hint">
        
      </p>
          
      <div className="pin-display" aria-label="Password entry">
        {Array.from({ length: 4 }).map((_, index) => (
          <span key={index} className={`pin-dot ${password.length > index ? 'filled' : ''}`}>
            {password.length > index ? '•' : ''}
          </span>
        ))}
      </div>

      <div className="keypad">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'].map((key) => {
          if (key === '') {
            return <div key="blank" className="keypad-placeholder" />;
          }

          if (key === 'del') {
            return (
              <button
                key="delete"
                type="button"
                className="keypad-button keypad-delete"
                onClick={removeDigit}
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
              onClick={() => addDigit(key)}
              aria-label={`Enter ${key}`}
            >
              {key}
            </button>
          );
        })}
      </div>

      {error && (
        <div className="login-error" role="alert">
          Incorrect code, hint: 23rd June ❤️
        </div>
      )}
    </div>
  );
}