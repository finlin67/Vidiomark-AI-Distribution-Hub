
import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip, Cell } from 'recharts';

const data = [
  { day: 'Mon', value: 40 },
  { day: 'Tue', value: 60 },
  { day: 'Wed', value: 85 },
  { day: 'Thu', value: 50 },
  { day: 'Fri', value: 70 },
  { day: 'Sat', value: 95 },
  { day: 'Sun', value: 65 },
  { day: 'Avg', value: 45 },
];

interface AnalyticsPanelProps {
  onAnalyze: () => void;
  isLoading?: boolean;
}

const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({ onAnalyze, isLoading }) => {
  return (
    <div className="lg:col-span-5 flex flex-col gap-6">
      <div className="glass rounded-xl p-6 border-white/5 shadow-2xl relative overflow-hidden">
        {isLoading && (
            <div className="absolute inset-0 bg-background-dark/60 backdrop-blur-sm z-20 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    <span className="text-sm font-bold text-primary animate-pulse">Gemini Brainstorming...</span>
                </div>
            </div>
        )}
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-white text-lg font-bold">Engagement Analytics</h3>
          <div className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-1 rounded-full border border-primary/30 uppercase tracking-widest flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
            Live
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-2 text-white/40 mb-1">
              <span className="material-symbols-outlined text-sm">visibility</span>
              <span className="text-xs font-medium uppercase tracking-wider">Total Views</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">2.4M</span>
              <span className="text-[#0bda87] text-xs font-bold">+18%</span>
            </div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-2 text-white/40 mb-1">
              <span className="material-symbols-outlined text-sm">ads_click</span>
              <span className="text-xs font-medium uppercase tracking-wider">CTR Rate</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">8.2%</span>
              <span className="text-[#0bda87] text-xs font-bold">+5%</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">bar_chart</span>
              <p className="text-white text-sm font-semibold tracking-wide">Retention Curve</p>
            </div>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Last 7 Days</p>
          </div>
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.day === 'Sat' ? '#f20da6' : entry.day === 'Wed' ? '#a78bfa' : 'rgba(255,255,255,0.1)'} 
                      className={entry.day === 'Sat' ? 'drop-shadow-[0_0_8px_rgba(242,13,166,0.6)]' : ''}
                    />
                  ))}
                </Bar>
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 9, fontWeight: 700 }} 
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }} 
                  contentStyle={{ backgroundColor: '#1a1118', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <button 
          onClick={onAnalyze}
          className="w-full bg-gradient-to-r from-violet-600 to-primary text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg glow-pink"
        >
          <span>Analyze Your Video</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>

      <div className="flex items-center gap-4 px-2">
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <img 
              key={i}
              className="size-8 rounded-full border-2 border-[#110b10] object-cover" 
              src={`https://picsum.photos/seed/user${i}/100/100`} 
              alt={`User ${i}`} 
            />
          ))}
          <div className="size-8 rounded-full border-2 border-[#110b10] bg-[#392833] flex items-center justify-center text-[10px] font-bold text-white">
            +5k
          </div>
        </div>
        <p className="text-white/50 text-xs leading-tight">
          Trusted by <span className="text-white font-bold">500+ creators</span> and marketing teams globally.
        </p>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
