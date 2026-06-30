import { useState } from 'react'
import { Link } from 'react-router-dom'
import { clearAllData } from '../lib/db.js'
import { getDB } from '../lib/db.js'
import { seedIfEmpty } from '../lib/seed.js'

export default function More() {
  const [restoring, setRestoring] = useState(false)
  const [restored, setRestored] = useState(false)

  async function handleRestore() {
    if (!confirm('This will clear ALL current data and reload the original 2025 & 2026 season data from the spreadsheet. Continue?')) return
    setRestoring(true)
    await clearAllData()
    const db = await getDB()
    await seedIfEmpty(db)
    setRestoring(false)
    setRestored(true)
    setTimeout(() => window.location.reload(), 1200)
  }

  return (
    <div className="px-4 py-4 max-w-2xl mx-auto space-y-4">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-2 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">League</p>
        </div>
        <MenuLink to="/handicaps" label="Handicaps" icon="📊" />
        <MenuLink to="/schedule" label="Schedule" icon="📅" />
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-2 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Tools</p>
        </div>
        <MenuLink to="/admin/import" label="Import Data" icon="📥" />
        <MenuLink to="/admin/subs" label="Sub List" icon="🔄" />
        <MenuLink to="/admin/handicap-calc" label="Recalculate Handicaps" icon="📐" />
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-2 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Data</p>
        </div>
        <div className="px-4 py-4 space-y-2">
          <p className="text-xs text-gray-500 leading-relaxed">
            Restore the original league data from the 2025 &amp; 2026 spreadsheet — all 87 players, 15 teams, full schedules, scores, and handicaps. This <strong>replaces</strong> all current app data.
          </p>
          <button
            onClick={handleRestore}
            disabled={restoring || restored}
            className="w-full bg-green-700 text-white rounded-xl py-3 text-sm font-semibold disabled:opacity-60 transition-colors"
          >
            {restored ? '✓ Done — reloading…' : restoring ? 'Restoring…' : 'Restore Original League Data'}
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 pb-2">Knight's AC Men's Golf League · The Crossings G.C.</p>
    </div>
  )
}

function MenuLink({ to, label, icon }) {
  return (
    <Link to={to} className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium text-gray-800 flex-1">{label}</span>
      <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  )
}
