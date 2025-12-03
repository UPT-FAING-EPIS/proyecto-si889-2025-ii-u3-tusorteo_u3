# Next.js Project

Este es un proyecto [Next.js](https://nextjs.org) creado con [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🚀 Comenzando

### Prerrequisitos

- Node.js 18.17 o superior
- npm, yarn, pnpm, o bun

### Instalación

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   - Crea un archivo `.env.local` en la raíz del proyecto
   - Copia las variables necesarias desde `.env.example` (si existe) o configura las siguientes según tu caso:

   ```env
   # Ejemplo de variables de entorno comunes
   NEXT_PUBLIC_API_URL=tu_url_de_api_aqui
   DATABASE_URL=tu_url_de_base_de_datos
   NEXT_PUBLIC_APP_NAME=NombreDeTuApp
   # Añade otras variables que necesite tu aplicación
   ```

3. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   # o
   yarn dev
   # o
   pnpm dev
   # o
   bun dev
   ```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

Puedes comenzar a editar la página modificando `app/page.tsx`. La página se actualiza automáticamente mientras editas el archivo.

## 📁 Estructura del Proyecto

```
├── app/                 # Directorio de la aplicación (App Router)
├── public/             # Archivos estáticos
├── components/         # Componentes reutilizables
├── lib/               # Utilidades y configuraciones
├── styles/            # Archivos de estilos
└── ...config files
```

## 🛠️ Comandos Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar servidor de producción
npm start

# Linter
npm run lint

# Tests (si están configurados)
npm test
```

## 🔧 Configuración

### Variables de Entorno Requeridas

Asegúrate de configurar las siguientes variables en tu archivo `.env.local`:

```env
# URL de la API (ejemplo)
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Claves de autenticación (ejemplo)
NEXTAUTH_SECRET=tu_secreto_aqui
NEXTAUTH_URL=http://localhost:3000

# Base de datos (ejemplo)
DATABASE_URL=tu_url_de_conexion

# Servicios de terceros (ejemplo)
NEXT_PUBLIC_STRIPE_PKEY=tu_llave_publica_stripe
```

### Fuentes

Este proyecto utiliza [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) para optimizar y cargar automáticamente [Geist](https://vercel.com/font), una familia de fuentes creada por Vercel.

## 📚 Aprende Más

Para aprender más sobre Next.js, consulta los siguientes recursos:

- [Documentación de Next.js](https://nextjs.org/docs) - aprende sobre las características y API de Next.js.
- [Aprende Next.js](https://nextjs.org/learn) - un tutorial interactivo de Next.js.

Puedes revisar [el repositorio de Next.js en GitHub](https://github.com/vercel/next.js) - ¡tus comentarios y contribuciones son bienvenidos!

## 🌐 Despliegue

La forma más fácil de desplegar tu aplicación Next.js es usando [la Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) de los creadores de Next.js.

Consulta nuestra [documentación de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.

## 🐛 Solución de Problemas

### Error: Variables de entorno no definidas
- Verifica que el archivo `.env.local` exista en la raíz del proyecto
- Confirma que los nombres de las variables coincidan con los usados en el código
- Reinicia el servidor después de hacer cambios en las variables de entorno

### Error de dependencias
- Ejecuta `npm install` para reinstalar las dependencias
- Borra la carpeta `node_modules` y `package-lock.json` y ejecuta `npm install` nuevamente

