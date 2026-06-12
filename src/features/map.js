import { state } from '../scripts/state.js';
import { nteMapData } from './nte-map-data.js';
import { CHARACTER_TRANSLATIONS } from '../localization/translations.js';

// ── LEAFLET MAP STATE ─────────────────────────────────────────────────────────
let map = null;
let tileLayers = [];
let markerLayers = {};
let enabledCategories = new Set([
    'fast-travel', 'taxi', 'oracle-stone', 'currencies', 'locker', 
    'collectible', 'stealable-loot', 'monsters', 'anomaly-vision', 'arc-locations'
]);

// ── LOCALIZATION STRINGS ──────────────────────────────────────────────────────
const STRINGS = {
    uk: {
        detail_title: 'Деталі об\'єкта',
        detail_placeholder: 'Оберіть будь-який маркер на карті, щоб побачити координати, зони дропу та необхідних персонажів.',
        coords_label: 'Координати',
        copy_coords: 'Копіювати телепорт',
        copy_success: 'Скопійовано!',
        drops_label: 'Матеріали для фарму:',
        chars_label: 'Потрібно для персонажів:',
        cost_label: 'Витрата Pixel:',
        region_label: 'Район',
        category_label: 'Категорія',
        show_all: 'Показати все',
        hide_all: 'Приховати все',
        weekly_badge: 'ТИЖНЕВИЙ БОС',
        boss_badge: 'БОС СВІТУ',
        regions: {
            'area-000': 'Сектор M10',
            'area-001': 'Мостові переходи',
            'area-002': 'Нечувані береги',
            'area-003': 'Місто ілюзій',
            'area-004': 'Район Мігеля',
            'area-005': 'Нью-Герланд'
        }
    },
    en: {
        detail_title: 'Object Details',
        detail_placeholder: 'Select any marker on the map to see coordinates, drop zones, and required characters.',
        coords_label: 'Coordinates',
        copy_coords: 'Copy Teleport',
        copy_success: 'Copied!',
        drops_label: 'Farming drops:',
        chars_label: 'Needed by characters:',
        cost_label: 'Pixel cost:',
        region_label: 'District',
        category_label: 'Category',
        show_all: 'Show All',
        hide_all: 'Hide All',
        weekly_badge: 'WEEKLY BOSS',
        boss_badge: 'WORLD BOSS',
        regions: {
            'area-000': 'Sector M10',
            'area-001': 'Bridge Crossings',
            'area-002': 'Unheard Shores',
            'area-003': 'Illusion Town',
            'area-004': 'Miguel District',
            'area-005': 'New Herland'
        }
    },
    fr: {
        detail_title: 'Détails de l\'objet',
        detail_placeholder: 'Sélectionnez un marqueur pour voir ses coordonnées, récompenses et personnages recommandés.',
        coords_label: 'Coordonnées',
        copy_coords: 'Copier les coordonnées',
        copy_success: 'Copié !',
        drops_label: 'Butin disponible :',
        chars_label: 'Nécessaire pour :',
        cost_label: 'Coût en Pixel :',
        region_label: 'Quartier',
        category_label: 'Catégorie',
        show_all: 'Tout afficher',
        hide_all: 'Tout masquer',
        weekly_badge: 'BOSS HEBDO',
        boss_badge: 'BOSS DE MONDE',
        regions: {
            'area-000': 'Secteur M10',
            'area-001': 'Ponts et Passages',
            'area-002': 'Rivages Inconnus',
            'area-003': 'Ville d\'Illusion',
            'area-004': 'Quartier Miguel',
            'area-005': 'New Herland'
        }
    }
};

