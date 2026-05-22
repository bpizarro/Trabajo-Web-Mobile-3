/**
 * components/admin/EntryCard.tsx
 * Tarjeta individual de una respuesta en el panel admin.
 * Muestra datos del usuario, chips informativos y el mensaje.
 */

import { SurveyEntry } from '@/types'
import { formatEntryDate, getInitials } from '@/utils/formatters'

interface EntryCardProps {
  entry: SurveyEntry
  onDelete: (id: string) => void
}

export function EntryCard({ entry, onDelete }: EntryCardProps) {
  const initials = getInitials(entry.fullName)
  const dateFormatted = formatEntryDate(entry.submittedAt)

  const handleDelete = () => {
    if (window.confirm(`¿Eliminar la respuesta de ${entry.fullName}?`)) {
      onDelete(entry.id)
    }
  }

  return (
    <div
      className="animate-fadeIn"
      style={{
        background: 'var(--sur)',
        border: '1px solid var(--bd)',
        borderRadius: '12px',
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        gap: '9px',
      }}
    >
      {/* Fila superior: avatar, nombre/email, botón eliminar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
        {/* Avatar con iniciales */}
        <div
          aria-hidden="true"
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'var(--as)',
            border: '2px solid var(--ac)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 700,
            color: 'var(--ac)',
            fontFamily: 'var(--font-display)',
            flexShrink: 0,
          }}
        >
          {initials}
        </div>

        {/* Nombre y email */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: '14px',
              fontWeight: 700,
              fontFamily: 'var(--font-display)',
              color: 'var(--tp)',
            }}
          >
            {entry.fullName}
          </div>
          <div
            style={{
              fontSize: '12px',
              color: 'var(--ts)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {entry.email}
          </div>
        </div>

        {/* Botón eliminar */}
        <button
          onClick={handleDelete}
          aria-label={`Eliminar respuesta de ${entry.fullName}`}
          title="Eliminar"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--tm)',
            fontSize: '13px',
            padding: '4px 6px',
            borderRadius: '5px',
            flexShrink: 0,
            transition: 'color var(--tr)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--er)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--tm)')}
        >
          ✕
        </button>
      </div>

      {/* Chips de metadatos */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
        <Chip>📞 {entry.phone}</Chip>
        {entry.company && <Chip>🏢 {entry.company}</Chip>}
        <Chip>🕐 {dateFormatted}</Chip>
      </div>

      {/* Mensaje con línea acento */}
      <div
        style={{
          fontSize: '13px',
          color: 'var(--ts)',
          lineHeight: '1.6',
          borderLeft: '3px solid var(--ac)',
          paddingLeft: '10px',
        }}
      >
        {entry.message}
      </div>
    </div>
  )
}

/** Chip de información dentro de la tarjeta */
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        background: 'var(--elv)',
        border: '1px solid var(--bd)',
        borderRadius: '20px',
        padding: '3px 9px',
        fontSize: '11px',
        color: 'var(--ts)',
      }}
    >
      {children}
    </span>
  )
}
