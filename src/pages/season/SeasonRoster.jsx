import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSeason } from '../Season.jsx'
import * as store from '../../lib/store.js'
import { newId, deleteOne } from '../../lib/db.js'

export default function SeasonRoster() {
  const { seasonId } = useParams()
  const { season } = useSeason()
  const [teams, setTeams] = useState([])
  const [teamPlayers, setTeamPlayers] = useState([])
  const [players, setPlayers] = useState([])
  const [seasonHcps, setSeasonHcps] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingTeam, setEditingTeam] = useState(null)
  const [showAddTeam, setShowAddTeam] = useState(false)

  useEffect(() => { load() }, [seasonId])

  async function load() {
    const [t, tp, p, sh] = await Promise.all([
      store.teams.getBySeason(seasonId),
      store.teamPlayers.getAll(),
      store.players.getAll(),
      store.seasonPlayerHcp.getBySeason(seasonId),
    ])
    setTeams(t)
    setTeamPlayers(tp)
    setPlayers(p)
    setSeasonHcps(sh)
    setLoading(false)
  }

  const playerById = Object.fromEntries(players.map(p => [p.id, p]))
  const hcpByPlayer = Object.fromEntries(seasonHcps.map(h => [h.player_id, h]))

  function getTeamPlayers(teamId) {
    const tps = teamPlayers.filter(tp => tp.team_id === teamId)
    return tps.map(tp => {
      const p = playerById[tp.player_id]
      if (!p) return null
      const hcp = hcpByPlayer[tp.player_id]
      return { ...tp, player: p, currentHcp: hcp?.current_hcp, prevHcp: hcp?.prev_season_hcp }
    }).filter(Boolean).sort((a, b) => (a.currentHcp ?? 99) - (b.currentHcp ?? 99))
  }

  async function saveTeam(data) {
    await store.teams.upsert({ ...data, season_id: seasonId })
    await load()
    setShowAddTeam(false)
    setEditingTeam(null)
  }

  async function saveTeamPlayer(teamId, playerId, currentHcp, prevHcp, email, phone) {
    const existing = teamPlayers.find(tp => tp.team_id === teamId && tp.player_id === playerId)
    if (!existing) {
      await store.teamPlayers.upsert({ id: newId(), team_id: teamId, player_id: playerId })
    }
    if (currentHcp !== '' && currentHcp !== undefined) {
      await store.seasonPlayerHcp.upsert({
        id: newId(), player_id: playerId, season_id: seasonId,
        current_hcp: parseFloat(currentHcp) || null,
        prev_season_hcp: prevHcp !== '' ? (parseFloat(prevHcp) || null) : null,
      })
    }
    const player = players.find(p => p.id === playerId)
    if (player) {
      await store.players.upsert({ ...player, email: email ?? player.email, phone: phone ?? player.phone })
    }
    await load()
  }

  async function removeTeamPlayer(tpId) {
    if (!confirm('Remove this player from the team?')) return
    await deleteOne('team_players', tpId)
    await load()
  }

  if (loading) return <div className="flex items-center justify-center h-48"><div className="text-3xl animate-pulse">👥</div></div>

  return (
    <div className="px-4 py-4 max-w-2xl mx-auto space-y-4">
      <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-gray-900">Roster</h2>
          <p className="text-xs text-gray-400 mt-0.5">{teams.length} teams · {season.name}</p>
        </div>
        <button onClick={() => setShowAddTeam(true)} className="text-xs bg-green-700 text-white px-3 py-1.5 rounded-lg font-medium">
          + Add Team
        </button>
      </div>

      {showAddTeam && (
        <TeamForm nextNumber={teams.length + 1} onSave={saveTeam} onCancel={() => setShowAddTeam(false)} />
      )}

      {teams.map(team => {
        const members = getTeamPlayers(team.id)
        const isEditing = editingTeam === team.id
        return (
          <div key={team.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gray-50 px-4 py-2.5 flex items-center justify-between border-b border-gray-100">
              <span className="text-sm font-bold text-gray-800">
                Team {team.number}{team.name ? ` — ${team.name}` : ''}
              </span>
              <button onClick={() => setEditingTeam(isEditing ? null : team.id)}
                className="text-xs text-green-700 font-medium">
                {isEditing ? 'Done' : 'Edit'}
              </button>
            </div>

            {isEditing && (
              <div className="px-4 py-3 bg-green-50 border-b border-green-100">
                <TeamForm team={team} onSave={saveTeam} onCancel={() => setEditingTeam(null)} inline />
              </div>
            )}

            <div className="divide-y divide-gray-50">
              {members.map((m, idx) => (
                <PlayerRow key={m.player_id} member={m} slot={idx === 0 ? 'A' : 'B'}
                  onSave={(hcp, prev, email, phone) => saveTeamPlayer(team.id, m.player_id, hcp, prev, email, phone)}
                  onRemove={() => removeTeamPlayer(m.id)} />
              ))}
              {members.length === 0 && (
                <p className="px-4 py-4 text-xs text-gray-400">No players assigned.</p>
              )}
              {members.length < 2 && (
                <AddPlayerRow teamId={team.id} players={players} teamPlayers={teamPlayers}
                  onAdd={(pid) => saveTeamPlayer(team.id, pid, '', '')} />
              )}
            </div>
          </div>
        )
      })}

      {teams.length === 0 && !showAddTeam && (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-400 text-sm">
          No teams yet. Tap + Add Team to get started.
        </div>
      )}
    </div>
  )
}

