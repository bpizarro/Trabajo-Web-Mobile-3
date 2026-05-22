/**
 * services/authService.ts
 * Lógica de autenticación del administrador.
 *
 * ADVERTENCIA DE SEGURIDAD:
 * Esta implementación compara credenciales en el cliente,
 * lo cual es inherentemente inseguro para producción real.
 * Las credenciales en VITE_* son visibles en el bundle.
 *
 * Para producción se recomienda:
 * 1. Validación en un backend (JWT, sesiones HTTP-only).
 * 2. Rate limiting en el servidor.
 * 3. bcrypt o argon2 para hashing de contraseñas.
 * 4. HTTPS obligatorio.
 *
 * Esta implementación es adecuada únicamente para
 * prototipos o apps de uso interno en redes privadas.
 */

import { ADMIN_CREDENTIALS } from '@/constants'

/**
 * Valida credenciales del administrador.
 * La comparación es case-sensitive por diseño.
 *
 * Simula un delay asíncrono de 500ms para:
 * 1. Dar feedback visual de "cargando".
 * 2. Mitigar timing attacks triviales (sin ser una
 *    defensa real, ya que el delay es fijo).
 */
export async function validateAdminCredentials(
  user: string,
  pass: string
): Promise<boolean> {
  // Simular latencia de verificación
  await new Promise((resolve) => setTimeout(resolve, 500))
  return user === ADMIN_CREDENTIALS.user && pass === ADMIN_CREDENTIALS.pass
}
