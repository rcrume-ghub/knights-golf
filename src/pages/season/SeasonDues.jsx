import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSeason } from '../Season.jsx'
import * as store from '../../lib/store.js'

export default function SeasonDues() {
  const { seasonId } = useParams()
  const { season } = useSeason()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(null)
  const [editingAmount, setEditingAmount] = useState(null)

  useEffect(() => { loadDues() }, [seasonId])

  async function loadDues() {
    const [allTeams, allTeamPlayers, allPlayers, duesData] = await Promise.all([
      store.teams.getBySeason(seasonId),
      store.teamPlayers.getAll(),
      store.players.getAll(),
      store.dues.getBySeason(seasonId)
    ])

    const playerById = Object.fromEntries(allPlayers.map(p => [p.id, p]))
    const duesMap = Object.fromEntries(duesData.map(d => [d.player_id, d]))

    const result = allTeams.flatMap(team => {
      const tps = allTeamPlayers.filter(tp => tp.team_id === team.id)
      return tps.map(tp => {
        const player = playerById[tp.player_id]
        if (!player) return null
        return {
          teamNumber: team.number,
          player,
          dues: duesMap[player.id] || { player_id: player.id, season_id: seasonId, amount: 20, paid_date: null }
        }
      }).filter(Boolean)
    })

    setRows(result)
    setLoading(false)
  }

  async function togglePaid(playerId, currentDues) {
    setSaving(playerId)
    const newPaidDate = currentDues.paid_date ? null : new Date().toISOString().split('T')[0]
    const updated = { ...currentDues, paid_date: newPaidDate }
    await store.dues.upsert(updated)
    setRows(prev => prev.map(r =>
      r.player.id === playerId ? { ...r, dues: updated } : r
    ))
    setSaving(null)
  }

  async function updateAmount(playerId, currentDues, amount) {
    const updated = { ...currentDues, amount: parseFloat(amount) || 0 }
    await store.dues.upsert(updated)
    setRows(prev => prev.map(r =>
      r.player.id === playerId ? { ...r, dues: updated } : r
    ))
    setEditingAmount(null)
  }

  const paid = rows.filter(r => r.dues.paid_date)
  const unpaid = rows.filter(r => !r.dues.paid_date)
  const totalCollected = paid.reduce((sum, r) => sum + (r.dues.amount || 0), 0)

  if (loading) return <div className="p-8 text-center text-gray-400">Loading…</div>

  return (
    <div className="px-4 py-4 max-w-2xl mx-auto space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Paid" value={paid.length} color="green" />
        <StatCard label="Unpaid" value={unpaid.length} color="red" />
        <StatCard label="Collected" value={`$${totalCollected}`} color="blue" />
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-2.5 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700">Dues Status — {season?.name}</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {rows.map(({ teamNumber, player, dues: d }) => {
            const name = `${player.first_name || ''} ${player.last_name || ''}`.trim()
            return (
              <div key={player.id} className="flex items-center gap-3 px-4 py-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-400">Team {teamNumber}</span>
                    {editingAmount === player.id ? (
                      <form onSubmit={e => { e.preventDefault(); updateAmount(player.id, d, e.target.amt.value) }}
                        className="flex items-center gap-1">
                        <span className="text-xs text-gray-400">$</span>
                        <input name="amt" type="number" defaultValue={d.amount || 20}
                          className="w-14 border border-gray-200 rounded px-1 py-0.5 text-xs focus:outline-none focus:ring-1 focus:ring-green-600"
                          min={0} step={0.01} autoFocus />
                        <button type="submit" className="text-xs text-green-700 font-medium">Save</button>
                        <button type="button" onClick={() => setEditingAmount(null)} className="text-xs text-gray-400">×</button>
                      </form>
                    ) : (
                      <button onClick={() => setEditingAmount(player.id)}
                        className="text-xs text-gray-400 hover:text-green-700">
                        ${d.amount || 20}
                      </button>
                    )}
                  </div>
                  {d.paid_date && (
                    <p className="text-xs text-green-600 mt-0.5">Paid {fmtDate(d.paid_date)}</p>
                  )}
                </div>
                <button
                  onClick={() => togglePaid(player.id, d)}
                  disabled={saving === player.id}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 ${
                    d.paid_date ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                  {saving === player.id ? '…' : d.paid_date ? '✓ Paid' : 'Mark Paid'}
                </button>
              </div>
            )
          })}
          {rows.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-gray-400">No players found for this season.</p>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, color }) {
  const cls = {
    green: 'bg-green-50 text-green-700',
    red: 'bg-red-50 text-red-700',
    blue: 'bg-blue-50 text-blue-700',
  }
  return (
    <div className={`rounded-xl p-3 text-center ${cls[color]}`}>
      <p className="text-xl font-bold">{value}</p>
      <p className="text-xs font-medium mt-0.5">{label}</p>
    </div>
  )
}

function fmtDate(d) {
  return new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
