import { FALLBACK_CHARACTERS } from '../utils/fallbackData.js';
import { state } from '../scripts/state.js';
import { db } from '../firebase/firebase.js';
import { getLocalizedChar, translatePage } from '../localization/i18n.js';
import { i18n, ROLE_TRANSLATIONS, ATTR_TRANSLATIONS } from '../localization/translations.js';
import { showToast, renderAvatarHtml, renderAvatarUrlOnly, debounce } from '../utils/helpers.js';

import { updateAuthUI } from './auth.js';
import { openCharacterModal } from './builds.js';

// 6. TIER LIST RENDERING
function renderTierList() {
    const searchVal = document.getElementById("charSearch").value.toLowerCase();
    const activeRarity = document.querySelector("#filter-rarity .active").getAttribute("data-rarity");
    const activeAttribute = document.querySelector("#filter-attribute .active").getAttribute("data-attribute");
    const activeRole = document.querySelector("#filter-role .active").getAttribute("data-role");

    // Clear rows
    const grids = {
        "S+": document.getElementById("tier-S-plus-grid"),
        "S": document.getElementById("tier-S-grid"),
        "A": document.getElementById("tier-A-grid"),
        "B": document.getElementById("tier-B-grid")
    };

    Object.values(grids).forEach(grid => grid.innerHTML = "");

    const activeList = state.CHARACTERS.length > 0 ? state.CHARACTERS : FALLBACK_CHARACTERS;

    // Filter characters
    const filtered = activeList.filter(char => {
        const locChar = getLocalizedChar(char);
        const matchesSearch = locChar.name.toLowerCase().includes(searchVal);
        const matchesRarity = activeRarity === "all" ? true : (activeRarity === "S" ? locChar.rarity === 5 : locChar.rarity === 4);
        const matchesAttr = activeAttribute === "all" ? true : char.attribute === activeAttribute;
        const matchesRole = activeRole === "all" ? true : char.role === activeRole;
        return matchesSearch && matchesRarity && matchesAttr && matchesRole;
    });

    // Populate rows
    let counts = { "S+": 0, "S": 0, "A": 0, "B": 0 };

    filtered.forEach(char => {
        const locChar = getLocalizedChar(char);
        const card = document.createElement("div");
        card.className = `char-card rarity-${locChar.rarity}`;
        card.innerHTML = `
            <span class="char-card-attr-badge attr-${char.attribute.toLowerCase()}">${char.attribute[0]}</span>
            <div class="char-card-avatar">${renderAvatarHtml(locChar)}</div>
            <div class="char-card-name">${locChar.name.split(" ")[0]}</div>
            <div class="char-card-meta">${locChar.role}</div>
        `;
        card.addEventListener("click", () => openCharacterModal(locChar.id));

        if (grids[locChar.tier]) {
            grids[locChar.tier].appendChild(card);
            counts[locChar.tier]++;
        }
    });

    // Show empty message if a row has 0 elements
    Object.keys(grids).forEach(tier => {
        if (counts[tier] === 0) {
            grids[tier].innerHTML = `<div class="no-chars-alert" data-i18n="no_chars_found">${i18n[state.currentLang].no_chars_found}</div>`;
        }
    });
}

// Setup Tier List Filter Buttons
const rarityBtns = document.querySelectorAll("#filter-rarity .filter-btn");
rarityBtns.forEach(btn => btn.addEventListener("click", (e) => {
    rarityBtns.forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    renderTierList();
}));

const attributeBtns = document.querySelectorAll("#filter-attribute .filter-btn");
attributeBtns.forEach(btn => btn.addEventListener("click", (e) => {
    attributeBtns.forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    renderTierList();
}));

const roleBtns = document.querySelectorAll("#filter-role .filter-btn");
roleBtns.forEach(btn => btn.addEventListener("click", (e) => {
    roleBtns.forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    renderTierList();
}));

document.getElementById("charSearch").addEventListener("input", debounce(renderTierList, 150));


function initTierlistEditor() {
    // Fill state
    state.editorState = {
        "S+": [],
        "S": [],
        "A": [],
        "B": [],
        "pool": []
    };

    const activeList = state.CHARACTERS.length > 0 ? state.CHARACTERS : FALLBACK_CHARACTERS;
    activeList.forEach(char => {
        state.editorState.pool.push(char.id);
    });

    renderEditor();
}

