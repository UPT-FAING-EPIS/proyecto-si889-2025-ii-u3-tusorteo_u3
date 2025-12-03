import Link from 'next/link';
import ProtectedLink from '@/modules/common/components/ProtectedLink';

interface ToolCardProps {
  icon: string;
  title: string;
  description: string;
  buttonText: string;
  href: string;
  gradient: string;
  shadow: string;
  protect?: boolean;
  fallbackHref?: string;
  comingSoon?: boolean;
}

export default function ToolCard({ icon, title, description, buttonText, href, gradient, shadow, protect = false, fallbackHref = "/login", comingSoon = false }: ToolCardProps) {
  const isLink = href.startsWith('/');

  return (
    <div className={`group bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl shadow-xl p-6 border border-neutral-700/50 hover:border-${shadow}/50 transition-all duration-300 hover:shadow-${shadow}/20 hover:scale-105 flex flex-col relative overflow-hidden`}>
      {comingSoon && (
        <div className="absolute top-6 -right-10 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-12 py-2 rotate-45 shadow-2xl z-10 border-y border-amber-300/30">
          <span className="relative z-10">Próximamente</span>
        </div>
      )}
      <div className="mb-4 flex items-center justify-center">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-3xl shadow-lg group-hover:shadow-${shadow}/50 transition-shadow`}>
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-bold text-white mb-3 text-center">{title}</h3>
      <p className="text-gray-400 mb-6 text-center flex-1">{description}</p>
      {isLink ? (
        protect ? (
          <ProtectedLink
            href={href}
            fallbackHref={fallbackHref}
            className={`w-full bg-gradient-to-r ${gradient} text-white px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-${shadow}/50 transition-all hover:scale-105 text-center block`}
          >
            {buttonText}
          </ProtectedLink>
        ) : (
          <Link
            href={href}
            className={`w-full bg-gradient-to-r ${gradient} text-white px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-${shadow}/50 transition-all hover:scale-105 text-center block`}
          >
            {buttonText}
          </Link>
        )
      ) : (
        <button className={`w-full bg-gradient-to-r ${gradient} text-white px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-${shadow}/50 transition-all hover:scale-105`}>
          {buttonText}
        </button>
      )}
    </div>
  );
}
