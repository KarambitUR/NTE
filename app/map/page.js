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
      uk: 'Візуальний тактичний путівник по аномаліях, телепортах, парку Пукаленд (v1.4), нічному клубу StarSign та ресурсах.',
      en: 'Tactical visual guide for anomalies, teleports, Pukaland theme park (v1.4), StarSign nightclub, and resources.',
      fr: 'Guide tactique visuel pour les anomalies, téléporteurs, le parc Pukaland (v1.4), le club StarSign et les ressources.',
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
