import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, ChevronDown, Check, X, Globe, Sparkles } from 'lucide-react';
import { COUNTRIES, Country, DEFAULT_COUNTRY } from '../data/countries';

interface CountryPhoneInputProps {
  countryCode: string;
  onCountryCodeChange: (code: string) => void;
  phoneNumber: string;
  onPhoneNumberChange: (phone: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  id?: string;
}

export const CountryPhoneInput: React.FC<CountryPhoneInputProps> = ({
  countryCode,
  onCountryCodeChange,
  phoneNumber,
  onPhoneNumberChange,
  placeholder,
  autoFocus = false,
  required = true,
  disabled = false,
  className = '',
  inputClassName = '',
  id = 'phone-input',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRegion, setActiveRegion] = useState<string>('all');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Find active country based on dialCode or default
  const selectedCountry = useMemo(() => {
    return (
      COUNTRIES.find((c) => c.dialCode === countryCode) ||
      DEFAULT_COUNTRY
    );
  }, [countryCode]);

  // Focus search input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery('');
      setActiveRegion('all');
    }
  }, [isOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Close when clicking outside modal
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Filter countries by query and region
  const filteredCountries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return COUNTRIES.filter((country) => {
      // Region filter
      if (activeRegion === 'arab' && country.region !== 'arab') return false;
      if (activeRegion === 'popular' && !country.isPopular) return false;
      if (activeRegion === 'europe' && country.region !== 'europe') return false;
      if (activeRegion === 'asia' && country.region !== 'asia') return false;
      if (activeRegion === 'americas' && country.region !== 'americas') return false;

      // Search query filter (matches Arabic name, English name, ISO code, or dial code)
      if (!query) return true;
      const cleanDial = country.dialCode.replace('+', '');
      return (
        country.nameAr.toLowerCase().includes(query) ||
        country.nameEn.toLowerCase().includes(query) ||
        country.code.toLowerCase().includes(query) ||
        country.dialCode.includes(query) ||
        cleanDial.includes(query)
      );
    });
  }, [searchQuery, activeRegion]);

  const handleSelectCountry = (country: Country) => {
    onCountryCodeChange(country.dialCode);
    setIsOpen(false);
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Unified Input Container */}
      <div className="flex items-stretch border border-slate-200 rounded-2xl bg-slate-50 focus-within:bg-white focus-within:border-[#ff006b] focus-within:ring-3 focus-within:ring-[#ff006b]/15 transition-all shadow-xs overflow-hidden">
        {/* Country Selector Trigger */}
        <button
          type="button"
          id={`${id}-country-selector-btn`}
          onClick={() => !disabled && setIsOpen(true)}
          disabled={disabled}
          title={`${selectedCountry.nameAr} (${selectedCountry.dialCode})`}
          className="flex items-center gap-1.5 px-3.5 py-3 bg-slate-100/80 hover:bg-slate-200/70 active:scale-98 border-e border-slate-200 text-slate-800 font-bold transition-all cursor-pointer select-none shrink-0"
        >
          <span className="text-xl leading-none" role="img" aria-label={selectedCountry.nameAr}>
            {selectedCountry.flag}
          </span>
          <span dir="ltr" className="text-xs font-bold text-slate-700 font-mono">
            {selectedCountry.dialCode}
          </span>
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#ff006b]' : ''}`} />
        </button>

        {/* Phone Number Input */}
        <div className="relative flex-1 flex items-center">
          <input
            id={id}
            type="tel"
            dir="ltr"
            value={phoneNumber}
            onChange={(e) => onPhoneNumberChange(e.target.value)}
            placeholder={placeholder || selectedCountry.placeholder}
            required={required}
            disabled={disabled}
            autoFocus={autoFocus}
            className={`w-full px-3.5 py-3 bg-transparent text-slate-900 font-bold text-base outline-none tracking-wider placeholder:text-slate-300 ${inputClassName}`}
          />
          {phoneNumber && !disabled && (
            <button
              type="button"
              onClick={() => onPhoneNumberChange('')}
              className="p-1.5 me-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50 transition-colors cursor-pointer"
              title="مسح الرقم"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Selected Country Badge / Preview */}
      <div className="flex items-center justify-between px-1.5 mt-1.5 text-[11px] text-slate-400">
        <span className="flex items-center gap-1">
          <span>الدولة المحددة:</span>
          <span className="font-semibold text-slate-700">{selectedCountry.nameAr}</span>
          <span>{selectedCountry.flag}</span>
        </span>
        <span dir="ltr" className="font-mono text-slate-500">
          {selectedCountry.dialCode} {phoneNumber || '...'}
        </span>
      </div>

      {/* Country Selection Modal / Popover */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            ref={modalRef}
            className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col max-h-[85vh] overflow-hidden animate-in zoom-in-95 duration-200"
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#fff0f5] text-[#ff006b] flex items-center justify-center font-bold">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">اختر الدولة أو المنطقة</h3>
                  <p className="text-[11px] text-slate-500">أكثر من {COUNTRIES.length} دولة ورمز اتصال</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                title="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-3 border-b border-slate-100 bg-slate-50/70">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-slate-400 absolute start-3 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث بالاسم، الكود، أو رمز الدولة..."
                  className="w-full ps-9 pe-8 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#ff006b] focus:ring-2 focus:ring-[#ff006b]/15 transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute end-2.5 text-slate-400 hover:text-slate-600 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Quick Filter Categories */}
              <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto pb-0.5 no-scrollbar">
                {[
                  { id: 'all', label: 'الكل' },
                  { id: 'arab', label: 'الدول العربية 🇸🇦' },
                  { id: 'popular', label: 'الشائعة ⭐' },
                  { id: 'europe', label: 'أوروبا 🇪🇺' },
                  { id: 'asia', label: 'آسيا 🌏' },
                  { id: 'americas', label: 'الأمريكتين 🌎' },
                ].map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveRegion(category.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                      activeRegion === category.id
                        ? 'bg-[#ff006b] text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Countries List */}
            <div className="flex-1 overflow-y-auto p-2 divide-y divide-slate-50">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => {
                  const isSelected = country.dialCode === selectedCountry.dialCode;
                  return (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => handleSelectCountry(country)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-right transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#fff0f5] text-[#ff006b]'
                          : 'hover:bg-slate-100/80 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-2xl leading-none shrink-0" role="img" aria-label={country.nameAr}>
                          {country.flag}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs truncate">{country.nameAr}</span>
                            {country.isPopular && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-700 font-bold">
                                شائع
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-400 truncate">{country.nameEn}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span dir="ltr" className={`px-2 py-0.5 rounded-lg text-xs font-mono font-bold ${
                          isSelected
                            ? 'bg-[#ff006b] text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {country.dialCode}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-[#ff006b]" />}
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="py-10 text-center text-slate-400">
                  <p className="text-xs">لم يتم العثور على أي دولة مطابقة لـ &quot;{searchQuery}&quot;</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setActiveRegion('all');
                    }}
                    className="mt-2 text-xs font-bold text-[#ff006b] hover:underline"
                  >
                    عرض جميع الدول
                  </button>
                </div>
              )}
            </div>

            {/* Modal Footer Info */}
            <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-[11px] text-slate-500 flex items-center justify-between">
              <span>تم إدراج جميع الدول والرموز الدولية</span>
              <span className="font-bold text-slate-700">{filteredCountries.length} دولة متاحة</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
