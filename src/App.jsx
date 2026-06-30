import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import * as store from './lib/store.js'
import { AuthProvider } from './hooks/useAuth.jsx'
import Layout from './components/Layout.jsx'
import Setup from './pages/Setup.jsx'
import Home from './pages/Home.jsx'
import Admin from './pages/Admin.jsx'
import Season from './pages/Season.jsx'
import Overview from './pages/season/Overview.jsx'
import SeasonRoster from './pages/season/SeasonRoster.jsx'
import SeasonSchedule from './pages/season/SeasonSchedule.jsx'
import SeasonScores from './pages/season/SeasonScores.jsx'
import SeasonStats from './pages/season/SeasonStats.jsx'
import SeasonDues from './pages/season/SeasonDues.jsx'
import SeasonSubs from './pages/season/SeasonSubs.jsx'
import SeasonEmail from './pages/season/SeasonEmail.jsx'
import SeasonLeagueRules from './pages/season/SeasonLeagueRules.jsx'
import Settings from './pages/season/Settings.jsx'
import NewSeasonWizard from './pages/NewSeasonWizard.jsx'

function AppShell() {
  const [ready, setReady] = useState(false)
  const [hasSeason, setHasSeason] = useState(false)
  const [activeSeasonId, setActiveSeasonId] = useState(null)

  useEffect(() => {
    store.seasons.getAll().then(all => {
      setHasSeason(all.length > 0)
      const active = all.find(s => s.is_active)
      setActiveSeasonId(active?.id ?? null)
      setReady(true)
    })
  }, [])

  if (!ready) return (
    <div className="min-h-screen bg-green-800 flex items-center justify-center">
      <div className="text-5xl animate-bounce">⛳</div>
    </div>
  )

  if (!hasSeason) return <Setup onComplete={() => { setHasSeason(true); window.location.reload() }} />

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home onSeasonChange={setActiveSeasonId} />} />
        <Route path="/season/:seasonId" element={<Season />}>
          <Route index element={<Overview />} />
          <Route path="roster" element={<SeasonRoster />} />
          <Route path="schedule" element={<SeasonSchedule />} />
          <Route path="scores" element={<SeasonScores />} />
          <Route path="stats" element={<SeasonStats />} />
          <Route path="dues" element={<SeasonDues />} />
          <Route path="subs" element={<SeasonSubs />} />
          <Route path="email" element={<SeasonEmail />} />
          <Route path="league-rules" element={<SeasonLeagueRules />} />
          <Route path="settings" element={<Settings onSeasonChange={setActiveSeasonId} />} />
        </Route>
        <Route path="/new-season" element={<NewSeasonWizard onComplete={(id) => { setActiveSeasonId(id); setHasSeason(true) }} />} />
        <Route path="/admin" element={<Admin />} />
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
