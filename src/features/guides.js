import { state } from '../scripts/state.js';
import { FALLBACK_CHARACTERS } from '../utils/fallbackData.js';
import { FALLBACK_GUIDES } from '../utils/fallbackGuides.js';
import { renderAvatarHtml, renderAvatarUrlOnly } from '../utils/helpers.js';
import { getLocalizedChar } from '../localization/i18n.js';
import { i18n } from '../localization/translations.js';
import { openCharacterModal } from './builds.js';
import { setupTeamBuilder } from './teambuilder.js';

// GUIDES FEATURE HUB
function initGuides() {
    // 1. Bind search input
    const searchInput = document.getElementById("guidesSearchInput");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            state.guideSearchQuery = e.target.value.toLowerCase().trim();
            renderGuidesGrid();
        });
    }

    // 2. Bind filter buttons
    const filterBtns = document.querySelectorAll("#guidesFilters .filter-btn");
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            state.activeGuideFilter = btn.getAttribute("data-category");
            
            // Toggle Team builder sub-toolbar visibility
            const teamToggleRow = document.getElementById("teamGuidesToggleRow");
            const customBuilderWrapper = document.getElementById("customTeamBuilderWrapper");
            
            if (state.activeGuideFilter === "teams") {
                if (teamToggleRow) teamToggleRow.classList.remove("hidden");
                // Reset view mode to presets by default
                showTeamViewMode("presets");
            } else {
                if (teamToggleRow) teamToggleRow.classList.add("hidden");
                if (customBuilderWrapper) customBuilderWrapper.classList.add("hidden");
            }

            renderGuidesGrid();
        });
    });

    // 3. Bind Teams sub-toolbar toggle
    const btnShowTeamPresets = document.getElementById("btnShowTeamPresets");
    const btnShowCustomBuilder = document.getElementById("btnShowCustomBuilder");

    if (btnShowTeamPresets && btnShowCustomBuilder) {
        btnShowTeamPresets.addEventListener("click", () => showTeamViewMode("presets"));
        btnShowCustomBuilder.addEventListener("click", () => showTeamViewMode("builder"));
    }

    // 4. Bind guide modal close events
    const guideModal = document.getElementById("guideModalOverlay");
    const closeBtn = document.getElementById("guideModalCloseBtn");
    if (closeBtn && guideModal) {
        closeBtn.addEventListener("click", closeGuideDetailModal);
        guideModal.addEventListener("click", (e) => {
            if (e.target.id === "guideModalOverlay") {
                closeGuideDetailModal();
            }
        });
    }
    
    // Expose globally so realtime updates can re-render
    window.renderGuides = renderGuides;

    // Initial render
    renderGuides();
}

function showTeamViewMode(mode) {
    const btnShowTeamPresets = document.getElementById("btnShowTeamPresets");
    const btnShowCustomBuilder = document.getElementById("btnShowCustomBuilder");
    const customBuilderWrapper = document.getElementById("customTeamBuilderWrapper");
    const guidesGrid = document.getElementById("guidesGridNew");

    if (mode === "presets") {
        if (btnShowTeamPresets) btnShowTeamPresets.classList.add("active");
        if (btnShowCustomBuilder) btnShowCustomBuilder.classList.remove("active");
        if (customBuilderWrapper) customBuilderWrapper.classList.add("hidden");
        if (guidesGrid) guidesGrid.classList.remove("hidden");
    } else {
        if (btnShowTeamPresets) btnShowTeamPresets.classList.remove("active");
        if (btnShowCustomBuilder) btnShowCustomBuilder.classList.add("active");
        if (customBuilderWrapper) customBuilderWrapper.classList.remove("hidden");
        if (guidesGrid) guidesGrid.classList.add("hidden");
        
        // Re-initialize squad builder layouts
        setupTeamBuilder();
    }
}

function renderGuides() {
    renderFeaturedBanner();
    renderGuidesGrid();
}

