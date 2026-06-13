import { state } from '../scripts/state.js';
import { auth, googleProvider } from '../firebase/firebase.js';
import { showToast } from '../utils/helpers.js';
import { loadCommunityTierlists, initTierlistEditor, saveUserTierlist, moveCharInEditor } from './tierlist.js';
import { i18n } from '../localization/translations.js';


// 14. AUTH & CUSTOM USER TIERLISTS LOGIC



// Main entry point for auth and user tierlist features
function initAuthAndUserTierlists() {
    // Bind global header auth click
    const loginBtn = document.getElementById("btnLoginGoogle");
    if (loginBtn) {
        loginBtn.addEventListener("click", loginWithGoogle);
    }

    // Bind sub-tabs inside tierlist page
    const subTabBtns = document.querySelectorAll(".sub-tab-btn");
    subTabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            subTabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const targetTab = btn.getAttribute("data-sub-tab");
            document.querySelectorAll(".tierlist-sub-content").forEach(content => {
                content.classList.remove("active");
            });
            document.getElementById(`sub-content-${targetTab}`).classList.add("active");

            if (targetTab === "community") {
                loadCommunityTierlists();
            } else if (targetTab === "creator") {
                const user = auth ? auth.currentUser : null;
                if (user) {
                    initTierlistEditor();
                }
            }
        });
    });

    // Check if Firebase is available
    if (!auth) {
        console.warn("Firebase Auth not available, disabling user tier lists.");
        return;
    }

    // Listen to Firebase Auth state changes
    auth.onAuthStateChanged((user) => {
        updateAuthUI(user);
        
        const authPrompt = document.getElementById("editorAuthPrompt");
        const container = document.getElementById("editorContainer");

        if (user) {
            if (authPrompt) authPrompt.classList.add("hidden");
            if (container) container.classList.remove("hidden");
            initTierlistEditor();
        } else {
            if (authPrompt) authPrompt.classList.remove("hidden");
            if (container) container.classList.add("hidden");
        }

        // Reload community lists to toggle owner "Delete" buttons in real time
        const commTab = document.getElementById("sub-content-community");
        if (commTab && commTab.classList.contains("active")) {
            loadCommunityTierlists();
        }
    });

    // Bind login on editor prompt
    const editorLoginBtn = document.getElementById("btnEditorLogin");
    if (editorLoginBtn) {
        editorLoginBtn.addEventListener("click", loginWithGoogle);
    }

    // Bind editor save button
    const saveBtn = document.getElementById("btnSaveTierlist");
    if (saveBtn) {
        saveBtn.addEventListener("click", saveUserTierlist);
    }

    // Bind Drag and Drop listeners to dropzones
    const dropzones = document.querySelectorAll(".editor-tier-dropzone, #editorCharacterPool");
    dropzones.forEach(zone => {
        zone.addEventListener("dragover", (e) => {
            e.preventDefault();
            zone.classList.add("dragover");
        });
        zone.addEventListener("dragleave", () => {
            zone.classList.remove("dragover");
        });
        zone.addEventListener("drop", (e) => {
            e.preventDefault();
            zone.classList.remove("dragover");
            const charId = e.dataTransfer.getData("text/plain");
            const targetTier = zone.getAttribute("data-tier") || "pool";
            if (charId) {
                moveCharInEditor(charId, targetTier);
            }
        });
    });

    // Bind modal close buttons
    const userModal = document.getElementById("userTierlistModalOverlay");
    const closeBtn = document.getElementById("userTierlistCloseBtn");
    if (closeBtn && userModal) {
        closeBtn.addEventListener("click", () => userModal.classList.remove("active"));
        userModal.addEventListener("click", (e) => {
            if (e.target.id === "userTierlistModalOverlay") {
                userModal.classList.remove("active");
            }
        });
    }
}

// Google Login / Logout Functions
function loginWithGoogle() {
    const lang = state.currentLang || 'en';
    const dict = i18n[lang] || i18n.en;
    if (!auth || !googleProvider) {
        showToast(dict.toast_firebase_error || "Firebase Auth not connected!");
        return;
    }
    auth.signInWithPopup(googleProvider)
        .then((result) => {
            const welcomeText = `${dict.toast_welcome || "Welcome, "}${result.user.displayName}! 🎉`;
            showToast(welcomeText);
        })
        .catch((error) => {
            console.error("Login failed:", error);
            const errText = lang === 'uk' ? `Помилка входу: ${error.message}` : (lang === 'fr' ? `Échec de la connexion : ${error.message}` : `Login failed: ${error.message}`);
            showToast(errText);
        });
}

function logout() {
    const lang = state.currentLang || 'en';
    const dict = i18n[lang] || i18n.en;
    if (!auth) return;
    auth.signOut().then(() => {
        showToast(dict.toast_logged_out || "Logged out successfully.");
    });
}

// Update the global header profile layout
function updateAuthUI(user) {
    const authBox = document.getElementById("headerAuth");
    if (!authBox) return;

    const lang = state.currentLang || 'en';
    const dict = i18n[lang] || i18n.en;

    if (user) {
        const logoutLabel = dict.btn_logout || 'Logout';
        const userFallbackName = dict.user_fallback || 'User';
        authBox.innerHTML = `
            <div class="user-profile">
                <img src="${user.photoURL || ''}" class="user-avatar" referrerpolicy="no-referrer" alt="${user.displayName}">
                <span class="user-name">${(user.displayName || userFallbackName).split(" ")[0]}</span>
                <button class="btn btn-secondary btn-xs" id="btnLogoutGoogle" data-i18n="btn_logout">${logoutLabel}</button>
            </div>
        `;
        document.getElementById("btnLogoutGoogle").addEventListener("click", logout);
    } else {
        const loginLabel = dict.btn_login || 'Login';
        authBox.innerHTML = `
            <button class="btn btn-primary btn-sm" id="btnLoginGoogle" data-i18n="btn_login">
                ${loginLabel}
            </button>
        `;
        document.getElementById("btnLoginGoogle").addEventListener("click", loginWithGoogle);
    }
}

// Initialize Custom Tier List Editor

export { initAuthAndUserTierlists, loginWithGoogle, logout, updateAuthUI };
