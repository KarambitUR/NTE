import { FALLBACK_CHARACTERS } from '../utils/fallbackData.js';
import { renderAvatarHtml } from '../utils/helpers.js';
import { state } from '../scripts/state.js';
import { getLocalizedChar } from '../localization/i18n.js';
import { ATTR_TRANSLATIONS, ROLE_TRANSLATIONS, REACTION_TRANSLATIONS } from '../localization/translations.js';


// 9. TEAM BUILDER LOGIC
function setupTeamBuilder() {
    const slots = document.querySelectorAll(".char-slot");
    slots.forEach(slot => {
        slot.addEventListener("click", () => {
            state.activeSelectorSlot = parseInt(slot.getAttribute("data-slot"));
            openSelectorModal();
        });
    });

    document.getElementById("clearSquadBtn").addEventListener("click", () => {
        state.currentSquad = [null, null, null, null];
        updateTeamSlotsUI();
        evaluateTeamSynergy();
    });
}

function openSelectorModal() {
    const overlay = document.getElementById("selectorModalOverlay");
    const grid = document.getElementById("selectorGrid");
    grid.innerHTML = "";

    // Load characters not in squad
    const activeList = state.CHARACTERS.length > 0 ? state.CHARACTERS : FALLBACK_CHARACTERS;
    activeList.forEach(char => {
        const isAlreadyInSquad = state.currentSquad.some(s => s && s.id === char.id);
        const locChar = getLocalizedChar(char);
        
        const card = document.createElement("div");
        card.className = "select-card";
        if (isAlreadyInSquad) {
            card.style.opacity = "0.4";
            card.style.cursor = "not-allowed";
        }
        
        card.innerHTML = `
            <div class="select-card-avatar rarity-${locChar.rarity}">${renderAvatarHtml(locChar)}</div>
            <div class="select-card-name">${locChar.name.split(" ")[0]}</div>
            <span class="badge attr-${char.attribute.toLowerCase()}" style="font-size:0.6rem; padding: 0.1rem 0.3rem; margin-top:0.2rem;">${locChar.attribute}</span>
        `;
        
        if (!isAlreadyInSquad) {
            card.addEventListener("click", () => {
                selectCharacterForSlot(char);
                overlay.classList.remove("active");
            });
        }
        
        grid.appendChild(card);
    });

    overlay.classList.add("active");
}

document.getElementById("selectorCloseBtn").addEventListener("click", () => {
    document.getElementById("selectorModalOverlay").classList.remove("active");
});
document.getElementById("selectorModalOverlay").addEventListener("click", (e) => {
    if (e.target.id === "selectorModalOverlay") {
        document.getElementById("selectorModalOverlay").classList.remove("active");
    }
});

function selectCharacterForSlot(char) {
    if (state.activeSelectorSlot !== null) {
        state.currentSquad[state.activeSelectorSlot] = char;
        updateTeamSlotsUI();
        evaluateTeamSynergy();
    }
}

function updateTeamSlotsUI() {
    for (let i = 0; i < 4; i++) {
        const slotEl = document.getElementById(`slot-${i}`);
        const char = state.currentSquad[i];
        
        if (char) {
            const locChar = getLocalizedChar(char);
            slotEl.innerHTML = `
                <div class="slot-filled-card">
                    <button class="slot-remove-btn" data-slot="${i}">&times;</button>
                    <div class="slot-filled-avatar rarity-${locChar.rarity}">${renderAvatarHtml(locChar)}</div>
                    <div class="char-card-name">${locChar.name.split(" ")[0]}</div>
                    <span class="badge attr-${char.attribute.toLowerCase()}">${locChar.attribute} • ${locChar.role}</span>
                </div>
            `;
            // Re-bind click only on remove button, and prevent slot click triggers
            const removeBtn = slotEl.querySelector(".slot-remove-btn");
            removeBtn.addEventListener("click", (e) => {
                e.stopPropagation(); // Avoid opening selector modal
                state.currentSquad[i] = null;
                updateTeamSlotsUI();
                evaluateTeamSynergy();
            });
        } else {
            const slotText = i === 0 
                ? i18n[state.currentLang].teams_slot_leader 
                : i18n[state.currentLang].teams_slot_label + (i + 1);
            slotEl.innerHTML = `
                <div class="slot-empty">
                    <span class="slot-plus">+</span>
                    <span class="slot-label">${slotText}</span>
                </div>
            `;
        }
    }
}

