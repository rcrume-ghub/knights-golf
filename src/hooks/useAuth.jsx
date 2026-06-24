import { createContext, useContext, useEffect, useState } from 'react'
import { getSetting, setSetting } from '../lib/db.js'

const AuthContext = createContext(null)

async function hashPin(pin) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(pin))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [hasPin, setHasPin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSetting('admin_pin_hash').then(hash => {
      setHasPin(!!hash)
      setLoading(false)
    })
  }, [])

  async function unlockAdmin(pin) {
    const hash = await hashPin(pin)
    const stored = await getSetting('admin_pin_hash')
    if (hash === stored) {
      setIsAdmin(true)
      return { success: true }
    }
    return { success: false, error: 'Incorrect PIN' }
  }

  function lockAdmin() {
    setIsAdmin(false)
  }

  async function setAdminPin(pin) {
    const hash = await hashPin(pin)
    await setSetting('admin_pin_hash', hash)
    setHasPin(true)
    setIsAdmin(true)
  }

  async function isPinSet() {
    const hash = await getSetting('admin_pin_hash')
    return !!hash
  }

  return (
    <AuthContext.Provider value={{ isAdmin, hasPin, loading, unlockAdmin, lockAdmin, setAdminPin, isPinSet }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
