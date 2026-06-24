import { useEffect, useState } from 'react'
import * as store from '../../lib/store.js'

export default function Dues() {
  const [rows, setRows] = useState([])
  const [season, setSeason] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(null)

  useEffect(() => { loadDues() }, [])

  async function loadDues() {
    const s = await store.seasons.getActive()
    if (!s) { setLoading(false); return }
    setSeason(s)

    const [allTeams, allTeamPlayers, allPlayers, duesData] = await Promise.all([
      store.teams.getBySeason(s.id),
      store.teamPlayers.getAll(),
      store.players.getAll(),
      store.dues.getBySeason(s.id)
    ])

    const playerById = Object.fromEntries(allPlayers.map(p => [p.id, p]))
    const duesMap = Object.fromEntries(duesData.map(d => [d.player_id, d]))

    const result = allTeams.flatMap(team =>
      ['A', 'B'].map(slot => {
        const tp = allTeamPlayers.find(tp => tp.team_id === team.id && tp.slot === slot)
        if (!tp) return null
        const player = playerById[tp.player_id]
        if (!player) return null
        return {
          teamNumber: team.number,
          player,
          slot,
          dues: duesMap[player.id] || { player_id: player.id, season_id: s.id, amount: 20, paid_date: null }
        }
      }).filter(Boolean)
    )

    setRows(result)
    setLoading(false)
  }

  async function togglePaid(playerId, currentDues) {
    setSaving(playerId)
    const newPaidDate = currentDues.paid_date ? null : new Date().toISOString().split('T')[0]
    await store.dues.upsert({ ...currentDues, paid_date: newPaidDate })
    setRows(prev => prev.map(r =>
      r.player.id === playerId ? { ...r, dues: { ...r.dues, paid_date: newPaidDate } } : r
    ))
    setSaving(null)
  }

  const paid = rows.filter(r => r.dues.paid_date)
  const unpaid = rows.filter(r => !r.dues.paid_date)
  const totalCollected = paid.reduce((sum, r) => sum + (r.dues.amount || 20), 0)

  if (loading) return <div className="p-8 text-center text-gray-400">Loading…</div>

  return (
    <div className="px-4 py-4 max-w-2xl mx-auto space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {[['Paid', paid.length, 'green'], ['Unpaid', unpaid.length, 'red'], [`$${totalCollected}`, 'Collected', 'blue']].map(([val, label, color]) => (
          <div key={label} className={`rounded-xl p-3 text-center ${color === 'green' ? 'bg-green-50 text-green-700' : color === 'red' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'}`}>
            <p className="text-xl font-bold">{val}</p>
            <p className="text-xs font-medium mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-2.5 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700">Dues Status</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {rows.map(({ teamNumber, player, slot, dues: d }) => (
            <div key={player.id} className="flex items-center gap-3 px-4 py-3">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{player.name}</p>
                <p className="text-xs text-gray-400">Team {teamNumber} · {slot}</p>
                {d.paid_date && <p className="text-xs text-green-600 mt-0.5">Paid {fmtDate(d.paid_date)}</p>}
              </div>
              <button onClick={() => togglePaid(player.id, d)} disabled={saving === player.id}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 ${d.paid_date ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                {saving === player.id ? '…' : d.paid_date ? '✓ Paid' : 'Mark Paid'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function fmtDate(d) {
  return new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
