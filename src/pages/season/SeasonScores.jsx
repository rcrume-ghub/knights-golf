import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSeason } from '../Season.jsx'
import * as store from '../../lib/store.js'
import { netScore, calcMatchPoints } from '../../lib/handicap.js'

export default function SeasonScores() {
  const { seasonId } = useParams()
  const { season } = useSeason()
  const [allWeeks, setAllWeeks] = useState([])
  const [selectedWeekId, setSelectedWeekId] = useState(null)
  const [matchups, setMatchups] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => { loadWeeks() }, [seasonId])
  useEffect(() => { if (selectedWeekId) loadMatchups(selectedWeekId) }, [selectedWeekId])

  async function loadWeeks() {
    const w = await store.weeks.getBySeason(seasonId)
    setAllWeeks(w)

    const today = new Date()
    const current = w.find(wk => {
      if (!wk.date) return false
      const diff = Math.abs(today - new Date(wk.date + 'T12:00:00')) / 86400000
      return diff < 4
    }) || w.find(wk => wk.week_type === 'regular') || w[0]
    setSelectedWeekId(current?.id ?? null)
    setLoading(false)
  }

  async function loadMatchups(weekId) {
    const [allMatchups, allTeams, allTeamPlayers, allPlayers, allHandicaps] = await Promise.all([
      store.matchups.getByWeek(weekId),
      store.teams.getBySeason(seasonId),
      store.teamPlayers.getAll(),
      store.players.getAll(),
      store.handicaps.getAll()
    ])

    const playerById = Object.fromEntries(allPlayers.map(p => [p.id, p]))
    const teamById = Object.fromEntries(allTeams.map(t => [t.id, t]))

    const hcpMap = {}
    for (const h of allHandicaps) {
      if (!hcpMap[h.player_id] || new Date(h.calculated_at) > new Date(hcpMap[h.player_id].calculated_at)) {
        hcpMap[h.player_id] = h
      }
    }

    const teamPlayersMap = {}
    for (const tp of allTeamPlayers) {
      if (!teamPlayersMap[tp.team_id]) teamPlayersMap[tp.team_id] = []
      const p = playerById[tp.player_id]
      if (p) teamPlayersMap[tp.team_id].push({ ...p, hcp: hcpMap[p.id]?.value ?? 99 })
    }
    for (const tid of Object.keys(teamPlayersMap)) {
      teamPlayersMap[tid].sort((a, b) => a.hcp - b.hcp)
    }

    const matchupIds = allMatchups.map(m => m.id)
    const existingScores = await store.scores.getByMatchups(matchupIds)
    const scoreMap = {}
    for (const s of existingScores) scoreMap[`${s.matchup_id}_${s.player_id}`] = s

    const enriched = allMatchups.map(m => {
      const homeTeam = teamById[m.home_team_id]
      const awayTeam = teamById[m.away_team_id]
      const entries = ['home', 'away'].flatMap(side => {
        const teamId = side === 'home' ? m.home_team_id : m.away_team_id
        const teamPls = teamPlayersMap[teamId] || []
        return teamPls.slice(0, 2).map((player, idx) => {
          const slot = idx === 0 ? 'A' : 'B'
          const existing = scoreMap[`${m.id}_${player.id}`]
          return {
            matchupId: m.id, playerId: player.id,
            playerName: `${player.first_name || ''} ${player.last_name || ''}`.trim(),
            teamNumber: side === 'home' ? homeTeam?.number : awayTeam?.number,
            slot, side,
            handicap: player.hcp === 99 ? null : player.hcp,
            gross: existing?.gross ?? '',
            isBlind: existing?.is_blind ?? false
          }
        })
      })
      return { ...m, homeTeam, awayTeam, entries }
    })

    setMatchups(enriched)
  }

  function updateEntry(matchupId, playerId, field, value) {
    setMatchups(prev => prev.map(m => {
      if (m.id !== matchupId) return m
      return { ...m, entries: m.entries.map(e => e.playerId !== playerId ? e : { ...e, [field]: value }) }
    }))
    setSaved(false)
  }

  async function handleSave() {
    setSaving(true)
    setSaved(false)
    const allEntries = matchups.flatMap(m => m.entries).filter(e => e.gross !== '' || e.isBlind)
    const payload = allEntries.map(e => ({
      matchup_id: e.matchupId,
      player_id: e.playerId,
      gross: e.isBlind ? season.blind_score : parseInt(e.gross),
      is_blind: e.isBlind
    }))
    await store.scores.upsertMany(payload)
    setSaved(true)
    setSaving(false)
  }

  if (loading) return <Spinner emoji="⛳" text="Loading…" />

  return (
    <div className="px-4 py-4 space-y-4 max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-4">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Week</label>
        <select
          value={selectedWeekId || ''}
          onChange={e => { setSelectedWeekId(e.target.value); setSaved(false) }}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          {allWeeks.filter(w => w.week_type !== 'holiday').map(w => (
            <option key={w.id} value={w.id}>
              Week {w.number}{w.date ? ` — ${fmtDate(w.date)}` : ''}
              {w.week_type !== 'regular' ? ` (${fmtType(w.week_type)})` : ''}
            </option>
          ))}
        </select>
      </div>

      {matchups.length === 0 && !loading && (
        <p className="text-center text-gray-400 py-12">No matchups for this week.</p>
      )}

      {matchups.map((m, idx) => (
        <MatchupCard key={m.id} matchup={m} matchNumber={idx + 1} season={season} onUpdate={updateEntry} />
      ))}

      {matchups.length > 0 && (
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-green-700 text-white rounded-xl py-3 font-semibold text-sm hover:bg-green-800 disabled:opacity-50 transition-colors shadow-sm"
        >
          {saving ? 'Saving…' : saved ? '✓ Scores saved' : 'Save Scores'}
        </button>
      )}
    </div>
  )
}

