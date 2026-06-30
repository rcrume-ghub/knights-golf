import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSeason } from '../Season.jsx'
import * as store from '../../lib/store.js'
import { newId } from '../../lib/db.js'

export default function SeasonSubs() {
  const { seasonId } = useParams()
  const { season } = useSeason()
  const [weeks, setWeeks] = useState([])
  const [teams, setTeams] = useState([])
  const [teamPlayers, setTeamPlayers] = useState([])
  const [players, setPlayers] = useState([])
  const [subs, setSubs] = useState([]) // { id, week_id, sub_player_id, replaced_player_id, team_id }
  const [selectedWeekId, setSelectedWeekId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showAddSub, setShowAddSub] = useState(false)

  useEffect(() => { load() }, [seasonId])

  async function load() {
    const [w, t, tp, p] = await Promise.all([
      store.weeks.getBySeason(seasonId),
      store.teams.getBySeason(seasonId),
      store.teamPlayers.getAll(),
      store.players.getAll(),
    ])
    setWeeks(w)
    setTeams(t)
    setTeamPlayers(tp)
    setPlayers(p)
    if (w.length > 0 && !selectedWeekId) setSelectedWeekId(w[0].id)
    // Load subs from settings store keyed by season
    const stored = await loadSubsFromDB(seasonId)
    setSubs(stored)
    setLoading(false)
  }

  async function loadSubsFromDB(sid) {
    try {
      const { getDB } = await import('../../lib/db.js')
      const db = await getDB()
      const all = await db.getAll('settings')
      const row = all.find(r => r.id === `subs_${sid}`)
      return row?.value || []
    } catch { return [] }
  }

  async function saveSubsToDB(newSubs) {
    const { getDB } = await import('../../lib/db.js')
    const db = await getDB()
    await db.put('settings', { id: `subs_${seasonId}`, value: newSubs })
  }

  async function addSub(data) {
    const newSub = { ...data, id: newId() }
    const updated = [...subs, newSub]
    setSubs(updated)
    await saveSubsToDB(updated)
    setShowAddSub(false)
  }

  async function removeSub(id) {
    const updated = subs.filter(s => s.id !== id)
    setSubs(updated)
    await saveSubsToDB(updated)
  }

  const playerById = Object.fromEntries(players.map(p => [p.id, p]))
  const teamById = Object.fromEntries(teams.map(t => [t.id, t]))
  const subsForWeek = subs.filter(s => s.week_id === selectedWeekId)
  const selectedWeek = weeks.find(w => w.id === selectedWeekId)
  const activePlayers = players.filter(p => p.status === 'Active' || p.status === 'Sub')
  const rosterPlayers = teamPlayers.map(tp => playerById[tp.player_id]).filter(Boolean)

  if (loading) return <div className="flex items-center justify-center h-48"><div className="text-3xl animate-pulse">🔄</div></div>

  return (
    <div className="px-4 py-4 max-w-2xl mx-auto space-y-4">
      {weeks.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-400 text-sm">
          Generate a schedule first to track subs.
        </div>
      ) : (
        <>
          {/* Week selector */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Select Week</p>
            <div className="flex gap-2 overflow-x-auto pb-1 flex-wrap">
              {weeks.map(w => (
                <button key={w.id} onClick={() => setSelectedWeekId(w.id)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    w.id === selectedWeekId ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                  Wk {w.number}
                </button>
              ))}
            </div>
          </div>

          {/* Subs for selected week */}
          {selectedWeek && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <div>
                  <p className="text-sm font-semibold text-gray-800">Week {selectedWeek.number} Subs</p>
                  {selectedWeek.date && <p className="text-xs text-gray-400">{fmtDate(selectedWeek.date)}</p>}
                </div>
                <button onClick={() => setShowAddSub(true)}
                  className="text-xs bg-green-700 text-white px-3 py-1.5 rounded-lg font-medium">
                  + Add Sub
                </button>
              </div>

              {subsForWeek.length === 0 ? (
                <p className="px-4 py-6 text-sm text-gray-400 text-center">No subs recorded for this week.</p>
              ) : (
                <div className="divide-y divide-gray-50">
                  {subsForWeek.map(sub => {
                    const subPlayer = playerById[sub.sub_player_id]
                    const replacedPlayer = playerById[sub.replaced_player_id]
                    const team = teamById[sub.team_id]
                    return (
                      <div key={sub.id} className="px-4 py-3 flex items-center gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900">
                            {subPlayer ? `${subPlayer.first_name} ${subPlayer.last_name}` : 'Unknown'}
                            <span className="text-xs text-green-600 ml-1 font-normal">(sub)</span>
                          </p>
                          <p className="text-xs text-gray-400">
                            Replaced: {replacedPlayer ? `${replacedPlayer.first_name} ${replacedPlayer.last_name}` : 'Unknown'}
                            {team ? ` · ${team.name || `Team ${team.number}`}` : ''}
                          </p>
                        </div>
                        <button onClick={() => removeSub(sub.id)} className="text-xs text-red-500 font-medium">Remove</button>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {showAddSub && selectedWeek && (
        <AddSubModal
          weekId={selectedWeekId}
          weekNumber={selectedWeek.number}
          teams={teams}
          rosterPlayers={rosterPlayers}
          allPlayers={activePlayers}
          playerById={playerById}
          teamPlayers={teamPlayers}
          onSave={addSub}
          onClose={() => setShowAddSub(false)}
        />
      )}

      {/* All subs summary */}
      {subs.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-800">All Season Subs ({subs.length})</p>
          </div>
          <div className="divide-y divide-gray-50">
            {subs.map(sub => {
              const subPlayer = playerById[sub.sub_player_id]
              const replacedPlayer = playerById[sub.replaced_player_id]
              const week = weeks.find(w => w.id === sub.week_id)
              return (
                <div key={sub.id} className="px-4 py-3 flex items-start gap-3">
                  <div className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium flex-shrink-0 mt-0.5">
                    Wk {week?.number ?? '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">
                      {subPlayer ? `${subPlayer.first_name} ${subPlayer.last_name}` : 'Unknown'}
                    </p>
                    <p className="text-xs text-gray-400">
                      for {replacedPlayer ? `${replacedPlayer.first_name} ${replacedPlayer.last_name}` : 'Unknown'}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

function AddSubModal({ weekId, weekNumber, teams, rosterPlayers, allPlayers, playerById, teamPlayers, onSave, onClose }) {
  const [teamId, setTeamId] = useState(teams[0]?.id || '')
  const [replacedId, setReplacedId] = useState('')
  const [subId, setSubId] = useState('')

  const teamRosterIds = new Set(teamPlayers.filter(tp => tp.team_id === teamId).map(tp => tp.player_id))
  const teamRoster = rosterPlayers.filter(p => teamRosterIds.has(p.id))
  const subCandidates = allPlayers.filter(p => !teamRosterIds.has(p.id))

  function handleSave() {
    if (!replacedId || !subId) return alert('Select both the player being replaced and the sub.')
    onSave({ week_id: weekId, team_id: teamId, replaced_player_id: replacedId, sub_player_id: subId })
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center sm:items-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-900">Add Sub — Week {weekNumber}</h3>
          <button onClick={onClose} className="text-gray-400 text-xl leading-none">&times;</button>
        </div>
        <div>
          <label className={lbl}>Team</label>
          <select value={teamId} onChange={e => { setTeamId(e.target.value); setReplacedId(''); setSubId('') }} className={inp}>
            {teams.map(t => <option key={t.id} value={t.id}>{t.name || `Team ${t.number}`}</option>)}
          </select>
        </div>
        <div>
          <label className={lbl}>Player Being Replaced</label>
          <select value={replacedId} onChange={e => setReplacedId(e.target.value)} className={inp}>
            <option value="">Select player…</option>
            {teamRoster.map(p => <option key={p.id} value={p.id}>{p.first_name} {p.last_name}</option>)}
          </select>
        </div>
        <div>
          <label className={lbl}>Sub Player</label>
          <select value={subId} onChange={e => setSubId(e.target.value)} className={inp}>
            <option value="">Select sub…</option>
            {subCandidates.map(p => <option key={p.id} value={p.id}>{p.first_name} {p.last_name} ({p.status})</option>)}
          </select>
        </div>
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 border border-gray-200 rounded-xl py-2.5 text-sm text-gray-600">Cancel</button>
          <button onClick={handleSave} className="flex-1 bg-green-700 text-white rounded-xl py-2.5 text-sm font-semibold">Save Sub</button>
        </div>
      </div>
    </div>
  )
}

function fmtDate(d) {
  if (!d) return ''
  return new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const lbl = 'block text-xs font-semibold text-gray-600 mb-1'
const inp = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white'
