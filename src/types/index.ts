/**
 * types/index.ts
 * Definiciones de tipos globales de la aplicación.
 * Centralizar los tipos evita duplicación y facilita
 * el mantenimiento cuando la estructura de datos cambia.
 */

/** Tema visual de la aplicación */
export type Theme = 'light' | 'dark'

/** Vista activa en la aplicación */
export type AppView = 'form' | 'admin'

/**
 * Entrada de encuesta guardada en localStorage.
 * Todos los campos son strings excepto company (nullable)
 * y submittedAt (ISO 8601).
 */
export interface SurveyEntry {
  id: string
  fullName: string
  email: string
  phone: string
  company: string | null
  message: string
  submittedAt: string // ISO 8601
}

/**
 * Estado del formulario de encuesta.
 * Refleja los campos controlados del formulario.
 */
export interface FormState {
  fullName: string
  email: string
  phone: string
  company: string
  message: string
}

/** Estado de feedback visual del formulario */
export type FeedbackState =
  | { type: 'idle' }
  | { type: 'error'; message: string }
  | { type: 'success'; message: string }
  | { type: 'loading' }

/** Estado del panel de administrador */
export interface AdminState {
  isAuthenticated: boolean
  entries: SurveyEntry[]
  isLoading: boolean
}

/** Formatos de descarga disponibles */
export type DownloadFormat = 'json' | 'csv'
