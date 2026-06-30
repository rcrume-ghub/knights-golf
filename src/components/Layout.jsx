import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { APP_VERSION } from '../version.js'
import { useAuth } from '../hooks/useAuth.jsx'
import LoginModal from './LoginModal.jsx'

export default function Layout({ children }) {
  const { session, logout, isCommissioner } = useAuth()
  const [showLogin, setShowLogin] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-green-800 text-white px-4 py-3 safe-top">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold leading-tight">Knight's Golf</h1>
            <p className="text-green-200 text-xs">Monday Night League</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-green-400 text-xs font-mono">{APP_VERSION}</span>
            {session ? (
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-xs font-semibold text-white leading-tight">{session.name}</p>
                  <p className="text-xs text-green-300 leading-tight capitalize">{session.role}</p>
                </div>
                <button
                  onClick={logout}
                  className="text-xs bg-green-700 hover:bg-green-600 text-green-100 px-2 py-1 rounded-lg font-medium"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="text-xs bg-green-700 hover:bg-green-600 text-green-100 px-3 py-1.5 rounded-lg font-semibold"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-bottom z-50">
        <div className="flex">
          <NavLink to="/" end className={({ isActive }) => navCls(isActive)}>
            <HomeIcon className="w-6 h-6 mb-0.5" />
            Home
          </NavLink>
          <AdminNavButton isCommissioner={isCommissioner} onNeedLogin={() => setShowLogin(true)} navigate={navigate} />
        </div>
      </nav>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  )
}

function AdminNavButton({ isCommissioner, onNeedLogin, navigate }) {
  const { session } = useAuth()
  const accounts = (() => { try { return JSON.parse(localStorage.getItem('knights_auth_accounts') || '[]') } catch { return [] } })()
  const bootstrapMode = accounts.length === 0

  function handleClick() {
    if (bootstrapMode || isCommissioner) navigate('/admin')
    else onNeedLogin()
  }

  return (
    <button onClick={handleClick} className={`flex-1 flex flex-col items-center py-2 text-xs font-medium transition-colors ${isCommissioner || bootstrapMode ? 'text-gray-500' : 'text-gray-300'}`}>
      <AdminIcon className="w-6 h-6 mb-0.5" />
      Admin{!isCommissioner && !bootstrapMode ? ' 🔒' : ''}
    </button>
  )
}

const navCls = (isActive) =>
  `flex-1 flex flex-col items-center py-2 text-xs font-medium transition-colors ${isActive ? 'text-green-700' : 'text-gray-500'}`

function HomeIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )
}
function AdminIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}
