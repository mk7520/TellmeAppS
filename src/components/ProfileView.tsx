import React, { useState } from 'react';
import { UserProfile } from '../types';
import { TellmeLogo } from './TellmeLogo';
import { CountryPhoneInput } from './CountryPhoneInput';
import { 
  ArrowRight, 
  Plus, 
  MoreHorizontal, 
  Phone, 
  Video, 
  Link as LinkIcon, 
  MessageCircle, 
  Grid, 
  Film, 
  Globe, 
  Bookmark,
  Share2,
  Check,
  Edit2,
  X
} from 'lucide-react';

interface ProfileViewProps {
  user: UserProfile;
  onBack: () => void;
  onStartCall: (kind: 'audio' | 'video') => void;
  onOpenChat: () => void;
  onUpdateUser?: (updated: Partial<UserProfile>) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onBack,
  onStartCall,
  onOpenChat,
  onUpdateUser,
}) => {
  const [activeTab, setActiveTab] = useState<'photos' | 'videos' | 'saved' | 'web'>('photos');
  const [copiedLink, setCopiedLink] = useState(false);
  const [showEditPhoneModal, setShowEditPhoneModal] = useState(false);

  // Parse existing phone for default dial code and number
  const parsedPhone = user.phone || '+966 50 123 4567';
  const phoneParts = parsedPhone.trim().split(' ');
  const initialDialCode = phoneParts[0]?.startsWith('+') ? phoneParts[0] : '+966';
  const initialLocalPhone = phoneParts[0]?.startsWith('+') ? phoneParts.slice(1).join(' ') : parsedPhone;

  const [editCountryCode, setEditCountryCode] = useState(initialDialCode);
  const [editPhoneNumber, setEditPhoneNumber] = useState(initialLocalPhone);

  const handleSavePhone = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = `${editCountryCode} ${editPhoneNumber}`.trim();
    if (onUpdateUser) {
      onUpdateUser({ phone: formatted });
    }
    setShowEditPhoneModal(false);
  };

  const samplePhotos = [
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&auto=format&fit=crop&q=80',
  ];

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(`https://te.me/${user.username}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-y-auto">
      {/* Top Header */}
      <div className="bg-white/80 backdrop-blur-md px-4 py-3 border-b border-slate-200 flex items-center justify-between shrink-0 sticky top-0 z-20 shadow-2xs">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-slate-700 hover:text-blue-600 hover:bg-slate-100 px-2 py-1 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span className="text-xs font-bold">Profile</span>
        </button>

        <div className="flex items-center gap-1 text-slate-600">
          <button
            onClick={() => alert('إضافة منشور أو وسائط جديدة إلى الملف الشخصي')}
            className="p-2 rounded-xl hover:bg-slate-100 hover:text-blue-600 transition-colors cursor-pointer"
            title="إضافة"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </button>
          <button
            onClick={() => alert('إعدادات الملف الشخصي')}
            className="p-2 rounded-xl hover:bg-slate-100 hover:text-blue-600 transition-colors cursor-pointer"
            title="المزيد"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Profile Header Info */}
      <div className="p-6 flex flex-col items-center text-center border-b border-slate-100">
        {/* Large Tellme Blue Circle Logo */}
        <TellmeLogo size="xl" className="mb-2 shadow-lg shadow-blue-500/10" />

        <h1
          className="font-brand font-bold text-3xl text-blue-600 tracking-wider"
          style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
        >
          Tellme
        </h1>

        <p className="font-brand text-sm text-blue-600 font-medium mt-0.5">
          {user.status || 'Lets to 5m'}
        </p>

        <div className="flex items-center gap-1.5 mt-1">
          <p className="text-xs text-slate-700 font-semibold">
            {user.name} <span dir="ltr" className="text-slate-500 font-mono">({user.phone})</span>
          </p>
          {onUpdateUser && (
            <button
              type="button"
              id="edit-profile-phone-btn"
              onClick={() => setShowEditPhoneModal(true)}
              className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
              title="تعديل رقم الهاتف والدولة"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Primary Action Buttons Row */}
        <div className="w-full max-w-xs mt-5 border border-slate-200 rounded-2xl p-1.5 flex items-center justify-around bg-slate-50 shadow-2xs">
          <button
            onClick={() => onStartCall('audio')}
            className="p-2.5 text-slate-600 hover:text-blue-600 hover:bg-white rounded-xl transition-all cursor-pointer shadow-2xs"
            title="مكالمة صوتية"
          >
            <Phone className="w-5 h-5" />
          </button>

          <button
            onClick={() => onStartCall('video')}
            className="p-2.5 text-slate-600 hover:text-blue-600 hover:bg-white rounded-xl transition-all cursor-pointer shadow-2xs"
            title="مكالمة مرئية"
          >
            <Video className="w-5 h-5" />
          </button>

          <button
            onClick={handleCopyLink}
            className="p-2.5 text-slate-600 hover:text-blue-600 hover:bg-white rounded-xl transition-all relative cursor-pointer shadow-2xs"
            title="مشاركة رابط الملف"
          >
            {copiedLink ? <Check className="w-5 h-5 text-emerald-600" /> : <LinkIcon className="w-5 h-5" />}
          </button>

          <button
            onClick={onOpenChat}
            className="p-2.5 text-slate-600 hover:text-blue-600 hover:bg-white rounded-xl transition-all cursor-pointer shadow-2xs"
            title="إرسال رسالة"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Second Row Icons / Tabs */}
        <div className="w-full max-w-xs mt-4 flex items-center justify-around border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('photos')}
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'photos'
                ? 'text-blue-600 border border-blue-200 bg-blue-50 shadow-2xs'
                : 'text-slate-400 hover:text-slate-600'
            }`}
            title="الصور"
          >
            <Grid className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveTab('videos')}
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'videos'
                ? 'text-blue-600 border border-blue-200 bg-blue-50 shadow-2xs'
                : 'text-slate-400 hover:text-slate-600'
            }`}
            title="المقاطع"
          >
            <Film className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'saved'
                ? 'text-blue-600 border border-blue-200 bg-blue-50 shadow-2xs'
                : 'text-slate-400 hover:text-slate-600'
            }`}
            title="المحفوظات"
          >
            <Bookmark className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveTab('web')}
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'web'
                ? 'text-blue-600 border border-blue-200 bg-blue-50 shadow-2xs'
                : 'text-slate-400 hover:text-slate-600'
            }`}
            title="الروابط والموقع"
          >
            <Globe className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Media Grid */}
      <div className="flex-1 p-3">
        <div className="grid grid-cols-3 gap-2">
          {samplePhotos.map((img, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl overflow-hidden border border-slate-200 relative group cursor-pointer hover:opacity-90 transition-all shadow-2xs"
            >
              <img
                src={img}
                alt={`Media ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <TellmeLogo size="sm" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Phone Modal */}
      {showEditPhoneModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-800 text-sm">تعديل رقم الهاتف والدولة</h3>
              <button
                type="button"
                onClick={() => setShowEditPhoneModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePhone} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  رقم الهاتف المحدث:
                </label>
                <CountryPhoneInput
                  countryCode={editCountryCode}
                  onCountryCodeChange={setEditCountryCode}
                  phoneNumber={editPhoneNumber}
                  onPhoneNumberChange={setEditPhoneNumber}
                  id="profile-phone-input"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#ff007f] to-[#ff0055] text-white font-bold text-xs hover:opacity-95 shadow-md shadow-[#ff006b]/20 cursor-pointer"
                >
                  حفظ التعديل
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditPhoneModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-500 font-semibold text-xs hover:bg-slate-100 cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
