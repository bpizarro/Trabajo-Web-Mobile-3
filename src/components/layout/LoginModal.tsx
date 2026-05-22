/**
 * components/layout/LoginModal.tsx
 * Modal de autenticación del administrador.
 *
 * Accesibilidad:
 * - Cierra con Escape y click en backdrop.
 * - Focus se mueve al primer campo al abrir.
 * - role="dialog" con aria-modal y aria-labelledby.
 */

import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Feedback } from '@/components/ui/Feedback'
import { FeedbackState } from '@/types'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  const { login, isLoginLoading, loginError, clearLoginError } = useAuth()
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const userRef = useRef<HTMLInputElement>(null)

  // Convertir loginError al tipo FeedbackState
  const feedback: FeedbackState = loginError
    ? { type: 'error', message: loginError }
    : { type: 'idle' }

  // Focus al input de usuario cuando el modal abre
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => userRef.current?.focus(), 50)
    } else {
      // Limpiar estado al cerrar
      setUser('')
      setPass('')
      clearLoginError()
    }
  }, [isOpen, clearLoginError])

  // Cerrar con Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  const handleSubmit = async () => {
    if (!user.trim() || !pass) return
    const ok = await login(user.trim(), pass)
    if (ok) {
      setUser('')
      setPass('')
      onClose()
      onSuccess()
    } else {
      setPass('')
    }
  }

  if (!isOpen) return null

  return (
    /* Backdrop */
    <div
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200,
        backdropFilter: 'blur(4px)',
        padding: '16px',
      }}
    >
      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="animate-fadeIn"
        style={{
          background: 'var(--sur)',
          borderRadius: '18px',
          padding: '28px',
          border: '1px solid var(--bd)',
          boxShadow: 'var(--sh)',
          width: '100%',
          maxWidth: '360px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
        }}
      >
        {/* Encabezado del modal */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '24px', flexShrink: 0 }}>🔐</span>
          <div style={{ flex: 1 }}>
            <div
              id="modal-title"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '16px',
                color: 'var(--tp)',
              }}
            >
              Acceso Administrador
            </div>
            <div style={{ fontSize: '12px', color: 'var(--tm)' }}>
              Solo usuarios autorizados
            </div>
          </div>
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--tm)',
              fontSize: '15px',
              padding: '4px 6px',
              borderRadius: '5px',
            }}
          >
            ✕
          </button>
        </div>

        {/* Campos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Usuario */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label
              htmlFor="modal-user"
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--ts)',
                textTransform: 'uppercase',
                letterSpacing: '0.3px',
              }}
            >
              Usuario
            </label>
            <input
              id="modal-user"
              ref={userRef}
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="admin"
              autoComplete="off"
              style={{
                width: '100%',
                padding: '10px 13px',
                background: 'var(--bg)',
                border: '1.5px solid var(--bd)',
                borderRadius: '9px',
                fontSize: '14px',
                color: 'var(--tp)',
                fontFamily: 'var(--font-body)',
                outline: 'none',
              }}
            />
          </div>

          {/* Contraseña */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label
              htmlFor="modal-pass"
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--ts)',
                textTransform: 'uppercase',
                letterSpacing: '0.3px',
              }}
            >
              Contraseña
            </label>
            <input
              id="modal-pass"
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '10px 13px',
                background: 'var(--bg)',
                border: '1.5px solid var(--bd)',
                borderRadius: '9px',
                fontSize: '14px',
                color: 'var(--tp)',
                fontFamily: 'var(--font-body)',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Feedback de error */}
        <Feedback state={feedback} />

        {/* Botón ingresar */}
        <button
          onClick={handleSubmit}
          disabled={isLoginLoading || !user.trim() || !pass}
          style={{
            background: 'var(--ac)',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            padding: '12px',
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: 'var(--font-display)',
            cursor: isLoginLoading ? 'not-allowed' : 'pointer',
            width: '100%',
            transition: 'background var(--tr)',
            opacity: isLoginLoading ? 0.7 : 1,
          }}
        >
          {isLoginLoading ? 'Verificando…' : 'Ingresar'}
        </button>
      </div>
    </div>
  )
}
