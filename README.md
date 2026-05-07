# Learn Music

A collection of music learning tools built with React, TypeScript, and Tailwind CSS.

## Apps

### Pitch Echo (`/pitch-echo`)
Real-time pitch detection via microphone with piano key visualization. Uses the [pitchy](https://github.com/ianprime0509/pitchy) library for pitch detection and renders falling note blocks on a canvas.

### Pitch Practice (`/pitch-practice`)
Ear training tool that plays random notes and quizzes you on pitch recognition. Tracks accuracy per note (C–B) with exponential moving average and displays a spline-fitted accuracy curve via Chart.js.

## Tech Stack

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **React Router v7** for client-side routing
- **Zustand** for state management
- **Chart.js** for data visualization

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## Project Structure

```
src/
├── main.tsx                # Router entry point
├── index.css               # Global styles
├── globalStore.ts           # Zustand store (pitch-echo)
├── lib/
│   ├── cn.ts               # Tailwind class merge utility
│   ├── piano.ts            # Piano key frequencies & lookup
│   ├── audio.ts            # Pitch analysis + playback utilities
│   ├── canvas.ts           # Canvas drawing for falling notes
│   ├── config.ts           # Pitch-echo configuration constants
│   ├── math.ts             # EMA smoothing
│   ├── utils.ts            # General utilities (delay)
│   ├── useMicPitch.ts      # Microphone pitch detection hook
│   └── useAudioFilePitch.ts # Audio file pitch analysis hook
├── components/
│   ├── Piano.tsx            # Piano keyboard visualization
│   ├── MyCanvas.tsx         # Canvas wrapper component
│   ├── AccuracyForm.tsx     # Accuracy display table
│   └── FittingCurve.tsx     # Spline chart component
└── pages/
    ├── PitchEchoPage.tsx    # Pitch echo app
    └── PitchPracticePage.tsx # Pitch practice app
```

## License

AGPL-3.0-only
