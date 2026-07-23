'use client';

import React from 'react';
import { useApp } from '../providers';

export default function Footer() {
  const { lang } = useApp();

  const texts = {
    copyright: {
      uk: '© 2026 Eibon Terminal. Усі права захищено. Створено для спільноти Neverness to Everness.',
      en: '© 2026 Eibon Terminal. All rights reserved. Made for the Neverness to Everness community.',
      fr: '© 2026 Eibon Terminal. Tous droits réservés. Créé pour la communauté Neverness to Everness.',
    },
    disclaimer: {
      uk: "Цей сайт є фан-ресурсом і не пов'язаний з Perfect World Games чи Hotta Studio. Усі права на гру належать їхнім правовласникам.",
      en: 'This site is a fan-made resource and is not affiliated with Perfect World Games or Hotta Studio. All game rights belong to their respective owners.',
      fr: "Ce site est une ressource faite par des fans et n'est pas affilié à Perfect World Games ou Hotta Studio.",
    },
  };

  return (
    <footer class="app-footer">
      <div class="footer-container">
        <p>{texts.copyright[lang] || texts.copyright.uk}</p>
        <p class="footer-disclaimer">{texts.disclaimer[lang] || texts.disclaimer.uk}</p>
      </div>
    </footer>
  );
}
