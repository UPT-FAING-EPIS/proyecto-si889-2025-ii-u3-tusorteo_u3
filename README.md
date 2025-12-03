# 🎯 TuSorteo - Plataforma de Sorteos Interactivos

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-2.58.0-3ECF8E?style=for-the-badge&logo=supabase)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

</div>

---

## 🎓 Universidad Privada de Tacna
**Facultad de Ingeniería - Escuela Profesional de Ingeniería de Sistemas**

**Curso:** Patrones de Software  
**Docente:** Mag. Patrick Cuadros Quiroga

---

## 👥 Integrantes del Equipo
- **Ancco Suaña, Bruno Enrique** (2023077472)
- **Camac Melendez, Cesar Nikolas** (2022074262)
- **Rivera Muñoz, Augusto Joaquin** (2022073505)

---

## 🎨 Acerca del Proyecto

**TuSorteo** es una aplicación web diseñada para facilitar la creación y gestión de sorteos simples y dinámicos, orientada específicamente a concursos presenciales. El sistema permite a los organizadores configurar los sorteos, mientras que los participantes pueden unirse registrándose o utilizando un código de sorteo generado. La plataforma soporta la selección de un único ganador o de una determinada cantidad de ganadores. Al ser una aplicación web, está optimizada con un diseño adaptativo para funcionar correctamente en dispositivos móviles.

---
## 🎯 Objetivo
- Desarrollar e implementar una plataforma web (TuSorteo) que automatice, simplifique y dinamice la gestión de sorteos para eventos y concursos presenciales.

## 🎯 Objetivos Especificos
- Crear un módulo de autenticación y gestión de usuarios para los organizadores de sorteos.
- Implementar la funcionalidad de creación de sorteos, permitiendo la configuración de uno o "n" ganadores.
- Asegurar que la interfaz de usuario sea completamente adaptativa (responsive) para una correcta visualización y uso en dispositivos móviles.
- Implementar la lógica de selección aleatoria de ganadores de forma transparente y fiable.

---

## 📱 Visitar Pagina: [TuSorteo](https://tusorteo.vercel.app/)

---

### ✨ Puntos Destacados

- 🎭 **Interfaz Moderna**: Diseño oscuro con gradientes animados y efectos visuales atractivos
- ⚡ **Tiempo Real**: Sincronización instantánea usando Firebase Firestore
- 🔒 **Autenticación Segura**: Sistema de usuarios completo con Supabase
- 📱 **Responsive**: Funciona perfectamente en móviles, tablets y escritorio
- 🎯 **PIN System**: Sistema de códigos de 6 dígitos para unirse a sorteos
- 🏆 **Resultados Justos**: Selección aleatoria garantizada con RNG criptográfico

---

## 🚀 Características

### Para Organizadores (Host)

- ✅ **Crear Sorteos en Vivo**: Configura sorteos personalizados con nombre único
- 👥 **Gestión de Participantes**: 
  - Ver lista en tiempo real
  - Eliminar participantes manualmente
  - Contador automático de participantes
- 🎲 **Selección de Ganadores**:
  - Algoritmo de selección aleatoria
  - Opción de múltiples ganadores
  - Historial de ganadores
- 📊 **Estados del Sorteo**:
  - `waiting`: Esperando participantes
  - `running`: Sorteo activo
  - `finished`: Finalizado con ganadores
  - `cancelled`: Cancelado por el host
- 🔄 **Persistencia**: Los sorteos se restauran automáticamente si recargas la página

### Para Participantes

- 🔑 **Unirse con PIN**: Ingresa el código de 6 dígitos compartido por el organizador
- 👀 **Visualización en Tiempo Real**:
  - Ver otros participantes conectados
  - Estado del sorteo actualizado al instante
  - Notificación instantánea de ganadores
- 🎊 **Modal de Resultados**: Animación especial al ganar
- 📴 **Salir en Cualquier Momento**: Abandonar el sorteo cuando lo desees

### Características Técnicas

- 🔐 **Autenticación Completa**:
  - Registro de usuarios
  - Inicio de sesión
  - Cierre de sesión
  - Protección de rutas
- 💾 **Base de Datos en Tiempo Real**:
  - Firestore para sorteos en vivo
  - Supabase para gestión de usuarios
  - Transacciones atómicas
- 🎨 **UI/UX de Vanguardia**:
  - Animaciones suaves
  - Feedback visual
  - Estados de carga
  - Manejo de errores

---

## 📦 Instalación

### Prerrequisitos

- **Node.js** >= 18.x
- **npm** o **yarn** o **pnpm**
- Cuenta de **Firebase** (para Firestore)
- Cuenta de **Supabase** (para Auth)

### Pasos de Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/UPT-FAING-EPIS/proyecto-si889-2025-ii-u2-tusorteo.git
cd proyecto-si889-2025-ii-u2-tusorteo
```

2. **Instalar dependencias**

```bash
npm install
# o
yarn install
# o
pnpm install
```

3. **Configurar variables de entorno** (ver [Configuración](#-configuración))

4. **Ejecutar en modo desarrollo**

```bash
npm run dev
```

5. **Abrir en el navegador**

```
http://localhost:3000
```

---

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=tu_measurement_id

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

### Configuración de Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilita **Firestore Database**
3. Configura las reglas de seguridad:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /live_draws/{drawId} {
      allow read: if true; // Cualquiera puede leer sorteos
      allow create: if request.auth != null; // Solo usuarios autenticados pueden crear
      allow update: if request.auth != null && 
                      (request.auth.uid == resource.data.creatorId || 
                       request.resource.data.diff(resource.data).affectedKeys()
                         .hasOnly(['participants', 'currentWin', 'winners']));
      allow delete: if request.auth != null && request.auth.uid == resource.data.creatorId;
    }
  }
}
```

