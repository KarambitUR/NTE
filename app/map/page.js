'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { useApp } from '../providers';

const MapClient = dynamic(() => import('./MapClient'), {
  ssr: false,
  loading: () => (
    <div class="glass-panel" style={{ padding: '60px', textAlign: 'center', borderRadius: '12px' }}>
      <div class="spinner-ring" style={{ margin: '0 auto 16px auto' }}></div>
      <p>Loading Interactive Map...</p>
    </div>
  ),
});

export default function MapPage() {
  const { lang } = useApp();

  const pageTexts = {
    title: {
      uk: 'Інтерактивна Карта Фарму Hethereau',
      en: 'Hethereau Interactive Farming Map',
      fr: 'Carte Interactive de Farm Hethereau',
    },
    subtitle: {
      uk: 'Візуальний путівник по аномаліях, телепортах, оракульським каменям та босам.',
      en: 'Visual guide for anomalies, teleports, oracle stones, and boss drops.',
      fr: 'Guide visuel pour les anomalies, téléporteurs et boss.',
    },
  };

  return (
    <div class="tab-pane active" id="pane-map">
      <div class="section-header">
        <h2 class="section-title">{pageTexts.title[lang] || pageTexts.title.uk}</h2>
        <p class="section-desc">{pageTexts.subtitle[lang] || pageTexts.subtitle.uk}</p>
      </div>

      <MapClient />
    </div>
  );
}
