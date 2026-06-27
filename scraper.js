const fs = require('fs');
const path = require('path');
const https = require('https');
const zlib = require('zlib');

// Target URLs for scraping codes
const SOURCES = [
    {
        url: 'https://www.eurogamer.net/neverness-to-everness-nte-codes',
        name: 'Eurogamer'
    },
    {
        url: 'https://www.esportstales.com/neverness-to-everness/codes',
        name: 'EsportsTales'
    },
    {
        url: 'https://www.pcgamesn.com/neverness-to-everness/codes',
        name: 'PCGamesN'
    },
    {
        url: 'https://game8.co/games/Neverness-to-Everness/archives/467889',
        name: 'Game8'
    },
    {
        url: 'https://www.dexerto.com/neverness-to-everness/all-nte-codes-3203068/',
        name: 'Dexerto'
    }
];

const CODES_FILE = path.join(__dirname, 'codes.json');

// Firebase Admin SDK (optional - used when FIREBASE_SERVICE_ACCOUNT env var is set)
let firestoreDb = null;

async function initFirebaseAdmin() {
    try {
        // Check if service account is provided via environment variable
        const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
        if (!serviceAccountJson) {
            console.log('ℹ️  No FIREBASE_SERVICE_ACCOUNT env var. Skipping Firestore writes.');
            return false;
        }

        const { initializeApp, cert } = require('firebase-admin/app');
        const { getFirestore } = require('firebase-admin/firestore');
        const serviceAccount = JSON.parse(serviceAccountJson);
        
        const app = initializeApp({
            credential: cert(serviceAccount)
        });
        
        firestoreDb = getFirestore(app);
        console.log('🔥 Firebase Admin SDK initialized');
        return true;
    } catch (err) {
        console.warn('Firebase Admin init failed (this is OK for local dev):', err.stack || err.message);
        return false;
    }
}

// Write codes to Firestore
async function writeToFirestore(codes, existingCodes = []) {
    if (!firestoreDb) return;

    try {
        const batch = firestoreDb.batch();
        let count = 0;

        for (const code of codes) {
            const ref = firestoreDb.collection('promoCodes').doc(code.code);
            const dataToSet = {
                code: code.code,
                rewards: code.rewards,
                active: code.active,
                source: 'scraper'
            };

            // Only set addedAt if the code is brand new (not in existingCodes)
            const isExisting = existingCodes.some(c => c.code.toLowerCase() === code.code.toLowerCase());
            if (!isExisting) {
                dataToSet.addedAt = new Date().toISOString();
            }

            batch.set(ref, dataToSet, { merge: true }); // merge: true preserves existing fields
            count++;
        }

        await batch.commit();
        console.log(`🔥 Synced ${count} codes to Firestore`);
    } catch (err) {
        console.error('Firestore write failed:', err.message);
    }
}

