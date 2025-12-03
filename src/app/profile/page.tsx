// ...existing code...
import ProtectedLink from "@/modules/common/components/ProtectedLink";

export default function ProfilePage() {
// ...existing code...

  return (
    <main className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <section className="relative z-10 flex-1 py-16 px-4 max-w-6xl mx-auto w-full">
        {/* Header Section */}
        <div className="text-center mb-16">

          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            Tus{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Sorteos
            </span>
          </h1>
          <p className="text-gray-400 text-lg">Elige el tipo de sorteo que deseas crear</p>
        </div>

        {/* Main Action Card - Sorteo en Vivo */}
        <div className="mb-8">
          <ProtectedLink href="/modalities/live-draw">
            <div className="group bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl shadow-2xl p-8 md:p-10 border border-neutral-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.01] cursor-pointer">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-purple-500 flex items-center justify-center text-4xl shadow-2xl group-hover:shadow-purple-500/50 transition-shadow group-hover:scale-110 duration-300">
                  🎤
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    Sorteo en Vivo
                  </h2>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    Crea sorteos interactivos donde los participantes se unen en tiempo real mediante un PIN único
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg group-hover:shadow-purple-500/50 transition-all">
                  <span>Crear ahora</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          </ProtectedLink>
        </div>

        {/* Coming Soon Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-3xl">🚀</span>
            Próximamente
          </h3>
        </div>

        {/* Grid of Coming Soon Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Redes Sociales */}
          <div className="group bg-gradient-to-br from-neutral-900/50 to-neutral-800/50 rounded-2xl p-6 border border-neutral-700/30 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <span className="bg-purple-500/20 text-purple-300 text-xs font-bold px-3 py-1 rounded-full">
                Pronto
              </span>
            </div>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-3xl mb-4">
              📸
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Redes Sociales</h4>
            <p className="text-gray-500 text-sm mb-4">
              Sorteos en Instagram, Facebook, TikTok y más plataformas
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="text-2xl opacity-50">�</span>
              <span className="text-2xl opacity-50">�</span>
              <span className="text-2xl opacity-50">🎵</span>
              <span className="text-2xl opacity-50">▶️</span>
            </div>
          </div>

          {/* Promociones */}
          <div className="group bg-gradient-to-br from-neutral-900/50 to-neutral-800/50 rounded-2xl p-6 border border-neutral-700/30 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <span className="bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-full">
                Pronto
              </span>
            </div>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center text-3xl mb-4">
              🎁
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Promociones</h4>
            <p className="text-gray-500 text-sm mb-4">
              Juegos interactivos: ruletas, trivias, raspa y gana
            </p>
            <div className="flex flex-col gap-2">
              <span className="text-gray-600 text-sm">• Ruleta Aleatoria</span>
              <span className="text-gray-600 text-sm">• Trivia</span>
              <span className="text-gray-600 text-sm">• Raspa y Gana</span>
            </div>
          </div>

          {/* Amigo Secreto */}
          <div className="group bg-gradient-to-br from-neutral-900/50 to-neutral-800/50 rounded-2xl p-6 border border-neutral-700/30 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <span className="bg-pink-500/20 text-pink-300 text-xs font-bold px-3 py-1 rounded-full">
                Pronto
              </span>
            </div>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center text-3xl mb-4">
              🎅
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Amigo Secreto</h4>
            <p className="text-gray-500 text-sm mb-4">
              Organiza intercambios de regalos con familia y amigos
            </p>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <span>🎁</span>
              <span>Gestión automática de participantes</span>
            </div>
          </div>
        </div>

        {/* Stats or Info Section */}
        <div className="mt-12 bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 border border-neutral-700/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                100%
              </div>
              <p className="text-gray-400">Transparente</p>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                ∞
              </div>
              <p className="text-gray-400">Participantes</p>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                ⚡
              </div>
              <p className="text-gray-400">Tiempo Real</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
