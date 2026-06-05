import React from 'react';

/**
 * Gallery Component
 * 
 * Objectives taught:
 * 1. CSS Grid layout: using `repeat(auto-fill, minmax(240px, 1fr))` to create auto-responsive grids without media queries.
 * 2. CSS Aspect-Ratio property: maintaining clean proportions for media items across all screen widths.
 * 3. CSS Transitions and Transforms: creating premium zoom-in hover experiences and fade-in card overlays.
 * 4. Image responsive properties: configuring `object-fit: cover` to fit photos neatly inside custom grids.
 */
export default function Gallery() {
  // Pre-configured premium romantic Unsplash image URLs
  const photos = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop',
      caption: 'Holding Hands, Holding Hearts'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600&auto=format&fit=crop',
      caption: 'Our Silhouette Under the Stars'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=600&auto=format&fit=crop',
      caption: 'Sparkling Romantic Lights'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop',
      caption: 'Silly Laughs & Shared Dreams'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop',
      caption: 'Celebrating Every Small Milestone'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop',
      caption: 'Sweet Petals & Sweet Moments'
    }
  ];

  return (
    <div className="section-container visible">
      <h2 className="section-title">Our Memory Album</h2>
      <p style={{
        textAlign: 'center',
        color: 'var(--text-muted)',
        marginBottom: '40px',
        maxWidth: '550px',
        margin: '0 auto 40px auto',
        lineHeight: '1.5'
      }}>
        Every photo captures a slice of our beautiful story. Hover (or tap on mobile) to reveal the secret messages...
      </p>

      {/* Grid Container */}
      <div className="gallery-grid">
        {photos.map((photo) => (
          <div key={photo.id} className="gallery-item" role="img" aria-label={photo.caption}>
            <img
              src={photo.url}
              alt={photo.caption}
              className="gallery-img"
              loading="lazy" // Optimized performance: lazy loading images outside viewport
            />
            {/* Hover overlay details */}
            <div className="gallery-overlay">
              <span className="gallery-caption">{photo.caption}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