// ── BOSS DROPS & CHARACTER SYNERGY DATABASE ──────────────────────────────────
const BOSS_METADATA = {
    'Boss_07_BP_WorldBoss': {
        drops: {
            uk: ['Confessional Flower Seed (Насіння квітки сповіді)'],
            en: ['Confessional Flower Seed'],
            fr: ['Confessional Flower Seed']
        },
        characters: ['hotori', 'skia', 'lacrimosa', 'chaos'],
        cost: 60,
        weekly: false
    },
    'Arachne': {
        drops: {
            uk: ['Dress Sleeves of Vanity (Рукава марнославства)', 'Crown Called Nobility (Корона благородства)', 'Scepter Called Prestige (Скіпетр престижу)'],
            en: ['Dress Sleeves of Vanity', 'Crown Called Nobility', 'Scepter Called Prestige'],
            fr: ['Manches de robe de vanité', 'Couronne de noblesse', 'Sceptre de prestige']
        },
        characters: ['hotori', 'daffodil', 'jiuyuan', 'adler', 'haniel', 'lacrimosa', 'fadia', 'chaos'],
        cost: 60,
        weekly: true
    },
    'Morphix': {
        drops: {
            uk: ['Good Boy Stamp (Печатка хорошого хлопчика)'],
            en: ['Good Boy Stamp'],
            fr: ['Sceau du bon garçon (Good Boy Stamp)']
        },
        characters: ['zero', 'sakiri', 'nanally', 'mint', 'skia', 'baicang', 'chiz', 'hathor', 'aurelia', 'edgar'],
        cost: 60,
        weekly: true
    },
    'boss_13_BP_WorldBoss': {
        drops: {
            uk: ['Charging Knight Spark Plug (Лицарська свічка запалювання)'],
            en: ['Charging Knight Spark Plug'],
            fr: ['Bougie d\'allumage du chevalier chargeant']
        },
        characters: ['hotori', 'zero', 'sakiri', 'daffodil'],
        cost: 60,
        weekly: false
    },
    'boss_09_BP_WorldBoss': {
        drops: {
            uk: ['A Page from Delusion\'s Shore (Сторінка з берега делюзій)'],
            en: ['A Page from Delusion\'s Shore'],
            fr: ['Une page du rivage de l\'illusion']
        },
        characters: ['nanally', 'mint'],
        cost: 60,
        weekly: false
    },
    'boss_19': {
        drops: {
            uk: ['Tear of the Sea (Сльоза моря)'],
            en: ['Tear of the Sea'],
            fr: ['Larme de la mer']
        },
        characters: ['jiuyuan', 'chiz'],
        cost: 60,
        weekly: false
    },
    'boss_8': {
        drops: {
            uk: ['Colorful Ticket Stub (Кольоровий корінець квитка)'],
            en: ['Colorful Ticket Stub'],
            fr: ['Talon de billet coloré']
        },
        characters: ['hathor', 'edgar'],
        cost: 60,
        weekly: false
    },
    'boss_33': {
        drops: {
            uk: ['Nest Guard Fragment (Фрагмент гніздового вартового)'],
            en: ['Nest Guard Fragment'],
            fr: ['Fragment de garde de nid']
        },
        characters: ['haniel', 'baicang', 'aurelia'],
        cost: 60,
        weekly: false
    },
    'boss_15': {
        drops: {
            uk: ['Water Moon Pick (Медіатор водяного місяця)'],
            en: ['Water Moon Pick'],
            fr: ['Médiator de lune d\'eau']
        },
        characters: ['adler', 'fadia'],
        cost: 60,
        weekly: false
    }
};

function getBossMetadata(m) {
    // Search by ID or title
    for (const key of Object.keys(BOSS_METADATA)) {
        if (m.id.toLowerCase().includes(key.toLowerCase()) || m.title.toLowerCase().includes(key.toLowerCase())) {
            return BOSS_METADATA[key];
        }
    }
    return null;
}

// ── LEAFLET INITIALIZATION ────────────────────────────────────────────────────
const imageCache = {};

function getTileImage(url, onLoad) {
    if (imageCache[url]) {
        if (imageCache[url].loaded) {
            onLoad(imageCache[url].img);
        } else {
            imageCache[url].listeners.push(onLoad);
        }
        return;
    }

    const img = new Image();
    imageCache[url] = {
        img: img,
        loaded: false,
        listeners: [onLoad]
    };
    
    img.onload = () => {
        imageCache[url].loaded = true;
        imageCache[url].listeners.forEach(cb => cb(img));
        imageCache[url].listeners = [];
    };
    img.onerror = () => {
        imageCache[url].loaded = true;
        imageCache[url].listeners = [];
    };
    img.src = url;
}

