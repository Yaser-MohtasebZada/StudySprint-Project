# StudySprint

A Pomodoro study app for focused work sessions. Run focus and break timers, keep a task list with drag-and-drop, and track how many sessions you finish each day. No account needed: everything stays in your browser.

Built by Yaser Mohtasebzada and Aisha as a team project for CPSC 349 (Front-End Engineering) at Cal State Fullerton.

## Features

- **Pomodoro timer:** focus and break modes with start, pause, reset, and an alarm when time is up
- **Task list:** add, complete, and reorder tasks with drag and drop
- **Stats:** sessions completed today, total sessions, and a log of recent sessions
- **Settings:** custom focus and break lengths, light, dark, or system theme, and a reset for all saved data
- **Saves locally:** settings and session history persist in `localStorage`

## My part

I built the Stats and Settings pages, the `useSettings` and `useStats` hooks, dark mode with CSS variables, and the Vercel deployment. I also fixed a timer bug where pausing was unreliable: the interval read stale state, so I switched to tracking the running status with `useRef`.

## Tech stack

- React 19 with hooks and custom hooks
- React Router for page navigation
- `@hello-pangea/dnd` for drag and drop
- Vite and TypeScript config
- CSS variables for theming
- Deployed on Vercel

## Project structure

```
src/
├── TimerPage.jsx        # Pomodoro timer
├── TasksPage.jsx        # Drag-and-drop task list
├── StatsPage.jsx        # Session stats and log
├── SettingsPage.jsx     # Timer lengths, theme, clear data
├── LoginPage.jsx        # Placeholder (the app is designed to work without logins)
├── components/Navbar.jsx
└── hooks/
    ├── useSettings.jsx  # Settings and theme, saved to localStorage
    └── useStats.jsx     # Session history and stats
```

## Run it locally

```bash
git clone https://github.com/Yaser-MohtasebZada/StudySprint-Project.git
cd StudySprint-Project
npm install
npm run dev
```

## What I'd add next

- Daily streaks and a weekly chart on the Stats page
- Browser notifications when a session ends
- Link sessions to specific tasks
