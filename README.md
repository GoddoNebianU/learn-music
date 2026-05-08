# Learn Music

[中文](./README.zh-CN.md)

Music learning tools. Ear training + real-time pitch detection.

## What it does

### Pitch Practice (`/pitch-practice`)
Play random notes to train pitch recognition. Plays all notes in the C5–C6 range, then quizzes using a "root-root-target" pattern. Multi-harmonic synthesized tone (triangle + sine overtones + ADSR envelope), tracks EMA accuracy per note name (C–B).

### Pitch Echo (`/pitch-echo`)
Real-time pitch detection via microphone, with piano key visualization + falling note blocks. Uses [pitchy](https://github.com/ianprime0509/pitchy) for pitch detection.

## Stack

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **React Router v7** · **Zustand** · **React Compiler**
- **react-i18next** (2 locales: English, Chinese)
- **Web Audio API** (multi-harmonic synthesis + ADSR envelope, no samples)

## Getting started

```bash
pnpm install
pnpm dev
```

Open http://localhost:5173

## Project structure

```
src/
├── main.tsx                # Router entry + Toaster + i18n init
├── index.css               # Tailwind import
├── globalStore.ts           # Zustand (dB threshold)
├── i18n/
│   ├── index.ts            # i18next config (language detection)
│   └── locales/
│       ├── en.json         # English translations
│       └── zh.json         # Chinese translations
├── lib/
│   ├── audio.ts            # Note playback (multi-harmonic + ADSR)
│   ├── piano.ts            # Piano key frequency table & lookup
│   ├── canvas.ts           # Canvas falling note drawing
│   ├── config.ts           # All tunable parameters
│   ├── math.ts             # EMA smoothing
│   ├── utils.ts            # delay utility
│   ├── cn.ts               # clsx + tailwind-merge
│   ├── useMicPitch.ts      # Mic pitch detection hook
│   └── useAudioFilePitch.ts # Audio file pitch analysis hook
├── components/
│   ├── Piano.tsx            # Responsive piano keyboard
│   ├── MyCanvas.tsx         # Canvas component (CSS scaling)
│   ├── AccuracyForm.tsx     # Accuracy 7-column grid
│   └── LanguageSwitcher.tsx # EN / 中文 toggle
└── pages/
    ├── PitchEchoPage.tsx    # Pitch detection page
    └── PitchPracticePage.tsx # Ear training page
```

## License

AGPL-3.0-only