// Helper function to perform HTTPS GET with User-Agent header (follows redirects and handles decompression)
function fetchPage(url) {
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate, br'
            }
        };

        https.get(url, options, (res) => {
            // Support HTTP redirects (301, 302, 307, 308)
            if ([301, 302, 307, 308].includes(res.statusCode)) {
                let redirectUrl = res.headers.location;
                if (!redirectUrl.startsWith('http')) {
                    // Resolve relative redirect
                    const parsedUrl = new URL(url);
                    redirectUrl = `${parsedUrl.protocol}//${parsedUrl.host}${redirectUrl}`;
                }
                console.log(`Following redirect from ${url} to ${redirectUrl}...`);
                resolve(fetchPage(redirectUrl));
                return;
            }

            if (res.statusCode !== 200) {
                reject(new Error(`Failed to fetch ${url}. Status code: ${res.statusCode}`));
                return;
            }

            // Handle decompression
            let decodeStream = res;
            const encoding = (res.headers['content-encoding'] || '').toLowerCase();
            
            if (encoding === 'gzip') {
                decodeStream = res.pipe(zlib.createGunzip());
            } else if (encoding === 'deflate') {
                decodeStream = res.pipe(zlib.createInflate());
            } else if (encoding === 'br') {
                if (zlib.createBrotliDecompress) {
                    decodeStream = res.pipe(zlib.createBrotliDecompress());
                } else {
                    console.warn("Brotli decompression not supported in this Node version. Scraper might fail for some hosts.");
                }
            }

            let data = '';
            decodeStream.on('data', (chunk) => {
                data += chunk.toString();
            });

            decodeStream.on('end', () => {
                resolve(data);
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

// Parse HTML page to find promo codes and their rewards
function extractCodes(html) {
    const foundCodes = [];

    // Split HTML at the heading of the expired codes section to only parse the active section
    // Matches common headings containing "expired" or "no longer work"
    const splitPattern = /<h[2-4][^>]*>[^<]*(?:expired|no longer work|out of date)[^<]*<\/h[2-4]>/i;
    const parts = html.split(splitPattern);
    const activeHtml = parts[0];
    
    // Regular expression to look for codes and potential rewards
    // Matches common formats like: **CODE** - Reward, CODE: Reward, CODE – Reward
    // We search for NTE codes (case-insensitive for nte), general uppercase codes starting with a letter (e.g. DREAMWALK0603), or numeric-first codes (e.g. 504980102FKGOVNS)
    // Note: We run without the /i flag to force general codes to be strictly uppercase, avoiding matching lowercase page content.
    const pattern = /(?:<strong>|<b>|\b)([nN][tT][eE][A-Za-z0-9_]{3,20}|[A-Z][A-Z0-9_]{5,24}|[0-9]{5,}[A-Za-z0-9]+)(?:<\/strong>|<\/b>|\b)(?:\s*[-–—:]\s*|\s+-\s+)([^\n<•]+)/g;
    
    let match;
    while ((match = pattern.exec(activeHtml)) !== null) {
        let code = match[1].trim();
        let rewards = match[2].replace(/<\/?[^>]+(>|$)/g, "").trim(); // Strip any inline HTML tags
        
        // Clean rewards string (remove trailing punctuation/dates)
        rewards = rewards.split('(')[0].split('[')[0].trim();
        if (rewards.endsWith('.') || rewards.endsWith(',')) {
            rewards = rewards.slice(0, -1);
        }

        // Validate code length and pattern to avoid false positives
        if (code && code.length >= 6 && code.length <= 30 && rewards.length > 3 && rewards.length < 150) {
            // Avoid false positives like "NTE Wiki" or "Neverness to Everness"
            if (!/^(wiki|guide|game|release|trailer|beta|play|alpha|forum|reddit|discord|official|download)$/i.test(code)) {
                foundCodes.push({ code, rewards, active: true });
            }
        }
    }
    
    // Fallback: search for codes written standalone in <li> tags
    const listPattern = /<li>\s*(?:<strong>)?([nN][tT][eE][A-Za-z0-9_]{3,20}|[A-Z][A-Z0-9_]{5,24})\s*(?:<\/strong>)?\s*<\/li>/g;
    while ((match = listPattern.exec(activeHtml)) !== null) {
        let code = match[1].trim();
        if (!foundCodes.some(c => c.code.toLowerCase() === code.toLowerCase())) {
            foundCodes.push({ code, rewards: "Active Promo Code (Ресурси)", active: true });
        }
    }

    // Additional pattern: codes in <code> or <kbd> tags  
    const codeTagPattern = /(?:<code>|<kbd>)\s*([nN][tT][eE][A-Za-z0-9_]{3,20}|[A-Z][A-Z0-9_]{5,24}|[0-9]{5,}[A-Za-z0-9]+)\s*(?:<\/code>|<\/kbd>)/g;
    while ((match = codeTagPattern.exec(activeHtml)) !== null) {
        let code = match[1].trim();
        if (!foundCodes.some(c => c.code.toLowerCase() === code.toLowerCase())) {
            foundCodes.push({ code, rewards: "Active Promo Code (Ресурси)", active: true });
        }
    }

    return foundCodes;
}

// Read existing codes.json
function readExistingCodes() {
    try {
        if (fs.existsSync(CODES_FILE)) {
            const fileData = fs.readFileSync(CODES_FILE, 'utf8');
            return JSON.parse(fileData);
        }
    } catch (err) {
        console.error("Error reading codes file:", err.message);
    }
    return [];
}

// Save merged codes list back to codes.json
function saveCodes(codes) {
    try {
        fs.writeFileSync(CODES_FILE, JSON.stringify(codes, null, 4), 'utf8');
        console.log(`Successfully saved ${codes.length} codes to codes.json`);
    } catch (err) {
        console.error("Error saving codes file:", err.message);
    }
}

// Main execution function
async function run() {
    console.log("Starting Neverness to Everness Promo Codes Scraper...");
    
    // Try to init Firebase Admin (optional)
    await initFirebaseAdmin();
    
    let existingCodes = readExistingCodes();
    console.log(`Loaded ${existingCodes.length} existing codes.`);

    let newlyFound = [];

    for (const source of SOURCES) {
        console.log(`Fetching from ${source.name}...`);
        try {
            const html = await fetchPage(source.url);
            const codes = extractCodes(html);
            console.log(`Found ${codes.length} potential codes on ${source.name}.`);
            newlyFound = newlyFound.concat(codes);
        } catch (err) {
            console.error(`Failed to scrape from ${source.name}:`, err.message);
        }
    }

    // Merge newly found codes into the existing database
    // Rules:
    // 1. If code already exists, keep its rewards and status.
    // 2. If it's new, add it.
    // 3. Mark all newly found codes as active.
    let updatedCodes = [...existingCodes];
    let addedCount = 0;

    newlyFound.forEach(newCode => {
        const index = updatedCodes.findIndex(c => c.code.toLowerCase() === newCode.code.toLowerCase());
        if (index === -1) {
            // New code found!
            updatedCodes.push(newCode);
            addedCount++;
            console.log(`[NEW CODE ADDED]: ${newCode.code} - ${newCode.rewards}`);
        } else {
            // Existing code, preserve active status if it was explicitly set to false
            if (updatedCodes[index].active !== false) {
                updatedCodes[index].active = true;
            }
            // Update rewards if they were placeholder and now we have better description
            if (updatedCodes[index].rewards.includes("Active Promo Code") && !newCode.rewards.includes("Active Promo Code")) {
                updatedCodes[index].rewards = newCode.rewards;
            }
        }
    });

    // Auto-deactivate codes that are no longer found in the active section of ANY website
    if (newlyFound.length > 0) {
        let deactivatedCount = 0;
        updatedCodes.forEach((exCode, idx) => {
            const isStillActive = newlyFound.some(n => n.code.toLowerCase() === exCode.code.toLowerCase());
            if (exCode.active && !isStillActive) {
                updatedCodes[idx].active = false;
                deactivatedCount++;
                console.log(`[AUTO-DEACTIVATED]: ${exCode.code} is no longer active on scraped websites.`);
            }
        });
        if (deactivatedCount > 0) {
            console.log(`Auto-deactivated ${deactivatedCount} expired codes.`);
        }
    }

    console.log(`Scrape finished. Added ${addedCount} new codes.`);
    saveCodes(updatedCodes);

    // Sync ALL codes to Firestore (both old and new)
    if (firestoreDb) {
        await writeToFirestore(updatedCodes, existingCodes);
    }

    // ===== TIMELINE AUTO-UPDATE =====
    if (firestoreDb) {
        await updateTimelineStatuses();
    }
}

// Auto-update timeline event statuses based on current date
async function updateTimelineStatuses() {
    if (!firestoreDb) return;

    try {
        const snapshot = await firestoreDb.collection('timelineEvents').get();
        if (snapshot.empty) return;

        const now = new Date();
        const batch = firestoreDb.batch();
        let updatedCount = 0;

        // Date parsing map for Ukrainian months
        const monthMap = {
            'Січня': 0, 'Лютого': 1, 'Березня': 2, 'Квітня': 3,
            'Травня': 4, 'Червня': 5, 'Липня': 6, 'Серпня': 7,
            'Вересня': 8, 'Жовтня': 9, 'Листопада': 10, 'Грудня': 11
        };

        snapshot.docs.forEach(doc => {
            const event = doc.data();
            if (!event.date) return;

            // Try to parse the date
            let eventDate = null;

            // Match patterns like "29 Квітня 2026" or "3-4 Червня 2026"
            const dateMatch = event.date.match(/(\d{1,2})(?:-\d{1,2})?\s+(\S+)\s+(\d{4})/);
            if (dateMatch) {
                const day = parseInt(dateMatch[1]);
                const monthName = dateMatch[2];
                const year = parseInt(dateMatch[3]);

                if (monthMap[monthName] !== undefined) {
                    // For ranges like "3-4 Червня", use the last day
                    const rangeMatch = event.date.match(/\d{1,2}-(\d{1,2})/);
                    const actualDay = rangeMatch ? parseInt(rangeMatch[1]) : day;
                    eventDate = new Date(year, monthMap[monthName], actualDay, 23, 59, 59);
                }
            }

            if (!eventDate) return;

            let newStatus = event.status;
            if (eventDate < now && event.status !== 'Released') {
                newStatus = 'Released';
            } else if (eventDate > now) {
                // Check if it's today or within 24 hours
                const diffHours = (eventDate - now) / (1000 * 60 * 60);
                if (diffHours <= 24 && event.status !== 'Active') {
                    newStatus = 'Active';
                }
            }

            if (newStatus !== event.status) {
                batch.update(doc.ref, { status: newStatus });
                updatedCount++;
                console.log(`📅 Timeline "${event.title}" status: ${event.status} → ${newStatus}`);
            }
        });

        if (updatedCount > 0) {
            await batch.commit();
            console.log(`📅 Updated ${updatedCount} timeline event statuses`);
        } else {
            console.log('📅 All timeline statuses are up to date');
        }
    } catch (err) {
        console.error('Timeline status update failed:', err.message);
    }
}

run();