function renderFeaturedBanner() {
    const bannerContainer = document.getElementById("featuredGuidesBanner");
    if (!bannerContainer) return;

    const activeGuides = state.GUIDES.length > 0 ? state.GUIDES : FALLBACK_GUIDES;
    const featured = activeGuides.find(g => g.isFeatured);

    if (!featured) {
        bannerContainer.style.display = "none";
        return;
    }

    bannerContainer.style.display = "flex";
    const title = state.currentLang === "uk" ? featured.title : featured.titleEn;
    const desc = state.currentLang === "uk" ? featured.description : featured.descriptionEn;
    const btnText = i18n[state.currentLang].guides_read_btn;
    const badgeText = i18n[state.currentLang].guides_filter_featured;

    bannerContainer.innerHTML = `
        <div class="featured-badge">${badgeText}</div>
        <h3 class="featured-title">${title}</h3>
        <p class="featured-desc">${desc}</p>
        <div class="featured-actions">
            <button class="btn btn-primary" id="btnFeaturedOpen">${btnText} ➔</button>
        </div>
    `;

    document.getElementById("btnFeaturedOpen").addEventListener("click", () => {
        openGuideDetailModal(featured);
    });
}

function renderGuidesGrid() {
    const grid = document.getElementById("guidesGridNew");
    if (!grid) return;
    grid.innerHTML = "";

    const activeGuides = state.GUIDES.length > 0 ? state.GUIDES : FALLBACK_GUIDES;
    const activeChars = state.CHARACTERS.length > 0 ? state.CHARACTERS : FALLBACK_CHARACTERS;
    const query = state.guideSearchQuery;

    // 1. Gather all raw Guides
    let filteredGuides = activeGuides.filter(g => {
        const title = (state.currentLang === "uk" ? g.title : g.titleEn).toLowerCase();
        const desc = (state.currentLang === "uk" ? g.description : g.descriptionEn).toLowerCase();
        const tags = (state.currentLang === "uk" ? g.tags : g.tagsEn).join(" ").toLowerCase();
        
        // Search filter
        const matchesSearch = !query || title.includes(query) || desc.includes(query) || tags.includes(query);
        
        // Category filter
        const matchesCategory = state.activeGuideFilter === "all" || 
                                (state.activeGuideFilter === "featured" && g.isFeatured) || 
                                g.category === state.activeGuideFilter;
                                
        return matchesSearch && matchesCategory;
    });

    // 2. If 'builds' or 'all' filter is active, inject Character Profiles as Builds
    let characterBuildCards = [];
    if (state.activeGuideFilter === "all" || state.activeGuideFilter === "builds") {
        characterBuildCards = activeChars.filter(c => {
            const locC = getLocalizedChar(c);
            const title = (state.currentLang === "uk" ? `Гайд на білд: ${locC.name}` : `Character Build: ${locC.name}`).toLowerCase();
            const desc = (locC.summary || "").toLowerCase();
            const tags = `${locC.role} ${locC.attribute} F2P Build Meta`.toLowerCase();

            return !query || title.includes(query) || desc.includes(query) || tags.includes(query);
        }).map(c => {
            const locC = getLocalizedChar(c);
            const isMeta = c.tier === "S+" || c.tier === "S";
            return {
                id: `build-${c.id}`,
                isCharacterBuild: true,
                charId: c.id,
                title: state.currentLang === "uk" ? `Білди та напарники: ${locC.name}` : `Build Guide: ${locC.name}`,
                description: locC.summary || (state.currentLang === "uk" ? "Повний аналіз характеристик, зброї та картриджів." : "Full analysis of stats, weapons, and cartridge configurations."),
                category: "builds",
                difficulty: c.rarity === 5 ? "Medium" : "Easy",
                updateDate: "2026-05-24",
                tags: [locC.attribute, locC.role, isMeta ? "Meta" : "F2P"],
                avatarUrl: renderAvatarUrlOnly(c) || "👤",
                charRef: c
            };
        });
    }

    // Combine all list items
    const combined = [...filteredGuides, ...characterBuildCards];

    if (combined.length === 0) {
        grid.innerHTML = `<div class="widget-loading" style="grid-column: 1/-1;">${state.currentLang === 'uk' ? 'Гайди не знайдено.' : 'No guides found.'}</div>`;
        return;
    }

    combined.forEach(item => {
        const card = document.createElement("div");
        card.className = `guide-card-new ${item.isFeatured ? "featured-card" : ""}`;

        const isNew = isRecentlyUpdated(item.updateDate);
        const newBadge = isNew ? `<span class="guide-badge-new">${i18n[state.currentLang].guides_recently_updated}</span>` : "";

        const categoryLabel = i18n[state.currentLang][`guides_filter_${item.category}`] || item.category;
        const readBtnLabel = item.isCharacterBuild 
            ? (state.currentLang === "uk" ? "Дивитись білд" : "View Build") 
            : i18n[state.currentLang].guides_read_btn;

        const title = item.isCharacterBuild ? item.title : (state.currentLang === "uk" ? item.title : item.titleEn);
        const description = item.isCharacterBuild ? item.description : (state.currentLang === "uk" ? item.description : item.descriptionEn);
        const activeTags = item.isCharacterBuild ? item.tags : (state.currentLang === "uk" ? item.tags : item.tagsEn || item.tags);

        const tagsHtml = activeTags.map(tag => {
            const lowTag = tag.toLowerCase();
            const specialClass = lowTag === "meta" || lowTag === "s-tier" ? "tag-meta" 
                               : lowTag === "beginner" || lowTag === "progression" ? "tag-beginner" 
                               : lowTag === "f2p" ? "tag-f2p" : "";
            return `<span class="guide-tag ${specialClass}">${tag}</span>`;
        }).join("");

        const difficultyValText = i18n[state.currentLang][`guides_difficulty_${(item.difficulty || "easy").toLowerCase()}`] || item.difficulty;
        const difficultyClass = (item.difficulty || "easy").toLowerCase();

        // Header avatar rendering
        let avatarHtml = "";
        if (item.isCharacterBuild) {
            avatarHtml = item.avatarUrl.length > 2 
                ? `<img src="${item.avatarUrl}" alt="${title}">` 
                : `<span class="guide-avatar-emoji">${item.avatarUrl}</span>`;
        } else {
            avatarHtml = `<span class="guide-avatar-emoji">${item.avatar || "📖"}</span>`;
        }

        card.innerHTML = `
            <div class="guide-card-header-new">
                <div class="guide-card-avatar">${avatarHtml}</div>
                <div class="guide-card-header-text">
                    <div class="guide-card-category">${categoryLabel}</div>
                    <h3>${title}</h3>
                </div>
            </div>
            <div class="guide-card-body-new">
                <p class="guide-card-desc">${description}</p>
                <div class="guide-tags">${tagsHtml}</div>
                <div class="guide-meta-row">
                    <span class="guide-difficulty">
                        ${i18n[state.currentLang].guides_difficulty_label} 
                        <span class="difficulty-val ${difficultyClass}">${difficultyValText}</span>
                    </span>
                    <span class="guide-date">${newBadge} ${item.updateDate}</span>
                </div>
                <button class="btn btn-secondary guide-read-btn" id="btnOpen-${item.id}">${readBtnLabel} ➔</button>
            </div>
        `;

        grid.appendChild(card);

        // Bind button actions
        document.getElementById(`btnOpen-${item.id}`).addEventListener("click", () => {
            if (item.isCharacterBuild) {
                openCharacterModal(item.charId);
            } else {
                openGuideDetailModal(item);
            }
        });
    });
}

