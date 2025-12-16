import { Bomb, Flag } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Cell } from "@/lib/games/minesweeper/types"
import { NUMBER_COLORS } from "@/lib/games/minesweeper/types"

interface MinesweeperCellProps {
  cell: Cell
  onClick: () => void
  onRightClick: () => void
  gameOver: boolean
}

export function MinesweeperCell({
  cell,
  onClick,
  onRightClick,
  gameOver,
}: MinesweeperCellProps) {
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    onRightClick()
  }

  const isRevealed = cell.state === "revealed"
  const isFlagged = cell.state === "flagged"

  return (
    <button
      className={cn(
        "flex size-7 items-center justify-center border text-sm font-bold transition-colors sm:size-8",
        isRevealed
          ? cell.isMine
            ? "bg-red-500 border-red-600"
            : "bg-muted border-muted-foreground/20"
          : "bg-card border-border hover:bg-accent cursor-pointer",
        isFlagged && "bg-amber-100 dark:bg-amber-900/30"
      )}
      onClick={onClick}
      onContextMenu={handleContextMenu}
      disabled={isRevealed || gameOver}
    >
      {isRevealed && cell.isMine && <Bomb className="size-4" />}
      {isRevealed && !cell.isMine && cell.adjacentMines > 0 && (
        <span className={NUMBER_COLORS[cell.adjacentMines]}>
          {cell.adjacentMines}
        </span>
      )}
      {isFlagged && <Flag className="size-4 text-red-500" />}
    </button>
  )
}
