import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth.jsx'
import * as store from './lib/store.js'
import Layout from './components/Layout.jsx'
import Setup from './pages/Setup.jsx'
import ScoreEntry from './pages/ScoreEntry.jsx'
import Standings from './pages/Standings.jsx'
import Schedule from './pages/Schedule.jsx'
import Handicaps from './pages/Handicaps.jsx'
import More from './pages/More.jsx'
import Seasons from './pages/Seasons.jsx'
import Dues from './pages/admin/Dues.jsx'
import SubList from './pages/admin/SubList.jsx'
import HandicapCalc from './pages/admin/HandicapCalc.jsx'
import Teams from './pages/admin/Teams.jsx'
import ScheduleSetup from './pages/admin/ScheduleSetup.jsx'

function AppShell() {
  const [ready, setReady] = useState(false)
  const [hasSeason, setHasSeason] = useState(false)

  useEffect(() => {
    store.seasons.getAll().then(all => {
      setHasSeason(all.length > 0)
      setReady(true)
    })
  }, [])

  if (!ready) return (
    <div className="min-h-screen bg-green-800 flex items-center justify-center">
      <div className="text-5xl animate-bounce">⛳</div>
    </div>
  )

  if (!hasSeason) return <Setup onComplete={() => setHasSeason(true)} />

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ScoreEntry />} />
        <Route path="/standings" element={<Standings />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/handicaps" element={<Handicaps />} />
        <Route path="/more" element={<More />} />
        <Route path="/seasons" element={<Seasons />} />
        <Route path="/admin/dues" element={<Dues />} />
        <Route path="/admin/subs" element={<SubList />} />
        <Route path="/admin/handicap-calc" element={<HandicapCalc />} />
        <Route path="/admin/teams" element={<Teams />} />
        <Route path="/admin/schedule-setup" element={<ScheduleSetup />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </BrowserRouter>
  )
}
