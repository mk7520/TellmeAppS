import React, { useState } from 'react';
import { CallRecord, Story } from '../types';
import { TellmeLogo } from './TellmeLogo';
import { StoriesBar } from './StoriesBar';
import { 
  Phone, 
  PhoneIncoming, 
  PhoneOutgoing, 
  PhoneMissed, 
  Video, 
  Search, 
  Plus, 
  MoreHorizontal,
  Mic,
  MicOff,
  VideoOff,
  Volume2
} from 'lucide-react';

interface CallListProps {
  calls: CallRecord[];
  stories: Story[];
  onStartCall: (name: string, kind: 'audio' | 'video') => void;
  onAddStory: () => void;
}

export const CallList: React.FC<CallListProps> = ({
  calls,
  stories,
  onStartCall,
  onAddStory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [newCallModal, setNewCallModal] = useState(false);

  const filteredCalls = calls.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
      {/* Top Header - Matching Slide 6: "Tellme Call" */}
      <div className="bg-white/80 backdrop-blur-md px-4 py-3 border-b border-slate-200 flex items-center justify-between shrink-0 shadow-2xs">
        <div className="flex items-center gap-2">
          <TellmeLogo size="sm" />
          <h1
            className="font-brand font-bold text-2xl text-blue-600 tracking-wide"
            style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
          >
            Tellme Call
          </h1>
        </div>

        <div className="flex items-center gap-1 text-slate-600">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 rounded-xl hover:bg-slate-100 hover:text-blue-600 transition-colors cursor-pointer"
            title="بحث في المكالمات"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setNewCallModal(true)}
            className="p-2 rounded-xl hover:bg-slate-100 hover:text-blue-600 transition-colors cursor-pointer"
            title="بدء مكالمة جديدة"
          >
            <Plus className="w-6 h-6 stroke-[2.2]" />
          </button>
        </div>
      </div>

      {showSearch && (
        <div className="p-3 bg-slate-50 border-b border-slate-200 animate-in fade-in">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في سجل المكالمات..."
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 shadow-2xs"
            autoFocus
          />
        </div>
      )}

      {/* Stories Bar - Slide 6 */}
      <StoriesBar stories={stories} onAddStory={onAddStory} />

      {/* Call History List - Slide 6 */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
        <div className="px-4 py-2 bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          سجل المكالمات الحديثة
        </div>

        {filteredCalls.map((call) => {
          const isMissed = call.type === 'missed';

          return (
            <div
              key={call.id}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors text-right"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <TellmeLogo size="md" />
                </div>

                <div className="flex flex-col">
                  <span
                    className={`font-bold text-sm ${
                      isMissed ? 'text-red-500' : 'text-slate-800'
                    }`}
                  >
                    {call.name}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    {call.type === 'incoming' && (
                      <PhoneIncoming className="w-3.5 h-3.5 text-emerald-500" />
                    )}
                    {call.type === 'outgoing' && (
                      <PhoneOutgoing className="w-3.5 h-3.5 text-blue-500" />
                    )}
                    {call.type === 'missed' && (
                      <PhoneMissed className="w-3.5 h-3.5 text-red-500" />
                    )}
                    <span>{call.timestamp}</span>
                    {call.duration && (
                      <span className="text-slate-500 font-mono">({call.duration})</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 text-slate-600">
                <button
                  onClick={() => onStartCall(call.name, call.callKind)}
                  className="p-2 rounded-xl hover:bg-slate-100 hover:text-blue-600 transition-colors cursor-pointer"
                  title="إعادة الاتصال"
                >
                  {call.callKind === 'video' ? (
                    <Video className="w-4 h-4" />
                  ) : (
                    <Phone className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => alert(`خيارات المكالمة مع ${call.name}`)}
                  className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Call Modal */}
      {newCallModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xs rounded-2xl p-5 border border-slate-200 shadow-xl space-y-4">
            <h3 className="font-bold text-slate-900 text-center">بدء مكالمة جديدة</h3>
            <p className="text-xs text-slate-500 text-center">
              اختر نوع المكالمة للتواصل الفوري عبر Tellme Voice & Video Engine:
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  setNewCallModal(false);
                  onStartCall('Tellme Official', 'audio');
                }}
                className="flex flex-col items-center gap-2 p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 text-blue-600 font-bold text-xs transition-all cursor-pointer shadow-2xs"
              >
                <Phone className="w-6 h-6" />
                <span>مكالمة صوتية</span>
              </button>

              <button
                onClick={() => {
                  setNewCallModal(false);
                  onStartCall('Tellme Official', 'video');
                }}
                className="flex flex-col items-center gap-2 p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 text-blue-600 font-bold text-xs transition-all cursor-pointer shadow-2xs"
              >
                <Video className="w-6 h-6" />
                <span>مكالمة مرئية</span>
              </button>
            </div>

            <button
              onClick={() => setNewCallModal(false)}
              className="w-full py-2 text-xs font-semibold text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
