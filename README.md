# Landing Pages Platform

Plataforma multi-cliente para gestionar landing pages personalizables. Cada cliente tiene su propia landing con branding, colores, logos y URL del bot configurables desde el backoffice.

## Stack

- Next.js 16 (App Router)
- Tailwind CSS
- Shadcn/ui (backoffice)
- Drizzle ORM + SQLite
- UploadThing (logos, favicons)
- Framer Motion
- React Hook Form + Zod

## Setup

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Copiar `.env.example` a `.env` y completar:

```bash
cp .env.example .env
```

- **UPLOADTHING_TOKEN**: Obtener en [uploadthing.com](https://uploadthing.com). Crear una app y copiar el token.
- **ADMIN_USER**: Usuario para el backoffice (ej: `admin`)
- **ADMIN_PASSWORD_HASH**: Hash bcrypt de la contraseña. Generar con:

```bash
npm run admin:hash -- "tu-contraseña-segura"
```

(Copia el hash que se imprime y pégalo en .env después del `=`)

### 3. Inicializar base de datos

```bash
npm run db:push
```

### 4. Ejecutar en desarrollo

**Opción simple (script start/stop):**
```bash
npm run platform:start   # Inicia la plataforma
npm run platform:stop    # Detiene todo (no deja procesos colgados)
npm run platform:status  # Ver estado
npm run platform:restart # Reiniciar
```

**O manualmente:**
```bash
npm run dev
```

- App: http://localhost:3000
- Backoffice: http://localhost:3000/admin
- Landing Home Depot: http://localhost:3000/homedepot (ejecutar `npm run db:seed-homedepot` para crearla)

## Estructura de rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Página principal con lista de landings |
| `/admin` | Login del backoffice |
| `/admin/dashboard` | Lista de clientes |
| `/admin/clients/new` | Crear cliente |
| `/admin/clients/[id]` | Editar branding, theme y contenido |
| `/[clientSlug]` | Landing pública del cliente |

## Flujo de uso

1. Iniciar sesión en `/admin` con las credenciales configuradas.
2. Crear un cliente desde el dashboard (nombre + slug).
3. Editar el cliente: subir logo, favicon, configurar colores, título, subtítulo y URL del bot.
4. La landing estará disponible en `/{slug}` (ej: `/homedepot`).
