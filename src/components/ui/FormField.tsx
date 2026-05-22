/**
 * components/ui/FormField.tsx
 * Campo de formulario reutilizable con label, input/textarea
 * y soporte para campos opcionales y requeridos.
 */

import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

/** Estilos compartidos para input y textarea */
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 13px',
  background: 'var(--bg)',
  border: '1.5px solid var(--bd)',
  borderRadius: '9px',
  fontSize: '14px',
  color: 'var(--tp)',
  fontFamily: 'var(--font-body)',
  outline: 'none',
  transition: 'border 0.2s, box-shadow 0.2s',
}

interface BaseFieldProps {
  label: string
  required?: boolean
  optional?: boolean
}

interface InputFieldProps
  extends BaseFieldProps,
    InputHTMLAttributes<HTMLInputElement> {
  as?: 'input'
}

interface TextareaFieldProps
  extends BaseFieldProps,
    TextareaHTMLAttributes<HTMLTextAreaElement> {
  as: 'textarea'
}

type FormFieldProps = InputFieldProps | TextareaFieldProps

/** Maneja el efecto focus con inline styles (compatible con CSS variables) */
function handleFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = 'var(--bdf)'
  e.currentTarget.style.boxShadow = '0 0 0 3px var(--as)'
}

function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = 'var(--bd)'
  e.currentTarget.style.boxShadow = 'none'
}

export function FormField(props: FormFieldProps) {
  const { label, required, optional, as, ...rest } = props

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {/* Label */}
      <label
        style={{
          fontSize: '11px',
          fontWeight: 600,
          color: 'var(--ts)',
          letterSpacing: '0.3px',
          textTransform: 'uppercase',
        }}
      >
        {label}
        {required && (
          <span style={{ color: 'var(--ac)', marginLeft: '3px' }}>*</span>
        )}
        {optional && (
          <span
            style={{
              color: 'var(--tm)',
              fontWeight: 400,
              fontSize: '10px',
              textTransform: 'none',
              marginLeft: '4px',
            }}
          >
            (opcional)
          </span>
        )}
      </label>

      {/* Input o Textarea */}
      {as === 'textarea' ? (
        <textarea
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          style={{
            ...inputStyle,
            resize: 'vertical',
            minHeight: '100px',
            lineHeight: '1.6',
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      ) : (
        <input
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          style={inputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )}
    </div>
  )
}
