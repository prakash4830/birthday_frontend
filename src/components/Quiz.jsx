import React, { useState } from 'react';

/**
 * Quiz Component
 * 
 * Objectives taught:
 * 1. Managing complex component state (tracking scores, question index, options chosen).
 * 2. Event handling: checking button choices and updating scores dynamically.
 * 3. Conditional CSS classes: changing background colors based on correctness.
 * 4. Conditional rendering: displaying feedback messages and rendering final result card.
 */
export default function Quiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  // Romantic trivia list
  const quizData = [
    {
      question: "Which of these is my absolute favorite thing about you? 💖",
      options: [
        "Your contagious laugh that brightens the room",
        "The kind, caring heart you show to everyone",
        "Your beautiful eyes that I get lost in",
        "Trick question: All of the above combined!"
      ],
      correctAnswer: 3,
      feedback: "Correct! Every single bit of you is my favorite, I could never choose just one! 😍"
    },
    {
      question: "If we were stranded on a deserted island, what would I want to bring? 🏝️",
      options: [
        "A survival guide and tent",
        "Just you (and maybe some snacks)",
        "A fully loaded satellite phone",
        "A box of matches"
      ],
      correctAnswer: 1,
      feedback: "Exactly! With you by my side, even a deserted island feels like paradise (especially with snacks)! 🍫"
    },
    {
      question: "What is my favorite way to spend a rainy afternoon with you? 🌧️",
      options: [
        "Going for a jog in the mud",
        "Cuddled under a blanket watching movie marathons",
        "Cleaning up the house",
        "Solving complex math formulas"
      ],
      correctAnswer: 1,
      feedback: "Spot on! Warm blankets, movie marathons, and cuddling with you is my definition of heaven. 🍿"
    }
  ];

  const handleOptionClick = (optionIndex) => {
    if (isAnswered) return; // Prevent double responses

    setSelectedOpt(optionIndex);
    setIsAnswered(true);

    if (optionIndex === quizData[currentIdx].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    // Reset local states for the next round
    setSelectedOpt(null);
    setIsAnswered(false);
    setCurrentIdx((prev) => prev + 1);
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setScore(0);
    setIsAnswered(false);
  };

  const currentQuestion = quizData[currentIdx];
  const isFinished = currentIdx >= quizData.length;

  return (
    <div className="section-container visible">
      <h2 className="section-title">The Love Quiz</h2>
      <p style={{
        textAlign: 'center',
        color: 'var(--text-muted)',
        marginBottom: '40px',
        maxWidth: '550px',
        margin: '0 auto 40px auto',
        lineHeight: '1.5'
      }}>
        Let's test how well we know each other! Choose your answers wisely...
      </p>

      <div className="glass-card quiz-card">
        {!isFinished ? (
          <div>
            {/* Question Progress Tracker */}
            <p style={{ fontSize: '0.85rem', color: 'var(--secondary-purple)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Question {currentIdx + 1} of {quizData.length}
            </p>
            
            <h3 className="quiz-question">{currentQuestion.question}</h3>

            {/* Answer Options list */}
            <div className="quiz-options">
              {currentQuestion.options.map((option, idx) => {
                let btnClass = '';
                if (isAnswered) {
                  if (idx === currentQuestion.correctAnswer) {
                    btnClass = 'correct';
                  } else if (idx === selectedOpt) {
                    btnClass = 'incorrect';
                  }
                }

                return (
                  <button
                    key={idx}
                    className={`quiz-option-btn ${btnClass}`}
                    onClick={() => handleOptionClick(idx)}
                    disabled={isAnswered}
                    aria-label={`Option ${idx + 1}: ${option}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Explanatory Feedback */}
            {isAnswered && (
              <div className="quiz-feedback">
                <p>{currentQuestion.feedback}</p>
                <button
                  onClick={handleNext}
                  className="btn-romantic"
                  style={{ marginTop: '20px' }}
                >
                  {currentIdx === quizData.length - 1 ? 'Show Results 🏆' : 'Next Question ➡️'}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Finished Quiz State Card */
          <div className="fade-in">
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '15px' }}>
              Quiz Completed! 🌟
            </h3>
            <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
              You scored <strong style={{ color: 'var(--primary-pink)', fontSize: '1.6rem' }}>{score} out of {quizData.length}</strong>!
            </p>
            
            <p style={{ color: 'var(--text-muted)', marginBottom: '30px', lineHeight: '1.5' }}>
              {score === quizData.length 
                ? "Incredible! You know my heart perfectly. You are my absolute soulmate! ❤️"
                : "A beautiful attempt! Every day is another chance to learn more about our hearts. I love you! 💕"}
            </p>

            <button onClick={handleRestart} className="btn-romantic">
              Try Again 🔄
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
