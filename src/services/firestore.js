import { state } from '../scripts/state.js';
import { db } from '../firebase/firebase.js';
import { FALLBACK_CHARACTERS, FALLBACK_PROMO_CODES, FALLBACK_TIMELINE_EVENTS } from '../utils/fallbackData.js';
import { FALLBACK_GUIDES } from '../utils/fallbackGuides.js';
import { parseFirebaseDate } from '../utils/helpers.js';
import { translatePage } from '../localization/i18n.js';
import { renderPromoCodes } from '../features/codes.js';
import { renderTimeline, renderHomeWidgets } from '../features/home.js';
import { renderTierList, loadCommunityTierlists } from '../features/tierlist.js';
import { renderBuilds } from '../features/builds.js';
import { renderCalculatorSetup } from '../features/calculator.js';
import { evaluateTeamSynergy, updateTeamSlotsUI } from '../features/teambuilder.js';
import { updateAuthUI } from '../features/auth.js';

// 3. FIRESTORE DATA LOADING
async function loadFromFirestore() {
    if (typeof firebase === 'undefined' || !db) {
        console.warn('Firebase not initialized, using fallback data');
        return false;
    }

    try {
        const loadPromise = async () => {
            // Load characters
            const charsSnapshot = await db.collection('characters').get();
            if (!charsSnapshot.empty) {
                state.CHARACTERS = charsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                localStorage.setItem('nte_characters', JSON.stringify(state.CHARACTERS));
                console.log(`✅ Loaded ${state.CHARACTERS.length} characters from Firestore`);
            }

            // Load promo codes
            const codesSnapshot = await db.collection('promoCodes').where('active', '==', true).get();
            if (!codesSnapshot.empty) {
                state.PROMO_CODES = codesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                localStorage.setItem('nte_promoCodes', JSON.stringify(state.PROMO_CODES));
                console.log(`✅ Loaded ${state.PROMO_CODES.length} promo codes from Firestore`);
            }

            // Load timeline events
            const timelineSnapshot = await db.collection('timelineEvents').orderBy('order', 'asc').get();
            if (!timelineSnapshot.empty) {
                const rawEvents = timelineSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                // Filter out invalid entries (e.g. non-NTE data like "Subnautica 2", "GTA 6")
                state.TIMELINE_EVENTS = rawEvents.filter(e =>
                    e.order !== undefined && e.badgeClass && e.status && e.desc
                );
                localStorage.setItem('nte_timelineEvents', JSON.stringify(state.TIMELINE_EVENTS));
                console.log(`✅ Loaded ${state.TIMELINE_EVENTS.length} timeline events from Firestore (${rawEvents.length - state.TIMELINE_EVENTS.length} invalid filtered)`);
            }

            // Load guides
            try {
                const guidesSnapshot = await db.collection('guides').get();
                if (!guidesSnapshot.empty) {
                    state.GUIDES = guidesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    localStorage.setItem('nte_guides', JSON.stringify(state.GUIDES));
                    console.log(`✅ Loaded ${state.GUIDES.length} guides from Firestore`);
                }
            } catch (e) {
                console.warn('Guides collection fetch failed:', e);
            }

            return true;
        };

        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Firestore connection timed out after 2.5s')), 2500)
        );

        const success = await Promise.race([loadPromise(), timeoutPromise]);
        if (success) {
            state.dataSource = 'firestore';
            return true;
        }
        return false;
    } catch (error) {
        console.warn('⚠️ Firestore load failed or timed out:', error.message);
        return false;
    }
}