// Render the editor UI rows and pool
function renderEditor() {
    const tiers = ["S+", "S", "A", "B"];
    const activeList = state.CHARACTERS.length > 0 ? state.CHARACTERS : FALLBACK_CHARACTERS;

    // Render Rows
    tiers.forEach(tier => {
        const dropzoneId = `dropzone-${tier.replace("+", "-plus")}`;
        const zone = document.getElementById(dropzoneId);
        if (!zone) return;
        zone.innerHTML = "";

        state.editorState[tier].forEach(charId => {
            const char = activeList.find(c => c.id === charId);
            if (char) zone.appendChild(createDraggableElement(char, tier));
        });
    });

    // Render Pool
    const pool = document.getElementById("editorCharacterPool");
    if (pool) {
        pool.innerHTML = "";
        state.editorState.pool.forEach(charId => {
            const char = activeList.find(c => c.id === charId);
            if (char) pool.appendChild(createDraggableElement(char, "pool"));
        });
    }
}

// Create a draggable character element for the editor workspace (mobile friendly via click)
function createDraggableElement(char, currentTier) {
    const el = document.createElement("div");
    el.className = `draggable-char rarity-${char.rarity}`;
    el.draggable = true;
    el.innerHTML = `
        <div class="draggable-char-avatar">${renderAvatarHtml(char)}</div>
        <span class="draggable-char-name">${char.name.split(" ")[0]}</span>
    `;

    // Drag start
    el.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", char.id);
        e.dataTransfer.setData("source", currentTier);
    });

    // Mobile click-to-move menu
    el.addEventListener("click", () => {
        openClickMoveMenu(char.id);
    });

    return el;
}

// Mobile/Click menu for shifting characters
function openClickMoveMenu(charId) {
    const tiers = ["S+", "S", "A", "B", "pool"];
    const names = state.currentLang === 'uk' ? {
        "S+": "Ранг S+",
        "S": "Ранг S",
        "A": "Ранг A",
        "B": "Ранг B",
        "pool": "Скинути в пул"
    } : (state.currentLang === 'fr' ? {
        "S+": "Rang S+",
        "S": "Rang S",
        "A": "Rang A",
        "B": "Rang B",
        "pool": "Retour au pool"
    } : {
        "S+": "Rank S+",
        "S": "Rank S",
        "A": "Rank A",
        "B": "Rank B",
        "pool": "Reset to pool"
    });

    const activeList = state.CHARACTERS.length > 0 ? state.CHARACTERS : FALLBACK_CHARACTERS;
    const char = activeList.find(c => c.id === charId);
    if (!char) return;

    const locChar = getLocalizedChar(char);

    // Create popup dialog
    const menu = document.createElement("div");
    menu.className = "click-move-menu glass-panel";
    menu.style.position = "fixed";
    menu.style.top = "50%";
    menu.style.left = "50%";
    menu.style.transform = "translate(-50%, -50%)";
    menu.style.zIndex = "10000";
    menu.style.padding = "1.5rem";
    menu.style.boxShadow = "var(--shadow-panel)";
    menu.style.borderRadius = "12px";
    menu.style.background = "var(--bg-panel)";
    menu.style.border = "1px solid var(--border-glass)";
    menu.style.display = "flex";
    menu.style.flexDirection = "column";
    menu.style.gap = "0.8rem";

    menu.innerHTML = `
        <h4 style="margin-bottom: 0.4rem; color: var(--color-cyan); font-family: var(--font-heading);">${state.currentLang === 'uk' ? 'Перемістити' : (state.currentLang === 'fr' ? 'Déplacer' : 'Move')} ${locChar.name.split(" ")[0]}</h4>
        <div style="display: flex; flex-direction: column; gap: 0.5rem; width: 200px;">
            ${tiers.map(t => `<button class="btn btn-secondary btn-sm select-tier-btn" data-target="${t}">${names[t]}</button>`).join("")}
            <button class="btn btn-accent btn-sm mt-1 close-menu-btn">${state.currentLang === 'uk' ? 'Скасувати' : (state.currentLang === 'fr' ? 'Annuler' : 'Cancel')}</button>
        </div>
    `;

    document.body.appendChild(menu);

    // Blocking backdrop
    const bg = document.createElement("div");
    bg.style.position = "fixed";
    bg.style.inset = "0";
    bg.style.zIndex = "9999";
    bg.style.background = "rgba(0,0,0,0.5)";
    document.body.appendChild(bg);

    const close = () => {
        menu.remove();
        bg.remove();
    };

    bg.addEventListener("click", close);
    menu.querySelector(".close-menu-btn").addEventListener("click", close);
    menu.querySelectorAll(".select-tier-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const target = btn.getAttribute("data-target");
            moveCharInEditor(charId, target);
            close();
        });
    });
}

