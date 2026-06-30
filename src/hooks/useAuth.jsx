import { createContext, useContext, useState, useEffect } from 'react'

const ACCOUNTS_KEY = 'knights_auth_accounts'
const SESSION_KEY  = 'knights_auth_session'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [showDecimals, setShowDecimals] = useState(false)

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem(SESSION_KEY))
      if (s?.role) setSession(s)
    } catch {}
  }, [])

  function login(name, pin) {
    const accounts = loadAccounts()
    const match = accounts.find(a => a.name.toLowerCase() === name.toLowerCase() && a.pin === String(pin))
    if (!match) return false
    const s = { name: match.name, role: match.role }
    localStorage.setItem(SESSION_KEY, JSON.stringify(s))
    setSession(s)
    return true
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY)
    setSession(null)
    setShowDecimals(false)
  }

  const isCommissioner = session?.role === 'commissioner'
  const isAdmin = session?.role === 'commissioner' || session?.role === 'admin'

  return (
    <AuthContext.Provider value={{ session, login, logout, isCommissioner, isAdmin, showDecimals, setShowDecimals }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() { return useContext(AuthContext) }

export function loadAccounts() {
  try { return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '[]') } catch { return [] }
}

export function saveAccounts(accounts) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
}
