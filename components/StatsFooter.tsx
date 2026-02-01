
import React from 'react';

const stats = [
  { label: 'Reach', value: '12B+', sub: 'Total Impressions' },
  { label: 'Conversion', value: '34%', sub: 'Higher Engagement' },
  { label: 'Platforms', value: '24', sub: 'Native Integrations' },
  { label: 'Automated', value: '100%', sub: 'AI Pipeline Distribution' },
];

const StatsFooter: React.FC = () => {
  return (
    <div className="mt-20 border-t border-white/10 pt-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center md:text-left group cursor-default">
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] mb-2 group-hover:text-primary transition-colors">
              {stat.label}
            </p>
            <p className="text-3xl font-black text-white mb-1">{stat.value}</p>
            <p className="text-[10px] text-white/30 uppercase tracking-wider">{stat.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsFooter;
