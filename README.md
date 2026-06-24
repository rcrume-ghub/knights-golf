# Knight's AC Men's Golf League App

A free, installable PWA for managing the Knight's AC Monday Night Golf League.
**No accounts. No servers. All data stays on your device.**

Works on Mac, Windows, iPad/tablet, iPhone.

---

## Tech Stack (100% free, no accounts)

| Layer | What | Cost |
|-------|------|------|
| Frontend | React + Vite PWA | Free |
| Storage | Browser IndexedDB (built-in) | Free |
| Auth | Local commissioner PIN | Free |
| Hosting | Vercel or any static host | Free |

---

## Setup: 3 Steps

### 1. Install dependencies and run locally

You need [Node.js 18+](https://nodejs.org) installed.

```bash
npm install
npm run dev
# Opens at http://localhost:5173
```

### 2. First launch — import your spreadsheet

On the welcome screen, tap **"Upload Knights Golf spreadsheet"** and select your `.xlsx` file.

The app reads it directly in the browser and seeds everything locally:
- Season settings
- 20-week schedule
- 14 teams + 28 players
- Starting handicaps
- All 7 weekly matchups
- Substitute list

No terminal commands. No internet. Done in seconds.

### 3. Set your commissioner PIN

Go to **More → Commissioner Mode → Set PIN**.
Choose a 4+ digit PIN. This protects the admin screens (Dues, Sub List, Recalculate Handicaps).
Regular users open the app with no PIN — they can view scores, standings, and schedule freely.

---

## Deploy to Vercel (free, makes it accessible on all devices)

```bash
npm run build
npx vercel --prod
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) for automatic deploys.
No environment variables needed.

Once deployed, each device installs it:

**Mac/Windows:** Open the URL in Chrome → address bar install icon (or Chrome menu → "Install…")
**iPad/iPhone:** Open in Safari → Share → "Add to Home Screen"

---

## How It Works

### Score Entry
- Opens to the current week automatically (based on today's date)
- All 7 matchups shown as cards
- Enter gross score per player; check "Blind" for absent players (score = par+3 = 39)
- Net scores and match winners calculate live as you type
- Tap **Save Scores** — saves instantly to the device

### Handicaps
- Commissioner taps **More → Recalculate Handicaps** after each week's scores are entered
- Formula: average of all differentials from par (gross − 36), capped at 18

### Standings
- Auto-calculates from all entered scores
- Points: 1 pt per individual match (A vs A, B vs B), 1 pt team total (3 pts per matchup)
- Ties split 0.5 pts each

### Commissioner Mode
- Tap **More** → **Commissioner Mode** → enter PIN to unlock admin screens
- Tap **Lock** to re-lock when done
- PIN is stored as a SHA-256 hash — not reversible

---

## Adding Remote Sync Later

When you're ready to sync across multiple devices, the data layer is designed to be swapped:

1. Uncomment `src/lib/supabase.remote.js` → rename to `supabase.js`
2. Create a free Supabase project, run `supabase/schema.sql`
3. Replace store calls in page components to use Supabase queries

The IndexedDB `store.js` and Supabase queries use the same interface — it's a one-file swap.

---

## Project Structure

```
knights-golf/
├── src/
│   ├── lib/
│   │   ├── db.js                  IndexedDB (all data lives here)
│   │   ├── store.js               Data layer (read/write via this)
│   │   ├── handicap.js            Handicap + match scoring logic
│   │   ├── supabase.remote.js     Future remote layer (inactive)
│   │   └── sync.remote.js         Future sync queue (inactive)
│   ├── hooks/
│   │   └── useAuth.jsx            Local PIN auth context
│   ├── components/
│   │   └── Layout.jsx             App shell, bottom nav
│   └── pages/
│       ├── Setup.jsx              First-run import screen
│       ├── ScoreEntry.jsx         Weekly score entry
│       ├── Standings.jsx          Season leaderboard
│       ├── Schedule.jsx           Schedule + roster
│       ├── Handicaps.jsx          Per-player history
│       ├── More.jsx               Nav + commissioner unlock
│       ├── Login.jsx              Commissioner PIN modal
│       └── admin/
│           ├── Dues.jsx           Dues tracker
│           ├── SubList.jsx        Substitute pool
│           └── HandicapCalc.jsx   Recalculate handicaps
├── supabase/
│   └── schema.sql                 DB schema for future remote sync
└── .env.example                   Env vars (only needed for remote sync)
```
