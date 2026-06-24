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
        if (!playerStats[pid]) playerStats[pid] = { points: 0, grossScores: [], netScores: [] }
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

    setData({ teamStandings, allPlayerStats, weeksPlayed: played.length, playerById })
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

  if (!data) return (
    <div className="p-8 text-center text-gray-400 text-sm">No data yet.</div>
  )

  const { teamStandings, allPlayerStats, weeksPlayed, playerById } = data
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
    <div className="px-4 py-4 max-w-2xl mx-auto space-y-4">
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="font-bold text-gray-900">{season.name} Stats</h2>
        <p className="text-xs text-gray-400 mt-0.5">Through Week {weeksPlayed}</p>
      </div>

      <Section title="Team Standings">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-4 py-2 text-xs text-gray-400 font-semibold uppercase w-8">#</th>
              <th className="text-left px-2 py-2 text-xs text-gray-400 font-semibold uppercase">Team</th>
              <th className="text-right px-2 py-2 text-xs text-gray-400 font-semibold uppercase">Players</th>
              <th className="text-right px-4 py-2 text-xs text-gray-400 font-semibold uppercase">Pts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {teamStandings.map((t, i) => (
              <tr key={t.id} className={i < 3 ? 'bg-green-50' : ''}>
                <td className="px-4 py-2.5">
                  <span className={`font-bold text-sm ${i < 3 ? 'text-green-700' : 'text-gray-400'}`}>{i + 1}</span>
                </td>
                <td className="px-2 py-2.5 font-semibold text-gray-900 text-sm">Team {t.number}</td>
                <td className="px-2 py-2.5 text-right text-xs text-gray-400">
                  {t.playerIds.map(pName).filter(Boolean).join(' & ')}
                </td>
                <td className="px-4 py-2.5 text-right">
                  <span className={`font-bold ${i < 3 ? 'text-green-700' : 'text-gray-700'}`}>{t.points}</span>
                </td>
              </tr>
            ))}
            {teamStandings.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-6 text-center text-xs text-gray-400">No team data yet.</td></tr>
            )}
          </tbody>
        </table>
      </Section>

      <Section title="Lowest Gross Score (single round)">
        <LeaderList items={topGross} getValue={p => p.bestGross} unit="gross" pName={pName} />
      </Section>

      <Section title="Lowest Net Score (single round)">
        <LeaderList items={topNet} getValue={p => p.bestNet} unit="net" pName={pName} />
      </Section>

      <Section title="Most Individual Points">
        <LeaderList items={topPoints} getValue={p => p.points} unit="pts" pName={pName} />
      </Section>

      {hcpPlayers.length > 0 && (
        <Section title="Handicap Tracker">
          <div className="divide-y divide-gray-50">
            {hcpPlayers.map(p => {
              const delta = p.startHcp != null ? p.currentHcp - p.startHcp : null
              return (
                <div key={p.pid} className="px-4 py-2.5 flex items-center">
                  <span className="flex-1 text-sm text-gray-800">{pName(p.pid)}</span>
                  <span className="text-sm font-semibold text-gray-900 mr-2">{p.currentHcp.toFixed(1)}</span>
                  {delta != null && (
                    <span className={`text-xs font-medium ${delta < 0 ? 'text-green-600' : delta > 0 ? 'text-red-500' : 'text-gray-400'}`}>
                      {delta < 0 ? '▼' : delta > 0 ? '▲' : '–'}{Math.abs(delta).toFixed(1)}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </Section>
      )}
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-4 py-2.5 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
      </div>
      {children}
    </div>
  )
}

function LeaderList({ items, getValue, unit, pName }) {
  return (
    <div className="divide-y divide-gray-50">
      {items.map((p, i) => (
        <div key={p.pid} className="px-4 py-2.5 flex items-center gap-3">
          <span className={`text-sm font-bold w-4 ${i === 0 ? 'text-green-700' : 'text-gray-400'}`}>{i + 1}</span>
          <span className="flex-1 text-sm text-gray-800">{pName(p.pid)}</span>
          <span className="text-sm font-semibold text-gray-900">
            {getValue(p)} <span className="text-xs text-gray-400">{unit}</span>
          </span>
        </div>
      ))}
      {items.length === 0 && (
        <p className="px-4 py-4 text-xs text-gray-400 text-center">No data yet.</p>
      )}
    </div>
  )
}
