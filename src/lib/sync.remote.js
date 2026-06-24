import { supabase } from './supabase.js'
import { getPendingQueue, markSynced, markFailed } from './db.js'

let syncInProgress = false

export async function syncPendingScores() {
  if (syncInProgress || !navigator.onLine) return 0

  syncInProgress = true
  let synced = 0

  try {
    const queue = await getPendingQueue()

    for (const item of queue) {
      try {
        if (item.type === 'scores') {
          const { error } = await supabase
            .from('scores')
            .upsert(item.payload, { onConflict: 'matchup_id,player_id' })

          if (error) throw error
          await markSynced(item.id)
          synced++
        }
      } catch {
        await markFailed(item.id)
      }
    }
  } finally {
    syncInProgress = false
  }

  return synced
}

// Auto-sync when coming back online
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => syncPendingScores())
}
