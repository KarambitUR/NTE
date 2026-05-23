// NTE Eibon Terminal - Core Application Logic
// =============================================
// Data is loaded from Firebase Firestore with localStorage fallback

// 1. DATA STORES (populated from Firestore or fallback)
let CHARACTERS = [];
let PROMO_CODES = [];
let TIMELINE_EVENTS = [];
let dataSource = 'loading'; // 'firestore', 'cache', 'hardcoded'

// 2. HARDCODED FALLBACK DATA (used when Firestore and cache are unavailable)
const FALLBACK_CHARACTERS = [
    {
        id: "nanally",
        name: "Nanally (Наналлі)",
        rarity: 5,
        attribute: "Anima",
        role: "Main DPS",
        tier: "S+",
        avatar: "https://static.wikia.nocookie.net/neverness-to-everness/images/4/44/Nanally_-_Character_Showcase.jpg/revision/latest/scale-to-width-down/200?cb=20241229191211",
        summary: "Найсильніший ДПС персонаж стихії Anima. Володіє неймовірною мобільністю завдяки антигравітаційним механікам та завдає колосальної шкоди авто-атаками супроводу.",
        weapon: "Goodnight Kiss (Сигнатурний Arc)",
        weaponF2p: "Raging Flames (Лють Полум'я)",
        cartridge: "Fireflies and the Forest (4-piece)",
        stats: ["Crit Rate (75%+)", "Crit DMG", "Anima DMG", "ATK%"],
        teamSynergy: "Zero (Космос), Sakiri (Закляття), Jiuyuan (Аніма)",
        lore: "Загадкова дівчина з лисячими вушками, яка обожнює грати з гравітацією. Працює незалежним детективом аномалій у Hethereau."
    },
    {
        id: "sakiri",
        name: "Sakiri (Сакірі)",
        rarity: 5,
        attribute: "Incantation",
        role: "Support",
        tier: "S+",
        avatar: "https://static.wikia.nocookie.net/neverness-to-everness/images/3/32/Sakiri_Card.png/revision/latest/scale-to-width-down/200?cb=20260309141104",
        summary: "Найкращий саппорт у грі. Стягує ворогів, накладає потужне зниження опору до стихій та баффає силу атаки всієї команди після активації вибуху стихій.",
        weapon: "Good Boy's Grand Adventure (Сигнатурний)",
        weaponF2p: "Failing You, Heavy in My Heart",
        cartridge: "Speedy Hedgehog (4-piece)",
        stats: ["Cycle Intensity", "Break Effect", "Energy Charge Efficiency", "ATK%"],
        teamSynergy: "Nanally (Аніма), Zero (Космос), Daffodil (Хаос)",
        lore: "Весела та енергійна дівчина, яка завжди носить із собою іграшкового кролика. Здатна бачити приховані нитки долі за допомогою заклять."
    },
    {
        id: "jiuyuan",
        name: "Jiuyuan (Цзююань)",
        rarity: 5,
        attribute: "Anima",
        role: "Sub-DPS",
        tier: "S",
        avatar: "https://static.wikia.nocookie.net/neverness-to-everness/images/5/57/Jiuyuan_Card.png/revision/latest/scale-to-width-down/200?cb=20260309140453",
        summary: "Потужний суб-ДПС, який наносить швидку вибухову шкоду. Ідеально підходить для активації реакції Blossom (Цвітіння) разом з Наналлі.",
        weapon: "Jade Dragon Whisper (Сигнатурний)",
        weaponF2p: "Rising Wind (Порив Вітру)",
        cartridge: "Fireflies and the Forest (4-piece)",
        stats: ["Crit Rate", "Crit DMG", "Anima DMG", "Energy Charge Efficiency"],
        teamSynergy: "Nanally (Аніма), Sakiri (Закляття), Zero (Космос)",
        lore: "Мисливиця на аномалії стародавнього роду з витонченими манерами. Використовує віяло для виклику аномальних повітряних потоків."
    },
    {
        id: "hotori",
        name: "Hotori (Хоторі)",
        rarity: 5,
        attribute: "Cosmos",
        role: "Sub-DPS",
        tier: "S",
        avatar: "https://static.wikia.nocookie.net/neverness-to-everness/images/4/41/Hotori_in_game_Model.png/revision/latest/scale-to-width-down/200?cb=20260223173459",
        summary: "Унікальний саппорт/саб-ДПС, здатний записувати та повторювати навички активних членів загону, подвоюючи загальну шкоду команди.",
        weapon: "Echoes of Eternity",
        weaponF2p: "Appraiser's Notebook",
        cartridge: "Speedy Hedgehog (4-piece)",
        stats: ["Energy Charge Efficiency", "Cycle Intensity", "ATK%", "HP%"],
        teamSynergy: "Nanally (Аніма), Adler (Хаос), Haniel (Закляття)",
        lore: "Тихий оцінювач аномальних предметів, який проводить більшу частину часу в бібліотеці антикварної крамниці Eibon."
    },
    {
        id: "zero",
        name: "Zero (Зеро)",
        rarity: 5,
        attribute: "Cosmos",
        role: "Support",
        tier: "S",
        avatar: "https://static.wikia.nocookie.net/neverness-to-everness/images/c/c2/Esper_Zero_Male_Card.png/revision/latest/scale-to-width-down/200?cb=20260315121329",
        summary: "Головний герой. Володіє Cosmos атрибутом, що є універсальним каталізатором для активації ефекту Esper Cycle для будь-якої іншої стихії.",
        weapon: "Eibon Legacy (Спадщина Ейбона)",
        weaponF2p: "Hunter's Resolve (Рішучість Мисливця)",
        cartridge: "Speedy Hedgehog (4-piece)",
        stats: ["ATK%", "Crit Rate", "Cycle Intensity", "Energy Charge Efficiency"],
        teamSynergy: "Будь-який ДПС персонаж стихії Anima або Incantation",
        lore: "Новий володар антикварної крамниці Eibon, що втратив спогади про своє минуле, але володіє дивним даром бачити сутність аномалій."
    },
    {
        id: "adler",
        name: "Adler (Адлер)",
        rarity: 4,
        attribute: "Incantation",
        role: "Support",
        tier: "A",
        avatar: "https://static.wikia.nocookie.net/neverness-to-everness/images/3/33/Adler_Card.png/revision/latest/scale-to-width-down/200?cb=20260309120100",
        summary: "Надійний щитовик стихії Incantation. Створює міцний щит, міцність якого масштабується від його захисту (DEF), та допомагає збивати стійкість ворогів.",
        weapon: "Sentinel's Barrier",
        weaponF2p: "Rusty Alloy Shield",
        cartridge: "Speedy Hedgehog (4-piece) або Guard Set",
        stats: ["DEF%", "Flat DEF", "Break Effect", "Energy Charge Efficiency"],
        teamSynergy: "Nanally (Аніма), Sakiri (Закляття), Zero (Космос)",
        lore: "Колишній охоронець, який тепер допомагає крамниці Eibon із важкими замовленнями у небезпечних зонах Hethereau."
    },
    {
        id: "mint",
        name: "Mint (Мінт)",
        rarity: 4,
        attribute: "Anima",
        role: "Main DPS",
        tier: "A",
        avatar: "https://static.wikia.nocookie.net/neverness-to-everness/images/2/20/Mint_Card.png/revision/latest/scale-to-width-down/200?cb=20260307142424",
        summary: "Хороший безкоштовний F2P ДПС персонаж. Проста механіка комбо-атак та швидка перезарядка елементальних умінь.",
        weapon: "Zephyr Blade",
        weaponF2p: "Steel Rapier",
        cartridge: "Fireflies and the Forest (4-piece)",
        stats: ["ATK%", "Crit Rate", "Crit DMG", "Anima DMG"],
        teamSynergy: "Zero (Космос), Haniel (Закляття), Adler (Хаос)",
        lore: "Молода стажерка в Eibon, яка прагне стати найкращим оцінювачем аномалій у місті."
    },
    {
        id: "haniel",
        name: "Haniel (Ханіель)",
        rarity: 4,
        attribute: "Psyche",
        role: "Support",
        tier: "A",
        avatar: "https://static.wikia.nocookie.net/neverness-to-everness/images/b/b9/Haniel_Card.png/revision/latest/scale-to-width-down/200?cb=20260309131027",
        summary: "Потужний саппорт стихії Psyche. Баффає силу атаки загону та викликає помічника Hootie, який допомагає наносити шкоду та підтримувати союзників.",
        weapon: "Mind Royale (Рояль Розуму)",
        weaponF2p: "Ready-Ready (Реді-Реді)",
        cartridge: "Tiny Big Adventure (4-piece)",
        stats: ["ATK%", "Crit Rate", "Psyche DMG", "Energy Charge Efficiency"],
        teamSynergy: "Mint (Аніма), Zero (Космос), Adler (Закляття)",
        lore: "Турботлива та мила дівчина, яка завжди носить із собою іграшкового сову-помічника Hootie, здатного надихати союзників під час бою."
    },
    {
        id: "lacrimosa",
        name: "Lacrimosa (Лакрімоза)",
        rarity: 5,
        attribute: "Chaos",
        role: "Main DPS",
        tier: "S",
        avatar: "https://static.wikia.nocookie.net/neverness-to-everness/images/3/37/Lacrimosa_-_Character_Showcase.jpg/revision/latest/scale-to-width-down/200?cb=20241229191213",
        summary: "Новий анонсований персонаж версії 1.1. Спеціалізується на Chaos шкоді та потужних комбо-атаках масками.",
        weapon: "Tragedy & Comedy (Сигнатурний)",
        weaponF2p: "Failing You, Heavy in My Heart",
        cartridge: "Chaos Eclipse (4-piece)",
        stats: ["Crit Rate", "Crit DMG", "Chaos DMG", "ATK%"],
        teamSynergy: "Sakiri (Закляття), Zero (Космос), Hotori (Космос)",
        lore: "Театральна акторка, чиї вистави зачаровують глядачів Гетеро. Кажуть, що її маски мають власне аномальне життя."
    },
    {
        id: "daffodil",
        name: "Daffodil (Даффоділ)",
        rarity: 5,
        attribute: "Chaos",
        role: "Main DPS",
        tier: "S",
        avatar: "https://static.wikia.nocookie.net/neverness-to-everness/images/a/af/Daffodill_Card.png/revision/latest/scale-to-width-down/200?cb=20260309135850",
        summary: "Потужний Burst DPS стихії Chaos, що спеціалізується на пробитті щитів (Break). Накопичує силу поза полем бою і завдає величезної вибухової шкоди при перемиканні.",
        weapon: "Youthful Fantasy (Сигнатурний Arc)",
        weaponF2p: "Shiny Days (Світлі Дні)",
        cartridge: "Chaos Eclipse (4-piece)",
        stats: ["Break Intensity", "Crit Rate", "Crit DMG", "ATK%"],
        teamSynergy: "Nanally (Аніма), Zero (Космос), Sakiri (Закляття)",
        lore: "Мовчазна та загадкова охоронниця антикварної крамниці Eibon. Володіє калейдоскопічними очима і приховує під холодною маскою відданість друзям."
    },
    {
        id: "baicang",
        name: "Baicang (Байцан)",
        rarity: 5,
        attribute: "Incantation",
        role: "Main DPS",
        tier: "S",
        avatar: "https://static.wikia.nocookie.net/neverness-to-everness/images/5/5c/Baicang_Card.png",
        summary: "Потужний Main DPS стихії Incantation. Використовує механіку витрати власного здоров'я для підвищення шкоди. Потребує надійного цілителя в команді.",
        weapon: "Camellia Society (Товариство Камелій)",
        weaponF2p: "A Time Will Come (Час прийде)",
        cartridge: "Crimson: Twin Butterflies (4-piece)",
        stats: ["Crit Rate", "Crit DMG", "Incantation DMG", "ATK%"],
        teamSynergy: "Haniel (Закляття), Sakiri (Закляття), Adler (Хаос)",
        lore: "Капітан підрозділу ETD-4 Бюро контролю аномалій. Досвідчений ветеран з невимушеним характером, який піклується про своїх підлеглих як старший брат."
    },
    {
        id: "chiz",
        name: "Chiz (Чіз)",
        rarity: 5,
        attribute: "Cosmos",
        role: "Main DPS",
        tier: "S",
        avatar: "https://static.wikia.nocookie.net/neverness-to-everness/images/2/21/Chiz_Card.png",
        summary: "Потужний Main DPS стихії Cosmos. Її ультимейт ігнорує велику частину захисту ворога, а сигнатурна зброя дає додаткову шкоду залежно від ваших Fons (монет).",
        weapon: "Contemplative Cat (Замислений Кот)",
        weaponF2p: "Wild Reverie (Дика мрія)",
        cartridge: "Lost Radiance (4-piece)",
        stats: ["Crit Rate", "Crit DMG", "Cosmos DMG", "ATK%"],
        teamSynergy: "Zero (Космос), Sakiri (Закляття), Hotori (Космос)",
        lore: "Персонаж, пов'язаний із Безіменним Банком. Має ділову жилку та користується важким молотом-йокай для вибивання боргів та аномалій."
    },
    {
        id: "fadia",
        name: "Fadia (Фадія)",
        rarity: 5,
        attribute: "Psyche",
        role: "Support",
        tier: "S",
        avatar: "https://static.wikia.nocookie.net/neverness-to-everness/images/6/68/Fadia_Card.png",
        summary: "Потужний Sustain-персонаж стихії Psyche. Працює як танк-цілитель, що перенаправляє шкоду союзників на себе та відновлює здоров'я в режимі Lilith.",
        weapon: "Eternal Waltz (Вічний вальс)",
        weaponF2p: "Medic's Flask (Флакон медика)",
        cartridge: "Tiny Big Adventure (4-piece)",
        stats: ["HP%", "Flat HP", "Psyche DMG", "Energy Charge Efficiency"],
        teamSynergy: "Baicang (Закляття), Nanally (Аніма), Zero (Космос)",
        lore: "Дивовижна дівчина-вампір з Бюро контролю аномалій, яка носить із собою гігантський надгробок як щит та зброю."
    },
    {
        id: "hathor",
        name: "Hathor (Хатор)",
        rarity: 5,
        attribute: "Lakshana",
        role: "Sub-DPS",
        tier: "S",
        avatar: "https://static.wikia.nocookie.net/neverness-to-everness/images/3/30/Hathor_Card.png",
        summary: "Потужний Burst Sub-DPS стихії Lakshana. Використовує механіку накопичення стаків Express Delivery Power для завдання величезної вибухової шкоди.",
        weapon: "Raging Flames (Лють Полум'я)",
        weaponF2p: "Sentinel's Barrier (Бар'єр Вартового)",
        cartridge: "Street Boxer (4-piece)",
        stats: ["Crit Rate", "Crit DMG", "Lakshana DMG", "ATK%"],
        teamSynergy: "Zero (Космос), Sakiri (Закляття), Daffodil (Хаос)",
        lore: "Впливова дівчина-фіксер з елітних кіл Гетеро, яка тісно співпрацює зі Sterry Express. Її витонченість приховує неперевершені бойові вміння."
    },
    {
        id: "aurelia",
        name: "Aurelia (Аурелія)",
        rarity: 4,
        attribute: "Psyche",
        role: "Main DPS",
        tier: "A",
        avatar: "https://static.wikia.nocookie.net/neverness-to-everness/images/f/fd/Aurelia_-_Character_Promo.png",
        summary: "A-Rank Main DPS стихії Psyche. Використовує атаки медуз у стані Cadenza для нанесення значної шкоди. Отримується безкоштовно за 3-денний вхід.",
        weapon: "Stellar Veil (Зоряна Вуаль)",
        weaponF2p: "Oraora! (Ораора!)",
        cartridge: "Devil's Blood: Curse (4-piece)",
        stats: ["Crit Rate", "Crit DMG", "Psyche DMG", "ATK%"],
        teamSynergy: "Zero (Космос), Fadia (Психея), Sakiri (Закляття)",
        lore: "Студентка-музикант у Гетеро, яка виявила в собі аномальні здібності під час одного з вуличних виступів. Керує аномальними медузами."
    },
    {
        id: "edgar",
        name: "Edgar (Едгар)",
        rarity: 4,
        attribute: "Cosmos",
        role: "Support",
        tier: "A",
        avatar: "https://static.wikia.nocookie.net/neverness-to-everness/images/1/1d/Edgar_Card.png",
        summary: "Доступний цілитель стихії Cosmos. Його навички відновлюють здоров'я союзникам пропорційно його максимальному HP, а ультимейт створює велику зону лікування.",
        weapon: "Call of the Twisted City (Заклик викривленого міста)",
        weaponF2p: "Mind Royale (Рояль Розуму)",
        cartridge: "Thea's Night Tavern (4-piece)",
        stats: ["HP%", "Healing Bonus", "Flat HP", "Energy Charge Efficiency"],
        teamSynergy: "Zero (Космос), Hotori (Космос), Jiuyuan (Аніма)",
        lore: "Співробітник антикварної крамниці Eibon. Спокійний та врівноважений юнак, який завжди готовий надати першу допомогу та смачний гарячий чай."
    },
    {
        id: "skia",
        name: "Skia (Скіа)",
        rarity: 4,
        attribute: "Lakshana",
        role: "Sub-DPS",
        tier: "A",
        avatar: "https://static.wikia.nocookie.net/neverness-to-everness/images/0/01/Skia_by_nte_1.jpg/revision/latest/scale-to-width-down/1200?cb=20260212004246",
        summary: "Потужний суб-ДПС стихії Lakshana, який спеціалізується на мітках Fang Thrust та унікальних навичках прихованості в тіні. Чудово доповнює команди на реакції Remora.",
        weapon: "Watch Your Heads! (Стережись голів!)",
        weaponF2p: "Good Boy's Grand Adventure (Велика пригода хорошого хлопчика)",
        cartridge: "Street Boxer (4-piece)",
        stats: ["Crit Rate", "Crit DMG", "Lakshana DMG", "ATK%"],
        teamSynergy: "Zero (Космос), Sakiri (Закляття), Nanally (Аніма)",
        lore: "Лейтенант підрозділу ETD-4 Бюро контролю аномалій. Мовчазний вовк-офіцер із великим шрамом на лівому оці, який вірно несе службу."
    }
];

