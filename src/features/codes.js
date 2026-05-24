import { state } from '../scripts/state.js';
import { copyToClipboard } from '../utils/helpers.js';

// 11. PROMO CODES LOGIC
function renderPromoCodes() {
    const container = document.getElementById("promoCodesList");
    container.innerHTML = "";

    const sortedCodes = [...state.PROMO_CODES].sort((a, b) => {
        const dateA = parseFirebaseDate(a.addedAt);
        const dateB = parseFirebaseDate(b.addedAt);
        return dateB - dateA;
    });

    sortedCodes.forEach(promo => {
        const card = document.createElement("div");
        card.className = "code-card";
        card.innerHTML = `
            <div class="code-info">
                <div class="code-string">${promo.code}</div>
                <div class="code-rewards">${promo.rewards}</div>
            </div>
            <button class="btn-copy" data-code="${promo.code}">${state.currentLang === 'uk' ? 'Копіювати' : 'Copy'}</button>
        `;
        
        card.querySelector(".btn-copy").addEventListener("click", () => {
            copyToClipboard(promo.code);
        });


        container.appendChild(card);
    });
}


export { renderPromoCodes };
