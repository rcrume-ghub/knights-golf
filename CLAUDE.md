# Knights Golf — Claude Code Context

## Environment & Connections
- GitHub MCP: fully working | username: rcrume-ghub
- Supabase MCP: fully working | username: rcrume-ghub
- Vercel: deploy via `vercel --prod` from ~/Projects/knights-golf | username: rcrume-ghub
- Projects folder: ~/Projects
- Live URL: https://knights-golf.vercel.app

## Auto-Approved Commands (no prompting)
`npm install`, `npm run`, `npx`, `git add/commit/push/pull/checkout/clone`, `mkdir`, `cp`, `mv`, `claude mcp`, `vercel --prod`

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
- After every build: run `npm run build`, confirm it succeeds, then `git push` and `vercel --prod`

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
Knight's AC Monday Night Golf League management PWA — replaces all spreadsheets entirely.
- Variable teams per season (2026 = 14 teams, 2025 = 18 teams)
- 2 players per team, A + B determined by lower HCP (auto-computed, not a fixed slot)
- 9-hole format, par 36, blind score 39, max handicap 18 (configurable per season)
- Points: 1pt A-vs-A win, 1pt B-vs-B win, 1pt team total (3 pts max per matchup), ties = 0.5
- Handicap: average of all differentials from par (gross − par), capped at max_handicap
- Commissioner PIN (SHA-256, IndexedDB) protects admin screens
- Anyone can enter scores — no login for regular users

---

## Full Feature Spec (final — approved — build against this)

### Player Status
Three status values — replaces old `is_sub` boolean:
- **Active** — on a rostered team this season
- **Sub** — in global sub pool; available to fill in; not on a team
- **Deactivated** — no longer playing; hidden from active views; record preserved
- Players who played a prior season but did not carry onto a team in the new season → **Sub** (not Deactivated)

### 1. Home / Season Landing Page (app root `/`)
- **Active season card** — name, week X of Y progress bar, live top-3 standings
- **Past seasons list** — archived cards (read-only); tap to browse that season
- **New Season button** (commissioner only) — launches the New Season Wizard
- This replaces the old Setup.jsx first-run screen after the first season exists

### 2. New Season Wizard (commissioner only)
Step 1 — Season Details:
- Season name (e.g. "2027 Season")
- Night of the week the league plays (Mon/Tue/Wed/Thu/Fri — determines date generation)
- First date of the season (date picker)
- Number of weeks in the full season
- Par, blind score, max handicap

Step 2 — Schedule Configuration:
- Bye weeks — multi-date picker; these weeks get type = "bye" and no matchups
- Position Night dates — multi-date picker; these weeks get type = "position_night"
- (Other week types — scramble, end_scramble — set manually per week after generation)
- Auto-generate the full schedule on confirm

Step 3 — "Copy from previous season?" (shown if a prior season exists):
- Pull prior season's teams and roster
- Display each team card: team #, player A name, player B name, both HCPs
- Each team has status: ✓ Confirmed | ⚠ Needs Change
- "Needs Change" flow: drop a player → pick replacement from Sub List OR add a new player
- Add new teams (beyond prior count) or remove teams before finalizing
- On finalize: each player's end-of-season HCP from the prior season seeds their `prev_season_hcp` for the new season