const FALLBACK_PROMO_CODES = [
    { code: "NTE429vtuber", rewards: "30,000 Beetle Coins, 30,000 Fons", active: true },
    { code: "NTEWINFONS", rewards: "10,000 Fons", active: true },
    { code: "NTEFUNGAME", rewards: "10,000 Fons", active: true },
    { code: "NTENENE", rewards: "10,000 Clicky Fries, 10 DynamiK", active: true },
    { code: "NTEFREE", rewards: "30,000 Fons", active: true },
    { code: "NTEvtuber200", rewards: "10,000 Beetle Coins, 10,000 Fons", active: true },
    { code: "NTEGIFT", rewards: "50 Annulith, 5 Rising Hunter Guides, 5 Light Dye", active: true },
    { code: "504980102FKGOVNS", rewards: "30 Annulith, 1 Gubichi Flavor Chips, 20,000 Beetle Coins", active: true }
];

const FALLBACK_TIMELINE_EVENTS = [
    {
        date: "29 Квітня 2026",
        title: "Глобальний Реліз Neverness to Everness (1.0)",
        desc: "Офіційний запуск гри на PC, iOS та Android. Доступні початкові розділи сюжету в місті Гетеро, лімітований банер Наналлі, а також стартові події.",
        status: "Released",
        badgeClass: "badge-anima"
    },
    {
        date: "23 Травня 2026",
        title: "Стрім Розробників: Презентація Версії 1.1",
        desc: "Спеціальна трансляція від Hotta Studio. Анонсовано нових персонажів Lacrimosa (Хаос ДПС), нові локації міста, ігрові режими та промокоди.",
        status: "Released",
        badgeClass: "badge-incant"
    },
    {
        date: "3-4 Червня 2026",
        title: "Оновлення 1.1: 'Lacrimosa of Chaos'",
        desc: "Вихід першого великого патчу. Старт першої фази банера з Лакрімозою. Новий сюжетний епізод 'Театр Тіней'. Початок літнього івенту.",
        status: "Upcoming",
        badgeClass: "badge-chaos"
    },
    {
        date: "Липень 2026 (Прогноз)",
        title: "Оновлення 1.2 та нові герої Shinku й Iroi",
        desc: "Очікуване оновлення на основі витоків інформації. Додавання нових аномальних зон на півночі Гетеро та вихід нових персонажів S-рангу.",
        status: "Upcoming",
        badgeClass: "badge-phase"
    }
];

// 3. FIRESTORE DATA LOADING
async function loadFromFirestore() {
    if (typeof firebase === 'undefined' || typeof db === 'undefined') {
        console.warn('Firebase not initialized, using fallback data');
        return false;
    }

    try {
        // Load characters
        const charsSnapshot = await db.collection('characters').get();
        if (!charsSnapshot.empty) {
            CHARACTERS = charsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            localStorage.setItem('nte_characters', JSON.stringify(CHARACTERS));
            console.log(`✅ Loaded ${CHARACTERS.length} characters from Firestore`);
        }

        // Load promo codes
        const codesSnapshot = await db.collection('promoCodes').where('active', '==', true).get();
        if (!codesSnapshot.empty) {
            PROMO_CODES = codesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            localStorage.setItem('nte_promoCodes', JSON.stringify(PROMO_CODES));
            console.log(`✅ Loaded ${PROMO_CODES.length} promo codes from Firestore`);
        }

        // Load timeline events
        const timelineSnapshot = await db.collection('timelineEvents').orderBy('order', 'asc').get();
        if (!timelineSnapshot.empty) {
            TIMELINE_EVENTS = timelineSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            localStorage.setItem('nte_timelineEvents', JSON.stringify(TIMELINE_EVENTS));
            console.log(`✅ Loaded ${TIMELINE_EVENTS.length} timeline events from Firestore`);
        }

        dataSource = 'firestore';
        return true;
    } catch (error) {
        console.warn('Firestore load failed:', error.message);
        return false;
    }
}

function loadFromCache() {
    try {
        const cachedChars = localStorage.getItem('nte_characters');
        const cachedCodes = localStorage.getItem('nte_promoCodes');
        const cachedTimeline = localStorage.getItem('nte_timelineEvents');

        if (cachedChars) CHARACTERS = JSON.parse(cachedChars);
        if (cachedCodes) PROMO_CODES = JSON.parse(cachedCodes);
        if (cachedTimeline) TIMELINE_EVENTS = JSON.parse(cachedTimeline);

        if (cachedChars || cachedCodes || cachedTimeline) {
            dataSource = 'cache';
            console.log('📦 Loaded data from localStorage cache');
            return true;
        }
    } catch (e) {
        console.warn('Cache load failed:', e);
    }
    return false;
}

function loadFallbackData() {
    CHARACTERS = [...FALLBACK_CHARACTERS];
    PROMO_CODES = [...FALLBACK_PROMO_CODES];
    TIMELINE_EVENTS = [...FALLBACK_TIMELINE_EVENTS];
    dataSource = 'hardcoded';
    console.log('📋 Using hardcoded fallback data');
}

// Setup realtime listeners for promo codes (auto-update when admin changes them)
function setupRealtimeListeners() {
    if (typeof firebase === 'undefined' || typeof db === 'undefined') return;

    try {
        // Realtime listener for promo codes
        db.collection('promoCodes')
            .where('active', '==', true)
            .onSnapshot((snapshot) => {
                if (!snapshot.empty) {
                    PROMO_CODES = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    localStorage.setItem('nte_promoCodes', JSON.stringify(PROMO_CODES));
                    renderPromoCodes();
                    console.log('🔄 Promo codes updated in realtime');
                }
            }, (error) => {
                console.warn('Promo codes realtime listener error:', error);
            });

        // Realtime listener for characters (for tier changes, new chars)
        db.collection('characters').onSnapshot((snapshot) => {
            if (!snapshot.empty) {
                CHARACTERS = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                localStorage.setItem('nte_characters', JSON.stringify(CHARACTERS));
                renderTierList();
                renderBuilds();
                renderCalculatorSetup();
                console.log('🔄 Characters updated in realtime');
            }
        }, (error) => {
            console.warn('Characters realtime listener error:', error);
        });
    } catch (e) {
        console.warn('Realtime listeners setup failed:', e);
    }
}

// Helper to render character avatars (supports both image URLs and emojis, with proxying to bypass hotlinking blockers)
function renderAvatarHtml(char) {
    if (char && char.avatar && char.avatar.startsWith('http')) {
        let cleanUrl = char.avatar;
        if (cleanUrl.includes('/revision/')) {
            cleanUrl = cleanUrl.split('/revision/')[0];
        }
        const proxiedUrl = `https://images.weserv.nl/?url=${encodeURIComponent(cleanUrl)}&w=200`;
        return `<img src="${proxiedUrl}" alt="${char.name}" class="avatar-img" referrerpolicy="no-referrer">`;
    }
    return char ? char.avatar : '';
}

// 4. APPLICATION STATE
let currentSquad = [null, null, null, null]; // Slots for Team Builder
let activeSelectorSlot = null;

