import { useState } from 'react'
import { useAuth, loadAccounts } from '../hooks/useAuth.jsx'

export default function LoginModal({ onClose, onSuccess }) {
  const { login } = useAuth()
  const accounts = loadAccounts()
  const [selectedName, setSelectedName] = useState(accounts[0]?.name || '')
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!selectedName) return setError('Select an account.')
    if (!pin) return setError('Enter your PIN.')
    const ok = login(selectedName, pin)
    if (ok) { onSuccess?.(); onClose() }
    else setError('Incorrect PIN. Try again.')
  }

  if (accounts.length === 0) return (
    <Overlay onClose={onClose}>
      <div className="px-6 py-8 text-center">
        <p className="text-3xl mb-3">🔒</p>
        <p className="text-sm font-semibold text-gray-800 mb-1">No Accounts Configured</p>
        <p className="text-xs text-gray-500 leading-relaxed">An admin must set up accounts in Admin → Users before anyone can sign in.</p>
        <button onClick={onClose} className="mt-5 text-xs text-green-700 font-semibold underline">Close</button>
      </div>
    </Overlay>
  )

  return (
    <Overlay onClose={onClose}>
      <div className="px-6 py-6">
        <p className="text-lg font-bold text-gray-900 mb-1">Sign In</p>
        <p className="text-xs text-gray-400 mb-4">Select your name and enter your PIN to access this feature.</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Account</label>
            <select
              value={selectedName}
              onChange={e => { setSelectedName(e.target.value); setError('') }}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white"
            >
              <option value="">— Select your name —</option>
              {accounts.map(a => (
                <option key={a.id} value={a.name}>
                  {a.name} · {a.role === 'commissioner' ? 'Commissioner' : 'Admin'}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">PIN</label>
            <input
              type="password"
              inputMode="numeric"
              value={pin}
              onChange={e => { setPin(e.target.value); setError('') }}
              placeholder="Enter PIN"
              maxLength={10}
              autoFocus
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
          <button type="submit" className="w-full bg-green-700 text-white rounded-lg py-2.5 text-sm font-semibold mt-1">
            Sign In
          </button>
        </form>
      </div>
    </Overlay>
  )
}

function Overlay({ onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50" onClick={onClose}>
      <div className="w-full max-w-md bg-white rounded-t-2xl shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex justify-end px-4 pt-3">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl font-light leading-none">&times;</button>
        </div>
        {children}
        <div className="pb-8" />
      </div>
    </div>
  )
}
