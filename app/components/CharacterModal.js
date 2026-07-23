'use client';

import React from 'react';
import { useApp } from '../providers';
import { formatImgUrl } from '../utils';
import { FALLBACK_CHARACTERS } from '../../src/utils/fallbackData';
import { CHARACTER_TRANSLATIONS } from '../../src/localization/translations';

export default function CharacterModal() {
  const { lang, characters, activeCharId, closeCharacterModal } = useApp();

  if (!activeCharId) return null;

  const targetId = String(activeCharId).toLowerCase();
  const char =
    characters.find((c) => String(c.id).toLowerCase() === targetId) ||
    FALLBACK_CHARACTERS.find((c) => String(c.id).toLowerCase() === targetId);

  if (!char) return null;

  const trans = CHARACTER_TRANSLATIONS[char.id] || CHARACTER_TRANSLATIONS[targetId];
  const lData = trans && trans[lang] ? trans[lang] : {};

  const name = lData.name || char.name;
  const summary = lData.summary || char.summary;
  const weapon = lData.weapon || char.weapon;
  const weaponF2p = lData.weaponF2p || char.weaponF2p;
  const cartridge = lData.cartridge || char.cartridge;
  const teamSynergy = lData.teamSynergy || char.teamSynergy;
  const lore = lData.lore || char.lore;
  const stats = lData.stats || char.stats || [];

  const labels = {
    desc: { uk: 'Опис і механіки', en: 'Overview & Mechanics', fr: 'Aperçu & Mécaniques' },
    bestBuild: { uk: 'Рекомендований білд', en: 'Recommended Build', fr: 'Build Recommandé' },
    bestWeapon: { uk: 'Сигнатурна зброя (Best)', en: 'Signature Weapon (Best)', fr: 'Arme Signature (Meilleur)' },
    f2pWeapon: { uk: 'F2P Альтернатива', en: 'F2P Alternative', fr: 'Alternative F2P' },
    cartridge: { uk: 'Комплект Картриджів (Relics)', en: 'Cartridge Set (Relics)', fr: 'Ensemble de Cartouches' },
    statsPri: { uk: 'Пріоритет характеристик', en: 'Stat Priorities', fr: 'Priorités de Stats' },
    teams: { uk: 'Синергія та партнери', en: 'Team Synergy & Partners', fr: 'Synergie d’équipe' },
    lore: { uk: 'Лор і біографія', en: 'Lore & Story', fr: 'Histoire' },
  };

  return (
    <div
      class="modal-overlay active"
      style={{
        display: 'flex',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.85)',
        zIndex: 999999,
        opacity: 1,
        pointerEvents: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backdropFilter: 'blur(10px)',
      }}
      onClick={closeCharacterModal}
    >
      <div
        class="modal-content glass-panel"
        style={{
          position: 'relative',
          maxWidth: '700px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '30px',
          borderRadius: '16px',
          border: '1px solid rgba(255,64,129,0.4)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.8), 0 0 20px rgba(255,64,129,0.2)',
          background: 'rgba(18, 16, 32, 0.95)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeCharacterModal}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '28px',
            cursor: 'pointer',
            lineHeight: 1,
            opacity: 0.7,
          }}
        >
          &times;
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '24px' }}>
          <img
            src={formatImgUrl(char.avatar || `src/assets/${char.id}_avatar.png`)}
            alt={name}
            style={{ width: '90px', height: '90px', borderRadius: '12px', objectFit: 'cover', border: '2px solid #ff4081' }}
          />
          <div>
            <h2 style={{ fontSize: '26px', fontWeight: '800', margin: '0 0 8px 0', color: '#fff' }}>{name}</h2>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <span class={`badge badge-${char.rarity === 5 ? 'hot' : 'cosmos'}`}>{char.rarity}★</span>
              <span class={`badge badge-${String(char.attribute).toLowerCase()}`}>{char.attribute}</span>
              <span class="badge badge-anima">{char.role}</span>
              <span class="badge badge-incant">Tier {char.tier}</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h4 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', color: '#ff4081', margin: '0 0 6px 0' }}>
              {labels.desc[lang] || labels.desc.uk}
            </h4>
            <p style={{ fontSize: '14px', lineHeight: '1.6', opacity: 0.9, margin: 0, color: '#fff' }}>{summary}</p>
          </div>

          <div>
            <h4 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', color: '#ff4081', margin: '0 0 10px 0' }}>
              {labels.bestBuild[lang] || labels.bestBuild.uk}
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div class="glass-panel" style={{ padding: '12px', borderRadius: '8px' }}>
                <span style={{ fontSize: '11px', opacity: 0.7, display: 'block' }}>{labels.bestWeapon[lang] || labels.bestWeapon.uk}</span>
                <strong style={{ fontSize: '13px', color: '#fff' }}>{weapon}</strong>
              </div>
              <div class="glass-panel" style={{ padding: '12px', borderRadius: '8px' }}>
                <span style={{ fontSize: '11px', opacity: 0.7, display: 'block' }}>{labels.f2pWeapon[lang] || labels.f2pWeapon.uk}</span>
                <strong style={{ fontSize: '13px', color: '#fff' }}>{weaponF2p}</strong>
              </div>
            </div>

            <div class="glass-panel" style={{ padding: '12px', borderRadius: '8px', marginTop: '12px' }}>
              <span style={{ fontSize: '11px', opacity: 0.7, display: 'block' }}>{labels.cartridge[lang] || labels.cartridge.uk}</span>
              <strong style={{ fontSize: '13px', color: '#fff' }}>{cartridge}</strong>
            </div>

            <div style={{ marginTop: '12px' }}>
              <span style={{ fontSize: '11px', opacity: 0.7, display: 'block', marginBottom: '6px' }}>{labels.statsPri[lang] || labels.statsPri.uk}</span>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {stats.map((st, i) => (
                  <span key={i} class="badge badge-secondary" style={{ fontSize: '11px' }}>
                    {st}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', color: '#ff4081', margin: '0 0 6px 0' }}>
              {labels.teams[lang] || labels.teams.uk}
            </h4>
            <p style={{ fontSize: '14px', opacity: 0.9, margin: 0, color: '#fff' }}>{teamSynergy}</p>
          </div>

          {lore && (
            <div>
              <h4 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', color: '#ff4081', margin: '0 0 6px 0' }}>
                {labels.lore[lang] || labels.lore.uk}
              </h4>
              <p style={{ fontSize: '13px', fontStyle: 'italic', opacity: 0.8, lineHeight: '1.5', margin: 0, color: '#fff' }}>{lore}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
