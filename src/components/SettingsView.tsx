import React, { useState } from 'react';
import { TellmeLogo } from './TellmeLogo';
import { UserProfile, AppTab } from '../types';
import { 
  ChevronLeft, 
  Search, 
  Plus, 
  User, 
  Heart, 
  Sparkles, 
  Star, 
  Crown, 
  MessageSquare, 
  ShieldCheck, 
  Bell, 
  Database, 
  Smartphone, 
  Zap, 
  Globe,
  Info,
  LifeBuoy,
  LogOut
} from 'lucide-react';

interface SettingsViewProps {
  user: UserProfile;
  onNavigateTab: (tab: AppTab) => void;
  onOpenInfo: () => void;
  onOpenSupport: () => void;
  onOpenBots: () => void;
  isArabic: boolean;
  onToggleLanguage: () => void;
  onLogOut?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  user,
  onNavigateTab,
  onOpenInfo,
  onOpenSupport,
  onOpenBots,
  isArabic,
  onToggleLanguage,
  onLogOut,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [powerSaving, setPowerSaving] = useState(false);

  const settingsItems = [
    {
      id: 'account',
      title: 'Account',
      subtitle: user.phone,
      icon: User,
      action: () => onNavigateTab('profile'),
      hasChevron: true,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      id: 'favorite',
      title: 'Favorite',
      subtitle: 'الرسائل والمقاطع المفضلة',
      icon: Heart,
      action: () => alert('تم فتح قائمة المفضلة'),
      hasChevron: true,
      color: 'text-rose-500 bg-rose-50',
    },
    {
      id: 'features',
      title: 'Tellme features & Bots',
      subtitle: 'المساعد الذكي والبوتات والخدمات',
      icon: Sparkles,
      action: onOpenBots,
      hasChevron: true,
      color: 'text-amber-500 bg-amber-50',
      badge: 'جديد',
    },
    {
      id: 'star',
      title: 'star',
      subtitle: 'برنامج مكافآت النجوم',
      icon: Star,
      action: () => alert('برنامج Tellme Star للمكافآت'),
      hasChevron: true,
      color: 'text-yellow-500 bg-yellow-50',
    },
    {
      id: 'premium',
      title: 'Premiun',
      subtitle: 'العضوية المميزة بدون إعلانات',
      icon: Crown,
      action: () => alert('اشتراك Tellme Premium'),
      hasChevron: true,
      color: 'text-blue-600 bg-blue-100',
      badge: 'PRO',
    },
    {
      id: 'chats_settings',
      title: 'Chats Settings',
      subtitle: 'خلفيات المحادثات والخط وحجم النص',
      icon: MessageSquare,
      action: () => alert('إعدادات الدردشة: تغيير حجم الخط والألوان'),
      hasChevron: true,
      color: 'text-blue-500 bg-blue-50',
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      subtitle: 'التشفير التام وقفل البصمة',
      icon: ShieldCheck,
      action: () => alert('الخصوصية والأمان مشفرة تماماً عبر سيرفرات Tellme'),
      hasChevron: true,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      id: 'notifications',
      title: 'Notifications',
      subtitle: notificationsEnabled ? 'مفعلة' : 'معطلة',
      icon: Bell,
      action: () => setNotificationsEnabled(!notificationsEnabled),
      toggle: notificationsEnabled,
      color: 'text-purple-600 bg-purple-50',
    },
    {
      id: 'storage',
      title: 'Data & Storage',
      subtitle: 'استهلاك الإنترنت والتخزين السحابي',
      icon: Database,
      action: () => alert('المساحة التخزينية: 1.2 GB مستخدمة من TellmeCloud'),
      hasChevron: true,
      color: 'text-cyan-600 bg-cyan-50',
    },
    {
      id: 'devices',
      title: 'Devices',
      subtitle: 'الجلسات والأجهزة المتصلة',
      icon: Smartphone,
      action: () => alert('الأجهزة المتصلة: 2 جهاز نشط حالياً'),
      hasChevron: true,
      color: 'text-indigo-600 bg-indigo-50',
    },
    {
      id: 'power_saving',
      title: 'Power Saving',
      subtitle: powerSaving ? 'مفعل' : 'إيقاف توفير الطاقة',
      icon: Zap,
      action: () => setPowerSaving(!powerSaving),
      toggle: powerSaving,
      color: 'text-orange-500 bg-orange-50',
    },
    {
      id: 'languages',
      title: 'Languages',
      subtitle: isArabic ? 'العربية (Arabic)' : 'English (الإنجليزية)',
      icon: Globe,
      action: onToggleLanguage,
      hasChevron: true,
      color: 'text-teal-600 bg-teal-50',
      badge: isArabic ? 'عربي' : 'EN',
    },
    {
      id: 'info',
      title: 'Tellme Information',
      subtitle: 'معلومات التطبيق، الإصدار، والمطور',
      icon: Info,
      action: onOpenInfo,
      hasChevron: true,
      color: 'text-slate-600 bg-slate-100',
    },
    {
      id: 'support',
      title: 'Tellme Support',
      subtitle: 'مركز المساعدة والتواصل مع الدعم',
      icon: LifeBuoy,
      action: onOpenSupport,
      hasChevron: true,
      color: 'text-red-500 bg-red-50',
    },
  ];

  const filteredItems = settingsItems.filter((i) =>
    i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
      {/* Top Header - Matching slide 11: "Tellme Settings" */}
      <div className="bg-white/80 backdrop-blur-md px-4 py-3 border-b border-slate-200 flex items-center justify-between shrink-0 shadow-2xs">
        <div className="flex items-center gap-2">
          <TellmeLogo size="sm" />
          <h1
            className="font-brand font-bold text-2xl text-blue-600 tracking-wide"
            style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
          >
            Tellme Settings
          </h1>
        </div>

        <div className="flex items-center gap-1 text-slate-600">
          <button
            onClick={() => alert('إضافة حساب إضافي في Tellme')}
            className="p-2 rounded-xl hover:bg-slate-100 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <Plus className="w-6 h-6 stroke-[2.2]" />
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="p-3 bg-slate-50 border-b border-slate-200">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute right-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث في الإعدادات..."
            className="w-full bg-white border border-slate-200 rounded-xl pr-9 pl-4 py-2 text-xs text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 shadow-2xs"
          />
        </div>
      </div>

      {/* Settings list - matching slide 11 */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100 pb-6">
        {filteredItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={item.action}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors text-right group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.color}`}>
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-800 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </span>
                    {item.badge && (
                      <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-2xs">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400">{item.subtitle}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {item.toggle !== undefined ? (
                  <div
                    className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                      item.toggle ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        item.toggle ? 'translate-x-0' : '-translate-x-5'
                      }`}
                    />
                  </div>
                ) : (
                  <ChevronLeft className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:-translate-x-0.5 transition-all" />
                )}
              </div>
            </button>
          );
        })}

        {/* Log Out Button */}
        {onLogOut && (
          <div className="p-4 pt-2">
            <button
              onClick={onLogOut}
              className="w-full px-4 py-3 rounded-xl border border-rose-200 bg-rose-50/70 hover:bg-rose-100/80 text-rose-600 transition-colors flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-rose-100 text-rose-600 group-hover:scale-105 transition-transform">
                  <LogOut className="w-5 h-5 stroke-[2]" />
                </div>
                <div className="text-right">
                  <span className="font-bold text-sm block">تسجيل الخروج</span>
                  <span className="text-xs text-rose-500">العودة إلى شاشة تسجيل الدخول والترحيب</span>
                </div>
              </div>
              <ChevronLeft className="w-4 h-4 text-rose-400 group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
