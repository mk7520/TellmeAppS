import React, { useState } from 'react';
import { ClipItem } from '../types';
import { TellmeLogo } from './TellmeLogo';
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  MoreHorizontal, 
  Plus, 
  ArrowRight, 
  Music,
  Send
} from 'lucide-react';

interface ClipsFeedProps {
  clips: ClipItem[];
  onToggleFollow: (clipId: string) => void;
  onToggleLike: (clipId: string) => void;
  onAddComment: (clipId: string, text: string) => void;
}

export const ClipsFeed: React.FC<ClipsFeedProps> = ({
  clips,
  onToggleFollow,
  onToggleLike,
  onAddComment,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tab, setTab] = useState<'us' | 'following'>('us');
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');

  const currentClip = clips[currentIndex] || clips[0];

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onAddComment(currentClip.id, commentInput);
    setCommentInput('');
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 text-white relative overflow-hidden select-none">
      {/* Top Header - Slide 8: Tellme Clips with US / Following tabs */}
      <div className="absolute top-0 inset-x-0 z-30 p-3 flex items-center justify-between bg-gradient-to-b from-slate-950/80 to-transparent backdrop-blur-xs">
        <div className="flex items-center gap-1.5">
          <TellmeLogo size="sm" />
          <span
            className="font-brand font-bold text-xl text-blue-400"
            style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
          >
            Tellme Clips
          </span>
        </div>

        {/* Center Tabs: US | Following */}
        <div className="flex items-center gap-3 font-brand text-base">
          <button
            onClick={() => setTab('us')}
            className={`transition-colors cursor-pointer ${
              tab === 'us' ? 'text-blue-400 font-bold underline decoration-2' : 'text-white/80'
            }`}
          >
            US
          </button>
          <span className="text-white/40">|</span>
          <button
            onClick={() => setTab('following')}
            className={`transition-colors cursor-pointer ${
              tab === 'following' ? 'text-blue-400 font-bold underline decoration-2' : 'text-white/80'
            }`}
          >
            Following
          </button>
        </div>

        <button
          onClick={() => alert('مشاركة مقطع جديد في Tellme Clips')}
          className="text-white p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Main Clip Player Area */}
      <div
        className={`flex-1 w-full h-full bg-gradient-to-br ${currentClip.bgGradient} flex flex-col justify-end p-5 relative overflow-hidden transition-all duration-500`}
      >
        {/* Visual elements simulating video graphics */}
        <div className="absolute inset-0 flex items-center justify-center opacity-35 pointer-events-none">
          <div className="w-72 h-72 rounded-full border border-white/20 animate-spin" style={{ animationDuration: '20s' }} />
          <div className="absolute w-48 h-48 rounded-full border border-blue-400/30 animate-ping" style={{ animationDuration: '3s' }} />
          <TellmeLogo size="2xl" className="opacity-60 scale-125" />
        </div>

        {/* Right side interaction buttons */}
        <div className="absolute left-4 bottom-24 flex flex-col items-center gap-4 z-20">
          {/* Avatar with '+' follow badge */}
          <div className="relative">
            <div className="w-11 h-11 rounded-full border-2 border-blue-500 bg-white p-0.5 flex items-center justify-center shadow-md">
              <TellmeLogo size="sm" />
            </div>
            <button
              onClick={() => onToggleFollow(currentClip.id)}
              className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                currentClip.isFollowing ? 'bg-slate-700 text-white' : 'bg-blue-600 text-white shadow-md'
              }`}
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>

          {/* Heart / Like */}
          <button
            onClick={() => onToggleLike(currentClip.id)}
            className="flex flex-col items-center gap-0.5 group cursor-pointer"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md transition-transform active:scale-125 ${
                currentClip.isLiked
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-black/30 text-white group-hover:bg-black/50'
              }`}
            >
              <Heart className={`w-5 h-5 ${currentClip.isLiked ? 'fill-current' : ''}`} />
            </div>
            <span className="text-[11px] font-bold font-mono">
              {currentClip.likes.toLocaleString()}
            </span>
          </button>

          {/* Comments icon -> Opens 'Comant' drawer */}
          <button
            onClick={() => setShowComments(true)}
            className="flex flex-col items-center gap-0.5 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md bg-black/30 text-white group-hover:bg-black/50 transition-transform active:scale-110">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold font-mono">
              {currentClip.commentsCount}
            </span>
          </button>

          {/* More options */}
          <button
            onClick={() => alert('خيارات المقطع (حفظ، مشاركة، إبلاغ)')}
            className="w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md bg-black/30 text-white hover:bg-black/50 transition-colors cursor-pointer"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Clip Details */}
        <div className="z-10 text-right pr-2 pb-2 max-w-[75%] mr-auto space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="font-bold text-base text-white hover:underline cursor-pointer">
              {currentClip.userName}
            </span>
            <span className="text-xs text-blue-200 font-mono">
              {currentClip.userHandle}
            </span>
          </div>

          <p className="text-xs text-white/90 line-clamp-2 leading-relaxed">
            {currentClip.title}
          </p>

          <p className="text-[11px] text-slate-200 font-mono tracking-wide">
            {currentClip.bio}
          </p>

          <div className="flex items-center gap-1.5 text-[11px] text-white/70 pt-1">
            <Music className="w-3.5 h-3.5 text-blue-400 animate-bounce" />
            <span className="truncate">Tellme Original Sound - Trend 2026</span>
          </div>
        </div>

        {/* Navigation Arrows for next/prev clip */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
          {currentIndex > 0 && (
            <button
              onClick={() => setCurrentIndex(currentIndex - 1)}
              className="w-8 h-8 rounded-xl bg-black/40 text-white flex items-center justify-center hover:bg-black/60 cursor-pointer"
            >
              ▲
            </button>
          )}
          {currentIndex < clips.length - 1 && (
            <button
              onClick={() => setCurrentIndex(currentIndex + 1)}
              className="w-8 h-8 rounded-xl bg-black/40 text-white flex items-center justify-center hover:bg-black/60 cursor-pointer"
            >
              ▼
            </button>
          )}
        </div>
      </div>

      {/* "Comant" (Comments) Sheet */}
      {showComments && (
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-white text-slate-800 rounded-t-3xl shadow-2xl flex flex-col z-40 border-t border-slate-200 animate-in slide-in-from-bottom duration-200">
          {/* Header matching slide 8: '< Comant' */}
          <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setShowComments(false)}
              className="flex items-center gap-1 text-blue-600 font-brand font-bold text-lg hover:bg-slate-50 px-2 py-0.5 rounded-xl cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              <span>Comant</span>
            </button>
            <span className="text-xs text-slate-400 font-semibold">
              {currentClip.comments.length} تعليق
            </span>
          </div>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {currentClip.comments.map((cm) => (
              <div key={cm.id} className="flex items-start gap-2.5 text-right">
                <TellmeLogo size="sm" />
                <div className="flex-1 bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900">{cm.userName}</span>
                    <span className="text-[10px] text-slate-400">{cm.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{cm.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Send Comant Bar */}
          <form
            onSubmit={handleSendComment}
            className="p-3 border-t border-slate-200 flex items-center gap-2 bg-white"
          >
            <button
              type="button"
              className="text-slate-400 p-2 rounded-xl hover:bg-slate-100 hover:text-blue-600 cursor-pointer"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>

            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Send Comant"
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 placeholder:text-slate-400 placeholder:font-brand placeholder:text-base outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />

            <button
              type="submit"
              disabled={!commentInput.trim()}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                commentInput.trim()
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-300'
              }`}
            >
              <TellmeLogo size="sm" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
