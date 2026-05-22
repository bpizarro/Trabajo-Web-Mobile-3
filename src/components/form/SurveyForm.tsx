/**
 * components/form/SurveyForm.tsx
 * Formulario principal de encuesta y solicitud de servicio.
 * Delega toda la lógica al hook useSurveyForm.
 */

import { useSurveyForm } from '@/hooks/useSurveyForm'
import { FormField } from '@/components/ui/FormField'
import { Feedback } from '@/components/ui/Feedback'
import { formatHeroBadgeDate } from '@/utils/formatters'

export function SurveyForm() {
  const { formState, feedback, handleChange, handleSubmit } = useSurveyForm()
  const isLoading = feedback.type === 'loading'

  return (
    <div
      className="animate-fadeIn"
      style={{
        background: 'var(--sur)',
        borderRadius: '18px',
        padding: '28px',
        border: '1px solid var(--bd)',
        boxShadow: 'var(--sh)',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        marginTop: '28px',
      }}
    >
      {/* Encabezado de la card */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '11px' }}>
        <span style={{ fontSize: '24px', flexShrink: 0, marginTop: '2px' }}>📋</span>
        <div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '18px',
              letterSpacing: '-0.3px',
              marginBottom: '4px',
              color: 'var(--tp)',
            }}
          >
            Encuesta &amp; Solicitud de Servicio
          </div>
          <div style={{ fontSize: '13px', color: 'var(--ts)' }}>
            Cuéntanos sobre ti y cómo podemos ayudarte.
          </div>
        </div>
      </div>

      {/* Badge de fecha */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'var(--as)',
          border: '1px solid var(--bd)',
          borderRadius: '8px',
          padding: '6px 11px',
          alignSelf: 'flex-start',
        }}
      >
        <span style={{ fontSize: '13px' }}>📅</span>
        <span
          style={{
            fontSize: '12px',
            color: 'var(--ac)',
            fontWeight: 600,
            textTransform: 'capitalize',
          }}
        >
          {formatHeroBadgeDate()}
        </span>
      </div>

      {/* Grilla de campos */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
          gap: '14px',
        }}
      >
        <FormField
          label="Nombre completo"
          required
          type="text"
          placeholder="Ej. Ana González"
          value={formState.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          disabled={isLoading}
          autoComplete="name"
        />
        <FormField
          label="Correo electrónico"
          required
          type="email"
          placeholder="ana@ejemplo.com"
          value={formState.email}
          onChange={(e) => handleChange('email', e.target.value)}
          disabled={isLoading}
          autoComplete="email"
        />
        <FormField
          label="Teléfono"
          required
          type="tel"
          placeholder="+56 9 1234 5678"
          value={formState.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          disabled={isLoading}
          autoComplete="tel"
        />
        <FormField
          label="Empresa"
          optional
          type="text"
          placeholder="Nombre de tu empresa"
          value={formState.company}
          onChange={(e) => handleChange('company', e.target.value)}
          disabled={isLoading}
          autoComplete="organization"
        />
      </div>

      {/* Textarea del mensaje */}
      <FormField
        as="textarea"
        label="Mensaje / Descripción del servicio"
        required
        placeholder="Describe tu solicitud o comparte tus respuestas…"
        value={formState.message}
        onChange={(e) => handleChange('message', e.target.value)}
        disabled={isLoading}
      />

      {/* Feedback de error o éxito */}
      <Feedback state={feedback} />

      {/* Botón enviar */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            background: 'var(--ac)',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            padding: '11px 22px',
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: 'var(--font-display)',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'background var(--tr)',
            opacity: isLoading ? 0.6 : 1,
          }}
          onMouseEnter={(e) => {
            if (!isLoading) e.currentTarget.style.background = 'var(--ach)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--ac)'
          }}
        >
          {isLoading ? 'Guardando…' : 'Enviar respuesta'}
          {!isLoading && (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7h10M7.5 3l4 4-4 4"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
