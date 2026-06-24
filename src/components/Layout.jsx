import { NavLink, useNavigate } from 'react-router-dom'
import { useActiveSeason } from '../App.jsx'

export default function Layout({ children }) {
  const activeSeasonId = useActiveSeason()
  const navigate = useNavigate()

  function goScores() {
    if (activeSeasonId) navigate(`/season/${activeSeasonId}/scores`)
    else navigate('/')
  }
  function goStats() {
    if (activeSeasonId) navigate(`/season/${activeSeasonId}/stats`)
    else navigate('/')
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-green-800 text-white px-4 py-3 safe-top">
        <h1 className="text-lg font-bold leading-tight">Knight's Golf</h1>
        <p className="text-green-200 text-xs">Monday Night League</p>
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
          <button onClick={goScores} className={navCls(false)}>
            <ScoreIcon className="w-6 h-6 mb-0.5" />
            Scores
          </button>
          <button onClick={goStats} className={navCls(false)}>
            <TrophyIcon className="w-6 h-6 mb-0.5" />
            Stats
          </button>
          <NavLink to="/more" className={({ isActive }) => navCls(isActive)}>
            <MoreIcon className="w-6 h-6 mb-0.5" />
            More
          </NavLink>
        </div>
      </nav>
    </div>
  )
}

const navCls = (isActive) =>
  `flex-1 flex flex-col items-center py-2 text-xs font-medium transition-colors ${isActive ? 'text-green-700' : 'text-gray-500'}`

function HomeIcon({ className }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
}
function ScoreIcon({ className }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
}
function TrophyIcon({ className }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
}
function MoreIcon({ className }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
}
