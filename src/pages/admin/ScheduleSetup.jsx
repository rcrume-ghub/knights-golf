import { useEffect, useState } from 'react'
import * as store from '../../lib/store.js'
import { newId } from '../../lib/db.js'

export default function ScheduleSetup() {
  const [season, setSeason] = useState(null)
  const [teams, setTeams] = useState([])
  const [weeks, setWeeks] = useState([])
  const [generating, setGenerating] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)
  const [selectedWeekId, setSelectedWeekId] = useState(null)
  const [weekMatchups, setWeekMatchups] = useState([])

  useEffect(() => { load() }, [])
  useEffect(() => {
    if (selectedWeekId) store.matchups.getByWeek(selectedWeekId).then(setWeekMatchups)
  }, [selectedWeekId])

  async function load() {
    const s = await store.seasons.getActive()
    if (!s) { setLoading(false); return }
    setSeason(s)
    const [t, w] = await Promise.all([store.teams.getBySeason(s.id), store.weeks.getBySeason(s.id)])
    setTeams(t)
    setWeeks(w)
    if (w.length > 0) setSelectedWeekId(w[0].id)
    setLoading(false)
  }

  async function generate() {
    if (teams.length < 2) return alert('Add at least 2 teams before generating a schedule.')
    if (weeks.length > 0 && !confirm('This will replace the existing schedule. Continue?')) return

    setGenerating(true)
    const rounds = roundRobin(teams.map(t => t.id))
    const totalWeeks = season.weeks
    const startDate = season.start_date ? new Date(season.start_date + 'T12:00:00') : new Date()

    const newWeeks = []
    const newMatchups = []

    for (let i = 0; i < totalWeeks; i++) {
      const roundIndex = i % rounds.length
      const round = rounds[roundIndex]
      const weekDate = new Date(startDate)
      weekDate.setDate(startDate.getDate() + i * 7)

      const weekId = newId()
      newWeeks.push({
        id: weekId,
        season_id: season.id,
        number: i + 1,
        date: weekDate.toISOString().split('T')[0],
        week_type: 'regular',
      })

      round.forEach(([homeId, awayId], mi) => {
        newMatchups.push({
          id: newId(),
          week_id: weekId,
          home_team_id: homeId,
          away_team_id: awayId,
          hole_assignment: mi + 1,
        })
      })
    }

    // Clear old data then write new
    const oldWeeks = await store.weeks.getBySeason(season.id)
    for (const w of oldWeeks) {
      const ms = await store.matchups.getByWeek(w.id)
      for (const m of ms) await store.matchups.upsert({ ...m, _deleted: true })
    }

    for (const w of newWeeks) await store.weeks.upsert(w)
    for (const m of newMatchups) await store.matchups.upsert(m)

    await load()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
    setGenerating(false)
  }

  async function updateWeekType(weekId, week_type) {
    const w = weeks.find(w => w.id === weekId)
    if (!w) return
    await store.weeks.upsert({ ...w, week_type })
    setWeeks(prev => prev.map(wk => wk.id === weekId ? { ...wk, week_type } : wk))
  }

  async function updateWeekDate(weekId, date) {
    const w = weeks.find(w => w.id === weekId)
    if (!w) return
    await store.weeks.upsert({ ...w, date })
    setWeeks(prev => prev.map(wk => wk.id === weekId ? { ...wk, date } : wk))
  }

  const teamById = Object.fromEntries(teams.map(t => [t.id, t]))
  const selectedWeek = weeks.find(w => w.id === selectedWeekId)

  if (loading) return <Spinner />

  if (!season) return (
    <div className="px-4 py-12 text-center text-gray-400 text-sm">No active season found.</div>
  )

  return (
    <div className="px-4 py-4 max-w-2xl mx-auto space-y-4">
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="font-bold text-gray-900">Schedule Setup</h2>
        <p className="text-xs text-gray-400 mt-0.5">{season.name} · {teams.length} teams · {weeks.length} weeks generated</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
        <div>
          <p className="text-sm font-semibold text-gray-800 mb-1">Auto-Generate Schedule</p>
          <p className="text-xs text-gray-400">
            Builds a {season.weeks}-week round-robin from your {teams.length} team{teams.length !== 1 ? 's' : ''}.
            Each pair plays once before repeating.
          </p>
        </div>
        {teams.length < 2 && (
          <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
            Add teams in Commissioner → Teams & Players first.
          </p>
        )}
        <button
          onClick={generate}
          disabled={generating || teams.length < 2}
          className="w-full bg-green-700 text-white rounded-xl py-2.5 text-sm font-semibold disabled:opacity-50 transition-colors"
        >
          {generating ? 'Generating…' : saved ? '✓ Schedule Generated' : weeks.length > 0 ? 'Regenerate Schedule' : 'Generate Schedule'}
        </button>
      </div>

      {weeks.length > 0 && (
        <>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Week</label>
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              {weeks.map(w => (
                <button key={w.id} onClick={() => setSelectedWeekId(w.id)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${w.id === selectedWeekId ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-600'} ${w.week_type === 'holiday' ? 'opacity-50' : ''}`}>
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
                  <input
                    type="date"
                    value={selectedWeek.date || ''}
                    onChange={e => updateWeekDate(selectedWeek.id, e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Type</label>
                  <select
                    value={selectedWeek.week_type || 'regular'}
                    onChange={e => updateWeekType(selectedWeek.id, e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                  >
                    <option value="regular">Regular</option>
                    <option value="position_night">Position Night</option>
                    <option value="scramble">Scramble</option>
                    <option value="end_scramble">End Scramble</option>
                    <option value="holiday">No Golf</option>
                  </select>
                </div>
              </div>

              <div className="divide-y divide-gray-50 -mx-4">
                {weekMatchups.map((m, idx) => (
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
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

function teamLabel(team) {
  if (!team) return '?'
  return team.name && team.name !== `Team ${team.number}` ? team.name : `Team ${team.number}`
}

function roundRobin(ids) {
  const n = ids.length
  // Pad to even if odd number of teams
  const arr = n % 2 === 0 ? [...ids] : [...ids, null]
  const len = arr.length
  const rounds = []
  for (let r = 0; r < len - 1; r++) {
    const round = []
    for (let i = 0; i < len / 2; i++) {
      const home = arr[i]
      const away = arr[len - 1 - i]
      if (home !== null && away !== null) round.push([home, away])
    }
    rounds.push(round)
    arr.splice(1, 0, arr.pop())
  }
  return rounds
}

function Spinner() {
  return (
    <div className="flex items-center justify-center h-48">
      <div className="text-center text-gray-400">
        <div className="text-3xl mb-2 animate-pulse">🗓️</div>
        <p className="text-sm">Loading schedule…</p>
      </div>
    </div>
  )
}
