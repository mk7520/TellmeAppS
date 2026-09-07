import React from 'react';

interface TellmeLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  withText?: boolean;
  className?: string;
  textColor?: string;
  circleBg?: string;
}

export const TellmeLogo: React.FC<TellmeLogoProps> = ({
  size = 'md',
  withText = false,
  className = '',
  textColor = 'text-[#ff006b]',
  circleBg = 'bg-gradient-to-tr from-[#ff007f] via-[#ff006b] to-[#ff004d]',
}) => {
  const sizeMap = {
    sm: { circle: 'w-7 h-7 text-sm rounded-full', text: 'text-xl' },
    md: { circle: 'w-10 h-10 text-lg rounded-full', text: 'text-2xl' },
    lg: { circle: 'w-14 h-14 text-2xl rounded-full', text: 'text-3xl' },
    xl: { circle: 'w-20 h-20 text-4xl rounded-full', text: 'text-4xl' },
    '2xl': { circle: 'w-28 h-28 text-6xl rounded-full', text: 'text-5xl' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Official Tellme Circular Badge with Exact Logo Gradient & Stylized T */}
      <div
        className={`relative ${currentSize.circle} ${circleBg} flex items-center justify-center text-white font-bold shadow-md shadow-[#ff006b]/30 shrink-0 transition-transform hover:scale-105 active:scale-95 overflow-hidden`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-[72%] h-[72%] fill-white drop-shadow-xs"
        >
          {/* Exact stylized slanted Tellme 'T' mark from logo */}
          <path
            d="M53.5 30.5 L62 29.5 L60.5 33 L70 32.5 L66.5 39 L58 40 L44.5 72 L36.5 73 L48 43.5 L30.5 44 L33 37.5 L54.5 34 Z"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {withText && (
        <span
          className={`font-brand font-bold tracking-tight italic leading-none ${textColor} ${currentSize.text}`}
          style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
        >
          Tellme
        </span>
      )}
    </div>
  );
};

