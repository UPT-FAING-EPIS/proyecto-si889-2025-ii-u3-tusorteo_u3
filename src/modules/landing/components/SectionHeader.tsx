import React from 'react';

interface SectionHeaderProps {
  title: React.ReactNode;
  subtitle: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="text-center mb-12 md:mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
        {title}
      </h2>
      <p className="text-gray-400 text-lg">{subtitle}</p>
    </div>
  );
}
