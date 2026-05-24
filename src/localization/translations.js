export const ROLE_TRANSLATIONS = {
    uk: { "Main DPS": "Атакуючий", "Sub-DPS": "Допоміжний ДПС", "Support": "Підтримка" },
    en: { "Main DPS": "Main DPS", "Sub-DPS": "Sub-DPS", "Support": "Support" }
};

export const ATTR_TRANSLATIONS = {
    uk: { "Anima": "Аніма", "Cosmos": "Космос", "Incantation": "Закляття", "Chaos": "Хаос", "Psyche": "Психея", "Lakshana": "Лакшана" },
    en: { "Anima": "Anima", "Cosmos": "Cosmos", "Incantation": "Incantation", "Chaos": "Chaos", "Psyche": "Psyche", "Lakshana": "Lakshana" }
};

export const STAT_TRANSLATIONS = {
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

export const CHARACTER_TRANSLATIONS = {
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

export const LOCALIZED_ATTRIBUTE_MATERIALS = {
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

export const LOCALIZED_WEAPON_MATERIALS = {
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

export const CHARACTER_MATERIAL_PROFILES = {
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

export const TIMELINE_TRANSLATIONS = {
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

export const REACTION_TRANSLATIONS = {
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

export const i18n = {
    uk: {
        logo_badge: "ВІКІ",
        nav_home: "Головна",
        nav_tierlist: "Тір-ліст",
        nav_builds: "Білди",
        nav_teambuilder: "Команди",
        nav_calculator: "Калькулятор",
        nav_codes: "Промокоди",
        nav_guides: "Гайди",
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
        codes_title: "Активні Промокоди",
        codes_subtitle: "Безкоштовні ресурси від розробників для Neverness to Everness (NTE)",
        codes_header: "Діючі Промокоди (Promo Codes)",
        codes_indicator: "Авто-оновлення: Активне",
        codes_guide_title: "Як активувати промокоди в грі?",
        codes_guide_1: "Запустіть гру <strong>Neverness to Everness</strong>.",
        codes_guide_2: "Відкрийте <strong>Головне меню</strong> (іконка у правому верхньому кутку).",
        codes_guide_3: "Натисніть на іконку з <strong>трьома крапками (...)</strong> поруч із вашим нікнеймом.",
        codes_guide_4: "Виберіть пункт <strong>Redeem Code (Активувати код)</strong>.",
        codes_guide_5: "Введіть скопійований код та заберіть подарунки на ігровій пошті!",
        guides_title: "Посібники та Гайди",
        guides_subtitle: "Корисні поради щодо прокачки мисливців, розвитку бізнесу та дослідження Гетеро",
        guide_prog_title: "Гайд з прогресії: Старт та пріоритети",
        guide_prog_1: "<strong>Сюжет перш за все:</strong> Фокусуйтеся на сюжетних квестах, щоб швидко підвищити Рівень Мисливця (Hunter Level) та Рівень Оцінки (Appraisal Level) для зняття лімітів прокачки.",
        guide_prog_2: "<strong>Бізнес-імперія (City Tycoon):</strong> Розвивайте кав'ярню одразу після відкриття. На 18-му рівні City Tycoon ви безкоштовно отримаєте чудового атакуючого персонажа <strong>Чіз (Chiz)</strong>, а на 21-му рівні — її кращу сигнатурну зброю!",
        guide_prog_3: "<strong>Мотоцикл Novis ST-X 950:</strong> Купіть цей мотоцикл у дилера Regalia в районі New Herland. На відміну від автомобілів, його можна викликати прямо посеред бездоріжжя, що прискорить проходження карти.",
        guide_prog_4: "<strong>Телефонні будки ReroRero:</strong> Обов'язково взаємодійте з ними під час подорожі містом для створення швидкої мережі телепортації.",
        guide_char_title: "Прокачка персонажів та бойова сила",
        guide_char_1: "<strong>Один Головний ДПС (Main Carry):</strong> Спочатку вкладайте ресурси лише в одного персонажа нанесення шкоди. Не розпорошуйте матеріали на всю команду. Початкових героїв не варто качати вище 40 рівня.",
        guide_char_2: "<strong>Гарантоване покращення:</strong> Завжди спочатку прокачуйте рівень, зброю та рівні навичок. Фарм картриджів (артефактів) залиште на етап високого рівня, щоб не витрачати енергію на випадкові характеристики.",
        guide_char_3: "<strong>Пріоритет сет-бонусів:</strong> Завжди намагайтеся спочатку зібрати повноцінний комплект з 4-х картриджів заради потужного ефекту набору, навіть якщо суб-характеристики на них не є ідеальними.",
        guide_explor_title: "Дослідження Hethereau та фарм",
        guide_explor_1: "<strong>Зоровий аналізатор (Vision):</strong> Регулярно перевіряйте оточення режимом зору, щоб помітить приховані дзеркала, графіті або статуї, взаємодія з якими відкриє цінні скрині.",
        guide_explor_2: "<strong>Хатина Відьми (Witch's House):</strong> Збирайте магічних птахів та здавайте їх. На 3-му рівні Хатини птахи почнуть відображатися прямо на вашій міні-карті, що полегшить збір.",
        guide_explor_3: "<strong>Безкоштовна S-зброя:</strong> Шукайте та проходьте Аномальні доручення (Anomaly Commissions) з 4 зірками складності на карті міста, за які гарантовано дають легендарні Arcs.",
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
        creator_title_placeholder: "Наприклад: Мій тір-ліст версії 1.0",
        ad_placeholder: "РЕКЛАМА",
        guides_search_placeholder: "Пошук гайдів за назвою, тегом чи описом...",
        guides_filter_all: "Всі гайди",
        guides_filter_featured: "Рекомендовані",
        guides_filter_builds: "Білди персонажів",
        guides_filter_teams: "Команди",
        guides_filter_beginner: "Прогресія новачка",
        guides_filter_farming: "Фарм маршрути",
        guides_filter_systems: "Ігрові системи",
        guides_filter_meta: "Аналіз мети",
        guides_difficulty_label: "Складність:",
        guides_updated_label: "Оновлено:",
        guides_recently_updated: "Новий",
        guides_read_btn: "Читати гайд",
        guides_references_title: "Джерела та посилання:",
        guides_recommended_teams: "Рекомендовані персонажі:",
        guides_progression_tips: "Поради щодо проходження:",
        guides_difficulty_easy: "Легко",
        guides_difficulty_medium: "Середньо",
        guides_difficulty_hard: "Складно",
        guides_custom_builder_btn: "Конструктор загону",
        guides_view_presets_btn: "Готові збірки команд"
    },
    en: {
        logo_badge: "WIKI",
        nav_home: "Home",
        nav_tierlist: "Tier List",
        nav_builds: "Builds",
        nav_teambuilder: "Teams",
        nav_calculator: "Calculator",
        nav_codes: "Promo Codes",
        nav_guides: "Guides",
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
        codes_title: "Active Promo Codes",
        codes_subtitle: "Free resources from developers for Neverness to Everness (NTE)",
        codes_header: "Active Promo Codes",
        codes_indicator: "Auto-update: Active",
        codes_guide_title: "How to activate promo codes in game?",
        codes_guide_1: "Launch <strong>Neverness to Everness</strong>.",
        codes_guide_2: "Open the <strong>Main Menu</strong> (top right icon).",
        codes_guide_3: "Click the <strong>triple dot icon (...)</strong> next to your nickname.",
        codes_guide_4: "Select <strong>Redeem Code</strong>.",
        codes_guide_5: "Enter the copied code and claim rewards in your in-game mailbox!",
        guides_title: "Wiki & Progression Guides",
        guides_subtitle: "Essential strategies for character upgrades, business management, and city exploration",
        guide_prog_title: "Progression Guide: Quick Start",
        guide_prog_1: "<strong>Story First:</strong> Focus on main story quests early on. This is the fastest way to increase your Hunter Level and Appraisal Level, which are required to unlock essential features and level caps.",
        guide_prog_2: "<strong>City Tycoon:</strong> Set up your Cafe as soon as it is unlocked. Reaching City Tycoon Level 18 grants you the powerful S-Rank DPS character <strong>Chiz</strong> for free, and Level 21 unlocks her best-in-slot signature weapon!",
        guide_prog_3: "<strong>Novis ST-X 950 Motorcycle:</strong> Purchase this bike at the Regalia Dealership in the New Herland district. Unlike cars, it can be summoned off-road, making terrain traversal extremely easy.",
        guide_prog_4: "<strong>ReroRero Phone Booths:</strong> Make sure to activate them on your map to set up a fast-travel network across the massive Hethereau city.",
        guide_char_title: "Character Power & Upgrades",
        guide_char_1: "<strong>Invest in Main Carry:</strong> Focus your progression materials on a single primary damage dealer. Avoid spreading resources across too many characters. Stop leveling beginner characters at level 40.",
        guide_char_2: "<strong>Guaranteed Power Ups:</strong> Prioritize character level, weapon level, and skill level upgrades first. Avoid spending excessive stamina farming cartridges (artifacts) early on due to high RNG.",
        guide_char_3: "<strong>Set Bonuses Priority:</strong> Focus on activating 4-set cartridge bonuses rather than hunting for perfect sub-stats early, as set bonuses act as massive team multiplier boosts.",
        guide_explor_title: "Hethereau Exploration & Farming",
        guide_explor_1: "<strong>Appraiser Vision:</strong> Frequently use your Vision key in the city to reveal hidden anomalies, mirror reflections, or graffiti that unlock secret high-reward chests.",
        guide_explor_2: "<strong>The Witch's House:</strong> Collect and submit oracle birds. Reach Witch's House Level 3 to enable bird icons on your mini-map, making exploration significantly faster.",
        guide_explor_3: "<strong>Free S-Rank Weapons:</strong> Look out for and complete 4-star Anomaly Commissions on your map, which guarantee S-Rank weapons (Arcs) upon completion.",
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
        creator_title_placeholder: "e.g., My Tier List v1.0",
        ad_placeholder: "ADVERTISEMENT",
        guides_search_placeholder: "Search guides by title, tag, or description...",
        guides_filter_all: "All Guides",
        guides_filter_featured: "Featured",
        guides_filter_builds: "Character Builds",
        guides_filter_teams: "Team Compositions",
        guides_filter_beginner: "Beginner Progression",
        guides_filter_farming: "Farming Routes",
        guides_filter_systems: "Game Systems",
        guides_filter_meta: "Meta Analysis",
        guides_difficulty_label: "Difficulty:",
        guides_updated_label: "Updated:",
        guides_recently_updated: "New",
        guides_read_btn: "Read Guide",
        guides_references_title: "Sources & References:",
        guides_recommended_teams: "Recommended Characters:",
        guides_progression_tips: "Progression Tips:",
        guides_difficulty_easy: "Easy",
        guides_difficulty_medium: "Medium",
        guides_difficulty_hard: "Hard",
        guides_custom_builder_btn: "Squad Constructor",
        guides_view_presets_btn: "Preset Team Comps"
    }
};