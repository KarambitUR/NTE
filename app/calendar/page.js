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

      <div class="timeline-container">
        {timelineEvents.map((evt, idx) => {
          const isLeft = idx % 2 === 0;
          const isActive = evt.status === 'Active';
          const isUpcoming = evt.status === 'Upcoming';

          let statusLabel = pageTexts.statusReleased[lang] || pageTexts.statusReleased.uk;
          if (isActive) statusLabel = pageTexts.statusActive[lang] || pageTexts.statusActive.uk;
          if (isUpcoming) statusLabel = pageTexts.statusUpcoming[lang] || pageTexts.statusUpcoming.uk;

          return (
            <div
              key={idx}
              class={`timeline-event ${isLeft ? 'timeline-left' : 'timeline-right'}`}
            >
              <div class="timeline-content glass-panel">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span class="timeline-date">{evt.date}</span>
                  <span
                    class={`badge ${isActive ? 'badge-green' : isUpcoming ? 'badge-orange' : 'badge-secondary'}`}
                    style={{ fontSize: '10px' }}
                  >
                    {statusLabel}
                  </span>
                </div>
                <h3>{evt.title}</h3>
                <p>{evt.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
