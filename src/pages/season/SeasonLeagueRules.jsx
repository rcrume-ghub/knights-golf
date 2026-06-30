import { useState } from 'react'
import { useSeason } from '../Season.jsx'

const SECTIONS = [
  { id: 'scoring', title: '1. Scoring System' },
  { id: 'handicap', title: '2. Handicap System' },
  { id: 'blind-sub', title: '3. Blind Players & Substitutes' },
  { id: 'forfeits', title: '4. Match Forfeits' },
  { id: 'format', title: '5. Season Format & Schedule' },
  { id: 'rainout', title: '6. Rain Out Rules' },
  { id: 'etiquette', title: '7. Golf Etiquette' },
  { id: 'disputes', title: '8. Rules & Disputes' },
  { id: 'admin', title: '9. League Administration' },
]

export default function SeasonLeagueRules() {
  const { season } = useSeason()
  const [active, setActive] = useState('scoring')
  const cap = season?.max_handicap ?? 18
  const par = season?.par ?? 35
  const blindFront = season?.blind_score ?? 39
  const blindBack = blindFront + 1

  function scrollTo(id) {
    setActive(id)
    document.getElementById(`rule-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="flex flex-col min-h-full">
      {/* TOC */}
      <div className="bg-green-800 px-4 py-3">
        <p className="text-xs font-bold text-green-200 uppercase tracking-widest mb-2">Table of Contents</p>
        <div className="flex flex-wrap gap-1.5">
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => scrollTo(s.id)}
              className={`text-xs px-2.5 py-1 rounded-full font-semibold transition-colors ${active === s.id ? 'bg-white text-green-800' : 'bg-green-700 text-green-100'}`}>
              {s.title.split('. ')[1]}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-4 max-w-2xl mx-auto space-y-6 pb-16">

        {/* 1. Scoring */}
        <Section id="scoring" title="1. Scoring System">
          <Rule title="Points Per Matchup">
            Each weekly matchup is worth <strong>3 total points</strong>. Points are divided across three contests:
          </Rule>
          <table className="w-full text-sm mt-2 border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="px-3 py-2 text-left text-xs">Contest</th>
                <th className="px-3 py-2 text-left text-xs">Who Plays</th>
                <th className="px-3 py-2 text-left text-xs">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="bg-gray-50"><td className="px-3 py-2 font-semibold text-gray-800">A Slot</td><td className="px-3 py-2 text-gray-600">Lowest HCP player vs. lowest HCP player</td><td className="px-3 py-2 font-bold text-green-700">1 pt</td></tr>
              <tr><td className="px-3 py-2 font-semibold text-gray-800">B Slot</td><td className="px-3 py-2 text-gray-600">Higher HCP player vs. higher HCP player</td><td className="px-3 py-2 font-bold text-green-700">1 pt</td></tr>
              <tr className="bg-gray-50"><td className="px-3 py-2 font-semibold text-gray-800">Team Total</td><td className="px-3 py-2 text-gray-600">Combined net score of both players</td><td className="px-3 py-2 font-bold text-green-700">1 pt</td></tr>
            </tbody>
          </table>
          <Rule title="Net Score">
            Net Score = Gross Score − Handicap (rounded to the nearest whole number). The player with the <strong>lower net score</strong> wins their slot. Ties split the point (0.5 each).
          </Rule>
          <Rule title="Slot Assignment">
            The A slot is always the player with the <strong>lower (better) handicap</strong>. The B slot is the player with the higher handicap. Slot assignment is set at the start of the season and does not change week to week.
          </Rule>
        </Section>

        {/* 2. Handicap */}
        <Section id="handicap" title="2. Handicap System">
          <Rule title="Week 1 — Previous Season HCP">
            For the first week of the season, each player's handicap from the <strong>prior season</strong> is used. If a player has no prior handicap, the commissioner will enter one manually or mark the player as "No HCP Established."
          </Rule>
          <Rule title="No HCP Established">
            If a player has no established handicap:
            <ul className="list-disc pl-5 mt-1 space-y-1 text-gray-600">
              <li><strong>Weeks 1–2 played:</strong> Scoring pauses for that player — no net score calculated. A visual indicator appears in the app.</li>
              <li><strong>Weeks 3–4 played:</strong> A temporary HCP is calculated using the <em>average</em> of all played scores. This is applied retroactively to any prior weeks that were paused.</li>
              <li><strong>Week 5+ played:</strong> Full HCP established — see rolling calculation below.</li>
            </ul>
          </Rule>
          <Rule title="Rolling Handicap Calculation">
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li><strong>Weeks 1–5 played:</strong> Best 5 of all played scores</li>
              <li><strong>Weeks 6–10 played:</strong> Best 5 of all played scores (up to 10 rounds)</li>
              <li><strong>Week 11+ played:</strong> Rolling window — best 5 of the <em>most recent 10 played rounds</em>. Oldest rounds drop off as new ones are added.</li>
            </ul>
            <p className="mt-2 text-gray-600">The HCP formula: average of the best-5 differentials (score minus par), rounded to one decimal, then capped at the season maximum.</p>
          </Rule>
          <Rule title={`Handicap Cap — Max ${cap}`}>
            No player's handicap may exceed <strong>{cap}</strong> for this season (set in Season Settings). Any calculated handicap above {cap} is automatically capped at {cap} for all scoring and display purposes.
          </Rule>
          <Rule title="When HCPs Update">
            Handicaps are recalculated automatically when the commissioner <strong>finalizes scores</strong> for a completed week. Skipped weeks and blind plays do <em>not</em> count toward a player's scored-round window.
          </Rule>
          <Rule title="HCP Display">
            Handicaps are displayed as whole numbers throughout the app. The commissioner can toggle decimal view on any page showing handicaps.
          </Rule>
        </Section>

        {/* 3. Blind & Subs */}
        <Section id="blind-sub" title="3. Blind Players & Substitutes">
          <Rule title="Blind Score">
            If a player is absent with no substitute, they receive the <strong>blind score</strong> for that night:
            <ul className="list-disc pl-5 mt-1 text-gray-600">
              <li>Front 9: <strong>{blindFront}</strong> (par {par} + 4)</li>
              <li>Back 9: <strong>{blindBack}</strong> (par {par + 1} + 4)</li>
            </ul>
            The blind score is used as the player's gross for scoring purposes.
          </Rule>
          <Rule title="Substitutes">
            A substitute (sub) may fill in for any absent team member. Subs are drawn from the league sub list. The sub's score is used in place of the absent player's score.
          </Rule>
          <Rule title="Blind/Sub Points Cap">
            If <strong>one team</strong> in a matchup has a blind or sub player, that team can earn a <strong>maximum of 2 points</strong> in that matchup. The team using a blind automatically forfeits the Team Total point to the opponent.
          </Rule>
          <Rule title="Both Teams with Blind/Sub">
            If <strong>both teams</strong> have a blind or sub player, the Team Total slot becomes a dead slot — <strong>no points awarded</strong> for team total. Individual A and B slots are still played normally (max 2 pts per team).
          </Rule>
        </Section>

        {/* 4. Forfeits */}
        <Section id="forfeits" title="4. Match Forfeits">
          <Rule title="One Team Fully Absent">
            If <strong>both players on a team</strong> are absent with no substitutes, that team forfeits the entire matchup. The opposing team receives <strong>3 points</strong>.
          </Rule>
          <Rule title="Both Teams Fully Absent">
            If both teams are fully absent with no substitutes, <strong>0 points are awarded</strong> to either team. The matchup is treated as a push and has no effect on standings.
          </Rule>
        </Section>

        {/* 5. Format */}
        <Section id="format" title="5. Season Format & Schedule">
          <Rule title="Nine-Hole Format">
            All league rounds are <strong>9-hole rounds</strong>. Front 9 and Back 9 alternate by calendar month, starting with Front 9 in the month the season begins.
          </Rule>
          <Rule title="Week Types">
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li><strong>Regular:</strong> Standard matchup scoring — all 3 points available.</li>
              <li><strong>Position Night:</strong> Regular scoring format. Used to determine final standings position at season end.</li>
              <li><strong>Scramble:</strong> Team scramble format. Scores do <em>not</em> count toward individual handicaps or standings.</li>
              <li><strong>End Scramble:</strong> Season-closing scramble event.</li>
              <li><strong>Bye / No Golf:</strong> No play, no scores recorded.</li>
            </ul>
          </Rule>
          <Rule title="Standings">
            Teams are ranked by total points accumulated across all regular and position-night weeks. Scramble weeks are excluded from standings.
          </Rule>
          <Rule title="League Champion">
            The team with the most points at the end of the final position night is the League Champion.
          </Rule>
        </Section>

        {/* 6. Rain Out */}
        <Section id="rainout" title="6. Rain Out Rules">
          {['If the golf course closes because of rain, the golf round for that night is scratched from the schedule.',
            'The League Commissioner can cancel a night of golf prior to playing per weather conditions. He will call the Golf Course and inform them of the decision. It will be up to each golfer to call the course to see if we are playing.',
            'If we are at the Golf Course and it starts raining and lightning, majority vote will determine if we continue play or quit play.',
            'We will not make-up rainout games unless it is the final position night when the League Champion is in question. If that is the case the league will be pushed back (1) week to determine the League Champion.',
          ].map((r, i) => (
            <p key={i} className="text-sm text-gray-700 mb-2">
              <span className="font-bold text-green-700">{String.fromCharCode(97 + i)}.</span> {r}
            </p>
          ))}
          <Rule title="Rain Out Contact">
            <strong>Crossings G.C.</strong> · (502) 957-6523 · 205 Letts Rd, Brooks, KY 40109
          </Rule>
        </Section>

        {/* 7. Etiquette */}
        <Section id="etiquette" title="7. Golf Etiquette">
          <Rule title="Pace of Play">
            Keep up with the group ahead of you. Complete each hole promptly and move to the next tee. Ready golf is encouraged — hit when ready rather than waiting for strict honor. Slow play delays the entire field and may result in a warning from the commissioner.
          </Rule>
          <Rule title="Care for the Course">
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Replace all divots and use sand/seed mix when available.</li>
              <li>Repair your ball mark on the green, plus one more.</li>
              <li>Rake bunkers thoroughly after each use.</li>
              <li>Do not drive carts on wet areas, near greens, or in restricted zones.</li>
              <li>Follow posted cart path rules at all times.</li>
            </ul>
          </Rule>
          <Rule title="Conceding Putts">
            Putts within a reasonable distance (typically inside 2–3 feet) may be conceded by your opponent. If there is any question about whether a putt is conceded, <strong>putt it out</strong>. Do not assume a putt is given.
          </Rule>
          <Rule title="Lost Ball / Out of Bounds">
            If a ball is lost or out of bounds, take a stroke-and-distance penalty and play from as near as possible to the original spot, or use the local league preferred lie rule as directed by the commissioner.
          </Rule>
          <Rule title="Phones & Devices">
            Keep phone ringers silent during play. Step away from the group if you must take a call. Do not use devices in a way that delays or distracts other players.
          </Rule>
          <Rule title="Conduct">
            All players are expected to conduct themselves with sportsmanship and respect. Excessive language, club throwing, or behavior detrimental to the league may result in removal from that week's round at the commissioner's discretion.
          </Rule>
          <Rule title="Alcohol Policy">
            Players are welcome to enjoy beverages responsibly. Excessively impaired play that affects the pace or conduct of the round is not tolerated.
          </Rule>
        </Section>

        {/* 8. Disputes */}
        <Section id="disputes" title="8. Rules & Disputes">
          <Rule title="Governing Rules">
            The <strong>USGA Rules of Golf</strong> govern all play unless a local league rule specifically overrides them. When in doubt, play the ball as it lies and settle any question after the round.
          </Rule>
          <Rule title="Commissioner Ruling">
            The League Commissioner has final authority on all rules disputes. Disputes should be raised immediately — not after scores are submitted. Once scores are finalized for a week, results stand.
          </Rule>
          <Rule title="Scorekeeping">
            Each player is responsible for knowing their own score. Scores should be confirmed with your opponent before leaving the green. Deliberately falsified scores result in disqualification for that week.
          </Rule>
          <Rule title="Preferred Lies (Winter Rules)">
            If the commissioner declares preferred lies for a given night (e.g. poor course conditions), players may improve their lie within one club length, no closer to the hole, in the fairway only. This will be announced before play begins.
          </Rule>
        </Section>

        {/* 9. Admin */}
        <Section id="admin" title="9. League Administration">
          <Rule title="Dues">
            League dues are collected at the start of each season. The amount is set by the commissioner. Players who have not paid dues by the commissioner's deadline may be suspended from play.
          </Rule>
          <Rule title="Roster & Teams">
            The season roster consists of 14 two-player teams. Team assignments are set before the season begins and do not change. Players added mid-season require commissioner approval.
          </Rule>
          <Rule title="Sub List">
            A league sub list is maintained for players who need a replacement. Subs play at their established handicap. If a sub has no established handicap, the commissioner assigns one for that night. Subs are not eligible for individual scoring awards.
          </Rule>
          <Rule title="Score Finalization">
            The commissioner finalizes each week's scores in the app after play is complete. Finalization locks in scores, triggers handicap recalculation, and updates standings. Scores cannot be edited after finalization without commissioner override.
          </Rule>
          <Rule title="Season End">
            The season officially ends after the final position night. The commissioner runs the End Season process in the app to close out the season, record final standings, and archive results for future reference.
          </Rule>
          <Rule title="Contact">
            Questions about rules, scheduling, dues, or subs should be directed to the League Commissioner.
          </Rule>
        </Section>

        <p className="text-xs text-center text-gray-400 pt-2">Knight's AC Men's Golf League · Rules last updated {new Date().getFullYear()}</p>
      </div>
    </div>
  )
}

function Section({ id, title, children }) {
  return (
    <div id={`rule-${id}`} className="scroll-mt-4">
      <h2 className="text-base font-bold text-gray-900 border-b-2 border-green-700 pb-1.5 mb-3">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function Rule({ title, children }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3">
      <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-1">{title}</p>
      <div className="text-sm text-gray-700 leading-relaxed">{children}</div>
    </div>
  )
}
