/**
 * main.tsx
 * Punto de entrada de la aplicación React.
 *
 * Árbol de providers (de más externo a más interno):
 * 1. ThemeProvider – tema visual global
 * 2. AuthProvider  – estado de autenticación
 *
 * El orden importa: AuthProvider podría necesitar el tema
 * en el futuro (ej. emails temáticos), por eso va dentro.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@/context/ThemeContext'
import { AuthProvider } from '@/context/AuthContext'
import { App } from './App'
import './index.css'

// Obtener el elemento root del DOM
const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error(
    '[main.tsx] No se encontró el elemento #root en el DOM. ' +
    'Verifica que index.html tenga <div id="root"></div>.'
  )
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
)
