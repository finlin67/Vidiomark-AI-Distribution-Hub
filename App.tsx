'use client';
// FILE: VidiomarkHub.tsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, Volume2, VolumeX, Maximize2, BrainCircuit, 
  ArrowRight, Eye, MousePointer2, X, Zap, 
  Linkedin, Youtube, Instagram, Share2, BarChart3
} from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, Cell } from 'recharts';
import { GoogleGenAI, Type } from "@google/genai";

// --- Types ---
interface AnalysisResult {
  title: string;
  predictedViews: string;
  ctr: string;
  insights: string[];
  recommendations: string[];
}

// --- Gemini AI Logic ---
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const analyzeVideoConcept = async (concept: string): Promise<AnalysisResult> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this video concept for global distribution potential: "${concept}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          predictedViews: { type: Type.STRING },
          ctr: { type: Type.STRING },
          insights: { type: Type.ARRAY, items: { type: Type.STRING } },
          recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["title", "predictedViews", "ctr", "insights", "recommendations"]
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

// --- Mock Data ---
const CHART_DATA = [
  { day: 'M', value: 40 }, { day: 'T', value: 60 }, { day: 'W', value: 85 },
  { day: 'T', value: 50 }, { day: 'F', value: 70 }, { day: 'S', value: 95 }, { day: 'S', value: 65 }
];

