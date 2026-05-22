/**
 * components/layout/Header.tsx
 * Cabecera sticky de la aplicación.
 * Contiene la marca, el botón de admin/logout y el toggle de tema.
 */

import { useAuth } from '@/context/AuthContext'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

interface HeaderProps {
  /** Callback para abrir el modal de login */
  onAdminClick: () => void
}

export function Header({ onAdminClick }: HeaderProps) {
  const { isAdmin, logout } = useAuth()

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'var(--sur)',
        borderBottom: '1px solid var(--bd)',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px',
      }}
    >
      {/* Marca / Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '9px',
            background: 'var(--ac)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {/* Ícono "+" */}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M3 9h12M9 3v12"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '15px',
              color: 'var(--tp)',
            }}
          >
            NexoForm
          </div>
          <div
            style={{
              fontSize: '9px',
              color: 'var(--tm)',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
            }}
          >
            Encuestas &amp; Servicios
          </div>
        </div>
      </div>

      {/* Acciones del header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {/* Botón Admin */}
        <button
          onClick={isAdmin ? logout : onAdminClick}
          aria-label={isAdmin ? 'Cerrar sesión de administrador' : 'Acceder como administrador'}
          style={{
            border: `1px solid ${isAdmin ? 'var(--er)' : 'var(--bd)'}`,
            background: isAdmin ? 'var(--ers)' : 'var(--sur)',
            color: isAdmin ? 'var(--er)' : 'var(--ts)',
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            borderRadius: '20px',
            padding: '6px 12px',
            cursor: 'pointer',
            transition: 'background var(--tr)',
            whiteSpace: 'nowrap',
          }}
        >
          {isAdmin ? '🛡️ Cerrar sesión' : '🔐 Admin'}
        </button>

        {/* Toggle de tema */}
        <ThemeToggle />
      </div>
    </header>
  )
}