// 5. INITIALIZATION & ROUTING
document.addEventListener("DOMContentLoaded", async () => {
    // Try loading data in priority order: Firestore → Cache → Hardcoded fallback
    const firestoreSuccess = await loadFromFirestore();
    
    if (!firestoreSuccess) {
        const cacheSuccess = loadFromCache();
        if (!cacheSuccess) {
            loadFallbackData();
        }
    }

    // Also try loading codes.json as additional fallback for promo codes
    if (PROMO_CODES.length === 0) {
        try {
            const res = await fetch('codes.json');
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
                PROMO_CODES = data;
            }
        } catch (e) {
            console.warn('codes.json fallback also failed');
        }
    }

    // If still no promo codes, use fallback
    if (PROMO_CODES.length === 0) {
        PROMO_CODES = [...FALLBACK_PROMO_CODES];
    }

    // Initialize all UI components
    initNavigation();
    renderTierList();
    renderBuilds();
    renderCalculatorSetup();
    renderTimeline();
    setupTeamBuilder();
    setupCalculatorEvents();
    renderPromoCodes();

    // Setup realtime listeners for live updates
    setupRealtimeListeners();

    // Setup Auth and Community Tier lists
    initAuthAndUserTierlists();

    // Hide loading overlay
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
    }

    // Show data source indicator
    const sourceEmoji = dataSource === 'firestore' ? '🔥' : dataSource === 'cache' ? '📦' : '📋';
    console.log(`${sourceEmoji} App initialized with data from: ${dataSource}`);
    
    // Logo Click returns to Home
    document.getElementById("headerLogo").addEventListener("click", () => switchTab("home"));
});

// Navigation logic
function initNavigation() {
    const navBtns = document.querySelectorAll(".nav-btn");
    const panes = document.querySelectorAll(".tab-pane");
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    navBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetTab = btn.getAttribute("data-tab");
            switchTab(targetTab);
            
            // Close mobile menu on click
            mainNav.classList.remove("active");
        });
    });

    menuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("active");
    });
}

