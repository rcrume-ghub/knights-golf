import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSeasonMgmt from './admin/AdminSeasonMgmt.jsx'
import AdminRoster from './admin/AdminRoster.jsx'
import AdminImport from './admin/AdminImport.jsx'
import AdminReset from './admin/AdminReset.jsx'
import EmailSettings from './admin/EmailSettings.jsx'
import Users from './admin/Users.jsx'
import { useAuth, loadAccounts } from '../hooks/useAuth.jsx'
import LoginModal from '../components/LoginModal.jsx'

const TABS = [
  { key: 'users', label: 'Users' },
  { key: 'seasons', label: 'Season Mgmt' },
  { key: 'roster', label: 'Roster Mgmt' },
  { key: 'import', label: 'Import' },
  { key: 'email', label: 'Email Settings' },
  { key: 'reset', label: 'Factory Reset' },
]

export default function Admin() {
  const { isCommissioner } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('users')
  const [showLogin, setShowLogin] = useState(false)

  const accounts = loadAccounts()
  const bootstrapMode = accounts.length === 0

  // Gate: must be commissioner (or no accounts configured yet)
  if (!isCommissioner && !bootstrapMode) {
    return (
      <div className="flex flex-col items-center justify-center h-64 px-6 text-center">
        <p className="text-4xl mb-4">🔒</p>
        <p className="text-sm font-semibold text-gray-800 mb-1">Commissioner Access Required</p>
        <p className="text-xs text-gray-500 mb-5">Sign in as Commissioner to access the Admin panel.</p>
        <button
          onClick={() => setShowLogin(true)}
          className="bg-green-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl"
        >
          Sign In
        </button>
        {showLogin && <LoginModal onClose={() => setShowLogin(false)} onSuccess={() => setShowLogin(false)} />}
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-full">
      <div className="bg-green-900 text-white px-4 pt-3 pb-0">
        <p className="text-xs text-green-300 uppercase tracking-widest font-semibold mb-1">Admin Tool Center</p>
        {bootstrapMode && (
          <p className="text-xs text-amber-300 mb-1">⚠ Open access mode — add a Commissioner account in Users to enable login.</p>
        )}
        <div className="flex overflow-x-auto gap-1 pb-0 -mx-1 px-1">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex-shrink-0 px-3 py-2.5 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
                tab === t.key ? 'border-white text-white' : 'border-transparent text-green-300 hover:text-white'
              }`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1">
        {tab === 'users'   && <Users />}
        {tab === 'seasons' && <AdminSeasonMgmt />}
        {tab === 'roster'  && <AdminRoster />}
        {tab === 'import'  && <AdminImport />}
        {tab === 'email'   && <EmailSettings />}
        {tab === 'reset'   && <AdminReset />}
      </div>
    </div>
  )
}
