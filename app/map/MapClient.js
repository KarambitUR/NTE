'use client';

import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useApp } from '../providers';
import { nteMapData } from '../../src/features/nte-map-data';

export default function MapClient() {
  const { lang } = useApp();
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markerGroupRef = useRef(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [currentZoom, setCurrentZoom] = useState(3);
  const [visibleCount, setVisibleCount] = useState(0);

  // Default: Clean view with fast travel, taxi and authentic flagship landmarks (avoids 2000+ marker blob)
  const [enabledCategories, setEnabledCategories] = useState(
    new Set(['fast-travel', 'special-poi', 'v14-poi', 'taxi'])
  );

  const enabledCategoriesRef = useRef(enabledCategories);

  useEffect(() => {
    enabledCategoriesRef.current = enabledCategories;
  }, [enabledCategories]);

  const categories = nteMapData.categories;

  // Authentic in-game regions for instant tactical navigation
  const REGIONS = [
    { id: 'hetero-center', icon: '🏙️', name: { uk: 'Центр Гетеро', en: 'Hethereau Center', fr: 'Centre Hethereau' }, y: 182, x: 289, zoom: 4 },
    { id: 'duskmoor-caldera', icon: '🌋', name: { uk: 'Даскмур: Кратер (v1.3)', en: 'Duskmoor: Caldera (v1.3)', fr: 'Duskmoor Caldéra (v1.3)' }, y: 4966, x: -3046, zoom: 4 },
    { id: 'puka-island', icon: '🎡', name: { uk: 'Острів Пукаленд (v1.4)', en: 'Pukaland Island (v1.4)', fr: 'Île Pukaland (v1.4)' }, y: -565, x: 2214, zoom: 4 },
    { id: 'witch-domain', icon: '🔮', name: { uk: 'Дім Відьми (Блекберд)', en: "The Witch's House", fr: 'Manoir Sorcière' }, y: -695.36, x: -987.96, zoom: 5 },
    { id: 'eibon-hq', icon: '🌆', name: { uk: 'Крамниця Eibon', en: 'Eibon Shop', fr: 'Boutique Eibon' }, y: -354.14, x: -819.11, zoom: 5 },
    { id: 'heist-abyss', icon: '💎', name: { uk: 'Рейд Аномалій & Безодня', en: 'Anomaly Raid & Abyss', fr: 'Raid Anomalie' }, y: 2432.09, x: 127.17, zoom: 5 },
    { id: 'illusions', icon: '⛩️', name: { uk: 'Місто Ілюзій', en: 'Illusion Town', fr: 'Ville Illusions' }, y: 414, x: -1705, zoom: 4 },
    { id: 'bridges', icon: '🌉', name: { uk: 'Мостові Переходи', en: 'Bridge Crossings', fr: 'Ponts' }, y: -544, x: -1164, zoom: 4 },
    { id: 'southern-island', icon: '🌊', name: { uk: 'Південний Архіпелаг', en: 'Southern Archipelago', fr: 'Archipel Sud' }, y: -3650, x: -3650, zoom: 4 },
  ];

  // Function to render markers based on zoom and active categories
  const updateMarkerVisibility = () => {
    if (!leafletMapRef.current || !markerGroupRef.current) return;

    const map = leafletMapRef.current;
    const markerGroup = markerGroupRef.current;
    const zoom = map.getZoom();
    setCurrentZoom(zoom);

    markerGroup.clearLayers();

    const currentEnabled = enabledCategoriesRef.current;
    let renderedCount = 0;

    nteMapData.markers.forEach((marker) => {
      const cat = marker.cat || 'unknown';
      if (!currentEnabled.has(cat)) return;

      // Hierarchical zoom thresholds to prevent map clutter and lag
      let minZoom = 2;
      if (['stealable-loot', 'currencies', 'locker', 'collectible'].includes(cat)) {
        minZoom = 5;
      } else if (cat === 'oracle-stone' || cat === 'taxi') {
        minZoom = 4;
      } else if (['monsters', 'arc-locations', 'anomaly-vision'].includes(cat)) {
        minZoom = 3;
      }

      if (zoom < minZoom) return;

      renderedCount++;

      // Custom pulsing neon badge for special landmarks & v1.4 POIs
      if (cat === 'special-poi' || cat === 'v14-poi') {
        const emoji = marker.emoji || '⭐';
        const customDivIcon = L.divIcon({
          className: 'v14-map-pin',
          html: `
            <div style="
              position: relative;
              width: 38px;
              height: 38px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              background: radial-gradient(circle, rgba(255, 0, 128, 0.95) 0%, rgba(120, 20, 220, 0.95) 100%);
              border: 2px solid #ffffff;
              box-shadow: 0 0 15px rgba(255, 0, 128, 0.8), 0 0 25px rgba(0, 229, 255, 0.5);
              font-size: 18px;
              cursor: pointer;
              transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            ">
              <span>${emoji}</span>
            </div>
          `,
          iconSize: [38, 38],
          iconAnchor: [19, 19],
          popupAnchor: [0, -20],
        });

        const m = L.marker([marker.y, marker.x], { icon: customDivIcon });
        m.bindPopup(`
          <div style="font-family: system-ui, sans-serif; min-width: 200px; padding: 4px; color: #fff;">
            <div style="font-size: 10px; font-weight: 700; color: #ff007f; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px;">★ Patch 1.4 Landmark</div>
            <strong style="display: block; font-size: 14px; margin-bottom: 6px; color: #fff;">${marker.title}</strong>
            ${marker.desc ? `<p style="font-size: 12px; color: #cbd5e1; margin: 0 0 6px 0; line-height: 1.4;">${marker.desc}</p>` : ''}
            <div style="font-size: 11px; color: #94a3b8; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 4px;">
              X: ${marker.x.toFixed(0)} | Y: ${marker.y.toFixed(0)}
            </div>
          </div>
        `);
        m.on('click', () => setSelectedMarker(marker));
        markerGroup.addLayer(m);
        return;
      }

      // Standard markers
      let iconUrl = marker.icon || 'https://cdn-zeroluck-gg.b-cdn.net/nte/Assets/UI/UI/MiniMap/minimapicon/Normal/small/YH_UI_Mapicon_098.png';
      if (!iconUrl.startsWith('http://') && !iconUrl.startsWith('https://')) {
        iconUrl = 'https://cdn-zeroluck-gg.b-cdn.net/nte/Assets/UI/UI/MiniMap/minimapicon/Normal/small/YH_UI_Mapicon_098.png';
      }

      const customIcon = L.icon({
        iconUrl: iconUrl,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -14],
      });

      const m = L.marker([marker.y, marker.x], { icon: customIcon });
      m.bindPopup(`
        <div style="font-family: system-ui, sans-serif; min-width: 160px; padding: 4px; color: #fff;">
          <strong style="display: block; font-size: 13px; margin-bottom: 4px; color: #fff;">${marker.title}</strong>
          <span style="font-size: 11px; color: #94a3b8;">X: ${marker.x.toFixed(0)} | Y: ${marker.y.toFixed(0)}</span>
        </div>
      `);
      m.on('click', () => setSelectedMarker(marker));
      markerGroup.addLayer(m);
    });

    setVisibleCount(renderedCount);
  };

  // Initialize Leaflet map ONCE on mount
  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    // Custom CRS matching game coordinates
    const gameCRS = L.extend({}, L.CRS.Simple, {
      transformation: new L.Transformation(
        0.01639272689169798,
        664.4300719452101,
        -0.01639272689169798,
        2154.7637886060065
      ),
    });

    const map = L.map(mapRef.current, {
      crs: gameCRS,
      minZoom: 2,
      maxZoom: 8,
      zoomControl: true,
      attributionControl: false,
    });

    leafletMapRef.current = map;
    map.setView([182, 289], 3);

    const bounds = L.latLngBounds([-6000, -6500], [8600, 7800]);
    map.setMaxBounds(bounds);

    // High-resolution full world map layer (includes 1.3 Duskmoor crater & Pukaland island)
    const fullWorldBounds = [
      [-5696.7, -6129.3],
      [8399.7, 7563.9]
    ];
    const worldOverlay = L.imageOverlay(
      '/src/assets/nte_world_map_v14.png',
      fullWorldBounds,
      {
        opacity: 0.98,
        interactive: false,
        zIndex: 1,
      }
    );
    worldOverlay.addTo(map);

    // Custom dynamic GridLayer mapping to CDN tiles
    const NteGridLayer = L.GridLayer.extend({
      createTile: function (coords, done) {
        const tile = document.createElement('canvas');
        tile.width = 256;
        tile.height = 256;
        const ctx = tile.getContext('2d');

        const nwLatLng = map.unproject(L.point(coords.x * 256, coords.y * 256), coords.z);
        const seLatLng = map.unproject(L.point((coords.x + 1) * 256, (coords.y + 1) * 256), coords.z);

        const minX = Math.min(nwLatLng.lng, seLatLng.lng);
        const maxX = Math.max(nwLatLng.lng, seLatLng.lng);
        const minY = Math.min(nwLatLng.lat, seLatLng.lat);
        const maxY = Math.max(nwLatLng.lat, seLatLng.lat);

        const overlapping = nteMapData.tiles.filter((t) => {
          return t.bounds.minX < maxX && t.bounds.maxX > minX && t.bounds.minY < maxY && t.bounds.maxY > minY;
        });

        if (overlapping.length === 0) {
          setTimeout(() => done(null, tile), 0);
          return tile;
        }

        setTimeout(() => done(null, tile), 0);

        overlapping.forEach((t) => {
          const tileNumber = t.y * 44 + t.x;
          const paddedTileNumber = String(tileNumber).padStart(4, '0');
          const url = `https://cdn-zeroluck-gg.b-cdn.net/nte/Assets/UI/UI/MiniMap/bigworldmap/map_bigworld_1${paddedTileNumber}.png`;

          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            const tileTopLeft = map.project(L.latLng(t.bounds.maxY, t.bounds.minX), coords.z);
            const tileBottomRight = map.project(L.latLng(t.bounds.minY, t.bounds.maxX), coords.z);

            const tileLeft = tileTopLeft.x - coords.x * 256 - 0.5;
            const tileTop = tileTopLeft.y - coords.y * 256 - 0.5;
            const tileWidth = tileBottomRight.x - tileTopLeft.x + 1.0;
            const tileHeight = tileBottomRight.y - tileTopLeft.y + 1.0;

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, tileLeft, tileTop, tileWidth, tileHeight);
          };
          img.src = url;
        });

        return tile;
      },
    });

    const tileLayer = new NteGridLayer({
      minZoom: 2,
      maxZoom: 8,
      tileSize: 256,
      noWrap: true,
      bounds: bounds,
    });
    tileLayer.addTo(map);

    // Markers layer group
    const markerGroup = L.layerGroup().addTo(map);
    markerGroupRef.current = markerGroup;

    map.on('zoomend moveend', () => {
      updateMarkerVisibility();
    });

    setTimeout(() => {
      map.invalidateSize();
      updateMarkerVisibility();
    }, 200);

    return () => {
      map.remove();
      leafletMapRef.current = null;
      markerGroupRef.current = null;
    };
  }, []);

  // Update markers when enabledCategories state changes
  useEffect(() => {
    updateMarkerVisibility();
  }, [enabledCategories]);

  const toggleCategory = (catId) => {
    const next = new Set(enabledCategories);
    if (next.has(catId)) next.delete(catId);
    else next.add(catId);
    setEnabledCategories(next);
  };

  const applyPreset = (preset) => {
    if (preset === 'main') {
      setEnabledCategories(new Set(['fast-travel', 'special-poi', 'v14-poi', 'taxi']));
    } else if (preset === 'combat') {
      setEnabledCategories(new Set(['fast-travel', 'monsters', 'anomaly-vision', 'arc-locations', 'special-poi', 'v14-poi']));
    } else if (preset === 'farming') {
      setEnabledCategories(new Set(['oracle-stone', 'currencies', 'locker', 'stealable-loot', 'collectible']));
    } else if (preset === 'all') {
      setEnabledCategories(new Set(categories.map((c) => c.id)));
    } else if (preset === 'clear') {
      setEnabledCategories(new Set());
    }
  };

  const flyToRegion = (reg) => {
    if (!leafletMapRef.current) return;
    leafletMapRef.current.flyTo([reg.y, reg.x], reg.zoom || 4, {
      duration: 1.2,
      easeLinearity: 0.25,
    });
  };

  const UI_TEXT = {
    filters: { uk: 'Фільтри Карти', en: 'Map Filters', fr: 'Filtres de Carte' },
    presets: { uk: 'Швидкі Пресети', en: 'Quick Presets', fr: 'Préréglages' },
    presetMain: { uk: '🎯 Основне', en: '🎯 Essential', fr: '🎯 Essentiel' },
    presetCombat: { uk: '⚔️ Бої & Боси', en: '⚔️ Combat & Bosses', fr: '⚔️ Combat' },
    presetFarming: { uk: '💎 Фарм Ресурсів', en: '💎 Resource Farm', fr: '💎 Ressources' },
    presetAll: { uk: '🌐 Усі Мітки', en: '🌐 All Markers', fr: '🌐 Tout' },
    presetClear: { uk: '🧹 Очистити', en: '🧹 Clear', fr: '🧹 Effacer' },
    zoomHint: {
      uk: '💡 Скрині та ресурси з’являються при наближенні (Zoom 4+)',
      en: '💡 Detailed chests & loot appear upon zooming in (Zoom 4+)',
      fr: '💡 Les coffres et ressources détaillés apparaissent au zoom 4+',
    },
    regionsTitle: { uk: 'Швидкий Перехід по Районах:', en: 'Fast Region Jump:', fr: 'Saut Rapide de Région :' },
    telemetry: { uk: 'Телеметрія Eibon', en: 'Eibon Telemetry', fr: 'Télémétrie Eibon' },
    activeMarkers: { uk: 'Активних міток', en: 'Active markers', fr: 'Marqueurs actifs' },
    zoomLevel: { uk: 'Масштаб', en: 'Zoom', fr: 'Zoom' },
    centerOn: { uk: 'Центрувати', en: 'Center', fr: 'Centrer' },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Region Jump Selector Bar */}
      <div
        class="glass-panel"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 16px',
          borderRadius: '12px',
          flexWrap: 'wrap',
          background: 'rgba(15, 20, 35, 0.75)',
          border: '1px solid rgba(0, 229, 255, 0.2)',
        }}
      >
        <span style={{ fontSize: '12px', fontWeight: '700', color: '#00e5ff', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>
          {UI_TEXT.regionsTitle[lang] || UI_TEXT.regionsTitle.uk}
        </span>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {REGIONS.map((reg) => (
            <button
              key={reg.id}
              onClick={() => flyToRegion(reg)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                background: reg.id.includes('v14') || reg.id === 'puka-park' ? 'rgba(255, 0, 128, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                border: reg.id.includes('v14') || reg.id === 'puka-park' ? '1px solid rgba(255, 0, 128, 0.5)' : '1px solid rgba(255, 255, 255, 0.12)',
                color: '#fff',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#00e5ff')}
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = reg.id.includes('v14') || reg.id === 'puka-park' ? 'rgba(255, 0, 128, 0.5)' : 'rgba(255, 255, 255, 0.12)')
              }
            >
              <span>{reg.icon}</span>
              <span>{reg.name[lang] || reg.name.uk}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Map + Sidebar Layout */}
      <div
        class="map-layout-container"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 320px',
          gap: '20px',
          height: 'calc(100vh - 230px)',
          minHeight: '620px',
        }}
      >
        {/* Map Viewport with Tactical HUD Sci-Fi Background */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            minHeight: '550px',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid rgba(0, 229, 255, 0.25)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Tactical Telemetry HUD Overlay */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              zIndex: 1000,
              padding: '6px 12px',
              borderRadius: '8px',
              background: 'rgba(6, 10, 20, 0.85)',
              border: '1px solid rgba(0, 229, 255, 0.3)',
              backdropFilter: 'blur(8px)',
              fontSize: '11px',
              color: '#00e5ff',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              pointerEvents: 'none',
              fontFamily: 'monospace',
            }}
          >
            <span>● {UI_TEXT.telemetry[lang] || UI_TEXT.telemetry.uk}</span>
            <span>{UI_TEXT.activeMarkers[lang] || UI_TEXT.activeMarkers.uk}: <strong>{visibleCount}</strong></span>
            <span>{UI_TEXT.zoomLevel[lang] || UI_TEXT.zoomLevel.uk}: <strong>{currentZoom}x</strong></span>
          </div>

          <div
            ref={mapRef}
            style={{
              width: '100%',
              height: '100%',
              minHeight: '550px',
              backgroundColor: '#070913',
              backgroundImage: `
                radial-gradient(circle at 50% 50%, rgba(20, 32, 60, 0.45) 0%, rgba(6, 8, 15, 0.95) 100%),
                linear-gradient(rgba(0, 229, 255, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 229, 255, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: '100% 100%, 48px 48px, 48px 48px',
            }}
          />
        </div>

        {/* Sidebar Controls */}
        <div
          class="glass-panel"
          style={{
            padding: '18px',
            borderRadius: '12px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            background: 'rgba(12, 16, 28, 0.85)',
          }}
        >
          {/* Quick Presets Section */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#ff4081', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '8px' }}>
              {UI_TEXT.presets[lang] || UI_TEXT.presets.uk}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              <button
                onClick={() => applyPreset('main')}
                style={{
                  padding: '7px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '600',
                  background: 'rgba(255, 64, 129, 0.15)',
                  border: '1px solid rgba(255, 64, 129, 0.4)',
                  color: '#fff',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                {UI_TEXT.presetMain[lang] || UI_TEXT.presetMain.uk}
              </button>
              <button
                onClick={() => applyPreset('combat')}
                style={{
                  padding: '7px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '600',
                  background: 'rgba(244, 67, 54, 0.15)',
                  border: '1px solid rgba(244, 67, 54, 0.4)',
                  color: '#fff',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                {UI_TEXT.presetCombat[lang] || UI_TEXT.presetCombat.uk}
              </button>
              <button
                onClick={() => applyPreset('farming')}
                style={{
                  padding: '7px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '600',
                  background: 'rgba(0, 188, 212, 0.15)',
                  border: '1px solid rgba(0, 188, 212, 0.4)',
                  color: '#fff',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                {UI_TEXT.presetFarming[lang] || UI_TEXT.presetFarming.uk}
              </button>
              <button
                onClick={() => applyPreset('all')}
                style={{
                  padding: '7px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '600',
                  background: 'rgba(156, 39, 176, 0.15)',
                  border: '1px solid rgba(156, 39, 176, 0.4)',
                  color: '#fff',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                {UI_TEXT.presetAll[lang] || UI_TEXT.presetAll.uk}
              </button>
            </div>
            <button
              onClick={() => applyPreset('clear')}
              style={{
                width: '100%',
                marginTop: '6px',
                padding: '5px',
                borderRadius: '6px',
                fontSize: '11px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#94a3b8',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              {UI_TEXT.presetClear[lang] || UI_TEXT.presetClear.uk}
            </button>
          </div>

          {/* Zoom hint */}
          <div style={{ fontSize: '11px', color: '#94a3b8', background: 'rgba(0, 229, 255, 0.05)', border: '1px dashed rgba(0, 229, 255, 0.2)', padding: '8px 10px', borderRadius: '6px' }}>
            {UI_TEXT.zoomHint[lang] || UI_TEXT.zoomHint.uk}
          </div>

          {/* Individual Category Toggles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#00e5ff', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '4px' }}>
              {UI_TEXT.filters[lang] || UI_TEXT.filters.uk}
            </div>
            {categories.map((c) => {
              const isChecked = enabledCategories.has(c.id);
              const name = c.name[lang] || c.name.uk;
              const isV14 = c.id === 'v14-poi';

              return (
                <button
                  key={c.id}
                  onClick={() => toggleCategory(c.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: isChecked
                      ? isV14
                        ? '1px solid #ff007f'
                        : `1px solid ${c.color || '#ff4081'}`
                      : '1px solid rgba(255,255,255,0.08)',
                    background: isChecked
                      ? isV14
                        ? 'rgba(255, 0, 127, 0.22)'
                        : 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(255, 255, 255, 0.02)',
                    color: '#fff',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '12px',
                    transition: 'all 0.15s',
                  }}
                >
                  <span style={{ fontSize: '15px' }}>{c.icon}</span>
                  <span style={{ flex: 1, fontWeight: isChecked ? '600' : '400', color: isChecked && isV14 ? '#ff66b2' : '#f1f5f9' }}>{name}</span>
                  <span style={{ fontSize: '11px', opacity: isChecked ? 1 : 0.4, color: isChecked ? (isV14 ? '#ff007f' : '#00e676') : '#94a3b8' }}>
                    {isChecked ? '✓' : '✕'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Marker Inspector Panel */}
          {selectedMarker && (
            <div
              class="glass-panel"
              style={{
                marginTop: 'auto',
                padding: '14px',
                borderRadius: '8px',
                border: '1px solid rgba(0, 230, 118, 0.4)',
                background: 'rgba(0, 230, 118, 0.05)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#00e676', fontWeight: '700' }}>
                  {selectedMarker.cat}
                </span>
                <button
                  onClick={() => {
                    if (leafletMapRef.current) {
                      leafletMapRef.current.flyTo([selectedMarker.y, selectedMarker.x], 6, { duration: 0.8 });
                    }
                  }}
                  style={{
                    fontSize: '10px',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: 'rgba(0, 230, 118, 0.2)',
                    border: '1px solid #00e676',
                    color: '#00e676',
                    cursor: 'pointer',
                  }}
                >
                  {UI_TEXT.centerOn[lang] || UI_TEXT.centerOn.uk}
                </button>
              </div>
              <h4 style={{ margin: '0 0 6px 0', fontSize: '13px', color: '#fff', fontWeight: '700' }}>{selectedMarker.title}</h4>
              {selectedMarker.desc && (
                <p style={{ fontSize: '11px', color: '#94a3b8', margin: '0 0 8px 0', lineHeight: 1.4 }}>{selectedMarker.desc}</p>
              )}
              <span style={{ fontSize: '10px', color: '#64748b', fontFamily: 'monospace' }}>
                X: {selectedMarker.x.toFixed(1)}, Y: {selectedMarker.y.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
