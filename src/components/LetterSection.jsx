import React, { useState } from 'react';

export default function LetterSection({ onNext }) {
  const [isOpen, setIsOpen] = useState(false);

  const openLetter = (e) => {
    if (e) e.stopPropagation();
    setIsOpen(true);
  };

  const closeLetter = (e) => {
    if (e) e.stopPropagation();
    setIsOpen(false);
  };

  const letterContent = [
    {
      type: 'para',
      text: "இதை எப்படி தொடங்குவது என்று எனக்கு தெரியவில்லை. இருப்பினும், நான் உன்னிடம் சொல்ல வேண்டியவை வார்த்தைகளில் விவரிக்க இயலாது, அதனால் என் நினைவுகளை பகிர்ந்து கொள்கிறேன். இந்த கடிதம் நம் பயணத்தின் ஒரு சின்ன சின்ன நினைவுகளை கொண்டுள்ளது, நம் முதல் சந்திப்பிலிருந்து தொடங்கி, நம் அன்றாட வாழ்வின் சிறு சிறு தருணங்கள் வரை."
    },
    {
      type: 'para',
      text: "நாம் முதல் முதலில் சென்னை மத்திய ரயில் நிலையத்தில் சந்தித்தோம், நான் அத்தருணத்தில் மிகதாமதமாக வந்தேன் இருப்பினும் நீ எனக்கு முன்னதாக வந்து காத்துக்கொண்டிருந்தாய். நான் அங்கு மிகவம் வருந்தினேன் உன்னை காக்கவைத்ததற்கு."
    },
    {
      type: 'para',
      text: "அத்தருணத்தில் இருந்து நான் எப்போதெல்லாம் மத்திய ரயில் நிலையத்திற்கு சென்றாலும், என்னிடம் அந்த ரயில் நிலையம் ஒன்றை கேட்டுக் கொண்டே இருக்கும்,"
    },
    {
      type: 'quote',
      text: "'மீண்டும் எப்பொழுது நீங்கள் இருவரும் ஒன்றாக வருவாய் என்று !'"
    },
    {
      type: 'para',
      text: "தொலைதூரத்தில் இருந்தாலும் தினமும் நாம் குறிஞ் செய்தி மூலம் அவ்வப்பொழுது தொலைபேசியிலும் நம் அன்றாட வாழ்வில் நடப்பவற்றை பரிமாறிக்கொண்டோம். அப்பொழுது என் இதயத்தில் வந்த ஓரிரு வார்த்தைகள்."
    },
    {
      type: 'quote',
      text: "'நிலவிர்கும் தூரத்தை விட\nநீ இருக்கும் தூரம் குறைவுதான்,\nஆனால் நிலவை பார்க்க முடிந்த எனக்கு\nஉன்னை பார்க்க முடியவில்லை !'"
    },
    {
      type: 'para',
      text: "பின் திடீர் என்று நாம் இருவரும் எந்த தொடர்பு இன்றி சில காலங்கள் சென்றது. அதற்கு நான் உன்னிடம் மன்னிப்பு கேட்டுக்கொள்கிறேன் இந்த கடிதத்தின் வாயிலாக. நான் அதை வேண்டுமென்று செய்யவில்லை, அந்த தருணத்தில் என் வாழ்க்கை மிக கடினமாக இருந்தது யாரிடமும் எதுவும் சொல்லமுடியாமல் நான் வருந்திக்கொண்டிருந்தேன்."
    },
    {
      type: 'para',
      text: "சஞ்சனா, உன்னிடம் ஓர் கேள்வி, நான் பேசாமல் இருந்தால் என்னா, நீ ஏன் என்னிடம் பேச முயற்சி செய்ய வில்லை?"
    },
    {
      type: 'para',
      text: "இந்த வருட தொடக்கத்தில் தான் நான் மீண்டும் இயல்பு நிலைக்கு திரும்பினேன். அப்பொழுது என் மனதுக்குள் ஓர் தயக்கம், உன்னிடம் பேசினால் மீண்டும் பேசுவாயா என்று. எனினும் நான் ஓர் தைரியத்தை வரவழைத்து உன்னிடம் பேச தொடங்கினேன், இருந்தபோதும் நீ எந்த ஓர் கோபமும், தயக்கமும்மின்றி எப்படி விட்டமோ அப்படியே தொடர்ந்தோம். இதை நினைக்கையில் உன்னை பற்றி ஓர் கவிதை."
    },
    {
      type: 'quote',
      text: "'சிரிக்கும் பொழுது முகம் அழகு !\nஅன்பு காட்டும் பொழுது மனம் அழகு !\nநம்பிக்கை வரும் பொழுது வாழ்க்கை அழகு !\nநீ நீயாகவே இருக்கும்போது எல்லாமே அழகு !'"
    },
    {
      type: 'para',
      text: "அதன் பிறகு நாம் மீண்டும் சந்தித்தோம், பெசந்த் நகர் கடற்கரையில். உனக்கு ஞாபகம் இருக்கானு தெரியல சஞ்சனா, நாம் இருவரும் ஒரே நிறத்தில் உடை அணிந்திருந்தோம் தற்செயலாக. அதை உன்னிடம் கூறலாம் என்று நினைத்தேன், ஆனால் என்னால் முடியவில்லை. இதோ அந்த தருணத்தில் நான் இருந்த நிலைமை."
    },
    {
      type: 'quote',
      text: "'உன்னை காண துடிக்கும் கண்கள்,\nஉன்னை கண்டபின் ஏன் தயக்கம் கொள்ளுதோ !'"
    },
    {
      type: 'para',
      text: "இறுதியாக அந்த இடத்தில் இருந்து நாம் பிரிந்து செல்லும் வேலையில் உன்னிடம் சொல்ல நினைத்த வார்த்தைகள்."
    },
    {
      type: 'quote',
      text: "'மறுபடியும் காத்திருக்கிறேன்\nமீண்டும் உன்னை நேரில்\nகாணும் அந்த நேரத்திற்காக !'"
    },
    {
      type: 'signature',
      text: "இப்படிக்கு\nஎன்றும் அன்புடன்,\nஜெயபிரகாஷ்."
    }
  ];

  return (
    <div
      className="fade-in"
      style={{
        maxWidth: '500px',
        padding: '30px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <div
        className={`envelope-wrapper ${isOpen ? 'open' : ''}`}
        aria-label="Interactive Envelope"
      >
        <div className="envelope-flap" />
        <div className="envelope-body" />

        <div
          className="wax-seal"
          onClick={openLetter}
          role="button"
          tabIndex="0"
          aria-label="Open letter"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              openLetter(e);
            }
          }}
        >
          {"JP's gift"}
        </div>

        <div className="envelope-front" />

        <div className={`letter-shell ${isOpen ? 'open' : ''}`}>
          <div
            className="letter-paper"
            onClick={(e) => e.stopPropagation()}
          >
            {isOpen && (
              <button
                type="button"
                className="letter-close-btn"
                onClick={closeLetter}
                aria-label="Close letter"
              >
                ✕
              </button>
            )}

            <div className="letter-fold letter-fold-top"></div>

            <div className="letter-center">
              <div className="letter-center-inner">
                <h2
                  style={{
                    fontFamily: 'var(--font-cursive)',
                    fontSize: '2rem',
                    color: '#9c3f74',
                    marginBottom: '10px',
                    textAlign: 'center'
                  }}
                >
                  வார்த்தைகள் அல்ல, நினைவுகள்
                </h2>

                <div className="letter-text">
                  {letterContent.map((item, index) => (
                    <p
                      key={index}
                      className={`letter-line letter-${item.type}`}
                    >
                      {item.text}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="letter-fold letter-fold-bottom"></div>
          </div>
        </div>
      </div>

      <p
        style={{
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-serif)',
          marginTop: '10px',
          fontSize: '0.95rem',
          textAlign: 'center'
        }}
      >
        {isOpen
          ? '💌 Click the X to fold it back'
          : 'Tap the seal to read the letter'}
      </p>
    </div>
  );
}