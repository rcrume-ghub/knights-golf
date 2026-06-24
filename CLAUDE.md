# Knights Golf — Claude Code Context

## Environment & Connections
- GitHub MCP: fully working | username: rcrume-ghub
- Supabase MCP: fully working | username: rcrume-ghub
- Vercel: linked to GitHub, auto-deploys on push | username: rcrume-ghub
- Projects folder: ~/Projects

## Auto-Approved Commands (no prompting)
`npm install`, `npm run`, `npx`, `git add/commit/push/pull/checkout/clone`, `mkdir`, `cp`, `mv`, `claude mcp`

## How We Work (SOP — follow always)

### Workflow rules
- Never ask the user to run terminal commands, edit files, or touch any dashboard
- You manage GitHub, Supabase, and Vercel cradle to grave — cradle to grave means you handle everything
- Never ask the user to do something you can do yourself
- Always ask qualifying questions until 99.9% sure of the task before starting
- Always ask "Can I proceed?" and wait for a "yes" — never just start
- Never push or build until fully scoped
- Retrieve credentials automatically via MCP or local files — never ask the user to paste them
- If you need to expose something in the UI (e.g. a config value), build an in-app UI for it — never ask the user to manually edit a file
- Keep the user organized when you think wide — flag scope creep or risk when relevant

### Code rules
- No comments unless the WHY is non-obvious
- No error handling for scenarios that can't happen
- No features beyond what the task requires
- No backwards-compatibility hacks
- Never commit .env.local
- Never log secret values

### Approach
- Always be creative — bring a point of view, not just a solution
- If a better approach exists, proactively suggest it — even when not asked
- When suggesting an alternative, always offer the choice: "apply my suggestion" or "proceed with yours"

## What This App Is
Knight's AC Monday Night Golf League management PWA.
- 14 teams, 2 players each (A + B player per team)
- 9-hole format, par 36, blind score 39, max handicap 18
- 7 matchups per week, 20-week season
- Points: 1pt A-vs-A win, 1pt B-vs-B win, 1pt team total (3 pts max per matchup), ties = 0.5 each
- Handicap: average of all differentials from par (gross − 36), capped at 18
- Commissioner PIN (SHA-256 hashed, stored in IndexedDB) protects admin screens
- Anyone can enter scores — no login required for regular users

## Tech Stack
| Layer | What |
|-------|------|
| Frontend | React 18 + Vite 5 PWA |
| Storage | IndexedDB via `idb` — 100% local, no server |
| Auth | Local commissioner PIN (SHA-256) |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| Excel import | SheetJS (in-browser, no CLI) |
| PWA | vite-plugin-pwa + Workbox |
| Hosting | Vercel (free) |

## Key Architectural Decisions
- **Local-first**: All data in IndexedDB. No accounts. No external services.
- **`src/lib/store.js`** is the only layer pages talk to — designed to swap for Supabase later without touching components
- **`src/lib/db.js`** owns the IndexedDB schema (DB_VERSION=2)
- **Remote sync is dormant**: `supabase.remote.js` and `sync.remote.js` are kept but inactive — one-file swap to enable later
- First run shows `Setup.jsx` which parses the .xlsx in-browser and seeds IndexedDB

## Project Structure
```
knights-golf/
├── src/
│   ├── lib/
│   │   ├── db.js                  IndexedDB schema + helpers
│   │   ├── store.js               Data layer (all components use this)
│   │   ├── handicap.js            Handicap + match scoring logic
│   │   ├── supabase.remote.js     Future remote (inactive)
│   │   └── sync.remote.js         Future sync queue (inactive)
│   ├── hooks/
│   │   ├── useAuth.jsx            Local PIN auth context
│   │   └── useSync.js             Stub — reserved for future remote sync
│   ├── components/
│   │   └── Layout.jsx             App shell + bottom nav
│   └── pages/
│       ├── Setup.jsx              First-run .xlsx import screen
│       ├── ScoreEntry.jsx         Weekly score entry (live net + points calc)
│       ├── Standings.jsx          Season leaderboard
│       ├── Schedule.jsx           Schedule + roster by week
│       ├── Handicaps.jsx          Per-player score history + handicap
│       ├── More.jsx               Commissioner unlock + admin nav
│       ├── Login.jsx              PIN modal (set + enter)
│       └── admin/
│           ├── Dues.jsx           Dues tracker (paid/unpaid toggle)
│           ├── SubList.jsx        Substitute pool management
│           └── HandicapCalc.jsx   Rebuild all handicaps from gross scores
├── supabase/
│   └── schema.sql                 PostgreSQL schema (future remote sync reference)
├── CLAUDE.md                      This file
├── README.md                      Setup + deploy guide
└── .env.example                   Env vars (only needed for remote sync)
```

## IndexedDB Stores (db.js — DB_VERSION=2)
`seasons`, `players`, `teams`, `team_players`, `weeks`, `matchups`, `scores`, `handicaps`, `dues`, `free_rounds`, `settings`

## Current Status
- Full codebase written and build verified (vite build succeeds, 51 modules)
- PWA service worker + manifest generated
- **Not yet pushed to GitHub** — that is the immediate next task
- Vercel will auto-deploy once pushed

## Immediate Next Task
1. Create public GitHub repo `knights-golf` under `rcrume-ghub`
2. Push this folder to `main`
3. Confirm Vercel auto-deploy fired and get the live URL
4. Share the URL so the user can review the UI and give feedback

## Future Work (post-launch)
- UI/UX feedback pass based on user review
- Remote sync: Supabase multi-device support (architecture already prepped)
- Potentially: native mobile app wrapper (Capacitor) for App Store distribution
