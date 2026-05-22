/**
 * utils/formatters.ts
 * Utilidades de formateo de datos para presentación.
 *
 * Se mantienen separadas de los componentes para facilitar
 * testing unitario y reutilización.
 */

/** Locale chileno para formateo de fechas */
const LOCALE = 'es-CL'

/**
 * Formatea una fecha para el badge del formulario.
 * Ejemplo: "jueves, 21 de mayo de 2026"
 */
export function formatHeroBadgeDate(date: Date = new Date()): string {
  return date.toLocaleDateString(LOCALE, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Formatea una fecha ISO 8601 para mostrar en las entradas del admin.
 * Ejemplo: "21 may 2026, 14:35"
 */
export function formatEntryDate(isoString: string): string {
  return new Date(isoString).toLocaleString(LOCALE, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Extrae las iniciales de un nombre completo (máximo 2).
 * Ejemplo: "Ana González" → "AG"
 */
export function getInitials(fullName: string): string {
  return fullName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}
