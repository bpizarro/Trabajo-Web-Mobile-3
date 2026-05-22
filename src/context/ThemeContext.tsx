/**
 * context/ThemeContext.tsx
 * Contexto global para el tema visual (light/dark).
 *
 * Patrón: Context + custom hook para encapsular
 * el estado y evitar prop drilling.
 *
 * La persistencia se hace en localStorage a través
 * de storageService para mantener la preferencia
 * entre sesiones.
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react'
import { Theme } from '@/types'
import { storageGet, storageSet } from '@/services/storageService'
import { STORAGE_KEYS } from '@/constants'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

/** Detecta preferencia del sistema operativo */
function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

/** Lee el tema guardado o usa la preferencia del sistema */
function getInitialTheme(): Theme {
  const saved = storageGet<Theme>(STORAGE_KEYS.theme)
  return saved ?? getSystemTheme()
}

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  // Aplica el atributo data-theme al <html> para las CSS variables
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    storageSet(STORAGE_KEYS.theme, theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * Hook para consumir el contexto de tema.
 * Lanza un error si se usa fuera de ThemeProvider,
 * lo cual previene errores silenciosos.
 */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme debe usarse dentro de <ThemeProvider>')
  }
  return ctx
}