export default function VidiomarkHub() {
  const [showModal, setShowModal] = useState(false);
  const [concept, setConcept] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  // Video Player State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) videoRef.current.playbackRate = speed;
    setShowSpeedMenu(false);
  };

  const handleAnalyze = async () => {
    if (!concept) return;
    setLoading(true);
    try {
      const result = await analyzeVideoConcept(concept);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className="w-full h-full aspect-square flex items-center justify-center bg-[#0d080c]">
      <div className="w-full h-full max-w-[600px] max-h-[600px] overflow-hidden relative bg-[#110b10] text-white selection:bg-[#f20da6]/30 font-display flex flex-col">
        
        {/* Decorative Lighting */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#f20da6]/10 blur-[90px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-violet-600/10 blur-[90px] rounded-full pointer-events-none" />

        {/* Compact Header */}
        <header className="px-5 py-3 flex items-center justify-between border-b border-white/5 bg-black/20 backdrop-blur-md z-50">
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-[#f20da6]" fill="currentColor" />
            <span className="font-black text-sm tracking-tighter uppercase">Vidiomark</span>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-[#f20da6] text-[10px] font-black px-4 py-2 rounded-full hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(242,13,166,0.3)]"
          >
            AI SUITE <BrainCircuit size={10} />
          </button>
        </header>

        {/* Main Interface Scrollbox */}
        <div className="flex-1 p-5 overflow-y-auto custom-scrollbar flex flex-col gap-5">
          
          {/* Hero Header */}
          <section className="space-y-1">
            <h1 className="text-2xl font-black leading-[1.1] tracking-tight">
              Scale One Video <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-[#f20da6]">Globally.</span>
            </h1>
            <p className="text-xs text-white/50 font-medium">Automated platform logic & predictive distribution hub.</p>
          </section>

          {/* Integrated Video Hub */}
          <div className="relative group">
            {/* Social Signal Icons */}
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute -top-3 left-4 z-10 glass p-2 rounded-full text-red-500 shadow-xl border-white/10">
              <Youtube size={14} />
            </motion.div>
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 4, delay: 1 }} className="absolute top-1/2 -right-3 z-10 glass p-2 rounded-full text-blue-400 shadow-xl border-white/10 -translate-y-1/2">
              <Linkedin size={14} />
            </motion.div>
             <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 4, delay: 2 }} className="absolute -bottom-3 left-1/3 z-10 glass p-2 rounded-full text-pink-400 shadow-xl border-white/10">
              <Instagram size={14} />
            </motion.div>

            <div className="bg-black rounded-xl overflow-hidden border border-white/10 aspect-video relative shadow-2xl">
              <video 
                ref={videoRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
                className="w-full h-full object-cover cursor-pointer"
                onClick={togglePlay}
                src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              />
              
              {!isPlaying && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-4 bg-[#f20da6] rounded-full text-white shadow-2xl">
                    <Play size={24} fill="white" />
                  </motion.div>
                </div>
              )}

              {/* Player UI */}
              <div className={`absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/95 to-transparent transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                     <input
                      type="range" min="0" max={duration} value={currentTime} onChange={handleScrub}
                      className="flex-1 h-1 accent-[#f20da6] bg-white/20 rounded-full cursor-pointer appearance-none"
                    />
                    <span className="text-[9px] font-mono text-white/70 w-20 text-right">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button onClick={togglePlay} className="hover:text-[#f20da6] transition-colors">
                        {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                      </button>
                      <div className="flex items-center gap-1.5 group/vol">
                        <button onClick={() => setIsMuted(!isMuted)}>
                          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                        </button>
                        <input 
                          type="range" min="0" max="1" step="0.1" value={isMuted ? 0 : volume}
                          onChange={(e) => {
                            const v = parseFloat(e.target.value);
                            setVolume(v);
                            if (videoRef.current) videoRef.current.volume = v;
                            setIsMuted(v === 0);
                          }}
                          className="w-0 group-hover/vol:w-14 transition-all duration-300 h-1 accent-[#f20da6] appearance-none bg-white/10 rounded-full"
                        />
                      </div>
                      <div className="relative">
                        <button onClick={() => setShowSpeedMenu(!showSpeedMenu)} className="text-[10px] font-black border border-white/20 rounded px-1.5 py-0.5 hover:bg-white/5">
                          {playbackSpeed}x
                        </button>
                        {showSpeedMenu && (
                          <div className="absolute bottom-full left-0 mb-2 bg-[#1a1118] border border-white/10 rounded-lg overflow-hidden flex flex-col min-w-[50px] shadow-2xl">
                            {[0.5, 1, 1.5, 2].map(s => (
                              <button key={s} onClick={() => handleSpeedChange(s)} className="text-[10px] p-2 hover:bg-[#f20da6]/20 font-bold transition-colors">{s}x</button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <button onClick={() => videoRef.current?.requestFullscreen()} className="text-white/60 hover:text-white transition-colors">
                      <Maximize2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Engagement Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass p-3 rounded-xl border-white/5">
              <div className="flex items-center gap-2 text-white/40 mb-1">
                <Eye size={12} />
                <span className="text-[9px] font-bold uppercase tracking-[0.1em]">Total Impressions</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black">2.4M</span>
                <span className="text-emerald-400 text-[9px] font-bold">+18%</span>
              </div>
            </div>
            <div className="glass p-3 rounded-xl border-white/5">
              <div className="flex items-center gap-2 text-white/40 mb-1">
                <MousePointer2 size={12} />
                <span className="text-[9px] font-bold uppercase tracking-[0.1em]">Click Rate</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black">8.2%</span>
                <span className="text-emerald-400 text-[9px] font-bold">+5%</span>
              </div>
            </div>
          </div>

          {/* Retention Chart Area */}
          <div className="glass p-4 rounded-xl border-white/5 h-36 flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <BarChart3 size={14} className="text-[#f20da6]" />
                <span className="text-[10px] font-bold text-white/60 uppercase">Retention Curve</span>
              </div>
              <div className="flex items-center gap-1 text-[#f20da6] bg-[#f20da6]/10 px-2 py-0.5 rounded-full">
                <div className="w-1.5 h-1.5 bg-[#f20da6] rounded-full animate-pulse" />
                <span className="text-[8px] font-black uppercase tracking-tighter">Live Monitor</span>
              </div>
            </div>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CHART_DATA}>
                  <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                    {CHART_DATA.map((entry, idx) => (
                      <Cell 
                        key={idx} 
                        fill={idx === 5 ? '#f20da6' : 'rgba(255,255,255,0.08)'} 
                        className={idx === 5 ? 'drop-shadow-[0_0_5px_rgba(242,13,166,0.6)]' : ''}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Distribution Stats */}
          <div className="grid grid-cols-4 gap-2 py-3 border-t border-white/5">
            {[
              { l: 'PLATFORMS', v: '24' }, { l: 'ENGAGED', v: '34%' },
              { l: 'REACH', v: '12B+' }, { l: 'AI ENGINE', v: '100%' }
            ].map(s => (
              <div key={s.l} className="text-center group cursor-default">
                <p className="text-[7px] font-bold text-white/20 uppercase group-hover:text-[#f20da6]/50 transition-colors">{s.l}</p>
                <p className="text-xs font-black">{s.v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Suite Modal Overlay */}
        <AnimatePresence>
          {showModal && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 z-[100] bg-black/95 backdrop-blur-2xl p-6 flex flex-col"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-black text-white">Campaign Intelligence</h2>
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">Powered by Gemini Flash</p>
                </div>
                <button 
                  onClick={() => { setShowModal(false); setAnalysis(null); }} 
                  className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/50 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-5 flex-1 overflow-y-auto custom-scrollbar pr-2">
                <div className="relative group/input">
                  <textarea 
                    value={concept}
                    onChange={(e) => setConcept(e.target.value)}
                    placeholder="Brief your video concept or content hook for deep AI analysis..."
                    className="w-full h-24 bg-white/5 border border-white/10 rounded-xl p-4 text-[12px] text-white focus:ring-1 focus:ring-[#f20da6] outline-none resize-none transition-all placeholder:text-white/20 group-hover/input:border-white/20"
                  />
                  <button 
                    onClick={handleAnalyze}
                    disabled={loading || !concept}
                    className="absolute bottom-3 right-3 bg-[#f20da6] p-2.5 rounded-lg shadow-2xl hover:scale-105 active:scale-95 disabled:opacity-30 transition-all text-white"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <BrainCircuit size={16} />
                    )}
                  </button>
                </div>

                {analysis && (
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                    className="space-y-5 pb-6"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 p-3.5 rounded-xl border border-white/5">
                        <p className="text-[8px] text-white/30 font-bold uppercase mb-1">Expected Scale</p>
                        <p className="text-xl font-black text-[#f20da6]">{analysis.predictedViews}</p>
                      </div>
                      <div className="bg-white/5 p-3.5 rounded-xl border border-white/5">
                        <p className="text-[8px] text-white/30 font-bold uppercase mb-1">Predicted CTR</p>
                        <p className="text-xl font-black text-violet-400">{analysis.ctr}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-[10px] font-black uppercase text-white/50 flex items-center gap-1.5">
                        <Share2 size={10} className="text-[#f20da6]" /> Distribution Insights
                      </h4>
                      <div className="space-y-2">
                        {analysis.insights.map((insight, i) => (
                          <div key={i} className="text-[11px] text-white/70 leading-relaxed bg-white/5 p-3 rounded-lg border-l-2 border-[#f20da6]/40">
                            {insight}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#f20da6]/10 p-4 rounded-xl border border-[#f20da6]/20">
                      <h4 className="text-[10px] font-black text-[#f20da6] uppercase mb-3">Optimal Distribution Targets</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.recommendations.map((tag, i) => (
                          <span key={i} className="text-[8px] font-black bg-[#f20da6]/30 text-[#f20da6] px-2.5 py-1 rounded border border-[#f20da6]/20 uppercase tracking-tighter">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <style>{`
          .glass { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(15px); border: 1px solid rgba(255, 255, 255, 0.06); }
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(242, 13, 166, 0.2); border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(242, 13, 166, 0.4); }
          input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 10px;
            width: 10px;
            border-radius: 50%;
            background: #f20da6;
            cursor: pointer;
            box-shadow: 0 0 10px rgba(242, 13, 166, 0.5);
          }
        `}</style>
      </div>
    </div>
  );
}
