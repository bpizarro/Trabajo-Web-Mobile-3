/**
 * hooks/useSurveyForm.ts
 * Hook personalizado para gestionar el estado y lógica
 * del formulario de encuesta.
 *
 * Responsabilidades:
 * - Estado de los campos del formulario.
 * - Estado de feedback (error/success/loading).
 * - Validación antes del envío.
 * - Persistencia via surveyService.
 *
 * Separar esta lógica del componente permite:
 * - Testing unitario del comportamiento sin renderizar.
 * - Reutilización del formulario en otras vistas.
 * - Componente más limpio y declarativo.
 */

import { useState, useCallback } from 'react'
import { FormState, FeedbackState } from '@/types'
import { validateForm } from '@/utils/validation'
import { saveEntry } from '@/services/surveyService'
import { SUCCESS_DISPLAY_MS } from '@/constants'

/** Estado inicial vacío del formulario */
const INITIAL_FORM_STATE: FormState = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  message: '',
}

interface UseSurveyFormReturn {
  formState: FormState
  feedback: FeedbackState
  handleChange: (field: keyof FormState, value: string) => void
  handleSubmit: () => Promise<void>
  resetForm: () => void
}

export function useSurveyForm(): UseSurveyFormReturn {
  const [formState, setFormState] = useState<FormState>(INITIAL_FORM_STATE)
  const [feedback, setFeedback] = useState<FeedbackState>({ type: 'idle' })

  /** Actualiza un campo específico del formulario */
  const handleChange = useCallback(
    (field: keyof FormState, value: string) => {
      setFormState((prev) => ({ ...prev, [field]: value }))
      // Limpiar feedback de error al empezar a escribir
      setFeedback((prev) => (prev.type === 'error' ? { type: 'idle' } : prev))
    },
    []
  )

  const resetForm = useCallback(() => {
    setFormState(INITIAL_FORM_STATE)
  }, [])

  const handleSubmit = useCallback(async () => {
    // Validar campos
    const validationError = validateForm(formState)
    if (validationError) {
      setFeedback({ type: 'error', message: `⚠️ ${validationError}` })
      return
    }

    setFeedback({ type: 'loading' })

    // Guardar entrada
    const saved = saveEntry({
      fullName: formState.fullName.trim(),
      email: formState.email.trim(),
      phone: formState.phone.trim(),
      company: formState.company.trim() || null,
      message: formState.message.trim(),
    })

    if (!saved) {
      setFeedback({
        type: 'error',
        message: '⚠️ Error al guardar. Verifica el almacenamiento del dispositivo.',
      })
      return
    }

    // Éxito: limpiar formulario y mostrar confirmación temporal
    resetForm()
    setFeedback({
      type: 'success',
      message: '✅ ¡Enviado correctamente! Tu respuesta ha sido guardada.',
    })

    // Ocultar mensaje de éxito después del tiempo configurado
    setTimeout(() => {
      setFeedback({ type: 'idle' })
    }, SUCCESS_DISPLAY_MS)
  }, [formState, resetForm])

  return { formState, feedback, handleChange, handleSubmit, resetForm }
}