### Configuración de Supabase

1. Crea un proyecto en [Supabase](https://supabase.com/)
2. Crea la tabla `users`:

```sql
CREATE TABLE users (
  id UUID REFERENCES auth.users PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON users FOR UPDATE
  USING (auth.uid() = id);
```

---

## 💻 Uso

### Como Organizador (Host)

1. **Registrarse/Iniciar Sesión**
   - Navega a `/register` o `/login`
   - Completa el formulario de autenticación

2. **Crear un Sorteo**
   - Ve a "Crear sorteo en vivo" desde la página principal
   - Ingresa un nombre para tu sorteo (mínimo 3 caracteres)
   - Click en "Crear Sorteo"

3. **Compartir el PIN**
   - Comparte el código de 6 dígitos con tus participantes
   - El PIN se muestra en grande en la parte superior

4. **Iniciar el Sorteo**
   - Espera a que se unan los participantes
   - Click en "Iniciar Sorteo" cuando estés listo

5. **Elegir Ganadores**
   - Click en "Elegir Ganador" para seleccionar aleatoriamente
   - Puedes elegir múltiples ganadores si lo deseas
   - Los ganadores se muestran en un modal con confetti 🎉

6. **Finalizar**
   - Click en "Finalizar Sorteo" cuando hayas terminado
   - Los participantes verán los resultados finales

### Como Participante

1. **Unirse al Sorteo**
   - Ve a "Unirse a un sorteo" desde la página principal
   - Ingresa el PIN de 6 dígitos proporcionado por el organizador
   - Ingresa tu nombre
   - Click en "Unirse al Sorteo"

2. **Esperar Resultados**
   - Verás la lista de participantes en tiempo real
   - El estado del sorteo se actualiza automáticamente

3. **Ver Resultados**
   - Si ganas, verás un modal especial con animación 🎊
   - Si no ganas, verás quiénes fueron los ganadores

---

## 📂 Estructura del Proyecto

```
proyecto-si889-2025-ii-u2-tusorteo/
├── public/                          # Archivos estáticos
├── docs/                            # Documentación adicional
│   └── media/                       # Imágenes y recursos
├── src/
│   ├── app/                         # App Router de Next.js
│   │   ├── globals.css              # Estilos globales
│   │   ├── layout.tsx               # Layout principal
│   │   ├── page.tsx                 # Página de inicio (landing)
│   │   ├── login/                   # Ruta de inicio de sesión
│   │   ├── register/                # Ruta de registro
│   │   ├── profile/                 # Perfil de usuario
│   │   └── modalities/
│   │       ├── live-draw/           # Crear sorteo (host)
│   │       └── join-live-draw/      # Unirse a sorteo (participant)
│   │
│   ├── config/
│   │   └── firebaseConfig.ts        # Configuración de Firebase
│   │
│   ├── modules/                     # Módulos de la aplicación
│   │   ├── auth/                    # Módulo de autenticación
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   └── ProtectedRoute.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useGetUser.ts
│   │   │   │   ├── useLogin.ts
│   │   │   │   ├── useLogout.ts
│   │   │   │   └── useRegister.ts
│   │   │   └── services/
│   │   │       ├── authService.ts
│   │   │       ├── getUserService.ts
│   │   │       └── supabaseClient.ts
│   │   │
│   │   ├── common/                  # Componentes comunes
│   │   │   ├── Header.tsx
│   │   │   ├── HeaderGate.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── FooterGate.tsx
│   │   │
│   │   ├── landing/                 # Componentes del landing
│   │   │   └── components/
│   │   │       ├── BenefitCard.tsx
│   │   │       ├── SectionHeader.tsx
│   │   │       ├── TestimonialCard.tsx
│   │   │       └── ToolCard.tsx
│   │   │
│   │   └── modalities/
│   │       └── live-draw/           # Módulo de sorteos en vivo
│   │           ├── components/
│   │           │   ├── host/        # Componentes para el host
│   │           │   │   ├── DrawCard.tsx
│   │           │   │   └── WinnerModal.tsx
│   │           │   ├── participant/ # Componentes para participantes
│   │           │   │   ├── DrawCard.tsx
│   │           │   │   └── WinnerModal.tsx
│   │           │   └── shared/
│   │           │       └── ParticipantList.tsx
│   │           ├── constants/
│   │           │   └── storageKeys.ts
│   │           ├── hooks/
│   │           │   ├── useLiveDraw.ts
│   │           │   ├── useLiveDrawHost.ts
│   │           │   └── useLiveDrawParticipant.ts
│   │           └── services/
│   │               └── liveDrawService.ts
│   │
│   └── types/                       # Definiciones de tipos TypeScript
│       ├── firebase-firestore.d.ts
│       └── firebase-modules.d.ts
│
├── .env.local                       # Variables de entorno (no incluido en git)
├── .gitignore
├── eslint.config.mjs                # Configuración de ESLint
├── next.config.ts                   # Configuración de Next.js
├── package.json
├── postcss.config.mjs               # Configuración de PostCSS
├── tsconfig.json                    # Configuración de TypeScript
├── README.md
├── REFACTOR_JOIN_LIVE_DRAW.md       # Documentación de refactorización
└── REFACTOR_LAYOUT.md               # Documentación de refactorización
```
