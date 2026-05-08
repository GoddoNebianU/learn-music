import { useTranslation } from 'react-i18next';
import type { Language } from '../i18n';
import { cn } from '../lib/cn';

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'zh', label: '中文' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language as Language;

  return (
    <div className="flex items-center gap-1 text-sm">
      {LANGUAGES.map(({ code, label }, index) => (
        <span key={code} className="flex items-center">
          {index > 0 && <span className="text-gray-300 mx-1">/</span>}
          <button
            className={cn(
              currentLang === code
                ? "text-gray-800 font-medium"
                : "text-gray-400 hover:text-gray-600 transition-colors"
            )}
            onClick={() => i18n.changeLanguage(code)}
          >
            {label}
          </button>
        </span>
      ))}
    </div>
  );
}
