// Reserved for future remote sync — not used in local-only mode.
// When remote sync is enabled, re-import this in Layout.jsx.
export function useSync() {
  return { pending: 0, online: true }
}
