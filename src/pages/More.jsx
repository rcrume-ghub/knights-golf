import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import AdminUnlock from './Login.jsx'

export default function More() {
  const { isAdmin, lockAdmin, hasPin } = useAuth()
  const [showUnlock, setShowUnlock] = useState(false)

  return (
    <div className="px-4 py-4 max-w-2xl mx-auto space-y-4">
      <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-900">Commissioner Mode</p>
          <p className="text-xs text-gray-400 mt-0.5">{isAdmin ? 'Unlocked — admin features visible below' : 'Locked — tap to unlock'}</p>
        </div>
        {isAdmin ? (
          <button onClick={lockAdmin} className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg font-medium">Lock</button>
        ) : (
          <button onClick={() => setShowUnlock(true)} className="text-xs bg-green-700 text-white px-3 py-1.5 rounded-lg font-medium">
            {hasPin ? 'Unlock' : 'Set PIN'}
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-2 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">League</p>
        </div>
        <MenuLink to="/handicaps" label="Handicaps" icon="📊" />
        <MenuLink to="/standings" label="Standings" icon="🏆" />
        <MenuLink to="/schedule" label="Schedule" icon="📅" />
        <MenuLink to="/seasons" label="Seasons" icon="🗂️" />
      </div>

      {isAdmin && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Commissioner</p>
          </div>
          <MenuLink to="/admin/teams" label="Teams & Players" icon="👥" />
          <MenuLink to="/admin/schedule-setup" label="Schedule Setup" icon="🗓️" />
          <MenuLink to="/admin/dues" label="Dues Tracker" icon="💵" />
          <MenuLink to="/admin/subs" label="Sub List" icon="🔄" />
          <MenuLink to="/admin/handicap-calc" label="Recalculate Handicaps" icon="📐" />
        </div>
      )}

      <p className="text-center text-xs text-gray-400 pb-2">Knight's AC Men's Golf League · The Crossings G.C.</p>

      {showUnlock && <AdminUnlock onClose={() => setShowUnlock(false)} />}
    </div>
  )
}

function MenuLink({ to, label, icon }) {
  return (
    <Link to={to} className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium text-gray-800 flex-1">{label}</span>
      <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  )
}
