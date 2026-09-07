import React, { useState } from 'react';
import { TellmeLogo } from './TellmeLogo';
import { tellmeBotsList } from '../data/mockData';
import { 
  ArrowRight, 
  Search, 
  Sparkles, 
  HelpCircle, 
  Lightbulb, 
  Briefcase, 
  ShieldCheck, 
  Star, 
  Globe, 
  Cloud, 
  Grid, 
  MessageSquare,
  Phone,
  Mail,
  Send,
  Bot
} from 'lucide-react';

interface BotsViewProps {
  onBack: () => void;
  onOpenSupport: () => void;
  onOpenInfo: () => void;
}

export const BotsView: React.FC<BotsViewProps> = ({
  onBack,
  onOpenSupport,
  onOpenInfo,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAiChat, setActiveAiChat] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiMessages, setAiMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([
    {
      sender: 'bot',
      text: 'مرحباً بك! أنا مساعد Tellme الذكي المدعوم بتقنيات الذكاء الاصطناعي. كيف يمكنني مساعدتك اليوم في المنصة؟',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const getBotIcon = (type: string) => {
    switch (type) {
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-blue-600" />;
      case 'help':
        return <HelpCircle className="w-5 h-5 text-red-500" />;
      case 'lightbulb':
        return <Lightbulb className="w-5 h-5 text-amber-500" />;
      case 'briefcase':
        return <Briefcase className="w-5 h-5 text-indigo-500" />;
      case 'shield':
        return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
      case 'star-pink':
        return <Star className="w-5 h-5 text-blue-600 fill-blue-500" />;
      case 'star-gold':
        return <Star className="w-5 h-5 text-amber-500 fill-amber-400" />;
      case 'globe':
        return <Globe className="w-5 h-5 text-teal-600" />;
      case 'cloud':
        return <Cloud className="w-5 h-5 text-sky-500" />;
      default:
        return <Grid className="w-5 h-5 text-blue-600" />;
    }
  };

  const handleSendAi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    const userText = aiPrompt;
    setAiMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setAiPrompt('');
    setIsTyping(true);

    setTimeout(() => {
      let botReply = 'يسعدني تواصلك! منصة Tellme تتيح لك المراسلة والمكالمات عالية الدقة ومشاركة مقاطع الفيديو (Clips) والقصص بأعلى درجات الأمان والخصوصية.';
      if (userText.includes('مكالم') || userText.includes('اتصال')) {
        botReply = 'يمكنك إجراء مكالمات صوتية ومرئية فورية مشفرة من تبويب "Tellme Call" أو داخل أي محادثة فردية أو جماعية.';
      } else if (userText.includes('مقاطع') || userText.includes('clips')) {
        botReply = 'تبويب Tellme Clips يتيح لك تصفح مقاطع الفيديو القصيرة والإعجاب والتعليق ومتابعة المبدعين بنقرة واحدة.';
      } else if (userText.includes('دعم') || userText.includes('مشكلة')) {
        botReply = 'يمكنك فتح تذكرة دعم فني مباشرة عبر الضغط على Tellme Support وإرسال تفاصيل استفسارك لفريقنا.';
      }

      setAiMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
      setIsTyping(false);
    }, 800);
  };

  const filteredBots = tellmeBotsList.filter((b) =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
      {/* Top Header matching Slide 12: '< Tellme Bots' */}
      <div className="bg-white/80 backdrop-blur-md px-4 py-3 border-b border-slate-200 flex items-center justify-between shrink-0 shadow-2xs">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-slate-700 hover:text-blue-600 hover:bg-slate-100 px-2 py-1 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span
            className="font-brand font-bold text-xl text-blue-600"
            style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
          >
            Tellme Bots
          </span>
        </button>

        <div className="flex items-center gap-1 text-slate-600">
          <button
            onClick={() => onOpenInfo()}
            className="p-1.5 rounded-xl hover:bg-slate-100 hover:text-blue-600 cursor-pointer transition-colors"
            title="معلومات التطبيق"
          >
            <TellmeLogo size="sm" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-3 border-b border-slate-200 bg-slate-50">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute right-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن بوت أو ميزة ذكية..."
            className="w-full bg-white border border-slate-200 rounded-xl pr-9 pl-4 py-2 text-xs text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 shadow-2xs"
          />
        </div>
      </div>

      {/* Bots list */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-1">
        {filteredBots.map((bot) => (
          <div
            key={bot.id}
            onClick={() => {
              if (bot.id === 'bot_ai') {
                setActiveAiChat(true);
              } else if (bot.id === 'bot_support') {
                onOpenSupport();
              } else if (bot.id === 'bot_apps') {
                onOpenInfo();
              } else {
                alert(`تم تفعيل خدمة ${bot.title} بنجاح في حسابك.`);
              }
            }}
            className="px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer text-right group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                {getBotIcon(bot.iconType)}
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-800 group-hover:text-blue-600 transition-colors">
                    {bot.title}
                  </span>
                  {bot.badge && (
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                      {bot.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-400 leading-relaxed max-w-xs">
                  {bot.description}
                </span>
              </div>
            </div>

            <button className="text-xs font-semibold text-blue-600 bg-white border border-slate-200 px-3 py-1 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all shadow-2xs cursor-pointer">
              فتح
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Quick Contact Bar */}
      <div className="p-3 border-t border-slate-200 bg-white flex items-center justify-around shrink-0">
        <button
          onClick={() => alert('مركز الاتصال المباشر لخدمات Tellme')}
          className="w-10 h-10 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors shadow-2xs cursor-pointer"
          title="اتصال هاتفي"
        >
          <Phone className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenInfo}
          className="w-10 h-10 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors shadow-2xs cursor-pointer"
          title="زيارة الموقع"
        >
          <Globe className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenSupport}
          className="w-10 h-10 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors shadow-2xs cursor-pointer"
          title="مراسلة الدعم"
        >
          <Mail className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive Ask AI (Tellme AI) Sheet */}
      {activeAiChat && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
          <div className="bg-white w-full max-w-md h-[560px] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col">
            {/* Header */}
            <div className="p-4 bg-blue-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Tellme AI Assistant</h3>
                  <span className="text-[10px] text-blue-100 font-mono">متصل ومستعد للإجابة</span>
                </div>
              </div>

              <button
                onClick={() => setActiveAiChat(false)}
                className="w-7 h-7 rounded-lg bg-black/20 hover:bg-black/40 text-white flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 text-right">
              {aiMessages.map((m, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2 ${
                    m.sender === 'user' ? 'justify-start flex-row-reverse' : 'justify-start'
                  }`}
                >
                  <div className="shrink-0 mt-1">
                    {m.sender === 'user' ? (
                      <TellmeLogo size="sm" />
                    ) : (
                      <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-xs'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-2xs'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-blue-600">
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce delay-100" />
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce delay-200" />
                  <span>المساعد الذكي يكتب...</span>
                </div>
              )}
            </div>

            {/* Input form */}
            <form onSubmit={handleSendAi} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="اسأل Tellme AI عن أي ميزة في التطبيق..."
                className="flex-1 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
              <button
                type="submit"
                disabled={!aiPrompt.trim()}
                className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 cursor-pointer shadow-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
