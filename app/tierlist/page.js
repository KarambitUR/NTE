'use client';

import React, { useState } from 'react';
import { useApp } from '../providers';
import { formatImgUrl } from '../utils';
import { CHARACTER_TRANSLATIONS, ROLE_TRANSLATIONS, ATTR_TRANSLATIONS } from '../../src/localization/translations';

export default function TierListPage() {
  const { lang, characters, openCharacterModal } = useApp();
  const [selectedAttr, setSelectedAttr] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');

  const tiers = ['S+', 'S', 'A', 'B'];

  const filteredChars = characters.filter((c) => {
    if (selectedAttr !== 'all' && c.attribute.toLowerCase() !== selectedAttr.toLowerCase()) return false;
    if (selectedRole !== 'all' && c.role.toLowerCase() !== selectedRole.toLowerCase()) return false;
    return true;
  });

  const pageTexts = {
    title: {
      uk: 'Інтерактивний Тір-ліст Персонажів',
      en: 'Interactive Character Tier List',
      fr: 'Tier List Interactive des Personnages',
    },
    subtitle: {
      uk: 'Рейтинг героїв для актуального патчу 1.3 "Rising from the Moonlit Fog". Натисніть на картку персонажа, щоб переглянути детальний білд.',
      en: 'Character rankings for the current patch 1.3 "Rising from the Moonlit Fog". Click any character card to view their detailed build.',
      fr: 'Classement des personnages pour le patch 1.3 "Rising from the Moonlit Fog". Cliquez sur une carte pour voir son build.',
    },
  };

  const attrs = [
    { key: 'all', label: { uk: 'Усі стихії', en: 'All Attributes', fr: 'Tous les éléments' } },
    { key: 'Anima', label: { uk: 'Аніма', en: 'Anima', fr: 'Anima' } },
    { key: 'Cosmos', label: { uk: 'Космос', en: 'Cosmos', fr: 'Cosmos' } },
    { key: 'Incantation', label: { uk: 'Закляття', en: 'Incantation', fr: 'Incantation' } },
    { key: 'Chaos', label: { uk: 'Хаос', en: 'Chaos', fr: 'Chaos' } },
    { key: 'Psyche', label: { uk: 'Психея', en: 'Psyche', fr: 'Psyché' } },
    { key: 'Lakshana', label: { uk: 'Лакшана', en: 'Lakshana', fr: 'Lakshana' } },
  ];

  const roles = [
    { key: 'all', label: { uk: 'Усі ролі', en: 'All Roles', fr: 'Tous les rôles' } },
    { key: 'Main DPS', label: { uk: 'Main DPS', en: 'Main DPS', fr: 'DPS Principal' } },
    { key: 'Sub-DPS', label: { uk: 'Sub-DPS', en: 'Sub-DPS', fr: 'Sub-DPS' } },
    { key: 'Support', label: { uk: 'Support', en: 'Support', fr: 'Soutien' } },
  ];

  return (
    <div class="tab-pane active" id="pane-tierlist">
      <div class="section-header">
        <h2 class="section-title">{pageTexts.title[lang] || pageTexts.title.uk}</h2>
        <p class="section-desc">{pageTexts.subtitle[lang] || pageTexts.subtitle.uk}</p>
      </div>

      {/* Filters */}
      <div class="filters-bar glass-panel" style={{ padding: '16px', marginBottom: '24px', borderRadius: '12px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div class="filter-group">
          <label style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.7, marginBottom: '6px', display: 'block' }}>
            {lang === 'en' ? 'Attribute' : lang === 'fr' ? 'Élément' : 'Стихія'}
          </label>
          <div class="btn-group" style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {attrs.map((a) => (
              <button
                key={a.key}
                class={`btn btn-sm ${selectedAttr === a.key ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedAttr(a.key)}
              >
                {a.label[lang] || a.label.uk}
              </button>
            ))}
          </div>
        </div>

        <div class="filter-group">
          <label style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.7, marginBottom: '6px', display: 'block' }}>
            {lang === 'en' ? 'Role' : lang === 'fr' ? 'Rôle' : 'Роль'}
          </label>
          <div class="btn-group" style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {roles.map((r) => (
              <button
                key={r.key}
                class={`btn btn-sm ${selectedRole === r.key ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedRole(r.key)}
              >
                {r.label[lang] || r.label.uk}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tiers Grid */}
      <div class="tier-list-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {tiers.map((tier) => {
          const tierChars = filteredChars.filter((c) => c.tier === tier);
          const tierClass = tier.toLowerCase().replace('+', '-plus');

          return (
            <div key={tier} class="tier-row glass-panel" style={{ display: 'flex', borderRadius: '12px', overflow: 'hidden' }}>
              <div class={`tier-badge-column tier-${tierClass}`} style={{ width: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '24px', minHeight: '140px' }}>
                {tier}
              </div>
              <div class="tier-cards-container" style={{ padding: '16px', display: 'flex', gap: '16px', flexWrap: 'wrap', flex: 1, alignItems: 'center' }}>
                {tierChars.length === 0 ? (
                  <span style={{ opacity: 0.5, fontStyle: 'italic', fontSize: '14px' }}>
                    {lang === 'en' ? 'No characters match current filters' : 'Немає персонажів для обраних фільтрів'}
                  </span>
                ) : (
                  tierChars.map((char) => {
                    const trans = CHARACTER_TRANSLATIONS[char.id];
                    const name = (trans && trans[lang]?.name) || char.name;
                    const role = (ROLE_TRANSLATIONS[lang] && ROLE_TRANSLATIONS[lang][char.role]) || char.role;
                    const attr = (ATTR_TRANSLATIONS[lang] && ATTR_TRANSLATIONS[lang][char.attribute]) || char.attribute;

                    return (
                      <div
                        key={char.id}
                        class="char-card glass-panel"
                        onClick={() => openCharacterModal(char.id)}
                        style={{
                          width: '138px',
                          minHeight: '175px',
                          height: 'auto',
                          cursor: 'pointer',
                          textAlign: 'center',
                          padding: '10px 6px',
                          borderRadius: '10px',
                          transition: 'transform 0.2s',
                          border: '1px solid rgba(255,255,255,0.15)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <div style={{ width: '100%', height: '105px', borderRadius: '8px', overflow: 'hidden', marginBottom: '6px' }}>
                          <img src={formatImgUrl(char.avatar)} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <strong style={{ fontSize: '13px', display: 'block', width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#fff' }}>
                          {name}
                        </strong>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3px', marginTop: '6px', width: '100%' }}>
                          <span class={`badge badge-${char.attribute.toLowerCase()}`} style={{ fontSize: '9px', padding: '2px 5px', whiteSpace: 'nowrap' }}>
                            {attr}
                          </span>
                          <span class="badge badge-secondary" style={{ fontSize: '9px', padding: '2px 5px', whiteSpace: 'nowrap' }}>
                            {role}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
