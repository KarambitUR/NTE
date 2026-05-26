import { state } from '../scripts/state.js';
import { i18n, CHARACTER_TRANSLATIONS, ROLE_TRANSLATIONS, ATTR_TRANSLATIONS, STAT_TRANSLATIONS } from './translations.js';

function translatePage(lang) {
    state.currentLang = lang;
    document.documentElement.lang = lang;
    
    const dict = i18n[lang] || i18n['en'];
    
    // Find all data-i18n tags and translate
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dict[key]) {
            el.innerHTML = dict[key];
        }
    });
    
    // Localize placeholders
    const placeholders = document.querySelectorAll("[data-i18n-placeholder]");
    placeholders.forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (dict[key]) {
            el.placeholder = dict[key];
        }
    });
    
    // Update active class on switcher buttons
    const langBtns = document.querySelectorAll(".lang-btn");
    langBtns.forEach(btn => {
        if (btn.getAttribute("data-lang") === lang) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    // Update page title and meta description
    if (lang === 'en') {
        document.title = "Eibon Terminal | Neverness to Everness (NTE) Guides & Tier List";
        const meta = document.querySelector('meta[name="description"]');
        if (meta) meta.content = "Best guides, interactive tier list, resource calculator, team builder and fresh promo codes for Neverness to Everness (NTE).";
    } else if (lang === 'fr') {
        document.title = "Eibon Terminal | Guides & Tier List Neverness to Everness (NTE)";
        const meta = document.querySelector('meta[name="description"]');
        if (meta) meta.content = "Les meilleurs guides, tier list interactive, calculateur de ressources, constructeur d'équipe et codes promo frais pour Neverness to Everness (NTE).";
    } else {
        document.title = "Eibon Terminal | Neverness to Everness (NTE) Гайди та Тір-ліст";
        const meta = document.querySelector('meta[name="description"]');
        if (meta) meta.content = "Найкращі гайди, інтерактивний тір-ліст, калькулятор ресурсів, конструктор команд та завжди свіжі промокоди для гри Neverness to Everness (NTE).";
    }
}

function getLocalizedChar(char) {
    if (!char) return null;
    const trans = CHARACTER_TRANSLATIONS[char.id];
    const lang = state.currentLang || 'en';
    
    const locChar = { ...char };
    
    if (trans && trans[lang]) {
        const lData = trans[lang];
        locChar.name = lData.name || char.name;
        locChar.summary = lData.summary || char.summary;
        locChar.weapon = lData.weapon || char.weapon;
        locChar.weaponF2p = lData.weaponF2p || char.weaponF2p;
        locChar.cartridge = lData.cartridge || char.cartridge;
        locChar.teamSynergy = lData.teamSynergy || char.teamSynergy;
        locChar.lore = lData.lore || char.lore;
        if (lData.stats) locChar.stats = lData.stats;
    } else {
        // Fallback translation if not explicitly in table
        locChar.role = (ROLE_TRANSLATIONS[lang] && ROLE_TRANSLATIONS[lang][char.role]) || char.role;
        locChar.attribute = (ATTR_TRANSLATIONS[lang] && ATTR_TRANSLATIONS[lang][char.attribute]) || char.attribute;
        
        if (Array.isArray(char.stats)) {
            locChar.stats = char.stats.map(s => {
                const translation = STAT_TRANSLATIONS[lang] && STAT_TRANSLATIONS[lang][s];
                return translation || s;
            });
        }
    }
    
    if (ROLE_TRANSLATIONS[lang] && ROLE_TRANSLATIONS[lang][char.role]) {
        locChar.role = ROLE_TRANSLATIONS[lang][char.role];
    }
    if (ATTR_TRANSLATIONS[lang] && ATTR_TRANSLATIONS[lang][char.attribute]) {
        locChar.attribute = ATTR_TRANSLATIONS[lang][char.attribute];
    }
    
    return locChar;
}

// Active Banner Countdown

// Export functions and bind to window for legacy onclick support
export { translatePage, getLocalizedChar };
