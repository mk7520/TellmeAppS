export interface Country {
  code: string;
  nameAr: string;
  nameEn: string;
  dialCode: string;
  flag: string;
  placeholder: string;
  region: 'arab' | 'europe' | 'asia' | 'americas' | 'africa' | 'oceania';
  isPopular?: boolean;
}

export const COUNTRIES: Country[] = [
  // الدول العربية (Arab Countries)
  { code: 'SA', nameAr: 'المملكة العربية السعودية', nameEn: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦', placeholder: '50 123 4567', region: 'arab', isPopular: true },
  { code: 'AE', nameAr: 'الإمارات العربية المتحدة', nameEn: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪', placeholder: '50 123 4567', region: 'arab', isPopular: true },
  { code: 'EG', nameAr: 'مصر', nameEn: 'Egypt', dialCode: '+20', flag: '🇪🇬', placeholder: '10 1234 5678', region: 'arab', isPopular: true },
  { code: 'KW', nameAr: 'الكويت', nameEn: 'Kuwait', dialCode: '+965', flag: '🇰🇼', placeholder: '9000 1234', region: 'arab', isPopular: true },
  { code: 'QA', nameAr: 'قطر', nameEn: 'Qatar', dialCode: '+974', flag: '🇶🇦', placeholder: '5000 1234', region: 'arab', isPopular: true },
  { code: 'BH', nameAr: 'البحرين', nameEn: 'Bahrain', dialCode: '+973', flag: '🇧🇭', placeholder: '3600 1234', region: 'arab', isPopular: true },
  { code: 'OM', nameAr: 'سلطنة عمان', nameEn: 'Oman', dialCode: '+968', flag: '🇴🇲', placeholder: '9123 4567', region: 'arab', isPopular: true },
  { code: 'JO', nameAr: 'الأردن', nameEn: 'Jordan', dialCode: '+962', flag: '🇯🇴', placeholder: '7 9123 4567', region: 'arab', isPopular: true },
  { code: 'IQ', nameAr: 'العراق', nameEn: 'Iraq', dialCode: '+964', flag: '🇮🇶', placeholder: '770 123 4567', region: 'arab', isPopular: true },
  { code: 'PS', nameAr: 'فلسطين', nameEn: 'Palestine', dialCode: '+970', flag: '🇵🇸', placeholder: '59 123 4567', region: 'arab', isPopular: true },
  { code: 'LB', nameAr: 'لبنان', nameEn: 'Lebanon', dialCode: '+961', flag: '🇱🇧', placeholder: '70 123 456', region: 'arab', isPopular: true },
  { code: 'SY', nameAr: 'سوريا', nameEn: 'Syria', dialCode: '+963', flag: '🇸🇾', placeholder: '93 123 4567', region: 'arab', isPopular: true },
  { code: 'YE', nameAr: 'اليمن', nameEn: 'Yemen', dialCode: '+967', flag: '🇾🇪', placeholder: '77 123 4567', region: 'arab', isPopular: true },
  { code: 'MA', nameAr: 'المغرب', nameEn: 'Morocco', dialCode: '+212', flag: '🇲🇦', placeholder: '612 345 678', region: 'arab', isPopular: true },
  { code: 'DZ', nameAr: 'الجزائر', nameEn: 'Algeria', dialCode: '+213', flag: '🇩🇿', placeholder: '551 23 45 67', region: 'arab', isPopular: true },
  { code: 'TN', nameAr: 'تونس', nameEn: 'Tunisia', dialCode: '+216', flag: '🇹🇳', placeholder: '20 123 456', region: 'arab', isPopular: true },
  { code: 'LY', nameAr: 'ليبيا', nameEn: 'Libya', dialCode: '+218', flag: '🇱🇾', placeholder: '91 123 4567', region: 'arab', isPopular: true },
  { code: 'SD', nameAr: 'السودان', nameEn: 'Sudan', dialCode: '+249', flag: '🇸🇩', placeholder: '91 234 5678', region: 'arab', isPopular: true },
  { code: 'MR', nameAr: 'موريتانيا', nameEn: 'Mauritania', dialCode: '+222', flag: '🇲🇷', placeholder: '41 23 45 67', region: 'arab' },
  { code: 'SO', nameAr: 'الصومال', nameEn: 'Somalia', dialCode: '+252', flag: '🇸🇴', placeholder: '61 234 5678', region: 'arab' },
  { code: 'DJ', nameAr: 'جيبوتي', nameEn: 'Djibouti', dialCode: '+253', flag: '🇩🇯', placeholder: '77 12 34 56', region: 'arab' },
  { code: 'KM', nameAr: 'جزر القمر', nameEn: 'Comoros', dialCode: '+269', flag: '🇰🇲', placeholder: '321 23 45', region: 'arab' },

  // أمريكا الشمالية والجنوبية (Americas)
  { code: 'US', nameAr: 'الولايات المتحدة', nameEn: 'United States', dialCode: '+1', flag: '🇺🇸', placeholder: '(555) 000-0000', region: 'americas', isPopular: true },
  { code: 'CA', nameAr: 'كندا', nameEn: 'Canada', dialCode: '+1', flag: '🇨🇦', placeholder: '(555) 000-0000', region: 'americas', isPopular: true },
  { code: 'MX', nameAr: 'المكسيك', nameEn: 'Mexico', dialCode: '+52', flag: '🇲🇽', placeholder: '55 1234 5678', region: 'americas' },
  { code: 'BR', nameAr: 'البرازيل', nameEn: 'Brazil', dialCode: '+55', flag: '🇧🇷', placeholder: '11 91234-5678', region: 'americas' },
  { code: 'AR', nameAr: 'الأرجنتين', nameEn: 'Argentina', dialCode: '+54', flag: '🇦🇷', placeholder: '9 11 1234-5678', region: 'americas' },
  { code: 'CO', nameAr: 'كولومبيا', nameEn: 'Colombia', dialCode: '+57', flag: '🇨🇴', placeholder: '300 123 4567', region: 'americas' },
  { code: 'CL', nameAr: 'تشيلي', nameEn: 'Chile', dialCode: '+56', flag: '🇨🇱', placeholder: '9 1234 5678', region: 'americas' },
  { code: 'PE', nameAr: 'بيرو', nameEn: 'Peru', dialCode: '+51', flag: '🇵🇪', placeholder: '912 345 678', region: 'americas' },
  { code: 'VE', nameAr: 'فنزويلا', nameEn: 'Venezuela', dialCode: '+58', flag: '🇻🇪', placeholder: '412 123 4567', region: 'americas' },

  // أوروبا (Europe)
  { code: 'GB', nameAr: 'المملكة المتحدة', nameEn: 'United Kingdom', dialCode: '+44', flag: '🇬🇧', placeholder: '7911 123456', region: 'europe', isPopular: true },
  { code: 'DE', nameAr: 'ألمانيا', nameEn: 'Germany', dialCode: '+49', flag: '🇩🇪', placeholder: '151 12345678', region: 'europe', isPopular: true },
  { code: 'FR', nameAr: 'فرنسا', nameEn: 'France', dialCode: '+33', flag: '🇫🇷', placeholder: '6 12 34 56 78', region: 'europe', isPopular: true },
  { code: 'IT', nameAr: 'إيطاليا', nameEn: 'Italy', dialCode: '+39', flag: '🇮🇹', placeholder: '312 345 6789', region: 'europe' },
  { code: 'ES', nameAr: 'إسبانيا', nameEn: 'Spain', dialCode: '+34', flag: '🇪🇸', placeholder: '612 34 56 78', region: 'europe' },
  { code: 'TR', nameAr: 'تركيا', nameEn: 'Turkey', dialCode: '+90', flag: '🇹🇷', placeholder: '501 234 56 78', region: 'europe', isPopular: true },
  { code: 'RU', nameAr: 'روسيا', nameEn: 'Russia', dialCode: '+7', flag: '🇷🇺', placeholder: '912 345-67-89', region: 'europe' },
  { code: 'NL', nameAr: 'هولندا', nameEn: 'Netherlands', dialCode: '+31', flag: '🇳🇱', placeholder: '6 12345678', region: 'europe' },
  { code: 'CH', nameAr: 'سويسرا', nameEn: 'Switzerland', dialCode: '+41', flag: '🇨🇭', placeholder: '78 123 45 67', region: 'europe' },
  { code: 'SE', nameAr: 'السويد', nameEn: 'Sweden', dialCode: '+46', flag: '🇸🇪', placeholder: '70 123 45 67', region: 'europe' },
  { code: 'BE', nameAr: 'بلجيكا', nameEn: 'Belgium', dialCode: '+32', flag: '🇧🇪', placeholder: '470 12 34 56', region: 'europe' },
  { code: 'AT', nameAr: 'النمسا', nameEn: 'Austria', dialCode: '+43', flag: '🇦🇹', placeholder: '664 1234567', region: 'europe' },
  { code: 'NO', nameAr: 'النرويج', nameEn: 'Norway', dialCode: '+47', flag: '🇳🇴', placeholder: '412 34 567', region: 'europe' },
  { code: 'DK', nameAr: 'الدنمارك', nameEn: 'Denmark', dialCode: '+45', flag: '🇩🇰', placeholder: '20 12 34 56', region: 'europe' },
  { code: 'FI', nameAr: 'فنلندا', nameEn: 'Finland', dialCode: '+358', flag: '🇫🇮', placeholder: '41 234 5678', region: 'europe' },
  { code: 'IE', nameAr: 'أيرلندا', nameEn: 'Ireland', dialCode: '+353', flag: '🇮🇪', placeholder: '85 123 4567', region: 'europe' },
  { code: 'PL', nameAr: 'بولندا', nameEn: 'Poland', dialCode: '+48', flag: '🇵🇱', placeholder: '512 345 678', region: 'europe' },
  { code: 'PT', nameAr: 'البرتغال', nameEn: 'Portugal', dialCode: '+351', flag: '🇵🇹', placeholder: '912 345 678', region: 'europe' },
  { code: 'GR', nameAr: 'اليونان', nameEn: 'Greece', dialCode: '+30', flag: '🇬🇷', placeholder: '691 234 5678', region: 'europe' },
  { code: 'UA', nameAr: 'أوكرانيا', nameEn: 'Ukraine', dialCode: '+380', flag: '🇺🇦', placeholder: '50 123 4567', region: 'europe' },

  // آسيا (Asia)
  { code: 'IN', nameAr: 'الهند', nameEn: 'India', dialCode: '+91', flag: '🇮🇳', placeholder: '98123 45678', region: 'asia', isPopular: true },
  { code: 'PK', nameAr: 'باكستان', nameEn: 'Pakistan', dialCode: '+92', flag: '🇵🇰', placeholder: '301 2345678', region: 'asia', isPopular: true },
  { code: 'CN', nameAr: 'الصين', nameEn: 'China', dialCode: '+86', flag: '🇨🇳', placeholder: '138 0013 8000', region: 'asia' },
  { code: 'JP', nameAr: 'اليابان', nameEn: 'Japan', dialCode: '+81', flag: '🇯🇵', placeholder: '90 1234 5678', region: 'asia' },
  { code: 'KR', nameAr: 'كوريا الجنوبية', nameEn: 'South Korea', dialCode: '+82', flag: '🇰🇷', placeholder: '10 1234 5678', region: 'asia' },
  { code: 'ID', nameAr: 'إندونيسيا', nameEn: 'Indonesia', dialCode: '+62', flag: '🇮🇩', placeholder: '812 3456 7890', region: 'asia' },
  { code: 'MY', nameAr: 'ماليزيا', nameEn: 'Malaysia', dialCode: '+60', flag: '🇲🇾', placeholder: '12 345 6789', region: 'asia' },
  { code: 'PH', nameAr: 'الفلبين', nameEn: 'Philippines', dialCode: '+63', flag: '🇵🇭', placeholder: '917 123 4567', region: 'asia' },
  { code: 'SG', nameAr: 'سنغافورة', nameEn: 'Singapore', dialCode: '+65', flag: '🇸🇬', placeholder: '8123 4567', region: 'asia' },
  { code: 'TH', nameAr: 'تايلاند', nameEn: 'Thailand', dialCode: '+66', flag: '🇹🇭', placeholder: '81 234 5678', region: 'asia' },
  { code: 'VN', nameAr: 'فيتنام', nameEn: 'Vietnam', dialCode: '+84', flag: '🇻🇳', placeholder: '91 234 56 78', region: 'asia' },
  { code: 'BD', nameAr: 'بنغلاديش', nameEn: 'Bangladesh', dialCode: '+880', flag: '🇧🇩', placeholder: '1712 345678', region: 'asia' },
  { code: 'IR', nameAr: 'إيران', nameEn: 'Iran', dialCode: '+98', flag: '🇮🇷', placeholder: '912 345 6789', region: 'asia' },
  { code: 'AF', nameAr: 'أفغانستان', nameEn: 'Afghanistan', dialCode: '+93', flag: '🇦🇫', placeholder: '70 123 4567', region: 'asia' },
  { code: 'KZ', nameAr: 'كازاخستان', nameEn: 'Kazakhstan', dialCode: '+7', flag: '🇰🇿', placeholder: '701 234 5678', region: 'asia' },
  { code: 'UZ', nameAr: 'أوزبكستان', nameEn: 'Uzbekistan', dialCode: '+998', flag: '🇺🇿', placeholder: '90 123 45 67', region: 'asia' },
  { code: 'AZ', nameAr: 'أذربيجان', nameEn: 'Azerbaijan', dialCode: '+994', flag: '🇦🇿', placeholder: '50 123 45 67', region: 'asia' },
  { code: 'HK', nameAr: 'هونغ كونغ', nameEn: 'Hong Kong', dialCode: '+852', flag: '🇭🇰', placeholder: '9123 4567', region: 'asia' },
  { code: 'TW', nameAr: 'تايوان', nameEn: 'Taiwan', dialCode: '+886', flag: '🇹🇼', placeholder: '912 345 678', region: 'asia' },
  { code: 'LK', nameAr: 'سريلانكا', nameEn: 'Sri Lanka', dialCode: '+94', flag: '🇱🇰', placeholder: '71 234 5678', region: 'asia' },
  { code: 'NP', nameAr: 'نيبال', nameEn: 'Nepal', dialCode: '+977', flag: '🇳🇵', placeholder: '984 1234567', region: 'asia' },

  // إفريقيا (Africa)
  { code: 'ZA', nameAr: 'جنوب إفريقيا', nameEn: 'South Africa', dialCode: '+27', flag: '🇿🇦', placeholder: '71 123 4567', region: 'africa' },
  { code: 'NG', nameAr: 'نيجيريا', nameEn: 'Nigeria', dialCode: '+234', flag: '🇳🇬', placeholder: '802 123 4567', region: 'africa' },
  { code: 'KE', nameAr: 'كينيا', nameEn: 'Kenya', dialCode: '+254', flag: '🇰🇪', placeholder: '712 345678', region: 'africa' },
  { code: 'GH', nameAr: 'غانا', nameEn: 'Ghana', dialCode: '+233', flag: '🇬🇭', placeholder: '24 123 4567', region: 'africa' },
  { code: 'ET', nameAr: 'إثيوبيا', nameEn: 'Ethiopia', dialCode: '+251', flag: '🇪🇹', placeholder: '91 123 4567', region: 'africa' },
  { code: 'TZ', nameAr: 'تنزانيا', nameEn: 'Tanzania', dialCode: '+255', flag: '🇹🇿', placeholder: '712 345 678', region: 'africa' },
  { code: 'UG', nameAr: 'أوغندا', nameEn: 'Uganda', dialCode: '+256', flag: '🇺🇬', placeholder: '712 345678', region: 'africa' },
  { code: 'SN', nameAr: 'السنغال', nameEn: 'Senegal', dialCode: '+221', flag: '🇸🇳', placeholder: '70 123 45 67', region: 'africa' },
  { code: 'CI', nameAr: 'ساحل العاج', nameEn: 'Ivory Coast', dialCode: '+225', flag: '🇨🇮', placeholder: '01 23 45 67 89', region: 'africa' },
  { code: 'CM', nameAr: 'الكاميرون', nameEn: 'Cameroon', dialCode: '+237', flag: '🇨🇲', placeholder: '6 71 23 45 67', region: 'africa' },

  // أوقيانوسيا (Oceania)
  { code: 'AU', nameAr: 'أستراليا', nameEn: 'Australia', dialCode: '+61', flag: '🇦🇺', placeholder: '412 345 678', region: 'oceania' },
  { code: 'NZ', nameAr: 'نيوزيلندا', nameEn: 'New Zealand', dialCode: '+64', flag: '🇳🇿', placeholder: '21 123 4567', region: 'oceania' },
];

export const DEFAULT_COUNTRY = COUNTRIES[0]; // Saudi Arabia +966
