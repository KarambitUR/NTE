import { FALLBACK_CHARACTERS } from '../utils/fallbackData.js';
import { state } from '../scripts/state.js';
import { getLocalizedChar } from '../localization/i18n.js';
import { i18n, ATTR_TRANSLATIONS, LOCALIZED_ATTRIBUTE_MATERIALS, LOCALIZED_WEAPON_MATERIALS, CHARACTER_MATERIAL_PROFILES } from '../localization/translations.js';
import { showToast, renderAvatarHtml } from '../utils/helpers.js';


// 10. RESOURCE CALCULATOR LOGIC

// 1. Progression Constants
const CHAR_EXP_BY_LEVEL = [];
const WEAPON_EXP_BY_LEVEL = [];

const CHAR_BREAKTHROUGH_TABLE = {
    20: { coins: 15000, boss: 0, commonT1: 5, commonT2: 0, commonT3: 0 },
    30: { coins: 20000, boss: 2, commonT1: 12, commonT2: 0, commonT3: 0 },
    40: { coins: 30000, boss: 8, commonT1: 0, commonT2: 6, commonT3: 0 },
    50: { coins: 50000, boss: 16, commonT1: 0, commonT2: 12, commonT3: 0 },
    60: { coins: 80000, boss: 24, commonT1: 0, commonT2: 0, commonT3: 6 },
    70: { coins: 120000, boss: 36, commonT1: 0, commonT2: 0, commonT3: 9 }
};

const WEAPON_BREAKTHROUGH_TABLE = {
    20: { coins: 10000, oreT1: 3, oreT2: 0, oreT3: 0, commonT1: 3, commonT2: 0, commonT3: 0 },
    40: { coins: 20000, oreT1: 6, oreT2: 3, oreT3: 0, commonT1: 6, commonT2: 2, commonT3: 0 },
    50: { coins: 35000, oreT1: 0, oreT2: 6, oreT3: 0, commonT1: 10, commonT2: 5, commonT3: 0 },
    60: { coins: 55000, oreT1: 0, oreT2: 10, oreT3: 3, commonT1: 0, commonT2: 8, commonT3: 3 },
    70: { coins: 85000, oreT1: 0, oreT2: 0, oreT3: 6, commonT1: 0, commonT2: 12, commonT3: 6 }
};

const SKILL_COST_TABLE = {
    1: { coins: 2000, scrollsT1: 2, scrollsT2: 0, scrollsT3: 0, commonT1: 3, commonT2: 0, commonT3: 0, boss: 0, weekly: 0, crown: 0 },
    2: { coins: 4000, scrollsT1: 4, scrollsT2: 0, scrollsT3: 0, commonT1: 5, commonT2: 0, commonT3: 0, boss: 0, weekly: 0, crown: 0 },
    3: { coins: 7000, scrollsT1: 10, scrollsT2: 0, scrollsT3: 0, commonT1: 0, commonT2: 3, commonT3: 0, boss: 0, weekly: 0, crown: 0 },
    4: { coins: 11000, scrollsT1: 0, scrollsT2: 2, scrollsT3: 0, commonT1: 0, commonT2: 4, commonT3: 0, boss: 0, weekly: 0, crown: 0 },
    5: { coins: 18000, scrollsT1: 0, scrollsT2: 4, scrollsT3: 0, commonT1: 0, commonT2: 0, commonT3: 3, boss: 0, weekly: 0, crown: 0 },
    6: { coins: 30000, scrollsT1: 0, scrollsT2: 4, scrollsT3: 0, commonT1: 0, commonT2: 0, commonT3: 4, boss: 0, weekly: 0, crown: 0 },
    7: { coins: 46000, scrollsT1: 0, scrollsT2: 0, scrollsT3: 2, commonT1: 0, commonT2: 0, commonT3: 5, boss: 2, weekly: 1, crown: 0 },
    8: { coins: 65000, scrollsT1: 0, scrollsT2: 0, scrollsT3: 3, commonT1: 0, commonT2: 0, commonT3: 5, boss: 3, weekly: 2, crown: 0 },
    9: { coins: 82500, scrollsT1: 0, scrollsT2: 0, scrollsT3: 5, commonT1: 0, commonT2: 0, commonT3: 0, boss: 4, weekly: 5, crown: 0 }
};

const CHARACTER_WEAPON_TYPES = {
    hotori: "solid",
    zero: "solid",
    sakiri: "gas",
    daffodil: "liquid",
    nanally: "plasma",
    mint: "liquid",
    jiuyuan: "solid",
    adler: "synthesis",
    haniel: "solid",
    skia: "gas",
    lacrimosa: "gas",
    baicang: "synthesis",
    chiz: "gas",
    fadia: "synthesis",
    hathor: "plasma",
    aurelia: "solid",
    edgar: "liquid"
};

const WEAPON_ICON_URLS = {
    solid: {
        ore_t1: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Iron-Appleseed.webp",
        ore_t2: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Silver-Appleseed.webp",
        ore_t3: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Golden-Appleseed.webp"
    },
    liquid: {
        ore_t1: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Liquid-Dream-Trial-Kit.webp",
        ore_t2: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Liquid-Dream-Travel-Kit.webp",
        ore_t3: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Liquid-Dream-Can.webp"
    },
    gas: {
        ore_t1: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Flavorless-Cold-Dessert.webp",
        ore_t2: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Plain-Cold-Dessert.webp",
        ore_t3: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Special-Cold-Dessert.webp"
    },
    plasma: {
        ore_t1: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Beginner-Drama-Core.webp",
        ore_t2: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Master-Drama-Core.webp",
        ore_t3: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Collectors-Drama-Core.webp"
    },
    synthesis: {
        ore_t1: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Beaty.webp",
        ore_t2: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Versey.webp",
        ore_t3: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Harmony.webp"
    }
};

let calcInventory = {};
let calculatedRequirements = {}; // Store computed required totals for inventory sync

