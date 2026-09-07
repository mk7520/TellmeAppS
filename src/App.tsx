/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppTab, Conversation, Story, CallRecord, Contact, ClipItem, UserProfile, MuteDuration, MutedTagRecord } from './types';
import { 
  initialUser, 
  initialStories, 
  initialConversations, 
  initialCalls, 
  initialContacts, 
  initialClips 
} from './data/mockData';

import { PhoneFrame } from './components/PhoneFrame';
import { TellmeLogo } from './components/TellmeLogo';
import { BottomNavBar } from './components/BottomNavBar';
import { AuthFlow } from './components/AuthFlow';
import { ChatList } from './components/ChatList';
import { ActiveChat } from './components/ActiveChat';
import { CallList } from './components/CallList';
import { ActiveCallModal } from './components/ActiveCallModal';
import { ContactsList } from './components/ContactsList';
import { ClipsFeed } from './components/ClipsFeed';
import { ProfileView } from './components/ProfileView';
import { SettingsView } from './components/SettingsView';
import { BotsView } from './components/BotsView';
import { AboutAppView } from './components/AboutAppView';
import { SupportView } from './components/SupportView';
import { ChannelsView } from './components/ChannelsView';
import { GroupsView } from './components/GroupsView';

import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, 
  Monitor, 
  RotateCcw, 
  Languages, 
  Sparkles,
  Info,
  ShieldCheck,
  MessageCircle,
  Phone as PhoneIcon,
  Play,
  RefreshCw,
  Moon,
  LogIn,
  LogOut,
  Share2,
  Copy,
  Check,
  EyeOff,
  Undo2,
  TrendingUp,
  Clock,
  Calendar,
  ShieldAlert,
  X,
  CheckCircle2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  Tooltip as RechartsTooltip 
} from 'recharts';

