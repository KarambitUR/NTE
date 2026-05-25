import { FALLBACK_CHARACTERS } from '../utils/fallbackData.js';
import { renderAvatarHtml } from '../utils/helpers.js';
import { state } from '../scripts/state.js';
import { getLocalizedChar } from '../localization/i18n.js';
import { ATTR_TRANSLATIONS, ROLE_TRANSLATIONS, REACTION_TRANSLATIONS, i18n } from '../localization/translations.js';


// Global selector filter state
let selectorSearchQuery = "";
let selectorFilterAttr = "all";
let selectorFilterRole = "all";

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

    // Bind selector filters
    const searchInput = document.getElementById("selectorSearch");
    const attrSelect = document.getElementById("selectorFilterAttr");
    const roleSelect = document.getElementById("selectorFilterRole");

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            selectorSearchQuery = e.target.value.toLowerCase().trim();
            renderSelectorGrid();
        });
    }

    if (attrSelect) {
        attrSelect.addEventListener("change", (e) => {
            selectorFilterAttr = e.target.value;
            renderSelectorGrid();
        });
    }

    if (roleSelect) {
        roleSelect.addEventListener("change", (e) => {
            selectorFilterRole = e.target.value;
            renderSelectorGrid();
        });
    }
}

function openSelectorModal() {
    const overlay = document.getElementById("selectorModalOverlay");
    
    // Reset filters
    selectorSearchQuery = "";
    selectorFilterAttr = "all";
    selectorFilterRole = "all";
    
    const searchInput = document.getElementById("selectorSearch");
    const attrSelect = document.getElementById("selectorFilterAttr");
    const roleSelect = document.getElementById("selectorFilterRole");
    
    if (searchInput) searchInput.value = "";
    if (attrSelect) attrSelect.value = "all";
    if (roleSelect) roleSelect.value = "all";

    renderSelectorGrid();
    overlay.classList.add("active");
}

