import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSeason } from '../Season.jsx'
import * as store from '../../lib/store.js'
import { netScore, calcMatchPoints, getNine } from '../../lib/handicap.js'

export default function Overview() {
  const { season, refreshSeason } = useSeason()
  const { seasonId } = useParams()
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)
  const [endModal, setEndModal] = useState(false)

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
    const sortedWeeks = allWeeks.filter(w => w.date && w.week_type !== 'bye').sort((a, b) => new Date(a.date) - new Date(b.date))
    const currentWeek = (() => {
      for (const w of sortedWeeks) {
        const diff = Math.abs(today - new Date(w.date + 'T12:00:00')) / 86400000
        if (diff < 4) return w
      }
      return sortedWeeks.find(w => new Date(w.date + 'T12:00:00') >= today) || sortedWeeks[sortedWeeks.length - 1]
    })()
    const played = allWeeks.filter(w => w.week_type !== 'bye' && w.week_type !== 'scramble' && w.week_type !== 'end_scramble' && w.date && new Date(w.date + 'T23:59:59') <= today)
    const nonBye = allWeeks.filter(w => w.week_type !== 'bye')
    const playedIds = new Set(played.map(w => w.id))
    const playedMatchups = allMatchups.filter(m => playedIds.has(m.week_id))
    const seasonMatchupIds = new Set(allMatchups.map(m => m.id))

    const playerById = Object.fromEntries(allPlayers.map(p => [p.id, p]))

    // Raw team→player IDs
    const teamPlayerIds = {}
    for (const tp of allTeamPlayers) {
      if (!teamPlayerIds[tp.team_id]) teamPlayerIds[tp.team_id] = []
      teamPlayerIds[tp.team_id].push(tp.player_id)
    }

    // Latest HCP per player
    const latestHcpMap = {}
    for (const h of allHandicaps) {
      if (!latestHcpMap[h.player_id] || new Date(h.calculated_at) > new Date(latestHcpMap[h.player_id].calculated_at))
        latestHcpMap[h.player_id] = h
    }

    // Sorted roster per team: lowest HCP = A slot
    const teamRoster = {}
    for (const t of allTeams) {
      const pids = teamPlayerIds[t.id] || []
      const players = pids.map(pid => {
        const p = playerById[pid]
        return p ? { ...p, hcp: latestHcpMap[pid]?.value ?? 99 } : null
      }).filter(Boolean).sort((a, b) => a.hcp - b.hcp)
      teamRoster[t.id] = players.map((p, i) => ({ ...p, slot: i === 0 ? 'A' : 'B' }))
    }

    const scoreMap = {}
    for (const s of allScores) scoreMap[`${s.matchup_id}_${s.player_id}`] = s

    const weekById = Object.fromEntries(allWeeks.map(w => [w.id, w]))

    // Standings: total match points per team
    const teamPoints = {}
    for (const t of allTeams) teamPoints[t.id] = 0
    for (const m of playedMatchups) {
      const wk = weekById[m.week_id]
      const nine = getNine(wk?.date, season.start_date)
      const blindScore = nine === 'Back 9' ? (season.blind_score ?? 39) + 1 : (season.blind_score ?? 39)

      const getScore = (tid, idx) => {
        const p = (teamRoster[tid] || [])[idx]
        if (!p) return null
        return scoreMap[`${m.id}_${p.id}`] ?? null
      }
      const getNet = (tid, idx) => {
        const sc = getScore(tid, idx)
        if (!sc) return null
        if (sc.is_blind) return blindScore
        const p = (teamRoster[tid] || [])[idx]
        return sc.gross != null ? netScore(sc.gross, p?.hcp ?? 0) : null
      }
      const homeHasBozo = [getScore(m.home_team_id, 0), getScore(m.home_team_id, 1)].some(s => s?.is_blind)
      const awayHasBozo = [getScore(m.away_team_id, 0), getScore(m.away_team_id, 1)].some(s => s?.is_blind)

      const { homePoints, awayPoints } = calcMatchPoints({
        homeANet: getNet(m.home_team_id, 0), awayANet: getNet(m.away_team_id, 0),
        homeBNet: getNet(m.home_team_id, 1), awayBNet: getNet(m.away_team_id, 1),
        homeHasBozo, awayHasBozo,
      })
      teamPoints[m.home_team_id] = (teamPoints[m.home_team_id] || 0) + homePoints
      teamPoints[m.away_team_id] = (teamPoints[m.away_team_id] || 0) + awayPoints
    }

    const top5 = allTeams.map(t => ({
      ...t,
      points: teamPoints[t.id] || 0,
      roster: teamRoster[t.id] || [],
    })).sort((a, b) => b.points - a.points).slice(0, 5)

    // Top 3 lowest HCP (season players only)
    const seasonPlayerIds = new Set(allTeams.flatMap(t => (teamPlayerIds[t.id] || [])))
    const teamByPlayerId = {}
    for (const t of allTeams) {
      for (const p of (teamRoster[t.id] || [])) teamByPlayerId[p.id] = { team: t, slot: p.slot }
    }
    const lowestHcp = [...seasonPlayerIds]
      .map(pid => {
        const p = playerById[pid]
        const hcp = latestHcpMap[pid]?.value
        if (!p || hcp == null) return null
        return { player: p, hcp, ...teamByPlayerId[pid] }
      })
      .filter(Boolean)
      .sort((a, b) => a.hcp - b.hcp)
      .slice(0, 3)

    // Top 3 lowest gross score (best single round, no HCP, season scores only)
    const bestGross = {}
    const bestNet = {}
    for (const s of allScores) {
      if (!s.is_blind && s.gross != null && seasonMatchupIds.has(s.matchup_id)) {
        if (!bestGross[s.player_id] || s.gross < bestGross[s.player_id].gross) {
          bestGross[s.player_id] = { gross: s.gross }
        }
        const hcp = latestHcpMap[s.player_id]?.value
        if (hcp != null) {
          const net = s.gross - Math.round(hcp)
          if (!bestNet[s.player_id] || net < bestNet[s.player_id].net) {
            bestNet[s.player_id] = { net, gross: s.gross }
          }
        }
      }
    }
    const lowestGross = Object.entries(bestGross)
      .map(([pid, data]) => {
        const p = playerById[pid]
        if (!p) return null
        const hcp = latestHcpMap[pid]?.value
        return { player: p, gross: data.gross, hcp, ...teamByPlayerId[pid] }
      })
      .filter(Boolean)
      .sort((a, b) => a.gross - b.gross)
      .slice(0, 3)

    const lowestNet = Object.entries(bestNet)
      .map(([pid, data]) => {
        const p = playerById[pid]
        if (!p) return null
        const hcp = latestHcpMap[pid]?.value
        return { player: p, net: data.net, gross: data.gross, hcp, ...teamByPlayerId[pid] }
      })
      .filter(Boolean)
      .sort((a, b) => a.net - b.net)
      .slice(0, 3)

    // Last week's results
    const scoringWeeksSorted = played.slice().sort((a, b) => new Date(b.date) - new Date(a.date))
    const lastWeek = scoringWeeksSorted[0] || null
    let lastWeekResults = null
    if (lastWeek) {
      const lastMatchups = allMatchups.filter(m => m.week_id === lastWeek.id)
      const nine = getNine(lastWeek.date, season.start_date)
      const blindScore = nine === 'Back 9' ? (season.blind_score ?? 39) + 1 : (season.blind_score ?? 39)
      const teamById = Object.fromEntries(allTeams.map(t => [t.id, t]))

      const getScore = (tid, idx, mid) => {
        const p = (teamRoster[tid] || [])[idx]
        return p ? (scoreMap[`${mid}_${p.id}`] ?? null) : null
      }
      const getNet = (tid, idx, mid) => {
        const sc = getScore(tid, idx, mid)
        if (!sc) return null
        if (sc.is_blind) return blindScore
        const p = (teamRoster[tid] || [])[idx]
        return sc.gross != null ? netScore(sc.gross, p?.hcp ?? 0) : null
      }

      lastWeekResults = {
        week: lastWeek,
        nine,
        matchups: lastMatchups.map(m => {
          const homeHasBozo = [0,1].some(i => getScore(m.home_team_id, i, m.id)?.is_blind)
          const awayHasBozo = [0,1].some(i => getScore(m.away_team_id, i, m.id)?.is_blind)
          const { homePoints, awayPoints, breakdown } = calcMatchPoints({
            homeANet: getNet(m.home_team_id, 0, m.id), awayANet: getNet(m.away_team_id, 0, m.id),
            homeBNet: getNet(m.home_team_id, 1, m.id), awayBNet: getNet(m.away_team_id, 1, m.id),
            homeHasBozo, awayHasBozo,
          })
          const mapPlayers = (tid) => (teamRoster[tid] || []).slice(0, 2).map((p, i) => {
            const sc = getScore(tid, i, m.id)
            return { ...p, gross: sc?.gross ?? null, isBlind: sc?.is_blind ?? false, net: getNet(tid, i, m.id) }
          })
          return {
            id: m.id,
            homeTeam: teamById[m.home_team_id],
            awayTeam: teamById[m.away_team_id],
            homePlayers: mapPlayers(m.home_team_id),
            awayPlayers: mapPlayers(m.away_team_id),
            homePoints, awayPoints, breakdown,
          }
        }),
      }
    }

    // Missing scores audit
    const missingScores = []
    const teamById = Object.fromEntries(allTeams.map(t => [t.id, t]))
    for (const week of played) {
      const weekMatchups = allMatchups.filter(m => m.week_id === week.id)
      for (const m of weekMatchups) {
        for (const [tid] of [[m.home_team_id], [m.away_team_id]]) {
          const players = (teamRoster[tid] || []).slice(0, 2)
          for (const p of players) {
            if (!scoreMap[`${m.id}_${p.id}`]) {
              missingScores.push({
                weekNum: week.number,
                weekDate: week.date,
                team: teamById[tid],
                playerName: `${p.first_name} ${p.last_name}`.trim(),
                slot: p.slot,
              })
            }
          }
        }
      }
    }

    setStats({
      weeksPlayed: played.length,
      totalWeeks: nonBye.length,
      teamCount: allTeams.length,
      currentWeek,
      top5,
      lowestHcp,
      lowestGross,
      lowestNet,
      lastWeekResults,
      missingScores,
      allWeeks,
      allTeams,
      teamRoster,
      teamPlayerIds,
      allMatchups,
      scoreMap,
    })
  }

  if (!stats) return (
    <div className="flex items-center justify-center h-48">
      <div className="text-3xl animate-pulse">⛳</div>
    </div>
  )

  const rankColor = i => i === 0 ? 'text-yellow-500' : i === 1 ? 'text-gray-400' : i === 2 ? 'text-amber-600' : 'text-gray-300'
  const rankNum = i => i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`

  return (
    <div className="px-4 py-4 max-w-2xl mx-auto space-y-4">
      {/* Progress */}
      <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
        <div className="flex justify-between items-baseline text-sm">
          <span className="text-gray-500">Season Progress</span>
          <div className="text-right">
            <span className="font-semibold text-gray-800">Week {stats.weeksPlayed} of {stats.totalWeeks}</span>
            {stats.currentWeek?.date && (
              <p className="text-xs text-gray-400 mt-0.5">{fmtDate(stats.currentWeek.date)}</p>
            )}
          </div>
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

      {/* Missing Scores Alert */}
      {stats.missingScores.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-amber-200">
          <div className="px-4 py-2.5 bg-amber-50 border-b border-amber-100 flex items-center justify-between">
            <h3 className="text-xs font-semibold text-amber-700 uppercase tracking-wide">⚠ Missing Scores</h3>
            <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full font-semibold">{stats.missingScores.length} missing</span>
          </div>
          <div className="divide-y divide-gray-50 max-h-48 overflow-y-auto">
            {Object.entries(
              stats.missingScores.reduce((acc, s) => {
                const key = `Week ${s.weekNum}${s.weekDate ? ` — ${fmtDate(s.weekDate)}` : ''}`
                if (!acc[key]) acc[key] = []
                acc[key].push(s)
                return acc
              }, {})
            ).map(([weekLabel, entries]) => (
              <div key={weekLabel} className="px-4 py-2.5">
                <p className="text-xs font-semibold text-gray-700 mb-1">{weekLabel}</p>
                <div className="space-y-0.5">
                  {entries.map((e, i) => (
                    <p key={i} className="text-xs text-amber-700">
                      Team {e.team?.number} · ({e.slot}) {e.playerName}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 py-2.5 border-t border-gray-100">
            <button onClick={() => navigate(`/season/${seasonId}/scores`)}
              className="text-xs text-green-700 font-semibold">Go to Scores →</button>
          </div>
        </div>
      )}

      {/* Action buttons — moved up under progress */}
      <div className="grid grid-cols-2 gap-3">
        {!season.is_completed && (
          <button onClick={() => navigate(`/season/${seasonId}/scores`)}
            className="bg-green-700 text-white rounded-xl py-3 text-sm font-semibold">
            Enter Scores
          </button>
        )}
        <button onClick={() => navigate(`/season/${seasonId}/stats`)}
          className={`bg-white border border-gray-200 text-gray-700 rounded-xl py-3 text-sm font-semibold ${season.is_completed ? 'col-span-2' : ''}`}>
          Full Stats
        </button>
      </div>

      {/* Last Week's Results */}
      {stats.lastWeekResults && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-2.5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Last Week's Results</h3>
            <span className="text-xs text-gray-400">Week {stats.lastWeekResults.week.number} · {fmtDate(stats.lastWeekResults.week.date)}</span>
          </div>
          <div className="divide-y divide-gray-50">
            {stats.lastWeekResults.matchups.map(m => {
              const homeWon = m.homePoints > m.awayPoints
              const awayWon = m.awayPoints > m.homePoints
              return (
                <div key={m.id} className="px-4 py-3 space-y-2">
                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                    {/* Home */}
                    <div style={{ backgroundColor: '#F3E4C9' }} className="rounded-lg px-3 py-2">
                      <p className="text-xs font-bold text-gray-800">Team {m.homeTeam?.number}</p>
                      {m.homePlayers.map((p, i) => (
                        <p key={p.id} className="text-xs text-gray-600 truncate">
                          ({p.slot}) {p.first_name} {p.last_name}
                          {p.isBlind ? ' 🎯' : p.gross != null ? ` — ${p.gross}` : ''}
                        </p>
                      ))}
                    </div>
                    {/* Score bubble */}
                    <div className="flex flex-col items-center gap-0.5">
                      <div className={`text-sm font-black px-2 py-0.5 rounded-lg ${homeWon ? 'text-green-700' : 'text-gray-400'}`}>{m.homePoints % 1 === 0 ? m.homePoints : m.homePoints.toFixed(1)}</div>
                      <div className="text-xs text-gray-300 font-semibold">vs</div>
                      <div className={`text-sm font-black px-2 py-0.5 rounded-lg ${awayWon ? 'text-green-700' : 'text-gray-400'}`}>{m.awayPoints % 1 === 0 ? m.awayPoints : m.awayPoints.toFixed(1)}</div>
                    </div>
                    {/* Away */}
                    <div style={{ backgroundColor: '#DBCEA5' }} className="rounded-lg px-3 py-2">
                      <p className="text-xs font-bold text-gray-800">Team {m.awayTeam?.number}</p>
                      {m.awayPlayers.map((p, i) => (
                        <p key={p.id} className="text-xs text-gray-600 truncate">
                          ({p.slot}) {p.first_name} {p.last_name}
                          {p.isBlind ? ' 🎯' : p.gross != null ? ` — ${p.gross}` : ''}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Current Leaders — Top 5 */}
      {stats.top5.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-2.5 border-b border-gray-100">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Current Leaders</h3>
          </div>
          {stats.top5.map((t, i) => (
            <div key={t.id} className={`px-4 py-3 ${i < stats.top5.length - 1 ? 'border-b border-gray-50' : ''}`}>
              <div className="flex items-center gap-2">
                <span className="text-base w-7 flex-shrink-0 text-center">{rankNum(i)}</span>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-bold text-gray-900">Team {t.number}</span>
                  {t.name ? <span className="text-xs text-gray-400 ml-1">— {t.name}</span> : null}
                  {t.roster.length > 0 && (
                    <p className="text-xs text-gray-500 mt-0.5 truncate">
                      {t.roster.slice(0, 2).map(p =>
                        `(${p.slot}) ${p.first_name} ${p.last_name}${p.hcp !== 99 ? ` [${p.hcp}]` : ''}`
                      ).join(' & ')}
                    </p>
                  )}
                </div>
                <span className={`text-sm font-bold flex-shrink-0 ${i === 0 ? 'text-green-700' : 'text-gray-700'}`}>
                  {t.points % 1 === 0 ? t.points : t.points.toFixed(1)} <span className="text-xs font-normal text-gray-400">pts</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Top 3 Lowest HCP */}
      {stats.lowestHcp.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-2.5 border-b border-gray-100">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Top 3 Lowest Handicap</h3>
          </div>
          {stats.lowestHcp.map((row, i) => (
            <div key={row.player.id} className={`px-4 py-3 flex items-center gap-3 ${i < stats.lowestHcp.length - 1 ? 'border-b border-gray-50' : ''}`}>
              <span className="text-base w-7 flex-shrink-0 text-center">{rankNum(i)}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">
                  {row.slot && <span className="text-xs font-bold text-gray-400 mr-1">({row.slot})</span>}
                  {row.player.first_name} {row.player.last_name}
                </p>
                {row.team && <p className="text-xs text-gray-400">Team {row.team.number}{row.team.name ? ` — ${row.team.name}` : ''}</p>}
              </div>
              <span className="text-sm font-bold text-blue-600 flex-shrink-0">{row.hcp} <span className="text-xs font-normal text-gray-400">hcp</span></span>
            </div>
          ))}
        </div>
      )}

      {/* Top 3 Lowest Score (w/o Handicap) */}
      {stats.lowestGross.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-2.5 border-b border-gray-100">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Top 3 Lowest Score (w/o Handicap)</h3>
          </div>
          {stats.lowestGross.map((row, i) => (
            <div key={row.player.id} className={`px-4 py-3 flex items-center gap-3 ${i < stats.lowestGross.length - 1 ? 'border-b border-gray-50' : ''}`}>
              <span className="text-base w-7 flex-shrink-0 text-center">{rankNum(i)}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">
                  {row.slot && <span className="text-xs font-bold text-gray-400 mr-1">({row.slot})</span>}
                  {row.player.first_name} {row.player.last_name}
                  {row.hcp != null && <span className="text-xs text-gray-400 ml-1">[{row.hcp}]</span>}
                </p>
                {row.team && <p className="text-xs text-gray-400">Team {row.team.number}{row.team.name ? ` — ${row.team.name}` : ''}</p>}
              </div>
              <span className="text-sm font-bold text-green-700 flex-shrink-0">{row.gross} <span className="text-xs font-normal text-gray-400">gross</span></span>
            </div>
          ))}
        </div>
      )}

      {/* Top 3 Lowest Score (w/ Handicap) */}
      {stats.lowestNet.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-2.5 border-b border-gray-100">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Top 3 Lowest Score (w/ Handicap)</h3>
          </div>
          {stats.lowestNet.map((row, i) => (
            <div key={row.player.id} className={`px-4 py-3 flex items-center gap-3 ${i < stats.lowestNet.length - 1 ? 'border-b border-gray-50' : ''}`}>
              <span className="text-base w-7 flex-shrink-0 text-center">{rankNum(i)}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">
                  {row.slot && <span className="text-xs font-bold text-gray-400 mr-1">({row.slot})</span>}
                  {row.player.first_name} {row.player.last_name}
                  {row.hcp != null && <span className="text-xs text-gray-400 ml-1">[{row.hcp}]</span>}
                </p>
                {row.team && <p className="text-xs text-gray-400">Team {row.team.number}{row.team.name ? ` — ${row.team.name}` : ''}</p>}
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-sm font-bold text-blue-700">{row.net} <span className="text-xs font-normal text-gray-400">net</span></span>
                <p className="text-xs text-gray-400">{row.gross} gross</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* End Season button */}
      {season.is_active && !season.is_completed && (
        <button
          onClick={() => setEndModal(true)}
          className="w-full border-2 border-red-200 text-red-500 rounded-xl py-3 text-sm font-semibold hover:bg-red-50 transition-colors"
        >
          End Season
        </button>
      )}

      {endModal && (
        <EndSeasonModal
          season={season}
          stats={stats}
          onClose={() => setEndModal(false)}
          onComplete={() => { setEndModal(false); refreshSeason(); load() }}
        />
      )}
    </div>
  )
}

function fmtDate(d) {
  if (!d) return ''
  return new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// ── End Season Modal ──────────────────────────────────────────────────────────

function EndSeasonModal({ season, stats, onClose, onComplete }) {
  const [auditing, setAuditing] = useState(true)
  const [missing, setMissing] = useState([])
  const [step, setStep] = useState('audit') // 'audit' | 'confirm' | 'done'

  useEffect(() => { runAudit() }, [])

  async function runAudit() {
    setAuditing(true)
    const issues = []
    const allWeeks = stats.allWeeks.filter(w => w.week_type !== 'bye' && w.week_type !== 'rainout')
    const teamRoster = stats.teamRoster
    const scoreMap = stats.scoreMap

    for (const week of allWeeks) {
      const weekMatchups = stats.allMatchups.filter(m => m.week_id === week.id)
      for (const m of weekMatchups) {
        const sides = [
          { teamId: m.home_team_id, label: 'Home' },
          { teamId: m.away_team_id, label: 'Away' },
        ]
        for (const { teamId } of sides) {
          const players = (teamRoster[teamId] || []).slice(0, 2)
          for (const player of players) {
            const key = `${m.id}_${player.id}`
            const score = scoreMap[key]
            if (!score) {
              issues.push({
                week: week.number,
                date: week.date,
                slot: player.slot,
                playerName: `${player.first_name} ${player.last_name}`.trim(),
              })
            }
          }
        }
      }
    }

    setMissing(issues)
    setAuditing(false)
  }

  async function endSeason() {
    await store.seasons.upsert({ ...season, is_active: false, is_completed: true })
    onComplete()
  }

  const fmtDate = d => d ? new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl overflow-hidden" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="bg-red-600 text-white px-5 py-4">
          <h2 className="text-base font-bold">End Season</h2>
          <p className="text-xs text-red-100 mt-0.5">This will lock the season. Scores become view-only.</p>
        </div>

        <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
          {step === 'audit' && (
            <>
              {auditing ? (
                <div className="text-center py-4">
                  <div className="text-2xl animate-pulse mb-2">🔍</div>
                  <p className="text-sm text-gray-500">Checking all scores…</p>
                </div>
              ) : missing.length === 0 ? (
                <div className="text-center py-2 space-y-2">
                  <div className="text-3xl">✅</div>
                  <p className="text-sm font-semibold text-gray-800">All scores accounted for!</p>
                  <p className="text-xs text-gray-500">Every played week has complete score entries.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 bg-amber-50 rounded-lg px-3 py-2">
                    <span className="text-amber-500 text-lg">⚠️</span>
                    <p className="text-xs font-semibold text-amber-700">{missing.length} missing score{missing.length > 1 ? 's' : ''} found</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl divide-y divide-gray-100 max-h-48 overflow-y-auto">
                    {missing.map((m, i) => (
                      <div key={i} className="px-3 py-2.5">
                        <p className="text-xs font-semibold text-gray-800">Week {m.week}{m.date ? ` — ${fmtDate(m.date)}` : ''}</p>
                        <p className="text-xs text-gray-500">({m.slot}) {m.playerName} — no score entered</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">Go fix these scores or use the override below to close anyway.</p>
                </div>
              )}

              <div className="space-y-2 pt-1">
                {missing.length === 0 ? (
                  <button onClick={() => setStep('confirm')}
                    className="w-full bg-red-600 text-white rounded-xl py-3 text-sm font-semibold">
                    End Season →
                  </button>
                ) : (
                  <>
                    <button onClick={onClose}
                      className="w-full bg-green-700 text-white rounded-xl py-3 text-sm font-semibold">
                      Go Fix Missing Scores
                    </button>
                    <button onClick={() => setStep('confirm')}
                      className="w-full border-2 border-red-200 text-red-500 rounded-xl py-2.5 text-sm font-medium">
                      Override — End Season Anyway
                    </button>
                  </>
                )}
                <button onClick={onClose} className="w-full text-gray-400 py-2 text-sm">Cancel</button>
              </div>
            </>
          )}

          {step === 'confirm' && (
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <div className="text-3xl">🏁</div>
                <p className="text-sm font-bold text-gray-900">Are you sure?</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  The season will be marked complete and scores will be locked from editing within the season.
                  You can still make corrections from the Admin section.
                </p>
                {missing.length > 0 && (
                  <p className="text-xs text-amber-600 font-semibold">{missing.length} missing score{missing.length > 1 ? 's' : ''} will be left unresolved.</p>
                )}
              </div>
              <button onClick={endSeason}
                className="w-full bg-red-600 text-white rounded-xl py-3 text-sm font-bold">
                Yes, End Season
              </button>
              <button onClick={() => setStep('audit')} className="w-full border border-gray-200 text-gray-600 rounded-xl py-2.5 text-sm">
                ← Go Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
