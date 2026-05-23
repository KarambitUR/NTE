// NTE Eibon Terminal - Core Application Logic
// =============================================
// Data is loaded from Firebase Firestore with localStorage fallback

// 1. DATA STORES (populated from Firestore or fallback)
let CHARACTERS = [];
let PROMO_CODES = [];
let TIMELINE_EVENTS = [];
let dataSource = 'loading'; // 'firestore', 'cache', 'hardcoded'

// --- I18N LOCALIZATION SYSTEM ---
let currentLang = localStorage.getItem('nte_lang') || 'uk';

const ROLE_TRANSLATIONS = {
    uk: { "Main DPS": "Атакуючий", "Sub-DPS": "Допоміжний ДПС", "Support": "Підтримка" },
    en: { "Main DPS": "Main DPS", "Sub-DPS": "Sub-DPS", "Support": "Support" }
};

const ATTR_TRANSLATIONS = {
    uk: { "Anima": "Аніма", "Cosmos": "Космос", "Incantation": "Закляття", "Chaos": "Хаос", "Psyche": "Психея", "Lakshana": "Лакшана" },
    en: { "Anima": "Anima", "Cosmos": "Cosmos", "Incantation": "Incantation", "Chaos": "Chaos", "Psyche": "Psyche", "Lakshana": "Lakshana" }
};

const STAT_TRANSLATIONS = {
    uk: {
        "Crit Rate": "Шанс криту",
        "Crit Rate (75%+)": "Шанс криту (75%+)",
        "Crit DMG": "Крит. шкода",
        "ATK%": "Сила атаки %",
        "DEF%": "Захист %",
        "HP%": "Здоров'я %",
        "Flat HP": "Здоров'я (фікс.)",
        "Flat DEF": "Захист (фікс.)",
        "Cycle Intensity": "Інтенсивність циклу",
        "Break Effect": "Ефект пробиття",
        "Break Intensity": "Інтенсивність пробиття",
        "Energy Charge Efficiency": "Відновлення енергії",
        "Anima DMG": "Аніма шкода",
        "Cosmos DMG": "Космос шкода",
        "Incantation DMG": "Шкода закляття",
        "Chaos DMG": "Хаос шкода",
        "Psyche DMG": "Психея шкода",
        "Lakshana DMG": "Лакшана шкода",
        "Healing Bonus": "Бонус лікування"
    },
    en: {
        "Crit Rate": "Crit Rate",
        "Crit Rate (75%+)": "Crit Rate (75%+)",
        "Crit DMG": "Crit DMG",
        "ATK%": "ATK%",
        "DEF%": "DEF%",
        "HP%": "HP%",
        "Flat HP": "Flat HP",
        "Flat DEF": "Flat DEF",
        "Cycle Intensity": "Cycle Intensity",
        "Break Effect": "Break Effect",
        "Break Intensity": "Break Intensity",
        "Energy Charge Efficiency": "Energy Recharge",
        "Anima DMG": "Anima DMG",
        "Cosmos DMG": "Cosmos DMG",
        "Incantation DMG": "Incantation DMG",
        "Chaos DMG": "Chaos DMG",
        "Psyche DMG": "Psyche DMG",
        "Lakshana DMG": "Lakshana DMG",
        "Healing Bonus": "Healing Bonus"
    }
};

const CHARACTER_TRANSLATIONS = {
    nanally: {
        uk: {
            name: "Наналлі",
            summary: "Найсильніший атакуючий персонаж стихії Аніма. Володіє неймовірною мобільністю завдяки антигравітаційним механікам та завдає колосальної шкоди авто-атаками супроводу.",
            weapon: "Поцілунок на ніч (Сигнатурний Arc)",
            weaponF2p: "Лють полум'я",
            cartridge: "Світлячки та ліс (4 частини)",
            stats: ["Шанс криту (75%+)", "Крит. шкода", "Аніма шкода", "Сила атаки %"],
            teamSynergy: "Зеро (Космос), Сакірі (Закляття), Цзююань (Аніма)",
            lore: "Загадкова дівчина з лисячими вушками, яка обожнює грати з гравітацією. Працює незалежним детективом аномалій у Hethereau."
        },
        en: {
            name: "Nanally",
            summary: "The strongest Anima attribute DPS character. Possesses incredible mobility thanks to anti-gravity mechanics and deals colossal damage with support auto-attacks.",
            weapon: "Goodnight Kiss (Signature Arc)",
            weaponF2p: "Raging Flames",
            cartridge: "Fireflies and the Forest (4-piece)",
            stats: ["Crit Rate (75%+)", "Crit DMG", "Anima DMG", "ATK%"],
            teamSynergy: "Zero (Cosmos), Sakiri (Incantation), Jiuyuan (Anima)",
            lore: "A mysterious girl with fox ears who loves playing with gravity. Works as an independent anomaly detective in Hethereau."
        }
    },
    sakiri: {
        uk: {
            name: "Сакірі",
            summary: "Найкращий персонаж підтримки у грі. Стягує ворогів, накладає потужне зниження опору до стихій та баффає силу атаки всієї команди після вибуху стихій.",
            weapon: "Велика пригода хорошого хлопчика (Сигнатурний)",
            weaponF2p: "Смуток у моєму серці",
            cartridge: "Швидкий їжак (4 частини)",
            stats: ["Інтенсивність циклу", "Ефект пробиття", "Відновлення енергії", "Сила атаки %"],
            teamSynergy: "Наналлі (Аніма), Зеро (Космос), Даффоділ (Хаос)",
            lore: "Весела та енергійна дівчина, яка завжди носить із собою іграшкового кролика. Здатна бачити приховані нитки долі за допомогою заклять."
        },
        en: {
            name: "Sakiri",
            summary: "The best support character in the game. Groups enemies, applies heavy elemental resistance shred, and buffs the ATK of the entire team after using Ultimate Burst.",
            weapon: "Good Boy's Grand Adventure (Signature)",
            weaponF2p: "Failing You, Heavy in My Heart",
            cartridge: "Speedy Hedgehog (4-piece)",
            stats: ["Cycle Intensity", "Break Effect", "Energy Recharge Efficiency", "ATK%"],
            teamSynergy: "Nanally (Anima), Zero (Cosmos), Daffodil (Chaos)",
            lore: "A cheerful and energetic girl who always carries a toy rabbit. Able to see hidden threads of fate using incantations."
        }
    },
    jiuyuan: {
        uk: {
            name: "Цзююань",
            summary: "Потужний допоміжний ДПС, який завдає швидку вибухову шкоду. Ідеально підходить для активації реакції Blossom (Цвітіння) разом з Наналлі.",
            weapon: "Шепіт нефритового дракона (Сигнатурний)",
            weaponF2p: "Порив вітру",
            cartridge: "Світлячки та ліс (4 частини)",
            stats: ["Шанс криту", "Крит. шкода", "Аніма шкода", "Відновлення енергії"],
            teamSynergy: "Наналлі (Аніма), Сакірі (Закляття), Зеро (Космос)",
            lore: "Мисливиця на аномалії стародавнього роду з витонченими манерами. Використовує віяло для виклику аномальних повітряних потоків."
        },
        en: {
            name: "Jiuyuan",
            summary: "A powerful Sub-DPS character who deals quick burst damage. Perfectly suited for triggering Blossom reactions alongside Nanally.",
            weapon: "Jade Dragon Whisper (Signature)",
            weaponF2p: "Rising Wind",
            cartridge: "Fireflies and the Forest (4-piece)",
            stats: ["Crit Rate", "Crit DMG", "Anima DMG", "Energy Recharge Efficiency"],
            teamSynergy: "Nanally (Anima), Sakiri (Incantation), Zero (Cosmos)",
            lore: "An anomaly hunter of an ancient lineage with refined manners. Uses a fan to summon anomalous air currents."
        }
    },
    hotori: {
        uk: {
            name: "Хоторі",
            summary: "Унікальний допоміжний ДПС / підтримка, здатна записувати та повторювати навички активних членів загону, подвоюючи загальну шкоду команди.",
            weapon: "Відлуння вічності (Сигнатурний)",
            weaponF2p: "Блокнот оцінювача",
            cartridge: "Швидкий їжак (4 частини)",
            stats: ["Відновлення енергії", "Інтенсивність циклу", "Сила атаки %", "Здоров'я %"],
            teamSynergy: "Наналлі (Аніма), Адлер (Хаос), Ханіель (Закляття)",
            lore: "Тихий оцінювач аномальних предметів, який проводить більшу частину часу в бібліотеці антикварної крамниці Eibon."
        },
        en: {
            name: "Hotori",
            summary: "A unique Sub-DPS / Support character capable of recording and repeating the active team members' skills, doubling the overall team damage.",
            weapon: "Echoes of Eternity (Signature)",
            weaponF2p: "Appraiser's Notebook",
            cartridge: "Speedy Hedgehog (4-piece)",
            stats: ["Energy Recharge Efficiency", "Cycle Intensity", "ATK%", "HP%"],
            teamSynergy: "Nanally (Anima), Adler (Chaos), Haniel (Incantation)",
            lore: "A quiet appraiser of anomalous items who spends most of her time in the library of the Eibon antique shop."
        }
    },
    zero: {
        uk: {
            name: "Зеро",
            summary: "Головний герой. Володіє Cosmos атрибутом, що є універсальним каталізатором для активації ефекту Esper Cycle для будь-якої іншої стихії.",
            weapon: "Спадщина Ейбона (Сигнатурний)",
            weaponF2p: "Рішучість мисливця",
            cartridge: "Швидкий їжак (4 частини)",
            stats: ["Сила атаки %", "Шанс криту", "Інтенсивність циклу", "Відновлення енергії"],
            teamSynergy: "Будь-який ДПС персонаж стихії Аніма або Закляття",
            lore: "Новий володар антикварної крамниці Eibon, що втратив спогади про своє минуле, але володіє дивним даром бачити сутність аномалій."
        },
        en: {
            name: "Zero",
            summary: "The main protagonist. Possesses the Cosmos attribute, acting as a universal catalyst to activate the Esper Cycle effect for any other element.",
            weapon: "Eibon Legacy (Signature)",
            weaponF2p: "Hunter's Resolve",
            cartridge: "Speedy Hedgehog (4-piece)",
            stats: ["ATK%", "Crit Rate", "Cycle Intensity", "Energy Recharge Efficiency"],
            teamSynergy: "Any Anima or Incantation DPS character",
            lore: "The new owner of the Eibon antique shop, who lost his memories of the past but possesses a strange gift of seeing the core of anomalies."
        }
    },
    adler: {
        uk: {
            name: "Адлер",
            summary: "Надійний щитовик стихії Закляття. Створює міцний щит, міцність якого масштабується від його захисту (DEF), та допомагає збивати стійкість ворогів.",
            weapon: "Бар'єр вартового (Сигнатурний)",
            weaponF2p: "Іржавий щит із сплаву",
            cartridge: "Швидкий їжак (4 частини) або Захисний набір",
            stats: ["Захист %", "Захист", "Ефект пробиття", "Відновлення енергії"],
            teamSynergy: "Наналлі (Аніма), Сакірі (Закляття), Зеро (Космос)",
            lore: "Колишній охоронець, який тепер допомагає крамниці Eibon із важкими замовленнями у небезпечних зонах Hethereau."
        },
        en: {
            name: "Adler",
            summary: "A reliable shield provider of the Incantation element. Generates a sturdy shield scaling with his DEF, helping to break enemy stability.",
            weapon: "Sentinel's Barrier (Signature)",
            weaponF2p: "Rusty Alloy Shield",
            cartridge: "Speedy Hedgehog (4-piece) or Guard Set",
            stats: ["DEF%", "Flat DEF", "Break Effect", "Energy Recharge Efficiency"],
            teamSynergy: "Nanally (Anima), Sakiri (Incantation), Zero (Cosmos)",
            lore: "A former security guard who now helps the Eibon shop with heavy commissions in the dangerous zones of Hethereau."
        }
    },
    mint: {
        uk: {
            name: "Мінт",
            summary: "Хороший безкоштовний F2P атакуючий персонаж. Проста механіка комбо-атак та швидка перезарядка елементальних умінь.",
            weapon: "Клинок зефіру",
            weaponF2p: "Сталева рапіра",
            cartridge: "Світлячки та ліс (4 частини)",
            stats: ["Сила атаки %", "Шанс криту", "Крит. шкода", "Аніма шкода"],
            teamSynergy: "Зеро (Космос), Ханіель (Закляття), Адлер (Хаос)",
            lore: "Молода стажерка в Eibon, яка прагне стати найкращим оцінювачем аномалій у місті."
        },
        en: {
            name: "Mint",
            summary: "A good free F2P DPS character. Features a simple combo attack mechanic and quick elemental skill cooldowns.",
            weapon: "Zephyr Blade",
            weaponF2p: "Steel Rapier",
            cartridge: "Fireflies and the Forest (4-piece)",
            stats: ["ATK%", "Crit Rate", "Crit DMG", "Anima DMG"],
            teamSynergy: "Zero (Cosmos), Haniel (Incantation), Adler (Chaos)",
            lore: "A young intern at Eibon who aspires to become the best anomaly appraiser in the city."
        }
    },
    haniel: {
        uk: {
            name: "Ханіель",
            summary: "Потужний персонаж підтримки стихії Психея. Баффає силу атаки загону та викликає помічника Hootie, який допомагає наносити шкоду та підтримувати союзників.",
            weapon: "Королівський розум (Сигнатурний)",
            weaponF2p: "Готовий-Готовий",
            cartridge: "Велика маленька пригода (4 частини)",
            stats: ["Сила атаки %", "Шанс криту", "Психея шкода", "Відновлення енергії"],
            teamSynergy: "Мінт (Аніма), Зеро (Космос), Адлер (Закляття)",
            lore: "Турботлива та мила дівчина, яка завжди носить із собою іграшкового сову-помічника Hootie, здатного надихати союзників під час бою."
        },
        en: {
            name: "Haniel",
            summary: "A strong support character of the Psyche element. Buffs squad ATK and summons helper Hootie to deal damage and sustain allies.",
            weapon: "Mind Royale (Signature)",
            weaponF2p: "Ready-Ready",
            cartridge: "Tiny Big Adventure (4-piece)",
            stats: ["ATK%", "Crit Rate", "Psyche DMG", "Energy Recharge Efficiency"],
            teamSynergy: "Mint (Anima), Zero (Cosmos), Adler (Incantation)",
            lore: "A caring and sweet girl who always carries a toy owl assistant Hootie, capable of inspiring allies during battle."
        }
    },
    lacrimosa: {
        uk: {
            name: "Лакрімоза",
            summary: "Новий анонсований персонаж версії 1.1. Спеціалізується на Хаос шкоді та потужних комбо-атаках масками.",
            weapon: "Трагедія та комедія (Сигнатурний)",
            weaponF2p: "Смуток у моєму серці",
            cartridge: "Затемнення хаосу (4 частини)",
            stats: ["Шанс криту", "Крит. шкода", "Хаос шкода", "Сила атаки %"],
            teamSynergy: "Сакірі (Закляття), Зеро (Космос), Хоторі (Космос)",
            lore: "Театральна акторка, чиї вистави зачаровують глядачів Гетеро. Кажуть, що її маски мають власне аномальне життя."
        },
        en: {
            name: "Lacrimosa",
            summary: "A newly announced version 1.1 character. Specializes in Chaos damage and powerful mask combo attacks.",
            weapon: "Tragedy & Comedy (Signature)",
            weaponF2p: "Failing You, Heavy in My Heart",
            cartridge: "Chaos Eclipse (4-piece)",
            stats: ["Crit Rate", "Crit DMG", "Chaos DMG", "ATK%"],
            teamSynergy: "Sakiri (Incantation), Zero (Cosmos), Hotori (Cosmos)",
            lore: "A theatrical actress whose performances enchant the audience of Hethereau. It is said that her masks have their own anomalous life."
        }
    },
    daffodil: {
        uk: {
            name: "Даффоділ",
            summary: "Потужний вибуховий атакуючий стихії Хаос, що спеціалізується на пробитті щитів (Break). Накопичує силу поза полем бою і завдає величезної вибухової шкоди при перемиканні.",
            weapon: "Юнацька фантазія (Сигнатурний Arc)",
            weaponF2p: "Світлі дні",
            cartridge: "Затемнення хаосу (4 частини)",
            stats: ["Інтенсивність пробиття", "Шанс криту", "Крит. шкода", "Сила атаки %"],
            teamSynergy: "Наналлі (Аніма), Зеро (Космос), Сакірі (Закляття)",
            lore: "Мовчазна та загадкова охоронниця антикварної крамниці Eibon. Володіє калейдоскопічними очима і приховує под холодною маскою відданість друзям."
        },
        en: {
            name: "Daffodil",
            summary: "A powerful Burst DPS of the Chaos element, specializing in shield breaking (Break). Accumulates power off-field and deals massive damage upon switching.",
            weapon: "Youthful Fantasy (Signature Arc)",
            weaponF2p: "Shiny Days",
            cartridge: "Chaos Eclipse (4-piece)",
            stats: ["Break Intensity", "Crit Rate", "Crit DMG", "ATK%"],
            teamSynergy: "Nanally (Anima), Zero (Cosmos), Sakiri (Incantation)",
            lore: "A quiet and mysterious guardian of the Eibon antique shop. Possesses kaleidoscopic eyes and hides her devotion to friends under a cold mask."
        }
    },
    baicang: {
        uk: {
            name: "Байцан",
            summary: "Потужний атакуючий персонаж стихії Закляття. Використовує механіку витрати власного здоров'я для підвищення шкоди. Потребує надійного цілителя в команді.",
            weapon: "Товариство камелій (Сигнатурний)",
            weaponF2p: "Час прийде",
            cartridge: "Багряні метелики-близнята (4 частини)",
            stats: ["Шанс криту", "Крит. шкода", "Шкода закляття", "Сила атаки %"],
            teamSynergy: "Ханіель (Закляття), Сакірі (Закляття), Адлер (Хаос)",
            lore: "Капітан підрозділу ETD-4 Бюро контролю аномалій. Досвідчений ветеран з невимушеним характером, який піклується про своїх підлеглих як старший брат."
        },
        en: {
            name: "Baicang",
            summary: "A powerful Main DPS of the Incantation element. Utilizes a self-HP drain mechanic to boost damage. Requires a reliable healer in the team.",
            weapon: "Camellia Society (Signature)",
            weaponF2p: "A Time Will Come",
            cartridge: "Crimson: Twin Butterflies (4-piece)",
            stats: ["Crit Rate", "Crit DMG", "Incantation DMG", "ATK%"],
            teamSynergy: "Haniel (Incantation), Sakiri (Incantation), Adler (Chaos)",
            lore: "Captain of the ETD-4 unit of the Anomaly Control Bureau. An experienced veteran with an easygoing personality who cares for his subordinates like a big brother."
        }
    },
    chiz: {
        uk: {
            name: "Чіз",
            summary: "Потужний атакуючий стихії Космос. Її ультимейт ігнорує велику частину захисту ворога, а сигнатурна зброя дає додаткову шкоду залежно від ваших Fons (монет).",
            weapon: "Замислений кіт (Сигнатурний)",
            weaponF2p: "Дика мрія",
            cartridge: "Втрачене сяйво (4 частини)",
            stats: ["Шанс криту", "Крит. шкода", "Космос шкода", "Сила атаки %"],
            teamSynergy: "Зеро (Космос), Сакірі (Закляття), Хоторі (Космос)",
            lore: "Персонаж, пов'язаний із Безіменним Банком. Має ділову жилку та користується важким молотом-йокай для вибивання боргів та аномалій."
        },
        en: {
            name: "Chiz",
            summary: "A powerful Cosmos element Main DPS. Her Ultimate Burst ignores a large portion of enemy defense, and signature weapon deals extra damage based on your Fons (coins).",
            weapon: "Contemplative Cat (Signature)",
            weaponF2p: "Wild Reverie",
            cartridge: "Lost Radiance (4-piece)",
            stats: ["Crit Rate", "Crit DMG", "Cosmos DMG", "ATK%"],
            teamSynergy: "Zero (Cosmos), Sakiri (Incantation), Hotori (Cosmos)",
            lore: "A character connected to the Nameless Bank. Has a business mind and uses a heavy yokai hammer to beat out debts and anomalies."
        }
    },
    fadia: {
        uk: {
            name: "Фадія",
            summary: "Потужний танк-цілитель стихії Психея. Перенаправляє шкоду союзників на себе та швидко відновлює здоров'я в режимі Lilith.",
            weapon: "Вічний вальс (Сигнатурний)",
            weaponF2p: "Флакон медика",
            cartridge: "Велика маленька пригода (4 частини)",
            stats: ["Здоров'я %", "Здоров'я", "Психея шкода", "Відновлення енергії"],
            teamSynergy: "Байцан (Закляття), Наналлі (Аніма), Зеро (Космос)",
            lore: "Дивовижна дівчина-вампір з Бюро контролю аномалій, яка носить із собою гігантський надгробок як щит та зброю."
        },
        en: {
            name: "Fadia",
            summary: "A powerful Psyche element Sustain character. Acts as a healer-tank that redirects allies' damage to herself and heals rapidly in Lilith state.",
            weapon: "Eternal Waltz (Signature)",
            weaponF2p: "Medic's Flask",
            cartridge: "Tiny Big Adventure (4-piece)",
            stats: ["HP%", "Flat HP", "Psyche DMG", "Energy Recharge Efficiency"],
            teamSynergy: "Baicang (Incantation), Nanally (Anima), Zero (Cosmos)",
            lore: "An amazing vampire girl from the Anomaly Control Bureau who carries a giant tombstone as a shield and weapon."
        }
    },
    hathor: {
        uk: {
            name: "Хатор",
            summary: "Потужний допоміжний ДПС стихії Лакшана. Використовує механіку Express Delivery Power для завдання величезної вибухової шкоди.",
            weapon: "Шалене полум'я (Сигнатурний)",
            weaponF2p: "Бар'єр вартового",
            cartridge: "Вуличний боксер (4 частини)",
            stats: ["Шанс криту", "Крит. шкода", "Лакшана шкода", "Сила атаки %"],
            teamSynergy: "Зеро (Космос), Сакірі (Закляття), Даффоділ (Хаос)",
            lore: "Впливова дівчина-фіксер з елітних кіл Гетеро, яка тісно співпрацює зі Sterry Express. Її витонченість приховує неперевершені бойові вміння."
        },
        en: {
            name: "Hathor",
            summary: "A powerful Burst Sub-DPS of the Lakshana element. Utilizes the Express Delivery Power stacking mechanic to deal massive burst damage.",
            weapon: "Raging Flames (Signature)",
            weaponF2p: "Sentinel's Barrier",
            cartridge: "Street Boxer (4-piece)",
            stats: ["Crit Rate", "Crit DMG", "Lakshana DMG", "ATK%"],
            teamSynergy: "Zero (Cosmos), Sakiri (Incantation), Daffodil (Chaos)",
            lore: "An influential fixer girl from the elite circles of Hethereau, who works closely with Sterry Express. Her elegance hides unmatched combat skills."
        }
    },
    aurelia: {
        uk: {
            name: "Аурелія",
            summary: "Атакуючий персонаж стихії Психея. Використовує атаки медуз у стані Cadenza для нанесення значної шкоди. Отримується безкоштовно за 3-денний вхід.",
            weapon: "Зоряна вуаль (Сигнатурна)",
            weaponF2p: "Ораора!",
            cartridge: "Прокляття крові диявола (4 частини)",
            stats: ["Шанс криту", "Крит. шкода", "Психея шкода", "Сила атаки %"],
            teamSynergy: "Зеро (Космос), Фадія (Психея), Сакірі (Закляття)",
            lore: "Студентка-музикант у Гетеро, яка виявила в собі аномальні здібності під час одного з вуличних виступів. Керує аномальними медузами."
        },
        en: {
            name: "Aurelia",
            summary: "Psyche element A-Rank Main DPS. Uses jellyfish attacks in the Cadenza state to deal significant damage. Obtained for free on a 3-day log-in.",
            weapon: "Stellar Veil (Signature)",
            weaponF2p: "Oraora!",
            cartridge: "Devil's Blood: Curse (4-piece)",
            stats: ["Crit Rate", "Crit DMG", "Psyche DMG", "ATK%"],
            teamSynergy: "Zero (Cosmos), Fadia (Psyche), Sakiri (Incantation)",
            lore: "A music student in Hethereau who discovered her anomalous abilities during one of her street performances. Controls anomalous jellyfish."
        }
    },
    edgar: {
        uk: {
            name: "Едгар",
            summary: "Доступний цілитель стихії Космос. Його навички відновлюють здоров'я союзникам пропорційно його максимальному HP, а ультимейт створює велику зону лікування.",
            weapon: "Заклик викривленого міста (Сигнатурний)",
            weaponF2p: "Королівський розум",
            cartridge: "Нічна таверна Теї (4 частини)",
            stats: ["Здоров'я %", "Бонус лікування", "Здоров'я", "Відновлення енергії"],
            teamSynergy: "Зеро (Космос), Хоторі (Космос), Цзююань (Аніма)",
            lore: "Співробітник антикварної крамниці Eibon. Спокійний та врівноважений юнак, який завжди готовий надати першу допомогу та смачний гарячий чай."
        },
        en: {
            name: "Edgar",
            summary: "An accessible Cosmos element healer. His skills restore health to allies proportional to his max HP, and his Ultimate creates a large healing zone.",
            weapon: "Call of the Twisted City (Signature)",
            weaponF2p: "Mind Royale",
            cartridge: "Thea's Night Tavern (4-piece)",
            stats: ["HP%", "Healing Bonus", "Flat HP", "Energy Recharge Efficiency"],
            teamSynergy: "Zero (Cosmos), Hotori (Cosmos), Jiuyuan (Anima)",
            lore: "An employee of the Eibon antique shop. A calm and balanced youth who is always ready to provide first aid and delicious hot tea."
        }
    },
    skia: {
        uk: {
            name: "Скіа",
            summary: "Потужний допоміжний ДПС стихії Лакшана, який спеціалізується на мітках Fang Thrust та унікальних навичках прихованості в тіні. Чудово доповнює команди на реакції Remora.",
            weapon: "Стережись голів! (Сигнатурна)",
            weaponF2p: "Велика пригода хорошого хлопчика",
            cartridge: "Вуличний боксер (4 частини)",
            stats: ["Шанс криту", "Крит. шкода", "Лакшана шкода", "Сила атаки %"],
            teamSynergy: "Зеро (Космос), Сакірі (Закляття), Наналлі (Аніма)",
            lore: "Лейтенант підрозділу ETD-4 Бюро контролю аномалій. Мовчазний вовк-офіцер із великим шрамом на лівому оці, який вірно несе службу."
        },
        en: {
            name: "Skia",
            summary: "A powerful Lakshana element Sub-DPS specializing in Fang Thrust marks and unique shadow stealth skills. Greatly complements Remora reaction teams.",
            weapon: "Watch Your Heads! (Signature)",
            weaponF2p: "Good Boy's Grand Adventure",
            cartridge: "Street Boxer (4-piece)",
            stats: ["Crit Rate", "Crit DMG", "Lakshana DMG", "ATK%"],
            teamSynergy: "Zero (Cosmos), Sakiri (Incantation), Nanally (Anima)",
            lore: "Lieutenant of the ETD-4 unit of the Anomaly Control Bureau. A silent wolf-officer with a large scar on his left eye who serves faithfully."
        }
    }
};

