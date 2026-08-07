import './globals.css';
import { AppProviders } from './providers';
import Header from './components/Header';
import Footer from './components/Footer';
import CharacterModal from './components/CharacterModal';
import AuthModal from './components/AuthModal';
import MaintenanceScreen from './components/MaintenanceModal';

export const metadata = {
  title: 'Eibon Terminal | Neverness to Everness (NTE) Гайди та Тір-ліст',
  description: 'Найкращі гайди, інтерактивний тір-ліст, інтерактивна карта фарму, конструктор команд та завжди свіжі промокоди для гри Neverness to Everness (NTE).',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body>
        <MaintenanceScreen />

        <div class="bg-decorations-wrapper">
          <div class="glow-bg-1"></div>
          <div class="glow-bg-2"></div>
        </div>

        <AppProviders>
          <Header />
          <main class="app-content">{children}</main>
          <Footer />
          <CharacterModal />
          <AuthModal />
        </AppProviders>
      </body>
    </html>
  );
}
