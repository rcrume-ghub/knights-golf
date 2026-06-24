# Knights Golf — Claude Code Context

## Environment & Connections
- GitHub MCP: fully working | username: rcrume-ghub
- Supabase MCP: fully working | username: rcrume-ghub
- Vercel: linked to GitHub, auto-deploys on push | username: rcrume-ghub
- Projects folder: ~/Projects
- Live URL: https://knights-golf.vercel.app

## Auto-Approved Commands (no prompting)
`npm install`, `npm run`, `npx`, `git add/commit/push/pull/checkout/clone`, `mkdir`, `cp`, `mv`, `claude mcp`

## How We Work (SOP — follow always)

### Workflow rules
- Never ask the user to run terminal commands, edit files, or touch any dashboard
- You manage GitHub, Supabase, and Vercel cradle to grave
- Never ask the user to do something you can do yourself
- Always ask qualifying questions until 99.9% sure of the task before starting
- Always ask "Can I proceed?" and wait for a "yes" — never just start
- Never push or build until fully scoped
- Retrieve credentials automatically via MCP or local files — never ask the user to paste them
- If you need to expose something in the UI, build an in-app UI for it
- Keep the user organized — flag scope creep or risk when relevant
- After every build: run `npm run build`, confirm it succeeds, then push + deploy to Vercel

### Code rules
- No comments unless the WHY is non-obvious
- No error handling for scenarios that can't happen
- No features beyond what the task requires
- No backwards-compatibility hacks
- Never commit .env.local
- Never log secret values

### Approach
- Always be creative — bring a point of view, not just a solution
- If a better approach exists, proactively suggest it
- When suggesting an alternative, offer the choice: "apply my suggestion" or "proceed with yours"

---

## What This App Is
Knight's AC Monday Night Golf League management PWA — replaces all spreadsheets.
- Variable teams (default 14), 2 players each (A + B per team)
- 9-hole format, par 36, blind score 39, max handicap 18
- 7 matchups per week (scales with team count)
- Points: 1pt A-vs-A win, 1pt B-vs-B win, 1pt team total (3 pts max), ties = 0.5
- Handicap: average of all differentials from par (gross − par), capped at max_handicap
- A player = lower handicap of the two on a team (auto-assigned, recalculates when HCP changes)
- Commissioner PIN (SHA-256, IndexedDB) protects admin screens
- Anyone can enter scores — no login for regular users

---

## Full Feature Spec (approved — build against this)

### 1. Home / Season Landing Page
- **Current season card** — name, week progress, standings snapshot
- **Past seasons list** — read-only archive cards, tap to view
- **New Season button** (commissioner only)
- No bottom-nav "Home" tab needed — this IS the app root (`/`)

### 2. Season Setup — New Season Wizard
When creating a new season the wizard collects:
- Season name
- Night of the week the league plays (Monday, Tuesday, etc.)
- First date of the season (date picker)
- Number of weeks in the full season
- Bye weeks — multi-date picker to flag weeks with no golf
- Position Night dates — multi-date picker for position nights throughout schedule
- Par, blind score, max handicap

**"Copy from previous season" flow** (if a prior season exists):
1. Pull prior season's teams + roster
2. Show each team for confirmation — mark as Confirmed / Needs Change
3. For any team with a dropped player: select replacement from Sub List or add a new player
4. Allow adding or removing teams before finalizing
5. Carry over each player's end-of-season handicap as the new season's starting HCP