// Initialize progression tables programmatically
function initCalculatorData() {
    for (let l = 1; l <= 80; l++) {
        // Character level EXP cost
        let charXp = 0;
        if (l < 20) charXp = 800 + l * 400;
        else if (l < 40) charXp = 6000 + (l - 20) * 1200;
        else if (l < 50) charXp = 25000 + (l - 40) * 3500;
        else if (l < 60) charXp = 50000 + (l - 50) * 8000;
        else if (l < 70) charXp = 100000 + (l - 60) * 15000;
        else charXp = 200000 + (l - 70) * 30000;
        
        CHAR_EXP_BY_LEVEL[l] = {
            xp: charXp,
            coins: Math.round(charXp * 0.2)
        };

        // Weapon level EXP cost
        let weapXp = 0;
        if (l < 20) weapXp = 500 + l * 250;
        else if (l < 40) weapXp = 4000 + (l - 20) * 800;
        else if (l < 50) weapXp = 16000 + (l - 40) * 2200;
        else if (l < 60) weapXp = 32000 + (l - 50) * 5000;
        else if (l < 70) weapXp = 64000 + (l - 60) * 9000;
        else weapXp = 120000 + (l - 70) * 18000;
        
        WEAPON_EXP_BY_LEVEL[l] = {
            xp: weapXp,
            coins: Math.round(weapXp * 0.15)
        };
    }
    
    // Load inventory cache
    try {
        const cached = localStorage.getItem('nte_calc_inventory');
        if (cached) calcInventory = JSON.parse(cached);
    } catch (e) {
        console.warn('Could not load inventory:', e);
    }
}

const MATERIAL_ICON_URLS = {
    coin: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Beetle-Coin.webp",
    exp_basic: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Rising-Hunter-Guide.webp",
    exp_medium: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Senior-Hunter-Guide.webp",
    exp_elite: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Elite-Hunter-Guide.webp",
    dye_basic: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Light-Dye.webp",
    dye_medium: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Colorless-Dye.webp",
    dye_elite: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Chaotic-Dye.webp",
    boss: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Confessional-Flower-Seed.webp",
    specialty: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Confessional-Flower-Seed.webp",
    common_t1: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Lost-Whispers.webp",
    common_t2: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Obscure-Whispers.webp",
    common_t3: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Paradoxical-Whispers.webp",
    scroll_t1: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/The-Olive-Branch.webp",
    scroll_t2: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Doves-Flutter.webp",
    scroll_t3: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Nestlings-Longing.webp",
    weekly: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Dress-Sleeves-of-Vanity.webp",
    crown: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Anomaly-Material-Selection-Box-III.webp",
    ore_t1: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Basic-Bubble-Can.webp",
    ore_t2: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Advanced-Bubble-Can.webp",
    ore_t3: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Elite-Bubble-Can.webp"
};

const MATERIAL_ICON_BY_NAME = {
    "The Olive Branch": "https://neverness.gg/wp-content/uploads/sites/88/2026/05/The-Olive-Branch.webp",
    "White Rose": "https://neverness.gg/wp-content/uploads/sites/88/2026/05/White-Rose.webp",
    "Black Hat": "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Black-Hat.webp",
    "Heart-Racing Night": "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Heart-Racing-Night.webp",
    "The Second Self": "https://neverness.gg/wp-content/uploads/sites/88/2026/05/The-Second-Self.webp",
    "Dove's Flutter": "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Doves-Flutter.webp",
    "CO": "https://neverness.gg/wp-content/uploads/sites/88/2026/05/CO.webp",
    "Known Weariness": "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Known-Weariness.webp",
    "Resonance of Faith": "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Resonance-of-Faith.webp",
    "Suspended Whispers": "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Suspended-Whispers.webp",
    "Nestling's Longing": "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Nestlings-Longing.webp",
    "FNG": "https://neverness.gg/wp-content/uploads/sites/88/2026/05/FNG.webp",
    "First Expectations": "https://neverness.gg/wp-content/uploads/sites/88/2026/05/First-Expectations.webp",
    "Synchronicity of Thought": "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Synchronicity-of-Thought.webp",
    "Hesitation of the Waves": "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Hesitation-of-the-Waves.webp"
};

// Use real material icons from public NTE databases; fallback keeps the card readable if a CDN image fails.
const ATTRIBUTE_SCROLL_ICONS = {
    Cosmos: [
        "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Nestlings-Longing.webp",
        "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Doves-Flutter.webp",
        "https://neverness.gg/wp-content/uploads/sites/88/2026/05/The-Olive-Branch.webp"
    ],
    Anima: [
        "https://neverness.gg/wp-content/uploads/sites/88/2026/05/FNG.webp",
        "https://neverness.gg/wp-content/uploads/sites/88/2026/05/CO.webp",
        "https://neverness.gg/wp-content/uploads/sites/88/2026/05/White-Rose.webp"
    ],
    Incantation: [
        "https://neverness.gg/wp-content/uploads/sites/88/2026/05/First-Expectations.webp",
        "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Known-Weariness.webp",
        "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Black-Hat.webp"
    ],
    Chaos: [
        "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Hesitation-of-the-Waves.webp",
        "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Suspended-Whispers.webp",
        "https://neverness.gg/wp-content/uploads/sites/88/2026/05/The-Second-Self.webp"
    ],
    Psyche: [
        "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Synchronicity-of-Thought.webp",
        "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Resonance-of-Faith.webp",
        "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Heart-Racing-Night.webp"
    ]
};

function getMaterialIcon(id, profile = null, attrDetails = null, char = null) {
    let src = null;
    if (profile) {
        if (id === "boss" && profile.uniqueIcon) {
            src = profile.uniqueIcon;
        } else if (id === "scroll_t1" || id === "scroll_t2" || id === "scroll_t3") {
            const idx = id === "scroll_t1" ? 0 : id === "scroll_t2" ? 1 : 2;
            if (profile.skillBookIcons && profile.skillBookIcons[idx]) {
                src = profile.skillBookIcons[idx];
            } else if (char && char.attribute && ATTRIBUTE_SCROLL_ICONS[char.attribute]) {
                src = ATTRIBUTE_SCROLL_ICONS[char.attribute][idx];
            } else if (attrDetails && attrDetails.scrolls) {
                const scrollName = idx === 0 ? attrDetails.scrolls.T1 : idx === 1 ? attrDetails.scrolls.T2 : idx === 2 ? attrDetails.scrolls.T3 : null;
                if (scrollName && MATERIAL_ICON_BY_NAME[scrollName]) {
                    src = MATERIAL_ICON_BY_NAME[scrollName];
                }
            }
        }
    }
    if (id === "ore_t1" || id === "ore_t2" || id === "ore_t3") {
        const weaponType = (profile && profile.weaponType) || (char && CHARACTER_WEAPON_TYPES[char.id]) || "synthesis";
        if (WEAPON_ICON_URLS[weaponType] && WEAPON_ICON_URLS[weaponType][id]) {
            src = WEAPON_ICON_URLS[weaponType][id];
        }
    }
    if (!src) {
        src = MATERIAL_ICON_URLS[id];
    }
    const label = id.split("_").map(part => part[0]).join("").slice(0, 2).toUpperCase();
    if (!src) return `<span class="mat-fallback-icon">${label}</span>`;
    return `<img src="${src}" alt="" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'mat-fallback-icon',textContent:'${label}'}))">`;
}