// Core editor moving logic
function moveCharInEditor(charId, targetTier) {
    // Find current tier
    let currentTier = null;
    Object.keys(state.editorState).forEach(t => {
        if (state.editorState[t].includes(charId)) currentTier = t;
    });

    if (currentTier === targetTier || !currentTier) return;

    // Remove from source
    state.editorState[currentTier] = state.editorState[currentTier].filter(id => id !== charId);

    // Add to target
    state.editorState[targetTier].push(charId);

    renderEditor();
}

// Save Custom Tier List to Firestore
async function saveUserTierlist() {
    const user = firebase.auth && firebase.auth().currentUser;
    if (!user) {
        showToast(i18n[state.currentLang].creator_auth_error || "Будь ласка, спочатку авторизуйтеся!");
        return;
    }

    const titleInput = document.getElementById("editorTitle");
    const title = (titleInput && titleInput.value.trim()) || (state.currentLang === 'uk' ? "Мій тір-ліст" : (state.currentLang === 'fr' ? "Ma Tier List" : "My Tier List"));

    // Count assigned characters
    const assignedCount = Object.keys(state.editorState).reduce((acc, tier) => {
        return acc + (tier !== "pool" ? state.editorState[tier].length : 0);
    }, 0);

    if (assignedCount === 0) {
        showToast(i18n[state.currentLang].creator_empty_error || "Будь ласка, розподіліть персонажів по рядах!");
        return;
    }

    try {
        const docData = {
            userId: user.uid,
            userName: user.displayName || (state.currentLang === 'uk' ? "Гість" : (state.currentLang === 'fr' ? "Invité" : "Guest")),
            userPhoto: user.photoURL || "",
            title: title,
            tiers: {
                "S+": state.editorState["S+"],
                "S": state.editorState["S"],
                "A": state.editorState["A"],
                "B": state.editorState["B"]
            },
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        if (!db) {
            showToast(i18n[state.currentLang].comm_db_unavailable || (state.currentLang === 'uk' ? "База даних Firestore недоступна!" : "Firestore database is unavailable!"));
            return;
        }

        await db.collection("userTierlists").add(docData);
        showToast(i18n[state.currentLang].toast_save_success || "Тір-ліст успішно опубліковано! 🎉");

        // Force switch to community tab
        const commBtn = document.querySelector('[data-sub-tab="community"]');
        if (commBtn) commBtn.click();
    } catch (e) {
        console.error("Save custom tierlist failed:", e);
        showToast((i18n[state.currentLang].toast_save_error || "Помилка збереження: ") + e.message);
    }
}

// Load community tier lists from Firestore

async function loadCommunityTierlists() {
    const container = document.getElementById("communityGrid");
    if (!container) return;

    container.innerHTML = `<div class="community-loading">${i18n[state.currentLang].comm_loading || "Завантаження..."}</div>`;

    if (!db) {
        container.innerHTML = `<div class="community-loading">${i18n[state.currentLang].comm_db_unavailable || "База даних недоступна."}</div>`;
        return;
    }

    try {
        const snapshot = await db.collection("userTierlists").orderBy("createdAt", "desc").limit(40).get();

        if (snapshot.empty) {
            container.innerHTML = `<div class="community-loading">${i18n[state.currentLang].comm_empty || "Немає збережених тір-лістів."}</div>`;
            return;
        }

        container.innerHTML = "";
        snapshot.docs.forEach(doc => {
            const data = doc.data();

            let dateStr = "Нещодавно";
            if (data.createdAt) {
                const dateObj = new Date(data.createdAt.seconds * 1000);
                dateStr = state.currentLang === 'uk'
                    ? dateObj.toLocaleDateString("uk-UA")
                    : (state.currentLang === 'fr' ? dateObj.toLocaleDateString("fr-FR") : dateObj.toLocaleDateString("en-US"));
            } else {
                dateStr = state.currentLang === 'uk' ? "Нещодавно" : (state.currentLang === 'fr' ? "Récemment" : "Recently");
            }

            const currentUser = firebase.auth && firebase.auth().currentUser;
            const isOwner = currentUser && currentUser.uid === data.userId;

            const card = document.createElement("div");
            card.className = "user-tierlist-card";
            card.innerHTML = `
                <h4 class="user-card-title">${data.title}</h4>
                <div class="user-card-meta">
                    <img src="${data.userPhoto || 'https://www.gstatic.com/images/branding/product/2x/avatar_anonymous_96dp.png'}" class="user-card-avatar" referrerpolicy="no-referrer" alt="${data.userName}">
                    <span class="user-card-author">${data.userName}</span>
                    <span class="user-card-date">${dateStr}</span>
                </div>
                <div class="user-card-actions" style="display: flex; gap: 0.5rem; width: 100%; margin-top: 0.5rem;">
                    <button class="btn btn-secondary btn-sm view-tierlist-btn" style="flex: 1;" data-id="${doc.id}">${i18n[state.currentLang].comm_view_btn || "Переглянути"}</button>
                    ${isOwner ? `<button class="btn btn-danger btn-sm delete-tierlist-btn" style="flex: 1;" data-id="${doc.id}">${i18n[state.currentLang].comm_delete_btn || "Видалити"}</button>` : ""}
                </div>
            `;

            card.querySelector(".view-tierlist-btn").addEventListener("click", () => {
                viewUserTierlist(data);
            });

            if (isOwner) {
                const deleteBtn = card.querySelector(".delete-tierlist-btn");
                if (deleteBtn) {
                    deleteBtn.addEventListener("click", async (e) => {
                        e.stopPropagation();
                        if (confirm(i18n[state.currentLang].comm_delete_confirm || "Ви впевнені?")) {
                            try {
                                deleteBtn.disabled = true;
                                deleteBtn.innerText = state.currentLang === 'uk' ? "Видалення..." : "Deleting...";
                                await db.collection("userTierlists").doc(doc.id).delete();
                                showToast(i18n[state.currentLang].comm_deleted_toast || "Тір-ліст видалено!");
                                loadCommunityTierlists();
                            } catch (err) {
                                console.error("Delete tierlist failed:", err);
                                showToast((i18n[state.currentLang].comm_delete_error || "Помилка: ") + err.message);
                                deleteBtn.disabled = false;
                                deleteBtn.innerText = i18n[state.currentLang].comm_delete_btn || "Видалити";
                            }
                        }
                    });
                }
            }

            container.appendChild(card);
        });
    } catch (e) {
        console.error("Load community lists failed:", e);
        container.innerHTML = `<div class="community-loading">${state.currentLang === 'uk' ? 'Помилка завантаження: ' : 'Load error: '}${e.message}</div>`;
    }
}

// Render raw avatar URL for view badges

function viewUserTierlist(data) {
    const modal = document.getElementById("userTierlistModalOverlay");
    const title = document.getElementById("viewTierlistTitle");
    const author = document.getElementById("viewTierlistAuthor");

    if (!modal || !title || !author) return;

    title.innerText = data.title;
    author.innerText = (state.currentLang === 'uk' ? "Автор: " : "Author: ") + data.userName;

    const tiers = ["S+", "S", "A", "B"];
    const activeList = state.CHARACTERS.length > 0 ? state.CHARACTERS : FALLBACK_CHARACTERS;

    tiers.forEach(tier => {
        const gridId = `viewGrid-${tier.replace("+", "-plus")}`;
        const grid = document.getElementById(gridId);
        if (!grid) return;

        grid.innerHTML = "";

        const charIds = data.tiers[tier] || [];
        if (charIds.length === 0) {
            grid.innerHTML = `<span style="font-size:0.75rem; color:var(--text-muted); opacity: 0.5;">${state.currentLang === 'uk' ? 'Порожньо' : (state.currentLang === 'fr' ? 'Vide' : 'Empty')}</span>`;
        } else {
            charIds.forEach(charId => {
                const char = activeList.find(c => c.id === charId);
                if (char) {
                    const locChar = getLocalizedChar(char);
                    const badge = document.createElement("div");
                    badge.className = "view-char-badge";

                    const avatarUrl = renderAvatarUrlOnly(char);
                    const avatarHtml = avatarUrl ? `<img src="${avatarUrl}" class="view-char-avatar" alt="${locChar.name}">` : '';

                    badge.innerHTML = `
                        ${avatarHtml}
                        <span class="view-char-name">${locChar.name.split(" ")[0]}</span>
                    `;
                    grid.appendChild(badge);
                }
            });
        }
    });

    modal.classList.add("active");
}



export { renderTierList, initTierlistEditor, renderEditor, createDraggableElement, openClickMoveMenu, moveCharInEditor, saveUserTierlist, loadCommunityTierlists, viewUserTierlist };