function updateVisibleMarkers() {
    if (!map) return;
    const bounds = map.getBounds().pad(0.15); // Pad bounds by 15% to preload markers near edges
    const zoom = map.getZoom();

    nteMapData.markers.forEach(marker => {
        const cat = marker.cat || 'unknown';
        
        // 1. If category is not enabled, hide the marker
        if (!enabledCategories.has(cat)) {
            if (marker.leafletMarker) {
                if (marker.leafletMarker.isPopupOpen()) {
                    return;
                }
                marker.leafletMarker.remove();
                marker.leafletMarker = null;
            }
            return;
        }

        // 2. Zoom-level threshold filters for high density categories
        let minZoomToShow = 1;
        if (cat === 'stealable-loot' || cat === 'monsters' || cat === 'collectible' || cat === 'currencies' || cat === 'locker') {
            minZoomToShow = 5;
        } else if (cat === 'oracle-stone') {
            minZoomToShow = 4;
        }

        if (zoom < minZoomToShow) {
            if (marker.leafletMarker) {
                if (marker.leafletMarker.isPopupOpen()) {
                    return;
                }
                marker.leafletMarker.remove();
                marker.leafletMarker = null;
            }
            return;
        }

        // 3. Viewport bounds filter
        const latLng = L.latLng(marker.y, marker.x);
        const isVisible = bounds.contains(latLng);

        if (isVisible) {
            if (!marker.leafletMarker) {
                const iconUrl = marker.icon || 'https://cdn-zeroluck-gg.b-cdn.net/nte/Assets/UI/UI/MiniMap/minimapicon/YH_UI_common_icon_1.png';
                const markerIcon = L.icon({
                    iconUrl: iconUrl,
                    iconSize: [28, 28],
                    iconAnchor: [14, 14],
                    popupAnchor: [0, -14],
                    className: `map-marker-${cat}`
                });

                const m = L.marker([marker.y, marker.x], { icon: markerIcon });
                m.bindPopup(`<strong class="map-popup-title">${marker.title}</strong>`);
                m.on('click', () => {
                    showMarkerDetail(marker);
                    map.panTo([marker.y, marker.x]);
                });
                
                const layer = markerLayers[cat];
                if (layer) {
                    m.addTo(layer);
                }
                marker.leafletMarker = m;
            } else {
                const layer = markerLayers[cat];
                if (layer && !map.hasLayer(marker.leafletMarker)) {
                    marker.leafletMarker.addTo(layer);
                }
            }
        } else {
            if (marker.leafletMarker) {
                if (marker.leafletMarker.isPopupOpen()) {
                    return;
                }
                marker.leafletMarker.remove();
                marker.leafletMarker = null;
            }
        }
    });
}

