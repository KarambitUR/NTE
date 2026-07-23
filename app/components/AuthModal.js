'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../providers';

export default function AuthModal() {
  const { lang, isAuthModalOpen, setIsAuthModalOpen } = useApp();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof firebase === 'undefined') return;

    try {
      const unsubscribe = firebase.auth().onAuthStateChanged((u) => {
        setUser(u);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn('Firebase Auth listener error:', e);
    }
  }, []);

  if (!isAuthModalOpen) return null;

  const handleGoogleLogin = async () => {
    if (typeof firebase === 'undefined') {
      alert('Firebase is not initialized.');
      return;
    }
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
      setIsAuthModalOpen(false);
    } catch (error) {
      console.error('Google Auth Error:', error);
      alert(`Login failed: ${error.message}`);
    }
  };

  const handleLogout = async () => {
    if (typeof firebase === 'undefined') return;
    try {
      await firebase.auth().signOut();
      setUser(null);
      setIsAuthModalOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const texts = {
    title: {
      uk: user ? 'Ваш Акаунт' : 'Вхід у систему',
      en: user ? 'Your Account' : 'Account Login',
      fr: user ? 'Votre Compte' : 'Connexion',
    },
    googleBtn: {
      uk: 'Увійти через Google',
      en: 'Sign in with Google',
      fr: 'Se connecter avec Google',
    },
    logoutBtn: {
      uk: 'Вийти з акаунту',
      en: 'Sign Out',
      fr: 'Déconnexion',
    },
  };

  return (
    <div
      class="modal-overlay"
      style={{
        display: 'flex',
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.8)',
        zIndex: 9999,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backdropFilter: 'blur(8px)',
      }}
      onClick={() => setIsAuthModalOpen(false)}
    >
      <div
        class="modal-content glass-panel"
        style={{
          position: 'relative',
          maxWidth: '420px',
          width: '100%',
          padding: '30px',
          borderRadius: '16px',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.2)',
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
          }}
        >
          &times;
        </button>

        <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '20px' }}>
          {texts.title[lang] || texts.title.uk}
        </h3>

        {user ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <img
              src={user.photoURL || '/src/assets/zero_avatar.png'}
              alt={user.displayName}
              style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid #00e676' }}
            />
            <div>
              <strong style={{ fontSize: '16px', display: 'block' }}>{user.displayName}</strong>
              <span style={{ fontSize: '13px', opacity: 0.7 }}>{user.email}</span>
            </div>
            <button class="btn btn-secondary" onClick={handleLogout} style={{ width: '100%', marginTop: '10px' }}>
              {texts.logoutBtn[lang] || texts.logoutBtn.uk}
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontSize: '14px', opacity: 0.8, lineHeight: '1.5', margin: 0 }}>
              {lang === 'en'
                ? 'Sign in to save custom tier lists and vote for community rankings.'
                : 'Увійдіть, щоб зберігати власні тір-лісти та голосувати за рейтинги спільноти.'}
            </p>
            <button
              class="btn btn-primary"
              onClick={handleGoogleLogin}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', padding: '12px' }}
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
