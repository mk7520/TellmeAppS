import React, { useState, useEffect } from 'react';
import { TellmeLogo } from './TellmeLogo';
import { PhoneOff, Mic, MicOff, Video, VideoOff, Volume2, VolumeX } from 'lucide-react';

interface ActiveCallModalProps {
  contactName: string;
  callKind: 'audio' | 'video';
  onEndCall: () => void;
}

export const ActiveCallModal: React.FC<ActiveCallModalProps> = ({
  contactName,
  callKind,
  onEndCall,
}) => {
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);
  const [isVideoOff, setIsVideoOff] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDuration = (s: number) => {
    const mins = Math.floor(s / 60).toString().padStart(2, '0');
    const secs = (s % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col justify-between p-6 text-white select-none">
      {/* Top Bar */}
      <div className="flex items-center justify-between text-xs opacity-75">
        <span className="font-brand text-lg text-[#ff3385]">Tellme Call</span>
        <span className="font-mono bg-white/10 px-2.5 py-0.5 rounded-full">
          {formatDuration(seconds)}
        </span>
      </div>

      {/* Center Call info */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        {callKind === 'video' && !isVideoOff ? (
          <div className="relative w-64 h-80 bg-slate-900 rounded-3xl overflow-hidden border-2 border-[#ff006b]/50 shadow-2xl flex items-center justify-center">
            {/* Simulated video stream */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ff006b]/30 via-slate-900/40 to-slate-900 flex items-center justify-center">
              <TellmeLogo size="2xl" className="animate-pulse opacity-90" />
            </div>
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs">
              {contactName}
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-2 border-[#ff006b] p-1 shadow-2xl shadow-[#ff006b]/30 animate-pulse">
              <div className="w-full h-full rounded-full bg-[#ff006b]/20 flex items-center justify-center">
                <TellmeLogo size="xl" />
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-2">
          <h2 className="text-2xl font-bold">{contactName}</h2>
          <p className="text-sm text-[#ffa3bd] font-brand mt-1">
            {callKind === 'video' ? 'Tellme Video Call' : 'Tellme Audio Call'}
          </p>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center justify-center gap-5 pb-6">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
            isMuted ? 'bg-red-500 text-white' : 'bg-white/15 text-white hover:bg-white/25'
          }`}
          title={isMuted ? 'إلغاء كتم الصوت' : 'كتم الميكروفون'}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        {callKind === 'video' && (
          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
              isVideoOff ? 'bg-red-500 text-white' : 'bg-white/15 text-white hover:bg-white/25'
            }`}
            title="إيقاف الكاميرا"
          >
            {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
          </button>
        )}

        <button
          onClick={() => setIsSpeaker(!isSpeaker)}
          className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
            !isSpeaker ? 'bg-slate-700 text-white' : 'bg-white/15 text-white hover:bg-white/25'
          }`}
          title="مكبر الصوت"
        >
          {isSpeaker ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>

        {/* End Call Button */}
        <button
          onClick={onEndCall}
          className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg shadow-red-600/40 hover:scale-105 active:scale-95 transition-transform"
          title="إنهاء المكالمة"
        >
          <PhoneOff className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
