// NTE Eibon Terminal - Core Application Logic

// 1. CHARACTER DATABASE
const CHARACTERS = [
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
        attribute: "Chaos",
        role: "Support",
        tier: "A",
        avatar: "https://static.wikia.nocookie.net/neverness-to-everness/images/3/33/Adler_Card.png/revision/latest/scale-to-width-down/200?cb=20260309120100",
        summary: "Надійний щитовик. Створює міцний щит, що поглинає шкоду пропорційно його максимальному здоров'ю, та накладає ефекти періодичної шкоди (DoT) на ворогів.",
        weapon: "Sentinel's Barrier",
        weaponF2p: "Rusty Alloy Shield",
        cartridge: "Speedy Hedgehog (4-piece) або Guard Set",
        stats: ["HP%", "Flat HP", "Break Effect", "Energy Charge Efficiency"],
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
        attribute: "Incantation",
        role: "Support",
        tier: "A",
        avatar: "https://static.wikia.nocookie.net/neverness-to-everness/images/b/b9/Haniel_Card.png/revision/latest/scale-to-width-down/200?cb=20260309131027",
        summary: "Доступний хілер. Відновлює здоров'я всьому загону залежно від власної сили атаки та знімає негативні ефекти.",
        weapon: "Prayer of Light",
        weaponF2p: "Medic's Flask",
        cartridge: "Speedy Hedgehog (4-piece)",
        stats: ["ATK%", "Energy Charge Efficiency", "Healing Bonus", "HP%"],
        teamSynergy: "Mint (Аніма), Zero (Космос), Adler (Хаос)",
        lore: "Завжди турботлива дівчина з медичним бекграундом, яка допомагає команді відновлюватися після важких зіткнень з аномаліями."
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

// 2. PROMO CODES DATABASE (Initial state)
let PROMO_CODES = [
    { code: "NTE429vtuber", rewards: "30,000 Beetle Coins, 30,000 Fons", active: true },
    { code: "NTEWINFONS", rewards: "10,000 Fons", active: true },
    { code: "NTEFUNGAME", rewards: "10,000 Fons", active: true },
    { code: "NTENENE", rewards: "10,000 Clicky Fries, 10 DynamiK", active: true },
    { code: "NTEFREE", rewards: "30,000 Fons", active: true },
    { code: "NTEvtuber200", rewards: "10,000 Beetle Coins, 10,000 Fons", active: true },
    { code: "NTEGIFT", rewards: "50 Annulith, 5 Rising Hunter Guides, 5 Light Dye", active: true },
    { code: "504980102FKGOVNS", rewards: "30 Annulith, 1 Gubichi Flavor Chips, 20,000 Beetle Coins", active: true }
];

// 3. UPDATES CALENDAR DATABASE
const TIMELINE_EVENTS = [
    {
        date: "29 Квітня 2026",
        title: "Глобальний Реліз Neverness to Everness (1.0)",
        desc: "Офіційний запуск гри на PC, iOS та Android. Доступні початкові розділи сюжету в місті Гетеро, перші баннери Наналлі та Сакірі, а також стартові події.",
        status: "Released",
        badgeClass: "badge-anima"
    },
    {
        date: "23 Травня 2026 (Сьогодні)",
        title: "Стрім Розробників: Презентація Версії 1.1",
        desc: "Спеціальна трансляція від Hotta Studio. Анонс нових персонажів Lacrimosa (Хаос ДПС) та Chaos, нових локацій міста, ігрових режимів та промокодів.",
        status: "Active",
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

// 4. APPLICATION STATE
let currentSquad = [null, null, null, null]; // Slots for Team Builder
let activeSelectorSlot = null;

// 5. INITIALIZATION & ROUTING
document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    renderTierList();
    renderBuilds();
    renderCalculatorSetup();
    renderTimeline();
    setupTeamBuilder();
    setupCalculatorEvents();
    
    // Fetch dynamic codes
    fetch('codes.json')
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                PROMO_CODES = data;
            }
            renderPromoCodes();
        })
        .catch(err => {
            console.warn("Could not load codes.json, using local backup:", err);
            renderPromoCodes();
        });
    
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
function renderCalculatorSetup() {
    const select = document.getElementById("calcCharacter");
    select.innerHTML = CHARACTERS.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
}

function setupCalculatorEvents() {
    document.getElementById("btnCalculate").addEventListener("click", () => {
        calculateResources();
    });
}

