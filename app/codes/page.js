'use client';

import React, { useState } from 'react';
import { useApp } from '../providers';

export default function PromoCodesPage() {
  const { lang, promoCodes } = useApp();
  const [copiedCode, setCopiedCode] = useState(null);

  const activeCodes = promoCodes.filter((c) => c.active !== false);
  const expiredCodes = promoCodes.filter((c) => c.active === false);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const pageTexts = {
    title: {
      uk: 'Безкоштовні Промокоди NTE',
      en: 'Free NTE Promo Codes',
      fr: 'Codes Promo Gratuits NTE',
    },
    subtitle: {
      uk: 'Завжди актуальні коди для отримання Annulith, Beetle Coins, Fons та матеріалів прокачки.',
      en: 'Always up-to-date codes for Annulith, Beetle Coins, Fons, and upgrade materials.',
      fr: 'Codes toujours à jour pour Annulith, Beetle Coins, Fons et matériaux de niveau.',
    },
    activeHeader: {
      uk: 'Активні коди',
      en: 'Active Codes',
      fr: 'Codes Actifs',
    },
    expiredHeader: {
      uk: 'Застарілі коди',
      en: 'Expired Codes',
      fr: 'Codes Expirés',
    },
    copyBtn: {
      uk: 'Скопіювати',
      en: 'Copy Code',
      fr: 'Copier',
    },
    copiedBtn: {
      uk: 'Скопійовано! ✓',
      en: 'Copied! ✓',
      fr: 'Copié ! ✓',
    },
  };

  return (
    <div class="tab-pane active" id="pane-codes">
      <div class="section-header">
        <h2 class="section-title">{pageTexts.title[lang] || pageTexts.title.uk}</h2>
        <p class="section-desc">{pageTexts.subtitle[lang] || pageTexts.subtitle.uk}</p>
      </div>

      {/* Active Codes */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#00e676', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>●</span> {pageTexts.activeHeader[lang] || pageTexts.activeHeader.uk} ({activeCodes.length})
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {activeCodes.map((item) => {
            const isCopied = copiedCode === item.code;
            return (
              <div key={item.code} class="promo-code-card glass-panel" style={{ padding: '16px 20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', border: '1px solid rgba(0, 230, 118, 0.3)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '18px', fontWeight: '800', fontFamily: 'monospace', letterSpacing: '1px', color: '#fff' }}>
                    {item.code}
                  </span>
                  <span style={{ fontSize: '13px', opacity: 0.85 }}>{item.rewards}</span>
                </div>
                <button
                  class={`btn btn-sm ${isCopied ? 'btn-accent' : 'btn-primary'}`}
                  onClick={() => handleCopy(item.code)}
                >
                  {isCopied ? (pageTexts.copiedBtn[lang] || pageTexts.copiedBtn.uk) : (pageTexts.copyBtn[lang] || pageTexts.copyBtn.uk)}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expired Codes */}
      {expiredCodes.length > 0 && (
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', opacity: 0.6, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>○</span> {pageTexts.expiredHeader[lang] || pageTexts.expiredHeader.uk} ({expiredCodes.length})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', opacity: 0.5 }}>
            {expiredCodes.map((item) => (
              <div key={item.code} class="promo-code-card glass-panel" style={{ padding: '12px 16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'monospace', textDecoration: 'line-through' }}>{item.code}</span>
                <span style={{ fontSize: '12px' }}>{item.rewards}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
