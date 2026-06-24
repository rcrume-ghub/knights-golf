import { useState } from 'react'
import { useAuth } from '../hooks/useAuth.jsx'

export default function AdminUnlock({ onClose }) {
  const { unlockAdmin, setAdminPin, hasPin } = useAuth()
  const [pin, setPin] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!hasPin) {
      if (pin.length < 4) { setError('PIN must be at least 4 digits'); setLoading(false); return }
      if (pin !== confirm) { setError('PINs do not match'); setLoading(false); return }
      await setAdminPin(pin)
      onClose?.()
    } else {
      const result = await unlockAdmin(pin)
      if (result.success) onClose?.()
      else setError(result.error)
    }

    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 mb-4" onClick={e => e.stopPropagation()}>
        <div className="text-center mb-5">
          <div className="text-3xl mb-1">🔐</div>
          <h2 className="font-bold text-gray-900">{hasPin ? 'Commissioner Access' : 'Set Commissioner PIN'}</h2>
          <p className="text-xs text-gray-400 mt-1">
            {hasPin ? 'Enter your PIN to unlock admin features' : 'Choose a PIN to protect commissioner features'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="password"
            inputMode="numeric"
            pattern="[0-9]*"
            value={pin}
            onChange={e => setPin(e.target.value)}
            placeholder={hasPin ? 'Enter PIN' : 'Choose a PIN (4+ digits)'}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-green-600"
            autoFocus
          />

          {!hasPin && (
            <input
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              placeholder="Confirm PIN"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          )}

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading || !pin}
            className="w-full bg-green-700 text-white rounded-xl py-3 font-semibold text-sm disabled:opacity-50"
          >
            {loading ? '…' : hasPin ? 'Unlock' : 'Set PIN & Continue'}
          </button>

          <button type="button" onClick={onClose} className="w-full text-sm text-gray-400 py-1">
            Cancel
          </button>
        </form>
      </div>
    </div>
  )
}
