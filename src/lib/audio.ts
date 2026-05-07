import { delay } from "./utils";
import { getKeyByFreq, PIANO_KEYS, type PianoKey } from "./piano";
import { MIN_KEY_INDEX } from "./config";

// === Pitch Analysis Utils (pitch-echo) ===

/**
 * 给定时间 t，返回最近采样点的索引
 */
export function nearestFrameIndex(
    t: number,
    duration: number,
    fps: number): number {
    if (fps <= 0) throw new Error("fps must be > 0");

    // 总帧数（最后一帧的 index）
    const maxIndex = Math.floor(duration * fps);

    // clamp 时间
    const clamped = Math.max(0, Math.min(t, duration));

    // 最近帧
    const index = Math.round(clamped * fps);

    // 防止越界
    return Math.max(0, Math.min(index, maxIndex));
}

export const findNearestKey = (pitch: number) => {
    const n = getKeyByFreq(pitch) - 1 - MIN_KEY_INDEX;
    if (n < 0) return 0;

    if ([1, 3, 6, 8, 10].includes(n % 12)) {
        // 黑键
        return {
            type: "black",
            index: {
                1: 0,
                3: 1,
                6: 2,
                8: 3,
                10: 4
            }[n % 12]! + Math.floor(n / 12) * 5
        };
    } else {
        // 白键
        return {
            type: "white",
            index: {
                0: 0,
                2: 1,
                4: 2,
                5: 3,
                7: 4,
                9: 5,
                11: 6
            }[n % 12]! + Math.floor(n / 12) * 7
        };
    }
};

// === Audio Playback Utils (pitch-practice) ===

const PRACTICE_RANGE = (([start, end]: [string, string]) => {
    const CDEFGAB = "CDEFGAB";

    const a1 = start[0];
    const a2 = end[0];
    const n1 = Number(start[1]);
    const n2 = Number(end[1]);

    if (n1 === n2)
        return CDEFGAB
            .slice(CDEFGAB.indexOf(a1), CDEFGAB.indexOf(a2) + 1).split("")
            .map(r => r + n1.toString());

    if (n2 - n1 > 1) {
        // 处理跨多个八度的情况
        const result: string[] = [];

        // 第一个八度：从a1到G
        const firstOctave = CDEFGAB
            .slice(CDEFGAB.indexOf(a1))
            .split("")
            .map(r => r + n1.toString());
        result.push(...firstOctave);

        // 中间完整的八度
        for (let octave = n1 + 1; octave < n2; octave++) {
            const fullOctave = CDEFGAB
                .split("")
                .map(r => r + octave.toString());
            result.push(...fullOctave);
        }

        // 最后一个八度：从C到a2
        const lastOctave = CDEFGAB
            .slice(0, CDEFGAB.indexOf(a2) + 1)
            .split("")
            .map(r => r + n2.toString());
        result.push(...lastOctave);

        return result;
    }

    // n2 - n1 === 1 的情况（相邻八度）
    const firstOctave = CDEFGAB
        .slice(CDEFGAB.indexOf(a1))
        .split("")
        .map(r => r + n1.toString());

    const secondOctave = CDEFGAB
        .slice(0, CDEFGAB.indexOf(a2) + 1)
        .split("")
        .map(r => r + n2.toString());

    return [...firstOctave, ...secondOctave];
})(["C5", "C6"]);
const ROOT = "C5";

export const playRandomKey = async (ctx: AudioContext, callback: (key: PianoKey) => void) => {
    const findKey = (sn: string) => PIANO_KEYS.filter(k => k.scientificName === sn)[0];

    const playKey = async (sn: string, ms: number) => {
        const freq = findKey(sn).frequency;
        const now = ctx.currentTime;
        const duration = ms / 1000;

        const master = ctx.createGain();
        master.connect(ctx.destination);

        const attack = 0.01;
        const decay = 0.15;
        const sustainLevel = 0.3;
        const release = 0.1;

        master.gain.setValueAtTime(0, now);
        master.gain.linearRampToValueAtTime(0.35, now + attack);
        master.gain.linearRampToValueAtTime(sustainLevel * 0.35, now + attack + decay);
        master.gain.setValueAtTime(sustainLevel * 0.35, now + duration - release);
        master.gain.linearRampToValueAtTime(0.001, now + duration);

        // Harmonics: [frequency multiplier, amplitude, waveform]
        const harmonics: Array<{ ratio: number; amp: number; type: OscillatorType }> = [
            { ratio: 1, amp: 1, type: "triangle" },
            { ratio: 2, amp: 0.5, type: "sine" },
            { ratio: 3, amp: 0.15, type: "sine" },
            { ratio: 4, amp: 0.06, type: "sine" },
        ];

        const oscillators = harmonics.map(({ ratio, amp, type }) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type;
            osc.frequency.value = freq * ratio;
            gain.gain.value = amp;
            osc.connect(gain);
            gain.connect(master);
            osc.start(now);
            osc.stop(now + duration);
            return osc;
        });

        await delay(ms);

        oscillators.forEach(osc => { try { osc.stop(); osc.disconnect(); } catch {} });
        try { master.disconnect(); } catch {}
    };

    const index = Math.floor(Math.random() * PRACTICE_RANGE.length);
    callback(findKey(PRACTICE_RANGE[index]));

    for (const pitch of PRACTICE_RANGE) {
        await playKey(pitch, 2500 / PRACTICE_RANGE.length);
    }

    const interval_ms = 250;
    const play_ms = 400;

    await delay(interval_ms);
    await playKey(ROOT, play_ms);
    await delay(interval_ms);
    await playKey(ROOT, play_ms);
    await delay(interval_ms);
    await playKey(PRACTICE_RANGE[index], play_ms);
};
