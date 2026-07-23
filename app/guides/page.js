'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../providers';

function getGuideText(guide, field, lang) {
  if (!guide) return '';
  const objField = guide[field];
  if (typeof objField === 'object' && objField !== null) {
    return objField[lang] || objField.uk || objField.en || '';
  }
  const langSuffix = lang === 'en' ? 'En' : lang === 'fr' ? 'Fr' : '';
  const altKey = `${field}${langSuffix}`;
  return guide[altKey] || guide[field] || '';
}

export default function GuidesPage() {
  const { lang, guides } = useApp();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGuides = guides.filter((g) => {
    if (activeCategory !== 'all' && g.category !== activeCategory) return false;

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const title = getGuideText(g, 'title', lang).toLowerCase();
      const desc = getGuideText(g, 'description', lang).toLowerCase();
      if (!title.includes(q) && !desc.includes(q)) return false;
    }
    return true;
  });

  const categories = [
    { key: 'all', uk: 'Усі гайди', en: 'All Guides', fr: 'Tous les guides' },
    { key: 'event', uk: 'Івенти та Події', en: 'Events', fr: 'Événements' },
    { key: 'meta', uk: 'Аналіз Мети', en: 'Meta Analysis', fr: 'Analyse Méta' },
    { key: 'build', uk: 'Біли та Прокачка', en: 'Builds & Progression', fr: 'Builds & Progression' },
    { key: 'beginner', uk: 'Для Новачків', en: 'Beginner Guides', fr: 'Guides Débutant' },
  ];

  const pageTexts = {
    title: {
      uk: 'Гайди та Посібники Eibon Terminal',
      en: 'Eibon Terminal Guides & Tutorials',
      fr: 'Guides & Tutoriels Eibon Terminal',
    },
    subtitle: {
      uk: 'Актуальні детальні посібники для Neverness to Everness (Патч 1.2 "999 Ночей").',
      en: 'Up-to-date detailed guides for Neverness to Everness (Patch 1.2 "999 Nights").',
      fr: 'Guides détaillés à jour pour Neverness to Everness (Patch 1.2 "999 Nuits").',
    },
    searchPlaceholder: {
      uk: 'Пошук гайдів за назвою чи ключевими словами...',
      en: 'Search guides by title or keywords...',
      fr: 'Rechercher des guides par titre ou mots clés...',
    },
    readMore: {
      uk: 'Читати гайд ➔',
      en: 'Read Guide ➔',
      fr: 'Lire le guide ➔',
    },
  };

  return (
    <div class="tab-pane active" id="pane-guides">
      <div class="section-header">
        <h2 class="section-title">{pageTexts.title[lang] || pageTexts.title.uk}</h2>
        <p class="section-desc">{pageTexts.subtitle[lang] || pageTexts.subtitle.uk}</p>
      </div>

      {/* Search & Category Filter */}
      <div class="guides-controls-bar glass-panel" style={{ padding: '16px', marginBottom: '24px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <input
          type="text"
          class="guide-search-input"
          placeholder={pageTexts.searchPlaceholder[lang] || pageTexts.searchPlaceholder.uk}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.4)', color: '#fff', fontSize: '14px' }}
        />

        <div class="guides-category-tabs" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map((c) => (
            <button
              key={c.key}
              class={`btn btn-sm ${activeCategory === c.key ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveCategory(c.key)}
            >
              {c[lang] || c.uk}
            </button>
          ))}
        </div>
      </div>

      {/* Guides Grid */}
      <div class="guides-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {filteredGuides.length === 0 ? (
          <div class="glass-panel" style={{ padding: '30px', gridColumn: '1 / -1', textAlign: 'center', opacity: 0.7 }}>
            {lang === 'en' ? 'No guides match your search criteria.' : 'За вашим запитом гайдів не знайдено.'}
          </div>
        ) : (
          filteredGuides.map((g) => {
            const title = getGuideText(g, 'title', lang);
            const desc = getGuideText(g, 'description', lang) || getGuideText(g, 'summary', lang);
            const banner = g.bannerImage || g.avatar || '/src/assets/shinku_banner.png';
            const readTime = g.readTime || '5 min';

            return (
              <Link key={g.id} href={`/guides/${g.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div class="guide-card glass-panel" style={{ borderRadius: '12px', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <div style={{ position: 'relative', width: '100%', height: '160px' }}>
                    <img src={banner} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span class="badge badge-accent" style={{ position: 'absolute', top: 12, right: 12, fontSize: '11px' }}>
                      {readTime}
                    </span>
                  </div>
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', lineHeight: '1.3' }}>{title}</h3>
                    <p style={{ fontSize: '13px', opacity: 0.8, lineHeight: '1.5', flex: 1, marginBottom: '16px' }}>{desc}</p>
                    <span style={{ fontSize: '13px', color: '#ff4081', fontWeight: '600' }}>
                      {pageTexts.readMore[lang] || pageTexts.readMore.uk}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
