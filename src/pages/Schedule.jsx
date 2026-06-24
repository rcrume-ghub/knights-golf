import { useEffect, useState } from 'react'
import * as store from '../lib/store.js'

export default function Schedule() {
  const [allWeeks, setAllWeeks] = useState([])
  const [allTeams, setAllTeams] = useState([])
  const [allTeamPlayers, setAllTeamPlayers] = useState([])
  const [allPlayers, setAllPlayers] = useState([])
  const [matchups, setMatchups] = useState([])
  const [selectedWeekId, setSelectedWeekId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadAll() }, [])

  async function loadAll() {
    const s = await store.seasons.getActive()
    if (!s) { setLoading(false); return }

    const [w, t, tp, p] = await Promise.all([
      store.weeks.getBySeason(s.id),
      store.teams.getBySeason(s.id),
      store.teamPlayers.getAll(),
      store.players.getAll()
    ])

    setAllWeeks(w)
    setAllTeams(t)
    setAllTeamPlayers(tp)
    setAllPlayers(p)

    const today = new Date()
    const upcoming = w.find(wk => new Date(wk.date + 'T12:00:00') >= today)
    setSelectedWeekId((upcoming || w[w.length - 1])?.id ?? null)
    setLoading(false)
  }

  useEffect(() => {
    if (!selectedWeekId) return
    store.matchups.getByWeek(selectedWeekId).then(setMatchups)
  }, [selectedWeekId])

  const playerById = Object.fromEntries(allPlayers.map(p => [p.id, p]))
  const teamById = Object.fromEntries(allTeams.map(t => [t.id, t]))
  const teamPlayersMap = {}
  for (const tp of allTeamPlayers) {
    if (!teamPlayersMap[tp.team_id]) teamPlayersMap[tp.team_id] = {}
    teamPlayersMap[tp.team_id][tp.slot] = playerById[tp.player_id]
  }

  const getNames = (teamId) =>
    ['A', 'B'].map(s => teamPlayersMap[teamId]?.[s]?.name).filter(Boolean).join(' & ')

  const selectedWeek = allWeeks.find(w => w.id === selectedWeekId)

  if (loading) return <Spinner />

  return (
    <div className="px-4 py-4 max-w-2xl mx-auto space-y-4">
      <div className="bg-white rounded-xl shadow-sm p-4">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Week</label>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {allWeeks.map(w => (
            <button key={w.id} onClick={() => setSelectedWeekId(w.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${w.id === selectedWeekId ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-600'} ${w.week_type === 'holiday' ? 'opacity-50' : ''}`}>
              Wk {w.number}
            </button>
          ))}
        </div>
      </div>

      {selectedWeek && (
        <div className="bg-white rounded-xl shadow-sm p-4 flex items-start justify-between">
          <div>
            <h2 className="font-bold text-gray-900">Week {selectedWeek.number}</h2>
            <p className="text-sm text-gray-500">{fmtDate(selectedWeek.date)}</p>
            {selectedWeek.notes && <p className="text-xs text-gray-400 mt-1">{selectedWeek.notes}</p>}
          </div>
          <WeekBadge type={selectedWeek.week_type} />
        </div>
      )}

      {selectedWeek?.week_type === 'holiday' ? (
        <p className="text-center text-gray-400 py-8">No golf this week</p>
      ) : matchups.length === 0 ? (
        <p className="text-center text-gray-400 py-8">No matchups scheduled</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-2.5 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700">Matchups</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {matchups.map(m => (
              <div key={m.id} className="px-4 py-3 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-gray-900">Team {teamById[m.home_team_id]?.number}</span>
                    <span className="text-xs text-gray-400">vs</span>
                    <span className="font-semibold text-sm text-gray-900">Team {teamById[m.away_team_id]?.number}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{getNames(m.home_team_id)} vs {getNames(m.away_team_id)}</p>
                </div>
                {m.hole_assignment && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Hole {m.hole_assignment}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-2.5 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700">Team Roster</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {allTeams.map(t => (
            <div key={t.id} className="px-4 py-2.5 flex items-center">
              <span className="text-sm font-semibold text-gray-700 w-16">Team {t.number}</span>
              <span className="text-sm text-gray-600">{getNames(t.id)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function WeekBadge({ type }) {
  const map = {
    regular: ['bg-blue-100 text-blue-700', 'Regular'],
    position_night: ['bg-purple-100 text-purple-700', 'Position Night'],
    scramble: ['bg-orange-100 text-orange-700', 'Scramble'],
    end_scramble: ['bg-orange-100 text-orange-700', 'End Scramble'],
    holiday: ['bg-gray-100 text-gray-500', 'No Golf']
  }
  const [cls, label] = map[type] || ['bg-gray-100 text-gray-500', type]
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cls}`}>{label}</span>
}

function fmtDate(d) {
  return new Date(d + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

function Spinner() {
  return (
    <div className="flex items-center justify-center h-48">
      <div className="text-center text-gray-400">
        <div className="text-3xl mb-2 animate-pulse">📅</div>
        <p className="text-sm">Loading schedule…</p>
      </div>
    </div>
  )
}
