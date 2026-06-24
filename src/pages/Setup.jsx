import { useState, useRef } from 'react'
import * as XLSX from 'xlsx'
import { putMany, setSetting, newId } from '../lib/db.js'

export default function Setup({ onComplete }) {
  const [step, setStep] = useState('welcome') // welcome | importing | done | error
  const [progress, setProgress] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const fileRef = useRef()

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setStep('importing')

    try {
      setProgress('Reading spreadsheet…')
      const buf = await file.arrayBuffer()
      const wb = XLSX.read(buf, { type: 'array', cellDates: true })

      // ── Season ───────────────────────────────────────────────────────────────
      setProgress('Importing league settings…')
      const seasonId = newId()
      const season = {
        id: seasonId,
        year: 2026,
        name: '2026 Season',
        start_date: '2026-04-13',
        course_par: 36,
        blind_score: 39,
        max_handicap: 18,
        blind_penalty: 3,
        is_active: true
      }

      // Try to read Admin sheet for settings
      const adminWs = wb.Sheets['Admin']
      if (adminWs) {
        const adminData = XLSX.utils.sheet_to_json(adminWs, { header: 1, defval: null })
        for (const row of adminData) {
          const label = String(row[0] || '').toLowerCase()
          if (label.includes('course par')) season.course_par = parseInt(row[1]) || 36
          if (label.includes('blind player')) season.blind_score = parseInt(row[1]) || 39
          if (label.includes('max handicap')) season.max_handicap = parseInt(row[1]) || 18
        }
      }

      await putMany('seasons', [season])

      // ── Schedule ─────────────────────────────────────────────────────────────
      setProgress('Importing schedule…')
      const weeksList = []
      const adminData = adminWs ? XLSX.utils.sheet_to_json(adminWs, { header: 1, defval: null }) : []
      for (const row of adminData) {
        const weekNum = parseFloat(row[0])
        if (!weekNum || isNaN(weekNum)) continue
        const rawDate = row[1]
        if (!rawDate) continue
        const dateStr = rawDate instanceof Date
          ? rawDate.toISOString().split('T')[0]
          : String(rawDate).split('T')[0]
        const notes = String(row[2] || '').trim()
        let week_type = 'regular'
        const n = notes.toLowerCase()
        if (n.includes('memorial') || n.includes('no golf') || n.includes('holiday')) week_type = 'holiday'
        else if (n.includes('final position') || n.includes('position')) week_type = 'position_night'
        else if (n.includes('end of year') || (n.includes('scramble') && n.includes('end'))) week_type = 'end_scramble'
        else if (n.includes('scramble')) week_type = 'scramble'
        weeksList.push({ id: newId(), season_id: seasonId, number: weekNum, date: dateStr, week_type, notes: notes || null })
      }
      if (weeksList.length === 0) {
        // Fallback: generate 20 Mondays from Apr 13
        let d = new Date('2026-04-13')
        for (let i = 1; i <= 20; i++) {
          weeksList.push({ id: newId(), season_id: seasonId, number: i, date: d.toISOString().split('T')[0], week_type: 'regular', notes: null })
          d = new Date(d.getTime() + 7 * 86400000)
        }
      }
      await putMany('weeks', weeksList)
      const weekByNum = Object.fromEntries(weeksList.map(w => [w.number, w]))

      // ── Players & Teams ───────────────────────────────────────────────────────
      setProgress('Importing players and teams…')
      const lookupWs = wb.Sheets['Lookup Table']
      if (!lookupWs) throw new Error('Could not find "Lookup Table" sheet in spreadsheet')

      const lookupData = XLSX.utils.sheet_to_json(lookupWs, { header: 1, defval: null })
      const playerList = []    // { name, teamNum, hdcp }
      const playerInserts = []
      const teamInserts = []
      const teamPlayerInserts = []

      const teamSlots = {}
      const playerByName = {}

      for (let i = 1; i < lookupData.length; i++) {
        const [rawTeam, rawName, rawHdcp] = lookupData[i]
        const name = String(rawName || '').trim()
        if (!name || name === 'NaN') continue
        const teamNum = rawTeam != null && !isNaN(parseFloat(rawTeam)) ? parseFloat(rawTeam) : null
        const hdcp = parseFloat(rawHdcp) || null
        const isSub = String(rawTeam || '').toLowerCase() === 'sub' || teamNum === null

        const player = { id: newId(), name, phone: null, is_sub: isSub }
        playerInserts.push(player)
        playerByName[name] = player

        if (!isSub && teamNum) {
          if (!teamSlots[teamNum]) teamSlots[teamNum] = []
          teamSlots[teamNum].push({ player, hdcp })
        }
      }

      await putMany('players', playerInserts)

      for (const [teamNum, slots] of Object.entries(teamSlots)) {
        const team = { id: newId(), season_id: seasonId, number: parseInt(teamNum) }
        teamInserts.push(team)
        slots.forEach(({ player }, idx) => {
          teamPlayerInserts.push({ id: newId(), team_id: team.id, player_id: player.id, slot: idx === 0 ? 'A' : 'B' })
        })
      }

      await putMany('teams', teamInserts)
      await putMany('team_players', teamPlayerInserts)
      const teamByNum = Object.fromEntries(teamInserts.map(t => [t.number, t]))

      // ── Handicaps ─────────────────────────────────────────────────────────────
      setProgress('Importing handicaps…')
      const hcpWs = wb.Sheets['2026 - HDCP']
      const handicapInserts = []

      if (hcpWs) {
        const hcpData = XLSX.utils.sheet_to_json(hcpWs, { header: 1, defval: null })
        for (let i = 1; i < hcpData.length; i++) {
          const row = hcpData[i]
          const name = String(row[1] || '').trim()
          const hdcp = parseFloat(row[22]) // Column W = current HDCP
          const player = playerByName[name]
          if (!player || isNaN(hdcp)) continue

          let lastWeekNum = 0
          for (let col = 2; col <= 21; col++) {
            if (row[col] != null && !isNaN(parseFloat(row[col]))) lastWeekNum = col - 1
          }
          const week = weekByNum[lastWeekNum] || weeksList[0]
          if (week) {
            handicapInserts.push({ id: newId(), player_id: player.id, week_id: week.id, value: hdcp, calculated_at: new Date().toISOString() })
          }
        }
      }

      if (handicapInserts.length > 0) await putMany('handicaps', handicapInserts)

      // ── Matchups ──────────────────────────────────────────────────────────────
      setProgress('Importing matchups…')
      const schedWs = wb.Sheets['2026 - Schedule']
      const matchupInserts = []

      if (schedWs) {
        const schedData = XLSX.utils.sheet_to_json(schedWs, { header: 1, defval: null })
        for (let i = 3; i < schedData.length; i++) {
          const row = schedData[i]
          const weekNum = parseFloat(row[2])
          if (isNaN(weekNum)) continue
          const week = weekByNum[weekNum]
          if (!week) continue

          // Columns 4-11 (0-indexed) contain matchup pairs like "6-9", "2-13", etc.
          for (let col = 4; col <= 11; col++) {
            const val = String(row[col] || '').trim()
            if (!val.includes('-')) continue
            const [aStr, bStr] = val.split('-')
            const homeNum = parseInt(aStr)
            const awayNum = parseInt(bStr)
            if (isNaN(homeNum) || isNaN(awayNum)) continue
            const homeTeam = teamByNum[homeNum]
            const awayTeam = teamByNum[awayNum]
            if (!homeTeam || !awayTeam) continue
            matchupInserts.push({
              id: newId(),
              week_id: week.id,
              home_team_id: homeTeam.id,
              away_team_id: awayTeam.id,
              hole_assignment: col - 3,
              is_locked: false
            })
          }
        }
      }

      if (matchupInserts.length > 0) await putMany('matchups', matchupInserts)

      // ── Mark setup complete ───────────────────────────────────────────────────
      await setSetting('setup_complete', true)
      await setSetting('setup_date', new Date().toISOString())

      setProgress(`Done! Imported ${playerInserts.length} players, ${teamInserts.length} teams, ${weeksList.length} weeks, ${matchupInserts.length} matchups.`)
      setStep('done')

    } catch (err) {
      console.error(err)
      setErrorMsg(err.message || 'Import failed')
      setStep('error')
    }
  }

  if (step === 'welcome') return (
    <div className="min-h-screen bg-green-800 flex flex-col items-center justify-center px-4">
      <div className="text-center mb-8">
        <div className="text-6xl mb-2">⛳</div>
        <h1 className="text-3xl font-bold text-white">Knight's Golf</h1>
        <p className="text-green-200 mt-1">Monday Night League</p>
      </div>

      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 space-y-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Welcome, Commissioner</h2>
          <p className="text-sm text-gray-500 mt-1">
            Upload your existing spreadsheet to get started. All data stays on this device — no account needed.
          </p>
        </div>

        <div
          className="border-2 border-dashed border-green-300 rounded-xl p-6 text-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition-colors"
          onClick={() => fileRef.current?.click()}
        >
          <div className="text-3xl mb-2">📂</div>
          <p className="text-sm font-medium text-gray-700">Upload Knights Golf spreadsheet</p>
          <p className="text-xs text-gray-400 mt-1">Knights Golf_New_v3.xlsx or similar</p>
          <input ref={fileRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={handleFile} />
        </div>

        <div className="border-t border-gray-100 pt-3">
          <p className="text-xs text-gray-400 text-center mb-3">— or start fresh —</p>
          <button
            onClick={async () => {
              // Create a blank 2026 season with no data
              const seasonId = newId()
              await putMany('seasons', [{ id: seasonId, year: 2026, name: '2026 Season', start_date: '2026-04-13', course_par: 36, blind_score: 39, max_handicap: 18, blind_penalty: 3, is_active: true }])
              await setSetting('setup_complete', true)
              onComplete()
            }}
            className="w-full text-sm text-gray-500 hover:text-gray-700 py-2"
          >
            Start with a blank league →
          </button>
        </div>
      </div>
    </div>
  )

  if (step === 'importing') return (
    <div className="min-h-screen bg-green-800 flex flex-col items-center justify-center px-4">
      <div className="text-center text-white space-y-4">
        <div className="text-5xl animate-spin">⛳</div>
        <p className="text-lg font-medium">Importing your league data…</p>
        <p className="text-green-300 text-sm">{progress}</p>
      </div>
    </div>
  )

  if (step === 'error') return (
    <div className="min-h-screen bg-red-800 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl p-6 text-center space-y-4">
        <div className="text-4xl">❌</div>
        <h2 className="font-bold text-gray-900">Import failed</h2>
        <p className="text-sm text-red-600">{errorMsg}</p>
        <button onClick={() => setStep('welcome')} className="w-full bg-gray-100 text-gray-700 rounded-xl py-2.5 font-medium text-sm">
          Try again
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-green-800 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 text-center space-y-4">
        <div className="text-4xl">✅</div>
        <h2 className="font-bold text-gray-900">League data imported!</h2>
        <p className="text-sm text-gray-500">{progress}</p>
        <button
          onClick={onComplete}
          className="w-full bg-green-700 text-white rounded-xl py-3 font-semibold text-sm"
        >
          Open the App →
        </button>
      </div>
    </div>
  )
}
