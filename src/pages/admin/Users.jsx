import { useState, useEffect } from 'react'
import { loadAccounts, saveAccounts } from '../../hooks/useAuth.jsx'
import { useAuth } from '../../hooks/useAuth.jsx'

export default function Users() {
  const { session } = useAuth()
  const [accounts, setAccounts] = useState([])
  const [showAdd, setShowAdd] = useState(false)
  const [editId, setEditId] = useState(null)
  const [showPins, setShowPins] = useState(false)

  useEffect(() => { setAccounts(loadAccounts()) }, [])

  function persist(updated) {
    saveAccounts(updated)
    setAccounts(updated)
  }

  function addAccount(acct) {
    const id = `acct-${Date.now()}`
    persist([...accounts, { ...acct, id }])
    setShowAdd(false)
  }

  function updateAccount(id, acct) {
    persist(accounts.map(a => a.id === id ? { ...a, ...acct } : a))
    setEditId(null)
  }

  function removeAccount(id) {
    if (accounts.length === 1 && !confirm('Remove the last account? The app will return to open-access mode.')) return
    if (accounts.length > 1 && !confirm('Remove this account?')) return
    persist(accounts.filter(a => a.id !== id))
  }

  const bootstrapMode = accounts.length === 0

  return (
    <div className="px-4 py-4 max-w-2xl mx-auto space-y-4">

      {bootstrapMode && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <p className="text-xs font-bold text-amber-800 mb-1">⚠ No Accounts Configured — Open Access Mode</p>
          <p className="text-xs text-amber-700 leading-relaxed">
            Anyone can access Admin and all features right now. Add a Commissioner account below to enable access control.
          </p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-800">League Accounts</h3>
            <p className="text-xs text-gray-400 mt-0.5">Name + PIN login for Commissioner and Admin access.</p>
          </div>
          <button onClick={() => setShowPins(v => !v)} className="text-xs text-gray-400 underline">
            {showPins ? 'Hide' : 'Show'} PINs
          </button>
        </div>

        <div className="divide-y divide-gray-50">
          {accounts.map(a => (
            <div key={a.id} className="px-4 py-3">
              {editId === a.id ? (
                <AccountForm initial={a} onSave={data => updateAccount(a.id, data)} onCancel={() => setEditId(null)} />
              ) : (
                <div className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-900">{a.name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${a.role === 'commissioner' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                        {a.role === 'commissioner' ? 'Commissioner' : 'Admin'}
                      </span>
                      {session?.name === a.name && (
                        <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">You</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">PIN: {showPins ? a.pin : '••••'}</p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <button onClick={() => setEditId(a.id)} className="text-xs text-blue-600 font-medium">Edit</button>
                    <button onClick={() => removeAccount(a.id)} className="text-xs text-red-500 font-medium">Remove</button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {accounts.length === 0 && (
            <p className="px-4 py-5 text-xs text-gray-400 text-center">No accounts yet. Add one below.</p>
          )}
        </div>

        {showAdd ? (
          <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
            <AccountForm onSave={addAccount} onCancel={() => setShowAdd(false)} />
          </div>
        ) : (
          <div className="px-4 py-3 border-t border-gray-100">
            <button onClick={() => setShowAdd(true)} className="text-xs text-green-700 font-semibold">
              + Add Account
            </button>
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
        <p className="text-xs font-semibold text-blue-800 mb-1">Access Levels</p>
        <div className="space-y-1 text-xs text-blue-700">
          <p><strong>Commissioner:</strong> Full access — settings, email, finalize scores, end season, delete data.</p>
          <p><strong>Admin:</strong> Enter scores, manage roster and subs. No settings or destructive actions.</p>
          <p><strong>Public (no login):</strong> Read-only — view standings, schedule, stats, roster.</p>
        </div>
      </div>
    </div>
  )
}

function AccountForm({ initial, onSave, onCancel }) {
  const [name, setName] = useState(initial?.name || '')
  const [pin, setPin] = useState(initial?.pin || '')
  const [role, setRole] = useState(initial?.role || 'admin')
  const [showPin, setShowPin] = useState(false)
  const inp = 'w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-600'

  function submit(e) {
    e.preventDefault()
    if (!name.trim()) return alert('Name is required.')
    if (!pin.trim()) return alert('PIN is required.')
    onSave({ name: name.trim(), pin: pin.trim(), role })
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Robert Crume" className={inp} required />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">PIN</label>
        <div className="relative">
          <input type={showPin ? 'text' : 'password'} value={pin} onChange={e => setPin(e.target.value)} placeholder="Create a PIN" className={inp} required />
          <button type="button" onClick={() => setShowPin(v => !v)} className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">{showPin ? 'Hide' : 'Show'}</button>
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Role</label>
        <select value={role} onChange={e => setRole(e.target.value)} className={inp}>
          <option value="commissioner">Commissioner</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className="flex gap-2 pt-1">
        <button type="button" onClick={onCancel} className="flex-1 border border-gray-200 rounded-lg py-1.5 text-xs font-medium text-gray-600">Cancel</button>
        <button type="submit" className="flex-1 bg-green-700 text-white rounded-lg py-1.5 text-xs font-semibold">Save</button>
      </div>
    </form>
  )
}
