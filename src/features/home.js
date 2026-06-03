import { state } from '../scripts/state.js';
import { parseFirebaseDate, copyToClipboard, startBannerCountdown } from '../utils/helpers.js';
import { TIMELINE_TRANSLATIONS } from '../localization/translations.js';

function renderHomeWidgets() {
    // 1. Promo codes widget
    const codesContainer = document.getElementById("homeCodesList");
    if (codesContainer) {
        codesContainer.innerHTML = "";
        const sortedCodes = [...state.PROMO_CODES].sort((a, b) => {
            const dateA = parseFirebaseDate(a.addedAt);
            const dateB = parseFirebaseDate(b.addedAt);
            return dateB - dateA;
        });
        const activeCodes = sortedCodes.filter(c => c.active).slice(0, 3);
        if (activeCodes.length === 0) {
            codesContainer.innerHTML = `<div class="widget-loading">${state.currentLang === 'uk' ? 'Промокоди відсутні' : 'No active codes'}</div>`;
        } else {
            activeCodes.forEach(promo => {
                const item = document.createElement("div");
                item.className = "home-code-item";
                item.style.cursor = "pointer";
                item.innerHTML = `
                    <div class="home-code-info">
                        <span class="home-code-string">${promo.code}</span>
                        <span class="home-code-rewards">${promo.rewards}</span>
                    </div>
                    <button class="btn-copy btn-xs">${state.currentLang === 'uk' ? 'Копіювати' : 'Copy'}</button>
                `;
                item.addEventListener("click", (e) => {
                    e.stopPropagation();
                    copyToClipboard(promo.code);
                });
                codesContainer.appendChild(item);
            });
        }
    }
    
    // 2. Timeline widget
    const eventsContainer = document.getElementById("homeEventsRoadmap");
    if (eventsContainer) {
        eventsContainer.innerHTML = "";
        const displayEvents = state.TIMELINE_EVENTS.slice(-3);
        if (displayEvents.length === 0) {
            eventsContainer.innerHTML = `<div class="widget-loading">${state.currentLang === 'uk' ? 'Події відсутні' : 'No events scheduled'}</div>`;
        } else {
            displayEvents.forEach(event => {
                const item = document.createElement("div");
                item.className = "home-event-item";
                
                let title = event.title;
                let date = event.date;
                const trans = TIMELINE_TRANSLATIONS[event.title];
                if (trans && trans[state.currentLang]) {
                    title = trans[state.currentLang].title;
                    date = trans[state.currentLang].date;
                }
                
                let statusText = event.status;
                if (event.status === 'Released') {
                    statusText = state.currentLang === 'uk' ? 'Випущено' : 'Released';
                } else if (event.status === 'Active') {
                    statusText = state.currentLang === 'uk' ? 'Активне' : 'Active';
                } else if (event.status === 'Upcoming') {
                    statusText = state.currentLang === 'uk' ? 'Майбутнє' : 'Upcoming';
                }
                
                item.innerHTML = `
                    <div class="home-event-info">
                        <span class="home-event-title">${title}</span>
                        <span class="home-event-date">${date}</span>
                    </div>
                    <span class="badge ${event.badgeClass}">${statusText}</span>
                `;
                eventsContainer.appendChild(item);
            });
        }
    }
}

// 13. TIMELINE RENDERING
function renderTimeline() {
    const container = document.getElementById("timelineContainer");
    container.innerHTML = "";

    state.TIMELINE_EVENTS.forEach((event, index) => {
        const item = document.createElement("div");
        const isLeft = index % 2 === 0;
        item.className = `timeline-event ${isLeft ? 'timeline-left' : 'timeline-right'}`;
        
        let title = event.title;
        let date = event.date;
        let desc = event.desc;
        const trans = TIMELINE_TRANSLATIONS[event.title];
        if (trans && trans[state.currentLang]) {
            title = trans[state.currentLang].title;
            date = trans[state.currentLang].date;
            desc = trans[state.currentLang].desc;
        }
        
        let statusText = event.status;
        if (event.status === 'Released') {
            statusText = state.currentLang === 'uk' ? 'Випущено' : 'Released';
        } else if (event.status === 'Active') {
            statusText = state.currentLang === 'uk' ? 'Активне' : 'Active';
        } else if (event.status === 'Upcoming') {
            statusText = state.currentLang === 'uk' ? 'Майбутнє' : 'Upcoming';
        }
        
        item.innerHTML = `
            <div class="timeline-content">
                <span class="timeline-date">${date}</span>
                <span class="badge ${event.badgeClass} timeline-badge">${statusText}</span>
                <h3>${title}</h3>
                <p>${desc}</p>
            </div>
        `;
        container.appendChild(item);
    });
}


export { renderHomeWidgets, renderTimeline };
