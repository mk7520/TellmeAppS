import React, { useState } from 'react';
import { TellmeLogo } from './TellmeLogo';
import { Megaphone, Search, Plus, CheckCircle, Users, Bell, Share2 } from 'lucide-react';

export const ChannelsView: React.FC = () => {
  const [channels, setChannels] = useState([
    {
      id: 'ch1',
      name: 'قناة أخبار التقنية والذكاء الاصطناعي',
      subscribers: '34.5K',
      lastPost: 'إطلاق ميزة البث المباشر والتكامل السحابي في تحديث Tellme 1.24.',
      time: 'منذ 30 دقيقة',
      isJoined: true,
    },
    {
      id: 'ch2',
      name: 'Tellme Official Announcements',
      subscribers: '120K',
      lastPost: 'مرحباً بجميع المستخدمين الجدد! تواصل مجاني وسريع في أكثر من 180 دولة.',
      time: 'منذ ساعتين',
      isJoined: true,
    },
    {
      id: 'ch3',
      name: 'عالم التصميم وتجربة المستخدم (UI/UX)',
      subscribers: '18.2K',
      lastPost: 'تحليل واجهات منصات التواصل الاجتماعي الحديثة والألوان الحيوية.',
      time: 'أمس',
      isJoined: false,
    },
    {
      id: 'ch4',
      name: 'رواد الأعمال والابتكار التقني',
      subscribers: '9.4K',
      lastPost: 'كيف تبني مجتمعاً رقمياً نشطاً وتفاعلياً مع المستخدمين؟',
      time: 'منذ يومين',
      isJoined: false,
    },
  ]);

  const toggleJoin = (id: string) => {
    setChannels((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isJoined: !c.isJoined } : c))
    );
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md px-4 py-3 border-b border-slate-200 flex items-center justify-between shrink-0 shadow-2xs">
        <div className="flex items-center gap-2">
          <TellmeLogo size="sm" />
          <h1
            className="font-brand font-bold text-2xl text-blue-600 tracking-wide"
            style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
          >
            Tellme Channels
          </h1>
        </div>

        <button
          onClick={() => alert('إنشاء قناة جديدة على Tellme')}
          className="text-slate-600 p-2 rounded-xl hover:bg-slate-100 hover:text-blue-600 transition-colors cursor-pointer"
          title="إنشاء قناة"
        >
          <Plus className="w-6 h-6 stroke-[2.2]" />
        </button>
      </div>

      {/* Description */}
      <div className="p-3 bg-slate-50 border-b border-slate-200 text-xs text-slate-600 flex items-center gap-2">
        <Megaphone className="w-4 h-4 text-blue-600 shrink-0" />
        <span>تابع القنوات الرسمية لنشر الأخبار والمحتوى لعدد غير محدود من المتابعين.</span>
      </div>

      {/* Channels List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2">
        {channels.map((channel) => (
          <div
            key={channel.id}
            className="p-3 hover:bg-slate-50 rounded-2xl transition-colors space-y-2 text-right"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 border border-slate-200 flex items-center justify-center font-bold">
                  <Megaphone className="w-5 h-5" />
                </div>

                <div className="flex flex-col">
                  <h3 className="font-bold text-sm text-slate-800">{channel.name}</h3>
                  <span className="text-[11px] text-blue-600 font-medium">
                    {channel.subscribers} مشترك • {channel.time}
                  </span>
                </div>
              </div>

              <button
                onClick={() => toggleJoin(channel.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  channel.isJoined
                    ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-xs'
                }`}
              >
                {channel.isJoined ? 'مشترك' : 'انضمام +'}
              </button>
            </div>

            <p className="text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200 leading-relaxed shadow-2xs">
              {channel.lastPost}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
