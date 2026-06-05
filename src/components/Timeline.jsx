import React from 'react';

/**
 * Timeline Component
 * 
 * Objectives taught:
 * 1. Rendering lists in React using array mapping (`.map()`).
 * 2. Uniquely indexing map elements with keys for proper DOM diffing.
 * 3. Building custom CSS timelines (vertical lines with node points and card attachments).
 * 4. Micro-animations: glowing dots that grow and change color upon hover.
 */
export default function Timeline() {
  // Array of milestone data objects
  const timelineData = [
    {
      id: 1,
      date: 'June 23rd, 2024',
      title: 'Our First Encounter ✨',
      desc: 'The magical moment our eyes first met. The universe seemed to quiet down, and I knew deep down you were someone extremely special.'
    },
    {
      id: 2,
      date: 'July 4th, 2024',
      title: 'The First Late Night Chat 💬',
      desc: 'Talking for hours until the sun came up. We shared jokes, favorite songs, and secrets, realizing how perfectly our minds aligned.'
    },
    {
      id: 3,
      date: 'August 14th, 2024',
      title: 'Our First Official Date 🌹',
      desc: 'My heart was beating so fast! Sharing coffee, walking through the park, and laughing until our stomachs hurt. It was the perfect evening.'
    },
    {
      id: 4,
      date: 'December 25th, 2024',
      title: 'Holiday Getaway ❄️',
      desc: 'Watching the winter snow, cuddling up with warm hot chocolate, and celebrating our very first holiday season together. A memory etched forever.'
    }
  ];

  return (
    <div className="section-container visible">
      <h2 className="section-title">Our Timeline</h2>
      <p style={{
        textAlign: 'center',
        color: 'var(--text-muted)',
        marginBottom: '40px',
        maxWidth: '550px',
        margin: '0 auto 40px auto',
        lineHeight: '1.5'
      }}>
        A stroll down memory lane. From our very first hello to the beautiful present day...
      </p>

      <div className="timeline-track">
        {/* Iterate over timelineData array using map */}
        {timelineData.map((milestone) => (
          <div key={milestone.id} className="timeline-node">
            {/* Twinkling timeline dot indicator */}
            <div className="timeline-dot" />
            
            {/* Glassmorphic timeline card content */}
            <div className="timeline-card">
              <span className="timeline-date">{milestone.date}</span>
              <h3 className="timeline-heading">{milestone.title}</h3>
              <p className="timeline-desc">{milestone.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