function switchTab(tabId) {
    // Update nav active states
    const navBtns = document.querySelectorAll(".nav-btn");
    navBtns.forEach(btn => {
        if (btn.getAttribute("data-tab") === tabId) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    // Update tab panes
    const panes = document.querySelectorAll(".tab-pane");
    panes.forEach(pane => {
        if (pane.id === `pane-${tabId}`) {
            pane.classList.add("active");
        } else {
            pane.classList.remove("active");
        }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// 6. TIER LIST RENDERING
function renderTierList() {
    const searchVal = document.getElementById("charSearch").value.toLowerCase();
    const activeRarity = document.querySelector("#filter-rarity .active").getAttribute("data-rarity");
    const activeAttribute = document.querySelector("#filter-attribute .active").getAttribute("data-attribute");
    const activeRole = document.querySelector("#filter-role .active").getAttribute("data-role");

    // Clear rows
    const grids = {
        "S+": document.getElementById("tier-S-plus-grid"),
        "S": document.getElementById("tier-S-grid"),
        "A": document.getElementById("tier-A-grid"),
        "B": document.getElementById("tier-B-grid")
    };
    
    Object.values(grids).forEach(grid => grid.innerHTML = "");

    // Filter characters
    const filtered = CHARACTERS.filter(char => {
        const matchesSearch = char.name.toLowerCase().includes(searchVal);
        const matchesRarity = activeRarity === "all" ? true : (activeRarity === "S" ? char.rarity === 5 : char.rarity === 4);
        const matchesAttr = activeAttribute === "all" ? true : char.attribute === activeAttribute;
        const matchesRole = activeRole === "all" ? true : char.role === activeRole;
        return matchesSearch && matchesRarity && matchesAttr && matchesRole;
    });

    // Populate rows
    let counts = { "S+": 0, "S": 0, "A": 0, "B": 0 };
    
    filtered.forEach(char => {
        const card = document.createElement("div");
        card.className = `char-card rarity-${char.rarity}`;
        card.innerHTML = `
            <span class="char-card-attr-badge attr-${char.attribute.toLowerCase()}">${char.attribute[0]}</span>
            <div class="char-card-avatar">${renderAvatarHtml(char)}</div>
            <div class="char-card-name">${char.name.split(" ")[0]}</div>
            <div class="char-card-meta">${char.role}</div>
        `;
        card.addEventListener("click", () => openCharacterModal(char.id));
        
        if (grids[char.tier]) {
            grids[char.tier].appendChild(card);
            counts[char.tier]++;
        }
    });

    // Show empty message if a row has 0 elements
    Object.keys(grids).forEach(tier => {
        if (counts[tier] === 0) {
            grids[tier].innerHTML = `<div class="no-chars-alert">Персонажів не знайдено</div>`;
        }
    });
}

// Setup Tier List Filter Buttons
const rarityBtns = document.querySelectorAll("#filter-rarity .filter-btn");
rarityBtns.forEach(btn => btn.addEventListener("click", (e) => {
    rarityBtns.forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    renderTierList();
}));

const attributeBtns = document.querySelectorAll("#filter-attribute .filter-btn");
attributeBtns.forEach(btn => btn.addEventListener("click", (e) => {
    attributeBtns.forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    renderTierList();
}));

const roleBtns = document.querySelectorAll("#filter-role .filter-btn");
roleBtns.forEach(btn => btn.addEventListener("click", (e) => {
    roleBtns.forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    renderTierList();
}));

document.getElementById("charSearch").addEventListener("input", renderTierList);

// 7. BUILDS RENDERING
function renderBuilds() {
    const buildsGrid = document.getElementById("buildsGrid");
    buildsGrid.innerHTML = "";

    // Show S and S+ character builds on builds tab
    const buildChars = CHARACTERS.filter(c => c.tier === "S+" || c.tier === "S" || c.id === "adler" || c.id === "mint");

    buildChars.forEach(char => {
        const card = document.createElement("div");
        card.className = "build-card";
        
        const statsTags = char.stats.map(s => `<span class="stat-tag">${s}</span>`).join("");

        card.innerHTML = `
            <div class="build-card-header">
                <div class="build-char-avatar rarity-${char.rarity}">${renderAvatarHtml(char)}</div>
                <div class="build-header-info">
                    <h3>${char.name}</h3>
                    <span class="badge attr-${char.attribute.toLowerCase()}">${char.attribute} • ${char.role}</span>
                </div>
            </div>
            
            <div class="build-grid-details">
                <div class="build-section-block">
                    <span class="build-section-label">Найкраща Зброя (Arc)</span>
                    <span class="build-section-value">${char.weapon}</span>
                </div>
                <div class="build-section-block">
                    <span class="build-section-label">F2P Альтернатива</span>
                    <span class="build-section-value">${char.weaponF2p}</span>
                </div>
                <div class="build-section-block">
                    <span class="build-section-label">Набір Картриджів</span>
                    <span class="build-section-value">${char.cartridge}</span>
                </div>
                <div class="build-section-block">
                    <span class="build-section-label">Пріоритет Статів</span>
                    <div class="stat-pri-list">${statsTags}</div>
                </div>
            </div>
            
            <div class="build-card-teams">
                <span class="build-section-label">Рекомендовані партнери:</span>
                <p style="font-size:0.9rem; margin-top:0.2rem; color:var(--text-muted);">${char.teamSynergy}</p>
            </div>
        `;
        buildsGrid.appendChild(card);
    });
}

// 8. DETAIL MODAL LOGIC
function openCharacterModal(charId) {
    const char = CHARACTERS.find(c => c.id === charId);
    if (!char) return;

    const modal = document.getElementById("charModalOverlay");
    const detailContainer = document.getElementById("modalCharDetail");

    const statsTags = char.stats.map(s => `<span class="stat-tag">${s}</span>`).join("");

    detailContainer.innerHTML = `
        <div class="modal-char-header">
            <div class="modal-avatar-big rarity-${char.rarity}">${renderAvatarHtml(char)}</div>
            <div class="modal-header-desc">
                <h2>${char.name}</h2>
                <div class="modal-char-meta-row">
                    <span class="badge ${char.rarity === 5 ? 'badge-hot' : 'badge-cosmos'}">${char.rarity}★ Ранг</span>
                    <span class="badge attr-${char.attribute.toLowerCase()}">${char.attribute}</span>
                    <span class="badge badge-anima">${char.role}</span>
                    <span class="badge badge-incant">Tier ${char.tier}</span>
                </div>
            </div>
        </div>

        <div class="modal-char-body">
            <div class="modal-section">
                <h4>Опис Персонажа</h4>
                <p>${char.summary}</p>
            </div>

            <div class="modal-section">
                <h4>Найкращий Білд</h4>
                <div class="modal-gear-blocks">
                    <div class="gear-item">
                        <span class="build-section-label">Рекомендований Arc (Зброя)</span>
                        <div class="gear-title">${char.weapon}</div>
                        <div class="gear-note">Дає найкращі базові характеристики та унікальний пасивний бафф.</div>
                    </div>
                    <div class="gear-item">
                        <span class="build-section-label">F2P Зброя</span>
                        <div class="gear-title">${char.weaponF2p}</div>
                        <div class="gear-note">Легко отримати під час квестів або крафту.</div>
                    </div>
                    <div class="gear-item">
                        <span class="build-section-label">Набір Картриджів</span>
                        <div class="gear-title">${char.cartridge}</div>
                        <div class="gear-note">Активує потужний бонус від 4-х частин набору.</div>
                    </div>
                    <div class="gear-item">
                        <span class="build-section-label">Суб-характеристики</span>
                        <div class="stat-pri-list" style="margin-top:0.4rem;">${statsTags}</div>
                    </div>
                </div>
            </div>

            <div class="modal-section">
                <h4>Синергія та Загін</h4>
                <p><strong>Рекомендована команда:</strong> ${char.teamSynergy}</p>
                <p style="margin-top:0.5rem;"><strong>Історія персонажа:</strong> ${char.lore}</p>
            </div>
        </div>
    `;

    modal.classList.add("active");
}

// Modal Close logic
document.getElementById("modalCloseBtn").addEventListener("click", () => {
    document.getElementById("charModalOverlay").classList.remove("active");
});
document.getElementById("charModalOverlay").addEventListener("click", (e) => {
    if (e.target.id === "charModalOverlay") {
        document.getElementById("charModalOverlay").classList.remove("active");
    }
});

// 9. TEAM BUILDER LOGIC
function setupTeamBuilder() {
    const slots = document.querySelectorAll(".char-slot");
    slots.forEach(slot => {
        slot.addEventListener("click", () => {
            activeSelectorSlot = parseInt(slot.getAttribute("data-slot"));
            openSelectorModal();
        });
    });

    document.getElementById("clearSquadBtn").addEventListener("click", () => {
        currentSquad = [null, null, null, null];
        updateTeamSlotsUI();
        evaluateTeamSynergy();
    });
}

function openSelectorModal() {
    const overlay = document.getElementById("selectorModalOverlay");
    const grid = document.getElementById("selectorGrid");
    grid.innerHTML = "";

    // Load characters not in squad
    CHARACTERS.forEach(char => {
        const isAlreadyInSquad = currentSquad.some(s => s && s.id === char.id);
        
        const card = document.createElement("div");
        card.className = "select-card";
        if (isAlreadyInSquad) {
            card.style.opacity = "0.4";
            card.style.cursor = "not-allowed";
        }
        
        card.innerHTML = `
            <div class="select-card-avatar rarity-${char.rarity}">${renderAvatarHtml(char)}</div>
            <div class="select-card-name">${char.name.split(" ")[0]}</div>
            <span class="badge attr-${char.attribute.toLowerCase()}" style="font-size:0.6rem; padding: 0.1rem 0.3rem; margin-top:0.2rem;">${char.attribute}</span>
        `;
        
        if (!isAlreadyInSquad) {
            card.addEventListener("click", () => {
                selectCharacterForSlot(char);
                overlay.classList.remove("active");
            });
        }
        
        grid.appendChild(card);
    });

    overlay.classList.add("active");
}

document.getElementById("selectorCloseBtn").addEventListener("click", () => {
    document.getElementById("selectorModalOverlay").classList.remove("active");
});
document.getElementById("selectorModalOverlay").addEventListener("click", (e) => {
    if (e.target.id === "selectorModalOverlay") {
        document.getElementById("selectorModalOverlay").classList.remove("active");
    }
});

function selectCharacterForSlot(char) {
    if (activeSelectorSlot !== null) {
        currentSquad[activeSelectorSlot] = char;
        updateTeamSlotsUI();
        evaluateTeamSynergy();
    }
}

function updateTeamSlotsUI() {
    for (let i = 0; i < 4; i++) {
        const slotEl = document.getElementById(`slot-${i}`);
        const char = currentSquad[i];
        
        if (char) {
            slotEl.innerHTML = `
                <div class="slot-filled-card">
                    <button class="slot-remove-btn" data-slot="${i}">&times;</button>
                    <div class="slot-filled-avatar rarity-${char.rarity}">${renderAvatarHtml(char)}</div>
                    <div class="char-card-name">${char.name.split(" ")[0]}</div>
                    <span class="badge attr-${char.attribute.toLowerCase()}">${char.attribute} • ${char.role}</span>
                </div>
            `;
            // Re-bind click only on remove button, and prevent slot click triggers
            const removeBtn = slotEl.querySelector(".slot-remove-btn");
            removeBtn.addEventListener("click", (e) => {
                e.stopPropagation(); // Avoid opening selector modal
                currentSquad[i] = null;
                updateTeamSlotsUI();
                evaluateTeamSynergy();
            });
        } else {
            slotEl.innerHTML = `
                <div class="slot-empty">
                    <span class="slot-plus">+</span>
                    <span class="slot-label">${i === 0 ? 'Слот 1 (Лідер)' : `Слот ${i + 1}`}</span>
                </div>
            `;
        }
    }
}

function evaluateTeamSynergy() {
    const activeChars = currentSquad.filter(c => c !== null);
    const badgesContainer = document.getElementById("synergyElements");
    const reactionsContainer = document.getElementById("synergyReactions");
    const descContainer = document.getElementById("synergyDescription");
    const ratingEl = document.getElementById("synergyRating");

    if (activeChars.length === 0) {
        badgesContainer.innerHTML = `<span class="no-synergy-text">Виберіть персонажів для початку розрахунку.</span>`;
        reactionsContainer.innerHTML = "";
        descContainer.innerHTML = `<p>Додайте мисливців у слоти вище. Система автоматично проаналізує їхні класи, стихії та виведе оптимальну послідовність навичок (ротацію) для бою.</p>`;
        ratingEl.innerText = "-";
        return;
    }

    // Display active character attributes
    badgesContainer.innerHTML = activeChars.map(c => `
        <span class="badge attr-${c.attribute.toLowerCase()}">${c.name.split(" ")[0]} (${c.attribute})</span>
    `).join("");

    // Calculate elements count
    const attributes = activeChars.map(c => c.attribute);
    const roles = activeChars.map(c => c.role);
    
    const count = {};
    attributes.forEach(a => count[a] = (count[a] || 0) + 1);

    let reactions = [];
    let rating = "B";
    let rotation = "";

    // Check Reactions
    // 1. Blossom Reaction (2+ Anima)
    if (count["Anima"] >= 2) {
        reactions.push({
            name: "Блоссом / Цвітіння (Blossom Reaction)",
            desc: "Активовано! Загін отримує +15% швидкості накопичення енергії та підвищене Аніма-пошкодження. Ідеально підходить для розгону авто-атак Наналлі."
        });
    }

    // 2. Esper Cycle (Cosmos + any other attribute)
    if (count["Cosmos"] >= 1 && (count["Anima"] >= 1 || count["Incantation"] >= 1 || count["Chaos"] >= 1 || count["Psyche"] >= 1 || count["Lakshana"] >= 1)) {
        reactions.push({
            name: "Цикл Есперів (Esper Cycle)",
            desc: "Активовано! Cosmos-атрибут (наприклад, Зеро чи Чіз) виступає в ролі прискорювача. Зміна персонажів наповнює шкалу Esper Meter на 30% швидше."
        });
    }

    // 3. Scorch Reaction (Anima + Incantation)
    if (count["Anima"] >= 1 && count["Incantation"] >= 1) {
        reactions.push({
            name: "Випалювання (Scorch)",
            desc: "Активовано! Створює термічну реакцію, що підпалює цілі навколо та наносить DoT (періодичне пошкодження) кожні 1.5 секунди."
        });
    }

    // 4. Charged Reaction (Chaos + Incantation)
    if (count["Chaos"] >= 1 && count["Incantation"] >= 1) {
        reactions.push({
            name: "Зарядження (Charged)",
            desc: "Активовано! Накладає дебафф 'Зниження стабільності' на ворогів, що дозволяє легше збивати їхні щити та збивати з ніг."
        });
    }

    // 5. Remora Reaction (Cosmos + Lakshana)
    if (count["Cosmos"] >= 1 && count["Lakshana"] >= 1) {
        reactions.push({
            name: "Ремора (Remora)",
            desc: "Активовано! Реакція між Lakshana та Cosmos. Збільшує шанс критичного удару на 10% та суттєво підвищує фізичну і космічну шкоду загону."
        });
    }

    // 6. Discord Reaction (Incantation/Chaos + Psyche)
    if ((count["Incantation"] >= 1 || count["Chaos"] >= 1) && count["Psyche"] >= 1) {
        reactions.push({
            name: "Розбрат (Discord)",
            desc: "Активовано! Елементи Chaos/Incantation створюють ментальний дисонанс з Psyche, знижуючи стабільність ворогів та наносячи на 25% більше шкоди по пробитих щитах."
        });
    }

    // 7. Stain Reaction (Lakshana + Psyche)
    if (count["Lakshana"] >= 1 && count["Psyche"] >= 1) {
        reactions.push({
            name: "Пляма (Stain)",
            desc: "Активовано! Поєднання Lakshana та Psyche спотворює сприйняття ворогів, змушуючи їх отримувати додаткову періодичну шкоду та послаблюючи їхню атаку."
        });
    }

    // 8. Nova Reaction (Anima + Psyche)
    if (count["Anima"] >= 1 && count["Psyche"] >= 1) {
        reactions.push({
            name: "Нова (Nova)",
            desc: "Активовано! Аніма та Психея викликають елементальний вибух розуму, що наносить колосальну площинну (AoE) шкоду навколишнім ворогам."
        });
    }

    // Evaluate Rating
    if (activeChars.length === 4) {
        const hasMainDps = roles.includes("Main DPS");
        const hasSupport = roles.includes("Support");
        
        if (hasMainDps && hasSupport && reactions.length >= 2) {
            rating = "S";
        } else if (hasMainDps && reactions.length >= 1) {
            rating = "A";
        } else {
            rating = "B";
        }
    } else {
        rating = "C";
    }

    // Render reactions
    if (reactions.length > 0) {
        reactionsContainer.innerHTML = reactions.map(r => `
            <div class="reaction-item">
                <div class="reaction-name">${r.name}</div>
                <div class="reaction-desc">${r.desc}</div>
            </div>
        `).join("");
    } else {
        reactionsContainer.innerHTML = `<p class="no-synergy-text" style="font-size:0.85rem;">Немає активних елементальних реакцій. Спробуйте поєднати інші стихії.</p>`;
    }

    // Generate Rotation Text based on squad
    const hasSakiri = activeChars.some(c => c.id === "sakiri");
    const hasZero = activeChars.some(c => c.id === "zero");
    const hasNanally = activeChars.some(c => c.id === "nanally");
    const hasJiuyuan = activeChars.some(c => c.id === "jiuyuan");

    if (hasNanally && hasSakiri && hasZero) {
        rotation = "<strong>Оптимальна ротація для бою:</strong><br>1. Почніть із <strong>Sakiri</strong>: стягніть ворогів умінням і запустіть ультимейт для зрізу опорів.<br>2. Переключіться на <strong>Zero</strong>: активуйте його поле, що запускає реакцію <em>Esper Cycle</em>.<br>3. Перейдіть на <strong>Nanally</strong>: виконайте посилену серію комбо під дією гравітації та ультимейт для фінального вибуху.";
    } else if (hasNanally && hasJiuyuan) {
        rotation = "<strong>Оптимальна ротація (Blossom):</strong><br>1. Використовуйте <strong>Jiuyuan</strong> для нанесення швидкої шкоди та накладання Аніма-статусу.<br>2. Перейдіть на <strong>Nanally</strong> для безперервного виклику реакції <em>Blossom</em> та нанесення основної шкоди.";
    } else if (activeChars.length >= 2) {
        const support = activeChars.find(c => c.role === "Support");
        const dps = activeChars.find(c => c.role === "Main DPS");
        if (support && dps) {
            rotation = `<strong>Бойова порада:</strong><br>Починайте бій за саппорта <strong>${support.name.split(" ")[0]}</strong> для накладання ефектів контролю та баффів, після чого переключайтеся на ДПС <strong>${dps.name.split(" ")[0]}</strong> для завдання максимальної шкоди під баффами.`;
        } else {
            rotation = "<strong>Бойова порада:</strong><br>Для збалансованого загону рекомендується мати принаймні одного Main DPS персонажа та одного Support. Експериментуйте з додаванням героїв Cosmos для прискорення ротацій.";
        }
    } else {
        rotation = "Додайте більше персонажів у команду для генерації тактичних порад.";
    }

    ratingEl.innerText = rating;
    descContainer.innerHTML = `<p>${rotation}</p>`;
}

// 10. RESOURCE CALCULATOR LOGIC

// 1. Progression Constants
const CHAR_EXP_BY_LEVEL = [];
const WEAPON_EXP_BY_LEVEL = [];

const CHAR_BREAKTHROUGH_TABLE = {
    20: { coins: 15000, boss: 2, specialty: 3, commonT1: 3, commonT2: 0, commonT3: 0 },
    40: { coins: 30000, boss: 5, specialty: 8, commonT1: 8, commonT2: 3, commonT3: 0 },
    50: { coins: 50000, boss: 8, specialty: 12, commonT1: 15, commonT2: 8, commonT3: 0 },
    60: { coins: 80000, boss: 12, specialty: 20, commonT1: 0, commonT2: 12, commonT3: 4 },
    70: { coins: 120000, boss: 20, specialty: 30, commonT1: 0, commonT2: 16, commonT3: 8 }
};

const WEAPON_BREAKTHROUGH_TABLE = {
    20: { coins: 10000, oreT1: 3, oreT2: 0, oreT3: 0, commonT1: 3, commonT2: 0, commonT3: 0 },
    40: { coins: 20000, oreT1: 6, oreT2: 3, oreT3: 0, commonT1: 6, commonT2: 2, commonT3: 0 },
    50: { coins: 35000, oreT1: 0, oreT2: 6, oreT3: 0, commonT1: 10, commonT2: 5, commonT3: 0 },
    60: { coins: 55000, oreT1: 0, oreT2: 10, oreT3: 3, commonT1: 0, commonT2: 8, commonT3: 3 },
    70: { coins: 85000, oreT1: 0, oreT2: 0, oreT3: 6, commonT1: 0, commonT2: 12, commonT3: 6 }
};

const SKILL_COST_TABLE = {
    1: { coins: 3000, scrollsT1: 2, scrollsT2: 0, scrollsT3: 0, commonT1: 0, commonT2: 0, commonT3: 0, boss: 0, crown: 0 },
    2: { coins: 6000, scrollsT1: 4, scrollsT2: 0, scrollsT3: 0, commonT1: 3, commonT2: 0, commonT3: 0, boss: 0, crown: 0 },
    3: { coins: 12000, scrollsT1: 0, scrollsT2: 2, scrollsT3: 0, commonT1: 4, commonT2: 0, commonT3: 0, boss: 0, crown: 0 },
    4: { coins: 20000, scrollsT1: 0, scrollsT2: 4, scrollsT3: 0, commonT1: 0, commonT2: 3, commonT3: 0, boss: 0, crown: 0 },
    5: { coins: 35000, scrollsT1: 0, scrollsT2: 6, scrollsT3: 0, commonT1: 0, commonT2: 5, commonT3: 0, boss: 0, crown: 0 },
    6: { coins: 60000, scrollsT1: 0, scrollsT2: 0, scrollsT3: 4, commonT1: 0, commonT2: 6, commonT3: 0, boss: 0, crown: 0 },
    7: { coins: 100000, scrollsT1: 0, scrollsT2: 0, scrollsT3: 6, commonT1: 0, commonT2: 0, commonT3: 4, boss: 1, crown: 0 },
    8: { coins: 180000, scrollsT1: 0, scrollsT2: 0, scrollsT3: 8, commonT1: 0, commonT2: 0, commonT3: 6, boss: 2, crown: 0 },
    9: { coins: 300000, scrollsT1: 0, scrollsT2: 0, scrollsT3: 12, commonT1: 0, commonT2: 0, commonT3: 8, boss: 3, crown: 1 }
};

const ATTRIBUTE_MATERIALS = {
    "Anima": {
        boss: "Ядро боса: Гравітаційний Павук",
        specialty: "Anima-кристали лісу",
        farmSpecialty: "Збір у Лісовій Аномалії Hethereau",
        farmBoss: "Світовий бос: Гравітаційний Павук",
        common: {
            T1: "Пилок аномальних рослин",
            T2: "Стебло хижої квітки",
            T3: "Суть живого лісу",
            farm: "Рослинні аномалії в парках"
        },
        scrolls: {
            T1: "Сувій сили природи",
            T2: "Гайд по контролю флори",
            T3: "Таємниці Аніми",
            farm: "Rabbit Hole (Понеділок/Четвер)"
        }
    },
    "Incantation": {
        boss: "Ядро боса: Вогняний Кролик",
        specialty: "Спеціальність: Квіти закляття",
        farmSpecialty: "Збір у східних районах Гетеро",
        farmBoss: "Світовий бос: Вогняний Кролик",
        common: {
            T1: "Попіл згаслих рун",
            T2: "Фрагмент палаючої руни",
            T3: "Стародавнє ядро заклять",
            farm: "Магічні аномалії в місті"
        },
        scrolls: {
            T1: "Ескіз магічних знаків",
            T2: "Підручник ритуалів",
            T3: "Гримуар Таємних Слів",
            farm: "Rabbit Hole (Вівторок/П'ятниця)"
        }
    },
    "Cosmos": {
        boss: "Ядро боса: Кронос-Вартовий",
        specialty: "Спеціальність: Зоряний пил",
        farmSpecialty: "Секретні дахи та хмарочоси",
        farmBoss: "Світовий бос: Кронос-Вартовий",
        common: {
            T1: "Уламок метеорита",
            T2: "Космічний пил",
            T3: "Сутність сингулярності",
            farm: "Космічні тіні у центрі міста"
        },
        scrolls: {
            T1: "Малюнок сузір'я",
            T2: "Зоряна мапа Hethereau",
            T3: "Сувої Нескінченного Космосу",
            farm: "Rabbit Hole (Середа/Субота)"
        }
    },
    "Chaos": {
        boss: "Ядро боса: Руйнівник Масок",
        specialty: "Спеціальність: Шарми хаосу",
        farmSpecialty: "Аномальні провулки Гетеро",
        farmBoss: "Світовий бос: Руйнівник Масок",
        common: {
            T1: "Тріснута маска",
            T2: "Театральна маска",
            T3: "Маска істинної сутності",
            farm: "Міражі хаосу та міми"
        },
        scrolls: {
            T1: "Записки божевільного",
            T2: "П'єса трагікомедії",
            T3: "Хроніки Парадоксу",
            farm: "Rabbit Hole (Четвер/Неділя)"
        }
    },
    "Psyche": {
        boss: "Ядро боса: Володар Кошмарів",
        specialty: "Спеціальність: Психічні кристали",
        farmSpecialty: "Дзеркальні аномальні галереї",
        farmBoss: "Світовий бос: Володар Кошмарів",
        common: {
            T1: "Фрагмент спогаду",
            T2: "Скляна сльоза",
            T3: "Дзеркало чистої свідомості",
            farm: "Дзеркальні фантоми"
        },
        scrolls: {
            T1: "Текст гіпнозу",
            T2: "Книга сновидінь",
            T3: "Концепт Несвідомого",
            farm: "Rabbit Hole (П'ятниця/Неділя)"
        }
    },
    "Lakshana": {
        boss: "Ядро боса: Вартовий Закону",
        specialty: "Спеціальність: Кристали порядку",
        farmSpecialty: "Зони фінансового кварталу",
        farmBoss: "Світовий бос: Вартовий Закону",
        common: {
            T1: "Іржава шестерня",
            T2: "Срібний поршень",
            T3: "Золотий годинниковий механізм",
            farm: "Механічні годинникові міньйони"
        },
        scrolls: {
            T1: "Статут Бюро",
            T2: "Звід законів Гетеро",
            T3: "Директиви Чистого Порядку",
            farm: "Rabbit Hole (Субота/Неділя)"
        }
    }
};

const WEAPON_MATERIALS = {
    T1: "Компонент зброї T1",
    T2: "Модифікатор зброї T2",
    T3: "Нано-ядро зброї T3",
    farm: "Rabbit Hole: Прорив Зброї"
};

let calcInventory = {};
let calculatedRequirements = {}; // Store computed required totals for inventory sync

// Initialize progression tables programmatically
function initCalculatorData() {
    for (let l = 1; l <= 80; l++) {
        // Character level EXP cost
        let charXp = 0;
        if (l < 20) charXp = 800 + l * 400;
        else if (l < 40) charXp = 6000 + (l - 20) * 1200;
        else if (l < 50) charXp = 25000 + (l - 40) * 3500;
        else if (l < 60) charXp = 50000 + (l - 50) * 8000;
        else if (l < 70) charXp = 100000 + (l - 60) * 15000;
        else charXp = 200000 + (l - 70) * 30000;
        
        CHAR_EXP_BY_LEVEL[l] = {
            xp: charXp,
            coins: Math.round(charXp * 0.2)
        };

        // Weapon level EXP cost
        let weapXp = 0;
        if (l < 20) weapXp = 500 + l * 250;
        else if (l < 40) weapXp = 4000 + (l - 20) * 800;
        else if (l < 50) weapXp = 16000 + (l - 40) * 2200;
        else if (l < 60) weapXp = 32000 + (l - 50) * 5000;
        else if (l < 70) weapXp = 64000 + (l - 60) * 9000;
        else weapXp = 120000 + (l - 70) * 18000;
        
        WEAPON_EXP_BY_LEVEL[l] = {
            xp: weapXp,
            coins: Math.round(weapXp * 0.15)
        };
    }
    
    // Load inventory cache
    try {
        const cached = localStorage.getItem('nte_calc_inventory');
        if (cached) calcInventory = JSON.parse(cached);
    } catch (e) {
        console.warn('Could not load inventory:', e);
    }
}

// Generate inline SVG icons
function getMaterialIcon(id) {
    const colors = {
        grey: '#90a4ae',
        green: '#4db6ac',
        blue: '#4fc3f7',
        purple: '#ba68c8',
        gold: '#ffd54f',
        red: '#e57373'
    };

    if (id === 'coin') {
        return `<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="${colors.gold}" stroke="#d4af37" stroke-width="2"/><circle cx="24" cy="24" r="14" fill="none" stroke="#d4af37" stroke-width="1" stroke-dasharray="3,3" opacity="0.7"/><text x="24" y="30" text-anchor="middle" font-size="18" font-weight="bold" fill="#8B6914">$</text></svg>`;
    }
    if (id.includes('exp_basic') || id.includes('dye_basic') || id.includes('scroll_basic') || id.includes('ore_basic')) {
        return `<svg viewBox="0 0 48 48"><rect x="12" y="8" width="24" height="32" rx="3" fill="${colors.green}" stroke="#00796b" stroke-width="2"/><path d="M16 18h16M16 26h16" stroke="#e0f2f1" stroke-width="2" stroke-linecap="round"/></svg>`;
    }
    if (id.includes('exp_medium') || id.includes('dye_medium') || id.includes('scroll_medium') || id.includes('ore_medium')) {
        return `<svg viewBox="0 0 48 48"><rect x="12" y="8" width="24" height="32" rx="3" fill="${colors.blue}" stroke="#0288d1" stroke-width="2"/><path d="M16 18h16M16 26h16" stroke="#e1f5fe" stroke-width="2" stroke-linecap="round"/></svg>`;
    }
    if (id.includes('exp_elite') || id.includes('dye_elite') || id.includes('scroll_elite') || id.includes('ore_elite')) {
        return `<svg viewBox="0 0 48 48"><rect x="12" y="8" width="24" height="32" rx="3" fill="${colors.purple}" stroke="#7b1fa2" stroke-width="2"/><path d="M16 18h16M16 26h16" stroke="#f3e5f5" stroke-width="2" stroke-linecap="round"/></svg>`;
    }
    if (id === 'boss') {
        return `<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="18" fill="${colors.red}" stroke="#c62828" stroke-width="2"/><path d="M16 22a3 3 0 0 1 6 0M26 22a3 3 0 0 1 6 0M18 32q6 4 12 0" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>`;
    }
    if (id === 'specialty') {
        return `<svg viewBox="0 0 48 48"><polygon points="24,6 38,20 32,42 16,42 10,20" fill="${colors.purple}" stroke="#7b1fa2" stroke-width="2"/><polygon points="24,6 30,20 24,42 18,20" fill="#e1bee7" opacity="0.6"/><circle cx="24" cy="24" r="3" fill="#fff" opacity="0.8"/></svg>`;
    }
    if (id.includes('common_t1')) {
        return `<svg viewBox="0 0 48 48"><polygon points="24,10 38,34 10,34" fill="${colors.grey}" stroke="#37474f" stroke-width="2"/></svg>`;
    }
    if (id.includes('common_t2')) {
        return `<svg viewBox="0 0 48 48"><polygon points="24,10 38,34 10,34" fill="${colors.green}" stroke="#004d40" stroke-width="2"/></svg>`;
    }
    if (id.includes('common_t3')) {
        return `<svg viewBox="0 0 48 48"><polygon points="24,10 38,34 10,34" fill="${colors.purple}" stroke="#4a148c" stroke-width="2"/></svg>`;
    }
    if (id === 'crown') {
        return `<svg viewBox="0 0 48 48"><path d="M8 38 L12 16 L20 26 L24 10 L28 26 L36 16 L40 38 Z" fill="${colors.gold}" stroke="#b58900" stroke-width="2"/><ellipse cx="24" cy="38" rx="14" ry="3" fill="#fff" opacity="0.4"/></svg>`;
    }
    return `<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="18" fill="${colors.grey}"/></svg>`;
}

function renderCalculatorSetup() {
    initCalculatorData();

    // Populate characters
    const select = document.getElementById("calcCharacter");
    const activeList = CHARACTERS.length > 0 ? CHARACTERS : FALLBACK_CHARACTERS;
    select.innerHTML = activeList.map(c => `<option value="${c.id}">${c.name}</option>`).join("");

    // Populate skills select options (1-10)
    for (let i = 0; i < 4; i++) {
        const startSelect = document.getElementById(`skillStart_${i}`);
        const endSelect = document.getElementById(`skillEnd_${i}`);
        if (startSelect && endSelect) {
            startSelect.innerHTML = Array.from({length: 10}, (_, k) => `<option value="${k+1}">Lvl ${k+1}</option>`).join("");
            endSelect.innerHTML = Array.from({length: 10}, (_, k) => `<option value="${k+1}" ${k===7 ? 'selected' : ''}>Lvl ${k+1}</option>`).join("");
        }
    }

    // Set initial calculations
    setTimeout(() => {
        calculateResources();
    }, 100);
}

// Setup events & bi-directional bindings
function setupCalculatorEvents() {
    const startRange = document.getElementById("calcLevelStart");
    const startNum = document.getElementById("calcLevelStartNum");
    const endRange = document.getElementById("calcLevelEnd");
    const endNum = document.getElementById("calcLevelEndNum");
    const charSelect = document.getElementById("calcCharacter");

    const wStartRange = document.getElementById("calcWeaponLevelStart");
    const wStartNum = document.getElementById("calcWeaponLevelStartNum");
    const wEndRange = document.getElementById("calcWeaponLevelEnd");
    const wEndNum = document.getElementById("calcWeaponLevelEndNum");
    const weaponActive = document.getElementById("calcWeaponActive");
    const weaponRarity = document.getElementById("calcWeaponRarity");

    // Sync helper
    function syncControl(slider, num, isStart, otherNum, limits) {
        let val = parseInt(slider.value);
        num.value = val;

        // Constraint: Start level must be <= End level
        if (isStart) {
            if (val > parseInt(otherNum.value)) {
                otherNum.value = val;
                // Dispatch event to sync other slider
                otherNum.dispatchEvent(new Event('input'));
            }
        } else {
            if (val < parseInt(otherNum.value)) {
                otherNum.value = val;
                otherNum.dispatchEvent(new Event('input'));
            }
        }
        calculateResources();
    }

    // Bind slider -> number
    startRange.addEventListener("input", () => syncControl(startRange, startNum, true, endNum));
    endRange.addEventListener("input", () => syncControl(endRange, endNum, false, startNum));
    wStartRange.addEventListener("input", () => syncControl(wStartRange, wStartNum, true, wEndNum));
    wEndRange.addEventListener("input", () => syncControl(wEndRange, wEndNum, false, wStartNum));

    // Bind number -> slider
    function syncNumInput(num, slider, minVal, maxVal) {
        let val = parseInt(num.value);
        if (isNaN(val) || val < minVal) val = minVal;
        if (val > maxVal) val = maxVal;
        num.value = val;
        slider.value = val;
        
        // Trigger constraints by firing input on slider
        slider.dispatchEvent(new Event('input'));
    }

    startNum.addEventListener("change", () => syncNumInput(startNum, startRange, 1, 80));
    endNum.addEventListener("change", () => syncNumInput(endNum, endRange, 1, 80));
    wStartNum.addEventListener("change", () => syncNumInput(wStartNum, wStartRange, 1, 80));
    wEndNum.addEventListener("change", () => syncNumInput(wEndNum, wEndRange, 1, 80));

    // Character changes
    charSelect.addEventListener("change", () => {
        calculateResources();
    });

    // Skill dropdown selections
    for (let i = 0; i < 4; i++) {
        document.getElementById(`skillStart_${i}`).addEventListener("change", (e) => {
            // Constraint: start <= end
            const startVal = parseInt(e.target.value);
            const endSelect = document.getElementById(`skillEnd_${i}`);
            if (parseInt(endSelect.value) < startVal) {
                endSelect.value = startVal;
            }
            calculateResources();
        });
        document.getElementById(`skillEnd_${i}`).addEventListener("change", (e) => {
            const endVal = parseInt(e.target.value);
            const startSelect = document.getElementById(`skillStart_${i}`);
            if (parseInt(startSelect.value) > endVal) {
                startSelect.value = endVal;
            }
            calculateResources();
        });
    }

    // Weapon toggles
    weaponActive.addEventListener("change", () => {
        const block = document.getElementById("weaponSettingsBlock");
        block.style.opacity = weaponActive.checked ? "1" : "0.4";
        block.style.pointerEvents = weaponActive.checked ? "auto" : "none";
        calculateResources();
    });

    weaponRarity.addEventListener("change", () => {
        calculateResources();
    });

    // Calculator inner tab navigation
    const tabBtns = document.querySelectorAll(".calc-tab-btn");
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const tabName = btn.getAttribute("data-calc-tab");
            document.querySelectorAll(".calc-tab-content").forEach(pane => {
                pane.classList.remove("active");
            });
            document.getElementById(`calc-tab-${tabName}`).classList.add("active");
        });
    });

    // Inventory inputs listener (delegated)
    const listContainer = document.getElementById("calcMaterialsList");
    listContainer.addEventListener("input", (e) => {
        if (e.target.classList.contains("mat-have-input")) {
            const matId = e.target.getAttribute("data-mat-id");
            let val = parseInt(e.target.value);
            if (isNaN(val) || val < 0) val = 0;
            e.target.value = val;
            
            calcInventory[matId] = val;
            saveInventory();
            updateSingleMaterialCard(matId, val);
        }
    });

    // Reset inventory button
    document.getElementById("btnClearInventory").addEventListener("click", () => {
        calcInventory = {};
        saveInventory();
        document.querySelectorAll(".mat-have-input").forEach(input => {
            input.value = 0;
        });
        // Re-evaluate completion highlights
        Object.keys(calculatedRequirements).forEach(matId => {
            updateSingleMaterialCard(matId, 0);
        });
        showToast("Склад очищено!");
    });

    // Export report
    document.getElementById("btnExportReport").addEventListener("click", () => {
        exportCalcReport();
    });
}

function saveInventory() {
    localStorage.setItem('nte_calc_inventory', JSON.stringify(calcInventory));
}

// Update deficit display in real-time without rebuild to keep input focus
function updateSingleMaterialCard(matId, haveAmount) {
    const card = document.getElementById(`mat-card-${matId}`);
    if (!card) return;

    const needed = calculatedRequirements[matId] || 0;
    const remaining = Math.max(0, needed - haveAmount);
    
    const needValEl = card.querySelector(".mat-val");
    const labelTextEl = card.querySelector(".mat-need");

    if (remaining === 0) {
        card.classList.add("mat-completed");
        if (labelTextEl) labelTextEl.innerHTML = `Потрібно: <span class="mat-val">${needed.toLocaleString()}</span> (Готово)`;
    } else {
        card.classList.remove("mat-completed");
        if (labelTextEl) labelTextEl.innerHTML = `Залишилось: <span class="mat-val">${remaining.toLocaleString()}</span> / ${needed.toLocaleString()}`;
    }
}

function calculateResources() {
    const charId = document.getElementById("calcCharacter").value;
    const activeList = CHARACTERS.length > 0 ? CHARACTERS : FALLBACK_CHARACTERS;
    const char = activeList.find(c => c.id === charId);
    if (!char) return;

    // Render Preview Card
    document.getElementById("calcPreviewName").innerText = char.name;
    document.getElementById("calcPreviewAttr").innerText = char.attribute;
    document.getElementById("calcPreviewAttr").className = `badge attr-${char.attribute.toLowerCase()}`;
    document.getElementById("calcPreviewRarity").innerText = `${char.rarity}★ Ранг`;
    document.getElementById("calcPreviewRarity").className = `badge ${char.rarity === 5 ? 'badge-hot' : 'badge-cosmos'}`;
    
    const avatarContainer = document.getElementById("calcPreviewAvatar");
    avatarContainer.innerHTML = renderAvatarHtml(char);
    avatarContainer.className = `calc-preview-avatar rarity-${char.rarity}`;

    // Read Character level inputs
    const startLvl = parseInt(document.getElementById("calcLevelStart").value) || 1;
    const endLvl = parseInt(document.getElementById("calcLevelEnd").value) || 80;
    document.getElementById("valLevelStart").innerText = startLvl;
    document.getElementById("valLevelEnd").innerText = endLvl;
    document.getElementById("calcLevelStartNum").value = startLvl;
    document.getElementById("calcLevelEndNum").value = endLvl;

    // Sum Char Level Costs
    let totalCharExp = 0;
    let totalCharCoins = 0;
    for (let l = startLvl; l < endLvl; l++) {
        totalCharExp += CHAR_EXP_BY_LEVEL[l].xp;
        totalCharCoins += CHAR_EXP_BY_LEVEL[l].coins;
    }

    // Sum Char Breakthrough Costs
    let totalCharBoss = 0;
    let totalCharSpecialty = 0;
    let totalCharCommonT1 = 0;
    let totalCharCommonT2 = 0;
    let totalCharCommonT3 = 0;
    let totalCharBtCoins = 0;

    const breakthroughLevels = [20, 40, 50, 60, 70];
    for (let bt of breakthroughLevels) {
        if (startLvl <= bt && endLvl > bt) {
            const cost = CHAR_BREAKTHROUGH_TABLE[bt];
            totalCharBoss += cost.boss;
            totalCharSpecialty += cost.specialty;
            totalCharCommonT1 += cost.commonT1;
            totalCharCommonT2 += cost.commonT2;
            totalCharCommonT3 += cost.commonT3;
            totalCharBtCoins += cost.coins;
        }
    }

    // Sum Skills Costs
    let totalSkillCoins = 0;
    let totalSkillScrollsT1 = 0;
    let totalSkillScrollsT2 = 0;
    let totalSkillScrollsT3 = 0;
    let totalSkillCommonT1 = 0;
    let totalSkillCommonT2 = 0;
    let totalSkillCommonT3 = 0;
    let totalSkillBoss = 0;
    let totalSkillCrown = 0;

    for (let i = 0; i < 4; i++) {
        const skStart = parseInt(document.getElementById(`skillStart_${i}`).value) || 1;
        const skEnd = parseInt(document.getElementById(`skillEnd_${i}`).value) || 1;
        
        for (let lvl = skStart; lvl < skEnd; lvl++) {
            const cost = SKILL_COST_TABLE[lvl];
            totalSkillCoins += cost.coins;
            totalSkillScrollsT1 += cost.scrollsT1;
            totalSkillScrollsT2 += cost.scrollsT2;
            totalSkillScrollsT3 += cost.scrollsT3;
            totalSkillCommonT1 += cost.commonT1;
            totalSkillCommonT2 += cost.commonT2;
            totalSkillCommonT3 += cost.commonT3;
            totalSkillBoss += cost.boss;
            totalSkillCrown += cost.crown;
        }
    }

    // Sum Weapon Costs
    let totalWeapExp = 0;
    let totalWeapCoins = 0;
    let totalWeapOreT1 = 0;
    let totalWeapOreT2 = 0;
    let totalWeapOreT3 = 0;
    let totalWeapCommonT1 = 0;
    let totalWeapCommonT2 = 0;
    let totalWeapCommonT3 = 0;
    let totalWeapBtCoins = 0;

    const includeWeapon = document.getElementById("calcWeaponActive").checked;
    if (includeWeapon) {
        const wStartLvl = parseInt(document.getElementById("calcWeaponLevelStart").value) || 1;
        const wEndLvl = parseInt(document.getElementById("calcWeaponLevelEnd").value) || 80;
        const wRarity = parseInt(document.getElementById("calcWeaponRarity").value) || 4;
        
        document.getElementById("valWeaponLevelStart").innerText = wStartLvl;
        document.getElementById("valWeaponLevelEnd").innerText = wEndLvl;
        document.getElementById("calcWeaponLevelStartNum").value = wStartLvl;
        document.getElementById("calcWeaponLevelEndNum").value = wEndLvl;

        // Multiplier based on weapon rarity
        const rarityMult = wRarity === 5 ? 1.25 : wRarity === 4 ? 1.0 : 0.75;

        // Weapon Exp & Coin Costs
        for (let l = wStartLvl; l < wEndLvl; l++) {
            totalWeapExp += Math.round(WEAPON_EXP_BY_LEVEL[l].xp * rarityMult);
            totalWeapCoins += Math.round(WEAPON_EXP_BY_LEVEL[l].coins * rarityMult);
        }

        // Weapon Breakthrough Costs
        for (let bt of breakthroughLevels) {
            if (wStartLvl <= bt && wEndLvl > bt) {
                const cost = WEAPON_BREAKTHROUGH_TABLE[bt];
                totalWeapOreT1 += Math.round(cost.oreT1 * rarityMult);
                totalWeapOreT2 += Math.round(cost.oreT2 * rarityMult);
                totalWeapOreT3 += Math.round(cost.oreT3 * rarityMult);
                totalWeapCommonT1 += Math.round(cost.commonT1 * rarityMult);
                totalWeapCommonT2 += Math.round(cost.commonT2 * rarityMult);
                totalWeapCommonT3 += Math.round(cost.commonT3 * rarityMult);
                totalWeapBtCoins += Math.round(cost.coins * rarityMult);
            }
        }
    }

    // Consolidate Totals
    const finalCoins = totalCharCoins + totalCharBtCoins + totalSkillCoins + totalWeapCoins + totalWeapBtCoins;
    
    // Character guides breakdown (1 elite = 10k, 1 med = 2k, 1 basic = 500)
    let charExpRem = totalCharExp;
    const guidesElite = Math.floor(charExpRem / 10000);
    charExpRem %= 10000;
    const guidesMed = Math.floor(charExpRem / 2000);
    charExpRem %= 2000;
    const guidesBasic = Math.ceil(charExpRem / 500);

    // Weapon dyes breakdown (1 elite = 10k, 1 med = 2k, 1 basic = 500)
    let weapExpRem = totalWeapExp;
    const dyesElite = Math.floor(weapExpRem / 10000);
    weapExpRem %= 10000;
    const dyesMed = Math.floor(weapExpRem / 2000);
    weapExpRem %= 2000;
    const dyesBasic = Math.ceil(weapExpRem / 500);

    // Specific names based on character attribute
    const attrDetails = ATTRIBUTE_MATERIALS[char.attribute] || ATTRIBUTE_MATERIALS["Anima"];

    // Combine common materials
    const finalCommonT1 = totalCharCommonT1 + totalSkillCommonT1 + totalWeapCommonT1;
    const finalCommonT2 = totalCharCommonT2 + totalSkillCommonT2 + totalWeapCommonT2;
    const finalCommonT3 = totalCharCommonT3 + totalSkillCommonT3 + totalWeapCommonT3;

    // Combine Boss drops
    const finalBoss = totalCharBoss + totalSkillBoss;

    // Set requirements object globally to check on have-input triggers
    calculatedRequirements = {
        coin: finalCoins,
        exp_elite: guidesElite,
        exp_medium: guidesMed,
        exp_basic: guidesBasic,
        dye_elite: dyesElite,
        dye_medium: dyesMed,
        dye_basic: dyesBasic,
        boss: finalBoss,
        specialty: totalCharSpecialty,
        common_t1: finalCommonT1,
        common_t2: finalCommonT2,
        common_t3: finalCommonT3,
        scroll_t1: totalSkillScrollsT1,
        scroll_t2: totalSkillScrollsT2,
        scroll_t3: totalSkillScrollsT3,
        crown: totalSkillCrown,
        ore_t1: totalWeapOreT1,
        ore_t2: totalWeapOreT2,
        ore_t3: totalWeapOreT3
    };

    // Render HTML Categories
    const resultsGrid = document.getElementById("calcMaterialsList");
    resultsGrid.innerHTML = "";

    function addCategoryHeader(title) {
        const h = document.createElement("div");
        h.className = "materials-cat-header";
        h.innerText = title;
        resultsGrid.appendChild(h);
    }

    function addMaterialCard(id, name, needed, farmLoc) {
        if (needed <= 0) return;
        
        const have = calcInventory[id] || 0;
        const remaining = Math.max(0, needed - have);
        const isCompleted = remaining === 0;

        const card = document.createElement("div");
        card.className = `material-card ${isCompleted ? 'mat-completed' : ''}`;
        card.id = `mat-card-${id}`;
        
        card.innerHTML = `
            <div class="mat-card-top">
                <div class="mat-icon">${getMaterialIcon(id)}</div>
                <div class="mat-card-info">
                    <span class="mat-card-name">${name}</span>
                    <span class="mat-card-farm">${farmLoc}</span>
                </div>
            </div>
            <div class="mat-card-mid">
                <span class="mat-need">
                    ${isCompleted ? `Потрібно: <span class="mat-val">${needed.toLocaleString()}</span>` : `Залишилось: <span class="mat-val">${remaining.toLocaleString()}</span> / ${needed.toLocaleString()}`}
                </span>
                <span class="mat-completed-badge">✓ Готово</span>
                <div class="mat-have-input-wrapper">
                    <span class="mat-have-label">Маю:</span>
                    <input type="number" class="mat-have-input" data-mat-id="${id}" min="0" value="${have}">
                </div>
            </div>
        `;
        resultsGrid.appendChild(card);
    }

    // 1. Currency & Exp Guides
    addCategoryHeader("Основні Валюти & Досвід");
    addMaterialCard("coin", "Beetle Coins (Золото)", finalCoins, "Rabbit Hole / Квести / Машини");
    addMaterialCard("exp_elite", "Elite Hunter Guide (EXP 10k)", guidesElite, "Rabbit Hole: Досвід");
    addMaterialCard("exp_medium", "Medium Hunter Guide (EXP 2k)", guidesMed, "Rabbit Hole: Досвід");
    addMaterialCard("exp_basic", "Basic Hunter Guide (EXP 500)", guidesBasic, "Rabbit Hole: Досвід");
    if (includeWeapon) {
        addMaterialCard("dye_elite", "Elite Weapon Dye (Dye 10k)", dyesElite, "Rabbit Hole: Зброя");
        addMaterialCard("dye_medium", "Medium Weapon Dye (Dye 2k)", dyesMed, "Rabbit Hole: Зброя");
        addMaterialCard("dye_basic", "Basic Weapon Dye (Dye 500)", dyesBasic, "Rabbit Hole: Зброя");
    }

    // 2. Breakthrough Materials
    if (totalCharSpecialty > 0 || finalBoss > 0 || (includeWeapon && (totalWeapOreT1 + totalWeapOreT2 + totalWeapOreT3 > 0))) {
        addCategoryHeader("Матеріали Прориву (Breakthrough)");
        addMaterialCard("boss", attrDetails.boss, finalBoss, attrDetails.farmBoss);
        addMaterialCard("specialty", attrDetails.specialty, totalCharSpecialty, attrDetails.farmSpecialty);
        if (includeWeapon) {
            addMaterialCard("ore_t1", WEAPON_MATERIALS.T1, totalWeapOreT1, WEAPON_MATERIALS.farm);
            addMaterialCard("ore_t2", WEAPON_MATERIALS.T2, totalWeapOreT2, WEAPON_MATERIALS.farm);
            addMaterialCard("ore_t3", WEAPON_MATERIALS.T3, totalWeapOreT3, WEAPON_MATERIALS.farm);
        }
    }

    // 3. Skill Scrolls
    if (totalSkillScrollsT1 + totalSkillScrollsT2 + totalSkillScrollsT3 + totalSkillCrown > 0) {
        addCategoryHeader("Матеріали Навичок");
        addMaterialCard("scroll_t1", attrDetails.scrolls.T1, totalSkillScrollsT1, attrDetails.scrolls.farm);
        addMaterialCard("scroll_t2", attrDetails.scrolls.T2, totalSkillScrollsT2, attrDetails.scrolls.farm);
        addMaterialCard("scroll_t3", attrDetails.scrolls.T3, totalSkillScrollsT3, attrDetails.scrolls.farm);
        addMaterialCard("crown", "Корона Аномалії (Anomaly Crown)", totalSkillCrown, "Сезонні події / Особливі квести");
    }

    // 4. Common Enemy Drops
    if (finalCommonT1 + finalCommonT2 + finalCommonT3 > 0) {
        addCategoryHeader("Трофеї з Ворогів");
        addMaterialCard("common_t1", attrDetails.common.T1, finalCommonT1, attrDetails.common.farm);
        addMaterialCard("common_t2", attrDetails.common.T2, finalCommonT2, attrDetails.common.farm);
        addMaterialCard("common_t3", attrDetails.common.T3, finalCommonT3, attrDetails.common.farm);
    }
}

// Generate text report and copy to clipboard
function exportCalcReport() {
    const charSelect = document.getElementById("calcCharacter");
    const charName = charSelect.options[charSelect.selectedIndex].text;
    
    const startLvl = document.getElementById("calcLevelStart").value;
    const endLvl = document.getElementById("calcLevelEnd").value;
    
    let report = `=== EIBON TERMINAL: ЗВІТ ПРО РЕСУРСИ ===\n`;
    report += `Мисливець: ${charName} (Рівень ${startLvl} ➔ ${endLvl})\n`;
    
    // Skill levels
    report += `Навички:\n`;
    const skillLabels = ["Авто-атака", "Активна", "Пасивна", "Ультимейт"];
    for (let i = 0; i < 4; i++) {
        const start = document.getElementById(`skillStart_${i}`).value;
        const end = document.getElementById(`skillEnd_${i}`).value;
        report += `  - ${skillLabels[i]}: Рівень ${start} ➔ ${end}\n`;
    }

    // Weapon
    const includeWeapon = document.getElementById("calcWeaponActive").checked;
    if (includeWeapon) {
        const wRarity = document.getElementById("calcWeaponRarity").value;
        const wStart = document.getElementById("calcWeaponLevelStart").value;
        const wEnd = document.getElementById("calcWeaponLevelEnd").value;
        report += `Зброя (Arc) ${wRarity}★: Рівень ${wStart} ➔ ${wEnd}\n`;
    } else {
        report += `Зброя (Arc): Не враховувалась\n`;
    }

    report += `\nСПИСОК НЕОБХІДНИХ МАТЕРІАЛІВ:\n`;
    
    // Sort materials by calculatedRequirements
    Object.keys(calculatedRequirements).forEach(id => {
        const needed = calculatedRequirements[id];
        if (needed <= 0) return;
        
        let matName = "";
        if (id === 'coin') matName = "Beetle Coins (Золото)";
        else if (id === 'exp_elite') matName = "Elite Hunter Guide (EXP 10k)";
        else if (id === 'exp_medium') matName = "Medium Hunter Guide (EXP 2k)";
        else if (id === 'exp_basic') matName = "Basic Hunter Guide (EXP 500)";
        else if (id === 'dye_elite') matName = "Elite Weapon Dye (Dye 10k)";
        else if (id === 'dye_medium') matName = "Medium Weapon Dye (Dye 2k)";
        else if (id === 'dye_basic') matName = "Basic Weapon Dye (Dye 500)";
        else if (id === 'boss') {
            const charId = document.getElementById("calcCharacter").value;
            const activeList = CHARACTERS.length > 0 ? CHARACTERS : FALLBACK_CHARACTERS;
            const char = activeList.find(c => c.id === charId);
            matName = (ATTRIBUTE_MATERIALS[char.attribute] || ATTRIBUTE_MATERIALS["Anima"]).boss;
        }
        else if (id === 'specialty') {
            const charId = document.getElementById("calcCharacter").value;
            const activeList = CHARACTERS.length > 0 ? CHARACTERS : FALLBACK_CHARACTERS;
            const char = activeList.find(c => c.id === charId);
            matName = (ATTRIBUTE_MATERIALS[char.attribute] || ATTRIBUTE_MATERIALS["Anima"]).specialty;
        }
        else if (id === 'ore_t1') matName = WEAPON_MATERIALS.T1;
        else if (id === 'ore_t2') matName = WEAPON_MATERIALS.T2;
        else if (id === 'ore_t3') matName = WEAPON_MATERIALS.T3;
        else if (id === 'crown') matName = "Anomaly Crown (Корона Аномалії)";
        else {
            const charId = document.getElementById("calcCharacter").value;
            const activeList = CHARACTERS.length > 0 ? CHARACTERS : FALLBACK_CHARACTERS;
            const char = activeList.find(c => c.id === charId);
            const details = ATTRIBUTE_MATERIALS[char.attribute] || ATTRIBUTE_MATERIALS["Anima"];
            if (id === 'scroll_t1') matName = details.scrolls.T1;
            else if (id === 'scroll_t2') matName = details.scrolls.T2;
            else if (id === 'scroll_t3') matName = details.scrolls.T3;
            else if (id === 'common_t1') matName = details.common.T1;
            else if (id === 'common_t2') matName = details.common.T2;
            else if (id === 'common_t3') matName = details.common.T3;
        }

        const have = calcInventory[id] || 0;
        const rem = Math.max(0, needed - have);
        
        report += `- ${matName}: Потрібно ${needed.toLocaleString()} шт. (Маю: ${have.toLocaleString()} | Залишилось: ${rem.toLocaleString()})\n`;
    });

    report += `\nСгенеровано на Eibon Terminal. Успішного фарма! 🚀`;

    navigator.clipboard.writeText(report).then(() => {
        showToast("Звіт скопійовано у буфер обміну!");
    }).catch(err => {
        showToast("Помилка копіювання звіту.");
        console.error(err);
    });
}

// 11. PROMO CODES LOGIC
function renderPromoCodes() {
    const container = document.getElementById("promoCodesList");
    container.innerHTML = "";

    PROMO_CODES.forEach(promo => {
        const card = document.createElement("div");
        card.className = "code-card";
        card.innerHTML = `
            <div class="code-info">
                <div class="code-string">${promo.code}</div>
                <div class="code-rewards">${promo.rewards}</div>
            </div>
            <button class="btn-copy" data-code="${promo.code}">Копіювати</button>
        `;
        
        card.querySelector(".btn-copy").addEventListener("click", () => {
            copyToClipboard(promo.code);
        });


        container.appendChild(card);
    });
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(`Код "${text}" скопійовано у буфер обміну!`);
    }).catch(err => {
        console.error("Помилка копіювання: ", err);
        // Fallback
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showToast(`Код "${text}" скопійовано!`);
        } catch (e) {
            showToast("Не вдалося скопіювати код.");
        }
        document.body.removeChild(textArea);
    });
}

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

