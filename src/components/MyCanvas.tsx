import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../lib/config";

interface MCanvasProps {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    transparent: boolean;
}

export default function MyCanvas(
    { canvasRef, transparent }: MCanvasProps
) {
    return (
        <div className="border flex flex-col absolute left-0 w-full">
            <canvas
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                style={{ width: "100%" }}
                className={transparent ? "opacity-50" : undefined}
                ref={canvasRef}>Your browser does not support canvas.</canvas>
        </div>
    );
}
