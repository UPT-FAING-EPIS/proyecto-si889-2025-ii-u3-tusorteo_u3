import LoginForm from '@/modules/auth/components/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 relative overflow-hidden px-4 py-8">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center mb-8 group">
          <img 
            src="/logo.png" 
            alt="Logo tusorteo" 
            className="w-45 h-auto sm:w-50 md:w-53 group-hover:scale-105 transition-transform duration-300" 
          />
        </Link>

        {/* Card */}
        <div className="bg-neutral-900 bg-opacity-80 border border-neutral-700/50 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-10 transition-all duration-300 hover:border-purple-700/50">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
              Bienvenido de nuevo
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Ingresa a tu cuenta para continuar
            </p>
          </div>

          {/* Form */}
          <LoginForm />

          {/* Enlaces mínimos se muestran dentro del formulario */}
        </div>

        {/* Back to home */}
        <Link
          href="/"
          className="flex items-center justify-center gap-2 text-gray-400 hover:text-purple-400 transition-colors duration-300 mt-6 text-sm sm:text-base"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