function renderSelectorGrid() {
    const grid = document.getElementById("selectorGrid");
    grid.innerHTML = "";

    // Load characters not in squad
    const activeList = state.CHARACTERS.length > 0 ? state.CHARACTERS : FALLBACK_CHARACTERS;
    let countRendered = 0;

    activeList.forEach(char => {
        const isAlreadyInSquad = state.currentSquad.some(s => s && s.id === char.id);
        const locChar = getLocalizedChar(char);
        
        // Filter checks
        const matchesSearch = !selectorSearchQuery || locChar.name.toLowerCase().includes(selectorSearchQuery);
        const matchesAttr = selectorFilterAttr === "all" || char.attribute === selectorFilterAttr;
        const matchesRole = selectorFilterRole === "all" || char.role === selectorFilterRole;

        if (!matchesSearch || !matchesAttr || !matchesRole) {
            return;
        }

        countRendered++;

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
                document.getElementById("selectorModalOverlay").classList.remove("active");
            });
        }
        
        grid.appendChild(card);
    });

    if (countRendered === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); font-size: 0.9rem; padding: 1.5rem 0;">${
            state.currentLang === 'uk' ? 'Персонажів не знайдено.' : 'No characters found.'
        }</div>`;
    }
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
        
        // Reset classes on the slot
        slotEl.className = "char-slot";
        
        if (char) {
            const locChar = getLocalizedChar(char);
            
            // Add element glow class
            slotEl.classList.add(`slot-${char.attribute.toLowerCase()}`);

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
        const dpsCount = roles.filter(r => r === "Main DPS").length;
        
        if (hasMainDps && hasSupport && reactions.length >= 2) {
            rating = dpsCount > 1 ? "A" : "S";
        } else if (hasMainDps && reactions.length >= 1) {
            rating = dpsCount > 1 ? "B" : "A";
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
    const hasLacrimosa = activeChars.some(c => c.id === "lacrimosa");
    const hasDaffodil = activeChars.some(c => c.id === "daffodil");
    const hasHathor = activeChars.some(c => c.id === "hathor");
    const hasSkia = activeChars.some(c => c.id === "skia");
    const hasMint = activeChars.some(c => c.id === "mint");
    const hasHaniel = activeChars.some(c => c.id === "haniel");
    const hasBaicang = activeChars.some(c => c.id === "baicang");
    const hasChiz = activeChars.some(c => c.id === "chiz");
    const hasHotori = activeChars.some(c => c.id === "hotori");
    const hasAurelia = activeChars.some(c => c.id === "aurelia");
    const hasFadia = activeChars.some(c => c.id === "fadia");
    const hasAdler = activeChars.some(c => c.id === "adler");

    if (hasNanally && hasSakiri && hasZero) {
        if (state.currentLang === 'uk') {
            rotation = "<strong>Оптимальна ротація для бою:</strong><br>1. Почніть із <strong>Сакірі</strong>: стягніть ворогів умінням і запустіть вибух стихій для зрізу опорів.<br>2. Переключіться на <strong>Зеро</strong>: активуйте його поле, що запускає реакцію <em>Цикл Есперів</em>.<br>3. Перейдіть на <strong>Наналлі</strong>: виконайте посилену серію авто-атак під дією гравітації та вибух стихій для фінального удару.";
        } else if (state.currentLang === 'fr') {
            rotation = "<strong>Rotation de Combat Optimale :</strong><br>1. Commencez avec <strong>Sakiri</strong> : regroupez les ennemis avec sa compétence et déclenchez son Déchaînement Élémentaire pour réduire les résistances.<br>2. Passez à <strong>Zero</strong> : activez son champ pour déclencher le <em>Cycle d'Espers</em>.<br>3. Passez à <strong>Nanally</strong> : effectuez des combos aériens renforcés et utilisez son Déchaînement Élémentaire pour le coup de grâce.";
        } else {
            rotation = "<strong>Optimal Combat Rotation:</strong><br>1. Start with <strong>Sakiri</strong>: group enemies with skill and trigger Ultimate Burst to shred resistances.<br>2. Switch to <strong>Zero</strong>: activate his field to trigger <em>Esper Cycle</em>.<br>3. Swap to <strong>Nanally</strong>: perform enhanced gravity combos and use Ultimate Burst for the final blowout.";
        }
    } else if (hasBaicang && hasSakiri && (hasAdler || hasFadia)) {
        if (state.currentLang === 'uk') {
            rotation = "<strong>Оптимальна ротація (Полум'яний Гнів):</strong><br>1. Почніть з <strong>Адлера</strong> (або <strong>Фадії</strong>): активуйте щит/лікування для стабільності.<br>2. Переключіться на <strong>Сакірі</strong>: стягніть ворогів та запустіть ультимейт для зрізу опорів.<br>3. Перейдіть на <strong>Байканг</strong>: використовуйте посилені закляття та атаки, наносячи нищівну шкоду з витратою здоров'я.";
        } else if (state.currentLang === 'fr') {
            rotation = "<strong>Rotation Optimale (Colère Flamboyante) :</strong><br>1. Commencez avec <strong>Adler</strong> (ou <strong>Fadia</strong>) : déployez son bouclier/soin pour sécuriser la posture de Baicang.<br>2. Passez à <strong>Sakiri</strong> : regroupez les cibles et activez son ultime pour réduire les résistances.<br>3. Passez à <strong>Baicang</strong> : déclenchez ses enchaînements de compétences consommant des PV pour infliger des dégâts de burst dévastateurs.";
        } else {
            rotation = "<strong>Optimal Rotation (Blazing Wrath):</strong><br>1. Start with <strong>Adler</strong> (or <strong>Fadia</strong>): deploy shield/sustain to secure Baicang's posture.<br>2. Swap to <strong>Sakiri</strong>: group targets and activate Ultimate to shred resistances.<br>3. Swap to <strong>Baicang</strong>: trigger HP-consuming skill strings to unleash devastating burst damage.";
        }
    } else if (hasChiz && hasZero && hasHotori) {
        if (state.currentLang === 'uk') {
            rotation = "<strong>Оптимальна ротація (Золота Лихоманка):</strong><br>1. Почніть із <strong>Зеро</strong>: активуйте його Космос-поле для прискорення ротацій.<br>2. Переключіться на <strong>Хоторі</strong> та запустіть її прилад запису.<br>3. Перейдіть на <strong>Сакірі</strong> (або іншого саппорта) для стяжки та дебаффу ворогів.<br>4. Виведіть <strong>Чіз</strong>: виконайте комбо молотом та активуйте ультимейт для ігнорування захисту.";
        } else if (state.currentLang === 'fr') {
            rotation = "<strong>Rotation Optimale (Ruée vers l'Or) :</strong><br>1. Commencez avec <strong>Zero</strong> : activez son champ Cosmos pour accélérer les changements de personnage et booster l'équipe.<br>2. Passez à <strong>Hotori</strong> et lancez son enregistreur de compétences.<br>3. Passez à <strong>Sakiri</strong> (ou autre support) pour regrouper les ennemis et réduire leurs résistances.<br>4. Passez à <strong>Chiz</strong> : effectuez des combos de marteau et déclenchez son ultime ignorant la défense.";
        } else {
            rotation = "<strong>Optimal Rotation (Gold Rush):</strong><br>1. Start with <strong>Zero</strong>: activate his Cosmos field for swap acceleration and buffs.<br>2. Swap to <strong>Hotori</strong> and launch her recording device.<br>3. Swap to <strong>Sakiri</strong> (or other support) to apply crowd control and shred resistances.<br>4. Swap to <strong>Chiz</strong>: execute hammer combos and activate her defense-ignoring Ultimate Burst.";
        }
    } else if (hasAurelia && (hasFadia || hasSakiri)) {
        if (state.currentLang === 'uk') {
            rotation = "<strong>Оптимальна ротація (Симфонія Розуму):</strong><br>1. Почніть із <strong>Сакірі</strong>: згрупуйте ворогів стяжкою.<br>2. Перейдіть на <strong>Фадію</strong>: активуйте захисний надгробок для стійкості команди.<br>3. Використовуйте <strong>Наналлі</strong> (або іншого героя Аніми/Закляття) для швидкого накладання стихії.<br>4. Перейдіть на <strong>Аурелію</strong>: увійдіть у стан Cadenza та наносьте шкоду медузами (реакції Nova/Discord).";
        } else if (state.currentLang === 'fr') {
            rotation = "<strong>Rotation Optimale (Symphonie de l'Esprit) :</strong><br>1. Commencez avec <strong>Sakiri</strong> : utilisez son attraction pour regrouper les ennemis.<br>2. Passez à <strong>Fadia</strong> : déployez sa barrière tombale pour la protection et la survie de l'équipe.<br>3. Utilisez <strong>Nanally</strong> (ou un autre Anima/Incantation) pour appliquer les éléments de base.<br>4. Amenez <strong>Aurelia</strong> : entrez en état Cadenza et déclenchez les explosions AoE de ses méduses (réactions Nova/Discorde).";
        } else {
            rotation = "<strong>Optimal Rotation (Mind Symphony):</strong><br>1. Start with <strong>Sakiri</strong>: use crowd control pull to group enemies.<br>2. Swap to <strong>Fadia</strong>: deploy tombstone shields for overall party posture and health.<br>3. Swap to <strong>Nanally</strong> (or other Anima/Incantation) to apply primary elements.<br>4. Bring in <strong>Aurelia</strong>: enter Cadenza state and trigger mental jellyfish AoE bursts (Nova/Discord).";
        }
    } else if (hasLacrimosa && hasDaffodil) {
        if (state.currentLang === 'uk') {
            rotation = "<strong>Оптимальна ротація (Хаотичний Заряд):</strong><br>1. Почніть із саппорта (наприклад, <strong>Сакірі</strong>), щоб стягнути ворогів.<br>2. Переключіться на <strong>Адлера</strong> та активуйте щит.<br>3. Перейдіть на <strong>Даффоділ</strong> для пробиття стійкості (Break) реакцією <em>Зарядження</em>.<br>4. Викличте <strong>Лакрімозу</strong> для нанесення колосальної вибухової шкоди масками по пробитим ворогам.";
        } else if (state.currentLang === 'fr') {
            rotation = "<strong>Rotation Optimale (Charge Chaotique) :</strong><br>1. Commencez avec un support (ex: <strong>Sakiri</strong>) pour attirer les cibles.<br>2. Passez à <strong>Adler</strong> pour déployer son bouclier.<br>3. Passez à <strong>Daffodil</strong> pour briser rapidement la posture (Rupture) des ennemis via la réaction <em>Surchargé</em>.<br>4. Amenez <strong>Lacrimosa</strong> pour infliger d'énormes dégâts de burst avec ses masques sur les cibles brisées.";
        } else {
            rotation = "<strong>Optimal Rotation (Chaos Charged):</strong><br>1. Start with support (e.g. <strong>Sakiri</strong>) to pull targets.<br>2. Swap to <strong>Adler</strong> to deploy shields.<br>3. Swap to <strong>Daffodil</strong> to shred enemy poise (Break) via the <em>Charged</em> reaction.<br>4. Bring in <strong>Lacrimosa</strong> to deal massive burst damage with masks on broken targets.";
        }
    } else if (hasNanally && hasJiuyuan) {
        if (state.currentLang === 'uk') {
            rotation = "<strong>Оптимальна ротація (Цвітіння):</strong><br>1. Використовуйте <strong>Цзююань</strong> для нанесення швидкої шкоди та накладання статусу Аніми.<br>2. Перейдіть на <strong>Наналлі</strong> для безперервного виклику реакції <em>Цвітіння</em> та нанесення основної шкоди.";
        } else if (state.currentLang === 'fr') {
            rotation = "<strong>Rotation Optimale (Blossom) :</strong><br>1. Utilisez <strong>Jiuyuan</strong> pour infliger un burst rapide de dégâts et appliquer l'élément Anima.<br>2. Passez à <strong>Nanally</strong> pour déclencher continuellement la réaction <em>Blossom</em> et infliger les dégâts principaux.";
        } else {
            rotation = "<strong>Optimal Rotation (Blossom):</strong><br>1. Use <strong>Jiuyuan</strong> to deal rapid burst damage and apply Anima status.<br>2. Swap to <strong>Nanally</strong> for continuous <em>Blossom</em> triggers and main DPS damage.";
        }
    } else if (hasHathor && hasSkia) {
        if (state.currentLang === 'uk') {
            rotation = "<strong>Оптимальна ротація (Критичний Шторм):</strong><br>1. Почніть зі <strong>Скіа</strong>: накладіть мітки Fang Thrust із прихованості.<br>2. Передіть на <strong>Зеро</strong> та активуйте його Космос-поле для запуску реакції <em>Ремора</em> (+10% крит. шансу).<br>3. Переключіться на <strong>Хатор</strong>, накопичте стаки доставки та виконайте нищівний вибух стихій.";
        } else if (state.currentLang === 'fr') {
            rotation = "<strong>Rotation Optimale (Tempête Critique) :</strong><br>1. Commencez avec <strong>Skia</strong> : appliquez les marques Fang Thrust depuis la furtivité.<br>2. Passez à <strong>Zero</strong> et activez son champ Cosmos pour déclencher la réaction <em>Rémora</em> (+10% de Taux Critique).<br>3. Passez à <strong>Hathor</strong>, cumulez de la puissance de livraison et exécutez son Déchaînement Élémentaire.";
        } else {
            rotation = "<strong>Optimal Rotation (Critical Storm):</strong><br>1. Start with <strong>Skia</strong>: apply shadow Fang Thrust marks from stealth.<br>2. Swap to <strong>Zero</strong> and activate Cosmos field to trigger the <em>Remora</em> reaction (+10% Crit Rate boost).<br>3. Switch to <strong>Hathor</strong>, stack up delivery power, and execute her devastating Ultimate Burst.";
        }
    } else if (hasMint && hasHaniel) {
        if (state.currentLang === 'uk') {
            rotation = "<strong>Оптимальна ротація (Стартовий загін):</strong><br>1. Почніть із <strong>Ханіель</strong>: викличте сову Hootie для баффу сили атаки загону.<br>2. Переключіться на <strong>Зеро</strong> та активуйте його навичку для запуску <em>Циклу Есперів</em>.<br>3. Перейдіть на <strong>Мінт</strong> та наносьте шкоду швидкими комбо под дією всіх баффів.";
        } else if (state.currentLang === 'fr') {
            rotation = "<strong>Rotation Optimale (Équipe de Départ) :</strong><br>1. Commencez avec <strong>Haniel</strong> : invoquez le hibou Hootie pour booster l'ATK de l'équipe.<br>2. Passez à <strong>Zero</strong> et utilisez sa compétence pour déclencher le <em>Cycle d'Espers</em>.<br>3. Passez à <strong>Mint</strong> et infligez des dégâts avec des attaques combos sous l'effet de tous les buffs.";
        } else {
            rotation = "<strong>Optimal Rotation (Starter Team):</strong><br>1. Start with <strong>Haniel</strong>: summon owl Hootie to buff the entire squad's ATK.<br>2. Swap to <strong>Zero</strong> and use skill to trigger <em>Esper Cycle</em>.<br>3. Switch to <strong>Mint</strong> and deal damage with combo attacks while all buffs are active.";
        }
    } else if (activeChars.length >= 2) {
        const support = activeChars.find(c => c.role === "Support");
        const dps = activeChars.find(c => c.role === "Main DPS");
        if (support && dps) {
            const locSupport = getLocalizedChar(support);
            const locDps = getLocalizedChar(dps);
            if (state.currentLang === 'uk') {
                rotation = `<strong>Бойова порада:</strong><br>Починайте бій за підтримку <strong>${locSupport.name.split(" ")[0]}</strong> для накладання ефектів контролю та баффів, після чого переключайтеся на атакуючого <strong>${locDps.name.split(" ")[0]}</strong> для завдання максимальної шкоди під баффами.`;
            } else if (state.currentLang === 'fr') {
                rotation = `<strong>Conseil de Combat :</strong><br>Commencez le combat avec le soutien <strong>${locSupport.name.split(" ")[0]}</strong> pour appliquer des contrôles et des buffs, puis passez au DPS Principal <strong>${locDps.name.split(" ")[0]}</strong> pour infliger un maximum de dégâts sous buffs.`;
            } else {
                rotation = `<strong>Combat Tip:</strong><br>Begin combat with support <strong>${locSupport.name.split(" ")[0]}</strong> to apply crowd control and buffs, then switch to Main DPS <strong>${locDps.name.split(" ")[0]}</strong> to deal maximum damage under buffs.`;
            }
        } else {
            if (state.currentLang === 'uk') {
                rotation = "<strong>Бойова порада:</strong><br>Для збалансованого загону рекомендується мати принаймні одного атакуючого (Main DPS) персонажа та одного підтримку (Support). Експериментуйте з додаванням героїв Космосу для прискорення ротацій.";
            } else if (state.currentLang === 'fr') {
                rotation = "<strong>Conseil de Combat :</strong><br>Pour une équipe équilibrée, il est recommandé d'avoir au moins un DPS Principal et un Soutien. Expérimentez en ajoutant des héros Cosmos pour accélérer les rotations.";
            } else {
                rotation = "<strong>Combat Tip:</strong><br>For a balanced squad, it is recommended to have at least one Main DPS character and one Support. Experiment with adding Cosmos heroes to accelerate rotations.";
            }
        }
    } else {
        if (state.currentLang === 'uk') {
            rotation = "Додайте більше персонажів у команду для генерації тактичних порад.";
        } else if (state.currentLang === 'fr') {
            rotation = "Ajoutez plus de personnages à l'équipe pour générer des conseils tactiques.";
        } else {
            rotation = "Add more characters to the squad to generate tactical tips.";
        }
    }

    let warningText = "";
    const dpsCount = roles.filter(r => r === "Main DPS").length;
    if (dpsCount > 1) {
        const dpsNames = activeChars.filter(c => c.role === "Main DPS").map(c => getLocalizedChar(c).name.split(" ")[0]).join(", ");
        if (state.currentLang === 'uk') {
            warningText = `<span style="color: #ff4a7d; font-weight: bold;">⚠️ Застереження щодо команди:</span><br>У вашій команді більше ніж один активний атакуючий персонаж (Main DPS: <strong>${dpsNames}</strong>). Вони конкуруватимуть за час на полі бою, що знижує загальну ефективність. Рекомендується залишити лише одного Main DPS, замінивши іншого на Sub-DPS або саппорта для баффу.<br><br>`;
        } else if (state.currentLang === 'fr') {
            warningText = `<span style="color: #ff4a7d; font-weight: bold;">⚠️ Avertissement d'équipe :</span><br>Votre équipe contient plus d'un personnage DPS principal (Main DPS : <strong>${dpsNames}</strong>). Ils se disputeront le temps sur le terrain, ce qui réduit l'efficacité globale. Il est recommandé de ne garder qu'un seul Main DPS et de remplacer l'autre par un Sub-DPS ou un Support.<br><br>`;
        } else {
            warningText = `<span style="color: #ff4a7d; font-weight: bold;">⚠️ Team Warning:</span><br>Your team contains more than one Main DPS character (Main DPS: <strong>${dpsNames}</strong>). They will compete for on-field time, reducing overall combat efficiency. It is recommended to keep only one Main DPS and replace the other with a Sub-DPS or Support.<br><br>`;
        }
    }

    ratingEl.innerText = rating;
    descContainer.innerHTML = `<p>${warningText}${rotation}</p>`;
}


export { setupTeamBuilder, openSelectorModal, selectCharacterForSlot, updateTeamSlotsUI, evaluateTeamSynergy };
