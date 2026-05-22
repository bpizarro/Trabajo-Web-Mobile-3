/**
 * hooks/useAdmin.ts
 * Hook personalizado para gestionar el estado del panel admin.
 *
 * Responsabilidades:
 * - Carga de entradas desde localStorage.
 * - Eliminación de entradas individuales.
 * - Delegación de descarga al surveyService.
 */

import { useState, useEffect, useCallback } from 'react'
import { SurveyEntry, DownloadFormat } from '@/types'
import { getEntries, deleteEntry, downloadEntries } from '@/services/surveyService'

interface UseAdminReturn {
  entries: SurveyEntry[]
  isLoading: boolean
  handleDelete: (id: string) => void
  handleDownload: (format: DownloadFormat) => void
  refresh: () => void
}

export function useAdmin(isActive: boolean): UseAdminReturn {
  const [entries, setEntries] = useState<SurveyEntry[]>([])
  const [isLoading, setIsLoading] = useState(false)

  /** Carga entradas desde localStorage */
  const refresh = useCallback(() => {
    setIsLoading(true)
    // setTimeout de 0ms para permitir que el estado de loading se renderice
    // antes de la operación síncrona de lectura
    setTimeout(() => {
      setEntries(getEntries())
      setIsLoading(false)
    }, 0)
  }, [])

  // Cargar entradas cuando el panel se activa
  useEffect(() => {
    if (isActive) {
      refresh()
    }
  }, [isActive, refresh])

  const handleDelete = useCallback(
    (id: string) => {
      const success = deleteEntry(id)
      if (success) {
        // Actualizar estado local sin re-leer del storage para mejor UX
        setEntries((prev) => prev.filter((e) => e.id !== id))
      }
    },
    []
  )

  const handleDownload = useCallback(
    (format: DownloadFormat) => {
      const current = getEntries()
      if (current.length === 0) {
        alert('No hay respuestas para descargar.')
        return
      }
      downloadEntries(current, format)
    },
    []
  )

  return { entries, isLoading, handleDelete, handleDownload, refresh }
}
