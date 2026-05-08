# src/lib — Business Logic & Audio Pipeline

## OVERVIEW

All non-UI logic: audio synthesis, pitch detection, piano key mapping, canvas drawing, math utilities, configuration. Hooks (`useMicPitch`, `useAudioFilePitch`) live here alongside pure utilities — no separate `hooks/` directory.

## FILES

| File | Purpose |
|------|---------|
| `audio.ts` | `playRandomKey` (multi-harmonic synthesis + ADSR), `findNearestKey`, `nearestFrameIndex` |
| `piano.ts` | `PIANO_KEYS` array (88 keys A0–C8), `PianoKey` interface, `getKeyByFreq` (binary search), `getFreqOfKey` |
| `canvas.ts` | `mCanvasDraw` (mic falling blocks), `aCanvasDraw` (audio file falling blocks), key index helpers |
| `config.ts` | All magic numbers — key range (C2–B6), canvas dims (1440×380), block sizes, FPS, thresholds |
| `useMicPitch.ts` | Hook — mic input → real-time pitch via `pitchy` library (RAF loop, dB threshold gating) |
| `useAudioFilePitch.ts` | Hook — audio file URL → offline pitch extraction via `pitchy` |
| `math.ts` | `emaStep` — exponential moving average (accuracy smoothing, α=0.07) |
| `utils.ts` | `delay` — promise-based setTimeout |
| `cn.ts` | `cn()` — clsx + tailwind-merge (used project-wide for conditional classes) |

## DEPENDENCY GRAPH

```
config.ts ← piano.ts (key count)
config.ts ← canvas.ts (dimensions, block sizes, FPS)
config.ts ← audio.ts (practice range)
piano.ts  ← audio.ts (key lookup by frequency)
audio.ts  ← PitchPracticePage (playRandomKey)
canvas.ts ← PitchEchoPage (mCanvasDraw, aCanvasDraw)
useMicPitch.ts    ← PitchEchoPage
useAudioFilePitch ← PitchEchoPage
```

## CONVENTIONS

- `config.ts` is the single source of truth for all tunable parameters — no magic numbers elsewhere
- Canvas drawing operates in fixed pixel coordinates (`CANVAS_WIDTH`×`CANVAS_HEIGHT`) — display scaling is CSS-only via `MyCanvas`
- `findNearestKey` returns `0` for silence/no-match (not null) — key index 0 is unused sentinel
- Block queue pattern: push new blocks, increment y each frame, splice when off-screen
- `cn.ts` re-exports `clsx` + `tailwind-merge` — use this instead of raw `clsx` or template literals

## NOTES

- `PRACTICE_RANGE` in audio.ts is a self-executing IIFE that generates note names from C5 to C6
- `playRandomKey` plays ALL notes in range first, then Root-Root-Target pattern — this is intentional ear training design (not a bug)
- `WHITE_KEY_COUNT` and `BLACK_KEY_COUNT` are derived from `KEY_COUNT` (must be divisible by 12)
- `pitchy` library does autocorrelation-based pitch detection — no ML, no WASM
- `useMicPitch` uses requestAnimationFrame loop with configurable dB threshold from Zustand store
