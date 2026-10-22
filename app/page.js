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
  const [copiedCode, setCopiedCode] = useState(null);

  useEffect(() => {
    // Banner target date for Akane Rin (Patch 1.4 Phase 2): November 11, 2026
    const targetDate = new Date('2026-11-11T21:59:00Z').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft(lang === 'uk' ? 'Завершено' : lang === 'fr' ? 'Terminé' : 'Ended');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      const dSuffix = lang === 'uk' ? 'д' : lang === 'fr' ? 'j' : 'd';
      const hSuffix = lang === 'uk' ? 'г' : lang === 'fr' ? 'h' : 'h';
      const mSuffix = lang === 'uk' ? 'хв' : lang === 'fr' ? 'm' : 'm';

      setTimeLeft(`${days}${dSuffix} ${String(hours).padStart(2, '0')}${hSuffix} ${String(minutes).padStart(2, '0')}${mSuffix}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, [lang]);

  const activeCodes = promoCodes.filter((c) => c.active !== false).slice(0, 3);
  const tierRank = { 'S+': 1, 'S': 2, 'A': 3, 'B': 4 };
  const topTierChars = [...characters]
    .sort((a, b) => (tierRank[a.tier] || 99) - (tierRank[b.tier] || 99))
    .slice(0, 6);
  const latestGuides = guides.slice(0, 3);

  const heroTexts = {
    tagline: {
      uk: 'СУПЕРПРИРОДНА МІСЬКА RPG ВІД HOTTA STUDIO',
      en: 'SUPERNATURAL URBAN RPG BY HOTTA STUDIO',
      fr: 'RPG URBAIN SURNATUREL PAR HOTTA STUDIO',
    },
    title: {
      uk: 'Акане Рін: Зірка Сцени',
      en: 'Akane Rin: Dazzling Star',
      fr: 'Akane Rin : Étoile Éblouissante',
    },
    desc: {
      uk: 'Оновлення 1.4 "For Whom the Verses Mourn" вже наживо! Новий S+ персонаж підтримки та суб-ДПС стихії Лакшана — Акане Рін (Akane Rin)! Збільшена ймовірність випадання її сигнатурної зброї "Зворотний бік Місяця" (Far Side of the Moon).',
      en: 'Version 1.4 "For Whom the Verses Mourn" is now live! New S+ Lakshana Sub-DPS & Support — Akane Rin! Rate-up active for her signature Arc "Far Side of the Moon" and exclusive cartridges.',
      fr: 'La version 1.4 "For Whom the Verses Mourn" est disponible ! Nouveau Sub-DPS & Soutien Lakshana S+ — Akane Rin ! Taux d\'obtention accru pour son Arc signature "Far Side of the Moon".',
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

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="tab-pane active" id="pane-home">
      {/* Hero Banner */}
      <div className="hero-banner-container">
        <div className="banner-showcase">
          <img src={formatImgUrl('src/assets/cyberpunk_bg.jpg')} alt="Akane Rin Banner" className="banner-image" />
          <div className="banner-overlay">
            <div className="banner-text-content">
              <span className="banner-welcome">{heroTexts.tagline[lang] || heroTexts.tagline.uk}</span>
              <h1 className="banner-main-title">
                <span>ACTIVE BANNER</span>: <span className="highlight-text">{heroTexts.title[lang] || heroTexts.title.uk}</span>
              </h1>
              <p className="banner-desc">{heroTexts.desc[lang] || heroTexts.desc.uk}</p>

              <div className="banner-bottom-row">
                <div className="banner-timer">
                  <span className="timer-label">{heroTexts.timerLabel[lang] || heroTexts.timerLabel.uk}</span>
                  <span className="timer-value">{timeLeft}</span>
                </div>
                <div className="banner-actions">
                  <button className="btn btn-accent btn-sm" onClick={() => openCharacterModal('akane')}>
                    {heroTexts.buildBtn[lang] || heroTexts.buildBtn.uk}
                  </button>
                  <Link href="/tierlist" className="btn btn-secondary btn-sm">
                    {heroTexts.tierlistBtn[lang] || heroTexts.tierlistBtn.uk}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Home Widgets */}
      <div className="home-widgets-grid">
        {/* Promo Codes Widget */}
        <div className="home-widget-card glass-panel">
          <div className="widget-header">
            <div className="widget-title-group">
              <span className="widget-icon">🎟️</span>
              <h3>{lang === 'en' ? 'Active Promo Codes' : lang === 'fr' ? 'Codes promo actifs' : 'Актуальні промокоди'}</h3>
            </div>
            <Link href="/codes" className="widget-badge badge-green">
              {lang === 'en' ? 'VIEW ALL' : lang === 'fr' ? 'TOUT VOIR' : 'ДИВИТИСЬ УСІ'}
            </Link>
          </div>
          <div className="widget-body">
            <p className="widget-desc">
              {lang === 'en' ? 'Click on any code to copy instantly.' : lang === 'fr' ? 'Cliquez sur un code pour le copier.' : 'Натисніть на код, щоб миттєво скопіювати його.'}
            </p>
            <div className="codes-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {activeCodes.map((c) => {
                const isCopied = copiedCode === c.code;
                return (
                  <div key={c.code} className="code-card" style={{ padding: '12px 16px' }}>
                    <div className="code-info">
                      <span className="code-string" style={{ fontSize: '1rem' }}>{c.code}</span>
                      <span className="code-rewards" style={{ fontSize: '0.8rem' }}>{c.rewards}</span>
                    </div>
                    <button className="btn-copy" onClick={() => handleCopy(c.code)}>
                      {isCopied ? (
                        <span>✓ {lang === 'en' ? 'Copied' : lang === 'fr' ? 'Copié !' : 'Скопійовано'}</span>
                      ) : (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                          {lang === 'en' ? 'Copy' : lang === 'fr' ? 'Copier' : 'Копіювати'}
                        </span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tier List Quick Preview */}
        <div className="home-widget-card glass-panel">
          <div className="widget-header">
            <div className="widget-title-group">
              <span className="widget-icon">📊</span>
              <h3>{lang === 'en' ? 'Meta Tier List (v1.4)' : lang === 'fr' ? 'Tier List Méta (v1.4)' : 'Топ Персонажі Патчу 1.4'}</h3>
            </div>
            <Link href="/tierlist" className="widget-badge badge-purple">
              S+ / S TIER
            </Link>
          </div>
          <div className="widget-body">
            <div className="home-tier-preview-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '10px' }}>
              {topTierChars.map((char) => {
                const name = (CHARACTER_TRANSLATIONS[char.id] && CHARACTER_TRANSLATIONS[char.id][lang]?.name) || char.name;
                return (
                  <div
                    key={char.id}
                    className="char-preview-mini"
                    onClick={() => openCharacterModal(char.id)}
                    style={{ cursor: 'pointer', textAlign: 'center' }}
                  >
                    <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)', height: '85px' }}>
                      <img src={formatImgUrl(char.avatar)} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <span className={`tier-badge-mini tier-${char.tier.toLowerCase().replace('+', '-plus')}`} style={{ position: 'absolute', top: 2, right: 2, fontSize: '10px', padding: '2px 4px', borderRadius: '4px', background: 'rgba(0,0,0,0.8)', fontWeight: 'bold' }}>
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
        <div className="home-widget-card glass-panel">
          <div className="widget-header">
            <div className="widget-title-group">
              <span className="widget-icon">📖</span>
              <h3>{lang === 'en' ? 'Featured Guides' : lang === 'fr' ? 'Guides en vedette' : 'Рекомендовані гайди'}</h3>
            </div>
            <Link href="/guides" className="widget-badge badge-cyan">
              {lang === 'en' ? 'ALL GUIDES' : lang === 'fr' ? 'TOUS LES GUIDES' : 'УСІ ГАЙДИ'}
            </Link>
          </div>
          <div className="widget-body">
            <div className="home-guides-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {latestGuides.map((g) => {
                const title = getGuideText(g, 'title', lang);
                return (
                  <Link key={g.id} href={`/guides/${g.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="guide-quick-item glass-panel" style={{ padding: '10px 14px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
