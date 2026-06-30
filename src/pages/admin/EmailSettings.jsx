import { useEffect, useState } from 'react'

const SETTINGS_KEYS = {
  commishName: 'commish_name',
  commishReplyEmail: 'commish_reply_email',
  emailAccounts: 'email_accounts',
}

const DEFAULT_ACCOUNTS = [
  { id: 'default-1', label: 'Knights Golf Gmail', email: 'knightsacgolf@gmail.com', password: 'Knight$AC', isDefault: true },
]

async function getDb() {
  const { getDB } = await import('../../lib/db.js')
  return getDB()
}

async function getSetting(key) {
  try {
    const db = await getDb()
    const row = await db.get('settings', key)
    return row?.value ?? null
  } catch { return null }
}

async function setSetting(key, value) {
  const db = await getDb()
  await db.put('settings', { id: key, value })
}

export async function loadEmailConfig() {
  const [name, replyEmail, accountsRaw] = await Promise.all([
    getSetting(SETTINGS_KEYS.commishName),
    getSetting(SETTINGS_KEYS.commishReplyEmail),
    getSetting(SETTINGS_KEYS.emailAccounts),
  ])
  let accounts = DEFAULT_ACCOUNTS
  try { if (accountsRaw) accounts = JSON.parse(accountsRaw) } catch {}
  const defaultAccount = accounts.find(a => a.isDefault) ?? accounts[0] ?? null
  return { name: name || '', replyEmail: replyEmail || defaultAccount?.email || '', accounts, defaultAccount }
}

export default function EmailSettings({ compact = false }) {
  const [commishName, setCommishName] = useState('')
  const [commishReplyEmail, setCommishReplyEmail] = useState('')
  const [accounts, setAccounts] = useState(DEFAULT_ACCOUNTS)
  const [showAdd, setShowAdd] = useState(false)
  const [editId, setEditId] = useState(null)
  const [saved, setSaved] = useState(false)
  const [showPasswords, setShowPasswords] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    const config = await loadEmailConfig()
    setCommishName(config.name)
    setCommishReplyEmail(config.replyEmail)
    setAccounts(config.accounts)
  }

  async function save(updatedAccounts) {
    const accts = updatedAccounts ?? accounts
    const defaultAcct = accts.find(a => a.isDefault) ?? accts[0]
    await Promise.all([
      setSetting(SETTINGS_KEYS.commishName, commishName),
      setSetting(SETTINGS_KEYS.commishReplyEmail, commishReplyEmail || defaultAcct?.email || ''),
      setSetting(SETTINGS_KEYS.emailAccounts, JSON.stringify(accts)),
    ])
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function setDefault(id) {
    const updated = accounts.map(a => ({ ...a, isDefault: a.id === id }))
    setAccounts(updated)
    save(updated)
  }

  function removeAccount(id) {
    if (accounts.length === 1) return alert('Must have at least one email account.')
    if (!confirm('Remove this email account?')) return
    const updated = accounts.filter(a => a.id !== id)
    if (!updated.some(a => a.isDefault)) updated[0].isDefault = true
    setAccounts(updated)
    save(updated)
  }

  function addAccount(acct) {
    const id = `acct-${Date.now()}`
    const updated = [...accounts, { ...acct, id, isDefault: false }]
    setAccounts(updated)
    setShowAdd(false)
    save(updated)
  }

  function updateAccount(id, acct) {
    const updated = accounts.map(a => a.id === id ? { ...a, ...acct } : a)
    setAccounts(updated)
    setEditId(null)
    save(updated)
  }

  const inp = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600'

  return (
    <div className={compact ? 'space-y-4' : 'px-4 py-4 max-w-2xl mx-auto space-y-4'}>

      {/* Commissioner Info */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">Commissioner Info</h3>
          {saved && <span className="text-xs text-green-600 font-medium">Saved</span>}
        </div>
        <div className="px-4 py-3 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Commissioner Name</label>
            <input type="text" value={commishName} onChange={e => setCommishName(e.target.value)}
              onBlur={() => save()} placeholder="Your name" className={inp} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Reply-To Email</label>
            <p className="text-xs text-gray-400 mb-1">When players hit Reply, it goes to this address.</p>
            <input type="email" value={commishReplyEmail} onChange={e => setCommishReplyEmail(e.target.value)}
              onBlur={() => save()} placeholder="your@email.com" className={inp} />
          </div>
        </div>
      </div>

      {/* Sender Accounts */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-800">Sender Accounts</h3>
            <p className="text-xs text-gray-400 mt-0.5">The default account is used as reply-to when sending league emails.</p>
          </div>
          <button onClick={() => setShowPasswords(v => !v)}
            className="text-xs text-gray-400 underline">{showPasswords ? 'Hide' : 'Show'} passwords</button>
        </div>

        <div className="divide-y divide-gray-50">
          {accounts.map(acct => (
            <div key={acct.id} className="px-4 py-3">
              {editId === acct.id ? (
                <AccountForm initial={acct} onSave={data => updateAccount(acct.id, data)} onCancel={() => setEditId(null)} />
              ) : (
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-900 truncate">{acct.label}</p>
                      {acct.isDefault && <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium flex-shrink-0">Default</span>}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{acct.email}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Password: {showPasswords ? acct.password : '••••••••'}</p>
                  </div>
                  <div className="flex flex-col gap-1 items-end flex-shrink-0">
                    {!acct.isDefault && (
                      <button onClick={() => setDefault(acct.id)}
                        className="text-xs text-green-700 font-medium">Set Default</button>
                    )}
                    <button onClick={() => setEditId(acct.id)}
                      className="text-xs text-blue-600 font-medium">Edit</button>
                    {accounts.length > 1 && (
                      <button onClick={() => removeAccount(acct.id)}
                        className="text-xs text-red-500 font-medium">Remove</button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {showAdd ? (
          <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
            <AccountForm onSave={addAccount} onCancel={() => setShowAdd(false)} />
          </div>
        ) : (
          <div className="px-4 py-3 border-t border-gray-100">
            <button onClick={() => setShowAdd(true)}
              className="text-xs text-green-700 font-semibold">+ Add Backup Email Account</button>
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
        <p className="text-xs text-blue-800 font-semibold mb-1">About Email Sending</p>
        <p className="text-xs text-blue-700">Emails are sent directly from knightsacgolf@gmail.com via Gmail. Players will see that address as the sender and can reply to it directly.</p>
      </div>
    </div>
  )
}

function AccountForm({ initial, onSave, onCancel }) {
  const [label, setLabel] = useState(initial?.label || '')
  const [email, setEmail] = useState(initial?.email || '')
  const [password, setPassword] = useState(initial?.password || '')
  const inp = 'w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-600'

  function submit(e) {
    e.preventDefault()
    if (!email) return alert('Email is required.')
    onSave({ label: label || email, email, password })
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Label</label>
        <input type="text" value={label} onChange={e => setLabel(e.target.value)} placeholder="e.g. Knights Golf Gmail" className={inp} />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@gmail.com" className={inp} required />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Password</label>
        <input type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className={inp} />
      </div>
      <div className="flex gap-2 pt-1">
        <button type="button" onClick={onCancel} className="flex-1 border border-gray-200 rounded-lg py-1.5 text-xs font-medium text-gray-600">Cancel</button>
        <button type="submit" className="flex-1 bg-green-700 text-white rounded-lg py-1.5 text-xs font-semibold">Save</button>
      </div>
    </form>
  )
}
