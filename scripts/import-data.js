/**
 * One-time import script: reads Knights Golf_New_v3.xlsx and seeds Supabase.
 *
 * Usage:
 *   1. Copy .env.example to .env.local and fill in your Supabase credentials
 *   2. npm install (if not done yet)
 *   3. npm run import-data
 *
 * Safe to re-run — uses upsert everywhere.
 */

import { createClient } from '@supabase/supabase-js'
import ExcelJS from 'exceljs'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { config } from 'dotenv'

config({ path: '.env.local' })

const __dir = dirname(fileURLToPath(import.meta.url))
const XLSX_PATH = join(__dir, '..', 'Knights Golf_New_v3.xlsx')

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role key for import (bypasses RLS)
)

// ─── Helpers ──────────────────────────────────────────────────────────────────

function cleanStr(v) {
  if (v == null) return null
  const s = String(v).trim()
  return s === '' || s === 'NaN' ? null : s
}

function cleanNum(v) {
  const n = parseFloat(v)
  return isNaN(n) ? null : n
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('📂 Reading spreadsheet…')
  const wb = new ExcelJS.Workbook()
  await wb.xlsx.readFile(XLSX_PATH)

  // ── 1. Create season ────────────────────────────────────────────────────────
  console.log('🌱 Inserting 2026 season…')
  const { data: season, error: sErr } = await supabase
    .from('seasons')
    .upsert({ year: 2026, name: '2026 Season', start_date: '2026-04-13', course_par: 36, blind_score: 39, max_handicap: 18, blind_penalty: 3, is_active: true }, { onConflict: 'year' })
    .select()
    .single()
  if (sErr) throw sErr
  console.log('  Season id:', season.id)

  // ── 2. Import schedule ──────────────────────────────────────────────────────
  console.log('📅 Importing schedule…')
  const adminSheet = wb.getWorksheet('Admin')
  const scheduleRows = []
  adminSheet.eachRow((row, i) => {
    if (i < 11) return // skip header rows
    const weekNum = cleanNum(row.getCell(1).value)
    const date = row.getCell(2).value
    const notes = cleanStr(row.getCell(3).value)
    if (!weekNum || !date) return
    const dateStr = date instanceof Date ? date.toISOString().split('T')[0] : String(date).split('T')[0]
    let week_type = 'regular'
    if (notes?.toLowerCase().includes('holiday') || notes?.toLowerCase().includes('memorial') || notes?.toLowerCase().includes('no golf')) week_type = 'holiday'
    else if (notes?.toLowerCase().includes('final position') || notes?.toLowerCase().includes('position')) week_type = 'position_night'
    else if (notes?.toLowerCase().includes('scramble') && notes?.toLowerCase().includes('end')) week_type = 'end_scramble'
    else if (notes?.toLowerCase().includes('scramble')) week_type = 'scramble'
    scheduleRows.push({ season_id: season.id, number: weekNum, date: dateStr, week_type, notes })
  })

  const { data: weeks, error: wErr } = await supabase
    .from('weeks')
    .upsert(scheduleRows, { onConflict: 'season_id,number' })
    .select()
  if (wErr) throw wErr
  console.log(`  ${weeks.length} weeks inserted`)

  const weekByNum = Object.fromEntries(weeks.map(w => [w.number, w]))

  // ── 3. Import players & teams ───────────────────────────────────────────────
  console.log('👥 Importing players and teams…')
  const lookupSheet = wb.getWorksheet('Lookup Table')
  const playerRows = []
  lookupSheet.eachRow((row, i) => {
    if (i === 1) return
    const teamNum = cleanNum(row.getCell(1).value)
    const name = cleanStr(row.getCell(2).value)
    const hdcp = cleanNum(row.getCell(3).value)
    if (!name) return
    playerRows.push({ teamNum: teamNum === null ? 'sub' : teamNum, name, hdcp })
  })

  // Upsert players
  const uniqueNames = [...new Set(playerRows.map(p => p.name))]
  const playerInserts = uniqueNames.map(name => ({ name, is_sub: playerRows.find(p => p.name === name)?.teamNum === 'sub' }))

  const { data: players, error: pErr } = await supabase
    .from('players')
    .upsert(playerInserts, { onConflict: 'name' })
    .select()
  if (pErr) throw pErr

  const playerByName = Object.fromEntries(players.map(p => [p.name, p]))
  console.log(`  ${players.length} players inserted`)

  // Create teams
  const teamNums = [...new Set(playerRows.filter(p => p.teamNum !== 'sub').map(p => p.teamNum))]
  const { data: teams, error: tErr } = await supabase
    .from('teams')
    .upsert(teamNums.map(n => ({ season_id: season.id, number: n })), { onConflict: 'season_id,number' })
    .select()
  if (tErr) throw tErr

  const teamByNum = Object.fromEntries(teams.map(t => [t.number, t]))

  // Assign players to teams (A = first, B = second for each team num)
  const teamSlots = {}
  const teamPlayerInserts = []
  for (const { teamNum, name } of playerRows) {
    if (teamNum === 'sub') continue
    if (!teamSlots[teamNum]) teamSlots[teamNum] = []
    const slot = teamSlots[teamNum].length === 0 ? 'A' : 'B'
    teamSlots[teamNum].push(name)
    const player = playerByName[name]
    const team = teamByNum[teamNum]
    if (player && team) {
      teamPlayerInserts.push({ team_id: team.id, player_id: player.id, slot })
    }
  }

  const { error: tpErr } = await supabase
    .from('team_players')
    .upsert(teamPlayerInserts, { onConflict: 'team_id,slot' })
  if (tpErr) throw tpErr
  console.log(`  ${teamPlayerInserts.length} team-player assignments inserted`)

  // ── 4. Import starting handicaps ────────────────────────────────────────────
  console.log('📊 Importing starting handicaps…')
  const hcpSheet = wb.getWorksheet('2026 - HDCP')
  const hcpUpserts = []

  // Column layout: col 1=team, col 2=name, cols 3-22=week scores 1-20, col 23=HDCP, col 24=2025 HDCP
  hcpSheet.eachRow((row, i) => {
    if (i <= 1) return
    const name = cleanStr(row.getCell(2).value)
    if (!name) return
    const player = playerByName[name]
    if (!player) return

    // Import the current calculated handicap tied to the most recent week with data
    const hdcp = cleanNum(row.getCell(23).value)
    if (hdcp == null) return

    // Find last week that has a score for this player
    let lastWeekNum = 0
    for (let col = 3; col <= 22; col++) {
      const score = cleanNum(row.getCell(col).value)
      if (score != null) lastWeekNum = col - 2
    }

    const week = weekByNum[lastWeekNum] || weeks[0]
    if (week) {
      hcpUpserts.push({ player_id: player.id, week_id: week.id, value: hdcp })
    }
  })

  if (hcpUpserts.length > 0) {
    const { error: hErr } = await supabase.from('handicaps').upsert(hcpUpserts, { onConflict: 'player_id,week_id' })
    if (hErr) throw hErr
  }
  console.log(`  ${hcpUpserts.length} handicap records inserted`)

  // ── 5. Import schedule matchups ─────────────────────────────────────────────
  console.log('🏌️ Importing weekly matchups…')
  const schedSheet = wb.getWorksheet('2026 - Schedule')
  const matchupInserts = []

  schedSheet.eachRow((row, i) => {
    if (i < 4) return
    const weekNum = cleanNum(row.getCell(3).value)
    if (!weekNum) return
    const week = weekByNum[weekNum]
    if (!week) return

    // Matchups are in columns 5-12 as "X-Y" pairs (4 pairs per row)
    for (let col = 5; col <= 12; col++) {
      const val = cleanStr(row.getCell(col).value)
      if (!val || !val.includes('-')) continue
      const [homeStr, awayStr] = val.split('-').map(s => s.trim())
      const homeNum = parseInt(homeStr)
      const awayNum = parseInt(awayStr)
      if (isNaN(homeNum) || isNaN(awayNum)) continue
      const homeTeam = teamByNum[homeNum]
      const awayTeam = teamByNum[awayNum]
      if (!homeTeam || !awayTeam) continue
      matchupInserts.push({
        week_id: week.id,
        home_team_id: homeTeam.id,
        away_team_id: awayTeam.id,
        hole_assignment: col - 4
      })
    }
  })

  if (matchupInserts.length > 0) {
    const { error: mErr } = await supabase.from('matchups').upsert(matchupInserts, { onConflict: 'week_id,home_team_id,away_team_id' })
    if (mErr) throw mErr
  }
  console.log(`  ${matchupInserts.length} matchups inserted`)

  // ── 6. Import subs ───────────────────────────────────────────────────────────
  console.log('👤 Importing substitutes…')
  const subPlayers = playerRows.filter(p => p.teamNum === 'sub')
  for (const sub of subPlayers) {
    const player = playerByName[sub.name]
    if (!player || sub.hdcp == null) continue
    await supabase.from('handicaps').upsert({ player_id: player.id, week_id: weeks[0].id, value: sub.hdcp }, { onConflict: 'player_id,week_id' })
  }
  console.log(`  ${subPlayers.length} subs processed`)

  console.log('\n✅ Import complete! Your Knights Golf app is ready.')
  console.log('\nNext steps:')
  console.log('  1. Sign up at your app URL')
  console.log('  2. In Supabase SQL editor, run:')
  console.log('     INSERT INTO user_roles (user_id, role) VALUES (\'<your-user-id>\', \'admin\');')
  console.log('  3. Sign in and start using the app!')
}

main().catch(err => {
  console.error('Import failed:', err)
  process.exit(1)
})
