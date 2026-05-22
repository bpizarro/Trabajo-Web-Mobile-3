/**
 * utils/validation.ts
 * Funciones de validación para el formulario de encuesta.
 *
 * Cada función retorna un string de error o null si es válido.
 * Este patrón permite composición flexible y mensajes específicos
 * por campo sin acoplar la lógica al componente.
 */

import { FormState } from '@/types'
import { VALIDATION_MESSAGES } from '@/constants'

/** Regex para validación básica de email (RFC 5322 simplificado) */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Regex de teléfono: acepta formatos internacionales con
 * +, espacios, guiones, paréntesis y punto medio (·).
 * Longitud: 7–18 dígitos efectivos.
 */
const PHONE_REGEX = /^\+?[\d\s\-()\u00b7]{7,18}$/

/** Valida el campo nombre completo */
export function validateName(name: string): string | null {
  return name.trim() ? null : VALIDATION_MESSAGES.nameRequired
}

/** Valida el campo email */
export function validateEmail(email: string): string | null {
  return email.trim() && EMAIL_REGEX.test(email)
    ? null
    : VALIDATION_MESSAGES.emailInvalid
}

/** Valida el campo teléfono */
export function validatePhone(phone: string): string | null {
  return phone.trim() && PHONE_REGEX.test(phone)
    ? null
    : VALIDATION_MESSAGES.phoneInvalid
}

/** Valida el campo mensaje */
export function validateMessage(message: string): string | null {
  return message.trim().length >= 10
    ? null
    : VALIDATION_MESSAGES.messageTooShort
}

/**
 * Valida el formulario completo.
 * Retorna el primer error encontrado o null si todo es válido.
 * El orden importa: se valida en el mismo orden en que
 * aparecen los campos en el formulario.
 */
export function validateForm(state: FormState): string | null {
  return (
    validateName(state.fullName) ??
    validateEmail(state.email) ??
    validatePhone(state.phone) ??
    validateMessage(state.message)
  )
}
