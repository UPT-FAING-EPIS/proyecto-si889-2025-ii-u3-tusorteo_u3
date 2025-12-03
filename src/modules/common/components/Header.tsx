
"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGetUser } from "@/modules/auth/hooks/useGetUser";
import { useLogout } from "@/modules/auth/hooks/useLogout";
import { useRef, useState, useEffect } from "react";

export default function Header() {
  const router = useRouter();
  const { user, loading } = useGetUser();
  const { logout } = useLogout();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const profileMenuButtonRef = useRef<HTMLButtonElement>(null);

  // Cerrar el menú al hacer click fuera
  useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
      // Cerrar menú de perfil (desktop o móvil) al hacer clic fuera, pero ignorar clics en el botón que lo abre
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        (!profileMenuButtonRef.current ||
          !profileMenuButtonRef.current.contains(event.target as Node))
      ) {
        setMenuOpen(false);
      }
      // Para el menú móvil, verificar que el click no sea en el botón ni en el menú
      if (
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target as Node) &&
        mobileMenuButtonRef.current &&
        !mobileMenuButtonRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
        // Si cerramos el menú móvil por clic externo, también cerramos el submenú de perfil si estuviera abierto
        setMenuOpen(false);
      }
    }
    if (menuOpen || mobileMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen, mobileMenuOpen]);

  async function handleLogout() {
    setMenuOpen(false);
    await logout();
  }

  return (
    <header className="sticky top-0 z-50 flex items-center px-4 sm:px-6 lg:px-10 py-4 sm:py-5 bg-neutral-900/95 backdrop-blur-md border-b border-neutral-800/50 shadow-lg">
      <Link href="/" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"> 
        <img src="/logo.png" alt="Logo tusorteo" className="w-32 sm:w-40 h-auto" />
      </Link>
      
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 gap-8">
        <Link href="/#apps" className="text-gray-300 hover:text-purple-400 transition-all text-base font-medium">Modalidades</Link>
        <Link href="/#benefits" className="text-gray-300 hover:text-purple-400 transition-all text-base font-medium">Suscripciones</Link>
        <Link href="/#testimonials" className="text-gray-300 hover:text-purple-400 transition-all text-base font-medium">Soporte</Link>
      </nav>

      <div className="ml-auto flex gap-2 sm:gap-3 items-center">
        {/* Mobile Menu Button - Mostrar siempre en móvil */}
        <button
          ref={mobileMenuButtonRef}
          className="lg:hidden text-gray-300 hover:text-purple-400 transition p-2 z-50 relative"
          onClick={(e) => {
            e.stopPropagation();
            // Toggle del menú móvil; al cerrar también cerramos cualquier submenú de perfil
            setMobileMenuOpen((prev) => {
              const next = !prev;
              if (!next) setMenuOpen(false);
              return next;
            });
          }}
          aria-label="Menú de navegación"
          aria-expanded={mobileMenuOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {loading ? (
          <div className="w-22 h-9 rounded-lg bg-neutral-900 bg-opacity-80 animate-pulse" aria-hidden="true" suppressHydrationWarning />
        ) : user ? (
          <div className="hidden lg:block relative">
            <button
              className="rounded-full border-2 border-purple-400 w-9 h-9 sm:w-11 sm:h-11 overflow-hidden shadow hover:border-purple-600 transition"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((v) => !v);
              }}
              title="Ver menú de usuario"
              ref={profileMenuButtonRef}
              aria-expanded={menuOpen}
            >
              <img
                src={user.avatar_url || "/profile.jpg"}
                alt="Foto de perfil"
                className="w-full h-full object-cover"
              />
            </button>
            {menuOpen && (
              <div ref={menuRef} className="absolute right-0 mt-2 w-56 sm:w-64 bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-xl shadow-2xl border border-neutral-700/50 z-50 py-2 backdrop-blur-md">
                <div className="px-4 py-3 border-b border-neutral-700/50">
                  <p className="text-white font-semibold text-sm truncate">{user.email}</p>
                  <p className="text-gray-400 text-xs mt-0.5">Cuenta Activa</p>
                </div>
                
                <Link 
                  href="/profile" 
                  className="w-full flex items-center gap-3 px-5 py-3 text-gray-300 hover:bg-neutral-700/50 transition-all group"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="text-purple-400 text-xl">👤</span>
                  <span className="group-hover:text-white transition-colors">Mi Perfil</span>
                </Link>
                
                <button className="w-full flex items-center gap-3 px-5 py-3 text-gray-300 hover:bg-neutral-700/50 transition-all group" disabled>
                  <span className="text-blue-400 text-xl">💳</span>
                  <span className="group-hover:text-white transition-colors">Facturación</span>
                  <span className="ml-auto text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">Pronto</span>
                </button>
                
                <button className="w-full flex items-center gap-3 px-5 py-3 text-gray-300 hover:bg-neutral-700/50 transition-all group" disabled>
                  <span className="text-green-400 text-xl">⚙️</span>
                  <span className="group-hover:text-white transition-colors">Configuración</span>
                  <span className="ml-auto text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">Pronto</span>
                </button>
                
                <div className="border-t border-neutral-700/50 my-2"></div>
                
                <button 
                  className="w-full flex items-center gap-3 px-5 py-3 text-red-400 hover:bg-red-500/10 transition-all group rounded-b-xl" 
                  onClick={handleLogout}
                >
                  <span className="text-xl">🚪</span>
                  <span className="font-medium group-hover:text-red-300 transition-colors">Cerrar Sesión</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
              href="/login"
              className="hidden lg:inline-flex bg-neutral-800/50 backdrop-blur-sm border border-neutral-600/50 text-white px-3 sm:px-5 py-2 rounded-lg text-sm sm:text-base font-semibold hover:border-purple-500/50 hover:bg-neutral-700/50 transition-all items-center justify-center min-w-[90px] sm:min-w-[120px]"
            >
              Ingresar
            </Link>
            <Link
              href="/register"
              className="hidden lg:inline-flex bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white px-3 sm:px-5 py-2 rounded-lg text-sm sm:text-base font-semibold shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105 items-center justify-center min-w-[90px] sm:min-w-[120px] border border-purple-400/20"
            >
              <span className="hidden sm:inline">Crear cuenta</span>
              <span className="sm:hidden">Crear</span>
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden absolute top-full left-0 right-0 bg-neutral-900/98 backdrop-blur-md border-b border-neutral-800/50 shadow-xl z-40"
        >
          <nav className="flex flex-col px-4 py-4 gap-1">
            <Link
              href="/#apps"
              className="text-gray-300 hover:text-purple-400 hover:bg-neutral-800/50 transition-all px-4 py-3 rounded-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Modalidades
            </Link>
            <Link
              href="/#benefits"
              className="text-gray-300 hover:text-purple-400 hover:bg-neutral-800/50 transition-all px-4 py-3 rounded-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Suscripciones
            </Link>
            <Link
              href="/#testimonials"
              className="text-gray-300 hover:text-purple-400 hover:bg-neutral-800/50 transition-all px-4 py-3 rounded-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Soporte
            </Link>

            {/* Separador */}
            <div className="border-t border-neutral-800 my-2"></div>

            {user ? (
              <>
                {/* Perfil del usuario como última opción */}
                <button
                  className="text-gray-300 hover:text-purple-400 hover:bg-neutral-800/50 transition-all px-4 py-3 rounded-lg font-medium flex items-center gap-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setMenuOpen((v) => !v);
                  }}
                  aria-expanded={menuOpen}
                >
                  <img
                    src={user.avatar_url || "/profile.jpg"}
                    alt="Foto de perfil"
                    className="w-8 h-8 rounded-full border-2 border-purple-400"
                  />
                  <span>Perfil</span>
                  <svg 
                    className={`w-5 h-5 ml-auto transition-transform ${menuOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Submenú del perfil */}
                {menuOpen && (
                  <div ref={menuRef} className="bg-neutral-800/50 rounded-lg ml-4 mt-1 mb-2 overflow-hidden">
                    <div className="px-4 py-3 border-b border-neutral-700/50">
                      <p className="text-white font-semibold text-sm truncate">{user.email}</p>
                      <p className="text-gray-400 text-xs mt-0.5">Cuenta Activa</p>
                    </div>
                    
                    <Link 
                      href="/profile" 
                      className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-neutral-700/50 transition-all group"
                      onClick={() => {
                        setMenuOpen(false);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <span className="text-purple-400 text-lg">👤</span>
                      <span className="group-hover:text-white transition-colors text-sm">Mi Perfil</span>
                    </Link>
                    
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-neutral-700/50 transition-all group" disabled>
                      <span className="text-blue-400 text-lg">💳</span>
                      <span className="group-hover:text-white transition-colors text-sm">Facturación</span>
                      <span className="ml-auto text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded">Pronto</span>
                    </button>
                    
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-neutral-700/50 transition-all group" disabled>
                      <span className="text-green-400 text-lg">⚙️</span>
                      <span className="group-hover:text-white transition-colors text-sm">Configuración</span>
                      <span className="ml-auto text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded">Pronto</span>
                    </button>
                    
                    <div className="border-t border-neutral-700/50 my-1"></div>
                    
                    <button 
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-all group" 
                      onClick={async () => {
                        setMobileMenuOpen(false);
                        await handleLogout();
                      }}
                    >
                      <span className="text-lg">🚪</span>
                      <span className="font-medium group-hover:text-red-300 transition-colors text-sm">Cerrar Sesión</span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Botones de autenticación en el menú móvil */}
                <Link
                  href="/login"
                  className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-600/50 text-white px-4 py-3 rounded-lg font-semibold hover:border-purple-500/50 hover:bg-neutral-700/50 transition-all text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Ingresar
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white px-4 py-3 rounded-lg font-semibold shadow-lg hover:shadow-purple-500/50 transition-all text-center border border-purple-400/20"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Crear cuenta
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