### 3. Roster Management (per season, commissioner)
Player record fields:
- First name, Last name
- Email
- Phone
- Status: Active | Sub | Deactivated
- Previous Season HCP (read-only — carried from prior season's final calculated HCP)
- Current HCP (editable manual override; auto-recalculates from entered scores once season starts)

Team assignment:
- Each team: number + optional name
- 2 players linked per team
- A player = lower HCP at render time (auto, not stored)
- B player = the other

**CSV Import (in-app template + upload):**
- Downloadable blank CSV template always available in the Roster screen
- Columns: First Name, Last Name, Email, Phone, Current HCP, Status
- Upload populates the player pool; does not auto-assign to teams
- Papa Parse used for CSV parsing (no SheetJS for this flow)

**Excel Import (historical season + current data):**
- SheetJS used to parse .xlsx uploads
- Two import modes:
  1. **Current Season Import** — reads `2026 - HDCP` sheet: extracts teams, players, current HCP, prior HCP, week-by-week scores
  2. **Historical Season Import** — reads HDCP sheet from an older file: creates a locked past-season record with teams, players, scores, and final HCPs

**Pre-seeded data (built into the app — no upload needed for first load):**
The following data is extracted from `Knights Golf_New_v3.xlsx` and seeded into IndexedDB on first run:
- 2026 season: 14 teams, 28 active players, current + 2025 HCPs, weeks 1–7 scores
- Sub list: ~72 subs with HCPs; phone numbers cross-referenced from 2023 sub list sheet
- 2025 season: 18 teams, 35 players, full-season scores (historical, read-only)
- Players who appeared in 2025 but not on a 2026 team → status = Sub

Name parsing from Excel: split on last space → first_name + last_name.
Edge cases: "Hooper" (Team 7, 2026) → first_name="", last_name="Hooper" — user fills in app.
Skip rows where name is "BOZO", "SubList", or blank.

### 4. Schedule Management (per season, commissioner)
- Auto-generated by the New Season Wizard
- Produces a week record per week: number, date, type
- Week types: regular | position_night | scramble | end_scramble | bye
- Commissioner can override any week's date or type after generation in Schedule Setup screen
- Round-robin matchup generation:
  - Even N teams: standard polygon rotation, N−1 unique rounds
  - 14 teams = 13 unique rounds; weeks 14+ cycle back through rounds 1–N
  - Bye weeks get no matchups generated
- Hole assignments: matchups 1–7 assigned holes 1–7 sequentially

### 5. Score Entry (active season)
- Auto-selects the **current active week** on load:
  - Active week = the week whose date matches the league night or is within 3 days before it
  - If all scores entered for current week AND today ≠ league night → auto-advance to next week's blank card, ready for entry
- **Week dropdown** at top — select any past week to view or edit its scores
- Per-matchup cards: home vs. away, A and B player slots
- Each slot: gross score input + Blind checkbox
- Live net score and win/loss/tie coloring per slot
- Match points summary footer
- Save button — upserts all scores for the selected week

### 6. Season Stats Tab (replaces old Standings tab)
Scoped to the active season (or a selected past season):
- **Team Standings** — rank, team #, team name, players, total points, W/L/T record
- **Top 5 Team Leaders** — points leaderboard with sparkline trend
- **Individual Leaders:**
  - Lowest single-round gross score
  - Lowest single-round net score (gross − HCP)
  - Most individual match points (season total)
  - Best individual win percentage
- **Season Averages** — avg gross, avg net, field avg per week
- **HCP Tracker** — current HCP per player with trend arrow vs. season-start HCP

### 7. Dues Tracker (per season, commissioner)
- All rostered Active players listed
- Per player: paid toggle, amount ($), date paid
- Summary bar: X of Y paid · $Z collected
- Unpaid players sorted to top

### 8. Sub List (global — all seasons)
- Players with status = Sub pulled from global player pool
- Fields shown: name, phone, email, HCP, status, notes
- Commissioner can:
  - Add a new sub directly
  - Promote sub to Active (assigns to a team slot)
  - Deactivate a sub
- Sub list is not season-scoped — same pool visible everywhere

---

## Navigation Structure (bottom tabs — 4 tabs)
```
Home  |  Scores  |  Stats  |  More
 /       /scores    /stats    /more
```

**Home (`/`)** — season landing (active season card + past seasons + New Season)
**Scores (`/scores`)** — weekly score entry for active season
**Stats (`/stats`)** — season stats for active season
**More (`/more`)** — Handicaps, Schedule, Seasons, Sub List + Commissioner section

Commissioner section in More (admin unlocked):
- Teams & Players (`/admin/teams`)
- Schedule Setup (`/admin/schedule-setup`)
- Dues Tracker (`/admin/dues`)
- Recalculate Handicaps (`/admin/handicap-calc`)
- Import Data (`/admin/import`)

---

## Tech Stack
| Layer | What |
|-------|------|
| Frontend | React 18 + Vite 5 PWA |
| Storage | IndexedDB via `idb` — 100% local, no server |
| Auth | Local commissioner PIN (SHA-256) |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| Excel parsing | SheetJS (`xlsx`) — for .xlsx import only |
| CSV parsing | Papa Parse — for CSV template import |
| PWA | vite-plugin-pwa + Workbox |
| Hosting | Vercel (free) |

---

## Key Architectural Decisions
- **Local-first**: All data in IndexedDB. No accounts. No external services.
- **`src/lib/store.js`** is the only layer pages talk to
- **`src/lib/db.js`** owns IndexedDB schema — bump DB_VERSION on every schema change
- **A/B slot is computed at render** from current HCPs — never stored as a fixed field
- **`src/lib/seed.js`** holds the pre-extracted 2026 + 2025 data — runs once on first load if DB is empty
- Remote sync dormant: `supabase.remote.js` and `sync.remote.js` kept but inactive

---

## IndexedDB Schema (target — DB_VERSION=3)
| Store | Key fields |
|-------|-----------|
| `seasons` | id, name, start_date, league_night, weeks, par, blind_score, max_handicap, is_active, is_archived |
| `players` | id, first_name, last_name, email, phone, status (Active/Sub/Deactivated), notes |
| `teams` | id, season_id, number, name |
| `team_players` | id, team_id, player_id |
| `season_player_hcp` | id, player_id, season_id, prev_season_hcp, start_hcp, current_hcp_override |
| `weeks` | id, season_id, number, date, week_type |
| `matchups` | id, week_id, home_team_id, away_team_id, hole_assignment |
| `scores` | id, matchup_id, player_id, gross, is_blind, updated_at |
| `handicaps` | id, player_id, season_id, week_id, value, calculated_at |
| `dues` | id, player_id, season_id, paid, amount, paid_date |
| `settings` | id (key), value |

---

## Data Extracted from Knights Golf_New_v3.xlsx
(Used to build `src/lib/seed.js`)

### 2026 Season — 14 Teams, 28 Active Players
Team 1: Dave Dooley (HCP 10.6, prev 12.94), Butch O'Nan (HCP 7.6, prev 6)
Team 2: Eric McGiveney (HCP 8.2, prev 10.83), Caleb McGiveney (HCP 20, prev 0)
Team 3: Jerry Simpson (HCP 9.4, prev 12), Tim Simpson (HCP 11.6, prev 13.94)
Team 4: Fred Downs (HCP 10, prev 12.22), Mike Skaggs (HCP 21.6, prev 18.89)
Team 5: Bobby Crowdis (HCP 4.6, prev 6.44), Jerry Wallace (HCP 6.2, prev 11.78)
Team 6: Richie Stoess (HCP 8.6, prev 9.12), Kip McGiveney (HCP 6.6, prev 10.76)
Team 7: John Daugherty (HCP 5.6, prev 8.24), Hooper (HCP 6.2, prev 11) [first name missing]
Team 8: Robert Crume (HCP 16, prev 14.57), Pete Gibson (HCP 6.6, prev 10.19)
Team 9: Larry Olds (HCP 10, prev 11), Greg Olds (HCP 15.25, prev 13.83)
Team 10: Donnie Blair (HCP 7.2, prev 7.65), Allan Catlett (HCP 17.2, prev 19.82)
Team 11: Jason McGiveney (HCP 13, prev 14.24), Bob McGiveney (HCP 20.2, prev 23.18)
Team 12: Chris Berry (HCP 18.4, prev 0), Mike Evans (HCP 10.2, prev 13.31)
Team 13: Bob Noble (HCP 16.6, prev 18), Doug Surface (HCP 15.8, prev 16.93)
Team 14: George Riley (HCP 10.4, prev 11.79), Scott Johnson (HCP 16, prev 15.46)

### 2026 Week Dates (from Admin sheet)
Wk1=Apr 13, Wk2=Apr 20, Wk3=Apr 27, Wk4=May 4, Wk5=May 11, Wk6=May 18,
Wk7=May 25, Wk8=Jun 1, Wk9=Jun 8, Wk10=Jun 15, Wk11=Jun 22, Wk12=Jun 29,
Wk13=Jul 6, Wk14=Jul 13, Wk15=Jul 20, Wk16=Jul 27, Wk17=Aug 3, Wk18=Aug 10, Wk19=Aug 17

### 2026 Subs (from HDCP sheet Sub List section — ~72 players)
Barry Fallon, Billy Cook, Billy Minturn, Bob Bindner, Bobby Montgomery, Bruce Harrison,
Bruce Jewell, Chase Montgomery, Chris Brown, Chuck Coots, Coy Harp, Danny Graves,
Dave Hickey, David Rausch, Danny Popplewell, Dennis Jewell, Derek Simon, Doug Wheat,
Eddie Ray, George Breit, Harvey Smith, Jeff Lozar, Jeremy Crick, Jeremy Riley, Jim Ray,
Jimbo Monks, Joe Fritsch, Joe Miller, John Mingus, Kirk Bruce, Larry Stivers,
Mark Schweitzer, Mike Kesterson, Mike Fee, Mike McGrew, Mike Wilson, Richard Englert,
Rick Borders, Ron Kelty, Ronnie Proffitt, Shawn Bindner, Steve Ragosta, Steve Wheatley,
Wayne Mattingly, Tim Weist, Rob Reynolds, Ronnie Brooks
(+ any with scores this season get current HCP calculated from those scores)

Phone numbers available for these subs from 2023-sublist sheet (cross-reference by name):
Billy Minturn=502-724-0524, Bob Bindner=502-345-5162, Bob Montgomery=502-594-9053,
Bruce Jewell=502-523-2192, Chris Brown=502-593-3832, Chuck Coots=502-905-1008,
Coy Harp=502-807-8170, Danny Popplewell=502-551-2360, Dave Hooper=502-500-4136,
Dennis Jewell=502-544-9150, Harvey Smith=502-322-5199, Jim Ray=502-314-6325,
Jimbo Monks=502-724-7115, Joe Fritsch=502-807-5787, Larry Stivers=502-762-5060,
Mike McGrew=502-333-2135, Mike Wilson=502-544-0287, Pete Gibson=502-593-3046,
Rick Borders=502-592-8060, Ron Kelty=502-741-7412, Ronnie Profit=502-548-5938,
Wayne Mattingly=502-905-5642

### 2025 Season (historical — 18 teams)
Full week-by-week scores available. Players not on a 2026 team → status=Sub.
2025-only players: Ronnie Johnson, Ron Schuler, Scott Norman, Bruce Evans, Rick Breit,
Dan Dillon, Matt Reynolds (+ subs who played rounds)

---

## Current Build Status
| Feature | Status |
|---------|--------|
| Home landing page | ❌ Not built |
| New season wizard (copy-from-prev) | ❌ Not built |
| Roster management (full fields + status) | ❌ Not built |
| CSV import + downloadable template | ❌ Not built |
| Excel / historical import screen | ❌ Not built |
| Pre-seeded data (seed.js) | ❌ Not built |
| Score entry (auto-week + dropdown) | ⚠️ Partial |
| Season Stats tab | ❌ Not built |
| Dues tracker (amount + date) | ⚠️ Partial |
| Sub list (global, cross-season) | ⚠️ Partial |
| Bottom nav restructure (Home/Scores/Stats/More) | ❌ Not built |
| DB schema v3 | ❌ Not built |

## Build Order (next session)
1. DB schema bump to v3 + seed.js with extracted data
2. Bottom nav restructure
3. Home landing page
4. New Season Wizard
5. Roster screen (full fields, status, CSV import)
6. Excel import screen + historical season import
7. Score entry improvements
8. Season Stats tab
9. Dues + Sub List polish
10. Build, push, deploy

## Future Work
- Remote sync: Supabase multi-device (architecture prepped)
- Native mobile wrapper (Capacitor) for App Store