// 13. TIMELINE RENDERING
function renderTimeline() {
    const container = document.getElementById("timelineContainer");
    container.innerHTML = "";

    TIMELINE_EVENTS.forEach((event, index) => {
        const item = document.createElement("div");
        const isLeft = index % 2 === 0;
        item.className = `timeline-event ${isLeft ? 'timeline-left' : 'timeline-right'}`;
        
        item.innerHTML = `
            <div class="timeline-content">
                <span class="timeline-date">${event.date}</span>
                <span class="badge ${event.badgeClass} timeline-badge">${event.status}</span>
                <h3>${event.title}</h3>
                <p>${event.desc}</p>
            </div>
        `;
        container.appendChild(item);
    });
}

// 14. AUTH & CUSTOM USER TIERLISTS LOGIC

let editorState = {
    "S+": [],
    "S": [],
    "A": [],
    "B": [],
    "pool": []
};

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
                const user = firebase.auth && firebase.auth().currentUser;
                if (user) {
                    initTierlistEditor();
                }
            }
        });
    });

    // Check if Firebase is available
    if (typeof firebase === "undefined") {
        console.warn("Firebase Auth not available, disabling user tier lists.");
        return;
    }

    // Listen to Firebase Auth state changes
    firebase.auth().onAuthStateChanged((user) => {
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
    if (typeof firebase === "undefined" || !firebase.auth) {
        showToast("Firebase Auth не підключений!");
        return;
    }
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            showToast(`Вітаємо, ${result.user.displayName}! 🎉`);
        })
        .catch((error) => {
            console.error("Login failed:", error);
            showToast(`Помилка входу: ${error.message}`);
        });
}

