import React, { useState } from 'react';
import { TellmeLogo } from './TellmeLogo';
import { CountryPhoneInput } from './CountryPhoneInput';
import { ArrowRight, HelpCircle, Send, CheckCircle2, Globe } from 'lucide-react';

interface SupportViewProps {
  onBack: () => void;
}

export const SupportView: React.FC<SupportViewProps> = ({ onBack }) => {
  const [name, setName] = useState('محمد كمال');
  const [userName, setUserName] = useState('@mohammed_mk');
  const [teleLink, setTeleLink] = useState('te.me/mohammed_mk');
  const [countryCode, setCountryCode] = useState('+966');
  const [phoneNumber, setPhoneNumber] = useState('50 123 4567');
  const [mail, setMail] = useState('mohammedkamalalmotawq@gmail.com');
  const [ticketType, setTicketType] = useState('Technical Support (دعم فني وتطوير)');
  const [bio, setBio] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setBio('');
      alert('تم إرسال تذكرتك بنجاح إلى فريق دعم Tellme! رقم التذكرة: #TLM-8921');
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-y-auto">
      {/* Top Header matching slide 13 */}
      <div className="bg-white/80 backdrop-blur-md px-4 py-3 border-b border-slate-200 flex items-center justify-between shrink-0 sticky top-0 z-20 shadow-2xs">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-slate-700 hover:text-blue-600 hover:bg-slate-100 px-2 py-1 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span
            className="font-brand font-bold text-xl text-blue-600"
            style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
          >
            Tellme Support
          </span>
        </button>

        <TellmeLogo size="sm" />
      </div>

      {/* Main Support Form */}
      <form onSubmit={handleSubmit} className="p-6 flex flex-col items-center">
        {/* Support Question Mark Icon */}
        <div className="w-20 h-20 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-4xl font-bold shadow-lg shadow-blue-500/20 mb-2">
          ?
        </div>

        <h1
          className="font-brand font-bold text-3xl text-blue-600 tracking-wider mb-2"
          style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
        >
          Tellme Support
        </h1>

        {/* Visit Website button */}
        <button
          type="button"
          onClick={() => window.open('https://tellme.app/help', '_blank')}
          className="px-6 py-2 rounded-xl border border-blue-600 text-blue-600 font-bold text-xs hover:bg-blue-600 hover:text-white transition-all mb-6 cursor-pointer shadow-2xs"
        >
          Visit Website
        </button>

        {/* Form Inputs Grid */}
        <div className="w-full max-w-sm space-y-3 text-right">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Example"
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 bg-slate-50/70"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">User Name</label>
            <input
              type="text"
              required
              dir="ltr"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="@example"
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 bg-slate-50/70"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">te.me/</label>
            <input
              type="text"
              dir="ltr"
              value={teleLink}
              onChange={(e) => setTeleLink(e.target.value)}
              placeholder="example"
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 bg-slate-50/70"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Phone</label>
            <CountryPhoneInput
              countryCode={countryCode}
              onCountryCodeChange={setCountryCode}
              phoneNumber={phoneNumber}
              onPhoneNumberChange={setPhoneNumber}
              id="support-phone-input"
              required={false}
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Mail</label>
            <input
              type="email"
              dir="ltr"
              required
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              placeholder="example@email.com"
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 bg-slate-50/70"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Type (نوع الطلب)</label>
            <select
              value={ticketType}
              onChange={(e) => setTicketType(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 bg-slate-50/70 cursor-pointer"
            >
              <option value="Technical Support">Technical Support (دعم فني)</option>
              <option value="Account & Login">Account & Login (الحساب وتسجيل الدخول)</option>
              <option value="Security & Privacy">Security & Privacy (الأمان والخصوصية)</option>
              <option value="Tellme Clips & Media">Tellme Clips & Media (المقاطع والوسائط)</option>
              <option value="Feature Suggestion">Feature Suggestion (اقتراح ميزة جديدة)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Bio / Message</label>
            <textarea
              rows={3}
              required
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Bio… صف مشكلتك أو استفسارك بالتفصيل..."
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 bg-slate-50/70 resize-none font-arabic"
            />
          </div>
        </div>

        {/* 'Send To Support' Button */}
        <div className="w-full max-w-sm mt-5">
          <button
            type="submit"
            disabled={isSubmitted}
            className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20 cursor-pointer flex items-center justify-center gap-2"
          >
            {isSubmitted ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>جارٍ الإرسال...</span>
              </>
            ) : (
              <span>Send To Support</span>
            )}
          </button>
        </div>

        {/* Bottom stylized Tellme Logo / Signature */}
        <div className="mt-8 flex flex-col items-center gap-1.5 opacity-90">
          <TellmeLogo size="md" />
          <span
            className="font-brand text-xl text-blue-600 font-bold"
            style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
          >
            Tellme Apps
          </span>
        </div>
      </form>
    </div>
  );
};
