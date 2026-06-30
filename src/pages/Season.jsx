import { useEffect, useState, createContext, useContext } from 'react'
import { useParams, NavLink, Outlet, useNavigate } from 'react-router-dom'
import * as store from '../lib/store.js'

export const SeasonContext = createContext(null)
export function useSeason() { return useContext(SeasonContext) }

const TABS = [
  { path: '', label: 'Overview' },
  { path: 'roster', label: 'Roster' },
  { path: 'schedule', label: 'Schedule' },
  { path: 'scores', label: 'Enter Scores' },
  { path: 'stats', label: 'Stats' },
  { path: 'dues', label: 'Dues' },
  { path: 'subs', label: 'Subs' },
  { path: 'email', label: 'Email' },
  { path: 'league-rules', label: 'League Rules' },
  { path: 'settings', label: 'Settings' },
]

export default function Season() {
  const { seasonId } = useParams()
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

  return (
    <SeasonContext.Provider value={{ season, refreshSeason, isCompleted: !!season.is_completed }}>
      <div className="flex flex-col min-h-full">
        {/* Season header */}
        <div className="bg-white border-b border-gray-200 px-4 pt-3 pb-0">
          <div className="flex items-center gap-2 mb-2">
            {/* Back button */}
            <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-700 flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-bold text-gray-900 truncate">{season.name}</h2>
              <p className="text-xs text-gray-400">{season.is_completed ? 'Completed' : season.is_active ? 'Active Season' : 'Past Season'}</p>
            </div>
            {/* Home button */}
            <button onClick={() => navigate('/')} className="text-gray-400 hover:text-gray-700 flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>
            {season.is_completed
              ? <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium flex-shrink-0">Completed</span>
              : season.is_active
              ? <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium flex-shrink-0">Active</span>
              : null
            }
          </div>

          {/* Tab scroll */}
          <div className="flex gap-1 overflow-x-auto pb-0 -mx-4 px-4 no-scrollbar">
            {TABS.map(t => (
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

        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </SeasonContext.Provider>
  )
}
