import { useEffect, useState } from 'react'
import * as store from '../lib/store.js'

export default function Handicaps() {
  const [byTeam, setByTeam] = useState([])
  const [allWeeks, setAllWeeks] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => { loadData() }, [])

  async function loadData() {
    const s = await store.seasons.getActive()
    if (!s) { setLoading(false); return }

    const [allTeams, allTeamPlayers, allPlayers, allHandicaps, allScores, allMatchups, w] = await Promise.all([
      store.teams.getBySeason(s.id),
      store.teamPlayers.getAll(),
      store.players.getAll(),
      store.handicaps.getAll(),
      store.scores.getAll(),
      store.matchups.getAll(),
      store.weeks.getBySeason(s.id)
    ])

    const playerById = Object.fromEntries(allPlayers.map(p => [p.id, p]))
    const matchupById = Object.fromEntries(allMatchups.map(m => [m.id, m]))

    const scoreGrid = {}
    for (const sc of allScores) {
      const weekId = matchupById[sc.matchup_id]?.week_id
      if (!weekId) continue
      if (!scoreGrid[sc.player_id]) scoreGrid[sc.player_id] = {}
      scoreGrid[sc.player_id][weekId] = { gross: sc.gross, isBlind: sc.is_blind }
    }

    const hcpGrid = {}
    for (const h of allHandicaps) {
      if (!hcpGrid[h.player_id]) hcpGrid[h.player_id] = {}
      if (h.week_id) hcpGrid[h.player_id][h.week_id] = h.value
    }

    const latestHcpMap = {}
    for (const h of allHandicaps) {
      if (!latestHcpMap[h.player_id] || new Date(h.calculated_at) > new Date(latestHcpMap[h.player_id].calculated_at)) {
        latestHcpMap[h.player_id] = h
      }
    }

    const teams = allTeams.map(team => {
      const tps = allTeamPlayers.filter(tp => tp.team_id === team.id)
      const teamPlayersList = tps.map(tp => {
        const player = playerById[tp.player_id]
        if (!player) return null
        return {
          player,
          currentHcp: latestHcpMap[player.id]?.value ?? null,
          scoreGrid: scoreGrid[player.id] || {},
          hcpGrid: hcpGrid[player.id] || {}
        }
      }).filter(Boolean).sort((a, b) => (a.currentHcp ?? 99) - (b.currentHcp ?? 99))

      return { team, players: teamPlayersList }
    })

    setByTeam(teams)
    setAllWeeks(w)
    setLoading(false)
  }

  if (loading) return (
    <div className="flex items-center justify-center h-48">
      <div className="text-center text-gray-400">
        <div className="text-3xl mb-2 animate-pulse">📊</div>
        <p className="text-sm">Loading…</p>
      </div>
    </div>
  )

  return (
    <div className="px-4 py-4 max-w-2xl mx-auto space-y-3">
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="font-bold text-gray-900">Handicaps</h2>
        <p className="text-xs text-gray-400 mt-0.5">Tap a player for their score history</p>
      </div>

      {byTeam.map(({ team, players }) => (
        <div key={team.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-100">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Team {team.number}</span>
          </div>
          {players.map(({ player, currentHcp, scoreGrid, hcpGrid }, idx) => {
            const isExpanded = expanded === player.id
            const playedWeeks = allWeeks.filter(w => scoreGrid[w.id] != null)
            const fullName = `${player.first_name || ''} ${player.last_name || ''}`.trim()
            const slot = idx === 0 ? 'A' : 'B'
            return (
              <div key={player.id} className="border-b border-gray-50 last:border-0">
                <button
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => setExpanded(isExpanded ? null : player.id)}
                >
                  <div>
                    <span className="font-medium text-gray-900 text-sm">{fullName}</span>
                    <span className="text-xs text-gray-400 ml-2">({slot})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {currentHcp != null && (
                      <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded-full">{currentHcp}</span>
                    )}
                    <svg className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {isExpanded && (
                  <div className="px-4 pb-3 bg-gray-50">
                    <table className="text-xs w-full">
                      <thead>
                        <tr>
                          <th className="text-left py-1 pr-3 text-gray-400 font-medium">Wk</th>
                          <th className="text-right py-1 pr-3 text-gray-400 font-medium">Gross</th>
                          <th className="text-right py-1 text-gray-400 font-medium">Hdcp</th>
                        </tr>
                      </thead>
                      <tbody>
                        {playedWeeks.map(w => {
                          const d = scoreGrid[w.id]
                          return (
                            <tr key={w.id}>
                              <td className="py-0.5 pr-3 text-gray-500">{w.number}</td>
                              <td className="py-0.5 pr-3 text-right text-gray-700 font-medium">
                                {d.isBlind ? <span className="text-gray-400 italic">blind</span> : d.gross ?? '—'}
                              </td>
                              <td className="py-0.5 text-right text-gray-700">{hcpGrid[w.id] ?? '—'}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                    {playedWeeks.length === 0 && <p className="text-xs text-gray-400 py-2">No scores yet</p>}
                  </div>
                )}
              </div>
            )
          })}
          {players.length === 0 && (
            <p className="px-4 py-4 text-xs text-gray-400">No players assigned.</p>
          )}
        </div>
      ))}
    </div>
  )
}
