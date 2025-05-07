# Test task: “Task Flow Builder”

This project uses **React**, **TypeScript**, and **Vite** for fast and modern frontend development.

## 🔧 Tech Stack

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux](https://redux.js.org/) (with @reduxjs/toolkit)
- [React Flow](https://reactflow.dev/)
- [Vite](https://vitejs.dev/)

## 📦 Installation

```bash
pnpm install
```

## 🚀 Development

```bash
pnpm dev
```

## 🏗 Build

```bash
pnpm build
```

## 🔍 Preview Production Build

```bash
pnpm preview
```

Task description:
```
Вимоги:

Візуалізація задач:
Кожна задача — це блок (node) з назвою
Можна перетягувати блоки (drag&drop) вмежах області.

Додавання задач:
Кнопка "Add Task" створює нову ноду на полотні (React Flow)
Назву задачіможна редагувати в input полі прямо в ноді або в боковій панелі.

З'єднання задач:
Користувачможе зʼєднати задачіміж собою стрілками (edges).

Редагування задачі:
При кліку на блок відкривається бокова панель з інпутомдля редагування назви.

Збереження стану:
Використати Redux Toolkit для збереження списку задач та зв’язківміж ними.
(Опційно)
Збереження у localStorage, щоб після перезавантаження все зберігалось.

Технічні вимоги:
Структурувати компоненти логічно (наприклад: components/, store/,types/).
Використовувати useAppSelector, useAppDispatch для роботи з Redux.
Забезпечити типізацію за допомогою TypeScript.
Оформити проект мінімально, але охайно.

Стек технологій:
React
Redux Toolkit
React Flow
ТypeScript
(Опційно: styled-components / Tailwind / SCSS)

Що оцінюється:
Розуміння React/Redux архітектури.
Вміння працювати з бібліотекою React Flow.
Читабельність і структура коду.
TypeScript-типізація.
Робоча логіка з додаванням, редагуванням та з'єднанням нод.

Що здати:
Посилання на GitHub репозиторій.
Короткий опис, як запустити (README.md)
(Опційно) Демо через Vercel/Netlify.
```
