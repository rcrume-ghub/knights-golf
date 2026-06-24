/**
 * store.js — Local-first data layer backed by IndexedDB.
 *
 * All app components read/write through this module.
 * To add remote sync later, implement the same interface against
 * Supabase or PocketBase and swap the import in this file.
 */

import { getAll, getOne, putOne, putMany, deleteOne, newId } from './db.js'

// ─── Seasons ─────────────────────────────────────────────────────────────────

export const seasons = {
  getActive: async () => {
    const all = await getAll('seasons')
    return all.find(s => s.is_active) ?? null
  },
  getAll: () => getAll('seasons'),
  upsert: (data) => putOne('seasons', { ...data, id: data.id || newId() }),
  setActive: async (id) => {
    const all = await getAll('seasons')
    for (const s of all) {
      await putOne('seasons', { ...s, is_active: s.id === id })
    }
  }
}

// ─── Players ─────────────────────────────────────────────────────────────────

export const players = {
  getAll: () => getAll('players'),
  getById: (id) => getOne('players', id),
  upsert: (data) => putOne('players', { ...data, id: data.id || newId() }),
  delete: (id) => deleteOne('players', id),
  getSubs: async () => {
    const all = await getAll('players')
    return all.filter(p => p.is_sub)
  }
}

// ─── Teams ───────────────────────────────────────────────────────────────────

export const teams = {
  getAll: () => getAll('teams'),
  getById: (id) => getOne('teams', id),
  getBySeason: async (seasonId) => {
    const all = await getAll('teams')
    return all.filter(t => t.season_id === seasonId).sort((a, b) => a.number - b.number)
  },
  upsert: (data) => putOne('teams', { ...data, id: data.id || newId() })
}

// ─── Team Players ─────────────────────────────────────────────────────────────

export const teamPlayers = {
  getAll: () => getAll('team_players'),
  getByTeam: async (teamId) => {
    const all = await getAll('team_players')
    return all.filter(tp => tp.team_id === teamId)
  },
  upsert: (data) => putOne('team_players', { ...data, id: data.id || newId() })
}

// ─── Weeks ───────────────────────────────────────────────────────────────────

export const weeks = {
  getAll: () => getAll('weeks'),
  getById: (id) => getOne('weeks', id),
  getBySeason: async (seasonId) => {
    const all = await getAll('weeks')
    return all.filter(w => w.season_id === seasonId).sort((a, b) => a.number - b.number)
  },
  upsert: (data) => putOne('weeks', { ...data, id: data.id || newId() })
}

// ─── Matchups ─────────────────────────────────────────────────────────────────

export const matchups = {
  getAll: () => getAll('matchups'),
  getByWeek: async (weekId) => {
    const all = await getAll('matchups')
    return all.filter(m => m.week_id === weekId).sort((a, b) => (a.hole_assignment || 0) - (b.hole_assignment || 0))
  },
  upsert: (data) => putOne('matchups', { ...data, id: data.id || newId() })
}

// ─── Scores ───────────────────────────────────────────────────────────────────

export const scores = {
  getAll: () => getAll('scores'),
  getByMatchup: async (matchupId) => {
    const all = await getAll('scores')
    return all.filter(s => s.matchup_id === matchupId)
  },
  getByMatchups: async (matchupIds) => {
    const all = await getAll('scores')
    const set = new Set(matchupIds)
    return all.filter(s => set.has(s.matchup_id))
  },
  upsert: async (data) => {
    // Upsert by matchup_id + player_id composite
    const all = await getAll('scores')
    const existing = all.find(s => s.matchup_id === data.matchup_id && s.player_id === data.player_id)
    return putOne('scores', { ...data, id: existing?.id || data.id || newId(), updated_at: new Date().toISOString() })
  },
  upsertMany: async (records) => {
    const all = await getAll('scores')
    const upserted = records.map(data => {
      const existing = all.find(s => s.matchup_id === data.matchup_id && s.player_id === data.player_id)
      return { ...data, id: existing?.id || data.id || newId(), updated_at: new Date().toISOString() }
    })
    return putMany('scores', upserted)
  }
}

// ─── Handicaps ────────────────────────────────────────────────────────────────

export const handicaps = {
  getAll: () => getAll('handicaps'),
  getByPlayers: async (playerIds) => {
    const all = await getAll('handicaps')
    const set = new Set(playerIds)
    return all.filter(h => set.has(h.player_id))
  },
  getLatestByPlayer: async (playerId) => {
    const all = await getAll('handicaps')
    const mine = all.filter(h => h.player_id === playerId)
    return mine.sort((a, b) => new Date(b.calculated_at) - new Date(a.calculated_at))[0] ?? null
  },
  upsert: async (data) => {
    const all = await getAll('handicaps')
    const existing = all.find(h => h.player_id === data.player_id && h.week_id === data.week_id)
    return putOne('handicaps', { ...data, id: existing?.id || data.id || newId(), calculated_at: new Date().toISOString() })
  },
  upsertMany: async (records) => {
    const all = await getAll('handicaps')
    const upserted = records.map(data => {
      const existing = all.find(h => h.player_id === data.player_id && h.week_id === data.week_id)
      return { ...data, id: existing?.id || data.id || newId(), calculated_at: new Date().toISOString() }
    })
    return putMany('handicaps', upserted)
  }
}

// ─── Dues ─────────────────────────────────────────────────────────────────────

export const dues = {
  getBySeason: async (seasonId) => {
    const all = await getAll('dues')
    return all.filter(d => d.season_id === seasonId)
  },
  upsert: async (data) => {
    const all = await getAll('dues')
    const existing = all.find(d => d.player_id === data.player_id && d.season_id === data.season_id)
    return putOne('dues', { ...data, id: existing?.id || data.id || newId() })
  }
}

// ─── Free Rounds ──────────────────────────────────────────────────────────────

export const freeRounds = {
  getBySeason: async (seasonId) => {
    const all = await getAll('free_rounds')
    return all.filter(f => f.season_id === seasonId)
  },
  upsert: async (data) => {
    const all = await getAll('free_rounds')
    const existing = all.find(f => f.player_id === data.player_id && f.season_id === data.season_id)
    return putOne('free_rounds', { ...data, id: existing?.id || data.id || newId() })
  }
}

// ─── Bulk seed (used by import) ───────────────────────────────────────────────

export async function seedAll(data) {
  const storeMap = { seasons, teams, players, weeks, matchups, scores, handicaps, dues }
  for (const [storeName, records] of Object.entries(data)) {
    if (records?.length) await putMany(storeName, records)
  }
}
