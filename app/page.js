'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from './providers';
import { formatImgUrl } from './utils';
import { CHARACTER_TRANSLATIONS } from '../src/localization/translations';

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

export default function HomePage() {
  const { lang, promoCodes, characters, guides, openCharacterModal } = useApp();
  const [timeLeft, setTimeLeft] = useState('00d 00h 00m');

  useEffect(() => {
    // Banner target date: July 29, 2026 UTC+8
    const targetDate = new Date('2026-07-28T21:59:00Z').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft('Ended');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft(`${days}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, []);

  const activeCodes = promoCodes.filter((c) => c.active !== false).slice(0, 3);
  const topTierChars = characters.filter((c) => c.tier === 'S+' || c.tier === 'S').slice(0, 6);
  const latestGuides = guides.slice(0, 3);

  const heroTexts = {
    tagline: {
      uk: 'СУПЕРПРИРОДНА МІСЬКА RPG ВІД HOTTA STUDIO',
      en: 'SUPERNATURAL URBAN RPG BY HOTTA STUDIO',
      fr: 'RPG URBAIN SURNATUREL PAR HOTTA STUDIO',
    },
    title: {
      uk: 'Шінку: 999 Ночей',
      en: 'Shinku: 999 Nights',
      fr: 'Shinku : 999 Nuits',
    },
    desc: {
      uk: 'Ласкаво просимо до Eibon Terminal — вашого особистого гайду містом Гетеро для відстеження аномалій, побудови команд та свіжих оновлень.',
      en: 'Welcome to Eibon Terminal — your personal guide for exploring Hethereau, tracking anomalies, building teams, and following the latest updates.',
      fr: 'Bienvenue sur Eibon Terminal — votre guide personnel pour explorer Hethereau, suivre les anomalies et créer des équipes.',
    },
    timerLabel: {
      uk: 'До завершення:',
      en: 'Time Remaining:',
      fr: 'Temps restant :',
    },
    buildBtn: {
      uk: 'Оцінка та білд',
      en: 'Build & Overview',
      fr: 'Build & Aperçu',
    },
    tierlistBtn: {
      uk: 'Переглянути Тір-ліст',
      en: 'View Tier List',
      fr: 'Voir la Tier List',
    },
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Copied code: ${code}`);
  };

  return (
    <div class="tab-pane active" id="pane-home">
      {/* Hero Banner */}
      <div class="hero-banner-container">
        <div class="banner-showcase">
          <img src={formatImgUrl('src/assets/shinku_banner.png')} alt="Shinku Banner" class="banner-image" />
          <div class="banner-overlay">
            <div class="banner-text-content">
              <span class="banner-welcome">{heroTexts.tagline[lang] || heroTexts.tagline.uk}</span>
              <h1 class="banner-main-title">
                <span>ACTIVE BANNER</span>: <span class="highlight-text">{heroTexts.title[lang] || heroTexts.title.uk}</span>
              </h1>
              <p class="banner-desc">{heroTexts.desc[lang] || heroTexts.desc.uk}</p>

              <div class="banner-bottom-row">
                <div class="banner-timer">
                  <span class="timer-label">{heroTexts.timerLabel[lang] || heroTexts.timerLabel.uk}</span>
                  <span class="timer-value">{timeLeft}</span>
                </div>
                <div class="banner-actions">
                  <button class="btn btn-accent btn-sm" onClick={() => openCharacterModal('shinku')}>
                    {heroTexts.buildBtn[lang] || heroTexts.buildBtn.uk}
                  </button>
                  <Link href="/tierlist" class="btn btn-secondary btn-sm">
                    {heroTexts.tierlistBtn[lang] || heroTexts.tierlistBtn.uk}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Home Widgets */}
      <div class="home-widgets-grid">
        {/* Promo Codes Widget */}
        <div class="home-widget-card glass-panel">
          <div class="widget-header">
            <div class="widget-title-group">
              <span class="widget-icon">🎟️</span>
              <h3>{lang === 'en' ? 'Active Promo Codes' : lang === 'fr' ? 'Codes promo actifs' : 'Актуальні промокоди'}</h3>
            </div>
            <Link href="/codes" class="widget-badge badge-green">
              {lang === 'en' ? 'VIEW ALL' : lang === 'fr' ? 'TOUT VOIR' : 'ДИВИТИСЬ УСІ'}
            </Link>
          </div>
          <div class="widget-body">
            <p class="widget-desc">
              {lang === 'en' ? 'Click on any code to copy instantly.' : lang === 'fr' ? 'Cliquez sur un code pour le copier.' : 'Натисніть на код, щоб миттєво скопіювати його.'}
            </p>
            <div class="home-codes-list">
              {activeCodes.map((c) => (
                <div key={c.code} class="code-quick-item" onClick={() => copyCode(c.code)} style={{ padding: '10px 14px', marginBottom: '8px' }}>
                  <div class="code-quick-left" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span class="code-quick-val" style={{ fontWeight: '700', fontSize: '15px' }}>{c.code}</span>
                    <span class="code-quick-rewards" style={{ fontSize: '12px', opacity: 0.8 }}>{c.rewards}</span>
                  </div>
                  <button class="btn-copy-code btn-sm">📋</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tier List Quick Preview */}
        <div class="home-widget-card glass-panel">
          <div class="widget-header">
            <div class="widget-title-group">
              <span class="widget-icon">📊</span>
              <h3>{lang === 'en' ? 'Meta Tier List (v1.2)' : lang === 'fr' ? 'Tier List Méta (v1.2)' : 'Топ Персонажі Патчу 1.2'}</h3>
            </div>
            <Link href="/tierlist" class="widget-badge badge-purple">
              S+ / S TIER
            </Link>
          </div>
          <div class="widget-body">
            <div class="home-tier-preview-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '10px' }}>
              {topTierChars.map((char) => {
                const name = (CHARACTER_TRANSLATIONS[char.id] && CHARACTER_TRANSLATIONS[char.id][lang]?.name) || char.name;
                return (
                  <div
                    key={char.id}
                    class="char-preview-mini"
                    onClick={() => openCharacterModal(char.id)}
                    style={{ cursor: 'pointer', textAlign: 'center' }}
                  >
                    <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)', height: '85px' }}>
                      <img src={formatImgUrl(char.avatar)} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <span class={`tier-badge-mini tier-${char.tier.toLowerCase().replace('+', '-plus')}`} style={{ position: 'absolute', top: 2, right: 2, fontSize: '10px', padding: '2px 4px', borderRadius: '4px', background: 'rgba(0,0,0,0.8)', fontWeight: 'bold' }}>
                        {char.tier}
                      </span>
                    </div>
                    <span style={{ fontSize: '11px', color: '#ccc', marginTop: '4px', display: 'block' }}>{name.split(' ')[0]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Latest Guides Widget */}
        <div class="home-widget-card glass-panel">
          <div class="widget-header">
            <div class="widget-title-group">
              <span class="widget-icon">📖</span>
              <h3>{lang === 'en' ? 'Featured Guides' : lang === 'fr' ? 'Guides en vedette' : 'Рекомендовані гайди'}</h3>
            </div>
            <Link href="/guides" class="widget-badge badge-cyan">
              {lang === 'en' ? 'ALL GUIDES' : lang === 'fr' ? 'TOUS LES GUIDES' : 'УСІ ГАЙДИ'}
            </Link>
          </div>
          <div class="widget-body">
            <div class="home-guides-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {latestGuides.map((g) => {
                const title = getGuideText(g, 'title', lang);
                return (
                  <Link key={g.id} href={`/guides/${g.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div class="guide-quick-item glass-panel" style={{ padding: '10px 14px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: '600', fontSize: '14px' }}>{title}</span>
                      <span style={{ fontSize: '12px', opacity: 0.7 }}>➔</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
