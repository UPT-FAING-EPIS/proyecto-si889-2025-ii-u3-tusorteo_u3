interface TestimonialCardProps {
  avatar: string;
  name: string;
  handle: string;
  rating: number;
  testimonial: string;
  gradient: string;
  shadow: string;
}

export default function TestimonialCard({ avatar, name, handle, rating, testimonial, gradient, shadow }: TestimonialCardProps) {
  return (
    <div className={`bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-8 border border-neutral-700/50 hover:border-${shadow}/30 transition-all duration-300`}>
      <div className="flex items-center gap-4 mb-6">
        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl`}>
          {avatar}
        </div>
        <div>
          <h4 className="text-white font-bold">{name}</h4>
          <p className="text-gray-400 text-sm">{handle}</p>
        </div>
      </div>
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-xl">⭐</span>
        ))}
      </div>
      <p className="text-gray-300 leading-relaxed">{testimonial}</p>
    </div>
  );
}
