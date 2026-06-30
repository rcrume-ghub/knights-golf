import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as store from '../lib/store.js'
import { newId } from '../lib/db.js'

export default function Seasons() {
  const navigate = useNavigate()
  const [allSeasons, setAllSeasons] = useState([])
  const [loading, setLoading] = useState(true)
  const [showNew, setShowNew] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    const s = await store.seasons.getAll()
    setAllSeasons(s.sort((a, b) => new Date(b.start_date) - new Date(a.start_date)))
    setLoading(false)
  }

  async function setActive(id) {
    await store.seasons.setActive(id)
    await load()
    navigate('/')
  }

  if (loading) return <Spinner />

  return (
    <div className="px-4 py-4 max-w-2xl mx-auto space-y-4">
      <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-gray-900">Seasons</h2>
          <p className="text-xs text-gray-400 mt-0.5">{allSeasons.length} season{allSeasons.length !== 1 ? 's' : ''} on record</p>
        </div>
        <button
          onClick={() => setShowNew(true)}
          className="text-xs bg-green-700 text-white px-3 py-1.5 rounded-lg font-medium"
        >
          + New Season
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden divide-y divide-gray-50">
        {allSeasons.map(s => (
          <div key={s.id} className="px-4 py-4 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 text-sm">{s.name}</span>
                {s.is_active && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Active</span>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                {s.weeks} weeks · Par {s.par} · Blind {s.blind_score} · Max HCP {s.max_handicap}
              </p>
              {s.start_date && (
                <p className="text-xs text-gray-400">Starts {fmtDate(s.start_date)}</p>
              )}
            </div>
            {!s.is_active && (
              <button
                onClick={() => setActive(s.id)}
                className="flex-shrink-0 text-xs border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Set Active
              </button>
            )}
          </div>
        ))}
        {allSeasons.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-gray-400">No seasons yet.</p>
        )}
      </div>

      {showNew && (
        <NewSeasonModal onClose={() => setShowNew(false)} onSaved={load} />
      )}
    </div>
  )
}

function NewSeasonModal({ onClose, onSaved }) {
  const [form, setForm] = useState({
    name: '', startDate: '', weeks: '20', par: '36', blindScore: '39', maxHandicap: '18'
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function set(f, v) { setForm(prev => ({ ...prev, [f]: v })) }

  async function handleSave(e) {
    e.preventDefault()
    if (!form.name.trim()) { setError('Name required.'); return }
    setSaving(true)
    const s = {
      id: newId(),
      name: form.name.trim(),
      start_date: form.startDate,
      weeks: parseInt(form.weeks),
      par: parseInt(form.par),
      blind_score: parseInt(form.blindScore),
      max_handicap: parseInt(form.maxHandicap),
      is_active: false,
      created_at: new Date().toISOString(),
    }
    await store.seasons.upsert(s)
    await onSaved()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center sm:items-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
        <h3 className="font-bold text-gray-900 mb-4">New Season</h3>
        <form onSubmit={handleSave} className="space-y-3">
          <Field label="Season Name">
            <input type="text" value={form.name} onChange={e => set('name', e.target.value)} placeholder="2027 Season" className={inp} />
          </Field>
          <Field label="First Week Date">
            <input type="date" value={form.startDate} onChange={e => set('startDate', e.target.value)} className={inp} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Weeks"><input type="number" value={form.weeks} onChange={e => set('weeks', e.target.value)} min={1} max={52} className={inp} /></Field>
            <Field label="Par"><input type="number" value={form.par} onChange={e => set('par', e.target.value)} min={27} max={54} className={inp} /></Field>
            <Field label="Blind Score"><input type="number" value={form.blindScore} onChange={e => set('blindScore', e.target.value)} min={27} max={63} className={inp} /></Field>
            <Field label="Max HCP"><input type="number" value={form.maxHandicap} onChange={e => set('maxHandicap', e.target.value)} min={0} max={36} className={inp} /></Field>
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-gray-600">Cancel</button>
            <button type="submit" disabled={saving} className="flex-1 bg-green-700 text-white rounded-xl py-2.5 text-sm font-semibold disabled:opacity-50">
              {saving ? 'Saving…' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const inp = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600'

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
      {children}
    </div>
  )
}

function fmtDate(d) {
  return new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function Spinner() {
  return (
    <div className="flex items-center justify-center h-48">
      <div className="text-center text-gray-400">
        <div className="text-3xl mb-2 animate-pulse">📅</div>
        <p className="text-sm">Loading seasons…</p>
      </div>
    </div>
  )
}
