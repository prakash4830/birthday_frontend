import React from 'react';

/**
 * VideoSection Component
 * 
 * Objectives taught:
 * 1. HTML5 Video tag rendering: configuring elements with attributes like `controls`, `playsInline`, and `preload`.
 * 2. Responsive Aspect Ratio containment: using absolute styling inside container blocks to auto-scale videos.
 * 3. Fallback slot content: providing helpful instructions for users to replace mock media files.
 */
export default function VideoSection() {
  return (
    <div className="section-container visible">
      <h2 className="section-title">Video Memory</h2>
      <p style={{
        textAlign: 'center',
        color: 'var(--text-muted)',
        marginBottom: '40px',
        maxWidth: '550px',
        margin: '0 auto 40px auto',
        lineHeight: '1.5'
      }}>
        A special captured moment just for us. Click play to travel back in time...
      </p>

      {/* Glassmorphic border wrap around video element */}
      <div className="video-wrapper">
        <video
          className="video-player"
          controls
          playsInline
          preload="metadata"
          poster="https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=640&auto=format&fit=crop" // Beautiful pre-load poster image
        >
          {/* Main source pointing to public/video.mp4 */}
          <source src="/video.mp4" type="video/mp4" />
          
          {/* Fallback text if browser does not support HTML5 video */}
          Your browser does not support the HTML5 video tag.
        </video>
      </div>

      <p style={{
        textAlign: 'center',
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
        marginTop: '15px',
        fontStyle: 'italic'
      }}>
        💡 Tip: Place your custom video file named <strong>video.mp4</strong> in the <code>public/</code> folder to view your personal video here.
      </p>
    </div>
  );
}
