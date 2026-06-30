import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as store from '../lib/store.js'
import { netScore, calcMatchPoints, getNine, matchResult } from '../lib/handicap.js'

export default function Home({ onSeasonChange }) {
  const navigate = useNavigate()
  const [tab, setTab] = useState('current')
  const [seasons, setSeasons] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { load() }, [])

  async function load() {
    const all = await store.seasons.getAll()
    const sorted = all.sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
    setSeasons(sorted)
    setLoading(false)
    const active = sorted.find(s => s.is_active)
    if (active) loadSummary(active)
  }

  async function loadSummary(season) {
    const [allWeeks, allTeams, allTp, allPlayers, allHcps] = await Promise.all([
      store.weeks.getBySeason(season.id),
      store.teams.getBySeason(season.id),
      store.teamPlayers.getAll(),
      store.players.getAll(),
      store.handicaps.getAll(),
    ])

    // Current week: closest to today
    const today = new Date()
    const playedWeeks = allWeeks
      .filter(w => w.date && w.week_type !== 'bye')
      .sort((a, b) => new Date(a.date) - new Date(b.date))
    const weeksPlayed = playedWeeks.filter(w => new Date(w.date + 'T23:59:00') < today).length

    const currentWeek = (() => {
      for (const w of playedWeeks) {
        const diff = Math.abs(today - new Date(w.date + 'T12:00:00')) / 86400000
        if (diff < 4) return w
      }
      return playedWeeks.find(w => new Date(w.date + 'T12:00:00') >= today) || playedWeeks[playedWeeks.length - 1]
    })()

    // Build player + HCP maps
    const playerById = Object.fromEntries(allPlayers.map(p => [p.id, p]))
    const hcpMap = {}
    for (const h of allHcps) {
      if (!hcpMap[h.player_id] || new Date(h.calculated_at) > new Date(hcpMap[h.player_id].calculated_at)) {
        hcpMap[h.player_id] = h
      }
    }
    const teamPlayersMap = {}
    for (const tp of allTp) {
      const p = playerById[tp.player_id]
      if (!p) continue
      if (!teamPlayersMap[tp.team_id]) teamPlayersMap[tp.team_id] = []
      teamPlayersMap[tp.team_id].push({ ...p, hcp: hcpMap[p.id]?.value ?? 99 })
    }
    for (const tid of Object.keys(teamPlayersMap)) {
      teamPlayersMap[tid].sort((a, b) => a.hcp - b.hcp)
    }

    // Load all matchups + scores for played weeks
    const scoringWeeks = playedWeeks.filter(w =>
      new Date(w.date + 'T23:59:00') < today && w.week_type !== 'scramble' && w.week_type !== 'end_scramble'
    )
    const weekById = Object.fromEntries(scoringWeeks.map(w => [w.id, w]))
    const playedWeekIds = scoringWeeks.map(w => w.id)

    const allMatchups = (await Promise.all(playedWeekIds.map(id => store.matchups.getByWeek(id)))).flat()
    const matchupIds = allMatchups.map(m => m.id)
    const allScores = matchupIds.length > 0 ? await store.scores.getByMatchups(matchupIds) : []

    const scoreMap = {}
    for (const s of allScores) scoreMap[`${s.matchup_id}_${s.player_id}`] = s

    // Sum points per team
    const teamPoints = {}
    for (const team of allTeams) teamPoints[team.id] = 0

    for (const m of allMatchups) {
      const wk = weekById[m.week_id]
      const nine = getNine(wk?.date, season.start_date)
      const blindScore = nine === 'Back 9' ? (season.blind_score ?? 39) + 1 : (season.blind_score ?? 39)

      const getScore = (teamId, slotIdx) => {
        const players = (teamPlayersMap[teamId] || []).slice(0, 2)
        const p = players[slotIdx]
        if (!p) return null
        return scoreMap[`${m.id}_${p.id}`] ?? null
      }
      const getNet = (teamId, slotIdx) => {
        const s = getScore(teamId, slotIdx)
        if (!s) return null
        if (s.is_blind) return blindScore
        const players = (teamPlayersMap[teamId] || []).slice(0, 2)
        const p = players[slotIdx]
        return isNaN(s.gross) ? null : netScore(s.gross, p?.hcp ?? 0)
      }
      const homeHasBozo = [getScore(m.home_team_id, 0), getScore(m.home_team_id, 1)].some(s => s?.is_blind)
      const awayHasBozo = [getScore(m.away_team_id, 0), getScore(m.away_team_id, 1)].some(s => s?.is_blind)

      const { homePoints, awayPoints } = calcMatchPoints({
        homeANet: getNet(m.home_team_id, 0), homeBNet: getNet(m.home_team_id, 1),
        awayANet: getNet(m.away_team_id, 0), awayBNet: getNet(m.away_team_id, 1),
        homeHasBozo, awayHasBozo,
      })
      if (m.home_team_id in teamPoints) teamPoints[m.home_team_id] += homePoints
      if (m.away_team_id in teamPoints) teamPoints[m.away_team_id] += awayPoints
    }

    // Build sorted roster per team (lowest HCP = A)
    const teamRosterMap = {}
    for (const t of allTeams) {
      const pids = (allTp.filter(tp => tp.team_id === t.id)).map(tp => tp.player_id)
      const players = pids.map(pid => {
        const p = playerById[pid]
        return p ? { ...p, hcp: hcpMap[pid]?.value ?? 99 } : null
      }).filter(Boolean).sort((a, b) => a.hcp - b.hcp)
      teamRosterMap[t.id] = players.map((p, i) => ({ ...p, slot: i === 0 ? 'A' : 'B' }))
    }

    const standings = allTeams
      .map(t => ({ team: t, points: teamPoints[t.id] ?? 0, roster: teamRosterMap[t.id] || [] }))
      .sort((a, b) => b.points - a.points)

    setSummary({ currentWeek, weeksPlayed, totalWeeks: allWeeks.filter(w => w.week_type !== 'bye').length, standings })
  }

  async function setActive(id) {
    await store.seasons.setActive(id)
    onSeasonChange(id)
    setSummary(null)
    await load()
    setTab('current')
  }

  const activeSeason = seasons.find(s => s.is_active)
  const pastSeasons = seasons.filter(s => !s.is_active)

  if (loading) return <div className="flex items-center justify-center h-64"><div className="text-4xl animate-bounce">⛳</div></div>

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex bg-white border-b border-gray-200">
        {[['current', 'Current Season'], ['new', 'New Season'], ['past', 'Past Seasons']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)}
            className={`flex-1 py-3 text-xs font-semibold transition-colors border-b-2 ${tab === key ? 'border-green-700 text-green-700' : 'border-transparent text-gray-500'}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* CURRENT SEASON */}
        {tab === 'current' && (
          <>
            {activeSeason ? (
              <div className="bg-green-800 text-white rounded-2xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="px-5 pt-5 pb-4">
                  <div className="flex items-start justify-between mb-1">
                    <h2 className="text-xl font-bold">{activeSeason.name}</h2>
                    <span className="text-xs bg-green-600 px-2 py-1 rounded-full font-medium flex-shrink-0 ml-2">Active</span>
                  </div>
                  <p className="text-green-200 text-sm">
                    {activeSeason.weeks} weeks · Par {activeSeason.par} · Starts {fmtDate(activeSeason.start_date)}
                  </p>
                </div>

                {/* Summary stats */}
                {summary ? (
                  <>
                    {/* Week + progress */}
                    <div className="px-5 pb-3">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-green-200 flex items-center gap-1.5">
                          {summary.currentWeek
                            ? `Week ${summary.currentWeek.number}${summary.currentWeek.date ? ` — ${fmtDate(summary.currentWeek.date)}` : ''}`
                            : 'Season not started'}
                          {summary.currentWeek?.date && (
                            <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${getNine(summary.currentWeek.date, activeSeason.start_date) === 'Front 9' ? 'bg-green-600 text-green-100' : 'bg-blue-700 text-blue-100'}`}>
                              {getNine(summary.currentWeek.date, activeSeason.start_date)}
                            </span>
                          )}
                        </span>
                        <span className="text-green-300">{summary.weeksPlayed} / {summary.totalWeeks} played</span>
                      </div>
                      <div className="w-full bg-green-900 rounded-full h-1.5">
                        <div
                          className="bg-white rounded-full h-1.5 transition-all"
                          style={{ width: `${summary.totalWeeks > 0 ? (summary.weeksPlayed / summary.totalWeeks) * 100 : 0}%` }}
                        />
                      </div>
                    </div>

                    {/* Standings snapshot */}
                    {summary.standings.length > 0 && (
                      <div className="bg-green-900/50 mx-4 mb-4 rounded-xl overflow-hidden">
                        <p className="text-xs font-semibold text-green-300 px-3 pt-2.5 pb-1.5 uppercase tracking-wide">Standings</p>
                        <div className="divide-y divide-green-800/50">
                          {summary.standings.slice(0, 5).map((row, i) => (
                            <div key={row.team.id} className="flex items-start gap-3 px-3 py-2.5">
                              <span className={`text-xs font-bold w-5 text-center mt-0.5 flex-shrink-0 ${i === 0 ? 'text-yellow-300' : i === 1 ? 'text-gray-300' : i === 2 ? 'text-amber-500' : 'text-green-400'}`}>
                                {i + 1}
                              </span>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-white leading-tight">
                                  {row.team.name || `Team ${row.team.number}`}
                                </p>
                                {row.roster.length > 0 && (
                                  <p className="text-xs text-green-300 mt-0.5 leading-snug">
                                    {row.roster.slice(0, 2).map(p =>
                                      `(${p.slot}) ${p.first_name} ${p.last_name}${p.hcp !== 99 ? ` [${p.hcp}]` : ''}`
                                    ).join(' & ')}
                                  </p>
                                )}
                              </div>
                              <div className="flex-shrink-0 text-right mt-0.5">
                                <span className="text-sm font-bold text-green-200">{row.points % 1 === 0 ? row.points : row.points.toFixed(1)}</span>
                                <span className="text-xs text-green-400 ml-1">pts</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="px-5 pb-4">
                    <div className="h-4 bg-green-700 rounded animate-pulse mb-2 w-3/4" />
                    <div className="h-3 bg-green-700 rounded animate-pulse w-1/2" />
                  </div>
                )}

                <div className="px-5 pb-5">
                  <button
                    onClick={() => navigate(`/season/${activeSeason.id}`)}
                    className="w-full bg-white text-green-800 rounded-xl py-3 text-sm font-bold"
                  >
                    Open Season →
                  </button>
                </div>
              </div>
            ) : (
              /* No active season */
              <div className="bg-white rounded-2xl shadow-sm p-8 text-center space-y-4">
                <div className="text-5xl">⛳</div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-1">No Active Season</h2>
                  <p className="text-sm text-gray-500">
                    {pastSeasons.length > 0
                      ? 'Start a new season or set a previous one as active.'
                      : 'Get your league started by creating your first season.'}
                  </p>
                </div>
                <button
                  onClick={() => setTab('new')}
                  className="w-full bg-green-700 text-white rounded-xl py-3 text-sm font-bold"
                >
                  {pastSeasons.length > 0 ? 'Start New Season →' : 'Create Your First Season →'}
                </button>
                {pastSeasons.length > 0 && (
                  <button
                    onClick={() => setTab('past')}
                    className="w-full border border-gray-200 text-gray-500 rounded-xl py-2.5 text-sm font-medium"
                  >
                    View Past Seasons
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {/* NEW SEASON */}
        {tab === 'new' && (
          <div className="bg-white rounded-xl shadow-sm p-5 space-y-3">
            <h2 className="font-bold text-gray-900">Start a New Season</h2>
            <p className="text-sm text-gray-500">
              The wizard will walk you through season setup, teams, and schedule generation.
              {pastSeasons.length > 0 && ' You can pull team data from last season to save time.'}
            </p>
            <button
              onClick={() => navigate('/new-season')}
              className="w-full bg-green-700 text-white rounded-xl py-3 text-sm font-bold"
            >
              Launch New Season Wizard →
            </button>
          </div>
        )}

        {/* PAST SEASONS */}
        {tab === 'past' && (
          <>
            {pastSeasons.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <p className="text-gray-400 text-sm">No past seasons yet.</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden divide-y divide-gray-50">
                {pastSeasons.map(s => (
                  <div key={s.id} className="px-4 py-3.5 flex items-center gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{s.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{s.weeks} weeks · Par {s.par} · {fmtDate(s.start_date)}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/season/${s.id}`)}
                        className="text-xs bg-green-700 text-white px-2.5 py-1 rounded-lg font-medium"
                      >
                        View
                      </button>
                      <button
                        onClick={() => setActive(s.id)}
                        className="text-xs border border-gray-200 text-gray-500 px-2.5 py-1 rounded-lg hover:bg-gray-50"
                      >
                        Set Active
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function fmtDate(d) {
  if (!d) return ''
  return new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