function loadFromCache() {
    try {
        const cachedChars = localStorage.getItem('nte_characters');
        const cachedCodes = localStorage.getItem('nte_promoCodes');
        const cachedTimeline = localStorage.getItem('nte_timelineEvents');
        const cachedGuides = localStorage.getItem('nte_guides');

        if (cachedChars) state.CHARACTERS = JSON.parse(cachedChars);
        if (cachedCodes) state.PROMO_CODES = JSON.parse(cachedCodes);
        if (cachedTimeline) {
            const parsed = JSON.parse(cachedTimeline);
            // Filter out invalid/corrupted cached entries
            state.TIMELINE_EVENTS = parsed.filter(e => e.order !== undefined && e.badgeClass && e.status && e.desc);
        }
        if (cachedGuides) state.GUIDES = JSON.parse(cachedGuides);

        // Fill in missing parts from fallback data to ensure no empty screens
        if (state.CHARACTERS.length === 0) state.CHARACTERS = [...FALLBACK_CHARACTERS];
        if (state.PROMO_CODES.length === 0) state.PROMO_CODES = [...FALLBACK_PROMO_CODES];
        if (state.TIMELINE_EVENTS.length === 0) state.TIMELINE_EVENTS = [...FALLBACK_TIMELINE_EVENTS];
        if (state.GUIDES.length === 0) state.GUIDES = [...FALLBACK_GUIDES];

        if (cachedChars || cachedCodes || cachedTimeline || cachedGuides) {
            state.dataSource = 'cache';
            console.log('📦 Loaded data from localStorage cache (with fallback fallbacks if needed)');
            return true;
        }
    } catch (e) {
        console.warn('Cache load failed:', e);
    }
    return false;
}



function loadFallbackData() {
    state.CHARACTERS = [...FALLBACK_CHARACTERS];
    state.PROMO_CODES = [...FALLBACK_PROMO_CODES];
    state.TIMELINE_EVENTS = [...FALLBACK_TIMELINE_EVENTS];
    state.GUIDES = [...FALLBACK_GUIDES];
    state.dataSource = 'hardcoded';
    console.log('📋 Using hardcoded fallback data');
}


// Setup realtime listeners for promo codes (auto-update when admin changes them)
function setupRealtimeListeners() {
    if (typeof firebase === 'undefined' || !db) return;

    try {
        // Realtime listener for promo codes
        db.collection('promoCodes')
            .where('active', '==', true)
            .onSnapshot((snapshot) => {
                if (!snapshot.empty) {
                    const newData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    if (JSON.stringify(newData) !== JSON.stringify(state.PROMO_CODES)) {
                        state.PROMO_CODES = newData;
                        localStorage.setItem('nte_promoCodes', JSON.stringify(state.PROMO_CODES));
                        renderPromoCodes();
                        renderHomeWidgets();
                        console.log('🔄 Promo codes updated in realtime');
                    }
                }
            }, (error) => {
                console.warn('Promo codes realtime listener error:', error);
            });

        // Realtime listener for characters (for tier changes, new chars)
        db.collection('characters').onSnapshot((snapshot) => {
            if (!snapshot.empty) {
                const newData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                if (JSON.stringify(newData) !== JSON.stringify(state.CHARACTERS)) {
                    state.CHARACTERS = newData;
                    localStorage.setItem('nte_characters', JSON.stringify(state.CHARACTERS));
                    renderTierList();
                    renderBuilds();
                    renderCalculatorSetup();
                    renderHomeWidgets();
                    if (window.renderGuides) window.renderGuides();
                    console.log('🔄 Characters updated in realtime');
                }
            }
        }, (error) => {
            console.warn('Characters realtime listener error:', error);
        });

        // Realtime listener for guides
        db.collection('guides').onSnapshot((snapshot) => {
            if (!snapshot.empty) {
                const newData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                if (JSON.stringify(newData) !== JSON.stringify(state.GUIDES)) {
                    state.GUIDES = newData;
                    localStorage.setItem('nte_guides', JSON.stringify(state.GUIDES));
                    if (window.renderGuides) window.renderGuides();
                    console.log('🔄 Guides updated in realtime');
                }
            }
        }, (error) => {
            console.warn('Guides realtime listener error:', error);
        });
    } catch (e) {
        console.warn('Realtime listeners setup failed:', e);
    }
}


export { loadFromFirestore, loadFromCache, loadFallbackData, setupRealtimeListeners };
