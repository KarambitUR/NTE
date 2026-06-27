export const ROLE_TRANSLATIONS = {
    uk: { "Main DPS": "Атакуючий", "Sub-DPS": "Допоміжний ДПС", "Support": "Підтримка" },
    en: { "Main DPS": "Main DPS", "Sub-DPS": "Sub-DPS", "Support": "Support" },
    fr: { "Main DPS": "DPS Principal", "Sub-DPS": "Sub-DPS", "Support": "Soutien" }
};

export const ATTR_TRANSLATIONS = {
    uk: { "Anima": "Аніма", "Cosmos": "Космос", "Incantation": "Закляття", "Chaos": "Хаос", "Psyche": "Психея", "Lakshana": "Лакшана" },
    en: { "Anima": "Anima", "Cosmos": "Cosmos", "Incantation": "Incantation", "Chaos": "Chaos", "Psyche": "Psyche", "Lakshana": "Lakshana" },
    fr: { "Anima": "Anima", "Cosmos": "Cosmos", "Incantation": "Incantation", "Chaos": "Chaos", "Psyche": "Psyché", "Lakshana": "Lakshana" }
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
    },
    fr: {
        "Crit Rate": "Taux Critique",
        "Crit Rate (75%+)": "Taux Critique (75%+)",
        "Crit DMG": "Dégâts Critique",
        "ATK%": "ATK %",
        "DEF%": "Défense %",
        "HP%": "PV %",
        "Flat HP": "PV (Plat)",
        "Flat DEF": "Défense (Plat)",
        "Cycle Intensity": "Intensité de Cycle",
        "Break Effect": "Effet de Rupture",
        "Break Intensity": "Intensité de Rupture",
        "Energy Charge Efficiency": "Recharge d'Énergie",
        "Anima DMG": "Dégâts Anima",
        "Cosmos DMG": "Dégâts Cosmos",
        "Incantation DMG": "Dégâts Incantation",
        "Chaos DMG": "Dégâts Chaos",
        "Psyche DMG": "Dégâts Psyché",
        "Lakshana DMG": "Dégâts Lakshana",
        "Healing Bonus": "Bonus de Soin"
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
        },
        fr: {
            name: "Nanally",
            summary: "Le personnage DPS de l'attribut Anima le plus fort. Possède une mobilité incroyable grâce aux mécaniques anti-gravité et inflige des dégâts colossaux avec des auto-attaques de soutien.",
            weapon: "Baiser de bonne nuit (Arc Signature)",
            weaponF2p: "Flammes déchaînées",
            cartridge: "Lucioles et la Forêt (4 pièces)",
            stats: ["Taux Critique (75%+)", "Dégâts Critique", "Dégâts Anima", "ATK %"],
            teamSynergy: "Zero (Cosmos), Sakiri (Incantation), Jiuyuan (Anima)",
            lore: "Une fille mystérieuse avec des oreilles de renard qui adore jouer avec la gravité. Travaille comme détective d'anomalies indépendante à Hethereau."
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
        },
        fr: {
            name: "Sakiri",
            summary: "Le meilleur personnage de soutien du jeu. Regroupe les ennemis, applique une forte réduction de résistance élémentaire et augmente l'ATK de toute l'équipe après avoir utilisé le Déchaînement Élémentaire.",
            weapon: "La grande aventure du bon garçon (Signature)",
            weaponF2p: "La tristesse dans mon cœur",
            cartridge: "Hérisson rapide (4 pièces)",
            stats: ["Intensité de Cycle", "Effet de Rupture", "Recharge d'Énergie", "ATK %"],
            teamSynergy: "Nanally (Anima), Zero (Cosmos), Daffodil (Chaos)",
            lore: "Une fille joyeuse et énergétique qui porte toujours un lapin en peluche. Capable de voir les fils cachés du destin en utilisant des incantations."
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
        },
        fr: {
            name: "Jiuyuan",
            summary: "Un puissant personnage Sub-DPS qui inflige des dégâts instantanés rapides. Parfaitement adapté pour déclencher les réactions de Blossom aux côtés de Nanally.",
            weapon: "Chuchotement du dragon de jade (Signature)",
            weaponF2p: "Vent levant",
            cartridge: "Lucioles et la Forêt (4 pièces)",
            stats: ["Taux Critique", "Dégâts Critique", "Dégâts Anima", "Recharge d'Énergie"],
            teamSynergy: "Nanally (Anima), Sakiri (Incantation), Zero (Cosmos)",
            lore: "Une chasseuse d'anomalies d'une lignée ancienne aux manières raffinées. Utilise un éventail pour invoquer des courants d'air anormaux."
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
        },
        fr: {
            name: "Hotori",
            summary: "Un personnage Sub-DPS / Soutien unique capable d'enregistrer et de répéter les compétences des membres actifs de l'équipe, doublant les dégâts globaux de l'équipe.",
            weapon: "Échos de l'éternité (Signature)",
            weaponF2p: "Carnet de l'évaluateur",
            cartridge: "Hérisson rapide (4 pièces)",
            stats: ["Recharge d'Énergie", "Intensité de Cycle", "ATK %", "PV %"],
            teamSynergy: "Nanally (Anima), Adler (Chaos), Haniel (Incantation)",
            lore: "Une évalueuse discrète d'objets anormaux qui passe la majeure partie de son temps dans la bibliothèque de la boutique d'antiquités Eibon."
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
        },
        fr: {
            name: "Zero",
            summary: "Le protagoniste principal. Possède l'attribut Cosmos, agissant comme un catalyseur universel pour activer l'effet Cycle d'Espers pour tout autre élément.",
            weapon: "Héritage d'Eibon (Signature)",
            weaponF2p: "Résolution du chasseur",
            cartridge: "Hérisson rapide (4 pièces)",
            stats: ["ATK %", "Taux Critique", "Intensité de Cycle", "Recharge d'Énergie"],
            teamSynergy: "Tout personnage DPS Anima ou Incantation",
            lore: "Le nouveau propriétaire de la boutique d'antiquités Eibon, qui a perdu ses souvenirs du passé mais possède le don étrange de voir le cœur des anomalies."
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
        },
        fr: {
            name: "Adler",
            summary: "Un fournisseur de bouclier fiable de l'élément Incantation. Génère un bouclier robuste proportionnel à sa DEF, aidant à briser la stabilité de l'ennemi.",
            weapon: "Barrière de la sentinelle (Signature)",
            weaponF2p: "Bouclier en alliage rouillé",
            cartridge: "Hérisson rapide (4 pièces) ou Set de Garde",
            stats: ["Défense %", "Défense (Plat)", "Effet de Rupture", "Recharge d'Énergie"],
            teamSynergy: "Nanally (Anima), Sakiri (Incantation), Zero (Cosmos)",
            lore: "Un ancien garde de sécurité qui aide maintenant la boutique Eibon avec des commissions difficiles dans les zones dangereuses de Hethereau."
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
        },
        fr: {
            name: "Mint",
            summary: "Un bon personnage DPS F2P gratuit. Présente une mécanique simple d'attaques combo et des temps de recharge de compétences élémentaires rapides.",
            weapon: "Lame de Zéphyr",
            weaponF2p: "Rapière en acier",
            cartridge: "Lucioles et la Forêt (4 pièces)",
            stats: ["ATK %", "Taux Critique", "Dégâts Critique", "Dégâts Anima"],
            teamSynergy: "Zero (Cosmos), Haniel (Incantation), Adler (Chaos)",
            lore: "Une jeune stagiaire chez Eibon qui aspire à devenir la meilleure évalueuse d'anomalies de la ville."
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
        },
        fr: {
            name: "Haniel",
            summary: "Un personnage de soutien fort de l'élément Psyché. Augmente l'ATK de l'équipe et invoque l'assistant Hootie pour infliger des dégâts et soutenir ses alliés.",
            weapon: "Esprit Royal (Signature)",
            weaponF2p: "Prêt-Prêt",
            cartridge: "Petite grande aventure (4 pièces)",
            stats: ["ATK %", "Taux Critique", "Dégâts Psyché", "Recharge d'Énergie"],
            teamSynergy: "Mint (Anima), Zero (Cosmos), Adler (Incantation)",
            lore: "Une fille attentionnée et douce qui porte toujours un hibou en peluche assistant, Hootie, capable d'inspirer les alliés pendant le combat."
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
        },
        fr: {
            name: "Lacrimosa",
            summary: "Un personnage de la version 1.1 nouvellement annoncé. Spécialisé dans les dégâts de Chaos et les puissantes attaques combo de masques.",
            weapon: "Tragédie & Comédie (Signature)",
            weaponF2p: "La tristesse dans mon cœur",
            cartridge: "Éclipse du Chaos (4 pièces)",
            stats: ["Taux Critique", "Dégâts Critique", "Dégâts Chaos", "ATK %"],
            teamSynergy: "Sakiri (Incantation), Zero (Cosmos), Hotori (Cosmos)",
            lore: "Une actrice de théâtre dont les performances enchantent le public de Hethereau. On dit que ses masques ont leur propre vie anormale."
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
        },
        fr: {
            name: "Daffodil",
            summary: "Un puissant DPS de burst de l'élément Chaos, spécialisé dans le bris de bouclier (Rupture). Accumule de la puissance hors-terrain et inflige d'énormes dégâts lors du changement.",
            weapon: "Fantaisie de jeunesse (Arc Signature)",
            weaponF2p: "Jours ensoleillés",
            cartridge: "Éclipse du Chaos (4 pièces)",
            stats: ["Intensité de Rupture", "Taux Critique", "Dégâts Critique", "ATK %"],
            teamSynergy: "Nanally (Anima), Zero (Cosmos), Sakiri (Incantation)",
            lore: "Une gardienne discrète et mystérieuse de la boutique d'antiquités Eibon. Possède des yeux kaléidoscopiques et cache son dévouement envers ses amis sous un masque froid."
        }
    },
    baicang: {
        uk: {
            name: "Байканг",
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
        },
        fr: {
            name: "Baicang",
            summary: "Un puissant DPS principal de l'élément Incantation. Utilise une mécanique de consommation de PV pour augmenter les dégâts. Nécessite un soigneur fiable dans l'équipe.",
            weapon: "Société des Camélias (Signature)",
            weaponF2p: "Le moment viendra",
            cartridge: "Crimson: Papillons jumeaux (4 pièces)",
            stats: ["Taux Critique", "Dégâts Critique", "Dégâts Incantation", "ATK %"],
            teamSynergy: "Haniel (Incantation), Sakiri (Incantation), Adler (Chaos)",
            lore: "Capitaine de l'unité ETD-4 du Bureau de Contrôle des Anomalies. Un vétéran expérimenté à la personnalité facile à vivre qui s'occupe de ses subordonnés comme un grand frère."
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
        },
        fr: {
            name: "Chiz",
            summary: "Un puissant DPS principal de l'élément Cosmos. Son Déchaînement Élémentaire ignore une grande partie de la défense ennemie, et son arme signature inflige des dégâts supplémentaires basés sur vos Fons (pièces).",
            weapon: "Chat contemplatif (Signature)",
            weaponF2p: "Rêverie sauvage",
            cartridge: "Éclat perdu (4 pièces)",
            stats: ["Taux Critique", "Dégâts Critique", "Dégâts Cosmos", "ATK %"],
            teamSynergy: "Zero (Cosmos), Sakiri (Incantation), Hotori (Cosmos)",
            lore: "Un personnage lié à la Banque Sans Nom. Possède un esprit d'entreprise et utilise un lourd marteau yokai pour récupérer les dettes et éliminer les anomalies."
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
            teamSynergy: "Байканг (Закляття), Наналлі (Аніма), Зеро (Космос)",
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
        },
        fr: {
            name: "Fadia",
            summary: "Un puissant personnage de soutien de l'élément Psyché. Agit comme un soigneur-tank qui redirige les dégâts des alliés vers elle-même et se soigne rapidement dans l'état de Lilith.",
            weapon: "Valse éternelle (Signature)",
            weaponF2p: "Flacon du médecin",
            cartridge: "Petite grande aventure (4 pièces)",
            stats: ["PV %", "PV (Plat)", "Dégâts Psyché", "Recharge d'Énergie"],
            teamSynergy: "Baicang (Incantation), Nanally (Anima), Zero (Cosmos)",
            lore: "Une incroyable fille vampire du Bureau de Contrôle des Anomalies qui porte une pierre tombale géante comme bouclier et arme."
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
        },
        fr: {
            name: "Hathor",
            summary: "Un puissant Sub-DPS de burst de l'élément Lakshana. Utilise la mécanique de cumul Express Delivery Power pour infliger d'énormes dégâts de burst.",
            weapon: "Flammes déchaînées (Signature)",
            weaponF2p: "Barrière de la sentinelle",
            cartridge: "Boxeur de rue (4 pièces)",
            stats: ["Taux Critique", "Dégâts Critique", "Dégâts Lakshana", "ATK %"],
            teamSynergy: "Zero (Cosmos), Sakiri (Incantation), Daffodil (Chaos)",
            lore: "Une fille fixatrice influente des cercles d'élite de Hethereau, qui travaille en étroite collaboration avec Sterry Express. Son élégance cache des compétences de combat inégalées."
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
        },
        fr: {
            name: "Aurelia",
            summary: "Un DPS principal de rang A de l'élément Psyché. Utilise des attaques de méduse dans l'état Cadenza pour infliger des dégâts importants. Obtenu gratuitement lors de la connexion de 3 jours.",
            weapon: "Voile stellaire (Signature)",
            weaponF2p: "Oraora!",
            cartridge: "Sang du démon: Malédiction (4 pièces)",
            stats: ["Taux Critique", "Dégâts Critique", "Dégâts Psyché", "ATK %"],
            teamSynergy: "Zero (Cosmos), Fadia (Psyché), Sakiri (Incantation)",
            lore: "Une étudiante en musique à Hethereau qui a découvert ses capacités anormales lors de l'une de ses représentations de rue. Contrôle des méduses anormales."
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
        },
        fr: {
            name: "Edgar",
            summary: "Un soigneur accessible de l'élément Cosmos. Ses compétences restaurent les PV des alliés proportionnellement à ses PV max, et son ultime crée une grande zone de soin.",
            weapon: "Appel de la ville tordue (Signature)",
            weaponF2p: "Esprit Royal",
            cartridge: "Taverne nocturne de Thea (4 pièces)",
            stats: ["PV %", "Bonus de Soin", "PV (Plat)", "Recharge d'Énergie"],
            teamSynergy: "Zero (Cosmos), Hotori (Cosmos), Jiuyuan (Anima)",
            lore: "Un employé de la boutique d'antiquités Eibon. Un jeune homme calme et équilibré qui est toujours prêt à prodiguer les premiers soins et à servir un délicieux thé chaud."
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
        },
        fr: {
            name: "Skia",
            summary: "Un puissant Sub-DPS de l'élément Lakshana spécialisé dans les marques Fang Thrust et des compétences uniques de furtivité dans l'ombre. Complète parfaitement les équipes de réaction Rémora.",
            weapon: "Attention à vos têtes! (Signature)",
            weaponF2p: "La grande aventure du bon garçon",
            cartridge: "Boxeur de rue (4 pièces)",
            stats: ["Taux Critique", "Dégâts Critique", "Dégâts Lakshana", "ATK %"],
            teamSynergy: "Zero (Cosmos), Sakiri (Incantation), Nanally (Anima)",
            lore: "Lieutenant de l'unité ETD-4 du Bureau de Contrôle des Anomalies. Un officier-loup silencieux avec une grande cicatrice à l'œil gauche qui sert fidèlement."
        }
    },
    chaos: {
        uk: {
            name: "Хаос",
            summary: "Потужний Main DPS стихії Lakshana. Використовує зброю, що трансформується у косу, великий меч та вогнепальну зброю. Здатний накопичувати стаки 'Crime' для потужних атак та телепортуватися.",
            weapon: "Pursuit Special (Сигнатурний Arc)",
            weaponF2p: "Лють полум'я",
            cartridge: "Вуличний боксер (4 частини)",
            stats: ["Шанс криту", "Крит. шкода", "Лакшана шкода", "Сила атаки %"],
            teamSynergy: "Зеро (Космос), Сакірі (Закляття), Хатор (Лакшана)",
            lore: "Лейтенант 6-го взводу ETD Бюро контролю аномалій. Загадковий і небезпечний боєць, який використовує темний туман і здатний переміщатися крізь тіні."
        },
        en: {
            name: "Chaos",
            summary: "A powerful Lakshana element Main DPS character. Transforms his weapon into a scythe, greatsword, or firearm. Accumulates 'Crime' charges for follow-up attacks and teleports via anchor.",
            weapon: "Pursuit Special (Signature Arc)",
            weaponF2p: "Raging Flames",
            cartridge: "Street Boxer (4-piece)",
            stats: ["Crit Rate", "Crit DMG", "Lakshana DMG", "ATK%"],
            teamSynergy: "Zero (Cosmos), Sakiri (Incantation), Hathor (Lakshana)",
            lore: "Lieutenant of the ETD-6 unit of the Anomaly Control Bureau. A mysterious and dangerous combatant who manipulates dark fog and warps through shadows."
        },
        fr: {
            name: "Chaos",
            summary: "Un puissant DPS principal de l'élément Lakshana. Transforme son arme en faux, espadon ou arme à feu. Accumule des charges de 'Crime' pour des attaques de suivi et se téléporte via une ancre.",
            weapon: "Pursuit Special (Arc Signature)",
            weaponF2p: "Flammes déchaînées",
            cartridge: "Boxeur de rue (4 pièces)",
            stats: ["Taux Critique", "Dégâts Critique", "Dégâts Lakshana", "ATK %"],
            teamSynergy: "Zero (Cosmos), Sakiri (Incantation), Hathor (Lakshana)",
            lore: "Lieutenant de l'unité ETD-6 du Bureau de Contrôle des Anomalies. Un combattant mystérieux et dangereux qui manipule la brume noire et se déplace dans les ombres."
        }
    }
};