function renderCalculatorSetup() {
    initCalculatorData();

    const select = document.getElementById("calcCharacter");
    if (!select) return;
    
    // Save current values if they exist
    const savedChar = select.value;
    const savedSkills = [];
    for (let i = 0; i < 4; i++) {
        const startSelect = document.getElementById(`skillStart_${i}`);
        const endSelect = document.getElementById(`skillEnd_${i}`);
        savedSkills.push({
            start: startSelect ? startSelect.value : "1",
            end: endSelect ? endSelect.value : "10"
        });
    }

    // Populate characters with localized names
    const activeList = state.CHARACTERS.length > 0 ? state.CHARACTERS : FALLBACK_CHARACTERS;
    select.innerHTML = activeList.map(c => {
        const locC = getLocalizedChar(c);
        return `<option value="${c.id}">${locC.name}</option>`;
    }).join("");

    if (savedChar && activeList.some(c => c.id === savedChar)) {
        select.value = savedChar;
    }

    // Populate skills select options (1-10)
    for (let i = 0; i < 4; i++) {
        const startSelect = document.getElementById(`skillStart_${i}`);
        const endSelect = document.getElementById(`skillEnd_${i}`);
        if (startSelect && endSelect) {
            startSelect.innerHTML = Array.from({length: 10}, (_, k) => `<option value="${k+1}">${k+1}</option>`).join("");
            endSelect.innerHTML = Array.from({length: 10}, (_, k) => `<option value="${k+1}">${k+1}</option>`).join("");
            
            if (savedSkills[i]) {
                startSelect.value = savedSkills[i].start;
                endSelect.value = savedSkills[i].end;
            }
        }
    }

    // Set initial calculations
    calculateResources();
}

// Setup events & bi-directional bindings
function setupCalculatorEvents() {
    const startRange = document.getElementById("calcLevelStart");
    const startNum = document.getElementById("calcLevelStartNum");
    const endRange = document.getElementById("calcLevelEnd");
    const endNum = document.getElementById("calcLevelEndNum");
    const charSelect = document.getElementById("calcCharacter");

    const wStartRange = document.getElementById("calcWeaponLevelStart");
    const wStartNum = document.getElementById("calcWeaponLevelStartNum");
    const wEndRange = document.getElementById("calcWeaponLevelEnd");
    const wEndNum = document.getElementById("calcWeaponLevelEndNum");
    const weaponActive = document.getElementById("calcWeaponActive");
    const weaponRarity = document.getElementById("calcWeaponRarity");

    // Sync helper
    function syncControl(slider, num, isStart, otherNum, limits) {
        let val = parseInt(slider.value);
        num.value = val;

        // Constraint: Start level must be <= End level
        if (isStart) {
            if (val > parseInt(otherNum.value)) {
                otherNum.value = val;
                // Dispatch event to sync other slider
                otherNum.dispatchEvent(new Event('input'));
            }
        } else {
            if (val < parseInt(otherNum.value)) {
                otherNum.value = val;
                otherNum.dispatchEvent(new Event('input'));
            }
        }
        calculateResources();
    }

    // Bind slider -> number
    startRange.addEventListener("input", () => syncControl(startRange, startNum, true, endNum));
    endRange.addEventListener("input", () => syncControl(endRange, endNum, false, startNum));
    wStartRange.addEventListener("input", () => syncControl(wStartRange, wStartNum, true, wEndNum));
    wEndRange.addEventListener("input", () => syncControl(wEndRange, wEndNum, false, wStartNum));

    // Bind number -> slider
    function syncNumInput(num, slider, minVal, maxVal) {
        let val = parseInt(num.value);
        if (isNaN(val) || val < minVal) val = minVal;
        if (val > maxVal) val = maxVal;
        num.value = val;
        slider.value = val;
        
        // Trigger constraints by firing input on slider
        slider.dispatchEvent(new Event('input'));
    }

    startNum.addEventListener("change", () => syncNumInput(startNum, startRange, 1, 80));
    endNum.addEventListener("change", () => syncNumInput(endNum, endRange, 1, 80));
    wStartNum.addEventListener("change", () => syncNumInput(wStartNum, wStartRange, 1, 80));
    wEndNum.addEventListener("change", () => syncNumInput(wEndNum, wEndRange, 1, 80));

    // Character changes
    charSelect.addEventListener("change", () => {
        calculateResources();
    });

    // Skill dropdown selections
    for (let i = 0; i < 4; i++) {
        document.getElementById(`skillStart_${i}`).addEventListener("change", (e) => {
            // Constraint: start <= end
            const startVal = parseInt(e.target.value);
            const endSelect = document.getElementById(`skillEnd_${i}`);
            if (parseInt(endSelect.value) < startVal) {
                endSelect.value = startVal;
            }
            calculateResources();
        });
        document.getElementById(`skillEnd_${i}`).addEventListener("change", (e) => {
            const endVal = parseInt(e.target.value);
            const startSelect = document.getElementById(`skillStart_${i}`);
            if (parseInt(startSelect.value) > endVal) {
                startSelect.value = endVal;
            }
            calculateResources();
        });
    }

    // Weapon toggles
    weaponActive.addEventListener("change", () => {
        const block = document.getElementById("weaponSettingsBlock");
        block.style.opacity = weaponActive.checked ? "1" : "0.4";
        block.style.pointerEvents = weaponActive.checked ? "auto" : "none";
        calculateResources();
    });

    weaponRarity.addEventListener("change", () => {
        calculateResources();
    });

    // Calculator inner tab navigation
    const tabBtns = document.querySelectorAll(".calc-tab-btn");
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const tabName = btn.getAttribute("data-calc-tab");
            document.querySelectorAll(".calc-tab-content").forEach(pane => {
                pane.classList.remove("active");
            });
            document.getElementById(`calc-tab-${tabName}`).classList.add("active");
        });
    });

    // Inventory inputs listener (delegated)
    const listContainer = document.getElementById("calcMaterialsList");
    listContainer.addEventListener("input", (e) => {
        if (e.target.classList.contains("mat-have-input")) {
            const matId = e.target.getAttribute("data-mat-id");
            let val = parseInt(e.target.value);
            if (isNaN(val) || val < 0) val = 0;
            e.target.value = val;
            
            calcInventory[matId] = val;
            saveInventory();
            updateSingleMaterialCard(matId, val);
        }
    });

    // Reset inventory button
    document.getElementById("btnClearInventory").addEventListener("click", () => {
        calcInventory = {};
        saveInventory();
        document.querySelectorAll(".mat-have-input").forEach(input => {
            input.value = 0;
        });
        // Re-evaluate completion highlights
        Object.keys(calculatedRequirements).forEach(matId => {
            updateSingleMaterialCard(matId, 0);
        });
        showToast(i18n[state.currentLang].toast_codes_cleared || "Склад очищено!");
    });

    // Export report
    document.getElementById("btnExportReport").addEventListener("click", () => {
        exportCalcReport();
    });
}

