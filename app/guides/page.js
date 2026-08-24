'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../providers';
import { formatImgUrl } from '../utils';

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
    { key: 'character', uk: 'Персонажі та Білди', en: 'Characters & Builds', fr: 'Personnages & Builds' },
    { key: 'event', uk: 'Івенти та Події', en: 'Events', fr: 'Événements' },
    { key: 'meta', uk: 'Аналіз Мети', en: 'Meta Analysis', fr: 'Analyse Méta' },
    { key: 'build', uk: 'Білди та Прокачка', en: 'Builds & Progression', fr: 'Builds & Progression' },
    { key: 'beginner', uk: 'Для Новачків', en: 'Beginner Guides', fr: 'Guides Débutant' },
  ];

  const pageTexts = {
    title: {
      uk: 'Гайди та Посібники Eibon Terminal',
      en: 'Eibon Terminal Guides & Tutorials',
      fr: 'Guides & Tutoriels Eibon Terminal',
    },
    subtitle: {
      uk: 'Актуальні детальні посібники для Neverness to Everness (Версія 1.3 "Rising from the Moonlit Fog").',
      en: 'Up-to-date detailed guides for Neverness to Everness (Version 1.3 "Rising from the Moonlit Fog").',
      fr: 'Guides détaillés à jour pour Neverness to Everness (Version 1.3 "Rising from the Moonlit Fog").',
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

      {/* Toolbar: Search & Category Filter */}
      <div class="guides-toolbar">
        <div class="guides-search-wrapper">
          <input
            type="text"
            class="guides-search-input"
            placeholder={pageTexts.searchPlaceholder[lang] || pageTexts.searchPlaceholder.uk}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div class="guides-filters-wrapper">
          <div class="guides-filters">
            {categories.map((c) => (
              <button
                key={c.key}
                class={`filter-btn ${activeCategory === c.key ? 'active' : ''}`}
                onClick={() => setActiveCategory(c.key)}
              >
                {c[lang] || c.uk}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Guides Grid */}
      <div class="guides-grid-new">
        {filteredGuides.length === 0 ? (
          <div class="glass-panel" style={{ padding: '30px', gridColumn: '1 / -1', textAlign: 'center', opacity: 0.7 }}>
            {lang === 'en' ? 'No guides match your search criteria.' : 'За вашим запитом гайдів не знайдено.'}
          </div>
        ) : (
          filteredGuides.map((g) => {
            const title = getGuideText(g, 'title', lang);
            const desc = getGuideText(g, 'description', lang) || getGuideText(g, 'summary', lang);
            const avatar = g.avatar || g.bannerImage || 'src/assets/meta_analysis_icon.png';
            const readTime = g.readTime || '5 min';

            return (
              <Link key={g.id} href={`/guides/${g.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div class="guide-card-new glass-panel">
                  <div class="guide-card-header-new">
                    <div class="guide-card-avatar">
                      <img src={formatImgUrl(avatar)} alt={title} />
                    </div>
                    <div class="guide-card-header-text">
                      <span class="guide-card-category">{(g.category || 'GUIDE').toUpperCase()}</span>
                      <h3>{title}</h3>
                    </div>
                    <span class="badge badge-accent" style={{ position: 'absolute', top: 12, right: 12, fontSize: '11px', zIndex: 3 }}>
                      {readTime}
                    </span>
                  </div>
                  <div class="guide-card-body-new">
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', flex: 1, margin: 0 }}>
                      {desc}
                    </p>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-pink)', fontWeight: '600', marginTop: '10px' }}>
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
