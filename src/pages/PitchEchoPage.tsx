import MyCanvas from "../components/MyCanvas";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useMicPitch } from "../lib/useMicPitch";
import { aCanvasDraw, mCanvasDraw } from "../lib/canvas";
import { useAudioFilePitch } from "../lib/useAudioFilePitch";
import Piano from "../components/Piano";
import { BLACK_KEY_COUNT, DEFAULT_SONG_URL, ENABLE_AUDIO, START_Y_M, WHITE_KEY_COUNT } from "../lib/config";
import { useGlobalStore } from "../globalStore";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

export default function PitchEchoPage() {
    const { t } = useTranslation();
    const mCanvasRef = useRef<HTMLCanvasElement>(null);
    const aCanvasRef = useRef<HTMLCanvasElement>(null);

    const {
        dbThreshold,
        setDbThreshold
    } = useGlobalStore();

    const [playBeginTime, setPlayBeginTime] = useState<null | number>(null);
    const [mWhiteKeysPressed, setMWhiteKeysPressed] = useState(() =>
        Array.from({ length: WHITE_KEY_COUNT }, () => false)
    );
    const [mBlackKeysPressed, setMBlackKeysPressed] = useState(() =>
        Array.from({ length: BLACK_KEY_COUNT }, () => false)
    );
    const [running, setRunning] = useState(false);
    const [isFirstInterval, setIsFirstInterval] = useState(true);
    const { pitchResult: mPitch, mInit, mCleanup } = useMicPitch();
    const mPitchRef = useRef(mPitch);
    useEffect(() => {
        mPitchRef.current = mPitch;
    });
    const { pitchList, aInit } = useAudioFilePitch(DEFAULT_SONG_URL);

    const mBlockQueue = useRef<Array<{
        "type": "white" | "black";
        "index": number;
        "y": number;
        "len": number;
    }>>([]);
    const aBlockQueue = useRef<Array<{
        "type": "white" | "black";
        "index": number;
        "y": number;
        "len": number;
    }>>([]);
    const timer = useRef<number | null>(null);
    useEffect(() => {
        // if (mPitch <= 0) return;
        timer.current = window.setInterval(() => {
            if (ENABLE_AUDIO) {
                if (!pitchList.length) return;
                if (isFirstInterval) {
                    const audio = new Audio(DEFAULT_SONG_URL);
                    audio.play();
                    setPlayBeginTime(Date.now());
                    setIsFirstInterval(false);
                }
                aCanvasDraw({
                    canvasRef: aCanvasRef,
                    blockQueue: aBlockQueue,
                    playBeginTime: playBeginTime,
                    pitchList: pitchList
                });
            }
            mCanvasDraw({
                pitch: mPitchRef.current.pitch,
                canvasRef: mCanvasRef,
                setWhiteKeysPressed: setMWhiteKeysPressed,
                setBlackKeysPressed: setMBlackKeysPressed,
                blockQueue: mBlockQueue,
            });
        }, 1000 / 60);
        return () => {
            if (timer.current) window.clearInterval(timer.current);
        };
    }, [isFirstInterval, pitchList, playBeginTime]);

    // 清理麦克风资源
    useEffect(() => {
        return () => {
            mCleanup();
        };
    }, [mCleanup]);

    useEffect(() => {
        const check = () => {
            if (window.innerWidth < 768 && window.innerWidth < window.innerHeight) {
                toast(t('pitchEcho.landscapeHint'), { duration: 5000, id: "landscape-hint" });
            }
        };
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, [t]);

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

            <main className="mx-auto max-w-3xl px-4 py-6">
                <h1 className="text-2xl font-bold text-gray-800">{t('pitchEcho.title')}</h1>
                <p className="text-sm text-gray-500">{t('pitchEcho.desc')}</p>

                <div className="mt-6 flex flex-col items-center gap-4">
                    {!running && (
                        <button
                            className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-800 px-6 h-10 text-sm font-semibold text-white hover:bg-gray-900 transition-colors"
                            onClick={() => {
                                mInit();
                                if (ENABLE_AUDIO) aInit();
                                setRunning(true);
                            }}
                        >
                            {t('common.start')}
                        </button>
                    )}

                    <div className="flex w-full items-center gap-3 text-sm">
                        <span className="shrink-0 text-gray-500">{t('pitchEcho.dbThreshold', { value: dbThreshold })}</span>
                        <input
                            type="range"
                            min={1}
                            max={100}
                            value={-dbThreshold}
                            onChange={(e) => {
                                setDbThreshold(-parseInt(e.target.value));
                            }}
                            className="flex-1"
                        />
                    </div>

                    <Piano whiteKeysPressed={mWhiteKeysPressed} blackKeysPressed={mBlackKeysPressed} />
                    <div className="relative w-full">
                        {
                            ENABLE_AUDIO && (<MyCanvas
                                canvasRef={aCanvasRef} transparent={false} />)}

                        <MyCanvas
                            canvasRef={mCanvasRef} transparent={true} />
                        <div
                            style={{ marginTop: START_Y_M + "px" }}
                            className="h-1 w-full bg-black/50"></div>
                    </div>
                </div>
            </main>
        </div>
    );
}
