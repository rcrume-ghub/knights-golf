import { useEffect, useState, createContext, useContext } from 'react'
import { useParams, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import * as store from '../lib/store.js'

export const SeasonContext = createContext(null)
export function useSeason() { return useContext(SeasonContext) }

const TABS = [
  { path: '', label: 'Overview' },
  { path: 'roster', label: 'Roster' },
  { path: 'schedule', label: 'Schedule' },
  { path: 'scores', label: 'Scores' },
  { path: 'stats', label: 'Stats' },
  { path: 'dues', label: 'Dues' },
  { path: 'settings', label: 'Settings' },
]

export default function Season() {
  const { seasonId } = useParams()
  const { isAdmin } = useAuth()
  const navigate = useNavigate()
  const [season, setSeason] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    store.seasons.getAll().then(all => {
      const s = all.find(s => s.id === seasonId)
      if (!s) navigate('/', { replace: true })
      else setSeason(s)
      setLoading(false)
    })
  }, [seasonId])

  function refreshSeason() {
    store.seasons.getAll().then(all => {
      const s = all.find(s => s.id === seasonId)
      if (s) setSeason(s)
    })
  }

  if (loading) return <div className="flex items-center justify-center h-48"><div className="text-4xl animate-bounce">⛳</div></div>
  if (!season) return null

  const visibleTabs = TABS.filter(t => t.path !== 'settings' || isAdmin)

  return (
    <SeasonContext.Provider value={{ season, refreshSeason }}>
      <div className="flex flex-col min-h-full">
        {/* Season header */}
        <div className="bg-white border-b border-gray-200 px-4 pt-3 pb-0">
          <div className="flex items-center gap-2 mb-2">
            <button onClick={() => navigate('/')} className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-bold text-gray-900 truncate">{season.name}</h2>
              <p className="text-xs text-gray-400">{season.is_active ? 'Active Season' : 'Past Season'}</p>
            </div>
            {season.is_active && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium flex-shrink-0">Active</span>}
          </div>

          {/* Internal tab scroll */}
          <div className="flex gap-1 overflow-x-auto pb-0 -mx-4 px-4 no-scrollbar">
            {visibleTabs.map(t => (
              <NavLink
                key={t.path}
                to={t.path === '' ? `/season/${seasonId}` : `/season/${seasonId}/${t.path}`}
                end={t.path === ''}
                className={({ isActive }) =>
                  `flex-shrink-0 px-3 py-2.5 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
                    isActive ? 'border-green-700 text-green-700' : 'border-transparent text-gray-500'
                  }`
                }
              >
                {t.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </SeasonContext.Provider>
  )
}
