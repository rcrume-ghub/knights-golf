import * as store from './store.js'

/**
 * Recalculates HCPs for every player in a season after a week is finalized.
 * Writes one `handicaps` record per player keyed to the finalized week_id.
 *
 * Rolling logic (non-blind played rounds only):
 *   0-2 played → prev_season_hcp (status: 'prev_season' or 'not_established')
 *   3-4 played → average diff (status: 'temp')
 *   5-10 played → best 5 diffs of all played rounds (status: 'established')
 *   11+ played → best 5 diffs of most recent 10 played rounds (status: 'established')
 *
 * HCP is capped at season.max_handicap.
 *
 * Returns the array of handicap records written.
 */
export async function recalcHcps(seasonId, finalizedWeekId) {
  const [allSeasons, allWeeks, allTeams, allTeamPlayers, allMatchups, allScores, prevHcps] =
    await Promise.all([
      store.seasons.getAll(),
      store.weeks.getBySeason(seasonId),
      store.teams.getBySeason(seasonId),
      store.teamPlayers.getAll(),
      store.matchups.getAll(),
      store.scores.getAll(),
      store.seasonPlayerHcp.getBySeason(seasonId),
    ])

  const season = allSeasons.find(s => s.id === seasonId)
  if (!season) return []

  const maxHcp = season.max_handicap ?? 18
  const coursePar = season.par ?? 35

  // Only look at finalized, non-rainout weeks
  const finalizedWeeks = allWeeks
    .filter(w => w.is_finalized && w.week_type !== 'rainout')
    .sort((a, b) => a.number - b.number)

  const finalizedWeekIds = new Set(finalizedWeeks.map(w => w.id))

  // Index: matchup_id → week for all matchups in finalized weeks
  const matchupWeekMap = {}
  for (const m of allMatchups) {
    if (finalizedWeekIds.has(m.week_id)) {
      matchupWeekMap[m.id] = allWeeks.find(w => w.id === m.week_id)
    }
  }

  // Group non-blind scores by player_id, ordered by week number ascending
  const scoresByPlayer = {}
  for (const s of allScores) {
    const week = matchupWeekMap[s.matchup_id]
    if (!week) continue
    if (!scoresByPlayer[s.player_id]) scoresByPlayer[s.player_id] = []
    scoresByPlayer[s.player_id].push({ ...s, weekNumber: week.number })
  }
  for (const pid of Object.keys(scoresByPlayer)) {
    scoresByPlayer[pid].sort((a, b) => a.weekNumber - b.weekNumber)
  }

  // Map player_id → prev_season_hcp
  const prevMap = Object.fromEntries(prevHcps.map(h => [h.player_id, h.prev_season_hcp]))

  // All players who belong to teams in this season
  const seasonTeamIds = new Set(allTeams.map(t => t.id))
  const playerIds = [...new Set(
    allTeamPlayers.filter(tp => seasonTeamIds.has(tp.team_id)).map(tp => tp.player_id)
  )]

  const records = playerIds.map(playerId => {
    const allRounds = scoresByPlayer[playerId] || []
    const played = allRounds.filter(s => !s.is_blind) // blind rounds excluded from HCP window
    const n = played.length
    const prev = prevMap[playerId] ?? null

    let value = null
    let status

    if (n <= 2) {
      value = prev
      status = prev != null ? 'prev_season' : 'not_established'
    } else if (n <= 4) {
      const avg = played.reduce((sum, s) => sum + (s.gross - coursePar), 0) / n
      value = Math.min(Math.round(avg * 10) / 10, maxHcp)
      status = 'temp'
    } else {
      const window = played.slice(-10)
      const sortedDiffs = window.map(s => s.gross - coursePar).sort((a, b) => a - b)
      const best5 = sortedDiffs.slice(0, 5)
      const avg = best5.reduce((a, b) => a + b, 0) / 5
      value = Math.min(Math.round(avg * 10) / 10, maxHcp)
      status = 'established'
    }

    return { player_id: playerId, week_id: finalizedWeekId, value, status }
  })

  await store.handicaps.upsertMany(records)
  return records
}

/**
 * Returns a player's effective HCP for a specific week number.
 * Looks up the most recent handicap record at or before that week.
 * Falls back to prev_season_hcp if no computed HCP exists yet.
 */
export function resolveHcpForWeek(playerId, weekNumber, allHandicaps, weekNumberById, prevHcpMap) {
  // Filter to this player's handicap records that are for weeks <= target week
  const candidates = allHandicaps
    .filter(h => h.player_id === playerId)
    .map(h => ({ ...h, weekNum: weekNumberById[h.week_id] ?? 0 }))
    .filter(h => h.weekNum <= weekNumber)
    .sort((a, b) => b.weekNum - a.weekNum)

  if (candidates.length > 0) return candidates[0]
  return { value: prevHcpMap?.[playerId] ?? null, status: 'prev_season' }
}
