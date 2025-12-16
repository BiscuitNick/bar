import type { Board, GameStatus } from "@/lib/games/minesweeper/types"
import { MinesweeperCell } from "./minesweeper-cell"

interface MinesweeperBoardProps {
  board: Board
  status: GameStatus
  onCellClick: (row: number, col: number) => void
  onCellRightClick: (row: number, col: number) => void
}

export function MinesweeperBoard({
  board,
  status,
  onCellClick,
  onCellRightClick,
}: MinesweeperBoardProps) {
  const gameOver = status === "won" || status === "lost"

  return (
    <div className="inline-block border-2 border-border bg-background/50 p-1">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, colIndex) => (
            <MinesweeperCell
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              onClick={() => onCellClick(rowIndex, colIndex)}
              onRightClick={() => onCellRightClick(rowIndex, colIndex)}
              gameOver={gameOver}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
