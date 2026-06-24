/**
 * League handicap calculation.
 *
 * Formula (matches existing spreadsheet):
 *   Average of all differentials from par, rounded to 1 decimal, capped at max.
 *   Differential = gross - course_par
 *
 * Requires minimum 1 round; uses all available rounds (no minimum round filter).
 */
export function calculateHandicap(grossScores, coursePar = 36, maxHandicap = 18) {
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
 * Returns { homePoints, awayPoints, breakdown }
 */
export function calcMatchPoints({ homeANet, awayANet, homeBNet, awayBNet }) {
  let homePoints = 0
  let awayPoints = 0
  const breakdown = []

  const slotResult = (hNet, aNet, label) => {
    const r = matchResult(hNet, aNet)
    if (r === 'home') { homePoints += 1; breakdown.push({ label, result: 'home', pts: [1, 0] }) }
    else if (r === 'away') { awayPoints += 1; breakdown.push({ label, result: 'away', pts: [0, 1] }) }
    else if (r === 'tie') { homePoints += 0.5; awayPoints += 0.5; breakdown.push({ label, result: 'tie', pts: [0.5, 0.5] }) }
    else breakdown.push({ label, result: 'pending', pts: [0, 0] })
  }

  slotResult(homeANet, awayANet, 'A')
  slotResult(homeBNet, awayBNet, 'B')

  // Team total: sum of net scores
  const homeTotal = homeANet != null && homeBNet != null ? homeANet + homeBNet : null
  const awayTotal = awayANet != null && awayBNet != null ? awayANet + awayBNet : null
  slotResult(homeTotal, awayTotal, 'Team')

  return { homePoints, awayPoints, breakdown }
}
