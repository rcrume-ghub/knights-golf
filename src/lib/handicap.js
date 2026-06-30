/**
 * League handicap calculation.
 *
 * Formula (matches existing spreadsheet):
 *   Average of all differentials from par, rounded to 1 decimal, capped at max.
 *   Differential = gross - course_par
 *
 * Requires minimum 1 round; uses all available rounds (no minimum round filter).
 */
/**
 * Returns 'Front 9' or 'Back 9' for a given week date based on the season start date.
 * Alternates every calendar month starting from the season start month (Front 9).
 */
export function getNine(weekDate, seasonStartDate) {
  if (!weekDate || !seasonStartDate) return null
  const start = new Date(seasonStartDate + 'T12:00:00')
  const week  = new Date(weekDate + 'T12:00:00')
  const months = (week.getFullYear() - start.getFullYear()) * 12 + (week.getMonth() - start.getMonth())
  return months % 2 === 0 ? 'Front 9' : 'Back 9'
}

export function calculateHandicap(grossScores, coursePar = 35, maxHandicap = 18) {
  const valid = grossScores.filter(s => s != null && s > 0)
  if (valid.length === 0) return null

  const diffs = valid.map(s => s - coursePar)
  const avg = diffs.reduce((a, b) => a + b, 0) / diffs.length
  const rounded = Math.round(avg * 10) / 10

  return Math.min(rounded, maxHandicap)
}

/**
 * Net score = par - handicap + gross  (i.e., gross - handicap, shown as over/under par)
 * For display: net = gross - handicap
 */
export function netScore(gross, handicap) {
  if (gross == null || handicap == null) return null
  return gross - Math.round(handicap)
}

/**
 * Determine individual match result.
 * Returns: 'home' | 'away' | 'tie'
 */
export function matchResult(homeNet, awayNet) {
  if (homeNet == null || awayNet == null) return null
  if (homeNet < awayNet) return 'home'
  if (awayNet < homeNet) return 'away'
  return 'tie'
}

/**
 * Calculate points for a full matchup (A player, B player, team total).
 * homeHasBozo / awayHasBozo: true if that team is using a blind/bozo player.
 *   A team with a bozo forfeits the Team total point to the opponent (max 2 pts).
 *   If both teams have a bozo, the Team total is a dead slot (no pts awarded).
 * Returns { homePoints, awayPoints, breakdown }
 */
export function calcMatchPoints({ homeANet, awayANet, homeBNet, awayBNet, homeHasBozo = false, awayHasBozo = false }) {
  let homePoints = 0
  let awayPoints = 0
  const breakdown = []

  // Forfeit: both players on one side have no score
  const homeForfeit = homeANet == null && homeBNet == null
  const awayForfeit = awayANet == null && awayBNet == null
  if (homeForfeit && awayForfeit) {
    // Both teams fully absent — no points awarded (push)
    return { homePoints: 0, awayPoints: 0, breakdown: [
      { label: 'A', result: 'both-forfeit', pts: [0, 0] },
      { label: 'B', result: 'both-forfeit', pts: [0, 0] },
      { label: 'Team', result: 'both-forfeit', pts: [0, 0] },
    ]}
  }
  if (homeForfeit) {
    return { homePoints: 0, awayPoints: 3, breakdown: [
      { label: 'A', result: 'forfeit', pts: [0, 1] },
      { label: 'B', result: 'forfeit', pts: [0, 1] },
      { label: 'Team', result: 'forfeit', pts: [0, 1] },
    ]}
  }
  if (awayForfeit) {
    return { homePoints: 3, awayPoints: 0, breakdown: [
      { label: 'A', result: 'forfeit', pts: [1, 0] },
      { label: 'B', result: 'forfeit', pts: [1, 0] },
      { label: 'Team', result: 'forfeit', pts: [1, 0] },
    ]}
  }

  const slotResult = (hNet, aNet, label) => {
    const r = matchResult(hNet, aNet)
    if (r === 'home') { homePoints += 1; breakdown.push({ label, result: 'home', pts: [1, 0] }) }
    else if (r === 'away') { awayPoints += 1; breakdown.push({ label, result: 'away', pts: [0, 1] }) }
    else if (r === 'tie') { homePoints += 0.5; awayPoints += 0.5; breakdown.push({ label, result: 'tie', pts: [0.5, 0.5] }) }
    else breakdown.push({ label, result: 'pending', pts: [0, 0] })
  }

  slotResult(homeANet, awayANet, 'A')
  slotResult(homeBNet, awayBNet, 'B')

  // Team total — bozo rule: a team using a bozo forfeits the team total to opponent
  const homeTotal = homeANet != null && homeBNet != null ? homeANet + homeBNet : null
  const awayTotal = awayANet != null && awayBNet != null ? awayANet + awayBNet : null
  if (homeHasBozo && awayHasBozo) {
    // Both bozos — dead slot, no pts
    breakdown.push({ label: 'Team', result: 'bozo-both', pts: [0, 0] })
  } else if (homeHasBozo) {
    // Home forfeits team total to away
    awayPoints += 1
    breakdown.push({ label: 'Team', result: 'away', pts: [0, 1] })
  } else if (awayHasBozo) {
    // Away forfeits team total to home
    homePoints += 1
    breakdown.push({ label: 'Team', result: 'home', pts: [1, 0] })
  } else {
    slotResult(homeTotal, awayTotal, 'Team')
  }

  return { homePoints, awayPoints, breakdown }
}
