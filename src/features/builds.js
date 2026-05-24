import { state } from '../scripts/state.js';
import { getLocalizedChar } from '../localization/i18n.js';
import { ROLE_TRANSLATIONS, ATTR_TRANSLATIONS, STAT_TRANSLATIONS, i18n } from '../localization/translations.js';
import { renderAvatarHtml } from '../services/firestore.js';

// 7. BUILDS RENDERING
function renderBuilds() {
    const buildsGrid = document.getElementById("buildsGrid");
    buildsGrid.innerHTML = "";

    const activeList = state.CHARACTERS.length > 0 ? state.CHARACTERS : FALLBACK_CHARACTERS;

    // Show S and S+ character builds on builds tab
    const buildChars = activeList.filter(c => c.tier === "S+" || c.tier === "S" || c.id === "adler" || c.id === "mint");

    buildChars.forEach(char => {
        const locChar = getLocalizedChar(char);
        const card = document.createElement("div");
        card.className = "build-card";
        
        const statsTags = locChar.stats.map(s => `<span class="stat-tag">${s}</span>`).join("");

        card.innerHTML = `
            <div class="build-card-header">
                <div class="build-char-avatar rarity-${locChar.rarity}">${renderAvatarHtml(locChar)}</div>
                <div class="build-header-info">
                    <h3>${locChar.name}</h3>
                    <span class="badge attr-${char.attribute.toLowerCase()}">${locChar.attribute} • ${locChar.role}</span>
                </div>
            </div>
            
            <div class="build-grid-details">
                <div class="build-section-block">
                    <span class="build-section-label" data-i18n="build_best_weapon">${i18n[state.currentLang].build_best_weapon}</span>
                    <span class="build-section-value">${locChar.weapon}</span>
                </div>
                <div class="build-section-block">
                    <span class="build-section-label" data-i18n="build_f2p_alt">${i18n[state.currentLang].build_f2p_alt}</span>
                    <span class="build-section-value">${locChar.weaponF2p}</span>
                </div>
                <div class="build-section-block">
                    <span class="build-section-label" data-i18n="build_cartridge">${i18n[state.currentLang].build_cartridge}</span>
                    <span class="build-section-value">${locChar.cartridge}</span>
                </div>
                <div class="build-section-block">
                    <span class="build-section-label" data-i18n="build_stats_pri">${i18n[state.currentLang].build_stats_pri}</span>
                    <div class="stat-pri-list">${statsTags}</div>
                </div>
            </div>
            
            <div class="build-card-teams">
                <span class="build-section-label" data-i18n="build_partners">${i18n[state.currentLang].build_partners}</span>
                <p style="font-size:0.9rem; margin-top:0.2rem; color:var(--text-muted);">${locChar.teamSynergy}</p>
            </div>
        `;
        buildsGrid.appendChild(card);
    });
}

// 8. DETAIL MODAL LOGIC
function openCharacterModal(charId) {
    const char = state.CHARACTERS.find(c => c.id === charId) || FALLBACK_CHARACTERS.find(c => c.id === charId);
    if (!char) return;

    const locChar = getLocalizedChar(char);
    const modal = document.getElementById("charModalOverlay");
    const detailContainer = document.getElementById("modalCharDetail");

    const statsTags = locChar.stats.map(s => `<span class="stat-tag">${s}</span>`).join("");

    detailContainer.innerHTML = `
        <div class="modal-char-header">
            <div class="modal-avatar-big rarity-${locChar.rarity}">${renderAvatarHtml(locChar)}</div>
            <div class="modal-header-desc">
                <h2>${locChar.name}</h2>
                <div class="modal-char-meta-row">
                    <span class="badge ${locChar.rarity === 5 ? 'badge-hot' : 'badge-cosmos'}">${locChar.rarity}★ ${state.currentLang === 'uk' ? 'Ранг' : 'Rank'}</span>
                    <span class="badge attr-${char.attribute.toLowerCase()}">${locChar.attribute}</span>
                    <span class="badge badge-anima">${locChar.role}</span>
                    <span class="badge badge-incant">Tier ${locChar.tier}</span>
                </div>
            </div>
        </div>

        <div class="modal-char-body">
            <div class="modal-section">
                <h4 data-i18n="modal_char_desc">${i18n[state.currentLang].modal_char_desc}</h4>
                <p>${locChar.summary}</p>
            </div>

            <div class="modal-section">
                <h4 data-i18n="modal_best_build">${i18n[state.currentLang].modal_best_build}</h4>
                <div class="modal-gear-blocks">
                    <div class="gear-item">
                        <span class="build-section-label" data-i18n="build_best_weapon">${i18n[state.currentLang].build_best_weapon}</span>
                        <div class="gear-title">${locChar.weapon}</div>
                        <div class="gear-note" data-i18n="modal_gear_weapon_desc">${i18n[state.currentLang].modal_gear_weapon_desc}</div>
                    </div>
                    <div class="gear-item">
                        <span class="build-section-label" data-i18n="build_f2p_alt">${i18n[state.currentLang].build_f2p_alt}</span>
                        <div class="gear-title">${locChar.weaponF2p}</div>
                        <div class="gear-note" data-i18n="modal_gear_f2p_desc">${i18n[state.currentLang].modal_gear_f2p_desc}</div>
                    </div>
                    <div class="gear-item">
                        <span class="build-section-label" data-i18n="build_cartridge">${i18n[state.currentLang].build_cartridge}</span>
                        <div class="gear-title">${locChar.cartridge}</div>
                        <div class="gear-note" data-i18n="modal_gear_cartridge_desc">${i18n[state.currentLang].modal_gear_cartridge_desc}</div>
                    </div>
                    <div class="gear-item">
                        <span class="build-section-label" data-i18n="modal_gear_substats_desc">${i18n[state.currentLang].modal_gear_substats_desc}</span>
                        <div class="stat-pri-list" style="margin-top:0.4rem;">${statsTags}</div>
                    </div>
                </div>
            </div>

            <div class="modal-section">
                <h4 data-i18n="modal_synergy_story">${i18n[state.currentLang].modal_synergy_story}</h4>
                <p><strong data-i18n="modal_team_partners">${i18n[state.currentLang].modal_team_partners}</strong> ${locChar.teamSynergy}</p>
                <p style="margin-top:0.5rem;"><strong data-i18n="modal_char_history">${i18n[state.currentLang].modal_char_history}</strong> ${locChar.lore}</p>
            </div>
        </div>
    `;

    modal.classList.add("active");
}

// Modal Close logic
document.getElementById("modalCloseBtn").addEventListener("click", () => {
    document.getElementById("charModalOverlay").classList.remove("active");
});
document.getElementById("charModalOverlay").addEventListener("click", (e) => {
    if (e.target.id === "charModalOverlay") {
        document.getElementById("charModalOverlay").classList.remove("active");
    }
});


export { renderBuilds, openCharacterModal };
