'use client';

import React from 'react';

// SET THIS TO true TO TEMPORARILY PAUSE THE SITE WITH A STYLISH MAINTENANCE SCREEN
export const IS_MAINTENANCE = true;

export default function MaintenanceScreen() {
  if (!IS_MAINTENANCE) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999999,
        background: '#0a0b10',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        textAlign: 'center',
        color: '#ffffff',
        fontFamily: "'Space Grotesk', 'Outfit', sans-serif",
      }}
    >
      {/* Background Neon Glows */}
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(255,64,129,0.25) 0%, rgba(0,0,0,0) 70%)',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(0,230,118,0.2) 0%, rgba(0,0,0,0) 70%)',
          bottom: '20%',
          left: '50%',
          transform: 'translate(-50%, 50%)',
          pointerEvents: 'none',
        }}
      />

      <div
        class="glass-panel"
        style={{
          position: 'relative',
          maxWidth: '560px',
          width: '100%',
          padding: '40px 32px',
          borderRadius: '20px',
          border: '1px solid rgba(255, 64, 129, 0.4)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.9), 0 0 30px rgba(255, 64, 129, 0.2)',
          background: 'rgba(15, 14, 26, 0.95)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛠️</div>

        <span
          style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '20px',
            background: 'rgba(255, 64, 129, 0.2)',
            border: '1px solid #ff4081',
            color: '#ff4081',
            fontSize: '12px',
            fontWeight: '700',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          SYSTEM PAUSED / ТЕХНІЧНА ПАУЗА
        </span>

        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 12px 0', lineHeight: 1.2 }}>
          EIBON TERMINAL
        </h1>

        <p style={{ fontSize: '15px', lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', margin: '0 0 24px 0' }}>
          Роботу сайту тимчасово призупинено для проведення технічного обслуговування та оновлення систем. Ми відновлюємо роботу і повернемося зовсім скоро!
        </p>

        <div
          style={{
            padding: '12px 16px',
            borderRadius: '10px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            fontSize: '13px',
            color: 'rgba(255,255,255,0.6)',
          }}
        >
          ⏱️ Очікуваний час повернення: незабаром. Дякуємо за терпіння!
        </div>
      </div>
    </div>
  );
}
