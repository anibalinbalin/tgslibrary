'use client';

import { useLanguage } from '../i18n/LanguageContext';

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
      className="font-['SF_Pro:Regular',sans-serif] text-[15px] text-[rgba(0,0,0,0.4)] hover:text-black transition-colors uppercase"
      style={{ fontVariationSettings: "'wdth' 100" }}
    >
      {lang === 'en' ? 'ES' : 'EN'}
    </button>
  );
}
