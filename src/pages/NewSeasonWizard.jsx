import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as store from '../lib/store.js'
import { newId } from '../lib/db.js'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function NewSeasonWizard({ onComplete }) {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [prevSeason, setPrevSeason] = useState(null)
  const [allPlayers, setAllPlayers] = useState([])
  const [prevTeams, setPrevTeams] = useState([])
  const [prevTeamPlayers, setPrevTeamPlayers] = useState([])

  const [info, setInfo] = useState({
    name: `${new Date().getFullYear()} Season`,
    start_date: '',
    league_night: 1,
    weeks: 20,
    par: 36,
    blind_score: 39,
    max_handicap: 18,
  })
  const [copyPrev, setCopyPrev] = useState(null)
  const [teamDraft, setTeamDraft] = useState([])
  const [saving, setSaving] = useState(false)

  useEffect(() => { loadPrev() }, [])

  async function loadPrev() {
    const seasons = await store.seasons.getAll()
    const prev = seasons.filter(s => !s.is_active).sort((a, b) => new Date(b.start_date) - new Date(a.start_date))[0] ?? null
    setPrevSeason(prev)
    const p = await store.players.getAll()
    setAllPlayers(p)
    if (prev) {
      const t = await store.teams.getBySeason(prev.id)
      const tp = await store.teamPlayers.getAll()
      setPrevTeams(t)
      setPrevTeamPlayers(tp.filter(tpi => t.some(ti => ti.id === tpi.team_id)))
    }
  }

  function initFromPrev() {
    const draft = prevTeams.map(t => {
      const pids = prevTeamPlayers.filter(tp => tp.team_id === t.id).map(tp => tp.player_id)
      return { id: newId(), teamNumber: t.number, name: t.name || '', playerIds: pids }
    })
    setTeamDraft(draft)
    setCopyPrev(true)
    setStep(2)
  }

  function initFresh() {
    setTeamDraft([{ id: newId(), teamNumber: 1, name: '', playerIds: [] }])
    setCopyPrev(false)
    setStep(2)
  }

  function addTeam() {
    setTeamDraft(d => [...d, { id: newId(), teamNumber: d.length + 1, name: '', playerIds: [] }])
  }

  function removeTeam(idx) {
    setTeamDraft(d => d.filter((_, i) => i !== idx).map((t, i) => ({ ...t, teamNumber: i + 1 })))
  }

  function swapPlayer(teamIdx, slot, newPid) {
    setTeamDraft(d => d.map((t, i) => {
      if (i !== teamIdx) return t
      const pids = [...t.playerIds]
      pids[slot] = newPid
      return { ...t, playerIds: pids }
    }))
  }

  function removePlayer(teamIdx, slot) {
    setTeamDraft(d => d.map((t, i) => {
      if (i !== teamIdx) return t
      const pids = [...t.playerIds]
      pids.splice(slot, 1)
      return { ...t, playerIds: pids }
    }))
  }

  function addPlayerToTeam(teamIdx, playerId) {
    setTeamDraft(d => d.map((t, i) => {
      if (i !== teamIdx) return t
      return { ...t, playerIds: [...t.playerIds, playerId] }
    }))
  }

  async function createSeason() {
    setSaving(true)
    const seasonId = newId()
    await store.seasons.upsert({
      id: seasonId,
      name: info.name,
      start_date: info.start_date,
      league_night: parseInt(info.league_night),
      weeks: parseInt(info.weeks),
      par: parseInt(info.par),
      blind_score: parseInt(info.blind_score),
      max_handicap: parseInt(info.max_handicap),
      is_active: true,
      is_archived: false,
    })
    // Deactivate all other seasons
    const all = await store.seasons.getAll()
    for (const s of all) {
      if (s.id !== seasonId && s.is_active) await store.seasons.upsert({ ...s, is_active: false })
    }

    for (const draft of teamDraft) {
      const teamId = draft.id
      await store.teams.upsert({ id: teamId, season_id: seasonId, number: draft.teamNumber, name: draft.name })
      for (const pid of draft.playerIds.filter(Boolean)) {
        await store.teamPlayers.upsert({ id: newId(), team_id: teamId, player_id: pid })
        if (prevSeason) {
          const prevHcps = await store.seasonPlayerHcp.getByPlayer(pid)
          const prevH = prevHcps.find(h => h.season_id === prevSeason.id)
          if (prevH) {
            await store.seasonPlayerHcp.upsert({
              id: newId(), player_id: pid, season_id: seasonId,
              prev_season_hcp: prevH.current_hcp,
              current_hcp: prevH.current_hcp,
            })
          }
        }
      }
    }

    onComplete(seasonId)
    navigate(`/season/${seasonId}`, { replace: true })
    setSaving(false)
  }

  const playerById = Object.fromEntries(allPlayers.map(p => [p.id, p]))
  const usedPlayerIds = new Set(teamDraft.flatMap(t => t.playerIds).filter(Boolean))
  const availablePlayers = allPlayers.filter(p => p.status === 'Active' || p.status === 'Sub')

  return (
    <div className="px-4 py-4 max-w-2xl mx-auto space-y-4">
      {/* Progress */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center gap-2 mb-1">
          <button onClick={() => step > 1 ? setStep(step - 1) : navigate('/')} className="text-gray-400 hover:text-gray-600 text-sm">←</button>
          <h2 className="font-bold text-gray-900 flex-1">New Season Wizard</h2>
          <span className="text-xs text-gray-400">Step {Math.ceil(step)} of 3</span>
        </div>
        <div className="flex gap-1 mt-2">
          {[1, 2, 3].map(n => (
            <div key={n} className={`flex-1 h-1.5 rounded-full transition-colors ${n <= step ? 'bg-green-700' : 'bg-gray-200'}`} />
          ))}
        </div>
      </div>

      {/* Step 1: Season Info */}
      {step === 1 && (
        <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
          <h3 className="text-sm font-semibold text-gray-800">Season Details</h3>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Season Name</label>
            <input type="text" value={info.name} onChange={e => setInfo(i => ({ ...i, name: e.target.value }))} className={inp} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Start Date</label>
              <input type="date" value={info.start_date} onChange={e => setInfo(i => ({ ...i, start_date: e.target.value }))} className={inp} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">League Night</label>
              <select value={info.league_night} onChange={e => setInfo(i => ({ ...i, league_night: parseInt(e.target.value) }))} className={inp}>
                {DAYS.map((d, idx) => <option key={idx} value={idx}>{d}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1"># of Weeks</label>
              <input type="number" value={info.weeks} onChange={e => setInfo(i => ({ ...i, weeks: e.target.value }))} className={inp} min={1} max={40} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Par</label>
              <input type="number" value={info.par} onChange={e => setInfo(i => ({ ...i, par: e.target.value }))} className={inp} min={27} max={72} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Blind Score</label>
              <input type="number" value={info.blind_score} onChange={e => setInfo(i => ({ ...i, blind_score: e.target.value }))} className={inp} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Max Handicap</label>
              <input type="number" value={info.max_handicap} onChange={e => setInfo(i => ({ ...i, max_handicap: e.target.value }))} className={inp} />
            </div>
          </div>
          <button disabled={!info.name.trim()} onClick={() => setStep(1.5)} className="w-full bg-green-700 text-white rounded-xl py-3 text-sm font-bold disabled:opacity-50">
            Next: Teams →
          </button>
        </div>
      )}

      {/* Step 1.5: Copy or fresh */}
      {step === 1.5 && (
        <div className="bg-white rounded-xl shadow-sm p-5 space-y-3">
          <h3 className="text-sm font-semibold text-gray-800">Team Setup</h3>
          {prevSeason ? (
            <>
              <p className="text-sm text-gray-600">Would you like to copy teams from <strong>{prevSeason.name}</strong>?</p>
              <button onClick={initFromPrev} className="w-full bg-green-700 text-white rounded-xl py-3 text-sm font-bold">
                Copy from {prevSeason.name}
              </button>
              <button onClick={initFresh} className="w-full border border-gray-200 text-gray-600 rounded-xl py-3 text-sm font-semibold">
                Start Fresh (no teams)
              </button>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-500">No previous season found. Starting fresh.</p>
              <button onClick={initFresh} className="w-full bg-green-700 text-white rounded-xl py-3 text-sm font-bold">Continue →</button>
            </>
          )}
        </div>
      )}

      {/* Step 2: Team builder */}
      {step === 2 && (
        <>
          <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-800">Teams</h3>
              <p className="text-xs text-gray-400 mt-0.5">{teamDraft.length} teams · tap a player to swap</p>
            </div>
            <button onClick={addTeam} className="text-xs bg-green-700 text-white px-3 py-1.5 rounded-lg font-medium">+ Add Team</button>
          </div>

          {teamDraft.map((draft, ti) => (
            <div key={draft.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                <span className="text-sm font-bold text-gray-800">Team {draft.teamNumber}</span>
                <button onClick={() => removeTeam(ti)} className="text-xs text-red-400 font-medium">Remove Team</button>
              </div>
              <div className="divide-y divide-gray-50">
                {[0, 1].map(slot => {
                  const pid = draft.playerIds[slot]
                  const player = pid ? playerById[pid] : null
                  return (
                    <WizardPlayerSlot key={slot} slot={slot} player={player}
                      availablePlayers={availablePlayers.filter(pl => !usedPlayerIds.has(pl.id) || pl.id === pid)}
                      playerById={playerById}
                      onSwap={(newPid) => swapPlayer(ti, slot, newPid)}
                      onRemove={() => removePlayer(ti, slot)}
                      onAdd={(newPid) => addPlayerToTeam(ti, newPid)}
                    />
                  )
                })}
              </div>
            </div>
          ))}

          <button onClick={() => setStep(3)} className="w-full bg-green-700 text-white rounded-xl py-3 text-sm font-bold">
            Review & Create Season →
          </button>
        </>
      )}

      {/* Step 3: Confirm */}
      {step === 3 && (
        <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
          <h3 className="text-sm font-semibold text-gray-800">Confirm Season</h3>
          <div className="space-y-1 text-sm">
            <Row label="Name" value={info.name} />
            <Row label="Start Date" value={info.start_date || 'Not set'} />
            <Row label="League Night" value={DAYS[info.league_night]} />
            <Row label="Weeks" value={info.weeks} />
            <Row label="Par" value={info.par} />
            <Row label="Teams" value={teamDraft.length} />
          </div>
          <button onClick={createSeason} disabled={saving} className="w-full bg-green-700 text-white rounded-xl py-3 text-sm font-bold disabled:opacity-50">
            {saving ? 'Creating Season…' : 'Create Season'}
          </button>
        </div>
      )}
    </div>
  )
}

function WizardPlayerSlot({ slot, player, availablePlayers, playerById, onSwap, onRemove, onAdd }) {
  const [picking, setPicking] = useState(false)
  const [search, setSearch] = useState('')
  const label = slot === 0 ? 'A' : 'B'

  const filtered = availablePlayers.filter(p =>
    search ? `${p.first_name} ${p.last_name}`.toLowerCase().includes(search.toLowerCase()) : true
  )

  return (
    <div className="px-4 py-3">
      <div className="flex items-center gap-3">
        <span className={`text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${slot === 0 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{label}</span>
        {player ? (
          <>
            <span className="flex-1 text-sm font-medium text-gray-900">{player.first_name} {player.last_name}</span>
            <button onClick={() => setPicking(!picking)} className="text-xs text-green-700 font-medium">Swap</button>
            <button onClick={onRemove} className="text-xs text-red-400 font-medium ml-1">✕</button>
          </>
        ) : (
          <>
            <span className="flex-1 text-sm text-gray-400 italic">Empty slot</span>
            <button onClick={() => setPicking(!picking)} className="text-xs text-green-700 font-medium">+ Add</button>
          </>
        )}
      </div>
      {picking && (
        <div className="mt-2 bg-green-50 rounded-lg p-2">
          <input type="search" placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} autoFocus
            className="w-full border border-gray-200 rounded px-2 py-1.5 text-xs mb-1.5 focus:outline-none focus:ring-1 focus:ring-green-600 bg-white" />
          <div className="max-h-36 overflow-y-auto bg-white rounded border border-gray-200 divide-y divide-gray-50">
            {filtered.slice(0, 20).map(p => (
              <button key={p.id} onClick={() => { player ? onSwap(p.id) : onAdd(p.id); setPicking(false); setSearch('') }}
                className="w-full text-left px-3 py-2 text-xs hover:bg-green-50 transition-colors">
                {p.first_name} {p.last_name} <span className="text-gray-400">({p.status})</span>
              </button>
            ))}
            {filtered.length === 0 && <p className="px-3 py-2 text-xs text-gray-400">No players found.</p>}
          </div>
          <button onClick={() => { setPicking(false); setSearch('') }} className="mt-1.5 text-xs text-gray-400">Cancel</button>
        </div>
      )}
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between py-1 border-b border-gray-50">
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold text-gray-800">{value}</span>
    </div>
  )
}

const inp = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white'