export const LOCALIZED_ATTRIBUTE_MATERIALS = {
    Anima: {
        uk: {
            boss: "Унікальний матеріал Anomaly Hunt",
            specialty: "Регіональна дивина",
            farmSpecialty: "Дослідження світу / Збір у місті / Material Selection Box",
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
            specialty: "Regional Specialty",
            farmSpecialty: "World Exploration / City Gathering / Material Selection Box",
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
        },
        fr: {
            boss: "Matériau unique de Chasse aux Anomalies",
            specialty: "Spécialité régionale",
            farmSpecialty: "Exploration du monde / Collecte urbaine / Boîte de sélection de matériaux",
            farmBoss: "Chasse aux Anomalies",
            common: {
                T1: "Silhouette évanescente",
                T2: "Silhouette floue",
                T3: "Silhouette du chaos",
                farm: "Butin d'anomalie / Échange de chasseur / Échange perdu"
            },
            scrolls: {
                T1: "FNG",
                T2: "CO",
                T3: "Rose blanche",
                farm: "Manigances de Houdinii / Échange de chasseur / Synthèse"
            }
        }
    },
    Incantation: {
        uk: {
            boss: "Унікальний матеріал Anomaly Hunt",
            specialty: "Регіональна дивина",
            farmSpecialty: "Дослідження світу / Збір у місті / Material Selection Box",
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
            specialty: "Regional Specialty",
            farmSpecialty: "World Exploration / City Gathering / Material Selection Box",
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
        },
        fr: {
            boss: "Matériau unique de Chasse aux Anomalies",
            specialty: "Spécialité régionale",
            farmSpecialty: "Exploration du monde / Collecte urbaine / Boîte de sélection de matériaux",
            farmBoss: "Chasse aux Anomalies",
            common: {
                T1: "Chiffre flou",
                T2: "Chiffre non résolu",
                T3: "Chiffre déformé",
                farm: "Butin d'anomalie / Échange de chasseur / Échange perdu"
            },
            scrolls: {
                T1: "Premières attentes",
                T2: "Lassitude connue",
                T3: "Chapeau noir",
                farm: "Manigances de Houdinii / Échange de chasseur / Synthèse"
            }
        }
    },
    Cosmos: {
        uk: {
            boss: "Унікальний матеріал Anomaly Hunt",
            specialty: "Регіональна дивина",
            farmSpecialty: "Дослідження світу / Збір у місті / Material Selection Box",
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
            specialty: "Regional Specialty",
            farmSpecialty: "World Exploration / City Gathering / Material Selection Box",
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
        },
        fr: {
            boss: "Matériau unique de Chasse aux Anomalies",
            specialty: "Spécialité régionale",
            farmSpecialty: "Exploration du monde / Collecte urbaine / Boîte de sélection de matériaux",
            farmBoss: "Chasse aux Anomalies",
            common: {
                T1: "Chuchotements perdus",
                T2: "Chuchotements obscurs",
                T3: "Chuchotements paradoxaux",
                farm: "Butin d'anomalie / Échange de chasseur / Échange perdu"
            },
            scrolls: {
                T1: "Désir d'oisillon",
                T2: "Battement de colombe",
                T3: "Le rameau d'olivier",
                farm: "Manigances de Houdinii / Échange de chasseur / Synthèse"
            }
        }
    },
    Chaos: {
        uk: {
            boss: "Унікальний матеріал Anomaly Hunt",
            specialty: "Регіональна дивина",
            farmSpecialty: "Дослідження світу / Збір у місті / Material Selection Box",
            farmBoss: "Anomaly Hunt",
            common: {
                T1: "Призупинені ілюзії",
                T2: "Жадані ілюзії",
                T3: "Трансцендентні ілюзії",
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
            specialty: "Regional Specialty",
            farmSpecialty: "World Exploration / City Gathering / Material Selection Box",
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
        },
        fr: {
            boss: "Matériau unique de Chasse aux Anomalies",
            specialty: "Spécialité régionale",
            farmSpecialty: "Exploration du monde / Collecte urbaine / Boîte de sélection de matériaux",
            farmBoss: "Chasse aux Anomalies",
            common: {
                T1: "Illusions suspendues",
                T2: "Illusions désirantes",
                T3: "Illusions transcendantes",
                farm: "Butin d'anomalie / Échange de chasseur / Échange perdu"
            },
            scrolls: {
                T1: "Hésitation des vagues",
                T2: "Chuchotements suspendus",
                T3: "Le second soi",
                farm: "Manigances de Houdinii / Échange de chasseur / Synthèse"
            }
        }
    },
    Psyche: {
        uk: {
            boss: "Унікальний матеріал Anomaly Hunt",
            specialty: "Регіональна дивина",
            farmSpecialty: "Дослідження світу / Збір у місті / Material Selection Box",
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
            specialty: "Regional Specialty",
            farmSpecialty: "World Exploration / City Gathering / Material Selection Box",
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
        },
        fr: {
            boss: "Matériau unique de Chasse aux Anomalies",
            specialty: "Spécialité régionale",
            farmSpecialty: "Exploration du monde / Collecte urbaine / Boîte de sélection de matériaux",
            farmBoss: "Chasse aux Anomalies",
            common: {
                T1: "Chuchotements perdus",
                T2: "Chuchotements obscurs",
                T3: "Chuchotements paradoxaux",
                farm: "Butin d'anomalie / Échange de chasseur / Échange perdu"
            },
            scrolls: {
                T1: "Synchronicité de pensée",
                T2: "Résonance de foi",
                T3: "Nuit palpitante",
                farm: "Manigances de Houdinii / Échange de chasseur / Synthèse"
            }
        }
    },
    Lakshana: {
        uk: {
            boss: "Унікальний матеріал Anomaly Hunt",
            specialty: "Регіональна дивина",
            farmSpecialty: "Дослідження світу / Збір у місті / Material Selection Box",
            farmBoss: "Anomaly Hunt",
            common: {
                T1: "Призупинені ілюзії",
                T2: "Жадані ілюзії",
                T3: "Трансцендентні ілюзії",
                farm: "Anomaly Drop / Hunter Exchange / Lost Exchange"
            },
            scrolls: {
                T1: "Книга здібностей еспера I",
                T2: "Книга здібностей еспера II",
                T3: "Книга здібностей еспера III",
                farm: "Houdinii's Schemes / Hunter Exchange / Crafting"
            }
        },
        en: {
            boss: "Unique Anomaly Hunt Material",
            specialty: "Regional Specialty",
            farmSpecialty: "World Exploration / City Gathering / Material Selection Box",
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
        fr: {
            boss: "Matériau unique de Chasse aux Anomalies",
            specialty: "Spécialité régionale",
            farmSpecialty: "Exploration du monde / Collecte urbaine / Boîte de sélection de matériaux",
            farmBoss: "Chasse aux Anomalies",
            common: {
                T1: "Illusions suspendues",
                T2: "Illusions désirantes",
                T3: "Illusions transcendantes",
                farm: "Butin d'anomalie / Échange de chasseur / Échange perdu"
            },
            scrolls: {
                T1: "Livre de compétences d'Esper I",
                T2: "Livre de compétences d'Esper II",
                T3: "Livre de compétences d'Esper III",
                farm: "Manigances de Houdinii / Échange de chasseur / Synthèse"
            }
        }
    }
};

export const LOCALIZED_WEAPON_MATERIALS = {
    solid: {
        uk: {
            T1: "Залізне яблучне насіння",
            T2: "Срібне яблучне насіння",
            T3: "Золоте яблучне насіння",
            farm: "Завод бабл-банок (Bubble Can Factory)"
        },
        en: {
            T1: "Iron Appleseed",
            T2: "Silver Appleseed",
            T3: "Golden Appleseed",
            farm: "Bubble Can Factory Anomaly Zone"
        },
        fr: {
            T1: "Pépin de pomme en fer",
            T2: "Pépin de pomme en argent",
            T3: "Pépin de pomme en or",
            farm: "Zone d'anomalie de la fabrique de canettes de bulles"
        }
    },
    liquid: {
        uk: {
            T1: "Пробний набір рідких снів",
            T2: "Дорожній набір рідких снів",
            T3: "Банка рідких снів",
            farm: "Завод бабл-банок (Bubble Can Factory)"
        },
        en: {
            T1: "Liquid Dream Trial Kit",
            T2: "Liquid Dream Travel Kit",
            T3: "Liquid Dream Can",
            farm: "Bubble Can Factory Anomaly Zone"
        },
        fr: {
            T1: "Kit d'essai de rêve liquide",
            T2: "Kit de voyage de rêve liquide",
            T3: "Canette de rêve liquide",
            farm: "Zone d'anomalie de la fabrique de canettes de bulles"
        }
    },
    gas: {
        uk: {
            T1: "Безсмаковий холодний десерт",
            T2: "Простий холодний десерт",
            T3: "Особливий холодний десерт",
            farm: "Завод бабл-банок (Bubble Can Factory)"
        },
        en: {
            T1: "Flavorless Cold Dessert",
            T2: "Plain Cold Dessert",
            T3: "Special Cold Dessert",
            farm: "Bubble Can Factory Anomaly Zone"
        },
        fr: {
            T1: "Dessert froid sans saveur",
            T2: "Dessert froid nature",
            T3: "Dessert froid spécial",
            farm: "Zone d'anomalie de la fabrique de canettes de bulles"
        }
    },
    plasma: {
        uk: {
            T1: "Початкове ядро драми",
            T2: "Майстер-ядро драми",
            T3: "Колекційне ядро драми",
            farm: "Завод бабл-банок (Bubble Can Factory)"
        },
        en: {
            T1: "Beginner Drama Core",
            T2: "Master Drama Core",
            T3: "Collector's Drama Core",
            farm: "Bubble Can Factory Anomaly Zone"
        },
        fr: {
            T1: "Noyau de drame pour débutant",
            T2: "Noyau de drame de maître",
            T3: "Noyau de drame de collectionneur",
            farm: "Zone d'anomalie de la fabrique de canettes de bulles"
        }
    },
    synthesis: {
        uk: {
            T1: "Біті (Beaty)",
            T2: "Версі (Versey)",
            T3: "Гармонія (Harmony)",
            farm: "Завод бабл-банок (Bubble Can Factory)"
        },
        en: {
            T1: "Beaty",
            T2: "Versey",
            T3: "Harmony",
            farm: "Bubble Can Factory Anomaly Zone"
        },
        fr: {
            T1: "Beaty",
            T2: "Versey",
            T3: "Harmony",
            farm: "Zone d'anomalie de la fabrique de canettes de bulles"
        }
    }
};

export const LOCALIZED_UNIQUE_MATERIALS = {
    "Confessional Flower Seed": {
        uk: {
            name: "Насіння Сповідальної Квітки",
            farm: "Полювання на Аномалії: Серенетті (Silent Garden) / Ящик Вибору Матеріалів"
        },
        en: {
            name: "Confessional Flower Seed",
            farm: "Anomaly Hunt: Silent Garden (Serenetti) / Material Selection Box"
        },
        fr: {
            name: "Graine de fleur confessionnelle",
            farm: "Chasse aux Anomalies : Jardin silencieux (Serenetti) / Boîte de sélection"
        }
    },
    "A Page from Delusion's Shore": {
        uk: {
            name: "Сторінка з Берегів Омани",
            farm: "Полювання на Аномалії: Чорний Том / Ящик Вибору Матеріалів"
        },
        en: {
            name: "A Page from Delusion's Shore",
            farm: "Anomaly Hunt: Black Tome / Material Selection Box"
        },
        fr: {
            name: "Page de la rive de l'illusion",
            farm: "Chasse aux Anomalies : Tome noir / Boîte de sélection"
        }
    },
    "Tear of the Sea": {
        uk: {
            name: "Сльоза Моря",
            farm: "Полювання на Аномалії: Морський В'язень / Ящик Вибору Матеріалів"
        },
        en: {
            name: "Tear of the Sea",
            farm: "Anomaly Hunt: Sea Prisoner / Material Selection Box"
        },
        fr: {
            name: "Larme de la mer",
            farm: "Chasse aux Anomalies : Prisonnier de la mer / Boîte de sélection"
        }
    },
    "Charging Knight Spark Plug": {
        uk: {
            name: "Свічка Запалювання Лицаря-Нападника",
            farm: "Полювання на Аномалії: Вершник Без Голови / Ящик Вибору Матеріалів"
        },
        en: {
            name: "Charging Knight Spark Plug",
            farm: "Anomaly Hunt: Headless Rider / Material Selection Box"
        },
        fr: {
            name: "Bougie d'allumage du chevalier chargeant",
            farm: "Chasse aux Anomalies : Cavalier sans tête / Boîte de sélection"
        }
    },
    "Water Moon Pick": {
        uk: {
            name: "Медіатор Водяного Місяця",
            farm: "Полювання на Аномалії: Король Бітів / Ящик Вибору Матеріалів"
        },
        en: {
            name: "Water Moon Pick",
            farm: "Anomaly Hunt: Beat King / Material Selection Box"
        },
        fr: {
            name: "Médiateur de lune d'eau",
            farm: "Chasse aux Anomalies : Roi des beats / Boîte de sélection"
        }
    },
    "Nest Guard Fragment": {
        uk: {
            name: "Фрагмент Вартового Гнізда",
            farm: "Полювання на Аномалії: Птах у Гнізді / Ящик Вибору Матеріалів"
        },
        en: {
            name: "Nest Guard Fragment",
            farm: "Anomaly Hunt: Nestbound Bird / Material Selection Box"
        },
        fr: {
            name: "Fragment du gardien du nid",
            farm: "Chasse aux Anomalies : Oiseau du nid / Boîte de sélection"
        }
    },
    "Colorful Ticket Stub": {
        uk: {
            name: "Кольоровий Корінець Квитка",
            farm: "Полювання на Аномалії: Махаон (Swallowtail) / Ящик Вибору Матеріалів"
        },
        en: {
            name: "Colorful Ticket Stub",
            farm: "Anomaly Hunt: Swallowtail / Material Selection Box"
        },
        fr: {
            name: "Talon de ticket coloré",
            farm: "Chasse aux Anomalies : Swallowtail / Boîte de sélection"
        }
    }
};

export const CHARACTER_MATERIAL_PROFILES = {
    hotori: {
        verified: true,
        weaponType: "solid",
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
            coin: 2723000,
            boss: 122,
            common_t1: 49,
            common_t2: 46,
            common_t3: 83,
            scroll_t1: 64,
            scroll_t2: 40,
            scroll_t3: 40,
            weekly: 32
        }
    },
    zero: { weaponType: "solid", unique: "Charging Knight Spark Plug", uniqueFarm: "Anomaly Hunt: Headless Rider / Material Selection Box", uniqueIcon: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Charging-Knight-Spark-Plug.webp", weekly: "Good Boy Stamp", weeklyFarm: "Anomaly Pilgrimage: Morphix" },
    sakiri: { weaponType: "gas", unique: "Charging Knight Spark Plug", uniqueFarm: "Anomaly Hunt: Headless Rider / Material Selection Box", uniqueIcon: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Charging-Knight-Spark-Plug.webp", weekly: "Good Boy Stamp", weeklyFarm: "Anomaly Pilgrimage: Morphix" },
    daffodil: { weaponType: "liquid", unique: "Charging Knight Spark Plug", uniqueFarm: "Anomaly Hunt: Headless Rider / Material Selection Box", uniqueIcon: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Charging-Knight-Spark-Plug.webp", weekly: "Dress Sleeves of Vanity", weeklyFarm: "Anomaly Pilgrimage: The Never-ending Arachne" },
    nanally: { weaponType: "plasma", unique: "A Page from Delusion's Shore", uniqueFarm: "Anomaly Hunt: Black Tome / Material Selection Box", uniqueIcon: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/A-Page-from-Delusions-Shore.webp", weekly: "Good Boy Stamp", weeklyFarm: "Anomaly Pilgrimage: Morphix" },
    mint: { weaponType: "liquid", unique: "A Page from Delusion's Shore", uniqueFarm: "Anomaly Hunt: Black Tome / Material Selection Box", uniqueIcon: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/A-Page-from-Delusions-Shore.webp", weekly: "Good Boy Stamp", weeklyFarm: "Anomaly Pilgrimage: Morphix" },
    jiuyuan: { weaponType: "solid", unique: "Tear of the Sea", uniqueFarm: "Anomaly Hunt: Sea Prisoner / Material Selection Box", uniqueIcon: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Tear-of-the-Sea.webp", weekly: "Dress Sleeves of Vanity", weeklyFarm: "Anomaly Pilgrimage: The Never-ending Arachne" },
    adler: { weaponType: "synthesis", unique: "Water Moon Pick", uniqueFarm: "Anomaly Hunt: Beat King / Material Selection Box", uniqueIcon: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Water-Moon-Pick.webp", weekly: "Dress Sleeves of Vanity", weeklyFarm: "Anomaly Pilgrimage: The Never-ending Arachne" },
    haniel: { weaponType: "solid", unique: "Nest Guard Fragment", uniqueFarm: "Anomaly Hunt: Nestbound Bird / Material Selection Box", uniqueIcon: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Nest-Guard-Fragment.webp", weekly: "Dress Sleeves of Vanity", weeklyFarm: "Anomaly Pilgrimage: The Never-ending Arachne" },
    skia: { weaponType: "gas", unique: "Confessional Flower Seed", uniqueFarm: "Anomaly Hunt: Serenetti / Material Selection Box", uniqueIcon: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Confessional-Flower-Seed.webp", weekly: "Good Boy Stamp", weeklyFarm: "Anomaly Pilgrimage: Morphix" },
    lacrimosa: { weaponType: "liquid", unique: "Confessional Flower Seed", uniqueFarm: "Anomaly Hunt: Serenetti / Material Selection Box", uniqueIcon: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Confessional-Flower-Seed.webp", weekly: "Dress Sleeves of Vanity", weeklyFarm: "Anomaly Pilgrimage: The Never-ending Arachne" },
    baicang: { weaponType: "synthesis", unique: "Nest Guard Fragment", uniqueFarm: "Anomaly Hunt: Nestbound Bird / Material Selection Box", uniqueIcon: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Nest-Guard-Fragment.webp", weekly: "Good Boy Stamp", weeklyFarm: "Anomaly Pilgrimage: Morphix" },
    chiz: { weaponType: "gas", unique: "Tear of the Sea", uniqueFarm: "Anomaly Hunt: Sea Prisoner / Material Selection Box", uniqueIcon: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Tear-of-the-Sea.webp", weekly: "Good Boy Stamp", weeklyFarm: "Anomaly Pilgrimage: Morphix" },
    fadia: { weaponType: "synthesis", unique: "Water Moon Pick", uniqueFarm: "Anomaly Hunt: Beat King / Material Selection Box", uniqueIcon: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Water-Moon-Pick.webp", weekly: "Dress Sleeves of Vanity", weeklyFarm: "Anomaly Pilgrimage: The Never-ending Arachne" },
    hathor: { weaponType: "plasma", unique: "Colorful Ticket Stub", uniqueFarm: "Anomaly Hunt: Swallowtail / Material Selection Box", uniqueIcon: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Colorful-Ticket-Stub.webp", weekly: "Good Boy Stamp", weeklyFarm: "Anomaly Pilgrimage: Morphix" },
    aurelia: { weaponType: "plasma", unique: "Nest Guard Fragment", uniqueFarm: "Anomaly Hunt: Nestbound Bird / Material Selection Box", uniqueIcon: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Nest-Guard-Fragment.webp", weekly: "Good Boy Stamp", weeklyFarm: "Anomaly Pilgrimage: Morphix" },
    edgar: { weaponType: "liquid", unique: "Colorful Ticket Stub", uniqueFarm: "Anomaly Hunt: Swallowtail / Material Selection Box", uniqueIcon: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Colorful-Ticket-Stub.webp", weekly: "Good Boy Stamp", weeklyFarm: "Anomaly Pilgrimage: Morphix" },
    chaos: { weaponType: "solid", unique: "Confessional Flower Seed", uniqueFarm: "Anomaly Hunt: Serenetti / Material Selection Box", uniqueIcon: "https://neverness.gg/wp-content/uploads/sites/88/2026/05/Confessional-Flower-Seed.webp", weekly: "Scepter Called Prestige", weeklyFarm: "Anomaly Pilgrimage: The Never-ending Arachne" }
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
        },
        fr: {
            title: "Lancement mondial : Neverness to Everness (1.0)",
            date: "29 avril 2026",
            desc: "Lancement officiel du jeu sur PC, iOS et Android. Chapitres d'histoire initiaux à Hethereau, bannière limitée de Nanally et événements de démarrage disponibles."
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
        },
        fr: {
            title: "Stream des développeurs : Présentation de la Version 1.1",
            date: "23 mai 2026",
            desc: "Diffusion spéciale par Hotta Studio. Annonce de nouveaux personnages comme Lacrimosa (DPS Chaos), extension de la ville, modes de jeu et codes promo."
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
        },
        fr: {
            title: "Version 1.1 : 'Lacrimosa of Chaos'",
            date: "3-4 juin 2026",
            desc: "Lancement de la première mise à jour majeure. Début de la première phase de la bannière avec Lacrimosa. Nouveau chapitre d'histoire 'Théâtre des Ombres'. Lancement de l'événement estival."
        }
    },
    "Стрім Розробників: Презентація Версії 1.2 '999 Nights'": {
        uk: {
            title: "Стрім Розробників: Презентація Версії 1.2 '999 Nights'",
            date: "27 Червня 2026",
            desc: "Спеціальна трансляція від Hotta Studio. Детальна презентація оновлення 1.2, анонс нових героїв Шінку (Shinku) та Іроі (Iroi), демонстрація геймплею, нових ігрових зон та нові промокоди."
        },
        en: {
            title: "Developer Stream: Version 1.2 '999 Nights' Showcase",
            date: "June 27, 2026",
            desc: "Special live broadcast by Hotta Studio. In-depth presentation of the 1.2 update, announcement of new heroes Shinku and Iroi, gameplay showcases, new districts, and new promo codes."
        },
        fr: {
            title: "Stream des développeurs : Présentation de la Version 1.2 '999 Nights'",
            date: "27 juin 2026",
            desc: "Diffusion en direct spéciale de Hotta Studio. Présentation détaillée de la mise à jour 1.2, annonce des nouveaux héros Shinku et Iroi, démonstrations de gameplay, nouveaux quartiers et codes promo."
        }
    },
    "Оновлення 1.2 '999 Nights': Банер Шінку (Shinku)": {
        uk: {
            title: "Оновлення 1.2 '999 Nights': Банер Шінку (Shinku)",
            date: "8 Липня 2026",
            desc: "Офіційний запуск версії 1.2. Старт першої фази з банером Шінку (S-ранг, стихія Космос, атакуючий DPS з механікою берсерка). Новий сюжетний розділ, розширення карти та літні події."
        },
        en: {
            title: "Version 1.2 '999 Nights': Shinku Banner",
            date: "July 8, 2026",
            desc: "Official release of Version 1.2. Start of Phase 1 featuring S-Rank Shinku (Cosmos attribute, burst DPS with a berserk mechanic). Includes new story acts, map expansions, and summer events."
        },
        fr: {
            title: "Version 1.2 '999 Nights' : Bannière de Shinku",
            date: "8 juillet 2026",
            desc: "Sortie officielle de la Version 1.2. Début de la Phase 1 avec Shinku (rang S, attribut Cosmos, DPS de type burst avec mécanique de berserk). Comprend de nouveaux chapitres d'histoire, extensions de carte et événements estivaux."
        }
    },
    "Друга фаза 1.2: Банер Іроі (Iroi)": {
        uk: {
            title: "Друга фаза 1.2: Банер Іроі (Iroi)",
            date: "29 Липня 2026 (Прогноз)",
            desc: "Старт другої фази оновлення 1.2. Лімітований банер нового персонажа підтримки S-рангу Іроі (Iroi), яка володіє стихією Аніма та спеціалізується на лікуванні команди."
        },
        en: {
            title: "Phase 2 of 1.2: Iroi Banner",
            date: "July 29, 2026 (Estimate)",
            desc: "Start of the second phase of version 1.2. Limited banner for the new S-Rank support character Iroi (Anima attribute, healer/support)."
        },
        fr: {
            title: "Phase 2 de la 1.2 : Bannière d'Iroi",
            date: "29 juillet 2026 (Estimation)",
            desc: "Début de la deuxième phase de la version 1.2. Bannière limitée pour le nouveau personnage de soutien de rang S Iroi (attribut Anima, spécialisé dans les soins)."
        }
    },
    "Друга фаза 1.1: Банер Хаосу (Chaos)": {
        uk: {
            title: "Друга фаза 1.1: Банер Хаосу (Chaos)",
            date: "24 Червня 2026",
            desc: "Старт другої фази версії 1.1. Лімітований банер нового персонажа S-рангу Хаосу (Chaos), який володіє стихією Лакшана."
        },
        en: {
            title: "Phase 2 of 1.1: Chaos Banner",
            date: "June 24, 2026",
            desc: "Start of the second phase of version 1.1. Limited banner for the new S-Rank character Chaos (Lakshana element)."
        },
        fr: {
            title: "Phase 2 de la 1.1 : Bannière de Chaos",
            date: "24 juin 2026",
            desc: "Début de la deuxième phase de la version 1.1. Bannière limitée pour le nouveau personnage de rang S Chaos (élément Lakshana)."
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
        },
        fr: {
            name: "Blossom",
            desc: "Activé! L'équipe gagne +15% de Recharge d'Énergie et des dégâts Anima accrus. Idéal pour booster les auto-attaques de Nanally."
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
        },
        fr: {
            name: "Cycle d'Espers",
            desc: "Activé! L'attribut Cosmos (ex: Zero ou Chiz) sert de catalyseur. Changer de personnage remplit la jauge d'Esper 30% plus vite."
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
        },
        fr: {
            name: "Consommer",
            desc: "Activé! Déclenche une réaction thermique qui enflamme les cibles proches, infligeant des dégâts de feu continus (DoT) toutes les 1.5 secondes."
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
        },
        fr: {
            name: "Surchargé",
            desc: "Activé! Applique un malus de 'Rupture de Stabilité' aux ennemis, facilitant le bris de boucliers et la mise à terre."
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
        },
        fr: {
            name: "Rémora",
            desc: "Activé! Réaction entre Lakshana et Cosmos. Augmente le taux critique de 10% et booste significativement les dégâts physiques et Cosmos."
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
        },
        fr: {
            name: "Discorde",
            desc: "Activé! Les éléments Chaos/Incantation créent une dissonance mentale avec Psyché, réduisant la stabilité ennemie et infligeant 25% de dégâts en plus aux boucliers brisés."
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
        },
        fr: {
            name: "Tache",
            desc: "Activé! Combiner Lakshana et Psyché altère la perception des ennemis, leur infligeant des dégâts continus (DoT) et réduisant leur ATK."
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
        },
        fr: {
            name: "Nova",
            desc: "Activé! Anima et Psyché déclenchent une explosion mentale, infligeant de colossaux dégâts de zone (AoE) aux ennemis proches."
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
        nav_map: "Карта",
        map_title: "Інтерактивна Карта Фарму",
        map_subtitle: "Візуальний путівник по локаціях Гетеро — натисніть на район або маркер, щоб переглянути деталі",
        legend_unheard_shores: "Нечувані Береги",
        legend_bridge_crossings: "Мостові Переходи",
        legend_miguel_district: "Район Мігеля",
        legend_new_herland: "Нью-Герланд",
        legend_city_of_illusions: "Місто Ілюзій",
        nav_codes: "Промокоди",
        nav_guides: "Гайди",
        nav_calendar: "Календар",
        btn_login: "Увійти",
        btn_logout: "Вийти",
        user_fallback: "Користувач",
        guest_fallback: "Гість",
        hero_tagline: "СУПЕРПРИРОДНА МІСЬКА RPG ВІД HOTTA STUDIO",
        hero_title: "Увійдіть в аномальний світ <br><span class=\"highlight-text\">Neverness to Everness</span>",
        hero_desc: "Ласкаво просимо в Eibon Terminal — ваш персональний довідник з дослідження мегаполісу Гетеро. Оцінюйте аномалії, керуйте бізнесом, збирайте найкращі команди та відстежуйте свіжі новини.",
        hero_btn_tierlist: "Переглянути Тір-ліст",
        hero_btn_teambuilder: "Зібрати Загін",
        active_banner_badge: "АКТИВНИЙ БАНЕР",
        active_banner_title: "Хаос: Погоня в Тінях",
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
        widget_events_badge: "ВЕРСІЯ 1.1",
        widget_loading: "Завантаження...",
        widget_copy_btn: "Копіювати",
        widget_copied: "Скопійовано!",
        tierlist_title: "Рейтинг Персонажів (Тір-ліст)",
        tierlist_subtitle: "Оцінка ефективності мисливців на аномалії у версії 1.1 (Dreamwalk Corridor)",
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
        calc_skills_hint: "* Рівні навичок 8-10 потребують рідкісних ядер босів та матеріалів тижневого боса.",
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
        footer_copyright: "&copy; 2026 Eibon Terminal. Усі права захищено. Створено для спільноти Neverness to Everness.",
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
        loading_text: "Loading data...",
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
        guides_view_presets_btn: "Готові збірки команд",
        map_filters_title: "Фільтри Карти",
        show_all: "Повністю",
        hide_all: "Сховати",
        map_detail_title: "Деталі Локації",
        map_detail_placeholder: "Натисніть на маркер на карті, щоб побачити інформацію про дропи та рекомендованих персонажів.",
        guides_no_found: "Гайди не знайдено.",
        guides_view_build: "Дивитись білд",
        guides_customize_team: "Налаштувати цю команду в Конструкторі",
        guides_build_title_prefix: "Гайд на білд: ",
        guides_build_subtitle_prefix: "Білди та напарники: ",
        guides_build_default_desc: "Повний аналіз характеристик, зброї та картриджів."
    },
    en: {
        logo_badge: "WIKI",
        nav_home: "Home",
        nav_tierlist: "Tier List",
        nav_builds: "Builds",
        nav_teambuilder: "Teams",
        nav_calculator: "Calculator",
        nav_map: "Map",
        map_title: "Interactive Farming Map",
        map_subtitle: "Visual guide to Hethereau locations — click on a district or marker to view details",
        legend_unheard_shores: "Unheard Shores",
        legend_bridge_crossings: "Bridge Crossings",
        legend_miguel_district: "Miguel District",
        legend_new_herland: "New Herland",
        legend_city_of_illusions: "Illusion Town",
        nav_codes: "Promo Codes",
        nav_guides: "Guides",
        nav_calendar: "Calendar",
        btn_login: "Login",
        btn_logout: "Logout",
        user_fallback: "User",
        guest_fallback: "Guest",
        hero_tagline: "SUPERNATURAL URBAN RPG BY HOTTA STUDIO",
        hero_title: "Enter the Anomaly World of <br><span class=\"highlight-text\">Neverness to Everness</span>",
        hero_desc: "Welcome to Eibon Terminal — your personal guide to exploring the Hethereau metropolis. Evaluate anomalies, manage businesses, assemble the best teams, and track fresh updates.",
        hero_btn_tierlist: "View Tier List",
        hero_btn_teambuilder: "Build Squad",
        active_banner_badge: "ACTIVE BANNER",
        active_banner_title: "Chaos: Shadow Pursuit",
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
        widget_events_badge: "VERSION 1.1",
        widget_loading: "Loading...",
        widget_copy_btn: "Copy",
        widget_copied: "Copied!",
        tierlist_title: "Character Rating (Tier List)",
        tierlist_subtitle: "Evaluation of anomaly hunters' effectiveness in version 1.1 (Dreamwalk Corridor)",
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
        calc_skills_hint: "* Skill levels 8-10 require rare boss cores and weekly boss materials.",
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
        footer_copyright: "&copy; 2026 Eibon Terminal. All Rights Reserved. Built for the Neverness to Everness community.",
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
        guides_view_presets_btn: "Preset Team Comps",
        map_filters_title: "Map Filters",
        show_all: "Show All",
        hide_all: "Hide All",
        map_detail_title: "Location Details",
        map_detail_placeholder: "Click on a marker on the map to see drop information and recommended characters.",
        guides_no_found: "No guides found.",
        guides_view_build: "View Build",
        guides_customize_team: "Customize this Team in Constructor",
        guides_build_title_prefix: "Character Build: ",
        guides_build_subtitle_prefix: "Build Guide: ",
        guides_build_default_desc: "Full analysis of stats, weapons, and cartridge configurations."
    },
    fr: {
        logo_badge: "WIKI",
        nav_home: "Accueil",
        nav_tierlist: "Tier List",
        nav_builds: "Builds",
        nav_teambuilder: "Équipes",
        nav_calculator: "Calculateur",
        nav_map: "Carte",
        map_title: "Carte de Farming Interactive",
        map_subtitle: "Guide visuel des zones d'Hethereau — cliquez sur un quartier ou un marqueur pour voir les détails",
        legend_unheard_shores: "Rivages Inconnus",
        legend_bridge_crossings: "Ponts et Passages",
        legend_miguel_district: "Quartier Miguel",
        legend_new_herland: "New Herland",
        legend_city_of_illusions: "Ville d'Illusion",
        nav_codes: "Codes Promo",
        nav_guides: "Guides",
        nav_calendar: "Calendrier",
        btn_login: "Connexion",
        btn_logout: "Déconnexion",
        user_fallback: "Utilisateur",
        guest_fallback: "Invité",
        hero_tagline: "RPG URBAIN SURNATUREL PAR HOTTA STUDIO",
        hero_title: "Entrez dans le monde d'anomalies de <br><span class=\"highlight-text\">Neverness to Everness</span>",
        hero_desc: "Bienvenue sur Eibon Terminal — votre guide personnel pour explorer la métropole de Hethereau. Évaluez les anomalies, gérez vos commerces, assemblez les meilleures équipes et suivez les dernières actualités.",
        hero_btn_tierlist: "Voir la Tier List",
        hero_btn_teambuilder: "Créer une Équipe",
        active_banner_badge: "BANNIÈRE ACTIVE",
        active_banner_title: "Chaos : Poursuite des Ombres",
        banner_timer_label: "Se termine dans :",
        view_build_btn: "Évaluation & Build",
        feat_tierlist_title: "Tier List Interactive",
        feat_tierlist_desc: "Classement à jour des chasseurs d'anomalies. Découvrez qui domine la méta actuelle du jeu.",
        feat_teams_title: "Constructeur d'Équipes",
        feat_teams_desc: "Composez vos équipes et analysez les synergies d'éléments et les styles de combat.",
        feat_calc_title: "Calculateur de Progression",
        feat_calc_desc: "Calculez le nombre exact de pièces, d'EXP et de matériaux de boss requis pour améliorer vos personnages.",
        widget_codes_title: "Codes Promo Actifs",
        widget_codes_badge: "VÉRIFIÉ",
        widget_codes_desc: "Cliquez sur un code pour le copier instantanément.",
        widget_events_title: "Calendrier des Événements & Versions",
        widget_events_badge: "VERSION 1.1",
        widget_loading: "Chargement...",
        widget_copy_btn: "Copier",
        widget_copied: "Copié !",
        tierlist_title: "Classement des Personnages (Tier List)",
        tierlist_subtitle: "Évaluation de l'efficacité des chasseurs d'anomalies dans la version 1.1 (Dreamwalk Corridor)",
        sub_tab_official: "Tier List Officielle",
        sub_tab_community: "Listes de la Communauté",
        sub_tab_creator: "Créer la Vôtre",
        filter_search_placeholder: "Rechercher un personnage par nom...",
        filter_rarity_label: "Rareté :",
        filter_rarity_all: "Tous",
        filter_rarity_s: "Rang S (5★)",
        filter_rarity_a: "Rang A (4★)",
        filter_attribute_label: "Élément :",
        filter_role_label: "Rôle :",
        tierlist_note: "* Cliquez sur la carte d'un personnage pour ouvrir son build détaillé, sa meilleure arme (Arc) et ses cartouches recommandées.",
        no_chars_found: "Aucun personnage trouvé",
        comm_title: "Tier Lists de la Communauté",
        comm_subtitle: "Évaluations de personnages et avis des autres joueurs de Neverness to Everness.",
        comm_loading: "Chargement des listes de la communauté...",
        comm_empty: "Aucune tier list enregistrée pour le moment. Créez la première ! 🚀",
        comm_db_unavailable: "Base de données indisponible. Connectez-vous au réseau pour voir.",
        comm_view_btn: "Voir",
        comm_delete_btn: "Supprimer",
        comm_delete_confirm: "Êtes-vous sûr de vouloir supprimer cette tier list ?",
        comm_deleted_toast: "Tier list supprimée avec succès ! 🗑️",
        comm_delete_error: "Échec de la suppression : ",
        creator_prompt_title: "Créez Votre Propre Tier List",
        creator_prompt_desc: "Pour utiliser le constructeur et sauvegarder vos classements, veuillez vous connecter avec Google.",
        creator_prompt_btn: "Se connecter avec Google",
        creator_title_label: "Titre de la Tier List :",
        creator_title_placeholder: "ex: Ma Tier List Version 1.0",
        creator_save_btn: "Sauvegarder la Tier List",
        creator_pool_title: "Sélection de Personnages (cliquez ou glissez pour assigner)",
        creator_saved_toast: "Tier list publiée avec succès ! 🎉",
        creator_empty_error: "Veuillez d'abord assigner des personnages aux paliers !",
        creator_auth_error: "Veuillez d'abord vous connecter !",
        builds_title: "Guides de Build des Personnages",
        builds_subtitle: "Équipements recommandés et priorités de statistiques pour une performance de combat maximale",
        build_best_weapon: "Meilleure Arme (Arc)",
        build_f2p_alt: "Alternative F2P",
        build_cartridge: "Set de Cartouches",
        build_stats_pri: "Priorité des Stats",
        build_partners: "Coéquipiers recommandés :",
        teams_title: "Constructeur d'Équipe Interactif",
        teams_subtitle: "Assemblez une équipe de 4 chasseurs pour découvrir les synergies élémentaires et les rotations de combat",
        teams_clear_btn: "Vider l'Équipe",
        teams_analysis_title: "Analyse de Synergie d'Équipe",
        teams_start_prompt: "Sélectionnez des personnages pour commencer le calcul.",
        teams_desc_prompt: "Ajoutez des chasseurs dans les emplacements ci-dessus. Le système analysera automatiquement les classes et attributs pour définir des rotations de combat optimales.",
        teams_slot_leader: "Slot 1 (Leader)",
        teams_slot_label: "Emplacement ",
        teams_modal_title: "Sélectionner un Personnage",
        calc_title: "Calculateur de Ressources & Progression",
        calc_subtitle: "Planificateur professionnel pour maximiser le développement de votre chasseur, de vos compétences et de vos armes",
        calc_char_label: "Sélectionner un Chasseur :",
        calc_tab_char: "Personnage",
        calc_tab_skills: "Compétences",
        calc_tab_weapon: "Arme (Arc)",
        calc_level_title: "Niveau du Personnage",
        calc_level_start: "Niveau Initial :",
        calc_level_end: "Niveau Cible :",
        calc_level_max_hint: "* Le niveau maximum du chasseur est de 80. Les élévations se produisent aux niveaux 20, 40, 50, 60 et 70.",
        calc_skills_title: "Niveaux de Compétence (1 - 10)",
        calc_skill_basic: "Attaque Normale",
        calc_skill_active: "Compétence Active",
        calc_skill_passive: "Compétence Passive",
        calc_skill_ultimate: "Déchaînement Élémentaire",
        calc_skills_hint: "* Les niveaux de compétence 8 à 10 nécessitent des noyaux de boss rares et des matériaux de boss hebdomadaire.",
        calc_weapon_active: "Améliorer l'Arme (Arc)",
        calc_weapon_rarity: "Rareté de l'Arme :",
        calc_weapon_5star: "Rang S (5★ Signature)",
        calc_weapon_4star: "Rang A (4★ F2P)",
        calc_weapon_3star: "Rang B (3★ Débutant)",
        calc_weapon_start: "Niveau Initial :",
        calc_weapon_end: "Niveau Cible :",
        calc_materials_title: "Matériaux Requis",
        calc_clear_inv: "Vider l'Inventaire",
        calc_copy_report: "Copier le Rapport",
        calc_inv_desc: "Entrez votre stock actuel dans les champs « Possède » pour calculer le déficit net.",
        calc_have_label: "Possède :",
        calc_need_label: "Requis :",
        calc_left_label: "Restant :",
        calc_done_label: "Terminé",
        codes_title: "Codes Promo Actifs",
        codes_subtitle: "Ressources gratuites des développeurs pour Neverness to Everness (NTE)",
        codes_header: "Codes Promo Actifs",
        codes_indicator: "Mise à jour auto : Active",
        codes_guide_title: "Comment activer les codes promo en jeu ?",
        codes_guide_1: "Lancez <strong>Neverness to Everness</strong>.",
        codes_guide_2: "Ouvrez le <strong>Menu Principal</strong> (icône en haut à droite).",
        codes_guide_3: "Cliquez sur l'icône de <strong>trois points (...)</strong> à côté de votre pseudo.",
        codes_guide_4: "Sélectionnez <strong>Redeem Code (Utiliser Code)</strong>.",
        codes_guide_5: "Entrez le code copié et récupérez les récompenses dans votre boîte aux lettres en jeu !",
        guides_title: "Wiki & Progression Guides",
        guides_subtitle: "Stratégies essentielles pour l'amélioration des personnages, la gestion des commerces et l'exploration de la ville",
        guide_prog_title: "Guide de Progression : Démarrage Rapide",
        guide_prog_1: "<strong>L'Histoire d'Abord :</strong> Concentrez-vous sur les quêtes de l'histoire principale au début. C'est le moyen le plus rapide d'augmenter votre Niveau de Chasseur et votre Niveau d'Évaluation, nécessaires pour débloquer des fonctionnalités essentielles et les limites de niveau.",
        guide_prog_2: "<strong>City Tycoon (Magnat de la Ville) :</strong> Aménagez votre Café dès qu'il est débloqué. Atteindre le Niveau 18 de City Tycoon vous offre gratuitement le puissant DPS de Rang S <strong>Chiz</strong>, et le Niveau 21 débloque son arme signature !",
        guide_prog_3: "<strong>Moto Novis ST-X 950 :</strong> Achetez cette moto chez le concessionnaire Regalia dans le quartier de New Herland. Contrairement aux voitures, elle peut être invoquée hors route, facilitant énormément l'exploration du terrain.",
        guide_prog_4: "<strong>Cabines Téléphoniques ReroRero :</strong> Assurez-vous de les activer sur votre carte pour établir un réseau de voyage rapide à travers la gigantesque ville de Hethereau.",
        guide_char_title: "Puissance des Personnages & Améliorations",
        guide_char_1: "<strong>Investissez dans votre Carry Principal :</strong> Concentrez vos matériaux de progression sur un seul donneur de dégâts principal. Évitez de disperser vos ressources sur trop de personnages. Arrêtez d'améliorer les personnages de départ au niveau 40.",
        guide_char_2: "<strong>Améliorations Garanties :</strong> Donnez toujours la priorité au niveau du personnage, au niveau de l'arme et aux niveaux de compétence. Évitez de dépenser trop d'énergie à farmer des cartouches (artéfacts) au début en raison du taux élevé d'aléatoire.",
        guide_char_3: "<strong>Priorité aux Bonus d'Ensemble :</strong> Concentrez-vous sur l'activation des bonus de set de 4 pièces de cartouche plutôt que de chasser des sous-statistiques parfaites au début, car les bonus d'ensemble agissent comme d'immenses multiplicateurs pour l'équipe.",
        guide_explor_title: "Exploration de Hethereau & Farm",
        guide_explor_1: "<strong>Vision d'Évaluateur :</strong> Utilisez fréquemment votre touche de Vision en ville pour révéler les anomalies cachées, les reflets de miroir ou les graffitis qui débloquent des coffres secrets à récompense élevée.",
        guide_explor_2: "<strong>La Maison de la Sorcière :</strong> Collectez et soumettez des oiseaux d'oracle. Atteignez le Niveau 3 de la Maison de la Sorcière pour afficher les icônes d'oiseaux sur votre mini-carte, rendant l'exploration beaucoup plus rapide.",
        guide_explor_3: "<strong>Armes de rang S gratuites :</strong> Cherchez et terminez des commissions d'anomalie 4 étoiles sur votre carte, qui garantissent des armes de rang S (Arcs) une fois terminées.",
        cal_title: "Calendrier des Événements & Versions",
        cal_subtitle: "Suivez les sorties de patchs, les bannières et les événements dans Neverness to Everness",
        modal_char_desc: "Résumé du Personnage",
        modal_best_build: "Meilleur Build",
        modal_gear_weapon_desc: "Fournit les meilleures statistiques de base et un bonus passif unique.",
        modal_gear_f2p_desc: "Facile à obtenir via les quêtes ou la synthèse.",
        modal_gear_cartridge_desc: "Active un puissant bonus d'ensemble de 4 pièces.",
        modal_gear_substats_desc: "Sous-statistiques",
        modal_synergy_story: "Synergie & Équipe",
        modal_team_partners: "Équipe recommandée :",
        modal_char_history: "Lore du Personnage :",
        footer_copyright: "&copy; 2026 Eibon Terminal. Tous droits réservés. Conçu pour la communauté de Neverness to Everness.",
        footer_disclaimer: "Ce site est une ressource de fans et n'est pas associé à Perfect World Games ou Hotta Studio. Tous les droits du jeu appartiennent à leurs propriétaires respectifs.",
        toast_code_copied: "Code copié dans le presse-papiers ! 📋",
        toast_codes_cleared: "Inventaire vidé !",
        toast_report_copied: "Rapport copié dans le presse-papiers !",
        toast_report_error: "Échec de la copie du rapport.",
        toast_welcome: "Bienvenue, ",
        toast_logged_out: "Déconnexion réussie.",
        toast_firebase_error: "Firebase Auth non connecté !",
        toast_save_success: "Tier list publiée avec succès ! 🎉",
        toast_save_error: "Échec de la sauvegarde : ",
        role_main_dps: "DPS Principal",
        role_sub_dps: "Sub-DPS",
        role_support: "Soutien",
        attr_anima: "Anima",
        attr_incant: "Incantation",
        attr_cosmos: "Cosmos",
        attr_chaos: "Chaos",
        attr_psyche: "Psyché",
        attr_lakshana: "Lakshana",
        loading_text: "Loading data...",
        teams_no_synergy: "Sélectionnez des personnages pour démarrer l'analyse de synergie.",
        teams_synergy_placeholder: "Ajoutez des chasseurs dans les emplacements ci-dessus. Le système analysera automatiquement leurs classes, éléments et suggérera une rotation optimale des compétences pour le combat.",
        teams_slot_2: "Slot 2",
        teams_slot_3: "Slot 3",
        teams_slot_4: "Slot 4",
        creator_title_placeholder: "ex: Ma Tier List v1.0",
        ad_placeholder: "PUBLICITÉ",
        guides_search_placeholder: "Rechercher des guides par titre, tag ou description...",
        guides_filter_all: "Tous les Guides",
        guides_filter_featured: "Recommandés",
        guides_filter_builds: "Builds de Personnages",
        guides_filter_teams: "Compositions d'Équipe",
        guides_filter_beginner: "Progression Débutant",
        guides_filter_farming: "Routes de Farm",
        guides_filter_systems: "Systèmes de Jeu",
        guides_filter_meta: "Analyse de la Méta",
        guides_difficulty_label: "Difficulté :",
        guides_updated_label: "Mis à jour :",
        guides_recently_updated: "Nouveau",
        guides_read_btn: "Lire le Guide",
        guides_references_title: "Sources & Références :",
        guides_recommended_teams: "Personnages recommandés :",
        guides_progression_tips: "Conseils de progression :",
        guides_difficulty_easy: "Facile",
        guides_difficulty_medium: "Moyen",
        guides_difficulty_hard: "Difficile",
        guides_custom_builder_btn: "Constructeur d'Équipe",
        guides_view_presets_btn: "Compositions d'Équipe Prédéfinies",
        map_filters_title: "Filtres de Carte",
        show_all: "Tout afficher",
        hide_all: "Tout masquer",
        map_detail_title: "Détails du Lieu",
        map_detail_placeholder: "Cliquez sur un marqueur sur la carte pour voir les informations de butin et les personnages recommandés.",
        guides_no_found: "Aucun guide trouvé.",
        guides_view_build: "Voir le Build",
        guides_customize_team: "Personnaliser cette équipe dans le constructeur",
        guides_build_title_prefix: "Build de Personnage : ",
        guides_build_subtitle_prefix: "Guide de Build : ",
        guides_build_default_desc: "Analyse complète des statistiques, armes et configurations de cartouches."
    }
};