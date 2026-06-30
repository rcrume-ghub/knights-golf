import { useState } from 'react'
import AdminSeasonMgmt from './admin/AdminSeasonMgmt.jsx'
import AdminRoster from './admin/AdminRoster.jsx'
import AdminImport from './admin/AdminImport.jsx'
import AdminReset from './admin/AdminReset.jsx'
import EmailSettings from './admin/EmailSettings.jsx'

const TABS = [
  { key: 'seasons', label: 'Season Mgmt' },
  { key: 'roster', label: 'Roster Mgmt' },
  { key: 'import', label: 'Import' },
  { key: 'email', label: 'Email Settings' },
  { key: 'reset', label: 'Factory Reset' },
]

export default function Admin() {
  const [tab, setTab] = useState('seasons')

  return (
    <div className="flex flex-col min-h-full">
      <div className="bg-green-900 text-white px-4 pt-3 pb-0">
        <p className="text-xs text-green-300 uppercase tracking-widest font-semibold mb-1">Admin Tool Center</p>
        <div className="flex overflow-x-auto gap-1 pb-0 -mx-1 px-1">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex-shrink-0 px-3 py-2.5 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
                tab === t.key
                  ? 'border-white text-white'
                  : 'border-transparent text-green-300 hover:text-white'
              }`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1">
        {tab === 'seasons' && <AdminSeasonMgmt />}
        {tab === 'roster' && <AdminRoster />}
        {tab === 'import' && <AdminImport />}
        {tab === 'email' && <EmailSettings />}
        {tab === 'reset' && <AdminReset />}
      </div>
    </div>
  )
}
