'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { FALLBACK_CHARACTERS, FALLBACK_PROMO_CODES, FALLBACK_TIMELINE_EVENTS } from '../src/utils/fallbackData';
import { FALLBACK_GUIDES } from '../src/utils/fallbackGuides';

const AppContext = createContext();

export function AppProviders({ children }) {
  const [lang, setLangState] = useState('uk');
  const [user, setUser] = useState(null);

  // Normalize all character avatars to local asset images
  const normalizedFallbackChars = FALLBACK_CHARACTERS.map((c) => ({
    ...c,
    avatar: `src/assets/${c.id}_avatar.png`,
  }));

  const [characters, setCharacters] = useState(normalizedFallbackChars);
  const [promoCodes, setPromoCodes] = useState(FALLBACK_PROMO_CODES);
  const [timelineEvents, setTimelineEvents] = useState(FALLBACK_TIMELINE_EVENTS);
  const [guides, setGuides] = useState(FALLBACK_GUIDES);
  const [dataSource, setDataSource] = useState('hardcoded');

  // Modals state
  const [activeCharId, setActiveCharId] = useState(null);
  const [activeGuideId, setActiveGuideId] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    // Read stored language preference
    const storedLang = localStorage.getItem('nte_lang');
    if (storedLang && ['uk', 'en', 'fr'].includes(storedLang)) {
      setLangState(storedLang);
    }

    // Read stored user session
    try {
      const storedUser = localStorage.getItem('nte_user');
      if (storedUser) setUser(JSON.parse(storedUser));
    } catch (e) {}

    // Clear stale localStorage character cache if it contains old Wikia links
    try {
      const cChars = localStorage.getItem('nte_characters');
      if (cChars) {
        if (cChars.includes('wikia.nocookie.net')) {
          localStorage.removeItem('nte_characters');
        } else {
          const parsed = JSON.parse(cChars);
          setCharacters(
            parsed.map((c) => ({
              ...c,
              avatar: `src/assets/${c.id}_avatar.png`,
            }))
          );
        }
      }
      const cCodes = localStorage.getItem('nte_promoCodes');
      const cTime = localStorage.getItem('nte_timelineEvents');
      const cGuides = localStorage.getItem('nte_guides');

      if (cCodes) setPromoCodes(JSON.parse(cCodes));
      if (cTime) {
        const parsed = JSON.parse(cTime);
        setTimelineEvents(parsed.filter((e) => e.order !== undefined && e.badgeClass && e.status && e.desc));
      }
      if (cGuides) setGuides(JSON.parse(cGuides));
    } catch (e) {
      console.warn('LocalStorage parse error:', e);
    }
  }, []);

  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem('nte_lang', newLang);
  };

  const openCharacterModal = (charId) => {
    setActiveCharId(charId);
  };

  const closeCharacterModal = () => {
    setActiveCharId(null);
  };

  const openGuideModal = (guideId) => {
    setActiveGuideId(guideId);
  };

  const closeGuideModal = () => {
    setActiveGuideId(null);
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        user,
        setUser,
        characters,
        promoCodes,
        timelineEvents,
        guides,
        dataSource,
        activeCharId,
        openCharacterModal,
        closeCharacterModal,
        activeGuideId,
        openGuideModal,
        closeGuideModal,
        isAuthModalOpen,
        setIsAuthModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
