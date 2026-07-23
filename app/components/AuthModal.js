'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../providers';
import { auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged } from '../firebase';

export default function AuthModal() {
  const { lang, isAuthModalOpen, setIsAuthModalOpen } = useApp();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Read local user session if available
    try {
      const stored = localStorage.getItem('nte_user');
      if (stored) setUser(JSON.parse(stored));
    } catch (e) {}

    if (!auth) return;

    try {
      const unsubscribe = onAuthStateChanged(auth, (u) => {
        if (u) {
          const userData = {
            displayName: u.displayName || 'Explorer',
            email: u.email,
            photoURL: u.photoURL || '/src/assets/zero_avatar.png',
          };
          setUser(userData);
          localStorage.setItem('nte_user', JSON.stringify(userData));
        }
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn('Firebase Auth listener error:', e);
    }
  }, []);

  if (!isAuthModalOpen) return null;

  const handleGoogleLogin = async () => {
    if (auth && googleProvider) {
      try {
        const res = await signInWithPopup(auth, googleProvider);
        if (res?.user) {
          const userData = {
            displayName: res.user.displayName || 'Explorer',
            email: res.user.email,
            photoURL: res.user.photoURL || '/src/assets/zero_avatar.png',
          };
          setUser(userData);
          localStorage.setItem('nte_user', JSON.stringify(userData));
          setIsAuthModalOpen(false);
          return;
        }
      } catch (error) {
        console.error('Google Auth Error:', error);
        alert(`Firebase Auth Error: ${error.code || error.message}`);
      }
    }

    // Fallback: Instant Guest / Eibon Account Sign-In
    const fallbackUser = {
      displayName: 'Eibon Agent',
      email: 'agent@eibon.terminal',
      photoURL: '/src/assets/zero_avatar.png',
    };
    setUser(fallbackUser);
    localStorage.setItem('nte_user', JSON.stringify(fallbackUser));
    setIsAuthModalOpen(false);
  };

  const handleLogout = async () => {
    if (auth) {
      try {
        await signOut(auth);
      } catch (e) {}
    }
    setUser(null);
    localStorage.removeItem('nte_user');
    setIsAuthModalOpen(false);
  };

  const texts = {
    title: {
      uk: user ? 'Ваш Акаунт Eibon' : 'Вхід у систему Eibon',
      en: user ? 'Your Eibon Account' : 'Eibon System Login',
      fr: user ? 'Votre Compte Eibon' : 'Connexion Eibon',
    },
    googleBtn: {
      uk: 'Увійти (Google / Eibon)',
      en: 'Sign in (Google / Eibon)',
      fr: 'Se connecter (Google / Eibon)',
    },
    logoutBtn: {
      uk: 'Вийти з акаунту',
      en: 'Sign Out',
      fr: 'Déconnexion',
    },
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
      onClick={() => setIsAuthModalOpen(false)}
    >
      <div
        class="modal-content glass-panel"
        style={{
          position: 'relative',
          maxWidth: '420px',
          width: '100%',
          padding: '32px',
          borderRadius: '16px',
          textAlign: 'center',
          border: '1px solid rgba(255,64,129,0.4)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.8), 0 0 20px rgba(255,64,129,0.2)',
          background: 'rgba(18, 16, 32, 0.95)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsAuthModalOpen(false)}
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

        <div style={{ fontSize: '36px', marginBottom: '12px' }}>🔑</div>

        <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '16px', color: '#fff' }}>
          {texts.title[lang] || texts.title.uk}
        </h3>

        {user ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <img
              src={user.photoURL || '/src/assets/zero_avatar.png'}
              alt={user.displayName}
              style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid #00e676', objectFit: 'cover' }}
            />
            <div>
              <strong style={{ fontSize: '18px', display: 'block', color: '#fff' }}>{user.displayName}</strong>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{user.email}</span>
            </div>
            <button class="btn btn-secondary" onClick={handleLogout} style={{ width: '100%', marginTop: '10px' }}>
              {texts.logoutBtn[lang] || texts.logoutBtn.uk}
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
              {lang === 'en'
                ? 'Sign in to save custom tier lists and access exclusive guide bookmarks.'
                : 'Увійдіть, щоб зберігати власні тір-лісти та персональні закладки гайдів.'}
            </p>
            <button
              class="btn btn-primary"
              onClick={handleGoogleLogin}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                width: '100%',
                padding: '12px',
                fontSize: '15px',
                fontWeight: '700',
              }}
            >
              <span>🌐</span>
              <span>{texts.googleBtn[lang] || texts.googleBtn.uk}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
