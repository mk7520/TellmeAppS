import React, { useState } from 'react';
import { Story } from '../types';
import { Plus, X, Heart, Send } from 'lucide-react';
import { TellmeLogo } from './TellmeLogo';

interface StoriesBarProps {
  stories: Story[];
  onAddStory?: () => void;
}

export const StoriesBar: React.FC<StoriesBarProps> = ({ stories, onAddStory }) => {
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [replyText, setReplyText] = useState('');
  const [liked, setLiked] = useState(false);

  return (
    <>
      <div className="w-full overflow-x-auto py-3 px-4 border-b border-slate-200 bg-white shrink-0 flex items-center gap-3 select-none no-scrollbar">
        {/* Current user's story / Add Story button */}
        <button
          onClick={onAddStory}
          className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer"
        >
          <div className="relative w-14 h-14 rounded-full p-[2px] border-2 border-dashed border-blue-600 flex items-center justify-center bg-blue-50 transition-transform group-hover:scale-105">
            <TellmeLogo size="sm" />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center border-2 border-white shadow-xs">
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </div>
          <span className="text-[11px] font-semibold text-slate-700 truncate w-14 text-center">
            قصتي
          </span>
        </button>

        {/* Stories list */}
        {stories.map((story) => (
          <button
            key={story.id}
            onClick={() => setActiveStory(story)}
            className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer"
          >
            <div
              className={`w-14 h-14 rounded-full p-[2.5px] transition-transform group-hover:scale-105 ${
                story.viewed
                  ? 'border-2 border-slate-200'
                  : 'border-2 border-blue-600 ring-2 ring-blue-100'
              }`}
            >
              <img
                src={story.imageUrl}
                alt={story.userName}
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-[11px] font-semibold text-slate-700 truncate w-14 text-center">
              {story.userName}
            </span>
          </button>
        ))}
      </div>

      {/* Story Viewer Modal */}
      {activeStory && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
          <div className="relative w-full max-w-sm h-[680px] max-h-[92vh] rounded-3xl overflow-hidden bg-slate-900 flex flex-col justify-between shadow-2xl border border-slate-700">
            {/* Background image */}
            <img
              src={activeStory.imageUrl}
              alt={activeStory.userName}
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />

            {/* Top header with progress bar */}
            <div className="relative z-10 p-4 space-y-3">
              {/* Progress bar */}
              <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-2/3 animate-pulse rounded-full" />
              </div>

              {/* Author info & Close */}
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full border border-blue-400 p-0.5">
                    <img
                      src={activeStory.imageUrl}
                      alt={activeStory.userName}
                      className="w-full h-full object-cover rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{activeStory.userName}</h4>
                    <span className="text-[10px] text-blue-200">{activeStory.timeAgo}</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveStory(null)}
                  className="w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Bottom: Caption & Reply */}
            <div className="relative z-10 p-4 space-y-3">
              {activeStory.caption && (
                <p className="text-white text-sm bg-black/50 backdrop-blur-sm p-3 rounded-2xl border border-white/10 leading-relaxed">
                  {activeStory.caption}
                </p>
              )}

              <div className="flex items-center gap-2">
                <div className="flex-1 bg-white/20 backdrop-blur-md rounded-full border border-white/30 px-3.5 py-1.5 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="رد على القصة..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full bg-transparent text-xs text-white placeholder:text-white/70 outline-none"
                  />
                  <button
                    onClick={() => {
                      if (replyText.trim()) {
                        setReplyText('');
                        alert('تم إرسال ردك على القصة بنجاح!');
                      }
                    }}
                    className="text-blue-400 hover:text-white"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => setLiked(!liked)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${
                    liked
                      ? 'bg-blue-600 border-blue-600 text-white scale-110'
                      : 'bg-white/20 border-white/30 text-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
