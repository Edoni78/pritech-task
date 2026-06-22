# PRITECH React Native Technical Task

A simple, polished React Native app for managing personal tasks. Create tasks, mark them complete, search, filter, and view details — all stored locally on your device.

---

## Features

- Add tasks with title and description
- Edit existing tasks
- Mark tasks as completed or pending
- Delete tasks with confirmation
- Personalized home header with greeting and task count
- Floating action button to add tasks
- Statistics cards (Total / Done)
- Compact filter + sort dropdown layout
- Pull to refresh for daily motivation quote
- Productivity score and completion streak
- Swipe left to delete, tap to open, long-press to edit
- Task details screen
- Live search by title (case-insensitive)
- Filter by All / Pending / Completed
- Sort by newest, oldest, or status
- Local persistence with AsyncStorage
- Motivational quote from a public API (with loading and offline fallback)
- Empty states, validation, and error handling

---

## Tech Stack

| Area | Choice |
|------|--------|
| Framework | React Native (Expo SDK 54) |
| Language | TypeScript |
| Navigation | React Navigation — Native Stack |
| Storage | AsyncStorage |
| State | React Context + hooks (no Redux) |
| Public API | [Quotable](https://api.quotable.io/random) |

---

## Running Locally

### 1 — Prerequisites

- **Node.js 18+** — [nodejs.org](https://nodejs.org)
- **Expo Go** installed on your phone:
  - iOS → [App Store](https://apps.apple.com/app/expo-go/id982107779)
  - Android → [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

> Make sure Expo Go is **up to date**. This project uses Expo SDK 54.

---

### 2 — Install dependencies

```bash
npm install
```

---

### 3 — Start the dev server

```bash
npx expo start
```

A QR code will appear in the terminal.

---

### 4 — Open on your phone

| Platform | Steps |
|----------|-------|
| **Android** | Open Expo Go → tap **Scan QR Code** → scan the terminal QR |
| **iOS** | Open the Camera app → point at the QR → tap the Expo Go banner |

> Do **not** open `http://localhost:8081` in a desktop browser — that URL only shows the JSON manifest, not the app.

---

### Optional — run on a simulator

```bash
# Android emulator (requires Android Studio)
npx expo start --android

# iOS simulator (macOS + Xcode only)
npx expo start --ios
```

---

## Project Structure

```
pritech-task/
├── App.tsx                     Entry point — providers + navigation
├── index.js                    Expo app registration
├── src/
│   ├── components/
│   │   ├── Button.tsx          Primary / outline / danger button
│   │   ├── EmptyState.tsx      Empty list and no-results states
│   │   ├── FilterTabs.tsx      All / Pending / Completed tabs
│   │   ├── QuoteCard.tsx       Motivational quote display
│   │   ├── SortTabs.tsx        Newest / Oldest / Status sort
│   │   ├── StatusBadge.tsx     Completed / Pending badge
│   │   ├── SwipeableTaskCard.tsx Swipe-to-delete wrapper
│   │   ├── TaskForm.tsx        Shared add/edit form
│   │   ├── TaskCard.tsx        Task list item card
│   │   └── TextInputField.tsx  Labeled input with error message
│   ├── constants/
│   │   ├── colors.ts           Design tokens
│   │   └── storage.ts          AsyncStorage key
│   ├── context/
│   │   └── TasksContext.tsx    Global task state + CRUD operations
│   ├── hooks/
│   │   ├── useQuote.ts         Custom hook for quote API
│   │   └── useTaskForm.ts      Shared form state for add/edit
│   ├── navigation/
│   │   ├── AppNavigator.tsx    Stack navigator
│   │   └── types.ts            Route param types
│   ├── screens/
│   │   ├── AddTaskScreen.tsx
│   │   ├── EditTaskScreen.tsx
│   │   ├── TaskDetailsScreen.tsx
│   │   └── TaskListScreen.tsx
│   ├── services/
│   │   ├── quoteApi.ts         Quotable API fetch + validation
│   │   └── taskStorage.ts      AsyncStorage read/write
│   ├── types/
│   │   └── task.ts             Task, TaskFilter, form types
│   └── utils/
│       ├── date.ts             Date formatting helper
│       ├── sortTasks.ts        Sort by date or status
│       ├── task.ts             Task factory
│       └── validation.ts       Form validation logic
```

---

## Public API

**Endpoint:** `GET https://api.quotable.io/random`

Fetched once when the Task List screen loads. Displays a motivational quote at the top of the list. If the request fails or times out, a fallback message is shown and the app continues working normally.

---

## Implementation Notes

- **Context over Redux** — `TasksContext` holds tasks in memory and syncs to AsyncStorage on every mutation. Simple and sufficient for this scope.
- **Storage separation** — `taskStorage.ts` owns all AsyncStorage logic. No screen touches storage directly.
- **API separation** — `quoteApi.ts` owns fetch logic and response validation. The `useQuote` hook owns the loading/error lifecycle.
- **Validation** — `validateTaskForm` runs via `useMemo` so it only re-executes when form values change, not on every render.
- **IDs** — `Date.now().toString()` — simple, unique, no extra dependency.

---

