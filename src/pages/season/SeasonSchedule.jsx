import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.jsx'
import { useSeason } from '../Season.jsx'
import * as store from '../../lib/store.js'
import { newId, deleteOne } from '../../lib/db.js'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const WEEK_TYPES = [
  { value: 'regular', label: 'Regular' },
  { value: 'position_night', label: 'Position Night' },
  { value: 'scramble', label: 'Scramble' },
  { value: 'end_scramble', label: 'End Scramble' },
  { value: 'bye', label: 'Bye / No Golf' },
]

export default function SeasonSchedule() {
  const { seasonId } = useParams()
  const { isAdmin } = useAuth()
  const { season, refreshSeason } = useSeason()
  const [teams, setTeams] = useState([])
  const [weeks, setWeeks] = useState([])
  const [matchups, setMatchups] = useState([])
  const [selectedWeekId, setSelectedWeekId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [editingSettings, setEditingSettings] = useState(false)
  const [settings, setSettings] = useState({
    name: season.name,
    start_date: season.start_date || '',
    league_night: season.league_night ?? 1,
    weeks: season.weeks || 20,
    par: season.par || 36,
    blind_score: season.blind_score || 39,
    max_handicap: season.max_handicap || 18,
  })
  const [savingSettings, setSavingSettings] = useState(false)

  useEffect(() => { load() }, [seasonId])
  useEffect(() => {
    if (selectedWeekId) store.matchups.getByWeek(selectedWeekId).then(ms => setMatchups(ms))
  }, [selectedWeekId])

  async function load() {
    const [t, w] = await Promise.all([store.teams.getBySeason(seasonId), store.weeks.getBySeason(seasonId)])
    setTeams(t)
    setWeeks(w)
    if (w.length > 0 && !selectedWeekId) setSelectedWeekId(w[0].id)
    setLoading(false)
  }

  async function saveSettings(e) {
    e.preventDefault()
    setSavingSettings(true)
    await store.seasons.upsert({
      ...season, ...settings,
      league_night: parseInt(settings.league_night),
      weeks: parseInt(settings.weeks),
      par: parseInt(settings.par),
      blind_score: parseInt(settings.blind_score),
      max_handicap: parseInt(settings.max_handicap)
    })
    refreshSeason()
    setEditingSettings(false)
    setSavingSettings(false)
  }

  async function generate() {
    if (teams.length < 2) return alert('Add at least 2 teams to the roster before generating a schedule.')
    if (weeks.length > 0 && !confirm('This will replace the existing schedule. Continue?')) return
    setGenerating(true)

    const totalWeeks = parseInt(settings.weeks) || season.weeks || 20
    const startDate = settings.start_date || season.start_date
    if (!startDate) { alert('Set a start date first.'); setGenerating(false); return }

    const rounds = roundRobin(teams.map(t => t.id))
    const start = new Date(startDate + 'T12:00:00')
    const newWeeks = []
    const newMatchups = []

    for (let i = 0; i < totalWeeks; i++) {
      const weekDate = new Date(start)
      weekDate.setDate(start.getDate() + i * 7)
      const wid = newId()
      newWeeks.push({ id: wid, season_id: seasonId, number: i + 1, date: weekDate.toISOString().split('T')[0], week_type: 'regular' })
      const round = rounds[i % rounds.length]
      round.forEach(([h, a], mi) => {
        newMatchups.push({ id: newId(), week_id: wid, home_team_id: h, away_team_id: a, hole_assignment: mi + 1 })
      })
    }

    const oldWeeks = await store.weeks.getBySeason(seasonId)
    for (const w of oldWeeks) {
      const ms = await store.matchups.getByWeek(w.id)
      for (const m of ms) await deleteOne('matchups', m.id)
      await deleteOne('weeks', w.id)
    }
    for (const w of newWeeks) await store.weeks.upsert(w)
    for (const m of newMatchups) await store.matchups.upsert(m)
    setSelectedWeekId(null)
    await load()
    setGenerating(false)
  }

  async function updateWeekField(weekId, field, value) {
    const w = weeks.find(w => w.id === weekId)
    if (!w) return
    const updated = { ...w, [field]: value }
    await store.weeks.upsert(updated)
    setWeeks(prev => prev.map(wk => wk.id === weekId ? updated : wk))
  }

  const teamById = Object.fromEntries(teams.map(t => [t.id, t]))
  const selectedWeek = weeks.find(w => w.id === selectedWeekId)

  if (loading) return <div className="flex items-center justify-center h-48"><div className="text-3xl animate-pulse">🗓️</div></div>

  return (
    <div className="px-4 py-4 max-w-2xl mx-auto space-y-4">
      {/* Season Settings */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800">Season Settings</h3>
          {isAdmin && (
            <button onClick={() => setEditingSettings(!editingSettings)} className="text-xs text-green-700 font-medium">
              {editingSettings ? 'Cancel' : 'Edit'}
            </button>
          )}
        </div>
        {editingSettings ? (
          <form onSubmit={saveSettings} className="p-4 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Season Name</label>
              <input type="text" value={settings.name} onChange={e => setSettings(s => ({ ...s, name: e.target.value }))} className={inp} required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Start Date</label>
                <input type="date" value={settings.start_date} onChange={e => setSettings(s => ({ ...s, start_date: e.target.value }))} className={inp} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">League Night</label>
                <select value={settings.league_night} onChange={e => setSettings(s => ({ ...s, league_night: e.target.value }))} className={inp}>
                  {DAYS.map((d, i) => <option key={i} value={i}>{d}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1"># Weeks</label>
                <input type="number" value={settings.weeks} onChange={e => setSettings(s => ({ ...s, weeks: e.target.value }))} className={inp} min={1} max={40} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Par</label>
                <input type="number" value={settings.par} onChange={e => setSettings(s => ({ ...s, par: e.target.value }))} className={inp} min={27} max={72} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Max HCP</label>
                <input type="number" value={settings.max_handicap} onChange={e => setSettings(s => ({ ...s, max_handicap: e.target.value }))} className={inp} min={0} max={36} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Blind Score</label>
              <input type="number" value={settings.blind_score} onChange={e => setSettings(s => ({ ...s, blind_score: e.target.value }))} className={inp} min={27} max={72} />
            </div>
            <button type="submit" disabled={savingSettings} className="w-full bg-green-700 text-white rounded-xl py-2.5 text-sm font-semibold disabled:opacity-50">
              {savingSettings ? 'Saving…' : 'Save Settings'}
            </button>
          </form>
        ) : (
          <div className="px-4 py-3 grid grid-cols-2 gap-2 text-sm">
            <InfoRow label="Start Date" value={fmtDate(season.start_date)} />
            <InfoRow label="League Night" value={DAYS[season.league_night] || '—'} />
            <InfoRow label="Weeks" value={season.weeks} />
            <InfoRow label="Par" value={season.par} />
            <InfoRow label="Blind Score" value={season.blind_score} />
            <InfoRow label="Max HCP" value={season.max_handicap} />
          </div>
        )}
      </div>

      {/* Schedule Generator */}
      {isAdmin && (
        <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
          <div>
            <p className="text-sm font-semibold text-gray-800">Schedule Generator</p>
            <p className="text-xs text-gray-400 mt-0.5">Auto-builds a round-robin from {teams.length} teams. Generates {settings.weeks || season.weeks} weeks starting {fmtDate(settings.start_date || season.start_date) || 'from start date above'}.</p>
          </div>
          {teams.length < 2 && <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2">Add teams in the Roster tab first.</p>}
          <button onClick={generate} disabled={generating || teams.length < 2}
            className="w-full bg-green-700 text-white rounded-xl py-2.5 text-sm font-semibold disabled:opacity-50">
            {generating ? 'Generating…' : weeks.length > 0 ? 'Regenerate Schedule' : 'Generate Schedule'}
          </button>
        </div>
      )}

      {/* Week editor */}
      {weeks.length > 0 && (
        <>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Select Week</label>
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              {weeks.map(w => (
                <button key={w.id} onClick={() => setSelectedWeekId(w.id)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${w.id === selectedWeekId ? 'bg-green-700 text-white' : w.week_type === 'bye' ? 'bg-gray-100 text-gray-300 line-through' : 'bg-gray-100 text-gray-600'}`}>
                  {w.number}
                </button>
              ))}
            </div>
          </div>

          {selectedWeek && (
            <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Date</label>
                  <input type="date" value={selectedWeek.date || ''} disabled={!isAdmin}
                    onChange={e => updateWeekField(selectedWeek.id, 'date', e.target.value)} className={inp} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Type</label>
                  <select value={selectedWeek.week_type || 'regular'} disabled={!isAdmin}
                    onChange={e => updateWeekField(selectedWeek.id, 'week_type', e.target.value)} className={inp}>
                    {WEEK_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="divide-y divide-gray-50 -mx-4">
                {matchups.map((m, idx) => (
                  <div key={m.id} className="px-4 py-2.5 flex items-center gap-3">
                    <span className="text-xs bg-green-100 text-green-700 rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0">
                      {m.hole_assignment || idx + 1}
                    </span>
                    <span className="text-sm text-gray-800">
                      <span className="font-semibold">{teamLabel(teamById[m.home_team_id])}</span>
                      <span className="text-gray-400 mx-2">vs</span>
                      <span className="font-semibold">{teamLabel(teamById[m.away_team_id])}</span>
                    </span>
                  </div>
                ))}
                {matchups.length === 0 && selectedWeek.week_type === 'bye' && (
                  <p className="px-4 py-4 text-xs text-gray-400 text-center">Bye week — no matchups.</p>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

function InfoRow({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-semibold text-gray-800">{value ?? '—'}</p>
    </div>
  )
}

function teamLabel(team) {
  if (!team) return '?'
  return team.name || `Team ${team.number}`
}

function roundRobin(ids) {
  const arr = ids.length % 2 === 0 ? [...ids] : [...ids, null]
  const n = arr.length
  const rounds = []
  for (let r = 0; r < n - 1; r++) {
    const round = []
    for (let i = 0; i < n / 2; i++) {
      if (arr[i] && arr[n - 1 - i]) round.push([arr[i], arr[n - 1 - i]])
    }
    rounds.push(round)
    arr.splice(1, 0, arr.pop())
  }
  return rounds
}

function fmtDate(d) {
  if (!d) return ''
  return new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const inp = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white disabled:bg-gray-50'