function MatchupCard({ matchup, matchNumber, season, onUpdate }) {
  const home = matchup.entries.filter(e => e.side === 'home').sort((a, b) => a.slot.localeCompare(b.slot))
  const away = matchup.entries.filter(e => e.side === 'away').sort((a, b) => a.slot.localeCompare(b.slot))

  const getNet = e => {
    if (!e) return null
    const gross = e.isBlind ? season?.blind_score : parseInt(e.gross)
    return isNaN(gross) ? null : netScore(gross, e.handicap ?? 0)
  }

  const { homePoints, awayPoints, breakdown } = calcMatchPoints({
    homeANet: getNet(home[0]), awayANet: getNet(away[0]),
    homeBNet: getNet(home[1]), awayBNet: getNet(away[1])
  })
  const hasPoints = breakdown.every(b => b.result !== 'pending')

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="bg-green-800 text-white px-4 py-2.5 flex items-center justify-between">
        <span className="text-sm font-semibold">Match {matchNumber}</span>
        <span className="text-sm">
          Team {matchup.homeTeam?.number} <span className="text-green-300">vs</span> Team {matchup.awayTeam?.number}
        </span>
        {matchup.hole_assignment && <span className="text-xs text-green-300">Hole {matchup.hole_assignment}</span>}
      </div>

      <div className="divide-y divide-gray-100">
        {['A', 'B'].map(slot => {
          const h = home.find(p => p.slot === slot)
          const a = away.find(p => p.slot === slot)
          const hNet = getNet(h), aNet = getNet(a)
          const result = hNet != null && aNet != null ? (hNet < aNet ? 'home' : hNet > aNet ? 'away' : 'tie') : null
          return (
            <div key={slot} className="px-4 py-3 flex items-start gap-2">
              <span className="text-xs font-bold text-gray-400 mt-3 w-4">{slot}</span>
              <div className="flex-1 grid grid-cols-2 gap-3">
                <PlayerInput
                  entry={h}
                  result={result === 'home' ? 'win' : result === 'tie' ? 'tie' : result === 'away' ? 'loss' : null}
                  onChange={(f, v) => h && onUpdate(matchup.id, h.playerId, f, v)}
                />
                <PlayerInput
                  entry={a}
                  result={result === 'away' ? 'win' : result === 'tie' ? 'tie' : result === 'home' ? 'loss' : null}
                  onChange={(f, v) => a && onUpdate(matchup.id, a.playerId, f, v)}
                />
              </div>
            </div>
          )
        })}
      </div>

      {hasPoints && (
        <div className="bg-gray-50 px-4 py-2.5 flex justify-between items-center border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Team {matchup.homeTeam?.number}</span>
            <span className={`text-lg font-bold ${homePoints > 0 ? 'text-green-700' : 'text-gray-400'}`}>{homePoints}</span>
          </div>
          <span className="text-xs text-gray-400">pts</span>
          <div className="flex items-center gap-2 flex-row-reverse">
            <span className="text-xs text-gray-500">Team {matchup.awayTeam?.number}</span>
            <span className={`text-lg font-bold ${awayPoints > 0 ? 'text-green-700' : 'text-gray-400'}`}>{awayPoints}</span>
          </div>
        </div>
      )}
    </div>
  )
}

function PlayerInput({ entry, result, onChange }) {
  if (!entry) return <div />
  const bgColor = result === 'win' ? 'bg-green-50 border-green-300'
    : result === 'loss' ? 'bg-red-50 border-red-200'
    : result === 'tie' ? 'bg-yellow-50 border-yellow-200'
    : 'border-gray-200'
  const net = (() => {
    const g = entry.isBlind ? null : parseInt(entry.gross)
    return isNaN(g) || g == null ? null : netScore(g, entry.handicap ?? 0)
  })()

  return (
    <div className={`rounded-lg border p-2 ${bgColor}`}>
      <p className="text-xs font-medium text-gray-700 truncate mb-1">{entry.playerName || '—'}</p>
      <div className="flex items-center gap-1.5">
        <input
          type="number" inputMode="numeric"
          value={entry.isBlind ? '' : entry.gross}
          onChange={e => onChange('gross', e.target.value)}
          disabled={entry.isBlind}
          placeholder={entry.isBlind ? 'Blind' : 'Gross'}
          className="w-16 text-center border border-gray-200 rounded px-1 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-600 disabled:bg-gray-100 disabled:text-gray-400"
          min={27} max={63}
        />
        <label className="flex items-center gap-1 cursor-pointer">
          <input
            type="checkbox" checked={entry.isBlind}
            onChange={e => onChange('isBlind', e.target.checked)}
            className="w-3.5 h-3.5 accent-green-700"
          />
          <span className="text-xs text-gray-500">Blind</span>
        </label>
      </div>
      <div className="flex items-center justify-between mt-1">
        <span className="text-xs text-gray-400">Hdcp: {entry.handicap ?? '—'}</span>
        {net != null && <span className="text-xs font-semibold text-gray-700">Net: {net}</span>}
      </div>
    </div>
  )
}

function Spinner({ emoji, text }) {
  return (
    <div className="flex items-center justify-center h-48">
      <div className="text-center text-gray-400">
        <div className="text-3xl mb-2 animate-pulse">{emoji}</div>
        <p className="text-sm">{text}</p>
      </div>
    </div>
  )
}

function fmtDate(d) {
  return new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
function fmtType(t) {
  return { regular: 'Regular', position_night: 'Position Night', scramble: 'Scramble', end_scramble: 'End Scramble', holiday: 'Holiday' }[t] || t
}
