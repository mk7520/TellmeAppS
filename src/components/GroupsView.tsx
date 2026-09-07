import React, { useState } from 'react';
import { TellmeLogo } from './TellmeLogo';
import { Users, Plus, MessageCircle, Phone, Lock, Shield } from 'lucide-react';

interface GroupsViewProps {
  onOpenChat: (groupName: string) => void;
}

export const GroupsView: React.FC<GroupsViewProps> = ({ onOpenChat }) => {
  const [groups] = useState([
    {
      id: 'g1',
      name: 'فريق مطوري Tellme (Core Devs)',
      membersCount: 14,
      lastActive: 'نشط الآن',
      unread: 3,
      avatar: null,
      desc: 'مناقشة بنية النظام وواجهات المستخدم ومكتبات React',
    },
    {
      id: 'g2',
      name: 'عائلة الأصدقاء والمقربين 🌟',
      membersCount: 8,
      lastActive: 'منذ 10 دقائق',
      unread: 0,
      avatar: null,
      desc: 'مشاركة الصور ومقاطع Clips والمناسبات العائلية',
    },
    {
      id: 'g3',
      name: 'نادي القراءة والكتب 📚',
      membersCount: 42,
      lastActive: 'منذ ساعتين',
      unread: 1,
      avatar: null,
      desc: 'مناقشة كتاب الأسبوع والمقالات التقنية',
    },
    {
      id: 'g4',
      name: 'عشاق الرياضة والأنشطة ⚽🏋️‍♂️',
      membersCount: 26,
      lastActive: 'أمس',
      unread: 0,
      avatar: null,
      desc: 'تنظيم مباريات كرة القدم والتمارين الصباحية',
    },
  ]);

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
            Tellme Groups
          </h1>
        </div>

        <button
          onClick={() => alert('إنشاء مجموعة جديدة')}
          className="text-slate-600 p-2 rounded-xl hover:bg-slate-100 hover:text-blue-600 transition-colors cursor-pointer"
          title="إنشاء مجموعة"
        >
          <Plus className="w-6 h-6 stroke-[2.2]" />
        </button>
      </div>

      {/* Info notice */}
      <div className="p-3 bg-slate-50 border-b border-slate-200 text-xs text-slate-600 flex items-center gap-2">
        <Users className="w-4 h-4 text-blue-600 shrink-0" />
        <span>مجموعات تفاعلية مشفرة بالكامل تتسع حتى 200,000 عضو مع مكالمات جماعية.</span>
      </div>

      {/* Groups list */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2">
        {groups.map((grp) => (
          <div
            key={grp.id}
            onClick={() => onOpenChat(grp.name)}
            className="p-3 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer text-right group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 border border-slate-200 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                  <Users className="w-5 h-5" />
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-800 group-hover:text-blue-600 transition-colors">
                      {grp.name}
                    </h3>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {grp.membersCount} عضو • {grp.lastActive}
                  </span>
                </div>
              </div>

              {grp.unread > 0 ? (
                <span className="min-w-[20px] h-5 px-1.5 bg-blue-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {grp.unread}
                </span>
              ) : (
                <MessageCircle className="w-4 h-4 text-slate-300 group-hover:text-blue-600" />
              )}
            </div>

            <p className="text-xs text-slate-500 mt-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              {grp.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
