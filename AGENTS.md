# PROJECT KNOWLEDGE BASE

**Generated:** 2026-05-07T15:08:57+08:00
**Commit:** c158152
**Branch:** main

## OVERVIEW

Music learning tools (ear training + pitch detection). React 19 + TypeScript + Vite + Tailwind CSS v4.

## STRUCTURE

```
src/
├── main.tsx              # Router entry (React Router v7)
├── index.css             # Tailwind import + body styles
├── globalStore.ts         # Zustand (single store for pitch-echo)
├── lib/                   # All business logic — see src/lib/AGENTS.md
├── components/            # UI components (Piano, MyCanvas, AccuracyForm, FittingCurve)
└── pages/
    ├── PitchEchoPage.tsx  # /pitch-echo — mic pitch detection + falling notes
    └── PitchPracticePage.tsx # /pitch-practice — ear training quiz
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Change audio playback/sound | `src/lib/audio.ts` | `playRandomKey` — harmonics + ADSR envelope |
| Change piano key range | `src/lib/config.ts` | `MIN_KEY_INDEX`, `MAX_KEY_INDEX`, `PRACTICE_RANGE` in audio.ts |
| Change canvas drawing | `src/lib/canvas.ts` | `mCanvasDraw` (mic), `aCanvasDraw` (audio file) |
| Add new page | `src/pages/*.tsx` + add `<Route>` in `main.tsx` | |
| Change global state | `src/globalStore.ts` | Zustand — currently only `dbThreshold` |
| Change piano visualization | `src/components/Piano.tsx` | Responsive flex layout, aligns with canvas |
| Change accuracy display | `src/components/AccuracyForm.tsx` | 7-column grid with progress bars |

## CONVENTIONS

- **cn()** from `src/lib/cn.ts` — clsx + tailwind-merge. Use for all conditional classes.
- **Default exports** for page components, **named exports** for lib utilities
- **3-color rule**: theme (gray-800), background (white/gray-100), accent only on primary actions
- **App-style layout**: `min-h-screen` + `h-14 border-b` header + `max-w-2xl mx-auto` content, no card wrapping
- **Tailwind CSS v4** via `@tailwindcss/vite` — no tailwind.config file needed
- **React Compiler** enabled via `babel-plugin-react-compiler` in vite.config.ts
- **No `as any`**, no `@ts-ignore` — enforced by eslint

## ANTI-PATTERNS

- Do NOT use fixed pixel widths for Piano/Canvas — must be responsive (flex-1 + CSS width:100%)
- Do NOT use gradient backgrounds or glass-morphism — flat white/gray only
- Do NOT add color beyond 3-color rule without explicit approval
- Do NOT wrap page content in card components — app-style flat layout

## COMMANDS

```bash
pnpm dev        # dev server
npm run build   # tsc -b && vite build
npm run lint    # eslint
```

## NOTES

- `pitchy` library handles mic pitch detection — see `src/lib/useMicPitch.ts`
- Canvas internal resolution is fixed (`CANVAS_WIDTH`/`CANVAS_HEIGHT` in config.ts), CSS scales display
- `sonner` toast library available globally via `<Toaster>` in main.tsx
- Audio synthesis uses multi-harmonic oscillators (triangle + sine overtones) with ADSR envelope
- `FittingCurve.tsx` exists but is unused (removed from PitchPracticePage)