function openGuideDetailModal(guide) {
    const modal = document.getElementById("guideModalOverlay");
    const container = document.getElementById("guideModalDetail");
    if (!modal || !container) return;

    const title = state.currentLang === "uk" ? guide.title : guide.titleEn;
    const desc = state.currentLang === "uk" ? guide.description : guide.descriptionEn;
    const categoryLabel = i18n[state.currentLang][`guides_filter_${guide.category}`] || guide.category;
    const difficultyValText = i18n[state.currentLang][`guides_difficulty_${(guide.difficulty || "easy").toLowerCase()}`] || guide.difficulty;
    const difficultyClass = (guide.difficulty || "easy").toLowerCase();

    // Sections parsing
    const sections = guide.content.sections || [];
    const sectionsHtml = sections.map(sec => {
        const secTitle = state.currentLang === "uk" ? sec.title : sec.titleEn;
        const secText = state.currentLang === "uk" ? sec.text : sec.textEn;
        return `
            <div class="guide-detail-section">
                <h4>${secTitle}</h4>
                <p>${secText}</p>
            </div>
        `;
    }).join("");

    // Recommended Teams avatars
    let recommendedTeamsHtml = "";
    const recTeamIds = guide.recommendedTeams || [];
    if (recTeamIds.length > 0) {
        const activeChars = state.CHARACTERS.length > 0 ? state.CHARACTERS : FALLBACK_CHARACTERS;
        const members = recTeamIds.map(id => activeChars.find(c => c.id === id)).filter(Boolean);
        
        const avatars = members.map(m => {
            const locM = getLocalizedChar(m);
            return `
                <div class="select-card" style="width: 80px; padding: 0.4rem;" onclick="window.openCharacterModal('${m.id}')">
                    <div class="select-card-avatar rarity-${m.rarity}" style="width: 40px; height: 40px; font-size: 1.1rem;">${renderAvatarHtml(locM)}</div>
                    <div class="select-card-name" style="font-size: 0.65rem;">${locM.name.split(" ")[0]}</div>
                </div>
            `;
        }).join("");

        recommendedTeamsHtml = `
            <div class="guide-detail-block">
                <span class="guide-detail-block-title">${i18n[state.currentLang].guides_recommended_teams}</span>
                <div style="display: flex; gap: 0.8rem; flex-wrap: wrap;">${avatars}</div>
            </div>
        `;
    }

    // Progression Tips
    let tipsHtml = "";
    const tipsList = state.currentLang === "uk" ? guide.progressionTips : guide.progressionTipsEn;
    if (tipsList && tipsList.length > 0) {
        const listItems = tipsList.map(tip => `<li>${tip}</li>`).join("");
        tipsHtml = `
            <div class="guide-detail-block" style="margin-top: 0.5rem;">
                <span class="guide-detail-block-title">${i18n[state.currentLang].guides_progression_tips}</span>
                <ul class="guide-detail-list">${listItems}</ul>
            </div>
        `;
    }

    // Reference links
    let referencesHtml = "";
    const refs = guide.references || [];
    if (refs.length > 0) {
        const links = refs.map(ref => `
            <a href="${ref}" target="_blank" rel="noopener noreferrer" class="guide-ref-link">◈ ${ref.replace("https://", "")}</a>
        `).join("");
        referencesHtml = `
            <div class="guide-references">
                <strong style="color:#fff;">${i18n[state.currentLang].guides_references_title}</strong>
                ${links}
            </div>
        `;
    }

    container.innerHTML = `
        <div class="guide-detail-header">
            <div class="guide-detail-meta">
                <span class="badge" style="background: rgba(0,242,254,0.1); border-color: rgba(0,242,254,0.3); color: var(--color-cyan);">${categoryLabel}</span>
                <span>${i18n[state.currentLang].guides_difficulty_label} <span class="difficulty-val ${difficultyClass}">${difficultyValText}</span></span>
                <span>${i18n[state.currentLang].guides_updated_label} ${guide.updateDate}</span>
            </div>
            <h2 class="guide-detail-title">${title}</h2>
            <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.5; font-style: italic;">${desc}</p>
        </div>
        <div class="guide-detail-body">
            ${sectionsHtml}
            ${recommendedTeamsHtml}
            ${tipsHtml}
            ${referencesHtml}
        </div>
    `;

    modal.classList.add("active");
}

function closeGuideDetailModal() {
    const modal = document.getElementById("guideModalOverlay");
    if (modal) modal.classList.remove("active");
}

function isRecentlyUpdated(dateStr) {
    if (!dateStr) return false;
    const uDate = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now - uDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 14;
}

export { initGuides, renderGuides, renderGuidesGrid, openGuideDetailModal, closeGuideDetailModal };
