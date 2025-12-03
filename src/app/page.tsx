import Link from "next/link";
import ProtectedLink from "@/modules/common/components/ProtectedLink";
import SectionHeader from "@/modules/landing/components/SectionHeader";
import ToolCard from "@/modules/landing/components/ToolCard";
import BenefitCard from "@/modules/landing/components/BenefitCard";
import TestimonialCard from "@/modules/landing/components/TestimonialCard";

const tools = [
  {
    icon: "📋",
    title: "Sorteo por Lista de Nombres",
    description: "Elige un ganador al azar de una lista de nombres con nuestra app.",
    buttonText: "Crear sorteo",
    href: "/modalities/list-draw",
    protect: false,
    gradient: "from-yellow-500 to-orange-500",
    shadow: "yellow-500",
  },
  {
    icon: "👥",
    title: "Generador de Equipos Aleatorios",
    description: "Crea equipos equilibrados y aleatorios a partir de una lista de participantes.",
    buttonText: "Generar equipos",
    href: "#",
    gradient: "from-blue-500 to-blue-600",
    shadow: "blue-500",
    comingSoon: true,
  },
  {
    icon: "🎤",
    title: "Crear sorteo en vivo",
    description: "Crea un sorteo interactivo y compártelo con tus participantes.",
    buttonText: "Crear ahora",
    href: "/modalities/live-draw",
    protect: true,
    gradient: "from-green-500 to-emerald-600",
    shadow: "green-500",
  },
  {
    icon: "🎯",
    title: "Unirse a un sorteo",
    description: "Ingresa el PIN para participar en un sorteo compartido.",
    buttonText: "Unirse ahora",
    href: "/modalities/join-live-draw",
    gradient: "from-pink-500 to-rose-600",
    shadow: "pink-500",
  },
];

const benefits = [
  {
    icon: "✨",
    title: "100% Transparente",
    description: "Todos los sorteos son aleatorios y verificables. Tus participantes pueden confiar en que el proceso es justo.",
    gradient: "from-purple-500 to-pink-500",
    shadow: "purple-500",
  },
  {
    icon: "⚡",
    title: "Súper Rápido",
    description: "Crea y ejecuta sorteos en segundos. No necesitas conocimientos técnicos, solo tu creatividad.",
    gradient: "from-blue-500 to-cyan-500",
    shadow: "blue-500",
  },
  {
    icon: "🎯",
    title: "Interactivo en Vivo",
    description: "Los participantes se unen en tiempo real, creando una experiencia emocionante y memorable.",
    gradient: "from-green-500 to-emerald-500",
    shadow: "green-500",
  },
  {
    icon: "🔒",
    title: "Seguro y Confiable",
    description: "Tus datos y los de tus participantes están protegidos con los más altos estándares de seguridad.",
    gradient: "from-pink-500 to-rose-500",
    shadow: "pink-500",
  },
  {
    icon: "🎨",
    title: "Diseño Profesional",
    description: "Interfaz moderna y atractiva que impresionará a tu audiencia y mejorará tu imagen de marca.",
    gradient: "from-yellow-500 to-orange-500",
    shadow: "yellow-500",
  },
  {
    icon: "📱",
    title: "Multi-Plataforma",
    description: "Funciona perfectamente en cualquier dispositivo: móvil, tablet o computadora.",
    gradient: "from-indigo-500 to-purple-500",
    shadow: "indigo-500",
  },
];

const testimonials = [
  {
    avatar: "👩",
    name: "María González",
    handle: "@mariaglez · Influencer",
    rating: 5,
    testimonial: "¡Increíble! Mis seguidores adoraron el sorteo en vivo. La transparencia y facilidad de uso es lo mejor. Lo recomiendo 100%.",
    gradient: "from-purple-500 to-pink-500",
    shadow: "purple-500",
  },
  {
    avatar: "👨",
    name: "Carlos Ruiz",
    handle: "@carlosruiz · Streamer",
    rating: 5,
    testimonial: "Perfecta para mis streams. Mis viewers participan en tiempo real y crea mucha emoción. La mejor herramienta de sorteos.",
    gradient: "from-blue-500 to-cyan-500",
    shadow: "blue-500",
  },
  {
    avatar: "👩",
    name: "Ana Martínez",
    handle: "@anamtz · Empresaria",
    rating: 5,
    testimonial: "Usamos TuSorteo para nuestros eventos corporativos. Es profesional, confiable y nuestros clientes quedan encantados.",
    gradient: "from-green-500 to-emerald-500",
    shadow: "green-500",
  },
];

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">

      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-4 py-8 sm:py-12 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-400/40 rounded-full px-4 sm:px-6 py-1.5 sm:py-2 mb-4 sm:mb-6">
            <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-300 text-xs sm:text-sm font-medium uppercase tracking-wider">En Vivo</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-4 sm:mb-6 leading-tight px-2">
            Haz tus sorteos más{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              divertidos y transparentes
            </span>
            , ¡en vivo!
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-3 sm:mb-4 leading-relaxed max-w-3xl mx-auto px-2">
            Deja que los participantes se inscriban en tiempo real y selecciona al ganador frente a todos.
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 mb-6 sm:mb-10 px-2">
            Ideal para eventos, streams o actividades interactivas.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-12">
            <ProtectedLink
              href="/modalities/live-draw"
              className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold shadow-2xl hover:shadow-purple-500/60 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 flex items-center gap-2 w-full sm:w-auto justify-center border border-purple-400/20 text-sm sm:text-base"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <span className="text-lg sm:text-xl group-hover:scale-110 transition-transform duration-300">🚀</span>
              <span className="relative z-10">Empezar modo en vivo</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </ProtectedLink>
            
            <Link
              href="/modalities/join-live-draw"
              className="group relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold shadow-2xl hover:shadow-emerald-500/60 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 flex items-center gap-2 w-full sm:w-auto justify-center border border-emerald-400/20 text-sm sm:text-base"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <span className="text-lg sm:text-xl group-hover:scale-110 transition-transform duration-300">🎯</span>
              <span className="relative z-10">Unirse a un sorteo</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Herramientas populares */}
      <section id="apps" className="bg-neutral-950/50 py-20 px-4 border-t border-neutral-800/50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <SectionHeader
            title={
              <>
                Herramientas populares de{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  sorteos
                </span>
              </>
            }
            subtitle="Elige la plataforma perfecta para tu sorteo"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool) => (
              <ToolCard key={tool.title} {...tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section id="benefits" className="py-20 px-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <SectionHeader
            title={
              <>
                ¿Por qué elegir{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  TuSorteo
                </span>
                ?
              </>
            }
            subtitle="Transparencia, diversión y confianza en cada sorteo"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <BenefitCard key={benefit.title} {...benefit} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section id="testimonials" className="bg-neutral-950/50 py-20 px-4 border-t border-neutral-800/50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <SectionHeader
            title={
              <>
                Lo que dicen{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  nuestros usuarios
                </span>
              </>
            }
            subtitle="Miles de sorteos exitosos realizados cada mes"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </div>

          {/* CTA Final */}
          <div className="mt-16 text-center">
            <div className="inline-block bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-12 border border-neutral-700/50">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                ¿Listo para tu próximo sorteo?
              </h3>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Únete a miles de usuarios que ya confían en TuSorteo para crear experiencias inolvidables
              </p>
              <Link
                href="/modalities/live-draw"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white px-8 py-4 rounded-xl font-bold shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
              >
                <span className="text-xl">🚀</span>
                Crear mi primer sorteo
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}

    </main>
  );
}