function initMap() {
    if (map) return;

    const container = document.getElementById('mapContainer');
    if (!container) return;
    container.innerHTML = ''; // Clear placeholder

    console.log('🗺️ Initializing Leaflet farming map...');

    // Define custom Coordinate Reference System matching game coordinates
    const gameCRS = L.extend({}, L.CRS.Simple, {
        transformation: new L.Transformation(
            0.01639272689169798, 
            664.4300719452101, 
            -0.01639272689169798, 
            2154.7637886060065
        )
    });

    // Create Map
    map = L.map('mapContainer', {
        crs: gameCRS,
        minZoom: 1,
        maxZoom: 8,
        zoomControl: true,
        attributionControl: false
    });

    // Center to frame the whole landmass at zoom 3
    map.setView([182, 289], 3);

    // Lock bounds to Hethereau map boundaries
    const bounds = L.latLngBounds(
        [-5632, -5632], // Southwest (yMin, xMin)
        [5632, 4864]    // Northeast (yMax, xMax)
    );
    map.setMaxBounds(bounds);

    // Custom dynamic GridLayer mapping to CDN tiles
    const NteGridLayer = L.GridLayer.extend({
        createTile: function(coords, done) {
            const tile = document.createElement('canvas');
            tile.width = 256;
            tile.height = 256;
            const ctx = tile.getContext('2d');

            if (!map) {
                setTimeout(() => done(null, tile), 0);
                return tile;
            }

            const nwLatLng = map.unproject(L.point(coords.x * 256, coords.y * 256), coords.z);
            const seLatLng = map.unproject(L.point((coords.x + 1) * 256, (coords.y + 1) * 256), coords.z);

            const minX = Math.min(nwLatLng.lng, seLatLng.lng);
            const maxX = Math.max(nwLatLng.lng, seLatLng.lng);
            const minY = Math.min(nwLatLng.lat, seLatLng.lat);
            const maxY = Math.max(nwLatLng.lat, seLatLng.lat);

            const overlapping = nteMapData.tiles.filter(t => {
                return t.bounds.minX < maxX && t.bounds.maxX > minX &&
                       t.bounds.minY < maxY && t.bounds.maxY > minY;
            });

            if (overlapping.length === 0) {
                setTimeout(() => done(null, tile), 0);
                return tile;
            }

            // Call done immediately so Leaflet rendering stays responsive
            setTimeout(() => done(null, tile), 0);

            overlapping.forEach(t => {
                const tileNumber = t.y * 44 + t.x;
                const paddedTileNumber = String(tileNumber).padStart(4, '0');
                const url = `https://cdn-zeroluck-gg.b-cdn.net/nte/Assets/UI/UI/MiniMap/bigworldmap/map_bigworld_1${paddedTileNumber}.png`;

                getTileImage(url, (img) => {
                    const tileTopLeft = map.project(L.latLng(t.bounds.maxY, t.bounds.minX), coords.z);
                    const tileBottomRight = map.project(L.latLng(t.bounds.minY, t.bounds.maxX), coords.z);

                    // Symmetrically expand coordinates and dimensions by a tiny fraction of a pixel to cover subpixel seams
                    const tileLeft = tileTopLeft.x - coords.x * 256 - 0.5;
                    const tileTop = tileTopLeft.y - coords.y * 256 - 0.5;
                    const tileWidth = tileBottomRight.x - tileTopLeft.x + 1.0;
                    const tileHeight = tileBottomRight.y - tileTopLeft.y + 1.0;

                    // Smooth rendering using high quality image smoothing
                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = 'high';
                    ctx.drawImage(img, tileLeft, tileTop, tileWidth, tileHeight);
                });
            });

            return tile;
        }
    });

    const tileLayer = new NteGridLayer({
        minZoom: 1,
        maxZoom: 8,
        tileSize: 256,
        noWrap: true,
        bounds: bounds
    });
    tileLayer.addTo(map);
    tileLayers.push(tileLayer);

    // Prepare category layer groups and add them to the map
    nteMapData.categories.forEach(cat => {
        markerLayers[cat.id] = L.layerGroup();
        markerLayers[cat.id].addTo(map);
    });

    // Setup viewport/zoom change event listeners
    map.on('moveend', updateVisibleMarkers);
    map.on('zoomend', updateVisibleMarkers);
    map.on('resize', updateVisibleMarkers);
    map.on('viewreset', updateVisibleMarkers);

    // Setup floating controls and sidebar toggles
    const layout = document.getElementById('mapLayout');
    const toggleBtn = document.getElementById('btnToggleSidebar');
    if (toggleBtn && layout) {
        toggleBtn.addEventListener('click', () => {
            layout.classList.toggle('sidebar-collapsed');
            setTimeout(() => {
                if (map) map.invalidateSize();
            }, 320); // Wait for transition
        });
    }

    const starBtn = document.getElementById('btnMapActionStar');
    if (starBtn) {
        starBtn.addEventListener('click', () => {
            const allActive = nteMapData.categories.every(c => enabledCategories.has(c.id));
            nteMapData.categories.forEach(c => {
                if (allActive) {
                    enabledCategories.delete(c.id);
                } else {
                    enabledCategories.add(c.id);
                }
            });
            renderFilters();
            updateVisibleMarkers();
        });
    }

    const statsBtn = document.getElementById('btnMapActionStats');
    if (statsBtn) {
        statsBtn.addEventListener('click', () => {
            if (window.switchTab) window.switchTab('tierlist');
        });
    }

    const sidebarShowAll = document.getElementById('btnSidebarShowAll');
    if (sidebarShowAll) {
        sidebarShowAll.addEventListener('click', () => {
            nteMapData.categories.forEach(c => {
                enabledCategories.add(c.id);
            });
            renderFilters();
            updateVisibleMarkers();
        });
    }

    const sidebarHideAll = document.getElementById('btnSidebarHideAll');
    if (sidebarHideAll) {
        sidebarHideAll.addEventListener('click', () => {
            nteMapData.categories.forEach(c => {
                enabledCategories.delete(c.id);
            });
            renderFilters();
            updateVisibleMarkers();
        });
    }

    // Initial map and controls render
    renderFilters();
    renderPlaceholder();
    updateVisibleMarkers();
}

// ── RENDER DYNAMIC COMPONENTS ─────────────────────────────────────────────────
function renderFilters() {
    const filterBar = document.getElementById('mapFilterBar');
    if (!filterBar) return;
    filterBar.innerHTML = '';

    const lang = state.currentLang || 'uk';

    // Category Toggles as Sidebar List Rows
    nteMapData.categories.forEach(cat => {
        const name = cat.name[lang] || cat.name.en || cat.id;
        const row = document.createElement('button');
        const active = enabledCategories.has(cat.id);
        row.className = `map-sidebar-filter-row ${active ? 'active' : ''}`;
        row.style.setProperty('--btn-color', cat.color);
        row.innerHTML = `<span class="map-sidebar-filter-icon">${cat.icon}</span> <span class="map-sidebar-filter-name">${name}</span>`;

        row.addEventListener('click', () => {
            if (enabledCategories.has(cat.id)) {
                enabledCategories.delete(cat.id);
                row.classList.remove('active');
            } else {
                enabledCategories.add(cat.id);
                row.classList.add('active');
            }
            updateVisibleMarkers();
        });
        filterBar.appendChild(row);
    });
}

