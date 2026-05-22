/**
 * components/ui/Feedback.tsx
 * Componente de feedback visual para estados de error y éxito.
 * Usado en el formulario y el modal de login.
 */

import { FeedbackState } from '@/types'

interface FeedbackProps {
  state: FeedbackState
}

export function Feedback({ state }: FeedbackProps) {
  if (state.type === 'idle' || state.type === 'loading') return null

  const isError = state.type === 'error'

  return (
    <div
      className="animate-slideDown"
      role={isError ? 'alert' : 'status'}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        borderRadius: '9px',
        padding: '10px 13px',
        fontSize: '13px',
        background: isError ? 'var(--ers)' : 'var(--oks)',
        border: `1px solid ${isError ? 'var(--er)' : 'var(--ok)'}`,
        color: isError ? 'var(--er)' : 'var(--ok)',
      }}
    >
      {state.message}
    </div>
  )
}
