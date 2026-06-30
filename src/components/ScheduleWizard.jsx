import { useState } from 'react'
import * as store from '../lib/store.js'
import { newId, deleteOne } from '../lib/db.js'

/**
 * ScheduleWizard — prompt-based schedule generator.
 * Props:
 *   season     — season object (needs .start_date, .weeks, .id)
 *   teams      — array of team objects for this season
 *   onComplete — called when schedule is generated
 *   onCancel   — called if user cancels
 */
export default function ScheduleWizard({ season, teams, onComplete, onCancel }) {
  const totalWeeks = parseInt(season.weeks) || 20
  const [step, setStep] = useState(1)

  // Step 1: start date
  const [startDate, setStartDate] = useState(season.start_date || '')

  // Step 2: weeks count
  const [weeks, setWeeks] = useState(totalWeeks)

  // Step 3: scramble
  const [scrambleMode, setScrambleMode] = useState(null) // 'auto' | 'custom' | 'none'
  const [scrambleWeeks, setScrambleWeeks] = useState([])

  // Step 4: position night
  const [positionWeeks, setPositionWeeks] = useState([])

  const [generating, setGenerating] = useState(false)

  function toggleWeek(weekNum, list, setList) {
    setList(prev => prev.includes(weekNum) ? prev.filter(n => n !== weekNum) : [...prev, weekNum])
  }

  async function generate() {
    if (!startDate) return alert('Please set a start date.')
    if (teams.length < 2) return alert('Add at least 2 teams to the roster before generating a schedule.')
    setGenerating(true)

    // Build final week type assignments
    const weekTypes = {}
    for (const wn of scrambleWeeks) weekTypes[wn] = 'scramble'
    for (const wn of positionWeeks) weekTypes[wn] = 'position_night'

    // Clear existing schedule
    const oldWeeks = await store.weeks.getBySeason(season.id)
    for (const w of oldWeeks) {
      const ms = await store.matchups.getByWeek(w.id)
      for (const m of ms) await deleteOne('matchups', m.id)
      await deleteOne('weeks', w.id)
    }

    // Round-robin rotation
    const rounds = roundRobin(teams.map(t => t.id))
    const start = new Date(startDate + 'T12:00:00')
    const newWeeks = []
    const newMatchups = []

    for (let i = 0; i < weeks; i++) {
      const weekNum = i + 1
      const d = new Date(start)
      d.setDate(start.getDate() + i * 7)
      const wid = newId()
      const weekType = weekTypes[weekNum] || 'regular'
      newWeeks.push({
        id: wid,
        season_id: season.id,
        number: weekNum,
        date: d.toISOString().split('T')[0],
        week_type: weekType,
      })
      if (weekType !== 'bye') {
        const round = rounds[i % rounds.length]
        round.forEach(([h, a], mi) => {
          newMatchups.push({ id: newId(), week_id: wid, home_team_id: h, away_team_id: a, hole_assignment: mi + 1 })
        })
      }
    }

    for (const w of newWeeks) await store.weeks.upsert(w)
    for (const m of newMatchups) await store.matchups.upsert(m)

    // Update season start date and weeks if changed
    await store.seasons.upsert({ ...season, start_date: startDate, weeks })

    setGenerating(false)
    onComplete()
  }

  const weekNums = Array.from({ length: weeks }, (_, i) => i + 1)

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="flex gap-1">
        {[1, 2, 3, 4].map(n => (
          <div key={n} className={`flex-1 h-1.5 rounded-full transition-all ${n <= step ? 'bg-green-700' : 'bg-gray-200'}`} />
        ))}
      </div>

      {/* ── Step 1: Start Date ── */}
      {step === 1 && (
        <WizardCard
          title="When does the season start?"
          subtitle="This sets the date for Week 1."
          onBack={onCancel}
          onNext={() => { if (!startDate) return alert('Pick a start date.'); setStep(2) }}
          nextLabel="Next →"
        >
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className={inp}
            autoFocus
          />
        </WizardCard>
      )}

      {/* ── Step 2: Weeks ── */}
      {step === 2 && (
        <WizardCard
          title="How many weeks in the season?"
          subtitle="Each week = one league night."
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
          nextLabel="Next →"
        >
          <div className="flex items-center gap-4 justify-center py-2">
            <button onClick={() => setWeeks(w => Math.max(1, w - 1))}
              className="w-10 h-10 rounded-full border-2 border-gray-200 text-xl font-bold text-gray-600 hover:border-green-700 hover:text-green-700 transition-colors">−</button>
            <span className="text-4xl font-bold text-green-700 w-16 text-center">{weeks}</span>
            <button onClick={() => setWeeks(w => Math.min(40, w + 1))}
              className="w-10 h-10 rounded-full border-2 border-gray-200 text-xl font-bold text-gray-600 hover:border-green-700 hover:text-green-700 transition-colors">+</button>
          </div>
          <p className="text-xs text-gray-400 text-center">Season runs {weeks} weeks starting {fmtDate(startDate)}</p>
        </WizardCard>
      )}

      {/* ── Step 3: Scramble Weeks ── */}
      {step === 3 && (
        <WizardCard
          title="Scramble weeks?"
          subtitle="Scramble is a different format — all players play as a team."
          onBack={() => setStep(2)}
          onNext={() => {
            if (scrambleMode === null) return alert('Make a selection.')
            if (scrambleMode === 'auto') setScrambleWeeks([1, weeks])
            setStep(4)
          }}
          nextLabel="Next →"
        >
          <div className="space-y-3">
            <Option selected={scrambleMode === 'auto'} onClick={() => { setScrambleMode('auto'); setScrambleWeeks([1, weeks]) }}>
              <p className="text-sm font-semibold text-gray-800">Yes — Week 1 &amp; Week {weeks}</p>
              <p className="text-xs text-gray-400">Automatically set the first and last weeks as scramble</p>
            </Option>
            <Option selected={scrambleMode === 'custom'} onClick={() => { setScrambleMode('custom'); setScrambleWeeks([]) }}>
              <p className="text-sm font-semibold text-gray-800">Customize</p>
              <p className="text-xs text-gray-400">I'll pick which weeks are scramble</p>
            </Option>
            <Option selected={scrambleMode === 'none'} onClick={() => { setScrambleMode('none'); setScrambleWeeks([]) }}>
              <p className="text-sm font-semibold text-gray-800">No scramble weeks</p>
              <p className="text-xs text-gray-400">All weeks are regular play</p>
            </Option>
          </div>

          {scrambleMode === 'custom' && (
            <div className="mt-4">
              <p className="text-xs font-semibold text-gray-500 mb-2">Tap weeks to mark as scramble:</p>
              <WeekGrid weekNums={weekNums} selected={scrambleWeeks} blocked={[]} onToggle={n => toggleWeek(n, scrambleWeeks, setScrambleWeeks)} color="green" />
              {scrambleWeeks.length > 0 && (
                <p className="text-xs text-green-700 mt-2">Scramble: Week{scrambleWeeks.length > 1 ? 's' : ''} {scrambleWeeks.sort((a,b)=>a-b).join(', ')}</p>
              )}
            </div>
          )}
        </WizardCard>
      )}

      {/* ── Step 4: Position Night ── */}
      {step === 4 && (
        <WizardCard
          title="Position night weeks?"
          subtitle="Position nights rank teams by standings — top vs top, bottom vs bottom."
          onBack={() => setStep(3)}
          onNext={generate}
          nextLabel={generating ? 'Generating…' : 'Generate Schedule'}
          nextDisabled={generating}
        >
          <p className="text-xs font-semibold text-gray-500 mb-2">Tap weeks to mark as position night:</p>
          <WeekGrid
            weekNums={weekNums}
            selected={positionWeeks}
            blocked={scrambleWeeks}
            onToggle={n => toggleWeek(n, positionWeeks, setPositionWeeks)}
            color="blue"
          />
          {positionWeeks.length > 0 && (
            <p className="text-xs text-blue-700 mt-2">Position Night: Week{positionWeeks.length > 1 ? 's' : ''} {positionWeeks.sort((a,b)=>a-b).join(', ')}</p>
          )}

          {/* Summary */}
          <div className="mt-4 bg-gray-50 rounded-xl p-3 space-y-1 text-xs text-gray-600">
            <p><span className="font-semibold">Start:</span> {fmtDate(startDate)}</p>
            <p><span className="font-semibold">Weeks:</span> {weeks}</p>
            <p><span className="font-semibold">Teams:</span> {teams.length}</p>
            {scrambleWeeks.length > 0 && <p><span className="font-semibold">Scramble:</span> Wk {scrambleWeeks.sort((a,b)=>a-b).join(', ')}</p>}
            {positionWeeks.length > 0 && <p><span className="font-semibold">Position Night:</span> Wk {positionWeeks.sort((a,b)=>a-b).join(', ')}</p>}
          </div>
        </WizardCard>
      )}
    </div>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function WizardCard({ title, subtitle, onBack, onNext, nextLabel, nextDisabled, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
      <div>
        <p className="text-base font-bold text-gray-900">{title}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
      {children}
      <div className="flex gap-2 pt-1">
        <button onClick={onBack} className="flex-1 border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-gray-600">← Back</button>
        <button onClick={onNext} disabled={nextDisabled}
          className="flex-1 bg-green-700 text-white rounded-xl py-2.5 text-sm font-semibold disabled:opacity-50">
          {nextLabel}
        </button>
      </div>
    </div>
  )
}

function Option({ selected, onClick, children }) {
  return (
    <button onClick={onClick}
      className={`w-full text-left p-3 rounded-xl border-2 transition-all ${selected ? 'border-green-700 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
      {children}
    </button>
  )
}

function WeekGrid({ weekNums, selected, blocked, onToggle, color }) {
  const colorMap = {
    green: { sel: 'bg-green-700 text-white', block: 'bg-gray-200 text-gray-300 cursor-not-allowed line-through', base: 'bg-gray-100 text-gray-700 hover:bg-gray-200' },
    blue:  { sel: 'bg-blue-600 text-white',  block: 'bg-green-100 text-green-600 cursor-not-allowed',            base: 'bg-gray-100 text-gray-700 hover:bg-gray-200' },
  }
  const c = colorMap[color]
  return (
    <div className="flex flex-wrap gap-2">
      {weekNums.map(n => {
        const isSelected = selected.includes(n)
        const isBlocked = blocked.includes(n)
        return (
          <button key={n}
            onClick={() => !isBlocked && onToggle(n)}
            className={`w-10 h-10 rounded-full text-xs font-semibold transition-all flex-shrink-0 ${isBlocked ? c.block : isSelected ? c.sel : c.base}`}>
            {n}
          </button>
        )
      })}
    </div>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function roundRobin(ids) {
  const arr = ids.length % 2 === 0 ? [...ids] : [...ids, null]
  const n = arr.length
  const rounds = []
  for (let r = 0; r < n - 1; r++) {
    const round = []
    for (let i = 0; i < n / 2; i++) {
      if (arr[i] && arr[n - 1 - i]) round.push([arr[i], arr[n - 1 - i]])
    }
    rounds.push(round)
    arr.splice(1, 0, arr.pop())
  }
  return rounds
}

function fmtDate(d) {
  if (!d) return '—'
  return new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const inp = 'w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white'
