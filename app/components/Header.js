'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '../providers';

export default function Header() {
  const pathname = usePathname();
  const { lang, setLang, setIsAuthModalOpen } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', key: 'home', uk: 'Головна', en: 'Home', fr: 'Accueil' },
    { href: '/tierlist', key: 'tierlist', uk: 'Тір-ліст', en: 'Tier List', fr: 'Tier List' },
    { href: '/guides', key: 'guides', uk: 'Гайди', en: 'Guides', fr: 'Guides' },
    { href: '/map', key: 'map', uk: 'Карта', en: 'Map', fr: 'Carte' },
    { href: '/codes', key: 'codes', uk: 'Промокоди', en: 'Codes', fr: 'Codes' },
    { href: '/calendar', key: 'calendar', uk: 'Календар', en: 'Calendar', fr: 'Calendrier' },
  ];

  return (
    <header class="app-header">
      <div class="header-container">
        <Link href="/" class="logo" style={{ textDecoration: 'none' }}>
          <span class="logo-accent">EIBON</span>
          <span class="logo-main">TERMINAL</span>
          <span class="logo-badge">WIKI</span>
        </Link>

        <button
          class="menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Navigation"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <nav class={`main-nav ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul class="nav-links">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    class={`nav-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item[lang] || item.uk}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div class="header-right-group">
          <div class="lang-switcher">
            <button
              class={`lang-btn ${lang === 'uk' ? 'active' : ''}`}
              onClick={() => setLang('uk')}
            >
              UA
            </button>
            <span class="lang-divider">|</span>
            <button
              class={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
            >
              EN
            </button>
            <span class="lang-divider">|</span>
            <button
              class={`lang-btn ${lang === 'fr' ? 'active' : ''}`}
              onClick={() => setLang('fr')}
            >
              FR
            </button>
          </div>
          <div class="header-auth">
            <button
              class="btn btn-primary btn-sm"
              onClick={() => setIsAuthModalOpen(true)}
            >
              <span>{lang === 'en' ? 'Login' : lang === 'fr' ? 'Connexion' : 'Увійти'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
