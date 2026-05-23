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
    }
];

const CODES_FILE = path.join(__dirname, 'codes.json');

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
    
    // Regular expression to look for codes and potential rewards
    // Matches common formats like: **CODE** - Reward, CODE: Reward, CODE – Reward
    // We search for NTE codes starting with NTE (case insensitive) or specific numeric-alphabetic patterns
    const pattern = /(?:<strong>|<b>|\b)(NTE[A-Za-z0-9_]{3,20}|[0-9]{5,}[A-Z]{4,}[A-Za-z0-9]+)(?:<\/strong>|<\/b>|\b)(?:\s*[-–—:]\s*|\s+-\s+)([^\n<•]+)/gi;
    
    let match;
    while ((match = pattern.exec(html)) !== null) {
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
    const listPattern = /<li>\s*(?:<strong>)?(NTE[A-Za-z0-9_]{3,20})(?:<\/strong>)?\s*<\/li>/gi;
    while ((match = listPattern.exec(html)) !== null) {
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
            // Existing code, ensure active status is preserved
            updatedCodes[index].active = true;
            // Update rewards if they were placeholder and now we have better description
            if (updatedCodes[index].rewards.includes("Active Promo Code") && !newCode.rewards.includes("Active Promo Code")) {
                updatedCodes[index].rewards = newCode.rewards;
            }
        }
    });

    console.log(`Scrape finished. Added ${addedCount} new codes.`);
    saveCodes(updatedCodes);
}

run();