const LOCALIZED_ATTRIBUTE_MATERIALS = {
    Anima: {
        uk: {
            boss: "Унікальний матеріал Anomaly Hunt",
            specialty: "Матеріал Anomaly Hunt",
            farmSpecialty: "Anomaly Hunt / Material Selection Box",
            farmBoss: "Anomaly Hunt",
            common: {
                T1: "Fading Silhouette",
                T2: "Blurred Silhouette",
                T3: "Chaos Silhouette",
                farm: "Anomaly Drop / Hunter Exchange / Lost Exchange"
            },
            scrolls: {
                T1: "FNG",
                T2: "CO",
                T3: "Біла троянда",
                farm: "Houdinii's Schemes / Hunter Exchange / Crafting"
            }
        },
        en: {
            boss: "Unique Anomaly Hunt Material",
            specialty: "Anomaly Hunt Material",
            farmSpecialty: "Anomaly Hunt / Material Selection Box",
            farmBoss: "Anomaly Hunt",
            common: {
                T1: "Fading Silhouette",
                T2: "Blurred Silhouette",
                T3: "Chaos Silhouette",
                farm: "Anomaly Drop / Hunter Exchange / Lost Exchange"
            },
            scrolls: {
                T1: "FNG",
                T2: "CO",
                T3: "White Rose",
                farm: "Houdinii's Schemes / Hunter Exchange / Crafting"
            }
        }
    },
    Incantation: {
        uk: {
            boss: "Унікальний матеріал Anomaly Hunt",
            specialty: "Матеріал Anomaly Hunt",
            farmSpecialty: "Anomaly Hunt / Material Selection Box",
            farmBoss: "Anomaly Hunt",
            common: {
                T1: "Blurred Numeral",
                T2: "Unsolved Numeral",
                T3: "Distorted Numeral",
                farm: "Anomaly Drop / Hunter Exchange / Lost Exchange"
            },
            scrolls: {
                T1: "Перші очікування",
                T2: "Відома втома",
                T3: "Чорний капелюх",
                farm: "Houdinii's Schemes / Hunter Exchange / Crafting"
            }
        },
        en: {
            boss: "Unique Anomaly Hunt Material",
            specialty: "Anomaly Hunt Material",
            farmSpecialty: "Anomaly Hunt / Material Selection Box",
            farmBoss: "Anomaly Hunt",
            common: {
                T1: "Blurred Numeral",
                T2: "Unsolved Numeral",
                T3: "Distorted Numeral",
                farm: "Anomaly Drop / Hunter Exchange / Lost Exchange"
            },
            scrolls: {
                T1: "First Expectations",
                T2: "Known Weariness",
                T3: "Black Hat",
                farm: "Houdinii's Schemes / Hunter Exchange / Crafting"
            }
        }
    },
    Cosmos: {
        uk: {
            boss: "Унікальний матеріал Anomaly Hunt",
            specialty: "Матеріал Anomaly Hunt",
            farmSpecialty: "Anomaly Hunt / Material Selection Box",
            farmBoss: "Anomaly Hunt",
            common: {
                T1: "Lost Whispers",
                T2: "Obscure Whispers",
                T3: "Paradoxical Whispers",
                farm: "Anomaly Drop / Hunter Exchange / Lost Exchange"
            },
            scrolls: {
                T1: "Туга пташеняти",
                T2: "Тріпотіння голуба",
                T3: "Оливкова гілка",
                farm: "Houdinii's Schemes / Hunter Exchange / Crafting"
            }
        },
        en: {
            boss: "Unique Anomaly Hunt Material",
            specialty: "Anomaly Hunt Material",
            farmSpecialty: "Anomaly Hunt / Material Selection Box",
            farmBoss: "Anomaly Hunt",
            common: {
                T1: "Lost Whispers",
                T2: "Obscure Whispers",
                T3: "Paradoxical Whispers",
                farm: "Anomaly Drop / Hunter Exchange / Lost Exchange"
            },
            scrolls: {
                T1: "Nestling's Longing",
                T2: "Dove's Flutter",
                T3: "The Olive Branch",
                farm: "Houdinii's Schemes / Hunter Exchange / Crafting"
            }
        }
    },
    Chaos: {
        uk: {
            boss: "Унікальний матеріал Anomaly Hunt",
            specialty: "Матеріал Anomaly Hunt",
            farmSpecialty: "Anomaly Hunt / Material Selection Box",
            farmBoss: "Anomaly Hunt",
            common: {
                T1: "Suspended Delusions",
                T2: "Yearning Delusions",
                T3: "Transcendent Delusions",
                farm: "Anomaly Drop / Hunter Exchange / Lost Exchange"
            },
            scrolls: {
                T1: "Коливання хвиль",
                T2: "Призупинений шепіт",
                T3: "Друге Я",
                farm: "Houdinii's Schemes / Hunter Exchange / Crafting"
            }
        },
        en: {
            boss: "Unique Anomaly Hunt Material",
            specialty: "Anomaly Hunt Material",
            farmSpecialty: "Anomaly Hunt / Material Selection Box",
            farmBoss: "Anomaly Hunt",
            common: {
                T1: "Suspended Delusions",
                T2: "Yearning Delusions",
                T3: "Transcendent Delusions",
                farm: "Anomaly Drop / Hunter Exchange / Lost Exchange"
            },
            scrolls: {
                T1: "Hesitation of the Waves",
                T2: "Suspended Whispers",
                T3: "The Second Self",
                farm: "Houdinii's Schemes / Hunter Exchange / Crafting"
            }
        }
    },
    Psyche: {
        uk: {
            boss: "Унікальний матеріал Anomaly Hunt",
            specialty: "Матеріал Anomaly Hunt",
            farmSpecialty: "Anomaly Hunt / Material Selection Box",
            farmBoss: "Anomaly Hunt",
            common: {
                T1: "Lost Whispers",
                T2: "Obscure Whispers",
                T3: "Paradoxical Whispers",
                farm: "Anomaly Drop / Hunter Exchange / Lost Exchange"
            },
            scrolls: {
                T1: "Синхронність думок",
                T2: "Резонанс віри",
                T3: "Ніч прискореного серцебиття",
                farm: "Houdinii's Schemes / Hunter Exchange / Crafting"
            }
        },
        en: {
            boss: "Unique Anomaly Hunt Material",
            specialty: "Anomaly Hunt Material",
            farmSpecialty: "Anomaly Hunt / Material Selection Box",
            farmBoss: "Anomaly Hunt",
            common: {
                T1: "Lost Whispers",
                T2: "Obscure Whispers",
                T3: "Paradoxical Whispers",
                farm: "Anomaly Drop / Hunter Exchange / Lost Exchange"
            },
            scrolls: {
                T1: "Synchronicity of Thought",
                T2: "Resonance of Faith",
                T3: "Heart-Racing Night",
                farm: "Houdinii's Schemes / Hunter Exchange / Crafting"
            }
        }
    },
    Lakshana: {
        uk: {
            boss: "Унікальний матеріал Anomaly Hunt",
            specialty: "Матеріал Anomaly Hunt",
            farmSpecialty: "Anomaly Hunt / Material Selection Box",
            farmBoss: "Anomaly Hunt",
            common: {
                T1: "Suspended Delusions",
                T2: "Yearning Delusions",
                T3: "Transcendent Delusions",
                farm: "Anomaly Drop / Hunter Exchange / Lost Exchange"
            },
            scrolls: {
                T1: "Esper Ability Book I",
                T2: "Esper Ability Book II",
                T3: "Esper Ability Book III",
                farm: "Houdinii's Schemes / Hunter Exchange / Crafting"
            }
        },
        en: {
            boss: "Unique Anomaly Hunt Material",
            specialty: "Anomaly Hunt Material",
            farmSpecialty: "Anomaly Hunt / Material Selection Box",
            farmBoss: "Anomaly Hunt",
            common: {
                T1: "Suspended Delusions",
                T2: "Yearning Delusions",
                T3: "Transcendent Delusions",
                farm: "Anomaly Drop / Hunter Exchange / Lost Exchange"
            },
            scrolls: {
                T1: "Esper Ability Book I",
                T2: "Esper Ability Book II",
                T3: "Esper Ability Book III",
                farm: "Houdinii's Schemes / Hunter Exchange / Crafting"
            }
        }
    }
};

