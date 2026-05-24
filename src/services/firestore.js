import { state } from '../scripts/state.js';
import { db } from '../firebase/firebase.js';
import { FALLBACK_CHARACTERS, FALLBACK_PROMO_CODES, FALLBACK_TIMELINE_EVENTS } from '../utils/fallbackData.js';
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
    if (typeof firebase === 'undefined' || typeof db === 'undefined') {
        console.warn('Firebase not initialized, using fallback data');
        return false;
    }

    try {
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
            state.TIMELINE_EVENTS = timelineSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            localStorage.setItem('nte_timelineEvents', JSON.stringify(state.TIMELINE_EVENTS));
            console.log(`✅ Loaded ${state.TIMELINE_EVENTS.length} timeline events from Firestore`);
        }

        state.dataSource = 'firestore';
        return true;
    } catch (error) {
        console.warn('Firestore load failed:', error.message);
        return false;
    }
}

function loadFromCache() {
    try {
        const cachedChars = localStorage.getItem('nte_characters');
        const cachedCodes = localStorage.getItem('nte_promoCodes');
        const cachedTimeline = localStorage.getItem('nte_timelineEvents');

        if (cachedChars) state.CHARACTERS = JSON.parse(cachedChars);
        if (cachedCodes) state.PROMO_CODES = JSON.parse(cachedCodes);
        if (cachedTimeline) state.TIMELINE_EVENTS = JSON.parse(cachedTimeline);

        if (cachedChars || cachedCodes || cachedTimeline) {
            state.dataSource = 'cache';
            console.log('📦 Loaded data from localStorage cache');
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
    state.dataSource = 'hardcoded';
    console.log('📋 Using hardcoded fallback data');
}

// Setup realtime listeners for promo codes (auto-update when admin changes them)
function setupRealtimeListeners() {
    if (typeof firebase === 'undefined' || typeof db === 'undefined') return;

    try {
        // Realtime listener for promo codes
        db.collection('promoCodes')
            .where('active', '==', true)
            .onSnapshot((snapshot) => {
                if (!snapshot.empty) {
                    state.PROMO_CODES = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    localStorage.setItem('nte_promoCodes', JSON.stringify(state.PROMO_CODES));
                    renderPromoCodes();
                    renderHomeWidgets();
                    console.log('🔄 Promo codes updated in realtime');
                }
            }, (error) => {
                console.warn('Promo codes realtime listener error:', error);
            });

        // Realtime listener for characters (for tier changes, new chars)
        db.collection('characters').onSnapshot((snapshot) => {
            if (!snapshot.empty) {
                state.CHARACTERS = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                localStorage.setItem('nte_characters', JSON.stringify(state.CHARACTERS));
                renderTierList();
                renderBuilds();
                renderCalculatorSetup();
                renderHomeWidgets();
                console.log('🔄 Characters updated in realtime');
            }
        }, (error) => {
            console.warn('Characters realtime listener error:', error);
        });
    } catch (e) {
        console.warn('Realtime listeners setup failed:', e);
    }
}

// Helper to render character avatars (supports both image URLs and emojis, with proxying to bypass hotlinking blockers)
function renderAvatarHtml(char) {
    if (char && char.avatar && char.avatar.startsWith('http')) {
        let cleanUrl = char.avatar;
        if (cleanUrl.includes('/revision/')) {
            cleanUrl = cleanUrl.split('/revision/')[0];
        }
        const proxiedUrl = `https://images.weserv.nl/?url=${encodeURIComponent(cleanUrl)}&w=200`;
        return `<img src="${proxiedUrl}" alt="${char.name}" class="avatar-img" referrerpolicy="no-referrer">`;
    }
    return char ? char.avatar : '';
}


function renderAvatarUrlOnly(char) {
    if (char && char.avatar && char.avatar.startsWith('http')) {
        let cleanUrl = char.avatar;
        if (cleanUrl.includes('/revision/')) {
            cleanUrl = cleanUrl.split('/revision/')[0];
        }
        return `https://images.weserv.nl/?url=${encodeURIComponent(cleanUrl)}&w=200`;
    }
    return '';
}

// Display custom tierlist inside Modal popup

export { loadFromFirestore, loadFromCache, loadFallbackData, setupRealtimeListeners, renderAvatarHtml, renderAvatarUrlOnly };
