import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as store from '../../lib/store.js'

export default function SubList() {
  const [subs, setSubs] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => { loadSubs() }, [])

  async function loadSubs() {
    const all = await store.players.getSubs()
    const allHcps = await store.handicaps.getAll()
    const hcpMap = {}
    for (const h of allHcps) {
      if (!hcpMap[h.player_id] || new Date(h.calculated_at) > new Date(hcpMap[h.player_id].calculated_at)) {
        hcpMap[h.player_id] = h
      }
    }
    const result = all.map(p => ({
      ...p,
      fullName: `${p.first_name || ''} ${p.last_name || ''}`.trim(),
      handicap: hcpMap[p.id]?.value ?? null
    })).sort((a, b) => a.fullName.localeCompare(b.fullName))
    setSubs(result)
    setLoading(false)
  }

  if (loading) return <div className="p-8 text-center text-gray-400">Loading…</div>

  return (
    <div className="px-4 py-4 max-w-2xl mx-auto space-y-4">
      <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-gray-900">Sub List</h2>
          <p className="text-xs text-gray-400 mt-0.5">{subs.length} substitute{subs.length !== 1 ? 's' : ''} available</p>
        </div>
        <button
          onClick={() => navigate('/admin/roster')}
          className="text-xs bg-green-700 text-white px-3 py-1.5 rounded-lg font-medium"
        >
          Manage in Roster
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {subs.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <p className="text-sm mb-2">No subs on file.</p>
            <p className="text-xs">Add players with "Sub" status in the Roster screen.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {subs.map(sub => (
              <div key={sub.id} className="flex items-center gap-3 px-4 py-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{sub.fullName}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {[sub.phone, sub.email].filter(Boolean).join(' · ') || 'No contact info'}
                  </p>
                </div>
                {sub.handicap != null && (
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0">
                    Hdcp {sub.handicap}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