function saveInventory() {
    localStorage.setItem('nte_calc_inventory', JSON.stringify(calcInventory));
}

// Update deficit display in real-time without rebuild to keep input focus
function updateSingleMaterialCard(matId, haveAmount) {
    const card = document.getElementById(`mat-card-${matId}`);
    if (!card) return;

    const needed = calculatedRequirements[matId] || 0;
    const remaining = Math.max(0, needed - haveAmount);
    
    const labelTextEl = card.querySelector(".mat-need");
    const remainingText = state.currentLang === 'uk' ? 'Залишилось' : (state.currentLang === 'fr' ? 'Restant' : 'Remaining');

    if (remaining === 0) {
        card.classList.add("mat-completed");
    } else {
        card.classList.remove("mat-completed");
    }
    if (labelTextEl) {
        labelTextEl.innerHTML = `${remainingText}: <span class="mat-val">${remaining.toLocaleString()}</span> / ${needed.toLocaleString()}`;
    }
}

function calculateResources() {
    const charId = document.getElementById("calcCharacter").value;
    const activeList = state.CHARACTERS.length > 0 ? state.CHARACTERS : FALLBACK_CHARACTERS;
    const char = activeList.find(c => c.id === charId);
    if (!char) return;

    const locChar = getLocalizedChar(char);

    // Render Preview Card
    document.getElementById("calcPreviewName").innerText = locChar.name;
    document.getElementById("calcPreviewAttr").innerText = locChar.attribute;
    document.getElementById("calcPreviewAttr").className = `badge attr-${char.attribute.toLowerCase()}`;
    document.getElementById("calcPreviewRarity").innerText = `${char.rarity}★ ${state.currentLang === 'uk' ? 'Ранг' : (state.currentLang === 'fr' ? 'Rang' : 'Rank')}`;
    document.getElementById("calcPreviewRarity").className = `badge ${char.rarity === 5 ? 'badge-hot' : 'badge-cosmos'}`;
    
    const avatarContainer = document.getElementById("calcPreviewAvatar");
    avatarContainer.innerHTML = renderAvatarHtml(locChar);
    avatarContainer.className = `calc-preview-avatar rarity-${char.rarity}`;

    // Read Character level inputs
    const startLvl = parseInt(document.getElementById("calcLevelStart").value) || 1;
    const endLvl = parseInt(document.getElementById("calcLevelEnd").value) || 80;
    document.getElementById("valLevelStart").innerText = startLvl;
    document.getElementById("valLevelEnd").innerText = endLvl;
    document.getElementById("calcLevelStartNum").value = startLvl;
    document.getElementById("calcLevelEndNum").value = endLvl;

    // Sum Char Level Costs
    let totalCharExp = 0;
    let totalCharCoins = 0;
    for (let l = startLvl; l < endLvl; l++) {
        totalCharExp += CHAR_EXP_BY_LEVEL[l].xp;
        totalCharCoins += CHAR_EXP_BY_LEVEL[l].coins;
    }

    // Sum Char Breakthrough Costs
    let totalCharBoss = 0;
    let totalCharCommonT1 = 0;
    let totalCharCommonT2 = 0;
    let totalCharCommonT3 = 0;
    let totalCharBtCoins = 0;

    const charBreakthroughLevels = [20, 30, 40, 50, 60, 70];
    for (let bt of charBreakthroughLevels) {
        if (startLvl <= bt && endLvl > bt) {
            const cost = CHAR_BREAKTHROUGH_TABLE[bt];
            totalCharBoss += cost.boss;
            totalCharCommonT1 += cost.commonT1;
            totalCharCommonT2 += cost.commonT2;
            totalCharCommonT3 += cost.commonT3;
            totalCharBtCoins += cost.coins;
        }
    }

    // Sum Skills Costs
    let totalSkillCoins = 0;
    let totalSkillScrollsT1 = 0;
    let totalSkillScrollsT2 = 0;
    let totalSkillScrollsT3 = 0;
    let totalSkillCommonT1 = 0;
    let totalSkillCommonT2 = 0;
    let totalSkillCommonT3 = 0;
    let totalSkillBoss = 0;
    let totalSkillWeekly = 0;
    let totalSkillCrown = 0;

    for (let i = 0; i < 4; i++) {
        const skStart = parseInt(document.getElementById(`skillStart_${i}`).value) || 1;
        const skEnd = parseInt(document.getElementById(`skillEnd_${i}`).value) || 1;
        
        for (let lvl = skStart; lvl < skEnd; lvl++) {
            const cost = SKILL_COST_TABLE[lvl];
            totalSkillCoins += cost.coins;
            totalSkillScrollsT1 += cost.scrollsT1;
            totalSkillScrollsT2 += cost.scrollsT2;
            totalSkillScrollsT3 += cost.scrollsT3;
            totalSkillCommonT1 += cost.commonT1;
            totalSkillCommonT2 += cost.commonT2;
            totalSkillCommonT3 += cost.commonT3;
            totalSkillBoss += cost.boss;
            totalSkillWeekly += cost.weekly;
            totalSkillCrown += cost.crown;
        }
    }

    // Sum Weapon Costs
    let totalWeapExp = 0;
    let totalWeapCoins = 0;
    let totalWeapOreT1 = 0;
    let totalWeapOreT2 = 0;
    let totalWeapOreT3 = 0;
    let totalWeapCommonT1 = 0;
    let totalWeapCommonT2 = 0;
    let totalWeapCommonT3 = 0;
    let totalWeapBtCoins = 0;

    const includeWeapon = document.getElementById("calcWeaponActive").checked;
    if (includeWeapon) {
        const wStartLvl = parseInt(document.getElementById("calcWeaponLevelStart").value) || 1;
        const wEndLvl = parseInt(document.getElementById("calcWeaponLevelEnd").value) || 80;
        const wRarity = parseInt(document.getElementById("calcWeaponRarity").value) || 4;
        
        document.getElementById("valWeaponLevelStart").innerText = wStartLvl;
        document.getElementById("valWeaponLevelEnd").innerText = wEndLvl;
        document.getElementById("calcWeaponLevelStartNum").value = wStartLvl;
        document.getElementById("calcWeaponLevelEndNum").value = wEndLvl;

        // Multiplier based on weapon rarity
        const rarityMult = wRarity === 5 ? 1.25 : wRarity === 4 ? 1.0 : 0.75;

        // Weapon Exp & Coin Costs
        for (let l = wStartLvl; l < wEndLvl; l++) {
            totalWeapExp += Math.round(WEAPON_EXP_BY_LEVEL[l].xp * rarityMult);
            totalWeapCoins += Math.round(WEAPON_EXP_BY_LEVEL[l].coins * rarityMult);
        }

        // Weapon Breakthrough Costs
        const weaponBreakthroughLevels = [20, 40, 50, 60, 70];
        for (let bt of weaponBreakthroughLevels) {
            if (wStartLvl <= bt && wEndLvl > bt) {
                const cost = WEAPON_BREAKTHROUGH_TABLE[bt];
                totalWeapOreT1 += Math.round(cost.oreT1 * rarityMult);
                totalWeapOreT2 += Math.round(cost.oreT2 * rarityMult);
                totalWeapOreT3 += Math.round(cost.oreT3 * rarityMult);
                totalWeapCommonT1 += Math.round(cost.commonT1 * rarityMult);
                totalWeapCommonT2 += Math.round(cost.commonT2 * rarityMult);
                totalWeapCommonT3 += Math.round(cost.commonT3 * rarityMult);
                totalWeapBtCoins += Math.round(cost.coins * rarityMult);
            }
        }
    }

    // Consolidate Totals
    const finalCoins = totalCharCoins + totalCharBtCoins + totalSkillCoins + totalWeapCoins + totalWeapBtCoins;
    
    // Character guides breakdown: Rising 1,000, Senior 5,000, Elite 20,000 EXP.
    let charExpRem = totalCharExp;
    const guidesElite = Math.floor(charExpRem / 20000);
    charExpRem %= 20000;
    const guidesMed = Math.floor(charExpRem / 5000);
    charExpRem %= 5000;
    const guidesBasic = Math.ceil(charExpRem / 1000);

    // Arc dyes breakdown: Light 500, Colorless 2,500, Chaotic 10,000 Arc EXP.
    let weapExpRem = totalWeapExp;
    const dyesElite = Math.floor(weapExpRem / 10000);
    weapExpRem %= 10000;
    const dyesMed = Math.floor(weapExpRem / 2500);
    weapExpRem %= 2500;
    const dyesBasic = Math.ceil(weapExpRem / 500);

    // Specific names based on character attribute
    const baseAttrDetails = (LOCALIZED_ATTRIBUTE_MATERIALS[char.attribute] && LOCALIZED_ATTRIBUTE_MATERIALS[char.attribute][state.currentLang]) || LOCALIZED_ATTRIBUTE_MATERIALS["Anima"][state.currentLang];
    const attrDetails = JSON.parse(JSON.stringify(baseAttrDetails));
    const profile = CHARACTER_MATERIAL_PROFILES[char.id] || {};
    if (profile.unique) {
        attrDetails.boss = profile.unique;
        attrDetails.farmBoss = profile.uniqueFarm || attrDetails.farmBoss;
    }
    if (profile.commonFamily) {
        attrDetails.common.T1 = profile.commonFamily[0];
        attrDetails.common.T2 = profile.commonFamily[1];
        attrDetails.common.T3 = profile.commonFamily[2];
    }
    if (profile.skillBooks) {
        attrDetails.scrolls.T1 = profile.skillBooks[0];
        attrDetails.scrolls.T2 = profile.skillBooks[1];
        attrDetails.scrolls.T3 = profile.skillBooks[2];
    }
    const weaponType = profile.weaponType || CHARACTER_WEAPON_TYPES[char.id] || "synthesis";
    const weaponMatsGroup = LOCALIZED_WEAPON_MATERIALS[weaponType] || LOCALIZED_WEAPON_MATERIALS["synthesis"];
    const weaponMats = weaponMatsGroup[state.currentLang] || weaponMatsGroup["uk"];

    // Combine common materials
    const finalCommonT1 = totalCharCommonT1 + totalSkillCommonT1 + totalWeapCommonT1;
    const finalCommonT2 = totalCharCommonT2 + totalSkillCommonT2 + totalWeapCommonT2;
    const finalCommonT3 = totalCharCommonT3 + totalSkillCommonT3 + totalWeapCommonT3;

    // Combine Boss drops
    const finalBoss = totalCharBoss + totalSkillBoss;

    const allSkillsFull = [0, 1, 2, 3].every(i => {
        const start = parseInt(document.getElementById(`skillStart_${i}`).value) || 1;
        const end = parseInt(document.getElementById(`skillEnd_${i}`).value) || 1;
        return start === 1 && end === 10;
    });
    const isVerifiedFullBuild = Boolean(profile.verified && profile.fullTotals && startLvl === 1 && endLvl === 80 && allSkillsFull);

    // Set requirements object globally to check on have-input triggers.
    calculatedRequirements = isVerifiedFullBuild ? {
        coin: profile.fullTotals.coin + (includeWeapon ? (totalWeapCoins + totalWeapBtCoins) : 0),
        exp_elite: guidesElite,
        exp_medium: guidesMed,
        exp_basic: guidesBasic,
        dye_elite: dyesElite,
        dye_medium: dyesMed,
        dye_basic: dyesBasic,
        boss: profile.fullTotals.boss,
        common_t1: profile.fullTotals.common_t1 + (includeWeapon ? totalWeapCommonT1 : 0),
        common_t2: profile.fullTotals.common_t2 + (includeWeapon ? totalWeapCommonT2 : 0),
        common_t3: profile.fullTotals.common_t3 + (includeWeapon ? totalWeapCommonT3 : 0),
        scroll_t1: profile.fullTotals.scroll_t1,
        scroll_t2: profile.fullTotals.scroll_t2,
        scroll_t3: profile.fullTotals.scroll_t3,
        weekly: profile.fullTotals.weekly,
        crown: 0,
        ore_t1: totalWeapOreT1,
        ore_t2: totalWeapOreT2,
        ore_t3: totalWeapOreT3
    } : {
        coin: finalCoins,
        exp_elite: guidesElite,
        exp_medium: guidesMed,
        exp_basic: guidesBasic,
        dye_elite: dyesElite,
        dye_medium: dyesMed,
        dye_basic: dyesBasic,
        boss: finalBoss,
        common_t1: finalCommonT1,
        common_t2: finalCommonT2,
        common_t3: finalCommonT3,
        scroll_t1: totalSkillScrollsT1,
        scroll_t2: totalSkillScrollsT2,
        scroll_t3: totalSkillScrollsT3,
        weekly: totalSkillWeekly,
        crown: totalSkillCrown,
        ore_t1: totalWeapOreT1,
        ore_t2: totalWeapOreT2,
        ore_t3: totalWeapOreT3
    };

    // Localization strings
    const calcLoc = {
        uk: {
            cat_main: "Основні Валюти & Досвід",
            cat_breakthrough: "Матеріали Прориву",
            cat_skills: "Матеріали Навичок",
            cat_drops: "Трофеї з Ворогів",
            coin_name: "Монети Beetle (Золото)",
            coin_farm: "Material Selection Box / Houdinii's Magic Stage / Hunter Exchange / World Exploration",
            exp_elite_name: "Elite Hunter Guide (+20,000 EXP)",
            exp_med_name: "Senior Hunter Guide (+5,000 EXP)",
            exp_basic_name: "Rising Hunter Guide (+1,000 EXP)",
            exp_farm: "Houdinii's Magic Stage / Hunter Exchange / World Exploration",
            dye_elite_name: "Chaotic Dye (+10,000 Arc EXP)",
            dye_med_name: "Colorless Dye (+2,500 Arc EXP)",
            dye_basic_name: "Light Dye (+500 Arc EXP)",
            dye_farm: "Houdinii's Magic Stage / Hunter Exchange / World Exploration",
            crown_name: "Корона Аномалії",
            crown_farm: "Anomaly Pilgrimage",
            weekly_name: "Матеріал тижневого боса",
            weekly_farm: "Anomaly Pilgrimage",
            source_verified: "Точний total-cost підтверджено для цього пресету.",
            source_estimate: "Частина чисел є планувальною оцінкою; назви ресурсів і джерела взято з відкритих баз.",
            need_label: "Потрібно:",
            remaining_label: "Залишилось:",
            have_label: "Маю:",
            done_badge: "✓ Готово"
        },
        en: {
            cat_main: "Core Currencies & Experience",
            cat_breakthrough: "Breakthrough Materials",
            cat_skills: "Skill Materials",
            cat_drops: "Enemy Trophies",
            coin_name: "Beetle Coins (Gold)",
            coin_farm: "Material Selection Box / Houdinii's Magic Stage / Hunter Exchange / World Exploration",
            exp_elite_name: "Elite Hunter Guide (+20,000 EXP)",
            exp_med_name: "Senior Hunter Guide (+5,000 EXP)",
            exp_basic_name: "Rising Hunter Guide (+1,000 EXP)",
            exp_farm: "Houdinii's Magic Stage / Hunter Exchange / World Exploration",
            dye_elite_name: "Chaotic Dye (+10,000 Arc EXP)",
            dye_med_name: "Colorless Dye (+2,500 Arc EXP)",
            dye_basic_name: "Light Dye (+500 Arc EXP)",
            dye_farm: "Houdinii's Magic Stage / Hunter Exchange / World Exploration",
            crown_name: "Anomaly Crown",
            crown_farm: "Anomaly Pilgrimage",
            weekly_name: "Weekly Boss Material",
            weekly_farm: "Anomaly Pilgrimage",
            source_verified: "Exact total cost is verified for this preset.",
            source_estimate: "Some quantities are planning estimates; resource names and sources use public databases.",
            need_label: "Need:",
            remaining_label: "Remaining:",
            have_label: "Have:",
            done_badge: "✓ Done"
        },
        fr: {
            cat_main: "Devises Principales & Expérience",
            cat_breakthrough: "Matériaux d'Élévation",
            cat_skills: "Matériaux de Compétence",
            cat_drops: "Butin d'Ennemis",
            coin_name: "Pièces Beetle (Or)",
            coin_farm: "Material Selection Box / Houdinii's Magic Stage / Hunter Exchange / World Exploration",
            exp_elite_name: "Elite Hunter Guide (+20,000 EXP)",
            exp_med_name: "Senior Hunter Guide (+5,000 EXP)",
            exp_basic_name: "Rising Hunter Guide (+1,000 EXP)",
            exp_farm: "Houdinii's Magic Stage / Hunter Exchange / World Exploration",
            dye_elite_name: "Chaotic Dye (+10,000 Arc EXP)",
            dye_med_name: "Colorless Dye (+2,500 Arc EXP)",
            dye_basic_name: "Light Dye (+500 Arc EXP)",
            dye_farm: "Houdinii's Magic Stage / Hunter Exchange / World Exploration",
            crown_name: "Couronne d'anomalie",
            crown_farm: "Anomaly Pilgrimage",
            weekly_name: "Matériau de boss hebdomadaire",
            weekly_farm: "Anomaly Pilgrimage",
            source_verified: "Le coût total exact est vérifié pour ce préréglage.",
            source_estimate: "Certaines quantités sont des estimations de planification ; les noms des ressources et les sources proviennent de bases de données publiques.",
            need_label: "Requis :",
            remaining_label: "Restant :",
            have_label: "Possède :",
            done_badge: "✓ Terminé"
        }
    };
    const cLoc = calcLoc[state.currentLang] || calcLoc['uk'];

    // Render HTML Categories
    const resultsGrid = document.getElementById("calcMaterialsList");
    resultsGrid.innerHTML = "";

    const sourceNote = document.createElement("div");
    sourceNote.className = `calc-source-note ${isVerifiedFullBuild ? 'verified' : 'estimate'}`;
    sourceNote.innerHTML = `
        <strong>${isVerifiedFullBuild ? 'Verified' : 'Planner'}</strong>
        <span>${isVerifiedFullBuild ? cLoc.source_verified : cLoc.source_estimate}</span>
    `;
    resultsGrid.appendChild(sourceNote);

    function addCategoryHeader(title) {
        const h = document.createElement("div");
        h.className = "materials-cat-header";
        h.innerText = title;
        resultsGrid.appendChild(h);
    }

    function addMaterialCard(id, name, needed, farmLoc) {
        if (needed <= 0) return;
        
        const have = calcInventory[id] || 0;
        const remaining = Math.max(0, needed - have);
        const isCompleted = remaining === 0;

        const card = document.createElement("div");
        card.className = `material-card ${isCompleted ? 'mat-completed' : ''}`;
        card.id = `mat-card-${id}`;
        
        card.innerHTML = `
            <div class="mat-card-top">
                <div class="mat-icon">${getMaterialIcon(id, profile, attrDetails, char)}</div>
                <div class="mat-card-info">
                    <span class="mat-card-name">${name}</span>
                    <span class="mat-card-farm">${farmLoc}</span>
                </div>
            </div>
            <div class="mat-card-mid">
                <span class="mat-need">
                    ${cLoc.remaining_label} <span class="mat-val">${remaining.toLocaleString()}</span> / ${needed.toLocaleString()}
                </span>
                <span class="mat-completed-badge">${cLoc.done_badge}</span>
                <div class="mat-have-input-wrapper">
                    <span class="mat-have-label">${cLoc.have_label}</span>
                    <input type="number" class="mat-have-input" data-mat-id="${id}" min="0" value="${have}">
                </div>
            </div>
        `;
        resultsGrid.appendChild(card);
    }

    // 1. Currency & Exp Guides
    addCategoryHeader(cLoc.cat_main);
    addMaterialCard("coin", cLoc.coin_name, calculatedRequirements.coin, cLoc.coin_farm);
    addMaterialCard("exp_elite", cLoc.exp_elite_name, calculatedRequirements.exp_elite, cLoc.exp_farm);
    addMaterialCard("exp_medium", cLoc.exp_med_name, calculatedRequirements.exp_medium, cLoc.exp_farm);
    addMaterialCard("exp_basic", cLoc.exp_basic_name, calculatedRequirements.exp_basic, cLoc.exp_farm);
    if (includeWeapon) {
        addMaterialCard("dye_elite", cLoc.dye_elite_name, calculatedRequirements.dye_elite, cLoc.dye_farm);
        addMaterialCard("dye_medium", cLoc.dye_med_name, calculatedRequirements.dye_medium, cLoc.dye_farm);
        addMaterialCard("dye_basic", cLoc.dye_basic_name, calculatedRequirements.dye_basic, cLoc.dye_farm);
    }

    // 2. Breakthrough Materials
    if (calculatedRequirements.boss > 0 || (includeWeapon && (calculatedRequirements.ore_t1 + calculatedRequirements.ore_t2 + calculatedRequirements.ore_t3 > 0))) {
        addCategoryHeader(cLoc.cat_breakthrough);
        addMaterialCard("boss", attrDetails.boss, calculatedRequirements.boss, attrDetails.farmBoss);
        if (includeWeapon) {
            addMaterialCard("ore_t1", weaponMats.T1, calculatedRequirements.ore_t1, weaponMats.farm);
            addMaterialCard("ore_t2", weaponMats.T2, calculatedRequirements.ore_t2, weaponMats.farm);
            addMaterialCard("ore_t3", weaponMats.T3, calculatedRequirements.ore_t3, weaponMats.farm);
        }
    }

    // 3. Skill Scrolls
    if (calculatedRequirements.scroll_t1 + calculatedRequirements.scroll_t2 + calculatedRequirements.scroll_t3 + calculatedRequirements.weekly + calculatedRequirements.crown > 0) {
        addCategoryHeader(cLoc.cat_skills);
        addMaterialCard("scroll_t1", attrDetails.scrolls.T1, calculatedRequirements.scroll_t1, attrDetails.scrolls.farm);
        addMaterialCard("scroll_t2", attrDetails.scrolls.T2, calculatedRequirements.scroll_t2, attrDetails.scrolls.farm);
        addMaterialCard("scroll_t3", attrDetails.scrolls.T3, calculatedRequirements.scroll_t3, attrDetails.scrolls.farm);
        addMaterialCard("weekly", profile.weekly || cLoc.weekly_name, calculatedRequirements.weekly || 0, profile.weeklyFarm || cLoc.weekly_farm);
        addMaterialCard("crown", cLoc.crown_name, calculatedRequirements.crown || 0, cLoc.crown_farm);
    }

    // 4. Common Enemy Drops
    if (calculatedRequirements.common_t1 + calculatedRequirements.common_t2 + calculatedRequirements.common_t3 > 0) {
        addCategoryHeader(cLoc.cat_drops);
        addMaterialCard("common_t1", attrDetails.common.T1, calculatedRequirements.common_t1, attrDetails.common.farm);
        addMaterialCard("common_t2", attrDetails.common.T2, calculatedRequirements.common_t2, attrDetails.common.farm);
        addMaterialCard("common_t3", attrDetails.common.T3, calculatedRequirements.common_t3, attrDetails.common.farm);
    }
}

