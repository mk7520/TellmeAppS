import React, { useState } from 'react';
import { Conversation, Story } from '../types';
import { StoriesBar } from './StoriesBar';
import { TellmeLogo } from './TellmeLogo';
import { Search, Plus, ChevronLeft, CheckCheck } from 'lucide-react';

interface ChatListProps {
  conversations: Conversation[];
  stories: Story[];
  onSelectConversation: (conv: Conversation) => void;
  onNewChat: () => void;
  onAddStory: () => void;
}

export const ChatList: React.FC<ChatListProps> = ({
  conversations,
  stories,
  onSelectConversation,
  onNewChat,
  onAddStory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'groups'>('all');

  const filteredConversations = conversations.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filter === 'unread') return (c.unreadCount ?? 0) > 0;
    if (filter === 'groups') return c.name.includes('مجموعة') || c.name.includes('Devs');
    return true;
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
      {/* Top Header - Matching Slide 5: "Tellme Chat" with Search and Plus */}
      <div className="bg-white/80 backdrop-blur-md px-4 py-3 border-b border-slate-200 flex items-center justify-between shrink-0 shadow-2xs">
        <div className="flex items-center gap-2">
          <TellmeLogo size="sm" />
          <h1
            className="font-brand font-bold text-2xl text-blue-600 tracking-wide"
            style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
          >
            Tellme Chat
          </h1>
        </div>

        <div className="flex items-center gap-1 text-slate-600">
          <button
            onClick={() => setShowSearchInput(!showSearchInput)}
            className="p-2 rounded-xl hover:bg-slate-100 hover:text-blue-600 transition-colors cursor-pointer"
            title="بحث في المحادثات"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={onNewChat}
            className="p-2 rounded-xl hover:bg-slate-100 hover:text-blue-600 transition-colors cursor-pointer"
            title="محادثة جديدة"
          >
            <Plus className="w-6 h-6 stroke-[2.2]" />
          </button>
        </div>
      </div>

      {/* Expandable Search Input */}
      {showSearchInput && (
        <div className="p-3 bg-slate-50 border-b border-slate-200 animate-in fade-in">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute right-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن اسم أو رسالة..."
              className="w-full bg-white border border-slate-200 rounded-xl pr-9 pl-4 py-2 text-xs text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 shadow-2xs"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Horizontal Stories Carousel - Slide 5 */}
      <StoriesBar stories={stories} onAddStory={onAddStory} />

      {/* Filter Chips matching Sleek Interface button styles */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50/70 border-b border-slate-100 text-xs font-semibold">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
            filter === 'all'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          الكل ({conversations.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
            filter === 'unread'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          غير مقروءة
        </button>
        <button
          onClick={() => setFilter('groups')}
          className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
            filter === 'groups'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          المجموعات
        </button>
      </div>

      {/* Conversations List - Slide 5 */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
        {filteredConversations.length === 0 ? (
          <div className="p-8 text-center text-slate-400 flex flex-col items-center">
            <TellmeLogo size="lg" className="opacity-40 mb-3" />
            <p className="text-sm font-medium">لا توجد محادثات مطابقة</p>
          </div>
        ) : (
          filteredConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => onSelectConversation(conv)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors text-right group cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {/* Avatar with Tellme signature icon or image */}
                <div className="relative shrink-0">
                  {conv.avatar ? (
                    <img
                      src={conv.avatar}
                      alt={conv.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <TellmeLogo size="md" />
                  )}
                  {conv.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white ring-1 ring-emerald-300" />
                  )}
                </div>

                {/* Text info: Name and Last Message */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                      {conv.name}
                    </h3>
                    <span className="text-[11px] text-slate-400 font-medium shrink-0 mr-2">
                      {conv.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate leading-relaxed">
                    {conv.lastMessage}
                  </p>
                </div>
              </div>

              {/* Right side: Chevron '>' or unread badge */}
              <div className="flex items-center gap-2 mr-2 shrink-0">
                {conv.unreadCount && conv.unreadCount > 0 ? (
                  <span className="min-w-[20px] h-5 px-1.5 bg-blue-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-xs">
                    {conv.unreadCount}
                  </span>
                ) : (
                  <ChevronLeft className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors group-hover:-translate-x-0.5" />
                )}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};
