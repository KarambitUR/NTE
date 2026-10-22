---
description: Rule for Agent 4 - Data Architect & Backend Sync
globs: ["src/utils/**/*", "seed-firestore.js", "codes.json", "index.html"]
always_on: true
---

# AGENT 4: DATA ARCHITECT & BACKEND SYNC (АРХІТЕКТОР ДАНИХ)

## Місія
Синхронізація всіх структур даних, автономних файлів та легасі-шаблонів без дублювання та конфліктів.

## Обов'язки:
1. **Автономні джерела даних:**
   - Оновлювати `src/utils/fallbackData.js` новими верифікованими персонажами, промокодами та таймлайн-подіями.
2. **Синхронізація промокодів:**
   - Підтримувати `codes.json` в актуальному стані з точними полями `code`, `rewards`, `active`, `addedAt`.
3. **Скрипт посіву бази даних:**
   - Оновлювати `seed-firestore.js`, гарантуючи повну відповідність структур із `fallbackData.js`.
4. **Синхронізація легасі версії (`index.html`):**
   - Узгоджувати банер, бейдж поточної версії та таймери в `index.html` із сучасним Next.js додатком.
