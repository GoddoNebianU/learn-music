# src/lib — Business Logic & Audio Pipeline

## OVERVIEW

All non-UI logic: audio synthesis, pitch detection, piano key mapping, canvas drawing, math utilities, configuration.

## FILES

| File | Purpose |
|------|---------|
| `audio.ts` | `playRandomKey` (harmonic synthesis + ADSR), `findNearestKey`, `nearestFrameIndex` |
| `piano.ts` | `PIANO_KEYS` array, `PianoKey` interface, `getKeyByFreq`/`getFreqOfKey` |
| `canvas.ts` | `mCanvasDraw` (mic blocks), `aCanvasDraw` (audio file blocks), key index helpers |
| `config.ts` | All magic numbers — key range, canvas dimensions, block sizes, FPS, thresholds |
| `useMicPitch.ts` | Hook — mic input → pitch via `pitchy` library |
| `useAudioFilePitch.ts` | Hook — audio file → pitch list |
| `math.ts` | `emaStep` — exponential moving average (accuracy smoothing) |
| `utils.ts` | `delay` — promise-based setTimeout |
| `cn.ts` | `cn()` — clsx + tailwind-merge (used project-wide) |

## DEPENDENCY GRAPH

```
config.ts ← piano.ts (frequency data)
config.ts ← canvas.ts (dimensions, block sizes, FPS)
config.ts ← audio.ts (practice range)
piano.ts  ← audio.ts (key lookup by frequency)
audio.ts  ← PitchPracticePage (playRandomKey)
canvas.ts ← PitchEchoPage (mCanvasDraw, aCanvasDraw)
useMicPitch.ts    ← PitchEchoPage
useAudioFilePitch ← PitchEchoPage
```

## CONVENTIONS

- `config.ts` is the single source of truth for all tunable parameters
- Canvas drawing operates in fixed pixel coordinates (840×380) — display scaling is CSS-only
- `findNearestKey` returns `0` for silence/no-match (not null)
- Block queue pattern: push new blocks, increment y each frame, splice when off-screen

## NOTES

- `PRACTICE_RANGE` in audio.ts is a self-executing IIFE that generates note names from C5 to C6
- `playRandomKey` plays ALL notes in range, then Root-Root-Target pattern — this is intentional ear training design
- `WHITE_KEY_COUNT` and `BLACK_KEY_COUNT` are derived from `KEY_COUNT` (must be divisible by 12)
