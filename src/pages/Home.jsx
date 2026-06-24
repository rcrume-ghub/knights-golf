import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import * as store from '../lib/store.js'

export default function Home({ onSeasonChange }) {
  const { isAdmin } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('current')
  const [seasons, setSeasons] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { load() }, [])

  async function load() {
    const all = await store.seasons.getAll()
    setSeasons(all.sort((a, b) => new Date(b.start_date) - new Date(a.start_date)))
    setLoading(false)
  }

  async function setActive(id) {
    await store.seasons.setActive(id)
    onSeasonChange(id)
    await load()
    setTab('current')
  }

  const activeSeason = seasons.find(s => s.is_active)
  const pastSeasons = seasons.filter(s => !s.is_active)

  if (loading) return <div className="flex items-center justify-center h-64"><div className="text-4xl animate-bounce">⛳</div></div>

  return (
    <div className="max-w-2xl mx-auto">
      {/* Tab bar */}
      <div className="flex bg-white border-b border-gray-200">
        {[['current', 'Current Season'], ['new', 'New Season'], ['past', 'Past Seasons']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)}
            className={`flex-1 py-3 text-xs font-semibold transition-colors border-b-2 ${tab === key ? 'border-green-700 text-green-700' : 'border-transparent text-gray-500'}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* CURRENT SEASON TAB */}
        {tab === 'current' && (
          <>
            {activeSeason ? (
              <div className="bg-green-800 text-white rounded-2xl shadow-lg p-5">
                <div className="flex items-start justify-between mb-1">
                  <h2 className="text-xl font-bold">{activeSeason.name}</h2>
                  <span className="text-xs bg-green-600 px-2 py-1 rounded-full font-medium">Active</span>
                </div>
                <p className="text-green-200 text-sm mb-4">
                  {activeSeason.weeks} weeks · Par {activeSeason.par} · Starts {fmtDate(activeSeason.start_date)}
                </p>
                <button
                  onClick={() => navigate(`/season/${activeSeason.id}`)}
                  className="w-full bg-white text-green-800 rounded-xl py-3 text-sm font-bold"
                >
                  Open Season →
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <p className="text-gray-400 text-sm mb-4">No active season.</p>
                {isAdmin && (
                  <button onClick={() => setTab('new')} className="bg-green-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold">
                    Start a New Season
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {/* NEW SEASON TAB */}
        {tab === 'new' && (
          <>
            {isAdmin ? (
              <div className="bg-white rounded-xl shadow-sm p-5 space-y-3">
                <h2 className="font-bold text-gray-900">Start a New Season</h2>
                <p className="text-sm text-gray-500">
                  The new season wizard will walk you through: season setup, copying or building teams, picking bye dates, and generating the schedule.
                </p>
                <button
                  onClick={() => navigate('/new-season')}
                  className="w-full bg-green-700 text-white rounded-xl py-3 text-sm font-bold"
                >
                  Launch New Season Wizard →
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <p className="text-gray-400 text-sm">Commissioner access required to create a season.</p>
              </div>
            )}
          </>
        )}

        {/* PAST SEASONS TAB */}
        {tab === 'past' && (
          <>
            {pastSeasons.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <p className="text-gray-400 text-sm">No past seasons yet.</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden divide-y divide-gray-50">
                {pastSeasons.map(s => (
                  <div key={s.id} className="px-4 py-3.5 flex items-center gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{s.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{s.weeks} weeks · Par {s.par} · {fmtDate(s.start_date)}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/season/${s.id}`)}
                        className="text-xs bg-green-700 text-white px-2.5 py-1 rounded-lg font-medium"
                      >
                        View
                      </button>
                      {isAdmin && (
                        <button
                          onClick={() => setActive(s.id)}
                          className="text-xs border border-gray-200 text-gray-500 px-2.5 py-1 rounded-lg hover:bg-gray-50"
                        >
                          Set Active
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function fmtDate(d) {
  if (!d) return ''
  return new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
