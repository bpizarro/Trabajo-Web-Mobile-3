/**
 * services/storageService.ts
 * Capa de abstracción sobre localStorage.
 *
 * Motivo de la abstracción:
 * - Centraliza el manejo de errores de I/O del storage.
 * - Facilita el reemplazo de localStorage por IndexedDB
 *   u otro mecanismo sin tocar la lógica de negocio.
 * - Tipado fuerte con genéricos para evitar casting manual.
 *
 * Limitaciones conocidas de localStorage:
 * - Síncrono (bloquea el hilo principal).
 * - Límite de ~5MB por origen.
 * - No disponible en workers.
 * - No es compartido entre pestañas en tiempo real
 *   (requiere el evento 'storage' para sincronizar).
 */

/**
 * Lee y deserializa un valor tipado desde localStorage.
 * Retorna null si la clave no existe o si el JSON es inválido.
 */
export function storageGet<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return null
    return JSON.parse(raw) as T
  } catch (error) {
    console.error(`[storageGet] Error leyendo clave "${key}":`, error)
    return null
  }
}

/**
 * Serializa y guarda un valor en localStorage.
 * Retorna true si la operación fue exitosa, false en caso contrario.
 *
 * Edge case: puede fallar si el storage está lleno (QuotaExceededError).
 */
export function storageSet<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`[storageSet] Error guardando clave "${key}":`, error)
    return false
  }
}

/**
 * Elimina una clave del localStorage.
 * No lanza error si la clave no existe.
 */
export function storageRemove(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`[storageRemove] Error eliminando clave "${key}":`, error)
  }
}
