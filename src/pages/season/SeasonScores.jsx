import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSeason } from '../Season.jsx'
import * as store from '../../lib/store.js'
import { newId } from '../../lib/db.js'
import { netScore, calcMatchPoints, getNine } from '../../lib/handicap.js'

export default function SeasonScores() {
  const { seasonId } = useParams()
  const { season, isCompleted } = useSeason()
  const [allWeeks, setAllWeeks] = useState([])
  const [selectedWeekId, setSelectedWeekId] = useState(null)
  const [matchups, setMatchups] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [rainoutModal, setRainoutModal] = useState(false)
  const [finalizeModal, setFinalizeModal] = useState(false)
  const [allSubs, setAllSubs] = useState([])

  useEffect(() => { loadWeeks() }, [seasonId])
  useEffect(() => { if (selectedWeekId) loadMatchups(selectedWeekId) }, [selectedWeekId])

  async function loadWeeks() {
    const [w, allPlayers] = await Promise.all([
      store.weeks.getBySeason(seasonId),
      store.players.getAll(),
    ])
    setAllSubs(allPlayers.filter(p => p.status === 'Sub'))
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
            isBlind: existing?.is_blind ?? false,
            isSub: existing?.is_sub ?? false,
            subName: existing?.sub_name ?? ''
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
      is_blind: e.isBlind,
      is_sub: e.isSub ?? false,
      sub_name: e.subName || null,
    }))
    await store.scores.upsertMany(payload)
    setSaved(true)
    setSaving(false)
  }

  async function handleFinalize(resolutions, missing) {
    // Apply resolutions to local matchup state
    for (const entry of missing) {
      const key = `${entry.matchupId}_${entry.playerId}`
      const res = resolutions[key]
      if (!res || res.type === 'forfeit') continue
      if (res.type === 'blind') {
        updateEntry(entry.matchupId, entry.playerId, 'isBlind', true)
      } else if (res.type === 'score' || res.type === 'sub') {
        updateEntry(entry.matchupId, entry.playerId, 'gross', String(res.gross))
        if (res.type === 'sub' && res.subName) {
          updateEntry(entry.matchupId, entry.playerId, 'subName', res.subName)
        }
      }
    }
    // Save all scores then finalize the week
    setSaving(true)
    const allEntries = matchups.flatMap(m => m.entries).filter(e => e.gross !== '' || e.isBlind)
    // Also include newly resolved entries
    const resolvedEntries = missing
      .filter(e => {
        const res = resolutions[`${e.matchupId}_${e.playerId}`]
        return res && (res.type === 'score' || res.type === 'sub') && res.gross
      })
      .map(e => {
        const res = resolutions[`${e.matchupId}_${e.playerId}`]
        return { matchupId: e.matchupId, playerId: e.playerId, gross: res.gross, isBlind: false }
      })
    const blindResolved = missing
      .filter(e => resolutions[`${e.matchupId}_${e.playerId}`]?.type === 'blind')
      .map(e => ({ matchupId: e.matchupId, playerId: e.playerId, gross: season.blind_score, isBlind: true }))
    const combined = [...allEntries, ...resolvedEntries, ...blindResolved]
    const seen = new Set()
    const deduped = combined.filter(e => {
      const k = `${e.matchupId}_${e.playerId}`
      if (seen.has(k)) return false
      seen.add(k)
      return true
    })
    await store.scores.upsertMany(deduped.map(e => ({
      matchup_id: e.matchupId,
      player_id: e.playerId,
      gross: e.isBlind ? season.blind_score : parseInt(e.gross),
      is_blind: e.isBlind,
    })))
    await store.weeks.upsert({ ...selectedWeek, is_finalized: true })
    setSaving(false)
    setFinalizeModal(false)
    loadWeeks()
    loadMatchups(selectedWeekId)
  }

  async function handleUnfinalize() {
    await store.weeks.upsert({ ...selectedWeek, is_finalized: false })
    loadWeeks()
  }

  if (loading) return <Spinner emoji="⛳" text="Loading…" />

  const selectedWeek = allWeeks.find(w => w.id === selectedWeekId)
  const isWeekFinalized = !!selectedWeek?.is_finalized
  const isReadOnly = isCompleted || isWeekFinalized

  return (
    <div className="px-4 py-4 space-y-4 max-w-2xl mx-auto">
      {/* Completed banner */}
      {isCompleted && (
        <div className="bg-gray-100 rounded-xl px-4 py-3 flex items-center gap-2">
          <span className="text-gray-400 text-lg">🏁</span>
          <p className="text-xs font-semibold text-gray-500">Season completed — scores are view only. Edit via Admin to make changes.</p>
        </div>
      )}

      {/* Week selector + Rained Out button */}
      <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Week</label>
            <select
              value={selectedWeekId || ''}
              onChange={e => { setSelectedWeekId(e.target.value); setSaved(false) }}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              {allWeeks.filter(w => w.week_type !== 'holiday').map(w => (
                <option key={w.id} value={w.id}>
                  Week {w.number}{w.date ? ` — ${fmtDate(w.date)}` : ''}
                  {w.date ? ` · ${getNine(w.date, season.start_date)}` : ''}
                  {w.week_type !== 'regular' ? ` (${fmtType(w.week_type)})` : ''}
                </option>
              ))}
            </select>
          </div>
          {!isCompleted && (
            <button
              onClick={() => setRainoutModal(true)}
              className="flex-shrink-0 mt-5 bg-red-50 border border-red-200 text-red-600 rounded-xl px-3 py-2 text-xs font-semibold hover:bg-red-100 transition-colors"
            >
              🌧 Rained Out
            </button>
          )}
        </div>
        {selectedWeek?.date && (
          <div className="flex items-center gap-2 pt-1">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${getNine(selectedWeek.date, season.start_date) === 'Front 9' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
              {getNine(selectedWeek.date, season.start_date)}
            </span>
            {selectedWeek.week_type !== 'regular' && (
              <span className="text-xs text-gray-400">{fmtType(selectedWeek.week_type)}</span>
            )}
          </div>
        )}
        {isWeekFinalized && (
          <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2.5 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-green-600 text-sm">✓</span>
              <span className="text-xs font-semibold text-green-700">Week finalized — scores are locked</span>
            </div>
            {!isCompleted && (
              <button
                onClick={handleUnfinalize}
                className="w-full bg-amber-500 text-white rounded-lg py-2 text-xs font-semibold hover:bg-amber-600 transition-colors"
              >
                Override Finalized Scores
              </button>
            )}
          </div>
        )}
        {selectedWeek?.week_type === 'rainout' && (
          <div className="flex items-center gap-2 bg-red-50 rounded-lg px-3 py-2">
            <span className="text-red-500 text-sm">🌧</span>
            <span className="text-xs font-semibold text-red-600">This week was rained out</span>
          </div>
        )}
      </div>

      {matchups.length === 0 && !loading && (
        <p className="text-center text-gray-400 py-12">No matchups for this week.</p>
      )}

      {matchups.map((m, idx) => (
        <MatchupCard key={m.id} matchup={m} matchNumber={idx + 1} season={season} weekDate={selectedWeek?.date} onUpdate={updateEntry} readOnly={isReadOnly} />
      ))}

      {matchups.length > 0 && !isReadOnly && (
        <div className="space-y-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-green-700 text-white rounded-xl py-3 font-semibold text-sm hover:bg-green-800 disabled:opacity-50 transition-colors shadow-sm"
          >
            {saving ? 'Saving…' : saved ? '✓ Scores saved' : 'Save Scores'}
          </button>
          <button
            onClick={() => setFinalizeModal(true)}
            disabled={saving}
            className="w-full bg-blue-700 text-white rounded-xl py-3 font-semibold text-sm hover:bg-blue-800 disabled:opacity-50 transition-colors shadow-sm"
          >
            ✓ Finalize Week
          </button>
        </div>
      )}

      {/* Bottom Rained Out button */}
      {!isReadOnly && (
        <button
          onClick={() => setRainoutModal(true)}
          className="w-full bg-red-50 border border-red-200 text-red-600 rounded-xl py-3 text-sm font-semibold hover:bg-red-100 transition-colors"
        >
          🌧 Mark Week as Rained Out
        </button>
      )}

      {rainoutModal && selectedWeek && (
        <RainoutModal
          week={selectedWeek}
          allWeeks={allWeeks}
          seasonId={seasonId}
          season={season}
          onClose={() => setRainoutModal(false)}
          onDone={() => { setRainoutModal(false); loadWeeks() }}
        />
      )}
      {finalizeModal && selectedWeek && (
        <FinalizeModal
          week={selectedWeek}
          matchups={matchups}
          season={season}
          allSubs={allSubs}
          onClose={() => setFinalizeModal(false)}
          onFinalize={handleFinalize}
        />
      )}
    </div>
  )
}

