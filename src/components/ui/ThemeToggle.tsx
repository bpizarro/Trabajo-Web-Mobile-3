/**
 * components/ui/ThemeToggle.tsx
 * Botón de alternancia de tema visual (light/dark).
 * Replica el diseño del toggle del HTML de referencia.
 */

import { useTheme } from '@/context/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '7px',
        border: '1px solid var(--bd)',
        background: 'var(--sur)',
        color: 'var(--ts)',
        fontFamily: 'var(--font-body)',
        fontSize: '12px',
        borderRadius: '20px',
        padding: '6px 12px',
        cursor: 'pointer',
        transition: 'background var(--tr)',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--elv)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--sur)')}
    >
      {/* Track del toggle */}
      <span
        role="presentation"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          width: '34px',
          height: '18px',
          borderRadius: '10px',
          background: 'var(--elv)',
          border: '1px solid var(--bd)',
          position: 'relative',
          flexShrink: 0,
        }}
      >
        {/* Thumb del toggle */}
        <span
          style={{
            position: 'absolute',
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            background: isDark ? 'var(--ac)' : '#FDD835',
            left: isDark ? '18px' : '2px',
            transition: 'left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s',
          }}
        />
      </span>
      <span>{isDark ? '🌙 Oscuro' : '☀️ Claro'}</span>
    </button>
  )
}
