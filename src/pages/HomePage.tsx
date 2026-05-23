import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/cn';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <header className="flex h-14 items-center justify-between border-b border-gray-200 px-4">
        <Link to="/" className="text-sm font-semibold text-gray-800 hover:text-gray-600 transition-colors">Learn Music</Link>
        <LanguageSwitcher />
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">{t('home.title')}</h1>
          </div>
          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
            <Link
              to="/pitch-echo"
              className={cn(
                "rounded-md border border-gray-200 p-6",
                "hover:bg-gray-50 transition-colors",
                "flex flex-col gap-1"
              )}
            >
              <span className="text-lg font-bold text-gray-800">{t('home.pitchEcho')}</span>
              <span className="text-sm text-gray-500">{t('home.pitchEchoDesc')}</span>
            </Link>
            <Link
              to="/pitch-practice"
              className={cn(
                "rounded-md border border-gray-200 p-6",
                "hover:bg-gray-50 transition-colors",
                "flex flex-col gap-1"
              )}
            >
              <span className="text-lg font-bold text-gray-800">{t('home.pitchPractice')}</span>
              <span className="text-sm text-gray-500">{t('home.pitchPracticeDesc')}</span>
            </Link>
            <Link
              to="/recorder"
              className={cn(
                "rounded-md border border-gray-200 p-6",
                "hover:bg-gray-50 transition-colors",
                "flex flex-col gap-1"
              )}
            >
              <span className="text-lg font-bold text-gray-800">{t('home.recorder')}</span>
              <span className="text-sm text-gray-500">{t('home.recorderDesc')}</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
