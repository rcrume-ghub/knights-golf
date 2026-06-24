import { useEffect, useState } from 'react'
import * as store from '../../lib/store.js'
import { calculateHandicap } from '../../lib/handicap.js'

export default function HandicapCalc() {
  const [season, setSeason] = useState(null)
  const [status, setStatus] = useState('')
  const [running, setRunning] = useState(false)
  const [results, setResults] = useState([])

  useEffect(() => { store.seasons.getActive().then(setSeason) }, [])

  async function recalculate() {
    if (!season) return
    setRunning(true)
    setResults([])
    setStatus('Loading data…')

    const [allTeams, allTeamPlayers, allPlayers, allWeeks, allMatchups, allScores] = await Promise.all([
      store.teams.getBySeason(season.id),
      store.teamPlayers.getAll(),
      store.players.getAll(),
      store.weeks.getBySeason(season.id),
      store.matchups.getAll(),
      store.scores.getAll()
    ])

    const playerById = Object.fromEntries(allPlayers.map(p => [p.id, p]))
    const matchupById = Object.fromEntries(allMatchups.map(m => [m.id, m]))
    const weekOrder = Object.fromEntries(allWeeks.map(w => [w.id, w.number]))

    const players = allTeams.flatMap(team =>
      allTeamPlayers.filter(tp => tp.team_id === team.id).map(tp => ({
        ...playerById[tp.player_id], teamNumber: team.number
      })).filter(Boolean)
    )

    const scoresByPlayer = {}
    for (const sc of allScores) {
      if (sc.is_blind || sc.gross == null) continue
      const weekId = matchupById[sc.matchup_id]?.week_id
      if (!weekId) continue
      if (!scoresByPlayer[sc.player_id]) scoresByPlayer[sc.player_id] = []
      scoresByPlayer[sc.player_id].push({ gross: sc.gross, weekId, weekNum: weekOrder[weekId] || 0 })
    }

    setStatus('Calculating…')
    const upserts = []
    const resultRows = []

    for (const player of players) {
      const playerScores = (scoresByPlayer[player.id] || []).sort((a, b) => a.weekNum - b.weekNum)

      for (let i = 0; i < playerScores.length; i++) {
        const history = playerScores.slice(0, i + 1).map(s => s.gross)
        const hcp = calculateHandicap(history, season.course_par, season.max_handicap)
        if (hcp != null) {
          upserts.push({ player_id: player.id, week_id: playerScores[i].weekId, value: hcp })
        }
      }

      const latest = calculateHandicap(playerScores.map(s => s.gross), season.course_par, season.max_handicap)
      resultRows.push({ name: player.name, teamNumber: player.teamNumber, handicap: latest, rounds: playerScores.length })
    }

    if (upserts.length > 0) {
      setStatus(`Saving ${upserts.length} records…`)
      await store.handicaps.upsertMany(upserts)
    }

    setResults(resultRows.sort((a, b) => a.teamNumber - b.teamNumber))
    setStatus(`Done — updated ${upserts.length} handicap records across ${players.length} players.`)
    setRunning(false)
  }

  return (
    <div className="px-4 py-4 max-w-2xl mx-auto space-y-4">
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="font-bold text-gray-900 mb-1">Recalculate Handicaps</h2>
        <p className="text-xs text-gray-500 mb-4">Run this after entering each week's scores. Rebuilds all handicaps from scratch.</p>
        <button onClick={recalculate} disabled={running || !season}
          className="w-full bg-green-700 text-white rounded-lg py-2.5 font-semibold text-sm disabled:opacity-50">
          {running ? status || 'Running…' : 'Run Recalculation'}
        </button>
        {status && !running && <p className="text-xs text-green-700 mt-2 text-center">{status}</p>}
      </div>

      {results.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-2.5 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700">Updated Handicaps</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {results.map(r => (
              <div key={r.name} className="flex items-center justify-between px-4 py-2.5">
                <div>
                  <p className="text-sm font-medium text-gray-900">{r.name}</p>
                  <p className="text-xs text-gray-400">Team {r.teamNumber} · {r.rounds} rounds</p>
                </div>
                <span className={`font-bold text-sm ${r.handicap != null ? 'text-green-700' : 'text-gray-400'}`}>
                  {r.handicap ?? 'N/A'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
