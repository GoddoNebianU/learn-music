/**
 * Recorder fingering chart data — sprite sheet layout constants
 * and solfege-to-note mapping for all 12 keys.
 *
 * Sprite sheet: public/recorder/zhifa.png (1278×968px)
 * 27 columns = notes from low C to high D.
 */

/** 27 note names (fn_indexes in original Python) */
export const FN_INDEXES: string[] = [
  'c', 'sc', 'd', 'sd', 'e', 'f', 'sf', 'g', 'sg', 'a', 'sa', 'b',
  'c.', 'sc.', 'd.', 'sd.', 'e.', 'f.', 'sf.', 'g.', 'sg.', 'a.', 'sa.', 'b.',
  'c..', 'sc..', 'd..',
];

/** 12 key names (numbers_indexes in original Python) */
export const KEY_NAMES: string[] = [
  'C', 'bD', 'D', 'bE', 'E', 'F', 'bG', 'G', 'bA', 'A', 'bB', 'B',
];

/**
 * Solfege mapping per key — 12 arrays, each with 27 entries.
 * Each entry is the solfege label that appears in that column for the given key.
 * Empty string means the column has no solfege label for that key.
 *
 * Derived from the sn.py `numbers` array.
 */
export const KEY_SOLFEGE: string[][] = [
  // Key C (index 0)
  ['1', 's1', '2', 's2', '3', '4', 's4', '5', 's5', '6', 's6', '7',
   '1.', 's1.', '2.', 's2.', '3.', '4.', 's4.', '5.', 's5.', '6.', 's6.', '7.',
   '1..', 's1..', '2..'],
  // Key bD (index 1)
  ['.7', '1', 's1', '2', 's2', '3', '4', 's4', '5', 's5', '6', 's6',
   '7', '1.', 's1.', '2.', 's2.', '3.', '4.', 's4.', '5.', 's5.', '6.', 's6.',
   '7.', '1..', 's1..'],
  // Key D (index 2)
  ['.s6', '.7', '1', 's1', '2', 's2', '3', '4', 's4', '5', 's5', '6',
   's6', '7', '1.', 's1.', '2.', 's2.', '3.', '4.', 's4.', '5.', 's5.', '6.',
   's6.', '7.', '1..'],
  // Key bE (index 3)
  ['.6', '.s6', '.7', '1', 's1', '2', 's2', '3', '4', 's4', '5', 's5',
   '6', 's6', '7', '1.', 's1.', '2.', 's2.', '3.', '4.', 's4.', '5.', 's5.',
   '6.', 's6.', '7.'],
  // Key E (index 4)
  ['.s5', '.6', '.s6', '.7', '1', 's1', '2', 's2', '3', '4', 's4', '5',
   's5', '6', 's6', '7', '1.', 's1.', '2.', 's2.', '3.', '4.', 's4.', '5.',
   's5.', '6.', ''],
  // Key F (index 5)
  ['.5', '.s5', '.6', '.s6', '.7', '1', 's1', '2', 's2', '3', '4', 's4',
   '5', 's5', '6', 's6', '7', '1.', 's1.', '2.', 's2.', '3.', '4.', 's4.',
   '5.', 's5.', '6.'],
  // Key bG (index 6)
  ['.s4', '.5', '.s5', '.6', '.s6', '.7', '1', 's1', '2', 's2', '3', '4',
   's4', '5', 's5', '6', 's6', '7', '1.', 's1.', '2.', 's2.', '3.', '4.',
   's4.', '5.', ''],
  // Key G (index 7)
  ['.4', '.s4', '.5', '.s5', '.6', '.s6', '.7', '1', 's1', '2', 's2', '3',
   '4', 's4', '5', 's5', '6', 's6', '7', '1.', 's1.', '2.', 's2.', '3.',
   '4.', 's4.', ''],
  // Key bA (index 8)
  ['.3', '.4', '.s4', '.5', '.s5', '.6', '.s6', '.7', '1', 's1', '2', 's2',
   '3', '4', 's4', '5', 's5', '6', 's6', '7', '1.', 's1.', '2.', 's2.',
   '3.', '4.', ''],
  // Key A (index 9)
  ['.s2', '.3', '.4', '.s4', '.5', '.s5', '.6', '.s6', '.7', '1', 's1', '2',
   's2', '3', '4', 's4', '5', 's5', '6', 's6', '7', '1.', 's1.', '2.',
   's2.', '3.', ''],
  // Key bB (index 10)
  ['.2', '.s2', '.3', '.4', '.s4', '.5', '.s5', '.6', '.s6', '.7', '1', 's1',
   '2', 's2', '3', '4', 's4', '5', 's5', '6', 's6', '7', '1.', 's1.',
   '2.', 's2.', ''],
  // Key B (index 11)
  ['s1', '2', 's2', '3', '4', 's4', '5', 's5', '6', 's6', '7', '1.',
   's1.', '2.', 's2.', '3.', '4.', 's4.', '5.', 's5.', '6.', 's6.', '7.',
   '1..', 's1..', '2..'],
];

/** MIDI note number for FN_INDEXES[0] (C4 = middle C) */
export const NOTE_BASE_MIDI = 60;

/** Standard A4 = 440 Hz */
const A4_FREQ = 440;

/** MIDI note number for A4 */
const A4_MIDI = 69;

/**
 * Convert a note index (0–26) to its frequency in Hz.
 * Index 0 = C4 (261.63 Hz), index 12 = C5, index 24 = C6.
 */
export function getFrequencyForNoteIndex(index: number): number {
  return A4_FREQ * Math.pow(2, (NOTE_BASE_MIDI + index - A4_MIDI) / 12);
}

/** Sprite sheet dimensions */
export const SPRITE_WIDTH = 1278;
export const SPRITE_HEIGHT = 968;

/** Column crop constants */
export const COL_X_OFFSET = 122;
export const COL_WIDTH = 42;
export const DIAGRAM_Y = 56;
export const DIAGRAM_HEIGHT = 208;
export const NAME_Y = 264;
export const NAME_HEIGHT = 18;
export const NUMBER_Y_START = 282;
export const NUMBER_HEIGHT = 54;

/**
 * Look up a solfege name in the given key's array and return the column index.
 * Returns null if not found.
 */
export function getNoteIndexForKey(keyIndex: number, solfege: string): number | null {
  const row = KEY_SOLFEGE[keyIndex];
  if (!row) return null;
  const idx = row.indexOf(solfege);
  return idx >= 0 ? idx : null;
}

/**
 * Get all unique solfege names for a given key.
 * Returns them grouped by octave: lower (leading dot), base, upper (trailing dot/dots).
 */
export function getSolfegeForKey(keyIndex: number): { lower: string[]; base: string[]; upper: string[] } {
  const row = KEY_SOLFEGE[keyIndex];
  const lower: string[] = [];
  const base: string[] = [];
  const upper: string[] = [];
  for (const s of row) {
    if (!s) continue;
    if (s.startsWith('.')) {
      if (!lower.includes(s)) lower.push(s);
    } else if (s.endsWith('..')) {
      if (!upper.includes(s)) upper.push(s);
    } else if (s.endsWith('.')) {
      if (!upper.includes(s)) upper.push(s);
    } else {
      if (!base.includes(s)) base.push(s);
    }
  }
  return { lower, base, upper };
}
