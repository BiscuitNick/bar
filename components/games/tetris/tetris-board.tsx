import { cn } from "@/lib/utils"
import type { Cell, Tetromino } from "@/lib/games/tetris/types"
import { BOARD_HEIGHT, BOARD_WIDTH, COLORS } from "@/lib/games/tetris/types"
import { getBoardWithPiece, getGhostPosition } from "@/lib/games/tetris/game-logic"

interface TetrisBoardProps {
  board: Cell[][]
  currentPiece: Tetromino | null
}

export function TetrisBoard({ board, currentPiece }: TetrisBoardProps) {
  const displayBoard = getBoardWithPiece(board, currentPiece)
  const ghostPosition = currentPiece ? getGhostPosition(board, currentPiece) : null

  return (
    <div className="relative border-2 border-border bg-background/50 backdrop-blur">
      <div className="grid" style={{ gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1fr)` }}>
        {displayBoard.map((row, y) =>
          row.map((cell, x) => {
            const isGhost =
              currentPiece &&
              ghostPosition &&
              ghostPosition.y !== currentPiece.position.y &&
              y >= ghostPosition.y &&
              y < ghostPosition.y + currentPiece.shape.length &&
              x >= ghostPosition.x &&
              x < ghostPosition.x + currentPiece.shape[0].length &&
              currentPiece.shape[y - ghostPosition.y]?.[x - ghostPosition.x] === 1 &&
              !cell

            return (
              <div
                key={`${y}-${x}`}
                className={cn(
                  "aspect-square w-6 border border-border/30 sm:w-7",
                  cell && COLORS[cell],
                  cell && "border-white/20 shadow-inner",
                  isGhost && "border-dashed border-muted-foreground/50 bg-muted/30"
                )}
              />
            )
          })
        )}
      </div>
    </div>
  )
}