function PlayerRow({ member, slot, onSave, onRemove }) {
  const [editing, setEditing] = useState(false)
  const [hcp, setHcp] = useState(member.currentHcp ?? '')
  const [prev, setPrev] = useState(member.prevHcp ?? '')
  const [email, setEmail] = useState(member.player.email || '')
  const [phone, setPhone] = useState(member.player.phone || '')
  const p = member.player
  const name = `${p.first_name || ''} ${p.last_name || ''}`.trim()

  async function save() {
    await onSave(hcp, prev, email, phone)
    setEditing(false)
  }

  return (
    <div className="px-4 py-3">
      <div className="flex items-center gap-3">
        <span className={`text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${slot === 'A' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{slot}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">{name}</p>
          <p className="text-xs text-gray-400">{p.phone || p.email || 'No contact'}</p>
        </div>
        <div className="text-right">
          {member.currentHcp != null && <p className="text-sm font-bold text-green-700">HCP {member.currentHcp}</p>}
          {member.prevHcp != null && <p className="text-xs text-gray-400">Prev: {member.prevHcp}</p>}
        </div>
        <button onClick={() => setEditing(!editing)} className="text-xs text-green-700 font-medium ml-1">
          {editing ? 'Cancel' : 'Edit'}
        </button>
      </div>
      {editing && (
        <div className="mt-3 bg-green-50 rounded-lg p-3 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Current HCP</label>
              <input type="number" value={hcp} onChange={e => setHcp(e.target.value)} step="0.1" min="0" max="36"
                className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-600 bg-white" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Prev Season HCP</label>
              <input type="number" value={prev} onChange={e => setPrev(e.target.value)} step="0.1" min="0" max="36"
                className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-600 bg-white" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="player@email.com"
              className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-600 bg-white" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Phone</label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="555-555-5555"
              className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-600 bg-white" />
          </div>
          <div className="flex gap-2">
            <button onClick={save} className="flex-1 bg-green-700 text-white rounded-lg py-1.5 text-xs font-semibold">Save</button>
            <button onClick={onRemove} className="px-3 bg-red-50 text-red-600 rounded-lg py-1.5 text-xs font-semibold">Remove</button>
          </div>
        </div>
      )}
    </div>
  )
}

function AddPlayerRow({ teamId, players, teamPlayers, onAdd }) {
  const [show, setShow] = useState(false)
  const [search, setSearch] = useState('')
  const assigned = new Set(teamPlayers.map(tp => tp.player_id))
  const available = players.filter(p => !assigned.has(p.id) && (p.status === 'Active' || p.status === 'Sub'))
    .filter(p => search ? `${p.first_name} ${p.last_name}`.toLowerCase().includes(search.toLowerCase()) : true)

  if (!show) return (
    <button onClick={() => setShow(true)} className="w-full px-4 py-2.5 text-xs text-green-700 font-medium text-left hover:bg-green-50 transition-colors">
      + Add player to team
    </button>
  )

  return (
    <div className="px-4 py-3 bg-green-50">
      <input type="search" placeholder="Search players…" value={search} onChange={e => setSearch(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm mb-2 focus:outline-none focus:ring-1 focus:ring-green-600 bg-white" autoFocus />
      <div className="max-h-32 overflow-y-auto divide-y divide-gray-100 bg-white rounded-lg border border-gray-200">
        {available.slice(0, 20).map(p => (
          <button key={p.id} onClick={() => { onAdd(p.id); setShow(false); setSearch('') }}
            className="w-full text-left px-3 py-2 text-sm hover:bg-green-50 transition-colors">
            {p.first_name} {p.last_name}
            <span className="text-xs text-gray-400 ml-1">({p.status})</span>
          </button>
        ))}
        {available.length === 0 && <p className="px-3 py-2 text-xs text-gray-400">No players found.</p>}
      </div>
      <button onClick={() => { setShow(false); setSearch('') }} className="mt-2 text-xs text-gray-400">Cancel</button>
    </div>
  )
}

function TeamForm({ team, nextNumber, onSave, onCancel, inline }) {
  const [number, setNumber] = useState(team?.number ?? nextNumber ?? 1)
  const [name, setName] = useState(team?.name || '')
  const [saving, setSaving] = useState(false)

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    await onSave({ id: team?.id || newId(), number: parseInt(number), name })
    setSaving(false)
  }

  return (
    <form onSubmit={handleSave} className={`space-y-3 ${!inline ? 'bg-white rounded-xl shadow-sm p-4' : ''}`}>
      {!inline && <h3 className="text-sm font-semibold text-gray-800">New Team</h3>}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Team #</label>
          <input type="number" value={number} onChange={e => setNumber(e.target.value)} min={1} max={99}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Team Name (optional)</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={`Team ${number}`}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
        </div>
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={onCancel} className="flex-1 border border-gray-200 bg-white rounded-xl py-2 text-sm font-medium text-gray-600">Cancel</button>
        <button type="submit" disabled={saving} className="flex-1 bg-green-700 text-white rounded-xl py-2 text-sm font-semibold disabled:opacity-50">{saving ? 'Saving…' : 'Save'}</button>
      </div>
    </form>
  )
}