function renderPlaceholder() {
    const panel = document.getElementById('mapDetailPanel');
    if (!panel) return;

    const lang = state.currentLang || 'uk';
    const s = STRINGS[lang] || STRINGS.en;

    panel.innerHTML = `
        <div class="map-detail-empty">
            <div class="map-detail-empty-icon">🗺️</div>
            <h4>${s.detail_title}</h4>
            <p>${s.detail_placeholder}</p>
        </div>
    `;
}

function showMarkerDetail(marker) {
    const panel = document.getElementById('mapDetailPanel');
    if (!panel) return;

    const lang = state.currentLang || 'uk';
    const s = STRINGS[lang] || STRINGS.en;

    const category = nteMapData.categories.find(c => c.id === marker.cat);
    const categoryName = category ? (category.name[lang] || category.name.en) : marker.cat;
    const regionName = s.regions[marker.reg] || marker.reg || 'Hethereau';

    // Teleport Command copy helper
    const tpCommand = `/tp ${Math.round(marker.x)} ${Math.round(marker.y)}`;

    // Boss custom drops checking
    const bossMeta = getBossMetadata(marker);
    let bossSectionHtml = '';
    
    if (bossMeta) {
        const bossDrops = bossMeta.drops[lang] || bossMeta.drops.en || [];
        const dropsHtml = bossDrops.map(d => `<li>${d}</li>`).join('');
        
        let charsHtml = '';
        if (bossMeta.characters && bossMeta.characters.length > 0) {
            const charTags = bossMeta.characters.map(charKey => {
                const charData = CHARACTER_TRANSLATIONS[charKey]?.[lang];
                const charName = charData ? charData.name : (charKey.charAt(0).toUpperCase() + charKey.slice(1));
                return `<span class="map-char-tag" data-char="${charKey}">${charName}</span>`;
            }).join('');
            
            charsHtml = `
                <div class="map-detail-section">
                    <h5>${s.chars_label}</h5>
                    <div class="map-char-tags">${charTags}</div>
                </div>
            `;
        }

        const badgeText = bossMeta.weekly ? s.weekly_badge : s.boss_badge;
        const badgeClass = bossMeta.weekly ? 'map-badge-weekly' : 'map-badge-boss';
        const pixelText = bossMeta.cost > 0 ? `${bossMeta.cost} Pixel` : 'Free';

        bossSectionHtml = `
            <div class="map-boss-details">
                <div class="map-detail-header-row">
                    <span class="map-badge ${badgeClass}">${badgeText}</span>
                    <span class="map-badge map-badge-cost">⚡ ${s.cost_label} ${pixelText}</span>
                </div>
                <div class="map-detail-section">
                    <h5>${s.drops_label}</h5>
                    <ul class="map-drops-list">${dropsHtml}</ul>
                </div>
                ${charsHtml}
            </div>
        `;
    } else {
        // Generic descriptions for other categories
        let genericDesc = '';
        if (marker.cat === 'fast-travel') {
            genericDesc = lang === 'uk' ? 'Вежа Вертаймера або телефонна будка для швидкого переміщення містом.' :
                          lang === 'fr' ? 'Tour Wertheimer ou cabine téléphonique pour le voyage rapide.' :
                          'Wertheimer Tower or telephone booth for quick teleportation.';
        } else if (marker.cat === 'taxi') {
            genericDesc = lang === 'uk' ? 'Зупинка таксі для швидкого пересування між районами.' :
                          lang === 'fr' ? 'Arrêt de taxi pour le voyage rapide.' :
                          'Taxi stop for fast travel between districts.';
        } else if (marker.cat === 'oracle-stone') {
            genericDesc = lang === 'uk' ? 'Цінний колекційний камінь оракула для підвищення рівня дослідження та обміну.' :
                          lang === 'fr' ? 'Pierre d\'oracle précieuse pour le niveau d\'exploration.' :
                          'Valuable collectible Oracle Stone for exploration progression.';
        } else if (marker.cat === 'currencies') {
            genericDesc = lang === 'uk' ? 'Скриня з валютою, що містить фонси або інші корисні предмети.' :
                          lang === 'fr' ? 'Coffre contenant des Fons ou autres ressources utiles.' :
                          'Currency chest containing Fons or other useful resources.';
        } else if (marker.cat === 'locker') {
            genericDesc = lang === 'uk' ? 'Шафка або сховище з ресурсами та матеріалами.' :
                          lang === 'fr' ? 'Casier ou coffre de stockage avec des ressources.' :
                          'Storage cabinet or locker containing useful resources.';
        } else if (marker.cat === 'stealable-loot') {
            genericDesc = lang === 'uk' ? 'Контейнер або предмет на вулиці, з яким можна взаємодіяти для збору луту.' :
                          lang === 'fr' ? 'Conteneur interactif dans la rue pour ramasser du butin.' :
                          'Interactive container or item on the street to pick up loot.';
        } else if (marker.cat === 'collectible') {
            genericDesc = lang === 'uk' ? 'Регіональна дивина або визначна локація для колекціонування.' :
                          lang === 'fr' ? 'Spécialité régionale ou point d\'intérêt.' :
                          'Regional specialty item or point of interest.';
        } else if (marker.cat === 'arc-locations') {
            genericDesc = lang === 'uk' ? 'Кресленик або локація випадіння креслеників астральної зброї (Arc).' :
                          lang === 'fr' ? 'Plan ou localisation d\'obtention d\'armes Arcs.' :
                          'Weapon blueprint location for crafting specialized Arcs.';
        }

        if (genericDesc) {
            bossSectionHtml = `
                <div class="map-detail-section map-generic-description">
                    <p>${genericDesc}</p>
                </div>
            `;
        }
    }

    panel.innerHTML = `
        <div class="map-detail-content">
            <div class="map-detail-header">
                <h4>${marker.title}</h4>
                <div class="map-detail-meta-tags">
                    <span class="map-meta-tag"><span class="tag-icon">📍</span> ${regionName}</span>
                    <span class="map-meta-tag"><span class="tag-icon">🏷️</span> ${categoryName}</span>
                </div>
            </div>

            <div class="map-detail-coords">
                <div class="coords-info">
                    <span class="coords-title">${s.coords_label}</span>
                    <strong class="coords-text">X: ${Math.round(marker.x)} , Y: ${Math.round(marker.y)}</strong>
                </div>
                <button class="map-copy-coords-btn" id="btnCopyCoords" data-cmd="${tpCommand}">
                    <span class="copy-icon">📋</span>
                    <span class="copy-text">${s.copy_coords}</span>
                </button>
            </div>

            ${bossSectionHtml}
        </div>
    `;

    // Hook up copy coordinates event listener
    const copyBtn = document.getElementById('btnCopyCoords');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const cmd = copyBtn.getAttribute('data-cmd');
            navigator.clipboard.writeText(cmd).then(() => {
                const textEl = copyBtn.querySelector('.copy-text');
                const origText = textEl.textContent;
                textEl.textContent = s.copy_success;
                copyBtn.classList.add('success');
                setTimeout(() => {
                    textEl.textContent = origText;
                    copyBtn.classList.remove('success');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy coordinates:', err);
            });
        });
    }

    // Hook up character tags to open builds modal if clicked
    document.querySelectorAll('.map-char-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            const charId = tag.getAttribute('data-char');
            if (window.openCharacterModal) {
                window.openCharacterModal(charId);
            }
        });
    });
}

// ── TAB INTERFACE INTEGRATION ─────────────────────────────────────────────────
function renderMap() {
    // Re-render filters and placeholders according to current language
    renderFilters();
    if (map) {
        // Clear existing markers so they recreate with updated language titles
        nteMapData.markers.forEach(marker => {
            if (marker.leafletMarker) {
                if (marker.leafletMarker.isPopupOpen()) {
                    marker.leafletMarker.setPopupContent(`<strong class="map-popup-title">${marker.title}</strong>`);
                    return;
                }
                marker.leafletMarker.remove();
                marker.leafletMarker = null;
            }
        });
        updateVisibleMarkers();
        renderPlaceholder();
    }
}

function setupMapEvents() {
    // No-op now since Leaflet controls are handled dynamically or by click delegation
}

function onMapTabActive() {
    // Initialize map if not yet done
    if (!map) {
        initMap();
    } else {
        // Redraw sizes since Leaflet containers calculate size based on display
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    }
}

export { renderMap, setupMapEvents, onMapTabActive };
