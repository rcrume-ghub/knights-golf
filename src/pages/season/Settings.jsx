import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSeason } from '../Season.jsx'
import * as store from '../../lib/store.js'

export default function Settings({ onSeasonChange }) {
  const { seasonId } = useParams()
  const { season, refreshSeason } = useSeason()
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleActivate() {
    if (!confirm(`Set "${season.name}" as the active season?`)) return
    await store.seasons.setActive(seasonId)
    onSeasonChange(seasonId)
    refreshSeason()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  async function handleArchive() {
    if (!confirm(`Archive "${season.name}"? It will move to Past Seasons.`)) return
    await store.seasons.upsert({ ...season, is_active: false, is_archived: true })
    onSeasonChange(null)
    navigate('/', { replace: true })
  }

  return (
    <div className="px-4 py-4 max-w-2xl mx-auto space-y-4">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800">Season Actions</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {!season.is_active && (
            <div className="px-4 py-3.5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Set as Active Season</p>
                <p className="text-xs text-gray-400 mt-0.5">Makes this the current season for score entry</p>
              </div>
              <button onClick={handleActivate} className="text-xs bg-green-700 text-white px-3 py-1.5 rounded-lg font-medium">
                {saved ? '✓ Done' : 'Activate'}
              </button>
            </div>
          )}
          {season.is_active && (
            <div className="px-4 py-3.5">
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Currently Active Season</span>
            </div>
          )}
          <div className="px-4 py-3.5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Archive Season</p>
              <p className="text-xs text-gray-400 mt-0.5">Move to past seasons. Data is preserved.</p>
            </div>
            <button onClick={handleArchive} className="text-xs border border-red-200 text-red-500 px-3 py-1.5 rounded-lg font-medium hover:bg-red-50">
              Archive
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 border border-dashed border-gray-200">
        <p className="text-xs text-gray-500">To edit season name, start date, schedule settings — go to the <strong>Schedule</strong> tab and use Season Settings.</p>
      </div>
    </div>
  )
}
