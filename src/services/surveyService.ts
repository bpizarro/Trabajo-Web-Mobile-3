/**
 * services/surveyService.ts
 * Lógica de negocio para el manejo de entradas de encuesta.
 *
 * Responsabilidades:
 * - CRUD de entradas en localStorage.
 * - Generación de IDs únicos.
 * - Exportación a CSV y JSON.
 *
 * Separación de responsabilidades:
 * Este servicio NO conoce React ni el DOM. Solo opera
 * con datos puros y el servicio de storage.
 */

import { SurveyEntry, DownloadFormat } from '@/types'
import { storageGet, storageSet } from './storageService'
import { STORAGE_KEYS, ENTRY_ID_PREFIX } from '@/constants'

/**
 * Genera un ID único para una entrada.
 * Formato: sv_{timestamp}_{random4chars}
 * No es un UUID completo pero es suficiente para
 * uso local sin riesgo de colisión significativo.
 */
function generateId(): string {
  return `${ENTRY_ID_PREFIX}${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
}

/** Recupera todas las entradas guardadas, ordenadas por fecha descendente. */
export function getEntries(): SurveyEntry[] {
  const entries = storageGet<SurveyEntry[]>(STORAGE_KEYS.entries) ?? []
  return [...entries].sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  )
}

/**
 * Guarda una nueva entrada.
 * Retorna la entrada creada o null si hubo un error de storage.
 */
export function saveEntry(
  data: Omit<SurveyEntry, 'id' | 'submittedAt'>
): SurveyEntry | null {
  const entry: SurveyEntry = {
    ...data,
    id: generateId(),
    submittedAt: new Date().toISOString(),
  }

  const current = storageGet<SurveyEntry[]>(STORAGE_KEYS.entries) ?? []
  const success = storageSet(STORAGE_KEYS.entries, [...current, entry])

  return success ? entry : null
}

/**
 * Elimina una entrada por ID.
 * Retorna true si se eliminó correctamente.
 */
export function deleteEntry(id: string): boolean {
  const current = storageGet<SurveyEntry[]>(STORAGE_KEYS.entries) ?? []
  const filtered = current.filter((e) => e.id !== id)
  return storageSet(STORAGE_KEYS.entries, filtered)
}

/**
 * Genera y dispara la descarga de las entradas en el formato indicado.
 *
 * Implementación: crea un Blob en memoria, genera una URL temporal
 * con URL.createObjectURL y simula un click en un <a> temporal.
 * La URL se revoca inmediatamente después para liberar memoria.
 *
 * Limitación en iOS Safari: createObjectURL puede no abrir el
 * diálogo de descarga. En ese caso se puede usar el fallback
 * de data URI, pero tiene límite de tamaño (~2MB).
 */
export function downloadEntries(
  entries: SurveyEntry[],
  format: DownloadFormat
): void {
  if (entries.length === 0) return

  const date = new Date().toISOString().slice(0, 10)
  let blob: Blob
  let filename: string

  if (format === 'json') {
    blob = new Blob([JSON.stringify(entries, null, 2)], {
      type: 'application/json',
    })
    filename = `nexoform_respuestas_${date}.json`
  } else {
    // CSV con BOM UTF-8 para compatibilidad con Excel
    const headers: (keyof SurveyEntry)[] = [
      'id', 'fullName', 'email', 'phone', 'company', 'message', 'submittedAt',
    ]
    const escapeCell = (value: string | null): string =>
      `"${(value ?? '').replace(/"/g, '""')}"`

    const rows = entries.map((entry) =>
      headers.map((h) => escapeCell(entry[h] as string | null)).join(',')
    )
    const csvContent = [headers.join(','), ...rows].join('\r\n')

    blob = new Blob(['\uFEFF' + csvContent], {
      type: 'text/csv;charset=utf-8;',
    })
    filename = `nexoform_respuestas_${date}.csv`
  }

  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  // Liberar la URL del objeto de memoria
  URL.revokeObjectURL(url)
}
