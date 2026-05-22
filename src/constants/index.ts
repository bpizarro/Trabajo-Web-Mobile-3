/**
 * constants/index.ts
 * Constantes globales de la aplicación.
 *
 * NOTA DE SEGURIDAD: Las credenciales del administrador
 * se leen desde variables de entorno (VITE_*). En un
 * entorno de producción real, la autenticación DEBE
 * realizarse contra un backend seguro. Nunca exponer
 * credenciales reales en el cliente.
 */

/** Credenciales del administrador (solo para demo local) */
export const ADMIN_CREDENTIALS = {
  user: import.meta.env.VITE_ADMIN_USER ?? 'admin',
  pass: import.meta.env.VITE_ADMIN_PASS ?? 'nexo2026',
} as const

/** Claves de localStorage */
export const STORAGE_KEYS = {
  entries: import.meta.env.VITE_STORAGE_KEY ?? 'nexoform_entries',
  theme: import.meta.env.VITE_THEME_KEY ?? 'nexoform_theme',
} as const

/** Mensajes de validación del formulario */
export const VALIDATION_MESSAGES = {
  nameRequired: 'El nombre completo es requerido.',
  emailInvalid: 'Correo electrónico inválido.',
  phoneInvalid: 'Teléfono inválido.',
  messageTooShort: 'El mensaje debe tener al menos 10 caracteres.',
} as const

/** Tiempo en ms que se muestra el mensaje de éxito */
export const SUCCESS_DISPLAY_MS = 5000

/** Prefijo para IDs de entradas */
export const ENTRY_ID_PREFIX = 'sv_'
