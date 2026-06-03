import { state } from './state.js';
import { loadFromFirestore, loadFromCache, loadFallbackData, setupRealtimeListeners } from '../services/firestore.js';
import { translatePage } from '../localization/i18n.js';
import { startBannerCountdown } from '../utils/helpers.js';
import { renderHomeWidgets, renderTimeline } from '../features/home.js';
import { renderTierList, loadCommunityTierlists } from '../features/tierlist.js';
import { openCharacterModal } from '../features/builds.js';
import { evaluateTeamSynergy, updateTeamSlotsUI } from '../features/teambuilder.js';
import { renderCalculatorSetup, setupCalculatorEvents } from '../features/calculator.js';
import { renderPromoCodes } from '../features/codes.js';
import { initAuthAndUserTierlists, updateAuthUI } from '../features/auth.js';
import { initGuides, renderGuides } from '../features/guides.js';
import { FALLBACK_PROMO_CODES } from '../utils/fallbackData.js';

// 5. INITIALIZATION & ROUTING
document.addEventListener("DOMContentLoaded", async () => {
    // Failsafe: always hide loading overlay after 10 seconds max
    const failsafeTimer = setTimeout(() => {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay && !overlay.classList.contains('hidden')) {
            overlay.classList.add('hidden');
            console.warn('⚠️ Loading overlay hidden by failsafe timer');
        }
    }, 10000);

    try {
        // Try loading data in priority order: Firestore → Cache → Hardcoded fallback
        const firestoreSuccess = await loadFromFirestore();
        
        if (!firestoreSuccess) {
            const cacheSuccess = loadFromCache();
            if (!cacheSuccess) {
                loadFallbackData();
            }
        }

        // Also try loading codes.json as additional fallback for promo codes
        if (state.PROMO_CODES.length === 0) {
            try {
                const res = await fetch('codes.json');
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    state.PROMO_CODES = data;
                }
            } catch (e) {
                console.warn('codes.json fallback also failed');
            }
        }

        // If still no promo codes, use fallback
        if (state.PROMO_CODES.length === 0) {
            state.PROMO_CODES = [...FALLBACK_PROMO_CODES];
        }

        // Setup language switcher binding
        const langBtns = document.querySelectorAll(".lang-btn");
        langBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const selectedLang = btn.getAttribute("data-lang");
                if (selectedLang !== state.currentLang) {
                    localStorage.setItem('nte_lang', selectedLang);
                    translatePage(selectedLang);
                    
                    // Re-render
                    renderTierList();
                    renderGuides();
                    renderTimeline();
                    renderCalculatorSetup();
                    renderHomeWidgets();
                    renderPromoCodes();
                    evaluateTeamSynergy();
                    updateTeamSlotsUI();
                    // Re-render auth UI and community lists for the new language
                    if (typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser) {
                        updateAuthUI(firebase.auth().currentUser);
                    } else {
                        updateAuthUI(null);
                    }
                    const commContent = document.getElementById('sub-content-community');
                    if (commContent && commContent.classList.contains('active')) {
                        loadCommunityTierlists();
                    }
                }
            });
        });

        // Run initial translation
        translatePage(state.currentLang);

        // Initialize all UI components
        initNavigation();
        renderTierList();
        initGuides();
        renderCalculatorSetup();
        renderTimeline();
        setupCalculatorEvents();
        renderPromoCodes();
        
        // Start active banner countdown & home widgets
        startBannerCountdown();
        renderHomeWidgets();

        // Setup banner CTA click
        const bannerBtn = document.getElementById("btnGoToBannerChar");
        if (bannerBtn) {
            bannerBtn.addEventListener("click", () => {
                switchTab("guides");
                openCharacterModal("lacrimosa");
            });
        }

        // Setup realtime listeners for live updates
        setupRealtimeListeners();

        // Setup Auth and Community Tier lists
        initAuthAndUserTierlists();

        // Show data source indicator
        const sourceEmoji = state.dataSource === 'firestore' ? '🔥' : state.dataSource === 'cache' ? '📦' : '📋';
        console.log(`${sourceEmoji} App initialized with data from: ${state.dataSource}`);
        
        // Logo Click returns to Home
        document.getElementById("headerLogo").addEventListener("click", () => switchTab("home"));

    } catch (error) {
        console.error('❌ App initialization error:', error);
    } finally {
        // Always hide loading overlay
        clearTimeout(failsafeTimer);
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
        }
    }
});

// Navigation logic
function initNavigation() {
    const navBtns = document.querySelectorAll(".nav-btn");
    const panes = document.querySelectorAll(".tab-pane");
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    navBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetTab = btn.getAttribute("data-tab");
            switchTab(targetTab);
            
            // Close mobile menu on click
            mainNav.classList.remove("active");
        });
    });

    menuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("active");
    });
}

function switchTab(tabId) {
    // Update nav active states
    const navBtns = document.querySelectorAll(".nav-btn");
    navBtns.forEach(btn => {
        if (btn.getAttribute("data-tab") === tabId) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    // Update tab panes
    const panes = document.querySelectorAll(".tab-pane");
    panes.forEach(pane => {
        if (pane.id === `pane-${tabId}`) {
            pane.classList.add("active");
        } else {
            pane.classList.remove("active");
        }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Expose legacy global functions for inline HTML event handlers
window.switchTab = switchTab;
window.openCharacterModal = openCharacterModal;
