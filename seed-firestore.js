// Firestore Seed Script - Run ONCE to populate initial data
// =========================================================
// USAGE:
// 1. Open index.html in browser (with valid firebase-config.js)
// 2. Open browser DevTools Console (F12)
// 3. Copy-paste this entire script and press Enter
// 4. Wait for "SEED COMPLETE" message

(async function seedFirestore() {
    if (typeof firebase === 'undefined' || typeof db === 'undefined') {
        console.error('❌ Firebase not initialized! Make sure firebase-config.js is loaded.');
        return;
    }

    console.log('🌱 Starting Firestore seed...');

    // ===== CHARACTERS =====
    const characters = [
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
            rarity: 5, attribute: "Anima", role: "Sub-DPS", tier: "S",
            avatar: "https://static.wikia.nocookie.net/neverness-to-everness/images/5/57/Jiuyuan_Card.png/revision/latest/scale-to-width-down/200?cb=20260309140453",
            summary: "Потужний суб-ДПС, який наносить швидку вибухову шкоду. Ідеально підходить для активації реакції Blossom (Цвітіння) разом з Наналлі.",
            weapon: "Jade Dragon Whisper (Сигнатурний)", weaponF2p: "Rising Wind (Порив Вітру)",
            cartridge: "Fireflies and the Forest (4-piece)",
            stats: ["Crit Rate", "Crit DMG", "Anima DMG", "Energy Charge Efficiency"],
            teamSynergy: "Nanally (Аніма), Sakiri (Закляття), Zero (Космос)",
            lore: "Мисливиця на аномалії стародавнього роду з витонченими манерами. Використовує віяло для виклику аномальних повітряних потоків."
        },
        { id: "hotori", name: "Hotori (Хоторі)", rarity: 5, attribute: "Cosmos", role: "Sub-DPS", tier: "S", avatar: "https://static.wikia.nocookie.net/neverness-to-everness/images/4/41/Hotori_in_game_Model.png/revision/latest/scale-to-width-down/200?cb=20260223173459", summary: "Унікальний саппорт/саб-ДПС, здатний записувати та повторювати навички активних членів загону, подвоюючи загальну шкоду команди.", weapon: "Echoes of Eternity", weaponF2p: "Appraiser's Notebook", cartridge: "Speedy Hedgehog (4-piece)", stats: ["Energy Charge Efficiency", "Cycle Intensity", "ATK%", "HP%"], teamSynergy: "Nanally (Аніма), Adler (Хаос), Haniel (Закляття)", lore: "Тихий оцінювач аномальних предметів, який проводить більшу частину часу в бібліотеці антикварної крамниці Eibon." },
        { id: "zero", name: "Zero (Зеро)", rarity: 5, attribute: "Cosmos", role: "Support", tier: "S", avatar: "https://static.wikia.nocookie.net/neverness-to-everness/images/c/c2/Esper_Zero_Male_Card.png/revision/latest/scale-to-width-down/200?cb=20260315121329", summary: "Головний герой. Володіє Cosmos атрибутом, що є універсальним каталізатором для активації ефекту Esper Cycle для будь-якої іншої стихії.", weapon: "Eibon Legacy (Спадщина Ейбона)", weaponF2p: "Hunter's Resolve (Рішучість Мисливця)", cartridge: "Speedy Hedgehog (4-piece)", stats: ["ATK%", "Crit Rate", "Cycle Intensity", "Energy Charge Efficiency"], teamSynergy: "Будь-який ДПС персонаж стихії Anima або Incantation", lore: "Новий володар антикварної крамниці Eibon, що втратив спогади про своє минуле, але володіє дивним даром бачити сутність аномалій." },
        { id: "adler", name: "Adler (Адлер)", rarity: 4, attribute: "Incantation", role: "Support", tier: "A", avatar: "https://static.wikia.nocookie.net/neverness-to-everness/images/3/33/Adler_Card.png/revision/latest/scale-to-width-down/200?cb=20260309120100", summary: "Надійний щитовик стихії Incantation. Створює міцний щит, міцність якого масштабується від його захисту (DEF), та допомагає збивати стійкість ворогів.", weapon: "Sentinel's Barrier", weaponF2p: "Rusty Alloy Shield", cartridge: "Speedy Hedgehog (4-piece) або Guard Set", stats: ["DEF%", "Flat DEF", "Break Effect", "Energy Charge Efficiency"], teamSynergy: "Nanally (Аніма), Sakiri (Закляття), Zero (Космос)", lore: "Колишній охоронець, який тепер допомагає крамниці Eibon із важкими замовленнями у небезпечних зонах Hethereau." },
        { id: "mint", name: "Mint (Мінт)", rarity: 4, attribute: "Anima", role: "Main DPS", tier: "A", avatar: "https://static.wikia.nocookie.net/neverness-to-everness/images/2/20/Mint_Card.png/revision/latest/scale-to-width-down/200?cb=20260307142424", summary: "Хороший безкоштовний F2P ДПС персонаж. Проста механіка комбо-атак та швидка перезарядка елементальних умінь.", weapon: "Zephyr Blade", weaponF2p: "Steel Rapier", cartridge: "Fireflies and the Forest (4-piece)", stats: ["ATK%", "Crit Rate", "Crit DMG", "Anima DMG"], teamSynergy: "Zero (Космос), Haniel (Закляття), Adler (Хаос)", lore: "Молода стажерка в Eibon, яка прагне стати найкращим оцінювачем аномалій у місті." },
        { id: "haniel", name: "Haniel (Ханіель)", rarity: 4, attribute: "Psyche", role: "Support", tier: "A", avatar: "https://static.wikia.nocookie.net/neverness-to-everness/images/b/b9/Haniel_Card.png/revision/latest/scale-to-width-down/200?cb=20260309131027", summary: "Потужний саппорт стихії Psyche. Баффає силу атаки загону та викликає помічника Hootie, який допомагає наносити шкоду та підтримувати союзників.", weapon: "Mind Royale (Рояль Розуму)", weaponF2p: "Ready-Ready (Реді-Реді)", cartridge: "Tiny Big Adventure (4-piece)", stats: ["ATK%", "Crit Rate", "Psyche DMG", "Energy Charge Efficiency"], teamSynergy: "Mint (Аніма), Zero (Космос), Adler (Закляття)", lore: "Турботлива та мила дівчина, яка завжди носить із собою іграшкового сову-помічника Hootie, здатного надихати союзників під час бою." },
        { id: "lacrimosa", name: "Lacrimosa (Лакрімоза)", rarity: 5, attribute: "Chaos", role: "Main DPS", tier: "S", avatar: "https://static.wikia.nocookie.net/neverness-to-everness/images/3/37/Lacrimosa_-_Character_Showcase.jpg/revision/latest/scale-to-width-down/200?cb=20241229191213", summary: "Новий анонсований персонаж версії 1.1. Спеціалізується на Chaos шкоді та потужних комбо-атаках масками.", weapon: "Tragedy & Comedy (Сигнатурний)", weaponF2p: "Failing You, Heavy in My Heart", cartridge: "Chaos Eclipse (4-piece)", stats: ["Crit Rate", "Crit DMG", "Chaos DMG", "ATK%"], teamSynergy: "Sakiri (Закляття), Zero (Космос), Hotori (Космос)", lore: "Театральна акторка, чиї вистави зачаровують глядачів Гетеро. Кажуть, що її маски мають власне аномальне життя." },
        { id: "daffodil", name: "Daffodil (Даффоділ)", rarity: 5, attribute: "Chaos", role: "Main DPS", tier: "S", avatar: "https://static.wikia.nocookie.net/neverness-to-everness/images/a/af/Daffodill_Card.png/revision/latest/scale-to-width-down/200?cb=20260309135850", summary: "Потужний Burst DPS стихії Chaos, що спеціалізується на пробитті щитів (Break). Накопичує силу поза полем бою і завдає величезної вибухової шкоди при перемиканні.", weapon: "Youthful Fantasy (Сигнатурний Arc)", weaponF2p: "Shiny Days (Світлі Дні)", cartridge: "Chaos Eclipse (4-piece)", stats: ["Break Intensity", "Crit Rate", "Crit DMG", "ATK%"], teamSynergy: "Nanally (Аніма), Zero (Космос), Sakiri (Закляття)", lore: "Мовчазна та загадкова охоронниця антикварної крамниці Eibon. Володіє калейдоскопічними очима і приховує під холодною маскою відданість друзям." },
        { id: "baicang", name: "Baicang (Байцан)", rarity: 5, attribute: "Incantation", role: "Main DPS", tier: "S", avatar: "https://static.wikia.nocookie.net/neverness-to-everness/images/5/5c/Baicang_Card.png", summary: "Потужний Main DPS стихії Incantation. Використовує механіку витрати власного здоров'я для підвищення шкоди. Потребує надійного цілителя в команді.", weapon: "Camellia Society (Товариство Камелій)", weaponF2p: "A Time Will Come (Час прийде)", cartridge: "Crimson: Twin Butterflies (4-piece)", stats: ["Crit Rate", "Crit DMG", "Incantation DMG", "ATK%"], teamSynergy: "Haniel (Закляття), Sakiri (Закляття), Adler (Хаос)", lore: "Капітан підрозділу ETD-4 Бюро контролю аномалій. Досвідчений ветеран з невимушеним характером, який піклується про своїх підлеглих як старший брат." },
        { id: "chiz", name: "Chiz (Чіз)", rarity: 5, attribute: "Cosmos", role: "Main DPS", tier: "S", avatar: "https://static.wikia.nocookie.net/neverness-to-everness/images/2/21/Chiz_Card.png", summary: "Потужний Main DPS стихії Cosmos. Її ультимейт ігнорує велику частину захисту ворога, а сигнатурна зброя дає додаткову шкоду залежно від ваших Fons (монет).", weapon: "Contemplative Cat (Замислений Кот)", weaponF2p: "Wild Reverie (Дика мрія)", cartridge: "Lost Radiance (4-piece)", stats: ["Crit Rate", "Crit DMG", "Cosmos DMG", "ATK%"], teamSynergy: "Zero (Космос), Sakiri (Закляття), Hotori (Космос)", lore: "Персонаж, пов'язаний із Безіменним Банком. Має ділову жилку та користується важким молотом-йокай для вибивання боргів та аномалій." },
        { id: "fadia", name: "Fadia (Фадія)", rarity: 5, attribute: "Psyche", role: "Support", tier: "S", avatar: "https://static.wikia.nocookie.net/neverness-to-everness/images/6/68/Fadia_Card.png", summary: "Потужний Sustain-персонаж стихії Psyche. Працює як танк-цілитель, що перенаправляє шкоду союзників на себе та відновлює здоров'я в режимі Lilith.", weapon: "Eternal Waltz (Вічний вальс)", weaponF2p: "Medic's Flask (Флакон медика)", cartridge: "Tiny Big Adventure (4-piece)", stats: ["HP%", "Flat HP", "Psyche DMG", "Energy Charge Efficiency"], teamSynergy: "Baicang (Закляття), Nanally (Аніма), Zero (Космос)", lore: "Дивовижна дівчина-вампір з Бюро контролю аномалій, яка носить із собою гігантський надгробок як щит та зброю." },
        { id: "hathor", name: "Hathor (Хатор)", rarity: 5, attribute: "Lakshana", role: "Sub-DPS", tier: "S", avatar: "https://static.wikia.nocookie.net/neverness-to-everness/images/3/30/Hathor_Card.png", summary: "Потужний Burst Sub-DPS стихії Lakshana. Використовує механіку накопичення стаків Express Delivery Power для завдання величезної вибухової шкоди.", weapon: "Raging Flames (Лють Полум'я)", weaponF2p: "Sentinel's Barrier (Бар'єр Вартового)", cartridge: "Street Boxer (4-piece)", stats: ["Crit Rate", "Crit DMG", "Lakshana DMG", "ATK%"], teamSynergy: "Zero (Космос), Sakiri (Закляття), Daffodil (Хаос)", lore: "Впливова дівчина-фіксер з елітних кіл Гетеро, яка тісно співпрацює зі Sterry Express. Її витонченість приховує неперевершені бойові вміння." },
        { id: "aurelia", name: "Aurelia (Аурелія)", rarity: 4, attribute: "Psyche", role: "Main DPS", tier: "A", avatar: "https://static.wikia.nocookie.net/neverness-to-everness/images/f/fd/Aurelia_-_Character_Promo.png", summary: "A-Rank Main DPS стихії Psyche. Використовує атаки медуз у стані Cadenza для нанесення значної шкоди. Отримується безкоштовно за 3-денний вхід.", weapon: "Stellar Veil (Зоряна Вуаль)", weaponF2p: "Oraora! (Ораора!)", cartridge: "Devil's Blood: Curse (4-piece)", stats: ["Crit Rate", "Crit DMG", "Psyche DMG", "ATK%"], teamSynergy: "Zero (Космос), Fadia (Психея), Sakiri (Закляття)", lore: "Студентка-музикант у Гетеро, яка виявила в собі аномальні здібності під час одного з вуличних виступів. Керує аномальними медузами." },
        { id: "edgar", name: "Edgar (Едгар)", rarity: 4, attribute: "Cosmos", role: "Support", tier: "A", avatar: "https://static.wikia.nocookie.net/neverness-to-everness/images/1/1d/Edgar_Card.png", summary: "Доступний цілитель стихії Cosmos. Його навички відновлюють здоров'я союзникам пропорційно його максимальному HP, а ультимейт створює велику зону лікування.", weapon: "Call of the Twisted City (Заклик викривленого міста)", weaponF2p: "Mind Royale (Рояль Розуму)", cartridge: "Thea's Night Tavern (4-piece)", stats: ["HP%", "Healing Bonus", "Flat HP", "Energy Charge Efficiency"], teamSynergy: "Zero (Космос), Hotori (Космос), Jiuyuan (Аніма)", lore: "Співробітник антикварної крамниці Eibon. Спокійний та врівноважений юнак, який завжди готовий надати першу допомогу та смачний гарячий чай." },
        { id: "skia", name: "Skia (Скіа)", rarity: 4, attribute: "Lakshana", role: "Sub-DPS", tier: "A", avatar: "https://static.wikia.nocookie.net/neverness-to-everness/images/0/01/Skia_by_nte_1.jpg/revision/latest/scale-to-width-down/1200?cb=20260212004246", summary: "Потужний суб-ДПС стихії Lakshana, який спеціалізується на мітках Fang Thrust та унікальних навичках прихованості в тіні. Чудово доповнює команди на реакції Remora.", weapon: "Watch Your Heads! (Стережись голів!)", weaponF2p: "Good Boy's Grand Adventure (Велика пригода хорошого хлопчика)", cartridge: "Street Boxer (4-piece)", stats: ["Crit Rate", "Crit DMG", "Lakshana DMG", "ATK%"], teamSynergy: "Zero (Космос), Sakiri (Закляття), Nanally (Аніма)", lore: "Лейтенант підрозділу ETD-4 Бюро контролю аномалій. Мовчазний вовк-офіцер із великим шрамом на лівому оці, який вірно несе службу." }
    ];

    // ===== PROMO CODES =====
    const promoCodes = [
        { code: "NTE429vtuber", rewards: "30,000 Beetle Coins, 30,000 Fons", active: true },
        { code: "NTEWINFONS", rewards: "10,000 Fons", active: true },
        { code: "NTEFUNGAME", rewards: "10,000 Fons", active: true },
        { code: "NTENENE", rewards: "10,000 Clicky Fries, 10 DynamiK", active: true },
        { code: "NTEFREE", rewards: "30,000 Fons", active: true },
        { code: "NTEvtuber200", rewards: "10,000 Beetle Coins, 10,000 Fons", active: true },
        { code: "NTEGIFT", rewards: "50 Annulith, 5 Rising Hunter Guides, 5 Light Dye", active: true },
        { code: "504980102FKGOVNS", rewards: "30 Annulith, 1 Gubichi Flavor Chips, 20,000 Beetle Coins", active: true },
        { code: "NTE0429", rewards: "Active Promo Code (Ресурси)", active: true },
        { code: "NTENANALLYGO", rewards: "Active Promo Code (Ресурси)", active: true },
        { code: "NTENOWTOENJOY", rewards: "Active Promo Code (Ресурси)", active: true },
        { code: "NTEHAVEFUN", rewards: "Active Promo Code (Ресурси)", active: true }
    ];

    // ===== TIMELINE EVENTS =====
    const timelineEvents = [
        { order: 0, date: "29 Квітня 2026", title: "Глобальний Реліз Neverness to Everness (1.0)", desc: "Офіційний запуск гри на PC, iOS та Android. Доступні початкові розділи сюжету в місті Гетеро, перші баннери Наналлі та Сакірі, а також стартові події.", status: "Released", badgeClass: "badge-anima" },
        { order: 1, date: "23 Травня 2026 (Сьогодні)", title: "Стрім Розробників: Презентація Версії 1.1", desc: "Спеціальна трансляція від Hotta Studio. Анонс нових персонажів Lacrimosa (Хаос ДПС) та Chaos, нових локацій міста, ігрових режимів та промокодів.", status: "Active", badgeClass: "badge-incant" },
        { order: 2, date: "3-4 Червня 2026", title: "Оновлення 1.1: 'Lacrimosa of Chaos'", desc: "Вихід першого великого патчу. Старт першої фази банера з Лакрімозою. Новий сюжетний епізод 'Театр Тіней'. Початок літнього івенту.", status: "Upcoming", badgeClass: "badge-chaos" },
        { order: 3, date: "Липень 2026 (Прогноз)", title: "Оновлення 1.2 та нові герої Shinku й Iroi", desc: "Очікуване оновлення на основі витоків інформації. Додавання нових аномальних зон на півночі Гетеро та вихід нових персонажів S-рангу.", status: "Upcoming", badgeClass: "badge-phase" }
    ];

    // ===== GUIDES =====
    const guides = [
        {
            id: "guide-beginner-progression",
            title: "Навігатор Новачка: Стартовий Гайд & Пріоритети",
            titleEn: "Beginner Progression: Start & Priorities",
            description: "Повний посібник для швидкого старту в Neverness to Everness. Основні пріоритети прокачки, економія ресурсів та розвиток бізнесу.",
            descriptionEn: "Complete guide for a fast start in Neverness to Everness. Leveling priorities, resource conservation, and business growth.",
            category: "beginner",
            isFeatured: true,
            difficulty: "Easy",
            difficultyEn: "Easy",
            updateDate: "2026-05-24",
            tags: ["Beginner", "F2P", "Progression"],
            tagsEn: ["Beginner", "F2P", "Progression"],
            avatar: "🚀",
            content: {
                sections: [
                    {
                        title: "1. Прогресія сюжету (Story Quest Priority)",
                        titleEn: "1. Story Quest Priority",
                        text: "Головна мета на старті — проходження основної сюжетної кампанії. Це відкриває доступ до всіх ігрових режимів, нових районів Hethereau, підвищує Рівень Мисливця (Hunter Level) та відкриває нові ліміти розвитку.",
                        textEn: "The main goal at start is completing the main story campaign. This unlocks all game modes, new Hethereau districts, raises Hunter Level, and unlocks new level caps."
                    },
                    {
                        title: "2. Розвиток бізнесу City Tycoon",
                        titleEn: "2. City Tycoon Business",
                        text: "Кав'ярня — це не просто пасивний прибуток, а й джерело цінного контенту. Обов'язково розвивайте її: на 18-му рівні City Tycoon ви безкошватимете безкоштовно отримаєте чудового атакуючого персонажа Чіз (Chiz), а на 21-му рівні — її кращу сигнатурну зброю!",
                        textEn: "The cafe is not just passive income, but also a source of valuable content. Make sure to develop it: at level 18 of City Tycoon you will get Chiz for free, and at level 21 her signature 4-star weapon!"
                    },
                    {
                        title: "3. Мотоцикл Novis ST-X 950",
                        titleEn: "3. Novis ST-X 950 Motorcycle",
                        text: "Купіть цей мотоцикл у дилера Regalia в районі New Herland. На відміну від автомобілів, його можна викликати прямо посеред бездоріжжя та перестрибувати перешкоди, що значно прискорить проходження карти.",
                        textEn: "Buy this motorcycle from the Regalia dealer in New Herland. Unlike cars, it can be summoned anywhere off-road and jump over obstacles, which greatly accelerates exploration."
                    },
                    {
                        title: "4. Телефонні будки ReroRero",
                        titleEn: "4. ReroRero Phone Booths",
                        text: "Обов'язково взаємодійте з ними під час подорожі містом для створення швидкої мережі телепортації. Це основа комфортного переміщення.",
                        textEn: "Always interact with them during city travels to establish a fast teleportation network. This is the foundation of comfortable travel."
                    }
                ]
            },
            references: ["https://reddit.com/r/NevernessToEverness", "https://nevernesstoeverness.fandom.com"],
            recommendedTeams: ["nanally", "sakiri", "zero", "jiuyuan"],
            progressionTips: [
                "Спочатку вкладайте ресурси лише в одного головного ДПС.",
                "Не витрачайте витривалість на картриджі до досягнення 45+ рівня оцінки.",
                "Щодня збирайте пасивні Beetle Coins у вашій кав'ярні."
            ],
            progressionTipsEn: [
                "Invest resources into one main carry character first.",
                "Do not spend stamina on cartridges before Appraisal Level 45+.",
                "Collect passive Beetle Coins from your cafe daily."
            ]
        },
        {
            id: "guide-farming-routes",
            title: "Маршрути Фарму: Монети Beetle та Матеріали",
            titleEn: "Farming Routes: Beetle Coins & Materials",
            description: "Де фармити золото (Beetle Coins), досвід персонажів, ресурси прориву та кращі комплекти картриджів без зайвих витрат енергії.",
            descriptionEn: "Where to farm gold (Beetle Coins), character EXP, breakthrough resources, and the best cartridge sets without wasting energy.",
            category: "farming",
            isFeatured: false,
            difficulty: "Medium",
            difficultyEn: "Medium",
            updateDate: "2026-05-23",
            tags: ["Farming", "Resources", "Dungeons"],
            tagsEn: ["Farming", "Resources", "Dungeons"],
            avatar: "🔍",
            content: {
                sections: [
                    {
                        title: "1. Монети Beetle та Золото",
                        titleEn: "1. Beetle Coins & Gold",
                        text: "Найбільш ефективне джерело золота — випробування Houdinii's Magic Stage (Розділ Валюти). Також проходьте Аномальні доручення на карті міста, за які дають Beetle Coins та скриньки вибору матеріалів.",
                        textEn: "The most efficient source of gold is Houdinii's Magic Stage (Currency Section). Also complete Anomaly Commissions on the city map which yield Beetle Coins and material selection boxes."
                    },
                    {
                        title: "2. Матеріали навичок (Книги)",
                        titleEn: "2. Skill Materials (Scrolls)",
                        text: "Сувої навичок падають у випробуванні Houdinii's Schemes. Зверніть увагу, що тип сувою залежить від дня тижня. Плануйте витрати витривалості заздалегідь.",
                        textEn: "Skill scrolls drop in Houdinii's Schemes. Note that the scroll type depends on the day of the week. Plan your stamina usage in advance."
                    },
                    {
                        title: "3. Матеріали прориву з Босів",
                        titleEn: "3. Boss Breakthrough Materials",
                        text: "Для покращення мисливців вище 20/40/50/60/70 рівнів потрібні унікальні трофеї зі світових босів (наприклад, Вершник без голови або Серенетті). Витрата становить 40 Пікселів за кожен збір.",
                        textEn: "To upgrade hunters past levels 20/40/50/60/70, you need unique trophies from world bosses (e.g. Headless Rider or Serenetti). Pixel cost is 40 per collection."
                    }
                ]
            },
            references: ["https://reddit.com/r/NevernessToEverness", "https://nevernesstoeverness.fandom.com"],
            recommendedTeams: ["zero", "sakiri", "nanally", "daffodil"],
            progressionTips: [
                "Використовуйте густі пікселі (Condensed Pixels) для подвоєння нагород з босів.",
                "Фарміть щотижневих босів аномалій рівно 3 рази на тиждень."
            ],
            progressionTipsEn: [
                "Use Condensed Pixels to double rewards from bosses.",
                "Farm weekly anomaly bosses exactly 3 times a week."
            ]
        },
        {
            id: "guide-elemental-reactions",
            title: "Елементальні Реакції та Бойова Синергія",
            titleEn: "Elemental Reactions & Combat Synergy",
            description: "Детальний розбір механіки реакцій стихій: Blossom, Esper Cycle, Scorch, Charged, Discord, Stain та Nova.",
            descriptionEn: "Detailed breakdown of element reaction mechanics: Blossom, Esper Cycle, Scorch, Charged, Discord, Stain, and Nova.",
            category: "systems",
            isFeatured: true,
            difficulty: "Hard",
            difficultyEn: "Hard",
            updateDate: "2026-05-24",
            tags: ["Mechanics", "Combat", "Meta"],
            tagsEn: ["Mechanics", "Combat", "Meta"],
            avatar: "⚔️",
            content: {
                sections: [
                    {
                        title: "1. Реакція Blossom (Цвітіння) - Anima + Anima",
                        titleEn: "1. Blossom Reaction - Anima + Anima",
                        text: "Активується при поєднанні двох або більше персонажів стихії Аніми в команді. Збільшує швидкість відновлення енергії (Energy Recharge) на 15% та підвищує Аніма-шкоду загону. Чудово підходить для прискорення атак Наналлі та Цзююань.",
                        textEn: "Triggered by having 2 or more Anima characters in the team. Increases Energy Recharge by 15% and boosts Anima DMG. Highly effective for speeding up Nanally and Jiuyuan's attacks."
                    },
                    {
                        title: "2. Esper Cycle (Цикл Есперів) - Cosmos + Будь-яка інша стихія",
                        titleEn: "2. Esper Cycle - Cosmos + Any Other Element",
                        text: "Реакція за участю елемента Космосу. Космос виступає універсальним каталізатором: заміна персонажів наповнює шкалу еспер-енергії (Esper Meter) на 30% швидше, полегшуючи проведення комбо-атак.",
                        textEn: "Reaction involving the Cosmos element. Cosmos acts as a universal catalyst: swapping characters fills the Esper Meter 30% faster, making combo-attacks much easier."
                    },
                    {
                        title: "3. Scorch (Випалювання) - Anima + Incantation",
                        titleEn: "3. Scorch - Anima + Incantation",
                        text: "Реакція між вітром (Anima) та вогняним закляттям (Incantation). Створює потужний тепловий ефект, що підпалює ворогів навколо та завдає періодичної вогняної шкоди (DoT) кожні 1.5 сек.",
                        textEn: "Reaction between wind (Anima) and fire (Incantation). Triggers a thermal combustion effect that ignites surrounding targets, dealing fire damage over time (DoT) every 1.5 seconds."
                    },
                    {
                        title: "4. Charged (Зарядження) - Chaos + Incantation",
                        titleEn: "4. Charged - Chaos + Incantation",
                        text: "Реакція при поєднанні Хаосу та Закляття. Накладає на ворогів дебафф 'Зниження стабільності', що значно послаблює їхню стійкість, дозволяючи набагато швидше пробивати щити (Break).",
                        textEn: "Reaction triggered by combining Chaos and Incantation. Applies a 'Stability Shred' debuff on enemies, significantly weakening their poise and letting you break their shields much faster."
                    },
                    {
                        title: "5. Remora (Ремора) - Cosmos + Lakshana",
                        titleEn: "5. Remora - Cosmos + Lakshana",
                        text: "Поєднання Космосу та Лакшани. Підвищує загальний шанс критичного удару загону на 10%, а також суттєво баффає фізичну та космічну шкоду всіх членів команди.",
                        textEn: "Reaction between Cosmos and Lakshana. Increases the team's overall Crit Rate by 10%, while significantly boosting physical and Cosmos damage for all squad members."
                    },
                    {
                        title: "6. Discord (Розбрат) - (Incantation або Chaos) + Psyche",
                        titleEn: "6. Discord - (Incantation / Chaos) + Psyche",
                        text: "Створюється при взаємодії Закляття або Хаосу з Психеєю. Викликає ментальний дисонанс у ворогів, знижуючи їхню стійкість і збільшуючи шкоду по пробитих щитах на 25%.",
                        textEn: "Reaction of Incantation or Chaos with Psyche. Induces mental dissonance in targets, reducing their poise stability and dealing 25% more damage to enemies with broken shields."
                    },
                    {
                        title: "7. Stain (Пляма) - Lakshana + Psyche",
                        titleEn: "7. Stain - Lakshana + Psyche",
                        text: "Поєднання Лакшани та Психеї. Спотворює сприйняття ворогів, через що вони отримують додаткову періодичну шкоду, а їхня сила атаки (ATK) знижується на час дії ефекту.",
                        textEn: "Combining Lakshana and Psyche. Distorts enemy perception, forcing targets to receive extra damage over time while lowering their total Attack power (ATK) during the effect."
                    },
                    {
                        title: "8. Nova (Нова) - Anima + Psyche",
                        titleEn: "8. Nova - Anima + Psyche",
                        text: "Реакція між Анімою та Психеєю. Викликає потужний психічний вибух, який завдає колосальної площинної (AoE) шкоди навколишнім супротивникам.",
                        textEn: "Reaction between Anima and Psyche. Triggers a massive mental shockwave, dealing colossal area-of-effect (AoE) damage to all nearby opponents."
                    }
                ]
            },
            references: ["https://reddit.com/r/NevernessToEverness"],
            recommendedTeams: ["nanally", "jiuyuan", "sakiri", "zero"],
            progressionTips: [
                "Завжди тримайте хоча б одного персонажа Космосу в команді для швидких ротацій.",
                "Знижуйте опір стихіям за допомогою саппортів перед викликом основної реакції."
            ],
            progressionTipsEn: [
                "Always keep at least one Cosmos character in your team for faster rotations.",
                "Shred elemental resistances using supports before triggering major reactions."
            ]
        },
        {
            id: "guide-meta-analysis",
            title: "Аналіз Мети Патчу 1.0: Рейтинг та Тренди",
            titleEn: "Patch 1.0 Meta Analysis: Rankings & Trends",
            description: "Аналіз поточної ігрової мети. Чому Наналлі та Сакірі тримають першість, та які нові персонажі змінять баланс сил.",
            descriptionEn: "Current game meta analysis. Why Nanally and Sakiri hold the top spots, and which new characters will change the power balance.",
            category: "meta",
            isFeatured: false,
            difficulty: "Hard",
            difficultyEn: "Hard",
            updateDate: "2026-05-24",
            tags: ["Meta", "Tier List", "Analysis"],
            tagsEn: ["Meta", "Tier List", "Analysis"],
            avatar: "📊",
            content: {
                sections: [
                    {
                        title: "1. Абсолютне домінування Наналлі (Main DPS Meta)",
                        titleEn: "1. Absolute Domination of Nanally (Main DPS)",
                        text: "Наналлі є найкращим ДПС завдяки антигравітаційним механікам: її авто-атаки в повітрі безпечні від більшості наземних босів, а вибух стихій завдає величезної точкової шкоди.",
                        textEn: "Nanally is the premier DPS due to anti-gravity mechanics: her aerial auto-attacks are safe from most ground bosses, and her Ultimate deals massive single-target damage."
                    },
                    {
                        title: "2. Роль Сакірі як універсального саппорта",
                        titleEn: "2. Sakiri's Role as a Universal Support",
                        text: "Сакірі незамінна в будь-якій команді. Її стяжка є найсильнішою в грі, а пасивне зниження супротиву стихій на 30% збільшує шкоду будь-кого Main Carry.",
                        textEn: "Sakiri is indispensable in any team. Her crowd control pull is the strongest in the game, and her passive 30% elemental shred boosts any Main Carry's damage."
                    }
                ]
            },
            references: ["https://reddit.com/r/NevernessToEverness", "https://keqingmains.com"],
            recommendedTeams: ["nanally", "sakiri", "zero", "jiuyuan"],
            progressionTips: [
                "Сфокусуйтеся на отриманні Сакірі, оскільки вона підходить під будь-який елемент.",
                "Не ігноруйте А-ранг персонажів, таких як Чіз, які є чудовими F2P замінниками."
            ],
            progressionTipsEn: [
                "Focus on getting Sakiri since she fits into any elemental composition.",
                "Do not ignore A-rank characters like Chiz, who are excellent F2P substitutes."
            ]
        },
        {
            id: "guide-team-nanally-blossom",
            title: "Команда 'Вітер і Гравітація' (Blossom Hypercarry)",
            titleEn: "Team 'Wind & Gravity' (Blossom Hypercarry)",
            description: "Найпопулярніша мета-команда, побудована навколо реакції Blossom (Аніма + Аніма) з прискоренням ротації за рахунок Космосу.",
            descriptionEn: "The most popular meta team built around Blossom reaction (Anima + Anima) with rotation acceleration courtesy of Cosmos.",
            category: "teams",
            isFeatured: false,
            difficulty: "Medium",
            difficultyEn: "Medium",
            updateDate: "2026-05-24",
            tags: ["Teams", "Meta", "Blossom", "S-Tier"],
            tagsEn: ["Teams", "Meta", "Blossom", "S-Tier"],
            avatar: "👥",
            content: {
                sections: [
                    {
                        title: "Склад загону (Squad Composition)",
                        titleEn: "Squad Composition",
                        text: "• <strong>Наналлі (Nanally):</strong> Головний ДПС, нанесення основної шкоди.<br>• <strong>Цзююань (Jiuyuan):</strong> Саб-ДПС, накладання статусу Аніми та вибухова шкода.<br>• <strong>Сакірі (Sakiri):</strong> Саппорт, стягування ворогів та зріз опорів.<br>• <strong>Зеро (Zero):</strong> Саппорт/Космос, прискорення відкату навичок.",
                        textEn: "• <strong>Nanally:</strong> Main DPS, primary damage dealer.<br>• <strong>Jiuyuan:</strong> Sub-DPS, Anima applicator and burst damage.<br>• <strong>Sakiri:</strong> Support, crowd control and resistance shred.<br>• <strong>Zero:</strong> Support/Cosmos, skill cooldown acceleration."
                    },
                    {
                        title: "Бойова ротація (Skill Rotation)",
                        titleEn: "Combat Rotation",
                        text: "1. Почніть із <strong>Сакірі</strong>: використовуйте стяжку та вибух стихій.<br>2. Переключіться на <strong>Зеро</strong>: активуйте його щит та поле для активації Циклу Есперів.<br>3. Перейдіть на <strong>Цзююань</strong>: виконайте швидку серію навичок.<br>4. Закінчуйте на <strong>Наналлі</strong>: злітайте в повітря та наносьте максимальну шкоду авто-атаками.",
                        textEn: "1. Start with <strong>Sakiri</strong>: use skill pull and Ultimate Burst.<br>2. Swap to <strong>Zero</strong>: activate shield and field to trigger Esper Cycle.<br>3. Swap to <strong>Jiuyuan</strong>: perform rapid skill sequence.<br>4. Finish with <strong>Nanally</strong>: lift into the air and deal maximum damage with auto-attacks."
                    }
                ]
            },
            references: ["https://reddit.com/r/NevernessToEverness", "https://nevernesstoeverness.fandom.com"],
            recommendedTeams: ["nanally", "jiuyuan", "sakiri", "zero"],
            progressionTips: [
                "Намагайтеся підтримувати щит Зеро активним весь час для стабільності.",
                "Використовуйте Ultimate Сакірі строго перед виходом Наналлі для максимального баффу.",
                "Активуйте комбо Цзююань під час відкату основних навичок Наналлі для безперервного Цвітіння.",
                "Зберігайте ультимейт Наналлі для фази пробиття щитів боса (Break State)."
            ],
            progressionTipsEn: [
                "Try to keep Zero's shield active at all times for posture stability.",
                "Use Sakiri's Ultimate strictly before swapping to Nanally for maximum damage buff.",
                "Execute Jiuyuan's quick combo when Nanally's main skills are on cooldown to maintain Blossom.",
                "Save Nanally's Ultimate Burst for the boss's shield broken state (Break phase)."
            ]
        },
        {
            id: "guide-team-chaos-charged",
            title: "Команда 'Хаотичний Заряд' (Chaos Charged Poise Shred)",
            titleEn: "Team 'Chaos Charged' (Charged Shield Break)",
            description: "Вибухова команда стихії Хаос, орієнтована на миттєве знищення стійкості ворогів через реакцію Charged (Хаос + Закляття).",
            descriptionEn: "High-tier Chaos team focused on shredding enemy poise stability via Charged reaction (Chaos + Incantation).",
            category: "teams",
            isFeatured: false,
            difficulty: "Medium",
            difficultyEn: "Medium",
            updateDate: "2026-05-24",
            tags: ["Teams", "Meta", "Chaos", "A-Tier"],
            tagsEn: ["Teams", "Meta", "Chaos", "A-Tier"],
            avatar: "👥",
            content: {
                sections: [
                    {
                        title: "Склад загону (Squad Composition)",
                        titleEn: "Squad Composition",
                        text: "• <strong>Лакрімоза (Lacrimosa):</strong> Головний ДПС, нанесення Хаос шкоди масками.<br>• <strong>Даффоділ (Daffodil):</strong> Саб-ДПС, спеціалізується на пробитті щитів (Break).<br>• <strong>Сакірі (Sakiri):</strong> Саппорт, стягування ворогів та зріз опорів.<br>• <strong>Адлер (Adler):</strong> Саппорт/Щитовик, захист та додаткове збиття стійкості.",
                        textEn: "• <strong>Lacrimosa:</strong> Main DPS, continuous mask Chaos damage.<br>• <strong>Daffodil:</strong> Sub-DPS, shield breaking expert (Break).<br>• <strong>Sakiri:</strong> Support, crowd control and shred.<br>• <strong>Adler:</strong> Support/Shield, protection and poise break assistance."
                    },
                    {
                        title: "Бойова ротація (Skill Rotation)",
                        titleEn: "Combat Rotation",
                        text: "1. Використовуйте <strong>Сакірі</strong> для стягування групи ворогів.<br>2. Переключіться на <strong>Адлера</strong> та активуйте його щит для захисту.<br>3. Перейдіть на <strong>Даффоділ</strong> та виконайте серію атак для активації реакції Charged та швидкого пробиття щитів боса.<br>4. Викличте <strong>Лакрімозу</strong> для нанесення колосальної вибухової шкоди по ворогах у стані Break.",
                        textEn: "1. Use <strong>Sakiri</strong> to pull and group enemies.<br>2. Swap to <strong>Adler</strong> and activate his shield for defense.<br>3. Switch to <strong>Daffodil</strong> to trigger Charged reaction and break the boss's shields rapidly.<br>4. Bring in <strong>Lacrimosa</strong> to unleash massive burst damage on enemies in Break state."
                    }
                ]
            },
            references: ["https://reddit.com/r/NevernessToEverness", "https://nevernesstoeverness.fandom.com"],
            recommendedTeams: ["lacrimosa", "daffodil", "sakiri", "adler"],
            progressionTips: [
                "Завжди тримайте щит Адлера активним, оскільки міцність щита масштабується від його захисту.",
                "Не витрачайте ультимейт Даффоділ на ворогів без щитів; її мета — швидке пробиття стійкості.",
                "Реакція Charged знижує опір ворогів до фізичного та стихійного пошкодження.",
                "Лакрімоза наносить значно більше шкоди по ворогах у стані контролю."
            ],
            progressionTipsEn: [
                "Always keep Adler's shield active since its durability scales directly with his DEF.",
                "Do not waste Daffodil's Ultimate on shieldless targets; her primary goal is poise breaking.",
                "The Charged reaction shreds enemy posture, making stability break much faster.",
                "Lacrimosa deals significantly amplified damage to controlled and broken enemies."
            ]
        },
        {
            id: "guide-team-f2p-starter",
            title: "Стартовий загін F2P (Starter Catalyst)",
            titleEn: "F2P Starter Team (Starter Catalyst)",
            description: "Збалансований та повністю безкоштовний загін, доступний кожному гравцеві на початку гри для комфортного проходження сюжету.",
            descriptionEn: "Balanced and fully free-to-play squad available to every player at start for comfortable story progression.",
            category: "teams",
            isFeatured: false,
            difficulty: "Easy",
            difficultyEn: "Easy",
            updateDate: "2026-05-24",
            tags: ["Teams", "F2P", "Starter", "Beginner"],
            tagsEn: ["Teams", "F2P", "Starter", "Beginner"],
            avatar: "👥",
            content: {
                sections: [
                    {
                        title: "Склад загону (Squad Composition)",
                        titleEn: "Squad Composition",
                        text: "• <strong>Мінт (Mint):</strong> Головний ДПС, швидкі авто-атаки та комбо.<br>• <strong>Зеро (Zero):</strong> Саппорт/Космос, прискорення відкату навичок та реакції.<br>• <strong>Едгар (Edgar):</strong> Цілитель, відновлення здоров'я та виживання.<br>• <strong>Ханіель (Haniel):</strong> Саппорт/Баффер, підвищення сили атаки помічником Hootie.",
                        textEn: "• <strong>Mint:</strong> Main DPS, quick auto-attacks and combos.<br>• <strong>Zero:</strong> Support/Cosmos, cooldown progression/catalyst.<br>• <strong>Edgar:</strong> Healer, health recovery and survival.<br>• <strong>Haniel:</strong> Support/Buffer, ATK buffing helper Hootie."
                    },
                    {
                        title: "Бойова ротація (Skill Rotation)",
                        titleEn: "Combat Rotation",
                        text: "1. Почніть із <strong>Ханіель</strong>: викличте сову Hootie для баффу атаки всього загону.<br>2. Переключіться на <strong>Зеро</strong> та активуйте його навичку для запуску Циклу Есперів.<br>3. Використовуйте лікувальну зону <strong>Едгара</strong> за потреби для підтримки здоров'я.<br>4. Перейдіть на <strong>Мінт</strong> та наносьте шкоду комбо-атаками під дією всіх баффів.",
                        textEn: "1. Start with <strong>Haniel</strong>: summon owl Hootie to buff the entire squad's ATK.<br>2. Swap to <strong>Zero</strong> and use skill to trigger Esper Cycle catalyst.<br>3. Deploy <strong>Edgar's</strong> healing zone as needed to keep the squad healthy.<br>4. Switch to <strong>Mint</strong> and deal damage with combo attacks while all buffs are active."
                    }
                ]
            },
            references: ["https://reddit.com/r/NevernessToEverness", "https://nevernesstoeverness.fandom.com"],
            recommendedTeams: ["mint", "zero", "edgar", "haniel"],
            progressionTips: [
                "Слідкуйте за тим, щоб сова Ханіель постійно перебувала на полі бою.",
                "Зеро є чудовим драйвером для реакцій завдяки Космос-атрибуту.",
                "Едгар відновлює здоров'я пропорційно своєму максимальному HP, збирайте йому картриджі на здоров'я.",
                "Мінт отримує безкоштовні бонуси до атаки при успішному ухиленні від ворожих ударів."
            ],
            progressionTipsEn: [
                "Ensure Haniel's owl assistant is present on the battlefield at all times.",
                "Zero works as an excellent driver for reactions due to his Cosmos element.",
                "Edgar's healing scales with his max HP, so equip him with HP-boosting cartridges.",
                "Mint gains free ATK buffs upon executing perfect dodges against enemy attacks."
            ]
        }
    ];
    
    // Sync the new teams (Baicang, Chiz, Aurelia)
    guides.push(
        {
            id: "guide-team-baicang-burn",
            title: "Команда 'Полум'яний Гнів' (Baicang Burn & Discord)",
            titleEn: "Team 'Blazing Wrath' (Baicang Burn & Discord)",
            description: "Потужна збірка навколо Байцан із використанням реакції Discord та Scorch для постійного нанесення періодичної шкоди та надійного захисту.",
            descriptionEn: "A powerful composition centered on Baicang leveraging Discord and Scorch reactions to maintain damage over time and squad protection.",
            category: "teams",
            isFeatured: false,
            difficulty: "Hard",
            difficultyEn: "Hard",
            updateDate: "2026-05-24",
            tags: ["Teams", "Meta", "Incantation", "Discord"],
            tagsEn: ["Teams", "Meta", "Incantation", "Discord"],
            avatar: "👥",
            content: {
                sections: [
                    {
                        title: "Склад загону (Squad Composition)",
                        titleEn: "Squad Composition",
                        text: "• <strong>Байцан (Baicang):</strong> Головний ДПС, нанесення основної шкоди з витратою здоров'я.<br>• <strong>Сакірі (Sakiri):</strong> Універсальний саппорт, стягування ворогів та зниження опорів.<br>• <strong>Адлер (Adler):</strong> Саппорт/Щитовик, захист від смертельних ударів.<br>• <strong>Фадія (Fadia):</strong> Цілитель/Танк, перенаправлення шкоди та лікування.",
                        textEn: "• <strong>Baicang:</strong> Main DPS, primary carry consuming HP to boost damage.<br>• <strong>Sakiri:</strong> Universal support, crowd control pull and resistance shred.<br>• <strong>Adler:</strong> Support/Shield, protection against fatal hits.<br>• <strong>Fadia:</strong> Healer/Tank, damage redirection and ultimate healing."
                    },
                    {
                        title: "Бойова ротація (Skill Rotation)",
                        titleEn: "Combat Rotation",
                        text: "1. Почніть з <strong>Адлера</strong>: викличте його щит для початкового захисту.<br>2. Переключіться на <strong>Сакірі</strong>: стягніть групу ворогів та накладіть дебафф ультимейтом.<br>3. Перейдіть на <strong>Фадію</strong>: активуйте її лікувальний режим та зону перенаправлення шкоди.<br>4. Виведіть <strong>Байцан</strong>: використовуйте посилені закляття, наносячи колосальну шкоду.",
                        textEn: "1. Start with <strong>Adler</strong>: activate shield to secure initial posture protection.<br>2. Swap to <strong>Sakiri</strong>: use skill pull to bundle enemies and ultimate to shred resistances.<br>3. Swap to <strong>Fadia</strong>: launch Lilith state for active health recovery and damage sharing.<br>4. Finish with <strong>Baicang</strong>: trigger HP-consuming combat loops for massive burst output."
                    }
                ]
            },
            references: ["https://reddit.com/r/NevernessToEverness", "https://nevernesstoeverness.fandom.com"],
            recommendedTeams: ["baicang", "sakiri", "adler", "fadia"],
            progressionTips: [
                "Тримайте щит Адлера постійно активним перед тим як перемикатися на Байцан.",
                "Фадія діє як страховка: її пасивна здатність запобігає випадковому нокауту Байцан.",
                "Реакція Discord знижує стійкість босів, дозволяючи Байцан миттєво пробивати Break.",
                "Слідкуйте за шкалою здоров'я Байцан і не бійтеся використовувати її вміння на низькому HP для максимального баффу."
            ],
            progressionTipsEn: [
                "Ensure Adler's shield is active at all times before swapping into Baicang.",
                "Fadia acts as a safety net: her passive helps prevent accidental knockouts of Baicang.",
                "The Discord reaction shreds enemy composure, allowing Baicang to cause shield Break rapidly.",
                "Keep an eye on Baicang's health pool; her damage scaling increases significantly at lower HP values."
            ]
        },
        {
            id: "guide-team-chiz-cosmos",
            title: "Команда 'Золота Лихоманка' (Cosmos Esper Cycle)",
            titleEn: "Team 'Gold Rush' (Cosmos Esper Cycle)",
            description: "Космічний загін під керівництвом Чіз для миттєвого перезарядження навичок через реакцію Esper Cycle.",
            descriptionEn: "A Cosmos-heavy composition led by Chiz for near-instantaneous skill cooldowns via the Esper Cycle reaction.",
            category: "teams",
            isFeatured: false,
            difficulty: "Medium",
            difficultyEn: "Medium",
            updateDate: "2026-05-24",
            tags: ["Teams", "Meta", "Cosmos", "Cycle"],
            tagsEn: ["Teams", "Meta", "Cosmos", "Cycle"],
            avatar: "👥",
            content: {
                sections: [
                    {
                        title: "Склад загону (Squad Composition)",
                        titleEn: "Squad Composition",
                        text: "• <strong>Чіз (Chiz):</strong> Головний ДПС, нанесення нищівної космічної шкоди молотом.<br>• <strong>Зеро (Zero):</strong> Саппорт/Космос, універсальний каталізатор для прискорення ротацій.<br>• <strong>Хоторі (Hotori):</strong> Саб-ДПС, копіювання та повторення навичок членів команди.<br>• <strong>Сакірі (Sakiri):</strong> Саппорт, стягування ворогів та зріз опорів.",
                        textEn: "• <strong>Chiz:</strong> Main DPS, dealing heavy Cosmos damage with hammer combos.<br>• <strong>Zero:</strong> Support/Cosmos, universal catalyst for rotation speedups.<br>• <strong>Hotori:</strong> Sub-DPS, recording and repeating team active combat actions.<br>• <strong>Sakiri:</strong> Support, grouping targets and applying resistance shred."
                    },
                    {
                        title: "Бойова ротація (Skill Rotation)",
                        titleEn: "Combat Rotation",
                        text: "1. Почніть із <strong>Зеро</strong>: активуйте його Космос-поле для прискорення та баффу.<br>2. Переключіться на <strong>Хоторі</strong>: запустіть прилад запису, щоб скопіювати наступні ефекти.<br>3. Перейдіть на <strong>Сакірі</strong>: виконайте стяжку та запустіть вибух стихій.<br>4. Виведіть <strong>Чіз</strong>: нанесіть комбо ударів та активуйте ультимейт для ігнорування захисту ворогів.",
                        textEn: "1. Start with <strong>Zero</strong>: deploy his Cosmos field to buff team swap speed and recharge.<br>2. Swap to <strong>Hotori</strong>: fire up her recording apparatus to duplicate subsequent skill outputs.<br>3. Swap to <strong>Sakiri</strong>: use her crowd control and ultimate to shred resistance pools.<br>4. Swap to <strong>Chiz</strong>: execute hammer combos and trigger her defense-ignoring Ultimate Burst."
                    }
                ]
            },
            references: ["https://reddit.com/r/NevernessToEverness", "https://nevernesstoeverness.fandom.com"],
            recommendedTeams: ["chiz", "zero", "hotori", "sakiri"],
            progressionTips: [
                "Шкода Чіз додатково масштабується від накопиченої золотої валюти Fons (у межах лімітів).",
                "Реакція Esper Cycle прискорює заповнення Esper Meter на 30%, що дозволяє частіше виконувати комбо-зміни.",
                "Хоторі найкраще показує себе при дублюванні навичок контролю Сакірі або потужних ударів Чіз.",
                "Зберігайте ультимейт Чіз під дію поля Зеро для максимального ігнорування броні."
            ],
            progressionTipsEn: [
                "Chiz's overall damage scales positively with the total Fons currency held in your current pool.",
                "The Esper Cycle reaction charges the swap meter 30% faster, facilitating rapid-fire character chaining.",
                "Hotori is best utilized when replicating Sakiri's grouping skill or Chiz's heavy slam attacks.",
                "Time Chiz's Ultimate Burst strictly within Zero's active field to fully ignore enemy defense stats."
            ]
        },
        {
            id: "guide-team-aurelia-harmony",
            title: "Команда 'Симфонія Розуму' (Psyche Nova)",
            titleEn: "Team 'Mind Symphony' (Psyche Nova)",
            description: "Гармонійний загін з Аурелією як головним ДПС, орієнтований на площинну (AoE) шкоду від реакцій Nova та Discord.",
            descriptionEn: "A harmonic composition with Aurelia as main DPS, focused on area-of-effect (AoE) damage from Nova and Discord reactions.",
            category: "teams",
            isFeatured: false,
            difficulty: "Easy",
            difficultyEn: "Easy",
            updateDate: "2026-05-24",
            tags: ["Teams", "F2P", "Psyche", "Nova"],
            tagsEn: ["Teams", "F2P", "Psyche", "Nova"],
            avatar: "👥",
            content: {
                sections: [
                    {
                        title: "Склад загону (Squad Composition)",
                        titleEn: "Squad Composition",
                        text: "• <strong>Аурелія (Aurelia):</strong> Головний ДПС, нанесення AoE шкоди медузами у стані Cadenza.<br>• <strong>Фадія (Fadia):</strong> Цілитель/Танк, надійне виживання загону.<br>• <strong>Наналлі (Nanally):</strong> Саб-ДПС, виклик реакції Нова та додаткова мобільність.<br>• <strong>Сакірі (Sakiri):</strong> Саппорт, стягування ворогів для вибухових AoE реакцій.",
                        textEn: "• <strong>Aurelia:</strong> Main DPS, summoning jellyfish to deal AoE damage in Cadenza state.<br>• <strong>Fadia:</strong> Healer/Tank, securing overall party health and survival.<br>• <strong>Nanally:</strong> Sub-DPS, triggering the Nova reaction and aiding in vertical movement.<br>• <strong>Sakiri:</strong> Support, pulling target groups together to setup massive AoE reactions."
                    },
                    {
                        title: "Бойова ротація (Skill Rotation)",
                        titleEn: "Combat Rotation",
                        text: "1. Почніть із <strong>Сакірі</strong>: виконайте стяжку, щоб згрупувати всіх ворогів разом.<br>2. Перейдіть на <strong>Фадію</strong>: встановіть щит-надгробок та активуйте лікування.<br>3. Переключіться на <strong>Наналлі</strong>: накладіть статус Аніми швидкою серією атак.<br>4. Swap to <strong>Аурелія</strong>: увійдіть у стан Cadenza та активуйте медуз для виклику реакції Nova.",
                        textEn: "1. Start with <strong>Sakiri</strong>: deploy skill pull to group all targets closely.<br>2. Swap to <strong>Fadia</strong>: drop her tombstone barrier and activate the sustain loop.<br>3. Swap to <strong>Nanally</strong>: apply Anima elements using a quick sequence of normal attacks.<br>4. Swap to <strong>Aurelia</strong>: activate Cadenza mode and summon jellyfish to trigger the AoE Nova reaction."
                    }
                ]
            },
            references: ["https://reddit.com/r/NevernessToEverness"],
            recommendedTeams: ["aurelia", "fadia", "nanally", "sakiri"],
            progressionTips: [
                "Аурелія отримує значний бафф до атаки, коли вороги знаходяться під дією реакції Discord.",
                "Реакція Nova створює потужні вибухи розуму, які завдають колосальної AoE шкоди стягнутим ворогам.",
                "Фадія дозволяє Аурелії безперешкодно виконувати пісенні комбо без переривання від атак ворогів.",
                "Наналлі може виступати як запасний ДПС під час перезарядки Cadenza в Аурелії."
            ],
            progressionTipsEn: [
                "Aurelia gains a major attack boost when fighting targets affected by the Discord reaction.",
                "The Nova reaction produces powerful mental shockwaves, dealing immense AoE damage to grouped targets.",
                "Fadia's support prevents Aurelia's song performance from being interrupted by incoming enemy attacks.",
                "Nanally can act as a secondary damage dealer when Aurelia's Cadenza is on cooldown."
            ]
        }
    );
    
    db.runTransaction; // dummy use just to be clean or keep formatting
    
    const batch = db.batch();

    // Characters
    for (const char of characters) {
        const ref = db.collection('characters').doc(char.id);
        batch.set(ref, char);
    }

    // Promo codes
    for (const code of promoCodes) {
        const ref = db.collection('promoCodes').doc(code.code);
        batch.set(ref, { ...code, addedAt: firebase.firestore.FieldValue.serverTimestamp() });
    }

    // Timeline events
    for (let i = 0; i < timelineEvents.length; i++) {
        const ref = db.collection('timelineEvents').doc(`event_${i}`);
        batch.set(ref, timelineEvents[i]);
    }

    // Guides
    for (const guide of guides) {
        const ref = db.collection('guides').doc(guide.id);
        batch.set(ref, guide);
    }

    // Site config
    const configRef = db.collection('siteConfig').doc('meta');
    batch.set(configRef, {
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
        version: '1.0.0',
        maintenanceMode: false,
        totalCharacters: characters.length,
        totalCodes: promoCodes.length,
        totalGuides: guides.length
    });

    try {
        await batch.commit();
        console.log('✅ SEED COMPLETE!');
        console.log(`   📋 ${characters.length} characters`);
        console.log(`   🎁 ${promoCodes.length} promo codes`);
        console.log(`   📅 ${timelineEvents.length} timeline events`);
        console.log(`   📖 ${guides.length} guides`);
        console.log(`   ⚙️  1 site config`);
        console.log('');
        console.log('🔄 Reload the page to see data from Firestore!');
    } catch (error) {
        console.error('❌ Seed failed:', error);
    }
})();