function MatchupCard({ matchup, matchNumber, season, weekDate, onUpdate, readOnly }) {
  const home = matchup.entries.filter(e => e.side === 'home').sort((a, b) => a.slot.localeCompare(b.slot))
  const away = matchup.entries.filter(e => e.side === 'away').sort((a, b) => a.slot.localeCompare(b.slot))

  const nine = getNine(weekDate, season?.start_date)
  const blindScore = nine === 'Back 9' ? (season?.blind_score ?? 39) + 1 : (season?.blind_score ?? 39)

  const getNet = e => {
    if (!e) return null
    if (e.isBlind) return blindScore
    const gross = parseInt(e.gross)
    return isNaN(gross) ? null : netScore(gross, e.handicap ?? 0)
  }

  const homeHasBozo = home.some(e => e.isBlind)
  const awayHasBozo = away.some(e => e.isBlind)

  const { homePoints, awayPoints, breakdown } = calcMatchPoints({
    homeANet: getNet(home[0]), awayANet: getNet(away[0]),
    homeBNet: getNet(home[1]), awayBNet: getNet(away[1]),
    homeHasBozo, awayHasBozo,
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
                  side="home"
                  readOnly={readOnly}
                  blindScore={blindScore}
                  result={result === 'home' ? 'win' : result === 'tie' ? 'tie' : result === 'away' ? 'loss' : null}
                  onChange={(f, v) => h && onUpdate(matchup.id, h.playerId, f, v)}
                />
                <PlayerInput
                  entry={a}
                  side="away"
                  readOnly={readOnly}
                  blindScore={blindScore}
                  result={result === 'away' ? 'win' : result === 'tie' ? 'tie' : result === 'home' ? 'loss' : null}
                  onChange={(f, v) => a && onUpdate(matchup.id, a.playerId, f, v)}
                />
              </div>
            </div>
          )
        })}
      </div>

      {hasPoints && (
        <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-100">
          <div className="flex flex-col items-center gap-1">
            <span className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shadow-sm border ${homePoints > awayPoints ? 'bg-green-600 text-white border-green-700' : homePoints === awayPoints && homePoints > 0 ? 'bg-yellow-400 text-white border-yellow-500' : 'bg-white text-gray-400 border-gray-200'}`}>
              {homePoints % 1 === 0 ? homePoints : homePoints.toFixed(1)}
            </span>
            <span className="text-xs text-gray-500">Team {matchup.homeTeam?.number}</span>
          </div>
          <span className="text-xs text-gray-400 font-medium">pts</span>
          <div className="flex flex-col items-center gap-1">
            <span className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shadow-sm border ${awayPoints > homePoints ? 'bg-green-600 text-white border-green-700' : awayPoints === homePoints && awayPoints > 0 ? 'bg-yellow-400 text-white border-yellow-500' : 'bg-white text-gray-400 border-gray-200'}`}>
              {awayPoints % 1 === 0 ? awayPoints : awayPoints.toFixed(1)}
            </span>
            <span className="text-xs text-gray-500">Team {matchup.awayTeam?.number}</span>
          </div>
        </div>
      )}
    </div>
  )
}

