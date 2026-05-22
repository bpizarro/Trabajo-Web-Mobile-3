/**
 * context/AuthContext.tsx
 * Contexto de autenticación del administrador.
 *
 * Gestiona el estado de sesión de admin y expone
 * las acciones de login y logout al árbol de componentes.
 *
 * Nota: el estado de autenticación es solo en memoria
 * (no persiste al recargar la página por seguridad).
 */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react'
import { validateAdminCredentials } from '@/services/authService'

interface AuthContextValue {
  isAdmin: boolean
  isLoginLoading: boolean
  loginError: string | null
  login: (user: string, pass: string) => Promise<boolean>
  logout: () => void
  clearLoginError: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoginLoading, setIsLoginLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)

  /**
   * Intenta autenticar con las credenciales provistas.
   * Retorna true si fue exitoso.
   */
  const login = useCallback(async (user: string, pass: string): Promise<boolean> => {
    setLoginError(null)
    setIsLoginLoading(true)

    try {
      const valid = await validateAdminCredentials(user, pass)
      if (valid) {
        setIsAdmin(true)
        return true
      } else {
        setLoginError('⚠️ Credenciales incorrectas.')
        return false
      }
    } catch {
      setLoginError('⚠️ Error al verificar. Intenta de nuevo.')
      return false
    } finally {
      setIsLoginLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setIsAdmin(false)
    setLoginError(null)
  }, [])

  const clearLoginError = useCallback(() => {
    setLoginError(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{ isAdmin, isLoginLoading, loginError, login, logout, clearLoginError }}
    >
      {children}
    </AuthContext.Provider>
  )
}

/** Hook para consumir el contexto de autenticación */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  }
  return ctx
}
