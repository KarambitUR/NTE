'use client';

import React from 'react';
import { useApp } from '../providers';

export default function CalendarPage() {
  const { lang, timelineEvents } = useApp();

  const pageTexts = {
    title: {
      uk: 'Календар Подій та Версій Neverness to Everness',
      en: 'Neverness to Everness Release & Event Calendar',
      fr: 'Calendrier des Sorties & Événements Neverness to Everness',
    },
    subtitle: {
      uk: 'Хронологія релізів, патчів, стрімів розробників та банерів персонажів.',
      en: 'Chronology of releases, patches, developer streams, and character banners.',
      fr: 'Chronologie des sorties, patchs, streams et bannières de personnages.',
    },
    statusReleased: {
      uk: 'Завершено',
      en: 'Released',
      fr: 'Terminé',
    },
    statusActive: {
      uk: 'АКТИВНО',
      en: 'ACTIVE',
      fr: 'ACTIF',
    },
    statusUpcoming: {
      uk: 'Незабаром',
      en: 'Upcoming',
      fr: 'À venir',
    },
  };

  return (
    <div class="tab-pane active" id="pane-calendar">
      <div class="section-header">
        <h2 class="section-title">{pageTexts.title[lang] || pageTexts.title.uk}</h2>
        <p class="section-desc">{pageTexts.subtitle[lang] || pageTexts.subtitle.uk}</p>
      </div>

      <div class="timeline-container" style={{ position: 'relative', paddingLeft: '24px', borderLeft: '2px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '24px', margin: '20px 0' }}>
        {timelineEvents.map((evt, idx) => {
          const isActive = evt.status === 'Active';
          const isUpcoming = evt.status === 'Upcoming';

          let statusLabel = pageTexts.statusReleased[lang] || pageTexts.statusReleased.uk;
          if (isActive) statusLabel = pageTexts.statusActive[lang] || pageTexts.statusActive.uk;
          if (isUpcoming) statusLabel = pageTexts.statusUpcoming[lang] || pageTexts.statusUpcoming.uk;

          return (
            <div
              key={idx}
              class="timeline-card glass-panel"
              style={{
                position: 'relative',
                padding: '20px',
                borderRadius: '12px',
                border: isActive ? '1px solid #00e676' : '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: '-32px',
                  top: '24px',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: isActive ? '#00e676' : isUpcoming ? '#ff9800' : '#888',
                  boxShadow: isActive ? '0 0 10px #00e676' : 'none',
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', opacity: 0.7 }}>{evt.date}</span>
                <span
                  class={`badge ${isActive ? 'badge-green' : isUpcoming ? 'badge-orange' : 'badge-secondary'}`}
                  style={{ fontSize: '11px' }}
                >
                  {statusLabel}
                </span>
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{evt.title}</h3>
              <p style={{ fontSize: '14px', opacity: 0.85, lineHeight: '1.5', margin: 0 }}>{evt.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
