import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
  headerTitle?: string;
  isDesktopMode: boolean;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  isDesktopMode,
}) => {
  if (isDesktopMode) {
    return (
      <div className="w-full h-full flex flex-col bg-white overflow-hidden shadow-sm rounded-2xl border border-slate-200">
        {children}
      </div>
    );
  }

  return (
    <div className="relative mx-auto my-auto w-full max-w-[410px] h-[830px] max-h-[96vh] bg-white border-[3px] border-slate-300 rounded-[48px] shadow-xl shadow-slate-400/20 ring-1 ring-slate-200/70 flex flex-col overflow-hidden transition-all duration-300">
      {/* Top Camera Notch / Dynamic Island */}
      <div className="w-full pt-2 pb-1.5 px-6 flex items-center justify-between z-40 bg-white/90 backdrop-blur-md shrink-0 border-b border-slate-100">
        <div className="text-[11px] font-bold text-slate-800 tracking-wider">9:41</div>

        {/* Dynamic Island / Speaker cutout */}
        <div className="flex items-center justify-center gap-1.5 px-3 py-1 bg-slate-950 text-white rounded-full border border-slate-800 shadow-inner">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-1 ring-slate-800" />
          <div className="w-9 h-1.5 rounded-full bg-slate-800" />
          <div className="w-2 h-2 rounded-full bg-blue-950 ring-1 ring-blue-500/30" />
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-slate-700 font-semibold">
          <span>5G</span>
          <div className="w-5 h-2.5 rounded-sm border border-slate-700 p-0.5 flex items-center">
            <div className="w-full h-full bg-[#ff006b] rounded-2xs" />
          </div>
        </div>
      </div>

      {/* Screen Inner Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative bg-[#f8fafc]">
        {children}
      </div>

      {/* Bottom Home Indicator bar */}
      <div className="w-full py-1.5 flex justify-center bg-white shrink-0 border-t border-slate-100">
        <div className="w-32 h-1 bg-slate-300 rounded-full" />
      </div>
    </div>
  );
};
