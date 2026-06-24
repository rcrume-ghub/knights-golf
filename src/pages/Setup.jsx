import { useState } from 'react'
import * as store from '../lib/store.js'
import { newId } from '../lib/db.js'

export default function Setup({ onComplete }) {
  const [form, setForm] = useState({
    name: '',
    startDate: '',
    weeks: '20',
    par: '36',
    blindScore: '39',
    maxHandicap: '18',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleCreate(e) {
    e.preventDefault()
    if (!form.name.trim()) { setError('Season name is required.'); return }
    if (!form.startDate) { setError('Start date is required.'); return }
    setSaving(true)
    setError('')

    const season = {
      id: newId(),
      name: form.name.trim(),
      start_date: form.startDate,
      weeks: parseInt(form.weeks),
      par: parseInt(form.par),
      blind_score: parseInt(form.blindScore),
      max_handicap: parseInt(form.maxHandicap),
      is_active: true,
      created_at: new Date().toISOString(),
    }

    await store.seasons.upsert(season)
    onComplete()
  }

  return (
    <div className="min-h-screen bg-green-800 flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">⛳</div>
          <h1 className="text-2xl font-bold text-white">Knight's Golf</h1>
          <p className="text-green-200 text-sm mt-1">Monday Night League</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Create Your First Season</h2>
          <p className="text-xs text-gray-400 mb-5">You can add teams and build the schedule after setup.</p>

          <form onSubmit={handleCreate} className="space-y-4">
            <Field label="Season Name" hint="e.g. 2026 Season">
              <input
                type="text"
                value={form.name}
                onChange={e => set('name', e.target.value)}
                placeholder="2026 Season"
                className={inp}
              />
            </Field>

            <Field label="First Week Date" hint="Date of Week 1 play">
              <input
                type="date"
                value={form.startDate}
                onChange={e => set('startDate', e.target.value)}
                className={inp}
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Weeks">
                <input type="number" value={form.weeks} onChange={e => set('weeks', e.target.value)} min={1} max={52} className={inp} />
              </Field>
              <Field label="Par">
                <input type="number" value={form.par} onChange={e => set('par', e.target.value)} min={27} max={54} className={inp} />
              </Field>
              <Field label="Blind Score">
                <input type="number" value={form.blindScore} onChange={e => set('blindScore', e.target.value)} min={27} max={63} className={inp} />
              </Field>
              <Field label="Max Handicap">
                <input type="number" value={form.maxHandicap} onChange={e => set('maxHandicap', e.target.value)} min={0} max={36} className={inp} />
              </Field>
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-green-700 text-white rounded-xl py-3 font-semibold text-sm hover:bg-green-800 disabled:opacity-50 transition-colors mt-2"
            >
              {saving ? 'Creating…' : 'Create Season'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

const inp = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600'

function Field({ label, hint, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">
        {label}
        {hint && <span className="font-normal text-gray-400 ml-1">— {hint}</span>}
      </label>
      {children}
    </div>
  )
}