function calculateResources() {
    const charId = document.getElementById("calcCharacter").value;
    const startLvl = parseInt(document.getElementById("calcLevelStart").value) || 1;
    const endLvl = parseInt(document.getElementById("calcLevelEnd").value) || 80;
    const includeSkills = document.getElementById("calcSkills").checked;
    const includeWeapon = document.getElementById("calcWeapon").checked;

    const char = CHARACTERS.find(c => c.id === charId);
    if (!char) return;

    if (startLvl >= endLvl) {
        showToast("Цільовий рівень має бути більшим за початковий!");
        return;
    }

    if (startLvl < 1 || endLvl > 80) {
        showToast("Рівні мають бути в діапазоні від 1 до 80!");
        return;
    }

    // EXP and Coin calculations logic
    let totalExpGuides = 0; // Elite equivalent (1 elite = 10,000 exp)
    let totalCoins = 0;
    let totalBossDrops = 0;
    let totalRegionalSpecialties = 0;
    let skillMaterials = 0;

    // Estimate based on level tiers
    // We break progression into standard steps
    for (let lvl = startLvl; lvl < endLvl; lvl++) {
        if (lvl < 20) {
            totalExpGuides += 0.8; 
            totalCoins += 500;
        } else if (lvl === 20) { // Ascension 1
            totalCoins += 10000;
            totalBossDrops += 2;
            totalRegionalSpecialties += 3;
        } else if (lvl < 40) {
            totalExpGuides += 1.8;
            totalCoins += 1200;
        } else if (lvl === 40) { // Ascension 2
            totalCoins += 25000;
            totalBossDrops += 5;
            totalRegionalSpecialties += 8;
        } else if (lvl < 60) {
            totalExpGuides += 3.5;
            totalCoins += 3000;
        } else if (lvl === 60) { // Ascension 3
            totalCoins += 60000;
            totalBossDrops += 12;
            totalRegionalSpecialties += 20;
        } else if (lvl < 80) {
            totalExpGuides += 8;
            totalCoins += 8000;
        }
    }
    
    // Final level breakthrough at 80
    if (endLvl === 80) {
        totalCoins += 120000;
        totalBossDrops += 20;
        totalRegionalSpecialties += 30;
    }

    // Round values
    totalExpGuides = Math.ceil(totalExpGuides);
    totalCoins = Math.round(totalCoins);

    // Skills additions
    if (includeSkills) {
        totalCoins += 180000;
        skillMaterials = Math.round((endLvl - startLvl) * 0.8) + 12;
    }

    // Weapon progression
    let weaponExpDye = 0;
    if (includeWeapon) {
        totalCoins += Math.round(totalCoins * 0.5);
        weaponExpDye = Math.round(totalExpGuides * 1.2);
    }

    // Render results
    const resultsContainer = document.getElementById("calcMaterialsList");
    
    const attributeDetails = {
        "Anima": { specialty: "Anima-кристали лісу", boss: "Гравітаційний Павук" },
        "Incantation": { specialty: "Квіти закляття", boss: "Вогняний Кролик" },
        "Cosmos": { specialty: "Зоряний пил", boss: "Кронос-Вартовий" },
        "Chaos": { specialty: "Шарми хаосу", boss: "Руйнівник Масок" },
        "Phase": { specialty: "Фазові кристали", boss: "Привид Фази" },
        "Psyche": { specialty: "Психічні кристали", boss: "Володар Кошмарів" },
        "Lakshana": { specialty: "Кристали порядку", boss: "Вартовий Закону" }
    };
    
    const details = attributeDetails[char.attribute] || { specialty: "Рідкісна руда", boss: "Рейдовий Бос" };

    resultsContainer.innerHTML = `
        <div class="material-item">
            <div class="mat-left">
                <div class="mat-icon">🪙</div>
                <div class="mat-name">Beetle Coins (Золото)</div>
            </div>
            <div class="mat-quantity">${totalCoins.toLocaleString()}</div>
        </div>
        
        <div class="material-item">
            <div class="mat-left">
                <div class="mat-icon">📚</div>
                <div class="mat-name">Elite Hunter Guides (Досвід)</div>
            </div>
            <div class="mat-quantity">${totalExpGuides} шт.</div>
        </div>
        
        ${totalBossDrops > 0 ? `
        <div class="material-item">
            <div class="mat-left">
                <div class="mat-icon">👹</div>
                <div class="mat-name">Ядро боса: ${details.boss}</div>
            </div>
            <div class="mat-quantity">${totalBossDrops} шт.</div>
        </div>
        ` : ''}

        ${totalRegionalSpecialties > 0 ? `
        <div class="material-item">
            <div class="mat-left">
                <div class="mat-icon">🌸</div>
                <div class="mat-name">Спеціальність: ${details.specialty}</div>
            </div>
            <div class="mat-quantity">${totalRegionalSpecialties} шт.</div>
        </div>
        ` : ''}

        ${includeSkills ? `
        <div class="material-item">
            <div class="mat-left">
                <div class="mat-icon">🔮</div>
                <div class="mat-name">Матеріали навичок (Кроляча Нора)</div>
            </div>
            <div class="mat-quantity">${skillMaterials} шт.</div>
        </div>
        ` : ''}

        ${includeWeapon ? `
        <div class="material-item">
            <div class="mat-left">
                <div class="mat-icon">🧪</div>
                <div class="mat-name">Dye (Досвід Зброї)</div>
            </div>
            <div class="mat-quantity">${weaponExpDye} шт.</div>
        </div>
        ` : ''}
    `;
    
    showToast("Витрати успішно розраховано!");
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