function PlayerInput({ entry, result, onChange, side, readOnly, blindScore = 39 }) {
  if (!entry) return <div />
  const baseBg = side === 'home' ? '#F3E4C9' : '#DBCEA5'
  const resultRing = result === 'win' ? 'ring-2 ring-green-600'
    : result === 'loss' ? 'ring-2 ring-red-600'
    : result === 'tie' ? 'ring-2 ring-yellow-400'
    : ''
  const net = entry.isBlind ? blindScore : (() => {
    const g = parseInt(entry.gross)
    return isNaN(g) ? null : netScore(g, entry.handicap ?? 0)
  })()

  return (
    <div className={`rounded-lg border border-stone-300 p-2 ${resultRing}`} style={{ backgroundColor: baseBg }}>
      <p className="text-xs font-medium text-gray-700 truncate mb-1">{entry.playerName || '—'}</p>
      <div className="flex items-center gap-1.5">
        <input
          type="number" inputMode="numeric"
          value={entry.isBlind ? '' : entry.gross}
          onChange={e => !readOnly && onChange('gross', e.target.value)}
          disabled={entry.isBlind || readOnly}
          readOnly={readOnly}
          placeholder={entry.isBlind ? 'Blind' : entry.gross || 'Gross'}
          className="w-16 text-center border border-gray-200 rounded px-1 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-600 disabled:bg-gray-100 disabled:text-gray-400"
          min={27} max={63}
        />
        {!readOnly && (
          <div className="flex flex-col gap-0.5">
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="checkbox" checked={entry.isBlind}
                onChange={e => { onChange('isBlind', e.target.checked); if (e.target.checked) onChange('isSub', false) }}
                className="w-3.5 h-3.5 accent-green-700"
              />
              <span className="text-xs text-gray-500">Blind</span>
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="checkbox" checked={entry.isSub ?? false}
                onChange={e => { onChange('isSub', e.target.checked); if (e.target.checked) onChange('isBlind', false) }}
                className="w-3.5 h-3.5 accent-blue-700"
              />
              <span className="text-xs text-gray-500">Sub</span>
            </label>
          </div>
        )}
        {readOnly && entry.isBlind && <span className="text-xs text-gray-400 italic">Blind</span>}
        {readOnly && entry.isSub && <span className="text-xs text-blue-600 font-medium">Sub</span>}
      </div>
      {!readOnly && entry.isSub && (
        <input
          type="text"
          value={entry.subName ?? ''}
          onChange={e => onChange('subName', e.target.value)}
          placeholder="Sub name"
          className="mt-1 w-full border border-blue-200 rounded px-1.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      )}
      {readOnly && entry.isSub && entry.subName && (
        <p className="text-xs text-blue-600 mt-0.5 truncate">Sub: {entry.subName}</p>
      )}
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
  return { regular: 'Regular', position_night: 'Position Night', scramble: 'Scramble', end_scramble: 'End Scramble', holiday: 'Holiday', rainout: 'Rained Out' }[t] || t
}

function FinalizeModal({ week, matchups, season, allSubs, onClose, onFinalize }) {
  const missing = matchups.flatMap(m =>
    m.entries.filter(e => e.gross === '' && !e.isBlind).map(e => ({ ...e, matchupId: m.id, homeTeam: m.homeTeam, awayTeam: m.awayTeam }))
  )

  const initKey = e => `${e.matchupId}_${e.playerId}`
  const [resolutions, setResolutions] = useState(
    Object.fromEntries(missing.map(e => [initKey(e), { type: null }]))
  )
  const [saving, setSaving] = useState(false)

  // Detect forfeit: both players from same team+matchup are missing
  const forfeitGroups = {}
  for (const e of missing) {
    const gk = `${e.matchupId}_${e.side}`
    if (!forfeitGroups[gk]) forfeitGroups[gk] = []
    forfeitGroups[gk].push(e)
  }

  function resolve(entry, type, extra = {}) {
    setResolutions(prev => ({ ...prev, [initKey(entry)]: { type, ...extra } }))
  }

  function resolveForfeitGroup(entries) {
    setResolutions(prev => {
      const next = { ...prev }
      for (const e of entries) next[initKey(e)] = { type: 'forfeit' }
      return next
    })
  }

  const allResolved = missing.every(e => resolutions[initKey(e)].type !== null)

  async function doFinalize() {
    setSaving(true)
    await onFinalize(resolutions, missing)
    setSaving(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white px-5 pt-5 pb-3 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">Finalize Week {week.number}</h2>
          {week.date && <p className="text-xs text-gray-400">{fmtDate(week.date)}</p>}
        </div>

        <div className="px-5 py-4 space-y-4">
          {missing.length === 0 ? (
            <p className="text-sm text-gray-600 text-center py-2">All scores are entered. Ready to lock this week.</p>
          ) : (
            <>
              <p className="text-sm text-gray-500">{missing.length} missing score{missing.length > 1 ? 's' : ''}. How should each be handled?</p>
              {Object.entries(forfeitGroups).map(([gk, entries]) => {
                const bothMissing = entries.length === 2
                const teamNum = entries[0].teamNumber
                return entries.map(entry => {
                  const key = initKey(entry)
                  const res = resolutions[key]
                  return (
                    <MissingSlotResolver
                      key={key}
                      entry={entry}
                      resolution={res}
                      allSubs={allSubs}
                      canForfeit={bothMissing}
                      onForfeitTeam={() => resolveForfeitGroup(entries)}
                      onResolve={(type, extra) => resolve(entry, type, extra)}
                    />
                  )
                })
              })}
            </>
          )}
        </div>

        <div className="sticky bottom-0 bg-white px-5 pb-5 pt-3 border-t border-gray-100 space-y-2">
          <button
            onClick={doFinalize}
            disabled={!allResolved || saving}
            className="w-full bg-blue-700 text-white rounded-xl py-3 text-sm font-semibold disabled:opacity-40"
          >
            {saving ? 'Finalizing…' : '✓ Finalize & Lock Week'}
          </button>
          <button onClick={onClose} className="w-full text-gray-400 py-2 text-sm">Cancel</button>
        </div>
      </div>
    </div>
  )
}

function MissingSlotResolver({ entry, resolution, allSubs, canForfeit, onForfeitTeam, onResolve }) {
  const [scoreInput, setScoreInput] = useState('')
  const [subId, setSubId] = useState('')
  const [subScore, setSubScore] = useState('')

  if (resolution.type === 'blind') {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-800">{entry.playerName} (Slot {entry.slot})</p>
          <p className="text-xs text-yellow-700 mt-0.5">Marked as Blind — net: 39</p>
        </div>
        <button onClick={() => onResolve(null)} className="text-xs text-gray-400 underline">Change</button>
      </div>
    )
  }
  if (resolution.type === 'forfeit') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-800">{entry.playerName} (Slot {entry.slot})</p>
          <p className="text-xs text-red-600 mt-0.5">Team Forfeit — opponent gets 3 pts</p>
        </div>
        <button onClick={() => onResolve(null)} className="text-xs text-gray-400 underline">Change</button>
      </div>
    )
  }
  if (resolution.type === 'score') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-800">{entry.playerName} (Slot {entry.slot})</p>
          <p className="text-xs text-green-700 mt-0.5">Score: {resolution.gross}</p>
        </div>
        <button onClick={() => onResolve(null)} className="text-xs text-gray-400 underline">Change</button>
      </div>
    )
  }
  if (resolution.type === 'sub') {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-800">{entry.playerName} (Slot {entry.slot})</p>
          <p className="text-xs text-blue-700 mt-0.5">Sub: {resolution.subName} — Score: {resolution.gross}</p>
        </div>
        <button onClick={() => onResolve(null)} className="text-xs text-gray-400 underline">Change</button>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 space-y-2">
      <p className="text-xs font-semibold text-gray-800">
        Team {entry.teamNumber} — {entry.playerName} (Slot {entry.slot})
      </p>
      <div className="grid grid-cols-2 gap-1.5">
        <button
          onClick={() => onResolve('blind')}
          className="bg-yellow-100 text-yellow-800 rounded-lg py-1.5 text-xs font-semibold"
        >
          Blind/Bozo
        </button>
        {canForfeit && (
          <button
            onClick={onForfeitTeam}
            className="bg-red-100 text-red-700 rounded-lg py-1.5 text-xs font-semibold"
          >
            Team Forfeit
          </button>
        )}
      </div>
      <div className="flex gap-1.5">
        <input
          type="number" inputMode="numeric" placeholder="Enter gross"
          value={scoreInput} onChange={e => setScoreInput(e.target.value)}
          className="flex-1 border border-gray-200 rounded-lg px-2 py-1.5 text-xs"
          min={27} max={72}
        />
        <button
          onClick={() => scoreInput && onResolve('score', { gross: parseInt(scoreInput) })}
          disabled={!scoreInput}
          className="bg-green-700 text-white rounded-lg px-2.5 py-1.5 text-xs font-semibold disabled:opacity-40"
        >
          Use Score
        </button>
      </div>
      <div className="space-y-1">
        <select
          value={subId} onChange={e => setSubId(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs"
        >
          <option value="">— Pick sub —</option>
          {allSubs.map(s => (
            <option key={s.id} value={s.id}>{s.first_name} {s.last_name}</option>
          ))}
        </select>
        {subId && (
          <div className="flex gap-1.5">
            <input
              type="number" inputMode="numeric" placeholder="Sub's gross"
              value={subScore} onChange={e => setSubScore(e.target.value)}
              className="flex-1 border border-gray-200 rounded-lg px-2 py-1.5 text-xs"
              min={27} max={72}
            />
            <button
              onClick={() => {
                const sub = allSubs.find(s => s.id === subId)
                subScore && onResolve('sub', {
                  gross: parseInt(subScore),
                  subName: `${sub?.first_name || ''} ${sub?.last_name || ''}`.trim(),
                })
              }}
              disabled={!subScore}
              className="bg-blue-700 text-white rounded-lg px-2.5 py-1.5 text-xs font-semibold disabled:opacity-40"
            >
              Use Sub
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function RainoutModal({ week, allWeeks, seasonId, season, onClose, onDone }) {
  const [step, setStep] = useState('ask') // 'ask' | 'no_confirm' | 'done'
  const [saving, setSaving] = useState(false)

  async function markRainout(addMakeup) {
    setSaving(true)
    // Mark the week as rainout
    await store.weeks.upsert({ ...week, week_type: 'rainout' })

    if (addMakeup) {
      // Create makeup week at end of season
      const maxNum = Math.max(...allWeeks.map(w => w.number))
      const lastWeek = allWeeks.find(w => w.number === maxNum)
      const lastDate = lastWeek?.date ? new Date(lastWeek.date + 'T12:00:00') : null
      const makeupDate = lastDate ? new Date(lastDate.getTime() + 7 * 86400000) : null

      const makeupWeekId = newId()
      await store.weeks.upsert({
        id: makeupWeekId,
        season_id: seasonId,
        number: maxNum + 1,
        date: makeupDate ? makeupDate.toISOString().split('T')[0] : null,
        week_type: 'makeup',
      })

      // Duplicate matchups from rained-out week into makeup week
      const originalMatchups = await store.matchups.getByWeek(week.id)
      for (const m of originalMatchups) {
        await store.matchups.upsert({
          id: newId(),
          week_id: makeupWeekId,
          home_team_id: m.home_team_id,
          away_team_id: m.away_team_id,
          hole_assignment: m.hole_assignment,
        })
      }
    }

    setSaving(false)
    onDone()
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl p-5 space-y-4" onClick={e => e.stopPropagation()}>
        <div className="text-center">
          <div className="text-4xl mb-2">🌧</div>
          <h2 className="text-base font-bold text-gray-900">Rained Out — Week {week.number}</h2>
          {week.date && <p className="text-xs text-gray-400 mt-0.5">{fmtDate(week.date)}</p>}
        </div>

        {step === 'ask' && (
          <>
            <p className="text-sm text-gray-600 text-center">Add a makeup week to the end of the season?</p>
            <div className="space-y-2">
              <button
                onClick={() => markRainout(true)}
                disabled={saving}
                className="w-full bg-green-700 text-white rounded-xl py-3 text-sm font-semibold disabled:opacity-50"
              >
                {saving ? 'Saving…' : 'Yes — Add Makeup Week'}
              </button>
              <button
                onClick={() => setStep('no_confirm')}
                disabled={saving}
                className="w-full border border-gray-200 text-gray-600 rounded-xl py-3 text-sm font-medium"
              >
                No — Just Mark as Rained Out
              </button>
              <button
                onClick={onClose}
                className="w-full border border-gray-200 text-gray-500 rounded-xl py-3 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </>
        )}

        {step === 'no_confirm' && (
          <>
            <p className="text-sm text-gray-600 text-center">Are you sure? This week will be marked as rained out with no makeup scheduled.</p>
            <div className="space-y-2">
              <button
                onClick={() => markRainout(false)}
                disabled={saving}
                className="w-full bg-red-600 text-white rounded-xl py-3 text-sm font-semibold disabled:opacity-50"
              >
                {saving ? 'Saving…' : 'Yes, Mark Rained Out'}
              </button>
              <button onClick={() => setStep('ask')} className="w-full border border-gray-200 text-gray-600 rounded-xl py-3 text-sm font-medium">
                ← Go Back
              </button>
              <button
                onClick={onClose}
                className="w-full border border-gray-200 text-gray-500 rounded-xl py-3 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