const LOCALIZED_WEAPON_MATERIALS = {
    uk: {
        T1: "Light Dye",
        T2: "Colorless Dye",
        T3: "Chaotic Dye",
        farm: "Houdinii's Magic Stage / Hunter Exchange / World Exploration"
    },
    en: {
        T1: "Light Dye",
        T2: "Colorless Dye",
        T3: "Chaotic Dye",
        farm: "Houdinii's Magic Stage / Hunter Exchange / World Exploration"
    }
};

const CHARACTER_MATERIAL_PROFILES = {
    hotori: {
        verified: true,
        source: "AllThings.How + Neverness.gg",
        unique: "Confessional Flower Seed",
        uniqueFarm: "Anomaly Hunt: Serenetti / Material Selection Box",
        commonFamily: ["Lost Whispers", "Obscure Whispers", "Paradoxical Whispers"],
        skillBooks: ["The Olive Branch", "Dove's Flutter", "Nestling's Longing"],
        skillBookIcons: [
            "https://neverness.gg/wp-content/uploads/sites/88/2026/05/The-Olive-Branch.webp",
            "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Doves-Flutter.webp",
            "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Nestlings-Longing.webp"
        ],
        weekly: "Dress Sleeves of Vanity",
        weeklyFarm: "Anomaly Pilgrimage: The Never-ending Arachne",
        uniqueIcon: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Confessional-Flower-Seed.webp",
        fullTotals: {
            coin: 2273000,
            boss: 86,
            common_t1: 57,
            common_t2: 68,
            common_t3: 79,
            scroll_t1: 64,
            scroll_t2: 40,
            scroll_t3: 40,
            weekly: 32
        }
    },
    zero: { unique: "Charging Knight Spark Plug", uniqueFarm: "Anomaly Hunt: Headless Rider / Material Selection Box", uniqueIcon: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Charging-Knight-Spark-Plug.webp" },
    sakiri: { unique: "Charging Knight Spark Plug", uniqueFarm: "Anomaly Hunt: Headless Rider / Material Selection Box", uniqueIcon: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Charging-Knight-Spark-Plug.webp" },
    daffodil: { unique: "Charging Knight Spark Plug", uniqueFarm: "Anomaly Hunt: Headless Rider / Material Selection Box", uniqueIcon: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Charging-Knight-Spark-Plug.webp" },
    nanally: { unique: "A Page from Delusion's Shore", uniqueFarm: "Anomaly Hunt: Black Tome / Material Selection Box", uniqueIcon: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/A-Page-from-Delusions-Shore.webp" },
    mint: { unique: "A Page from Delusion's Shore", uniqueFarm: "Anomaly Hunt: Black Tome / Material Selection Box", uniqueIcon: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/A-Page-from-Delusions-Shore.webp" },
    jiuyuan: { unique: "Tear of the Sea", uniqueFarm: "Anomaly Hunt: Sea Prisoner / Material Selection Box", uniqueIcon: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Tear-of-the-Sea.webp" },
    adler: { unique: "Water Moon Pick", uniqueFarm: "Anomaly Hunt: Beat King / Material Selection Box", uniqueIcon: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Water-Moon-Pick.webp" },
    haniel: { unique: "Nest Guard Fragment", uniqueFarm: "Anomaly Hunt: Nestbound Bird / Material Selection Box", uniqueIcon: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Nest-Guard-Fragment.webp" },
    skia: { unique: "Confessional Flower Seed", uniqueFarm: "Anomaly Hunt: Serenetti / Material Selection Box", uniqueIcon: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Confessional-Flower-Seed.webp" }
};

const TIMELINE_TRANSLATIONS = {
    "Глобальний Реліз Neverness to Everness (1.0)": {
        uk: {
            title: "Глобальний Реліз Neverness to Everness (1.0)",
            date: "29 Квітня 2026",
            desc: "Офіційний запуск гри на PC, iOS та Android. Доступні початкові розділи сюжету в місті Гетеро, лімітований банер Наналлі, а також стартові події."
        },
        en: {
            title: "Global Release: Neverness to Everness (1.0)",
            date: "April 29, 2026",
            desc: "Official game launch on PC, iOS, and Android. Initial story chapters in Hethereau, Nanally limited banner, and start events are now available."
        }
    },
    "Стрім Розробників: Презентація Версії 1.1": {
        uk: {
            title: "Стрім Розробників: Презентація Версії 1.1",
            date: "23 Травня 2026",
            desc: "Спеціальна трансляція від Hotta Studio. Анонсовано нових персонажів Lacrimosa (Хаос ДПС), нове розширення міста, ігрові режими та промокоди."
        },
        en: {
            title: "Developer Stream: Version 1.1 Showcase",
            date: "May 23, 2026",
            desc: "Special broadcast by Hotta Studio. Announced new characters like Lacrimosa (Chaos DPS), city expansion, game modes, and codes."
        }
    },
    "Оновлення 1.1: 'Lacrimosa of Chaos'": {
        uk: {
            title: "Оновлення 1.1: 'Lacrimosa of Chaos'",
            date: "3-4 Червня 2026",
            desc: "Вихід першого великого патчу. Старт першої фази банера з Лакрімозою. Новий сюжетний епізод 'Театр Тіней'. Початок літнього івенту."
        },
        en: {
            title: "Version 1.1: 'Lacrimosa of Chaos'",
            date: "June 3-4, 2026",
            desc: "Launch of the first major update. Start of the first phase banner with Lacrimosa. New story chapter 'Theater of Shadows'. Summer event kickoff."
        }
    },
    "Оновлення 1.2 та нові герої Shinku й Iroi": {
        uk: {
            title: "Оновлення 1.2 та нові герої Shinku й Iroi",
            date: "Липень 2026 (Прогноз)",
            desc: "Очікуване оновлення на основі витоків інформації. Додавання нових аномальних зон на півночі Гетеро та вихід нових персонажів S-рангу."
        },
        en: {
            title: "Version 1.2: New Heroes Shinku & Iroi",
            date: "July 2026 (Estimate)",
            desc: "Anticipated update based on leaks. Addition of new anomaly zones in north Hethereau and release of new S-rank characters."
        }
    }
};

const REACTION_TRANSLATIONS = {
    Blossom: {
        uk: {
            name: "Блоссом / Цвітіння",
            desc: "Активовано! Загін отримує +15% швидкості накопичення енергії та підвищене Аніма-пошкодження. Ідеально підходить для розгону авто-атак Наналлі."
        },
        en: {
            name: "Blossom",
            desc: "Activated! The squad gains +15% Energy Recharge and increased Anima damage. Ideal for boosting Nanally's auto-attacks."
        }
    },
    EsperCycle: {
        uk: {
            name: "Цикл Есперів",
            desc: "Активовано! Cosmos-атрибут (наприклад, Зеро чи Чіз) виступає в ролі прискорювача. Зміна персонажів наповнює шкалу Esper Meter на 30% швидше."
        },
        en: {
            name: "Esper Cycle",
            desc: "Activated! The Cosmos attribute (e.g. Zero or Chiz) acts as a catalyst. Swapping characters fills the Esper Meter 30% faster."
        }
    },
    Scorch: {
        uk: {
            name: "Випалювання",
            desc: "Активовано! Створює термічну реакцію, що підпалює цілі навколо та наносить DoT (періодичне пошкодження) кожні 1.5 секунди."
        },
        en: {
            name: "Scorch",
            desc: "Activated! Triggers a thermal reaction that ignites surrounding targets, dealing periodic DoT damage every 1.5 seconds."
        }
    },
    Charged: {
        uk: {
            name: "Зарядження",
            desc: "Активовано! Накладає дебафф 'Зниження стабільності' на ворогів, що дозволяє легше збивати їхні щити та збивати з ніг."
        },
        en: {
            name: "Charged",
            desc: "Activated! Applies a 'Stability Shred' debuff on enemies, making it easier to break their shields and knock them down."
        }
    },
    Remora: {
        uk: {
            name: "Ремора",
            desc: "Активовано! Реакція між Lakshana та Cosmos. Збільшує шанс критичного удару на 10% та суттєво підвищує фізичну і космічну шкоду загону."
        },
        en: {
            name: "Remora",
            desc: "Activated! A reaction between Lakshana and Cosmos. Increases Crit Rate by 10% and significantly boosts physical and Cosmos damage."
        }
    },
    Discord: {
        uk: {
            name: "Розбрат",
            desc: "Активовано! Елементи Chaos/Incantation створюють ментальний дисонанс з Psyche, знижуючи стабільність ворогів та наносячи на 25% більше шкоди по пробитих щитах."
        },
        en: {
            name: "Discord",
            desc: "Activated! Chaos/Incantation elements create mental dissonance with Psyche, lowering enemy stability and dealing 25% more damage to broken shields."
        }
    },
    Stain: {
        uk: {
            name: "Пляма",
            desc: "Активовано! Поєднання Lakshana та Psyche спотворює сприйняття ворогів, змушуючи їх отримувати додаткову періодичну шкоду та послаблюючи їхню атаку."
        },
        en: {
            name: "Stain",
            desc: "Activated! Combining Lakshana and Psyche distorts enemy perception, forcing them to take extra DoT and reducing their ATK."
        }
    },
    Nova: {
        uk: {
            name: "Нова",
            desc: "Активовано! Аніма та Психея викликають елементальний вибух розуму, що наносить колосальну площинну (AoE) шкоду навколишнім ворогам."
        },
        en: {
            name: "Nova",
            desc: "Activated! Anima and Psyche trigger a mental elemental blast, dealing colossal area (AoE) damage to nearby enemies."
        }
    }
};

const i18n = {
    uk: {
        logo_badge: "ВІКІ",
        nav_home: "Головна",
        nav_tierlist: "Тір-ліст",
        nav_builds: "Білди",
        nav_teambuilder: "Команди",
        nav_calculator: "Калькулятор",
        nav_codes: "Промокоди & Посібники",
        nav_calendar: "Календар",
        btn_login: "Увійти",
        btn_logout: "Вийти",
        hero_tagline: "СУПЕРПРИРОДНА МІСЬКА RPG ВІД HOTTA STUDIO",
        hero_title: "Увійдіть в аномальний світ <br><span class=\"highlight-text\">Neverness to Everness</span>",
        hero_desc: "Ласкаво просимо в Eibon Terminal — ваш персональний довідник з дослідження мегаполісу Гетеро. Оцінюйте аномалії, керуйте бізнесом, збирайте найкращі команди та відстежуйте свіжі новини.",
        hero_btn_tierlist: "Переглянути Тір-ліст",
        hero_btn_teambuilder: "Зібрати Загін",
        active_banner_badge: "АКТИВНИЙ БАНЕР",
        active_banner_title: "Хоторі: Відлуння Вічності",
        banner_timer_label: "До завершення:",
        view_build_btn: "Оцінка та білд",
        feat_tierlist_title: "Інтерактивний Тір-ліст",
        feat_tierlist_desc: "Актуальний рейтинг мисливців на аномалії. Дізнайтеся, хто домінує в поточній меті гри.",
        feat_teams_title: "Конструктор Команд",
        feat_teams_desc: "Складайте загони та аналізуйте ефекти взаємодії стихій і стилів бою.",
        feat_calc_title: "Калькулятор Прокачки",
        feat_calc_desc: "Рахуйте точну кількість монет, досвіду та матеріалів босів для розвитку персонажів.",
        widget_codes_title: "Актуальні промокоди",
        widget_codes_badge: "ПЕРЕВІРЕНО",
        widget_codes_desc: "Натисніть на код, щоб миттєво скопіювати його.",
        widget_events_title: "Графік подій та оновлень",
        widget_events_badge: "ВЕРСІЯ 1.0",
        widget_loading: "Завантаження...",
        widget_copy_btn: "Копіювати",
        widget_copied: "Скопійовано!",
        tierlist_title: "Рейтинг Персонажів (Тір-ліст)",
        tierlist_subtitle: "Оцінка ефективності мисливців на аномалії у версії 1.0 (Глобальний реліз)",
        sub_tab_official: "Офіційний Тір-ліст",
        sub_tab_community: "Тір-лісти спільноти",
        sub_tab_creator: "Створити свій",
        filter_search_placeholder: "Пошук персонажа за іменем...",
        filter_rarity_label: "Рідкість:",
        filter_rarity_all: "Всі",
        filter_rarity_s: "S-Ранг (5★)",
        filter_rarity_a: "A-Ранг (4★)",
        filter_attribute_label: "Стихія:",
        filter_role_label: "Роль:",
        tierlist_note: "* Натисніть на картку будь-якого персонажа, щоб відкрити його детальний білд, найкращу зброю (Arc) та рекомендовані картриджі.",
        no_chars_found: "Персонажів не знайдено",
        comm_title: "Тір-лісти від Спільноти",
        comm_subtitle: "Оцінки персонажів та думки інших гравців Neverness to Everness.",
        comm_loading: "Завантаження тір-лістів спільноти...",
        comm_empty: "Немає збережених тір-лістів. Створіть перший! 🚀",
        comm_db_unavailable: "База даних недоступна. Увійдіть у мережу для перегляду.",
        comm_view_btn: "Переглянути",
        comm_delete_btn: "Видалити",
        comm_delete_confirm: "Ви впевнені, що хочете видалити цей тір-ліст?",
        comm_deleted_toast: "Тір-ліст успішно видалено! 🗑️",
        comm_delete_error: "Помилка видалення: ",
        creator_prompt_title: "Створіть власний тір-ліст",
        creator_prompt_desc: "Щоб скористатися конструктором та зберегти свій рейтинг героїв, будь ласка, авторизуйтеся через Google.",
        creator_prompt_btn: "Увійти через Google",
        creator_title_label: "Назва тір-ліста:",
        creator_title_placeholder: "Наприклад: Мій тір-ліст версії 1.0",
        creator_save_btn: "Зберегти тір-ліст",
        creator_pool_title: "Пул Персонажів (натисніть на картку або перетягніть для розподілу)",
        creator_saved_toast: "Тір-ліст успішно опубліковано! 🎉",
        creator_empty_error: "Будь ласка, розподіліть персонажів по рядах!",
        creator_auth_error: "Будь ласка, спочатку авторизуйтеся!",
        builds_title: "Гайди на Білди Персонажів",
        builds_subtitle: "Рекомендоване спорядження та параметри для максимальної бойової ефективності",
        build_best_weapon: "Найкраща Зброя (Arc)",
        build_f2p_alt: "F2P Альтернатива",
        build_cartridge: "Набір Картриджів",
        build_stats_pri: "Пріоритет Статів",
        build_partners: "Рекомендовані партнери:",
        teams_title: "Інтерактивний Конструктор Загону",
        teams_subtitle: "Зберіть команду з 4-х мисливців та дізнайтеся активні синергії стихій і ротації",
        teams_clear_btn: "Очистити команду",
        teams_analysis_title: "Аналіз Синергії Команди",
        teams_start_prompt: "Виберіть персонажів для початку розрахунку.",
        teams_desc_prompt: "Додайте мисливців у слоти вище. Система автоматично проаналізує їхні класи, стихії та виведе оптимальну послідовність навичок (ротацію) для бою.",
        teams_slot_leader: "Слот 1 (Лідер)",
        teams_slot_label: "Слот ",
        teams_modal_title: "Виберіть Персонажа",
        calc_title: "Калькулятор Прогресу та Ресурсів",
        calc_subtitle: "Професійний планувальник для максимального розвитку вашого мисливця, навичок та зброї",
        calc_char_label: "Оберіть мисливця:",
        calc_tab_char: "Персонаж",
        calc_tab_skills: "Навички",
        calc_tab_weapon: "Зброя (Arc)",
        calc_level_title: "Рівень Персонажа",
        calc_level_start: "Початковий рівень:",
        calc_level_end: "Цільовий рівень:",
        calc_level_max_hint: "* Максимальний рівень мисливця - 80. Прориви відбуваються на 20, 40, 50, 60 та 70 рівнях.",
        calc_skills_title: "Рівні Навичок (1 - 10)",
        calc_skill_basic: "Авто-атака",
        calc_skill_active: "Активна навичка",
        calc_skill_passive: "Пасивна навичка",
        calc_skill_ultimate: "Вибух стихій",
        calc_skills_hint: "* Рівні навичок 8-10 потребують рідкісних ядер босів та Корони Аномалії.",
        calc_weapon_active: "Прокачувати зброю (Arc)",
        calc_weapon_rarity: "Рідкість зброї:",
        calc_weapon_5star: "S-Ранг (5★ Сигнатурна)",
        calc_weapon_4star: "A-Ранг (4★ F2P)",
        calc_weapon_3star: "B-Ранг (3★ Стартова)",
        calc_weapon_start: "Початковий рівень:",
        calc_weapon_end: "Цільовий рівень:",
        calc_materials_title: "Необхідні Матеріали",
        calc_clear_inv: "Очистити склад",
        calc_copy_report: "Скопіювати звіт",
        calc_inv_desc: "Введіть ваші запаси в полі «Маю в наявності», щоб розрахувати чистий дефіцит.",
        calc_have_label: "Маю:",
        calc_need_label: "Потрібно:",
        calc_left_label: "Залишилось:",
        calc_done_label: "Готово",
        codes_title: "Активні Промокоди & Дослідження",
        codes_subtitle: "Безкоштовні ресурси від розробників та поради щодо вивчення Гетеро",
        codes_header: "Діючі Промокоди (Promo Codes)",
        codes_indicator: "Авто-оновлення: Активне",
        codes_guide_title: "Як активувати промокоди в грі?",
        codes_guide_1: "Запустіть гру <strong>Neverness to Everness</strong>.",
        codes_guide_2: "Відкрийте <strong>Головне меню</strong> (іконка у правому верхньому кутку).",
        codes_guide_3: "Натисніть на іконку з <strong>трьома крапками (...)</strong> поруч із вашим нікнеймом.",
        codes_guide_4: "Виберіть пункт <strong>Redeem Code (Активувати код)</strong>.",
        codes_guide_5: "Введіть скопійований код та заберіть подарунки на ігровій пошті!",
        explor_title: "Посібник з дослідження міста Hethereau",
        explor_art1_title: "Використання Appraiser Vision (Зору Оцінювача)",
        explor_art1_desc: "Натискайте клавішу зору в місті, щоб виявляти приховані аномалії. Багато об'єктів (наприклад, статуї, дивні графіті або дзеркальні відображення) змінюють свій вигляд і відкривають секретні скрині після взаємодії у цьому режимі.",
        explor_art2_title: "Кролячі Нори (Rabbit Holes) та Аномальні Зони",
        explor_art2_desc: "Витрачайте енергію Fons у зонах \"Rabbit Holes\" для фарма матеріалів для навичок. Щоденний фарм необхідний, оскільки ресурси навичок розділені по днях тижня. Завжди планують свій фарм заздалегідь.",
        explor_art3_title: "Автомобілі та Швидке Переміщення",
        explor_art3_desc: "Використовуйте свої авто не тільки для краси, а й для переміщення по великих шосе міста. Ви можете кастомізувати машини в гаражі Eibon, покращуючи їхню керованість та швидкість, що полегшить подолання дистанцій між аномаліями.",
        cal_title: "Календар Подій та Оновлень",
        cal_subtitle: "Слідкуйте за виходом нових патчів, банерів та івентів у Neverness to Everness",
        modal_char_desc: "Опис Персонажа",
        modal_best_build: "Найкращий Білд",
        modal_gear_weapon_desc: "Дає найкращі базові характеристики та унікальний пасивний бафф.",
        modal_gear_f2p_desc: "Легко отримати під час квестів або крафту.",
        modal_gear_cartridge_desc: "Активує потужний бонус від 4-х частин набору.",
        modal_gear_substats_desc: "Суб-характеристики",
        modal_synergy_story: "Синергія та Загін",
        modal_team_partners: "Рекомендована команда:",
        modal_char_history: "Історія персонажа:",
        footer_copyright: "&copy; 2026 Eibon Terminal. Створено для спільноти Neverness to Everness.",
        footer_disclaimer: "Цей сайт є фан-ресурсом і не пов'язаний з Perfect World Games чи Hotta Studio. Усі права на гру належать їхнім правовласникам.",
        toast_code_copied: "Код скопійовано! 📋",
        toast_codes_cleared: "Склад очищено!",
        toast_report_copied: "Звіт скопійовано у буфер обміну!",
        toast_report_error: "Помилка копіювання звіту.",
        toast_welcome: "Вітаємо, ",
        toast_logged_out: "Ви вийшли з акаунта.",
        toast_firebase_error: "Firebase Auth не підключений!",
        toast_save_success: "Тір-ліст успішно опубліковано! 🎉",
        toast_save_error: "Помилка збереження: ",
        role_main_dps: "Атакуючий",
        role_sub_dps: "Допоміжний ДПС",
        role_support: "Підтримка",
        attr_anima: "Аніма",
        attr_incant: "Закляття",
        attr_cosmos: "Космос",
        attr_chaos: "Хаос",
        attr_psyche: "Психея",
        attr_lakshana: "Лакшана",
        loading_text: "Завантаження даних...",
        teams_no_synergy: "Виберіть персонажів для початку розрахунку.",
        teams_synergy_placeholder: "Додайте мисливців у слоти вище. Система автоматично проаналізує їхні класи, стихії та виведе оптимальну послідовність навичок (ротацію) для бою.",
        teams_slot_2: "Слот 2",
        teams_slot_3: "Слот 3",
        teams_slot_4: "Слот 4",
        creator_title_placeholder: "Наприклад: Мій тір-ліст версії 1.0"
    },
    en: {
        logo_badge: "WIKI",
        nav_home: "Home",
        nav_tierlist: "Tier List",
        nav_builds: "Builds",
        nav_teambuilder: "Teams",
        nav_calculator: "Calculator",
        nav_codes: "Promo Codes & Guides",
        nav_calendar: "Calendar",
        btn_login: "Login",
        btn_logout: "Logout",
        hero_tagline: "SUPERNATURAL URBAN RPG BY HOTTA STUDIO",
        hero_title: "Enter the Anomaly World of <br><span class=\"highlight-text\">Neverness to Everness</span>",
        hero_desc: "Welcome to Eibon Terminal — your personal guide to exploring the Hethereau metropolis. Evaluate anomalies, manage businesses, assemble the best teams, and track fresh updates.",
        hero_btn_tierlist: "View Tier List",
        hero_btn_teambuilder: "Build Squad",
        active_banner_badge: "ACTIVE BANNER",
        active_banner_title: "Hotori: Echoes of Eternity",
        banner_timer_label: "Ends in:",
        view_build_btn: "Review & Build",
        feat_tierlist_title: "Interactive Tier List",
        feat_tierlist_desc: "Up-to-date rating of anomaly hunters. Find out who dominates the current game meta.",
        feat_teams_title: "Squad Builder",
        feat_teams_desc: "Assemble squads and analyze element synergies and combat styles interaction.",
        feat_calc_title: "Progression Calculator",
        feat_calc_desc: "Calculate precise amounts of coins, exp, and boss drops required to upgrade characters.",
        widget_codes_title: "Active Promo Codes",
        widget_codes_badge: "VERIFIED",
        widget_codes_desc: "Click on any code to copy it instantly.",
        widget_events_title: "Events & Version Roadmap",
        widget_events_badge: "VERSION 1.0",
        widget_loading: "Loading...",
        widget_copy_btn: "Copy",
        widget_copied: "Copied!",
        tierlist_title: "Character Rating (Tier List)",
        tierlist_subtitle: "Evaluation of anomaly hunters' effectiveness in version 1.0 (Global Release)",
        sub_tab_official: "Official Tier List",
        sub_tab_community: "Community Lists",
        sub_tab_creator: "Create Own",
        filter_search_placeholder: "Search character by name...",
        filter_rarity_label: "Rarity:",
        filter_rarity_all: "All",
        filter_rarity_s: "S-Rank (5★)",
        filter_rarity_a: "A-Rank (4★)",
        filter_attribute_label: "Element:",
        filter_role_label: "Role:",
        tierlist_note: "* Click on any character's card to open their detailed build, best weapon (Arc), and recommended cartridges.",
        no_chars_found: "No characters found",
        comm_title: "Community Tier Lists",
        comm_subtitle: "Character evaluations and opinions from other Neverness to Everness players.",
        comm_loading: "Loading community lists...",
        comm_empty: "No saved tier lists yet. Create the first one! 🚀",
        comm_db_unavailable: "Database is unavailable. Connect to the network to view.",
        comm_view_btn: "View",
        comm_delete_btn: "Delete",
        comm_delete_confirm: "Are you sure you want to delete this tier list?",
        comm_deleted_toast: "Tier list deleted successfully! 🗑️",
        comm_delete_error: "Delete failed: ",
        creator_prompt_title: "Create Your Own Tier List",
        creator_prompt_desc: "To use the builder and save your character ratings, please log in using Google.",
        creator_prompt_btn: "Log in with Google",
        creator_title_label: "Tier List Title:",
        creator_title_placeholder: "e.g., My Tier List Version 1.0",
        creator_save_btn: "Save Tier List",
        creator_pool_title: "Character Pool (click or drag cards to assign)",
        creator_saved_toast: "Tier list published successfully! 🎉",
        creator_empty_error: "Please assign characters to tiers first!",
        creator_auth_error: "Please log in first!",
        builds_title: "Character Build Guides",
        builds_subtitle: "Recommended gear and stats priorities for maximum combat performance",
        build_best_weapon: "Best Weapon (Arc)",
        build_f2p_alt: "F2P Alternative",
        build_cartridge: "Cartridge Set",
        build_stats_pri: "Stats Priority",
        build_partners: "Recommended teammates:",
        teams_title: "Interactive Squad Builder",
        teams_subtitle: "Assemble a team of 4 hunters to discover element synergies and combat rotations",
        teams_clear_btn: "Clear Squad",
        teams_analysis_title: "Squad Synergy Analysis",
        teams_start_prompt: "Select characters to begin calculation.",
        teams_desc_prompt: "Add hunters to slots above. The system will automatically analyze classes and attributes to outline optimal combat rotations.",
        teams_slot_leader: "Slot 1 (Leader)",
        teams_slot_label: "Slot ",
        teams_modal_title: "Select Character",
        calc_title: "Progress & Resources Calculator",
        calc_subtitle: "Professional planner to maximize your hunter, skills, and weapon development",
        calc_char_label: "Select Hunter:",
        calc_tab_char: "Character",
        calc_tab_skills: "Skills",
        calc_tab_weapon: "Weapon (Arc)",
        calc_level_title: "Character Level",
        calc_level_start: "Start Level:",
        calc_level_end: "Target Level:",
        calc_level_max_hint: "* Maximum hunter level is 80. Breakthroughs occur at levels 20, 40, 50, 60, and 70.",
        calc_skills_title: "Skill Levels (1 - 10)",
        calc_skill_basic: "Basic Attack",
        calc_skill_active: "Active Skill",
        calc_skill_passive: "Passive Skill",
        calc_skill_ultimate: "Ultimate Burst",
        calc_skills_hint: "* Skill levels 8-10 require rare boss cores and Anomaly Crown.",
        calc_weapon_active: "Upgrade Weapon (Arc)",
        calc_weapon_rarity: "Weapon Rarity:",
        calc_weapon_5star: "S-Rank (5★ Signature)",
        calc_weapon_4star: "A-Rank (4★ F2P)",
        calc_weapon_3star: "B-Rank (3★ Starter)",
        calc_weapon_start: "Start Level:",
        calc_weapon_end: "Target Level:",
        calc_materials_title: "Required Materials",
        calc_clear_inv: "Clear Inventory",
        calc_copy_report: "Copy Report",
        calc_inv_desc: "Enter your current stock in \"Have\" fields to calculate net deficit.",
        calc_have_label: "Have:",
        calc_need_label: "Need:",
        calc_left_label: "Left:",
        calc_done_label: "Done",
        codes_title: "Active Codes & Exploration",
        codes_subtitle: "Free resources from developers and tips for exploring Hethereau",
        codes_header: "Active Promo Codes",
        codes_indicator: "Auto-update: Active",
        codes_guide_title: "How to activate promo codes in game?",
        codes_guide_1: "Launch <strong>Neverness to Everness</strong>.",
        codes_guide_2: "Open the <strong>Main Menu</strong> (top right icon).",
        codes_guide_3: "Click the <strong>triple dot icon (...)</strong> next to your nickname.",
        codes_guide_4: "Select <strong>Redeem Code</strong>.",
        codes_guide_5: "Enter the copied code and claim rewards in your in-game mailbox!",
        explor_title: "Hethereau City Exploration Guide",
        explor_art1_title: "Using Appraiser Vision",
        explor_art1_desc: "Press the vision key in the city to detect hidden anomalies. Many objects (like statues, strange graffiti, or mirror reflections) change their appearance and open secret chests after interaction in this mode.",
        explor_art2_title: "Rabbit Holes & Anomaly Zones",
        explor_art2_desc: "Spend Fons energy in \"Rabbit Holes\" zones to farm skill materials. Daily farming is crucial as skill materials are divided by days of the week. Plan your farming ahead of time.",
        explor_art3_title: "Cars & Fast Travel",
        explor_art3_desc: "Use your vehicles not only for style but also to traverse the city's vast highways. Customize cars in the Eibon garage to improve handling and speed, making it easier to cover distances between anomalies.",
        cal_title: "Events & Version Roadmap",
        cal_subtitle: "Follow patch releases, banners, and events in Neverness to Everness",
        modal_char_desc: "Character Summary",
        modal_best_build: "Best Build",
        modal_gear_weapon_desc: "Provides the best base attributes and unique passive buff.",
        modal_gear_f2p_desc: "Easily obtained via quests or crafting.",
        modal_gear_cartridge_desc: "Activates powerful 4-piece set bonus.",
        modal_gear_substats_desc: "Sub-stats",
        modal_synergy_story: "Synergy & Squad",
        modal_team_partners: "Recommended Team:",
        modal_char_history: "Character Lore:",
        footer_copyright: "&copy; 2026 Eibon Terminal. Built for the Neverness to Everness community.",
        footer_disclaimer: "This website is a fan resource and is not associated with Perfect World Games or Hotta Studio. All game rights belong to their respective owners.",
        toast_code_copied: "Code copied to clipboard! 📋",
        toast_codes_cleared: "Inventory cleared!",
        toast_report_copied: "Report copied to clipboard!",
        toast_report_error: "Failed to copy report.",
        toast_welcome: "Welcome, ",
        toast_logged_out: "Logged out successfully.",
        toast_firebase_error: "Firebase Auth not connected!",
        toast_save_success: "Tier list published successfully! 🎉",
        toast_save_error: "Save failed: ",
        role_main_dps: "Main DPS",
        role_sub_dps: "Sub-DPS",
        role_support: "Support",
        attr_anima: "Anima",
        attr_incant: "Incantation",
        attr_cosmos: "Cosmos",
        attr_chaos: "Chaos",
        attr_psyche: "Psyche",
        attr_lakshana: "Lakshana",
        loading_text: "Loading data...",
        teams_no_synergy: "Select characters to start the synergy analysis.",
        teams_synergy_placeholder: "Add hunters to the slots above. The system will automatically analyze their classes, elements, and suggest an optimal skill rotation for combat.",
        teams_slot_2: "Slot 2",
        teams_slot_3: "Slot 3",
        teams_slot_4: "Slot 4",
        creator_title_placeholder: "e.g., My Tier List v1.0"
    }
};

function translatePage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    
    const dict = i18n[lang] || i18n['uk'];
    
    // Find all data-i18n tags and translate
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dict[key]) {
            el.innerHTML = dict[key];
        }
    });
    
    // Localize placeholders
    const placeholders = document.querySelectorAll("[data-i18n-placeholder]");
    placeholders.forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (dict[key]) {
            el.placeholder = dict[key];
        }
    });
    
    // Update active class on switcher buttons
    const langBtns = document.querySelectorAll(".lang-btn");
    langBtns.forEach(btn => {
        if (btn.getAttribute("data-lang") === lang) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    // Update page title and meta description
    if (lang === 'en') {
        document.title = "Eibon Terminal | Neverness to Everness (NTE) Guides & Tier List";
        const meta = document.querySelector('meta[name="description"]');
        if (meta) meta.content = "Best guides, interactive tier list, resource calculator, team builder and fresh promo codes for Neverness to Everness (NTE).";
    } else {
        document.title = "Eibon Terminal | Neverness to Everness (NTE) Гайди та Тір-ліст";
        const meta = document.querySelector('meta[name="description"]');
        if (meta) meta.content = "Найкращі гайди, інтерактивний тір-ліст, калькулятор ресурсів, конструктор команд та завжди свіжі промокоди для гри Neverness to Everness (NTE).";
    }
}

function getLocalizedChar(char) {
    if (!char) return null;
    const trans = CHARACTER_TRANSLATIONS[char.id];
    const lang = currentLang || 'uk';
    
    const locChar = { ...char };
    
    if (trans && trans[lang]) {
        const lData = trans[lang];
        locChar.name = lData.name || char.name;
        locChar.summary = lData.summary || char.summary;
        locChar.weapon = lData.weapon || char.weapon;
        locChar.weaponF2p = lData.weaponF2p || char.weaponF2p;
        locChar.cartridge = lData.cartridge || char.cartridge;
        locChar.teamSynergy = lData.teamSynergy || char.teamSynergy;
        locChar.lore = lData.lore || char.lore;
        if (lData.stats) locChar.stats = lData.stats;
    } else {
        // Fallback translation if not explicitly in table
        locChar.role = (ROLE_TRANSLATIONS[lang] && ROLE_TRANSLATIONS[lang][char.role]) || char.role;
        locChar.attribute = (ATTR_TRANSLATIONS[lang] && ATTR_TRANSLATIONS[lang][char.attribute]) || char.attribute;
        
        if (Array.isArray(char.stats)) {
            locChar.stats = char.stats.map(s => {
                const translation = STAT_TRANSLATIONS[lang] && STAT_TRANSLATIONS[lang][s];
                return translation || s;
            });
        }
    }
    
    if (ROLE_TRANSLATIONS[lang] && ROLE_TRANSLATIONS[lang][char.role]) {
        locChar.role = ROLE_TRANSLATIONS[lang][char.role];
    }
    if (ATTR_TRANSLATIONS[lang] && ATTR_TRANSLATIONS[lang][char.attribute]) {
        locChar.attribute = ATTR_TRANSLATIONS[lang][char.attribute];
    }
    
    return locChar;
}

// Active Banner Countdown
function startBannerCountdown() {
    // Hotori's Misty Tipsy Style banner ends on June 3, 2026 at 05:59 UTC+8.
    const bannerEndDate = new Date("2026-06-02T21:59:00Z").getTime();
    
    function updateTimer() {
        const now = new Date().getTime();
        const distance = bannerEndDate - now;
        
        const timerEl = document.getElementById("bannerCountdown");
        if (!timerEl) return;
        
        if (distance < 0) {
            timerEl.innerText = currentLang === 'uk' ? "Завершено" : "Ended";
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        if (currentLang === 'uk') {
            timerEl.innerText = `${days}д ${hours}г ${minutes}хв ${seconds}с`;
        } else {
            timerEl.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

function renderHomeWidgets() {
    // 1. Promo codes widget
    const codesContainer = document.getElementById("homeCodesList");
    if (codesContainer) {
        codesContainer.innerHTML = "";
        const activeCodes = PROMO_CODES.filter(c => c.active).slice(0, 3);
        if (activeCodes.length === 0) {
            codesContainer.innerHTML = `<div class="widget-loading">${currentLang === 'uk' ? 'Промокоди відсутні' : 'No active codes'}</div>`;
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
                    <button class="btn-copy btn-xs">${currentLang === 'uk' ? 'Копіювати' : 'Copy'}</button>
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
        const displayEvents = TIMELINE_EVENTS.slice(0, 3);
        if (displayEvents.length === 0) {
            eventsContainer.innerHTML = `<div class="widget-loading">${currentLang === 'uk' ? 'Події відсутні' : 'No events scheduled'}</div>`;
        } else {
            displayEvents.forEach(event => {
                const item = document.createElement("div");
                item.className = "home-event-item";
                
                let title = event.title;
                let date = event.date;
                const trans = TIMELINE_TRANSLATIONS[event.title];
                if (trans && trans[currentLang]) {
                    title = trans[currentLang].title;
                    date = trans[currentLang].date;
                }
                
                let statusText = event.status;
                if (event.status === 'Released') {
                    statusText = currentLang === 'uk' ? 'Випущено' : 'Released';
                } else if (event.status === 'Active') {
                    statusText = currentLang === 'uk' ? 'Активне' : 'Active';
                } else if (event.status === 'Upcoming') {
                    statusText = currentLang === 'uk' ? 'Майбутнє' : 'Upcoming';
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
// ---------------------------------

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
                    renderHomeWidgets();
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
                renderHomeWidgets();
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

    // Setup language switcher binding
    const langBtns = document.querySelectorAll(".lang-btn");
    langBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const selectedLang = btn.getAttribute("data-lang");
            if (selectedLang !== currentLang) {
                localStorage.setItem('nte_lang', selectedLang);
                translatePage(selectedLang);
                
                // Re-render
                renderTierList();
                renderBuilds();
                renderTimeline();
                renderCalculatorSetup();
                renderHomeWidgets();
                renderPromoCodes();
                evaluateTeamSynergy();
                updateTeamSlotsUI();
                // Re-render auth UI and community lists for the new language
                if (typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser) {
                    updateAuthUI(firebase.auth().currentUser);
                } else {
                    updateAuthUI(null);
                }
                const commContent = document.getElementById('sub-content-community');
                if (commContent && commContent.classList.contains('active')) {
                    loadCommunityTierlists();
                }
            }
        });
    });

    // Run initial translation
    translatePage(currentLang);

    // Initialize all UI components
    initNavigation();
    renderTierList();
    renderBuilds();
    renderCalculatorSetup();
    renderTimeline();
    setupTeamBuilder();
    setupCalculatorEvents();
    renderPromoCodes();
    
    // Start active banner countdown & home widgets
    startBannerCountdown();
    renderHomeWidgets();

    // Setup banner CTA click
    const bannerBtn = document.getElementById("btnGoToBannerChar");
    if (bannerBtn) {
        bannerBtn.addEventListener("click", () => {
            switchTab("builds");
            openCharacterModal("hotori");
        });
    }

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

    const activeList = CHARACTERS.length > 0 ? CHARACTERS : FALLBACK_CHARACTERS;

    // Filter characters
    const filtered = activeList.filter(char => {
        const locChar = getLocalizedChar(char);
        const matchesSearch = locChar.name.toLowerCase().includes(searchVal);
        const matchesRarity = activeRarity === "all" ? true : (activeRarity === "S" ? locChar.rarity === 5 : locChar.rarity === 4);
        const matchesAttr = activeAttribute === "all" ? true : char.attribute === activeAttribute;
        const matchesRole = activeRole === "all" ? true : char.role === activeRole;
        return matchesSearch && matchesRarity && matchesAttr && matchesRole;
    });

    // Populate rows
    let counts = { "S+": 0, "S": 0, "A": 0, "B": 0 };
    
    filtered.forEach(char => {
        const locChar = getLocalizedChar(char);
        const card = document.createElement("div");
        card.className = `char-card rarity-${locChar.rarity}`;
        card.innerHTML = `
            <span class="char-card-attr-badge attr-${char.attribute.toLowerCase()}">${char.attribute[0]}</span>
            <div class="char-card-avatar">${renderAvatarHtml(locChar)}</div>
            <div class="char-card-name">${locChar.name.split(" ")[0]}</div>
            <div class="char-card-meta">${locChar.role}</div>
        `;
        card.addEventListener("click", () => openCharacterModal(locChar.id));
        
        if (grids[locChar.tier]) {
            grids[locChar.tier].appendChild(card);
            counts[locChar.tier]++;
        }
    });

    // Show empty message if a row has 0 elements
    Object.keys(grids).forEach(tier => {
        if (counts[tier] === 0) {
            grids[tier].innerHTML = `<div class="no-chars-alert" data-i18n="no_chars_found">${i18n[currentLang].no_chars_found}</div>`;
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

    const activeList = CHARACTERS.length > 0 ? CHARACTERS : FALLBACK_CHARACTERS;

    // Show S and S+ character builds on builds tab
    const buildChars = activeList.filter(c => c.tier === "S+" || c.tier === "S" || c.id === "adler" || c.id === "mint");

    buildChars.forEach(char => {
        const locChar = getLocalizedChar(char);
        const card = document.createElement("div");
        card.className = "build-card";
        
        const statsTags = locChar.stats.map(s => `<span class="stat-tag">${s}</span>`).join("");

        card.innerHTML = `
            <div class="build-card-header">
                <div class="build-char-avatar rarity-${locChar.rarity}">${renderAvatarHtml(locChar)}</div>
                <div class="build-header-info">
                    <h3>${locChar.name}</h3>
                    <span class="badge attr-${char.attribute.toLowerCase()}">${locChar.attribute} • ${locChar.role}</span>
                </div>
            </div>
            
            <div class="build-grid-details">
                <div class="build-section-block">
                    <span class="build-section-label" data-i18n="build_best_weapon">${i18n[currentLang].build_best_weapon}</span>
                    <span class="build-section-value">${locChar.weapon}</span>
                </div>
                <div class="build-section-block">
                    <span class="build-section-label" data-i18n="build_f2p_alt">${i18n[currentLang].build_f2p_alt}</span>
                    <span class="build-section-value">${locChar.weaponF2p}</span>
                </div>
                <div class="build-section-block">
                    <span class="build-section-label" data-i18n="build_cartridge">${i18n[currentLang].build_cartridge}</span>
                    <span class="build-section-value">${locChar.cartridge}</span>
                </div>
                <div class="build-section-block">
                    <span class="build-section-label" data-i18n="build_stats_pri">${i18n[currentLang].build_stats_pri}</span>
                    <div class="stat-pri-list">${statsTags}</div>
                </div>
            </div>
            
            <div class="build-card-teams">
                <span class="build-section-label" data-i18n="build_partners">${i18n[currentLang].build_partners}</span>
                <p style="font-size:0.9rem; margin-top:0.2rem; color:var(--text-muted);">${locChar.teamSynergy}</p>
            </div>
        `;
        buildsGrid.appendChild(card);
    });
}

// 8. DETAIL MODAL LOGIC
function openCharacterModal(charId) {
    const char = CHARACTERS.find(c => c.id === charId) || FALLBACK_CHARACTERS.find(c => c.id === charId);
    if (!char) return;

    const locChar = getLocalizedChar(char);
    const modal = document.getElementById("charModalOverlay");
    const detailContainer = document.getElementById("modalCharDetail");

    const statsTags = locChar.stats.map(s => `<span class="stat-tag">${s}</span>`).join("");

    detailContainer.innerHTML = `
        <div class="modal-char-header">
            <div class="modal-avatar-big rarity-${locChar.rarity}">${renderAvatarHtml(locChar)}</div>
            <div class="modal-header-desc">
                <h2>${locChar.name}</h2>
                <div class="modal-char-meta-row">
                    <span class="badge ${locChar.rarity === 5 ? 'badge-hot' : 'badge-cosmos'}">${locChar.rarity}★ ${currentLang === 'uk' ? 'Ранг' : 'Rank'}</span>
                    <span class="badge attr-${char.attribute.toLowerCase()}">${locChar.attribute}</span>
                    <span class="badge badge-anima">${locChar.role}</span>
                    <span class="badge badge-incant">Tier ${locChar.tier}</span>
                </div>
            </div>
        </div>

        <div class="modal-char-body">
            <div class="modal-section">
                <h4 data-i18n="modal_char_desc">${i18n[currentLang].modal_char_desc}</h4>
                <p>${locChar.summary}</p>
            </div>

            <div class="modal-section">
                <h4 data-i18n="modal_best_build">${i18n[currentLang].modal_best_build}</h4>
                <div class="modal-gear-blocks">
                    <div class="gear-item">
                        <span class="build-section-label" data-i18n="build_best_weapon">${i18n[currentLang].build_best_weapon}</span>
                        <div class="gear-title">${locChar.weapon}</div>
                        <div class="gear-note" data-i18n="modal_gear_weapon_desc">${i18n[currentLang].modal_gear_weapon_desc}</div>
                    </div>
                    <div class="gear-item">
                        <span class="build-section-label" data-i18n="build_f2p_alt">${i18n[currentLang].build_f2p_alt}</span>
                        <div class="gear-title">${locChar.weaponF2p}</div>
                        <div class="gear-note" data-i18n="modal_gear_f2p_desc">${i18n[currentLang].modal_gear_f2p_desc}</div>
                    </div>
                    <div class="gear-item">
                        <span class="build-section-label" data-i18n="build_cartridge">${i18n[currentLang].build_cartridge}</span>
                        <div class="gear-title">${locChar.cartridge}</div>
                        <div class="gear-note" data-i18n="modal_gear_cartridge_desc">${i18n[currentLang].modal_gear_cartridge_desc}</div>
                    </div>
                    <div class="gear-item">
                        <span class="build-section-label" data-i18n="modal_gear_substats_desc">${i18n[currentLang].modal_gear_substats_desc}</span>
                        <div class="stat-pri-list" style="margin-top:0.4rem;">${statsTags}</div>
                    </div>
                </div>
            </div>

            <div class="modal-section">
                <h4 data-i18n="modal_synergy_story">${i18n[currentLang].modal_synergy_story}</h4>
                <p><strong data-i18n="modal_team_partners">${i18n[currentLang].modal_team_partners}</strong> ${locChar.teamSynergy}</p>
                <p style="margin-top:0.5rem;"><strong data-i18n="modal_char_history">${i18n[currentLang].modal_char_history}</strong> ${locChar.lore}</p>
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
    const activeList = CHARACTERS.length > 0 ? CHARACTERS : FALLBACK_CHARACTERS;
    activeList.forEach(char => {
        const isAlreadyInSquad = currentSquad.some(s => s && s.id === char.id);
        const locChar = getLocalizedChar(char);
        
        const card = document.createElement("div");
        card.className = "select-card";
        if (isAlreadyInSquad) {
            card.style.opacity = "0.4";
            card.style.cursor = "not-allowed";
        }
        
        card.innerHTML = `
            <div class="select-card-avatar rarity-${locChar.rarity}">${renderAvatarHtml(locChar)}</div>
            <div class="select-card-name">${locChar.name.split(" ")[0]}</div>
            <span class="badge attr-${char.attribute.toLowerCase()}" style="font-size:0.6rem; padding: 0.1rem 0.3rem; margin-top:0.2rem;">${locChar.attribute}</span>
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
            const locChar = getLocalizedChar(char);
            slotEl.innerHTML = `
                <div class="slot-filled-card">
                    <button class="slot-remove-btn" data-slot="${i}">&times;</button>
                    <div class="slot-filled-avatar rarity-${locChar.rarity}">${renderAvatarHtml(locChar)}</div>
                    <div class="char-card-name">${locChar.name.split(" ")[0]}</div>
                    <span class="badge attr-${char.attribute.toLowerCase()}">${locChar.attribute} • ${locChar.role}</span>
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
            const slotText = i === 0 
                ? i18n[currentLang].teams_slot_leader 
                : i18n[currentLang].teams_slot_label + (i + 1);
            slotEl.innerHTML = `
                <div class="slot-empty">
                    <span class="slot-plus">+</span>
                    <span class="slot-label">${slotText}</span>
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
        badgesContainer.innerHTML = `<span class="no-synergy-text">${currentLang === 'uk' ? 'Виберіть персонажів для початку розрахунку.' : 'Select characters to begin calculation.'}</span>`;
        reactionsContainer.innerHTML = "";
        descContainer.innerHTML = `<p>${currentLang === 'uk' ? 'Додайте мисливців у слоти вище. Система автоматично проаналізує їхні класи, стихії та виведе оптимальну послідовність навичок (ротацію) для бою.' : 'Add hunters to slots above. The system will automatically analyze classes and attributes to outline optimal combat rotations.'}</p>`;
        ratingEl.innerText = "-";
        return;
    }

    // Display active character attributes
    badgesContainer.innerHTML = activeChars.map(c => {
        const locChar = getLocalizedChar(c);
        return `<span class="badge attr-${c.attribute.toLowerCase()}">${locChar.name.split(" ")[0]} (${locChar.attribute})</span>`;
    }).join("");

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
            name: REACTION_TRANSLATIONS.Blossom[currentLang].name,
            desc: REACTION_TRANSLATIONS.Blossom[currentLang].desc
        });
    }

    // 2. Esper Cycle (Cosmos + any other attribute)
    if (count["Cosmos"] >= 1 && (count["Anima"] >= 1 || count["Incantation"] >= 1 || count["Chaos"] >= 1 || count["Psyche"] >= 1 || count["Lakshana"] >= 1)) {
        reactions.push({
            name: REACTION_TRANSLATIONS.EsperCycle[currentLang].name,
            desc: REACTION_TRANSLATIONS.EsperCycle[currentLang].desc
        });
    }

    // 3. Scorch Reaction (Anima + Incantation)
    if (count["Anima"] >= 1 && count["Incantation"] >= 1) {
        reactions.push({
            name: REACTION_TRANSLATIONS.Scorch[currentLang].name,
            desc: REACTION_TRANSLATIONS.Scorch[currentLang].desc
        });
    }

    // 4. Charged Reaction (Chaos + Incantation)
    if (count["Chaos"] >= 1 && count["Incantation"] >= 1) {
        reactions.push({
            name: REACTION_TRANSLATIONS.Charged[currentLang].name,
            desc: REACTION_TRANSLATIONS.Charged[currentLang].desc
        });
    }

    // 5. Remora Reaction (Cosmos + Lakshana)
    if (count["Cosmos"] >= 1 && count["Lakshana"] >= 1) {
        reactions.push({
            name: REACTION_TRANSLATIONS.Remora[currentLang].name,
            desc: REACTION_TRANSLATIONS.Remora[currentLang].desc
        });
    }

    // 6. Discord Reaction (Incantation/Chaos + Psyche)
    if ((count["Incantation"] >= 1 || count["Chaos"] >= 1) && count["Psyche"] >= 1) {
        reactions.push({
            name: REACTION_TRANSLATIONS.Discord[currentLang].name,
            desc: REACTION_TRANSLATIONS.Discord[currentLang].desc
        });
    }

    // 7. Stain Reaction (Lakshana + Psyche)
    if (count["Lakshana"] >= 1 && count["Psyche"] >= 1) {
        reactions.push({
            name: REACTION_TRANSLATIONS.Stain[currentLang].name,
            desc: REACTION_TRANSLATIONS.Stain[currentLang].desc
        });
    }

    // 8. Nova Reaction (Anima + Psyche)
    if (count["Anima"] >= 1 && count["Psyche"] >= 1) {
        reactions.push({
            name: REACTION_TRANSLATIONS.Nova[currentLang].name,
            desc: REACTION_TRANSLATIONS.Nova[currentLang].desc
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
        reactionsContainer.innerHTML = `<p class="no-synergy-text" style="font-size:0.85rem;">${currentLang === 'uk' ? 'Немає активних елементальних реакцій. Спробуйте поєднати інші стихії.' : 'No active elemental reactions. Try combining other elements.'}</p>`;
    }

    // Generate Rotation Text based on squad
    const hasSakiri = activeChars.some(c => c.id === "sakiri");
    const hasZero = activeChars.some(c => c.id === "zero");
    const hasNanally = activeChars.some(c => c.id === "nanally");
    const hasJiuyuan = activeChars.some(c => c.id === "jiuyuan");

    if (hasNanally && hasSakiri && hasZero) {
        if (currentLang === 'uk') {
            rotation = "<strong>Оптимальна ротація для бою:</strong><br>1. Почніть із <strong>Сакірі</strong>: стягніть ворогів умінням і запустіть вибух стихій для зрізу опорів.<br>2. Переключіться на <strong>Зеро</strong>: активуйте його поле, що запускає реакцію <em>Цикл Есперів</em>.<br>3. Перейдіть на <strong>Наналлі</strong>: виконайте посилену серію авто-атак під дією гравітації та вибух стихій для фінального удару.";
        } else {
            rotation = "<strong>Optimal Combat Rotation:</strong><br>1. Start with <strong>Sakiri</strong>: group enemies with skill and trigger Ultimate Burst to shred resistances.<br>2. Switch to <strong>Zero</strong>: activate his field to trigger <em>Esper Cycle</em>.<br>3. Swap to <strong>Nanally</strong>: perform enhanced gravity combos and use Ultimate Burst for the final blowout.";
        }
    } else if (hasNanally && hasJiuyuan) {
        if (currentLang === 'uk') {
            rotation = "<strong>Оптимальна ротація (Цвітіння):</strong><br>1. Використовуйте <strong>Цзююань</strong> для нанесення швидкої шкоди та накладання статусу Аніми.<br>2. Перейдіть на <strong>Наналлі</strong> для безперервного виклику реакції <em>Цвітіння</em> та нанесення основної шкоди.";
        } else {
            rotation = "<strong>Optimal Rotation (Blossom):</strong><br>1. Use <strong>Jiuyuan</strong> to deal rapid burst damage and apply Anima status.<br>2. Swap to <strong>Nanally</strong> for continuous <em>Blossom</em> triggers and main DPS damage.";
        }
    } else if (activeChars.length >= 2) {
        const support = activeChars.find(c => c.role === "Support");
        const dps = activeChars.find(c => c.role === "Main DPS");
        if (support && dps) {
            const locSupport = getLocalizedChar(support);
            const locDps = getLocalizedChar(dps);
            if (currentLang === 'uk') {
                rotation = `<strong>Бойова порада:</strong><br>Починайте бій за підтримку <strong>${locSupport.name.split(" ")[0]}</strong> для накладання ефектів контролю та баффів, після чого переключайтеся на атакуючого <strong>${locDps.name.split(" ")[0]}</strong> для завдання максимальної шкоди під баффами.`;
            } else {
                rotation = `<strong>Combat Tip:</strong><br>Begin combat with support <strong>${locSupport.name.split(" ")[0]}</strong> to apply crowd control and buffs, then switch to Main DPS <strong>${locDps.name.split(" ")[0]}</strong> to deal maximum damage under buffs.`;
            }
        } else {
            if (currentLang === 'uk') {
                rotation = "<strong>Бойова порада:</strong><br>Для збалансованого загону рекомендується мати принаймні одного атакуючого (Main DPS) персонажа та одного підтримку (Support). Експериментуйте з додаванням героїв Космосу для прискорення ротацій.";
            } else {
                rotation = "<strong>Combat Tip:</strong><br>For a balanced squad, it is recommended to have at least one Main DPS character and one Support. Experiment with adding Cosmos heroes to accelerate rotations.";
            }
        }
    } else {
        if (currentLang === 'uk') {
            rotation = "Додайте більше персонажів у команду для генерації тактичних порад.";
        } else {
            rotation = "Add more characters to the squad to generate tactical tips.";
        }
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

const WEAPON_MATERIALS = {
    T1: "Light Dye",
    T2: "Colorless Dye",
    T3: "Chaotic Dye",
    farm: "Houdinii's Magic Stage / Hunter Exchange / World Exploration"
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

const MATERIAL_ICON_URLS = {
    coin: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Beetle-Coin.webp",
    exp_basic: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Rising-Hunter-Guide.webp",
    exp_medium: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Senior-Hunter-Guide.webp",
    exp_elite: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Elite-Hunter-Guide.webp",
    dye_basic: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Light-Dye.webp",
    dye_medium: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Colorless-Dye.webp",
    dye_elite: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Chaotic-Dye.webp",
    boss: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Confessional-Flower-Seed.webp",
    specialty: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Confessional-Flower-Seed.webp",
    common_t1: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Lost-Whispers.webp",
    common_t2: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Obscure-Whispers.webp",
    common_t3: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Paradoxical-Whispers.webp",
    scroll_t1: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/The-Olive-Branch.webp",
    scroll_t2: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Doves-Flutter.webp",
    scroll_t3: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Nestlings-Longing.webp",
    weekly: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Dress-Sleeves-of-Vanity.webp",
    crown: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Anomaly-Material-Selection-Box-III.webp",
    ore_t1: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Light-Dye.webp",
    ore_t2: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Colorless-Dye.webp",
    ore_t3: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Chaotic-Dye.webp"
};

const MATERIAL_ICON_BY_NAME = {
    "The Olive Branch": "https://neverness.gg/wp-content/uploads/sites/88/2026/05/The-Olive-Branch.webp",
    "White Rose": "https://neverness.gg/wp-content/uploads/sites/88/2026/05/White-Rose.webp",
    "Black Hat": "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Black-Hat.webp",
    "Heart-Racing Night": "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Heart-Racing-Night.webp",
    "The Second Self": "https://neverness.gg/wp-content/uploads/sites/88/2026/05/The-Second-Self.webp",
    "Dove's Flutter": "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Doves-Flutter.webp",
    "CO": "https://neverness.gg/wp-content/uploads/sites/88/2026/05/CO.webp",
    "Known Weariness": "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Known-Weariness.webp",
    "Resonance of Faith": "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Resonance-of-Faith.webp",
    "Suspended Whispers": "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Suspended-Whispers.webp",
    "Nestling's Longing": "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Nestlings-Longing.webp",
    "FNG": "https://neverness.gg/wp-content/uploads/sites/88/2026/05/FNG.webp",
    "First Expectations": "https://neverness.gg/wp-content/uploads/sites/88/2026/05/First-Expectations.webp",
    "Synchronicity of Thought": "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Synchronicity-of-Thought.webp",
    "Hesitation of the Waves": "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Hesitation-of-the-Waves.webp"
};

// Use real material icons from public NTE databases; fallback keeps the card readable if a CDN image fails.
const ATTRIBUTE_SCROLL_ICONS = {
    Cosmos: [
        "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Nestlings-Longing.webp",
        "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Doves-Flutter.webp",
        "https://neverness.gg/wp-content/uploads/sites/88/2026/05/The-Olive-Branch.webp"
    ],
    Anima: [
        "https://neverness.gg/wp-content/uploads/sites/88/2026/05/FNG.webp",
        "https://neverness.gg/wp-content/uploads/sites/88/2026/05/CO.webp",
        "https://neverness.gg/wp-content/uploads/sites/88/2026/05/White-Rose.webp"
    ],
    Incantation: [
        "https://neverness.gg/wp-content/uploads/sites/88/2026/05/First-Expectations.webp",
        "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Known-Weariness.webp",
        "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Black-Hat.webp"
    ],
    Chaos: [
        "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Hesitation-of-the-Waves.webp",
        "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Suspended-Whispers.webp",
        "https://neverness.gg/wp-content/uploads/sites/88/2026/05/The-Second-Self.webp"
    ],
    Psyche: [
        "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Synchronicity-of-Thought.webp",
        "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Resonance-of-Faith.webp",
        "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Heart-Racing-Night.webp"
    ]
};

function getMaterialIcon(id, profile = null, attrDetails = null, char = null) {
    let src = null;
    if (profile) {
        if ((id === "boss" || id === "specialty") && profile.uniqueIcon) {
            src = profile.uniqueIcon;
        } else if (id === "scroll_t1" || id === "scroll_t2" || id === "scroll_t3") {
            const idx = id === "scroll_t1" ? 0 : id === "scroll_t2" ? 1 : 2;
            if (profile.skillBookIcons && profile.skillBookIcons[idx]) {
                src = profile.skillBookIcons[idx];
            } else if (char && char.attribute && ATTRIBUTE_SCROLL_ICONS[char.attribute]) {
                src = ATTRIBUTE_SCROLL_ICONS[char.attribute][idx];
            } else if (attrDetails && attrDetails.scrolls) {
                const scrollName = idx === 0 ? attrDetails.scrolls.T1 : idx === 1 ? attrDetails.scrolls.T2 : idx === 2 ? attrDetails.scrolls.T3 : null;
                if (scrollName && MATERIAL_ICON_BY_NAME[scrollName]) {
                    src = MATERIAL_ICON_BY_NAME[scrollName];
                }
            }
        }
    }
    if (!src) {
        src = MATERIAL_ICON_URLS[id];
    }
    const label = id.split("_").map(part => part[0]).join("").slice(0, 2).toUpperCase();
    if (!src) return `<span class="mat-fallback-icon">${label}</span>`;
    return `<img src="${src}" alt="" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'mat-fallback-icon',textContent:'${label}'}))">`;
}

function renderCalculatorSetup() {
    initCalculatorData();

    const select = document.getElementById("calcCharacter");
    if (!select) return;
    
    // Save current values if they exist
    const savedChar = select.value;
    const savedSkills = [];
    for (let i = 0; i < 4; i++) {
        const startSelect = document.getElementById(`skillStart_${i}`);
        const endSelect = document.getElementById(`skillEnd_${i}`);
        savedSkills.push({
            start: startSelect ? startSelect.value : "1",
            end: endSelect ? endSelect.value : "10"
        });
    }

    // Populate characters with localized names
    const activeList = CHARACTERS.length > 0 ? CHARACTERS : FALLBACK_CHARACTERS;
    select.innerHTML = activeList.map(c => {
        const locC = getLocalizedChar(c);
        return `<option value="${c.id}">${locC.name}</option>`;
    }).join("");

    if (savedChar && activeList.some(c => c.id === savedChar)) {
        select.value = savedChar;
    }

    // Populate skills select options (1-10) with localized prefix
    const skillPrefix = currentLang === 'uk' ? 'Рівень' : 'Lvl';
    for (let i = 0; i < 4; i++) {
        const startSelect = document.getElementById(`skillStart_${i}`);
        const endSelect = document.getElementById(`skillEnd_${i}`);
        if (startSelect && endSelect) {
            startSelect.innerHTML = Array.from({length: 10}, (_, k) => `<option value="${k+1}">${skillPrefix} ${k+1}</option>`).join("");
            endSelect.innerHTML = Array.from({length: 10}, (_, k) => `<option value="${k+1}">${skillPrefix} ${k+1}</option>`).join("");
            
            if (savedSkills[i]) {
                startSelect.value = savedSkills[i].start;
                endSelect.value = savedSkills[i].end;
            }
        }
    }

    // Set initial calculations
    calculateResources();
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
        showToast(i18n[currentLang].toast_codes_cleared || "Склад очищено!");
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

    const labelText = currentLang === 'uk' ? 'Потрібно' : 'Need';
    const remainingText = currentLang === 'uk' ? 'Залишилось' : 'Remaining';

    if (remaining === 0) {
        card.classList.add("mat-completed");
        if (labelTextEl) labelTextEl.innerHTML = `${labelText}: <span class="mat-val">${needed.toLocaleString()}</span>`;
    } else {
        card.classList.remove("mat-completed");
        if (labelTextEl) labelTextEl.innerHTML = `${remainingText}: <span class="mat-val">${remaining.toLocaleString()}</span> / ${needed.toLocaleString()}`;
    }
}

function calculateResources() {
    const charId = document.getElementById("calcCharacter").value;
    const activeList = CHARACTERS.length > 0 ? CHARACTERS : FALLBACK_CHARACTERS;
    const char = activeList.find(c => c.id === charId);
    if (!char) return;

    const locChar = getLocalizedChar(char);

    // Render Preview Card
    document.getElementById("calcPreviewName").innerText = locChar.name;
    document.getElementById("calcPreviewAttr").innerText = locChar.attribute;
    document.getElementById("calcPreviewAttr").className = `badge attr-${char.attribute.toLowerCase()}`;
    document.getElementById("calcPreviewRarity").innerText = `${char.rarity}★ ${currentLang === 'uk' ? 'Ранг' : 'Rank'}`;
    document.getElementById("calcPreviewRarity").className = `badge ${char.rarity === 5 ? 'badge-hot' : 'badge-cosmos'}`;
    
    const avatarContainer = document.getElementById("calcPreviewAvatar");
    avatarContainer.innerHTML = renderAvatarHtml(locChar);
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
    
    // Character guides breakdown: Rising 1,000, Senior 5,000, Elite 20,000 EXP.
    let charExpRem = totalCharExp;
    const guidesElite = Math.floor(charExpRem / 20000);
    charExpRem %= 20000;
    const guidesMed = Math.floor(charExpRem / 5000);
    charExpRem %= 5000;
    const guidesBasic = Math.ceil(charExpRem / 1000);

    // Arc dyes breakdown: Light 500, Colorless 2,500, Chaotic 10,000 Arc EXP.
    let weapExpRem = totalWeapExp;
    const dyesElite = Math.floor(weapExpRem / 10000);
    weapExpRem %= 10000;
    const dyesMed = Math.floor(weapExpRem / 2500);
    weapExpRem %= 2500;
    const dyesBasic = Math.ceil(weapExpRem / 500);

    // Specific names based on character attribute
    const baseAttrDetails = (LOCALIZED_ATTRIBUTE_MATERIALS[char.attribute] && LOCALIZED_ATTRIBUTE_MATERIALS[char.attribute][currentLang]) || LOCALIZED_ATTRIBUTE_MATERIALS["Anima"][currentLang];
    const attrDetails = JSON.parse(JSON.stringify(baseAttrDetails));
    const profile = CHARACTER_MATERIAL_PROFILES[char.id] || {};
    if (profile.unique) {
        attrDetails.boss = profile.unique;
        attrDetails.farmBoss = profile.uniqueFarm || attrDetails.farmBoss;
        attrDetails.specialty = profile.unique;
        attrDetails.farmSpecialty = profile.uniqueFarm || attrDetails.farmSpecialty;
    }
    if (profile.commonFamily) {
        attrDetails.common.T1 = profile.commonFamily[0];
        attrDetails.common.T2 = profile.commonFamily[1];
        attrDetails.common.T3 = profile.commonFamily[2];
    }
    if (profile.skillBooks) {
        attrDetails.scrolls.T1 = profile.skillBooks[0];
        attrDetails.scrolls.T2 = profile.skillBooks[1];
        attrDetails.scrolls.T3 = profile.skillBooks[2];
    }
    const weaponMats = LOCALIZED_WEAPON_MATERIALS[currentLang] || LOCALIZED_WEAPON_MATERIALS["uk"];

    // Combine common materials
    const finalCommonT1 = totalCharCommonT1 + totalSkillCommonT1 + totalWeapCommonT1;
    const finalCommonT2 = totalCharCommonT2 + totalSkillCommonT2 + totalWeapCommonT2;
    const finalCommonT3 = totalCharCommonT3 + totalSkillCommonT3 + totalWeapCommonT3;

    // Combine Boss drops
    const finalBoss = totalCharBoss + totalSkillBoss;

    const allSkillsFull = [0, 1, 2, 3].every(i => {
        const start = parseInt(document.getElementById(`skillStart_${i}`).value) || 1;
        const end = parseInt(document.getElementById(`skillEnd_${i}`).value) || 1;
        return start === 1 && end === 10;
    });
    const isVerifiedFullBuild = Boolean(profile.verified && profile.fullTotals && startLvl === 1 && endLvl === 80 && allSkillsFull);

    // Set requirements object globally to check on have-input triggers.
    calculatedRequirements = isVerifiedFullBuild ? {
        coin: profile.fullTotals.coin,
        exp_elite: guidesElite,
        exp_medium: guidesMed,
        exp_basic: guidesBasic,
        dye_elite: dyesElite,
        dye_medium: dyesMed,
        dye_basic: dyesBasic,
        boss: profile.fullTotals.boss,
        specialty: 0,
        common_t1: profile.fullTotals.common_t1,
        common_t2: profile.fullTotals.common_t2,
        common_t3: profile.fullTotals.common_t3,
        scroll_t1: profile.fullTotals.scroll_t1,
        scroll_t2: profile.fullTotals.scroll_t2,
        scroll_t3: profile.fullTotals.scroll_t3,
        weekly: profile.fullTotals.weekly,
        crown: 0,
        ore_t1: totalWeapOreT1,
        ore_t2: totalWeapOreT2,
        ore_t3: totalWeapOreT3
    } : {
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
        weekly: 0,
        crown: totalSkillCrown,
        ore_t1: totalWeapOreT1,
        ore_t2: totalWeapOreT2,
        ore_t3: totalWeapOreT3
    };

    // Localization strings
    const calcLoc = {
        uk: {
            cat_main: "Основні Валюти & Досвід",
            cat_breakthrough: "Матеріали Прориву",
            cat_skills: "Матеріали Навичок",
            cat_drops: "Трофеї з Ворогів",
            coin_name: "Монети Beetle (Золото)",
            coin_farm: "Material Selection Box / Houdinii's Magic Stage / Hunter Exchange / World Exploration",
            exp_elite_name: "Elite Hunter Guide (+20,000 EXP)",
            exp_med_name: "Senior Hunter Guide (+5,000 EXP)",
            exp_basic_name: "Rising Hunter Guide (+1,000 EXP)",
            exp_farm: "Houdinii's Magic Stage / Hunter Exchange / World Exploration",
            dye_elite_name: "Chaotic Dye (+10,000 Arc EXP)",
            dye_med_name: "Colorless Dye (+2,500 Arc EXP)",
            dye_basic_name: "Light Dye (+500 Arc EXP)",
            dye_farm: "Houdinii's Magic Stage / Hunter Exchange / World Exploration",
            crown_name: "Щотижневий матеріал навички",
            crown_farm: "Anomaly Pilgrimage",
            source_verified: "Точний total-cost підтверджено для цього пресету.",
            source_estimate: "Частина чисел є планувальною оцінкою; назви ресурсів і джерела взято з відкритих баз.",
            need_label: "Потрібно:",
            remaining_label: "Залишилось:",
            have_label: "Маю:",
            done_badge: "✓ Готово"
        },
        en: {
            cat_main: "Core Currencies & Experience",
            cat_breakthrough: "Breakthrough Materials",
            cat_skills: "Skill Materials",
            cat_drops: "Enemy Trophies",
            coin_name: "Beetle Coins (Gold)",
            coin_farm: "Material Selection Box / Houdinii's Magic Stage / Hunter Exchange / World Exploration",
            exp_elite_name: "Elite Hunter Guide (+20,000 EXP)",
            exp_med_name: "Senior Hunter Guide (+5,000 EXP)",
            exp_basic_name: "Rising Hunter Guide (+1,000 EXP)",
            exp_farm: "Houdinii's Magic Stage / Hunter Exchange / World Exploration",
            dye_elite_name: "Chaotic Dye (+10,000 Arc EXP)",
            dye_med_name: "Colorless Dye (+2,500 Arc EXP)",
            dye_basic_name: "Light Dye (+500 Arc EXP)",
            dye_farm: "Houdinii's Magic Stage / Hunter Exchange / World Exploration",
            crown_name: "Weekly Skill Material",
            crown_farm: "Anomaly Pilgrimage",
            source_verified: "Exact total cost is verified for this preset.",
            source_estimate: "Some quantities are planning estimates; resource names and sources use public databases.",
            need_label: "Need:",
            remaining_label: "Remaining:",
            have_label: "Have:",
            done_badge: "✓ Done"
        }
    };
    const cLoc = calcLoc[currentLang] || calcLoc['uk'];

    // Render HTML Categories
    const resultsGrid = document.getElementById("calcMaterialsList");
    resultsGrid.innerHTML = "";

    const sourceNote = document.createElement("div");
    sourceNote.className = `calc-source-note ${isVerifiedFullBuild ? 'verified' : 'estimate'}`;
    sourceNote.innerHTML = `
        <strong>${isVerifiedFullBuild ? 'Verified' : 'Planner'}</strong>
        <span>${isVerifiedFullBuild ? cLoc.source_verified : cLoc.source_estimate}</span>
    `;
    resultsGrid.appendChild(sourceNote);

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
                <div class="mat-icon">${getMaterialIcon(id, profile, attrDetails, char)}</div>
                <div class="mat-card-info">
                    <span class="mat-card-name">${name}</span>
                    <span class="mat-card-farm">${farmLoc}</span>
                </div>
            </div>
            <div class="mat-card-mid">
                <span class="mat-need">
                    ${isCompleted ? `${cLoc.need_label} <span class="mat-val">${needed.toLocaleString()}</span>` : `${cLoc.remaining_label} <span class="mat-val">${remaining.toLocaleString()}</span> / ${needed.toLocaleString()}`}
                </span>
                <span class="mat-completed-badge">${cLoc.done_badge}</span>
                <div class="mat-have-input-wrapper">
                    <span class="mat-have-label">${cLoc.have_label}</span>
                    <input type="number" class="mat-have-input" data-mat-id="${id}" min="0" value="${have}">
                </div>
            </div>
        `;
        resultsGrid.appendChild(card);
    }

    // 1. Currency & Exp Guides
    addCategoryHeader(cLoc.cat_main);
    addMaterialCard("coin", cLoc.coin_name, calculatedRequirements.coin, cLoc.coin_farm);
    addMaterialCard("exp_elite", cLoc.exp_elite_name, calculatedRequirements.exp_elite, cLoc.exp_farm);
    addMaterialCard("exp_medium", cLoc.exp_med_name, calculatedRequirements.exp_medium, cLoc.exp_farm);
    addMaterialCard("exp_basic", cLoc.exp_basic_name, calculatedRequirements.exp_basic, cLoc.exp_farm);
    if (includeWeapon) {
        addMaterialCard("dye_elite", cLoc.dye_elite_name, calculatedRequirements.dye_elite, cLoc.dye_farm);
        addMaterialCard("dye_medium", cLoc.dye_med_name, calculatedRequirements.dye_medium, cLoc.dye_farm);
        addMaterialCard("dye_basic", cLoc.dye_basic_name, calculatedRequirements.dye_basic, cLoc.dye_farm);
    }

    // 2. Breakthrough Materials
    if (calculatedRequirements.specialty > 0 || calculatedRequirements.boss > 0 || (includeWeapon && (calculatedRequirements.ore_t1 + calculatedRequirements.ore_t2 + calculatedRequirements.ore_t3 > 0))) {
        addCategoryHeader(cLoc.cat_breakthrough);
        addMaterialCard("boss", attrDetails.boss, calculatedRequirements.boss, attrDetails.farmBoss);
        addMaterialCard("specialty", attrDetails.specialty, calculatedRequirements.specialty, attrDetails.farmSpecialty);
        if (includeWeapon) {
            addMaterialCard("ore_t1", weaponMats.T1, calculatedRequirements.ore_t1, weaponMats.farm);
            addMaterialCard("ore_t2", weaponMats.T2, calculatedRequirements.ore_t2, weaponMats.farm);
            addMaterialCard("ore_t3", weaponMats.T3, calculatedRequirements.ore_t3, weaponMats.farm);
        }
    }

    // 3. Skill Scrolls
    if (calculatedRequirements.scroll_t1 + calculatedRequirements.scroll_t2 + calculatedRequirements.scroll_t3 + calculatedRequirements.weekly + calculatedRequirements.crown > 0) {
        addCategoryHeader(cLoc.cat_skills);
        addMaterialCard("scroll_t1", attrDetails.scrolls.T1, calculatedRequirements.scroll_t1, attrDetails.scrolls.farm);
        addMaterialCard("scroll_t2", attrDetails.scrolls.T2, calculatedRequirements.scroll_t2, attrDetails.scrolls.farm);
        addMaterialCard("scroll_t3", attrDetails.scrolls.T3, calculatedRequirements.scroll_t3, attrDetails.scrolls.farm);
        addMaterialCard("weekly", profile.weekly || cLoc.crown_name, calculatedRequirements.weekly || 0, profile.weeklyFarm || cLoc.crown_farm);
        addMaterialCard("crown", cLoc.crown_name, calculatedRequirements.crown || 0, cLoc.crown_farm);
    }

    // 4. Common Enemy Drops
    if (calculatedRequirements.common_t1 + calculatedRequirements.common_t2 + calculatedRequirements.common_t3 > 0) {
        addCategoryHeader(cLoc.cat_drops);
        addMaterialCard("common_t1", attrDetails.common.T1, calculatedRequirements.common_t1, attrDetails.common.farm);
        addMaterialCard("common_t2", attrDetails.common.T2, calculatedRequirements.common_t2, attrDetails.common.farm);
        addMaterialCard("common_t3", attrDetails.common.T3, calculatedRequirements.common_t3, attrDetails.common.farm);
    }
}

// Generate text report and copy to clipboard
function exportCalcReport() {
    const charSelect = document.getElementById("calcCharacter");
    const charName = charSelect.options[charSelect.selectedIndex].text;
    const charId = charSelect.value;
    const activeList = CHARACTERS.length > 0 ? CHARACTERS : FALLBACK_CHARACTERS;
    const char = activeList.find(c => c.id === charId);
    if (!char) return;
    
    const startLvl = document.getElementById("calcLevelStart").value;
    const endLvl = document.getElementById("calcLevelEnd").value;
    
    let report = "";
    if (currentLang === 'uk') {
        report += `=== EIBON TERMINAL: ЗВІТ ПРО РЕСУРСИ ===\n`;
        report += `Мисливець: ${charName} (Рівень ${startLvl} ➔ ${endLvl})\n`;
        report += `Навички:\n`;
    } else {
        report += `=== EIBON TERMINAL: RESOURCE REPORT ===\n`;
        report += `Hunter: ${charName} (Level ${startLvl} ➔ ${endLvl})\n`;
        report += `Skills:\n`;
    }
    
    const skillLabels = currentLang === 'uk' 
        ? ["Авто-атака", "Активна навичка", "Пасивна навичка", "Вибух стихій"]
        : ["Basic Attack", "Active Skill", "Passive Skill", "Ultimate Burst"];
        
    for (let i = 0; i < 4; i++) {
        const start = document.getElementById(`skillStart_${i}`).value;
        const end = document.getElementById(`skillEnd_${i}`).value;
        if (currentLang === 'uk') {
            report += `  - ${skillLabels[i]}: Рівень ${start} ➔ ${end}\n`;
        } else {
            report += `  - ${skillLabels[i]}: Level ${start} ➔ ${end}\n`;
        }
    }

    // Weapon
    const includeWeapon = document.getElementById("calcWeaponActive").checked;
    if (includeWeapon) {
        const wRarity = document.getElementById("calcWeaponRarity").value;
        const wStart = document.getElementById("calcWeaponLevelStart").value;
        const wEnd = document.getElementById("calcWeaponLevelEnd").value;
        if (currentLang === 'uk') {
            report += `Зброя (Arc) ${wRarity}★: Рівень ${wStart} ➔ ${wEnd}\n`;
        } else {
            report += `Weapon (Arc) ${wRarity}★: Level ${wStart} ➔ ${wEnd}\n`;
        }
    } else {
        if (currentLang === 'uk') {
            report += `Зброя (Arc): Не враховувалась\n`;
        } else {
            report += `Weapon (Arc): Not calculated\n`;
        }
    }

    if (currentLang === 'uk') {
        report += `\nСПИСОК НЕОБХІДНИХ МАТЕРІАЛІВ:\n`;
    } else {
        report += `\nREQUIRED MATERIALS LIST:\n`;
    }
    
    // Sort materials by calculatedRequirements
    const baseAttrDetails = (LOCALIZED_ATTRIBUTE_MATERIALS[char.attribute] && LOCALIZED_ATTRIBUTE_MATERIALS[char.attribute][currentLang]) || LOCALIZED_ATTRIBUTE_MATERIALS["Anima"][currentLang];
    const attrDetails = JSON.parse(JSON.stringify(baseAttrDetails));
    const weaponMats = LOCALIZED_WEAPON_MATERIALS[currentLang] || LOCALIZED_WEAPON_MATERIALS["uk"];
    const profile = CHARACTER_MATERIAL_PROFILES[char.id] || {};
    if (profile.unique) {
        attrDetails.boss = profile.unique;
        attrDetails.specialty = profile.unique;
    }
    if (profile.commonFamily) {
        attrDetails.common.T1 = profile.commonFamily[0];
        attrDetails.common.T2 = profile.commonFamily[1];
        attrDetails.common.T3 = profile.commonFamily[2];
    }
    if (profile.skillBooks) {
        attrDetails.scrolls.T1 = profile.skillBooks[0];
        attrDetails.scrolls.T2 = profile.skillBooks[1];
        attrDetails.scrolls.T3 = profile.skillBooks[2];
    }

    Object.keys(calculatedRequirements).forEach(id => {
        const needed = calculatedRequirements[id];
        if (needed <= 0) return;
        
        let matName = "";
        if (id === 'coin') {
            matName = currentLang === 'uk' ? "Монети Beetle (Золото)" : "Beetle Coins (Gold)";
        }
        else if (id === 'exp_elite') {
            matName = "Elite Hunter Guide (+20,000 EXP)";
        }
        else if (id === 'exp_medium') {
            matName = "Senior Hunter Guide (+5,000 EXP)";
        }
        else if (id === 'exp_basic') {
            matName = "Rising Hunter Guide (+1,000 EXP)";
        }
        else if (id === 'dye_elite') {
            matName = "Chaotic Dye (+10,000 Arc EXP)";
        }
        else if (id === 'dye_medium') {
            matName = "Colorless Dye (+2,500 Arc EXP)";
        }
        else if (id === 'dye_basic') {
            matName = "Light Dye (+500 Arc EXP)";
        }
        else if (id === 'boss') {
            matName = attrDetails.boss;
        }
        else if (id === 'specialty') {
            matName = attrDetails.specialty;
        }
        else if (id === 'ore_t1') matName = weaponMats.T1;
        else if (id === 'ore_t2') matName = weaponMats.T2;
        else if (id === 'ore_t3') matName = weaponMats.T3;
        else if (id === 'crown') {
            matName = currentLang === 'uk' ? "Щотижневий матеріал навички" : "Weekly Skill Material";
        }
        else if (id === 'weekly') {
            matName = profile.weekly || (currentLang === 'uk' ? "Щотижневий матеріал навички" : "Weekly Skill Material");
        }
        else {
            if (id === 'scroll_t1') matName = attrDetails.scrolls.T1;
            else if (id === 'scroll_t2') matName = attrDetails.scrolls.T2;
            else if (id === 'scroll_t3') matName = attrDetails.scrolls.T3;
            else if (id === 'common_t1') matName = attrDetails.common.T1;
            else if (id === 'common_t2') matName = attrDetails.common.T2;
            else if (id === 'common_t3') matName = attrDetails.common.T3;
        }

        const have = calcInventory[id] || 0;
        const rem = Math.max(0, needed - have);
        
        if (currentLang === 'uk') {
            report += `- ${matName}: Потрібно ${needed.toLocaleString()} шт. (Маю: ${have.toLocaleString()} | Залишилось: ${rem.toLocaleString()})\n`;
        } else {
            report += `- ${matName}: Need ${needed.toLocaleString()} pcs. (Have: ${have.toLocaleString()} | Remaining: ${rem.toLocaleString()})\n`;
        }
    });

    if (currentLang === 'uk') {
        report += `\nСгенеровано на Eibon Terminal. Успішного фарма! 🚀`;
    } else {
        report += `\nGenerated on Eibon Terminal. Happy farming! 🚀`;
    }

    navigator.clipboard.writeText(report).then(() => {
        showToast(currentLang === 'uk' ? "Звіт скопійовано у буфер обміну!" : "Report copied to clipboard!");
    }).catch(err => {
        showToast(currentLang === 'uk' ? "Помилка копіювання звіту." : "Failed to copy report.");
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
            <button class="btn-copy" data-code="${promo.code}">${currentLang === 'uk' ? 'Копіювати' : 'Copy'}</button>
        `;
        
        card.querySelector(".btn-copy").addEventListener("click", () => {
            copyToClipboard(promo.code);
        });


        container.appendChild(card);
    });
}

function copyToClipboard(text) {
    const successMsg = currentLang === 'uk' ? `Код "${text}" скопійовано у буфер обміну!` : `Code "${text}" copied to clipboard!`;
    const errorMsg = currentLang === 'uk' ? "Не вдалося скопіювати код." : "Failed to copy code.";
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
        
        let title = event.title;
        let date = event.date;
        let desc = event.desc;
        const trans = TIMELINE_TRANSLATIONS[event.title];
        if (trans && trans[currentLang]) {
            title = trans[currentLang].title;
            date = trans[currentLang].date;
            desc = trans[currentLang].desc;
        }
        
        let statusText = event.status;
        if (event.status === 'Released') {
            statusText = currentLang === 'uk' ? 'Випущено' : 'Released';
        } else if (event.status === 'Active') {
            statusText = currentLang === 'uk' ? 'Активне' : 'Active';
        } else if (event.status === 'Upcoming') {
            statusText = currentLang === 'uk' ? 'Майбутнє' : 'Upcoming';
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
        showToast(currentLang === 'uk' ? "Firebase Auth не підключений!" : "Firebase Auth not connected!");
        return;
    }
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const welcomeText = currentLang === 'uk' ? `Вітаємо, ${result.user.displayName}! 🎉` : `Welcome, ${result.user.displayName}! 🎉`;
            showToast(welcomeText);
        })
        .catch((error) => {
            console.error("Login failed:", error);
            const errText = currentLang === 'uk' ? `Помилка входу: ${error.message}` : `Login failed: ${error.message}`;
            showToast(errText);
        });
}

function logout() {
    if (typeof firebase === "undefined" || !firebase.auth) return;
    firebase.auth().signOut().then(() => {
        showToast(currentLang === 'uk' ? "Ви вийшли з акаунта." : "Logged out successfully.");
    });
}

// Update the global header profile layout
function updateAuthUI(user) {
    const authBox = document.getElementById("headerAuth");
    if (!authBox) return;

    if (user) {
        const logoutLabel = currentLang === 'uk' ? 'Вийти' : 'Logout';
        const userFallbackName = currentLang === 'uk' ? 'Користувач' : 'User';
        authBox.innerHTML = `
            <div class="user-profile">
                <img src="${user.photoURL || ''}" class="user-avatar" referrerpolicy="no-referrer" alt="${user.displayName}">
                <span class="user-name">${(user.displayName || userFallbackName).split(" ")[0]}</span>
                <button class="btn btn-secondary btn-xs" id="btnLogoutGoogle">${logoutLabel}</button>
            </div>
        `;
        document.getElementById("btnLogoutGoogle").addEventListener("click", logout);
    } else {
        const loginLabel = currentLang === 'uk' ? 'Увійти' : 'Login';
        authBox.innerHTML = `
            <button class="btn btn-primary btn-sm" id="btnLoginGoogle">
                <span class="auth-icon">🔑</span> ${loginLabel}
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
    const names = currentLang === 'uk' ? {
        "S+": "Ранг S+",
        "S": "Ранг S",
        "A": "Ранг A",
        "B": "Ранг B",
        "pool": "Скинути в пул"
    } : {
        "S+": "Rank S+",
        "S": "Rank S",
        "A": "Rank A",
        "B": "Rank B",
        "pool": "Reset to pool"
    };

    const activeList = CHARACTERS.length > 0 ? CHARACTERS : FALLBACK_CHARACTERS;
    const char = activeList.find(c => c.id === charId);
    if (!char) return;

    const locChar = getLocalizedChar(char);

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
        <h4 style="margin-bottom: 0.4rem; color: var(--color-cyan); font-family: var(--font-heading);">${currentLang === 'uk' ? 'Перемістити' : 'Move'} ${locChar.name.split(" ")[0]}</h4>
        <div style="display: flex; flex-direction: column; gap: 0.5rem; width: 200px;">
            ${tiers.map(t => `<button class="btn btn-secondary btn-sm select-tier-btn" data-target="${t}">${names[t]}</button>`).join("")}
            <button class="btn btn-accent btn-sm mt-1 close-menu-btn">${currentLang === 'uk' ? 'Скасувати' : 'Cancel'}</button>
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
        showToast(i18n[currentLang].creator_auth_error || "Будь ласка, спочатку авторизуйтеся!");
        return;
    }

    const titleInput = document.getElementById("editorTitle");
    const title = (titleInput && titleInput.value.trim()) || (currentLang === 'uk' ? "Мій тір-ліст" : "My Tier List");

    // Count assigned characters
    const assignedCount = Object.keys(editorState).reduce((acc, tier) => {
        return acc + (tier !== "pool" ? editorState[tier].length : 0);
    }, 0);

    if (assignedCount === 0) {
        showToast(i18n[currentLang].creator_empty_error || "Будь ласка, розподіліть персонажів по рядах!");
        return;
    }

    try {
        const docData = {
            userId: user.uid,
            userName: user.displayName || (currentLang === 'uk' ? "Гість" : "Guest"),
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
            showToast(currentLang === 'uk' ? "База даних Firestore недоступна!" : "Firestore database is unavailable!");
            return;
        }

        await db.collection("userTierlists").add(docData);
        showToast(i18n[currentLang].toast_save_success || "Тір-ліст успішно опубліковано! 🎉");

        // Force switch to community tab
        const commBtn = document.querySelector('[data-sub-tab="community"]');
        if (commBtn) commBtn.click();
    } catch (e) {
        console.error("Save custom tierlist failed:", e);
        showToast((i18n[currentLang].toast_save_error || "Помилка збереження: ") + e.message);
    }
}

// Load community tier lists from Firestore
async function loadCommunityTierlists() {
    const container = document.getElementById("communityGrid");
    if (!container) return;

    container.innerHTML = `<div class="community-loading">${i18n[currentLang].comm_loading || "Завантаження..."}</div>`;

    if (typeof db === "undefined") {
        container.innerHTML = `<div class="community-loading">${i18n[currentLang].comm_db_unavailable || "База даних недоступна."}</div>`;
        return;
    }

    try {
        const snapshot = await db.collection("userTierlists").orderBy("createdAt", "desc").limit(40).get();
        
        if (snapshot.empty) {
            container.innerHTML = `<div class="community-loading">${i18n[currentLang].comm_empty || "Немає збережених тір-лістів."}</div>`;
            return;
        }

        container.innerHTML = "";
        snapshot.docs.forEach(doc => {
            const data = doc.data();
            
            let dateStr = "Нещодавно";
            if (data.createdAt) {
                const dateObj = new Date(data.createdAt.seconds * 1000);
                dateStr = currentLang === 'uk' 
                    ? dateObj.toLocaleDateString("uk-UA") 
                    : dateObj.toLocaleDateString("en-US");
            } else {
                dateStr = currentLang === 'uk' ? "Нещодавно" : "Recently";
            }

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
                    <button class="btn btn-secondary btn-sm view-tierlist-btn" style="flex: 1;" data-id="${doc.id}">${i18n[currentLang].comm_view_btn || "Переглянути"}</button>
                    ${isOwner ? `<button class="btn btn-danger btn-sm delete-tierlist-btn" style="flex: 1;" data-id="${doc.id}">${i18n[currentLang].comm_delete_btn || "Видалити"}</button>` : ""}
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
                        if (confirm(i18n[currentLang].comm_delete_confirm || "Ви впевнені?")) {
                            try {
                                deleteBtn.disabled = true;
                                deleteBtn.innerText = currentLang === 'uk' ? "Видалення..." : "Deleting...";
                                await db.collection("userTierlists").doc(doc.id).delete();
                                showToast(i18n[currentLang].comm_deleted_toast || "Тір-ліст видалено!");
                                loadCommunityTierlists();
                            } catch (err) {
                                console.error("Delete tierlist failed:", err);
                                showToast((i18n[currentLang].comm_delete_error || "Помилка: ") + err.message);
                                deleteBtn.disabled = false;
                                deleteBtn.innerText = i18n[currentLang].comm_delete_btn || "Видалити";
                            }
                        }
                    });
                }
            }

            container.appendChild(card);
        });
    } catch (e) {
        console.error("Load community lists failed:", e);
        container.innerHTML = `<div class="community-loading">${currentLang === 'uk' ? 'Помилка завантаження: ' : 'Load error: '}${e.message}</div>`;
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
    author.innerText = (currentLang === 'uk' ? "Автор: " : "Author: ") + data.userName;

    const tiers = ["S+", "S", "A", "B"];
    const activeList = CHARACTERS.length > 0 ? CHARACTERS : FALLBACK_CHARACTERS;

    tiers.forEach(tier => {
        const gridId = `viewGrid-${tier.replace("+", "-plus")}`;
        const grid = document.getElementById(gridId);
        if (!grid) return;
        
        grid.innerHTML = "";

        const charIds = data.tiers[tier] || [];
        if (charIds.length === 0) {
            grid.innerHTML = `<span style="font-size:0.75rem; color:var(--text-muted); opacity: 0.5;">${currentLang === 'uk' ? 'Порожньо' : 'Empty'}</span>`;
        } else {
            charIds.forEach(charId => {
                const char = activeList.find(c => c.id === charId);
                if (char) {
                    const locChar = getLocalizedChar(char);
                    const badge = document.createElement("div");
                    badge.className = "view-char-badge";
                    
                    const avatarUrl = renderAvatarUrlOnly(char);
                    const avatarHtml = avatarUrl ? `<img src="${avatarUrl}" class="view-char-avatar" alt="${locChar.name}">` : '';
                    
                    badge.innerHTML = `
                        ${avatarHtml}
                        <span class="view-char-name">${locChar.name.split(" ")[0]}</span>
                    `;
                    grid.appendChild(badge);
                }
            });
        }
    });

    modal.classList.add("active");
}

