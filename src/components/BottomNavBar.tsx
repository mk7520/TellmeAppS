import React from 'react';
import { 
  MessageCircle, 
  Phone, 
  User, 
  Play, 
  Megaphone, 
  Users, 
  Settings 
} from 'lucide-react';
import { AppTab } from '../types';

interface BottomNavBarProps {
  currentTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  unreadChatsCount?: number;
  missedCallsCount?: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentTab,
  onTabChange,
  unreadChatsCount = 3,
  missedCallsCount = 1,
}) => {
  const tabs = [
    {
      id: 'chat' as AppTab,
      label: 'الدردشة',
      icon: MessageCircle,
      badge: unreadChatsCount > 0 ? unreadChatsCount : null,
    },
    {
      id: 'call' as AppTab,
      label: 'المكالمات',
      icon: Phone,
      badge: missedCallsCount > 0 ? missedCallsCount : null,
    },
    {
      id: 'contacts' as AppTab,
      label: 'جهات الاتصال',
      icon: User,
    },
    {
      id: 'clips' as AppTab,
      label: 'المقاطع',
      icon: Play,
    },
    {
      id: 'channels' as AppTab,
      label: 'القنوات',
      icon: Megaphone,
    },
    {
      id: 'groups' as AppTab,
      label: 'المجموعات',
      icon: Users,
    },
    {
      id: 'settings' as AppTab,
      label: 'الإعدادات',
      icon: Settings,
    },
  ];

  return (
    <nav
      id="bottom-navigation-bar"
      aria-label="شريط التنقل السفلي"
      className="bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around z-30 shrink-0 select-none shadow-sm"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;

        return (
          <button
            key={tab.id}
            id={`nav-btn-${tab.id}`}
            onClick={() => onTabChange(tab.id)}
            className={`relative flex flex-col items-center justify-center p-1.5 rounded-xl transition-all duration-200 group ${
              isActive
                ? 'text-[#ff006b]'
                : 'text-slate-400 hover:text-slate-700'
            }`}
            title={tab.label}
          >
            {/* Active background pill matching Tellme logo theme */}
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                isActive
                  ? 'bg-[#fff0f5] text-[#ff006b] shadow-2xs'
                  : 'group-hover:bg-slate-50'
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-transform ${
                  isActive ? 'stroke-[2.2] text-[#ff006b]' : 'stroke-[1.8]'
                }`}
              />
            </div>

            {/* Notification Badge */}
            {tab.badge && (
              <span className="absolute top-0.5 right-1 min-w-[17px] h-[17px] px-1 bg-[#ff006b] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs border-2 border-white">
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
