import { Play, Check, X, ArrowLeft, Volume2 } from 'lucide-react';
import { cn } from '../lib/cn';
import { useEffect, useRef, useState } from 'react';
import { emaStep } from '../lib/math';
import { playRandomKey } from '../lib/audio';
import { delay } from '../lib/utils';
import AccuracyForm from '../components/AccuracyForm';
import type { PianoKey } from '../lib/piano';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

const CDEFGAB = "CDEFGAB";

export default function PitchPracticePage() {
  const { t } = useTranslation();
  const ctxRef = useRef<null | AudioContext>(null);
  const [accuracy, setAccuracy] = useState(Array.from({ length: 7 }).fill(-1) as number[]);
  const [lastPitch, setLastPitch] = useState("");
  const [lastKey, setLastKey] = useState<null | PianoKey>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [playing, setPlaying] = useState(false);
  const playingRef = useRef(false);

  useEffect(() => {
    ctxRef.current = new AudioContext();
    return () => {
      ctxRef.current?.close();
      ctxRef.current = null;
    };
  }, [ctxRef]);

  const startRound = async () => {
    if (!ctxRef.current) return;
    if (playingRef.current) return;

    playingRef.current = true;
    setPlaying(true);
    setShowAnswer(false);

    await playRandomKey(ctxRef.current, (key) => {
      setLastPitch(key.scientificName + " " + {
        "C": t('pitchPractice.noteNames.C'),
        "D": t('pitchPractice.noteNames.D'),
        "E": t('pitchPractice.noteNames.E'),
        "F": t('pitchPractice.noteNames.F'),
        "G": t('pitchPractice.noteNames.G'),
        "A": t('pitchPractice.noteNames.A'),
        "B": t('pitchPractice.noteNames.B')
      }[key.noteName]);
      setLastKey(key);
    });

    await delay(1500);
    setShowAnswer(true);
    setPlaying(false);
    playingRef.current = false;
  };

  const stopRound = () => {
    playingRef.current = false;
    setPlaying(false);
  };

  const answerAndNext = async (bingo: boolean) => {
    if (!lastKey) return;
    if (playingRef.current) return;

    const index = CDEFGAB.indexOf(lastKey.noteName);

    if (accuracy[index] === -1) {
      setAccuracy(acc => acc.map((ac, i) => i === index ? bingo ? 100 : 0 : ac));
    } else {
      setAccuracy(acc => acc.map((ac, i) => i === index ? emaStep(ac, bingo ? 100 : 0, 0.07) : ac));
    }

    startRound();
  };

  const hasNote = lastPitch.length > 0;

  return (
    <div className="min-h-screen">
      <header className="flex h-14 items-center justify-between border-b border-gray-200 px-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('common.back')}
        </Link>
        <LanguageSwitcher />
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800">{t('pitchPractice.title')}</h1>
        <p className="text-sm text-gray-500">{t('pitchPractice.desc')}</p>

        <div className="mt-6 flex flex-col items-center gap-5">
          <div className="flex w-full items-center justify-center gap-3 text-sm h-8">
            {hasNote && !playing ? (
              <>
                <span className="text-gray-500">{t('pitchPractice.current')}</span>
                <button
                  className={cn(
                    "rounded-md bg-gray-100 px-4 py-1 font-semibold text-gray-900",
                    "hover:bg-gray-200 transition-colors duration-250"
                  )}
                  onClick={() => setShowAnswer(b => !b)}>
                  {(showAnswer && lastKey !== null) ? lastKey.scientificName : t('pitchPractice.clickToReveal')}
                </button>
              </>
            ) : (
              <span className="text-gray-400">{playing ? t('pitchPractice.listening') : t('pitchPractice.clickToStart')}</span>
            )}
          </div>

          <AccuracyForm accuracy={accuracy} />
        </div>

        <div className="mt-8 flex flex-col items-center gap-5">
          <button
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-md font-semibold",
              "h-12 w-full px-6 text-base",
              "bg-gray-800 text-white hover:bg-gray-900",
              "transition-colors duration-250",
              playing && "bg-gray-600"
            )}
            onClick={playing ? stopRound : startRound}
          >
            {playing ? (
              <>
                <Volume2 className="h-5 w-5 animate-pulse" />
                <span>{t('pitchPractice.playing')}</span>
              </>
            ) : hasNote ? (
              <>
                <Play className="h-5 w-5" />
                <span>{t('pitchPractice.nextQuestion')}</span>
              </>
            ) : (
              <>
                <Play className="h-5 w-5" />
                <span>{t('common.start')}</span>
              </>
            )}
          </button>

          <div className="flex w-full gap-3">
            <button
              disabled={!hasNote || playing}
              className={cn(
                "inline-flex flex-1 items-center justify-center gap-2 rounded-md font-semibold",
                "h-10 px-4 text-base",
                "bg-gray-800 text-white hover:bg-gray-900",
                "transition-colors duration-250",
                (!hasNote || playing) && "pointer-events-none opacity-40"
              )}
              onClick={() => answerAndNext(true)}
            >
              <Check className="h-4 w-4" />
              <span>{t('pitchPractice.gotIt')}</span>
            </button>
            <button
              disabled={!hasNote || playing}
              className={cn(
                "inline-flex flex-1 items-center justify-center gap-2 rounded-md font-semibold",
                "h-10 px-4 text-base",
                "border border-gray-300 text-gray-700",
                "hover:bg-gray-50 transition-colors duration-250",
                (!hasNote || playing) && "pointer-events-none opacity-40"
              )}
              onClick={() => answerAndNext(false)}
            >
              <X className="h-4 w-4" />
              <span>{t('pitchPractice.missedIt')}</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