// Generate text report and copy to clipboard
function exportCalcReport() {
    const charSelect = document.getElementById("calcCharacter");
    const charName = charSelect.options[charSelect.selectedIndex].text;
    const charId = charSelect.value;
    const activeList = state.CHARACTERS.length > 0 ? state.CHARACTERS : FALLBACK_CHARACTERS;
    const char = activeList.find(c => c.id === charId);
    if (!char) return;
    
    const startLvl = document.getElementById("calcLevelStart").value;
    const endLvl = document.getElementById("calcLevelEnd").value;
    
    let report = "";
    if (state.currentLang === 'uk') {
        report += `=== EIBON TERMINAL: ЗВІТ ПРО РЕСУРСИ ===\n`;
        report += `Мисливець: ${charName} (Рівень ${startLvl} ➔ ${endLvl})\n`;
        report += `Навички:\n`;
    } else if (state.currentLang === 'fr') {
        report += `=== EIBON TERMINAL: RAPPORT DE RESSOURCES ===\n`;
        report += `Chasseur: ${charName} (Niveau ${startLvl} ➔ ${endLvl})\n`;
        report += `Compétences:\n`;
    } else {
        report += `=== EIBON TERMINAL: RESOURCE REPORT ===\n`;
        report += `Hunter: ${charName} (Level ${startLvl} ➔ ${endLvl})\n`;
        report += `Skills:\n`;
    }
    
    const skillLabels = state.currentLang === 'uk' 
        ? ["Авто-атака", "Активна навичка", "Пасивна навичка", "Вибух стихій"]
        : (state.currentLang === 'fr'
            ? ["Attaque Normale", "Compétence Active", "Compétence Passive", "Déchaînement Élémentaire"]
            : ["Basic Attack", "Active Skill", "Passive Skill", "Ultimate Burst"]);
        
    for (let i = 0; i < 4; i++) {
        const start = document.getElementById(`skillStart_${i}`).value;
        const end = document.getElementById(`skillEnd_${i}`).value;
        if (state.currentLang === 'uk') {
            report += `  - ${skillLabels[i]}: Рівень ${start} ➔ ${end}\n`;
        } else if (state.currentLang === 'fr') {
            report += `  - ${skillLabels[i]}: Niveau ${start} ➔ ${end}\n`;
        } else {
            report += `  - ${skillLabels[i]}: Level ${start} ➔ ${end}\n`;
        }
    }

    // Weapon
    const includeWeapon = document.getElementById("calcWeaponActive").checked;
    if (includeWeapon) {
        const wRarity = document.getElementById("calcWeaponRarity").value;
        const wStart = document.getElementById("calcWeaponLevelStart").value;
        const wEnd = document.getElementById("calcWeaponLevelEnd").value;
        if (state.currentLang === 'uk') {
            report += `Зброя (Arc) ${wRarity}★: Рівень ${wStart} ➔ ${wEnd}\n`;
        } else if (state.currentLang === 'fr') {
            report += `Arme (Arc) ${wRarity}★: Niveau ${wStart} ➔ ${wEnd}\n`;
        } else {
            report += `Weapon (Arc) ${wRarity}★: Level ${wStart} ➔ ${wEnd}\n`;
        }
    } else {
        if (state.currentLang === 'uk') {
            report += `Зброя (Arc): Не враховувалась\n`;
        } else if (state.currentLang === 'fr') {
            report += `Arme (Arc): Non calculé\n`;
        } else {
            report += `Weapon (Arc): Not calculated\n`;
        }
    }

    if (state.currentLang === 'uk') {
        report += `\nСПИСОК НЕОБХІДНИХ МАТЕРІАЛІВ:\n`;
    } else if (state.currentLang === 'fr') {
        report += `\nLISTE DES MATÉRIAUX REQUIS:\n`;
    } else {
        report += `\nREQUIRED MATERIALS LIST:\n`;
    }
    
    // Sort materials by calculatedRequirements
    const baseAttrDetails = (LOCALIZED_ATTRIBUTE_MATERIALS[char.attribute] && LOCALIZED_ATTRIBUTE_MATERIALS[char.attribute][state.currentLang]) || LOCALIZED_ATTRIBUTE_MATERIALS["Anima"][state.currentLang];
    const attrDetails = JSON.parse(JSON.stringify(baseAttrDetails));
    const profile = CHARACTER_MATERIAL_PROFILES[char.id] || {};
    const weaponType = profile.weaponType || CHARACTER_WEAPON_TYPES[char.id] || "synthesis";
    const weaponMatsGroup = LOCALIZED_WEAPON_MATERIALS[weaponType] || LOCALIZED_WEAPON_MATERIALS["synthesis"];
    const weaponMats = weaponMatsGroup[state.currentLang] || weaponMatsGroup["uk"];
    if (profile.unique) {
        attrDetails.boss = profile.unique;
        attrDetails.specialty = profile.unique;
    }
    if (profile.commonFamily) {
        attrDetails.common.T1 = profile.commonFamily[0];
        attrDetails.common.T2 = profile.commonFamily[1];
        attrDetails.common.T3 = profile.commonFamily[2];
    }
    if (profile.skillBooks) {
        attrDetails.scrolls.T1 = profile.skillBooks[0];
        attrDetails.scrolls.T2 = profile.skillBooks[1];
        attrDetails.scrolls.T3 = profile.skillBooks[2];
    }

    Object.keys(calculatedRequirements).forEach(id => {
        const needed = calculatedRequirements[id];
        if (needed <= 0) return;
        
        let matName = "";
        if (id === 'coin') {
            matName = state.currentLang === 'uk' ? "Монети Beetle (Золото)" : (state.currentLang === 'fr' ? "Pièces Beetle (Or)" : "Beetle Coins (Gold)");
        }
        else if (id === 'exp_elite') {
            matName = "Elite Hunter Guide (+20,000 EXP)";
        }
        else if (id === 'exp_medium') {
            matName = "Senior Hunter Guide (+5,000 EXP)";
        }
        else if (id === 'exp_basic') {
            matName = "Rising Hunter Guide (+1,000 EXP)";
        }
        else if (id === 'dye_elite') {
            matName = "Chaotic Dye (+10,000 Arc EXP)";
        }
        else if (id === 'dye_medium') {
            matName = "Colorless Dye (+2,500 Arc EXP)";
        }
        else if (id === 'dye_basic') {
            matName = "Light Dye (+500 Arc EXP)";
        }
        else if (id === 'boss') {
            matName = attrDetails.boss;
        }
        else if (id === 'ore_t1') matName = weaponMats.T1;
        else if (id === 'ore_t2') matName = weaponMats.T2;
        else if (id === 'ore_t3') matName = weaponMats.T3;
        else if (id === 'crown') {
            matName = state.currentLang === 'uk' ? "Корона Аномалії" : (state.currentLang === 'fr' ? "Couronne d'anomalie" : "Anomaly Crown");
        }
        else if (id === 'weekly') {
            matName = profile.weekly || (state.currentLang === 'uk' ? "Матеріал тижневого боса" : (state.currentLang === 'fr' ? "Matériau de boss hebdomadaire" : "Weekly Boss Material"));
        }
        else {
            if (id === 'scroll_t1') matName = attrDetails.scrolls.T1;
            else if (id === 'scroll_t2') matName = attrDetails.scrolls.T2;
            else if (id === 'scroll_t3') matName = attrDetails.scrolls.T3;
            else if (id === 'common_t1') matName = attrDetails.common.T1;
            else if (id === 'common_t2') matName = attrDetails.common.T2;
            else if (id === 'common_t3') matName = attrDetails.common.T3;
        }

        const have = calcInventory[id] || 0;
        const rem = Math.max(0, needed - have);
        
        if (state.currentLang === 'uk') {
            report += `- ${matName}: Потрібно ${needed.toLocaleString()} шт. (Маю: ${have.toLocaleString()} | Залишилось: ${rem.toLocaleString()})\n`;
        } else if (state.currentLang === 'fr') {
            report += `- ${matName}: Requis ${needed.toLocaleString()} pcs. (Possède: ${have.toLocaleString()} | Restant: ${rem.toLocaleString()})\n`;
        } else {
            report += `- ${matName}: Need ${needed.toLocaleString()} pcs. (Have: ${have.toLocaleString()} | Remaining: ${rem.toLocaleString()})\n`;
        }
    });

    if (state.currentLang === 'uk') {
        report += `\nСгенеровано на Eibon Terminal. Успішного фарма! 🚀`;
    } else if (state.currentLang === 'fr') {
        report += `\nGénéré sur Eibon Terminal. Bon farm ! 🚀`;
    } else {
        report += `\nGenerated on Eibon Terminal. Happy farming! 🚀`;
    }

    navigator.clipboard.writeText(report).then(() => {
        showToast(i18n[state.currentLang].toast_report_copied || "Report copied to clipboard!");
    }).catch(err => {
        showToast(i18n[state.currentLang].toast_report_error || "Failed to copy report.");
        console.error(err);
    });
}


export {
    initCalculatorData,
    getMaterialIcon,
    renderCalculatorSetup,
    setupCalculatorEvents,
    saveInventory,
    updateSingleMaterialCard,
    calculateResources,
    exportCalcReport
};


