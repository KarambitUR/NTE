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
  const [enabledCategories, setEnabledCategories] = useState(
    new Set(['fast-travel', 'taxi', 'oracle-stone', 'currencies', 'locker', 'collectible', 'stealable-loot', 'monsters', 'anomaly-vision', 'arc-locations'])
  );

  const categories = nteMapData.categories;

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

    const bounds = L.latLngBounds(
      [-4700, -4400],
      [3100, 4900]
    );
    map.setMaxBounds(bounds);

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

    map.on('zoomend moveend', updateMarkerVisibility);

    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      map.remove();
      leafletMapRef.current = null;
      markerGroupRef.current = null;
    };
  }, []); // Run ONLY ONCE on mount!

  // Update marker icons on map without re-creating Leaflet instance
  const updateMarkerVisibility = () => {
    if (!leafletMapRef.current || !markerGroupRef.current) return;

    const map = leafletMapRef.current;
    const markerGroup = markerGroupRef.current;
    const zoom = map.getZoom();

    markerGroup.clearLayers();

    nteMapData.markers.forEach((marker) => {
      const cat = marker.cat || 'unknown';
      if (!enabledCategories.has(cat)) return;

      let minZoom = 2;
      if (['stealable-loot', 'monsters', 'collectible', 'currencies', 'locker'].includes(cat)) minZoom = 5;

      if (zoom < minZoom) return;

      let iconUrl = marker.icon || 'https://cdn-zeroluck-gg.b-cdn.net/nte/Assets/UI/UI/MiniMap/minimapicon/Normal/small/YH_UI_Mapicon_098.png';

      // Fix broken relative paths like /nte/icons/custom/magicians-dove_256.png
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
      m.bindPopup(`<strong style="color:#fff; font-family:sans-serif;">${marker.title}</strong>`);
      m.on('click', () => {
        setSelectedMarker(marker);
      });

      markerGroup.addLayer(m);
    });
  };

  // Update markers when enabledCategories changes without re-creating Leaflet map
  useEffect(() => {
    updateMarkerVisibility();
  }, [enabledCategories]);

  const toggleCategory = (catId) => {
    const next = new Set(enabledCategories);
    if (next.has(catId)) next.delete(catId);
    else next.add(catId);
    setEnabledCategories(next);
  };

  return (
    <div class="map-layout-container" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px', height: 'calc(100vh - 180px)', minHeight: '600px' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '550px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.15)' }}>
        <div ref={mapRef} style={{ width: '100%', height: '100%', minHeight: '550px', background: '#0a0b10' }} />
      </div>

      {/* Category Sidebar */}
      <div class="glass-panel" style={{ padding: '20px', borderRadius: '12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', margin: 0 }}>
          {lang === 'en' ? 'Map Filters' : lang === 'fr' ? 'Filtres de Carte' : 'Фільтри Карти'}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {categories.map((c) => {
            const isChecked = enabledCategories.has(c.id);
            const name = c.name[lang] || c.name.uk;

            return (
              <button
                key={c.id}
                onClick={() => toggleCategory(c.id)}
                class="glass-panel"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: isChecked ? '1px solid #ff4081' : '1px solid rgba(255,255,255,0.1)',
                  background: isChecked ? 'rgba(255, 64, 129, 0.15)' : 'transparent',
                  color: '#fff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '13px',
                }}
              >
                <span>{c.icon}</span>
                <span style={{ flex: 1 }}>{name}</span>
                <span style={{ fontSize: '10px', opacity: 0.7 }}>{isChecked ? '✓' : '✕'}</span>
              </button>
            );
          })}
        </div>

        {selectedMarker && (
          <div class="glass-panel" style={{ marginTop: 'auto', padding: '14px', borderRadius: '8px', border: '1px solid rgba(0,230,118,0.4)' }}>
            <h4 style={{ margin: '0 0 6px 0', fontSize: '14px', color: '#00e676' }}>{selectedMarker.title}</h4>
            <span style={{ fontSize: '11px', opacity: 0.8 }}>
              X: {selectedMarker.x}, Y: {selectedMarker.y}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
