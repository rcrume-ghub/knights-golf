import { useEffect, useState } from 'react'
import * as store from '../../lib/store.js'
import { newId } from '../../lib/db.js'

export default function SubList() {
  const [subs, setSubs] = useState([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', handicap: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => { loadSubs() }, [])

  async function loadSubs() {
    const all = await store.players.getSubs()
    const allHcps = await store.handicaps.getAll()
    const hcpMap = {}
    for (const h of allHcps) {
      if (!hcpMap[h.player_id] || new Date(h.calculated_at) > new Date(hcpMap[h.player_id].calculated_at)) {
        hcpMap[h.player_id] = h
      }
    }
    setSubs(all.map(p => ({ ...p, handicap: hcpMap[p.id]?.value ?? null })).sort((a, b) => a.name.localeCompare(b.name)))
    setLoading(false)
  }

  async function addSub() {
    if (!form.name.trim()) return
    setSaving(true)
    const id = newId()
    await store.players.upsert({ id, name: form.name.trim(), phone: form.phone.trim() || null, is_sub: true })
    if (form.handicap) {
      const s = await store.seasons.getActive()
      const w = s ? (await store.weeks.getBySeason(s.id))[0] : null
      if (w) await store.handicaps.upsert({ player_id: id, week_id: w.id, value: parseFloat(form.handicap) })
    }
    setForm({ name: '', phone: '', handicap: '' })
    setAdding(false)
    setSaving(false)
    await loadSubs()
  }

  async function removeSub(id) {
    if (!confirm('Remove this sub?')) return
    await store.players.delete(id)
    setSubs(prev => prev.filter(s => s.id !== id))
  }

  if (loading) return <div className="p-8 text-center text-gray-400">Loading…</div>

  return (
    <div className="px-4 py-4 max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-900">Substitute List</h2>
        <button onClick={() => setAdding(!adding)} className="text-sm bg-green-700 text-white px-3 py-1.5 rounded-lg font-medium">+ Add Sub</button>
      </div>

      {adding && (
        <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
          <h3 className="text-sm font-semibold text-gray-700">New Substitute</h3>
          {[['text', 'Full name', 'name'], ['tel', 'Phone (optional)', 'phone']].map(([type, placeholder, key]) => (
            <input key={key} type={type} placeholder={placeholder} value={form[key]}
              onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" />
          ))}
          <input type="number" placeholder="Handicap (optional)" value={form.handicap}
            onChange={e => setForm(f => ({ ...f, handicap: e.target.value }))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            step="0.1" min="0" max="36" />
          <div className="flex gap-2">
            <button onClick={addSub} disabled={saving || !form.name.trim()} className="flex-1 bg-green-700 text-white rounded-lg py-2 text-sm font-medium disabled:opacity-50">
              {saving ? 'Saving…' : 'Add Sub'}
            </button>
            <button onClick={() => setAdding(false)} className="px-4 bg-gray-100 text-gray-600 rounded-lg py-2 text-sm font-medium">Cancel</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {subs.length === 0 ? (
          <p className="text-center text-gray-400 py-8 text-sm">No subs on file</p>
        ) : (
          <div className="divide-y divide-gray-50">
            {subs.map(sub => (
              <div key={sub.id} className="flex items-center gap-3 px-4 py-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{sub.name}</p>
                  <p className="text-xs text-gray-400">{sub.phone || 'No phone'}</p>
                </div>
                {sub.handicap != null && (
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded-full">{sub.handicap}</span>
                )}
                <button onClick={() => removeSub(sub.id)} className="text-gray-300 hover:text-red-400 p-1 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