function logout() {
    if (typeof firebase === "undefined" || !firebase.auth) return;
    firebase.auth().signOut().then(() => {
        showToast("Ви вийшли з акаунта.");
    });
}

// Update the global header profile layout
function updateAuthUI(user) {
    const authBox = document.getElementById("headerAuth");
    if (!authBox) return;

    if (user) {
        authBox.innerHTML = `
            <div class="user-profile">
                <img src="${user.photoURL || ''}" class="user-avatar" referrerpolicy="no-referrer" alt="${user.displayName}">
                <span class="user-name">${(user.displayName || "Користувач").split(" ")[0]}</span>
                <button class="btn btn-secondary btn-xs" id="btnLogoutGoogle">Вийти</button>
            </div>
        `;
        document.getElementById("btnLogoutGoogle").addEventListener("click", logout);
    } else {
        authBox.innerHTML = `
            <button class="btn btn-primary btn-sm" id="btnLoginGoogle">
                <span class="auth-icon">🔑</span> Увійти
            </button>
        `;
        document.getElementById("btnLoginGoogle").addEventListener("click", loginWithGoogle);
    }
}

// Initialize Custom Tier List Editor
function initTierlistEditor() {
    // Fill state
    editorState = {
        "S+": [],
        "S": [],
        "A": [],
        "B": [],
        "pool": []
    };

    const activeList = CHARACTERS.length > 0 ? CHARACTERS : FALLBACK_CHARACTERS;
    activeList.forEach(char => {
        editorState.pool.push(char.id);
    });

    renderEditor();
}

