import { ArrowLeft, Delete, Trash2, Play, Square } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useMemo, useCallback, useRef } from 'react';
import { cn } from '../lib/cn';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { RecorderFingering } from '../components/RecorderFingering';
import {
  KEY_NAMES,
  getNoteIndexForKey,
  getSolfegeForKey,
  getFrequencyForNoteIndex,
} from '../lib/recorderData';

const MAJOR_SCALE = ['1', '2', '3', '4', '5', '6', '7'];
const NATURAL_MINOR = ['1', '2', 's3', '4', '5', 's6', 's7'];
const PENTATONIC = ['1', '2', '3', '5', '6'];

const NOTE_DURATION_MS = 450;
const NOTE_GAP_MS = 80;

export default function RecorderPage() {
  const { t } = useTranslation();
  const [keyIndex, setKeyIndex] = useState(0);
  const [solfegeSeq, setSolfegeSeq] = useState<string[]>([]);
  const [playing, setPlaying] = useState(false);
  const playingRef = useRef(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const noteIndexes = useMemo(
    () =>
      solfegeSeq
        .map((s) => getNoteIndexForKey(keyIndex, s))
        .filter((n): n is number => n !== null),
    [keyIndex, solfegeSeq],
  );

  const availableSolfege = useMemo(
    () => getSolfegeForKey(keyIndex),
    [keyIndex],
  );

  const addNote = useCallback((s: string) => {
    setSolfegeSeq((prev) => [...prev, s]);
  }, []);

  const removeLast = useCallback(() => {
    setSolfegeSeq((prev) => prev.slice(0, -1));
  }, []);

  const clearAll = useCallback(() => {
    setSolfegeSeq([]);
  }, []);

  const loadPreset = useCallback((notes: string[]) => {
    setSolfegeSeq(notes);
  }, []);

  const stopPlaying = useCallback(() => {
    playingRef.current = false;
    setPlaying(false);
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
  }, []);

  const playNotes = useCallback(async () => {
    if (noteIndexes.length === 0 || playingRef.current) return;

    playingRef.current = true;
    setPlaying(true);

    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    const sequence = [...noteIndexes, ...noteIndexes.slice().reverse()];

    for (let i = 0; i < sequence.length; i++) {
      if (!playingRef.current) break;

      const freq = getFrequencyForNoteIndex(sequence[i]);
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.value = freq;

      const now = ctx.currentTime;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.35, now + 0.04);
      gain.gain.setValueAtTime(0.35, now + NOTE_DURATION_MS / 1000 - 0.06);
      gain.gain.linearRampToValueAtTime(0, now + NOTE_DURATION_MS / 1000);

      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + NOTE_DURATION_MS / 1000);

      await new Promise<void>((r) => setTimeout(r, NOTE_DURATION_MS + NOTE_GAP_MS));
    }

    stopPlaying();
  }, [noteIndexes, stopPlaying]);

  return (
    <div className="min-h-screen">
      <header className="flex h-14 items-center justify-between border-b border-gray-200 px-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-gray-600 hover:text-gray-800 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-sm font-semibold text-gray-800">{t('recorder.title')}</h1>
        </div>
        <LanguageSwitcher />
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6">
        <div className="flex flex-col gap-6">
          {/* Key selector */}
          <section>
            <h2 className="mb-2 text-sm font-medium text-gray-600">{t('recorder.key')}</h2>
            <div className="flex flex-wrap gap-1.5">
              {KEY_NAMES.map((name, idx) => (
                <button
                  key={name}
                  onClick={() => { setKeyIndex(idx); setSolfegeSeq([]); }}
                  className={cn(
                    "rounded px-3 py-1.5 text-sm transition-colors",
                    keyIndex === idx
                      ? "bg-gray-800 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                  )}
                >
                  {name}
                </button>
              ))}
            </div>
          </section>

          {/* Solfege input */}
          <section>
            <h2 className="mb-2 text-sm font-medium text-gray-600">{t('recorder.solfege')}</h2>

            <div className="mb-3 flex flex-wrap gap-1">
              {availableSolfege.lower.map((s) => (
                <button
                  key={s}
                  onClick={() => addNote(s)}
                  className="rounded bg-gray-100 px-2.5 py-1 text-xs text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  {s}
                </button>
              ))}
              {availableSolfege.base.map((s) => (
                <button
                  key={s}
                  onClick={() => addNote(s)}
                  className="rounded bg-gray-100 px-2.5 py-1 text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  {s}
                </button>
              ))}
              {availableSolfege.upper.map((s) => (
                <button
                  key={s}
                  onClick={() => addNote(s)}
                  className="rounded bg-gray-100 px-2.5 py-1 text-xs text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Current sequence display */}
            <div className="mb-3 flex items-center gap-2">
              <div className="min-h-[2rem] flex-1 rounded border border-gray-200 px-3 py-1.5 text-sm text-gray-700">
                {solfegeSeq.length > 0 ? solfegeSeq.join(' ') : (
                  <span className="text-gray-400">{t('recorder.noNotes')}</span>
                )}
              </div>
              <button
                onClick={removeLast}
                disabled={solfegeSeq.length === 0}
                className={cn(
                  "rounded p-2 transition-colors",
                  solfegeSeq.length > 0
                    ? "text-gray-600 hover:bg-gray-100"
                    : "text-gray-300 cursor-not-allowed",
                )}
                title={t('recorder.backspace')}
              >
                <Delete className="h-4 w-4" />
              </button>
              <button
                onClick={clearAll}
                disabled={solfegeSeq.length === 0}
                className={cn(
                  "rounded p-2 transition-colors",
                  solfegeSeq.length > 0
                    ? "text-gray-600 hover:bg-gray-100"
                    : "text-gray-300 cursor-not-allowed",
                )}
                title={t('recorder.clear')}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {/* Presets */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">{t('recorder.presets')}:</span>
              <button
                onClick={() => loadPreset(MAJOR_SCALE)}
                className="rounded bg-gray-100 px-2.5 py-1 text-xs text-gray-700 hover:bg-gray-200 transition-colors"
              >
                {t('recorder.majorScale')}
              </button>
              <button
                onClick={() => loadPreset(NATURAL_MINOR)}
                className="rounded bg-gray-100 px-2.5 py-1 text-xs text-gray-700 hover:bg-gray-200 transition-colors"
              >
                {t('recorder.minorScale')}
              </button>
              <button
                onClick={() => loadPreset(PENTATONIC)}
                className="rounded bg-gray-100 px-2.5 py-1 text-xs text-gray-700 hover:bg-gray-200 transition-colors"
              >
                {t('recorder.pentatonic')}
              </button>
            </div>
          </section>

          {/* Play / Stop */}
          <section>
            <button
              onClick={playing ? stopPlaying : playNotes}
              disabled={!playing && noteIndexes.length === 0}
              className={cn(
                "flex items-center gap-1.5 rounded px-4 py-2 text-sm font-medium transition-colors",
                playing
                  ? "bg-gray-800 text-white hover:bg-gray-700"
                  : noteIndexes.length > 0
                    ? "bg-gray-800 text-white hover:bg-gray-700"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed",
              )}
            >
              {playing ? (
                <>
                  <Square className="h-4 w-4" />
                  {t('recorder.stop')}
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  {t('recorder.play')}
                </>
              )}
            </button>
          </section>

          {/* Fingering chart */}
          <section>
            {noteIndexes.length > 0 ? (
              <RecorderFingering noteIndexes={noteIndexes} keyIndex={keyIndex} />
            ) : (
              <div className="py-8 text-center text-sm text-gray-400">
                {t('recorder.noNotes')}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
