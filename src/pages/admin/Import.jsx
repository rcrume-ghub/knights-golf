import { useState, useRef } from 'react'
import * as store from '../../lib/store.js'
import { newId } from '../../lib/db.js'

const CSV_TEMPLATE = 'First Name,Last Name,Email,Phone,Current HCP,Status\nJohn,Smith,john@email.com,502-555-0100,8.5,Active\n'

export default function Import() {
  const [csvResult, setCsvResult] = useState(null)
  const [csvLoading, setCsvLoading] = useState(false)
  const [csvError, setCsvError] = useState('')
  const csvRef = useRef()

  function downloadTemplate() {
    const blob = new Blob([CSV_TEMPLATE], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'knights-golf-roster-template.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  async function handleCsvUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setCsvLoading(true)
    setCsvError('')
    setCsvResult(null)
    try {
      const text = await file.text()
      const lines = text.trim().split('\n').slice(1)
      const imported = []
      const season = await store.seasons.getActive()
      for (const line of lines) {
        const cols = line.split(',').map(s => s.trim().replace(/^"|"$/g, ''))
        const [firstName, lastName, email, phone, hcp, status] = cols
        if (!firstName && !lastName) continue
        const validStatus = ['Active', 'Sub', 'Deactivated'].includes(status) ? status : 'Active'
        const player = {
          id: newId(), first_name: firstName || '', last_name: lastName || '',
          email: email || '', phone: phone || '', status: validStatus, notes: ''
        }
        await store.players.upsert(player)
        if (hcp && !isNaN(parseFloat(hcp)) && season) {
          await store.seasonPlayerHcp.upsert({
            id: newId(), player_id: player.id, season_id: season.id,
            prev_season_hcp: null, current_hcp: parseFloat(hcp)
          })
        }
        imported.push(`${firstName} ${lastName}`.trim())
      }
      setCsvResult(imported)
    } catch {
      setCsvError('Could not parse the CSV. Make sure it matches the template format.')
    }
    setCsvLoading(false)
    if (csvRef.current) csvRef.current.value = ''
  }

  return (
    <div className="px-4 py-4 max-w-2xl mx-auto space-y-4">
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="font-bold text-gray-900">Import Data</h2>
        <p className="text-xs text-gray-400 mt-0.5">Add players via CSV upload</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
        <h3 className="text-sm font-semibold text-gray-800">Roster CSV Import</h3>
        <p className="text-xs text-gray-500">
          Download the blank template, fill it out, then upload here.
          New names are added; existing players (by name) are updated.
        </p>
        <button
          onClick={downloadTemplate}
          className="w-full border border-green-700 text-green-700 rounded-xl py-2.5 text-sm font-semibold hover:bg-green-50 transition-colors"
        >
          Download Template (CSV)
        </button>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Upload Completed CSV</label>
          <input
            ref={csvRef} type="file" accept=".csv"
            onChange={handleCsvUpload} disabled={csvLoading}
            className="w-full text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-green-700 file:text-white"
          />
        </div>
        {csvLoading && <p className="text-xs text-gray-500 animate-pulse">Importing…</p>}
        {csvError && <p className="text-xs text-red-500">{csvError}</p>}
        {csvResult && (
          <div className="bg-green-50 rounded-lg p-3">
            <p className="text-xs font-semibold text-green-800 mb-1">
              ✓ Imported {csvResult.length} player{csvResult.length !== 1 ? 's' : ''}
            </p>
            <p className="text-xs text-green-700">
              {csvResult.slice(0, 20).join(', ')}{csvResult.length > 20 ? '…' : ''}
            </p>
          </div>
        )}
      </div>

      <div className="bg-gray-50 rounded-xl p-4 border border-dashed border-gray-200">
        <p className="text-xs font-semibold text-gray-600 mb-1">Pre-loaded Data</p>
        <p className="text-xs text-gray-500">
          The 2025 and 2026 season data — all teams, players, handicaps, scores, and the sub list —
          was automatically loaded from the league spreadsheet when the app first launched.
        </p>
      </div>
    </div>
  )
}