### 3. Roster Management (per season)
Fields per player:
- First name, Last name
- Email address
- Phone number
- Previous Season HCP (read-only, carried over from prior season's final HCP)
- Current HCP (editable manual override; auto-recalculates from scores once season starts)

Team rules:
- Each team has a number and two players
- A player = player with the lower handicap (auto-assigned; updates when HCP changes)
- B player = the other

**Import template** (CSV upload, in-browser parsing — no server):
- Columns: First Name, Last Name, Email, Phone, Current HCP
- Imports players into the roster pool; does not auto-assign to teams
- Downloadable blank template CSV from the import screen

### 4. Schedule Management (per season)
Auto-generated from wizard inputs:
- Produces week-by-week schedule (date, week number, type)
- Week types: Regular, Position Night, Bye (no golf), Scramble, End Scramble
- Bye and Position Night dates come from wizard inputs
- Commissioner can manually override any week's date or type after generation
- Round-robin matchup generation: each team pair plays once before repeating
  - 14 teams = 13 unique rounds; weeks 14–20 cycle back through rounds 1–7

### 5. Score Entry (per season, weekly)
- On load: auto-selects the **current active week**
  - Active week = today's date matches the league night OR is within 3 days before it
  - If all scores are entered for the current week AND today ≠ league night → show next week's blank card ready for entry
- **Week dropdown** at top of page — select any past week to view/edit its scores
- Per-matchup cards: home vs. away, A and B player slots
- Each player slot: gross score input + Blind checkbox
- Live net score display and win/loss/tie coloring
- Match point summary per matchup
- Save button — upserts all scores for the week

### 6. Season Stats Tab
Displayed per active (or selected) season:
- **Team Standings** — rank, team number, players, total points, W/L/T record
- **Top 5 Team Leaders** — points leaderboard
- **Individual Leaders:**
  - Lowest gross score (single round, no HCP)
  - Lowest net score (single round, with HCP)
  - Most points (individual, across all matchups)
  - Best record (individual win %)
- **Season averages** — avg gross per player, avg net, field avg
- **Handicap tracker** — current HCP per player with trend arrow vs. start of season

### 7. Dues Tracker (per season)
- List of all rostered players
- Per player: paid (yes/no toggle), amount, date paid
- Quick summary: X of Y paid, total collected
- Commissioners only

### 8. Sub List (global — carries across all seasons)
- Players marked `is_sub = true` in the players store
- Sub list is not season-specific — same pool appears every season
- Fields: name, phone, email, HCP, availability notes
- Commissioner can promote a sub to a full roster spot during season setup or mid-season

---

## Navigation Structure (bottom tabs)
```
Home (/) | Scores | Stats | More
```
- **Home** — season landing (current + past seasons + new season)
- **Scores** — weekly score entry for active season
- **Stats** — season stats for active season (replaces old Standings tab)
- **More** — Handicaps, Schedule, Seasons, Commissioner section

Commissioner section in More (admin unlocked):
- Teams & Players
- Schedule Setup
- Dues Tracker
- Sub List
- Recalculate Handicaps

---

## Tech Stack
| Layer | What |
|-------|------|
| Frontend | React 18 + Vite 5 PWA |
| Storage | IndexedDB via `idb` — 100% local, no server |
| Auth | Local commissioner PIN (SHA-256) |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| CSV import | Papa Parse (in-browser) |
| PWA | vite-plugin-pwa + Workbox |
| Hosting | Vercel (free) |

> SheetJS (xlsx) has been removed. CSV import uses Papa Parse.

---

## Key Architectural Decisions
- **Local-first**: All data in IndexedDB. No accounts. No external services.
- **`src/lib/store.js`** is the only layer pages talk to — swap for Supabase later without touching components
- **`src/lib/db.js`** owns the IndexedDB schema (DB_VERSION — bump on every schema change)
- **Remote sync is dormant**: `supabase.remote.js` and `sync.remote.js` kept but inactive
- A/B player assignment is computed at render time from current HCPs — not stored as a fixed slot

---

## IndexedDB Stores (current — bump DB_VERSION on schema changes)
| Store | Key fields |
|-------|-----------|
| `seasons` | id, name, start_date, weeks, par, blind_score, max_handicap, league_night, is_active |
| `players` | id, first_name, last_name, email, phone, is_sub, notes |
| `teams` | id, season_id, number, name |
| `team_players` | id, team_id, player_id (slot A/B computed from HCP at render) |
| `weeks` | id, season_id, number, date, week_type (regular/position_night/scramble/end_scramble/bye) |
| `matchups` | id, week_id, home_team_id, away_team_id, hole_assignment |
| `scores` | id, matchup_id, player_id, gross, is_blind, updated_at |
| `handicaps` | id, player_id, season_id, week_id, value, calculated_at |
| `season_handicap_start` | id, player_id, season_id, value (previous-season HCP carried in) |
| `dues` | id, player_id, season_id, paid, amount, paid_date |
| `free_rounds` | id, player_id, season_id |
| `settings` | id (key), value |

---

## Current Status
- Home landing page: NOT YET BUILT (next task)
- Season wizard with copy-from-previous: NOT YET BUILT
- Roster management (full player fields + import): NOT YET BUILT
- Score entry (current-week auto-select, week dropdown): PARTIALLY BUILT
- Season Stats tab: NOT YET BUILT
- Dues tracker: basic version exists, needs amount/date fields
- Sub list: basic version exists, needs cross-season persistence fix
- Bottom nav: needs restructuring to Home / Scores / Stats / More

## Immediate Next Task
Build all features in the approved spec above. Start with:
1. DB schema bump (add missing fields, new stores)
2. Bottom nav restructure
3. Home landing page
4. New season wizard (with copy-from-previous flow)
5. Roster management + CSV import
6. Score entry improvements (auto-week, dropdown)
7. Season Stats tab
8. Dues + Sub List polish

## Future Work
- Remote sync: Supabase multi-device support (architecture prepped)
- Native mobile wrapper (Capacitor) for App Store distribution