// Render the editor UI rows and pool
function renderEditor() {
    const tiers = ["S+", "S", "A", "B"];
    const activeList = CHARACTERS.length > 0 ? CHARACTERS : FALLBACK_CHARACTERS;

    // Render Rows
    tiers.forEach(tier => {
        const dropzoneId = `dropzone-${tier.replace("+", "-plus")}`;
        const zone = document.getElementById(dropzoneId);
        if (!zone) return;
        zone.innerHTML = "";

        editorState[tier].forEach(charId => {
            const char = activeList.find(c => c.id === charId);
            if (char) zone.appendChild(createDraggableElement(char, tier));
        });
    });

    // Render Pool
    const pool = document.getElementById("editorCharacterPool");
    if (pool) {
        pool.innerHTML = "";
        editorState.pool.forEach(charId => {
            const char = activeList.find(c => c.id === charId);
            if (char) pool.appendChild(createDraggableElement(char, "pool"));
        });
    }
}

// Create a draggable character element for the editor workspace (mobile friendly via click)
function createDraggableElement(char, currentTier) {
    const el = document.createElement("div");
    el.className = `draggable-char rarity-${char.rarity}`;
    el.draggable = true;
    el.innerHTML = `
        <div class="draggable-char-avatar">${renderAvatarHtml(char)}</div>
        <span class="draggable-char-name">${char.name.split(" ")[0]}</span>
    `;

    // Drag start
    el.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", char.id);
        e.dataTransfer.setData("source", currentTier);
    });

    // Mobile click-to-move menu
    el.addEventListener("click", () => {
        openClickMoveMenu(char.id);
    });

    return el;
}

