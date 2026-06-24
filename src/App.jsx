import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { createContext, useContext } from 'react'
import { AuthProvider } from './hooks/useAuth.jsx'
import * as store from './lib/store.js'
import Layout from './components/Layout.jsx'
import Setup from './pages/Setup.jsx'
import Home from './pages/Home.jsx'
import More from './pages/More.jsx'
import Seasons from './pages/Seasons.jsx'
import Handicaps from './pages/Handicaps.jsx'
import Schedule from './pages/Schedule.jsx'
import HandicapCalc from './pages/admin/HandicapCalc.jsx'
import Import from './pages/admin/Import.jsx'
import SubList from './pages/admin/SubList.jsx'
import Season from './pages/Season.jsx'
import Overview from './pages/season/Overview.jsx'
import SeasonRoster from './pages/season/SeasonRoster.jsx'
import SeasonSchedule from './pages/season/SeasonSchedule.jsx'
import SeasonScores from './pages/season/SeasonScores.jsx'
import SeasonStats from './pages/season/SeasonStats.jsx'
import SeasonDues from './pages/season/SeasonDues.jsx'
import Settings from './pages/season/Settings.jsx'
import NewSeasonWizard from './pages/NewSeasonWizard.jsx'

export const ActiveSeasonContext = createContext(null)
export function useActiveSeason() { return useContext(ActiveSeasonContext) }

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
    <ActiveSeasonContext.Provider value={activeSeasonId}>
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
            <Route path="settings" element={<Settings onSeasonChange={setActiveSeasonId} />} />
          </Route>
          <Route path="/new-season" element={<NewSeasonWizard onComplete={(id) => { setActiveSeasonId(id); setHasSeason(true) }} />} />
          <Route path="/more" element={<More />} />
          <Route path="/seasons" element={<Seasons />} />
          <Route path="/handicaps" element={<Handicaps />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/admin/handicap-calc" element={<HandicapCalc />} />
          <Route path="/admin/import" element={<Import />} />
          <Route path="/admin/subs" element={<SubList />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </ActiveSeasonContext.Provider>
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
