import { useEffect, useState } from 'react'
import * as store from '../lib/store.js'
import { netScore, calcMatchPoints } from '../lib/handicap.js'

export default function Standings() {
  const [standings, setStandings] = useState([])
  const [season, setSeason] = useState(null)
  const [currentWeek, setCurrentWeek] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadStandings() }, [])

  async function loadStandings() {
    const s = await store.seasons.getActive()
    if (!s) { setLoading(false); return }
    setSeason(s)

    const [allWeeks, allTeams, allTeamPlayers, allPlayers, allMatchups, allScores, allHandicaps] = await Promise.all([
      store.weeks.getBySeason(s.id),
      store.teams.getBySeason(s.id),
      store.teamPlayers.getAll(),
      store.players.getAll(),
      store.matchups.getAll(),
      store.scores.getAll(),
      store.handicaps.getAll()
    ])

    const today = new Date()
    const played = allWeeks.filter(w => new Date(w.date + 'T23:59:59') <= today && w.week_type !== 'holiday')
    setCurrentWeek(played[played.length - 1] ?? null)

    const playerById = Object.fromEntries(allPlayers.map(p => [p.id, p]))
    const teamById = Object.fromEntries(allTeams.map(t => [t.id, t]))

    const teamPlayersMap = {}
    for (const tp of allTeamPlayers) {
      if (!teamPlayersMap[tp.team_id]) teamPlayersMap[tp.team_id] = {}
      teamPlayersMap[tp.team_id][tp.slot] = playerById[tp.player_id]
    }

    const hcpMap = {}
    for (const h of allHandicaps) {
      const key = `${h.player_id}_${h.week_id}`
      if (!hcpMap[key]) hcpMap[key] = h.value
    }

    const latestHcpMap = {}
    for (const h of allHandicaps) {
      if (!latestHcpMap[h.player_id] || new Date(h.calculated_at) > new Date(latestHcpMap[h.player_id].calculated_at)) {
        latestHcpMap[h.player_id] = h
      }
    }

    const scoreMap = {}
    for (const sc of allScores) scoreMap[`${sc.matchup_id}_${sc.player_id}`] = sc

    const playedWeekIds = new Set(played.map(w => w.id))
    const playedMatchups = allMatchups.filter(m => playedWeekIds.has(m.week_id))

    const teamPoints = Object.fromEntries(allTeams.map(t => [t.id, 0]))

    for (const m of playedMatchups) {
      const getNet = (teamId, slot) => {
        const player = teamPlayersMap[teamId]?.[slot]
        if (!player) return null
        const sc = scoreMap[`${m.id}_${player.id}`]
        if (!sc || sc.gross == null) return null
        const hcp = hcpMap[`${player.id}_${m.week_id}`] ?? latestHcpMap[player.id]?.value ?? 0
        return netScore(sc.gross, hcp)
      }

      const homeANet = getNet(m.home_team_id, 'A')
      const homeBNet = getNet(m.home_team_id, 'B')
      const awayANet = getNet(m.away_team_id, 'A')
      const awayBNet = getNet(m.away_team_id, 'B')

      if ([homeANet, homeBNet, awayANet, awayBNet].every(v => v == null)) continue

      const { homePoints, awayPoints } = calcMatchPoints({ homeANet, awayANet, homeBNet, awayBNet })
      if (teamPoints[m.home_team_id] != null) teamPoints[m.home_team_id] += homePoints
      if (teamPoints[m.away_team_id] != null) teamPoints[m.away_team_id] += awayPoints
    }

    const result = allTeams.map(t => ({
      ...t,
      players: ['A', 'B'].map(slot => teamPlayersMap[t.id]?.[slot]).filter(Boolean),
      total: teamPoints[t.id] || 0
    })).sort((a, b) => b.total - a.total)

    setStandings(result)
    setLoading(false)
  }

  if (loading) return <Spinner />

  return (
    <div className="px-4 py-4 max-w-2xl mx-auto space-y-4">
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="font-bold text-gray-900">{season?.name || '2026 Season'} Standings</h2>
        {currentWeek && <p className="text-xs text-gray-400 mt-0.5">Through Week {currentWeek.number}</p>}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide w-8">#</th>
              <th className="text-left px-2 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Team</th>
              <th className="text-right px-2 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Players</th>
              <th className="text-right px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Pts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {standings.map((team, idx) => (
              <tr key={team.id} className={idx < 3 ? 'bg-green-50' : ''}>
                <td className="px-4 py-3">
                  <span className={`font-bold ${idx < 3 ? 'text-green-700' : 'text-gray-400'}`}>{idx + 1}</span>
                </td>
                <td className="px-2 py-3 font-semibold text-gray-900">Team {team.number}</td>
                <td className="px-2 py-3 text-right text-xs text-gray-500">
                  {team.players.map(p => p.name).join(' & ')}
                </td>
                <td className="px-4 py-3 text-right">
                  <span className={`font-bold text-base ${idx < 3 ? 'text-green-700' : 'text-gray-700'}`}>
                    {team.total}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Spinner() {
  return (
    <div className="flex items-center justify-center h-48">
      <div className="text-center text-gray-400">
        <div className="text-3xl mb-2 animate-pulse">🏆</div>
        <p className="text-sm">Loading standings…</p>
      </div>
    </div>
  )
}
