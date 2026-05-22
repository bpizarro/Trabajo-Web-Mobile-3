/**
 * App.tsx
 * Componente raíz de la aplicación.
 *
 * Responsabilidades:
 * - Orquestar la visibilidad del modal y las vistas.
 * - Conectar el estado de autenticación con la navegación.
 *
 * El árbol de providers está en main.tsx para mantener
 * App limpio y enfocado en la composición de UI.
 */

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Header } from '@/components/layout/Header'
import { LoginModal } from '@/components/layout/LoginModal'
import { SurveyForm } from '@/components/form/SurveyForm'
import { AdminPanel } from '@/components/admin/AdminPanel'

export function App() {
  const { isAdmin } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      {/* Modal de login */}
      <LoginModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => setIsModalOpen(false)}
      />

      {/* Layout principal */}
      <div>
        <Header onAdminClick={() => setIsModalOpen(true)} />

        <main
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            padding: '0 16px 60px',
          }}
        >
          {/* Hero */}
          <div
            style={{
              textAlign: 'center',
              padding: '40px 0 0',
              position: 'relative',
            }}
          >
            {/* Glow decorativo */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '280px',
                height: '80px',
                background: 'var(--ac)',
                borderRadius: '50%',
                filter: 'blur(80px)',
                opacity: 0.12,
                pointerEvents: 'none',
              }}
            />

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(22px, 5vw, 36px)',
                letterSpacing: '-1px',
                lineHeight: 1.1,
                marginBottom: '10px',
                color: 'var(--tp)',
              }}
            >
              {isAdmin ? 'Panel de Administrador' : 'Tu opinión nos importa'}
            </h1>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--ts)',
                lineHeight: 1.7,
                maxWidth: '400px',
                margin: '0 auto',
              }}
            >
              {isAdmin
                ? 'Visualiza, gestiona y descarga todas las respuestas recibidas.'
                : 'Completa el formulario y nuestro equipo se pondrá en contacto pronto.'}
            </p>
          </div>

          {/* Vista según autenticación */}
          {isAdmin ? (
            <AdminPanel isActive={isAdmin} />
          ) : (
            <SurveyForm />
          )}

          {/* Footer */}
          <footer
            style={{
              textAlign: 'center',
              padding: '20px 0 0',
              borderTop: '1px solid var(--bd)',
              marginTop: '32px',
            }}
          >
            <p
              style={{
                fontSize: '11px',
                color: 'var(--tm)',
                letterSpacing: '0.3px',
              }}
            >
              NexoForm · Datos almacenados localmente en tu dispositivo · 2026
            </p>
          </footer>
        </main>
      </div>
    </>
  )
}
