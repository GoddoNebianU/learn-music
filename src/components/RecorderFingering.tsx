import {
  COL_X_OFFSET,
  COL_WIDTH,
  DIAGRAM_Y,
  DIAGRAM_HEIGHT,
  NUMBER_Y_START,
  NUMBER_HEIGHT,
  SPRITE_WIDTH,
  SPRITE_HEIGHT,
} from '../lib/recorderData';

const SPRITE_URL = '/recorder/zhifa.png';

interface RecorderFingeringProps {
  noteIndexes: number[];
  keyIndex?: number;
}

export function RecorderFingering({ noteIndexes, keyIndex }: RecorderFingeringProps) {
  if (noteIndexes.length === 0) return null;

  return (
    <div className="flex gap-1 overflow-x-auto py-2">
      {noteIndexes.map((noteIdx, i) => {
        const x = -(COL_X_OFFSET + COL_WIDTH * noteIdx);
        const diagramY = -DIAGRAM_Y;

        return (
          <div key={`${noteIdx}-${i}`} className="flex shrink-0 flex-col items-center">
            <div
              style={{
                width: COL_WIDTH,
                height: DIAGRAM_HEIGHT,
                backgroundImage: `url(${SPRITE_URL})`,
                backgroundPosition: `${x}px ${diagramY}px`,
                backgroundSize: `${SPRITE_WIDTH}px ${SPRITE_HEIGHT}px`,
              }}
            />
            {keyIndex != null && (
              <div
                style={{
                  width: COL_WIDTH,
                  height: NUMBER_HEIGHT,
                  backgroundImage: `url(${SPRITE_URL})`,
                  backgroundPosition: `${x}px ${-(NUMBER_Y_START + NUMBER_HEIGHT * keyIndex)}px`,
                  backgroundSize: `${SPRITE_WIDTH}px ${SPRITE_HEIGHT}px`,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
