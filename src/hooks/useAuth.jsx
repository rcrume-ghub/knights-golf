// Commissioner mode removed — all features are always accessible
export function AuthProvider({ children }) { return children }
export function useAuth() { return { isAdmin: true } }
