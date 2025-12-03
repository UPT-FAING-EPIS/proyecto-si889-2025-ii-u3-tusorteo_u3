interface BenefitCardProps {
  icon: string;
  title: string;
  description: string;
  gradient: string;
  shadow: string;
}

export default function BenefitCard({ icon, title, description, gradient, shadow }: BenefitCardProps) {
  return (
    <div className={`group bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 border border-neutral-700/50 hover:border-${shadow}/30 transition-all duration-300`}>
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}
