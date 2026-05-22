/**
 * components/admin/AdminPanel.tsx
 * Panel de administración de respuestas.
 * Muestra el listado de entradas, contador, y acciones de descarga.
 */

import { useAdmin } from '@/hooks/useAdmin'
import { EntryCard } from './EntryCard'
import { DownloadFormat } from '@/types'

interface AdminPanelProps {
  /** Indica si el panel está activo para disparar la carga de datos */
  isActive: boolean
}

export function AdminPanel({ isActive }: AdminPanelProps) {
  const { entries, isLoading, handleDelete, handleDownload } = useAdmin(isActive)

  return (
    <div
      className="animate-fadeIn"
      style={{
        marginTop: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      }}
    >
      {/* Barra de acciones */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
          background: 'var(--sur)',
          border: '1px solid var(--bd)',
          borderRadius: '13px',
          padding: '13px 16px',
        }}
      >
        {/* Título del panel */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🛡️</span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '14px',
              color: 'var(--tp)',
            }}
          >
            Panel de Administrador
          </span>
        </div>

        {/* Acciones: contador + descargas */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ fontSize: '12px', color: 'var(--tm)' }}>
            {entries.length} respuesta{entries.length !== 1 ? 's' : ''}
          </span>

          <DownloadButton
            label="⬇️ CSV"
            format="csv"
            onDownload={handleDownload}
            disabled={entries.length === 0}
          />
          <DownloadButton
            label="⬇️ JSON"
            format="json"
            onDownload={handleDownload}
            disabled={entries.length === 0}
          />
        </div>
      </div>

      {/* Lista de entradas */}
      {isLoading ? (
        <div style={emptyStyle}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>⏳</div>
          <p>Cargando respuestas…</p>
        </div>
      ) : entries.length === 0 ? (
        <div style={emptyStyle}>
          <div style={{ fontSize: '34px', marginBottom: '10px' }}>📭</div>
          <p>Aún no hay respuestas guardadas.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {entries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}

/** Botón de descarga reutilizable */
interface DownloadButtonProps {
  label: string
  format: DownloadFormat
  onDownload: (format: DownloadFormat) => void
  disabled: boolean
}

function DownloadButton({ label, format, onDownload, disabled }: DownloadButtonProps) {
  return (
    <button
      onClick={() => onDownload(format)}
      disabled={disabled}
      style={{
        background: 'var(--as)',
        border: '1px solid var(--bd)',
        borderRadius: '7px',
        padding: '5px 11px',
        fontSize: '12px',
        fontWeight: 600,
        color: disabled ? 'var(--tm)' : 'var(--ac)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'var(--font-body)',
        transition: 'background var(--tr)',
        opacity: disabled ? 0.5 : 1,
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.background = 'var(--elv)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--as)'
      }}
    >
      {label}
    </button>
  )
}

/** Estilos para el estado vacío o cargando */
const emptyStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: '40px 20px',
  color: 'var(--tm)',
  fontSize: '14px',
}
