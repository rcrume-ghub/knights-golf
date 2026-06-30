import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSeason } from '../Season.jsx'
import * as store from '../../lib/store.js'
import { netScore, calcMatchPoints } from '../../lib/handicap.js'

export default function SeasonStats() {
  const { seasonId } = useParams()
  const { season } = useSeason()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { load() }, [seasonId])

  async function load() {
    const [allWeeks, allTeams, allTeamPlayers, allPlayers, allMatchups, allScores, allHandicaps, allHcpStart] = await Promise.all([
      store.weeks.getBySeason(seasonId),
      store.teams.getBySeason(seasonId),
      store.teamPlayers.getAll(),
      store.players.getAll(),
      store.matchups.getAll(),
      store.scores.getAll(),
      store.handicaps.getAll(),
      store.seasonPlayerHcp.getBySeason(seasonId),
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
    const startHcpMap = {}
    for (const h of allHcpStart) startHcpMap[h.player_id] = h.prev_season_hcp
    const scoreMap = {}
    for (const sc of allScores) scoreMap[`${sc.matchup_id}_${sc.player_id}`] = sc

    const teamStats = {}
    for (const t of allTeams) teamStats[t.id] = { points: 0 }
    const playerStats = {}
    for (const t of allTeams) {
      for (const pid of (teamPlayersMap[t.id] || [])) {
        if (!playerStats[pid]) playerStats[pid] = { teamId: t.id, points: 0, grossScores: [], netScores: [] }
      }
    }

    for (const m of playedMatchups) {
      const getEntry = (teamId, idx) => {
        const pids = teamPlayersMap[teamId] || []
        const pid = pids[idx]
        if (!pid) return null
        const sc = scoreMap[`${m.id}_${pid}`]
        if (!sc || sc.gross == null) return null
        const hcp = latestHcpMap[pid]?.value ?? 0
        return { pid, gross: sc.gross, net: netScore(sc.gross, hcp) }
      }
      const hA = getEntry(m.home_team_id, 0)
      const hB = getEntry(m.home_team_id, 1)
      const aA = getEntry(m.away_team_id, 0)
      const aB = getEntry(m.away_team_id, 1)
      const { homePoints, awayPoints } = calcMatchPoints({
        homeANet: hA?.net ?? null, awayANet: aA?.net ?? null,
        homeBNet: hB?.net ?? null, awayBNet: aB?.net ?? null,
      })
      if (teamStats[m.home_team_id]) teamStats[m.home_team_id].points += homePoints
      if (teamStats[m.away_team_id]) teamStats[m.away_team_id].points += awayPoints

      const addEntry = (entry, pts) => {
        if (!entry || !playerStats[entry.pid]) return
        playerStats[entry.pid].points += pts
        playerStats[entry.pid].grossScores.push(entry.gross)
        playerStats[entry.pid].netScores.push(entry.net)
      }
      if (hA && aA) {
        addEntry(hA, hA.net < aA.net ? 1 : hA.net === aA.net ? 0.5 : 0)
        addEntry(aA, aA.net < hA.net ? 1 : hA.net === aA.net ? 0.5 : 0)
      }
      if (hB && aB) {
        addEntry(hB, hB.net < aB.net ? 1 : hB.net === aB.net ? 0.5 : 0)
        addEntry(aB, aB.net < hB.net ? 1 : hB.net === aB.net ? 0.5 : 0)
      }
    }

    const teamById = Object.fromEntries(allTeams.map(t => [t.id, t]))
    const teamStandings = allTeams.map(t => ({
      ...t, ...teamStats[t.id], playerIds: teamPlayersMap[t.id] || []
    })).sort((a, b) => b.points - a.points)

    const allPlayerStats = Object.entries(playerStats).map(([pid, s]) => ({
      pid, player: playerById[pid], ...s,
      bestGross: s.grossScores.length ? Math.min(...s.grossScores) : null,
      bestNet: s.netScores.length ? Math.min(...s.netScores) : null,
      currentHcp: latestHcpMap[pid]?.value ?? null,
      startHcp: startHcpMap[pid] ?? null,
    })).filter(p => p.player)

    setData({ teamStandings, allPlayerStats, weeksPlayed: played.length, playerById, teamById })
    setLoading(false)
  }

  if (loading) return (
    <div className="flex items-center justify-center h-48">
      <div className="text-center text-gray-400">
        <div className="text-3xl mb-2 animate-pulse">🏆</div>
        <p className="text-sm">Loading stats…</p>
      </div>
    </div>
  )

  if (!data) return <div className="p-8 text-center text-gray-400 text-sm">No data yet.</div>

  const { teamStandings, allPlayerStats, weeksPlayed, playerById, teamById } = data
  const withScores = allPlayerStats.filter(p => p.grossScores.length > 0)
  const topGross = [...withScores].sort((a, b) => a.bestGross - b.bestGross).slice(0, 5)
  const topNet = [...withScores].sort((a, b) => a.bestNet - b.bestNet).slice(0, 5)
  const topPoints = [...allPlayerStats].filter(p => p.points > 0).sort((a, b) => b.points - a.points).slice(0, 5)
  const hcpPlayers = allPlayerStats.filter(p => p.currentHcp != null).sort((a, b) => a.currentHcp - b.currentHcp)

  const pName = (pid) => {
    const p = playerById[pid]
    return p ? `${p.first_name || ''} ${p.last_name || ''}`.trim() : '?'
  }

  return (
    <div className="px-4 py-4 max-w-2xl mx-auto space-y-5">

      {/* Header */}
      <div className="bg-green-800 rounded-xl px-4 py-3 text-white">
        <h2 className="font-bold text-base">{season.name} — Season Stats</h2>
        <p className="text-xs text-green-300 mt-0.5">Through Week {weeksPlayed}</p>
      </div>

      {/* Team Standings */}
      <StatSection title="🏆 Season Standings">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-700 text-white text-xs">
              <th className="px-3 py-2 text-left w-8">#</th>
              <th className="px-3 py-2 text-left">Team</th>
              <th className="px-3 py-2 text-left">Players</th>
              <th className="px-3 py-2 text-right">Pts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {teamStandings.map((t, i) => (
              <tr key={t.id} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-3 py-2.5">
                  <span className={`font-bold text-sm ${i < 3 ? 'text-green-700' : 'text-gray-400'}`}>{i + 1}</span>
                </td>
                <td className="px-3 py-2.5 font-semibold text-gray-900 text-sm">Team {t.number}</td>
                <td className="px-3 py-2.5 text-xs text-gray-500">
                  {t.playerIds.map(pName).filter(Boolean).join(' & ')}
                </td>
                <td className="px-3 py-2.5 text-right">
                  <span className={`font-bold text-sm ${i < 3 ? 'text-green-700' : 'text-gray-700'}`}>
                    {t.points % 1 === 0 ? t.points : t.points.toFixed(1)}
                  </span>
                </td>
              </tr>
            ))}
            {teamStandings.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-6 text-center text-xs text-gray-400">No data yet.</td></tr>
            )}
          </tbody>
        </table>
      </StatSection>

      {/* Top 3 Lowest HCP */}
      <StatSection title="🎯 Top 3 Lowest Handicap">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-700 text-white text-xs">
              <th className="px-3 py-2 text-left w-8">#</th>
              <th className="px-3 py-2 text-left">Player</th>
              <th className="px-3 py-2 text-left">Team</th>
              <th className="px-3 py-2 text-right">HCP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {hcpPlayers.slice(0, 3).map((p, i) => {
              const delta = p.startHcp != null ? p.currentHcp - p.startHcp : null
              return (
                <tr key={p.pid} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-3 py-2.5 font-bold text-gray-400 text-sm">{i + 1}.</td>
                  <td className="px-3 py-2.5 text-gray-800 text-sm">{pName(p.pid)}</td>
                  <td className="px-3 py-2.5 text-xs text-gray-500">Team {teamById[p.teamId]?.number ?? '?'}</td>
                  <td className="px-3 py-2.5 text-right">
                    <span className="font-bold text-blue-700">{Math.round(p.currentHcp)}</span>
                    {delta != null && (
                      <span className={`ml-1.5 text-xs font-medium ${delta < 0 ? 'text-green-600' : delta > 0 ? 'text-red-500' : 'text-gray-400'}`}>
                        {delta < 0 ? '▼' : delta > 0 ? '▲' : '–'}
                      </span>
                    )}
                  </td>
                </tr>
              )
            })}
            {hcpPlayers.length === 0 && <EmptyRow cols={4} />}
          </tbody>
        </table>
      </StatSection>

      {/* Lowest Gross */}
      <StatSection title="📊 Top 5 Lowest Score (w/o Handicap)">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-700 text-white text-xs">
              <th className="px-3 py-2 text-left w-8">#</th>
              <th className="px-3 py-2 text-left">Player</th>
              <th className="px-3 py-2 text-left">Team</th>
              <th className="px-3 py-2 text-right">Gross</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {topGross.map((p, i) => (
              <tr key={p.pid} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-3 py-2.5 font-bold text-gray-400 text-sm">{i + 1}.</td>
                <td className="px-3 py-2.5 text-gray-800 text-sm">{pName(p.pid)}</td>
                <td className="px-3 py-2.5 text-xs text-gray-500">Team {teamById[p.teamId]?.number ?? '?'}</td>
                <td className="px-3 py-2.5 text-right font-bold text-green-700">{p.bestGross}</td>
              </tr>
            ))}
            {topGross.length === 0 && <EmptyRow cols={4} />}
          </tbody>
        </table>
      </StatSection>

      {/* Lowest Net */}
      <StatSection title="📊 Top 5 Lowest Score (w/ Handicap)">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-700 text-white text-xs">
              <th className="px-3 py-2 text-left w-8">#</th>
              <th className="px-3 py-2 text-left">Player</th>
              <th className="px-3 py-2 text-left">Team</th>
              <th className="px-3 py-2 text-right">Net</th>
              <th className="px-3 py-2 text-right">Gross</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {topNet.map((p, i) => (
              <tr key={p.pid} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-3 py-2.5 font-bold text-gray-400 text-sm">{i + 1}.</td>
                <td className="px-3 py-2.5 text-gray-800 text-sm">{pName(p.pid)}</td>
                <td className="px-3 py-2.5 text-xs text-gray-500">Team {teamById[p.teamId]?.number ?? '?'}</td>
                <td className="px-3 py-2.5 text-right font-bold text-blue-700">{p.bestNet}</td>
                <td className="px-3 py-2.5 text-right text-xs text-gray-400">{p.bestGross}</td>
              </tr>
            ))}
            {topNet.length === 0 && <EmptyRow cols={5} />}
          </tbody>
        </table>
      </StatSection>

      {/* Most Individual Points */}
      <StatSection title="⭐ Most Individual Points">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-700 text-white text-xs">
              <th className="px-3 py-2 text-left w-8">#</th>
              <th className="px-3 py-2 text-left">Player</th>
              <th className="px-3 py-2 text-left">Team</th>
              <th className="px-3 py-2 text-right">Pts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {topPoints.map((p, i) => (
              <tr key={p.pid} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-3 py-2.5 font-bold text-gray-400 text-sm">{i + 1}.</td>
                <td className="px-3 py-2.5 text-gray-800 text-sm">{pName(p.pid)}</td>
                <td className="px-3 py-2.5 text-xs text-gray-500">Team {teamById[p.teamId]?.number ?? '?'}</td>
                <td className="px-3 py-2.5 text-right font-bold text-green-700">{p.points % 1 === 0 ? p.points : p.points.toFixed(1)}</td>
              </tr>
            ))}
            {topPoints.length === 0 && <EmptyRow cols={4} />}
          </tbody>
        </table>
      </StatSection>

      {/* Full HCP Tracker */}
      {hcpPlayers.length > 0 && (
        <StatSection title="📋 Handicap Tracker — All Players">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-green-700 text-white text-xs">
                <th className="px-3 py-2 text-left">Player</th>
                <th className="px-3 py-2 text-left">Team</th>
                <th className="px-3 py-2 text-right">HCP</th>
                <th className="px-3 py-2 text-right">Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {hcpPlayers.map((p, i) => {
                const delta = p.startHcp != null ? p.currentHcp - p.startHcp : null
                return (
                  <tr key={p.pid} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-3 py-2.5 text-gray-800 text-sm">{pName(p.pid)}</td>
                    <td className="px-3 py-2.5 text-xs text-gray-500">Team {teamById[p.teamId]?.number ?? '?'}</td>
                    <td className="px-3 py-2.5 text-right font-bold text-gray-900">{Math.round(p.currentHcp)}</td>
                    <td className="px-3 py-2.5 text-right">
                      {delta != null ? (
                        <span className={`text-xs font-semibold ${delta < 0 ? 'text-green-600' : delta > 0 ? 'text-red-500' : 'text-gray-400'}`}>
                          {delta < 0 ? '▼' : delta > 0 ? '▲' : '–'}{Math.abs(delta).toFixed(1)}
                        </span>
                      ) : <span className="text-xs text-gray-300">—</span>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </StatSection>
      )}
    </div>
  )
}

function StatSection({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
      <div className="px-4 py-2.5 border-b-2 border-green-700 bg-white">
        <h3 className="text-sm font-bold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  )
}

function EmptyRow({ cols }) {
  return <tr><td colSpan={cols} className="px-4 py-5 text-center text-xs text-gray-400">No data yet.</td></tr>
}
