import { useState } from 'react'
import { clearAllData, getDB } from '../../lib/db.js'
import { seedIfEmpty } from '../../lib/seed.js'

export default function AdminReset() {
  const [restoring, setRestoring] = useState(false)
  const [restored, setRestored] = useState(false)

  async function handleRestore() {
    if (!confirm('This will erase ALL current data and reload the original 2025 & 2026 league data from the spreadsheet. This cannot be undone. Continue?')) return
    setRestoring(true)
    await clearAllData()
    const db = await getDB()
    // Clear seed_version so seedIfEmpty runs fresh
    await db.put('settings', { id: 'seed_version', value: null })
    await seedIfEmpty(db)
    setRestoring(false)
    setRestored(true)
    setTimeout(() => window.location.reload(), 1500)
  }

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto space-y-4">
      <div className="bg-white rounded-xl shadow-sm p-5 space-y-3">
        <div className="flex items-start gap-3">
          <div className="text-2xl">⚠️</div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">Factory Reset</p>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Restores the app to the original spreadsheet data — all 87 players, 15 teams (2026), 17 teams (2025), full schedules, scores, and handicaps.
              <strong className="text-red-600"> All data entered since will be permanently deleted.</strong>
            </p>
          </div>
        </div>
        <button
          onClick={handleRestore}
          disabled={restoring || restored}
          className="w-full bg-red-600 text-white rounded-xl py-3 text-sm font-semibold disabled:opacity-60"
        >
          {restored ? '✓ Done — reloading…' : restoring ? 'Restoring…' : 'Factory Reset — Restore Original Data'}
        </button>
      </div>

      <p className="text-xs text-gray-400 text-center px-4">
        This tool exists for testing purposes. Once the league is live and has real data entered, this section will be replaced with a smarter import tool.
      </p>
    </div>
  )
}
