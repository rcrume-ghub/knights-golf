import { useEffect, useState } from 'react'
import * as store from '../../lib/store.js'
import { newId } from '../../lib/db.js'

const STATUSES = ['Active', 'Sub', 'Deactivated']

export default function Roster() {
  const [players, setPlayers] = useState([])
  const [filter, setFilter] = useState('Active')
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [showAdd, setShowAdd] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => { load() }, [])

  async function load() {
    const all = await store.players.getAll()
    setPlayers(all.sort((a, b) =>
      `${a.last_name}${a.first_name}`.localeCompare(`${b.last_name}${b.first_name}`)
    ))
    setLoading(false)
  }

  async function save(data) {
    await store.players.upsert({ ...data, id: data.id || newId() })
    await load()
    setEditingId(null)
    setShowAdd(false)
  }

  const filtered = players.filter(p => {
    if (filter !== 'All' && p.status !== filter) return false
    if (search) {
      const q = search.toLowerCase()
      return `${p.first_name || ''} ${p.last_name || ''}`.toLowerCase().includes(q) ||
        (p.email || '').toLowerCase().includes(q)
    }
    return true
  })

  if (loading) return (
    <div className="flex items-center justify-center h-48">
      <div className="text-3xl animate-pulse">👤</div>
    </div>
  )

  return (
    <div className="px-4 py-4 max-w-2xl mx-auto space-y-4">
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-bold text-gray-900">Roster</h2>
            <p className="text-xs text-gray-400 mt-0.5">{players.length} players total</p>
          </div>
          <button
            onClick={() => { setShowAdd(true); setEditingId(null) }}
            className="text-xs bg-green-700 text-white px-3 py-1.5 rounded-lg font-medium"
          >
            + Add Player
          </button>
        </div>
        <input
          type="search" placeholder="Search by name…"
          value={search} onChange={e => setSearch(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 mb-3"
        />
        <div className="flex gap-2 flex-wrap">
          {['Active', 'Sub', 'Deactivated', 'All'].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                filter === s ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-600'
              }`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {showAdd && (
        <PlayerForm onSave={save} onCancel={() => setShowAdd(false)} />
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden divide-y divide-gray-50">
        {filtered.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-gray-400">No players found.</p>
        )}
        {filtered.map(p => (
          <div key={p.id}>
            {editingId === p.id ? (
              <div className="p-4">
                <PlayerForm player={p} onSave={save} onCancel={() => setEditingId(null)} />
              </div>
            ) : (
              <div className="px-4 py-3 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-gray-900">
                      {p.first_name} {p.last_name}
                    </span>
                    <StatusBadge status={p.status} />
                  </div>
                  <p className="text-xs text-gray-400 truncate mt-0.5">
                    {[p.phone, p.email].filter(Boolean).join(' · ') || 'No contact info'}
                  </p>
                </div>
                <button
                  onClick={() => { setEditingId(p.id); setShowAdd(false) }}
                  className="text-xs text-green-700 font-medium px-2 py-1 rounded hover:bg-green-50"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function PlayerForm({ player, onSave, onCancel }) {
  const [form, setForm] = useState({
    first_name: player?.first_name || '',
    last_name: player?.last_name || '',
    email: player?.email || '',
    phone: player?.phone || '',
    status: player?.status || 'Active',
    notes: player?.notes || '',
  })
  const [saving, setSaving] = useState(false)

  function set(f, v) { setForm(prev => ({ ...prev, [f]: v })) }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    await onSave({ ...form, id: player?.id })
    setSaving(false)
  }

  return (
    <form onSubmit={handleSave} className="bg-green-50 rounded-xl p-4 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Field label="First Name">
          <input type="text" value={form.first_name} onChange={e => set('first_name', e.target.value)}
            className={inp} required />
        </Field>
        <Field label="Last Name">
          <input type="text" value={form.last_name} onChange={e => set('last_name', e.target.value)}
            className={inp} required />
        </Field>
      </div>
      <Field label="Email">
        <input type="email" value={form.email} onChange={e => set('email', e.target.value)} className={inp} />
      </Field>
      <Field label="Phone">
        <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} className={inp} />
      </Field>
      <Field label="Status">
        <select value={form.status} onChange={e => set('status', e.target.value)} className={inp}>
          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </Field>
      <Field label="Notes">
        <input type="text" value={form.notes} onChange={e => set('notes', e.target.value)}
          className={inp} placeholder="Optional" />
      </Field>
      <div className="flex gap-3 pt-1">
        <button type="button" onClick={onCancel}
          className="flex-1 border border-gray-200 bg-white rounded-xl py-2 text-sm font-medium text-gray-600">
          Cancel
        </button>
        <button type="submit" disabled={saving}
          className="flex-1 bg-green-700 text-white rounded-xl py-2 text-sm font-semibold disabled:opacity-50">
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>
    </form>
  )
}

export function StatusBadge({ status }) {
  const cls = {
    Active: 'bg-green-100 text-green-700',
    Sub: 'bg-blue-100 text-blue-700',
    Deactivated: 'bg-gray-100 text-gray-400'
  }
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cls[status] || 'bg-gray-100 text-gray-500'}`}>
      {status}
    </span>
  )
}

const inp = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white'

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
      {children}
    </div>
  )
}
