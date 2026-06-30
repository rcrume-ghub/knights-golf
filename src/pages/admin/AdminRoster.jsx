import { useEffect, useState } from 'react'
import * as store from '../../lib/store.js'
import { newId } from '../../lib/db.js'

export default function AdminRoster() {
  const [players, setPlayers] = useState([])
  const [seasons, setSeasons] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [showAdd, setShowAdd] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([store.players.getAll(), store.seasons.getAll()]).then(([p, s]) => {
      setPlayers(p.sort((a, b) => `${a.last_name}${a.first_name}`.localeCompare(`${b.last_name}${b.first_name}`)))
      setSeasons(s.sort((a, b) => new Date(b.start_date) - new Date(a.start_date)))
      setLoading(false)
    })
  }, [])

  function refresh() {
    store.players.getAll().then(p => setPlayers(p.sort((a, b) => `${a.last_name}${a.first_name}`.localeCompare(`${b.last_name}${b.first_name}`))))
  }

  const filtered = players.filter(p => {
    const name = `${p.first_name} ${p.last_name}`.toLowerCase()
    const matchSearch = !search || name.includes(search.toLowerCase())
    const matchFilter = filter === 'all' || p.status === filter
    return matchSearch && matchFilter
  })

  if (loading) return <div className="flex items-center justify-center h-48"><div className="text-3xl animate-pulse">👥</div></div>

  if (selectedPlayer) {
    return <PlayerProfile player={selectedPlayer} seasons={seasons} onBack={() => { setSelectedPlayer(null); refresh() }} onSave={(updated) => { setSelectedPlayer(updated); refresh() }} />
  }

  return (
    <div className="flex flex-col min-h-full">
      <div className="bg-white border-b border-gray-200 px-4 py-3 space-y-3">
        <div className="flex items-center gap-2">
          <input
            type="search"
            placeholder="Search players…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <button onClick={() => setShowAdd(true)}
            className="flex-shrink-0 bg-green-700 text-white px-3 py-2 rounded-lg text-xs font-semibold">
            + Add
          </button>
        </div>
        <div className="flex gap-2">
          {[['all', 'All'], ['Active', 'Active'], ['Sub', 'Subs'], ['Inactive', 'Inactive']].map(([val, label]) => (
            <button key={val} onClick={() => setFilter(val)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${filter === val ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-600'}`}>
              {label}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400">{filtered.length} player{filtered.length !== 1 ? 's' : ''}</p>
      </div>

      {showAdd && (
        <AddPlayerModal
          onClose={() => setShowAdd(false)}
          onSave={async (data) => {
            await store.players.upsert({ ...data, id: newId() })
            refresh()
            setShowAdd(false)
          }}
        />
      )}

      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-gray-100">
          {filtered.map(p => (
            <button key={p.id} onClick={() => setSelectedPlayer(p)}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 text-left transition-colors">
              <div className="w-9 h-9 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
                {p.first_name?.[0]}{p.last_name?.[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{p.first_name} {p.last_name}</p>
                <p className="text-xs text-gray-400">{p.phone || p.email || 'No contact'}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                p.status === 'Active' ? 'bg-green-100 text-green-700' :
                p.status === 'Sub' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-500'
              }`}>{p.status}</span>
              <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-gray-400">No players found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Player Profile ───────────────────────────────────────────────────────────

function PlayerProfile({ player, seasons, onBack, onSave }) {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ ...player })
  const [saving, setSaving] = useState(false)
  const [seasonStats, setSeasonStats] = useState(null)
  const [selectedSeasonId, setSelectedSeasonId] = useState(seasons[0]?.id ?? null)
  const [seasonHcp, setSeasonHcp] = useState(null)
  const [loadingStats, setLoadingStats] = useState(false)

  useEffect(() => {
    if (!selectedSeasonId) return
    loadSeasonStats(selectedSeasonId)
  }, [selectedSeasonId, player.id])

  async function loadSeasonStats(seasonId) {
    setLoadingStats(true)
    const [teams, teamPlayers, weeks, allMatchups, allScores, hcps] = await Promise.all([
      store.teams.getBySeason(seasonId),
      store.teamPlayers.getAll(),
      store.weeks.getBySeason(seasonId),
      store.matchups.getAll(),
      store.scores.getAll(),
      store.seasonPlayerHcp.getBySeason(seasonId),
    ])

    const myTeamId = teamPlayers.find(tp => tp.player_id === player.id)?.team_id
    const weekIds = new Set(weeks.map(w => w.id))
    const seasonMatchupIds = new Set(allMatchups.filter(m => weekIds.has(m.week_id)).map(m => m.id))
    const myScores = allScores.filter(s => s.player_id === player.id && seasonMatchupIds.has(s.matchup_id))

    const hcp = hcps.find(h => h.player_id === player.id)
    setSeasonHcp(hcp)

    const numericScores = myScores.map(s => s.gross).filter(s => s != null)
    const avg = numericScores.length ? (numericScores.reduce((a, b) => a + b, 0) / numericScores.length).toFixed(1) : null
    const best = numericScores.length ? Math.min(...numericScores) : null
    const worst = numericScores.length ? Math.max(...numericScores) : null

    // Get all week scores with dates for table view
    const weekMap = Object.fromEntries(weeks.map(w => [w.id, w]))
    const matchupMap = Object.fromEntries(allMatchups.map(m => [m.id, m]))

    const scoreRows = myScores
      .map(s => {
        const matchup = matchupMap[s.matchup_id]
        const week = matchup ? weekMap[matchup.week_id] : null
        return { score: s.gross, week: week?.number, date: week?.date }
      })
      .filter(r => r.week != null)
      .sort((a, b) => a.week - b.week)

    setSeasonStats({ played: numericScores.length, avg, best, worst, scoreRows, myTeamId, teams })
    setLoadingStats(false)
  }

  async function saveProfile(e) {
    e.preventDefault()
    setSaving(true)
    await store.players.upsert(form)
    setSaving(false)
    setEditing(false)
    onSave(form)
  }

  async function saveHcp(field, value) {
    if (!selectedSeasonId) return
    const existing = seasonHcp || {}
    const updated = {
      ...existing,
      id: existing.id || newId(),
      player_id: player.id,
      season_id: selectedSeasonId,
      [field]: value === '' ? null : parseFloat(value),
    }
    await store.seasonPlayerHcp.upsert(updated)
    setSeasonHcp(updated)
  }

  const selectedSeason = seasons.find(s => s.id === selectedSeasonId)
  const myTeam = seasonStats?.teams?.find(t => t.id === seasonStats.myTeamId)

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-900">{player.first_name} {player.last_name}</p>
          <p className="text-xs text-gray-400">Player Profile</p>
        </div>
        <button onClick={() => setEditing(!editing)} className="text-xs text-green-700 font-semibold">
          {editing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-4 max-w-2xl mx-auto space-y-4">

          {/* Contact Info */}
          {editing ? (
            <form onSubmit={saveProfile} className="bg-white rounded-xl shadow-sm p-4 space-y-3">
              <p className="text-sm font-semibold text-gray-800 mb-1">Edit Player</p>
              <div className="grid grid-cols-2 gap-3">
                <div><label className={lbl}>First Name</label><input className={inp} value={form.first_name || ''} onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))} /></div>
                <div><label className={lbl}>Last Name</label><input className={inp} value={form.last_name || ''} onChange={e => setForm(f => ({ ...f, last_name: e.target.value }))} /></div>
              </div>
              <div><label className={lbl}>Phone</label><input className={inp} type="tel" value={form.phone || ''} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} /></div>
              <div><label className={lbl}>Email</label><input className={inp} type="email" value={form.email || ''} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
              <div>
                <label className={lbl}>Status</label>
                <select className={inp} value={form.status || 'Active'} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                  <option value="Active">Active</option>
                  <option value="Sub">Sub</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div><label className={lbl}>Notes</label><textarea className={inp} rows={2} value={form.notes || ''} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} /></div>
              <button type="submit" disabled={saving} className="w-full bg-green-700 text-white rounded-xl py-2.5 text-sm font-semibold disabled:opacity-50">
                {saving ? 'Saving…' : 'Save Player'}
              </button>
            </form>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-4 space-y-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-lg font-bold">
                  {player.first_name?.[0]}{player.last_name?.[0]}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{player.first_name} {player.last_name}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${player.status === 'Active' ? 'bg-green-100 text-green-700' : player.status === 'Sub' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>{player.status}</span>
                </div>
              </div>
              {player.phone && <InfoRow label="Phone" value={player.phone} />}
              {player.email && <InfoRow label="Email" value={player.email} />}
              {player.notes && <InfoRow label="Notes" value={player.notes} />}
            </div>
          )}

          {/* Season Stats Section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-800 mb-2">Season Stats</p>
              <select value={selectedSeasonId || ''} onChange={e => setSelectedSeasonId(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white">
                {seasons.map(s => <option key={s.id} value={s.id}>{s.name}{s.is_active ? ' (Active)' : ''}</option>)}
              </select>
            </div>

            {loadingStats ? (
              <div className="p-6 text-center text-gray-400 text-sm">Loading…</div>
            ) : seasonStats ? (
              <div className="p-4 space-y-4">
                {/* HCP for this season */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={lbl}>Current HCP ({selectedSeason?.name})</label>
                    <input type="number" step="0.1" min="0" max="36"
                      defaultValue={seasonHcp?.current_hcp ?? ''}
                      onBlur={e => saveHcp('current_hcp', e.target.value)}
                      placeholder="—"
                      className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>Prev Season HCP</label>
                    <input type="number" step="0.1" min="0" max="36"
                      defaultValue={seasonHcp?.prev_season_hcp ?? ''}
                      onBlur={e => saveHcp('prev_season_hcp', e.target.value)}
                      placeholder="—"
                      className={inp} />
                  </div>
                </div>

                {myTeam && <InfoRow label="Team" value={myTeam.name || `Team ${myTeam.number}`} />}

                {/* Summary stats */}
                {seasonStats.played > 0 ? (
                  <>
                    <div className="grid grid-cols-3 gap-3">
                      <StatBox label="Rounds" value={seasonStats.played} />
                      <StatBox label="Avg Score" value={seasonStats.avg} />
                      <StatBox label="Best" value={seasonStats.best} />
                    </div>

                    {/* Score by week table */}
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Score by Week</p>
                      <div className="divide-y divide-gray-50 border border-gray-100 rounded-xl overflow-hidden">
                        {seasonStats.scoreRows.map((r, i) => (
                          <div key={i} className="flex items-center justify-between px-4 py-2.5">
                            <span className="text-sm text-gray-600">Week {r.week}{r.date ? ` · ${fmtDate(r.date)}` : ''}</span>
                            <ScoreInput
                              key={`${selectedSeasonId}-${r.week}`}
                              initialValue={r.score}
                              onSave={async (val) => {
                                // Find and update this score record
                                const allMatchups = await store.matchups.getAll()
                                const allWeeks = await store.weeks.getBySeason(selectedSeasonId)
                                const wk = allWeeks.find(w => w.number === r.week)
                                const wkMatchups = allMatchups.filter(m => m.week_id === wk?.id)
                                const allScores = await store.scores.getAll()
                                const sc = allScores.find(s => s.player_id === player.id && wkMatchups.some(m => m.id === s.matchup_id))
                                if (sc) {
                                  await store.scores.upsert({ ...sc, gross: val === '' ? null : parseInt(val) })
                                  loadSeasonStats(selectedSeasonId)
                                }
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-gray-400 text-center py-4">No scores recorded for {selectedSeason?.name}.</p>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

function ScoreInput({ initialValue, onSave }) {
  const [val, setVal] = useState(initialValue ?? '')
  return (
    <input
      type="number"
      inputMode="numeric"
      value={val}
      onChange={e => setVal(e.target.value)}
      onBlur={() => onSave(val)}
      min={20} max={99}
      className="w-16 border border-gray-200 rounded-lg px-2 py-1 text-sm text-center font-semibold focus:outline-none focus:ring-2 focus:ring-green-600"
    />
  )
}

// ─── Add Player Modal ─────────────────────────────────────────────────────────

function AddPlayerModal({ onClose, onSave }) {
  const [form, setForm] = useState({ first_name: '', last_name: '', phone: '', email: '', status: 'Active', notes: '' })
  const [saving, setSaving] = useState(false)

  async function handleSave(e) {
    e.preventDefault()
    if (!form.first_name.trim() || !form.last_name.trim()) return
    setSaving(true)
    await onSave(form)
    setSaving(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center sm:items-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">Add Player</h3>
          <button onClick={onClose} className="text-gray-400 text-xl leading-none">&times;</button>
        </div>
        <form onSubmit={handleSave} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><label className={lbl}>First Name</label><input className={inp} value={form.first_name} onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))} required /></div>
            <div><label className={lbl}>Last Name</label><input className={inp} value={form.last_name} onChange={e => setForm(f => ({ ...f, last_name: e.target.value }))} required /></div>
          </div>
          <div><label className={lbl}>Phone</label><input className={inp} type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} /></div>
          <div><label className={lbl}>Email</label><input className={inp} type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
          <div>
            <label className={lbl}>Status</label>
            <select className={inp} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
              <option value="Active">Active</option>
              <option value="Sub">Sub</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex gap-2 pt-1">
            <button type="button" onClick={onClose} className="flex-1 border border-gray-200 rounded-xl py-2.5 text-sm text-gray-600">Cancel</button>
            <button type="submit" disabled={saving} className="flex-1 bg-green-700 text-white rounded-xl py-2.5 text-sm font-semibold disabled:opacity-50">
              {saving ? 'Saving…' : 'Add Player'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── Small helpers ────────────────────────────────────────────────────────────

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between py-1">
      <span className="text-xs text-gray-400">{label}</span>
      <span className="text-xs font-semibold text-gray-700">{value}</span>
    </div>
  )
}

function StatBox({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 text-center">
      <p className="text-lg font-bold text-green-700">{value ?? '—'}</p>
      <p className="text-xs text-gray-400 mt-0.5">{label}</p>
    </div>
  )
}

function fmtDate(d) {
  if (!d) return ''
  return new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const lbl = 'block text-xs font-semibold text-gray-600 mb-1'
const inp = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white'
