import { useEffect, useState } from 'react'
import * as store from '../../lib/store.js'
import { newId } from '../../lib/db.js'

export default function Teams() {
  const [season, setSeason] = useState(null)
  const [teams, setTeams] = useState([])
  const [players, setPlayers] = useState([])
  const [teamPlayers, setTeamPlayers] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [showAdd, setShowAdd] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    const s = await store.seasons.getActive()
    if (!s) { setLoading(false); return }
    setSeason(s)
    const [t, tp, p] = await Promise.all([
      store.teams.getBySeason(s.id),
      store.teamPlayers.getAll(),
      store.players.getAll(),
    ])
    setTeams(t)
    setTeamPlayers(tp)
    setPlayers(p)
    setLoading(false)
  }

  function getTeamPlayers(teamId) {
    const tps = teamPlayers.filter(tp => tp.team_id === teamId)
    const playerById = Object.fromEntries(players.map(p => [p.id, p]))
    return { a: playerById[tps.find(tp => tp.slot === 'A')?.player_id], b: playerById[tps.find(tp => tp.slot === 'B')?.player_id] }
  }

  async function saveTeam({ id, name, number, aName, bName }) {
    const teamId = id || newId()
    const { a, b } = id ? getTeamPlayers(id) : {}

    const aPlayerId = a?.id || newId()
    const bPlayerId = b?.id || newId()

    await Promise.all([
      store.teams.upsert({ id: teamId, season_id: season.id, number, name }),
      store.players.upsert({ id: aPlayerId, name: aName, is_sub: false }),
      store.players.upsert({ id: bPlayerId, name: bName, is_sub: false }),
      store.teamPlayers.upsert({ id: a ? teamPlayers.find(tp => tp.team_id === id && tp.slot === 'A')?.id || newId() : newId(), team_id: teamId, player_id: aPlayerId, slot: 'A' }),
      store.teamPlayers.upsert({ id: b ? teamPlayers.find(tp => tp.team_id === id && tp.slot === 'B')?.id || newId() : newId(), team_id: teamId, player_id: bPlayerId, slot: 'B' }),
    ])

    await load()
    setEditingId(null)
    setShowAdd(false)
  }

  if (loading) return <Spinner />

  if (!season) return (
    <div className="px-4 py-12 text-center text-gray-400 text-sm">No active season found.</div>
  )

  return (
    <div className="px-4 py-4 max-w-2xl mx-auto space-y-4">
      <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-gray-900">Teams & Players</h2>
          <p className="text-xs text-gray-400 mt-0.5">{season.name} · {teams.length} team{teams.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => { setShowAdd(true); setEditingId(null) }}
          className="text-xs bg-green-700 text-white px-3 py-1.5 rounded-lg font-medium"
        >
          + Add Team
        </button>
      </div>

      {showAdd && (
        <TeamForm
          nextNumber={teams.length + 1}
          onSave={saveTeam}
          onCancel={() => setShowAdd(false)}
        />
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden divide-y divide-gray-50">
        {teams.map(team => {
          const { a, b } = getTeamPlayers(team.id)
          const isEditing = editingId === team.id
          return (
            <div key={team.id}>
              {isEditing ? (
                <div className="p-4">
                  <TeamForm
                    team={team}
                    aName={a?.name || ''}
                    bName={b?.name || ''}
                    onSave={saveTeam}
                    onCancel={() => setEditingId(null)}
                  />
                </div>
              ) : (
                <div className="px-4 py-3 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-green-800 text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {team.number}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{team.name || `Team ${team.number}`}</p>
                    <p className="text-xs text-gray-400 truncate">
                      A: {a?.name || <em>empty</em>} &nbsp;·&nbsp; B: {b?.name || <em>empty</em>}
                    </p>
                  </div>
                  <button
                    onClick={() => { setEditingId(team.id); setShowAdd(false) }}
                    className="text-xs text-green-700 font-medium px-2 py-1 rounded hover:bg-green-50"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          )
        })}
        {teams.length === 0 && !showAdd && (
          <p className="px-4 py-8 text-center text-sm text-gray-400">No teams yet. Add your first team above.</p>
        )}
      </div>
    </div>
  )
}

function TeamForm({ team, aName: initA = '', bName: initB = '', nextNumber, onSave, onCancel }) {
  const [name, setName] = useState(team?.name || '')
  const [number, setNumber] = useState(team?.number ?? nextNumber ?? 1)
  const [aName, setAName] = useState(initA)
  const [bName, setBName] = useState(initB)
  const [saving, setSaving] = useState(false)

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    await onSave({ id: team?.id, name, number: parseInt(number), aName, bName })
    setSaving(false)
  }

  return (
    <form onSubmit={handleSave} className="bg-green-50 rounded-xl p-4 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Team #">
          <input type="number" value={number} onChange={e => setNumber(e.target.value)} min={1} max={99} className={inp} />
        </Field>
        <Field label="Team Name (optional)">
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={`Team ${number}`} className={inp} />
        </Field>
      </div>
      <Field label="A Player">
        <input type="text" value={aName} onChange={e => setAName(e.target.value)} placeholder="Player name" className={inp} />
      </Field>
      <Field label="B Player">
        <input type="text" value={bName} onChange={e => setBName(e.target.value)} placeholder="Player name" className={inp} />
      </Field>
      <div className="flex gap-3 pt-1">
        <button type="button" onClick={onCancel} className="flex-1 border border-gray-200 bg-white rounded-xl py-2 text-sm font-medium text-gray-600">Cancel</button>
        <button type="submit" disabled={saving} className="flex-1 bg-green-700 text-white rounded-xl py-2 text-sm font-semibold disabled:opacity-50">
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>
    </form>
  )
}

const inp = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white'

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
      {children}
    </div>
  )
}

function Spinner() {
  return (
    <div className="flex items-center justify-center h-48">
      <div className="text-center text-gray-400">
        <div className="text-3xl mb-2 animate-pulse">👥</div>
        <p className="text-sm">Loading teams…</p>
      </div>
    </div>
  )
}
