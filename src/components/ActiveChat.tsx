import React, { useState, useRef, useEffect } from 'react';
import { Conversation, ChatMessage } from '../types';
import { TellmeLogo } from './TellmeLogo';
import { 
  ArrowLeft, 
  ArrowRight, 
  MoreHorizontal, 
  Image as ImageIcon, 
  Smile, 
  FileText, 
  Play, 
  Pause, 
  Phone, 
  Video, 
  CheckCheck,
  Paperclip
} from 'lucide-react';

interface ActiveChatProps {
  conversation: Conversation;
  onBack: () => void;
  onSendMessage: (text: string, mediaType?: 'image' | 'video' | 'audio' | 'file') => void;
  onStartCall: (kind: 'audio' | 'video') => void;
  onOpenProfile?: () => void;
}

export const ActiveChat: React.FC<ActiveChatProps> = ({
  conversation,
  onBack,
  onSendMessage,
  onStartCall,
  onOpenProfile,
}) => {
  const [inputText, setInputText] = useState('');
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
    setShowMoreMenu(false);
  };

  const handleSendMedia = (type: 'image' | 'video' | 'audio' | 'file') => {
    setShowMoreMenu(false);
    if (type === 'image') {
      onSendMessage('📷 تم إرسال صورة جديدة من المعرض', 'image');
    } else if (type === 'video') {
      onSendMessage('🎥 تم إرسال مقطع فيديو قصير', 'video');
    } else if (type === 'file') {
      onSendMessage('📄 Tellme_Document_V1.pdf (2.4 MB)', 'file');
    }
  };

  const handleAddEmoji = (emoji: string) => {
    setInputText((prev) => prev + emoji);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#f8fafc] relative overflow-hidden">
      {/* Top Header - Matching slide 5, 6, 7 */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-2.5 flex items-center justify-between shrink-0 shadow-2xs z-20">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBack}
            className="p-1.5 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
            title="رجوع"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2.5 text-right group cursor-pointer"
          >
            <div className="relative">
              {conversation.avatar ? (
                <img
                  src={conversation.avatar}
                  alt={conversation.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-2xs"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <TellmeLogo size="sm" />
              )}
              {conversation.isOnline && (
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
              )}
            </div>

            <div className="flex flex-col">
              <span className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors leading-tight">
                {conversation.name}
              </span>
              <span className="text-[11px] font-medium text-blue-600 font-brand">
                {conversation.statusText || 'Lets to 5m'}
              </span>
            </div>
          </button>
        </div>

        {/* Action icons (Audio call, Video call, More menu) */}
        <div className="flex items-center gap-1 text-slate-600">
          <button
            onClick={() => onStartCall('audio')}
            className="p-2 rounded-xl hover:bg-slate-100 hover:text-blue-600 transition-colors cursor-pointer"
            title="مكالمة صوتية"
          >
            <Phone className="w-4 h-4" />
          </button>
          <button
            onClick={() => onStartCall('video')}
            className="p-2 rounded-xl hover:bg-slate-100 hover:text-blue-600 transition-colors cursor-pointer"
            title="مكالمة فيديو"
          >
            <Video className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenProfile}
            className="p-2 rounded-xl hover:bg-slate-100 hover:text-blue-600 transition-colors cursor-pointer"
            title="معلومات المحادثة"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        <div className="flex justify-center my-1">
          <span className="bg-slate-200/70 text-slate-600 text-[11px] px-3 py-1 rounded-full font-medium shadow-2xs">
            اليوم
          </span>
        </div>

        {conversation.messages.map((msg) => {
          const isUser = msg.isOutgoing;

          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${isUser ? 'justify-start flex-row-reverse' : 'justify-start'}`}
            >
              {/* Avatar on incoming messages */}
              {!isUser && (
                <div className="shrink-0 mb-1">
                  <TellmeLogo size="sm" />
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`max-w-[78%] rounded-2xl p-3.5 shadow-2xs transition-all relative ${
                  isUser
                    ? 'bg-blue-600 text-white rounded-br-xs shadow-blue-600/10'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                }`}
              >
                {/* Audio Voice Note rendering */}
                {msg.mediaType === 'audio' ? (
                  <div className="flex items-center gap-3 py-1 px-1">
                    <button
                      onClick={() =>
                        setPlayingAudioId(playingAudioId === msg.id ? null : msg.id)
                      }
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                        isUser
                          ? 'bg-white text-blue-600'
                          : 'bg-blue-600 text-white'
                      }`}
                    >
                      {playingAudioId === msg.id ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current translate-x-0.5" />
                      )}
                    </button>

                    {/* Waveform graphic */}
                    <div className="flex items-center gap-1 flex-1 h-6 px-1">
                      {[12, 24, 18, 28, 16, 22, 30, 20, 14, 26, 19, 15, 25, 10].map(
                        (h, idx) => (
                          <div
                            key={idx}
                            style={{ height: `${h}px` }}
                            className={`w-1 rounded-full transition-all ${
                              playingAudioId === msg.id && idx < 8
                                ? 'bg-amber-300 animate-pulse'
                                : isUser
                                ? 'bg-white/80'
                                : 'bg-blue-600/70'
                            }`}
                          />
                        )
                      )}
                    </div>
                    <span className="text-[10px] font-mono opacity-85">
                      {msg.audioDuration || '0:34'}
                    </span>
                  </div>
                ) : (
                  <div>
                    {msg.text && (
                      <p className="text-sm leading-relaxed whitespace-pre-wrap font-sans">
                        {msg.text}
                      </p>
                    )}
                  </div>
                )}

                {/* Timestamp & status */}
                <div
                  className={`flex items-center gap-1 justify-end mt-1 text-[10px] ${
                    isUser ? 'text-blue-100' : 'text-slate-400'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {isUser && (
                    <CheckCheck className="w-3.5 h-3.5 text-white/90" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* "More" Slide-up Attachment Sheet */}
      {showMoreMenu && (
        <div className="bg-white border-t border-slate-200 shadow-xl p-3 z-30 animate-in slide-in-from-bottom duration-200">
          <div className="max-w-xs mx-auto space-y-2">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <span className="font-brand font-bold text-lg text-blue-600">More</span>
              <button
                onClick={() => setShowMoreMenu(false)}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                إغلاق
              </button>
            </div>

            <div className="flex flex-col gap-1.5 font-medium text-sm">
              <button
                onClick={() => handleSendMedia('image')}
                className="w-full flex items-center justify-between p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 transition-colors text-right cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-blue-600" />
                  <span>Photos & video</span>
                </div>
                <span className="text-xs text-blue-600 font-semibold">مكتبة الوسائط</span>
              </button>

              <div className="w-full border border-slate-200 rounded-xl p-2 bg-slate-50">
                <div className="flex items-center gap-2 mb-2 text-slate-800">
                  <Smile className="w-4 h-4 text-blue-600" />
                  <span>Emoje</span>
                </div>
                <div className="flex flex-wrap gap-2 text-lg px-1">
                  {['❤️', '😍', '🔥', '✨', '👏', '😂', '👍', '🌸', '🚀', '☕'].map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => handleAddEmoji(emoji)}
                      className="hover:scale-125 transition-transform cursor-pointer p-1"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleSendMedia('file')}
                className="w-full flex items-center justify-between p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 transition-colors text-right cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Files</span>
                </div>
                <span className="text-xs text-blue-600 font-semibold">مستندات</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Send Message Bar - Sleek Interface */}
      <form
        onSubmit={handleSend}
        className="bg-white border-t border-slate-200 px-4 py-2.5 flex items-center gap-2 z-20 shrink-0"
      >
        {/* '...' More button */}
        <button
          type="button"
          onClick={() => setShowMoreMenu(!showMoreMenu)}
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
            showMoreMenu
              ? 'bg-blue-600 text-white'
              : 'text-slate-500 hover:bg-slate-100 hover:text-blue-600'
          }`}
          title="خيارات إضافية (Photos, Emoje, Files)"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>

        {/* Input field */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 flex items-center gap-2 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-600 focus-within:bg-white transition-all">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Send Message"
            className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 placeholder:font-brand placeholder:text-base outline-none font-sans"
          />
        </div>

        {/* Circular Send Button with Signature Tellme "T" Icon */}
        <button
          type="submit"
          disabled={!inputText.trim()}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shrink-0 cursor-pointer ${
            inputText.trim()
              ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25 scale-105 active:scale-95'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
          title="إرسال"
        >
          <TellmeLogo size="sm" circleBg="bg-blue-600" />
        </button>
      </form>
    </div>
  );
};
