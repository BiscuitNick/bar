import { cn } from "@/lib/utils"
import type { TetrominoType } from "@/lib/games/tetris/types"
import { COLORS } from "@/lib/games/tetris/types"
import { TETROMINO_SHAPES } from "@/lib/games/tetris/pieces"

interface TetrisPieceProps {
  type: TetrominoType
  cellSize?: number
}

export function TetrisPiece({ type, cellSize = 20 }: TetrisPieceProps) {
  const shape = TETROMINO_SHAPES[type]
  const color = COLORS[type]

  return (
    <div className="flex flex-col items-center justify-center">
      {shape.map((row, y) => (
        <div key={y} className="flex">
          {row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              style={{ width: cellSize, height: cellSize }}
              className={cn(
                "border border-transparent",
                cell ? cn(color, "border-white/20") : "bg-transparent"
              )}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
