# Landing page for college hackathon

Лендинг на **Next.js (App Router)** и **Feature-Sliced Design**. Макет: [Figma](https://www.figma.com/design/SIfWeJlmJBv7OsL8gbEhaA/Landing-page-for-college-hackathon).

## Структура

Всё приложение живёт в **`src/`**: один каталог **`src/app`** — только маршруты Next (`layout.tsx`, `page.tsx`). Глобальные стили — в **`src/shared/styles`** (слой shared по FSD).

Слой **pages** в терминах FSD здесь назван **`screens`**: папка `src/pages` зарезервирована под [Pages Router](https://nextjs.org/docs/app/building-your-application/routing) в Next.js, поэтому композиция экранов — в `src/screens/…`.

```
src/
├── app/                 # Next.js App Router (корневой layout и page)
├── screens/             # экраны (аналог слоя pages в FSD): home, …
├── widgets/
├── features/
└── shared/
    ├── styles/          # globals.css, theme, анимации
    └── lib/
```

Импорты: алиас `@/*` → `src/*`.

## Запуск

```bash
npm install
npm run dev
```

Сборка: `npm run build`, прод: `npm start`.
