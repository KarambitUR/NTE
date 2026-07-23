'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useApp } from '../../providers';
import { formatImgUrl } from '../../utils';
import { CHARACTER_TRANSLATIONS } from '../../../src/localization/translations';

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

function getSectionText(sec, field, lang) {
  if (!sec) return '';
  const objField = sec[field];
  if (typeof objField === 'object' && objField !== null) {
    return objField[lang] || objField.uk || objField.en || '';
  }
  const langSuffix = lang === 'en' ? 'En' : lang === 'fr' ? 'Fr' : '';
  const altKey = `${field}${langSuffix}`;
  return sec[altKey] || sec[field] || '';
}

export default function GuideDetailPage() {
  const { id } = useParams();
  const { lang, guides, characters, openCharacterModal } = useApp();

  const guide = guides.find((g) => g.id === id);

  if (!guide) {
    return (
      <div class="tab-pane active" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2>Guide not found</h2>
        <p style={{ margin: '20px 0' }}>The guide you requested does not exist or has been removed.</p>
        <Link href="/guides" class="btn btn-primary">
          Back to Guides
        </Link>
      </div>
    );
  }

  const title = getGuideText(guide, 'title', lang);
  const summary = getGuideText(guide, 'description', lang) || getGuideText(guide, 'summary', lang);
  const sections = guide.content?.sections || guide.sections || [];
  const recChars = guide.recommendedChars || [];

  const rawImage = guide.bannerImage || guide.avatar || 'src/assets/shinku_banner.png';
  const isWideBanner = rawImage.includes('banner') || rawImage.includes('bg');

  return (
    <div class="tab-pane active" id="pane-guide-detail" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <Link href="/guides" class="btn btn-secondary btn-sm" style={{ marginBottom: '20px', display: 'inline-block' }}>
        ← {lang === 'en' ? 'Back to Guides' : lang === 'fr' ? 'Retour aux guides' : 'Назад до гайдів'}
      </Link>

      <div class="guide-detail-container glass-panel" style={{ padding: '30px', borderRadius: '16px' }}>
        {/* Header Showcase: Wide Banner vs Icon Header */}
        {isWideBanner ? (
          <div style={{ position: 'relative', width: '100%', height: '240px', borderRadius: '12px', overflow: 'hidden', marginBottom: '24px' }}>
            <img src={formatImgUrl(rawImage)} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }} />
            <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
              <span class="badge badge-accent" style={{ marginBottom: '8px', display: 'inline-block' }}>
                {(guide.category || 'GUIDE').toUpperCase()}
              </span>
              <h1 style={{ fontSize: '28px', fontWeight: '800', margin: 0 }}>{title}</h1>
            </div>
          </div>
        ) : (
          <div class="glass-panel" style={{ display: 'flex', gap: '20px', alignItems: 'center', padding: '20px', borderRadius: '12px', marginBottom: '24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '12px', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: '10px' }}>
              <img src={formatImgUrl(rawImage)} alt={title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div>
              <span class="badge badge-accent" style={{ marginBottom: '6px', display: 'inline-block', fontSize: '11px' }}>
                {(guide.category || 'GUIDE').toUpperCase()}
              </span>
              <h1 style={{ fontSize: '24px', fontWeight: '800', margin: 0, lineHeight: '1.2' }}>{title}</h1>
            </div>
          </div>
        )}

        <p style={{ fontSize: '16px', lineHeight: '1.6', opacity: 0.9, marginBottom: '30px', borderLeft: '4px solid #ff4081', paddingLeft: '16px' }}>
          {summary}
        </p>

        {/* Sections */}
        {sections.map((sec, idx) => {
          const secTitle = getSectionText(sec, 'title', lang);
          const secContent = getSectionText(sec, 'text', lang) || getSectionText(sec, 'content', lang);

          return (
            <div key={idx} style={{ marginBottom: '28px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#ff4081' }}>{secTitle}</h2>
              <div style={{ fontSize: '15px', lineHeight: '1.7', whiteSpace: 'pre-line', opacity: 0.9 }}>
                {secContent}
              </div>
            </div>
          );
        })}

        {/* Recommended Characters */}
        {recChars.length > 0 && (
          <div style={{ marginTop: '36px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>
              {lang === 'en' ? 'Recommended Characters' : 'Рекомендовані персонажі'}
            </h3>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {recChars.map((charId) => {
                const charObj = characters.find((c) => c.id === charId);
                if (!charObj) return null;
                const name = (CHARACTER_TRANSLATIONS[charId] && CHARACTER_TRANSLATIONS[charId][lang]?.name) || charObj.name;

                return (
                  <div
                    key={charId}
                    class="glass-panel"
                    onClick={() => openCharacterModal(charId)}
                    style={{ cursor: 'pointer', padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    <img src={formatImgUrl(charObj.avatar)} alt={name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                    <span style={{ fontWeight: '600', fontSize: '14px' }}>{name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
