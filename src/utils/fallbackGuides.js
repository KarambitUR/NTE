// 2. HARDCODED FALLBACK GUIDES (used when Firestore and cache are unavailable)
export const FALLBACK_GUIDES = [
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
                    text: "Кав'ярня — це не просто пасивний прибуток, а й джерело цінного контенту. Обов'язково розвивайте її: на 18-му рівні City Tycoon ви безкоштовно отримаєте чудового атакуючого персонажа Чіз (Chiz), а на 21-му рівні — її кращу сигнатурну зброю!",
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
        references: ["https://reddit.com/r/NevernessToEverness", "https://wiki.nevernesstoeverness.com"],
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
                    text: "Сувої навичок падають в Anomaly Pilgrimage. Зверніть увагу, що тип сувою залежить від дня тижня. Плануйте витрати витривалості заздалегідь.",
                    textEn: "Skill scrolls drop in Anomaly Pilgrimage. Note that the scroll type depends on the day of the week. Plan your stamina usage in advance."
                },
                {
                    title: "3. Матеріали прориву з Босів",
                    titleEn: "3. Boss Breakthrough Materials",
                    text: "Для покращення мисливців вище 20/40/50 рівнів потрібні унікальні трофеї зі світових босів (наприклад, Лялька або Шестерня). Витрата енергії становить 40 одиниць за кожен збір.",
                    textEn: "To upgrade hunters past levels 20/40/50, you need unique trophies from world bosses (e.g. Doll or Gear). Energy cost is 40 per collection."
                }
            ]
        },
        references: ["https://reddit.com/r/NevernessToEverness", "https://wiki.nevernesstoeverness.com"],
        recommendedTeams: ["zero", "sakiri", "nanally", "daffodil"],
        progressionTips: [
            "Використовуйте густу енергію (Condensed Energy) для подвоєння нагород з босів.",
            "Фарміть щотижневих босів аномалій рівно 3 рази на тиждень."
        ],
        progressionTipsEn: [
            "Use Condensed Energy to double rewards from bosses.",
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
                    text: "Активується при поєднанні двох атак стихії Аніми. Створює вибухові квіти, які наносять періодичну АоЕ шкоду та стягують дрібних ворогів. Основна реакція для зв'язки Наналлі + Цзююань.",
                    textEn: "Triggered by combining two Anima attacks. Spawns explosive blooms that deal periodic AoE damage and pull small enemies. The primary reaction for Nanally + Jiuyuan combo."
                },
                {
                    title: "2. Esper Cycle (Цикл Есперів) - Cosmos + Будь-яка стихія",
                    titleEn: "2. Esper Cycle - Cosmos + Any Element",
                    text: "Унікальна реакція елемента Космосу. Зменшує час перезарядки навичок всієї команди на 25% та відновлює енергію вибуху стихій. Зеро та Хоторі — ключові активатори цієї реакції.",
                    textEn: "A unique reaction of the Cosmos element. Decreases skill cooldowns of the entire team by 25% and restores ultimate energy. Zero and Hotori are key activators for this."
                },
                {
                    title: "3. Scorch (Випалювання) - Anima + Incantation",
                    titleEn: "3. Scorch - Anima + Incantation",
                    text: "Комбінація вітру та вогняних заклять. Накладає ефект горіння, який ігнорує 15% захисту ворога і наносить постійну шкоду.",
                    textEn: "Combination of wind and fire incantations. Applies a burning effect that ignores 15% of the enemy defense and inflicts damage over time."
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
                    text: "Сакірі незамінна в будь-якій команді. Її стяжка є найсильнішою в грі, а пасивне зниження супротиву стихій на 30% збільшує шкоду будь-якого Main Carry.",
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
        references: ["https://reddit.com/r/NevernessToEverness"],
        recommendedTeams: ["nanally", "jiuyuan", "sakiri", "zero"],
        progressionTips: [
            "Намагайтеся підтримувати щит Зеро активним весь час.",
            "Використовуйте Ultimate Сакірі строго перед виходом Наналлі."
        ],
        progressionTipsEn: [
            "Try to keep Zero's shield active at all times.",
            "Use Sakiri's Ultimate strictly before swapping to Nanally."
        ]
    }
];