function evaluateTeamSynergy() {
    const activeChars = state.currentSquad.filter(c => c !== null);
    const badgesContainer = document.getElementById("synergyElements");
    const reactionsContainer = document.getElementById("synergyReactions");
    const descContainer = document.getElementById("synergyDescription");
    const ratingEl = document.getElementById("synergyRating");

    if (activeChars.length === 0) {
        badgesContainer.innerHTML = `<span class="no-synergy-text">${state.currentLang === 'uk' ? 'Виберіть персонажів для початку розрахунку.' : 'Select characters to begin calculation.'}</span>`;
        reactionsContainer.innerHTML = "";
        descContainer.innerHTML = `<p>${state.currentLang === 'uk' ? 'Додайте мисливців у слоти вище. Система автоматично проаналізує їхні класи, стихії та виведе оптимальну послідовність навичок (ротацію) для бою.' : 'Add hunters to slots above. The system will automatically analyze classes and attributes to outline optimal combat rotations.'}</p>`;
        ratingEl.innerText = "-";
        return;
    }

    // Display active character attributes
    badgesContainer.innerHTML = activeChars.map(c => {
        const locChar = getLocalizedChar(c);
        return `<span class="badge attr-${c.attribute.toLowerCase()}">${locChar.name.split(" ")[0]} (${locChar.attribute})</span>`;
    }).join("");

    // Calculate elements count
    const attributes = activeChars.map(c => c.attribute);
    const roles = activeChars.map(c => c.role);
    
    const count = {};
    attributes.forEach(a => count[a] = (count[a] || 0) + 1);

    let reactions = [];
    let rating = "B";
    let rotation = "";

    // Check Reactions
    // 1. Blossom Reaction (2+ Anima)
    if (count["Anima"] >= 2) {
        reactions.push({
            name: REACTION_TRANSLATIONS.Blossom[state.currentLang].name,
            desc: REACTION_TRANSLATIONS.Blossom[state.currentLang].desc
        });
    }

    // 2. Esper Cycle (Cosmos + any other attribute)
    if (count["Cosmos"] >= 1 && (count["Anima"] >= 1 || count["Incantation"] >= 1 || count["Chaos"] >= 1 || count["Psyche"] >= 1 || count["Lakshana"] >= 1)) {
        reactions.push({
            name: REACTION_TRANSLATIONS.EsperCycle[state.currentLang].name,
            desc: REACTION_TRANSLATIONS.EsperCycle[state.currentLang].desc
        });
    }

    // 3. Scorch Reaction (Anima + Incantation)
    if (count["Anima"] >= 1 && count["Incantation"] >= 1) {
        reactions.push({
            name: REACTION_TRANSLATIONS.Scorch[state.currentLang].name,
            desc: REACTION_TRANSLATIONS.Scorch[state.currentLang].desc
        });
    }

    // 4. Charged Reaction (Chaos + Incantation)
    if (count["Chaos"] >= 1 && count["Incantation"] >= 1) {
        reactions.push({
            name: REACTION_TRANSLATIONS.Charged[state.currentLang].name,
            desc: REACTION_TRANSLATIONS.Charged[state.currentLang].desc
        });
    }

    // 5. Remora Reaction (Cosmos + Lakshana)
    if (count["Cosmos"] >= 1 && count["Lakshana"] >= 1) {
        reactions.push({
            name: REACTION_TRANSLATIONS.Remora[state.currentLang].name,
            desc: REACTION_TRANSLATIONS.Remora[state.currentLang].desc
        });
    }

    // 6. Discord Reaction (Incantation/Chaos + Psyche)
    if ((count["Incantation"] >= 1 || count["Chaos"] >= 1) && count["Psyche"] >= 1) {
        reactions.push({
            name: REACTION_TRANSLATIONS.Discord[state.currentLang].name,
            desc: REACTION_TRANSLATIONS.Discord[state.currentLang].desc
        });
    }

    // 7. Stain Reaction (Lakshana + Psyche)
    if (count["Lakshana"] >= 1 && count["Psyche"] >= 1) {
        reactions.push({
            name: REACTION_TRANSLATIONS.Stain[state.currentLang].name,
            desc: REACTION_TRANSLATIONS.Stain[state.currentLang].desc
        });
    }

    // 8. Nova Reaction (Anima + Psyche)
    if (count["Anima"] >= 1 && count["Psyche"] >= 1) {
        reactions.push({
            name: REACTION_TRANSLATIONS.Nova[state.currentLang].name,
            desc: REACTION_TRANSLATIONS.Nova[state.currentLang].desc
        });
    }

    // Evaluate Rating
    if (activeChars.length === 4) {
        const hasMainDps = roles.includes("Main DPS");
        const hasSupport = roles.includes("Support");
        
        if (hasMainDps && hasSupport && reactions.length >= 2) {
            rating = "S";
        } else if (hasMainDps && reactions.length >= 1) {
            rating = "A";
        } else {
            rating = "B";
        }
    } else {
        rating = "C";
    }

    // Render reactions
    if (reactions.length > 0) {
        reactionsContainer.innerHTML = reactions.map(r => `
            <div class="reaction-item">
                <div class="reaction-name">${r.name}</div>
                <div class="reaction-desc">${r.desc}</div>
            </div>
        `).join("");
    } else {
        reactionsContainer.innerHTML = `<p class="no-synergy-text" style="font-size:0.85rem;">${state.currentLang === 'uk' ? 'Немає активних елементальних реакцій. Спробуйте поєднати інші стихії.' : 'No active elemental reactions. Try combining other elements.'}</p>`;
    }

    // Generate Rotation Text based on squad
    const hasSakiri = activeChars.some(c => c.id === "sakiri");
    const hasZero = activeChars.some(c => c.id === "zero");
    const hasNanally = activeChars.some(c => c.id === "nanally");
    const hasJiuyuan = activeChars.some(c => c.id === "jiuyuan");

    if (hasNanally && hasSakiri && hasZero) {
        if (state.currentLang === 'uk') {
            rotation = "<strong>Оптимальна ротація для бою:</strong><br>1. Почніть із <strong>Сакірі</strong>: стягніть ворогів умінням і запустіть вибух стихій для зрізу опорів.<br>2. Переключіться на <strong>Зеро</strong>: активуйте його поле, що запускає реакцію <em>Цикл Есперів</em>.<br>3. Перейдіть на <strong>Наналлі</strong>: виконайте посилену серію авто-атак під дією гравітації та вибух стихій для фінального удару.";
        } else {
            rotation = "<strong>Optimal Combat Rotation:</strong><br>1. Start with <strong>Sakiri</strong>: group enemies with skill and trigger Ultimate Burst to shred resistances.<br>2. Switch to <strong>Zero</strong>: activate his field to trigger <em>Esper Cycle</em>.<br>3. Swap to <strong>Nanally</strong>: perform enhanced gravity combos and use Ultimate Burst for the final blowout.";
        }
    } else if (hasNanally && hasJiuyuan) {
        if (state.currentLang === 'uk') {
            rotation = "<strong>Оптимальна ротація (Цвітіння):</strong><br>1. Використовуйте <strong>Цзююань</strong> для нанесення швидкої шкоди та накладання статусу Аніми.<br>2. Перейдіть на <strong>Наналлі</strong> для безперервного виклику реакції <em>Цвітіння</em> та нанесення основної шкоди.";
        } else {
            rotation = "<strong>Optimal Rotation (Blossom):</strong><br>1. Use <strong>Jiuyuan</strong> to deal rapid burst damage and apply Anima status.<br>2. Swap to <strong>Nanally</strong> for continuous <em>Blossom</em> triggers and main DPS damage.";
        }
    } else if (activeChars.length >= 2) {
        const support = activeChars.find(c => c.role === "Support");
        const dps = activeChars.find(c => c.role === "Main DPS");
        if (support && dps) {
            const locSupport = getLocalizedChar(support);
            const locDps = getLocalizedChar(dps);
            if (state.currentLang === 'uk') {
                rotation = `<strong>Бойова порада:</strong><br>Починайте бій за підтримку <strong>${locSupport.name.split(" ")[0]}</strong> для накладання ефектів контролю та баффів, після чого переключайтеся на атакуючого <strong>${locDps.name.split(" ")[0]}</strong> для завдання максимальної шкоди під баффами.`;
            } else {
                rotation = `<strong>Combat Tip:</strong><br>Begin combat with support <strong>${locSupport.name.split(" ")[0]}</strong> to apply crowd control and buffs, then switch to Main DPS <strong>${locDps.name.split(" ")[0]}</strong> to deal maximum damage under buffs.`;
            }
        } else {
            if (state.currentLang === 'uk') {
                rotation = "<strong>Бойова порада:</strong><br>Для збалансованого загону рекомендується мати принаймні одного атакуючого (Main DPS) персонажа та одного підтримку (Support). Експериментуйте з додаванням героїв Космосу для прискорення ротацій.";
            } else {
                rotation = "<strong>Combat Tip:</strong><br>For a balanced squad, it is recommended to have at least one Main DPS character and one Support. Experiment with adding Cosmos heroes to accelerate rotations.";
            }
        }
    } else {
        if (state.currentLang === 'uk') {
            rotation = "Додайте більше персонажів у команду для генерації тактичних порад.";
        } else {
            rotation = "Add more characters to the squad to generate tactical tips.";
        }
    }

    ratingEl.innerText = rating;
    descContainer.innerHTML = `<p>${rotation}</p>`;
}


export { setupTeamBuilder, openSelectorModal, selectCharacterForSlot, updateTeamSlotsUI, evaluateTeamSynergy };