// Mobile/Click menu for shifting characters
function openClickMoveMenu(charId) {
    const tiers = ["S+", "S", "A", "B", "pool"];
    const names = {
        "S+": "Ранг S+",
        "S": "Ранг S",
        "A": "Ранг A",
        "B": "Ранг B",
        "pool": "Скинути в пул"
    };

    const activeList = CHARACTERS.length > 0 ? CHARACTERS : FALLBACK_CHARACTERS;
    const char = activeList.find(c => c.id === charId);
    if (!char) return;

    // Create popup dialog
    const menu = document.createElement("div");
    menu.className = "click-move-menu glass-panel";
    menu.style.position = "fixed";
    menu.style.top = "50%";
    menu.style.left = "50%";
    menu.style.transform = "translate(-50%, -50%)";
    menu.style.zIndex = "10000";
    menu.style.padding = "1.5rem";
    menu.style.boxShadow = "var(--shadow-panel)";
    menu.style.borderRadius = "12px";
    menu.style.background = "var(--bg-panel)";
    menu.style.border = "1px solid var(--border-glass)";
    menu.style.display = "flex";
    menu.style.flexDirection = "column";
    menu.style.gap = "0.8rem";

    menu.innerHTML = `
        <h4 style="margin-bottom: 0.4rem; color: var(--color-cyan); font-family: var(--font-heading);">Перемістити ${char.name.split(" ")[0]}</h4>
        <div style="display: flex; flex-direction: column; gap: 0.5rem; width: 200px;">
            ${tiers.map(t => `<button class="btn btn-secondary btn-sm select-tier-btn" data-target="${t}">${names[t]}</button>`).join("")}
            <button class="btn btn-accent btn-sm mt-1 close-menu-btn">Скасувати</button>
        </div>
    `;

    document.body.appendChild(menu);

    // Blocking backdrop
    const bg = document.createElement("div");
    bg.style.position = "fixed";
    bg.style.inset = "0";
    bg.style.zIndex = "9999";
    bg.style.background = "rgba(0,0,0,0.5)";
    document.body.appendChild(bg);

    const close = () => {
        menu.remove();
        bg.remove();
    };

    bg.addEventListener("click", close);
    menu.querySelector(".close-menu-btn").addEventListener("click", close);
    menu.querySelectorAll(".select-tier-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const target = btn.getAttribute("data-target");
            moveCharInEditor(charId, target);
            close();
        });
    });
}

// Core editor moving logic
function moveCharInEditor(charId, targetTier) {
    // Find current tier
    let currentTier = null;
    Object.keys(editorState).forEach(t => {
        if (editorState[t].includes(charId)) currentTier = t;
    });

    if (currentTier === targetTier || !currentTier) return;

    // Remove from source
    editorState[currentTier] = editorState[currentTier].filter(id => id !== charId);
    
    // Add to target
    editorState[targetTier].push(charId);

    renderEditor();
}

// Save Custom Tier List to Firestore
async function saveUserTierlist() {
    const user = firebase.auth && firebase.auth().currentUser;
    if (!user) {
        showToast("Будь ласка, спочатку авторизуйтеся!");
        return;
    }

    const titleInput = document.getElementById("editorTitle");
    const title = (titleInput && titleInput.value.trim()) || "Мій тір-ліст";

    // Count assigned characters
    const assignedCount = Object.keys(editorState).reduce((acc, tier) => {
        return acc + (tier !== "pool" ? editorState[tier].length : 0);
    }, 0);

    if (assignedCount === 0) {
        showToast("Будь ласка, розподіліть персонажів по рядах!");
        return;
    }

    try {
        const docData = {
            userId: user.uid,
            userName: user.displayName || "Гість",
            userPhoto: user.photoURL || "",
            title: title,
            tiers: {
                "S+": editorState["S+"],
                "S": editorState["S"],
                "A": editorState["A"],
                "B": editorState["B"]
            },
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        if (typeof db === "undefined") {
            showToast("База даних Firestore недоступна!");
            return;
        }

        await db.collection("userTierlists").add(docData);
        showToast("Тір-ліст успішно опубліковано! 🎉");

        // Force switch to community tab
        const commBtn = document.querySelector('[data-sub-tab="community"]');
        if (commBtn) commBtn.click();
    } catch (e) {
        console.error("Save custom tierlist failed:", e);
        showToast(`Помилка збереження: ${e.message}`);
    }
}

// Load community tier lists from Firestore
async function loadCommunityTierlists() {
    const container = document.getElementById("communityGrid");
    if (!container) return;

    container.innerHTML = `<div class="community-loading">Завантаження тір-лістів спільноти...</div>`;

    if (typeof db === "undefined") {
        container.innerHTML = `<div class="community-loading">База даних недоступна. Увійдіть у мережу для перегляду.</div>`;
        return;
    }

    try {
        const snapshot = await db.collection("userTierlists").orderBy("createdAt", "desc").limit(40).get();
        
        if (snapshot.empty) {
            container.innerHTML = `<div class="community-loading">Немає збережених тір-лістів. Створіть перший! 🚀</div>`;
            return;
        }

        container.innerHTML = "";
        snapshot.docs.forEach(doc => {
            const data = doc.data();
            const dateStr = data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleDateString("uk-UA") : "Нещодавно";

            const currentUser = firebase.auth && firebase.auth().currentUser;
            const isOwner = currentUser && currentUser.uid === data.userId;

            const card = document.createElement("div");
            card.className = "user-tierlist-card";
            card.innerHTML = `
                <h4 class="user-card-title">${data.title}</h4>
                <div class="user-card-meta">
                    <img src="${data.userPhoto || 'https://www.gstatic.com/images/branding/product/2x/avatar_anonymous_96dp.png'}" class="user-card-avatar" referrerpolicy="no-referrer" alt="${data.userName}">
                    <span class="user-card-author">${data.userName}</span>
                    <span class="user-card-date">${dateStr}</span>
                </div>
                <div class="user-card-actions" style="display: flex; gap: 0.5rem; width: 100%; margin-top: 0.5rem;">
                    <button class="btn btn-secondary btn-sm view-tierlist-btn" style="flex: 1;" data-id="${doc.id}">Переглянути</button>
                    ${isOwner ? `<button class="btn btn-danger btn-sm delete-tierlist-btn" style="flex: 1;" data-id="${doc.id}">Видалити</button>` : ""}
                </div>
            `;

            card.querySelector(".view-tierlist-btn").addEventListener("click", () => {
                viewUserTierlist(data);
            });

            if (isOwner) {
                const deleteBtn = card.querySelector(".delete-tierlist-btn");
                if (deleteBtn) {
                    deleteBtn.addEventListener("click", async (e) => {
                        e.stopPropagation();
                        if (confirm("Ви впевнені, що хочете видалити цей тір-ліст?")) {
                            try {
                                deleteBtn.disabled = true;
                                deleteBtn.innerText = "Видалення...";
                                await db.collection("userTierlists").doc(doc.id).delete();
                                showToast("Тір-ліст успішно видалено! 🗑️");
                                loadCommunityTierlists();
                            } catch (err) {
                                console.error("Delete tierlist failed:", err);
                                showToast(`Помилка видалення: ${err.message}`);
                                deleteBtn.disabled = false;
                                deleteBtn.innerText = "Видалити";
                            }
                        }
                    });
                }
            }

            container.appendChild(card);
        });
    } catch (e) {
        console.error("Load community lists failed:", e);
        container.innerHTML = `<div class="community-loading">Помилка завантаження: ${e.message}</div>`;
    }
}

// Render raw avatar URL for view badges
function renderAvatarUrlOnly(char) {
    if (char && char.avatar && char.avatar.startsWith('http')) {
        let cleanUrl = char.avatar;
        if (cleanUrl.includes('/revision/')) {
            cleanUrl = cleanUrl.split('/revision/')[0];
        }
        return `https://images.weserv.nl/?url=${encodeURIComponent(cleanUrl)}&w=200`;
    }
    return '';
}

// Display custom tierlist inside Modal popup
function viewUserTierlist(data) {
    const modal = document.getElementById("userTierlistModalOverlay");
    const title = document.getElementById("viewTierlistTitle");
    const author = document.getElementById("viewTierlistAuthor");

    if (!modal || !title || !author) return;

    title.innerText = data.title;
    author.innerText = `Автор: ${data.userName}`;

    const tiers = ["S+", "S", "A", "B"];
    const activeList = CHARACTERS.length > 0 ? CHARACTERS : FALLBACK_CHARACTERS;

    tiers.forEach(tier => {
        const gridId = `viewGrid-${tier.replace("+", "-plus")}`;
        const grid = document.getElementById(gridId);
        if (!grid) return;
        
        grid.innerHTML = "";

        const charIds = data.tiers[tier] || [];
        if (charIds.length === 0) {
            grid.innerHTML = `<span style="font-size:0.75rem; color:var(--text-muted); opacity: 0.5;">Порожньо</span>`;
        } else {
            charIds.forEach(charId => {
                const char = activeList.find(c => c.id === charId);
                if (char) {
                    const badge = document.createElement("div");
                    badge.className = "view-char-badge";
                    
                    const avatarUrl = renderAvatarUrlOnly(char);
                    const avatarHtml = avatarUrl ? `<img src="${avatarUrl}" class="view-char-avatar" alt="${char.name}">` : '';
                    
                    badge.innerHTML = `
                        ${avatarHtml}
                        <span class="view-char-name">${char.name.split(" ")[0]}</span>
                    `;
                    grid.appendChild(badge);
                }
            });
        }
    });

    modal.classList.add("active");
}

