import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSeason } from '../Season.jsx'
import * as store from '../../lib/store.js'
import { netScore, calcMatchPoints } from '../../lib/handicap.js'

export default function Overview() {
  const { season } = useSeason()
  const { seasonId } = useParams()
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)

  useEffect(() => { load() }, [seasonId])

  async function load() {
    const [allWeeks, allTeams, allTeamPlayers, allPlayers, allMatchups, allScores, allHandicaps] = await Promise.all([
      store.weeks.getBySeason(seasonId),
      store.teams.getBySeason(seasonId),
      store.teamPlayers.getAll(),
      store.players.getAll(),
      store.matchups.getAll(),
      store.scores.getAll(),
      store.handicaps.getAll(),
    ])

    const today = new Date()
    const played = allWeeks.filter(w => w.week_type !== 'bye' && w.date && new Date(w.date + 'T23:59:59') <= today)
    const nonBye = allWeeks.filter(w => w.week_type !== 'bye')
    const playedIds = new Set(played.map(w => w.id))
    const playedMatchups = allMatchups.filter(m => playedIds.has(m.week_id))

    const playerById = Object.fromEntries(allPlayers.map(p => [p.id, p]))
    const teamPlayersMap = {}
    for (const tp of allTeamPlayers) {
      if (!teamPlayersMap[tp.team_id]) teamPlayersMap[tp.team_id] = []
      teamPlayersMap[tp.team_id].push(tp.player_id)
    }
    const latestHcpMap = {}
    for (const h of allHandicaps) {
      if (!latestHcpMap[h.player_id] || new Date(h.calculated_at) > new Date(latestHcpMap[h.player_id].calculated_at))
        latestHcpMap[h.player_id] = h
    }
    const scoreMap = {}
    for (const s of allScores) scoreMap[`${s.matchup_id}_${s.player_id}`] = s

    const teamPoints = {}
    for (const t of allTeams) teamPoints[t.id] = 0
    for (const m of playedMatchups) {
      const getNet = (tid, idx) => {
        const pid = (teamPlayersMap[tid] || [])[idx]
        if (!pid) return null
        const sc = scoreMap[`${m.id}_${pid}`]
        if (!sc?.gross) return null
        return netScore(sc.gross, latestHcpMap[pid]?.value ?? 0)
      }
      const { homePoints, awayPoints } = calcMatchPoints({
        homeANet: getNet(m.home_team_id, 0), awayANet: getNet(m.away_team_id, 0),
        homeBNet: getNet(m.home_team_id, 1), awayBNet: getNet(m.away_team_id, 1),
      })
      teamPoints[m.home_team_id] = (teamPoints[m.home_team_id] || 0) + homePoints
      teamPoints[m.away_team_id] = (teamPoints[m.away_team_id] || 0) + awayPoints
    }

    const top3 = allTeams.map(t => ({
      ...t,
      points: teamPoints[t.id] || 0,
      names: (teamPlayersMap[t.id] || []).map(pid => {
        const p = playerById[pid]
        return p ? `${p.first_name || ''} ${p.last_name || ''}`.trim() : ''
      }).filter(Boolean)
    })).sort((a, b) => b.points - a.points).slice(0, 3)

    setStats({ weeksPlayed: played.length, totalWeeks: nonBye.length, top3, teamCount: allTeams.length })
  }

  return (
    <div className="px-4 py-4 max-w-2xl mx-auto space-y-4">
      {stats && (
        <>
          <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Progress</span>
              <span className="font-semibold text-gray-800">Week {stats.weeksPlayed} of {stats.totalWeeks}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-green-700 rounded-full h-2 transition-all"
                style={{ width: `${Math.round((stats.weeksPlayed / Math.max(stats.totalWeeks, 1)) * 100)}%` }} />
            </div>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-green-700">{stats.teamCount}</p>
                <p className="text-xs text-green-600">Teams</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-green-700">{stats.weeksPlayed}</p>
                <p className="text-xs text-green-600">Weeks Played</p>
              </div>
            </div>
          </div>

          {stats.top3.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-2.5 border-b border-gray-100">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Current Leaders</h3>
              </div>
              {stats.top3.map((t, i) => (
                <div key={t.id} className={`flex items-center gap-3 px-4 py-3 ${i < stats.top3.length - 1 ? 'border-b border-gray-50' : ''}`}>
                  <span className={`text-sm font-bold w-5 ${i === 0 ? 'text-green-700' : 'text-gray-400'}`}>{i + 1}</span>
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-gray-900">Team {t.number}</span>
                    {t.names.length > 0 && <span className="text-xs text-gray-400 ml-2">{t.names.join(' & ')}</span>}
                  </div>
                  <span className={`text-sm font-bold ${i === 0 ? 'text-green-700' : 'text-gray-700'}`}>{t.points} pts</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => navigate(`/season/${seasonId}/scores`)}
          className="bg-green-700 text-white rounded-xl py-3 text-sm font-semibold">
          Enter Scores
        </button>
        <button onClick={() => navigate(`/season/${seasonId}/stats`)}
          className="bg-white border border-gray-200 text-gray-700 rounded-xl py-3 text-sm font-semibold">
          Full Stats
        </button>
      </div>
    </div>
  )
}
