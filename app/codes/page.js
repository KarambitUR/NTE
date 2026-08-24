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
      uk: 'Копіювати',
      en: 'Copy Code',
      fr: 'Copier',
    },
    copiedBtn: {
      uk: 'Скопійовано! ✓',
      en: 'Copied! ✓',
      fr: 'Copié ! ✓',
    },
    howToRedeemTitle: {
      uk: 'Як активувати промокод у грі',
      en: 'How to Redeem Promo Codes in Game',
      fr: 'Comment utiliser un code promo en jeu',
    },
  };

  return (
    <div class="tab-pane active" id="pane-codes">
      <div class="section-header">
        <h2 class="section-title">{pageTexts.title[lang] || pageTexts.title.uk}</h2>
        <p class="section-desc">{pageTexts.subtitle[lang] || pageTexts.subtitle.uk}</p>
      </div>

      <div class="codes-layout">
        {/* Active & Expired Column */}
        <div class="codes-column">
          <div class="panel-header-row">
            <h3>{pageTexts.activeHeader[lang] || pageTexts.activeHeader.uk}</h3>
            <span class="update-indicator pulse-green">
              ● {activeCodes.length} {lang === 'en' ? 'Active' : lang === 'fr' ? 'Actifs' : 'Активних'}
            </span>
          </div>

          <div class="codes-list">
            {activeCodes.map((item) => {
              const isCopied = copiedCode === item.code;
              return (
                <div key={item.code} class="code-card">
                  <div class="code-info">
                    <span class="code-string">{item.code}</span>
                    <span class="code-rewards">{item.rewards}</span>
                  </div>
                  <button
                    class="btn-copy"
                    onClick={() => handleCopy(item.code)}
                  >
                    {isCopied ? (
                      <span>✓ {pageTexts.copiedBtn[lang] || pageTexts.copiedBtn.uk}</span>
                    ) : (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        {pageTexts.copyBtn[lang] || pageTexts.copyBtn.uk}
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {expiredCodes.length > 0 && (
            <div style={{ marginTop: '24px' }}>
              <h3 style={{ opacity: 0.6, fontSize: '1.1rem', marginBottom: '12px' }}>
                {pageTexts.expiredHeader[lang] || pageTexts.expiredHeader.uk}
              </h3>
              <div class="codes-list" style={{ opacity: 0.5 }}>
                {expiredCodes.map((item) => (
                  <div key={item.code} class="code-card">
                    <div class="code-info">
                      <span class="code-string" style={{ textDecoration: 'line-through' }}>{item.code}</span>
                      <span class="code-rewards">{item.rewards}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Redemption Instructions Column */}
        <div class="redemption-column glass-panel" style={{ padding: '24px', borderRadius: '12px' }}>
          <h3>{pageTexts.howToRedeemTitle[lang] || pageTexts.howToRedeemTitle.uk}</h3>
          <ol class="guide-steps">
            <li>
              <strong>{lang === 'en' ? 'Step 1:' : lang === 'fr' ? 'Étape 1 :' : 'Крок 1:'}</strong>{' '}
              {lang === 'en' ? 'Open the game menu in Neverness to Everness.' : lang === 'fr' ? 'Ouvrez le menu principal dans Neverness to Everness.' : 'Відкрийте головне меню гри у Neverness to Everness.'}
            </li>
            <li>
              <strong>{lang === 'en' ? 'Step 2:' : lang === 'fr' ? 'Étape 2 :' : 'Крок 2:'}</strong>{' '}
              {lang === 'en' ? 'Go to Settings (⚙️) ➔ Account / System.' : lang === 'fr' ? 'Allez dans Paramètres (⚙️) ➔ Compte / Système.' : 'Перейдіть у Налаштування (⚙️) ➔ Акаунт / Система.'}
            </li>
            <li>
              <strong>{lang === 'en' ? 'Step 3:' : lang === 'fr' ? 'Étape 3 :' : 'Крок 3:'}</strong>{' '}
              {lang === 'en' ? 'Click "Redeem Code" and paste the code.' : lang === 'fr' ? 'Cliquez sur "Utiliser un code" et collez le code.' : 'Натисніть "Активувати код" (Redeem Code) та вставте код.'}
            </li>
            <li>
              <strong>{lang === 'en' ? 'Step 4:' : lang === 'fr' ? 'Étape 4 :' : 'Крок 4:'}</strong>{' '}
              {lang === 'en' ? 'Check your in-game mailbox to collect rewards!' : lang === 'fr' ? 'Vérifiez votre boîte aux lettres en jeu pour récupérer vos récompenses !' : 'Заберіть свої нагороди у внутрішньоігровій пошті!'}
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
