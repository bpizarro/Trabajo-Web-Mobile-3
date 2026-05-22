# NexoForm

> Aplicación web PWA de encuestas y solicitudes de servicio, con panel de administrador protegido, soporte dark/light mode, descarga de datos en CSV y JSON, y almacenamiento local persistente.

---

## Índice

1. [Descripción general](#descripción-general)
2. [Tecnologías](#tecnologías)
3. [Arquitectura y estructura de carpetas](#arquitectura-y-estructura-de-carpetas)
4. [Instalación y uso](#instalación-y-uso)
5. [Variables de entorno](#variables-de-entorno)
6. [Funcionalidades](#funcionalidades)
7. [Seguridad](#seguridad)
8. [PWA e instalación en móvil](#pwa-e-instalación-en-móvil)
9. [Decisiones técnicas y trade-offs](#decisiones-técnicas-y-trade-offs)
10. [Limitaciones conocidas](#limitaciones-conocidas)
11. [Scripts disponibles](#scripts-disponibles)
12. [Convenciones de código](#convenciones-de-código)

---

## Descripción general

NexoForm es una Progressive Web App (PWA) construida con **React 18 + TypeScript + Vite**. Permite a usuarios anónimos completar un formulario de encuesta/solicitud cuyas respuestas se persisten en `localStorage`. Un administrador puede autenticarse para ver, eliminar y descargar todas las respuestas en formato JSON o CSV.

La aplicación es completamente **offline-capable** gracias al Service Worker generado por `vite-plugin-pwa`, y puede instalarse en dispositivos móviles y de escritorio como una app nativa desde el navegador.

---

## Tecnologías

| Tecnología          | Versión  | Rol                                     |
|---------------------|----------|-----------------------------------------|
| React               | 18.3.x   | UI declarativa con hooks                |
| TypeScript          | 5.4.x    | Tipado estático                         |
| Vite                | 5.3.x    | Bundler y servidor de desarrollo        |
| vite-plugin-pwa     | 0.20.x   | Generación de Service Worker + manifest |
| CSS Variables       | —        | Sistema de tokens de diseño             |
| localStorage        | —        | Persistencia local de datos             |

Sin dependencias de UI externas (sin Material UI, sin Tailwind). Todo el diseño es CSS-in-JS con variables nativas.

---

## Arquitectura y estructura de carpetas

La aplicación sigue una **arquitectura por capas** que separa claramente presentación, lógica de negocio, acceso a datos y tipos.

```
nexoform/
├── public/
│   └── favicon.svg              # Ícono de la app
├── src/
│   ├── components/              # CAPA DE PRESENTACIÓN
│   │   ├── ui/                  # Componentes atómicos reutilizables
│   │   │   ├── ThemeToggle.tsx  # Toggle light/dark
│   │   │   ├── Feedback.tsx     # Mensajes de error/éxito
│   │   │   └── FormField.tsx    # Campo de formulario genérico
│   │   ├── form/
│   │   │   └── SurveyForm.tsx   # Formulario de encuesta
│   │   ├── admin/
│   │   │   ├── AdminPanel.tsx   # Panel de administrador
│   │   │   └── EntryCard.tsx    # Tarjeta de respuesta
│   │   └── layout/
│   │       ├── Header.tsx       # Cabecera sticky
│   │       └── LoginModal.tsx   # Modal de autenticación
│   ├── context/                 # ESTADO GLOBAL
│   │   ├── ThemeContext.tsx      # Tema visual (light/dark)
│   │   └── AuthContext.tsx      # Autenticación admin
│   ├── hooks/                   # LÓGICA DE NEGOCIO UI
│   │   ├── useSurveyForm.ts     # Estado y envío del formulario
│   │   └── useAdmin.ts          # Carga y gestión del panel admin
│   ├── services/                # CAPA DE ACCESO A DATOS
│   │   ├── storageService.ts    # Abstracción de localStorage
│   │   ├── surveyService.ts     # CRUD de entradas + descarga
│   │   └── authService.ts       # Validación de credenciales
│   ├── types/
│   │   └── index.ts             # Tipos TypeScript globales
│   ├── constants/
│   │   └── index.ts             # Constantes de la aplicación
│   ├── utils/
│   │   ├── validation.ts        # Validación de formulario
│   │   └── formatters.ts        # Formateo de fechas e iniciales
│   ├── App.tsx                  # Componente raíz
│   ├── main.tsx                 # Punto de entrada + providers
│   └── index.css                # Tokens de diseño globales (CSS vars)
├── index.html                   # HTML shell
├── vite.config.ts               # Configuración de Vite + PWA
├── tsconfig.json                # Configuración TypeScript
├── .env.example                 # Plantilla de variables de entorno
├── .env.local                   # Variables locales (no commitear)
├── .gitignore
└── package.json
```

### Flujo de datos

```
Usuario → Componente → Hook → Service → localStorage
                    ↑              ↓
                  Estado ← Tipos ← Datos
```

---

## Instalación y uso

### Requisitos previos

- Node.js >= 18.x
- npm >= 9.x (o pnpm/yarn equivalente)

### Pasos

```bash
# 1. Clonar el repositorio
git clone < url-del-repo >
cd nexoform

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# 4. Iniciar en desarrollo
npm run dev

# 5. Abrir en el navegador
# http://localhost:5173
```

### Build de producción

```bash
npm run build
npm run preview  # Previsualizar el build
```

### Probar con HTTPS usando `ngrok`

Para probar la PWA o instalarla desde un dispositivo remoto vía HTTPS, expón el servidor de `vite preview` con `ngrok` sin fijar un puerto: Vite puede usar `5173` por defecto o elegir otro puerto si el anterior está ocupado.

1. En una terminal, genera la build y arranca el servidor de previsualización (sin forzar puerto):

```bash
npm run build
npm run preview
```

2. Observa en la salida de `vite preview` la URL local que aparece (por ejemplo `Local: http://localhost:5173`). Usa el puerto que muestre ahí cuando inicies `ngrok` en otra terminal:

```bash
# Reemplaza <PUERTO> por el puerto que Vite imprimió (ej: 5173)
npx ngrok http <PUERTO>
```

3. Copia la URL `https://...` que `ngrok` devuelve y ábrela en tu dispositivo o navegador.

Con esto podrás probar instalación, comportamiento offline y auditorías Lighthouse sobre una URL HTTPS pública.

### Instalar `ngrok`

La forma recomendada para usar `ngrok` con este proyecto es mediante `npm`. Puedes instalarlo globalmente o usarlo sin instalación global con `npx`:

```bash
# Instalación global (recomendado para uso frecuente)
npm install -g ngrok

# Usar con npx sin instalar globalmente
npx ngrok
```

Después de instalar (o al usar por primera vez con `npx`), configura tu `authtoken`:

```bash
ngrok authtoken <TU_AUTHTOKEN>
```

Visita https://dashboard.ngrok.com/get-started/your-authtoken para obtener tu token.
---

## Variables de entorno

Crear un archivo `.env.local` en la raíz del proyecto (nunca commitear este archivo):

```env
VITE_ADMIN_USER=admin
VITE_ADMIN_PASS=nexo2026
VITE_STORAGE_KEY=nexoform_entries
VITE_THEME_KEY=nexoform_theme
```

> **⚠️ Advertencia de seguridad**: Las variables `VITE_*` se incrustan en el bundle de JavaScript en tiempo de build. Cualquier persona que inspeccione el bundle puede ver estos valores. Esta implementación es válida **solo para prototipos o uso interno**. Ver sección [Seguridad](#seguridad) para consideraciones de producción.

---

## Funcionalidades

### Para usuarios

- **Formulario responsive** con campos: nombre, email, teléfono, empresa (opcional) y mensaje.
- **Validación** en cliente antes del envío.
- **Feedback visual** inmediato (error / éxito).
- **Persistencia automática** en `localStorage` del dispositivo.
- **Toggle de tema** light/dark con preferencia del sistema operativo y persistencia.

### Para el administrador

- **Acceso protegido** con usuario y contraseña vía modal.
- **Listado de respuestas** ordenadas por fecha (más reciente primero).
- **Contador** de respuestas totales.
- **Eliminar** respuestas individuales (con confirmación).
- **Descarga en CSV** (compatible con Excel, con BOM UTF-8).
- **Descarga en JSON** (formato indentado para legibilidad).
- **Cierre de sesión** con un clic desde el header.

### Credenciales por defecto

```
Usuario: admin
Contraseña: nexo2026
```

---

## Seguridad

### Estado actual (prototipo)

- Las credenciales del admin se comparan **en el cliente**.
- Están disponibles en el bundle de JS (variables `VITE_*`).
- No hay HTTPS obligatorio, rate limiting, ni bloqueo por intentos fallidos.

### Para producción real se recomienda

1. **Backend de autenticación**: endpoint POST `/api/auth/login` que valide contra una base de datos.
2. **JWT o sesiones HTTP-only**: nunca almacenar tokens en `localStorage`.
3. **Hashing de contraseñas**: usar `bcrypt` o `argon2` en el servidor.
4. **Rate limiting**: bloquear IPs después de N intentos fallidos.
5. **HTTPS**: obligatorio para PWA y protección en tránsito.
6. **Base de datos**: reemplazar `localStorage` por PostgreSQL, MongoDB u otro.

---

## PWA e instalación en móvil

NexoForm está configurada como Progressive Web App:

- **Service Worker** con estrategia `CacheFirst` para assets estáticos.
- **Web App Manifest** con íconos, colores y modo `standalone`.
- **Funciona offline** una vez cargada la primera vez.

### ¿Cuenta como una aplicación?

Sí. Cuando abres NexoForm desde el navegador sigue siendo una web, pero al instalarla como PWA o agregarla a la pantalla de inicio se comporta como una aplicación. En ese modo puede abrirse fuera del navegador normal y, una vez cacheada, seguir funcionando offline.

Si entras desde Google o desde un enlace normal, sigue viéndose como una página web dentro del navegador. Eso no le quita la condición de PWA; solo significa que todavía no está instalada como app.

### Cómo probar offline en el celular

1. Abrir la URL desde el navegador del celular.
2. Ir a los 3 puntos y presionar en el **logo de descarga** y abrirlo.
3. Abrirla y darle en **Agregar a pantalla de inicio**, y abrirla por primera vez con conexión para que el Service Worker y los assets queden en caché.
4. Activar modo avión o cortar Internet y volver a abrirla desde el ícono instalado.

Si la app carga correctamente en ese estado, entonces el modo offline está funcionando.

### Instalar en iOS (Safari)

1. Abrir la URL en Safari.
2. Tocar el botón **Compartir** (cuadrado con flecha).
3. Seleccionar **"Agregar a pantalla de inicio"**.

### Instalar en Android (Chrome)

1. Abrir la URL en Chrome.
2. Tocar el menú (⋮) o el banner de instalación.
3. Seleccionar **"Agregar a pantalla de inicio"** o **"Instalar app"**.

### Instalar en Desktop (Chrome/Edge)

1. Hacer clic en el ícono de instalación en la barra de direcciones.
2. Confirmar la instalación.

### Uso con `ngrok` en móvil

Cuando expones la app con `ngrok`, puede aparecer una página intermedia de seguridad o aviso en el celular antes de dejar entrar al túnel. Esto es normal en algunos navegadores y planes gratuitos de `ngrok`.

- En PC puede abrir directo si ya pasaste la verificación o si el navegador guardó la sesión.
- En móvil puede mostrarse la pantalla propia de `ngrok` antes de tu sitio.
- Si aparece ese aviso, busca la opción para continuar al sitio.

Si necesitas evitar esa interstitial con mayor consistencia, conviene usar un dominio propio, un despliegue en `Vercel` o `Netlify`, o un plan de `ngrok` que permita controlar mejor ese flujo.

---

## Decisiones técnicas y trade-offs

### ¿Por qué CSS Variables en lugar de una librería de estilos?

**Decisión**: Estilos inline con CSS variables nativas.

**Ventajas**: Sin dependencias externas, control total del diseño, cambio de tema sin re-render de React (solo cambia un atributo en `<html>`), bundle más pequeño.

**Desventaja**: No hay autocompletado de clases CSS, más verboso que Tailwind.

### ¿Por qué localStorage en lugar de IndexedDB?

**Decisión**: `localStorage` a través de `storageService`.

**Ventajas**: API síncrona simple, suficiente para el volumen esperado (~100 entradas), fácil de testear.

**Desventajas**: Límite de ~5MB, bloquea el hilo principal, no funciona en Service Workers.

**Migración futura**: La capa `storageService` permite cambiar a IndexedDB sin modificar los servicios ni los hooks.

### ¿Por qué Context API y no Zustand/Redux?

**Decisión**: `useContext` + `useState` nativos de React.

**Justificación**: El estado global es mínimo (tema + autenticación). Agregar Zustand sería over-engineering. Si la app crece con múltiples módulos, migrar a Zustand es trivial dado que los hooks ya están separados.

---

## Limitaciones conocidas

| Limitación | Descripción | Solución futura |
|---|---|---|
| Seguridad de credenciales | Credenciales visibles en bundle | Backend de autenticación |
| Capacidad de storage | ~5MB límite de localStorage | IndexedDB o backend |
| Sin sincronización | Datos solo en el dispositivo actual | API REST + base de datos |
| Descarga en iOS Safari | `createObjectURL` puede no disparar descarga | Fallback con data URI |
| Sin tests unitarios | No se incluyeron tests en esta versión | Vitest + Testing Library |

---

## Scripts disponibles

```bash
npm run dev        # Servidor de desarrollo con HMR
npm run build      # Build de producción (TypeScript + Vite)
npm run preview    # Previsualizar el build de producción
npm run lint       # Análisis estático con ESLint
```

---

## Convenciones de código

- **Idioma de comentarios**: Español.
- **Nombres de variables/funciones**: camelCase en inglés (convención de JavaScript/TypeScript).
- **Nombres de componentes**: PascalCase.
- **Tipos**: interfaces para objetos, `type` para unions y aliases.
- **Imports**: siempre con alias `@/` para rutas internas (evita `../../`).
- **Un componente por archivo**: facilita el tree-shaking y el testing.
- **Separación de responsabilidades**: componentes solo renderizan, hooks manejan estado, services manejan datos.

---

## Licencia

MIT © 2026 NexoForm
