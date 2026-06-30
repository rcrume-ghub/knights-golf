import { useEffect, useState } from 'react'
import * as store from '../../lib/store.js'
import { newId, deleteOne, getDB } from '../../lib/db.js'
import ScheduleWizard from '../../components/ScheduleWizard.jsx'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const WEEK_TYPES = [
  { value: 'regular', label: 'Regular' },
  { value: 'position_night', label: 'Position Night' },
  { value: 'scramble', label: 'Scramble' },
  { value: 'end_scramble', label: 'End Scramble' },
  { value: 'bye', label: 'Bye / No Golf' },
]

export default function AdminSeasonMgmt() {
  const [seasons, setSeasons] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [section, setSection] = useState('settings')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    store.seasons.getAll().then(all => {
      const sorted = all.sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
      setSeasons(sorted)
      const active = sorted.find(s => s.is_active)
      setSelectedId(active?.id ?? sorted[0]?.id ?? null)
      setLoading(false)
    })
  }, [])

  const season = seasons.find(s => s.id === selectedId)

  function reload() {
    store.seasons.getAll().then(all => {
      const sorted = all.sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
      setSeasons(sorted)
    })
  }

  if (loading) return <Spinner />

  return (
    <div className="flex flex-col min-h-full">
      {/* Season selector */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <label className="block text-xs font-semibold text-gray-500 mb-1">Editing Season</label>
        <select
          value={selectedId || ''}
          onChange={e => setSelectedId(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600 bg-white"
        >
          {seasons.map(s => (
            <option key={s.id} value={s.id}>
              {s.name}{s.is_active ? ' (Active)' : ''}
            </option>
          ))}
        </select>
      </div>

      {/* Sub-section tabs */}
      {season && (
        <>
          <div className="flex bg-gray-50 border-b border-gray-200">
            {[['settings', 'Settings'], ['schedule', 'Schedule'], ['scores', 'Scores']].map(([key, label]) => (
              <button key={key} onClick={() => setSection(key)}
                className={`flex-1 py-2.5 text-xs font-semibold border-b-2 transition-colors ${section === key ? 'border-green-700 text-green-700 bg-white' : 'border-transparent text-gray-500'}`}>
                {label}
              </button>
            ))}
          </div>

          <div className="flex-1">
            {section === 'settings' && <SeasonSettings season={season} onSave={reload} onActiveChange={reload} />}
            {section === 'schedule' && <SeasonScheduleEditor seasonId={season.id} />}
            {section === 'scores' && <SeasonScoreEditor seasonId={season.id} season={season} />}
          </div>
        </>
      )}

      {!season && (
        <div className="flex items-center justify-center h-48">
          <p className="text-gray-400 text-sm">No seasons found.</p>
        </div>
      )}
    </div>
  )
}

// ─── Season Settings ──────────────────────────────────────────────────────────

function SeasonSettings({ season, onSave, onActiveChange }) {
  const [form, setForm] = useState({
    name: season.name,
    start_date: season.start_date || '',
    league_night: season.league_night ?? 1,
    weeks: season.weeks || 20,
    par: season.par || 36,
    blind_score: season.blind_score || 39,
    max_handicap: season.max_handicap || 18,
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setForm({
      name: season.name,
      start_date: season.start_date || '',
      league_night: season.league_night ?? 1,
      weeks: season.weeks || 20,
      par: season.par || 36,
      blind_score: season.blind_score || 39,
      max_handicap: season.max_handicap || 18,
    })
    setSaved(false)
  }, [season.id])

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    await store.seasons.upsert({
      ...season, ...form,
      league_night: parseInt(form.league_night),
      weeks: parseInt(form.weeks),
      par: parseInt(form.par),
      blind_score: parseInt(form.blind_score),
      max_handicap: parseInt(form.max_handicap),
    })
    onSave()
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  async function setActive() {
    await store.seasons.setActive(season.id)
    onActiveChange()
  }

  async function deleteSeason() {
    if (season.is_active) return alert('Cannot delete the active season. Set another season as active first.')
    if (!confirm(`Permanently delete "${season.name}" and all its data (teams, schedule, scores, dues)? This cannot be undone.`)) return
    const db = await getDB()
    // Delete all child data
    const allWeeks = await store.weeks.getBySeason(season.id)
    for (const w of allWeeks) {
      const ms = await store.matchups.getByWeek(w.id)
      for (const m of ms) {
        const sc = await store.scores.getByMatchup(m.id)
        for (const s of sc) await deleteOne('scores', s.id)
        await deleteOne('matchups', m.id)
      }
      await deleteOne('weeks', w.id)
    }
    const allTeams = await store.teams.getBySeason(season.id)
    const allTP = await store.teamPlayers.getAll()
    for (const t of allTeams) {
      const tps = allTP.filter(tp => tp.team_id === t.id)
      for (const tp of tps) await deleteOne('team_players', tp.id)
      await deleteOne('teams', t.id)
    }
    const allDues = await db.getAll('dues')
    for (const d of allDues.filter(d => d.season_id === season.id)) await deleteOne('dues', d.id)
    const allHcps = await db.getAll('season_player_hcp')
    for (const h of allHcps.filter(h => h.season_id === season.id)) await deleteOne('season_player_hcp', h.id)
    await deleteOne('seasons', season.id)
    onActiveChange()
  }

  return (
    <form onSubmit={handleSave} className="px-4 py-4 max-w-2xl mx-auto space-y-4">
      <div>
        <label className={lbl}>Season Name</label>
        <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inp} required />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={lbl}>Start Date</label>
          <input type="date" value={form.start_date} onChange={e => setForm(f => ({ ...f, start_date: e.target.value }))} className={inp} />
        </div>
        <div>
          <label className={lbl}>League Night</label>
          <select value={form.league_night} onChange={e => setForm(f => ({ ...f, league_night: e.target.value }))} className={inp}>
            {DAYS.map((d, i) => <option key={i} value={i}>{d}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div><label className={lbl}># Weeks</label><input type="number" value={form.weeks} onChange={e => setForm(f => ({ ...f, weeks: e.target.value }))} min={1} max={40} className={inp} /></div>
        <div><label className={lbl}>Par</label><input type="number" value={form.par} onChange={e => setForm(f => ({ ...f, par: e.target.value }))} min={27} max={72} className={inp} /></div>
        <div><label className={lbl}>Max HCP</label><input type="number" value={form.max_handicap} onChange={e => setForm(f => ({ ...f, max_handicap: e.target.value }))} min={0} max={36} className={inp} /></div>
      </div>
      <div>
        <label className={lbl}>Blind Score</label>
        <input type="number" value={form.blind_score} onChange={e => setForm(f => ({ ...f, blind_score: e.target.value }))} min={27} max={72} className={inp} />
      </div>

      <button type="submit" disabled={saving} className="w-full bg-green-700 text-white rounded-xl py-3 text-sm font-semibold disabled:opacity-50">
        {saved ? '✓ Saved' : saving ? 'Saving…' : 'Save Settings'}
      </button>

      <div className="border-t border-gray-100 pt-4 space-y-3">
        <p className="text-xs font-semibold text-gray-500">Season Status</p>
        {season.is_active ? (
          <div className="flex items-center gap-2 bg-green-50 rounded-xl px-4 py-3">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-sm font-semibold text-green-700">This is the active season</span>
          </div>
        ) : (
          <button type="button" onClick={setActive}
            className="w-full border-2 border-green-700 text-green-700 rounded-xl py-3 text-sm font-semibold hover:bg-green-50">
            Set as Active Season
          </button>
        )}
      </div>

      <div className="border-t border-gray-100 pt-4">
        <p className="text-xs font-semibold text-gray-500 mb-2">Danger Zone</p>
        <button type="button" onClick={deleteSeason}
          className="w-full border border-red-200 text-red-600 rounded-xl py-3 text-sm font-semibold hover:bg-red-50 transition-colors">
          Delete Season &amp; All Data
        </button>
        {season.is_active && (
          <p className="text-xs text-gray-400 mt-1.5 text-center">Set another season as active before deleting this one.</p>
        )}
      </div>
    </form>
  )
}

// ─── Schedule Editor ──────────────────────────────────────────────────────────

function SeasonScheduleEditor({ seasonId }) {
  const [season, setSeason] = useState(null)
  const [teams, setTeams] = useState([])
  const [teamPlayers, setTeamPlayers] = useState([])
  const [players, setPlayers] = useState([])
  const [seasonHcps, setSeasonHcps] = useState([])
  const [weeks, setWeeks] = useState([])
  const [matchups, setMatchups] = useState([])
  const [selectedWeekId, setSelectedWeekId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showWizard, setShowWizard] = useState(false)

  useEffect(() => { load() }, [seasonId])
  useEffect(() => {
    if (selectedWeekId) store.matchups.getByWeek(selectedWeekId).then(setMatchups)
  }, [selectedWeekId])

  async function load() {
    setLoading(true)
    const [allSeasons, t, tp, p, sh, w] = await Promise.all([
      store.seasons.getAll(),
      store.teams.getBySeason(seasonId),
      store.teamPlayers.getAll(),
      store.players.getAll(),
      store.seasonPlayerHcp.getBySeason(seasonId),
      store.weeks.getBySeason(seasonId),
    ])
    setSeason(allSeasons.find(s => s.id === seasonId) || null)
    setTeams(t)
    setTeamPlayers(tp)
    setPlayers(p)
    setSeasonHcps(sh)
    setWeeks(w)
    if (w.length > 0) setSelectedWeekId(prev => prev || w[0].id)
    setLoading(false)
  }

  async function updateWeek(weekId, field, value) {
    const w = weeks.find(w => w.id === weekId)
    if (!w) return
    const updated = { ...w, [field]: value }
    await store.weeks.upsert(updated)
    setWeeks(prev => prev.map(wk => wk.id === weekId ? updated : wk))
  }

  const playerById = Object.fromEntries(players.map(p => [p.id, p]))
  const hcpByPlayer = Object.fromEntries(seasonHcps.map(h => [h.player_id, h]))
  const teamById = Object.fromEntries(teams.map(t => [t.id, t]))
  const tpByTeam = {}
  for (const tp of teamPlayers) {
    if (!tpByTeam[tp.team_id]) tpByTeam[tp.team_id] = []
    tpByTeam[tp.team_id].push(tp)
  }

  function getTeamRoster(teamId) {
    return (tpByTeam[teamId] || [])
      .map(tp => {
        const p = playerById[tp.player_id]
        if (!p) return null
        const hcp = hcpByPlayer[tp.player_id]?.current_hcp
        return { ...p, hcp }
      })
      .filter(Boolean)
      .sort((a, b) => (a.hcp ?? 99) - (b.hcp ?? 99))
  }

  const selectedWeek = weeks.find(w => w.id === selectedWeekId)

  if (loading) return <Spinner />

  if (showWizard && season) {
    return (
      <div className="px-4 py-4 max-w-2xl mx-auto">
        <ScheduleWizard
          season={season}
          teams={teams}
          onComplete={() => { setShowWizard(false); setSelectedWeekId(null); load() }}
          onCancel={() => setShowWizard(false)}
        />
      </div>
    )
  }

  return (
    <div className="px-4 py-4 max-w-2xl mx-auto space-y-4">
      {/* Generator button */}
      <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-gray-800">
            {weeks.length > 0 ? `${weeks.length}-week schedule generated` : 'No schedule yet'}
          </p>
          <p className="text-xs text-gray-400">{teams.length} teams · round-robin</p>
        </div>
        <button onClick={() => {
          if (weeks.length > 0 && !confirm('This will replace the existing schedule. Continue?')) return
          setShowWizard(true)
        }}
          disabled={teams.length < 2}
          className="flex-shrink-0 bg-green-700 text-white rounded-xl px-4 py-2 text-xs font-semibold disabled:opacity-50">
          {weeks.length > 0 ? 'Regenerate' : 'Generate Schedule'}
        </button>
      </div>
      {teams.length < 2 && <p className="text-xs text-amber-600 bg-amber-50 rounded-xl px-3 py-2">Add teams in Roster Mgmt first.</p>}

      {/* Week selector + editor */}
      {weeks.length > 0 && (
        <>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Select Week</p>
            <div className="flex gap-2 overflow-x-auto pb-1 flex-wrap">
              {weeks.map(w => (
                <button key={w.id} onClick={() => setSelectedWeekId(w.id)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    w.id === selectedWeekId ? 'bg-green-700 text-white' :
                    w.week_type === 'rainout' ? 'bg-red-100 text-red-500' :
                    w.week_type === 'bye' ? 'bg-gray-100 text-gray-300 line-through' :
                    w.week_type === 'scramble' ? 'bg-purple-100 text-purple-700' :
                    w.week_type === 'position_night' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                  {w.number}
                </button>
              ))}
            </div>
          </div>

          {selectedWeek && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 space-y-3 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-800">
                    Week {selectedWeek.number}{selectedWeek.date ? ` · ${fmtDate(selectedWeek.date)}` : ''}
                  </p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${weekTypeBadge(selectedWeek.week_type)}`}>
                    {weekTypeLabel(selectedWeek.week_type)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={lbl}>Date</label>
                    <input type="date" value={selectedWeek.date || ''} onChange={e => updateWeek(selectedWeek.id, 'date', e.target.value)} className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>Week Type</label>
                    <select value={selectedWeek.week_type || 'regular'} onChange={e => updateWeek(selectedWeek.id, 'week_type', e.target.value)} className={inp}>
                      {WEEK_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Matchups with players */}
              <div className="divide-y divide-gray-50">
                {matchups.map((m, idx) => {
                  const homeTeam = teamById[m.home_team_id]
                  const awayTeam = teamById[m.away_team_id]
                  const homePlayers = getTeamRoster(m.home_team_id)
                  const awayPlayers = getTeamRoster(m.away_team_id)
                  return (
                    <div key={m.id} className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs bg-green-100 text-green-700 rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0">
                          {m.hole_assignment || idx + 1}
                        </span>
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          {teamLabel(homeTeam)} <span className="text-gray-300">vs</span> {teamLabel(awayTeam)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <TeamRosterBlock players={homePlayers} teamName={teamLabel(homeTeam)} />
                        <TeamRosterBlock players={awayPlayers} teamName={teamLabel(awayTeam)} />
                      </div>
                    </div>
                  )
                })}
                {matchups.length === 0 && (
                  <p className="px-4 py-6 text-xs text-gray-400 text-center">
                    {selectedWeek.week_type === 'bye' ? 'Bye week — no matchups.' : 'No matchups for this week.'}
                  </p>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

function TeamRosterBlock({ players, teamName }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 space-y-2">
      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide truncate">{teamName}</p>
      {players.length === 0 && <p className="text-xs text-gray-300">No players</p>}
      {players.map((p, idx) => {
        const slot = idx === 0 ? 'A' : 'B'
        const name = `${p.first_name || ''} ${p.last_name || ''}`.trim()
        return (
          <div key={p.id} className="flex items-center gap-2">
            <span className={`text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${slot === 'A' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
              {slot}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-800 truncate">{name}</p>
              <p className="text-xs text-gray-400">HCP {p.hcp ?? '—'}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Score Editor ─────────────────────────────────────────────────────────────

function SeasonScoreEditor({ seasonId, season }) {
  const [teams, setTeams] = useState([])
  const [teamPlayers, setTeamPlayers] = useState([])
  const [players, setPlayers] = useState([])
  const [weeks, setWeeks] = useState([])
  const [matchups, setMatchups] = useState([])
  const [scores, setScores] = useState([])
  const [selectedWeekId, setSelectedWeekId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadAll() }, [seasonId])
  useEffect(() => {
    if (selectedWeekId) {
      store.matchups.getByWeek(selectedWeekId).then(async ms => {
        setMatchups(ms)
        const sc = await store.scores.getByMatchups(ms.map(m => m.id))
        setScores(sc)
      })
    }
  }, [selectedWeekId])

  async function loadAll() {
    setLoading(true)
    const [t, tp, p, w] = await Promise.all([
      store.teams.getBySeason(seasonId),
      store.teamPlayers.getAll(),
      store.players.getAll(),
      store.weeks.getBySeason(seasonId),
    ])
    setTeams(t)
    setTeamPlayers(tp)
    setPlayers(p)
    setWeeks(w)
    if (w.length > 0) setSelectedWeekId(w[0].id)
    setLoading(false)
  }

  async function saveScore(matchupId, playerId, value) {
    await store.scores.upsert({ matchup_id: matchupId, player_id: playerId, gross: value === '' ? null : parseInt(value), is_blind: false })
    const ms = await store.matchups.getByWeek(selectedWeekId)
    const sc = await store.scores.getByMatchups(ms.map(m => m.id))
    setScores(sc)
  }

  const teamById = Object.fromEntries(teams.map(t => [t.id, t]))
  const playerById = Object.fromEntries(players.map(p => [p.id, p]))
  const tpByTeam = {}
  for (const tp of teamPlayers) {
    if (!tpByTeam[tp.team_id]) tpByTeam[tp.team_id] = []
    tpByTeam[tp.team_id].push(tp)
  }
  const scoreKey = (matchupId, playerId) => scores.find(s => s.matchup_id === matchupId && s.player_id === playerId)?.gross ?? ''
  const selectedWeek = weeks.find(w => w.id === selectedWeekId)

  if (loading) return <Spinner />

  return (
    <div className="px-4 py-4 max-w-2xl mx-auto space-y-4">
      {weeks.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-400 text-sm">Generate a schedule first.</div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Week</p>
            <div className="flex gap-2 overflow-x-auto pb-1 flex-wrap">
              {weeks.map(w => (
                <button key={w.id} onClick={() => setSelectedWeekId(w.id)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium ${w.id === selectedWeekId ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-600'}`}>
                  Wk {w.number}
                </button>
              ))}
            </div>
          </div>

          {selectedWeek && matchups.map(m => {
            const homeTeam = teamById[m.home_team_id]
            const awayTeam = teamById[m.away_team_id]
            const homePlayers = (tpByTeam[m.home_team_id] || []).map(tp => playerById[tp.player_id]).filter(Boolean)
            const awayPlayers = (tpByTeam[m.away_team_id] || []).map(tp => playerById[tp.player_id]).filter(Boolean)
            return (
              <div key={m.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-100">
                  <p className="text-xs font-bold text-gray-600">
                    Hole {m.hole_assignment} · {teamLabel(homeTeam)} vs {teamLabel(awayTeam)}
                  </p>
                </div>
                <div className="divide-y divide-gray-50">
                  {[...homePlayers, ...awayPlayers].map(p => {
                    const name = `${p.first_name} ${p.last_name}`.trim()
                    const team = homePlayers.includes(p) ? homeTeam : awayTeam
                    return (
                      <div key={p.id} className="flex items-center gap-3 px-4 py-2.5">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">{name}</p>
                          <p className="text-xs text-gray-400">{teamLabel(team)}</p>
                        </div>
                        <input
                          type="number"
                          inputMode="numeric"
                          defaultValue={scoreKey(m.id, p.id)}
                          onBlur={e => saveScore(m.id, p.id, e.target.value)}
                          min={20} max={99}
                          placeholder={String(season.blind_score || 39)}
                          className="w-16 border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-center font-semibold focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                      </div>
                    )
                  })}
                  {homePlayers.length === 0 && awayPlayers.length === 0 && (
                    <p className="px-4 py-3 text-xs text-gray-400">No players assigned to these teams.</p>
                  )}
                </div>
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function teamLabel(t) { return t?.name || (t ? `Team ${t.number}` : '?') }
function Spinner() {
  return <div className="flex items-center justify-center h-48"><div className="text-3xl animate-pulse">⛳</div></div>
}
function fmtDate(d) {
  if (!d) return ''
  return new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
function weekTypeLabel(t) {
  return { regular: 'Regular', position_night: 'Position Night', scramble: 'Scramble', end_scramble: 'End Scramble', bye: 'Bye', rainout: 'Rained Out' }[t] || t
}
function weekTypeBadge(t) {
  return {
    regular: 'bg-gray-100 text-gray-500',
    position_night: 'bg-blue-100 text-blue-700',
    scramble: 'bg-purple-100 text-purple-700',
    end_scramble: 'bg-purple-100 text-purple-700',
    bye: 'bg-gray-100 text-gray-400',
    rainout: 'bg-red-100 text-red-600',
  }[t] || 'bg-gray-100 text-gray-500'
}
const lbl = 'block text-xs font-semibold text-gray-600 mb-1'
const inp = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white'
