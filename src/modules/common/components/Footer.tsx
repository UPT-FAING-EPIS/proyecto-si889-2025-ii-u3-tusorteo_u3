"use client";

import Link from "next/link";
import ProtectedLink from "@/modules/common/components/ProtectedLink";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
          {/* Logo y descripción */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <img src="/logo.png" alt="Logo tusorteo" className="w-32 sm:w-36 h-auto mb-4" />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              La plataforma más confiable para realizar sorteos transparentes y divertidos en vivo.
            </p>
          </div>

          {/* Herramientas */}
          <div>
            <h3 className="text-white font-bold mb-3 sm:mb-4 text-base sm:text-lg">Herramientas</h3>
            <ul className="space-y-2">
              <li><Link href="/#apps" className="text-gray-400 hover:text-purple-400 transition text-sm">Instagram Sorteo</Link></li>
              <li><Link href="/#apps" className="text-gray-400 hover:text-purple-400 transition text-sm">Facebook Sorteo</Link></li>
              <li><ProtectedLink href="/modalities/live-draw" className="text-gray-400 hover:text-purple-400 transition text-sm">Sorteo en Vivo</ProtectedLink></li>
              <li><Link href="/modalities/join-live-draw" className="text-gray-400 hover:text-purple-400 transition text-sm">Unirse a Sorteo</Link></li>
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h3 className="text-white font-bold mb-3 sm:mb-4 text-base sm:text-lg">Recursos</h3>
            <ul className="space-y-2">
              <li><Link href="/#benefits" className="text-gray-400 hover:text-purple-400 transition text-sm">Beneficios</Link></li>
              <li><Link href="/#testimonials" className="text-gray-400 hover:text-purple-400 transition text-sm">Testimonios</Link></li>
              <li><Link href="/#" className="text-gray-400 hover:text-purple-400 transition text-sm">Blog</Link></li>
              <li><Link href="/#" className="text-gray-400 hover:text-purple-400 transition text-sm">Ayuda</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-bold mb-3 sm:mb-4 text-base sm:text-lg">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/#" className="text-gray-400 hover:text-purple-400 transition text-sm">Términos de Servicio</Link></li>
              <li><Link href="/#" className="text-gray-400 hover:text-purple-400 transition text-sm">Política de Privacidad</Link></li>
              <li><Link href="/#" className="text-gray-400 hover:text-purple-400 transition text-sm">Cookies</Link></li>
              <li><Link href="/#" className="text-gray-400 hover:text-purple-400 transition text-sm">Contacto</Link></li>
            </ul>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-neutral-800 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-gray-500 text-xs sm:text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} TuSorteo. Todos los derechos reservados.
            </span>
            
            {/* Redes sociales */}
            <div className="flex gap-3 sm:gap-4">
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-800 hover:bg-purple-500/20 border border-neutral-700 hover:border-purple-500/50 flex items-center justify-center transition-all hover:scale-110" title="Facebook">
                <span className="text-gray-400 hover:text-purple-400 text-lg sm:text-xl">📘</span>
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-800 hover:bg-purple-500/20 border border-neutral-700 hover:border-purple-500/50 flex items-center justify-center transition-all hover:scale-110" title="Instagram">
                <span className="text-gray-400 hover:text-purple-400 text-lg sm:text-xl">📸</span>
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-800 hover:bg-purple-500/20 border border-neutral-700 hover:border-purple-500/50 flex items-center justify-center transition-all hover:scale-110" title="Twitter">
                <span className="text-gray-400 hover:text-purple-400 text-lg sm:text-xl">🐦</span>
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-neutral-800 hover:bg-purple-500/20 border border-neutral-700 hover:border-purple-500/50 flex items-center justify-center transition-all hover:scale-110" title="YouTube">
                <span className="text-gray-400 hover:text-purple-400 text-lg sm:text-xl">📺</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
