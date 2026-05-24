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
                    text: "Для покращення мисливців вище 20/40/50 рівнів потрібні унікальні трофеї зі світових босів (наприклад, Вершник без голови або Серенетті). Витрата енергії становить 40 одиниць за кожен збір.",
                    textEn: "To upgrade hunters past levels 20/40/50, you need unique trophies from world bosses (e.g. Headless Rider or Serenetti). Energy cost is 40 per collection."
                }
            ]
        },
        references: ["https://reddit.com/r/NevernessToEverness", "https://nevernesstoeverness.fandom.com"],
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
                    textEn: "• <strong>Mint:</strong> Main DPS, quick auto-attacks and combos.<br>• <strong>Zero:</strong> Support/Cosmos, cooldown acceleration and catalyst.<br>• <strong>Edgar:</strong> Healer, health recovery and squad survival.<br>• <strong>Haniel:</strong> Support/Buffer, ATK buffing helper Hootie."
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
    },
    {
        id: "guide-team-remora-crit",
        title: "Команда 'Критичний Шторм' (Remora Critical Setup)",
        titleEn: "Team 'Critical Storm' (Remora Crit Boost)",
        description: "Високопродуктивний загін, заснований на реакції Remora (Космос + Лакшана) для радикального підвищення шансу критичного удару.",
        descriptionEn: "High-performance team based on Remora reaction (Cosmos + Lakshana) to radically boost Crit Rate and physical damage.",
        category: "teams",
        isFeatured: false,
        difficulty: "Hard",
        difficultyEn: "Hard",
        updateDate: "2026-05-24",
        tags: ["Teams", "Meta", "Remora", "Critical"],
        tagsEn: ["Teams", "Meta", "Remora", "Critical"],
        avatar: "👥",
        content: {
            sections: [
                {
                    title: "Склад загону (Squad Composition)",
                    titleEn: "Squad Composition",
                    text: "• <strong>Хатор (Hathor):</strong> Головний ДПС стихії Лакшана, вибухова шкода.<br>• <strong>Скіа (Skia):</strong> Саб-ДПС, накладання міток тіні та швидкі атаки.<br>• <strong>Зеро (Zero):</strong> Саппорт/Космос, активатор реакції Ремора та прискорювач.<br>• <strong>Едгар (Edgar):</strong> Цілитель, стабільне виживання загону.",
                    textEn: "• <strong>Hathor:</strong> Main DPS of Lakshana element, massive burst.<br>• <strong>Skia:</strong> Sub-DPS, shadow stealth and mark applications.<br>• <strong>Zero:</strong> Support/Cosmos, catalyst for Remora and CD acceleration.<br>• <strong>Edgar:</strong> Healer, reliable survival support."
                },
                {
                    title: "Бойова ротація (Skill Rotation)",
                    titleEn: "Combat Rotation",
                    text: "1. Почніть зі <strong>Скіа</strong>: накладіть мітки Fang Thrust із прихованості.<br>2. Перейдіть на <strong>Зеро</strong> та активуйте його Космос-поле для запуску реакції Ремора.<br>3. Використовуйте ультимейт <strong>Едгара</strong> для баффу та лікування.<br>4. Переключіться на <strong>Хатор</strong>, накопичте стаки доставки та виконайте нищівний вибух стихій.",
                    textEn: "1. Start with <strong>Skia</strong>: apply shadow Fang Thrust marks from stealth.<br>2. Swap to <strong>Zero</strong> and activate Cosmos field to trigger Remora reaction.<br>3. Deploy <strong>Edgar's</strong> ultimate zone for healing and energy buffs.<br>4. Switch to <strong>Hathor</strong>, stack up delivery power, and execute her devastating Ultimate Burst."
                }
            ]
        },
        references: ["https://reddit.com/r/NevernessToEverness", "https://nevernesstoeverness.fandom.com"],
        recommendedTeams: ["hathor", "skia", "zero", "edgar"],
        progressionTips: [
            "Реакція Ремора збільшує шанс критичного удару всього загону на 10%.",
            "Скіа наносить значно більше шкоди по ворогах, на яких є мітки від її тіней.",
            "Слідкуйте за накопиченням стаків Hathor перед перемиканням для максимального критичного удару.",
            "Намагайтеся координувати відкати навичок для синхронної активації Ремори."
        ],
        progressionTipsEn: [
            "The Remora reaction grants a flat +10% Crit Rate boost to all team members.",
            "Skia deals significantly increased damage to targets marked by her shadow attacks.",
            "Monitor Hathor's delivery stacks carefully before switching to maximize critical burst.",
            "Coordinate skill cooldowns to ensure synchronized activation of the Remora reaction."
        ]
    },
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
];

