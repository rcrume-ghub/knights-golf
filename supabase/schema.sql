-- ============================================================
-- Knights AC Men's Golf League — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Seasons
create table if not exists seasons (
  id uuid primary key default gen_random_uuid(),
  year integer not null,
  name text not null,
  start_date date not null,
  course_par integer not null default 36,
  blind_score integer not null default 39,
  max_handicap integer not null default 18,
  blind_penalty integer not null default 3,
  is_active boolean not null default false,
  created_at timestamptz default now()
);

-- Players (all golfers, regular + subs)
create table if not exists players (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  is_sub boolean not null default false,
  user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz default now()
);

-- Teams (2 players per team)
create table if not exists teams (
  id uuid primary key default gen_random_uuid(),
  season_id uuid not null references seasons(id) on delete cascade,
  number integer not null,
  unique(season_id, number)
);

-- Which players are on which team
create table if not exists team_players (
  team_id uuid not null references teams(id) on delete cascade,
  player_id uuid not null references players(id) on delete cascade,
  slot char(1) not null check (slot in ('A', 'B')),
  primary key (team_id, slot)
);

-- Weekly schedule
create table if not exists weeks (
  id uuid primary key default gen_random_uuid(),
  season_id uuid not null references seasons(id) on delete cascade,
  number integer not null,
  date date not null,
  week_type text not null default 'regular'
    check (week_type in ('scramble', 'regular', 'position_night', 'holiday', 'end_scramble')),
  notes text,
  unique(season_id, number)
);

-- Weekly matchups (7 per week for 14 teams)
create table if not exists matchups (
  id uuid primary key default gen_random_uuid(),
  week_id uuid not null references weeks(id) on delete cascade,
  home_team_id uuid not null references teams(id),
  away_team_id uuid not null references teams(id),
  hole_assignment integer,
  is_locked boolean not null default false
);

-- Individual scores
create table if not exists scores (
  id uuid primary key default gen_random_uuid(),
  matchup_id uuid not null references matchups(id) on delete cascade,
  player_id uuid not null references players(id),
  gross integer check (gross >= 0),
  is_blind boolean not null default false,
  entered_by uuid references auth.users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(matchup_id, player_id)
);

-- Calculated handicaps per player per week
create table if not exists handicaps (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references players(id) on delete cascade,
  week_id uuid not null references weeks(id) on delete cascade,
  value numeric(5,2) not null,
  calculated_at timestamptz default now(),
  unique(player_id, week_id)
);

-- Dues tracking
create table if not exists dues (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references players(id) on delete cascade,
  season_id uuid not null references seasons(id) on delete cascade,
  amount integer not null default 20,
  paid_date date,
  notes text,
  unique(player_id, season_id)
);

-- Free round awards
create table if not exists free_rounds (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references players(id) on delete cascade,
  season_id uuid not null references seasons(id) on delete cascade,
  earned boolean not null default false,
  used boolean not null default false,
  unique(player_id, season_id)
);

-- User roles (commissioner = admin, everyone else = player)
create table if not exists user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'player' check (role in ('admin', 'player'))
);

-- ============================================================
-- Row Level Security
-- ============================================================

alter table seasons enable row level security;
alter table players enable row level security;
alter table teams enable row level security;
alter table team_players enable row level security;
alter table weeks enable row level security;
alter table matchups enable row level security;
alter table scores enable row level security;
alter table handicaps enable row level security;
alter table dues enable row level security;
alter table free_rounds enable row level security;
alter table user_roles enable row level security;

-- Everyone can read league data
create policy "Public read" on seasons for select using (true);
create policy "Public read" on players for select using (true);
create policy "Public read" on teams for select using (true);
create policy "Public read" on team_players for select using (true);
create policy "Public read" on weeks for select using (true);
create policy "Public read" on matchups for select using (true);
create policy "Public read" on scores for select using (true);
create policy "Public read" on handicaps for select using (true);
create policy "Public read" on dues for select using (true);
create policy "Public read" on free_rounds for select using (true);
create policy "Public read" on user_roles for select using (true);

-- Authenticated users can insert/update scores
create policy "Auth users can enter scores" on scores
  for insert with check (auth.uid() is not null);
create policy "Auth users can update scores" on scores
  for update using (auth.uid() is not null);

-- Admin-only writes for everything else
create policy "Admin write seasons" on seasons
  for all using (
    exists (select 1 from user_roles where user_id = auth.uid() and role = 'admin')
  );
create policy "Admin write players" on players
  for all using (
    exists (select 1 from user_roles where user_id = auth.uid() and role = 'admin')
  );
create policy "Admin write teams" on teams
  for all using (
    exists (select 1 from user_roles where user_id = auth.uid() and role = 'admin')
  );
create policy "Admin write team_players" on team_players
  for all using (
    exists (select 1 from user_roles where user_id = auth.uid() and role = 'admin')
  );
create policy "Admin write weeks" on weeks
  for all using (
    exists (select 1 from user_roles where user_id = auth.uid() and role = 'admin')
  );
create policy "Admin write matchups" on matchups
  for all using (
    exists (select 1 from user_roles where user_id = auth.uid() and role = 'admin')
  );
create policy "Admin write handicaps" on handicaps
  for all using (
    exists (select 1 from user_roles where user_id = auth.uid() and role = 'admin')
  );
create policy "Admin write dues" on dues
  for all using (
    exists (select 1 from user_roles where user_id = auth.uid() and role = 'admin')
  );
create policy "Admin write free_rounds" on free_rounds
  for all using (
    exists (select 1 from user_roles where user_id = auth.uid() and role = 'admin')
  );

-- ============================================================
-- Helpful views
-- ============================================================

-- Standings view: aggregates points per team for active season
create or replace view standings_view as
with match_results as (
  select
    m.id as matchup_id,
    m.week_id,
    m.home_team_id,
    m.away_team_id,
    -- home A player net
    (select 36 + coalesce(h_hdcp.value, 0) - s_home.gross
       from scores s_home
       join team_players tp on tp.player_id = s_home.player_id and tp.team_id = m.home_team_id and tp.slot = 'A'
       left join handicaps h_hdcp on h_hdcp.player_id = s_home.player_id and h_hdcp.week_id = m.week_id
      where s_home.matchup_id = m.id limit 1) as home_a_net,
    (select 36 + coalesce(h_hdcp.value, 0) - s_away.gross
       from scores s_away
       join team_players tp on tp.player_id = s_away.player_id and tp.team_id = m.away_team_id and tp.slot = 'A'
       left join handicaps h_hdcp on h_hdcp.player_id = s_away.player_id and h_hdcp.week_id = m.week_id
      where s_away.matchup_id = m.id limit 1) as away_a_net
  from matchups m
)
select
  t.id as team_id,
  t.number as team_number,
  t.season_id,
  count(distinct mr.matchup_id) as games_played
from teams t
left join match_results mr on mr.home_team_id = t.id or mr.away_team_id = t.id
group by t.id, t.number, t.season_id;

-- Lookup: player name + current handicap + team for active season
create or replace view player_roster_view as
select
  p.id as player_id,
  p.name,
  p.phone,
  p.is_sub,
  t.number as team_number,
  tp.slot,
  h.value as current_handicap
from players p
left join team_players tp on tp.player_id = p.id
left join teams t on t.id = tp.team_id
left join seasons s on s.id = t.season_id and s.is_active = true
left join lateral (
  select h2.value from handicaps h2
  where h2.player_id = p.id
  order by h2.calculated_at desc
  limit 1
) h on true;
