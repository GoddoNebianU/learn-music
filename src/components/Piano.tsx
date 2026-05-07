import { getBlackKeyIndex } from "../lib/canvas";

interface PianoProps {
    whiteKeysPressed: boolean[];
    blackKeysPressed: boolean[];
}

export default function Piano({
    whiteKeysPressed, blackKeysPressed
}: PianoProps) {
    return (
        <div className="flex h-28 w-full flex-row">
            {
                whiteKeysPressed.map((v: boolean, i) => {
                    return <div
                        className="h-full box-border border relative flex-1"
                        style={v ? { backgroundColor: "#9ca3af" } : undefined}
                        key={"white_key_" + i}>
                        <span className="bottom-0 absolute text-[10px] text-gray-400">
                            {i % 7 === 0 && `C${Math.floor(i / 7) + 2}`}
                        </span>
                        {i % 7 !== 2 && i % 7 !== 6 &&
                            <div key={`black_key_${getBlackKeyIndex(i)}`}
                                className="z-10 box-border border absolute top-0 h-8/12 bg-black"
                                style={{
                                    width: "60%",
                                    right: "-30%"
                                }}
                            >
                                {blackKeysPressed[getBlackKeyIndex(i)] && (
                                    <div className="h-full w-full bg-gray-400" />
                                )}
                            </div>
                        }
                    </div>;
                })
            }
        </div >
    );
}
