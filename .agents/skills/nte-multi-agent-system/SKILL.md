---
name: nte-multi-agent-system
description: Multi-agent system orchestration skill for Neverness to Everness (NTE) portal updates, auditing, and data synchronization.
---

# NTE Multi-Agent System Skill

Цей скіл керує оркестрацією мультиагентного циклу оновлення порталу "Eibon Terminal".

## Порядок запуску пайплайну:
1. **Фаза 1: Розвідка та Фактчекінг**
   - Виклик Агента 2 (Web Intel) -> формування Truth Sheet.
   - Валідація Агентом 1 (Lead Supervisor) -> верифікація джерел, заборона вигадок, перевірка правила заборони генерації картинок.
2. **Фаза 2: Синхронізація баз даних**
   - Агент 4 (Data Architect) оновлює `src/utils/fallbackData.js`, `codes.json`, `seed-firestore.js`, `index.html`.
3. **Фаза 3: Оновлення фронтенду**
   - Агент 3 (Core Frontend Engineer) оновлює `app/page.js`, `app/calendar/page.js`, `app/tierlist/page.js`, перевіряє розмітку та таймери.
4. **Фаза 4: Локалізація та QA**
   - Агент 5 (Localization & QA) додає ключі UK/EN/FR у `src/localization/translations.js`, валідує активи, проганяє білд.
5. **Фаза 5: Фінальне рев'ю**
   - Агент 1 (Lead Supervisor) перевіряє `git diff`, складає фінальний звіт відповідності критеріям готовності.
