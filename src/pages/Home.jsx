import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import * as store from '../lib/store.js'
import { netScore, calcMatchPoints } from '../lib/handicap.js'

export default function Home() {
  const { isAdmin } = useAuth()
  const navigate = useNavigate()
  const [seasons, setSeasons] = useState([])
  const [activeStats, setActiveStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { load() }, [])

  async function load() {
    const all = await store.seasons.getAll()
    const sorted = all.sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
    setSeasons(sorted)
    const active = sorted.find(s => s.is_active)
    if (active) await loadActiveStats(active)
    setLoading(false)
  }

  async function loadActiveStats(season) {
    const [allWeeks, allTeams, allTeamPlayers, allPlayers, allMatchups, allScores, allHandicaps] = await Promise.all([
      store.weeks.getBySeason(season.id),
      store.teams.getBySeason(season.id),
      store.teamPlayers.getAll(),
      store.players.getAll(),
      store.matchups.getAll(),
      store.scores.getAll(),
      store.handicaps.getAll(),
    ])

    const today = new Date()
    const played = allWeeks.filter(w => w.week_type !== 'bye' && w.date && new Date(w.date + 'T23:59:59') <= today)
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
      if (!latestHcpMap[h.player_id] || new Date(h.calculated_at) > new Date(latestHcpMap[h.player_id].calculated_at)) {
        latestHcpMap[h.player_id] = h
      }
    }
    const scoreMap = {}
    for (const s of allScores) scoreMap[`${s.matchup_id}_${s.player_id}`] = s

    const teamPoints = {}
    for (const t of allTeams) teamPoints[t.id] = 0

    for (const m of playedMatchups) {
      const getNet = (teamId, idx) => {
        const pids = teamPlayersMap[teamId] || []
        const pid = pids[idx]
        if (!pid) return null
        const sc = scoreMap[`${m.id}_${pid}`]
        if (!sc || sc.gross == null) return null
        return netScore(sc.gross, latestHcpMap[pid]?.value ?? 0)
      }
      const { homePoints, awayPoints } = calcMatchPoints({
        homeANet: getNet(m.home_team_id, 0), awayANet: getNet(m.away_team_id, 0),
        homeBNet: getNet(m.home_team_id, 1), awayBNet: getNet(m.away_team_id, 1),
      })
      teamPoints[m.home_team_id] = (teamPoints[m.home_team_id] || 0) + homePoints
      teamPoints[m.away_team_id] = (teamPoints[m.away_team_id] || 0) + awayPoints
    }

    const standings = allTeams.map(t => ({
      ...t,
      points: teamPoints[t.id] || 0,
      names: (teamPlayersMap[t.id] || []).map(pid => {
        const p = playerById[pid]
        return p ? `${p.first_name || ''} ${p.last_name || ''}`.trim() : ''
      }).filter(Boolean),
    })).sort((a, b) => b.points - a.points)

    const nonByeWeeks = allWeeks.filter(w => w.week_type !== 'bye')
    setActiveStats({ season, weeksPlayed: played.length, totalWeeks: nonByeWeeks.length, top3: standings.slice(0, 3) })
  }

  async function setActive(id) {
    await store.seasons.setActive(id)
    setActiveStats(null)
    await load()
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-4xl animate-bounce">⛳</div>
    </div>
  )

  const activeSeason = seasons.find(s => s.is_active)
  const pastSeasons = seasons.filter(s => !s.is_active)

  return (
    <div className="px-4 py-4 max-w-2xl mx-auto space-y-4">
      {activeSeason && activeStats && (
        <div className="bg-green-800 text-white rounded-2xl shadow-lg p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-xl font-bold">{activeSeason.name}</h2>
              <p className="text-green-200 text-sm mt-0.5">
                Week {activeStats.weeksPlayed} of {activeStats.totalWeeks} played
              </p>
            </div>
            <span className="text-xs bg-green-600 px-2 py-1 rounded-full font-medium">Active</span>
          </div>
          <div className="w-full bg-green-700 rounded-full h-2 mb-4">
            <div
              className="bg-white rounded-full h-2 transition-all"
              style={{ width: `${Math.round((activeStats.weeksPlayed / Math.max(activeStats.totalWeeks, 1)) * 100)}%` }}
            />
          </div>
          {activeStats.top3.length > 0 && (
            <div className="space-y-1.5 mb-4">
              <p className="text-green-300 text-xs font-semibold uppercase tracking-wide">Current Leaders</p>
              {activeStats.top3.map((t, i) => (
                <div key={t.id} className="flex items-center gap-3">
                  <span className="text-green-300 text-sm font-bold w-4">{i + 1}</span>
                  <div className="flex-1">
                    <span className="text-sm font-semibold">Team {t.number}</span>
                    {t.names.length > 0 && (
                      <span className="text-green-300 text-xs ml-2">{t.names.join(' & ')}</span>
                    )}
                  </div>
                  <span className="text-sm font-bold">{t.points} pts</span>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/scores')}
              className="flex-1 bg-white text-green-800 rounded-xl py-2 text-sm font-semibold"
            >
              Enter Scores
            </button>
            <button
              onClick={() => navigate('/stats')}
              className="flex-1 bg-green-700 text-white rounded-xl py-2 text-sm font-semibold border border-green-600"
            >
              Full Stats
            </button>
          </div>
        </div>
      )}

      {activeSeason && !activeStats && (
        <div className="bg-green-800 text-white rounded-2xl shadow-lg p-5">
          <h2 className="text-xl font-bold">{activeSeason.name}</h2>
          <p className="text-green-200 text-sm mt-1">Season in progress</p>
          <button
            onClick={() => navigate('/scores')}
            className="mt-3 w-full bg-white text-green-800 rounded-xl py-2 text-sm font-semibold"
          >
            Enter Scores
          </button>
        </div>
      )}

      {isAdmin && (
        <button
          onClick={() => navigate('/seasons')}
          className="w-full bg-white border-2 border-dashed border-gray-200 rounded-2xl py-4 text-sm font-medium text-gray-500 hover:border-green-400 hover:text-green-700 transition-colors"
        >
          + New Season
        </button>
      )}

      {pastSeasons.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-2.5 border-b border-gray-100">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Past Seasons</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {pastSeasons.map(s => (
              <div key={s.id} className="px-4 py-3.5 flex items-center gap-3">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{s.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{s.weeks} weeks · Par {s.par}</p>
                </div>
                <div className="flex gap-2 items-center">
                  {isAdmin && (
                    <button
                      onClick={() => setActive(s.id)}
                      className="text-xs border border-gray-200 text-gray-500 px-2.5 py-1 rounded-lg hover:bg-gray-50"
                    >
                      Set Active
                    </button>
                  )}
                  <span className="text-xs bg-gray-100 text-gray-400 px-2 py-1 rounded-full">Archived</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
