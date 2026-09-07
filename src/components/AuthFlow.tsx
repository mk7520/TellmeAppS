import React, { useState } from 'react';
import { TellmeLogo } from './TellmeLogo';
import { UserProfile } from '../types';
import { Check, ArrowLeft, ArrowRight, ShieldCheck, Phone, Mail, LogIn, UserPlus, Sparkles, KeyRound } from 'lucide-react';
import { CountryPhoneInput } from './CountryPhoneInput';

interface AuthFlowProps {
  onComplete: (user: Partial<UserProfile>) => void;
  onCancel?: () => void;
  initialMode?: 'signin' | 'signup';
}

type Step = 'splash' | 'phone' | 'otp' | 'name' | 'following' | 'welcome';

export const AuthFlow: React.FC<AuthFlowProps> = ({ 
  onComplete, 
  onCancel,
  initialMode = 'signin',
}) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>(initialMode);
  const [step, setStep] = useState<Step>('splash');
  const [useEmail, setUseEmail] = useState(false);
  const [countryCode, setCountryCode] = useState('+966');
  const [phoneNumber, setPhoneNumber] = useState('50 123 4567');
  const [emailAddress, setEmailAddress] = useState('mohammedkamalalmotawq@gmail.com');
  const [otpCode, setOtpCode] = useState('7890');
  const [firstName, setFirstName] = useState('محمد');
  const [lastName, setLastName] = useState('كمال');
  const [followingOption, setFollowingOption] = useState<boolean | null>(null);

  const handleNextFromPhone = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('otp');
  };

  const handleNextFromOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'signin') {
      // In sign in mode, verifying code completes login directly!
      setStep('welcome');
    } else {
      setStep('name');
    }
  };

  const handleNextFromName = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('following');
  };

  const handleFollowChoice = (choice: boolean) => {
    setFollowingOption(choice);
    setStep('welcome');
  };

  const handleFinish = () => {
    onComplete({
      name: `${firstName} ${lastName}`.trim() || 'محمد كمال',
      phone: `${countryCode} ${phoneNumber}`,
      email: emailAddress,
      followingAll: followingOption ?? true,
      allowAutoPost: followingOption ?? true,
    });
  };

  const handleQuickDemoLogin = () => {
    onComplete({
      name: 'محمد كمال',
      username: 'mohammed_mk',
      phone: '+966 50 123 4567',
      email: 'mohammedkamalalmotawq@gmail.com',
      followingAll: true,
      allowAutoPost: true,
    });
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between p-6 bg-white text-slate-900 overflow-y-auto min-h-full w-full max-w-md mx-auto">
      {/* Top action / back if not first step */}
      <div className="w-full flex justify-between items-center h-8">
        {step !== 'splash' ? (
          <button
            onClick={() => {
              if (step === 'phone') setStep('splash');
              else if (step === 'otp') setStep('phone');
              else if (step === 'name') setStep('otp');
              else if (step === 'following') setStep('name');
              else if (step === 'welcome') {
                if (authMode === 'signin') setStep('otp');
                else setStep('following');
              }
            }}
            className="text-slate-600 hover:text-[#ff006b] hover:bg-[#fff0f5] p-2 rounded-xl transition-colors cursor-pointer"
            title="رجوع"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : <div />}

        {onCancel && (
          <button
            onClick={onCancel}
            className="text-xs text-slate-400 hover:text-[#ff006b] px-3 py-1.5 rounded-xl hover:bg-[#fff0f5] cursor-pointer font-medium transition-colors"
          >
            تخطي ومتابعة
          </button>
        )}
      </div>

      {/* Screen 1: Splash / Sign In / Sign Up Screen */}
      {step === 'splash' && (
        <div className="flex-1 flex flex-col items-center justify-center text-center my-auto w-full max-w-xs animate-in fade-in zoom-in-95 duration-200 py-4">
          <TellmeLogo size="2xl" className="mb-4 shadow-xl shadow-[#ff006b]/20" />
          
          <h1
            className="text-5xl font-bold font-brand text-[#ff006b] tracking-wider mb-1"
            style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
          >
            Tellme
          </h1>
          <p className="text-xs text-slate-500 max-w-[260px] leading-relaxed mb-6">
            منصة التواصل الاجتماعي المتطورة للتواصل الفوري والمكالمات الآمنة
          </p>

          {/* Mode Tabs: تسجيل الدخول vs إنشاء حساب */}
          <div className="w-full grid grid-cols-2 p-1 bg-slate-100 rounded-xl mb-5 border border-slate-200">
            <button
              onClick={() => setAuthMode('signin')}
              className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                authMode === 'signin'
                  ? 'bg-white text-[#ff006b] shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>تسجيل الدخول</span>
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                authMode === 'signup'
                  ? 'bg-white text-[#ff006b] shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>حساب جديد</span>
            </button>
          </div>

          <div className="w-full space-y-2.5">
            <button
              id="start-button"
              onClick={() => setStep('phone')}
              className="w-full py-3 px-8 rounded-xl bg-gradient-to-r from-[#ff007f] to-[#ff0055] text-white font-bold text-base hover:opacity-95 transition-all duration-200 shadow-md shadow-[#ff006b]/25 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>{authMode === 'signin' ? 'المتابعة برقم الهاتف / البريد' : 'البدء والتسجيل (Start)'}</span>
            </button>

            {/* Quick 1-click test login button */}
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-[#fff0f5] hover:border-[#ffccd9] text-slate-700 hover:text-[#ff006b] font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ff006b]" />
              <span>دخول سريع تجريبي (محمد كمال)</span>
            </button>
          </div>
        </div>
      )}

      {/* Screen 2: Add Phone Number / Email */}
      {step === 'phone' && (
        <form onSubmit={handleNextFromPhone} className="flex-1 flex flex-col items-center justify-between w-full max-w-xs my-auto py-4 animate-in fade-in duration-200">
          <div className="flex flex-col items-center w-full">
            <TellmeLogo size="xl" className="mb-3 shadow-md shadow-[#ff006b]/20" />
            <h2
              className="text-2xl font-bold text-[#ff006b] font-brand mb-1"
              style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
            >
              {authMode === 'signin' ? 'Sign In to Tellme' : 'Add Phone Number'}
            </h2>
            <p className="text-xs text-slate-500 mb-5 text-center">
              {authMode === 'signin'
                ? 'أدخل رقم هاتفك أو بريدك الإلكتروني المسجل'
                : 'أدخل رقم الهاتف لتلقي رمز التفعيل والتسجيل'}
            </p>

            {!useEmail ? (
              <div className="w-full space-y-2">
                <CountryPhoneInput
                  countryCode={countryCode}
                  onCountryCodeChange={setCountryCode}
                  phoneNumber={phoneNumber}
                  onPhoneNumberChange={setPhoneNumber}
                  id="auth-flow-phone"
                  autoFocus
                />
              </div>
            ) : (
              <div className="w-full">
                <div className="border border-slate-200 rounded-xl px-4 py-2.5 bg-slate-50 flex items-center gap-2 focus-within:border-[#ff006b] focus-within:ring-2 focus-within:ring-[#ffe4ee]">
                  <Mail className="w-5 h-5 text-[#ff006b]" />
                  <input
                    type="email"
                    dir="ltr"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    placeholder="example@mail.com"
                    required
                    className="w-full text-sm text-slate-800 font-semibold outline-none bg-transparent"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="w-full flex flex-col items-center gap-3 mt-6">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#ff007f] to-[#ff0055] text-white font-bold text-base hover:opacity-95 transition-all shadow-md shadow-[#ff006b]/20 cursor-pointer"
            >
              التالي (Next)
            </button>

            <button
              type="button"
              onClick={() => setUseEmail(!useEmail)}
              className="text-xs text-[#ff006b] hover:underline font-semibold cursor-pointer py-1"
            >
              {useEmail ? 'استخدام رقم الهاتف بدلاً من ذلك' : 'تسجيل الدخول بواسطة البريد الإلكتروني'}
            </button>
          </div>
        </form>
      )}

      {/* Screen 3: Verification Code */}
      {step === 'otp' && (
        <form onSubmit={handleNextFromOtp} className="flex-1 flex flex-col items-center justify-between w-full max-w-xs my-auto py-4 animate-in fade-in duration-200">
          <div className="flex flex-col items-center w-full">
            <TellmeLogo size="xl" className="mb-3 shadow-md shadow-[#ff006b]/20" />
            <h2
              className="text-2xl font-bold text-[#ff006b] font-brand mb-1"
              style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
            >
              Verification Code
            </h2>
            <p className="text-xs text-slate-500 mb-6 text-center">
              تم إرسال رمز التحقق إلى {useEmail ? emailAddress : `${countryCode} ${phoneNumber}`}
            </p>

            {/* OTP input field */}
            <div className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus-within:border-[#ff006b] focus-within:ring-2 focus-within:ring-[#ffe4ee]">
              <input
                type="text"
                maxLength={8}
                dir="ltr"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="____ - ____"
                className="w-full text-center tracking-[0.3em] text-[#ff006b] font-black text-xl outline-none placeholder:text-slate-300 bg-transparent"
                required
              />
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-2 bg-[#fff0f5] px-2.5 py-1 rounded-full border border-[#ffe4ee]">
              <KeyRound className="w-3 h-3 text-[#ff006b]" />
              <span>رمز التحقق التجريبي الجاهز: <strong>7890</strong></span>
            </div>
          </div>

          <div className="w-full mt-6">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#ff007f] to-[#ff0055] text-white font-bold text-base hover:opacity-95 transition-all shadow-md shadow-[#ff006b]/20 cursor-pointer"
            >
              {authMode === 'signin' ? 'تسجيل الدخول (Login)' : 'تأكيد ومتابعة (Verify)'}
            </button>
          </div>
        </form>
      )}

      {/* Screen 4: Add Name (Sign Up only) */}
      {step === 'name' && (
        <form onSubmit={handleNextFromName} className="flex-1 flex flex-col items-center justify-between w-full max-w-xs my-auto py-4 animate-in fade-in duration-200">
          <div className="flex flex-col items-center w-full">
            <TellmeLogo size="xl" className="mb-3 shadow-md shadow-[#ff006b]/20" />
            <h2
              className="text-2xl font-bold text-[#ff006b] font-brand mb-2"
              style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
            >
              Profile Name
            </h2>
            <p className="text-xs text-slate-500 mb-5 text-center">
              أدخل اسمك كما سيظهر للأصدقاء في ملفك الشخصي
            </p>

            <div className="w-full space-y-3">
              <div className="border border-slate-200 rounded-xl px-4 py-2.5 bg-slate-50 focus-within:border-[#ff006b] focus-within:ring-2 focus-within:ring-[#ffe4ee]">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="الاسم الأول (First Name)"
                  required
                  className="w-full text-center text-slate-800 font-semibold text-sm outline-none placeholder:text-slate-400 bg-transparent"
                />
              </div>

              <div className="border border-slate-200 rounded-xl px-4 py-2.5 bg-slate-50 focus-within:border-[#ff006b] focus-within:ring-2 focus-within:ring-[#ffe4ee]">
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="اسم العائلة (Last Name)"
                  required
                  className="w-full text-center text-slate-800 font-semibold text-sm outline-none placeholder:text-slate-400 bg-transparent"
                />
              </div>
            </div>
          </div>

          <div className="w-full mt-6">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#ff007f] to-[#ff0055] text-white font-bold text-base hover:opacity-95 transition-all shadow-md shadow-[#ff006b]/20 cursor-pointer"
            >
              التالي (Next)
            </button>
          </div>
        </form>
      )}

      {/* Screen 5: Following confirmation (Slide 4) */}
      {step === 'following' && (
        <div className="flex-1 flex flex-col items-center justify-between w-full max-w-xs my-auto py-4 animate-in fade-in duration-200">
          <div className="flex flex-col items-center w-full">
            <TellmeLogo size="xl" className="mb-3 shadow-md shadow-[#ff006b]/20" />
            <h2
              className="text-2xl font-bold text-[#ff006b] font-brand mb-3"
              style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
            >
              Following
            </h2>

            <div className="w-full bg-[#fff0f5] border border-[#ffccd9] rounded-2xl p-4 text-slate-700 text-xs leading-relaxed space-y-2.5 text-center mb-4">
              <p className="font-bold text-[#ff006b] text-sm">Do you want to follow me ?</p>
              <div className="text-right space-y-1.5 text-slate-600">
                <p>.1 Follow up with all applications tellme ?</p>
                <p>.2 Allow me to make a post on tellme that is automatically created on all tellme applications</p>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => handleFollowChoice(true)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#ff007f] to-[#ff0055] text-white font-bold text-base hover:opacity-95 transition-all shadow-md shadow-[#ff006b]/20 cursor-pointer"
            >
              نعم (Yes)
            </button>

            <button
              type="button"
              onClick={() => handleFollowChoice(false)}
              className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-100 transition-colors cursor-pointer"
            >
              لا (No)
            </button>
          </div>
        </div>
      )}

      {/* Screen 6: Welcome / Hello */}
      {step === 'welcome' && (
        <div className="flex-1 flex flex-col items-center justify-between w-full max-w-xs my-auto py-6 animate-in fade-in duration-200">
          <div className="flex flex-col items-center my-auto">
            <TellmeLogo size="2xl" className="mb-4 shadow-xl shadow-[#ff006b]/25" />
            <h1
              className="text-4xl font-bold font-brand text-[#ff006b] tracking-wider mb-1"
              style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
            >
              Tellme
            </h1>
            <h2
              className="text-3xl font-bold font-brand text-slate-900 mb-3"
              style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
            >
              Hello, {firstName}!
            </h2>
            <p className="text-xs text-slate-500 text-center max-w-[240px] leading-relaxed">
              تم تسجيل الدخول وإعداد حسابك بنجاح. أهلاً بك في عالم التواصل السلس عبر Tellme!
            </p>
          </div>

          <div className="w-full">
            <button
              type="button"
              onClick={handleFinish}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ff007f] to-[#ff0055] text-white font-bold text-base hover:opacity-95 transition-all shadow-md shadow-[#ff006b]/25 cursor-pointer"
            >
              الدخول إلى التطبيق (Enter Tellme)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

