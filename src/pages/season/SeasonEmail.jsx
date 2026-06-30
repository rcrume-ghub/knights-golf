import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSeason } from '../Season.jsx'
import * as store from '../../lib/store.js'
import { netScore, calcMatchPoints, getNine } from '../../lib/handicap.js'
import { loadEmailConfig } from '../admin/EmailSettings.jsx'

const GC_INFO = `CROSSINGS G.C.
PHONE # (502) 957-6523
205 LETTS RD
BROOKS, KY 40109`

const RAINOUT_RULES = [
  'If the golf course closes because of rain, the golf round for that night is scratched from the schedule.',
  'The League Commissioner can cancel a night of golf prior to playing per weather conditions. He will call the Golf Course and inform them of the decision. It will be up to each golfer to call the course to see if we are playing.',
  'If we are at the Golf Course and it starts raining and lightning, majority vote will determine if we continue play or quit play.',
  'We will not make-up rainout games unless it is the final position night when the League Champion is in question. If that is the case the league will be pushed back (1) week to determine the League Champion.',
]

export default function SeasonEmail() {
  const { seasonId } = useParams()
  const { season } = useSeason()
  const navigate = useNavigate()

  const [weeks, setWeeks] = useState([])
  const [selectedWeekId, setSelectedWeekId] = useState(null)
  const [matchups, setMatchups] = useState([])
  const [recipients, setRecipients] = useState([]) // { name, email, teamNumber }
  const [noEmail, setNoEmail] = useState([])       // players missing email
  const [standings, setStandings] = useState([])
  const [lowestHcp, setLowestHcp] = useState([])
  const [lowestGross, setLowestGross] = useState([])
  const [lowestNet, setLowestNet] = useState([])
  const [lastWeekResults, setLastWeekResults] = useState(null)
  const [allWeeksData, setAllWeeksData] = useState([])      // full schedule for email
  const [allMatchupsData, setAllMatchupsData] = useState([]) // all matchups for email
  const [allTeamsData, setAllTeamsData] = useState([])
  const [commishEmail, setCommishEmail] = useState('')
  const [commishName, setCommishName] = useState('')
  const [defaultAccount, setDefaultAccount] = useState(null)
  const [sending, setSending] = useState(false)
  const [sendResult, setSendResult] = useState(null) // { ok, message }
  const [showPreview, setShowPreview] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [emailLog, setEmailLog] = useState([]) // [{ weekId, sentAt, count, subject }]
  const [loading, setLoading] = useState(true)

  function logKey() { return `email_log_${seasonId}` }
  function loadLog() {
    try { setEmailLog(JSON.parse(localStorage.getItem(logKey()) || '[]')) } catch { setEmailLog([]) }
  }
  function appendLog(entry) {
    const updated = [entry, ...JSON.parse(localStorage.getItem(logKey()) || '[]')].slice(0, 50)
    localStorage.setItem(logKey(), JSON.stringify(updated))
    setEmailLog(updated)
  }

  useEffect(() => { loadSettings() }, [])
  useEffect(() => { if (seasonId) { loadData(); loadLog() } }, [seasonId])
  useEffect(() => { if (selectedWeekId) loadMatchups(selectedWeekId) }, [selectedWeekId])

  async function loadSettings() {
    const config = await loadEmailConfig()
    setCommishName(config.name)
    setCommishEmail(config.replyEmail)
    setDefaultAccount(config.defaultAccount)
  }

  async function loadData() {
    const [allWeeks, allTeams, allTp, allPlayers, allHcps, allMatchupsAll, allScores] = await Promise.all([
      store.weeks.getBySeason(seasonId),
      store.teams.getBySeason(seasonId),
      store.teamPlayers.getAll(),
      store.players.getAll(),
      store.handicaps.getAll(),
      store.matchups.getAll(),
      store.scores.getAll(),
    ])

    const playerById = Object.fromEntries(allPlayers.map(p => [p.id, p]))
    const hcpMap = {}
    for (const h of allHcps) {
      if (!hcpMap[h.player_id] || new Date(h.calculated_at) > new Date(hcpMap[h.player_id].calculated_at))
        hcpMap[h.player_id] = h
    }

    // Team rosters
    const teamRoster = {}
    for (const t of allTeams) {
      const pids = allTp.filter(tp => tp.team_id === t.id).map(tp => tp.player_id)
      teamRoster[t.id] = pids.map(pid => {
        const p = playerById[pid]
        return p ? { ...p, hcp: hcpMap[pid]?.value ?? 99 } : null
      }).filter(Boolean).sort((a, b) => a.hcp - b.hcp)
    }

    // Recipients
    const withEmail = [], withoutEmail = []
    for (const t of allTeams) {
      for (const p of (teamRoster[t.id] || [])) {
        const entry = { name: `${p.first_name} ${p.last_name}`.trim(), email: p.email?.trim(), teamNumber: t.number }
        if (entry.email) withEmail.push(entry)
        else withoutEmail.push(entry)
      }
    }
    setRecipients(withEmail)
    setNoEmail(withoutEmail)

    // Standings
    const today = new Date()
    const scoringWeeks = allWeeks.filter(w => w.week_type !== 'bye' && w.week_type !== 'scramble' && w.week_type !== 'end_scramble' && w.date && new Date(w.date + 'T23:59:59') <= today)
    const weekById = Object.fromEntries(allWeeks.map(w => [w.id, w]))
    const playedMatchups = allMatchupsAll.filter(m => scoringWeeks.some(w => w.id === m.week_id))
    const scoreMap = {}
    for (const s of allScores) scoreMap[`${s.matchup_id}_${s.player_id}`] = s

    const teamPoints = {}
    for (const t of allTeams) teamPoints[t.id] = 0
    for (const m of playedMatchups) {
      const wk = weekById[m.week_id]
      const nine = getNine(wk?.date, season.start_date)
      const blindScore = nine === 'Back 9' ? (season.blind_score ?? 39) + 1 : (season.blind_score ?? 39)
      const getScore = (tid, idx) => { const p = (teamRoster[tid] || [])[idx]; return p ? scoreMap[`${m.id}_${p.id}`] ?? null : null }
      const getNet = (tid, idx) => { const sc = getScore(tid, idx); if (!sc) return null; if (sc.is_blind) return blindScore; const p = (teamRoster[tid] || [])[idx]; return sc.gross != null ? netScore(sc.gross, p?.hcp ?? 0) : null }
      const homeHasBozo = [0,1].some(i => getScore(m.home_team_id, i)?.is_blind)
      const awayHasBozo = [0,1].some(i => getScore(m.away_team_id, i)?.is_blind)
      const { homePoints, awayPoints } = calcMatchPoints({ homeANet: getNet(m.home_team_id,0), awayANet: getNet(m.away_team_id,0), homeBNet: getNet(m.home_team_id,1), awayBNet: getNet(m.away_team_id,1), homeHasBozo, awayHasBozo })
      teamPoints[m.home_team_id] = (teamPoints[m.home_team_id] || 0) + homePoints
      teamPoints[m.away_team_id] = (teamPoints[m.away_team_id] || 0) + awayPoints
    }

    const sorted = allTeams.map(t => ({
      number: t.number, name: t.name,
      points: teamPoints[t.id] || 0,
      roster: (teamRoster[t.id] || []).slice(0,2).map(p => `${p.first_name} ${p.last_name}`.trim()),
    })).sort((a, b) => b.points - a.points)
    setStandings(sorted)

    // Player stat helpers
    const seasonMatchupIds = new Set(allMatchupsAll.map(m => m.id))
    const teamByPlayerId = {}
    for (const t of allTeams) {
      for (const p of (teamRoster[t.id] || [])) teamByPlayerId[p.id] = { teamNumber: t.number, slot: ['A','B'][(teamRoster[t.id] || []).indexOf(p)] }
    }

    // Top 3 Lowest HCP
    const seasonPlayerIds = new Set(allTeams.flatMap(t => (teamRoster[t.id] || []).map(p => p.id)))
    const lhcp = [...seasonPlayerIds].map(pid => {
      const p = playerById[pid]; const hcp = hcpMap[pid]?.value
      if (!p || hcp == null) return null
      return { name: `${p.first_name} ${p.last_name}`.trim(), hcp, ...teamByPlayerId[pid] }
    }).filter(Boolean).sort((a,b) => a.hcp - b.hcp).slice(0,3)
    setLowestHcp(lhcp)

    // Top 3 Lowest Gross + Net
    const bestGross = {}, bestNet = {}
    for (const s of allScores) {
      if (!s.is_blind && s.gross != null && seasonMatchupIds.has(s.matchup_id)) {
        if (!bestGross[s.player_id] || s.gross < bestGross[s.player_id]) bestGross[s.player_id] = s.gross
        const hcp = hcpMap[s.player_id]?.value
        if (hcp != null) {
          const net = s.gross - Math.round(hcp)
          if (!bestNet[s.player_id] || net < bestNet[s.player_id].net) bestNet[s.player_id] = { net, gross: s.gross }
        }
      }
    }
    const lgross = Object.entries(bestGross).map(([pid, gross]) => {
      const p = playerById[pid]; if (!p) return null
      return { name: `${p.first_name} ${p.last_name}`.trim(), gross, hcp: hcpMap[pid]?.value, ...teamByPlayerId[pid] }
    }).filter(Boolean).sort((a,b) => a.gross - b.gross).slice(0,3)
    setLowestGross(lgross)

    const lnet = Object.entries(bestNet).map(([pid, data]) => {
      const p = playerById[pid]; if (!p) return null
      return { name: `${p.first_name} ${p.last_name}`.trim(), net: data.net, gross: data.gross, hcp: hcpMap[pid]?.value, ...teamByPlayerId[pid] }
    }).filter(Boolean).sort((a,b) => a.net - b.net).slice(0,3)
    setLowestNet(lnet)

    // Last week's results
    const scoringPlayed = allWeeks
      .filter(w => w.week_type !== 'bye' && w.week_type !== 'scramble' && w.week_type !== 'end_scramble' && w.date && new Date(w.date + 'T23:59:59') <= today)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
    const lastWeek = scoringPlayed[0] || null
    if (lastWeek) {
      const lastMatchups = allMatchupsAll.filter(m => m.week_id === lastWeek.id)
      const lwnine = getNine(lastWeek.date, season.start_date)
      const lwBlind = lwnine === 'Back 9' ? (season.blind_score ?? 39) + 1 : (season.blind_score ?? 39)
      const teamById = Object.fromEntries(allTeams.map(t => [t.id, t]))
      const getScoreLW = (tid, idx, mid) => { const p = (teamRoster[tid]||[])[idx]; return p ? (scoreMap[`${mid}_${p.id}`]??null) : null }
      const getNetLW = (tid, idx, mid) => { const sc = getScoreLW(tid,idx,mid); if (!sc) return null; if (sc.is_blind) return lwBlind; const p = (teamRoster[tid]||[])[idx]; return sc.gross!=null ? netScore(sc.gross, p?.hcp??0) : null }
      setLastWeekResults({
        week: lastWeek,
        matchups: lastMatchups.map(m => {
          const homeHasBozo = [0,1].some(i => getScoreLW(m.home_team_id,i,m.id)?.is_blind)
          const awayHasBozo = [0,1].some(i => getScoreLW(m.away_team_id,i,m.id)?.is_blind)
          const { homePoints, awayPoints } = calcMatchPoints({ homeANet: getNetLW(m.home_team_id,0,m.id), awayANet: getNetLW(m.away_team_id,0,m.id), homeBNet: getNetLW(m.home_team_id,1,m.id), awayBNet: getNetLW(m.away_team_id,1,m.id), homeHasBozo, awayHasBozo })
          const mapP = (tid) => (teamRoster[tid]||[]).slice(0,2).map((p,i) => { const sc = getScoreLW(tid,i,m.id); return { name:`${p.first_name} ${p.last_name}`.trim(), slot:p.slot, gross:sc?.gross??null, isBlind:sc?.is_blind??false, net:getNetLW(tid,i,m.id) } })
          return { id:m.id, homeTeam:teamById[m.home_team_id], awayTeam:teamById[m.away_team_id], homePlayers:mapP(m.home_team_id), awayPlayers:mapP(m.away_team_id), homePoints, awayPoints }
        }),
      })
    } else {
      setLastWeekResults(null)
    }

    const sorted2 = [...allWeeks].sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0))
    setWeeks(sorted2)
    setAllWeeksData(sorted2)
    setAllMatchupsData(allMatchupsAll)
    setAllTeamsData(allTeams)
    const upcoming = sorted2.find(w => w.date && new Date(w.date + 'T23:59:00') >= today && w.week_type !== 'bye')
    setSelectedWeekId(upcoming?.id ?? sorted2[0]?.id ?? null)
    setLoading(false)
  }

  async function loadMatchups(weekId) {
    const [ms, allTeams, allTp, allPlayers, allHcps] = await Promise.all([
      store.matchups.getByWeek(weekId),
      store.teams.getBySeason(seasonId),
      store.teamPlayers.getAll(),
      store.players.getAll(),
      store.handicaps.getAll(),
    ])
    const playerById = Object.fromEntries(allPlayers.map(p => [p.id, p]))
    const hcpMap = {}
    for (const h of allHcps) {
      if (!hcpMap[h.player_id] || new Date(h.calculated_at) > new Date(hcpMap[h.player_id].calculated_at))
        hcpMap[h.player_id] = h
    }
    const teamById = Object.fromEntries(allTeams.map(t => [t.id, t]))
    const teamRoster = {}
    for (const t of allTeams) {
      const pids = allTp.filter(tp => tp.team_id === t.id).map(tp => tp.player_id)
      teamRoster[t.id] = pids.map(pid => { const p = playerById[pid]; return p ? { ...p, hcp: hcpMap[pid]?.value ?? 99 } : null }).filter(Boolean).sort((a,b) => a.hcp - b.hcp)
    }
    setMatchups(ms.map(m => ({ ...m, homeTeam: teamById[m.home_team_id], awayTeam: teamById[m.away_team_id], homePlayers: (teamRoster[m.home_team_id] || []).slice(0,2), awayPlayers: (teamRoster[m.away_team_id] || []).slice(0,2) })))
  }

  const selectedWeek = weeks.find(w => w.id === selectedWeekId)
  const nine = selectedWeek?.date ? getNine(selectedWeek.date, season.start_date) : null
  const blindScore = nine === 'Back 9' ? (season.blind_score ?? 39) + 1 : (season.blind_score ?? 39)

  function buildEmailHtml() {
    const weekLabel = selectedWeek ? `Week ${selectedWeek.number}` : ''
    const dateLabel = selectedWeek?.date ? fmtDateFull(selectedWeek.date) : ''
    const nineLabel = nine || ''
    const maxPts = 24 - (standings[0]?.points ?? 0) < 0 ? 0 : null

    const matchupRows = matchups.map(m => {
      const hPlayers = m.homePlayers || []
      const aPlayers = m.awayPlayers || []
      const slots = ['A', 'B']
      const playerRows = slots.map((slot, i) => {
        const h = hPlayers[i]
        const a = aPlayers[i]
        return `
        <tr>
          <td style="padding:6px 10px;font-size:13px;color:#374151;">
            <span style="font-weight:600;color:#6b7280;font-size:11px;">(${slot})</span> ${h ? `${h.first_name} ${h.last_name} <span style="color:#059669;font-weight:700;">[${h.hcp === 99 ? '?' : h.hcp}]</span>` : '—'}
          </td>
          <td style="padding:6px 10px;font-size:13px;color:#374151;text-align:right;">
            ${a ? `${a.first_name} ${a.last_name} <span style="color:#059669;font-weight:700;">[${a.hcp === 99 ? '?' : a.hcp}]</span>` : '—'} <span style="font-weight:600;color:#6b7280;font-size:11px;">(${slot})</span>
          </td>
        </tr>`
      }).join('')

      return `
      <div style="margin-bottom:16px;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;">
        <div style="background:#166534;color:#fff;padding:8px 14px;font-size:13px;font-weight:700;display:flex;justify-content:space-between;">
          <span>🏌️ Match — Hole ${m.hole_assignment || '?'}</span>
        </div>
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          <tr style="background:#f0fdf4;">
            <th style="padding:6px 10px;font-size:12px;color:#166534;text-align:left;font-weight:700;">
              Team ${m.homeTeam?.number || '?'}${m.homeTeam?.name ? ` — ${m.homeTeam.name}` : ''} (Home)
            </th>
            <th style="padding:6px 10px;font-size:12px;color:#166534;text-align:right;font-weight:700;">
              Team ${m.awayTeam?.number || '?'}${m.awayTeam?.name ? ` — ${m.awayTeam.name}` : ''} (Away)
            </th>
          </tr>
          ${playerRows}
        </table>
      </div>`
    }).join('')

    const standingsRows = standings.slice(0, 10).map((t, i) => `
      <tr style="background:${i % 2 === 0 ? '#f9fafb' : '#fff'};">
        <td style="padding:6px 12px;font-size:13px;font-weight:700;color:#374151;">${i + 1}.</td>
        <td style="padding:6px 12px;font-size:13px;color:#374151;">Team ${t.number}${t.name ? ` — ${t.name}` : ''}</td>
        <td style="padding:6px 12px;font-size:13px;color:#6b7280;">${t.roster.join(' & ')}</td>
        <td style="padding:6px 12px;font-size:13px;font-weight:700;color:#166534;text-align:right;">${t.points % 1 === 0 ? t.points : t.points.toFixed(1)} pts</td>
      </tr>`).join('')

    return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background:#fff;">

    <!-- Header -->
    <div style="background:#166534;padding:28px 24px;text-align:center;">
      <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">⛳ Knight's Golf League</h1>
      <p style="margin:8px 0 0;color:#bbf7d0;font-size:15px;">${weekLabel} · ${dateLabel}</p>
      <div style="display:inline-block;margin-top:10px;background:${nine === 'Back 9' ? '#1d4ed8' : '#15803d'};color:#fff;padding:4px 14px;border-radius:20px;font-size:12px;font-weight:700;">${nineLabel}</div>
    </div>

    <div style="padding:24px;">

      <!-- Matchups -->
      <h2 style="margin:0 0 14px;font-size:16px;color:#111827;border-bottom:2px solid #166534;padding-bottom:6px;">📋 Week ${selectedWeek?.number || ''} Matchups</h2>
      ${matchupRows || '<p style="color:#6b7280;">No matchups scheduled.</p>'}

      <!-- GC Info -->
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:16px;margin:24px 0 16px;">
        <h3 style="margin:0 0 8px;font-size:14px;color:#166534;font-weight:700;">📍 Course Information</h3>
        <p style="margin:0;font-size:13px;color:#374151;font-weight:700;">CROSSINGS G.C.</p>
        <p style="margin:2px 0;font-size:13px;color:#374151;">📞 (502) 957-6523</p>
        <p style="margin:2px 0;font-size:13px;color:#374151;">205 Letts Rd, Brooks, KY 40109</p>
        <p style="margin:10px 0 0;font-size:13px;color:#374151;font-weight:600;">Rain Out: Call The Crossings GC at 502-957-6523</p>
      </div>

      <!-- Rain Out Rules -->
      <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:16px;margin-bottom:24px;">
        <h3 style="margin:0 0 10px;font-size:14px;color:#92400e;font-weight:700;">🌧 Rain Out Rules</h3>
        ${RAINOUT_RULES.map((r, i) => `<p style="margin:0 0 8px;font-size:13px;color:#374151;"><strong>${String.fromCharCode(97+i)}.</strong> ${r}</p>`).join('')}
      </div>

      <!-- Standings -->
      <h2 style="margin:0 0 12px;font-size:16px;color:#111827;border-bottom:2px solid #166534;padding-bottom:6px;">🏆 Season Standings</h2>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;font-size:13px;margin-bottom:24px;">
        <thead>
          <tr style="background:#166534;color:#fff;">
            <th style="padding:8px 12px;text-align:left;">#</th>
            <th style="padding:8px 12px;text-align:left;">Team</th>
            <th style="padding:8px 12px;text-align:left;">Players</th>
            <th style="padding:8px 12px;text-align:right;">Points</th>
          </tr>
        </thead>
        <tbody>${standingsRows}</tbody>
      </table>

      <!-- Lowest HCP -->
      <h2 style="margin:0 0 12px;font-size:16px;color:#111827;border-bottom:2px solid #166534;padding-bottom:6px;">🎯 Top 3 Lowest Handicap</h2>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;font-size:13px;margin-bottom:24px;">
        <thead><tr style="background:#166534;color:#fff;">
          <th style="padding:8px 12px;text-align:left;">#</th>
          <th style="padding:8px 12px;text-align:left;">Player</th>
          <th style="padding:8px 12px;text-align:left;">Team</th>
          <th style="padding:8px 12px;text-align:right;">HCP</th>
        </tr></thead>
        <tbody>${lowestHcp.map((r,i) => `<tr style="background:${i%2===0?'#f9fafb':'#fff'};">
          <td style="padding:6px 12px;font-weight:700;color:#374151;">${i+1}.</td>
          <td style="padding:6px 12px;color:#374151;">${r.slot ? `(${r.slot}) ` : ''}${r.name}</td>
          <td style="padding:6px 12px;color:#6b7280;">Team ${r.teamNumber}</td>
          <td style="padding:6px 12px;font-weight:700;color:#1d4ed8;text-align:right;">${r.hcp}</td>
        </tr>`).join('')}</tbody>
      </table>

      <!-- Lowest Gross -->
      <h2 style="margin:0 0 12px;font-size:16px;color:#111827;border-bottom:2px solid #166534;padding-bottom:6px;">📊 Top 3 Lowest Score (w/o Handicap)</h2>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;font-size:13px;margin-bottom:24px;">
        <thead><tr style="background:#166534;color:#fff;">
          <th style="padding:8px 12px;text-align:left;">#</th>
          <th style="padding:8px 12px;text-align:left;">Player</th>
          <th style="padding:8px 12px;text-align:left;">Team</th>
          <th style="padding:8px 12px;text-align:right;">Gross</th>
        </tr></thead>
        <tbody>${lowestGross.map((r,i) => `<tr style="background:${i%2===0?'#f9fafb':'#fff'};">
          <td style="padding:6px 12px;font-weight:700;color:#374151;">${i+1}.</td>
          <td style="padding:6px 12px;color:#374151;">${r.slot ? `(${r.slot}) ` : ''}${r.name}${r.hcp != null ? ` [${r.hcp}]` : ''}</td>
          <td style="padding:6px 12px;color:#6b7280;">Team ${r.teamNumber}</td>
          <td style="padding:6px 12px;font-weight:700;color:#166534;text-align:right;">${r.gross}</td>
        </tr>`).join('')}</tbody>
      </table>

      <!-- Lowest Net -->
      <h2 style="margin:0 0 12px;font-size:16px;color:#111827;border-bottom:2px solid #166534;padding-bottom:6px;">📊 Top 3 Lowest Score (w/ Handicap)</h2>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;font-size:13px;margin-bottom:24px;">
        <thead><tr style="background:#166534;color:#fff;">
          <th style="padding:8px 12px;text-align:left;">#</th>
          <th style="padding:8px 12px;text-align:left;">Player</th>
          <th style="padding:8px 12px;text-align:left;">Team</th>
          <th style="padding:8px 12px;text-align:right;">Net</th>
          <th style="padding:8px 12px;text-align:right;">Gross</th>
        </tr></thead>
        <tbody>${lowestNet.map((r,i) => `<tr style="background:${i%2===0?'#f9fafb':'#fff'};">
          <td style="padding:6px 12px;font-weight:700;color:#374151;">${i+1}.</td>
          <td style="padding:6px 12px;color:#374151;">${r.slot ? `(${r.slot}) ` : ''}${r.name}${r.hcp != null ? ` [${r.hcp}]` : ''}</td>
          <td style="padding:6px 12px;color:#6b7280;">Team ${r.teamNumber}</td>
          <td style="padding:6px 12px;font-weight:700;color:#1d4ed8;text-align:right;">${r.net}</td>
          <td style="padding:6px 12px;color:#6b7280;text-align:right;">${r.gross}</td>
        </tr>`).join('')}</tbody>
      </table>

      ${(() => {
        const teamById2 = Object.fromEntries(allTeamsData.map(t => [t.id, t]))
        const scheduleWeeks = allWeeksData.filter(w => w.week_type !== 'bye')
        if (scheduleWeeks.length === 0) return ''
        const weekRows = scheduleWeeks.map(w => {
          const wMatchups = allMatchupsData.filter(m => m.week_id === w.id)
          const typeLabel = w.week_type === 'position_night' ? 'Position Night' : w.week_type === 'scramble' ? 'Scramble' : w.week_type === 'end_scramble' ? 'End Scramble' : 'Regular'
          const matchupSummary = wMatchups.map(m => `Team ${teamById2[m.home_team_id]?.number ?? '?'} vs Team ${teamById2[m.away_team_id]?.number ?? '?'}`).join(' &nbsp;|&nbsp; ')
          return `<tr style="background:${w.id === selectedWeekId ? '#f0fdf4' : 'transparent'};">
            <td style="padding:5px 10px;font-size:12px;font-weight:700;color:${w.id === selectedWeekId ? '#166534' : '#374151'};white-space:nowrap;">Wk ${w.number}</td>
            <td style="padding:5px 10px;font-size:12px;color:#6b7280;white-space:nowrap;">${w.date || '—'}</td>
            <td style="padding:5px 10px;font-size:11px;color:#9ca3af;white-space:nowrap;">${typeLabel}</td>
            <td style="padding:5px 10px;font-size:11px;color:#6b7280;">${matchupSummary || '—'}</td>
          </tr>`
        }).join('')
        return `
        <h2 style="margin:24px 0 12px;font-size:16px;color:#111827;border-bottom:2px solid #166534;padding-bottom:6px;">📅 Full Season Schedule</h2>
        <div style="overflow-x:auto;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;font-size:12px;margin-bottom:24px;">
          <thead><tr style="background:#166534;color:#fff;">
            <th style="padding:7px 10px;text-align:left;">Wk</th>
            <th style="padding:7px 10px;text-align:left;">Date</th>
            <th style="padding:7px 10px;text-align:left;">Type</th>
            <th style="padding:7px 10px;text-align:left;">Matchups</th>
          </tr></thead>
          <tbody>${weekRows}</tbody>
        </table>
        </div>`
      })()}

      ${lastWeekResults ? `
      <!-- Last Week Results -->
      <h2 style="margin:0 0 12px;font-size:16px;color:#111827;border-bottom:2px solid #166534;padding-bottom:6px;">📋 Week ${lastWeekResults.week.number} Results · ${fmtDateFull(lastWeekResults.week.date)}</h2>
      ${lastWeekResults.matchups.map(m => `
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;font-size:13px;margin-bottom:12px;">
        <thead><tr style="background:#166534;color:#fff;">
          <th style="padding:8px 12px;text-align:left;">Team ${m.homeTeam?.number || ''} (Home)</th>
          <th style="padding:6px 12px;text-align:center;width:60px;">Score</th>
          <th style="padding:8px 12px;text-align:right;">Team ${m.awayTeam?.number || ''} (Away)</th>
        </tr></thead>
        <tbody>
          <tr style="background:#f9fafb;">
            <td style="padding:8px 12px;">
              ${m.homePlayers.map(p => `<div style="font-size:12px;color:#374151;">(${p.slot}) ${p.name}${p.isBlind ? ' 🎯 Blind' : p.gross != null ? ` — ${p.gross}` : ''}</div>`).join('')}
            </td>
            <td style="padding:8px 12px;text-align:center;vertical-align:middle;">
              <span style="font-size:20px;font-weight:900;color:${m.homePoints > m.awayPoints ? '#166534' : '#9ca3af'};">${m.homePoints % 1 === 0 ? m.homePoints : m.homePoints.toFixed(1)}</span>
              <div style="font-size:10px;color:#9ca3af;">vs</div>
              <span style="font-size:20px;font-weight:900;color:${m.awayPoints > m.homePoints ? '#166534' : '#9ca3af'};">${m.awayPoints % 1 === 0 ? m.awayPoints : m.awayPoints.toFixed(1)}</span>
            </td>
            <td style="padding:8px 12px;text-align:right;">
              ${m.awayPlayers.map(p => `<div style="font-size:12px;color:#374151;">${p.isBlind ? 'Blind 🎯 ' : p.gross != null ? `${p.gross} — ` : ''}(${p.slot}) ${p.name}</div>`).join('')}
            </td>
          </tr>
        </tbody>
      </table>`).join('')}
      ` : ''}

    </div>

    <!-- Footer -->
    <div style="background:#166534;padding:16px 24px;text-align:center;">
      <p style="margin:0;color:#bbf7d0;font-size:12px;">Knight's AC Men's Golf League · Sent by League Commissioner</p>
    </div>

  </div>
</body>
</html>`
  }

  async function callSendApi(payload) {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    if (!res.ok || !data.success) throw new Error(data.error || `HTTP ${res.status}`)
    return data
  }

  function emailPayloadBase() {
    return {
      fromEmail: commishEmail || defaultAccount?.email || '',
      fromName: commishName || 'Knights Golf League',
    }
  }

  async function handleTestSend() {
    const replyTo = commishEmail || defaultAccount?.email
    if (!replyTo) return alert('Configure your email in Settings → Email Settings first.')
    setSending(true)
    setSendResult(null)
    const weekLabel = selectedWeek ? `Week ${selectedWeek.number}` : 'Upcoming Week'
    const dateLabel = selectedWeek?.date ? fmtDateFull(selectedWeek.date) : ''
    try {
      await callSendApi({
        to: [replyTo],
        subject: `[TEST] Knight's Golf League — ${weekLabel} Matchups · ${dateLabel}`,
        html: buildEmailHtml(),
        ...emailPayloadBase(),
      })
      setSendResult({ ok: true, message: `Test email sent to ${replyTo}` })
    } catch (err) {
      setSendResult({ ok: false, message: `Test failed: ${err.message}` })
    }
    setSending(false)
  }

  async function handleSend() {
    const replyTo = commishEmail || defaultAccount?.email
    if (!replyTo) return alert('Configure your email in Settings → Email Settings first.')
    if (recipients.length === 0) return alert('No players with email addresses found.')
    setShowConfirm(false)
    setSending(true)
    setSendResult(null)
    const weekLabel = selectedWeek ? `Week ${selectedWeek.number}` : 'Upcoming Week'
    const dateLabel = selectedWeek?.date ? fmtDateFull(selectedWeek.date) : ''
    try {
      await callSendApi({
        to: [replyTo],
        bcc: recipients.map(r => r.email),
        subject: `Knight's Golf League — ${weekLabel} Matchups · ${dateLabel}`,
        html: buildEmailHtml(),
        ...emailPayloadBase(),
      })
      setSendResult({ ok: true, message: `Sent to ${recipients.length} players!` })
      appendLog({ weekId: selectedWeekId, sentAt: new Date().toISOString(), count: recipients.length, subject: `Week ${selectedWeek?.number} · ${dateLabel}` })
    } catch (err) {
      setSendResult({ ok: false, message: `Send failed: ${err.message}` })
    }
    setSending(false)
  }

  if (loading) return <div className="flex items-center justify-center h-48"><div className="text-3xl animate-pulse">📧</div></div>

  return (
    <div className="px-4 py-4 max-w-2xl mx-auto space-y-4">

      {/* Active Email Config */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Sending As</p>
            {defaultAccount ? (
              <>
                <p className="text-sm font-semibold text-gray-900">{commishName || 'Knights Golf League'}</p>
                <p className="text-xs text-gray-500 mt-0.5">{defaultAccount.label} · {defaultAccount.email}</p>
                <p className="text-xs text-gray-400 mt-0.5">Replies go to: {commishEmail || defaultAccount.email}</p>
              </>
            ) : (
              <p className="text-sm text-amber-600 font-medium">No email configured</p>
            )}
          </div>
          <a href={`/season/${seasonId}/settings`}
            className="flex-shrink-0 text-xs text-green-700 font-semibold border border-green-200 rounded-lg px-3 py-1.5 hover:bg-green-50">
            Edit in Settings
          </a>
        </div>
      </div>

      {/* Week Selector + Send */}
      <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
        <h3 className="text-sm font-semibold text-gray-800">Weekly Matchup Email</h3>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Select Week to Email</label>
          <select
            value={selectedWeekId || ''}
            onChange={e => setSelectedWeekId(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            {weeks.filter(w => w.week_type !== 'bye').map(w => (
              <option key={w.id} value={w.id}>
                Week {w.number}{w.date ? ` — ${fmtDate(w.date)}` : ''}{w.week_type !== 'regular' ? ` (${fmtType(w.week_type)})` : ''}
              </option>
            ))}
          </select>
        </div>

        {nine && (
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${nine === 'Front 9' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
            {nine} · Blind Score: {blindScore}
          </div>
        )}

        {/* Matchup preview cards */}
        {matchups.length > 0 && (
          <div className="space-y-2 pt-1">
            {matchups.map((m, idx) => (
              <div key={m.id} className="rounded-xl border border-gray-100 overflow-hidden">
                <div className="bg-green-800 text-white px-3 py-1.5 flex justify-between text-xs font-semibold">
                  <span>Match {idx + 1}</span>
                  <span>Hole {m.hole_assignment || '?'}</span>
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-100">
                  <div className="px-3 py-2" style={{ backgroundColor: '#F3E4C9' }}>
                    <p className="text-xs font-bold text-gray-700">Team {m.homeTeam?.number} (Home)</p>
                    {(m.homePlayers || []).map((p, i) => (
                      <p key={p.id} className="text-xs text-gray-600">({['A','B'][i]}) {p.first_name} {p.last_name} [{p.hcp === 99 ? '?' : p.hcp}]</p>
                    ))}
                  </div>
                  <div className="px-3 py-2" style={{ backgroundColor: '#DBCEA5' }}>
                    <p className="text-xs font-bold text-gray-700">Team {m.awayTeam?.number} (Away)</p>
                    {(m.awayPlayers || []).map((p, i) => (
                      <p key={p.id} className="text-xs text-gray-600">({['A','B'][i]}) {p.first_name} {p.last_name} [{p.hcp === 99 ? '?' : p.hcp}]</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleTestSend}
          disabled={sending || !commishEmail}
          className="w-full border border-amber-500 text-amber-700 bg-amber-50 rounded-xl py-2.5 text-sm font-semibold disabled:opacity-50 hover:bg-amber-100 transition-colors"
        >
          {sending ? 'Sending…' : `🧪 Send Test to Myself`}
        </button>
        <button
          onClick={() => setShowPreview(true)}
          disabled={sending || !commishEmail || recipients.length === 0}
          className="w-full bg-green-700 text-white rounded-xl py-3 text-sm font-bold disabled:opacity-50 hover:bg-green-800 transition-colors"
        >
          {sending ? 'Sending…' : `📧 Send to ${recipients.length} ${recipients.length === 1 ? 'Player' : 'Players'}`}
        </button>

        {sendResult && (
          <div className={`rounded-lg px-4 py-3 text-sm font-medium ${sendResult.ok ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {sendResult.ok ? '✓ ' : '✗ '}{sendResult.message}
          </div>
        )}

        {emailLog.filter(e => e.weekId === selectedWeekId).length > 0 && (
          <div className="border border-amber-200 bg-amber-50 rounded-lg p-3">
            <p className="text-xs font-semibold text-amber-800 mb-2">Sent this week</p>
            {emailLog.filter(e => e.weekId === selectedWeekId).map((e, i) => (
              <div key={i} className="text-xs text-amber-700 flex justify-between">
                <span>{e.count} players · {e.subject}</span>
                <span>{new Date(e.sentAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</span>
              </div>
            ))}
          </div>
        )}

        {/* Recipient Status */}
        <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-800">Recipients</h3>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">{recipients.length} {recipients.length === 1 ? 'player' : 'players'} with email</span>
          </div>
          <div className="px-4 py-3 max-h-48 overflow-y-auto divide-y divide-gray-100">
            {recipients.map((r, i) => (
              <div key={i} className="py-1.5 flex items-center justify-between">
                <span className="text-sm text-gray-700">Team {r.teamNumber} — {r.name}</span>
                <span className="text-xs text-gray-400 truncate ml-2">{r.email}</span>
              </div>
            ))}
          </div>
          {noEmail.length > 0 && (
            <div className="px-4 py-2 bg-amber-50 border-t border-amber-100">
              <p className="text-xs font-semibold text-amber-700 mb-1">Missing email ({noEmail.length} players — update in Roster tab):</p>
              <p className="text-xs text-amber-600">{noEmail.map(p => p.name).join(', ')}</p>
            </div>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center p-4" onClick={() => setShowPreview(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white px-5 pt-5 pb-3 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900">Email Preview</h2>
              <button onClick={() => setShowPreview(false)} className="text-gray-400 text-xl font-bold">×</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <iframe
                srcDoc={buildEmailHtml()}
                title="Email Preview"
                className="w-full rounded-lg border border-gray-200"
                style={{ height: '600px' }}
              />
            </div>
            <div className="sticky bottom-0 bg-white px-5 pb-5 pt-3 border-t border-gray-100 space-y-2">
              <button
                onClick={() => { setShowPreview(false); setShowConfirm(true) }}
                disabled={sending || !commishEmail || recipients.length === 0}
                className="w-full bg-green-700 text-white rounded-xl py-3 text-sm font-bold disabled:opacity-50"
              >
                Continue to Send →
              </button>
              <button onClick={() => setShowPreview(false)} className="w-full text-gray-400 py-2 text-sm">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Send Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center p-4" onClick={() => setShowConfirm(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white px-5 pt-5 pb-3 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-gray-900">Confirm Send</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Sending to {recipients.length} {recipients.length === 1 ? 'player' : 'players'}
                </p>
              </div>
              <button onClick={() => setShowConfirm(false)} className="text-gray-400 text-xl font-bold">×</button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-3 space-y-1">
              {recipients.map((r, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{r.name}</p>
                    <p className="text-xs text-gray-400">Team {r.teamNumber}</p>
                  </div>
                  <p className="text-xs text-gray-500 truncate max-w-[180px]">{r.email}</p>
                </div>
              ))}
            </div>
            <div className="sticky bottom-0 bg-white px-5 pb-5 pt-3 border-t border-gray-100 space-y-2">
              <button
                onClick={handleSend}
                disabled={sending}
                className="w-full bg-green-700 text-white rounded-xl py-3 text-sm font-bold disabled:opacity-50"
              >
                {sending ? 'Sending…' : `📧 Confirm — Send to ${recipients.length} ${recipients.length === 1 ? 'Player' : 'Players'}`}
              </button>
              <button onClick={() => setShowConfirm(false)} className="w-full text-gray-400 py-2 text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

function fmtDate(d) {
  if (!d) return ''
  return new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
function fmtDateFull(d) {
  if (!d) return ''
  return new Date(d + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
}
function fmtType(t) {
  return { position_night: 'Position Night', scramble: 'Scramble', end_scramble: 'End Scramble', rainout: 'Rained Out' }[t] || t
}
