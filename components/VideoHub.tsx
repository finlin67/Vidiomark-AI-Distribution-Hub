
import React, { useState, useRef, useEffect } from 'react';

const VideoHub: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      setIsMuted(newMuted);
      videoRef.current.muted = newMuted;
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSpeedMenu(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="lg:col-span-7 relative">
      {/* Floating Social Nodes */}
      <div className="absolute -top-10 left-10 z-10 animate-float">
        <div className="glass p-3 rounded-full flex flex-col items-center gap-1">
          <div className="bg-red-600/20 p-2 rounded-full text-red-500">
            <span className="material-symbols-outlined text-xl">play_circle</span>
          </div>
          <span className="text-[10px] font-bold text-white/70 uppercase tracking-tighter">YouTube</span>
        </div>
      </div>
      <div className="absolute top-1/2 -right-6 z-10 translate-y-[-50%] animate-float" style={{ animationDelay: '1s' }}>
        <div className="glass p-3 rounded-full flex flex-col items-center gap-1 border-primary/30">
          <div className="bg-blue-600/20 p-2 rounded-full text-blue-400">
            <span className="material-symbols-outlined text-xl">share</span>
          </div>
          <span className="text-[10px] font-bold text-white/70 uppercase tracking-tighter">LinkedIn</span>
        </div>
      </div>
      <div className="absolute -bottom-6 left-1/4 z-10 animate-float" style={{ animationDelay: '2s' }}>
        <div className="glass p-3 rounded-full flex flex-col items-center gap-1">
          <div className="bg-gradient-to-tr from-yellow-500 to-purple-600 p-2 rounded-full text-white">
            <span className="material-symbols-outlined text-xl">photo_camera</span>
          </div>
          <span className="text-[10px] font-bold text-white/70 uppercase tracking-tighter">Instagram</span>
        </div>
      </div>

      {/* Main Video Player */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-primary rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative bg-background-dark rounded-xl overflow-hidden border border-white/10 aspect-video flex flex-col shadow-2xl">
          
          <video
            ref={videoRef}
            className="w-full h-full object-cover cursor-pointer"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onClick={togglePlay}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          />

          {/* Big Play Overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none transition-opacity duration-300">
              <button 
                className="size-20 rounded-full bg-primary/90 text-white flex items-center justify-center scale-100 hover:scale-110 transition-transform glow-pink pointer-events-auto"
                onClick={togglePlay}
              >
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              </button>
            </div>
          )}
          
          {/* Custom Controls Bar */}
          <div className={`absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
            
            {/* Scrubber */}
            <div className="flex items-center gap-3 mb-3 group/scrub">
              <div className="relative flex-1 h-1.5 flex items-center">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleScrub}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary relative transition-all duration-100" 
                    style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 size-3 rounded-full bg-white shadow-lg opacity-0 group-hover/scrub:opacity-100 transition-opacity"></div>
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-bold text-white/90 font-mono w-24 text-right">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex justify-between items-center text-white">
              <div className="flex items-center gap-5">
                {/* Play/Pause */}
                <button onClick={togglePlay} className="hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: isPlaying ? "'FILL' 1" : "" }}>
                    {isPlaying ? 'pause' : 'play_arrow'}
                  </span>
                </button>

                {/* Volume Section */}
                <div className="flex items-center gap-2 group/volume relative">
                  <button onClick={toggleMute} className="hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-xl">
                      {isMuted || volume === 0 ? 'volume_off' : volume < 0.5 ? 'volume_down' : 'volume_up'}
                    </span>
                  </button>
                  <div className="w-0 group-hover/volume:w-20 overflow-hidden transition-all duration-300 ease-in-out flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-full h-1 accent-primary bg-white/20 rounded-full cursor-pointer"
                    />
                  </div>
                </div>

                {/* Playback Speed */}
                <div className="relative">
                  <button 
                    onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                    className="text-[10px] font-black border border-white/20 rounded-md px-2 py-0.5 hover:bg-white/10 transition-all uppercase tracking-tighter"
                  >
                    {playbackSpeed}x
                  </button>
                  {showSpeedMenu && (
                    <div className="absolute bottom-full left-0 mb-2 glass rounded-lg overflow-hidden flex flex-col min-w-[60px] border-white/10 shadow-xl">
                      {[0.5, 1, 1.5, 2].map((speed) => (
                        <button
                          key={speed}
                          onClick={() => handleSpeedChange(speed)}
                          className={`text-[10px] font-bold px-3 py-2 hover:bg-primary/20 text-left transition-colors ${playbackSpeed === speed ? 'text-primary' : 'text-white'}`}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button onClick={toggleFullscreen} className="hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-xl">fullscreen</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Connecting SVG Paths */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 400 300">
        <path d="M200,150 Q250,50 100,20" fill="none" stroke="url(#grad-pink)" strokeDasharray="4 4" strokeWidth="2"></path>
        <path d="M200,150 Q380,150 380,150" fill="none" stroke="url(#grad-pink)" strokeDasharray="4 4" strokeWidth="2"></path>
        <path d="M200,150 Q150,280 120,280" fill="none" stroke="url(#grad-pink)" strokeDasharray="4 4" strokeWidth="2"></path>
        <defs>
          <linearGradient id="grad-pink" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#a78bfa', stopOpacity: 1 }}></stop>
            <stop offset="100%" style={{ stopColor: '#f20da6', stopOpacity: 1 }}></stop>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default VideoHub;
