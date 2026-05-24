import { state } from '../scripts/state.js';

// startBannerCountdown and updateTimer
function startBannerCountdown() {
    // Hotori's Misty Tipsy Style banner ends on June 3, 2026 at 05:59 UTC+8.
    const bannerEndDate = new Date("2026-06-02T21:59:00Z").getTime();
    
    function updateTimer() {
        const now = new Date().getTime();
        const distance = bannerEndDate - now;
        
        const timerEl = document.getElementById("bannerCountdown");
        if (!timerEl) return;
        
        if (distance < 0) {
            timerEl.innerText = state.currentLang === 'uk' ? "Завершено" : "Ended";
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        if (state.currentLang === 'uk') {
            timerEl.innerText = `${days}д ${hours}г ${minutes}хв ${seconds}с`;
        } else {
            timerEl.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}


// parseFirebaseDate
function parseFirebaseDate(val) {
    if (!val) return new Date(0);
    if (typeof val.toDate === 'function') {
        return val.toDate();
    }
    if (val.seconds !== undefined) {
        return new Date(val.seconds * 1000);
    }
    if (val instanceof Date) {
        return val;
    }
    const d = new Date(val);
    return isNaN(d.getTime()) ? new Date(0) : d;
}


// copyToClipboard
function copyToClipboard(text) {
    const successMsg = state.currentLang === 'uk' ? `Код "${text}" скопійовано у буфер обміну!` : `Code "${text}" copied to clipboard!`;
    const errorMsg = state.currentLang === 'uk' ? "Не вдалося скопіювати код." : "Failed to copy code.";
    navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg);
    }).catch(err => {
        console.error("Copy error: ", err);
        // Fallback
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showToast(successMsg);
        } catch (e) {
            showToast(errorMsg);
        }
        document.body.removeChild(textArea);
    });
}


// showToast
// 12. TOAST NOTIFICATION
function showToast(message) {
    const container = document.getElementById("toastContainer");
    
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = message;
    
    container.appendChild(toast);
    
    // Auto remove after 3s
    setTimeout(() => {
        toast.classList.add("removing");
        toast.addEventListener("animationend", () => {
            toast.remove();
        });
    }, 3000);
}


export { startBannerCountdown, parseFirebaseDate, copyToClipboard, showToast };