export default function App() {
  // App navigation and view state
  const [isDesktopMode, setIsDesktopMode] = useState(false);
  const [isAuthMode, setIsAuthMode] = useState(false);
  const [isArabic, setIsArabic] = useState(true);

  const [currentTab, setCurrentTab] = useState<AppTab>('chat');
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);

  // Active call modal state
  const [activeCall, setActiveCall] = useState<{
    contactName: string;
    kind: 'audio' | 'video';
  } | null>(null);

  // Core mock data in state
  const [user, setUser] = useState<UserProfile>(initialUser);
  const [stories, setStories] = useState<Story[]>(initialStories);
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [calls, setCalls] = useState<CallRecord[]>(initialCalls);
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [clips, setClips] = useState<ClipItem[]>(initialClips);

  // Trending sidebar topics state
  const [isUpdatingTrending, setIsUpdatingTrending] = useState(false);
  const [trendingSetIndex, setTrendingSetIndex] = useState(0);
  const [isSidebarDark, setIsSidebarDark] = useState(false);
  const [activeShareTag, setActiveShareTag] = useState<string | null>(null);
  const [copiedTag, setCopiedTag] = useState<string | null>(null);
  const [mutedTags, setMutedTags] = useState<MutedTagRecord[]>([]);
  const [sharedChatTag, setSharedChatTag] = useState<string | null>(null);
  const [trendingFeedbackMessage, setTrendingFeedbackMessage] = useState<string | null>(null);
  const [showMutedDetails, setShowMutedDetails] = useState(false);
  const [selectedTrendingTag, setSelectedTrendingTag] = useState<string>('#ProductDesign2026');

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.trending-share-container')) {
        setActiveShareTag(null);
      }
      if (!target.closest('.muted-details-container')) {
        setShowMutedDetails(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Periodic purge of expired mutes
  useEffect(() => {
    const purgeExpired = () => {
      const now = Date.now();
      setMutedTags((prev) => prev.filter((m) => m.expiresAt === null || m.expiresAt > now));
    };
    const timer = setInterval(purgeExpired, 10000);
    return () => clearInterval(timer);
  }, []);

  const isTagMuted = (tag: string) => {
    const item = mutedTags.find((m) => m.tag === tag);
    if (!item) return false;
    if (item.expiresAt === null) return true;
    return item.expiresAt > Date.now();
  };

  const activeMutedTags = mutedTags.filter((m) => m.expiresAt === null || m.expiresAt > Date.now());

  const formatRemainingTime = (expiresAt: number | null) => {
    if (expiresAt === null) return 'كتم دائم';
    const remainingMs = expiresAt - Date.now();
    if (remainingMs <= 0) return 'منتهي';
    const remainingMins = Math.ceil(remainingMs / (60 * 1000));
    if (remainingMins < 60) return `باقي ${remainingMins} دقيقة`;
    const remainingHours = Math.ceil(remainingMins / 60);
    return `باقي ${remainingHours} ساعة`;
  };

  const handleCopyTag = (tag: string) => {
    navigator.clipboard.writeText(tag);
    setCopiedTag(tag);
    setTimeout(() => {
      setCopiedTag(null);
    }, 2000);
  };

  const handleMuteTag = (tag: string, duration: MuteDuration = 'permanent') => {
    const now = Date.now();
    let expiresAt: number | null = null;
    if (duration === '1h') {
      expiresAt = now + 60 * 60 * 1000;
    } else if (duration === '24h') {
      expiresAt = now + 24 * 60 * 60 * 1000;
    }

    setMutedTags((prev) => {
      const filtered = prev.filter((m) => m.tag !== tag);
      return [...filtered, { tag, duration, mutedAt: now, expiresAt }];
    });

    const durationLabel = 
      duration === '1h' ? 'لمدة ساعة' : 
      duration === '24h' ? 'لمدة 24 ساعة' : 
      'بشكل دائم';

    setTrendingFeedbackMessage(`تم كتم الوسم ${tag} (${durationLabel})`);
    setTimeout(() => {
      setTrendingFeedbackMessage((curr) => (curr?.includes(tag) ? null : curr));
    }, 3500);

    setActiveShareTag(null);
  };

  const handleUnmuteTag = (tag: string) => {
    setMutedTags((prev) => prev.filter((m) => m.tag !== tag));
    setTrendingFeedbackMessage(`تم إلغاء كتم الوسم ${tag}`);
    setTimeout(() => {
      setTrendingFeedbackMessage((curr) => (curr?.includes(tag) ? null : curr));
    }, 2500);
  };

  const handleUnmuteAll = () => {
    setMutedTags([]);
    setShowMutedDetails(false);
    setTrendingFeedbackMessage('تمت استعادة جميع الوسوم المكتومة');
    setTimeout(() => {
      setTrendingFeedbackMessage(null);
    }, 2500);
  };

  const handleShareTagToChat = (tag: string) => {
    if (sharedChatTag) return;
    setSharedChatTag(tag);

    const targetConv = activeConversation || conversations[0];
    if (targetConv) {
      const newMsg = {
        id: `msg_${Date.now()}`,
        senderId: 'user',
        senderName: user.name,
        text: `تفقد هذا الموضوع الرائج على منصة Tellme: ${tag}`,
        timestamp: new Date().toLocaleTimeString('ar-SA', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isOutgoing: true,
        status: 'sent' as const,
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === targetConv.id
            ? {
                ...c,
                lastMessage: newMsg.text,
                timestamp: 'الآن',
                messages: [...c.messages, newMsg],
              }
            : c
        )
      );
      setActiveConversation({
        ...targetConv,
        lastMessage: newMsg.text,
        messages: [...targetConv.messages, newMsg],
      });
    }

    setTrendingFeedbackMessage(`✓ تمت مشاركة الوسم ${tag} في الدردشة`);

    // Allow subtle checkmark transition to be appreciated visually before tab switch
    setTimeout(() => {
      setCurrentTab('chat');
      setActiveShareTag(null);
      setSharedChatTag(null);
      setTimeout(() => setTrendingFeedbackMessage(null), 2500);
    }, 850);
  };

  const handleNativeShareTag = async (tag: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Trending on Tellme: ${tag}`,
          text: `تفقد هذا الموضوع الرائج على منصة Tellme: ${tag}`,
          url: window.location.href,
        });
      } catch {
        // User closed share dialog
      }
    } else {
      handleCopyTag(tag);
    }
    setActiveShareTag(null);
  };

  const trendingDatasets = [
    [
      { 
        category: 'Design • Trending', 
        tag: '#ProductDesign2026', 
        posts: '12.5k posts',
        growth: '+38.4%',
        history: [
          { time: '04:00', activity: 2100 },
          { time: '08:00', activity: 3800 },
          { time: '12:00', activity: 7200 },
          { time: '16:00', activity: 9400 },
          { time: '20:00', activity: 11100 },
          { time: 'الآن', activity: 12500 }
        ]
      },
      { 
        category: 'Technology • Trending', 
        tag: 'Spatial Computing', 
        posts: '8,291 posts',
        growth: '+24.1%',
        history: [
          { time: '04:00', activity: 1400 },
          { time: '08:00', activity: 2300 },
          { time: '12:00', activity: 4800 },
          { time: '16:00', activity: 6100 },
          { time: '20:00', activity: 7300 },
          { time: 'الآن', activity: 8291 }
        ]
      },
      { 
        category: 'UI/UX • Trending', 
        tag: 'Minimalist UX', 
        posts: '4,102 posts',
        growth: '+15.8%',
        history: [
          { time: '04:00', activity: 900 },
          { time: '08:00', activity: 1500 },
          { time: '12:00', activity: 2300 },
          { time: '16:00', activity: 3100 },
          { time: '20:00', activity: 3700 },
          { time: 'الآن', activity: 4102 }
        ]
      },
    ],
    [
      { 
        category: 'Mobile • Trending', 
        tag: '#TellmeWeb2026', 
        posts: '16.4k posts',
        growth: '+46.2%',
        history: [
          { time: '04:00', activity: 3200 },
          { time: '08:00', activity: 6100 },
          { time: '12:00', activity: 10400 },
          { time: '16:00', activity: 13200 },
          { time: '20:00', activity: 15100 },
          { time: 'الآن', activity: 16400 }
        ]
      },
      { 
        category: 'Realtime • Trending', 
        tag: 'WebRTC HD Voice', 
        posts: '9,120 posts',
        growth: '+19.5%',
        history: [
          { time: '04:00', activity: 1800 },
          { time: '08:00', activity: 3100 },
          { time: '12:00', activity: 5400 },
          { time: '16:00', activity: 6900 },
          { time: '20:00', activity: 8100 },
          { time: 'الآن', activity: 9120 }
        ]
      },
      { 
        category: 'Design • Trending', 
        tag: 'Slate Dark & Light', 
        posts: '5,340 posts',
        growth: '+11.8%',
        history: [
          { time: '04:00', activity: 1100 },
          { time: '08:00', activity: 1900 },
          { time: '12:00', activity: 3100 },
          { time: '16:00', activity: 4200 },
          { time: '20:00', activity: 4900 },
          { time: 'الآن', activity: 5340 }
        ]
      },
    ],
    [
      { 
        category: 'AI & Bot • Trending', 
        tag: 'Tellme AI Assistant', 
        posts: '14.8k posts',
        growth: '+52.0%',
        history: [
          { time: '04:00', activity: 2600 },
          { time: '08:00', activity: 5400 },
          { time: '12:00', activity: 8900 },
          { time: '16:00', activity: 11800 },
          { time: '20:00', activity: 13500 },
          { time: 'الآن', activity: 14800 }
        ]
      },
      { 
        category: 'Clips • Trending', 
        tag: '#TellmeClipsUS', 
        posts: '11,230 posts',
        growth: '+31.4%',
        history: [
          { time: '04:00', activity: 2100 },
          { time: '08:00', activity: 4300 },
          { time: '12:00', activity: 6800 },
          { time: '16:00', activity: 8900 },
          { time: '20:00', activity: 10200 },
          { time: 'الآن', activity: 11230 }
        ]
      },
      { 
        category: 'Community • Trending', 
        tag: 'Channel Discussions', 
        posts: '6,780 posts',
        growth: '+16.2%',
        history: [
          { time: '04:00', activity: 1200 },
          { time: '08:00', activity: 2300 },
          { time: '12:00', activity: 3900 },
          { time: '16:00', activity: 5100 },
          { time: '20:00', activity: 6100 },
          { time: 'الآن', activity: 6780 }
        ]
      },
    ]
  ];

  const handleRefreshTrending = () => {
    if (isUpdatingTrending) return;
    setIsUpdatingTrending(true);
    setTimeout(() => {
      setTrendingSetIndex((prev) => (prev + 1) % trendingDatasets.length);
      setIsUpdatingTrending(false);
    }, 750);
  };

  // Handlers
  const handleSelectConversation = (conv: Conversation) => {
    setActiveConversation(conv);
    // Mark messages as read
    setConversations((prev) =>
      prev.map((c) => (c.id === conv.id ? { ...c, unreadCount: 0 } : c))
    );
  };

  const handleSendMessage = (
    text: string,
    mediaType?: 'image' | 'video' | 'audio' | 'file'
  ) => {
    if (!activeConversation) return;

    const newMsg = {
      id: `msg_${Date.now()}`,
      senderId: 'user',
      senderName: user.name,
      text: mediaType ? undefined : text,
      mediaType,
      timestamp: new Date().toLocaleTimeString('ar-SA', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isOutgoing: true,
      status: 'sent' as const,
    };

    const updatedConvs = conversations.map((c) => {
      if (c.id === activeConversation.id) {
        const updatedMsgs = [...c.messages, newMsg];
        return {
          ...c,
          lastMessage: text,
          timestamp: 'الآن',
          messages: updatedMsgs,
        };
      }
      return c;
    });

    setConversations(updatedConvs);
    setActiveConversation((prev) =>
      prev ? { ...prev, lastMessage: text, messages: [...prev.messages, newMsg] } : null
    );

    // Auto-reply simulation for Tellme Official or bots
    if (activeConversation.id === 'c1') {
      setTimeout(() => {
        const replyMsg = {
          id: `reply_${Date.now()}`,
          senderId: 'c1',
          senderName: 'Tellme Official',
          text: 'شكراً لرسالتك! نحن هنا دائماً لتسهيل تواصلك عبر أحدث تقنيات منصة Tellme.',
          timestamp: new Date().toLocaleTimeString('ar-SA', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          isOutgoing: false,
          status: 'delivered' as const,
        };

        setConversations((latest) =>
          latest.map((c) =>
            c.id === 'c1'
              ? {
                  ...c,
                  lastMessage: replyMsg.text,
                  messages: [...c.messages, replyMsg],
                }
              : c
          )
        );

        setActiveConversation((prev) =>
          prev && prev.id === 'c1'
            ? { ...prev, lastMessage: replyMsg.text, messages: [...prev.messages, replyMsg] }
            : prev
        );
      }, 1000);
    }
  };

  const handleStartCall = (name: string, kind: 'audio' | 'video') => {
    setActiveCall({ contactName: name, kind });
    // Add to call log
    const newCall: CallRecord = {
      id: `call_${Date.now()}`,
      name,
      type: 'outgoing',
      callKind: kind,
      timestamp: 'الآن',
    };
    setCalls((prev) => [newCall, ...prev]);
  };

  const handleAddStory = () => {
    const newStory: Story = {
      id: `story_${Date.now()}`,
      userName: 'قصتي اليوم',
      imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80',
      caption: 'يوم جميل ومميز مع الأصدقاء في منصة Tellme!',
      timeAgo: 'الآن',
      viewed: false,
    };
    setStories((prev) => [newStory, ...prev]);
    alert('تم نشر قصة جديدة بنجاح في Tellme!');
  };

  const handleToggleLike = (clipId: string) => {
    setClips((prev) =>
      prev.map((cl) =>
        cl.id === clipId
          ? {
              ...cl,
              isLiked: !cl.isLiked,
              likes: cl.isLiked ? cl.likes - 1 : cl.likes + 1,
            }
          : cl
      )
    );
  };

  const handleToggleFollow = (clipId: string) => {
    setClips((prev) =>
      prev.map((cl) =>
        cl.id === clipId ? { ...cl, isFollowing: !cl.isFollowing } : cl
      )
    );
  };

  const handleAddComment = (clipId: string, text: string) => {
    setClips((prev) =>
      prev.map((cl) => {
        if (cl.id === clipId) {
          const newCm = {
            id: `cm_${Date.now()}`,
            userName: user.name,
            text,
            timestamp: 'الآن',
          };
          return {
            ...cl,
            commentsCount: cl.commentsCount + 1,
            comments: [newCm, ...cl.comments],
          };
        }
        return cl;
      })
    );
  };

  const handleAddNewContact = (contactData: Partial<Contact>) => {
    const newContact: Contact = {
      id: `cnt_${Date.now()}`,
      name: contactData.name || 'جهة اتصال جديدة',
      username: contactData.username || '@user',
      phone: contactData.phone || '+966 50 000 0000',
      statusText: contactData.statusText || 'Lets to 5m',
      isOnline: true,
      categoryLetter: (contactData.name || 'ج').charAt(0),
    };
    setContacts((prev) => [newContact, ...prev]);
    alert(`تمت إضافة ${newContact.name} إلى جهات اتصالك بنجاح.`);
  };

  // Unread badge calculations
  const totalUnreadChats = conversations.reduce(
    (acc, curr) => acc + (curr.unreadCount || 0),
    0
  );
  const missedCallsCount = calls.filter((c) => c.type === 'missed').length;

  return (
    <div
      dir={isArabic ? 'rtl' : 'ltr'}
      className="min-h-screen w-full bg-[#f8fafc] text-[#1e293b] flex flex-col font-sans"
    >
      {/* Top Application Control & Switcher Bar - Sleek Interface Header */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 h-16 flex items-center justify-between z-30 sticky top-0">
        <div className="flex items-center gap-3">
          <TellmeLogo size="md" withText />
          <span className="hidden sm:inline-block text-xs bg-[#fff0f5] text-[#ff006b] font-semibold px-2.5 py-0.5 rounded-full border border-[#ffe4ee]">
            V1.24 Sleek
          </span>
        </div>

        {/* View Mode & Utility Switchers */}
        <div className="flex items-center gap-2.5 text-xs">
          {/* Mobile vs Desktop platform mode */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setIsDesktopMode(false)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                !isDesktopMode
                  ? 'bg-[#ff006b] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="عرض إطار الهاتف النموذجي كما في التصميم"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>إطار الهاتف</span>
            </button>

            <button
              onClick={() => setIsDesktopMode(true)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                isDesktopMode
                  ? 'bg-[#ff006b] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="عرض موقع تواصل واسع للشاشات الكاملة"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>موقع تواصل واسع</span>
            </button>
          </div>

          {/* Login / Auth button */}
          <button
            onClick={() => setIsAuthMode(!isAuthMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer ${
              isAuthMode
                ? 'bg-[#ff006b] border-[#ff006b] text-white shadow-sm'
                : 'border-slate-200 bg-white hover:bg-[#fff0f5] hover:border-[#ffccd9] text-slate-700 hover:text-[#ff006b] shadow-2xs'
            }`}
            title="شاشة تسجيل الدخول وإنشاء الحساب في Tellme"
          >
            {isAuthMode ? (
              <>
                <RotateCcw className="w-3.5 h-3.5" />
                <span>العودة للرئيسية</span>
              </>
            ) : (
              <>
                <LogIn className="w-3.5 h-3.5 text-[#ff006b]" />
                <span>تسجيل الدخول</span>
              </>
            )}
          </button>

          {/* Language switcher */}
          <button
            onClick={() => setIsArabic(!isArabic)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold shadow-2xs cursor-pointer"
            title="تبديل اللغة"
          >
            <Languages className="w-3.5 h-3.5 text-slate-500" />
            <span>{isArabic ? 'English' : 'عربي'}</span>
          </button>
        </div>
      </header>

      {/* Main App Container */}
      <main className="flex-1 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-hidden">
        {isDesktopMode ? (
          isAuthMode ? (
            /* =========================================================
               DESKTOP AUTH / SIGN IN SCREEN
               ========================================================= */
            <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col md:flex-row min-h-[560px] max-h-[88vh] animate-in fade-in zoom-in-95 duration-200">
              {/* Left Brand Showcase Banner */}
              <div className="w-full md:w-1/2 bg-gradient-to-br from-[#ff007f] via-[#ff006b] to-[#c70053] p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 border border-white/30 shadow-lg">
                    <TellmeLogo size="md" />
                  </div>
                  <h2 className="text-3xl font-black mb-3">أهلاً بك في منصة Tellme</h2>
                  <p className="text-sm text-pink-100 leading-relaxed">
                    منصة التواصل الاجتماعي المتطورة للتواصل الفوري، المكالمات عالية الوضوح، ومشاركة مقاطع الفيديو والقصص بأعلى درجات الأمان والخصوصية.
                  </p>
                </div>

                <div className="relative z-10 space-y-3 pt-6 border-t border-white/20 text-xs">
                  <div className="flex items-center gap-2.5 text-pink-100">
                    <ShieldCheck className="w-4 h-4 text-white shrink-0" />
                    <span>تشفير تام وحماية متقدمة للبيانات والرسائل</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-pink-100">
                    <Sparkles className="w-4 h-4 text-white shrink-0" />
                    <span>مساعد ذكي وبوتات وخدمات حصرية متكاملة</span>
                  </div>
                </div>
              </div>

              {/* Right Auth Form */}
              <div className="w-full md:w-1/2 flex flex-col p-6 bg-white overflow-y-auto">
                <AuthFlow
                  onComplete={(newUser) => {
                    setUser((prev) => ({ ...prev, ...newUser }));
                    setIsAuthMode(false);
                  }}
                  onCancel={() => setIsAuthMode(false)}
                />
              </div>
            </div>
          ) : (
            /* =========================================================
               DESKTOP / EXPANDED WEB PLATFORM LAYOUT ("موقع تواصل")
               Sleek Interface: Left Sidebar + Main Content + Right Sidebar
               ========================================================= */
            <div className="w-full max-w-7xl h-[88vh] bg-white rounded-2xl shadow-sm border border-slate-200 flex overflow-hidden">
              {/* Desktop Left/Right Sidebar with Navigation tabs */}
              <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col justify-between shrink-0 space-y-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 px-2">
                    <TellmeLogo size="md" withText />
                  </div>

                  {/* Nav Items list matching Sleek Interface styling */}
                  <nav className="space-y-1">
                    {[
                      { id: 'chat' as AppTab, label: 'الدردشة (Tellme Chat)', icon: MessageCircle, badge: totalUnreadChats },
                      { id: 'call' as AppTab, label: 'المكالمات (Tellme Call)', icon: PhoneIcon, badge: missedCallsCount },
                      { id: 'contacts' as AppTab, label: 'جهات الاتصال (Contacts)', icon: Smartphone },
                      { id: 'clips' as AppTab, label: 'مقاطع الفيديو (Clips)', icon: Play },
                      { id: 'channels' as AppTab, label: 'القنوات (Channels)', icon: Sparkles },
                      { id: 'groups' as AppTab, label: 'المجموعات (Groups)', icon: ShieldCheck },
                      { id: 'bots' as AppTab, label: 'المساعد والبوتات (Bots)', icon: Sparkles },
                      { id: 'settings' as AppTab, label: 'الإعدادات (Settings)', icon: Info },
                    ].map((tab) => {
                      const Icon = tab.icon;
                      const isActive = currentTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setCurrentTab(tab.id);
                            if (tab.id !== 'chat') setActiveConversation(null);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors text-right cursor-pointer ${
                            isActive
                              ? 'bg-[#fff0f5] text-[#ff006b]'
                              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <Icon className="w-5 h-5" />
                            <span>{tab.label}</span>
                          </div>
                          {tab.badge && tab.badge > 0 ? (
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                isActive ? 'bg-[#ff006b] text-white' : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {tab.badge}
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Bottom Profile card matching Sleek Interface design */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div
                    onClick={() => setCurrentTab('profile')}
                    className="flex items-center gap-3 mb-3 cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-300 overflow-hidden border-2 border-white shadow-sm flex items-center justify-center text-white bg-gradient-to-br from-[#ff007f] to-[#ff004d] font-bold text-xs">
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-bold text-slate-900 truncate">{user.name}</span>
                      <span className="text-xs text-slate-500 truncate">{user.username}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentTab('settings')}
                      className="flex-1 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold shadow-2xs hover:bg-slate-50 transition-colors text-slate-700 cursor-pointer"
                    >
                      Settings & Profile
                    </button>
                    <button
                      onClick={() => setIsAuthMode(true)}
                      className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 shadow-2xs transition-colors cursor-pointer"
                      title="تسجيل الخروج / تبديل الحساب"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </aside>

            {/* Desktop Central / Content View */}
            <div className="flex-1 flex overflow-hidden">
              {currentTab === 'chat' ? (
                <>
                  {/* Column 1: Conversations List */}
                  <div className="w-80 md:w-96 border-r border-slate-200 flex flex-col shrink-0 bg-white">
                    <ChatList
                      conversations={conversations}
                      stories={stories}
                      onSelectConversation={handleSelectConversation}
                      onNewChat={() => alert('بدء محادثة جديدة')}
                      onAddStory={handleAddStory}
                    />
                  </div>

                  {/* Column 2: Active Chat Conversation */}
                  <div className="flex-1 flex flex-col bg-[#f8fafc]">
                    {activeConversation ? (
                      <ActiveChat
                        conversation={activeConversation}
                        onBack={() => setActiveConversation(null)}
                        onSendMessage={handleSendMessage}
                        onStartCall={(kind) =>
                          handleStartCall(activeConversation.name, kind)
                        }
                        onOpenProfile={() => setCurrentTab('profile')}
                      />
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#f8fafc]">
                        <TellmeLogo size="xl" className="mb-4" />
                        <h3
                          className="font-brand font-bold text-3xl text-[#ff006b]"
                          style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
                        >
                          Tellme Web Platform
                        </h3>
                        <p className="text-sm text-slate-500 max-w-sm mt-2 leading-relaxed">
                          اختر محادثة من القائمة الجانبية لبدء المراسلة الفورية، المكالمات، وإرسال الوسائط والملاحظات الصوتية.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Column 3: Right Sidebar matching Sleek Interface */}
                  <aside
                    id="desktop-right-sidebar"
                    className={`w-80 border-l p-6 space-y-6 hidden xl:flex flex-col overflow-y-auto shrink-0 transition-colors duration-200 ${
                      isSidebarDark
                        ? 'dark bg-slate-900 border-slate-800 text-slate-100'
                        : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  >
                    {/* Top Header Controls with Moon icon button */}
                    <div className={`flex items-center justify-between pb-3 border-b ${isSidebarDark ? 'border-slate-800' : 'border-slate-100'}`}>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Overview
                        </span>
                        {isSidebarDark && (
                          <span className="text-[10px] bg-[#ff006b]/20 text-[#ff3385] px-2 py-0.5 rounded-full font-semibold">
                            Dark
                          </span>
                        )}
                      </div>
                      <button
                        id="sidebar-moon-toggle-button"
                        onClick={() => setIsSidebarDark(!isSidebarDark)}
                        title={isSidebarDark ? "Disable dark mode for sidebar" : "Enable dark mode for sidebar"}
                        aria-label="Toggle dark mode for sidebar"
                        className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                          isSidebarDark
                            ? 'bg-slate-800 text-[#ff3385] hover:bg-slate-700 hover:text-[#ff66a3] ring-1 ring-slate-700'
                            : 'text-slate-400 hover:text-[#ff006b] hover:bg-[#fff0f5]'
                        }`}
                      >
                        <Moon className={`w-4 h-4 ${isSidebarDark ? 'fill-[#ff3385] text-[#ff3385]' : ''}`} />
                      </button>
                    </div>

                    <div className={`p-4 rounded-2xl border transition-colors ${
                      isSidebarDark 
                        ? 'bg-slate-800/70 border-slate-800 text-slate-100' 
                        : 'bg-slate-50 border-slate-100 text-slate-900'
                    }`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Trending on Tellme
                          </h2>
                          {isUpdatingTrending && (
                            <span className="text-[10px] text-[#ff3385] font-semibold animate-pulse">
                              Updating...
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5">
                          {activeMutedTags.length > 0 && (
                            <div className="relative muted-details-container">
                              <button
                                type="button"
                                id="unmute-all-trending-btn"
                                onClick={() => setShowMutedDetails(!showMutedDetails)}
                                title="عرض الوسوم المكتومة وخيارات الاستعادة"
                                className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                                  isSidebarDark
                                    ? 'text-rose-400 bg-rose-950/40 hover:bg-rose-950/70 border border-rose-900/60'
                                    : 'text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200'
                                }`}
                              >
                                <EyeOff className="w-3 h-3" />
                                <span>مكتومة ({activeMutedTags.length})</span>
                              </button>

                              {/* Dropdown list of muted tags with durations and individual unmuting */}
                              {showMutedDetails && (
                                <div className={`absolute end-0 top-full mt-1.5 w-60 rounded-xl border shadow-xl z-50 p-2.5 animate-in fade-in zoom-in-95 duration-150 ${
                                  isSidebarDark
                                    ? 'bg-slate-800 border-slate-700 text-slate-200 shadow-black/50'
                                    : 'bg-white border-slate-200 text-slate-800 shadow-slate-200/80'
                                }`}>
                                  <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100 dark:border-slate-700 text-[11px] font-bold">
                                    <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                                      <EyeOff className="w-3.5 h-3.5" />
                                      <span>الوسوم المكتومة ({activeMutedTags.length})</span>
                                    </span>
                                    <button
                                      type="button"
                                      onClick={handleUnmuteAll}
                                      className="text-[10px] text-rose-600 dark:text-rose-400 hover:underline font-bold cursor-pointer"
                                    >
                                      استعادة الكل
                                    </button>
                                  </div>

                                  <div className="max-h-40 overflow-y-auto space-y-1.5 py-0.5">
                                    {activeMutedTags.map((m) => (
                                      <div
                                        key={m.tag}
                                        className={`flex items-center justify-between p-1.5 rounded-lg text-xs ${
                                          isSidebarDark ? 'bg-slate-700/50' : 'bg-slate-50'
                                        }`}
                                      >
                                        <div className="min-w-0 pr-1">
                                          <p className="font-bold text-[11px] text-[#ff006b] truncate">{m.tag}</p>
                                          <p className="text-[9px] text-slate-400 font-medium">
                                            {m.duration === '1h'
                                              ? `ساعة واحدة (${formatRemainingTime(m.expiresAt)})`
                                              : m.duration === '24h'
                                              ? `24 ساعة (${formatRemainingTime(m.expiresAt)})`
                                              : 'كتم دائم'}
                                          </p>
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() => handleUnmuteTag(m.tag)}
                                          title={`إلغاء كتم ${m.tag}`}
                                          className="p-1 rounded-md text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                                        >
                                          <X className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                          <button
                            id="refresh-trending-button"
                            onClick={handleRefreshTrending}
                            disabled={isUpdatingTrending}
                            title="Refresh trending topics"
                            aria-label="Refresh trending topics"
                            className={`p-1.5 rounded-lg active:scale-95 transition-all disabled:opacity-50 cursor-pointer ${
                              isSidebarDark
                                ? 'text-slate-400 hover:text-[#ff3385] hover:bg-slate-700'
                                : 'text-slate-400 hover:text-[#ff006b] hover:bg-[#ffe4ee]/50'
                            }`}
                          >
                            <RefreshCw className={`w-3.5 h-3.5 ${isUpdatingTrending ? 'animate-spin text-[#ff3385]' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Visual feedback banner for actions */}
                      <AnimatePresence>
                        {trendingFeedbackMessage && (
                          <motion.div
                            initial={{ opacity: 0, y: -6, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -4, scale: 0.97 }}
                            transition={{ duration: 0.18 }}
                            className={`mb-3 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold flex items-center justify-between shadow-2xs ${
                              isSidebarDark
                                ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800'
                                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 min-w-0">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              <span className="truncate">{trendingFeedbackMessage}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setTrendingFeedbackMessage(null)}
                              className="p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer shrink-0"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {isUpdatingTrending ? (
                        <div className="space-y-3.5 py-1">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="animate-pulse space-y-1.5">
                              <div className={`h-2 rounded w-24 ${isSidebarDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
                              <div className={`h-4 rounded w-40 ${isSidebarDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
                              <div className={`h-2 rounded w-16 ${isSidebarDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
                            </div>
                          ))}
                        </div>
                      ) : (
                        (() => {
                          const visibleItems = trendingDatasets[trendingSetIndex].filter(
                            (item) => !isTagMuted(item.tag)
                          );
                          const effectiveSelectedTag = visibleItems.some((i) => i.tag === selectedTrendingTag)
                            ? selectedTrendingTag
                            : (visibleItems[0]?.tag || '');

                          if (visibleItems.length === 0) {
                            return (
                              <div className={`py-6 text-center space-y-2 rounded-xl border border-dashed p-3 ${
                                isSidebarDark ? 'border-slate-700 bg-slate-800/40 text-slate-400' : 'border-slate-200 bg-white/70 text-slate-500'
                              }`}>
                                <EyeOff className="w-5 h-5 mx-auto text-slate-400" />
                                <p className="text-xs">تم إخفاء جميع وسوم هذه القائمة ({activeMutedTags.length} وسم مكتوم)</p>
                                <button
                                  type="button"
                                  onClick={handleUnmuteAll}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#ff006b] bg-[#fff0f5] hover:bg-[#ffe4ee] transition-colors cursor-pointer"
                                >
                                  <Undo2 className="w-3.5 h-3.5" />
                                  <span>إلغاء كتم واستعادة الوسوم</span>
                                </button>
                              </div>
                            );
                          }

                          return (
                            <div className="space-y-2">
                              {visibleItems.map((item, idx) => {
                                const isSelected = effectiveSelectedTag === item.tag;

                                return (
                                  <div
                                    key={item.tag}
                                    id={`trending-item-${idx}`}
                                    onClick={() => setSelectedTrendingTag(item.tag)}
                                    className={`relative group flex flex-col p-2.5 -mx-1.5 rounded-xl transition-all cursor-pointer ${
                                      isSelected
                                        ? isSidebarDark
                                          ? 'bg-slate-800/90 ring-1 ring-[#ff3385]/35 shadow-sm'
                                          : 'bg-[#fff0f5]/70 ring-1 ring-[#ff006b]/25 shadow-xs'
                                        : isSidebarDark
                                          ? 'hover:bg-slate-800/70'
                                          : 'hover:bg-slate-100/70'
                                    }`}
                                  >
                                    <div className="flex items-start justify-between gap-2 w-full">
                                      <div className="min-w-0 flex-1">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{item.category}</p>
                                        <h4 className={`text-sm font-bold transition-colors truncate ${
                                          isSidebarDark
                                            ? isSelected ? 'text-[#ff3385]' : 'text-slate-100 group-hover:text-[#ff3385]'
                                            : isSelected ? 'text-[#ff006b]' : 'text-slate-900 group-hover:text-[#ff006b]'
                                        }`}>
                                          {item.tag}
                                        </h4>
                                      </div>

                                      {/* Share action button container */}
                                      <div className="relative shrink-0 pt-0.5 trending-share-container">
                                        <button
                                          id={`share-trending-btn-${idx}`}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveShareTag(activeShareTag === item.tag ? null : item.tag);
                                          }}
                                          title={`خيارات ومشاركة ${item.tag}`}
                                          aria-label={`Options and share for ${item.tag}`}
                                          aria-expanded={activeShareTag === item.tag}
                                          className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                                            activeShareTag === item.tag
                                              ? isSidebarDark
                                                ? 'bg-slate-700 text-[#ff3385] ring-1 ring-[#ff3385]/30'
                                                : 'bg-[#fff0f5] text-[#ff006b] ring-1 ring-[#ff006b]/20'
                                              : isSidebarDark
                                                ? 'text-slate-400 hover:text-[#ff3385] hover:bg-slate-700/80'
                                                : 'text-slate-400 hover:text-[#ff006b] hover:bg-[#ffe4ee]/60'
                                          }`}
                                        >
                                          <Share2 className="w-3.5 h-3.5" />
                                        </button>

                                        {/* Action Menu / Tooltip Popover */}
                                        {activeShareTag === item.tag && (
                                          <div
                                            id={`share-trending-menu-${idx}`}
                                            role="menu"
                                            aria-orientation="vertical"
                                            className={`absolute end-0 top-full mt-1.5 w-60 rounded-xl border shadow-xl z-50 p-2.5 animate-in fade-in zoom-in-95 duration-150 ${
                                              isSidebarDark
                                                ? 'bg-slate-800 border-slate-700 text-slate-200 shadow-black/40'
                                                : 'bg-white border-slate-200 text-slate-800 shadow-slate-200/80'
                                            }`}
                                          >
                                            {/* Header with Tag Preview */}
                                            <div className={`px-2 py-1.5 mb-1.5 border-b flex items-center justify-between text-xs ${
                                              isSidebarDark ? 'border-slate-700 text-slate-400' : 'border-slate-100 text-slate-500'
                                            }`}>
                                              <span className="text-[10px] font-bold uppercase tracking-wider">خيارات الوسم</span>
                                              <span className={`text-[11px] font-bold truncate max-w-[110px] ${
                                                isSidebarDark ? 'text-[#ff3385]' : 'text-[#ff006b]'
                                              }`}>
                                                {item.tag}
                                              </span>
                                            </div>

                                            <div className="space-y-1">
                                              {/* Option 1: Copy tag */}
                                              <button
                                                type="button"
                                                id={`copy-tag-${idx}`}
                                                onClick={() => handleCopyTag(item.tag)}
                                                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer text-right ${
                                                  isSidebarDark
                                                    ? 'hover:bg-slate-700 hover:text-white'
                                                    : 'hover:bg-[#fff0f5] hover:text-[#ff006b]'
                                                }`}
                                              >
                                                <div className="flex items-center gap-2">
                                                  {copiedTag === item.tag ? (
                                                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                                                  ) : (
                                                    <Copy className="w-3.5 h-3.5" />
                                                  )}
                                                  <span>{copiedTag === item.tag ? 'تم النسخ!' : 'نسخ الوسم'}</span>
                                                </div>
                                                {copiedTag === item.tag && (
                                                  <span className="text-[10px] text-emerald-500 font-bold">Copied</span>
                                                )}
                                              </button>

                                              {/* Option 2: Share to Chat with checkmark transition */}
                                              <button
                                                type="button"
                                                id={`share-to-chat-${idx}`}
                                                disabled={sharedChatTag === item.tag}
                                                onClick={() => handleShareTagToChat(item.tag)}
                                                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer text-right ${
                                                  sharedChatTag === item.tag
                                                    ? isSidebarDark
                                                      ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-700/60'
                                                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs'
                                                    : isSidebarDark
                                                      ? 'hover:bg-slate-700 hover:text-white border border-transparent'
                                                      : 'hover:bg-[#fff0f5] hover:text-[#ff006b] border border-transparent'
                                                }`}
                                              >
                                                <div className="flex items-center gap-2">
                                                  {sharedChatTag === item.tag ? (
                                                    <motion.div
                                                      key="shared-check"
                                                      initial={{ scale: 0.2, rotate: -35, opacity: 0 }}
                                                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                                      transition={{ type: "spring", stiffness: 500, damping: 22 }}
                                                      className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center"
                                                    >
                                                      <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
                                                    </motion.div>
                                                  ) : (
                                                    <MessageCircle className="w-3.5 h-3.5" />
                                                  )}
                                                  <span className={sharedChatTag === item.tag ? 'font-bold' : ''}>
                                                    {sharedChatTag === item.tag ? 'تمت المشاركة في الدردشة!' : 'مشاركة في الدردشة'}
                                                  </span>
                                                </div>
                                                {sharedChatTag === item.tag && (
                                                  <motion.span
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="text-[10px] text-emerald-600 dark:text-emerald-300 font-bold bg-emerald-100 dark:bg-emerald-900/60 px-1.5 py-0.5 rounded"
                                                  >
                                                    تم ✓
                                                  </motion.span>
                                                )}
                                              </button>

                                              {/* Option 3: System Share / Link */}
                                              <button
                                                type="button"
                                                id={`native-share-${idx}`}
                                                onClick={() => handleNativeShareTag(item.tag)}
                                                className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer text-right ${
                                                  isSidebarDark
                                                    ? 'hover:bg-slate-700 hover:text-white'
                                                    : 'hover:bg-[#fff0f5] hover:text-[#ff006b]'
                                                }`}
                                              >
                                                <Share2 className="w-3.5 h-3.5" />
                                                <span>مشاركة الرابط</span>
                                              </button>

                                              {/* Divider */}
                                              <div className={`my-1.5 border-t ${isSidebarDark ? 'border-slate-700' : 'border-slate-100'}`} />

                                              {/* Option 4: Mute Tag with Duration Options */}
                                              <div className="pt-0.5">
                                                <div className="flex items-center justify-between px-1.5 py-1 text-[11px] font-bold text-rose-600 dark:text-rose-400">
                                                  <div className="flex items-center gap-1.5">
                                                    <EyeOff className="w-3.5 h-3.5" />
                                                    <span>كتم الوسم (Mute):</span>
                                                  </div>
                                                  <span className="text-[10px] text-slate-400 font-normal">اختر المدة</span>
                                                </div>

                                                <div className="grid grid-cols-3 gap-1.5 px-0.5 mt-1">
                                                  {/* 1 Hour */}
                                                  <button
                                                    type="button"
                                                    id={`mute-1h-${idx}`}
                                                    onClick={() => handleMuteTag(item.tag, '1h')}
                                                    title="كتم الوسم لمدة ساعة واحدة (1 Hour)"
                                                    className={`flex flex-col items-center justify-center p-1.5 rounded-lg border text-center transition-all cursor-pointer group ${
                                                      isSidebarDark
                                                        ? 'border-slate-700 bg-slate-800/80 hover:bg-rose-950/40 hover:border-rose-800 text-slate-300 hover:text-rose-300'
                                                        : 'border-slate-200 bg-slate-50 hover:bg-rose-50 hover:border-rose-200 text-slate-700 hover:text-rose-700'
                                                    }`}
                                                  >
                                                    <Clock className="w-3.5 h-3.5 mb-1 text-slate-400 group-hover:text-rose-500 transition-colors" />
                                                    <span className="text-[10px] font-bold leading-tight">ساعة</span>
                                                    <span className="text-[9px] text-slate-400 dark:text-slate-500 font-normal">1 Hour</span>
                                                  </button>

                                                  {/* 24 Hours */}
                                                  <button
                                                    type="button"
                                                    id={`mute-24h-${idx}`}
                                                    onClick={() => handleMuteTag(item.tag, '24h')}
                                                    title="كتم الوسم لمدة 24 ساعة (24 Hours)"
                                                    className={`flex flex-col items-center justify-center p-1.5 rounded-lg border text-center transition-all cursor-pointer group ${
                                                      isSidebarDark
                                                        ? 'border-slate-700 bg-slate-800/80 hover:bg-rose-950/40 hover:border-rose-800 text-slate-300 hover:text-rose-300'
                                                        : 'border-slate-200 bg-slate-50 hover:bg-rose-50 hover:border-rose-200 text-slate-700 hover:text-rose-700'
                                                    }`}
                                                  >
                                                    <Calendar className="w-3.5 h-3.5 mb-1 text-slate-400 group-hover:text-rose-500 transition-colors" />
                                                    <span className="text-[10px] font-bold leading-tight">24 ساعة</span>
                                                    <span className="text-[9px] text-slate-400 dark:text-slate-500 font-normal">24 Hours</span>
                                                  </button>

                                                  {/* Permanently */}
                                                  <button
                                                    type="button"
                                                    id={`mute-perm-${idx}`}
                                                    onClick={() => handleMuteTag(item.tag, 'permanent')}
                                                    title="كتم الوسم بشكل دائم (Permanently)"
                                                    className={`flex flex-col items-center justify-center p-1.5 rounded-lg border text-center transition-all cursor-pointer group ${
                                                      isSidebarDark
                                                        ? 'border-slate-700 bg-slate-800/80 hover:bg-rose-950/40 hover:border-rose-800 text-slate-300 hover:text-rose-300'
                                                        : 'border-slate-200 bg-slate-50 hover:bg-rose-50 hover:border-rose-200 text-slate-700 hover:text-rose-700'
                                                    }`}
                                                  >
                                                    <ShieldAlert className="w-3.5 h-3.5 mb-1 text-slate-400 group-hover:text-rose-500 transition-colors" />
                                                    <span className="text-[10px] font-bold leading-tight">دائمًا</span>
                                                    <span className="text-[9px] text-slate-400 dark:text-slate-500 font-normal">Permanent</span>
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* Recharts chart replacing static posts count for selected topic */}
                                    {isSelected ? (
                                      <div className="mt-2 pt-1.5 border-t border-dashed border-slate-200 dark:border-slate-700/60 animate-in fade-in duration-200">
                                        <div className="flex items-center justify-between text-[11px] mb-1">
                                          <span className="flex items-center gap-1 font-bold text-emerald-500">
                                            <TrendingUp className="w-3 h-3" />
                                            <span>{item.growth} نمو النشاط</span>
                                          </span>
                                          <span className={`text-[10px] font-semibold ${isSidebarDark ? 'text-slate-300' : 'text-slate-600'}`}>
                                            {item.posts}
                                          </span>
                                        </div>

                                        {/* Recharts Area Chart */}
                                        <div className="w-full h-[72px] min-w-0 -mx-1" id={`trending-chart-${idx}`}>
                                          <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={item.history} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
                                              <defs>
                                                <linearGradient id={`trending-grad-${idx}`} x1="0" y1="0" x2="0" y2="1">
                                                  <stop offset="5%" stopColor="#ff006b" stopOpacity={isSidebarDark ? 0.5 : 0.28} />
                                                  <stop offset="95%" stopColor="#ff006b" stopOpacity={0} />
                                                </linearGradient>
                                              </defs>
                                              <RechartsTooltip
                                                content={({ active, payload, label }) => {
                                                  if (active && payload && payload.length) {
                                                    return (
                                                      <div className={`px-2 py-1 rounded-md text-[10px] font-bold shadow-md border ${
                                                        isSidebarDark
                                                          ? 'bg-slate-900 border-slate-700 text-slate-100'
                                                          : 'bg-white border-slate-200 text-slate-800'
                                                      }`}>
                                                        <span className="text-slate-400 block text-[9px]">{label}</span>
                                                        <span className="text-[#ff006b]">{Number(payload[0].value).toLocaleString()} تفاعل</span>
                                                      </div>
                                                    );
                                                  }
                                                  return null;
                                                }}
                                              />
                                              <XAxis
                                                dataKey="time"
                                                stroke={isSidebarDark ? '#64748b' : '#94a3b8'}
                                                fontSize={8}
                                                tickLine={false}
                                                axisLine={false}
                                              />
                                              <Area
                                                type="monotone"
                                                dataKey="activity"
                                                stroke="#ff006b"
                                                strokeWidth={2}
                                                fillOpacity={1}
                                                fill={`url(#trending-grad-${idx})`}
                                                dot={{ r: 2, fill: '#ff006b' }}
                                                activeDot={{ r: 4, fill: '#ff006b', stroke: '#fff', strokeWidth: 1.5 }}
                                              />
                                            </AreaChart>
                                          </ResponsiveContainer>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="flex items-center justify-between mt-1">
                                        <p className={`text-xs ${isSidebarDark ? 'text-slate-400' : 'text-slate-500'}`}>{item.posts}</p>
                                        <span className={`text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5 ${
                                          isSidebarDark ? 'text-pink-400' : 'text-[#ff006b]'
                                        }`}>
                                          <TrendingUp className="w-2.5 h-2.5" />
                                          <span>مخطط النمو</span>
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })()
                      )}
                    </div>

                    <div className="rounded-2xl">
                      <h2 className="text-sm font-bold mb-4 flex items-center justify-between">
                        <span className={isSidebarDark ? 'text-slate-100' : 'text-slate-900'}>Who to follow</span>
                        <span className={`text-xs font-semibold cursor-pointer hover:underline ${isSidebarDark ? 'text-[#ff3385]' : 'text-[#ff006b]'}`}>Show all</span>
                      </h2>
                      <div className="space-y-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                            EK
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-bold truncate ${isSidebarDark ? 'text-slate-100' : 'text-slate-900'}`}>Elena K.</p>
                            <p className={`text-xs truncate ${isSidebarDark ? 'text-slate-400' : 'text-slate-500'}`}>@elena_ux</p>
                          </div>
                          <button className={`px-3 py-1 text-[10px] font-bold rounded-full transition-colors cursor-pointer ${
                            isSidebarDark
                              ? 'bg-[#ff006b] text-white hover:bg-[#e0005e]'
                              : 'bg-slate-900 text-white hover:bg-slate-800'
                          }`}>
                            Follow
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">
                            RS
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-bold truncate ${isSidebarDark ? 'text-slate-100' : 'text-slate-900'}`}>Ray Sinclair</p>
                            <p className={`text-xs truncate ${isSidebarDark ? 'text-slate-400' : 'text-slate-500'}`}>@raysin_dev</p>
                          </div>
                          <button className={`px-3 py-1 text-[10px] font-bold rounded-full transition-colors cursor-pointer ${
                            isSidebarDark
                              ? 'bg-[#ff006b] text-white hover:bg-[#e0005e]'
                              : 'bg-slate-900 text-white hover:bg-slate-800'
                          }`}>
                            Follow
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#ffe4ee] flex items-center justify-center text-[#b8004d] font-bold text-xs">
                            TN
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-bold truncate ${isSidebarDark ? 'text-slate-100' : 'text-slate-900'}`}>Tech News</p>
                            <p className={`text-xs truncate ${isSidebarDark ? 'text-slate-400' : 'text-slate-500'}`}>@technews_daily</p>
                          </div>
                          <button className={`px-3 py-1 text-[10px] font-bold rounded-full transition-colors cursor-pointer ${
                            isSidebarDark
                              ? 'bg-[#ff006b] text-white hover:bg-[#e0005e]'
                              : 'bg-slate-900 text-white hover:bg-slate-800'
                          }`}>
                            Follow
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className={`text-[11px] flex flex-wrap gap-x-3 gap-y-1 mt-auto pt-4 border-t ${
                      isSidebarDark ? 'border-slate-800 text-slate-500' : 'border-slate-100 text-slate-400'
                    }`}>
                      <a href="#" className="hover:underline">Terms</a>
                      <a href="#" className="hover:underline">Privacy Policy</a>
                      <a href="#" className="hover:underline">Cookie Policy</a>
                      <span>© 2026 Tellme Inc.</span>
                    </div>
                  </aside>
                </>
              ) : currentTab === 'call' ? (
                <div className="flex-1 flex">
                  <div className="w-96 border-r border-slate-200 bg-white">
                    <CallList
                      calls={calls}
                      stories={stories}
                      onStartCall={handleStartCall}
                      onAddStory={handleAddStory}
                    />
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#f8fafc]">
                    <TellmeLogo size="xl" className="mb-3" />
                    <h3 className="font-bold text-slate-900 text-lg">مكالمات Tellme المشفرة</h3>
                    <p className="text-xs text-slate-500 max-w-xs mt-1">
                      صوت عالي الدقة وتقنية فيديو فائقة الوضوح متوافقة مع كافة شبكات الاتصال.
                    </p>
                  </div>
                </div>
              ) : currentTab === 'clips' ? (
                <div className="flex-1 flex justify-center bg-black">
                  <div className="w-full max-w-md h-full">
                    <ClipsFeed
                      clips={clips}
                      onToggleFollow={handleToggleFollow}
                      onToggleLike={handleToggleLike}
                      onAddComment={handleAddComment}
                    />
                  </div>
                </div>
              ) : currentTab === 'contacts' ? (
                <div className="flex-1 bg-white">
                  <ContactsList
                    contacts={contacts}
                    stories={stories}
                    onSelectContact={(c) => {
                      const existingConv = conversations.find((cv) => cv.name === c.name);
                      if (existingConv) {
                        handleSelectConversation(existingConv);
                        setCurrentTab('chat');
                      } else {
                        const newConv: Conversation = {
                          id: `c_${c.id}`,
                          name: c.name,
                          statusText: c.statusText,
                          lastMessage: 'محادثة جديدة',
                          timestamp: 'الآن',
                          isOnline: c.isOnline,
                          phone: c.phone,
                          username: c.username,
                          messages: [],
                        };
                        setConversations([newConv, ...conversations]);
                        setActiveConversation(newConv);
                        setCurrentTab('chat');
                      }
                    }}
                    onStartCall={handleStartCall}
                    onAddStory={handleAddStory}
                    onNewContact={handleAddNewContact}
                  />
                </div>
              ) : currentTab === 'channels' ? (
                <div className="flex-1 bg-white">
                  <ChannelsView />
                </div>
              ) : currentTab === 'groups' ? (
                <div className="flex-1 bg-white">
                  <GroupsView
                    onOpenChat={(grpName) => {
                      const grpConv = conversations.find((cv) => cv.name.includes(grpName)) || conversations[3];
                      handleSelectConversation(grpConv);
                      setCurrentTab('chat');
                    }}
                  />
                </div>
              ) : currentTab === 'settings' ? (
                <div className="flex-1 bg-white overflow-y-auto">
                  <SettingsView
                    user={user}
                    onNavigateTab={(tab) => setCurrentTab(tab)}
                    onOpenInfo={() => setCurrentTab('info')}
                    onOpenSupport={() => setCurrentTab('support')}
                    onOpenBots={() => setCurrentTab('bots')}
                    isArabic={isArabic}
                    onToggleLanguage={() => setIsArabic(!isArabic)}
                    onLogOut={() => setIsAuthMode(true)}
                  />
                </div>
              ) : currentTab === 'profile' ? (
                <div className="flex-1 max-w-2xl mx-auto bg-white">
                  <ProfileView
                    user={user}
                    onBack={() => setCurrentTab('settings')}
                    onStartCall={(kind) => handleStartCall(user.name, kind)}
                    onOpenChat={() => setCurrentTab('chat')}
                    onUpdateUser={(updated) => setUser((prev) => ({ ...prev, ...updated }))}
                  />
                </div>
              ) : currentTab === 'bots' ? (
                <div className="flex-1 max-w-2xl mx-auto bg-white">
                  <BotsView
                    onBack={() => setCurrentTab('settings')}
                    onOpenSupport={() => setCurrentTab('support')}
                    onOpenInfo={() => setCurrentTab('info')}
                  />
                </div>
              ) : currentTab === 'info' ? (
                <div className="flex-1 max-w-2xl mx-auto bg-white">
                  <AboutAppView
                    onBack={() => setCurrentTab('settings')}
                    onOpenSupport={() => setCurrentTab('support')}
                  />
                </div>
              ) : currentTab === 'support' ? (
                <div className="flex-1 max-w-2xl mx-auto bg-white">
                  <SupportView onBack={() => setCurrentTab('settings')} />
                </div>
              ) : null}
            </div>
          </div>
          )
        ) : (
          /* =========================================================
             MOBILE PROTOTYPE FRAME (Exact Phone mockup from Slides 3-13)
             ========================================================= */
          <PhoneFrame isDesktopMode={false}>
            {/* Screen Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
              {isAuthMode ? (
                <AuthFlow
                  onComplete={(newUser) => {
                    setUser((prev) => ({ ...prev, ...newUser }));
                    setIsAuthMode(false);
                  }}
                  onCancel={() => setIsAuthMode(false)}
                />
              ) : activeConversation ? (
                <ActiveChat
                  conversation={activeConversation}
                  onBack={() => setActiveConversation(null)}
                  onSendMessage={handleSendMessage}
                  onStartCall={(kind) =>
                    handleStartCall(activeConversation.name, kind)
                  }
                  onOpenProfile={() => setCurrentTab('profile')}
                />
              ) : currentTab === 'chat' ? (
                <ChatList
                  conversations={conversations}
                  stories={stories}
                  onSelectConversation={handleSelectConversation}
                  onNewChat={() => alert('إنشاء محادثة جديدة في Tellme')}
                  onAddStory={handleAddStory}
                />
              ) : currentTab === 'call' ? (
                <CallList
                  calls={calls}
                  stories={stories}
                  onStartCall={handleStartCall}
                  onAddStory={handleAddStory}
                />
              ) : currentTab === 'contacts' ? (
                <ContactsList
                  contacts={contacts}
                  stories={stories}
                  onSelectContact={(c) => {
                    const existingConv = conversations.find((cv) => cv.name === c.name);
                    if (existingConv) {
                      handleSelectConversation(existingConv);
                    } else {
                      const newConv: Conversation = {
                        id: `c_${c.id}`,
                        name: c.name,
                        statusText: c.statusText,
                        lastMessage: 'محادثة جديدة',
                        timestamp: 'الآن',
                        isOnline: c.isOnline,
                        phone: c.phone,
                        username: c.username,
                        messages: [],
                      };
                      setConversations([newConv, ...conversations]);
                      handleSelectConversation(newConv);
                    }
                  }}
                  onStartCall={handleStartCall}
                  onAddStory={handleAddStory}
                  onNewContact={handleAddNewContact}
                />
              ) : currentTab === 'clips' ? (
                <ClipsFeed
                  clips={clips}
                  onToggleFollow={handleToggleFollow}
                  onToggleLike={handleToggleLike}
                  onAddComment={handleAddComment}
                />
              ) : currentTab === 'channels' ? (
                <ChannelsView />
              ) : currentTab === 'groups' ? (
                <GroupsView
                  onOpenChat={(grpName) => {
                    const grpConv = conversations.find((cv) => cv.name.includes(grpName)) || conversations[3];
                    handleSelectConversation(grpConv);
                  }}
                />
              ) : currentTab === 'settings' ? (
                <SettingsView
                  user={user}
                  onNavigateTab={(tab) => setCurrentTab(tab)}
                  onOpenInfo={() => setCurrentTab('info')}
                  onOpenSupport={() => setCurrentTab('support')}
                  onOpenBots={() => setCurrentTab('bots')}
                  isArabic={isArabic}
                  onToggleLanguage={() => setIsArabic(!isArabic)}
                  onLogOut={() => setIsAuthMode(true)}
                />
              ) : currentTab === 'profile' ? (
                <ProfileView
                  user={user}
                  onBack={() => setCurrentTab('settings')}
                  onStartCall={(kind) => handleStartCall(user.name, kind)}
                  onOpenChat={() => {
                    setCurrentTab('chat');
                    if (conversations[0]) handleSelectConversation(conversations[0]);
                  }}
                  onUpdateUser={(updated) => setUser((prev) => ({ ...prev, ...updated }))}
                />
              ) : currentTab === 'bots' ? (
                <BotsView
                  onBack={() => setCurrentTab('settings')}
                  onOpenSupport={() => setCurrentTab('support')}
                  onOpenInfo={() => setCurrentTab('info')}
                />
              ) : currentTab === 'info' ? (
                <AboutAppView
                  onBack={() => setCurrentTab('settings')}
                  onOpenSupport={() => setCurrentTab('support')}
                />
              ) : currentTab === 'support' ? (
                <SupportView onBack={() => setCurrentTab('settings')} />
              ) : null}

              {/* Bottom Navigation Bar with 7 icons from slides (hidden during active chat or auth) */}
              {!isAuthMode && !activeConversation && (
                <BottomNavBar
                  currentTab={currentTab}
                  onTabChange={(tab) => {
                    setCurrentTab(tab);
                    setActiveConversation(null);
                  }}
                  unreadChatsCount={totalUnreadChats}
                  missedCallsCount={missedCallsCount}
                />
              )}
            </div>
          </PhoneFrame>
        )}
      </main>

      {/* Active Call Overlay Modal (when voice/video call is in progress) */}
      {activeCall && (
        <ActiveCallModal
          contactName={activeCall.contactName}
          callKind={activeCall.kind}
          onEndCall={() => setActiveCall(null)}
        />
      )}
    </div>
  );
}
